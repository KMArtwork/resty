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
import History from './Components/History';

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
        return action.payload;
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(stateReducer, initialState)

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

  const loadHistory = (idx) => {
    dispatch({
      type: 'loadHistory',
      payload: {
        loading: false,
        results: state.history[idx],
        history: state.history
      }
    })
  }

  return (
    <section data-testid={'app'} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <Header />

      <Container style={{display: 'flex', justifyContent: 'space-evenly'}}>

        <Container style={{width: '50%'}}>
          <Form handleApiCall={handleApiCall} />          
        </Container>

        <Container style={{width: '50%'}}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p>URL: {state.results?.request.url}</p>
            <p>Request Method: {state.results?.request.method}</p>

          </div>
          <Results data={state.results} isLoading={state.loading} />          
        </Container>

      </Container>

      <History data={state.history} loadHistory={loadHistory}/>

      <Footer author={'Kawika Miller'} />
    </section>
  );
}

export default App;