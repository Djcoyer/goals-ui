/**
 * Created by dcoyer on 12/14/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import BookForm from "./BookForm";

const customStyles = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(204, 204, 204, 0.75)'
    },
    content : {
        position                   : 'absolute',
        top                        : '10em',
        left                       : '20em',
        right                      : '20em',
        bottom                     : '7em',
        border                     : '1px solid #ccc',
        background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '4px',
        outline                    : 'none',
        padding                    : '20px'

    }
};

const BookModal = (props) => {
    return (
        <Modal isOpen={props.showModal} style={customStyles} onRequestClose={props.toggleModal} ariaHideApp={false}>
            <BookForm addBook={props.addBook}/>
        </Modal>
    );
};

BookModal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    addBook: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,

};

export default BookModal;