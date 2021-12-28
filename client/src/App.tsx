import React, { useState } from 'react';
import './App.css';
import TvShowCards from './components/TvShowCards';
import {TextField, Button} from '@mui/material'
import axios from 'axios';
import Character from './dataInterfaces/Character';


function App() {

  const [rickAndMorty, rickAndMortySelected] = useState(false);
  const [superHero, superHeroSelected] = useState(false);

  const [characterId, characterIdSelection] = useState('0');
  const [helpMessage, changeHelpMessage] = useState('');

  const [buttonClicked, changeButtonState] = useState(false);
  const [loadingData, changeLoadingState] = useState(false);

  const [characterData, changeCharacterData] = 
    useState({
        name: '',
        species: '',
        gender: '',
        placeOfBirth: '',
        firstAppearance: '',
        image: ''
  });

  function updateRickandMortySelectionState(): void {
    superHeroSelected(false);
    rickAndMortySelected(true); 
  }

  function updateSuperHeroSelectionState(): void {
    rickAndMortySelected(false);
    superHeroSelected(true);
  }

  function updateCharacterIdSelection(characterId: string): void {
    characterIdSelection(characterId);
  }

  function setCharacterData(characterPayload: Character): void{
    changeCharacterData(characterPayload);
  }

  function submitButtonClick(): void{
    changeButtonState(true);
  }

  function setLoadingState(): void{
    if(loadingData){
      changeLoadingState(false);
    }
    else{
      changeLoadingState(true);
    }
  }

  function submitSelection(): void{
    if(characterId !== '0'){
      if(rickAndMorty){
        setLoadingState();
        axios.get('/RickandMorty/' + characterId)
          .then(response => {
            changeLoadingState(false);
            setCharacterData(response.data);
          })
          .then(() => {
            submitButtonClick();
          })
          .catch(error => console.log(error));
      }
      else if(superHero){
        setLoadingState();
        axios.get('/SuperHero/' + characterId)
          .then(response => {
            changeLoadingState(false);
            setCharacterData(response.data);
          })
          .then(() => {
            submitButtonClick();
          })
          .catch(error => console.log(error));
      }
      else{
        changeHelpMessage('Select your favorite TV show')
      }
    }
    else{
      changeHelpMessage('Select a valid characterId');
    }
  }

  return (
    <div className='App'
    >
      <header>
        <h1>Welcome to the Character Application</h1>
        <h2>Choose your favorite TV show</h2>
      </header>
      <main>
        <form>
          <div className='cardSelection'
          >
            <div
            className={rickAndMorty ? 'rickAndMortyCard selectedCard' : 'rickAndMortyCard'}
            onClick={updateRickandMortySelectionState}
            >
              <TvShowCards
              image='https://images-na.ssl-images-amazon.com/images/I/91MteSqsrJL.jpg'
              alt='Rick and Morty tv show'
              title='Rick and Morty'
              paragraph="Rick, an alcoholic sociopath and scientist, lives with his daughter Beth's family. Apart from building gadgets, he takes his morally right but dimwit grandson Morty on absurd intergalactic adventures."
              >
              </TvShowCards>
            </div>
            <div
            className={superHero ? 'superHeroCard selectedCard': 'superHeroCard'}
            onClick={updateSuperHeroSelectionState}
            >
              <TvShowCards
              image='https://i0.wp.com/hipertextual.com/wp-content/uploads/2018/12/marvel.jpg?fit=1200%2C799&ssl=1'
              alt='SuperHeroes tv show'
              title='SuperHero TV shows'
              paragraph="Superheroes come from a wide array of different backgrounds and origins. Some superheroes (for example, Batman and Iron Man) derive their status from advanced technology they create and use, while others (such as Superman and Spider-Man) possess non-human or superhuman biology or study and practice magic to achieve their abilities (such as Zatanna and Doctor Strange)"
              >
              </TvShowCards>
            </div>
          </div>
          <div
          className='characterIdSelection'
          >
            <TextField
            value={characterId}
            id='characterIdSelection'
            label='Character ID: '
            type='number'
            onChange={event => updateCharacterIdSelection(event.target.value)}
            >
            </TextField>
            <Button
            variant='text'
            size='large'
            onClick={submitSelection}
            >
              Submit
            </Button>
            {loadingData && <div className='screenLoader'></div>}
            <p
            style={{color: "red"}}
            >
              {helpMessage}
            </p>
          </div>
        </form>
        {buttonClicked &&
        <div className='responseDiv'>
          <h1>{characterData.name}</h1>
          <h4><strong>Species: </strong>{characterData.species}</h4>
          <h4>Gender: {characterData.gender}</h4>
          <h4>Place of birth: {characterData.placeOfBirth}</h4>
          <h4>First appearance: {characterData.firstAppearance}</h4>
          <img src={characterData.image} alt="Character image" />
        </div>
        }
      </main>
    </div>
  );
}

export default App;