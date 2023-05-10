import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import {default as BootstrapForm} from 'react-bootstrap/Form';

import './Form.scss';

function Form (props) {

  const [urlText, setUrlText] = useState('');
  const [requestMethod, setRequestMethod] = useState('');
  const [requestBody, setRequestBody] = useState('')

  const handleInputChange = event => {
    setUrlText(event.target.value);
  }

  const handleMethodChange = event => {
    setRequestMethod(event.target.id.toUpperCase());
    if (
      event.target.id.toUpperCase() === 'PUT' || 
      event.target.id.toUpperCase() === 'POST'
      ) 
    {
      document.getElementById('req-body').disabled = false;
    } else {
      document.getElementById('req-body').disabled = true;
    }
  }

  const handleBodyFormat = event => {
    // let ugly = event.target.value;
    // let format = JSON.parse(ugly);
    // let pretty = JSON.stringify(format);
    console.log(JSON.stringify(event.target.value))
    console.log(JSON.parse(JSON.stringify(event.target.value)))
    setRequestBody(JSON.stringify(event.target.value))
  }

  const handleSubmit = event => {
    console.log(requestBody)
    event.preventDefault();
    const formData = {
      method: requestMethod,
      url: urlText,
      headers: {
        test: 'testHeader'
      },
      body: requestBody,
      count: '5',
    };
    props.handleApiCall(formData);
  }
  
  return (
    <>
      <BootstrapForm onSubmit={handleSubmit}>

        {/* Url search bar */}
        <Container>
          <BootstrapForm.Label >URL:</BootstrapForm.Label>
          <div style={{display: "flex"}}>
            <BootstrapForm.Control type='text' name='url' placeholder='https://pokeapi.co/api/v2/pokemon/pikachu/' onChange={handleInputChange}/>
                
          </div>          
        </Container>

        {/* Request Body */}
        <Container>
          <BootstrapForm.Label>Request Body</BootstrapForm.Label>
          <BootstrapForm.Control 
            as='textarea' 
            rows={20} 
            placeholder='{
            "key":"value"
            }'
            onChange={handleBodyFormat}
            disabled
            id='req-body'
          />
        </Container>

        {/* Method radio buttons */}
        <Container className='methods' style={{display: "flex", justifyContent: 'space-around', padding: '0'}}>

              <Container>
                <BootstrapForm.Check type='radio' label='GET' id='get' name='methods' onClick={handleMethodChange}/>
              </Container>

              <Container>
                <BootstrapForm.Check type='radio' label='POST' id='post' name='methods'  onClick={handleMethodChange}/>                
              </Container>

              <Container>
                <BootstrapForm.Check type='radio' label='PUT' id='put' name='methods'  onClick={handleMethodChange}/>                
              </Container>

              <Container>
                <BootstrapForm.Check type='radio' label='DELETE' id='delete' name='methods'  onClick={handleMethodChange}/>                
              </Container>

        </Container>       
        
        <Container style={{display: 'flex', justifyContent: 'center'}}>
          <Button style={{margin:'0', width: '100%'}} type="submit">GO!</Button>           
        </Container>


      </BootstrapForm>
    </>
  );
}

export default Form;