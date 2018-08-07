import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import './FullCalendar.css';

class FullCalendar extends Component {
  state = {
    year: moment().year(),
    month: moment().month()
  };

  getCurrentMonth() {
    return moment()
      .year(this.state.year)
      .month(this.state.month);
  }

  onPrevClick() {
    const prevMonth = this.getCurrentMonth().subtract(1, 'months');
    this.setState({ year: prevMonth.year(), month: prevMonth.month() });
  }

  onNextClick() {
    const nextMonth = this.getCurrentMonth().add(1, 'months');
    this.setState({ year: nextMonth.year(), month: nextMonth.month() });
  }

  renderCalendarBody() {
    const currentMonth = this.getCurrentMonth();
    const startOfMonth = moment(currentMonth).startOf('month');
    const endOfMonth = moment(currentMonth).endOf('month');
    const dayOfStartOfMonth = startOfMonth.weekday();
    const dayOfEndOfMonth = endOfMonth.weekday();

    const startOfCalendar = startOfMonth.subtract(dayOfStartOfMonth, 'days');
    const endOfCalendar = endOfMonth.add(6 - dayOfEndOfMonth, 'days');

    let datesHTML = `
      <div class="calendar-weekday">
        <span>일</span>
      </div>
      <div class="calendar-weekday">
        <span>월</span>
      </div>
      <div class="calendar-weekday">
        <span>화</span>
      </div>
      <div class="calendar-weekday">
        <span>수</span>
      </div>
      <div class="calendar-weekday">
        <span>목</span>
      </div>
      <div class="calendar-weekday">
        <span>금</span>
      </div>
      <div class="calendar-weekday">
        <span>토</span>
      </div>
      `;

    for (
      let date = startOfCalendar;
      date <= endOfCalendar;
      date.add(1, 'days')
    ) {
      let className = 'calendar-dates';
      if (currentMonth.month() > date.month()) className += ' prevMonth';
      if (currentMonth.month() < date.month()) className += ' nextMonth';
      datesHTML += `
        <div class="${className}">
          <div class="date-wrapper">
            <span class="date">${date.format('D')}</span>
            <span class="weekday">${date.format('(ddd)')}</span>
          </div>
        </div>
        `;
    }

    return datesHTML;
  }

  render() {
    const { year, month } = this.state;
    return (
      <div className="calendar">
        <div className="calendar-header">
          <IconButton onClick={this.onPrevClick.bind(this)}>
            <Icon>navigate_before</Icon>
          </IconButton>
          <span className="calendar-month">
            {year}년 {month + 1}월
          </span>
          <IconButton onClick={this.onNextClick.bind(this)}>
            <Icon>navigate_next</Icon>
          </IconButton>
        </div>
        <div
          className="calendar-body"
          dangerouslySetInnerHTML={{ __html: this.renderCalendarBody() }}
        />
      </div>
    );
  }
}

export default FullCalendar;
