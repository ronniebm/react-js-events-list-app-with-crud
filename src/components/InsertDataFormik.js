import React from 'react';
import { Formik, Form, Field } from 'formik';
import DatePicker from "react-datepicker";
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';
import '../styles/InsertDataFormik.css';


const ErrorDiv = ({error}) => <p className="insert-data-formik__error">{error}</p>
const now = moment().hour(0).minute(0);
const format = 'h:mm a';
let myDate = null;

const dropDownOptions = [
  { key: 'Select an option', value: ''},
  { key: 'Option 1', value: 'public'},
  { key: 'Option 2', value: 'private'}
]

const formatDate = (date, time) => {
  let newDate = '';
  newDate += date.getMonth() < 10 ? `0${date.getMonth() + 1}/` : `${date.getMonth()}/`;
  newDate += date.getDate() < 10 ? `0${date.getDate()}/` : `${date.getDate()}/`;
  newDate += `${date.getFullYear()} `;
  newDate += time.hour() < 10 ? `0${time.hour()}:` : `${time.hour()}:`;
  newDate += time.minute() < 10 ? `0${time.minute()}:00` : `${time.minute()}:00`;
  return newDate;
}

export const InsertDataFormik = () => {

  return (
    <div className="insert-data-formik">
      <h4 className="insert-data-formik__title">Create a new Event</h4>
      <Formik
  
        initialValues={{
          event: '',
          location: '',
          hostName: '',
          eventType: '',
          date: '',
          time: ''
        }}
  
        validate={values => {
          const errors = {};
          if (!values.event) {
            errors.event = 'Event name is required';
          }
          if (!values.location) {
            errors.location = 'A location is required';
          }
          if (!values.hostName) {
            errors.hostName = 'A host name is required';
          }
          if (!values.eventType || values.eventType === 'Select event type') {
            errors.eventType = 'Please choose an option';
          }
          if (!values.date) {
            errors.date = 'A date is required';
          }
          if (!values.time) {
            errors.time = 'Time is required';
          }
          return errors;
        }}
  
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue
          /* and other goodies */
        }) => (
  
          <Form>
            <div className="insert-data-formik__field-div">
              <Field type="text" name="event" placeholder="Event name" className="insert-data-formik__field"/>
              {(errors.event && touched.event && errors.event) ? <ErrorDiv error={errors.event}/>: null}
            </div>
  
            <div className="insert-data-formik__field-div">
              <Field type="text" name="location" placeholder="Event location" className="insert-data-formik__field"/>
              {(errors.location && touched.location && errors.location) ? <ErrorDiv error={errors.location}/>: null}
            </div>
  
            <div className="insert-data-formik__field-div">
              <Field type="text" name="hostName" placeholder="Event host name" className="insert-data-formik__field"/>
              {(errors.hostName && touched.hostName && errors.hostName) ? <ErrorDiv error={errors.hostName}/>: null}
            </div>
  
            <div className="insert-data-formik__field-div">
              <Field 
                as="select"
                name="eventType"
                className="insert-data-formik__select"
                options={dropDownOptions}
                placeholder="Please select an option"
              >
                <option defaultValue>Select event type</option>
                <option value="public">public</option>
                <option value="private">private</option>
              </Field>
              {(errors.eventType && touched.eventType && errors.eventType) ? <ErrorDiv error={errors.eventType}/>: null}
            </div>
  
            <div className="insert-data-formik__field-div">
              <DatePicker
                selected={values.date}
                dateFormat="MMMM d, yyyy"
                name="date"
                onChange={date => {setFieldValue('date', date)}}
                placeholderText="Please select a date"
              />
              {(errors.date && touched.date && errors.date) ? <ErrorDiv error={errors.date}/>: null}

              <TimePicker
                placeholder="Please set a time"
                selected={values.time}
                showSecond={false}
                className="xxx"
                name="time"
                onChange={ time => time ? setFieldValue('time', formatDate(values.date, time)) : setFieldValue('time', '')
                }
                format={format}
                use12Hours
                inputReadOnly
              />
              {(errors.time && touched.time && errors.time) ? <ErrorDiv error={errors.time}/>: null}
            </div>
  
            <div className="insert-data-formik__field-div">
              <button type="submit" disabled={isSubmitting} className="insert-data-formik__button">
                Cancel
              </button>
              <button
                type="cancel"
                disabled={isSubmitting}
                className="insert-data-formik__button"
              >
                Save
              </button>
            </div>
  
          </Form>
        )}
  
      </Formik>
    </div>
  )

};