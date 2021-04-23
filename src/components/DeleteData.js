import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import '../styles/DeleteData.css'

export const DeleteData = ({ deleteRequest, eventSelected}) => {

  const [deleteMenu, setDeleteMenu] = useState(false);

  const openCloseDeleteData = () => {
    setDeleteMenu(!deleteMenu);
  }

  return (
    <div className="delete-fields">
      <div className="delete-fields__wrapper">
        <p>Do you want to delete the event: <br/><br/><b>{eventSelected && eventSelected.name}</b> ?</p>
        <Link to="/">
          <button className="delete-fields__buttons" onClick={()=>openCloseDeleteData()}>Cancel</button>
          <button className="delete-fields__buttons" onClick={()=>deleteRequest() && openCloseDeleteData()}>Delete</button>
        </Link>
      </div>
    </div>
  )
}
