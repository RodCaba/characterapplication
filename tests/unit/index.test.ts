import { RickandMortyApi, SuperHeroApi } from "../../src/CharacterApis";

const RickAndMorty = new RickandMortyApi();
const SuperHero = new SuperHeroApi();

test('Rick and Morty API returns defined data', () => {
  expect(RickAndMorty.instance.get('/character/1').then(response => response.data)).toBeDefined();
})

test('SuperHero API returns defined data', () => {
  expect(SuperHero.instance.get('/2').then(response => response.data)).toBeDefined();
})
