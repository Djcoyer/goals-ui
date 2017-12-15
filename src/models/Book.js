/**
 * Created by dcoyer on 12/11/2017.
 */

class Book  {
    constructor(title, author, available, id, description) {
        this.title = (title == null ? null : title);
        this.author = (author == null ? null : author);
        this.available = (available == null ? null : available);
        this.id = (id == null ? null : id);
        this.description = (description == null ? null : description);
    }

}

export default Book;