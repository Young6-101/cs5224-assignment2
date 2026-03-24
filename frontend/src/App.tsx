import { useEffect, useState } from 'react'

interface TwitterUser {
  user_id: string;
  followers: number;
  followees: number;
}

function App() {
  const [users, setUsers] = useState<TwitterUser[]>([])

  useEffect(() => {
    fetch('http://localhost:8000/stats')
      .then(res => res.json())
      .then((data: TwitterUser[]) => setUsers(data))
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Twitter User Statistics</h1>
      {users.map(user => (
        <div key={user.user_id} className="mt-4 p-4 bg-gray-100 rounded">
          <p>User {user.user_id} has {user.followers} followers</p>
          <p>User {user.user_id} has {user.followees} followees</p>
        </div>
      ))}
    </div>
  )
}

export default App