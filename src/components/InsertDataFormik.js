import React from 'react';
import { Formik, Form, Field } from 'formik';
import '../styles/InsertDataFormik.css';

const ErrorDiv = ({error}) => {
  return(
    <p className="insert-data-formik__error">{error}</p>
  )
}

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
          errors.eventType = 'Expected "public" or "private"';
        }
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
          <div>
            <Field type="text" name="event" placeholder="Event name" className="insert-data-formik__field"/>
            {(errors.event && touched.event && errors.event) ? <ErrorDiv error={errors.event}/>: null}
          </div>

          <div><Field type="text" name="location" placeholder="Event location"/></div>
          {(errors.location && touched.location && errors.location) ? <ErrorDiv error={errors.location}/>: null}

          <div><Field type="text" name="hostName" placeholder="Event host name"/></div>
          {(errors.hostName && touched.hostName && errors.hostName) ? <ErrorDiv error={errors.hostName}/>: null}

          <div><Field type="text" name="eventType" placeholder='"public" or "private"'/></div>
          {(errors.eventType && touched.eventType && errors.eventType) ? <ErrorDiv error={errors.eventType}/>: null}

          <div><Field type="text" name="date" placeholder="Event's date"/></div>
          {(errors.date && touched.date && errors.date) ? <ErrorDiv error={errors.date}/>: null}

          <div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>

        </Form>
      )}

    </Formik>
  </div>
);