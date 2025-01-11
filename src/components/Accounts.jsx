import { useNavigate } from "react-router-dom"

export default function Account(){
    const navigate = useNavigate()
    return(
        <div>
            <button onClick={()=>{
                localStorage.clear()
                navigate("/login")
            }}>
                Logout 
            </button>
        </div>
    )
}