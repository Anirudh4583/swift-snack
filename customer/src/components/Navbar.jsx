import { AiFillAlert } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { IoFastFoodOutline } from 'react-icons/io5'
import { Button, Modal } from 'react-bootstrap'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import {
  Container,
  Wrapper,
  Title,
  Register,
  Right,
  MenuItem,
  icon,
  btn,
} from '../styles/navbar.styles'
import { useState } from 'react'
import { addDoc, collection, Timestamp } from '@firebase/firestore'
import { db } from '../services/Firebase'

function Navbar() {
  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleCall() {
    try {
      await addDoc(collection(db, 'calls'), {
        table: 21,
        timestamp: Timestamp.fromDate(new Date()),
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
    setShow(false)
    setSuccess(true)
  }

  return (
    <Container>
      <Wrapper>
        <Title>
          <Link to="/" style={{ color: '#000000', textDecoration: 'none' }}>
            Swift Snack
          </Link>
        </Title>
        <Link to="/auth/login">
          <Register>Sign in</Register>
        </Link>
        <Right>
          <Link to="#">
            <MenuItem>
              <button
                style={btn}
                // variant="outline-light"
                onClick={() => setShow(true)}
              >
                Call Waiter <span className="p-1"></span>
                <AiFillAlert size="26px" />
              </button>
            </MenuItem>
          </Link>
          <MenuItem>
            <Link to="/cart">
              <IoFastFoodOutline style={icon} />
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Call For Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please confirm to call a waiter to your table.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCall}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg={'success'}
          show={success}
          onClose={() => setSuccess(false)}
          delay={3000}
          autohide
        >
          <Toast.Header closeLabel="">
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Service Request Successful</strong>
            <small>few seconds ago</small>
          </Toast.Header>
          <Toast.Body>
            You're call for service has been conveyed. Please wait while someone
            catches up to you!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  )
}

export default Navbar
