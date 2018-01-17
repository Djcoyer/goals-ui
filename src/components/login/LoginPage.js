/**
 * Created by dcoyer on 12/14/2017.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import "./../../styles/LoginModalStyles.css";
import RegisterModal from "./modal/RegisterModal";

let customStyle = {

};

class LoginPage extends Component {
    constructor(props){
        super(props);

        this.state = {

        };
    }
    render(){
        if(this.props.showModal) {
            customStyle = {
                backgroundColor: "",
                zIndex: 1,
                position: 'fixed',
                display: ""
            }
        }

        return(
            <div className="container" id="loginPageContainer">
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
                {this.props.showModal ? <RegisterModal firstName={this.props.firstName} emailAddress={this.props.emailAddress} onCheckChange={this.props.onCheckChange}
                              onChange={this.props.onChange} password={this.props.password} isAdmin={this.props.isAdmin} lastName={this.props.lastName}
                              registerUser={this.props.registerUser} showModal={this.props.showModal} toggleModal={this.props.toggleModal}/> : null}
                {/*<RegisterModal onChange={this.props.onChange} password={this.props.password} registerUser={this.props.registerUser}*/}
                               {/*lastName={this.props.lastName} firstName={this.props.firstName} emailAddress={this.props.emailAddress}*/}
                               {/*showModal={this.props.showModal} toggleModal={this.props.toggleModal} isAdmin={this.props.isAdmin} onCheckChange={this.props.onCheckChange}/>*/}
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
    registerUser: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    onCheckChange: PropTypes.func.isRequired
};

export default LoginPage;