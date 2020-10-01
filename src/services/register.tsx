import axios from 'axios'

export const callRegister = async values => {
  const baseUrl = process.env.REACT_APP_BASE_URL || ''
  const registerServiceURL = baseUrl + process.env.REACT_APP_REGISTER_URL_API || ''

  return await axios.post(registerServiceURL, values)
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
