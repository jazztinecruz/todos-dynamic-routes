import { GetStaticProps } from 'next'
import Search from '../components/elements/search'
import TUser from '../components/helpers/types/user'
import Layout from '../components/layout'
import User from '../components/section/users'

interface Props {
  users: TUser[]
}

const Home = ({ users }: Props) => {
  // console.log(users)

  return (
    <Layout>
      <div className="grid gap-5">
        <Search />

        {/* todos */}
        <div className="grid gap-3">
          {users.map((user) => (
            <User key={user.id} user={user}/>
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
        const todos = userTodos.filter((todo:any) => todo.userId === user.id)

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
