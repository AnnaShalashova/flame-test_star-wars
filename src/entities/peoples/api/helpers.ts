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

export function normalizePerson(raw: any, favorites: Person[]): Person {
  const id = parseId(raw.url);
  const normalizedPerson = {
    ...raw,
    id,
    image: getPeopleImage(id),
    isFavorite: !!favorites?.find(favPer => favPer.id === id)
  };

  Object.entries(raw).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      const stringValue: string = value.reduce((acc: string, cur: string, idx: number) => (
        acc + cur + `${idx < (value.length - 1) ? ', ' : ''}`), '');
      normalizedPerson[key] = stringValue
    }
  })

  return normalizedPerson;
}

export function normalizePeoples(raw: RawPerson[], favorites: Person[]): Person[] {
  return raw.map((person) => normalizePerson(person, favorites));
}
