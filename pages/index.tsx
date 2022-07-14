import { SearchIcon } from '@heroicons/react/outline'
import { GetStaticProps } from 'next'
import { useState } from 'react'
import TUser from '../components/helpers/types/user'
import Layout from '../components/layout'
import User from '../components/section/users'

interface Props {
  users: TUser[]
}

const Home = ({ users }: Props) => {
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

        {/* users */}
        <div className="grid gap-3">
          {users
            .filter(
              (user) =>
                user.name.toLowerCase().includes(input.toLowerCase()) ||
                user.username.toLowerCase().includes(input.toLowerCase())
            )
            .map((user) => (
              <User key={user.id} user={user} />
            ))}
        </div>
      </div>
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  // api urls
  const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users'
  const TODOS_API_URL = 'https://jsonplaceholder.typicode.com/todos'

  const users = await fetch(USERS_API_URL).then((response: any) => {
    const transformUserWithTodos = async () => {
      // convert users api to json
      const users = await response.json()
      // fetch todos and convert to json
      const userTodos = await fetch(TODOS_API_URL).then((response: any) =>
        response.json()
      )

      // generate new user with todos
      return users.map((user: any) => {
        //map todos
        // match todo id to user id
        const todos = userTodos.filter((todo: any) => todo.userId === user.id)

        // generate new user
        return {
          ...user,
          todos,
        }
      })
    }
    return transformUserWithTodos()
  })

  return {
    props: {
      users,
    },
  }
}
