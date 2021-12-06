import React from 'react';
import './UserDetails.css';
function UserDetails(props) {
    return (
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-header">
                User Details
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">User Id: {props.userId}</li>
                <li className="list-group-item">User Name: {props.userName}</li>
                <li className="list-group-item">User Type: {props.userType}</li>
            </ul>
        </div>
    )
}

export default UserDetails