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

import SignOut from '../components/Auth/Signout'
import Layout from '../components/Layout'
import { useClient } from '../client'
import { GET_USERS_QUERY, GET_TEAMS_QUERY } from '../graphql/queries'
import { UPDATE_USER_MUTATION } from '../graphql/mutations'
import { USER_UPDATED_SUBSCRIPTION } from '../graphql/subscriptions'
import Context from '../context'

import './UserProfile.scss'

const UserProfile = (props) => {
  const client = useClient()
  const { state, dispatch } = useContext(Context)
  const { currentUser, users, teams } = state
  const { match: { params: { id: userId } } } = props || {}
  const user = userId && users ? users.find(user => user._id == userId) : {}

  const [image, setImage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [editing, setEditing] = useState(false)
  const [values, setValues] = useState({
    username: '',
    bio: '',
    name: '',
  })

  const { name, username, bio, picture, team: userTeam } = user || ''
  const { id: teamId } = userTeam || {}
  const team = teams[0] && teams[0] !== null ? teams.find(teamItem => teamItem._id === teamId) : {}
  const { pic: teamPicture } = team || {}

  useEffect(() => {
    if (!user || !users) {
      fetchUsers()
      fetchTeams()
    } else {
      setValues({
        username,
        name,
        bio,
        teamId
      })
      fetchTeams()
    }
  }, [])

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const fetchUsers = async () => {
    const { getUsers } = await client.request(GET_USERS_QUERY)
    dispatch({ type: "GET_USERS", payload: getUsers })
  }

  const fetchTeams = async () => {
    const { getTeams } = await client.request(GET_TEAMS_QUERY)
    dispatch({ type: "GET_TEAMS", payload: getTeams })
  }

  const handleImageUpload = async () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "pushup")
    data.append("cloud_name", "dkuvzv8bq")

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dkuvzv8bq/image/upload", data
    )

    console.log(response)

    return response.data.url
  }



  const handleSave = async e => {
    try {
      e.preventDefault()
      setSubmitting(true)

      const url = image ? await handleImageUpload() : null
      console.log(url)
      const { name, username, bio, teamId } = values
      const variables = {
        id: userId,
        name,
        picture: url || picture,
        username,
        bio,
        teamId,
      }
      console.log(variables)
      await client.request(UPDATE_USER_MUTATION, variables)
    } catch (err) {
      setSubmitting(false)
      console.error('Error Updating User', err)
    }
    setSubmitting(false)
    setEditing(false)
  }

  const bgImage = teamPicture || PanoImage
  const profilePic = picture || Avatar
  const inputLabel = React.useRef(null)

  return (
    <Layout>
      <div className="user-profile">
        <span className="team-pic" style={{ backgroundImage: `url(${bgImage})` }} />
        <span className="profile-pic" style={{ backgroundImage: `url(${profilePic})` }} />
        {editing ? (
          <>
            <TextField
              required
              id="outlined-required"
              label="Username"
              margin="normal"
              variant="outlined"
              value={values.username}
              onChange={handleChange('username')}
            />
            <TextField
              required
              id="outlined-required"
              label="Name"
              margin="normal"
              variant="outlined"
              value={values.name}
              onChange={handleChange('name')}
            />
            <FormControl variant="outlined">
              <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                Team
        </InputLabel>
              <Select
                native
                value={values.teamId}
                onChange={handleChange('teamId')}
                input={
                  <OutlinedInput name="Team" id="outlined-age-native-simple" />
                }
              >
                {teams.map(team => (
                  <option value={team._id}>{team.name}</option>
                ))}
              </Select>
            </FormControl>
            <TextField
              required
              id="outlined-required"
              label="Bio"
              margin="normal"
              variant="outlined"
              multiline
              fullWidth
              rows="5"
              rowsMax="5"
              value={values.bio}
              onChange={handleChange('bio')}
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
          </>
        ) : (
            <>
              <span>{username}</span>
              <span>{name}</span>
              <span>{bio}</span>
              {user && user._id === currentUser._id ? (
                <>
                  <Button color="primaray" onClick={() => setEditing(true)}>Edit Profile</Button>
                  <SignOut />
                </>
              ) : null}
            </>
          )}
      </div>
      <Subscription
        subscription={USER_UPDATED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          console.log({ subscriptionData })
          const { userUpdated } = subscriptionData.data
          console.log({ userUpdated })
          dispatch({ type: "UPDATE_USER", payload: userUpdated })
        }}
      />
    </Layout>
  )
}

export default UserProfile
