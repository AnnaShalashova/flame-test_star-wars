
import { RawPerson, Person } from '../model/types/peoplesSchema';

export const PEOPLES_IMAGE_BASE =
  'https://starwars-visualguide.com/assets/img/characters';

export function parseId(url: string): number {
  const idRegExp = /\/([0-9]*)\/$/;
  const id = url?.match(idRegExp)![1];
  return Number(id);
}

export function getPeopleImage(id: number): string {
  return `${PEOPLES_IMAGE_BASE}/${id}.jpg`;
}

export function isPersonFavorite(person: Person, favorites: Person[] | null): boolean {
  return !!favorites?.find(favPer => Number(favPer.id) === person.id)

}

export function normalizePerson(raw: RawPerson): Person {
  const {
    birth_year,
    eye_color,
    gender,
    hair_color,
    height,
    mass,
    name,
    skin_color,
    url,
  } = raw;

  const id = parseId(url);

  return {
    id,
    name,
    gender,
    height,
    mass,
    image: getPeopleImage(id),
    hairColor: hair_color,
    skinColor: skin_color,
    eyeColor: eye_color,
    birthYear: birth_year,
  };
}

export function normalizePeoples(raw: RawPerson[]): Person[] {
  return raw.map((person) => normalizePerson(person));
}
