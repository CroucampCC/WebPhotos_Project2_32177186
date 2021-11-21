import React, {Component} from 'react';
import {User} from "../../models/user";
import {Product} from "../../models/product";
import UserService from "../../services/user.service";

class CreatePhoto extends Component {


    constructor(props) {
        super(props);

        this.state = {
            product: new Product('', 0, '', '', '', -1),
            submitted: false,
            loading: false,
            errorMessage: ''
        };
    }

    handleChange(e) {
        var {name, value} = e.target;
        var product = this.state.product;
        product[name] = value;
        this.setState({product: product});
    }

    handleRegister(e) {
        e.preventDefault();
        this.setState({submitted: true});
        const{product} = this.state;

        if(!(product.name && product.price && product.explanation && product.url && product.location)){
            return;
        }

        this.setState({loading: true});
        UserService.createProduct(product)
            .then(
                data => {

                    this.props.history.push("/home");

                },
                error => {
                    this.setState({
                        errorMessage: "Unexpected error occurred.",
                        loading: false
                    });
                }
            );
    }





    render() {
        const {product, submitted, loading, errorMessage} = this.state;
        return (

            <div>

                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"card col-md6 offset-md-3 offset-md-3"}>
                            <h1 className={"text-center"}> Create New Photo data</h1>
                            <div className={"card-body"}>
                                <form name="form" onSubmit={(e) => this.handleRegister(e)}>
                                    <div className={'form-group' + (submitted && product.name ? 'has-error': '')}>
                                        <label htmlFor="name">Photo name</label>
                                        <input type="text" className="form-control" name="name" value={product.name} onChange={(e)=>this.handleChange(e)}/>
                                        {submitted && !product.name &&
                                        <div className="alert alert-danger" role="alert">Name is required.</div>
                                        }
                                    </div>

                                    <div className={'form-group' + (submitted && product.price ? 'has-error': '')}>
                                        <label htmlFor="name">Price</label>
                                        <input type="text" className="form-control" name="price" value={product.price} onChange={(e)=>this.handleChange(e)}/>
                                        {submitted && !product.price &&
                                        <div className="alert alert-danger" role="alert">Price is required.</div>
                                        }
                                    </div>

                                    <div className={'form-group' + (submitted && product.explanation ? 'has-error': '')}>
                                        <label htmlFor="name">Description</label>
                                        <input type="text" className="form-control" name="explanation" value={product.explanation} onChange={(e)=>this.handleChange(e)}/>
                                        {submitted && !product.explanation &&
                                        <div className="alert alert-danger" role="alert">Description is required.</div>
                                        }
                                    </div>

                                    <div className={'form-group' + (submitted && product.location ? 'has-error': '')}>
                                        <label htmlFor="name">Location</label>
                                        <input type="text" className="form-control" name="location" value={product.location} onChange={(e)=>this.handleChange(e)}/>
                                        {submitted && !product.location &&
                                        <div className="alert alert-danger" role="alert">url is required.</div>
                                        }
                                    </div>

                                    <div className={'form-group' + (submitted && product.url ? 'has-error': '')}>
                                        <label htmlFor="name">URL Address</label>
                                        <input type="text" className="form-control" name="url" value={product.url} onChange={(e)=>this.handleChange(e)}/>
                                        {submitted && !product.url &&
                                        <div className="alert alert-danger" role="alert">url is required.</div>
                                        }
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-lg btn-primary btn-block btn-signin form-submit-button " disabled={loading}>Create Photo Data</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default CreatePhoto;
