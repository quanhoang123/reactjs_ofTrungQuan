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
            url: 'https://data-json-server.herokuapp.com/api/users',
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
            url: 'https://data-json-server.herokuapp.com/api/users',
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
        var { name,email, user,password,phone,location, checkStatus} = this.state;
        console.log(checkStatus);
        if(checkStatus===false){
            alert("Can't update user" );
        }else{
            axios({
                method: 'PUT',
                url: `https://data-json-server.herokuapp.com/api/users/${id}`,
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
        if(window.confirm('Bạn Co Thuc Su Muon Xoa')){
        axios({
            method: 'DELETE',
            url: `https://data-json-server.herokuapp.com/api/users/${id}`,
            data: null
        }).then(res => {
            this.getData();
        }).catch(err => { });
    }else{
        return;
    }
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
                                    <form >
                                        <div className="row">                                           
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input type="text"  className="form-control" name = "name" value={this.state.name} onChange={this.onChange} />
                                                </div>
                                            </div>              
                                        </div>
                                        <div className="row">                                           
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input  className="form-control" type="email"  name = "email" value={this.state.email} onChange={this.onChange} placeholder="Enter your" />
                                                </div>
                                            </div>            
                                        </div>
                                        
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">                                         
                                                    <input type="text" name="user" className="form-control" value={this.state.user} onChange={this.onChange}/>
                                                </div>
                                            </div>             
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">                                         
                                                <input type="text" name="locaiton" className="form-control" value={this.state.location} onChange={this.onChange} placeholder="Enter address of user" />
                                                </div>
                                            </div>                                    
                                        </div>
                                                                           
                                        <button type="submit" className="btn btn-primary pull-right"onClick={()=>this.update(this.state.id) }>Update</button>
                                        <div className="clearfix" />
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
                                    <form >
                                        <div className="row">                                           
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input type="text"  className="form-control" name = "name" value={this.state.name} onChange={this.onChange}  placeholder="Enter name customer"/>
                                                </div>
                                            </div>    
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input type="number" min="1" max="11"  className="form-control" name = "phone" value={this.state.phone} onChange={this.onChange}  placeholder="Enter name phone"/>
                                                </div>
                                            </div>           
                                        </div>
                                        <div className="row">                                           
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input  className="form-control" type="email"  name = "email" value={this.state.email} onChange={this.onChange} placeholder="Enter email customer" />
                                                </div>
                                            </div>            
                                        </div>
                                        
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">                                         
                                                    <input type="text" name="user" className="form-control" value={this.state.user} onChange={this.onChange} placeholder="Enter username customer "/>
                                                </div>
                                            </div>             
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">                                         
                                                <input type="text" name="locaiton" name="location" className="form-control" value={this.state.location} onChange={this.onChange} placeholder="Enter location of user" />
                                                </div>
                                            </div>                                    
                                        </div>
                                                                           
                                        <button type="button" className="btn btn-info btn-block btn-round" onClick={this.postData}>Add User</button>
                                        <div className="clearfix" />
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
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead className=" text-primary">
                                <tr>
                                    <th>Id</th>
                                    <th>Email</th>
                                    <th>User Name</th>
                                    <th>Phone</th>
                                    <th>Locaiton</th>                
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
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
                                            <ul className="list-inline m-0">
                                                <li className="list-inline-item">                                              
                                                    <span className="btn btn-success btn-sm rounded-0">{a.status}</span>
                                                </li> 
                                                <li className="list-inline-item">                                              
                                                    <BootstrapSwitchButton checked={a.checkStatus} onstyle="light" offstyle="dark" width={100}  style={{backgroundColor: 'blue'}} onChange={
                                                        ()=>{
                                                                if(a.checkStatus===true){
                                                                        // alert("true")
                                                                    let check1=false;
                                                                    let check2='lock';                                                            
                                                                        axios({
                                                                            method: 'PUT',
                                                                            url: `https://data-json-server.herokuapp.com/api/users/${a.id}`,
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
                                                                            url: `https://data-json-server.herokuapp.com/api/users/${a.id}`,
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
                                                </li>
                                                                                       
                                            </ul>                    
                                                
                                        </td>
                                        <td>
                                            <ul className="list-inline m-0">
                                                <li className="list-inline-item"> 
                                                                                             
                                                    <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="modal" data-target="#updateUserModal" data-placement="top" title="Edit" onClick={()=>this.updateData(a.id)}><i className="fa fa-edit" /></button>
                                                </li>
                                                <li className="list-inline-item">
                                                   <button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={()=>this.delete(a.id)}><i className="fa fa-trash" /></button>
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
                {/* <div className="tab" style={{ width: '400px' }}>
                    <table>
                        <thead>
                            <th>Id</th>
                            <th>Email</th>
                            <th>User Name</th>
                            <th>Phone</th>
                            <th>Locaiton</th>                
                            <th>Status</th>
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
                                            <ul className="list-inline m-0">
                                                <li className="list-inline-item">                                              
                                                    <span className="btn btn-success btn-sm rounded-0">{a.status}</span>
                                                </li> 
                                                <li className="list-inline-item">                                              
                                                    <BootstrapSwitchButton checked={a.checkStatus} onstyle="light" offstyle="dark" width={100}  style={{backgroundColor: 'blue'}} onChange={
                                                        ()=>{
                                                                if(a.checkStatus===true){
                                                                        // alert("true")
                                                                    let check1=false;
                                                                    let check2='lock';                                                            
                                                                        axios({
                                                                            method: 'PUT',
                                                                            url: `https://data-json-server.herokuapp.com/api/users/${a.id}`,
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
                                                                            url: `https://data-json-server.herokuapp.com/api/users/${a.id}`,
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
                                                </li>
                                                                                       
                                            </ul>                    
                                                
                                        </td>
                                        <td>
                                            <ul className="list-inline m-0">
                                                <li className="list-inline-item">                                              
                                                    <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="modal" data-target="#updateUserModal" data-placement="top" title="Edit" onClick={()=>this.updateData(a.id)}><i className="fa fa-edit" /></button>
                                                </li>
                                                <li className="list-inline-item">
                                                   <button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={()=>this.delete(a.id)}><i className="fa fa-trash" /></button>
                                                </li>
                                            </ul>      
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div> */}
            </div>
        );
    }
}

export default AllUser;