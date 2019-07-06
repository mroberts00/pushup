
export const ME_QUERY = `
{
  me {
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

export const GET_PINS_QUERY = `
 {
   getPins {
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
         _id
         name
         picture
       }
     }
   }
 }
`

export const GET_TOURS_QUERY = `
 {
   getTours {
     _id
     title
     description
     startDate
     endDate
     stages {
       _id
       date
       title
       kms
       description
     }
   }
 }
`

export const GET_STAGES_QUERY = `
 query($tourId: ID) {
   getStages(tourId: $tourId) {
     _id
     title
     kms
     description
     date
     tour {
       _id
       title
       description
       startDate
       endDate
     }
     activities {
       kms
       activityType
       createdAt
       user {
        _id
        name
        username
        picture
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

export const GET_CURRENT_STAGE_QUERY = `
 query {
   getCurrentStage {
     _id
     title
     description
     date
     kms
     tour {
       _id
       title
       description
       startDate
       endDate
       stages {
         _id
         date
         kms
         competitors {
          user {
            _id
            username
          }
          createdAt
          }
         activities {
          activityType
           kms
           createdAt
           user {
             _id
             name
             username
             picture
             team {
               _id
             }
           }
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
     activities {
      activityType
       kms
       createdAt
       user {
         _id
         name
         username
         picture
         team {
           _id
         }
       }
     }
   }
 }
`

export const GET_USERS_QUERY = `
  query {
    getUsers {
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

export const GET_TEAMS_QUERY = `
  query {
    getTeams {
      _id
      pic
      name
      description
    }
  }
`