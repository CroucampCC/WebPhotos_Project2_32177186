import React from 'react';

class DetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            product: JSON.parse(localStorage.getItem('currentProduct'))
        };
    }

    render() {
        let imageUrl = this.state.product.url
        return (
            <div className="jumbotron">
                <h1 className="display-4">Photo: {this.state.product.name}</h1>
                <h1 className="display-4">Photo Id: {this.state.id}</h1>
                <img src={imageUrl} height="100%" width={"100%"}/>


            </div>

        );
    }

}

export {DetailPage};
