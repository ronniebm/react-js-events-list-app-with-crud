import React from 'react';
import { Formik, Form, Field } from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../styles/InsertDataFormik.css';

const ErrorDiv = ({error}) => {
  return(
    <p className="insert-data-formik__error">{error}</p>
  )
}

const dropDownOptions = [
  { key: 'Select an option', value: ''},
  { key: 'Option 1', value: 'public'},
  { key: 'Option 2', value: 'private'}
]

export const InsertDataFormik = () => (

  <div className="insert-data-formik">
    <h4 className="insert-data-formik__title">Create a new Event</h4>
    <Formik

      initialValues={{
        event: '',
        location: '',
        hostName: '',
        eventType: '',
        date: '',
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
        if (!values.eventType) {
          errors.eventType = 'Please choose an option';
        }
        console.log(values.eventType);
        if (!values.date) {
          errors.date = 'A date is required';
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
            <Field as="select" name="eventType" className="insert-data-formik__select" options={dropDownOptions}>
              <option value=""></option>
              <option value="public">public</option>
              <option value="private">private</option>
            </Field>
            {(errors.eventType && touched.eventType && errors.eventType) ? <ErrorDiv error={errors.eventType}/>: null}
          </div>

          <div className="insert-data-formik__field-div">
            <Field type="text" name="date" placeholder="Event's date" className="insert-data-formik__field"/>
            {(errors.date && touched.date && errors.date) ? <ErrorDiv error={errors.date}/>: null}
          </div>

          <DatePicker name="my-date" />

          <div className="insert-data-formik__field-div">
            <button type="submit" disabled={isSubmitting} className="insert-data-formik__button">
              Cancel
            </button>
            <button type="cancel" disabled={isSubmitting} className="insert-data-formik__button">
              Save
            </button>
          </div>

        </Form>
      )}

    </Formik>
  </div>
);