import 'server-only'

import { getServerSession as _getServerSession, type AuthOptions } from 'next-auth'
import DiscordProvider, { type DiscordProfile } from 'next-auth/providers/discord'

import collections from '@/libs/db/collections'

export const authOptions: AuthOptions = {
  providers: [
    DiscordProvider<DiscordProfile>({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: 'https://discord.com/api/oauth2/authorize?scope=identify',
      profile: async profile => {
        if (profile.avatar === null) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
        } else {
          const format = profile.avatar.startsWith('a_') ? 'gif' : 'png'
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
        }

        return {
          id: profile.id,
          name: profile.username,
          image: profile.image_url,
        }
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user: providerUser }) => {
      delete providerUser.email

      const user = await collections.users.findOne({
        id: providerUser.id,
      })

      if (!user) {
        await collections.users.insertOne({
          ...providerUser,
          characterName: null,
        })
      }

      return true
    },
    session: ({ session, token }) => {
      // @ts-expect-error
      delete session.user.email

      session.user.id = token.id as string

      return session
    },
    jwt: ({ user, token }) => {
      if (user) {
        token.id = user.id
      }

      return token
    },
  },
}

export const getServerSession = () => _getServerSession(authOptions)
