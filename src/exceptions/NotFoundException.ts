import SystemException from './SystemException'

export class NotFoundException extends SystemException {

    constructor(entity: string) {
        super(`Entity not found: ${entity}`)
        this.name = 'NotFoundException'
        this.code = 404
    }
}