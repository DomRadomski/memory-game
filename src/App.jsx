import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {

  let [score, setScore] = useState(0)
  let [bestscore, setBestscore] = useState(0)

  let [pokemon, setPokemon] = useState([
    {name: 'chimchar', imgurl: null, clicked: false},
    {name: 'piplup', imgurl: null, clicked: false},
    {name: 'pikachu', imgurl: null, clicked: false},
    {name: 'quagsire', imgurl: null, clicked: false},
    {name: 'gible', imgurl: null, clicked: false},
    {name: 'turtwig', imgurl: null, clicked: false},
    {name: 'magikarp', imgurl: null, clicked: false},
    {name: 'starly', imgurl: null, clicked: false},
    {name: 'abra', imgurl: null, clicked: false}
  ]) 

  useEffect(() => {
    pokemon.forEach(p => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`)
        .then(response => response.json())
        .then(data => {
          setPokemon(prev => prev.map(entry => 
            entry.name === p.name 
              ? { ...entry, imgurl: data.sprites["other"]["official-artwork"]["front_default"] }
              : entry
          ))
        })
    })
  },[])

  function shuffle(arr) {
    let currentIndex = arr.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }

    return arr;
  }

  function handleClick(p) {
    setPokemon(shuffle([...pokemon]))
    if (!p.clicked) {
      setPokemon(prev => prev.map(entry =>
        entry.name === p.name
          ? { ...entry, clicked: true }
          : entry
      ))
      setScore(score + 1)

    } else {
        if (score > bestscore) setBestscore(score);
        setScore(0)
        setPokemon(prev => prev.map(entry => ({ ...entry, clicked: false })))
    }  
  }  
  

  return (
    <div className='memory-game'>
      <Header score={score} bestscore={bestscore}/>
      <Pokegrid pokemon={pokemon} handleClick={handleClick}/>
    </div>
  )
}

export default App

function Header({ score, bestscore }) {
  return (
    <div className='header'>
      <button>Rules</button>
      <h1>Pokemon Memory Game</h1>
      <Counter score={score} bestscore={bestscore}/>
    </div>
  )
}

function Counter({ score, bestscore }) {
  return (
    <div className='score'>
      <span>Current Score: {score} </span>
      <span>Best Score: {bestscore} </span>
    </div>
  )
}

function Pokegrid({ pokemon, handleClick }) {

  return (
    <div className='pokegrid'>
      {pokemon.map(p => (
        <Pokemon key={p.name} name={p.name} imgurl={p.imgurl} handleClick={() => handleClick(p)}/>
      ))}
    </div>
  )
}

function Pokemon({ name, imgurl, handleClick }) {
  return (
    <div className='pokemon' onClick={handleClick}>
      <img src={imgurl}/>
      <h1>{name}</h1>
    </div>
  )
}
