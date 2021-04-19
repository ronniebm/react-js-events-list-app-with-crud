import React from 'react';
import '../styles/Card.css'

export const Card = () => {
  return (
    <div className="card">
        <div className="card__header">
          <span className="card__header__num"># 1</span>
          <span className="card__header__type">public</span>
          <span className="card__header__date">30/04/2021 @2:30:35 pm</span>
        </div>
        <div className="card__body">
          <p className="card__body__event-name">The big React JS event</p>
          <p className="card__body__location">03936 Lake Park, FL</p>
          <p className="card__body__host-name">Ronnie B.M.</p>
        </div>
        <div className="card__footer">
          <button className="card__footer__delete">delete</button>
          <button className="card__footer__edit">edit</button>
        </div>
    </div>
  )
}
