import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getCurrentUser } from '../../actions/authActions';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        const userLogin = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.getCurrentUser(userLogin);
        console.log(userLogin);
    }
    render(){
        return (
            <div className="Login">
                <h1>Login</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <input value={this.state.email} type="text" onChange={this.onChangeHandler} name="email" placeholder="Email" />
                    <br/><input value={this.state.password} type="text" onChange={this.onChangeHandler} name="password" placeholder="Password" />
                    <br/><input type="submit" />
                </form>
            </div>
        )
    }
}

let mapStateToProps = state=>( {
    auth: state.auth, errors: state.errors
})

export default connect(mapStateToProps,{getCurrentUser})( Login);