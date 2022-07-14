import Link from 'next/link'

const Logo = () => {
  return (
    <Link href={'/'}>
      <h1 className="font-black text-xl tracking-wide cursor-pointer">
        Todo<span className="text-blue-700">List</span>
      </h1>
    </Link>
  )
}

export default Logo
