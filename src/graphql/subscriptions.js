import gql from 'graphql-tag'

export const PIN_ADDED_SUBSCRIPTION = gql`
  subscription {
    pinAdded {
      _id
      createdAt
      title
      image
      content
      latitude
      longitude
      author {
        _id
        name
        email
        picture
      }
      comments {
        text
        createdAt
        author {
          name
          picture
        }
      }
    }
  }
`


export const PIN_UPDATED_SUBSCRIPTION = gql`
  subscription {
    pinUpdated {
      _id
      createdAt
      title
      content
      image
      latitude
      longitude
      author {
        _id
        name
      }
      comments {
        text
        createdAt
        author {
          name
          picture
        }
      }
    }
  }
`

export const PIN_DELETED_SUBSCRIPTION = gql`
  subscription {
    pinDeleted {
      _id
    }
  }
`

export const ACTIVITY_ADDED_SUBSCRIPTION = gql`
  subscription {
    activityUpdated {
      _id
      createdAt
      type
      kms
      user {
        _id
        name
        username
        picture
      }
      stage {
        _id
        title
        date
        kms
      }
    }
  }
`

export const USER_UPDATED_SUBSCRIPTION = gql`
  subscription {
    userUpdated {
      _id
      name
      username
      bio
      picture
      team {
        _id
        pic
        name
        description
      }
    }
  }
`

export const TEAM_UPDATED_SUBSCRIPTION = gql`
  subscription {
    teamUpdated {
      _id
      name
      description
      pic
    }
  }
`

export const STAGE_UPDATED_SUBSCRIPTION = gql`
  subscription {
    stageUpdated {
      _id
      kms
      title
      description
      date
      tour {
        _id
        title
      }
      activities {
        kms
        activityType
        createdAt
        user {
          _id
          username
          team {
            _id
          }
        }
      }
      competitors {
        user {
          _id
          username
        }
        createdAt
      }
    }
  }
`