import { SearchIcon } from '@heroicons/react/outline'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'
import TUser from '../../components/helpers/types/user'
import Layout from '../../components/layout'
import Todo from '../../components/section/todo'

interface Props {
  user: TUser
}

const UserTodos = ({ user }: Props) => {
  const [input, setInput] = useState('')

  return (
    <Layout>
      <div className="grid gap-5">
        {/* search */}
        <div className="grid grid-cols-[auto,1fr] items-center gap-3 px-3 py-1 border-[1px] border-gray-200 rounded-md">
          <SearchIcon className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search Here"
            className="py-2 pl-3 outline-none bg-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* todos count */}
        <span className="font-semibold text-sm">All ({user.todos.length})</span>
        {/* todos */}
        <div className="grid gap-3">
          {user.todos.filter((todo) => todo.title.toLowerCase().includes(input.toLowerCase())).map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default UserTodos

export const getStaticPaths: GetStaticPaths = async () => {
  const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users'

  const response = await fetch(USERS_API_URL)
  const users = await response.json()
  // create paths
  const paths = users.map((user: any) => {
    return {
      params: { id: String(user.id) },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

// destructure params from Paths
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params === user id === /users/1
  const TODOS_API_URL = 'https://jsonplaceholder.typicode.com/todos'

  const user = await fetch(
    `https://jsonplaceholder.typicode.com/users/${String(params!.id)}`
  ).then((response: any) => {
    const transformUserWithTodos = async () => {
      // convert user to json
      const user = await response.json()
      // fetch todos and convert to json
      const userTodos = await fetch(TODOS_API_URL).then((response: any) =>
        response.json()
      )
      // generate new user with todos
      const todos = userTodos.filter((todo: any) => todo.userId === user.id)

      return {
        ...user,
        todos,
      }
    }
    return transformUserWithTodos()
  })

  return {
    props: {
      user,
    },
  }
}
