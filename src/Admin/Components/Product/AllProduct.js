import React, { Component } from 'react';

import callAPI from '../CallAPI/callApi';


class AllProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _drinks: [],
            _searchDrink:[],      
            id: '',
            name: "", 
            img: "",
            description:"",
            sale:"", 
            categories :"",  
            price:"",
            star:"",      
        }

        this.previewImage=this.previewImage.bind(this);  
        this.update=this.update.bind(this);
    }

    onChange = (event) => {
        let key = event.target.name;
        let value = event.target.value;
        this.setState({ [key]: value });
    }

    clear = () => {  
        this.setState({ categories: "" })
        this.setState({ name: "" })
        this.setState({ img: "" })
        this.setState({ description: "" })
        this.setState({ sale: "" })
        this.setState({ price: "" })
      
    }
    
    postDrinks = (event) => {
        event.preventDefault();
        var { name,categories,img, description, sale,price} = this.state;
        var data1={
                categories:categories,
                name: name,
                detail_image: img,
                description: description,
                sale: sale,
                price:price
        }
        if(name==="" || categories==="" || img==="" || description===""||sale===""|| price===""){
            alert('Vui lòng nhập đầy đủ thông tin');
        }else
        callAPI("products", "POST", data1).then((response) => {
            this.clear();     
            this.getData();
            alert("Add drink successly");
            event.target.reset();
                
        });
        
    }
    getData = () => {
        callAPI('products','GET',null).then(res=>{
            this.setState({ 
                _drinks: res.data,
                _searchDrink:res.data,
                id:res.data.length,
            });
        }).catch(err => { });  
    }

    previewImage(){
        const preview=document.getElementById('imageDrink');     
        const file=document.getElementById('imageDrinkUpdate').files[0];
        let reader = new FileReader();
        reader.addEventListener(
            "load",
            ()=>{
                preview.src=reader.result;
                this.setState(
                   {
                    img:reader.result
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
        console.log("hihih");
        console.log(this.state.id);
        var { name,img, description, sale,price} = this.state;
        var data1={
            name: name,
            detail_image: img,
            description: description,
            sale: sale,
            price:price
        }
        callAPI(`products/${id}`, "PUT", data1).then((response) => {
            alert("Update drink successly !");
            this.clear()
            this.getData()
            window.location.reload()
        });
       
    }

    updateData = (id) => {
        this.clear();
        var drinks = this.state._drinks;
        drinks.filter(drink => {
            if (drink.id === id) {
                this.setState({
                    categories:drink.categories,
                    name: drink.name,
                    detail_image: drink.img,
                    description: drink.description,
                    sale: drink.sale,
                    price:drink.price 
                })
            }
        })
    }

    delete = (id) => {
        if(window.confirm('Bạn Co Thuc Su Muon Xoa')){
            callAPI(`products/${id}`, "DELETE", null).then((response) => {
                this.getData();
                alert("Xoá thành công!");
            });
   
        
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
          const _searchDrink = prevState._searchDrink.filter((el) =>
            el.name.toLowerCase().includes(lowercasedValue)
          );
    
          return { _searchDrink };
        });
        if(value===""){
            window.location.reload();
        }
    };

    render() {  
        console.log(this.state.img.toString());
        const {_searchDrink}=this.state;
        return (
            <div >              
                <div className="modal fade" id="addDrinkModal1" tabindex="{-1}" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content"> 
                            <div className="modal-header border-bottom-0">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-title text-center">
                                    <h4>Add Drinks</h4>
                                </div>
                                <div className="d-flex flex-column text-center">
                                    <form onSubmit={this.postDrinks}>
                                        <div className="row">                                           
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" name = "name" value={this.state.name} onChange={this.onChange} placeholder="Enter name of drinks" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" name = "categories" value={this.state.categories} onChange={this.onChange} placeholder="Enter catefories of drinks" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="group">                                         
                                                    <input type="file" name = "detail_image" className="form-control"  id="imageDrinkUpdate" onChange={this.previewImage}/>
                                                </div>
                                            </div>             
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">                                         
                                                <input type="text" className="form-control" name = "description" value={this.state.description} onChange={this.onChange} placeholder="Enter description of drinks" />
                                                </div>
                                            </div>                                    
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">                                     
                                                    <input type="text" className="form-control" name = "price" value={this.state.price} onChange={this.onChange} placeholder="Enter price of drink"/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input type="number" className="form-control" name = "sale" value={this.state.sale} onChange={this.onChange} placeholder="Enter sale of drinks"/>
                                                </div>
                                            </div>
                                        </div>                                    
                                        <button type="submit" className="btn btn-primary pull-right">Post Drink</button>
                                        <div className="clearfix" />
                                    </form>                     
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="updateDrinkModal" tabindex="{-1}" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-bottom-0">
                                
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                               <span aria-hidden="true" >×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-title text-center">
                                    <h4>Update Drink</h4>
                                </div>  
                                <div className="d-flex flex-column text-center">
                                    <form onSubmit={this.postDrinks}>
                                            <div className="row">                                           
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" name = "name" value={this.state.name} onChange={this.onChange} placeholder="Enter name of drinks" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" name = "categories" value={this.state.categories} onChange={this.onChange} placeholder="Enter name of drinks" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="group">                                         
                                                        <input type="file" name = "detail_image" className="form-control"  id="imageDrinkUpdate" onChange={this.previewImage}/>
                                                    </div>
                                                </div>             
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">                                         
                                                    <input type="text" className="form-control" name = "description" value={this.state.description} onChange={this.onChange} placeholder="Enter description of drinks" />
                                                    </div>
                                                </div>                                    
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">                                     
                                                        <input type="text" className="form-control" name = "price" value={this.state.price} onChange={this.onChange} placeholder="Enter price of drink"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input type="number" className="form-control" name = "sale" value={this.state.sale} onChange={this.onChange} placeholder="Enter sale of drinks"/>
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
                {/* Search               */}
                    <form className="navbar-form" action>
                    <button  className="btn btn-primary btn-sm rounded-0" type="button" data-toggle="modal" data-target="#addDrinkModal1" data-placement="top" title="Add Drink"><i className="fa fa-plus-circle" /></button> 
                        <div className="form-group">
                             <input type="file" name = "detail_image"  value={this.state.detail_image} onChange={this.onImageChange}/>
                            <input type="text" className="form-control" placeholder="Search"  onChange={this._handleSearchChange}  style={{width: '25vh'}} />
                        </div>      
                    </form>   
                    <div className="card-body">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className=" text-primary">
                                        <th>Id</th>                          
                                        <th>Name</th>
                                        <th>Image</th>  
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Sale</th>
                                        <th>Star</th>
                                        <th>Action</th>
                                    </thead>                      
                                    <tbody>
                                        {
                                        _searchDrink.map(a => (
                                                <tr>                                       
                                                    <td>{a.id}</td>                                       
                                                    <td>{a.name}</td>
                                                    <td><img src={a.detail_image} width="200px" height="100px" id="imageDrink" /></td>
                                                    <td>{a.description}</td>
                                                    <td>{a.price}</td>
                                                    <td>{a.sale}</td>
                                                    <td>{a.star}</td>                                            
                                                    <td>
                                                        <ul className="list-inline m-0">
                                                            <li className="list-inline-item">                                              
                                                                <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="modal" data-target="#updateDrinkModal" data-placement="top" title="Edit" onClick={()=>this.updateData(a.id)}><i className="fa fa-edit" /></button>
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

            </div>
        );
    }
}

export default AllProduct;
