import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

export function Dashboard() {
    const [user, setUser] = useState(null)

    useEffect(() => {

        try {
            const localToken = JSON.parse(localStorage.getItem('user'))
            setUser(localToken)
            console.log('Fetched!:', localToken)
        } catch (error) {
            console.log("Invalid roken:", error)
        }
    }, [])

    function handleLogout() {
        localStorage.removeItem('token')
        window.location.reload()
    }
    
    return (
        <div className="size-full bg-[url('/snowy-village-5120x2880-20406.jpg')] bg-no-repeat bg-cover flex justify-center items-center">
            <div className="relative size-[86%] bg-slate-950/40 flex flex-col justify-center items-center">
            {user ? 
            <>
            <h1 className="text-green-800 font-bold text-[32px]">You are logged In!</h1>
            <div className="text-violet-600 font-semibold text-[26px]">Username:
                <h2 className="text-orange-700 font-bold text-[28px]">{user.username}</h2>
            </div>
            <div className="text-violet-600 font-semibold text-[26px]">Email:
                <h2 className="text-orange-700 font-bold text-[28px]">{user.email}</h2>
            </div> 
            </>
            : <h1 className="text-gree-700 font-semibold text-[28px]">Loading...</h1>}
        
            <Link to="/" className="bg-blue-700 py-1 px-2 rounded-[12px] text-[24px] font-semibold absolute bottom-[12%]"><motion.h2 initial={{scale: 1}} whileHover={{scale: 1.06}}>Home</motion.h2></Link>
            </div>
        </div>
    )
}