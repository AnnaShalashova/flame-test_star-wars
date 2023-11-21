import { Person } from "src/entities/peoples"

export type TableActionsType = {
  title: string,
  component: (person: Person) => JSX.Element
}
