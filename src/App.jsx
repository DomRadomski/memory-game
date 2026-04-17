import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {

  let [pokemon, setPokemon] = useState([
    {name: 'chimchar', imgurl: null},
    {name: 'piplup', imgurl: null},
    {name: 'pikachu', imgurl: null},
    {name: 'quagsire', imgurl: null},
    {name: 'gible', imgurl: null},
    {name: 'turtwig', imgurl: null},
    {name: 'magikarp', imgurl: null},
    {name: 'starly', imgurl: null},
    {name: 'abra', imgurl: null}
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

  return (
    <div className='pokegrid'>
      {pokemon.map(p => (
        <Pokemon key={p.name} name={p.name} imgurl={p.imgurl}/>
      ))}
    </div>
  )
}

export default App

function Pokemon({ name, imgurl }) {
  return (
    <div className='pokemon'>
      <img src={imgurl}/>
      <h1>{name}</h1>
    </div>
  )
}
