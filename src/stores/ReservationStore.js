/**
 * Created by dcoyer on 12/12/2017.
 */

import EventsEmitter from "events";
import reservationApi from './../api/reservationApi';
import AppDispatcher from './../dispatcher/AppDispatcher';
import ActionTypes from "../ActionTypes";
import Events from './../constants/Events';

const api = new reservationApi();
class ReservationStore extends EventsEmitter {

    reservation = {};
    reservations = [];
    userReservations = [];
    removedReservationId = '';

    addReservation = async(reservation) => {
      let result = await api.addReservation(reservation);
      if(result != null)
          this.emit(Events.ADDED_RESERVATION);
    };

    returnReservation = async(reservationId) => {
      let result = await api.returnReservation(reservationId);
      if(result === 200){
          this.removedReservationId = reservationId;
          this.emit(Events.RETURNED_RESERVATION);
      }
    };

    getUserReservations = async(userId) => {
        let result = await api.getUserReservations(userId);
        if(result != null && result.length > 0)
        {
            this.userReservations = result;
            this.emit(Events.RETRIEVED_USER_RESERVATIONS);
        }
    };

    getActiveUserReservations = async(userId) =>{
      let result = await api.getActiveUserReservations(userId);
        if(typeof(result) !== "number")
        {
            this.userReservations = result;
            this.emit(Events.RETRIEVED_USER_RESERVATIONS);
        }

    };


}

const reservationStore = new ReservationStore();

AppDispatcher.register((payload) => {
   switch(payload.actionType) {
       case ActionTypes.ADD_RESERVATION:
           reservationStore.addReservation(payload.reservation);
           break;
       case ActionTypes.RETURN_RESERVATION:
           reservationStore.returnReservation(payload.reservationId);
           break;
       case ActionTypes.GET_USER_RESERVATIONS:
           reservationStore.getUserReservations(payload.userId);
           break;
       case ActionTypes.GET_ACTIVE_USER_RESERVATIONS:
           reservationStore.getActiveUserReservations(payload.reservationId);
           break;
   }
});

export default reservationStore;