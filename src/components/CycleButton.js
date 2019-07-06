import React from "react"
import Fab from '@material-ui/core/Fab'
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike'
import { Link } from 'react-router-dom'

import './CycleButton.scss'

const CycleButton = () => {

  return (
    <Fab aria-label="Add" className="fab">
      <Link to="/new-activity">
        <DirectionsBikeIcon />
      </Link>
    </Fab>
  )
}

export default CycleButton
