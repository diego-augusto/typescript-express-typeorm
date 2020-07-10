import SystemException from './SystemException'

export class UnauthorizedException extends SystemException {

    constructor() {
        super('Unauthorized')
        this.name = 'UnauthorizedException'
        this.code = 401
    }
}