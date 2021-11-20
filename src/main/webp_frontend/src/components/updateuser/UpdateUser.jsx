import React, {Component} from 'react';
import {User} from "../../models/user";
import UserService from "../../services/user.service";
import AdminService from "../../services/admin.service";
import $ from 'jquery';

class UpdateUser extends Component {
    userRole;

    constructor(props){
        super(props);



        this.state = {
            username: this.props.match.params.username,
            submitted: false,
            loading: false,
            errorMessage: ''
        };

        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount(){
            AdminService.findUserByUsername(this.state.id).then((res)=>{
                let user = res.data;
                this.setState({name: user.name,username: user.username,password: user.password,role: user.role});
            })
    }



    updateUser = (e) => {
        e.preventDefault();
        let user = {name: this.state.name, username: this.state.username, password: this.state.password};
        console.log('user =>' + JSON.stringify(user));

    }



    handleChange(e) {
        var {name, value} = e.target;
        var user = this.state.user;
        user[name] = value;
        this.setState({user: user});
    }

    handleRegister(e) {
        e.preventDefault();
        this.setState({submitted: true});
        const{user} = this.state;

        if(!(user.username && user.password && user.name)){
            return;
        }

        this.setState({loading: true});
        UserService.register(user)
            .then(
                data => {
                    this.userRole =  UserService.currentUserValue;
                    if( this.userRole === "USER"){
                        this.props.history.push("/login");
                    }
                    else{
                        this.props.history.push("/admin");
                    }

                },
                error => {
                    if(error.response.status === 409){
                        this.setState({
                            errorMessage: "Username is not available",
                            loading: false
                        });
                    }else{
                        this.setState({
                            errorMessage: "Unexpected error occurred.",
                            loading: false
                        });
                    }
                }
            );
    }

    render() {
        const {user, submitted, loading, errorMessage} = this.state;
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img id="profile-id" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
                    {errorMessage &&
                    <div className="alert alert-danger" role="alert">
                        <strong>Error! </strong> {errorMessage}
                    </div>
                    }
                    <form name="form" onSubmit={(e) => this.handleRegister(e)}>
                        <div className={'form-group' + (submitted && user.name ? 'has-error': '')}>
                            <label htmlFor="name">Full Name</label>
                            <input type="text" className="form-control" name="name" value={user.name} onChange={(e)=>this.handleChange(e)}/>
                            {submitted && !user.name &&
                            <div className="alert alert-danger" role="alert">Full name is required.</div>
                            }
                        </div>

                        <div className={'form-group' + (submitted && user.username ? 'has-error': '')}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={user.username} onChange={(e)=>this.handleChange(e)}/>
                            {submitted && !user.username &&
                            <div className="alert alert-danger" role="alert">Username is required.</div>
                            }
                        </div>

                        <div className={'form-group' + (submitted && user.password ? 'has-error': '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={user.password} onChange={(e)=>this.handleChange(e)}/>
                            {submitted && !user.password &&
                            <div className="alert alert-danger" role="alert">Password is required.</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && user.role ? 'has-error': '')}>
                            <label htmlFor="role">Role</label>
                            <input type="role" className="form-control" name="role" value={user.role} onChange={(e)=>this.handleChange(e)}/>
                            {submitted && !user.role &&
                            <div className="alert alert-danger" role="alert">Role needed.</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-lg btn-primary btn-block btn-signin form-submit-button" onClick={this.updateUser}>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateUser;