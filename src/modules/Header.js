import React, { Component } from 'react';

import Filter from './Filter';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header__letters">
          {['O', 'S', 'K', 'I'].map((el, i) => (
            <div key={el} style={{ marginLeft: i * 20 }}>
              {el}
            </div>
          ))}
        </div>
        <Filter {...this.props} />
      </div>
    );
  }
}

export default Header;
