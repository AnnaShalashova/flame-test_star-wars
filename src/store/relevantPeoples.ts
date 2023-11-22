import { makeAutoObservable } from "mobx";
import { FetchStatus } from "src/shared/api";
import { fetchPeoplesNormalize } from "src/entities/peoples/api";
import { Person } from "src/entities/peoples/model/types/peoplesSchema";
import { FlowReturn } from "./types";


export class RelevantPeoplesStore {
    relevantPeoples: Person[] = [];
    search: string = '';
    status: FetchStatus = FetchStatus.IDLE;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    searchUpdated = (newSearch: string) => {
        this.search = newSearch;
    }

    removeRelevantPeoples = () => {
        this.relevantPeoples = [];
    }

    *fetchRelevantPeoples(): FlowReturn<typeof fetchPeoplesNormalize> {
        try {
            this.status = FetchStatus.LOADING;
            const result = yield fetchPeoplesNormalize({ search: this.search });
            this.relevantPeoples = result.items;
            this.status = FetchStatus.SUCCEDED;
        } catch (error) {
            this.status = FetchStatus.ERROR;
            console.error(error);
        }
    }
}