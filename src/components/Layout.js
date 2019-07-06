import React, { useContext } from 'react'
import { Subscription } from 'react-apollo'

import CycleButton from './CycleButton'
import BottomNav from './BottomNav'
import TopNav from './TopNav'
import Context from '../context'

import { USER_UPDATED_SUBSCRIPTION, STAGE_UPDATED_SUBSCRIPTION } from '../graphql/subscriptions'

import './Layout.scss'

const Layout = ({ children }) => {
  const { state, dispatch } = useContext(Context)
  return (
    <div className="root">
      <TopNav />
      <div className="content">
        {children}
      </div>
      <CycleButton />
      <BottomNav />
      <Subscription
        subscription={USER_UPDATED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { userUpdated } = subscriptionData.data
          dispatch({ type: "USER_UPDATED", payload: userUpdated })
        }}
      />
      <Subscription
        subscription={STAGE_UPDATED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { stageUpdated } = subscriptionData.data
          dispatch({ type: "UPDATE_STAGE", payload: stageUpdated })
        }}
      />
    </div>
  )
}

export default Layout
