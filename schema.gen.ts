export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
      badge_levels: {
        Row: {
          badge_id: number
          icon_url: string | null
          id: number
          level: number
          requirement: number
        }
        Insert: {
          badge_id: number
          icon_url?: string | null
          id?: number
          level: number
          requirement: number
        }
        Update: {
          badge_id?: number
          icon_url?: string | null
          id?: number
          level?: number
          requirement?: number
        }
        Relationships: [
          {
            foreignKeyName: "badge_levels_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          category: string
          description: string
          id: number
          image_url: string | null
          name: string
        }
        Insert: {
          category: string
          description: string
          id?: number
          image_url?: string | null
          name: string
        }
        Update: {
          category?: string
          description?: string
          id?: number
          image_url?: string | null
          name?: string
        }
        Relationships: []
      }
      cheese_powers: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      cheese_producers: {
        Row: {
          address: string
          city: string
          id: number
          name: string
          zip_code: string
        }
        Insert: {
          address: string
          city: string
          id?: number
          name: string
          zip_code: string
        }
        Update: {
          address?: string
          city?: string
          id?: number
          name?: string
          zip_code?: string
        }
        Relationships: []
      }
      cheese_proposals: {
        Row: {
          aoc_year: number | null
          aop_year: number | null
          cheese_power_id: number | null
          country_id: number
          created_at: string
          crust_type_id: number
          description: string | null
          dough_type_id: number
          id: number
          igp_year: number | null
          milk_type_id: number
          name: string
          official_cheese_id: number | null
          picture: string | null
          proposed_by_id: string
          status: Database["public"]["Enums"]["status"]
          updated_at: string
        }
        Insert: {
          aoc_year?: number | null
          aop_year?: number | null
          cheese_power_id?: number | null
          country_id: number
          created_at?: string
          crust_type_id: number
          description?: string | null
          dough_type_id: number
          id?: number
          igp_year?: number | null
          milk_type_id: number
          name: string
          official_cheese_id?: number | null
          picture?: string | null
          proposed_by_id: string
          status?: Database["public"]["Enums"]["status"]
          updated_at?: string
        }
        Update: {
          aoc_year?: number | null
          aop_year?: number | null
          cheese_power_id?: number | null
          country_id?: number
          created_at?: string
          crust_type_id?: number
          description?: string | null
          dough_type_id?: number
          id?: number
          igp_year?: number | null
          milk_type_id?: number
          name?: string
          official_cheese_id?: number | null
          picture?: string | null
          proposed_by_id?: string
          status?: Database["public"]["Enums"]["status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cheese_proposals_cheese_power_id_fkey"
            columns: ["cheese_power_id"]
            isOneToOne: false
            referencedRelation: "cheese_powers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cheese_proposals_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cheese_proposals_crust_type_id_fkey"
            columns: ["crust_type_id"]
            isOneToOne: false
            referencedRelation: "crust_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cheese_proposals_dough_type_id_fkey"
            columns: ["dough_type_id"]
            isOneToOne: false
            referencedRelation: "dough_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cheese_proposals_milk_type_id_fkey"
            columns: ["milk_type_id"]
            isOneToOne: false
            referencedRelation: "milk_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cheese_proposals_official_cheese_id_fkey"
            columns: ["official_cheese_id"]
            isOneToOne: false
            referencedRelation: "cheeses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cheese_proposals_proposed_by_id_fkey"
            columns: ["proposed_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cheese_shops: {
        Row: {
          address: string
          city: string
          id: number
          name: string
          zip_code: string
        }
        Insert: {
          address: string
          city: string
          id?: number
          name: string
          zip_code: string
        }
        Update: {
          address?: string
          city?: string
          id?: number
          name?: string
          zip_code?: string
        }
        Relationships: []
      }
      cheese_shops_proposals: {
        Row: {
          address: string
          city: string
          id: number
          name: string
          official_cheese_shop_id: number | null
          proposed_by_id: string
          status: Database["public"]["Enums"]["status"]
          zip_code: string
        }
        Insert: {
          address: string
          city: string
          id?: number
          name: string
          official_cheese_shop_id?: number | null
          proposed_by_id: string
          status?: Database["public"]["Enums"]["status"]
          zip_code: string
        }
        Update: {
          address?: string
          city?: string
          id?: number
          name?: string
          official_cheese_shop_id?: number | null
          proposed_by_id?: string
          status?: Database["public"]["Enums"]["status"]
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "cheese_shops_proposals_official_cheese_shop_id_fkey"
            columns: ["official_cheese_shop_id"]
            isOneToOne: false
            referencedRelation: "cheese_shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cheese_shops_proposals_proposed_by_id_fkey"
            columns: ["proposed_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cheeses: {
        Row: {
          aoc_year: number | null
          aop_year: number | null
          cheese_power_id: number | null
          country_id: number
          created_at: string
          crust_type_id: number
          deleted: boolean | null
          description: string | null
          dough_type_id: number
          id: number
          igp_year: number | null
          milk_type_id: number
          name: string
          picture: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          aoc_year?: number | null
          aop_year?: number | null
          cheese_power_id?: number | null
          country_id: number
          created_at?: string
          crust_type_id: number
          deleted?: boolean | null
          description?: string | null
          dough_type_id: number
          id?: number
          igp_year?: number | null
          milk_type_id: number
          name: string
          picture?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          aoc_year?: number | null
          aop_year?: number | null
          cheese_power_id?: number | null
          country_id?: number
          created_at?: string
          crust_type_id?: number
          deleted?: boolean | null
          description?: string | null
          dough_type_id?: number
          id?: number
          igp_year?: number | null
          milk_type_id?: number
          name?: string
          picture?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cheeses_cheese_power_id_fkey"
            columns: ["cheese_power_id"]
            isOneToOne: false
            referencedRelation: "cheese_powers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cheeses_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cheeses_crust_type_id_fkey"
            columns: ["crust_type_id"]
            isOneToOne: false
            referencedRelation: "crust_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cheeses_dough_type_id_fkey"
            columns: ["dough_type_id"]
            isOneToOne: false
            referencedRelation: "dough_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cheeses_milk_type_id_fkey"
            columns: ["milk_type_id"]
            isOneToOne: false
            referencedRelation: "milk_types"
            referencedColumns: ["id"]
          },
        ]
      }
      cheeses_to_periods: {
        Row: {
          cheese_id: number
          optimal_tasting_period_id: number
        }
        Insert: {
          cheese_id: number
          optimal_tasting_period_id: number
        }
        Update: {
          cheese_id?: number
          optimal_tasting_period_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "cheeses_to_periods_cheese_id_fkey"
            columns: ["cheese_id"]
            isOneToOne: false
            referencedRelation: "cheeses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cheeses_to_periods_optimal_tasting_period_id_fkey"
            columns: ["optimal_tasting_period_id"]
            isOneToOne: false
            referencedRelation: "optimal_tasting_periods"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          code: string
          id: number
          name: string
        }
        Insert: {
          code: string
          id?: number
          name: string
        }
        Update: {
          code?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      crust_types: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      dough_types: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          email: string
          from: string
          id: number
        }
        Insert: {
          created_at?: string
          email: string
          from: string
          id?: number
        }
        Update: {
          created_at?: string
          email?: string
          from?: string
          id?: number
        }
        Relationships: []
      }
      milk_types: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      optimal_tasting_periods: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          cheese_id: number
          cheese_producer_id: number | null
          cheese_shop_id: number
          created_at: string
          id: number
          profile_id: string
          rating: number
          review: string | null
          status: Database["public"]["Enums"]["status"]
          updated_at: string
        }
        Insert: {
          cheese_id: number
          cheese_producer_id?: number | null
          cheese_shop_id: number
          created_at?: string
          id?: number
          profile_id: string
          rating: number
          review?: string | null
          status?: Database["public"]["Enums"]["status"]
          updated_at?: string
        }
        Update: {
          cheese_id?: number
          cheese_producer_id?: number | null
          cheese_shop_id?: number
          created_at?: string
          id?: number
          profile_id?: string
          rating?: number
          review?: string | null
          status?: Database["public"]["Enums"]["status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_cheese_id_fkey"
            columns: ["cheese_id"]
            isOneToOne: false
            referencedRelation: "cheeses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_cheese_producer_id_fkey"
            columns: ["cheese_producer_id"]
            isOneToOne: false
            referencedRelation: "cheese_producers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_cheese_shop_id_fkey"
            columns: ["cheese_shop_id"]
            isOneToOne: false
            referencedRelation: "cheese_shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      temporary_reviews: {
        Row: {
          cheese_producer_id: number | null
          cheese_proposal_id: number
          cheese_shop_id: number | null
          cheese_shop_proposal_id: number | null
          created_at: string
          id: number
          profile_id: string
          rating: number
          review: string | null
          updated_at: string
        }
        Insert: {
          cheese_producer_id?: number | null
          cheese_proposal_id: number
          cheese_shop_id?: number | null
          cheese_shop_proposal_id?: number | null
          created_at?: string
          id?: number
          profile_id: string
          rating: number
          review?: string | null
          updated_at?: string
        }
        Update: {
          cheese_producer_id?: number | null
          cheese_proposal_id?: number
          cheese_shop_id?: number | null
          cheese_shop_proposal_id?: number | null
          created_at?: string
          id?: number
          profile_id?: string
          rating?: number
          review?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "temporary_reviews_cheese_producer_id_fkey"
            columns: ["cheese_producer_id"]
            isOneToOne: false
            referencedRelation: "cheese_producers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "temporary_reviews_cheese_proposal_id_fkey"
            columns: ["cheese_proposal_id"]
            isOneToOne: false
            referencedRelation: "cheese_proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "temporary_reviews_cheese_shop_id_fkey"
            columns: ["cheese_shop_id"]
            isOneToOne: false
            referencedRelation: "cheese_shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "temporary_reviews_cheese_shop_proposal_id_fkey"
            columns: ["cheese_shop_proposal_id"]
            isOneToOne: false
            referencedRelation: "cheese_shops_proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "temporary_reviews_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: number
          current_level: number
          id: number
          last_updated: string | null
          progress: number
          user_id: string
        }
        Insert: {
          badge_id: number
          current_level: number
          id?: number
          last_updated?: string | null
          progress: number
          user_id: string
        }
        Update: {
          badge_id?: number
          current_level?: number
          id?: number
          last_updated?: string | null
          progress?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      status: "pending" | "validated" | "rejected"
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
          user_metadata: Json | null
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
          user_metadata?: Json | null
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
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
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
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

