import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import Avatar from '../assets/avatar.png'

import Context from '../context'

import './TopNav.scss'

const TopNav = () => {
  const { dispatch, state } = useContext(Context)
  const { currentUser: { picture, _id } } = state || {}

  const profilePic = picture || Avatar
  console.log(state)
  return profilePic && (
    <div className="top-nav">
      <Link to={`/users/${_id}`}>
        <span style={{ backgroundImage: `url(${picture})` }} className="nav-pic" />
      </Link>
    </div>
  )
}

export default TopNav