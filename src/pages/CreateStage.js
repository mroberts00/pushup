import React, { useContext, useEffect } from "react"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import moment from 'moment'
import { Redirect } from 'react-router-dom'

import Layout from '../components/Layout'
import { CREATE_STAGE_MUTATION, UPDATE_STAGE_MUTATION } from '../graphql/mutations'
import { useClient } from '../client'

import Context from '../context'
import './CreateStage.scss'

const CreateStage = (props) => {
  const client = useClient()
  const { state, dispatch } = useContext(Context)
  const { stages, tours } = state

  const [values, setValues] = React.useState({
    title: '',
    description: '',
    date: moment(Date.now()).format('YYYY-MM-DD'),
    kms: '',
  })
  const { match: { params: { id: stageId } } } = props || {}

  const stage = stages.find(stage => stage._id === stageId) || {}

  useEffect(() => {
    if (stage) {
      const { title, description, date, kms } = stage
      setValues({
        title,
        description,
        date,
        kms,
      })
    }
  }, [])


  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  }

  const handleSubmit = async () => {
    const { title, description, date, kms } = values
    const variables = { id: stage._id, title: title, description: description, date: date, kms: parseFloat(kms) }
    await client.request(UPDATE_STAGE_MUTATION, variables)

    return <Redirect to="/stages" />
  }

  return (
    <Layout>
      <h1>Update Stage</h1>
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
        id="outlined-required"
        label="Kms"
        type="number"
        value={values.kms}
        onChange={handleChange('kms')}
        InputLabelProps={{
          shrink: true,
        }}
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
        label="Date"
        type="date"
        value={values.date}
        onChange={handleChange('date')}
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

export default CreateStage
