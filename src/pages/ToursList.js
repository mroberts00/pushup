import React, { useContext, useEffect } from "react"
import moment from 'moment'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import { Link } from 'react-router-dom'

import Layout from '../components/Layout'
import { useClient } from '../client'
import { GET_TOURS_QUERY } from '../graphql/queries'
import Context from '../context'

import './ToursList.scss'

const formatDate = (unix) => {
  const date = unix / 1000
  return moment.unix(date).format('DD/MM/YYYY')
}

const ToursList = () => {
  const client = useClient()
  const { state, dispatch } = useContext(Context)
  const { tours } = state
  const [page, setPage] = React.useState(0)
  useEffect(() => {
    getTours()
  }, [])

  const getTours = async () => {
    const { getTours } = await client.request(GET_TOURS_QUERY)
    dispatch({ type: "GET_TOURS", payload: getTours })
  }

  const sorted = tours.sort((a, b) => b.startDate - a.startDate)
  const rowsPerPage = 5
  const maxPages = Math.ceil(tours.length / rowsPerPage)

  console.log(state)
  return sorted && (
    <Layout>
      <h1>Tours</h1>
      <div className="tours-list">
        <span>Tour Title</span>
        <span>Start Date</span>
        <span>End Date</span>

        {
          sorted
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(tour => {
              const { _id, title, startDate, endDate } = tour || {}
              return (
                <>
                  <Link to={`/tours/${_id}`}>{title}</Link>
                  <span>{startDate}</span>
                  <span>{endDate}</span>
                </>
              )
            })
        }
      </div>
      <div className="tour-pagination">
        <ArrowBackIos
          style={page > 0 ? { color: 'blue' } : null}
          onClick={() => {
            if (page > 0) setPage(page - 1)
          }}
        />
        <span>{page + 1} of {maxPages}</span>
        <ArrowForwardIos
          style={page < maxPages - 1 ? { color: 'blue' } : null}
          onClick={() => {
            if (page < maxPages - 1) setPage(page + 1)
          }}
        />
      </div>
    </Layout>
  )
}

export default ToursList
