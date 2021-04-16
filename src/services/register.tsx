import axios from 'axios'
import { getIpLocationData } from '../services/ipLocation'

const baseUrl = process.env.REACT_APP_API_BASE_URL || ''

export const callRegister = async values => {
  const registerServiceURL = baseUrl + '/user/register'

  values.ipLocationData = await getIpLocationData()

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
