/**
 * Created by dcoyer on 12/12/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Link from "react-router-dom/es/Link";

const RelatedBook = (props) => {

    return (
        <div className="row">
            <div className="col-sm-12">
                <div className="card" id="bookCard">
                    <Link to={"/books/" + props.book.bookId}>
                        <div className="card-header">
                            <p>{props.book.title}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );

};

RelatedBook.propTypes = {
    book: PropTypes.object.isRequired
};

export default RelatedBook;