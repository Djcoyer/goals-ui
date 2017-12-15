/**
 * Created by dcoyer on 12/12/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

const RelatedBooksSection = (props) => {
    return(
        <div className="col-sm-4">
            <div className="row">
                <div className="col-sm-9 offset-3">
                    <p>Related Books:</p>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-9 offset-3">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card" id="bookCard">
                                <div className="card-header">
                                    <p>Test</p>
                                </div>
                                <div className="card-body">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card" id="bookCard">
                                <div className="card-header">
                                    <p>Test</p>
                                </div>
                                <div className="card-body">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

RelatedBooksSection.propTypes = {

};

export default RelatedBooksSection;