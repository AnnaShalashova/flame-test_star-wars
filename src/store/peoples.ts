import { makeAutoObservable } from "mobx";
import { FetchStatus } from "src/shared/api";
import { NormalizedPeoples, fetchPeoplesNormalize } from "src/entities/peoples/api";
import { Person } from "src/entities/peoples/model/types/peoplesSchema";
import { makePersistable } from "mobx-persist-store";
import { FlowReturn } from "./types";
import { DEFAULT_PAGE, DEFAULT_PAGINATION_COUNT, TOTAL_PEOPLES } from "src/entities/peoples";


export class PeoplesStore {
    peoples: Person[] = [];
    favorites: Person[] = [];
    status: FetchStatus = FetchStatus.IDLE;

    count: number = DEFAULT_PAGINATION_COUNT;
    countTotal: number | null = TOTAL_PEOPLES;
    currentPage: number = DEFAULT_PAGE;

    columns: string[] = [
        'Name',
        'Height',
        'Mass',
        'Hair color'
    ];
    cellKeys: (keyof Person)[] = [
        'name',
        'height',
        'mass',
        'hair_color'
    ];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        makePersistable(this, { name: 'peoples', properties: ['peoples'], storage: window.localStorage });
        makePersistable(this, { name: 'favorites', properties: ['favorites'], storage: window.localStorage });
        makePersistable(this, { name: 'currentPage', properties: ['currentPage'], storage: window.localStorage });
    }

    toggleFavorites = (person: Person) => {
        const updatedPeoples = this.peoples.map(p => {
            if (p.id === person.id) {
                p.isFavorite = !p.isFavorite
            }
            return p;
        });
        this.peoples = updatedPeoples;

        const isFavoritesPerson = this.favorites.find(p => p.id === person.id);
        if (isFavoritesPerson) {
            this.favorites = this.favorites.filter(favPerson => favPerson.id !== person.id)
        } else {
            this.favorites.push(person);
        }
    }

    setCurrentPage = (pageNumber: number) => {
        this.currentPage = pageNumber;
    }

    *fetchPeoples(): FlowReturn<typeof fetchPeoplesNormalize> {
        try {
            this.status = FetchStatus.LOADING;
            const result: NormalizedPeoples = yield fetchPeoplesNormalize(
                { currentPage: this.currentPage, favorites: this.favorites });
            this.peoples = result.items;
            this.status = FetchStatus.SUCCEDED;
        } catch (error) {
            this.status = FetchStatus.ERROR;
            console.error(error);
        }
    }
}