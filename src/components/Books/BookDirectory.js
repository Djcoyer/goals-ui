/**
 * Created by dcoyer on 12/11/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from "../common/Table";
import Link from "react-router-dom/es/Link";
import BookModal from "./BookModal";

class BookDirectory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            user: this.props.user
        };
    }

    componentWillMount() {
        if (this.props.books != null)
            this.setState({books: this.props.books});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.books !== this.state.books) {
            this.setState({books: nextProps.books});
        }
        if (nextProps.user !== this.state.user) {
            this.setState({user: nextProps.user});
        }
    }

    getTableRows = (isAdmin) => {
        let tableRows = [];
        let books = this.state.books;
        books.map((book, i) => {
            let row =
                (<tr key={i}>
                    <td><Link to={"/books/" + book.bookId}>{book.title}</Link></td>
                    <td>{book.author}</td>
                    {isAdmin ? <td><Link to={"/books/" + book.bookId + "/edit"}>Edit</Link></td> : null}
                </tr>);
            tableRows.push(row);
        });

        return tableRows;
    };

    render() {
        let user = this.state.user;
        let adminContent = () => {
            return (
                <div className="col-sm-12">
                    <button className="btn btn-secondary float-right mb-2" onClick={this.props.toggleModal}>
                        Add Book
                    </button>
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Edit</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.getTableRows(true)}
                        </tbody>
                    </table>
                </div>
            );
        };

        let userContent = () => {
            return (
                <div className="col-sm-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.getTableRows(false)}
                        </tbody>
                    </table>
                </div>
            );
        };

        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-2">
                                <h3>
                                    Books
                                </h3>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    {user != null && user.roles.indexOf('admin') > -1 ? adminContent() : userContent()}
                </div>
                <BookModal toggleModal={this.props.toggleModal} addBook={this.props.addBook} showModal={this.props.showModal}/>
            </div>
        );
    }
}

BookDirectory.propTypes = {
    showModal: PropTypes.bool,
    books: PropTypes.array.isRequired,
    user: PropTypes.object,
    toggleModal: PropTypes.func,
    addBook: PropTypes.func,

};

export default BookDirectory;