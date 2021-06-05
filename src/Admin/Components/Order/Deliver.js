import React, { Component } from 'react';
import callAPI from '../CallAPI/callApi';

class Deliver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _order: [],
            id: '',
            userName: "",
            quanlity: "",
            remider: '',
            time: "",
            total: "",
            location: "",
            status: '',
            // checkSt:false     
        }
    }
    getOrder = () => {
        callAPI(`orders`, 'GET', null).then(res => {
            this.setState({
                _order: res.data,
                id: res.data.length
            });

        }).catch(err => {
        });
    }
    componentDidMount() {
        callAPI(`orders`, 'GET', null).then(res => {
            this.setState({
                _order: res.data,
                id: res.data.length
            });

        }).catch(err => {
        });

    }


    render() {
        return (
            <div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead className=" text-primary">
                                <th>Order id</th>
                                <th>User Information</th>
                                <th>Billing Information</th>
                                <th>Order Date</th>
                                <th>Location</th>
                                <th>Order total</th>
                                <th>Status</th>

                            </thead>
                            <tbody>
                                {
                                    this.state._order.map(order => {
                                        if(order.status==="Đang Giao"){
                                            return(
                                                <tr>
                                                    <td disable>{order.id}</td>
                                                    <td>{order.userName}</td>
                                                    <td>
                                                        {
                                                            order.drink.map(listDrink => {
                                                                return <span><br></br><span>ID:{listDrink.id}</span> <br></br>Name Drink: {listDrink.name}</span>
                                                            })
                                                        }
                                                    </td>
                                                    <td>{order.time}</td>
                                                    <td>{order.location}</td>
                                                    <td>{order.total}</td>
                                                    <td>
                                                        <li className="list-inline-item">
                                                            <button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="wait" onClick={() => this.comfirmBills(order.id)}>{order.status}</button>
                                                        </li>
                                                    </td>
                                                </tr>
                                            )}
                                        // console.log(order);                                      
                                    })
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Deliver;