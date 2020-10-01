import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL || ''

export const callAuth = async values => {
  const authServiceURL = baseUrl + '/auth'

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
  const forgotPassServiceURL = baseUrl + '/auth/forgot_password'

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
  const resetPassServiceURL = baseUrl + '/auth/reset_password'

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
