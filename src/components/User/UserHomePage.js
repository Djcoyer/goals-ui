/**
 * Created by dcoyer on 12/13/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserInfo from "./profile/UserInfo";
import ReservedBooks from "./profile/ReservedBooks";

class UserHomePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: this.props.user,
            rentals: this.props.rentals
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user !== this.state.user){
            this.setState({user: nextProps.user});
        }
        if(nextProps.rentals !== this.state.rentals){
            this.setState({rentals:  nextProps.rentals});
        }
    }

    render(){
        let user = this.state.user;
        let rentals = (this.state.rentals != null && this.state.rentals.length > 0 ? this.state.rentals.filter((rental) =>  rental.active === true) : []);

        return(
            <div className="container pt-3">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-3">
                                <h3>User Profile</h3>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <UserInfo user={user}/>
                    </div>
                    <div className="col-sm-6">
                        <ReservedBooks rentals={rentals} returnRental={this.props.returnRental}/>
                    </div>
                </div>
            </div>
        );
    }
}

UserHomePage.propTypes = {
    user: PropTypes.object.isRequired,
    returnRental: PropTypes.func.isRequired,
    rentals: PropTypes.array
};

export default UserHomePage;