/**
 * Created by dcoyer on 12/13/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

const ReservationDetails = (props) => {
    let rental = props.rental;
    return(
        <div className="card reservationCard">
            <div className="card-header">
                <p className="card-title">{rental.title} - {rental.author}</p>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-12 ml-2">
                        <p><label>Rental Date:</label>{rental.startDate}</p>
                        <p><label>Due Date:</label> {rental.endDate}</p>
                    </div>
                </div>
                <div className="row mb-1">
                    <div className="col-sm-12">
                        <button className="btn btn-secondary btn-sm float-right mr-1" onClick={() => props.returnRental(rental.reservationId)}>Return</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ReservationDetails.propTypes = {
    rental: PropTypes.object.isRequired,
    returnRental: PropTypes.func.isRequired
};

export default ReservationDetails;