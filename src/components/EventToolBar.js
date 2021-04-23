import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/EventToolBar.css';


export const EventToolBar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar__wrapper">
        <h2 className="toolbar__title">Event Register APP</h2>
        <div className="toolbar__container">
          <Link to="/new">
            <button className="toolbar__container__button" >+</button>
          </Link>
          <input className="toolbar__container__search js-search" type="text" name="name" placeholder="Search an event" />
        </div>
      </div>
    </div>
  )
}
