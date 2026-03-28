import { useEffect, useState } from 'react'
import { GradientHeading } from '@/components/ui/gradient-heading'
import { TweetGrid } from '@/components/ui/tweet-grid'

interface TwitterUser {
  user_id: string
  followers: number
  followees: number
}

function App() {
  const [users, setUsers] = useState<TwitterUser[]>([])
  const [error, setError] = useState<string | null>(null)

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

  useEffect(() => {
    fetch(`${apiBaseUrl}/stats`)
      .then(res => res.json())
      .then((data: TwitterUser[]) => setUsers(data))
      .catch(() => setError('Failed to load user statistics'))
  }, [apiBaseUrl])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F3F3F3]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: '#F3F3F3',
          backgroundImage:
            'linear-gradient(0deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%, transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%, transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%, transparent)',
          backgroundSize: '55px 55px',
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-12">
        <div className="flex w-full justify-center pb-12">
          <GradientHeading size="xl" weight="black">
            Twitter User Statistics
          </GradientHeading>
        </div>

        {error && <p className="mb-4 text-red-600">{error}</p>}

        <div className="flex w-full items-center justify-center">
          <TweetGrid
            className="w-full max-w-7xl"
            users={users}
            columns={4}
            spacing="lg"
          />
        </div>
      </div>
    </div>
  )
}

export default App