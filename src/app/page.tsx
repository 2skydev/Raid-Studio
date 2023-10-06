import Link from 'next/link'

import Button from '@/components/ui/Button'

const Home = () => {
  return (
    <main>
      <Button asChild>
        <Link href="/test">test page</Link>
      </Button>
    </main>
  )
}

export default Home
