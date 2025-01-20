export class InvalidClientAge extends Error {
    constructor(message = "Invalid client age") {
        super(message);
    }
}