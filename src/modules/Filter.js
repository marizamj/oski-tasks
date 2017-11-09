import React, { Component } from 'react';
import '../css/Filter.css';

const filters = [
  { title: 'По предмету', value: 'course' },
  { title: 'По преподавателю', value: 'teacher' }
];

class Filter extends Component {
  state = { firstSelect: 'course' };

  render() {
    const { firstSelect } = this.state;
    const { courses, teachers, onChangeFilter } = this.props;

    return (
      <div className="filter">
        <div>Поиск:</div>
        <div>
          <select
            className="filter__select"
            onChange={e => {
              onChangeFilter('', 'all');
              this.setState({ firstSelect: e.target.value });
            }}
          >
            {filters.map(f => (
              <option key={f.value} value={f.value}>
                {f.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="filter__select"
            onChange={e => onChangeFilter(firstSelect, e.target.value)}
          >
            <option value="all">Показать все</option>
            {firstSelect === 'teacher'
              ? teachers.map(teacher => (
                  <option key={teacher.Name} value={teacher.Name}>
                    {teacher.Name}
                  </option>
                ))
              : courses.map(course => (
                  <option key={course.Title} value={course.Title}>
                    {course.Title}
                  </option>
                ))}
          </select>
        </div>
      </div>
    );
  }
}

export default Filter;
