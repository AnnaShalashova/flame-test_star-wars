import { makeAutoObservable } from "mobx";
import { PeoplesStore } from "./peoples";
import { RelevantPeoplesStore } from "./relevantPeoples";
import { PersonStore } from "./person";

class RootStore {
    peoples = new PeoplesStore();
    person = new PersonStore();
    relevantPeoples = new RelevantPeoplesStore();

    constructor() {
        makeAutoObservable(this);
    }
}

export type { RootStore };
export const store = new RootStore();