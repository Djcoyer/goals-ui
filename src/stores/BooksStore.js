/**
 * Created by dcoyer on 12/11/2017.
 */
import EventsEmitter from "events";
import AppDispatcher from './../dispatcher/AppDispatcher';
import ActionTypes from "../ActionTypes";
import Events from "../constants/Events";
import booksApi from './../api/booksApi';

const api = new booksApi();
class BooksStore extends EventsEmitter {
    books = [];
    book = {};
    addedBookId = {};

    getBooks = async() => {
      let books = await api.getBooks();
      if(books !== null && books.length > 0){
          this.books = books;
          this.emit(Events.RETRIEVED_BOOKS);
      }
    };

    getBook = async(bookId) => {
      let book = await api.getBook(bookId);
      if(book !== null){
          this.book = book;
          this.emit(Events.RETRIEVED_BOOK)
      }
    };

    addBook = async(book) => {
        let result = await api.addBook(book);
        if (typeof(result) === "numer")
        {}
        else {
            this.book = result;
            this.emit(Events.ADDED_BOOK);
        }
    };

    saveBook = async(book) => {
      let result = await api.saveBook(book);
      if(result !== null){
          this.book = result;
          this.emit(Events.SAVED_BOOK);
      }
    };

    deleteBook = async(bookId) => {
      let result = await api.deleteBook(bookId);
      if(result === 200)
          this.emit(Events.DELETED_BOOK);
    };

}

const booksStore = new BooksStore();

AppDispatcher.register((payload) => {
    switch(payload.actionType) {
        case ActionTypes.GET_BOOKS:
            booksStore.getBooks();
            break;
        case ActionTypes.GET_BOOK:
            booksStore.getBook(payload.bookId);
            break;

        case ActionTypes.ADD_BOOK:
            booksStore.addBook(payload.book);
            break;
        case ActionTypes.DELETE_BOOK:
            booksStore.deleteBook(payload.bookId);
            break;
        case ActionTypes.SAVE_BOOK:
            booksStore.saveBook(payload.book);
            break;
    }
});

export default booksStore;