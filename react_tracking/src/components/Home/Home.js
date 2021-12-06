import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL, CONFIG } from '../../constants/apiConstants';
import axios from 'axios'

import "./Home.css";
import UserDetails from '../UserDetails/UserDetails';
import OrderDetails from '../OrderDetails/OrderDetails';

function Home(props) {
  const [state, setState] = useState({
    userId: null,
    userName: "",
    userType: "",
    orderId: null,
    from: "",
    to: "",
    status: "",
    placedBy: "",
    pickedUpBy: "",
    content: ""
  })

  const handleOnLoadPage = useCallback(() => {
    axios.get(API_BASE_URL + `users/${localStorage.getItem(ACCESS_TOKEN_NAME)}`, { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) } })
      .then(function (response) {
        if (response.status === 200) {
          setState(prevState => ({
            ...prevState,
            userId: response.data.id,
            userName: response.data.name,
            userType: response.data.userType,
          }))
        } else {
          redirectToLogin()
        }
      })
      .catch(function (error) {
        redirectToLogin()
      });
  })

  useEffect(() => {
    handleOnLoadPage();
  }, [])

  const redirectToLogin = () => {
    props.history.push('/login');
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleOptionChange = (e) => {
    const { id, value } = e.target
    if (e.target.id === 'status' && value.length > 0) {
      setState(prevState => ({
        ...prevState,
        status: value,
        [id]: value
      }))
    } else if (e.target.id === 'placedBy' && value.length > 0) {
      setState(prevState => ({
        ...prevState,
        placedBy: value,
        [id]: value
      }))
    } else if (e.target.id === 'pickedUpBy' && value.length > 0) {
      setState(prevState => ({
        ...prevState,
        placedBy: value,
        [id]: value
      }))
    }
  }

  const placeOrderDetailsToServer = () => {
    if (state.from.length) {
      props.showError(null);
      const payload = {
        "from": state.from,
        "to": state.to,
        "status": state.status,
        "placedBy": state.placedBy,
        "pickedUpBy": state.pickedUpBy,
        "content": state.content,
      }
      axios.post(API_BASE_URL + 'orders', payload, CONFIG)
        .then(function (response) {
          if (response.status === 201) {
            console.log(response)
            setState(prevState => ({
              ...prevState,
              'successMessage': 'Order placed successful. Redirecting to home page..'
            }))
            redirectToHome();
            props.showError(null)
          } else {
            props.showError("Some error ocurred");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      props.showError('Please enter valid order details')
    }
  }
  const redirectToHome = () => {
    props.updateTitle('Home')
    props.history.push('/home');
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.from.length > 0) {
      placeOrderDetailsToServer()
    } else {
      props.showError('order details does not match');
    }
  }

  return (
    <div className="mt-2">
      <div className="row">
        <div className="col-6">
          <UserDetails userId={state.userId} userName={state.userName} userType={state.userType} />
        </div>
        <div className="col-6">
          <OrderDetails userName={state.userName} userType={state.userType} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mt-4">
          {state.userType === 'sender' &&
            <div className="card col-12 login-card hv-center">
              <label htmlFor="exampleFrom">Place Order</label>
              <form>
                <div className="form-group text-left">
                  <label htmlFor="exampleFrom">From Address</label>
                  <input type="text"
                    className="form-control"
                    id="from"
                    aria-describedby="fromHelp"
                    placeholder="From Address"
                    value={state.from}
                    onChange={handleChange}
                  />
                  <small id="fromHelp" className="form-text text-muted">Please enter From Address</small>
                </div>
                <div className="form-group text-left">
                  <label htmlFor="exampleTo">To Address</label>
                  <input type="text"
                    className="form-control"
                    id="to"
                    aria-describedby="toHelp"
                    placeholder="To Address"
                    value={state.to}
                    onChange={handleChange}
                  />
                  <small id="fromHelp" className="form-text text-muted">Please enter To Address</small>
                </div>
                <div className="form-group text-left">
                  <label htmlFor="status" className="mr-3">Order Status</label>
                  <select id="status" name="status" onChange={handleOptionChange}>
                    <option value=""></option>
                    <option value="pending">Pending</option>
                    <option value="pickedup" disabled={state.userType === 'sender'}>Picked Up</option>
                    <option value="delivered" disabled={state.userType === 'sender'}>Delivered</option>
                  </select>
                  <small id="nameHelp" className="form-text text-muted">Please select order status</small>
                </div>
                <div className="form-group text-left">
                  <label htmlFor="placedBy" className="mr-3">Placed By</label>
                  <select id="placedBy" name="placedBy" onChange={handleOptionChange}>
                    <option value=""></option>
                    <option value={state.userName} disabled={state.userType === 'biker'}>{state.userName}</option>
                  </select>
                  <small id="nameHelp" className="form-text text-muted">Please select user details</small>
                </div>
                <div className="form-group text-left">
                  <label htmlFor="pickedUpBy" className="mr-3">Picked Up By</label>
                  <select id="pickedUpBy" name="pickedUpBy" onChange={handleOptionChange}>
                    <option value=""></option>
                    <option value={state.userName} disabled={state.userType === 'sender'}>{state.userName}</option>
                  </select>
                  <small id="nameHelp" className="form-text text-muted">Please select user details</small>
                </div>
                <div className="form-group text-left">
                  <label htmlFor="exampleContent">Order Content</label>
                  <input type="text"
                    className="form-control"
                    id="content"
                    aria-describedby="contentHelp"
                    placeholder="Order Content"
                    value={state.content}
                    onChange={handleChange}
                  />
                  <small id="fromHelp" className="form-text text-muted">Please enter Order Content</small>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmitClick}
                >
                  Send
                </button>
              </form>
            </div>
          }
        </div>
      </div>


    </div>
  )
}

export default withRouter(Home);