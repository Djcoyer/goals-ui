/**
 * Created by dcoyer on 1/17/2018.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RegisterUserForm from "../RegisterUserForm";
import * as $ from "jquery";

class RegisterModal extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    alertEscape = (e) => {
        if(e.keyCode === 27) {
            this.checkExitModal();
        }
    };

    componentDidMount() {
        $(document).bind('keyup', this.alertEscape);
    }

    componentWillUnmount() {
        $(document).unbind('keyup', this.alertEscape);
    }

    checkExitModal = () => {
        if(window.confirm("Are you sure you want to exit?")){
            this.props.toggleModal();
        }
    };


    innerClick = function (e) {
        e.stopPropagation();
    };

    render() {
            return (
                <div className="modal outer-modal"  style={{display: 'block'}} onClick={this.checkExitModal}>
                    <div className="modal-content" id="outerModal" onClick={this.innerClick}>
                        <RegisterUserForm password={this.props.password} onChange={this.props.onChange}
                                          onCheckChange={this.props.onCheckChange}
                                          isAdmin={this.props.isAdmin} emailAddress={this.props.emailAddress}
                                          registerUser={this.props.registerUser}
                                          lastName={this.props.lastName} firstName={this.props.firstName}/>
                    </div>
                </div>
            );
    }
}

RegisterModal.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    password: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onCheckChange: PropTypes.func.isRequired,
    emailAddress: PropTypes.string.isRequired,
    registerUser: PropTypes.func.isRequired,
    lastName: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired
};

export default RegisterModal;