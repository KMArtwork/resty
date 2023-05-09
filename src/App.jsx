import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

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

  const callApi = (requestParams) => {
    const data = {
      headers: requestParams.headers,
      body: requestParams.body,
      count: requestParams.count
    };
    setData(data);
    setRequestParams(requestParams)
  }

  return (
    <React.Fragment>
      <Header />

      <Container style={{display: 'flex', justifyContent: 'space-evenly', height: '100%'}}>

        <Container style={{width: '50%'}}>
          <Form handleApiCall={callApi} />          
        </Container>

        <Container style={{width: '50%'}}>
          <div>Request Method: {requestParams.method}</div>
          <div>URL: {requestParams.url}</div>
          <Results data={data} />          
        </Container>

      </Container>

      <Footer />
    </React.Fragment>
  );
}

export default App;