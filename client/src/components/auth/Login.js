import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { userLogin } from '../../actions/authActions';

import '../assets/styles/login.css';


class Login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/threads');
        }
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        const userLoginInfo = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.userLogin(userLoginInfo);
        console.log(userLoginInfo);
    }
    render(){
        const {errors} = this.state;
        return (
            <div className="Login">
                <h1>Login</h1>

                <form onSubmit={this.onSubmitHandler}>
                    <input value={this.state.email} type="text" onChange={this.onChangeHandler} name="email" placeholder="Email"
                    className={`form-input ${errors.email && 'error'}`} />
                    {errors.email && (<span>{errors.email}</span>)}
                    <br/><input value={this.state.password} type="text" onChange={this.onChangeHandler} name="password" placeholder="Password" className={`form-input ${errors.password && 'error'}`} />
                    {errors.password && (<span>{errors.password}</span>)}
                    <br/><input type="submit" />
                </form>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

let mapStateToProps = state=>( {
    auth: state.auth, errors: state.errors
})

export default connect(mapStateToProps,{userLogin})(withRouter( Login));