import axios from 'axios'

export const callAuth = async values => {
  const baseUrl = process.env.REACT_APP_BASE_URL || ''
  const authServiceURL = baseUrl + process.env.REACT_APP_AUTH_URL_API || ''

  return await axios.post(authServiceURL, values)
    .then(
      resp => {
        return resp.data
      }
    ).catch(
      error => {
        const { response } = error

        if (response) {
          console.log(response.data)

          if (response.status === 500) {
            return { error: 'Ops! Algo deu errado.' }
          }

          return response.data
        } else {
          console.log(error)
          return { error: error }
        }
      }
    )
}

export const callForgotPassword = async values => {
  const baseUrl = process.env.REACT_APP_BASE_URL || ''
  const forgotPassServiceURL = baseUrl + process.env.REACT_APP_FORGOT_PASS_URL_API || ''

  return await axios.post(forgotPassServiceURL, values)
    .then(
      resp => {
        const { email } = values
        console.log(`email recuperação de senha enviado para => ${email} =>`, resp.statusText)
        return resp.data
      }
    ).catch(
      error => {
        const { response } = error

        if (response) {
          console.log(response.data)

          if (response.status === 500) {
            return { error: 'Ops! Algo deu errado.' }
          }

          return response.data
        } else {
          console.log(error)
          return { error: error }
        }
      }
    )
}

export const callResetPassword = async values => {
  const baseUrl = process.env.REACT_APP_BASE_URL || ''
  const resetPassServiceURL = baseUrl + process.env.REACT_APP_RESET_PASS_URL_API || ''

  console.log(values)

  return await axios.post(resetPassServiceURL, values)
    .then(
      resp => {
        const { email } = values
        console.log(`senha resetada para => ${email} =>`, resp.statusText)
        return resp.data
      }
    ).catch(
      error => {
        const { response } = error

        if (response) {
          console.log(response.data)

          if (response.status === 500) {
            return { error: 'Ops! Algo deu errado.' }
          }

          return response.data
        } else {
          console.log(error)
          return { error: error }
        }
      }
    )
}
