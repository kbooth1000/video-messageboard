import React, {Component} from 'react';
import axios from 'axios';

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
        axios.post('/api/auth/register', newUser)
        .then(
            user => console.log('user: ', user.data)
        )
        .catch( err => {
            this.setState({errors: err.response.data});
            let errors = [];
            for(err in this.state.errors){
                errors.push(this.state.errors[err])
            }
            console.log('errors: ', errors);
            
        })
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

export default Register;