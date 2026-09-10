import { useEffect, useState } from 'react'

function getUserProfile() {
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        async function getUser() {
            try  {
                const getResponse = await fetch('/api/profiles')
                if(!getResponse) {
                    console.log(getResponse.message)
                    throw new Error({message: getResponse.message})
                }
                setUserData(getResponse)
            } catch(err) {
                console.error(err.message)
            }
        }
        getUser()
    }, [])
    return (
        <div className="size-full bg-[url('/snowy-village-5120x2880-20406.jpg')] bg-no-repeat bg-cover flex justify-center items-center">
            <div className="size-[70%] bg-slate-950/60 flex justify-center items-center">
            {userData.map((data) => {
                return (
                    <>
                    <h1 className="text-white font-bold">{`username: ${data.username}`}</h1>
                    <h1 className="text-white font-bold">{`username: ${data.password}`}</h1>
                    </>
                )
            })}
            </div>
        </div>
    )
}