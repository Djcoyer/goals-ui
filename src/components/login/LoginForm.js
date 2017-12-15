/**
 * Created by dcoyer on 11/14/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ValidationTextBox from "../ValidationInputs/ValidationTextBox";
import ValidationFunctions from './../../Functions/ValidationFunctions';
import './../../styles/LoginForm.css';

const validation = new ValidationFunctions();
const formId = "loginForm";
class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    login = (e) => {
        e.preventDefault();
        let form = document.getElementById(formId);
        let isValid = validation.validateForm(form);
        if (isValid) this.props.login();
    };


    invalidLogin = () => {
        let form = document.getElementById(formId);
        form.reset();
    };

    render() {

        return (
            <form id={formId} onSubmit={this.login}>
                <div className="row">
                    <div className="col-sm-10 offset-1">
                        <label className="small">Email:</label>
                        <ValidationTextBox id="emailAddress" validations={["required", "email"]}
                                           value={this.props.username}
                                           onChange={this.props.onChange}
                                           errorMessage={"Email required"}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-10 offset-1">
                        <label className="small">Password:</label>
                        <ValidationTextBox id="password" validations={["required"]}
                                           value={this.props.password}
                                           onChange={this.props.onChange}
                                           errorMessage={"Password required"}/>
                    </div>
                </div>
                <div className="row pt-2">
                    <div className="col-sm-12">
                        <button className="btn btn-secondary login-button btn-sm float-left"
                                onClick={this.props.register} type="button">
                            Register
                        </button>
                        <button className="btn btn-secondary btn-sm login-button float-right" type="submit">
                            Login
                        </button>
                    </div>
                </div>
            </form>

        );
    }
}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    login: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default LoginForm;