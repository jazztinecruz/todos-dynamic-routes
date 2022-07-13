import { ReactNode } from 'react'
import Header from './header'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className='h-screen grid grid-rows-[auto,1fr]'>
      <Header />
      <main>
        <section className='max-w-5xl mx-auto mt-6 px-2'>{children}</section>
      </main>
    </div>
  )
}

export default Layout
