export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
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
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      clears: {
        Row: {
          character_id: string
          cleared_at: string
          id: string
          raid_difficulty: string
          raid_name: string
          raid_step: number
          user_id: string
        }
        Insert: {
          character_id: string
          cleared_at?: string
          id?: string
          raid_difficulty: string
          raid_name: string
          raid_step: number
          user_id: string
        }
        Update: {
          character_id?: string
          cleared_at?: string
          id?: string
          raid_difficulty?: string
          raid_name?: string
          raid_step?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "clears_character_id_fkey"
            columns: ["character_id"]
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clears_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
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
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      squad_users: {
        Row: {
          id: number
          joined_at: string
          role: Database["public"]["Enums"]["squad_role"]
          squad_id: number
          user_id: string
        }
        Insert: {
          id?: number
          joined_at?: string
          role?: Database["public"]["Enums"]["squad_role"]
          squad_id: number
          user_id: string
        }
        Update: {
          id?: number
          joined_at?: string
          role?: Database["public"]["Enums"]["squad_role"]
          squad_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "squad_users_squad_id_fkey"
            columns: ["squad_id"]
            referencedRelation: "squads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "squad_users_squad_id_fkey"
            columns: ["squad_id"]
            referencedRelation: "squads_public_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "squad_users_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
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
        }
        Insert: {
          code: string
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      squads_public_view: {
        Row: {
          created_at: string | null
          id: number | null
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number | null
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number | null
          name?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      is_test_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      squad_role: "owner" | "normal"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

