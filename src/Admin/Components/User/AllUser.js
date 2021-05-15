import React, { Component } from 'react';
// import callAPI from "../CallAPI/callApi";
import axios from 'axios';


class AllUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            sort: true,
            id: '',
            fisrtName: "",
            lastName:"",
            addressHome:"",
            email:"",
            phone: "",
            credit_card_number: "",
            credit_card_cvv: "",
            credit_card_zip: "",
            credit_card_expiration: "",
            status:false,
        }
    }

    onChange = (event) => {
        let key = event.target.name;
        let value = event.target.value;
        this.setState({ 
            [key]: value 
        });
    }

    clear = () => {
        this.setState({ firstName: "" })
        this.setState({ lastName: "" })
        this.setState({ addressHome: "" })
        this.setState({ email: "" })
        this.setState({ phone: "" })
        this.setState({ credit_card_number: "" })
        this.setState({ credit_card_cvv: "" })
        this.setState({ credit_card_zip: "" })
        this.setState({ credit_card_expiration: "" })
    }
    
    postData = (event) => {
        event.preventDefault();
        var { firstName, lastName,addressHome,email,phone} = this.state; 
        axios({
            method: 'POST',
            url: 'https://data-json-server.herokuapp.com/api/users',
            data: {  
                firstName:      firstName,
                lastName:       lastName,
                email:          email,
                addressHome:    addressHome,
                phone:          phone,
                
            }
        }).then(res => {
            this.clear();
            alert("Add user successly")
            this.getData()
            window.location.reload()
        }).catch(err => {
            alert(err);
        });
    }
    getData = () => {
        axios({
            method: 'GET',
            url: 'https://data-json-server.herokuapp.com/api/users',
            data: null
        }).then(res => {
            this.setState({ users: res.data,
                // id:res.data.length,
            });       
            console.log(this.state.users.length);
        }).catch(err => { });
    
    }
    update = (id) => { 
        var { firstName, lastName,addressHome,email,phone} = this.state;
        axios({
            method: 'PUT',
            url: `https://data-json-server.herokuapp.com/api/users/${id}`,
            data: {
                firstName:      firstName,
                lastName:       lastName,
                addressHome:    addressHome,
                email:          email,              
                phone:          phone,
            }
        }).then(res => {
            alert("Update user successly !");
            this.clear()
            this.getData()
          
        }).catch(err => { });
    }
    updateData = (id) => {
        this.clear();      
        var users = this.state.users;
        users.filter(user => {
            if (user.id === id) {
                this.setState({
                    id:             user.id,
                    firstName:      user.firstName,
                    lastName:       user.lastName,
                    addressHome:    user.addressHome,
                    email:          user.email,             
                    phone:          user.phone,
                })
            }
        })
    }

    delete = (id) => {
        axios({
            method: 'DELETE',
            url: `https://data-json-server.herokuapp.com/api/users/${id}`,
            data: null
        }).then(res => {
            this.getData();
        }).catch(err => { });
    }

    componentDidMount() {
        this.getData();
    }
    

    render() {
        return (
            <div>

                {/* modal update user  */}
                <div className="modal fade" id="updateUserModal" tabindex="{-1}" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-bottom-0">
                                
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                               <span aria-hidden="true" >×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-title text-center">
                                    <h4>Update User</h4>
                                </div>  
                                <div className="d-flex flex-column text-center">
                                    <form>
                                        <div className="form-group">First Name
                                            <input type="text" name = "firstName" value={this.state.firstName} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">Last Name
                                            <input type="text"  name = "lastName" value={this.state.lastName} onChange={this.onChange} placeholder="Enter your" />
                                        </div>
                                        <div className="form-group">Address Home
                                            <input type="text" name="addressHome" value={this.state.addressHome} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">Email
                                            <input type="text" name="email" value={this.state.email} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">Phone
                                            <input type="number" name="phone" min="0" max="11" value={this.state.phone} onChange={this.onChange} />
                                        </div>
                                        <button type="button" className="btn btn-info btn-block btn-round" onClick={() => this.update(this.state.id)}>Update</button>
                                    </form>                                                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="addUserModal" tabindex="{-1}" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-bottom-0">
                                
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                               <span aria-hidden="true" >×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-title text-center">
                                    <h4>Add User</h4>
                                </div>  
                                <div className="d-flex flex-column text-center">
                                    <form>
                                    <div className="form-group">First Name
                                            <input type="text" name = "firstName" value={this.state.firstName} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">Last Name
                                            <input type="text"  name = "lastName" value={this.state.lastName} onChange={this.onChange} placeholder="Enter your" />
                                        </div>
                                        <div className="form-group">Address Home
                                            <input type="text" name="addressHome" value={this.state.addressHome} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">Email
                                            <input type="text" name="email" value={this.state.email} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">Phone
                                            <input type="number" name="phone" min="0" max="11" value={this.state.phone} onChange={this.onChange} />
                                        </div>
                                        <button type="button" className="btn btn-info btn-block btn-round" onClick={this.postData}>Add User</button>
                                    </form>                                                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <span><button data-toggle="modal" data-target="#addUserModal" className="btn btn-primary btn-sm rounded-0" type="button" data-placement="top" title="Add" ><i className="fa fa-user-plus" /></button></span>
                <div className="tab" style={{ width: '400px' }}>
                    <table>
                        <thead>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address Home</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(a => (
                                    <tr key={a.id}>
                                        {/* <Link to={{ pathname: `/products/${a.id}`, state: { products: this.props.products } }}>                  
                                </Link> */}
                                        <td>{a.id}</td>
                                        <td>{a.firstName}</td>
                                        <td>{a.lastName}</td>
                                        <td>{a.addressHome}</td>
                                        <td>{a.email}</td>
                                        <td>{a.phone}</td>
                                        <td>
                                            <ul className="list-inline m-0">                                             
                                                <li className="list-inline-item" >   
                                                <label className="switch">
                                                    <input type="checkbox"/>
                                                    <span className="slider round"></span>
                                                </label>                                        
                                                    {/* <button data-toggle="modal" data-target="#updateUserModal"  onClick={()=>this.updateData(a.id)} className="btn btn-success btn-sm rounded-0" type="button" data-placement="top" title="Edit" ><i className="fa fa-edit" /></button> */}
                                                {/* </li>
                                                <li className="list-inline-item"> */}
                                                    {/* <button onClick={()=>this.delete(a.id)} className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete" ><i className="fa fa-trash" /></button> */}
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
        );
    }
}

export default AllUser;