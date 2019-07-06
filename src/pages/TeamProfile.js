import React, { useContext, useEffect, useState } from "react"
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone"
import axios from 'axios'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { Subscription } from 'react-apollo'

import Avatar from '../assets/avatar.png'
import PanoImage from '../assets/pano.jpg'

import Layout from '../components/Layout'
import { useClient } from '../client'
import { GET_TEAMS_QUERY, GET_USERS_QUERY } from '../graphql/queries'
import { UPDATE_TEAM_MUTATION } from '../graphql/mutations'
// import { TEAM_UPDATED_SUBSCRIPTION } from '../graphql/subscriptions'
import Context from '../context'

import './TeamProfile.scss'

const TeamProfile = (props) => {
  const client = useClient()
  const { state, dispatch } = useContext(Context)
  const { currentUser, users, teams } = state
  const { match: { params: { id: teamId } } } = props || {}
  const team = teams.find(team => team._id == teamId)

  const [image, setImage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [editing, setEditing] = useState(false)
  const [values, setValues] = useState({
    description: '',
    name: '',
  })

  const { name, description, pic: teamPicture } = team
  const teamMembers = users.filter(user => user.team._id === teamId)

  useEffect(() => {
    if (!team) {
      fetchTeams()
      fetchUsers()
    } else {
      setValues({
        name,
        description
      })
    }
  }, [])

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const fetchTeams = async () => {
    const { getTeams } = await client.request(GET_TEAMS_QUERY)
    dispatch({ type: "GET_TEAMS", payload: getTeams })
  }

  const fetchUsers = async () => {
    const { getUsers } = await client.request(GET_USERS_QUERY)
    dispatch({ type: "GET_USERS", payload: getUsers })
  }

  const handleImageUpload = async () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "pushup")
    data.append("cloud_name", "dkuvzv8bq")


    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dkuvzv8bq/image/upload", data
    )
    return response.data.url
  }



  const handleSave = async e => {
    try {
      e.preventDefault()
      setSubmitting(true)

      const url = await handleImageUpload()
      const { name, description } = values
      const variables = {
        id: teamId,
        name,
        pic: url || teamPicture,
        description,
      }
      await client.request(UPDATE_TEAM_MUTATION, variables)
    } catch (err) {
      setSubmitting(false)
      console.error('Error Updating Team  ', err)
    }
    setSubmitting(false)
    setEditing(false)
  }

  const bgImage = teamPicture !== null ? teamPicture : PanoImage

  return (
    <Layout>
      <div className="team-profile">
        <span className="team-pic" style={{ backgroundImage: `url(${bgImage})` }} />
        {/* <img className="profile-pic" src={profilePic} alt="profile" /> */}
        {editing ? (
          <div className="team-form">
            <TextField
              required
              id="outlined-required"
              label="Team Name"
              margin="normal"
              variant="outlined"
              value={values.name}
              onChange={handleChange('name')}
            />
            <TextField
              required
              id="outlined-required"
              label="Team Description"
              margin="normal"
              variant="outlined"
              multiline
              fullWidth
              rows="5"
              rowsMax="5"
              value={values.description}
              onChange={handleChange('description')}
            />
            <div>
              <input
                accept="image/*"
                id="image"
                className={"file-input"}
                type="file"
                onChange={e => setImage(e.target.files[0])}
              />
              <label htmlFor="image">
                <Button
                  style={{ color: image && 'green' }}
                  component="span"
                  size="small"
                  className={"button"}
                >
                  <AddAPhotoIcon />

                </Button>
              </label>
            </div>
            <Button color="primaray" onClick={e => handleSave(e)}>Save Profile</Button>
          </div>
        ) : (
            <>
              <span className="team-title">{name}</span>
              <span>{description}</span>
              {teamId === currentUser.team._id ? (
                <Button color="primaray" onClick={() => setEditing(true)}>Edit Profile</Button>
              ) : null}
            </>
          )}
      </div>
      {/* <Subscription
        subscription={TEAM_UPDATED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { teamUpdated } = subscriptionData.data
          dispatch({ type: "UPDATE_TEAM", payload: teamUpdated })
        }}
      /> */}
    </Layout>
  )
}

export default TeamProfile
