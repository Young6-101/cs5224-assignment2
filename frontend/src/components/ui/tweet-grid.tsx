import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tweetGridVariants = cva("max-w-4xl md:max-w-6xl px-2", {
  variants: {
    columns: {
      1: "columns-1",
      2: "sm:columns-2",
      3: "md:columns-3",
      4: "lg:columns-4",
      5: "xl:columns-5",
    },
  },
  defaultVariants: {
    columns: 3,
  },
})

const tweetItemVariants = cva("break-inside-avoid", {
  variants: {
    spacing: {
      sm: "mb-2",
      md: "mb-4",
      lg: "mb-6",
    },
  },
  defaultVariants: {
    spacing: "md",
  },
})

export interface TweetGridProps
  extends VariantProps<typeof tweetGridVariants>,
    VariantProps<typeof tweetItemVariants> {
  users: TwitterUser[]
  className?: string
}

export interface TwitterUser {
  user_id: string
  followers: number
  followees: number
}

// Mock Tweet component to avoid react-tweet CSS import issues
const MockTweet: React.FC<{ user: TwitterUser }> = ({ user }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-[0_0_24px_rgba(59,130,246,0.28)]">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">T</span>
        </div>
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">
            Twitter User
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            @id: {user.user_id}
          </div>
        </div>
      </div>
      <div className="text-gray-900 dark:text-white mb-3 space-y-1">
        <div>Followers: {user.followers}</div>
        <div>Followees: {user.followees}</div>
      </div>
      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
        <span>💬 0</span>
        <span>🔄 0</span>
        <span>❤️ 0</span>
      </div>
    </div>
  )
}

export const TweetGrid: React.FC<TweetGridProps> = ({
  users,
  columns,
  spacing,
  className,
}) => {
  return (
    <div className={cn(tweetGridVariants({ columns }), className)}>
      {users.map((user, i) => (
        <div
          key={`${user.user_id}-${i}`}
          className={cn(tweetItemVariants({ spacing }))}
        >
          <MockTweet user={user} />
        </div>
      ))}
    </div>
  )
}
