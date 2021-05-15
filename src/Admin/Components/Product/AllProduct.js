import { Component } from 'react';
import axios from 'axios';
import "./allProduct.css";

class AllProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _drinks: [],        
            id: '',
            categories:"",
            name: "", 
            img: "",
            description:"",
            sale:"",  
            star:"",
            price:"",
           
        }
        this.previewImage=this.previewImage.bind(this);
        // this.postData=this.postData.bind(this);
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
        // this.setState({ start: "" })
    }
    
    postDrinks = (event) => {
        console.log("hihihi");
        event.preventDefault();
        var { categories,name,img, description, sale,price} = this.state;
        axios({
            method: 'POST',
            url: 'https://data-json-server.herokuapp.com/api/products',
            data: {
                categories:categories,
                name: name,
                detail_image: img,
                description: description,
                sale: sale,
                price:price
            }
        }).then(res => {
            this.clear();     
            this.getData();
            alert("Add drink successly");
            window.location.reload();
        }).catch(err => {
            alert(err);
        });
    }

    getData = () => {
        axios({
            method: 'GET',
            url: 'https://data-json-server.herokuapp.com/api/products',
            data: null
        }).then(res => {
            this.setState({ 
                _drinks: res.data,
                id:res.data.length,
            });
            // console.log(this.state.drinks.length);
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
        var { categories,name,img, description, sale,price} = this.state;
        axios({
            method: 'PUT',
            url: `https://data-json-server.herokuapp.com/api/products/${id}`,
            data: {
                categories:categories,
                name: name,
                detail_image: img,
                description: description,
                sale: sale,
                price:price    
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
            axios({
                method: 'DELETE',
                url: `https://data-json-server.herokuapp.com/api/products/${id}`,
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
                <div className="modal fade" id="addDrinkModal" tabindex="{-1}" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <form onSubmit={this.postDrinks}  encType="multipart/form-data">
                                        <div className="form-group">
                                            <input type="text" name = "categories" value={this.state.categories} onChange={this.onChange} placeholder="Enter categories of drink" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name = "name" value={this.state.name} onChange={this.onChange} placeholder="Enter name of drinks" />
                                        </div>
                                        <div className="form-group">
                                            <input type="file" name = "detail_image"  id="imageDrinkUpdate"  value={this.state.detail_image} onChange={this.previewImage}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name = "description" value={this.state.description} onChange={this.onChange} placeholder="Enter description of drinks" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name = "price" value={this.state.price} onChange={this.onChange} placeholder="Enter price of drink"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="number" name = "sale" value={this.state.sale} onChange={this.onChange} placeholder="Enter sale of drinks"/>
                                        </div>                                 
                                        <button type="submit"  className="btn btn-info btn-block btn-round" >Post Drink</button>
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
                                <form  encType="multipart/form-data" >
                                        <div className="form-group">
                                            <input type="text" name = "categories" value={this.state.categories} onChange={this.onChange} placeholder="Enter categories of drink" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name = "name" value={this.state.name} onChange={this.onChange} placeholder="Enter name of drinks" />
                                        </div>
                                        <div className="form-group">
                                            <input type="file" name = "detail_image" id="imageDrinkUpdate" value={this.state.detail_image} onChange={this.previewImage}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name = "description" value={this.state.description} onChange={this.onChange} placeholder="Enter description of drinks" />
                                        </div>
                                        <div className="form-group">
                                            <input type="number" name = "price" value={this.state.price} onChange={this.onChange} placeholder="Enter price of drink"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="number" name = "sale" value={this.state.sale} onChange={this.onChange} placeholder="Enter sale of drinks"/>
                                        </div>     
                                        <button type="button" className="btn btn-info btn-block btn-round" onClick={()=>this.update(this.state.id) }>Update</button>
                                    </form>                                                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Search               */}
                           
                    <form className="navbar-form" action>
                    <button  className="btn btn-primary btn-sm rounded-0" type="button" data-toggle="modal" data-target="#addDrinkModal" data-placement="top" title="Add Drink"><i className="fa fa-plus-circle" /></button> 
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Search" name="searchDrink" id="search" style={{width: '25vh'}} />
                        </div>      
                    </form>          
                <div className="tab">
                    <table>
                        <thead>
                            <th>Id</th>
                            <th>Id Categories</th>
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
                                this.state._drinks.map(a => (
                                    <tr>
                                        
                                        <td>{a.id}</td>
                                        <td>{a.categories}</td>
                                        <td>{a.name}</td>
                                        <td><img src={a.detail_image} width="200px" height="100px" id="imageDrink"/></td>
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
        );
    }
}

export default AllProduct;
