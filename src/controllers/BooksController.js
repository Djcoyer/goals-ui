/**
 * Created by dcoyer on 12/11/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import booksStore from './../stores/BooksStore';
import Events from "../constants/Events";
import BooksActions from './../actions/BooksActions';
import BookDirectory from "../components/Books/BookDirectory";
import BookDetails from "../components/Books/BookDetails/BookDetails";
import Reservation from "../models/Reservation";
import ReservationActions from './../actions/ReservationActions';
import reservationStore from './../stores/ReservationStore';
import EditBook from "../components/Books/Edit/EditBook";
import withRouter from "react-router-dom/es/withRouter";


const reservationActions = new ReservationActions();
const actions = new BooksActions();
class BooksController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: this.props.isAuthenticated,
            books: [],
            book: {},
            user: this.props.user,
            showModal: false
        };
    }

    componentDidMount() {
        booksStore.on(Events.RETRIEVED_BOOKS, () => {
            this.setState({books: booksStore.books});
        });
        booksStore.on(Events.RETRIEVED_BOOK, () => {
            this.setState({book: booksStore.book});
        });

        booksStore.on(Events.ADDED_BOOK, () => {
            let books = this.state.books;
            books.push(booksStore.book);
            // console.log(books);
            this.setState({books: books, showModal: false});
        });

        booksStore.on(Events.SAVED_BOOK, this.bookSaved);

        booksStore.on(Events.DELETED_BOOK, this.bookDeleted);

        reservationStore.on(Events.ADDED_RESERVATION, () => {
            this.props.history.push("/user/user-profile")
        });

        let params = this.props.match.params;
        if (params.bookId == null) {
            actions.getBooks();
        }
        else actions.getBook(params.bookId);
    }

    componentWillReceiveProps(nextProps) {
        let nextParams = nextProps.match.params;
        let params = this.props.match.params;
        if (nextParams !== params) {
            if (nextParams.bookId == null) {
                if (!this.state.books || this.state.books.length === 0) {
                    actions.getBooks();
                }
            }
            else {
                if (!this.state.book || this.state.book.bookId !== nextParams.bookId) {
                    actions.getBook(nextParams.bookId);
                }
            }
            if (nextProps.user !== this.state.user) {
                this.setState({user: nextProps.user});
            }
        }
    }

    rentBook = (bookId) => {
        let userId = this.props.userId;
        let reservation = new Reservation(bookId, userId, null);
        // console.log(userId);
        reservationActions.addReservation(reservation);
    };

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal});
    };

    addBook = (book) => {
        // console.log(book);
        actions.addBook(book);
    };

    getRelatedBooks = () => {
        if (this.state.book == null || this.state.book.title == null) return null;
        if (!this.state.books || this.state.books.length === 0) {
            actions.getBooks();
            return null;
        }
        let relatedBooks = this.state.books.filter((book) => {
            return book.author === this.state.book.author && book.bookId != this.state.book.bookId
        });
        return relatedBooks;
    };

    //region EDIT

    onChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        let book = this.state.book;
        book[id] = value;
        this.setState({book: book});
    };

    onCheckChange = (e) => {
        let id = e.target.id;
        let value = e.target.checked;
        let book = this.state.book;
        book[id] = value;
        this.setState({book: book});

    };

    saveBook = () => {
        actions.saveBook(this.state.book);
        this.props.obj.history.push("/books");
    };

    deleteBook = () => {
        actions.deleteBook(this.state.book.bookId);
        this.props.obj.history.push("/books");
    };

    bookSaved = () => {
        let books = this.state.books;
        let id = this.state.book.bookId;
        let index = books.findIndex((book) => book.bookId === id);
        books.splice(index, 1);
        this.setState({books: books});
    };

    bookDeleted = () => {
        let book = booksStore.book;
        let books = this.state.books;
        let index = books.findIndex((_book) =>  _book.bookId === book.bookId);
        books.splice(index, 1);
        books.push(book);
        this.setState({books: books});
        reservationActions.deleteByBookId(book.bookId);
    };

    cancelEdit = () => {
      this.setState({book: null});
      this.props.obj.history.push("/books");
    };

    //endregion

    render() {

        if (this.props.match.params.bookId == null) {
            if (this.state.books != null) {
                return <BookDirectory books={this.state.books} user={this.state.user} showModal={this.state.showModal}
                                      toggleModal={this.toggleModal} addBook={this.addBook}/>
            }
            else return <div>Loading...</div>
        }
        else {
            if (this.state.book == null || this.state.book.title == null) return (<div>Loading...</div>);
            if (this.props.match.path.indexOf("edit") < 0) {
                return <BookDetails book={this.state.book} rentBook={this.rentBook}
                                    isAuthenticated={this.props.isAuthenticated}
                                    relatedBooks={this.getRelatedBooks()}/>;
            }
            else return <EditBook book={this.state.book} saveBook={this.saveBook} onCheckChange={this.onCheckChange}
                                  onChange={this.onChange} deleteBook={this.deleteBook} cancelEdit={this.cancelEdit}/>

        }
    }
}

BooksController.propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object
};

export default withRouter(BooksController);