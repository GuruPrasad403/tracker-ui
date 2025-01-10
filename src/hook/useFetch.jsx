import { useEffect, useState } from 'react'
import axios from 'axios'
export default function useFetch(url,token){
    console.log(token)
    const [userInfo,setUserInfo] = useState({}) 
    const [loading,setloading] = useState(true)
    const getData = async()=>{
        setloading(true)
    const response = await axios.get(url,{
        headers: {
            'Header-Name': 'Header-Value',
            'Authorization': `Bearer ${token}`,
            // Add other headers as needed
        }
    })
    setUserInfo(response?.data?.user || response?.data)
    setloading(false)
}
  useEffect(()=>{
    getData()
  },[url])
return {userInfo,loading}
}