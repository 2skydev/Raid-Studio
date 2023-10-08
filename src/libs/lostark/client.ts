import axios from 'axios'

const lostarkClient = axios.create({
  baseURL: 'https://developer-lostark.game.onstove.com',
  headers: {
    Authorization: `Bearer ${process.env.LOSTARK_API_KEY}`,
  },
})

export default lostarkClient
