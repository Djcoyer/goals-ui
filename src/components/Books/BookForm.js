/**
 * Created by dcoyer on 12/14/2017.
 */

import React, {Component} from "react";
import Book from "../../models/Book";
import PropTypes from 'prop-types';
import ValidationTextBox from "../ValidationInputs/ValidationTextBox";
import ValidationTextArea from "../ValidationInputs/ValidationTextArea";
import ValidationFunctions from "../../Functions/ValidationFunctions";

const validationFunctions = new ValidationFunctions();
class BookForm extends Component{

    constructor(props){
        super(props);

        this.state = {
          book: new Book()
        };
    }

    onChange = (e) => {
      let id = e.target.id;
      let value = e.target.value;

      this.setState((prevState) => {
         prevState["book"][id] = value;
      });
    };

    addBook = (e) => {
        e.preventDefault();
        if(validationFunctions.validateForm(e.target)){
            let book = this.state.book;
            this.props.addBook(book);
        }
    };


    render(){
        return (
            <form id="form" onSubmit={this.addBook}>
                <div className="row">
                    <div className="col-sm-12">
                        <h5>Add New Book</h5>
                        <hr/>
                        <div className="row">
                            <div className="col-sm-12">
                                <label>Title</label>
                                <ValidationTextBox id="title" validations={["required"]} value={this.state.book.title}
                                                   onChange={this.onChange} errorMessage={"Must supply a title"}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <label>Author</label>
                             <ValidationTextBox id="author" validations={["required"]} value={this.state.book.author}
                                                onChange={this.onChange} errorMessage={"Must supply an author"}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <label>Description</label>
                                <ValidationTextArea id="description" validations={["required"]} value={this.state.book.description}
                                                    onChange={this.onChange} errorMessage={"Must supply a description"}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <button className="btn btn-secondary float-right" type="submit">
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
};

BookForm.propTypes = {
    addBook: PropTypes.func.isRequired
};

export default BookForm;