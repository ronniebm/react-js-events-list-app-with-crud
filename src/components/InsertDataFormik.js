import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import DatePicker from "react-datepicker";
import TimePicker from 'rc-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';
import '../styles/InsertDataFormik.css';


const ErrorDiv = ({error}) => <p className="insert-data-formik__error">{error}</p>
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

export const InsertDataFormik = ({setEventSelected, setPostStatus}) => {

  const history = useHistory()

  return (
    <div className="insert-data-formik">
      <h4 className="insert-data-formik__title">Create a new Event</h4>
      <Formik
        initialValues={{
          name: '',
          location: '',
          hostname: '',
          type: '',
          datepicker: '',
          date: ''
        }}

        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Event name is required';
          }
          if (!values.location) {
            errors.location = 'A location is required';
          }
          if (!values.hostname) {
            errors.hostname = 'A host name is required';
          }
          if (!values.type || values.type === 'Select event type') {
            errors.type = 'Please choose an option';
          }
          if (!values.datepicker) {
            errors.datepicker = 'A date is required';
          }
          if (!values.date) {
            errors.date = 'Time is required';
          }
          return errors;
        }}

        onSubmit={(values, { setSubmitting }) => {
          delete values.datepicker;
          setEventSelected(values);
          setPostStatus('post');
          setSubmitting(false);
          history.push('/');
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
              <Field type="text" name="name" placeholder="Event name" className="insert-data-formik__field"/>
              {(errors.name && touched.name && errors.name) ? <ErrorDiv error={errors.name}/>: null}
            </div>
  
            <div className="insert-data-formik__field-div">
              <Field type="text" name="location" placeholder="Event location" className="insert-data-formik__field"/>
              {(errors.location && touched.location && errors.location) ? <ErrorDiv error={errors.location}/>: null}
            </div>
  
            <div className="insert-data-formik__field-div">
              <Field type="text" name="hostname" placeholder="Event host name" className="insert-data-formik__field"/>
              {(errors.hostname && touched.hostname && errors.hostname) ? <ErrorDiv error={errors.hostname}/>: null}
            </div>
  
            <div className="insert-data-formik__field-div">
              <Field 
                as="select"
                name="type"
                className="insert-data-formik__select"
                options={dropDownOptions}
                placeholder="Please select an option"
              >
                <option defaultValue>Select event type</option>
                <option value="public">public</option>
                <option value="private">private</option>
              </Field>
              {(errors.type && touched.type && errors.type) ? <ErrorDiv error={errors.type}/>: null}
            </div>
  
            <div className="insert-data-formik__field-div">
              <DatePicker
                className="insert-data-formik__date-picker"
                selected={values.datepicker}
                dateFormat="MMMM d, yyyy"
                name="datepicker"
                onChange={datepicker => {
                  setFieldValue('datepicker', datepicker);
                  if(myDate) {setFieldValue('date', formatDate(datepicker, myDate))};
                  }
                }
                placeholderText="Please select a date"
              />
              {(errors.datepicker && touched.datepicker && errors.datepicker) ? <ErrorDiv error={errors.datepicker}/>: null}
            </div>

            <div className="insert-data-formik__field-div">
              <TimePicker
                className="insert-data-formik__time-picker"
                placeholder="Please set a time"
                selected={values.date}
                showSecond={false}
                minuteStep={15}
                name="date"
                onChange={ date => {
                  if(date) {
                    setFieldValue('date', formatDate(values.datepicker, date));
                    myDate = date;
                  } else {
                    setFieldValue('date', '');
                  };
                }
                }
                format={format}
                use12Hours
                inputReadOnly
              />
              {(errors.date && touched.date && errors.date) ? <ErrorDiv error={errors.date}/>: null}
            </div>
  
            <div className="insert-data-formik__field-div">
              <Link to="/">
              <button type="cancel" disabled={isSubmitting} className="insert-data-formik__button">
                Cancel
              </button>
              </Link>

              <button
                type="submit"
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