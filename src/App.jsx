import React, { useEffect, useReducer, useState } from 'react';
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

  let initialState = {
    loading: false,
    results: null,
    history: [],
  }

  const stateReducer = (state, action) => {

    switch(action.type) {
      case 'loading':
        return action.payload;
      case 'setResults':
        return action.payload;
      case 'loadHistory':
        return;
      default:
        return state;
    }

  }

  const [state, dispatch] = useReducer(stateReducer, initialState)

  // const [data, setData] = useState(null);
  // const [requestParams, setRequestParams] = useState({});


  const makeApiCall = (requestParams) => {

    // sets 'loading' to true while axios makes request
    dispatch({
      type: 'loading',
      payload: {
        loading: true,
        results: state.results,
        history: state.history
      }
    })

    axios({
      method: requestParams.method,
      url: requestParams.url,
      // headers: requestParams.headers,
      data: requestParams.body
    })
    .then(response => {
      dispatch({
        type: 'setResults',
        payload: {
          loading: false,
          results: {
            request: {
              method: requestParams.method,
              url: requestParams.url,
            },
            response: response
          },
          history: [
            {
              request: {
                method: requestParams.method,
                url: requestParams.url,
                headers: requestParams.headers,
                body: requestParams.body,                
              },
              response: response,
            }, 
            ...state.history
          ]
        }
      })
    })
    .catch(error => {
      console.error(error)
    })

  }

  const handleApiCall = (requestParams) => {
    // if the method is 'get' or 'delete' AND there is a url attached to the request
    if ((requestParams.method === 'GET' || requestParams.method === 'DELETE') && requestParams.url) {

      makeApiCall(requestParams);

    } 
    // if the method is 'post' or 'put' then the request also needs a url AND body
    else if ((requestParams.method === 'POST' || requestParams.method === 'PUT') && requestParams.url && requestParams.body) {

      makeApiCall(requestParams);

    } 
    // otherwise, console.error
    else {
      console.error('Improper request made. Request needs method and url. If method is PUT or POST, request also needs a body.')
    }
  }

  return (
    <section data-testid={'app'}>
      <Header />

      <Container style={{display: 'flex', justifyContent: 'space-evenly', height: '80vh'}}>

        <Container style={{width: '50%'}}>
          <Form handleApiCall={handleApiCall} />          
        </Container>

        <Container style={{width: '50%', height: '95%', maxHeight: '95%'}}>
          <div>Request Method: {state.results?.request.method}</div>
          <div>URL: {state.results?.request.url}</div>
          <Results data={state.results} />          
        </Container>

      </Container>

      <Footer author={'Kawika Miller'} />
    </section>
  );
}

export default App;