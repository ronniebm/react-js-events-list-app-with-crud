import React from 'react';
import '../styles/MyPaginator.css';

export const MyPaginator = ({ eventsPage, setEventsPage, getRequest }) => {

  const nextPage = () => {
    setEventsPage( currentPage => (currentPage + 1));
    getRequest();
    console.log('next page was pressed !');
  }

  const prevPage = () => {
    setEventsPage( actualPage => (actualPage - 1));
    console.log('prev page was pressed !');
    getRequest();
  }

  return (
    <div className="my-paginator">
      <div className="my-paginator__buttons">
      <p className="my-paginator__page">Page: {eventsPage}</p>
        <button 
          className="my-paginator__buttons__button"
          onClick={ prevPage }
        >Prev</button>
        <button 
          className="my-paginator__buttons__button"
          onClick={ nextPage }
        >Next</button>
      </div>
    </div>
  )
}
