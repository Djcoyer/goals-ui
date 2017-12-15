/**
 * Created by dcoyer on 11/1/2017.
 */

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AuthController from './../../controllers/AuthController';
import Roles from "../../constants/Roles";
class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: this.props.isAuthenticated,
            role: this.props.role
        };
    }

    onNavClick(target) {
        let id = target.id;
        let a = document.getElementById(id);
        let parent = a.parentNode;
        if (parent.classList.contains("active")) {
            return;
        }
        else if (document.getElementsByClassName("active").length > 0) {
            let activeItems = document.getElementsByClassName("active");
            activeItems[0].classList.remove("active");
        }

        parent.classList.add("active");
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isAuthenticated !== this.state.isAuthenticated){
            if(nextProps.role !== this.state.role){
                this.setState({isAuthenticated: nextProps.isAuthenticated, role: nextProps.role});
            }
            else this.setState({isAuthenticated: nextProps.isAuthenticated});
        }
        else if(nextProps.role !== this.state.role){
            this.setState({role: nextProps.role});
        }
    }

    render() {

        let navContent = () => {
            if(this.state.isAuthenticated){
                if(this.state.role === Roles.ADMIN){
                    return(
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/books" className="nav-link">Books</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/user/user-profile" className="nav-link">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/manage" className="nav-link">Manage</Link>
                            </li>
                            <li className="nav-item float-right">
                                <button className="btn btn-link nav-link" onClick={() => AuthController.logout()}>Logout</button>
                            </li>
                        </ul>
                    );
                }
                else return(
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/books" className="nav-link">Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/user/user-profile" className="nav-link">Profile</Link>
                        </li>
                        <li className="nav-item float-right">
                            <button className="btn btn-link nav-link" onClick={() => AuthController.logout()}>Logout</button>
                        </li>
                    </ul>
                )
            }
            else return(
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/books" className="nav-link">Books</Link>
                    </li><li className="nav-item float-right">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                </ul>
            )
        };

        return (
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
                <a className="navbar-brand" href="/home">Lwolf Library</a>
                <div className="row">
                    <div className="col-sm-12 text-right">
                        {navContent()}
                    </div>
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    role: PropTypes.string
};

export default Navbar;