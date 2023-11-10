import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import weekday from 'dayjs/plugin/weekday'

dayjs.extend(weekday)
dayjs.locale('ko')

export default dayjs
