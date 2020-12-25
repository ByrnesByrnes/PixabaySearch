import React, {useState, useRef, useEffect, useCallback} from 'react';
import './css/search.css'
import {ImSearch} from 'react-icons/im'
import {IoMdArrowDropright, IoMdArrowDropleft} from 'react-icons/io'
import { apiKey as keyApi } from '../apiKey'
import { StateContext } from '../context/state'

export default function Search() {
  

  let focusRef = useRef(null)

  const [input, setInput] = useState('')
  const [state, dispatch] = StateContext()
  const [currentPage, setCurrentPage] = useState(1)
  const [disabled, setDisabled] = useState(true)
 
  const baseUrl = 'https://pixabay.com/api/'
  const apiKey = keyApi
  const fullUrl = `${baseUrl}${apiKey}&q=${input}&image_type=photo&per_page=18`


  const prevPage = () => {
    setCurrentPage(currentPage => currentPage - 1)
  }
  
  const nextPage = () => {
    setCurrentPage(currentPage => currentPage + 1)
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
    searchImages()
    currentPage === 1 ? setDisabled(true) : setDisabled(false)
  },[prevPage, nextPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [input.length])

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
      <div className="search__pagination" style={{visibility: !state.recentSearch.length < 1 && !input.length <= 2 ? "visible": "hidden" }}>
        <button className="search__direction" onClick={prevPage} disabled={disabled}><IoMdArrowDropleft/></button>
        <button className="search__direction" onClick={nextPage} currentpage="3 Page"><IoMdArrowDropright/></button>
      </div>
    </div>
  )
}