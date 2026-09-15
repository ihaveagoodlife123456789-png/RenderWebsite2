import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'motion/react'

export function GetUserProfile() {
    const [userData, setUserData] = useState(null)
    const [logError, setLogError] = useState(null)
    useEffect(() => {
        async function getUser() {
            try  {
                const getResponse = await fetch('/api/profile', {
                    method: 'GET',
                    credentials: 'include'
                }
                )
                if(!getResponse) {
                    console.log(getResponse.message)
                    setLogError(getResponse.message.message)
                    throw new Error({message: getResponse.message})
                }
                const data = await getResponse.json()
                console.log(data)
                setUserData(data)
            } catch(err) {
                console.error(err.message)
            }
        }
        getUser()
    }, [])
    return (
        <div className="text-blue-800 text-[24px] font-bold size-full bg-[url('/snowy-village-5120x2880-20406.jpg')] bg-no-repeat bg-cover flex justify-center items-center">
            <div className="relative text-blue-800 size-[70%] bg-slate-950/60 flex flex-col justify-center items-center">
            {userData ? (
                <>
                <div className="text-white font-bold">{userData.username ? <div className="text-orange-700 flex gap-3"><h2 className="text-white">Username:</h2><h2>{`${userData.username}`}</h2></div> : <div className="flex flex-col justify-center items-center"><h1>Please login first!</h1><Link to="/login"><motion.div className="relative top-3 size-fit bg-lime-600 rounded-[5px]" initial={{scale: 1, color: 'white', backgroundColor: '#5EA500'}} whileHover={{scale: 1.06, color: '#5EA500', backgroundColor: 'white'}}>login</motion.div></Link></div>}</div>
                    <div className="text-white font-bold">{userData.password ? <div className="text-orange-700 flex gap-3"><h2 className="text-white">Password:</h2><h2>{`${userData.password}`}</h2></div> : null}</div>
                    {logError ? <h2 className="text-red-700 font-bold text-[24px]">{logError}</h2> : null}
                    </>
            ) : (
                <div>Loading...</div>
            )}
                    <Link to="/" className="absolute top-2 left-2 size-fit bg-blu-800"><motion.div initial={{scale: 1}} whileHover={{scale: 1.05}}>Home</motion.div></Link>
            </div>
        </div>
    )
}