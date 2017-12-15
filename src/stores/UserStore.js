/**
 * Created by dcoyer on 11/2/2017.
 */
import ActionTypes from './../ActionTypes';
import AppDispatcher from './../dispatcher/AppDispatcher';
import EventsEmitter from "events";
import Events from './../constants/Events';
import customerApi from "../api/userApi";


const api = new customerApi();
class UserStore extends EventsEmitter {
    user = {};
    errorCode;

    addUser = async(createUserRequest) => {
      let response = await api.addUser(createUserRequest);
      if(typeof(response) !== "number"){
          this.emit(Events.ADDED_USER);
      }
      else {
          this.errorCode = response;
          this.emit(Events.ADDED_USER_FAILED);
      }

    };

}

const userStore = new UserStore();

AppDispatcher.register(function(payload) {
    switch(payload.actionType) {
        case ActionTypes.ADD_USER:
            userStore.addUser(payload.createUserRequest);
            break;
    }
});

export default userStore;