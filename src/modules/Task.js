import React, { Component } from 'react';
import '../css/Task.css';
import { applyFormatting } from '../lib';

class Task extends Component {
  componentDidMount() {
    const { Description } = this.props.task;
    this.descriptionEl.innerHTML = applyFormatting(Description, [
      'markdown',
      'colors',
      'targetBlank'
    ]);
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
