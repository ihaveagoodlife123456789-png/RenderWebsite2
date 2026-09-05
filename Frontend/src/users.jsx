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
        <div className="size-full flex items-center justify-center bg-[url('/snowy-village-5120x2880-20406.jpg')] bg-no-repeat bg-cover">
          <div className="w-[68%] h-[70%] flex items-center justify-center">
            <div className="relative h-[90%] w-[65%] bg-slate-950/20 flex flex-col justify-center items-center gap-5 font-semibold text-slate-200 overflow-scroll scrollbar-none">
                {userData && userData.map(users => {
                    return (
                        <div key={users.id} className="flex justify-center items-center text-semibold gap-5 text-[18px]">
                            <h3>{users.id}</h3>
                            <h3>{users.name}</h3>
                            <p className="font-semibold" style={{ color: users.color}}>{users.message}</p>
                        </div>
                    )
                })}
                <Link to='/'><motion.h2 className="absolute bottom-0 bg-blue-400/20 border-[2px] border-blue-700 text-[22px] font-bold py-[6px] px-[8px] rounded-[12px]" initial={{scale: 1}} whileHover={{scale: 1.08}}>Go back</motion.h2></Link>
            </div>
            </div>
        </div>
    )
}