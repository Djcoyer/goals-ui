/**
 * Created by dcoyer on 12/11/2017.
 */

import Constants from './../constants/Constants';
const apiUrl = Constants.BaseUrl + "books";


class booksApi {

    getBooks = async() => {
      let books = await fetch(apiUrl, Constants.GetRequest)
          .then((response) => response.json())
          .then((responseJson) =>  {return responseJson});
        return books;
    };

    getBook = async(bookId) => {
        let url = apiUrl + "/" + bookId;
        let book = await fetch(url, Constants.GetRequest)
            .then((response) => response.json())
            .then((responseJson) => {return responseJson});
        return book;
    };

    addBook = async(book) => {
        let data = JSON.stringify(book);
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: data
        };

        let result = await fetch(apiUrl, options)
            .then((response) => {
                if(response.status === 201){
                    return response.json();
                }
                else return response.status;
            });
        return result;
    };

}

export default booksApi;