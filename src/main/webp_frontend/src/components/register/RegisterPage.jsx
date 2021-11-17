import React from 'react';
import UserService from '../../services/user.service';
import {User} from '../../models/user';
import './RegisterPage.css';

class RegisterPage extends React.Component {
    constructor(props){
        super(props);

        if(UserService.currentUserValue){
            this.props.history.push('/');
        }

        this.state = {
            user: new User('','','','','','','',-1,''),
            submitted: false,
            loading: false,
            errorMessage: ''
        };
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

        if(!(user.username && user.password)){
            return;
        }

        this.setState({loading: true});
        UserService.register(user)
            .then(
                data => {
                    this.props.history.push('/login');
                },
                error => {
                    {
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
                        <div className={'form-group' + (submitted && user.firstName ? 'has-error': '')}>
                            <label htmlFor="name">First Name</label>
                            <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={(e)=>this.handleChange(e)}/>
                            {submitted && !user.firstName &&
                            <div className="alert alert-danger" role="alert">First name is required.</div>
                            }
                        </div>

                        <div className={'form-group' + (submitted && user.lastName ? 'has-error': '')}>
                            <label htmlFor="name">Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={(e)=>this.handleChange(e)}/>
                            {submitted && !user.lastName &&
                            <div className="alert alert-danger" role="alert">Last name is required.</div>
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


                        <div className={'form-group' + (submitted && user.emailAddress ? 'has-error': '')}>
                            <label htmlFor="name">Email Address</label>
                            <input type="text" className="form-control" name="emailAddress" value={user.emailAddress} onChange={(e)=>this.handleChange(e)}/>
                            {submitted && !user.emailAddress &&
                            <div className="alert alert-danger" role="alert">email is required.</div>
                            }
                        </div>

                        <div className={'form-group' + (submitted && user.phoneNumber ? 'has-error': '')}>
                            <label htmlFor="name">Phone Number</label>
                            <input type="text" className="form-control" name="phoneNumber" value={user.phoneNumber} onChange={(e)=>this.handleChange(e)}/>
                            {submitted && !user.phoneNumber &&
                            <div className="alert alert-danger" role="alert">Phone/Cell number is required.</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-lg btn-primary btn-block btn-signin form-submit-button" disabled={loading}>Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export {RegisterPage};