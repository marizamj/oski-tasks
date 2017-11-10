import React, { Component } from 'react';
import '../css/Course.css';
import { Collapse } from 'react-collapse';
import Task from './Task';

const contacts = [
  {
    type: 'Email',
    prefix: 'mailto:',
    iconClass: 'fa fa-envelope teacher-contact'
  },
  { type: 'Phone', prefix: 'tel:', iconClass: 'fa fa-phone teacher-contact' }
];

class Course extends Component {
  render() {
    const { id, title, tasks, teacher, open } = this.props;

    return (
      <div className="course" lang="ru" id={id}>
        <div
          className={open ? 'course__title' : 'course__title-closed'}
          onClick={() => this.props.toggleOpen(open ? '' : this.props.id)}
        >
          <span className="course__title__text">{title}</span>
          <span className="course__title__btn">
            <i
              className={!open ? 'fa fa-plus' : 'fa fa-minus'}
              aria-hidden="true"
            />
          </span>
        </div>
        <Collapse isOpened={open}>
          <div className="course__content">
            <div className="course__content__teacher">
              <div className="course__content__teacher__name">
                {teacher.Name}
              </div>
              {contacts.map(
                contact =>
                  teacher[contact.type] ? (
                    <div
                      key={teacher[contact.type]}
                      className="course__content__teacher__contact"
                    >
                      <a
                        href={`${contact.prefix}${teacher[contact.type]}`}
                        aria-hidden="true"
                      >
                        {teacher[contact.type]}
                      </a>
                    </div>
                  ) : null
              )}
            </div>
            {tasks && tasks.length > 0 ? (
              <ul className="course__content__tasks">
                {tasks.map(task => (
                  <Task key={JSON.stringify(task)} task={task} />
                ))}
              </ul>
            ) : (
              <ul className="course__content__tasks">(пока ничего)</ul>
            )}
          </div>
        </Collapse>
      </div>
    );
  }
}

export default Course;
