import React, {useState} from 'react';
import '../styles/EventToolBar.css';

export const EventToolBar = ({openCloseInsertData}) => {

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit hecho')
  }

  return (
    <div className="toolbar">
      <div className="toolbar__wrapper">
        <h2 className="toolbar__title">Event Register APP</h2>
        <div className="toolbar__container">
          <button className="toolbar__container__button" onClick={()=>openCloseInsertData()}>+</button>
          <form onSubmit={handleSubmit} >
            <input 
              className="toolbar__container__search js-search" 
              type="text" 
              name="name" 
              placeholder="Search an event"
              value={ inputValue }
              onChange={ handleInputChange }
            />
          </form>
        </div>
      </div>
    </div>
  )

}
