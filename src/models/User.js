/**
 * Created by dcoyer on 11/14/2017.
 */
class User{
    constructor(userId, emailAddress, firstName, lastName, roles){
        this.userId = userId;
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = roles;
    }
}

export default User;