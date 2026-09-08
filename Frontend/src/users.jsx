import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react'

export function UsersPage() { 
    const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch('/api/users')
        const data = await response.json();
        setUserData(data);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, []);

    return (
        <div className="size-full flex items-center justify-center bg-[url('/yosemite-lake-yosemite-valley-landscape-reflection-yosemite-6288x4192-1023.jpg')] bg-no-repeat bg-cover">





          <div className="relative bg-slate-950/40 w-[80%] h-[80%] flex flex-col items-center justify-center">



            <div className="absolute top-[20%] h-[60%] w-[65%] flex flex-col justify-start items-center gap-5 font-semibold text-slate-200 overflow-auto">
                {userData && userData.map(users => {
                    return (
                        <div key={users.id} className="flex justify-center items-center text-semibold gap-5 text-[18px]">
                            <h3>{users.id}</h3>
                            <h3>{users.name}</h3>
                            <p className="font-semibold" style={{ color: users.color}}>{users.message}</p>
                        </div>
                    )
                })}
            </div>



                <h1 className="absolute size-fit top-8 text-[35px] text-white font-bold size-[35px]">Messages</h1>
                <Link to='/' className="absolute bottom-12"><motion.h2 className="bg-blue-400/70 border-[2px] border-blue-700 text-[22px] font-bold py-[6px] px-[8px] rounded-[12px]" initial={{scale: 1}} whileHover={{scale: 1.08}}>Go back</motion.h2></Link>
            </div>





            <img src="/icons8-wreath-64.png" className="absolute top-12 left-12"/>
        </div>
    )
}