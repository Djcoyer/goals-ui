/**
 * Created by dcoyer on 11/1/2017.
 */

import React, {Component} from "react";
import authApi from "./../api/authApi";
import AuthActions from "./../actions/AuthActions";
import authStore from "./../stores/AuthStore";
import Events from "../constants/Events";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import User from "../models/User";
import LoginForm from "../components/login/LoginForm";
import Redirect from "react-router-dom/es/Redirect";
import LoginPage from "../components/login/LoginPage";
import UserActions from './../actions/UserActions';
import userStore from './../stores/UserStore';

const userActions = new UserActions();
const actions = new AuthActions();
const api = new authApi();
class AuthController extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emailAddress: '',
            password: '',
            authenticated: false,
            showModal: false,
            firstName: '',
            lastName: ''
        };
    }

    componentDidMount() {
        authStore.on(Events.LOGIN_FAILED, () => this.loginFailed());
        authStore.on(Events.LOGIN_SUCCESS, () => this.loginSuccess());
        userStore.on(Events.ADDED_USER, () => this.addedUser());
        userStore.on(Events.ADDED_USER_FAILED,  () => this.addedUserFailed());
    }
    //region AUTH

    static logout = () => {
        console.log("Hit");
        actions.logout();
    };

    static logoutSuccess = () => {
        localStorage.removeItem('id_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expires_at');
    };

    loginSuccess = () => {
        let idToken = authStore.idToken;
        let accessToken = authStore.accessToken;
        let userInfo = jwt_decode(idToken);
        let expiresAt = userInfo.exp;
        AuthController.setTokens(idToken, accessToken, expiresAt);
        let customerInfo = userInfo["http://customerInfo"];
        let firstName = customerInfo.firstName;
        let lastName = customerInfo.lastName;
        let userId = customerInfo.userId;
        let roles = customerInfo.roles;
        let user = new User(userId, userInfo.name, firstName, lastName, roles);
        this.props.onLogin(user);

    };

    static setTokens = (idToken, accessToken, expiresAt) => {
        localStorage.setItem('id_token', idToken);
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('expires_at', expiresAt * 1000);
    };

    login = async () => {
        let username = this.state.emailAddress;
        let password = this.state.password;
        actions.login(username, password);
    };

    loginFailed = () => {
        alert("Login failed. Try again.");
    };

    //endregion

    //region HELPERS
    onChange = (e) => {
        let value = e.target.value;
        let id = e.target.id;
        this.setState({[id]: value});
    };

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal, firstName: '', lastName:'', emailAddress:'', password:''});
    };

    //endregion

    addedUser = () => {
        this.login();
    };

    addedUserFailed = () => {
        alert("Email address already exists");
    };

    registerUser = () => {
        let createUserRequest = {
          firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailAddress: this.state.emailAddress,
            password: this.state.password
        };
        userActions.addUser(createUserRequest);
    };


    render() {
        if(this.props.match.path.indexOf("login") > -1){
            return (
                (this.props.authenticated ? <Redirect to={"/home"}/> : <LoginPage onChange={this.onChange} toggleModal={this.toggleModal} login={this.login}
                                                                                  registerUser={this.registerUser} showModal={this.state.showModal}
                                                                                  emailAddress={this.state.emailAddress} firstName={this.state.firstName}
                                                                                  lastName={this.state.lastName} password={this.state.password}/>)
            )
        }
        else if(this.props.match.path.indexOf("logout") > -1){
            return(
                <div>Loading...</div>
            )
        }
    }
}

AuthController.propTypes = {
    onLogin: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired
};

export default AuthController;