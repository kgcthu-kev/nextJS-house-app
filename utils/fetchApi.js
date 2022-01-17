import axios from 'axios'

export const baseURL = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      'x-rapidapi-host': 'bayut.p.rapidapi.com',
      'x-rapidapi-key': 'bfff5b6140mshfe1777c178c52c4p16ec05jsn264fca0a7e13',
    },
  })
  return data
}
