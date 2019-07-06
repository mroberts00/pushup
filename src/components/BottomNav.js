import React, { useContext } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import FilterIcon from '@material-ui/icons/Filter'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import { Link } from 'react-router-dom'
import { Subscription } from 'react-apollo'
import Context from '../context'

import { ACTIVITY_ADDED_SUBSCRIPTION } from '../graphql/subscriptions'

import './BottomNav.scss'

const BottomNav = () => {
  const { state, dispatch } = useContext(Context)
  const [value, setValue] = React.useState(0);

  return (
    <>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className="nav"
      >
        <BottomNavigationAction
          label="Stages"
          icon={<FilterIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Daily Leaders"
          icon={<FormatListNumberedIcon />}
          component={Link}
          to="/current-stage"
        />
        <BottomNavigationAction
          label="Tour Leaders"
          icon={<ShowChartIcon />}
        />
      </BottomNavigation>
      <Subscription
        subscription={ACTIVITY_ADDED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { activityAdded } = subscriptionData.data
          dispatch({ type: "CREATE_ACTIVITY", payload: activityAdded })
        }}
      />
    </>
  );
}

export default BottomNav
