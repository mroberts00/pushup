import React, { useContext } from "react"
import { GraphQLClient } from 'graphql-request'
import { GoogleLogin } from 'react-google-login'
import Typography from "@material-ui/core/Typography"

import Context from '../../context'
import { ME_QUERY } from '../../graphql/queries'
import { BASE_URL } from '../../client'

const Login = () => {

  const { dispatch } = useContext((Context))

  const onSuccess = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token
      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: idToken }
      })
      const { me } = await client.request(ME_QUERY)

      dispatch({ type: "LOGIN_USER", payload: me })
      dispatch({ type: "IS_LOGGED_IN", payload: googleUser.isSignedIn() })
    }
    catch (err) {
      onFailure(err)
      dispatch({ type: "IS_LOGGED_IN", payload: false })
    }
  }

  const onFailure = err => {
    console.error("Error Logging in", err)
  }

  return (
    <div>
      <Typography
        component="h1"
        varient="h3"
        gutterBottom
        noWrap
        style={{ color: "rgb(66, 133, 244)" }}
      >
        Welcome
    </Typography>
      <GoogleLogin
        clientId="32414059335-jgr4t4e8o07i9jvfgiqtgh2rsdlrcrkh.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        buttonText="Login with Google"
        theme="dark"
      />
    </div>
  )
};

export default Login
