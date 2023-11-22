import { makeAutoObservable } from "mobx";
import { FetchStatus } from "src/shared/api";
import { NormalizedPeoples, fetchPeoplesNormalize } from "src/entities/peoples/api";
import { Person } from "src/entities/peoples/model/types/peoplesSchema";
import { makePersistable } from "mobx-persist-store";
import { FlowReturn } from "./types";
import { DEFAULT_PAGE, TOTAL_PEOPLES } from "src/entities/peoples";
import { isPersonFavorite } from "src/entities/peoples/api/helpers";
import { DEFAULT_CELL_KEYS, DEFAULT_COLUMNS } from "src/entities/peoples/constants";


export class PeoplesStore {
    peoples: Person[] = [];
    favorites: Person[] = [];
    status: FetchStatus = FetchStatus.IDLE;

    count: number = TOTAL_PEOPLES;
    currentPage: number = DEFAULT_PAGE;

    columns: string[] = DEFAULT_COLUMNS;
    cellKeys: string[] = DEFAULT_CELL_KEYS;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        makePersistable(this, { name: 'peoples', properties: ['peoples'], storage: window.localStorage });
        makePersistable(this, { name: 'favorites', properties: ['favorites'], storage: window.localStorage });
        makePersistable(this, { name: 'currentPage', properties: ['currentPage'], storage: window.localStorage });
    }

    toggleFavorites = (person: Person) => {
        if (isPersonFavorite(person, this.favorites)) {
            this.favorites = this.favorites.filter(favPerson => favPerson.id !== person.id)
        } else {
            this.favorites.push(person);
        }
    }

    *fetchPeoples(page: number = this.currentPage): FlowReturn<typeof fetchPeoplesNormalize> {
        try {
            this.status = FetchStatus.LOADING;
            const result: NormalizedPeoples = yield fetchPeoplesNormalize(
                { currentPage: page });
            this.peoples = result.items;
            this.currentPage = page;
            this.status = FetchStatus.SUCCEDED;
        } catch (error) {
            this.status = FetchStatus.ERROR;
            console.error(error);
        }
    }
}