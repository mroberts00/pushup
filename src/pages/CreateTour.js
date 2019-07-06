import React from "react"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import moment from 'moment'

import Layout from '../components/Layout'
import { CREATE_TOUR_MUTATION } from '../graphql/mutations'
import { useClient } from '../client'

import './CreateTour.scss'

const CreateTour = () => {
  const client = useClient()
  const [values, setValues] = React.useState({
    title: '',
    description: '',
    startDate: moment(Date.now()).format('YYYY-MM-DD'),
    endDate: moment(Date.now()).format('YYYY-MM-DD'),
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleSubmit = async () => {
    const { title, description, startDate, endDate } = values
    const variables = { title: title, description: description, startDate: startDate, endDate: endDate }
    await client.request(CREATE_TOUR_MUTATION, variables)

    setValues({ title: '', description: '', startDate: moment(Date.now()).format('YYYY-MM-DD'), endDate: moment(Date.now()).format('YYYY-MM-DD') })
  }

  return (
    <Layout>
      <h1>Create New Tour</h1>
      <TextField
        required
        id="outlined-required"
        label="Title"
        margin="normal"
        variant="outlined"
        value={values.title}
        onChange={handleChange('title')}
      />
      <TextField
        required
        id="outlined-required"
        label="Description"
        margin="normal"
        variant="outlined"
        multiline
        fullWidth
        rows="5"
        rowsMax="5"
        value={values.description}
        onChange={handleChange('description')}
      />
      <TextField
        id="date"
        label="Start Date"
        type="date"
        value={values.startDate}
        onChange={handleChange('startDate')}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="date"
        label="End Date"
        type="date"
        value={values.endDate}
        onChange={handleChange('endDate')}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Button color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Layout>
  )
}

export default CreateTour
