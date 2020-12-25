import React from 'react';
import { StateContext } from '../context/state'

import {
  Search,
  ImageCard
} from '../components'

export default function Home() {
  const [{recentSearch, theme}] = StateContext()
  
  return (
    <div className="container">
      <h1 className={`title ${theme && "text"}  `}>Pixa Search</h1>
      <p className={theme && "text"}>Images provided by www.pixabay.com</p>
      <Search />
      <div className="image-container">
        {recentSearch.map((image, i) => (
          <ImageCard key={image.id} image={image} index={i} />
        ))}
      </div>
      <p className={theme && "text"}>{recentSearch.length === 0 && "Typing will auto populate results"}</p>
    </div>
  )
}