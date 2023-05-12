import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function History (props) {

  const [showModal, setShowModal] = useState(false)

  return (




    <>
      <Button onClick={() => {setShowModal(!showModal)}}>History</Button>
      
      <Modal show={showModal} onHide={() => {setShowModal(!showModal)}} centered>
        <Modal.Header>API Request History</Modal.Header>

        <Modal.Body>
          {props.data.map((dat, idx) => (
            <div style={{display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0'}}>
              <div style={{display: 'flex', justifyContent: 'flex-start', width: '90%', overflowX: 'hidden'}}>
                <strong style={{marginRight: '0.5rem'}}>{dat.request.method}</strong>
                <p>{dat.request.url}</p>
              </div>
              <Button onClick={() => {props.loadHistory(idx); setShowModal(!showModal)}}>Load</Button>
            </div>
          ))}
        </Modal.Body>

        <Modal.Footer>Footer placeholder</Modal.Footer>
      </Modal>  
    </>
  )

}

export default History;