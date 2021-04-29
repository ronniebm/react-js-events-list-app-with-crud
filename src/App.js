import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
// import { InsertData } from './components/InsertData';
import { EditData } from './components/EditData';
import { DeleteData } from './components/DeleteData';
import { Card } from './components/Card';
import { EventToolBar } from './components/EventToolBar';
import axios from 'axios';
import './styles/App.css';
import { InsertDataFormik } from './components/InsertDataFormik';


// const baseUrl = `https://json-server-event-list-testing.herokuapp.com/events/`;
const baseUrl = `http://localhost:3001/events/`;

export const App = () => {

  const [data, setData] = useState([]);
  const [eventsPage, setEventsPage] = useState(1);
  const [inputTextSearch, setInputTextSearch] = useState('');
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
    setEventSelected( prevState => ({...prevState, [name]: value}) )
  }

  // GET request.
  const getRequest = async () => {
    await axios.get(`${baseUrl}?q=${inputTextSearch}&_page=${eventsPage}&_limit=10`)
    .then(response => {
      setData(response.data);
    })
  }

  // POST request.
  const postRequest = async () => {
    if (eventSelected.name !== '') {
      await axios.post(baseUrl, eventSelected)
      .then(response => {
        setData(data.concat(response.data));
      })
    }
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
      //set state apagar spinner
    })
  }

  // DELETE request.
  const deleteRequest = async () => {
    await axios.delete(baseUrl + eventSelected.id)
    .then(response => {
      setData(data.filter(obj => obj.id !== eventSelected.id))
    })
  };

  const selectEvent = (theEvent, mode) => {
    setEventSelected(theEvent);
  };

  useEffect( () => getRequest(), [eventsPage] );
  useEffect( () => postRequest(), [eventSelected] );

  return (
    <Router>
      <div className="app">
        <Switch>

          <Route path="/new">
            {/* <InsertData
                handleChange={handleChange}
                postRequest={postRequest}
            /> */}

            <InsertDataFormik
              handleChange={handleChange}
              setEventSelected={setEventSelected}
            />
          </Route>


          <Route path="/edit/:eventId">
            <EditData
                handleChange={handleChange}
                putRequest={putRequest}
                eventSelected={eventSelected}
            />
          </Route>


          <Route path="/delete">
            <DeleteData
                deleteRequest={deleteRequest}
                eventSelected={eventSelected}
              />
          </Route>
  
  
          <Route exact ={true} path="/">
            <EventToolBar 
              inputTextSearch={inputTextSearch}
              setInputTextSearch={setInputTextSearch}
              getRequest={getRequest}
              eventsPage={eventsPage}
              setEventsPage={setEventsPage}
            />

            {data.map(obj => (
            <Card 
              key={obj.id}
              name={obj.name} location={obj.location} hostname={obj.hostname}
              type={obj.type} date={obj.date} id={obj.id} obj={obj}
              selectEvent={selectEvent}
              />
            ))}
          </Route>

        </Switch>
      </div>
    </Router>
  )
}
