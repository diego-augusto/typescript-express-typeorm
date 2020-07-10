import { EntityRepository, Repository } from 'typeorm'
import { Store } from '../entities'

@EntityRepository(Store)
export class StoreRepository extends Repository<Store> { }