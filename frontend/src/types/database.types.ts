import { Database as DatabaseGenerated } from './database-generated.types'

export type { Json } from './database-generated.types'

export type Database = DatabaseGenerated

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type TableActionTypes = Database['public']['Tables']

export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
