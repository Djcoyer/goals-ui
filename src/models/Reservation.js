/**
 * Created by dcoyer on 12/12/2017.
 */

class Reservation {
    constructor(bookId, userId, reservationEndDate) {
        this.bookId = bookId;
        this.userId = userId;
        this.reservationEndDate = reservationEndDate;
    }
}

export default Reservation;