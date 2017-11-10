import React, { Component } from 'react';
import '../css/Task.css';
import { parseColors } from '../lib';
import marked from 'marked';

class Task extends Component {
  componentDidMount() {
    const { Description } = this.props.task;
    this.descriptionEl.innerHTML = parseColors(marked(Description));
  }

  render() {
    const { Deadline } = this.props.task;

    return (
      <li className="task">
        {Deadline ? (
          <div className="task__deadline">Дедлайн: {Deadline}</div>
        ) : null}
        <div
          className="task__description"
          ref={el => (this.descriptionEl = el)}
        />
      </li>
    );
  }
}

export default Task;
