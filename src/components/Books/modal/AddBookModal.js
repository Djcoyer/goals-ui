/**
 * Created by dcoyer on 1/17/2018.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookForm from "../BookForm";
import $ from 'jquery';

class BookModal extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    alertEscape = (e) => {
        if (e.keyCode === 27) {
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
        if (window.confirm("Are you sure you want to exit?")) {
            this.props.toggleModal();
        }
    };


    innerClick = function (e) {
        e.stopPropagation();
    };

    render() {

        return (
            <div className="modal outer-modal" style={{display: 'block'}} onClick={this.checkExitModal}>
                <div className="modal-content" id="outerModal" onClick={this.innerClick}>
                <BookForm addBook={this.props.addBook}/>
                </div>
            </div>
        );
    }
}

BookModal.propTypes = {
    toggleModal: PropTypes.bool.isRequired,
    addBook: PropTypes.func.isRequired
};

export default BookModal;