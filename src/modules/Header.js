import React, { Component } from 'react';
import '../css/Header.css';

import Filter from './Filter';

class Header extends Component {
  render() {
    const { year, onChangeYear } = this.props;

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
        <div className="header__years">
          {[1, 2, 3, 4, 5].map(el => (
            <span
              key={`${el}-year`}
              className={el === year ? 'header__year-selected' : 'header__year'}
              onClick={() => onChangeYear(el)}
            >
              {el} курс
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default Header;
