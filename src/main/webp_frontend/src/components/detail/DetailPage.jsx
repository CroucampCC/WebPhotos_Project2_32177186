import React from 'react';
import UserService from '../../services/user.service';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import { saveAs } from 'file-saver'

class DetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            product: JSON.parse(localStorage.getItem('currentProduct'))
        };

        this.deleteProductRequest = this.deleteProductRequest.bind(this);
    }

      deleteProductRequest(product){
        UserService.deleteProduct(product).then(res =>{
             this.setState({products: this.state.products.filter(product => product !== product)});
         });
          this.props.history.push("/home");
     }


        downloadImage(imageUrl){
            saveAs(imageUrl,'image.png')
        }


    render() {
        let imageUrl = this.state.product.url
        return (
            <div className="jumbotron">
                <h1 className="display-4">Photo: {this.state.product.name}</h1>
                <h1 className="display-4">Photo Id: {this.state.id}</h1>
                <img src={imageUrl} height="100%" width={"100%"}/>
               {/* <button className="btn btn-danger" onClick={() => this.deleteProductRequest(this.state.product)}><FontAwesomeIcon icon={faTrashAlt} /></button>*/}
                <button  onClick={this.downloadImage(imageUrl)}></button>
            </div>

        );
    }

}

export {DetailPage};
