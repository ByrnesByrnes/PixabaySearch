import React, { useState, useEffect } from 'react';
import { StateContext } from '../context/state'
import { setLocalStorage } from '../reducer'

import {getClass} from '../utils/layout'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'


export default function ImageCard({image, index}) {
  const [hover, setHover] = useState(false)
  const [state, dispatch] = StateContext()
  
  let isFavoritedID
  
  useEffect(()=> {
    setLocalStorage(state)
  },[state])

  const addToFavorite = () => {
    dispatch({
      type: 'ADD_TO_FAVORITE',
      payload: image
    })
  }

  const RemoveFavorite = () => {
    dispatch({
      type: 'REMOVE_ADD_FAVORITE',
      payload: image.id
    })
  }

  if (state.favorites.length >= 1) {
    isFavoritedID = state.favorites.find(item => item.id === image.id && item.id)
  }

  return (
    <div onDoubleClick={image.id ===  isFavoritedID?.id ? RemoveFavorite : addToFavorite} className={`image-card ${getClass(index)}`}>
      <img src={image.webformatURL} alt=""/>
      <div className="image__info">
      {image.id ===  isFavoritedID?.id ? <AiFillHeart onClick={RemoveFavorite} /> : <AiOutlineHeart onClick={addToFavorite} /> }
      </div>
    </div>
  )
}