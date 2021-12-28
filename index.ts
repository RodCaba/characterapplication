import express, {Request, Response} from 'express';
import path from 'path';
import { RickandMortyApi, SuperHeroApi} from './src/CharacterApis';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded(
  {
    extended:false
  }
));
app.use(express.static(path.join(__dirname, 'src')));
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
}

app.get('/RickandMorty/:characterId', (request: Request, response: Response) => {
  const RickandMorty = new RickandMortyApi();
  RickandMorty.instance.get(`/character/${request.params.characterId}`)
    .then(res => res.data)
    .catch(err => response.send(err))
    .then(res => response.send(RickandMorty.parseData(res)));
});
app.get('/SuperHero/:characterId', (request: Request, response: Response) => {
  const SuperHero = new SuperHeroApi();
  SuperHero.instance.get(`/${request.params.characterId}`)
    .then(res => res.data)
    .catch(err => response.send(err))
    .then(res => response.send(SuperHero.parseData(res)));
})


app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`);  
})
