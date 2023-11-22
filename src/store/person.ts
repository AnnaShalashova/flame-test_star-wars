import { makeAutoObservable } from "mobx";
import { FetchStatus } from "src/shared/api";
import { fetchPersonNormalize } from "src/entities/peoples/api";
import { makePersistable } from "mobx-persist-store";
import { FlowReturn } from "./types";
import { Person } from "src/entities/peoples";


export class PersonStore {
    person: Person | null = null;
    status: FetchStatus = FetchStatus.IDLE;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        makePersistable(this, { name: 'person', properties: ['person'], storage: window.localStorage });
    }

    *fetchPerson(id: number): FlowReturn<typeof fetchPersonNormalize> {
        try {
            this.status = FetchStatus.LOADING;
            const result: Person = yield fetchPersonNormalize(id);
            this.person = result;
            this.status = FetchStatus.SUCCEDED;
        } catch (error) {
            this.status = FetchStatus.ERROR;
            console.error(error);
        }
    }
}