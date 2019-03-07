import config from 'core/config'

export default {
  backgroundColor: config.backgroundColor,
  avatarRedirectUrl: 'https://avatar-redirect.appspot.com',
  playerServiceUrl: (
    config.environment === 'development' ?
    'http://localhost:4000' :
    'https://2q8uy6j06j.execute-api.us-east-1.amazonaws.com/dev'
  ),
}
