/**
 * Created by dcoyer on 11/15/2017.
 */
import Constants from './../constants/Constants';

const API_URL = Constants.BaseUrl + "users";
class customerApi {

    addUser = async (createUserRequest) => {
        let data = JSON.stringify(createUserRequest);
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: data
        };

        let response = await fetch(API_URL, options)
            .then((response) =>
            {
                if(response.status === 201){
                    return response.json();
                }
                else return response.status;
            })
            .then((responseJson) => {return responseJson});
        console.log(response);
        return response;
    };

}

export default customerApi;