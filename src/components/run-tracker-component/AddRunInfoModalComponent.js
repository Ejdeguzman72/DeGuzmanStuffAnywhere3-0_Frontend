import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import NameDropdown from '../dropdown-components/UserDropdown';
import '../../style-sheets/run-tracker-page.css';
import Axios from 'axios';
import UserDropdown from '../dropdown-components/UserDropdown';

export default function AddRunInfoModalComponent({ props }) {
  console.log(props + "this is props")
  const [show, setShow] = useState(false);
  const [run, setRun] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const initialState = {
    run_id: 0,
    runDate: "",
    runDistance: 0,
    runTime: "",
    user_id: 0
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRun({ ...run, [name]: value });
  }

  const handleUser = (user_id) => {
    setRun({
      ...run, user_id: user_id
    });
  }

  const saveRunInformation = () => {
    const data = {
      run_id: run.run_id,
      runDate: run.runDate,
      runDistance: run.runDistance,
      runTime: run.runTime,
      user_id: run.user_id
    }

    Axios.post('http://localhost:8080/app/run-tracker-app/add-run-tracker-info', data)
      .then(response => {
        console.log(data + " this is data");
        setRun({
          run_id: response.data.run_id,
          runDate: response.data.runDate,
          runDistance: response.data.runDistance,
          runTime: response.data.runTime,
          user_id: response.data.user_id
        });
        console.log(data);
        setSubmitted(true);

        window.location.reload();
      })
      .catch(error => (
        alert('Application is facing issues ' + error)
      ));
  }

  const newRun = () => {
    setRun(initialState);
    setSubmitted(false);
  }

  return (
    <>
      <Button variant="info" size="lg" onClick={handleShow}>
        Add Run
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Run Information</Modal.Title>
        </Modal.Header>

        {
          submitted ? (
            <Modal.Body>
              <div>
                <h4>Run Information has been added</h4>
                <Button className="btn btn-success" onClick={newRun} size="lg" variant="info">
                  Add
                </Button>
              </div>
            </Modal.Body>
          ) : (
            <Modal.Body>
              Please fill out the following information:
              <br></br>
              <div className="modal-container">
                <input 
                  type="number" 
                  placeholder="Distance (00 : 00 miles)" 
                  className="form-control"
                  id="runDistance"
                  name="runDistance"
                  value={run.runDistance}
                  onChange={handleInputChange} /><br></br>

                <input 
                  type="text" 
                  placeholder="Time (00 m : 00 s)" 
                  className="form-control"
                  id="runTime"
                  name="runTime"
                  value={run.runTime}
                  onChange={handleInputChange} /><br></br>

                <Form.Group controlId="runDate">
                  <Form.Label>Select Date</Form.Label>
                  <Form.Control type="date" name="runDate" placeholder="Date" className="form-control" onChange={handleInputChange} />
                </Form.Group>

                <UserDropdown 
                  handleUser={handleUser}
                />
              </div>
            </Modal.Body>
          )
        }

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveRunInformation}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}