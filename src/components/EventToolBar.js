import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/EventToolBar.css';


export const EventToolBar = ({inputTextSearch, setInputTextSearch, getRequest}) => {

  let typingTimer;                //timer identifier
  let doneTypingTime = 500;  //time in ms, 2 seconds.

  const handleInputTextSearch = (e) => {
    setInputTextSearch( e.target.value );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const keyDown = () => {
    clearTimeout(typingTimer);
  }

  const delayGetRequest = () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(getRequest, doneTypingTime);
  }
  
  return (
    <div className="toolbar">
      <div className="toolbar__wrapper">
        <h2 className="toolbar__title">Event Register APP</h2>
        <div className="toolbar__container">
          <Link to="/new">
            <button className="toolbar__container__button" >+</button>
          </Link>
          <form
            onSubmit={ handleSubmit }
            className="toolbar__container__form"
            >
            <input
              value = { inputTextSearch }
              onChange = { handleInputTextSearch }
              onKeyDown = { keyDown }
              onKeyUp = { delayGetRequest }
              className="toolbar__container__search js-search" 
              type="text"
              name="name"
              placeholder="Search an event"/>
          </form>
        </div>
      </div>
    </div>
  )
}
