import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { InsertData } from './components/InsertData';
import { EditData } from './components/EditData';
import { DeleteData } from './components/DeleteData';
import { Card } from './components/Card';
import { EventToolBar } from './components/EventToolBar';
import axios from 'axios';
import './styles/App.css';


// const baseUrl = `https://json-server-event-list-testing.herokuapp.com/events/`;
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
    <Router>

      <div className="app">

        {
          insertMenu ? <InsertData
                          openCloseInsertData={openCloseInsertData}
                          handleChange={handleChange}
                          postRequest={postRequest}
                      /> : null
        }

        {
          deleteMenu ? <DeleteData
                        openCloseDeleteData={openCloseDeleteData}
                        deleteRequest={deleteRequest}
                        eventSelected={eventSelected}
                    /> : null
        }

        

        <Switch>

          <Route path="/create">
            ...
          </Route>

          <Route path="/edit/:eventId">
            <EditData
                openCloseEditData={openCloseEditData}
                handleChange={handleChange}
                putRequest={putRequest}
                eventSelected={eventSelected}
                setEventSelected={setEventSelected}
                data={data}
            />
          </Route>

          <Route path="/delete">
            ...
          </Route>

          <Route exact ={true} path="/">

            <EventToolBar openCloseInsertData={openCloseInsertData} />
            {data.map(obj => (
            <Card 
              key={obj.id}
              name={obj.name} location={obj.location} hostname={obj.hostname}
              type={obj.type} date={obj.date} id={obj.id} obj={obj}
              selectEvent={selectEvent} openCloseEditData={openCloseEditData}
              openCloseDeleteData={openCloseDeleteData}/>
            ))}
          </Route>

        </Switch>

      </div>
    </Router>
  )
}
