import React, { Component } from 'react';
import moment from 'moment';

class FullCalendar extends Component {
  state = {
    year: moment().year(),
    month: moment().month()
  }

  getCurrentMonth() {
    return moment().year(this.state.year).month(this.state.month);
  }

  onPrevClick() {
    const prevMonth = this.getCurrentMonth().subtract(1, 'months');
    this.setState({ year: prevMonth.year(), month: prevMonth.month() })
  }

  onNextClick() {
    const nextMonth = this.getCurrentMonth().add(1, 'months');
    this.setState({ year: nextMonth.year(), month: nextMonth.month() })
  }

  renderCalendarBody() {
    const currentMonth = this.getCurrentMonth();
    const startOfMonth = currentMonth.set('date', 1);
    const endOfMonth = currentMonth.endOf('month');
    console.log('startOfMonth::', startOfMonth);
    console.log('endOfMonth::', endOfMonth);
  }

  render() {
    const { year, month } = this.state;
    return (
      <div className="calendar">
        <div className="calendar-header">
          <button
            onClick={this.onPrevClick.bind(this)}
          >prev</button>
          <span>{year}년 {month + 1}월</span>
          <button
            onClick={this.onNextClick.bind(this)}
          >next</button>
        </div>
        <div className="calendar-body">
          {this.renderCalendarBody()}
        </div>
      </div>
    )
  }
}

export default FullCalendar;
