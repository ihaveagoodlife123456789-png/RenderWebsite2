import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
            <div className="h-[90%] w-[65%] bg-slate-950/20 flex flex-col justify-center items-center gap-5 font-semibold text-slate-200 overflow-scroll scrollbar-none">
                {userData && userData.map(users => {
                    return (
                        <div key={users.id}>
                            <h3>{users.id}</h3>
                            <h3>{users.name}</h3>
                            <p>{users.message}</p>
                        </div>
                    )
                })}
                <Link to='/'>Go Home</Link>
            </div>
        </div>
    )
}