import { useState } from 'react'

const useRaidTodoList = () => {
  const [showAll, setShowAll] = useState(false)

  return {
    showAll,
    onShowAll: () => setShowAll(!showAll),
  }
}
