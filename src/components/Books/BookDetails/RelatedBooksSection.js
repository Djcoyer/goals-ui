/**
 * Created by dcoyer on 12/12/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import RelatedBook from "./RelatedBook";

const RelatedBooksSection = (props) => {
        return(
            <div className="col-sm-4">
                <div className="row">
                    <div className="col-sm-9 offset-3">
                        <p>More By this Author:</p>
                    </div>
                </div>
                {props.books != null && props.books.length > 0 ?<div className="row">
                    <div className="col-sm-9 offset-3">
                        {props.books.map((book)  => <RelatedBook book={book}/>)}
                    </div>
                </div> : null}
            </div>
        );
};

RelatedBooksSection.propTypes = {
    books: PropTypes.array.isRequired
};

export default RelatedBooksSection;