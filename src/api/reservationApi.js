/**
 * Created by dcoyer on 12/12/2017.
 */
import Constants from './../constants/Constants';


const apiUrl = Constants.BaseUrl + "reservations";
const getRequest = Constants.GetRequest;

class rentalApi {

    addReservation = async(reservation) => {

        let data = JSON.stringify(reservation);

        let options = {
          method: "POST",
            headers: {
              "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: data
        };

        let result = await fetch(apiUrl, options)
            .then((response) => response.json())
            .then((responseJson) => {return responseJson});

        return result;
    };

    getUserReservations = async(userId) => {
      let url = apiUrl + "/user/" + userId;
      let result = await fetch(url, getRequest)
            .then((response) => response.json())
          .then((responseJson) => {return responseJson});
      return result;
    };

    getActiveUserReservations = async(userId) => {
      let url = apiUrl + "/user/" + userId +"/active";
      let result = await fetch(url, getRequest)
          .then((response) => {
          if(response.status === 200)
              return response.json();
          else return response.status;
          });
      return result;
    };

    returnReservation = async(reservationId) => {
        let options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
        let url = apiUrl + "/" + reservationId + "/return";

        let result = await fetch(url, options)
            .then((response) => {
            return response.status;
            });
        return result;

    };

    deleteReservationsByBookId = async(bookId) => {
      let url = apiUrl + "/books/" + bookId;
      let options = {
          method: "DELETE",
          headers: {
              "Content-Type":"application/json",
              "Accept": "application/json"
          }
      };

      let result = await fetch(url, options)
          .then((response) => {
          return response.status;
          });
      return result;
    };




}


export default rentalApi;