import React, { useContext, useEffect } from "react"
import moment from 'moment'
import EditIcon from '@material-ui/icons/EditOutlined'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import { Link } from 'react-router-dom'

import Layout from '../components/Layout'
import { useClient } from '../client'
import { GET_STAGES_QUERY } from '../graphql/queries'
import Context from '../context'

import './StagesList.scss'

const formatDate = (unix) => {
  const date = unix / 1000
  return moment.unix(date).format('DD/MM/YYYY')
}

const StagesList = (props) => {
  const client = useClient()
  const { state, dispatch } = useContext(Context)
  const { match: { params: { id: tourId } } } = props
  const { tours, stages } = state
  const currentTour = tours.find(tour => tour._id === tourId) || {}
  const [page, setPage] = React.useState(0)

  useEffect(() => {
    getStages()
  }, [])

  const getStages = async () => {
    const variables = { tourId: currentTour._id }
    const { getStages } = await client.request(GET_STAGES_QUERY, variables)
    dispatch({ type: "GET_STAGES", payload: getStages })
  }

  const sorted = stages.sort((a, b) => a.date - b.date)
  const filtered = sorted.filter(stage => stage.tour._id === tourId)
  const rowsPerPage = 5
  const maxPages = Math.ceil(stages.length / rowsPerPage)
  return (
    <Layout>
      <h1>{currentTour.title} Stages</h1>
      <div className="stages-list">
        <span>Title</span>
        <span>Date</span>
        <span>Kms</span>
        <span />

        {
          filtered
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(tour => {
              const { _id, title, date, kms } = tour || {}
              return (
                <>
                  <Link to={`/stages/${_id}`}>{title}</Link>
                  <span>{date}</span>
                  <span>{kms}</span>
                  <Link to={`/stages/${_id}/edit`}>
                    <EditIcon />
                  </Link>
                </>
              )
            })
        }
      </div>
      <div className="stages-pagination">
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

export default StagesList
