import React from 'react';
import '../styles/MyPaginator.css';

export const MyPaginator = ({ eventsPage, setEventsPage }) => {

  const nextPage = () => {
    setEventsPage( currentPage => (currentPage + 1));
  }

  const prevPage = () => {
    (eventsPage > 1) ? setEventsPage( currentPage => (currentPage - 1)) : setEventsPage(1);
  }

  return (
    <div className="my-paginator">
      <div className="my-paginator__buttons">
      <p className="my-paginator__page">Page: {eventsPage}</p>
        <button 
          className="my-paginator__buttons__button"
          onClick={ ()=>prevPage() }
        >Prev</button>
        <button 
          className="my-paginator__buttons__button"
          onClick={ ()=>nextPage() }
        >Next</button>
      </div>
    </div>
  )
}
