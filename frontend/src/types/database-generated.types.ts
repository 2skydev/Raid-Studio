export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      characters: {
        Row: {
          class: string
          id: string
          level: number
          name: string
          server: string
          user_id: string
        }
        Insert: {
          class: string
          id: string
          level: number
          name: string
          server: string
          user_id: string
        }
        Update: {
          class?: string
          id?: string
          level?: number
          name?: string
          server?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "characters_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          main_character_name: string | null
          nickname: string
          photo: string
        }
        Insert: {
          id: string
          main_character_name?: string | null
          nickname: string
          photo: string
        }
        Update: {
          id?: string
          main_character_name?: string | null
          nickname?: string
          photo?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      squad_users: {
        Row: {
          id: number
          joined_at: string
          squad_id: number
          user_id: string
        }
        Insert: {
          id?: number
          joined_at?: string
          squad_id: number
          user_id: string
        }
        Update: {
          id?: number
          joined_at?: string
          squad_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "squad_users_squad_id_fkey"
            columns: ["squad_id"]
            isOneToOne: false
            referencedRelation: "squads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "squad_users_squad_id_fkey"
            columns: ["squad_id"]
            isOneToOne: false
            referencedRelation: "squads_public_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "squad_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      squads: {
        Row: {
          code: string
          created_at: string
          id: number
          name: string
          owner_id: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: number
          name: string
          owner_id: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: number
          name?: string
          owner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "squads_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      squads_public_view: {
        Row: {
          created_at: string | null
          id: number | null
          name: string | null
          owner_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number | null
          name?: string | null
          owner_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number | null
          name?: string | null
          owner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "squads_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
