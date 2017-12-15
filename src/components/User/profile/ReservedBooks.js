/**
 * Created by dcoyer on 12/13/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReservationDetails from "./ReservationDetails";
import './../../../styles/ReservedBooksStyles.css';
import Link from "react-router-dom/es/Link";


const ReservedBooks = (props) => {


    return (
        <div className="row">
            <div className="col-sm-6">
                <div className="row">
                    <div className="col-sm-12">
                        {props.rentals.length > 0 ? <p id="rentalsTitle"><strong>Active Rentals</strong></p> : null}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        {props.rentals.map((rental) => <ReservationDetails rental={rental}
                                                                           returnRental={props.returnRental}/>)}
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-sm-12">
                        <Link className="btn btn-secondary float-right" to={"/user/rentals"}>View All Rentals</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

ReservedBooks.propTypes = {
    rentals: PropTypes.array.isRequired,
    returnRental: PropTypes.func.isRequired
};

export default ReservedBooks;