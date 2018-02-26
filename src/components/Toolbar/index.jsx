import React from 'react';

import FixedHeaderContainer from './containers/FixedHeaderContainer';
import HeaderContainer from './containers/HeaderContainer';

export default function Toolbar() {
  return (
    <div className="toolbar">
      <FixedHeaderContainer />
      <HeaderContainer />
    </div>
  );
}
