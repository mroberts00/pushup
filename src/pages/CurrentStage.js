import React, { useContext, useEffect } from "react"
import moment from 'moment'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import { Link } from 'react-router-dom'
import { useClient } from '../client'

import Layout from '../components/Layout'
import Table from '../components/Table'
import { GET_CURRENT_STAGE_QUERY, GET_STAGES_QUERY, GET_TEAMS_QUERY, GET_USERS_QUERY } from '../graphql/queries'
import Context from '../context'

import './CurrentStage.scss'


const CurrentStage = () => {
  const client = useClient()
  const { state, dispatch } = useContext(Context)
  const { currentTour, currentStage, teams, users, stages } = state || {}
  const { title, description, kms, date } = currentStage || {}
  const { competitors } = currentStage || []
  const realStages = currentStage && currentStage.tour.stages.filter(stage => stage.kms !== 0).sort((a, b) => a.date - b.date)
  const stageIndex = realStages ? realStages.findIndex(stage => stage._id === currentStage._id) : 0
  console.log(realStages)
  console.log(stageIndex)

  const { activities } = currentStage || []
  console.log(activities)

  useEffect(() => {
    if (!currentStage) {
      fetchCurrentStage()
      fetchTeams()
      fetchUsers()
    }
  }, [])

  const fetchCurrentStage = async () => {
    const { getCurrentStage } = await client.request(GET_CURRENT_STAGE_QUERY)
    dispatch({ type: "GET_CURRENT_STAGE", payload: getCurrentStage })
  }

  const fetchTeams = async () => {
    const { getTeams } = await client.request(GET_TEAMS_QUERY)
    dispatch({ type: "GET_TEAMS", payload: getTeams })
  }

  const fetchUsers = async () => {
    const { getUsers } = await client.request(GET_USERS_QUERY)
    dispatch({ type: "GET_USERS", payload: getUsers })
  }

  console.log(state)

  const userPushups = activities ? activities.reduce((r, a) => {
    r[a.user._id] = r[a.user._id] || 0
    if (a.activityType === 'pushup') {
      r[a.user._id] += a.kms
    }
    return r
  }, Object.create(null)) : {}

  const userSitups = activities ? activities.reduce((r, a) => {
    r[a.user._id] = r[a.user._id] || 0
    if (a.activityType === 'situp') {
      r[a.user._id] += a.kms
    }
    return r
  }, Object.create(null)) : {}

  const teamPushups = activities ? activities.reduce((r, a) => {
    r[a.user.team._id] = r[a.user.team._id] || 0
    if (a.activityType === 'pushup') {
      r[a.user.team._id] += a.kms
    }
    return r
  }, Object.create(null)) : {}

  const orderedFinishers = competitors && competitors.sort((a, b) => a.createdAt - b.createdAt)

  const points = [10, 6, 4, 2]

  const greenPoints = orderedFinishers && orderedFinishers.reduce((r, a, i) => {
    r[a.user._id] = points[i]
    return r
  }, Object.create(null))

  console.log("greenPoints", greenPoints)

  const loading = teams && users && currentStage && greenPoints

  return (
    <Layout>
      <div className="stage">
        <h2 className="stage-header">{title}</h2>
        <h3 className="stage-header">Stage {stageIndex + 1} - {moment(date).format('D MMMM YYYY')}</h3>
        <h3>{kms} kms</h3>
        {loading && <Table
          userPushups={userPushups}
          userSitups={userSitups}
          teamPushups={teamPushups}
          greenPoints={greenPoints}
          teams={teams}
          users={users}
        />}
      </div>
    </Layout>
  )
}

export default CurrentStage
