export type NonNullableDeep<T> = T extends object
  ? {
      [P in keyof T]-?: NonNullable<NonNullableDeep<T[P]>>
    }
  : NonNullable<T>
