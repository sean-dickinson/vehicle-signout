import { SimpleEntity } from "app/models/simple-entity";

export function compareUID(o1: SimpleEntity, o2: SimpleEntity): boolean {
    return o1.uid === o2.uid;
}
