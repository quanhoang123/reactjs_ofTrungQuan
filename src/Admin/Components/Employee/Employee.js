import { Component } from 'react';
import axios from 'axios';
import "./Employee.css";

class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _shipper: [],        
            id: '',
            name: "", 
            avatar:"",
            amoutOfChuyen: "",
            bienSoXe:"",
            phone:"",  
            salary:"",
            status:"",
           
        }
        this.previewImage=this.previewImage.bind(this);
        // this.postData=this.postData.bind(this);
        // this.update=this.update.bind(this);
    }

    onChange = (event) => {
        let key = event.target.name;
        let value = event.target.value;
        this.setState({ [key]: value });
    }

    clear = () => {  
        this.setState({ name: "" })
        this.setState({ avatar: "" })
        this.setState({ amoutOfChuyen: "" })
        this.setState({ bienSoXe: "" })
        this.setState({ phone: "" })
        this.setState({ salary: "" })
    }
    
    postDrinks = (event) => {
        console.log("hihihi");
        event.preventDefault();
        var { name,avatar,amoutOfChuyen, bienSoXe, phone,salary} = this.state;
        axios({
            method: 'POST',
            url: 'http://localhost:8080/api/shiper',
            data: {
                name:name,
                avatar: avatar,
                amoutOfChuyen: amoutOfChuyen,
                bienSoXe: bienSoXe,
                phone: phone,
                salary:salary
            }
        }).then(res => {
            this.clear();     
            this.getData();
            alert("Add Empoloyee successly");
            window.location.reload();
        }).catch(err => {
            alert(err);
        });
    }

    getData = () => {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/shiper',
            data: null
        }).then(res => {
            this.setState({ 
                _shipper: res.data,
                id:res.data.length,
            });
            // console.log(this.state.drinks.length);
        }).catch(err => { });
          
    }

    previewImage(){
        const preview=document.getElementById('avatarEmp');     
        const file=document.getElementById('imageEmployeeUpdate').files[0];

        let reader = new FileReader();
        reader.addEventListener(
            "load",
            ()=>{
                preview.src=reader.result;
                this.setState(
                   {
                    avatar:reader.result
                   }
                )
                console.log(reader.result);
            },
            false
        )
        if(file){
            reader.readAsDataURL(file);
        }
    }

    update = (id) => {
        var { name,avatar,amoutOfChuyen, bienSoXe, phone,salary} = this.state;
        axios({
            method: 'PUT',
            url: `http://localhost:8080/api/shiper/${id}`,
            data: {
                name:name,
                avatar: avatar,
                amoutOfChuyen: amoutOfChuyen,
                bienSoXe: bienSoXe,
                phone: phone,
                salary:salary       
            }
        }).then(res => {
            alert("Update drink successly !");
            this.clear()
            this.getData()
            window.location.reload()
        }).catch(err => { });
    }

    updateData = (id) => {
        this.clear();
        var shipper = this.state._shipper;
        shipper.filter(_shipper => {
            if (_shipper.id === id) {
                this.setState({
                    name:_shipper.name,
                    avatar: _shipper.avatar,
                    amoutOfChuyen: _shipper.amoutOfChuyen,
                    bienSoXe: _shipper.bienSoXe,
                    phone: _shipper.phone,
                    salary:_shipper.salary 
                })
            }
        })
    }

    delete = (id) => {
        if(window.confirm('Bạn Co Thuc Su Muon Xoa')){
            axios({
                method: 'DELETE',
                url: `http://localhost:8080/api/shiper/${id}`,
                data: null
            }).then(res => {
                this.getData();
            }).catch(err => { });
        
		}else{
			window.location.reload();
		}        
    }

    componentDidMount() {
        this.getData();
    }
    render() {  
        return (
            <div >
                <div className="modal fade" id="addEmployeeModal" tabindex="{-1}" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content"> 
                            <div className="modal-header border-bottom-0">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-title text-center">
                                    <h4>Add Employee</h4>
                                </div>
                                <div className="d-flex flex-column text-center">
                                    <form onSubmit={this.postDrinks}  encType="multipart/form-data">
                                        <div className="form-group">
                                            <input type="text" name = "name" value={this.state.name} onChange={this.onChange} placeholder="Enter name of employee" />
                                        </div>
                                        <div className="form-group">
                                            <input type="file" name = "avatar"  id="imageEmployeeUpdate"  value={this.state.avatar} onChange={this.previewImage}/>
                                        </div>
                                        
                                        <div className="form-group">
                                            <input type="text" name = "bienSoXe" value={this.state.bienSoXe} onChange={this.onChange} placeholder="Enter bienSoXe of employee" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" min="0" max="11" name = "phone" value={this.state.phone} onChange={this.onChange} placeholder="Enter phone of employee"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="number" name = "salary" value={this.state.salary} onChange={this.onChange} placeholder="Enter salary of employee"/>
                                        </div>                                 
                                        <button type="submit"  className="btn btn-info btn-block btn-round" >Post Drink</button>
                                    </form>
                                  
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="updateEmployeeModal" tabindex="{-1}" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-bottom-0">
                                
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                               <span aria-hidden="true" >×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-title text-center">
                                    <h4>Update Employee</h4>
                                </div>  
                                <div className="d-flex flex-column text-center">
                                <form encType="multipart/form-data">
                                        <div className="form-group">

                                            <input type="text" name = "name" value={this.state.name} onChange={this.onChange} placeholder="Enter name of employee" />
                                        </div>
                                        <div className="form-group">
                                            <input type="file" name = "avatar"  id="imageEmployeeUpdate"  value={this.state.avatar} onChange={this.previewImage}/>
                                        </div>
                                        
                                        <div className="form-group">
                                            <input type="text" name = "bienSoXe" value={this.state.bienSoXe} onChange={this.onChange} placeholder="Enter bienSoXe of employee" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" min="0" max="11" name = "phone" value={this.state.phone} onChange={this.onChange} placeholder="Enter phone of employee"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="number" name = "salary" value={this.state.salary} onChange={this.onChange} placeholder="Enter salary of employee"/>
                                        </div>   
                                        <button type="button" className="btn btn-info btn-block btn-round" onClick={() => this.update(this.state.id)}>Update</button>
                                    </form>                                                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Search               */}
                           
                    <form className="navbar-form" action>
                    <button  className="btn btn-primary btn-sm rounded-0" type="button" data-toggle="modal" data-target="#addEmployeeModal" data-placement="top" title="Add Employee"><i className="fa fa-plus-circle" /></button> 
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Search" name="searchEmployee" id="search" style={{width: '25vh'}} />
                        </div>      
                    </form>          
                <div className="tab">
                    <table>
                        <thead>
                            <th>Id</th>
                            <th>Name Employee</th>
                            <th>Avatar</th>
                            <th>Amount of trips</th>
                            <th>License Plates</th>
                            <th>Phone</th>
                            <th>Salary</th>                          
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {
                                this.state._shipper.map(a => (
                                    <tr key={a.id}>
                                        
                                        <td>{a.id}</td>
                                        <td>{a.name}</td>
                                        <td><img src={a.avatar} width="200px" height="200px" id="avatarEmp" className="text-center"/></td>
                                        <td>{a.amoutOfChuyen}</td>
                                        <td>{a.bienSoXe}</td>
                                        <td>{a.phone}</td>
                                        <td>{a.salary}</td>
                                                                             
                                        <td>
                                            <ul className="list-inline m-0">
                                                <li className="list-inline-item">                                              
                                                    <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="modal" data-target="#updateEmployeeModal" data-placement="top" title="Edit" onClick={()=>this.updateData(a.id)}><i className="fa fa-edit" /></button>
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
        );
    }
}

export default Employee;

