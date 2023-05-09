import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import {default as BootstrapForm} from 'react-bootstrap/Form';

import './Form.scss';

function Form (props) {

  const [urlText, setUrlText] = useState('');
  const [requestMethod, setRequestMethod] = useState('');

  const handleInputChange = event => {
    setUrlText(event.target.value)
  }

  const handleMethodChange = event => {
    setRequestMethod(event.target.id.toUpperCase());
  }

  const handleSubmit = event => {
    event.preventDefault();
    const formData = {
      method: requestMethod,
      url: urlText,
    };
    props.handleApiCall(formData);
  }
  
  return (
    <>
      <BootstrapForm onSubmit={handleSubmit}>

        <Container style={{display: "flex"}}>

          <BootstrapForm.Label >URL:</BootstrapForm.Label>
          <BootstrapForm.Control type='text' name='url' onChange={handleInputChange}/>
            <Button type="submit">GO!</Button>    

        </Container>

        <Container style={{display: "flex", justifyContent: "center"}}>
          <BootstrapForm.Group>
            <BootstrapForm.Label className="methods">

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


              {/* <Button id="GET" onClick={handleMethodChange}>GET</Button>
              <Button id="POST" onClick={handleMethodChange}>POST</Button>
              <Button id="PUT" onClick={handleMethodChange}>PUT</Button>
              <Button id="DELETE" onClick={handleMethodChange}>DELETE</Button> */}

            </BootstrapForm.Label>                
          </BootstrapForm.Group>
        </Container>

      </BootstrapForm>
    </>
  );
}

export default Form;