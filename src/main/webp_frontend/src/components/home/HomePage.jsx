import React, {useState} from 'react';
import UserService from '../../services/user.service';
import {User} from '../../models/user';
import {Transaction} from '../../models/transaction';
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {storage} from '../firebase';
import AdminService from "../../services/admin.service";
import {Link} from "react-router-dom";
import {Product} from "../../models/product";

class HomePage extends React.Component {
    products;
    image;


    constructor(props) {
        super(props);

        this.state = {
            selectedProduct: new Product(),
            products: [],
            errorMessage: '',
            infoMessage: '',
            currentUser: new User(),
            image: null,
            url: '',
            setQ:''
        };




        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.deleteProductRequest = this.deleteProductRequest.bind(this);


    }


    /*deleteProductRequest = (product) => {
        UserService.deleteProduct(product).then((response) => {
            this.getAllProducts();

        }).catch((error) => {
            console.log(error);
        })
    }*/

    createProductRequest() {
        this.setState({ selectedProduct: new Product('','','','',-1) });
        this.setState({
            showModal: true
        });
    }

      deleteProductRequest(productID){
          console.log(productID)
         UserService.deleteProduct(productID).then(res =>{
              this.setState({products: this.state.products.filter(product => product !== product)});
          });
          window.location.reload(true);
      }


    handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({image}));
        }
    }


    handleUpload = () => {
        const {image} = this.state;
        const uploadTask = storage.ref(image.name).put(image);
        uploadTask.on("state_changed", snapshot => {
        }, error => {
            console.log(error);
        }, () => {
            storage
                .ref()
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    console.log(url);
                })
        })
    };

    getAllProducts = () => {
        UserService.findAllProducts().then(products => {
            this.setState({products: products.data});
        });

    }




    componentDidMount() {
        UserService.currentUser.subscribe(data => {
            this.setState({
                currentUser: data
            })
        });

        this.setState({
            products: {loading: true}
        });

        this.getAllProducts();

    }


    detail(product) {
        localStorage.setItem('currentProduct', JSON.stringify(product));
        this.props.history.push('/detail/' + product.id);
    }

    render() {
        const {products, infoMessage, errorMessage} = this.state;
        return (

            <div className="col-md-12">
                <tr>
                    <input type="file" className={"btn btn-warning"} onChange={this.handleChange}/>
                    <button className="btn btn-info" onClick={this.handleUpload}>Upload Photos</button>
                    <Link to={"/product-create"} className="btn btn-primary"> Create Photo data</Link>
                </tr>

                {infoMessage &&
                <div className="alert alert-success">
                    <strong>Successfull! </strong> {infoMessage}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                }
                {errorMessage &&
                <div className="alert alert-danger">
                    <strong>Error! </strong> {errorMessage}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                }
                <div>
                    <input type={"text"} value={""} onChange={(e) => this.setQ(e.target.value)}/>
                </div>
                {products.loading && <em> Loading products...</em>}
                {products.length &&
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Url</th>
                        <th scope="col">Location</th>
                        <th scope="col">Detail</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) =>
                        <tr key={product.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{product.name}</td>
                            <td>{'R ' + product.price}</td>
                            <td>
                                <img src={product.url} height="25%" width={"25%"}/>
                            </td>
                            <td>{product.location}</td>
                            <td>
                                <button className="btn btn-info" onClick={() => this.detail(product)}>Download</button>

                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => this.deleteProductRequest(product.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt}/></button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                }
            </div>
        );
    }


}

export {HomePage};
