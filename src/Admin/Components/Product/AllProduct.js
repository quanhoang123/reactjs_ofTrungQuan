import {Component} from 'react';
import axios from 'axios';
// import {Img} from 'react-image';

class AllProduct extends Component {
  constructor(props){
    super(props);
        this.state = {
        products : [],
        sort: true,
            id:'',
            name: "",
            img: "",
            price: ""     
        }
  }

showProducts=(event)=> {
    let key = event.target.name;
    let value = event.target.value;
    this.setState({[key]: value});
}

clear=()=>{
    this.setState({title:""})
    this.setState({img:""})
    this.setState({price:""})
  }
  
  postData=(event)=> {
    event.preventDefault();
    var {title, img, price} = this.state;
        axios({
            method: 'POST',
            url: 'http://localhost:9000/products',
            data: {
            title: title,
            img: img,
            price: price
            }
        }).then( res =>{
            this.clear()
            this.getData();
        }).catch(err=>{
            alert(err);
        });
  }

    getData=()=>{
        axios({
        method: 'GET',
        url: 'http://localhost:9000/products',
        data: null
        }).then( res =>{
        this.setState({products: res.data});
        }).catch(err=>{});
    }

    update = (id) =>{
        document.getElementById("form").style.display="none"
        axios({
        method: 'PUT',
        url: `http://localhost:9000/products/${id}`,
        data: {
            name: this.state.name,
            img: this.state.img,
            price: this.state.price
        }
        }).then( res =>{
            alert("Cap nhat thanh cong !");
            this.clear()
            this.getData()
        }).catch(err=>{});
    }

    updateData =(id)=>{
        this.clear();
        document.getElementById("form").style.display="block"
        var products=this.state.products;
        products.filter(pro=>{
        if(pro.id === id){
            this.setState({
            id:pro.id,
            name:pro.name,
            img:pro.img,
            price:pro.price,
            })
        }
        })
    }

    delete =(id)=>{
        axios({
        method: 'DELETE',
        url: `http://localhost:9000/products/${id}`,
        data: null
        }).then( res =>{
            this.getData();
        }).catch(err=>{});
    }

    componentDidMount(){
        this.getData();
    }

    render() {
        return(
        <div>
            <div id="form" style={{display: "none"}}>
            <form className="row g-3" style={{ backgroundImage: "linear-gradient(#CAE1FF, #BCD2EE)", margin: "30px", padding: "20px", borderRadius: "10px", width: "300px"}}>
                <label>Update</label>
                <div className="col-12">
                    <input type="text" name = "title" value={this.state.title} onChange={this.showProducts} />
                </div>
                <div className="col-12">
                    <input type="text" name = "img" value={this.state.img} onChange={this.showProducts} />
                </div>
                <div className="col-12">
                    <input type="text" name = "price" value={this.state.price} onChange={this.showProducts} />
                </div>
                <div className="col-12">
                    <button type="button" className="btn btn-primary" onClick={()=>this.update(this.state.id)}>
                        Update
                    </button>
                </div>
            </form>
            </div>
            <div className="tab" style={{display: "flex", width: '400px'}}>
            {
            this.state.products.map(a=>{
            return(
                <div key={a.id}>
                <div className="card" style={{width: '200px'}}>
                    <img className="card-img-top" src={a.img} alt="Card image" />
                    <div className="card-body">
                    <h4 className="card-title">{a.title}</h4>
                    <p className="card-text">{a.price}</p>
                    <button onClick={()=>this.updateData(a.id)}>update</button>
                    <button onClick={()=>this.delete(a.id)}>delete</button>
                    </div>
                </div>        
                </div>
            )
            })}
            </div>
        </div>
        )
  }
}

export default AllProduct;