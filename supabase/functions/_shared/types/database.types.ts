import { Database as DatabaseGenerated } from './database-generated.types.ts'

export type { Json } from './database-generated.types.ts'

export type Database = DatabaseGenerated

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T]
