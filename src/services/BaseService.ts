import { Repository } from "typeorm";

export default interface BaseService<T> {
    repository: T
}