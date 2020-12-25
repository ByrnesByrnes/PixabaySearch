import React from 'react';
import './css/header.css'
import { NavLink } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { CgDarkMode } from 'react-icons/cg'
import { StateContext } from '../context/state'


export default function Header() {
  const [state, dispatch] = StateContext()
  const { theme } = state
  
  const handleThemeChange = () => {
    dispatch({
      type: 'SET_THEME'
    })
  }

  document.body.style.background = theme ? "rgb(80,80,80)" : ""

  return (
    <header className={theme ? 'dark': undefined}>
      <NavLink exact={true} className="logo" to={ROUTES.HOME}>Pixa Search</NavLink>
      <ul>
        <li>
          <NavLink to={ROUTES.FAVORITES}>Favorites</NavLink>
        </li>
        <li>
          <CgDarkMode onClick={handleThemeChange} />
        </li>
      </ul>
    </header>
  )
}