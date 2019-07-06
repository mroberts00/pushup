import React, { useState, useEffect } from "react"
import moment from 'moment'
import EditIcon from '@material-ui/icons/EditOutlined'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import { Link } from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import YellowJerseyIcon from '../assets/yellow-jersey.png'
import GreenJerseyIcon from '../assets/green-jersey.png'
import PolkaJerseyIcon from '../assets/polkadot-jersey.png'
import TeamIcon from '../assets/team.png'

import Layout from '../components/Layout'
import { useClient } from '../client'
import { GET_STAGES_QUERY } from '../graphql/queries'
import Context from '../context'

import './Table.scss'

const Table = (props) => {
  const [tab, setTab] = useState(0)
  const { greenPoints, userPushups, userSitups, teamPushups, teams, users } = props

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  }

  const dataFilter = () => {
    switch (tab) {
      case 0:
        return userPushups
      case 1:
        return greenPoints
      case 2:
        return userSitups
      case 3:
        return teamPushups
    }
  }

  const renderTeamRow = (id, number) => {
    const team = teams.find(team => team._id === id) || {}
    const { name, pic } = team

    return (
      <div className="table-row">
        <span className="team-pic-holder" style={{ width: '30%' }}>
          <img src={pic} />
        </span>
        <span style={{ width: '50%' }}>{name}</span>
        <span style={{ width: '20%', textAlign: 'center' }}>{number}</span>
      </div>
    )
  }

  const renderUserRow = (id, number) => {
    const user = users.find(user => user._id === id) || {}
    const { username, picture } = user
    return (
      <div className="table-row">
        <span className="profile-pic-holder" style={{ width: '30%' }}>
          <span className="profile-pic" style={{ backgroundImage: `url(${picture})` }} />
        </span>
        <span style={{ width: '50%' }}>{username}</span>
        <span style={{ width: '20%', textAlign: 'center' }}>{number}</span>
      </div>
    )
  }

  const data = dataFilter()
  users && tab !== 3 && users.map(user => {
    if (!data[user._id]) {
      data[user._id] = 0
    }
  })
  const ids = Object.keys(data)
  const sortedIds = ids.sort((a, b) => data[b] - data[a])
  return (
    <div className="data-table">
      <div className="table-tabs">
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab
            icon={<img src={YellowJerseyIcon} alt="yellow jersey icon" />}
          />
          <Tab
            icon={<img src={GreenJerseyIcon} alt="green jersey icon" />}
          />
          <Tab
            icon={<img src={PolkaJerseyIcon} alt="polkadot jersey icon" />}
          />
          <Tab
            icon={<img src={TeamIcon} alt="team icon" />}
          />
        </Tabs>
      </div>
      <div className="table">
        <div className="table-header">
          <span style={{ width: '30%' }} />
          <span style={{ width: '50%' }}>{tab === 3 ? "Team" : "Rider"}</span>
          <span style={{ width: '20%', textAlign: 'center' }}>{tab === 1 ? "Points" : "Kms"}</span>
        </div>
        <div className="table-data">
          {sortedIds.map(id => {
            const number = data[id]
            return (
              <>
                {tab === 3 ? renderTeamRow(id, number) : renderUserRow(id, number)}
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Table