export default class SystemException extends Error {

    public message : string
    public code : number

    constructor(message: string, code: number) {
        super(message)
        this.message = message
        this.code = code
        Object.setPrototypeOf(this, new.target.prototype);
    }
}