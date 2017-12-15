/**
 * Created by dcoyer on 12/12/2017.
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import "../../../styles/BookDetails.css";
import BookDetailsSection from "./BookDetailsSection";
import RelatedBooksSection from "./RelatedBooksSection";


class BookDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            book: this.props.book
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.book !== this.state.book)
            this.setState({book: nextProps.book});
    }

    render() {
        if (!this.state.book || !this.state.book.title)
            return <div>Loading...</div>;
        else {
            let book = this.state.book;
            return (
                <div className="container pt-2">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-3 offset-4">
                                    <h3>{book.title}</h3>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    </div>
                    <div className="row" id="bookDetailsDiv">
                        <BookDetailsSection isAuthenticated={this.props.isAuthenticated} book={book} rentBook={this.props.rentBook}/>
                        <RelatedBooksSection/>
                    </div>
                </div>
            );
        }
    }
}

BookDetails.propTypes = {
    book: PropTypes.object.isRequired,
    rentBook: PropTypes.func,
    isAuthenticated: PropTypes.bool
};

export default BookDetails;