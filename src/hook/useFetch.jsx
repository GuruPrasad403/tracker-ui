import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useFetch(url, token) {
  const [userInfo, setUserInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(url, {
        headers: {
          'Header-Name': 'Header-Value',
          'Authorization': `Bearer ${token}`,
          // Add other headers as needed
        }
      })
      setUserInfo(response?.data?.user || response?.data)
    } catch (err) {
      console.log("Error in useFetch", err) 
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [url])

  return { userInfo, loading, error }
}