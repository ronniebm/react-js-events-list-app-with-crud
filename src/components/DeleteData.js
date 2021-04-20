import React from 'react';
import '../styles/DeleteData.css'

export const DeleteData = ({openCloseDeleteData, deleteRequest, eventSelected}) => {
  return (
    <div className="delete-fields">
      <div className="delete-fields__wrapper">
        <p>Do you want to delete the event: <br/><br/><b>{eventSelected && eventSelected.name}</b> ?</p>
        <button className="delete-fields__buttons" onClick={()=>openCloseDeleteData()}>Cancel</button>
        <button className="delete-fields__buttons" onClick={()=>deleteRequest()}>Delete</button>
      </div>
    </div>
  )
}
