import React, { Component } from 'react';
import Tabletop from 'tabletop';
import loadingImg from '../images/giphy.gif';
import { getIDFromTitle } from '../lib';

import Header from './Header';
import Course from './Course';

const url =
  'https://docs.google.com/spreadsheets/d/1UH7TQzknOEl8BWdSIgfMSopAjVKusStcZ3_J27L6VkE/edit?usp=sharing';

class App extends Component {
  state = { courses: [], teachers: [], tasks: [], opened: '', filtered: null };

  componentDidMount() {
    Tabletop.init({
      key: url,
      callback: (data, tabletop) => {
        this.setState({
          courses: data.Courses.elements,
          filtered: data.Courses.elements,
          teachers: data.Teachers.elements,
          tasks: data.Tasks.elements
        });
      }
    });
  }

  _onToggleOpen = id => this.setState({ opened: id });

  _onChangeFilter = (type, value) => {
    const { courses } = this.state;

    if (value === 'all') {
      return this.setState({ filtered: courses.concat(), opened: '' });
    }

    const filtered = courses.filter(
      c => (type === 'teacher' ? c.Teacher === value : c.Title === value)
    );

    this.setState({
      filtered,
      opened: filtered.length === 1 ? getIDFromTitle(filtered[0].Title) : ''
    });
  };

  render() {
    const { courses, teachers, tasks, opened, filtered } = this.state;

    return (
      <div>
        <Header
          courses={courses}
          teachers={teachers}
          onChangeFilter={this._onChangeFilter}
        />
        {filtered && filtered.length > 0 ? (
          filtered.map(course => (
            <Course
              key={JSON.stringify(course)}
              id={getIDFromTitle(course.Title)}
              open={opened === course.Title.replace(/\s/g, '-').toLowerCase()}
              toggleOpen={this._onToggleOpen}
              title={course.Title}
              type={course.Type}
              tasks={tasks.filter(task => task.Course === course.Title)}
              teacher={
                teachers.find(teacher => teacher.Name === course.Teacher) ||
                null
              }
            />
          ))
        ) : (
          <div className="loading">
            <div>loading...</div>
            <img src={loadingImg} width={300} alt="loading..." />
          </div>
        )}
      </div>
    );
  }
}

export default App;
