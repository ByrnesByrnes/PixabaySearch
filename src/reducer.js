
const localData = localStorage.getItem('favorited')
// JSON.parse(localData) ||
export const state = {
  recentSearch: [],
  favorites:  JSON.parse(localData) || [],
  currentPage: 1,
  theme: false
}
// console.log(localData, "Local Data")

export const setLocalStorage = (state) => {
  localStorage.setItem(
    'favorited', JSON.stringify(
      state.favorites
    ))
}

export default function reducer(state, action) {
  switch (action.type) {
    case 'STORE_SEARCH':
      return {
        ...state,
        recentSearch: action.payload
      }
    case 'ADD_TO_FAVORITE':
      if (!state.favorites.includes(action.payload)) {
        return  state = {
          ...state,
          favorites: [
            action.payload,
            ...state.favorites
          ]
        }
      }
      return state = {
        ...state,
        favorites: state.favorites
      }
    case 'REMOVE_ADD_FAVORITE':
      const index = state.favorites.findIndex(item => item.id === action.payload)
      const newFavorites = [...state.favorites]
      index >= 0 && newFavorites.splice(index, 1)
      return state = {
        ...state,
        favorites: newFavorites
      }
    case 'SET_THEME':
      return {
        ...state,
        theme: !state.theme
      }
    default:
      return state
  }
}