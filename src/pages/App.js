import React, { useContext } from "react"
import { Link } from 'react-router-dom'
import moment from 'moment'
import Context from '../context'

import Layout from '../components/Layout'

const App = () => {
  const { state } = useContext(Context)
  const { teams } = state
  return (
    <Layout>
      <h1>Hi There</h1>
      <Link to="/create-tour">Create Tour</Link>
      <Link to="/tours">Tours</Link>
      <Link to="/current-stage">Current Stage</Link>
      {teams[0] && teams[0] !== null ? teams.map(team => (
        <Link to={`/teams/${team._id}`}>
          {team.name}
        </Link>
      )) : null}
    </Layout>
  )
}

export default App