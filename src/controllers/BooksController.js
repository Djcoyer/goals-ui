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

    componentWillMount() {
        booksStore.on(Events.RETRIEVED_BOOKS, () => {
            this.setState({books: booksStore.books});
        });
        booksStore.on(Events.RETRIEVED_BOOK, () => {
            this.setState({book: booksStore.book});
        });

        booksStore.on(Events.ADDED_BOOK, () => {
            let books = this.state.books;
            books.push(booksStore.book);
            console.log(books);
           this.setState({books: books, showModal: false});
        });

        reservationStore.on(Events.ADDED_RESERVATION, () => {
           window.location.href = "/user/user-profile";
        });

        let params = this.props.match.params;
        if(params.bookId == null) {
            actions.getBooks();
        }
        else actions.getBook(params.bookId);
    }

    componentWillReceiveProps(nextProps) {
        let nextParams = nextProps.match.params;
        let params = this.props.match.params;
        if(nextParams !== params){
            if(nextParams.bookId == null){
                if(!this.state.books  || this.state.books.length === 0){
                    actions.getBooks();
                }
            }
            else{
                if(!this.state.book || this.state.book.bookId !== nextParams.bookId){
                    actions.getBook(nextParams.bookId);
                }
            }
            if(nextProps.user !== this.state.user){
                this.setState({user: nextProps.user});
            }
        }
    }

    rentBook = (bookId) => {
        let userId = this.props.userId;
        let reservation = new Reservation(bookId, userId, null);
        console.log(userId);
        reservationActions.addReservation(reservation);
    };

    toggleModal = () => {
      this.setState({showModal: !this.state.showModal});
    };

    addBook = (book) => {
        console.log(book);
        actions.addBook(book);
    };

    render() {

        if (this.props.match.params.bookId == null) {
            if (this.state.books != null && this.state.books.length > 0) {
                return <BookDirectory books={this.state.books} user={this.state.user} showModal={this.state.showModal}
                                      toggleModal={this.toggleModal} addBook={this.addBook}/>
            }
            else return <div>Loading...</div>
        }
        else {
            return <BookDetails book={this.state.book} rentBook={this.rentBook} isAuthenticated={this.props.isAuthenticated}/>;
        }
    }
}

BooksController.propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object
};

export default BooksController;