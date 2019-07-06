import React, { useState, useContext, useEffect } from "react"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import moment from 'moment'
import { Redirect } from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import PhoneIcon from '@material-ui/icons/Phone'
import FavoriteIcon from '@material-ui/icons/Favorite'
import PersonPinIcon from '@material-ui/icons/PersonPin'
import SvgIcon from '@material-ui/core/SvgIcon'

import PushupPng from '../assets/pushup.png'
import SitupPng from '../assets/situp.png'

import Layout from '../components/Layout'
import { CREATE_ACTIVITY_MUTATION } from '../graphql/mutations'
import { useClient } from '../client'

import Context from '../context'
import './NewActivity.scss'

const types = {
  0: "pushup",
  1: "situp",
}

const NewActivity = (props) => {
  const client = useClient()
  const { state, dispatch } = useContext(Context)
  const { currentStage } = state

  const [kms, setKms] = useState('')
  const [tab, setTab] = useState(0)

  const handleChangeKms = event => {
    setKms(event.target.value);
  }

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  }

  console.log(state)
  const handleSubmit = async () => {
    console.log(types[tab])
    const variables = { stageId: currentStage._id, activityType: types[tab], kms: parseFloat(kms) }
    await client.request(CREATE_ACTIVITY_MUTATION, variables)
    setKms('')
  }

  return (
    <Layout>
      <h1>Create New Activity</h1>
      <Tabs
        value={tab}
        onChange={handleChangeTab}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab
          icon={<img src={PushupPng} alt="pushup icon" />}
          label="PUSHUPS"
        />
        <Tab
          icon={<img src={SitupPng} alt="situp icon" />}
          label="SITUPS"
        />
      </Tabs>
      <TextField
        id="outlined-required"
        label="How many you got?"
        margin="normal"
        variant="outlined"
        type="number"
        value={kms}
        onChange={e => handleChangeKms(e)}
      />
      <Button color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Layout>
  )
}

export default NewActivity
