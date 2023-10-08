import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      image: string
      name: string
    }
  }

  interface User {
    id: string
    name: string
    image: string
  }
}
