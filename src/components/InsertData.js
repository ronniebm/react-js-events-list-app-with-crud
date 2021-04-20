import React from 'react';
import '../styles/InsertData.css'

export const InsertData = ({openCloseInsertData, handleChange, postRequest}) => {
  return (
    <div className="fields">
      <div className="fields__wrapper">
        <h3>Create new Event</h3>
        <div><input onChange={handleChange} className="fields__all fields__name" type="text" name="name" placeholder="Event name" /></div>
        <div><input onChange={handleChange} className="fields__all fields__location" type="text" name="location" placeholder="Location" /></div>
        <div><input onChange={handleChange} className="fields__all fields__hostname" type="text" name="hostname" placeholder="Hostname" /></div>
        <div><input onChange={handleChange} className="fields__all fields__field" type="text" name="type" placeholder="Event type" /></div>
        <div><input onChange={handleChange} className="fields__all fields__field" type="text" name="date" placeholder="date" /></div>
        <button className="fields__buttons" onClick={()=>openCloseInsertData()}>Cancel</button>
        <button className="fields__buttons" onClick={()=>postRequest()}>Save</button>
      </div>
    </div>
  )
}