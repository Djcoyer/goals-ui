/**
 * Created by dcoyer on 12/11/2017.
 */
import AppDispatcher from './../dispatcher/AppDispatcher';
import Actions from "../ActionTypes";

class BookActions {
    getBooks = () => {
        AppDispatcher.dispatch({
            actionType: Actions.GET_BOOKS
        });
    };

    getBook = (bookId) => {
        AppDispatcher.dispatch({
            actionType: Actions.GET_BOOK,
            bookId: bookId
        });
    };

    addBook = (book) => {
        AppDispatcher.dispatch({
            actionType: Actions.ADD_BOOK,
            book: book
        });
    };

    saveBook = (book) => {
        AppDispatcher.dispatch({
            actionType: Actions.SAVE_BOOK,
            book: book
        });
    };

    deleteBook = (bookId) => {
        AppDispatcher.dispatch({
            actionType: Actions.DELETE_BOOK,
            bookId: bookId
        });
    };
}

export default BookActions;