/**
 * Created by dcoyer on 12/13/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserHomePage from "../components/User/UserHomePage";
import ReservationActions from './../actions/ReservationActions';
import reservationStore from './../stores/ReservationStore';
import Events from "../constants/Events";
import UserRentals from "../components/User/rentals/UserRentals";
import Redirect from "react-router-dom/es/Redirect";

const reservationActions = new ReservationActions();
class UserController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            rentals: []
        };
    }

    componentDidMount() {
        reservationStore.on(Events.RETRIEVED_USER_RESERVATIONS, () => {
            this.setState({rentals: reservationStore.userReservations});
        });

        reservationStore.on(Events.RETURNED_RESERVATION, () => {
            let id = reservationStore.removedReservationId;
            let rentals = this.state.rentals;
            rentals.map((oldRental, i) => {if(oldRental.reservationId === id){
                oldRental.active = false;
            }});
            this.setState({rentals: rentals});
        });

        if (this.props.match.path.indexOf('user-profile') > -1 || this.props.match.path.indexOf('rentals') >  -1){
                reservationActions.getUserReservations(this.state.user.userId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.state.user) {
            this.setState({user: nextProps.user});
        }
        if(nextProps.match.path !== this.props.match.path) {
            if (nextProps.match.path.indexOf('user-profile') > -1 || nextProps.match.path.indexOf('rentals ') >  -1){
                    reservationActions.getUserReservations(this.state.user.userId);
            }
        }
    }

    returnRental = (id) => {
        reservationActions.returnReservation(id);
    };

    render() {
        let params = this.props.match.params;
        let route = this.props.match.path;
        if (this.state.user != null) {
            if (route.indexOf("user-profile") > -1) {
                return <UserHomePage user={this.state.user} returnRental={this.returnRental}
                                     rentals={this.state.rentals}/>
            }
            else if (route.indexOf("rentals") > -1) {
                return (
                    <UserRentals rentals={this.state.rentals} returnRental={this.returnRental}/>
                )
            }
        }
        else return <Redirect to="/home"/>
    }
}

UserController.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserController;