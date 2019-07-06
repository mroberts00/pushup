export const CREATE_PIN_MUTATION = `
  mutation($title: String!, $image: String!, $content: String!, $latitude: Float!, $longitude: Float!) {
    createPin(input: {
      title: $title,
      content: $content,
      image: $image,
      latitude: $latitude,
      longitude: $longitude,
    }) {
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
    }
  }
`

export const DELETE_PIN_MUTATION = `
  mutation($pinId: ID!) {
    deletePin(pinId: $pinId) {
      _id
    }
  }
`

export const CREATE_COMMENT_MUTATION = `
  mutation($pinId: ID!, $text: String!) {
    createComment(pinId: $pinId, text: $text) {
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

export const CREATE_TOUR_MUTATION = `
  mutation($title: String!, $description: String!, $startDate: String!, $endDate: String!) {
    createTour(input: {
      title: $title,
      description: $description,
      startDate: $startDate,
      endDate: $endDate,
    }) {
      _id
      title
      description
      startDate
      endDate
      createdBy {
        _id
        name
      }
      stages {
        _id
        date
      }
    }
  }
`

export const UPDATE_STAGE_MUTATION = `
  mutation($id: ID!, $title: String!, $description: String!, $date: String!, $kms: Int!) {
    updateStage(input: {
      title: $title,
      description: $description,
      date: $date,
      kms: $kms,
    }, id: $id) {
      _id
      title
      description
      date
      kms
    }
  }
`

export const UPDATE_USER_MUTATION = `
  mutation($id: ID!, $name: String, $bio: String, $username: String, $picture: String, $teamId: ID) {
    updateUser(input: {
      name: $name,
      bio: $bio,
      username: $username,
      picture: $picture,
    },
    teamId: $teamId,
    id: $id) {
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

export const CREATE_ACTIVITY_MUTATION = `
  mutation($stageId: ID!, $activityType: String!, $kms: Int!) {
    createActivity(stageId: $stageId, activityType: $activityType, kms: $kms) {
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

export const UPDATE_TEAM_MUTATION = `
  mutation($id: ID!, $name: String, $description: String, $pic: String) {
    updateTeam(input: {
      name: $name,
      description: $description,
      pic: $pic,
    }, id: $id) {
      _id
      name
      description
      pic
    }
  }
`
