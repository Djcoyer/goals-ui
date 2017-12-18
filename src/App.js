import React, {Component} from "react";
import Navbar from "./components/common/Navbar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomeController from "./controllers/HomeController";
import AuthController from "./controllers/AuthController";
import authStore from "./stores/AuthStore";
import Events from "./constants/Events";
import Roles from "./constants/Roles";
import AuthenticationFunctions from "./Functions/AuthenticationFunctions";
import NotFoundPage from "./components/NotFoundPage";
import BooksController from "./controllers/BooksController";
import UserController from "./controllers/UserController";
import ProtectedRouteContainer from "./components/ProtectedRouteContainer";

const authFunctions = new AuthenticationFunctions();
class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            role: null,
            authenticated: false
        }
    }

    componentWillMount() {
        let exp = localStorage.getItem('expires_at');
        let idToken = localStorage.getItem('id_token');
        if (idToken != null && exp != null) {
            if (!authFunctions.isExpired(exp)) {
                let user = authFunctions.getUserFromToken(idToken);
                let role = (user !== null ? authFunctions.getUserRole(user) : null);
                this.setState({user: user, authenticated: true, role: role});
            }
        }
    }

    componentDidMount() {
        authStore.on(Events.LOGOUT_SUCCESS, () => {
            this.setState({user: null, role: null, authenticated: false});
            AuthController.logoutSuccess();
            window.location.href = "/home";
        });
    }

    onLogin = (user) => {
        this.setUser(user);
    };

    setUser = (user) => {
        let role = Roles.USER;
        // if(user.roles != null){
        //     if(user.roles.indexOf(Roles.ADMIN) > -1) role = Roles.ADMIN;
        //     else if(user.roles.indexOf(Roles.USER) > -1) role = Roles.USER;
        // }
        this.setState({user: user, role: role, authenticated: true});
    };

    render() {

        return (
            <BrowserRouter>
                <div>
                    <Navbar isAuthenticated={this.state.authenticated} role={this.state.role}/>
                    <div className="container-fluid">
                        <Switch>
                            <Route exact path="/" component={HomeController}/>
                            <Route exact path="/home" component={HomeController}/>
                            <Route exact path="/login" render={(obj) => {
                                return <AuthController match={obj.match} authenticated={this.state.authenticated}
                                                       onLogin={this.onLogin}/>
                            }}/>
                            {/*region BOOKS*/}
                            <Route exact path="/books" render={(obj) => {
                                return <BooksController match={obj.match} user={this.state.user}
                                                        isAuthenticated={this.state.authenticated}/>
                            }}/>
                            <Route exact path="/books/:bookId" render={(obj) => {
                                return <BooksController match={obj.match} isAuthenticated={this.state.authenticated}
                                                        userId={(this.state.user != null && this.state.user.userId != null ? this.state.user.userId : null)}/>
                            }}/>
                            {/*endregion*/}

                            <ProtectedRouteContainer>
                                {/*region BOOKS*/}
                                <Route exact path={"/books/:bookId/edit"} render={(obj) => {
                                    return <BooksController match={obj.match}
                                                            isAuthenticated={this.state.isAuthenticated}
                                                            user={this.state.user} obj={obj}/>
                                }}/>
                                {/*endregion*/}
                                {/*region USER*/}
                                <Route exact path="/user/user-profile" render={(obj) => {
                                    return <UserController user={this.state.user} match={obj.match}/>
                                }}/>
                                <Route exact path="/user/rentals" render={(obj) => {
                                    return <UserController user={this.state.user} match={obj.match}/>
                                }}/>
                                {/*endregion*/}

                            </ProtectedRouteContainer>

                            <Route component={NotFoundPage}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
