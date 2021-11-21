/*
import React, {Component} from 'react';
import {storage} from "../firebase";

class CreatePhoto extends Component {


    constructor(props, context) {
        super(props, context);

        this.state = {
            image: null,
            url: ""
        };

        this.handleChange =this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);

    }

    handleChange = e =>{
        if(e.target.files[0]){
            const image = e.target.files[0];
            this.setState(() =>({image}));
        }
    }



    handleUpload = () => {
        const {image} = this.state;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on("state_changed",snapshot =>{},error => {
            console.log(error);
        },()=>{
            storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url =>{
                    console.log(url);
                })
        })
    };

    render() {
        return (
            <div>
                <tr>
                    <input type="file" className={"btn btn-warning"} onChange={this.handleChange}/>
                    <button className="btn btn-info" onClick={this.handleUpload}>Upload Photos</button>
                </tr>

            </div>
        );
    }
}

export default CreatePhoto;*/
