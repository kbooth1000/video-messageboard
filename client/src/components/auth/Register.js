import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import {registerUser } from '../../actions/authActions';

import './register.css';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }
    onChangeHandler = (e) =>   {
        this.setState({ [e.target.name] : e.target.value});
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.registerUser(newUser, this.props.history);
    }
    render(){
        const {errors} = this.state;
        return (
            <div className="Register">
                <h1>Register</h1>
                

                <form onSubmit={this.onSubmitHandler}>
                    <input type="text" value={this.state.name} placeholder="Name" className={`form-input ${errors.name && 'error'}`} name="name" onChange={this.onChangeHandler} />
                    {errors.name && (<span>{errors.name}</span>)}<br/>

                    <input type="text" value={this.state.email} placeholder="Email" name="email" onChange={this.onChangeHandler} className={`form-input ${errors.email && 'error'}`} />
                    {errors.email && (<span>{errors.email}</span>)}<br/>

                    <input type="text" value={this.state.password} placeholder="Password" name="password" onChange={this.onChangeHandler} className={`form-input ${errors.password && 'error'}`} />
                    {errors.password && (<span>{errors.password}</span>)}<br/>

                    <input type="text" value={this.state.password2} placeholder="Confirm Password" name="password2" onChange={this.onChangeHandler} className={`form-input ${errors.password2 && 'error'}`} />
                    {errors.password2 && (<span>{errors.password2}</span>)}<br/>

                    <input type="submit" />
                </form>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

let mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));