import React from 'react';
import '../styles/Card.css'

export const Card = ({id, name, location, hostname, type, date, obj, selectEvent, openCloseEditData, openCloseDeleteData}) => {
  return (
    <div className="card">
        <div className="card__header">
          <span className="card__header__type">{type}</span>
          <span className="card__header__date">{date}</span>
        </div>
        <div className="card__body">
          <p className="card__body__event-name">{name}</p>
          <p className="card__body__location">{location}</p>
          <p className="card__body__host-name">{hostname}</p>
        </div>
        <div className="card__footer">
          <button className="card__footer__delete" onClick={() => { selectEvent(obj, 'delete'); }} >delete</button>
          <button className="card__footer__edit" onClick={() => { selectEvent(obj, 'edit'); }} >edit</button>
        </div>
    </div>
  )
}
