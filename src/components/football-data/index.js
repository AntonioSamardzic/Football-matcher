/** @format */

import React, { Component } from 'react';
import './index.css';
const classNames = require('classnames');

export default class FootballMatchesData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      data: [],
    };
  }

  getYear = () => {
    const { selectedYear } = this.state;
    fetch(
      `https://jsonmock.hackerrank.com/api/football_competitions?year=${selectedYear}`
    )
      .then((response) => response.json())
      .then((years) => {
        this.setState({ data: years.data });
      });
  };

  onClick = (year) => {
    // Code written in next line is to take care of adding active class to selected year for css purpose.
    this.setState({
      selectedYear: year,
    });
  };

  render() {
    const { data } = this.state;
    const { selectedYear } = this.state;
    const years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    return (
      <div className='layout-row'>
        <div className='section-title'>Select Year</div>
        <ul className='sidebar' data-testid='year-list'>
          {years.map((year) => {
            return (
              <li
                className={classNames({
                  'sidebar-item': true,
                  active: selectedYear === year,
                })}
                onMouseDown={() => this.onClick(year)}
                onMouseUp={this.getYear}
                key={year}>
                <a>{year}</a>
              </li>
            );
          })}
        </ul>

        <section className='content'>
          {(data && data.length) > 0 ? (
            <section>
              <div className='total-matches' data-testid='total-matches'>
                Total matches: {data.length}
              </div>
              {data.map((data, index) => {
                return (
                  <ul
                    className='mr-20 matches styled'
                    data-testid='match-list'
                    key={index}>
                    <li className='slide-up-fade-in'>{` Match ${data.name} won by ${data.winner}`}</li>
                  </ul>
                );
              })}
            </section>
          ) : selectedYear === null ? (
            ''
          ) : (
            <div data-testid='no-result' className='slide-up-fade-in no-result'>
              <h4>No Matches Found</h4>
            </div>
          )}
        </section>
      </div>
    );
  }
}
