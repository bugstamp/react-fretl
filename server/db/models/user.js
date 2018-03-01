import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import boom from 'boom';
import moment from 'moment';

import mongoose from '../mongoose';
import config from '../../config';

const jwtSecret = config.get('jwt:secret');

const userSchema = new mongoose.Schema({
	fullname: {
		type: String,
    required: true
	},
	phone: {
		type: String,
    required: true
	},
	address: {
		type: String,
    required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
  purchases: {
    type: Array,
    default: []
  },
	created: {
		type: Date,
		require: true,
		default: moment().format('YYYY-MM-DD hh:mm:ss')
	}
});

userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) 
    return next();

	try {
		this.password = await this.hashPassword(this.password);

		next();
	} catch (e) {
		next(e);
	}
});

userSchema.methods.generatePassword = function(length) {
  const char = 'abcdefgghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYZ' 
  let pwd = '';

  for(var i = 0; i < length; i++) {
    pwd += char.charAt(Math.floor(Math.random() * char.length));
  }

  return pwd;
}

userSchema.methods.hashPassword = async function(password) {
  try {
    const salt = await bcrypt.genSalt(Math.random());
    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (e) {
    throw e;
  }
}

userSchema.methods.checkPassword = async function(password) {
  try {
    const res = await bcrypt.compare(password, this.password);
    
    return res;
  } catch (e) {
    throw e;
  }
};

userSchema.methods.updateUserPassword = async function(password) {
  try {
    const hash = await this.hashPassword(password);
    
    const user = await User.findOneAndUpdate(
      { _id: this._id },
      { 'password' : hash },
      { 'new': true }
    );

    return user.password;
  } catch (e) {
    next(e);
  }
}

userSchema.methods.getUserId = function() {
  return this._id.toString();
};

userSchema.methods.updateUserInfo = async function(form) {
  const {
    email,
    password,
    passConfirm,
    ...rest,
  } = form;

  try {
    if (email !== this.email) {
      if (await User.findOne({ email }))
        throw boom.forbidden('Пользователь уже существует!');
    }

    if (password) {
      if (password !== passConfirm)
        throw boom.unauthorized('Не правильный пароль');

      await this.updateUserPassword(password);
    }

    const user = await User.findOneAndUpdate(
      { _id: this._id },
      { email, ...rest },
      { 'new': true }
    );

    return user;
  } catch (e) {
    throw e;
  }
}

userSchema.statics.isExist = async function(email) {
  try {
    if (!await User.findOne({ email }))
      return false;

    return true;
  } catch (e) {
    throw e;
  }
};

userSchema.statics.getToken = async function(id) {
  try {
    const token = await jwt.sign(id, jwtSecret);

    return token;
	} catch (e) {
		throw e;
	}
}

userSchema.statics.checkToken = async function(token) {
	try {
		const id = await jwt.verify(token, jwtSecret);

		return id;
	} catch (e) {
		throw e;
	}
}

userSchema.statics.getUserById = async function(userId) {
	try {
		const user = await User.findById(userId);

		return user;
	} catch (e) {
		throw boom.notFound('Пользователь не найден!');
	}
};

userSchema.statics.register = async function(form) { 
	const { 
    email, 
    password, 
    passConfirm,
    ...rest 
  } = form;

  try {
  	if (await this.isExist(email))
      throw boom.forbidden('Пользователь уже существует!');

  	if (password !== passConfirm)
      throw boom.unauthorized('Не правильный пароль');

  	const newUser = await User.create({
      email,
      password,
      ...rest,
      created: moment().format('YYYY-MM-DD hh:mm:ss')
    });

    return newUser;
  } catch (e) {
  	throw e;
  }
}

userSchema.statics.authorize = async function(form) {
	const { email, password } = form;

  try {
  	if (!await this.isExist(email))
      throw boom.forbidden('Не правильный Е-mail!');

  	const user = await User.findOne({ email });

  	if (!await user.checkPassword(password))
      throw boom.unauthorized('Не правильный пароль!');

  	return user;
  } catch (e) {
  	throw e;
  }
}

const User = mongoose.model('User', userSchema);

export default User;