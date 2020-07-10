import SystemException from './SystemException'

export class InvalidParameterException extends SystemException {

    constructor(entity: string) {
        super(`Parameter not found: ${entity}`)
        this.name = 'InvalidParameterException'
        this.code = 400
    }
}