/**
 * Created by dcoyer on 12/12/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

const BookDetailsSection = (props) => {

    if (props.book !== null) {
        let book = props.book;

        const RentButton = () => {
            if (book.available && props.isAuthenticated) return (
                <button className="btn btn-secondary" onClick={() => props.rentBook(book.bookId)}>
                    Rent
                </button>);
            else if (book.available) {
                return (
                    <p>Must be logged in to rent</p>
                )
            }
            else if (props.isAuthenticated) {
                return (
                    <p>Not Available</p>
                );
            }
        };
        return (<div className="col-sm-8">
            <div className="row">
                <div className="col-sm-12">
                    <div className="col-sm-3 float-right">
                        <div className="row">
                            <div className="col-sm-3">
                                <p><strong>Author</strong></p>
                            </div>
                        </div>
                        <p>{book.author}</p>
                    </div>
                    <div className="col-sm-9">
                        <div className="row">
                            <div className="col-sm-3">
                                <p><strong>Description</strong></p>
                            </div>
                        </div>
                        <p>{book.description}</p>
                    </div>
                </div>
            </div>
            <div className="row" id="reserveButtonDiv">
                <div className="col-sm-12">
                    <div className="col-sm-12 float-right">
                        <RentButton/>
                    </div>
                </div>
            </div>
        </div>);
    }
    else return (
        <div>Loading...</div>
    )

};

BookDetailsSection.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    book: PropTypes.object.isRequired,
    rentBook: PropTypes.func
};

export default BookDetailsSection;