import HttpClient from './httpClient/HttpClient';
import {RickandMortyData, SuperHeroData} from './dataInterfaces/RawDataInterfaces';
import Character from './dataInterfaces/Character';
import * as dotenv from 'dotenv';

dotenv.config();

export class RickandMortyApi extends HttpClient {
  constructor() {
    super('https://rickandmortyapi.com/api');
  }

  parseData = (rawData: RickandMortyData): Character => {
    const dataParsed = {
      name: rawData.name,
      species: rawData.species,
      gender: rawData.gender,
      placeOfBirth: rawData.origin.name,
      firstAppearance: rawData.episode[0],
      image: rawData.image
    }
    return dataParsed;
  }
}

export class SuperHeroApi extends HttpClient {
  constructor () {
    super(`https://superheroapi.com/api/${process.env.SUPERHERO_API_TOKEN}`);
  }

  parseData = (rawData: SuperHeroData): Character => {
    const dataParsed = {
      name: rawData.name,
      species: rawData.appearance.race,
      gender: rawData.appearance.gender,
      placeOfBirth: rawData.biography['place-of-birth'],
      firstAppearance: rawData.biography['first-appearance'],
      image: rawData.image.url
    }

    return dataParsed;
  }

}

