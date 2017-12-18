/**
 * Created by dcoyer on 12/14/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import RegisterUserForm from "./RegisterUserForm";


const customStyles = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)'
    },
    content : {
        position                   : 'absolute',
        top                        : '10em',
        left                       : '25em',
        right                      : '30em',
        bottom                     : '8em',
        border                     : '1px solid #ccc',
        background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '4px',
        outline                    : 'none',
        padding                    : '20px'

    }
};


const RegisterModal = (props) => {

    return(
        <Modal isOpen={props.showModal} onRequestClose={props.toggleModal} style={customStyles}>
            <RegisterUserForm onChange={props.onChange} password={props.password} registerUser={props.registerUser}
                              emailAddress={props.emailAddress} firstName={props.firstName} lastName={props.lastName}
            isAdmin={props.isAdmin} onCheckChange={props.onCheckChange}/>
        </Modal>
    );
};

RegisterModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    registerUser: PropTypes.func.isRequired,
    emailAddress: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
    isAdmin:  PropTypes.bool.isRequired,
    onCheckChange: PropTypes.func.isRequired
};

export default RegisterModal;