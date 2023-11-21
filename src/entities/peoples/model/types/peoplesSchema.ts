export const enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NOT_AVAILABLE = 'n/a',
}

export interface RawPerson {
  birth_year: string;
  created: Date;
  edited: Date;
  eye_color: string;
  films: string[];
  gender: Gender;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export interface Person {
  [key: string]: string;
}
