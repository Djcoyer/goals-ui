/**
 * Created by dcoyer on 12/18/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ValidationTextBox from "../../ValidationInputs/ValidationTextBox";
import ValidationTextArea from "../../ValidationInputs/ValidationTextArea";
import ValidationFunctions from "../../../Functions/ValidationFunctions";

const validationFunctions = new ValidationFunctions();
const EditBook = (props) => {

    let validateForm = (e) => {
        e.preventDefault();
        let form = e.target;
        let isValid = validationFunctions.validateForm(form);
        if (isValid) {
            props.saveBook();
        }
    };

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <h3>Edit Book</h3>
                        </div>
                        <div className="col-sm-2 offset-3">
                            <button className="btn btn-outline-danger btn-sm mt-2 float-right" onClick={props.deleteBook}>Delete</button>
                        </div>
                    </div>
                    <hr/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <form id="bookForm" onSubmit={(e) => validateForm(e)}>
                        <div className="row">
                            <div className="col-sm-8">
                                <label>Title</label>
                                <ValidationTextBox id="title" validations={["required"]} value={props.book.title}
                                                   errorMessage={"Title is required"}
                                                   onChange={(e) => props.onChange(e)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-8">
                                <label>Author</label>
                                <ValidationTextBox id="author" validations={["required"]} value={props.book.author}
                                                   errorMessage={"Author is required"}
                                                   onChange={(e) => props.onChange(e)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-8">
                                <label>Title</label>
                                <ValidationTextArea id="description" validations={["required"]}
                                                    value={props.book.description}
                                                    errorMessage={"Description is required"} rows={3}
                                                    onChange={(e) => props.onChange(e)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-8">
                                <label className="form-check-label">
                                    <input type="checkbox" onChange={props.onCheckChange} className="form-check-input"
                                           id="available"
                                           checked={props.book.available}/>
                                    Available?
                                </label>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-8">
                                <button className="btn btn-secondary btn-sm float-left" onClick={props.cancelEdit}>Cancel</button>
                                <input type="submit" className="btn btn-outline-primary btn-sm float-right"
                                       value="Save"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

EditBook.propTypes = {
    book: PropTypes.object.isRequired,
    saveBook: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onCheckChange: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired
};

export default EditBook;
