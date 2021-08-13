export interface Character {
  actor?: string,
  alive?: boolean,
  ancestry?: string,
  dateOfBirth?: Date,
  eyeColour?: string,
  gender?: string,
  hairColour?: string,
  hogwartsStaff?: boolean,
  hogwartsStudent?: boolean,
  house?: string,
  image: string,
  name: string,
  patronus: string,
  species?: string,
  wand?:wand,
  yearOfBirth:number,
}
export interface wand {
  core: string,
  length: number,
  wood: string,
}
