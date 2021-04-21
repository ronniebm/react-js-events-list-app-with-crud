import React from 'react';
import '../styles/EventToolBar.css';


export const EventToolBar = ({openCloseInsertData}) => {
  return (
    <div className="toolbar">
      <div className="toolbar__wrapper">
        <h2 className="toolbar__title">Event Register APP</h2>
        <div className="toolbar__container">
          <button className="toolbar__container__button" onClick={()=>openCloseInsertData()}>+</button>
          <input className="toolbar__container__search js-search" type="text" name="name" placeholder="Search an event" />
        </div>
      </div>
    </div>
  )
}
