import React, {useEffect, useState} from 'react';
import { InsertData } from './components/InsertData';
import { EditData } from './components/EditData';
import { DeleteData } from './components/DeleteData';
import { Card } from './components/Card';
import { EventToolBar } from './components/EventToolBar';
import './styles/App.css';
import axios from 'axios';


const baseUrl = `http://localhost:3001/events/`;


export const App = () => {

  const [data, setData] = useState([]);
  const [insertMenu, setInsertMenu] = useState(false);
  const [editMenu, setEditMenu] = useState(false);
  const [deleteMenu, setDeleteMenu] = useState(false);
  const [eventSelected, setEventSelected] = useState({
    id: '',
    name: '',
    location: '',
    hostname: '',
    type: '',
    date: ''
  })

  const handleChange = e => {
    const {name, value} = e.target;
    setEventSelected(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  // GET request.
  const getRequest = async () => {
    await axios.get(baseUrl)
    .then(response =>{
      setData(response.data);
    })
  }

  // POST request.
  const postRequest = async () => {
    await axios.post(baseUrl, eventSelected)
    .then(response => {
      setData(data.concat(response.data))
      openCloseInsertData()
    })
  }

  // PUT request.
  const putRequest = async () => {
    //setstate para activar spinner
    await axios.put(baseUrl + eventSelected.id, eventSelected)
    .then(response => {
      var newData = data.map(obj => {
        if(eventSelected.id === obj.id) {
          obj = {...response.data};
        }
        return obj;
      })
      setData(newData);
      openCloseEditData();
      //set state apagar spinner
    })
  }

  // DELETE request.
  const deleteRequest = async () => {
    await axios.delete(baseUrl + eventSelected.id)
    .then(response => {
      setData(data.filter(obj => obj.id !== eventSelected.id))
      openCloseDeleteData()
    })
  }

  const openCloseInsertData = () => {
    setInsertMenu(!insertMenu);
  }

  const openCloseEditData = () => {
    setEditMenu(!editMenu);
  }

  const openCloseDeleteData = () => {
    setDeleteMenu(!deleteMenu);
  }

  const selectEvent = (theEvent, mode) => {
    setEventSelected(theEvent);
    (mode === 'edit') ? openCloseEditData() : openCloseDeleteData();
  };

  useEffect( () => {
    getRequest();
  },[])


  return (
    <div className="app">

      <EventToolBar openCloseInsertData={openCloseInsertData} />

      {
        insertMenu ? <InsertData
                        openCloseInsertData={openCloseInsertData}
                        handleChange={handleChange}
                        postRequest={postRequest}
                     /> : null
      }

      {
        editMenu ? <EditData
                      openCloseEditData={openCloseEditData}
                      handleChange={handleChange}
                      putRequest={putRequest}
                      eventSelected={eventSelected}
                   /> : null
      }

      {
        deleteMenu ? <DeleteData
                      openCloseDeleteData={openCloseDeleteData}
                      deleteRequest={deleteRequest}
                      eventSelected={eventSelected}
                   /> : null
      }

      {data.map(obj => (
        <Card 
          key={obj.id}
          name={obj.name} location={obj.location} hostname={obj.hostname}
          type={obj.type} date={obj.date} obj={obj} selectEvent={selectEvent} 
          openCloseEditData={openCloseEditData}
          openCloseDeleteData={openCloseDeleteData}/>
      ))}

    </div>
  )
}
