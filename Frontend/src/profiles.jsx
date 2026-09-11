import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function GetUserProfile() {
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        async function getUser() {
            try  {
                const getResponse = await fetch('/api/profiles', {
                    method: 'GET',
                    credentials: 'include'
                }
                )
                if(!getResponse) {
                    console.log(getResponse.message)
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
        <div className="text-white text-[24px] font-bold size-full bg-[url('/snowy-village-5120x2880-20406.jpg')] bg-no-repeat bg-cover flex justify-center items-center">
            <div className="size-[70%] bg-slate-950/60 flex flex-col justify-center items-center">
            {userData ? (
                <>
                <h1 className="text-white font-bold">{`username: ${userData.username}`}</h1>
                    <h1 className="text-white font-bold">{`password: ${userData.password}`}</h1>
                    </>
            ) : (
                <div>Loading...</div>
            )}
            <Link to="/signIn">Sign In</Link>
            </div>
        </div>
    )
}