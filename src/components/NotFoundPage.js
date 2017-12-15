/**
 * Created by dcoyer on 12/11/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NotFoundPage extends Component {
    constructor(props){
        super(props);

        this.state = {

        };
    }

    render(){

        return(
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <div className="row mt-3">
                        <div className="col-sm-6 offset-3">
                            <h3>Page Not Found</h3>
                            <p>The requested page could not be loaded</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

NotFoundPage.propTypes = {

};

export default NotFoundPage;