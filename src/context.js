import { createContext } from 'react'

const Context = createContext({
  currentUser: null,
  isAuth: false,
  currentPin: null,
  stages: [],
  currentTour: null,
  tours: [],
  currentStage: null,
  users: [],
  teams: [],
})

export default Context