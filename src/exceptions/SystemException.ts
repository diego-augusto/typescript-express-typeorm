export default class SystemException extends Error {

    public code : number

    constructor(message: string) {
        super(message)
        this.name = 'SystemException'
        this.message = message
        Object.setPrototypeOf(this, new.target.prototype)
    }
}