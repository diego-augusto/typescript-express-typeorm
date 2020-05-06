import { EntityRepository, Repository } from 'typeorm'
import { Store } from '../entities/Store'

@EntityRepository(Store)
export class StoreRepository extends Repository<Store> { }