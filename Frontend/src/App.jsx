import { useState, useEffect } from 'react';

export function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch('/users')
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, []);

  return (
    <div className="size-full bg-slate-950/20">
      <div>
        {userData && userData.map(users => {
          return (
            <div key={users.id}>
              <h2>{users.id}</h2>
              <p>{users.name}</p>
              <p>{users.message}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}