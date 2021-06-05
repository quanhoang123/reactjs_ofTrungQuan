import React, { Component } from 'react';
import callAPI from '../CallAPI/callApi';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _order: [],
            id: '',
            userName: "",
            quanlity: "",
            _drinks: [],
            remider: '',
            time: "",
            total: "",
            location: "",
            status: '',
            checkSt: false
        }
    }
    getOrder = () => {
        callAPI(`orders`, 'GET', null).then(res => {
            this.setState({
                _order: res.data,
                id: res.data.length,
            });

        }).catch(err => {
        });
    }
    componentDidMount() {
        callAPI('orders', 'GET', null).then(res => {
            this.setState({
                _order: res.data,
                id: res.data.length,
            });

        }).catch(err => {

        });

    }

    delete = (id) => {
        if (window.confirm('Bạn Co Thuc Su Muon Xoa')) {
            callAPI(`orders/${id}`, "DELETE", null).then((response) => {
                this.getOrder();
                alert("Xoá thành công!");
            });
        } else {
            return;
        }
    }
    comfirmBills = (id) => {
        console.log(this.state._order[1].userName);
        if (this.state.checkSt === false) {
            let check1 = true;
            let check2 = 'Đang Giao';
            for (let i in this.state._order) {
                var order = {
                    userName: this.state._order[i].userName,
                    quantity: this.state._order[i].quantity,
                    drink: this.state._order[i].drink,
                    reminder: this.state._order[i].reminder,
                    location: this.state._order[i].location,
                    time: this.state._order[i].time,
                    total: this.state._order[i].total,
                    status: check2,
                    checkSt: check1
                }
            }
            callAPI(`orders/${id}`, 'PUT', order).then(res => {
                //alert("Xác nhận đơn hàng thành công !");                                                        
                this.getOrder();
                window.location.reload();
            }).catch(err => { });
        } else {
            alert('Đơn hàng đang được giao');
        }
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
                                <th>Action</th>
                            </thead>
                            <tbody>
                                {
                                    this.state._order.map(order => (                                      
                                        <tr>
                                            <td>{order.id}</td>
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
                                            <td>
                                                <ul className="list-inline m-0">
                                                    <li className="list-inline-item">
                                                        <button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={() => this.delete(order.id)}><i className="fa fa-trash" /></button>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Order;