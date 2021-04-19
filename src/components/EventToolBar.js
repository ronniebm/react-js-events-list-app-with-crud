import React from 'react';
import '../styles/EventToolBar.css'


export const EventToolBar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar__wrapper">
        <h2 className="toolbar__title">Event Register APP</h2>
        <div className="toolbar__container">
          <button className="toolbar__container__button">+</button>
          <input className="toolbar__container__search" type="text" name="name" placeholder="Search an event" />
        </div>
      </div>
    </div>
  )
}
