import React, { Component } from 'react';
import '../css/Info.css';

class Info extends Component {
  render() {
    return (
      <div>
        <div className="info">
          <a
            target="_blank"
            href="https://drive.google.com/open?id=1FGcZ_MD9fQMQBmmR16eOr9R2w9guxflZ"
          >
            Учебный план
          </a>
        </div>
        <div className="info">
          Контакты кафедры:
          <div className="info__subdiv">
            <a href="tel:74952506563">74952506563</a>
            <a href="mailto:oski.dekanat@rggu.ru">oski.dekanat@rggu.ru</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;
