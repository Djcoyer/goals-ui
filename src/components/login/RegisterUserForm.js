/**
 * Created by dcoyer on 12/14/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ValidationTextBox from "../ValidationInputs/ValidationTextBox";
import ValidationFunctions from  './../../Functions/ValidationFunctions';

const validationFunctions = new ValidationFunctions();

const formId = "registerUserForm";


const RegisterUserForm = (props) => {

    const submitForm = (e) => {
        e.preventDefault();
        let form = document.getElementById(formId);
        if(validationFunctions.validateForm(form)){
            props.registerUser();
        }
    };

    return (
        <form id={formId} onSubmit={submitForm}>
            <div className="row content-center">
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <label>First Name:</label>
                            <ValidationTextBox id="firstName" validations={["required"]}
                                               value={props.firstName} onChange={props.onChange}
                                               errorMessage={"First name required"}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <label>Last Name:</label>
                            <ValidationTextBox id="lastName" validations={["required"]}
                                               value={props.lastName} onChange={props.onChange}
                                               errorMessage={"Last name required"}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <label>Email Address:</label>
                            <ValidationTextBox id="emailAddress" validations={["required", "email"]}
                                               value={props.emailAddress} onChange={props.onChange}
                                               errorMessage={"Email required"}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <label>Password:</label>
                            <ValidationTextBox id="password" validations={["required"]}
                                               value={props.password} onChange={props.onChange}
                                               errorMessage={"Password required"}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <button className="btn login-button btn-secondary btn-sm float-right" type="submit">
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

RegisterUserForm.propTypes = {
    emailAddress: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    registerUser: PropTypes.func.isRequired
};

export default RegisterUserForm;