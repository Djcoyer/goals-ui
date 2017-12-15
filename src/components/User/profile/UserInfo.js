/**
 * Created by dcoyer on 12/13/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

const UserInfo = (props) => {
    let user = props.user;

    return (
        <div className="row">
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-4">
                        <p><strong>User Information</strong></p>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-form-label col-sm-2">Username:</label>
                    <label className="col-form-label col-sm-6">{user.emailAddress}</label>
                </div>
                <div className="form-group row">
                    <label className="col-form-label col-sm-3">First Name:</label>
                    <label className="col-form-label col-sm-6">{user.firstName}</label>
                </div>
                <div className="form-group row">
                    <label className="col-form-label col-sm-3">Last Name:</label>
                    <label className="col-form-label col-sm-6">{user.lastName}</label>
                </div>
                <div className="form-group row">
                    <label className="col-form-label col-sm-3">Permission:</label>
                    <label className="col-form-label col-sm-6">{user.roles[1]}</label>
                </div>
            </div>
        </div>
    );
};

UserInfo.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserInfo;

