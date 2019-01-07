import React, {Component} from 'react';

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
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }
    onChangeHandler(e){
        this.setState({ [e.target.name] : e.target.value});
    }
    onSubmitHandler(e){
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        console.log(newUser);
    }
    render(){
        return (
            <div className="Register">
                <h1>Register</h1>

                <form onSubmit={this.onSubmitHandler}>
                    <input type="text" value={this.state.name} placeholder="Name" name="name" onChange={this.onChangeHandler} className="form-name" /><br/>
                    <input type="text" value={this.state.email} placeholder="Email" name="email" onChange={this.onChangeHandler} className="form-email" /><br/>
                    <input type="text" value={this.state.password} placeholder="Password" name="password" onChange={this.onChangeHandler} className="form-password" /><br/>
                    <input type="text" value={this.state.password2} placeholder="Confirm Password" name="password2" onChange={this.onChangeHandler} className="form-password2" />
                    <br/><input type="submit" />
                </form>
            </div>
        )
    }
}

export default Register;