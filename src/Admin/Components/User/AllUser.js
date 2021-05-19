import React, { Component } from 'react';
// import callAPI from "../CallAPI/callApi";
import axios from 'axios';
import './updateModaluser.css';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
class AllUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            searchString:[],
            search:"",
            id: '',
            name: "",
            email:"",
            user:"",
            password:"",       
            phone: "",
            location:"",  
            checkStatus:true,   
            status:"",
            check:true
        }
    }

    onChange = (event) => {
        let key = event.target.name;
        let value = event.target.value;
        this.setState({ 
            [key]: value 
        }, this.filterArray)
    }
    clear = () => {
        this.setState({ name: "" })
        this.setState({ email: "" })
        this.setState({ user: "" })
        this.setState({ password: "" })
        this.setState({ phone: "" })
        this.setState({ location: "" })
       
    }
    
    postData = (event) => {
        event.preventDefault();
        var { name, email,user,password,phone,location} = this.state; 
        axios({
            method: 'POST',
            url: 'http://localhost:8080/api/users',
            data: {  
                name:           name,
                email:          email,
                user:           user,
                password:       password,     
                phone:          phone,
                location:       location,             
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
            url: 'http://localhost:8080/api/users',
            data: null
        }).then(res => {
            this.setState({ 
                users: res.data,
                searchString:res.data
                // id:res.data.length,
            });       
            // console.log(this.state.users.length);
        }).catch(err => { });
    
    }
    update = (id) => { 
        var { name,email, user,password,phone,location} = this.state;
        axios({
            method: 'PUT',
            url: `http://localhost:8080/api/users/${id}`,
            data: {
                name:           name,
                email:          email,
                user:           user,
                password:       password,            
                phone:          phone,
                location:       location,
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
                    name:           user.name,
                    email:          user.email,
                    user:           user.user,
                    password:       user.password,        
                    phone:          user.phone,
                    location:       user.location,
                })
            }
        })
    }

    delete = (id) => {
        axios({
            method: 'DELETE',
            url: `http://localhost:8080/api/users/${id}`,
            data: null
        }).then(res => {
            this.getData();
        }).catch(err => { });
    }

    componentDidMount() {
        this.getData();
    }
    
    _handleSearchChange = (e) => {
        const { value } = e.target;
        const lowercasedValue = value.toLowerCase();
    
        this.setState((prevState) => {
          const searchString = prevState.searchString.filter((el) =>
            el.name.toLowerCase().includes(lowercasedValue)
          );
    
          return { searchString };
        });
        if(value===""){
            window.location.reload();
        }
    };
    
    // buttonOnclick = () => {
    //     this.setState((prev) => ({
    //       check: !prev.check
    //     }));
    //   };
    render() {
        // console.log(this.state.check);
        const { searchString } = this.state;
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
                                        <div className="form-group">Your Name
                                            <input type="text" name = "name" value={this.state.name} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">Email
                                            <input type="email"  name = "email" value={this.state.email} onChange={this.onChange} placeholder="Enter your" />
                                        </div>
                                        <div className="form-group">User Name
                                            <input type="text" name="user" value={this.state.user} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">You Phone
                                            <input type="phone" min='0' max='10' name="phone" value={this.state.phone} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">Your Address Home
                                            <input type="text" name="locaiton" min="0" max="11" value={this.state.location} onChange={this.onChange} />
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
                                        <div className="form-group">Your Name
                                            <input type="text" name = "name" value={this.state.name} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">Email
                                            <input type="email"  name = "email" value={this.state.email} onChange={this.onChange} placeholder="Enter your" />
                                        </div>
                                        <div className="form-group">User Name
                                            <input type="text" name="user" value={this.state.user} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">You Phone
                                            <input type="phone" min='0' max='10' name="phone" value={this.state.phone} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">Your Address Home
                                            <input type="text" name="locaiton" min="0" max="11" value={this.state.location} onChange={this.onChange} />
                                        </div>
                                        <button type="button" className="btn btn-info btn-block btn-round" onClick={this.postData}>Add User</button>
                                    </form>                                                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Search */}
                <form className="navbar-form" action>
                    <button data-toggle="modal" data-target="#addUserModal" className="btn btn-primary btn-sm rounded-0" type="button" data-placement="top" title="Add" ><i className="fa fa-user-plus" /></button> 
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Search"  onChange={this._handleSearchChange} style={{width: '25vh'}} />                          
                        </div>                        
                </form>
                <div className="tab" style={{ width: '400px' }}>
                    <table>
                        <thead>
                            <th>Id</th>
                            <th>Email</th>
                            <th>User Name</th>
                            <th>Phone</th>
                            <th>Locaiton</th>                
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {
                                searchString.map(a => (
                                    <tr key={a.id}>                                    
                                        <td>{a.id}</td>
                                        <td>{a.name}</td>
                                        <td>{a.email}</td>
                                        <td>{a.phone}</td>
                                        <td>{a.location}</td>                                  
                                        <td>
                                            <BootstrapSwitchButton checked={a.checkStatus} onstyle="light" offstyle="dark" width={100}  style={{backgroundColor: 'blue'}} onChange={
                                                ()=>{
                                                        if(a.checkStatus===true){
                                                                // alert("true")
                                                            let check1=false;
                                                            let check2='lock';                                                            
                                                                axios({
                                                                    method: 'PUT',
                                                                    url: `http://localhost:8080/api/users/${a.id}`,
                                                                    data: {
                                                                        name:           a.name,
                                                                        email:          a.email,
                                                                        user:           a.user,
                                                                        password:       a.password,            
                                                                        phone:          a.phone,
                                                                        location:       a.location,
                                                                        checkStatus:    check1,
                                                                        status:         check2
                                                                    }
                                                                }).then(res => {
                                                                    alert("Update status user off !");                                                        
                                                                    this.getData()                                                                
                                                                }).catch(err => { });
                                                         
                                                            }else{
                                                                let check1=true;
                                                                let check2='unlock';                                                              
                                                                axios({
                                                                    method: 'PUT',
                                                                    url: `http://localhost:8080/api/users/${a.id}`,
                                                                    data: {
                                                                        name:           a.name,
                                                                        email:          a.email,
                                                                        user:           a.user,
                                                                        password:       a.password,            
                                                                        phone:          a.phone,
                                                                        location:       a.location,
                                                                        checkStatus:    check1,
                                                                        status:         check2
                                                                    }
                                                                }).then(res => {
                                                                    alert("Update status user true !");                                                        
                                                                    this.getData()                                                                
                                                                }).catch(err => { });
                                                            }                                                        
                                                        }
                                                   }/>               
                                                
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