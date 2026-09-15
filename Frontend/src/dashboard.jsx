import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

export function Dashboard() {
    const [searchParams] = useSearchParams()
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const urlToken = searchParams.get('token')
        if(urlToken) {
            setToken(urlToken)
            localStorage.setItem('token', urlToken)

            const decoded = jwtDecode(urlToken)
            console.log('Decoded!:', decoded)
            setUser(decoded)
        }
    }, [searchParams])
    
    return (
        <div className="size-full bg-[url('/snowy-village-5120x2880-20406.jpg')] bg-no-repeat bg-cover flex justify-center items-center">
            <div className="relative size-[86%] bg-slate-950/40 flex flex-col justify-center items-center">
            {token ? <h2 className="text-red-800 font-semibold text-[26px]">You're logged in! Token: {user}</h2> : <h1 className="text-gree-700 font-semibold text-[28px]">Loading...</h1>}
            <Link to="/" className="bg-blue-700 py-1 px-2 rounded-[12px] text-[24px] font-semibold absolute bottom-[12%]"><motion.h2 initial={{scale: 1}} whileHover={{scale: 1.06}}>Home</motion.h2></Link>
            </div>
        </div>
    )
}