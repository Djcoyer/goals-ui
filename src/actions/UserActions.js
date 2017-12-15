/**
 * Created by dcoyer on 12/14/2017.
 */
import AppDispatcher from './../dispatcher/AppDispatcher';
import Actions from "../ActionTypes";


class UserActions {

    addUser = (createUserRequest) => {
        AppDispatcher.dispatch({
            actionType: Actions.ADD_USER,
            createUserRequest: createUserRequest
        });
    };

}

export default UserActions;