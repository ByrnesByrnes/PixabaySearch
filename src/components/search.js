import React, {useState, useRef, useEffect, useCallback} from 'react';
import './css/search.css'
import {ImSearch} from 'react-icons/im'
import {AiOutlineArrowRight, AiOutlineArrowLeft} from 'react-icons/ai'

import { StateContext } from '../context/state'

export default function Search() {
  

  let focusRef = useRef(null)

  const [input, setInput] = useState('')
  const [state, dispatch] = StateContext()
  const [currentPage, setCurrentPage] = useState(1)
  const [disabled, setDisabled] = useState(true)
 
  const baseUrl = 'https://pixabay.com/api/'
  const apiKey = '?key=19628942-91d596e83aac1ff8a523f4e9e'
  const fullUrl = `${baseUrl}${apiKey}&q=${input}&image_type=photo&per_page=18`


  const prevPage = () => {
    setCurrentPage(currentPage => currentPage - 1)
    searchImages()
  }
  
  const nextPage = () => {
    setCurrentPage(currentPage => currentPage + 1)
    searchImages()
  }

  const searchImages = async () => {
    try {
      const response = await fetch(`${fullUrl}&page=${currentPage}`)
      const data = await response.json()
      dispatch({
        type: 'STORE_SEARCH',
        payload: data.hits
      })
      
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    input.length <= 2 ? setCurrentPage(1) : searchImages()
    currentPage === 1 ? setDisabled(true) : setDisabled(false)
  }, [currentPage, input.length])

  return (
    <div className="search">
      <form className="search__container form">
        <div className="search__bar">
          <input
            ref={focusRef}
            className="search__input"
            onChange={event => setInput(event.target.value)} 
            value={input}
            type="text" 
            name="query"
            placeholder=" " 
          />
        <label htmlFor="query" className={`search__label ${state.theme && "darkText"}`}>Search</label>
        <button disabled={true} className="search__button">
          <ImSearch className={state.theme && "darkText"}/>
        </button>
        </div>
      </form>
      <div className="search__pagination" style={{visibility: input.length <= 2 ? "hidden" : "visible" }}>
        <button className="search__direction" onClick={prevPage} disabled={disabled}><AiOutlineArrowLeft/></button>
        <button className="search__direction" onClick={nextPage} currentpage="3 Page"><AiOutlineArrowRight/></button>
      </div>
    </div>
  )
}