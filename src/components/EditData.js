import React from 'react';
import {Link, useParams} from 'react-router-dom';
import '../styles/EditData.css'

export const EditData = ({openCloseEditData, handleChange, putRequest, eventSelected, data}) => {
  let eventId = Number(useParams().eventId);
  if(eventSelected.id === ''){
    eventSelected = data[eventId - 1];
  }
  return (
    <div className="edit-fields">
      <div className="edit-fields__wrapper">
        <h3>Edit the event</h3>
        <div><input onChange={handleChange} className="edit-fields__all edit-fields__name" type="text" name="name" placeholder="Event name" value={eventSelected && eventSelected.name}/></div>
        <div><input onChange={handleChange} className="edit-fields__all edit-fields__location" type="text" name="location" placeholder="Location" value={eventSelected && eventSelected.location}/></div>
        <div><input onChange={handleChange} className="edit-fields__all edit-fields__hostname" type="text" name="hostname" placeholder="Hostname" value={eventSelected && eventSelected.hostname}/></div>
        <div><input onChange={handleChange} className="edit-fields__all edit-fields__field" type="text" name="type" placeholder="Event type" value={eventSelected && eventSelected.type}/></div>
        <div><input onChange={handleChange} className="edit-fields__all edit-fields__field" type="text" name="date" placeholder="date" value={eventSelected && eventSelected.date}/></div>
        <Link to="/">
          <button className="edit-fields__buttons" onClick={()=>openCloseEditData()}>Cancel</button>
          <button className="edit-fields__buttons" onClick={()=>putRequest()}>Save</button>
        </Link>
      </div>
    </div>
  )
}
