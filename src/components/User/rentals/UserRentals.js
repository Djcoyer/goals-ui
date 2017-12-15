/**
 * Created by dcoyer on 12/14/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

const UserRentals = (props) => {

    const TableContent = () => {
        let rows = [];
        props.rentals.map((rental) => {
            rows.push(
                <tr id={rental.reservationId}>
                    <td>{rental.title}</td>
                    <td>{rental.author}</td>
                    <td>{rental.startDate}</td>
                    <td>{rental.endDate}</td>
                    <td>{rental.active ? "False" :  "True"}</td>
                </tr>
            );
        });
        return rows;
    };

    return (
        <div className="container mt-2">
            <div className="row">
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <h3>Rental History</h3>
                        </div>
                    </div>
                    <hr/>
                </div>
            </div>
            <div className="row">
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Book Title</th>
                        <th>Author</th>
                        <th>Check-Out Date</th>
                        <th>Due Date</th>
                        <th>Returned</th>
                    </tr>
                    </thead>
                    <tbody>
                    <TableContent/>
                    </tbody>
                </table>
            </div>
        </div>
    );

};

UserRentals.propTypes = {
    rentals: PropTypes.array.isRequired
};

export default UserRentals;