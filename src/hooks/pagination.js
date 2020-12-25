import React, { useState, useEffect } from 'react';

export default function Pagination(input, searchImages, currentPage, setCurrentPage) {
 
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    input.length <= 2 ? setCurrentPage(1) : searchImages()
    currentPage === 1 ? setDisabled(true) : setDisabled(false)
  }, [currentPage, input.length])


  if(currentPage <= 1) {
    setDisabled(true)
  } else {
    setDisabled(false)
  }

  const nextPage = () => {
    setCurrentPage(currentPage => currentPage + 1)
    searchImages()
  }
  
  const prevPage = () => {
    setCurrentPage(currentPage => currentPage - 1)
    searchImages()
  }

  return {nextPage, prevPage, disabled}
}