import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME, CONFIG } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

function RegistrationForm(props) {
    const [state, setState] = useState({
        email: "",
        name: "",
        userType: "",
        content: "",
        password: "",
        confirmPassword: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleOptionChange = (e) => {
        const { id, value } = e.target
        if (e.target.id === 'userType') {
            setState(prevState => ({
                ...prevState,
                userType: value,
                [id]: value
            }))
        }
    }

    const sendDetailsToServer = () => {
        if (state.email.length && state.password.length) {
            props.showError(null);
            const payload = {
                "email": state.email,
                "password": state.password,
                "name": state.name,
                "userType": state.userType,
                "content": state.content
            }
            axios.post(API_BASE_URL + 'users', payload, CONFIG)
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Registration successful. Redirecting to home page..'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.id);
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
            props.showError('Please enter valid username and password')
        }
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login');
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            sendDetailsToServer()
        } else {
            props.showError('Passwords do not match');
        }
    }
    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={state.email}
                        onChange={handleChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputUserName">User Name</label>
                    <input type="text"
                        className="form-control"
                        id="name"
                        aria-describedby="nameHelp"
                        placeholder="Enter userName"
                        value={state.name}
                        onChange={handleChange}
                    />
                    <small id="nameHelp" className="form-text text-muted">Please enter user name</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="userType" className="mr-3">User Type</label>
                    <select id="userType" name="userType" onChange={handleOptionChange}>
                        <option value="biker">Biker</option>
                        <option value="sender">Sender</option>
                    </select>
                    <small id="nameHelp" className="form-text text-muted">Please select of user type</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputContent">Content Description</label>
                    <input type="text"
                        className="form-control"
                        id="content"
                        aria-describedby="contentHelp"
                        placeholder="Enter content"
                        value={state.content}
                        onChange={handleChange}
                    />
                    <small id="contentHelp" className="form-text text-muted">Please enter Content Description</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span>
            </div>

        </div>
    )
}

export default withRouter(RegistrationForm);