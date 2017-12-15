/**
 * Created by dcoyer on 11/30/2017.
 */
import jwt_decode from 'jwt-decode';
import User from "../models/User";
import Roles from "../constants/Roles";
export default class AuthenticationFunctions{

    getUserFromToken = (idToken) => {
      let userInfo = jwt_decode(idToken);
      let customerInfo = userInfo["http://customerInfo"];
      if(customerInfo == null) return null;
      let firstName = customerInfo.firstName;
      let lastName = customerInfo.lastName;
      let roles = customerInfo.roles;
      let userId = customerInfo.userId;
      let email = userInfo.name;
      let user = new User(userId, email,firstName,lastName,roles);
      return user;
    };

    isExpired = (expiresAt) => {
      let isExpired = expiresAt < new Date().getTime();
      return isExpired;
    };

    getUserRole = (user) => {
      let role = "";
      if(user.roles == null)
          return null;
      if(user.roles.indexOf(Roles.ADMIN) > -1) role = Roles.ADMIN;
      else if(user.roles.indexOf(Roles.USER) > -1) role = Roles.USER;
      return role;
    };

}