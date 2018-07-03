import React, { Component } from 'react';
import Tabletop from 'tabletop';
import loadingImg from '../images/giphy.gif';
import { getIDFromTitle } from '../lib';

import Header from './Header';
import Course from './Course';

const url =
  'https://docs.google.com/spreadsheets/d/1UH7TQzknOEl8BWdSIgfMSopAjVKusStcZ3_J27L6VkE/edit?usp=sharing';

class App extends Component {
  state = {
    courses: [],
    teachers: [],
    tasks: [],
    opened: '',
    filtered: null,
    year: 5,
    loading: true
  };

  componentDidMount() {
    Tabletop.init({
      key: url,
      callback: (data, tabletop) => {
        const thisYearCourses = data.Courses.elements.filter(
          c => Number(c.Year) === this.state.year
        );

        this.setState({
          allCourses: data.Courses.elements,
          courses: thisYearCourses,
          filtered: thisYearCourses,
          teachers: data.Teachers.elements,
          tasks: [
            ...data.Tasks3.elements,
            ...data.Tasks4.elements,
            ...data.Tasks5.elements
          ],
          loading: false
        });
      }
    });
  }

  _onToggleOpen = id => this.setState({ opened: id });

  _onChangeYear = year => {
    if (!this.state.loading) {
      this.setState({
        year,
        courses: this.state.allCourses.filter(c => Number(c.Year) === year),
        filtered: this.state.allCourses.filter(c => Number(c.Year) === year),
        opened: ''
      });
    }
  };

  _onChangeFilter = (type, value) => {
    const { courses, year } = this.state;

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
    const {
      courses,
      teachers,
      tasks,
      opened,
      filtered,
      year,
      loading
    } = this.state;

    return (
      <div>
        <Header
          year={year}
          courses={courses}
          teachers={teachers}
          onChangeFilter={this._onChangeFilter}
          onChangeYear={this._onChangeYear}
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
            <div>
              {loading ? 'loading...' : 'ничего нет. куда подевалось?..'}
            </div>
            {loading && <img src={loadingImg} width={300} alt="loading..." />}
          </div>
        )}
      </div>
    );
  }
}

export default App;
