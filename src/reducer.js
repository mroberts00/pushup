export default function reducer(state, { type, payload }) {
  switch (type) {
    case "LOGIN_USER":
      return {
        ...state,
        currentUser: payload,
      }
    case "IS_LOGGED_IN":
      return {
        ...state,
        isAuth: payload
      }
    case "SIGNOUT_USER":
      return {
        ...state,
        currentUser: null,
        isAuth: false
      }
    case "CREATE_DRAFT":
      return {
        ...state,
        currentPin: null,
        draft: {
          latitude: 0,
          longitude: 0,
        },
      }
    case "UPDATE_DRAFT_LOCATION":
      return {
        ...state,
        draft: payload
      }
    case "DELETE_DRAFT":
      return {
        ...state,
        draft: null
      }
    case "GET_PINS":
      return {
        ...state,
        pins: payload,
      }
    case "CREATE_PIN":
      const newPin = payload
      const prevPins = state.pins.filter(pin => pin._id !== newPin._id)
      return {
        ...state,
        pins: [...prevPins, newPin]
      }
    case "SET_PIN":
      return {
        ...state,
        currentPin: payload,
        draft: null,
      }
    case "DELETE_PIN":
      const deletedPin = payload
      const filteredPins = state.pins.filter(pin => pin._id !== deletedPin._id)
      if (state.currentPin) {
        const isCurrentPin = deletedPin._id === state.currentPin._id

        if (isCurrentPin) {
          return {
            ...state,
            pins: filteredPins,
            currentPin: null,
          }
        }
      }
      return {
        ...state,
        pins: filteredPins,
      }
    case "CREATE_COMMENT":
      const updatedCurrentPin = payload
      //find and replace
      const updatedPins = state.pins.map(pin =>
        pin._id === updatedCurrentPin._id ? updatedCurrentPin : pin
      )
      return {
        ...state,
        pins: updatedPins,
        currentPin: updatedCurrentPin
      }
    case "CREATE_TOUR":
      const newTour = payload
      const prevTours = state.tours.filter(tour => tour._id !== newTour._id)
      return {
        ...state,
        tours: [...prevTours, newTour],
      }
    case "GET_TOURS":
      return {
        ...state,
        tours: payload,
      }
    case "GET_STAGES":
      return {
        ...state,
        stages: payload,
      }
    case "UPDATE_STAGE":
      const updatedStage = payload
      console.log(payload)
      //find and replace
      const updatedStages = updatedStage && state.stages.map(stage =>
        stage._id === updatedStage._id ? updatedStage : stage
      )
      return {
        ...state,
        stages: [updatedStages]
      }
    case "GET_CURRENT_STAGE":
      return {
        ...state,
        currentStage: payload,
        currentTour: payload.tour,
        stages: payload.stages,
      }
    case "GET_USERS":
      return {
        ...state,
        users: payload,
      }
    case "UPDATE_USER":
      console.log("payload", payload)
      // const newUser = payload._id === state.currentUser._id ? payload : state.currentUser
      return {
        ...state,
        // users: [...state.users, payload],
        // currentUser: newUser,
      }
    case "GET_TEAMS":
      return {
        ...state,
        teams: payload
      }
    default:
      return state
  }
}