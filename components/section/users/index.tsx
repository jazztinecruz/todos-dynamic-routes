import Link from 'next/link'
import { useEffect, useState } from 'react'
import User from '../../helpers/types/user'

interface Props {
  user: User
}

const User = ({ user }: Props) => {
  const [completeCount, setCompleteCount] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    const handleCount = () => {
      let completeCount = 0
      let pendingCount = 0
      user.todos.map((todo) => {
        if (todo.completed) {
          completeCount++
          setCompleteCount(completeCount)
        } else {
          pendingCount++
          setPendingCount(pendingCount)
        }
      })
    }
    return handleCount
  }, [])

  return (
    <Link href={`/user/${user.id}`}>
      <div className="grid grid-cols-[1fr,auto] gap-5 items-center py-2 px-4 border-[1px] border-gray-2000 rounded-md cursor-pointer hover:bg-slate-100">
        {/* user name */}
        <div>
          <h3 className="text-md font-semibold tracking-wide">{user.name}</h3>
          <h5 className="text-xs text-gray-500 tracking-wide">
            @{user.username}
          </h5>
        </div>

        {/* todos of user */}
        <div className="flex flex-col gap-2">
          <span className="text-xs">
            <span className="font-semibold">{completeCount} </span>Completed
          </span>

          <span className="text-xs">
            <span className="font-semibold">{pendingCount} </span>Pending
          </span>
        </div>
      </div>
    </Link>
  )
}

export default User
