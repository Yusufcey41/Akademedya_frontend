import axios from 'axios'

axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token')

    // Eğer istek URL'si login ya da signup ile ilgili değilse token ekledim
    if (
      token &&
      !config.url.includes('/signup') &&
      !config.url.includes('/login') &&
      !config.url.includes('/activate')
    ) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axios
