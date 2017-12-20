/**
 * Created by dcoyer on 12/12/2017.
 */

import AppDispatcher from './../dispatcher/AppDispatcher';
import ActionTypes from "../ActionTypes";

class ReservationActions {

    addReservation = (reservation) => {
      AppDispatcher.dispatch({
          actionType: ActionTypes.ADD_RESERVATION,
          reservation: reservation
      });
    };

    returnReservation = (reservationId) => {
      AppDispatcher.dispatch({
          actionType: ActionTypes.RETURN_RESERVATION,
          reservationId: reservationId
      });
    };

    getUserReservations = (userId) => {
        AppDispatcher.dispatch({
            actionType: ActionTypes.GET_USER_RESERVATIONS,
            userId: userId
        });
    };

    getActiveUserReservations = (userId) => {
      AppDispatcher.dispatch({
          actionType: ActionTypes.GET_ACTIVE_USER_RESERVATIONS,
          userId: userId
      });
    };

    deleteByBookId = (bookId) => {
      AppDispatcher.dispatch({
          actionType: ActionTypes.DELETE_RESERVATIONS_BOOK,
          bookId: bookId
      })
    };

}

export default ReservationActions;