/**
 * Created by dcoyer on 12/14/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LoginForm from "./LoginForm";
import RegisterModal from "./RegisterModal";

class LoginPage extends Component {
    constructor(props){
        super(props);

        this.state = {

        };
    }

    render(){

        return(
            <div className="container">
                <div className="row mt-3" id="loginFormDiv">
                    <div className="col-sm-5">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Login</h3>
                            </div>
                            <div className="card-body p-1">
                                <LoginForm password={this.props.password} onChange={this.props.onChange} register={this.props.toggleModal}
                                           login={this.props.login} username={this.props.emailAddress} toggleModal={this.props.toggleModal}/>
                            </div>
                        </div>
                    </div>
                </div>
                <RegisterModal onChange={this.props.onChange} password={this.props.password} registerUser={this.props.registerUser}
                               lastName={this.props.lastName} firstName={this.props.firstName} emailAddress={this.props.emailAddress}
                               showModal={this.props.showModal} toggleModal={this.props.toggleModal}/>
            </div>
        );
    }
}

LoginPage.propTypes = {
    emailAddress: PropTypes.string,
    password: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool,
    login: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired
};

export default LoginPage;