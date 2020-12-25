import React, { useEffect } from 'react';
import {StateContext} from '../context/state'
import { setLocalStorage } from '../reducer'

export default function Favorites() {
  const [state, dispatch] = StateContext()


  useEffect(()=> {
    setLocalStorage(state)
  },[state])


  const removeFavorite = (id) => {
    dispatch({
      type: 'REMOVE_ADD_FAVORITE',
      payload: id
    })
  }

  return (
    <div className="container">
      <h1 className={`favorites__title ${state.theme && "text"} `}>Your Favorited Images</h1>
      <div className="favorites__list">
      {state.favorites.length !== 0 ? state.favorites.map(image => (
        <div key={image.id} className="favorites__item">
          <img className="favorites__image" src={image.webformatURL} alt={image} />
          <button className="favorites__removeBtn" onClick={() => removeFavorite(image.id)}>Remove</button>
        </div>
      )) : <h1>No Favorites have been added</h1>}
      </div>
    </div>
  )
}