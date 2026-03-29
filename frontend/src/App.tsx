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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const apiBaseUrl = 'https://est3jk9fu4.execute-api.ap-southeast-1.amazonaws.com/prod'

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(`${apiBaseUrl}/stats`)
        const rawText = await res.text()

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText}: ${rawText}`)
        }

        const data = JSON.parse(rawText) as TwitterUser[]
        setUsers(data)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load user statistics'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    void loadStats()
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

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <p className="font-semibold">Failed to load data</p>
            <p className="mt-1 break-all">{error}</p>
            <p className="mt-2 break-all text-red-600">API: {apiBaseUrl}/stats</p>
          </div>
        )}

        {loading && !error && (
          <p className="mb-4 text-sm text-gray-600">Loading data from {apiBaseUrl}/stats ...</p>
        )}

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