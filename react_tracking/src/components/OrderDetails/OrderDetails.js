import React, { useEffect, useState } from 'react';
import { API_BASE_URL, CONFIG } from '../../constants/apiConstants';
import axios from 'axios'
import './OrderDetails.css';

function OrderDetails(props) {
    const [orders, setOrders] = useState([])
    const [url, setUrl] = useState('orders/')
    const [header, setHeader] = useState('')
    const [newStatus, setNewStatus] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (props.userType == 'bikers') {
            setHeader('All Order Details to pickup or deliver')
        } else if (props.userType == 'sender') {
            setUrl(`${props.userName}`)
            setHeader('Placed Order Details')
        }
    }, [props])

    const getSenderUserOrders = () => {

        axios.get(API_BASE_URL + url, CONFIG)
            .then(function (response) {
                if (response.status === 200) {
                    setOrders(response.data)
                } else {
                    redirectToHome()
                }
            })
            .catch(function (error) {
                redirectToHome()
            });
    }

    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }

    useEffect(() => {
        getSenderUserOrders();
    }, [])

    const handleOptionChange = (e) => {
        const { id, value } = e.target
        if (e.target.id === 'status' && value.length > 0) {
            const split = value.split('+')
            const status = split[0];
            const orderId = split[1];
            const placedBy = split[2]
            console.log('----', status, orderId, orderId.length, placedBy)

            const payload = {
                "placedBy": placedBy,
                "status": status,
            }
            axios.put(API_BASE_URL + `orders/${orderId}`, payload, CONFIG)
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response.data)
                        setNewStatus(response.data.content.status)
                        setMessage(response.data.message)
                        redirectToHome();
                    } else {
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    return (
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-header">
                {header}
            </div>
            {message && 
                <div>{message} to {newStatus}</div>
            }
            <table className="table table-striped text break">
                <thead>
                    <tr>
                        <th scope="col">User details</th>
                        <th scope="col">Status</th>
                        {props.userType === 'sender' ?
                            <th scope="col">Content</th>
                            :
                            <th>Update Status</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map((order, index) => {
                        return (
                            <>
                                {order.status !== 'delivered' &&

                                    <tr key={index}>
                                        <td>{order.placedBy}</td>
                                        <td>{order.status}</td>
                                        {props.userType === 'sender' ?
                                            <td className="">{order.content}</td>
                                            :
                                            <td>
                                                <select id="status" name="status" onChange={handleOptionChange}>
                                                    <option value=""></option>
                                                    <option value={`pending+${order.orderId}+${order.placedBy}`} disabled={order.status === 'pending' || order.status === 'pickedup'}>Pending</option>
                                                    <option value={`pickedup+${order.orderId}+${order.placedBy}`} disabled={order.status === 'pickedup' || order.status === 'delivered'}>Picked Up</option>
                                                    <option value={`delivered+${order.orderId}+${order.placedBy}`} disabled={order.status === 'pending'}>Delivered</option>
                                                </select>
                                            </td>
                                        }
                                    </tr>
                                }
                            </>)
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderDetails