import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// Why is this source of truth beneficial when spread across a global organization?
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

function App (props) {

  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});

  useEffect(
    () => {
      axios({
        method: requestParams.method,
        url: requestParams.url,
        // headers: requestParams.headers,
        data: requestParams.body
      })
      .then(response => {
        setData(response);
      })
      .catch(error => {
        console.error(error)
      })
    },
    [requestParams]
  )

  const callApi = (requestParams) => {
    // if the method is 'get' or 'delete' AND there is a url attached to the request
    if ((requestParams.method === 'GET' || requestParams.method === 'DELETE') && requestParams.url) {
      setRequestParams(requestParams)
    } 
    // if the method is 'post' or 'put' then the request also needs a url AND body
    else if ((requestParams.method === 'POST' || requestParams.method === 'PUT') && requestParams.url && requestParams.body) {
      setRequestParams(requestParams)
    } 
    // otherwise, console.error
    else {
      console.error('Improper request made. Request needs method and url. If method is PUT or POST, request also needs a body.')
    }
  }

  return (
    <React.Fragment>
      <Header />

      <Container style={{display: 'flex', justifyContent: 'space-evenly', height: '80vh'}}>

        <Container style={{width: '50%'}}>
          <Form handleApiCall={callApi} />          
        </Container>

        <Container style={{width: '50%', height: '95%', maxHeight: '95%'}}>
          <div>Request Method: {requestParams.method}</div>
          <div>URL: {requestParams.url}</div>
          <Results data={data} />          
        </Container>

      </Container>

      <Footer author={'Kawika Miller'} />
    </React.Fragment>
  );
}

export default App;