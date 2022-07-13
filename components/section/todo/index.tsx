import { useEffect, useState } from 'react'
import Todo from '../../helpers/types/todo'

interface Props {
  todo: Todo
}

const Todo = ({ todo }: Props) => {
  const [completeness, setCompleteness] = useState('')

  useEffect(() => {
    if (todo.completed) {
      setCompleteness('Completed')
    } else {
      setCompleteness('Incomplete')
    }
  }, [])

  return (
    <div
      className="grid grid-cols-[1fr,auto] items-center border-[1px] border-gray-200 rounded-md py-3 px-6 hover:bg-slate-100 cursor-pointer"
    >
      <p className="text-md fotn-medium tracking-wide">{todo.title}</p>
      <span
        className={`${
          completeness === 'Completed' ? 'text-green-700' : 'text-red-700'
        } font-medium text-sm`}
      >
        {completeness}
      </span>
    </div>
  )
}

export default Todo
