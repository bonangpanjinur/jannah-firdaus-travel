export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      contact_messages: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          name: string
          phone: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          name: string
          phone: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          phone?: string
        }
        Relationships: []
      }
      gallery: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          image_url: string
          sort_order: number
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url: string
          sort_order?: number
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string
          sort_order?: number
        }
        Relationships: []
      }
      package_images: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          image_url: string
          package_id: string
          sort_order: number
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url: string
          package_id: string
          sort_order?: number
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string
          package_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "package_images_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      package_itinerary: {
        Row: {
          created_at: string
          day_number: number
          description: string | null
          id: string
          package_id: string
          title: string
        }
        Insert: {
          created_at?: string
          day_number: number
          description?: string | null
          id?: string
          package_id: string
          title: string
        }
        Update: {
          created_at?: string
          day_number?: number
          description?: string | null
          id?: string
          package_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "package_itinerary_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      packages: {
        Row: {
          airline: string | null
          created_at: string
          departure_date: string | null
          description: string | null
          duration_days: number | null
          excludes: string[]
          flyer_url: string | null
          hotel_madinah: string | null
          hotel_madinah_stars: number | null
          hotel_makkah: string | null
          hotel_makkah_stars: number | null
          id: string
          includes: string[]
          is_featured: boolean
          is_published: boolean
          name: string
          og_image_url: string | null
          price_double: number | null
          price_quad: number | null
          price_triple: number | null
          quota: number | null
          requirements: string[]
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          airline?: string | null
          created_at?: string
          departure_date?: string | null
          description?: string | null
          duration_days?: number | null
          excludes?: string[]
          flyer_url?: string | null
          hotel_madinah?: string | null
          hotel_madinah_stars?: number | null
          hotel_makkah?: string | null
          hotel_makkah_stars?: number | null
          id?: string
          includes?: string[]
          is_featured?: boolean
          is_published?: boolean
          name: string
          og_image_url?: string | null
          price_double?: number | null
          price_quad?: number | null
          price_triple?: number | null
          quota?: number | null
          requirements?: string[]
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          airline?: string | null
          created_at?: string
          departure_date?: string | null
          description?: string | null
          duration_days?: number | null
          excludes?: string[]
          flyer_url?: string | null
          hotel_madinah?: string | null
          hotel_madinah_stars?: number | null
          hotel_makkah?: string | null
          hotel_makkah_stars?: number | null
          id?: string
          includes?: string[]
          is_featured?: boolean
          is_published?: boolean
          name?: string
          og_image_url?: string | null
          price_double?: number | null
          price_quad?: number | null
          price_triple?: number | null
          quota?: number | null
          requirements?: string[]
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          created_at: string
          id: string
          name: string
          notes: string | null
          package_id: string | null
          package_name: string | null
          phone: string
          preferred_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          package_id?: string | null
          package_name?: string | null
          phone: string
          preferred_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          package_id?: string | null
          package_name?: string | null
          phone?: string
          preferred_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "registrations_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          about_text: string | null
          address: string | null
          agency_name: string
          email: string | null
          facebook: string | null
          hero_subtitle: string | null
          hero_title: string | null
          id: number
          instagram: string | null
          jamaah_count: number | null
          legal_name: string | null
          license_text: string | null
          logo_url: string | null
          founded_year: number | null
          ppiu_license_number: string | null
          service_areas: string[]
          services: string[]
          tagline: string | null
          theme: string
          updated_at: string
          operating_hours: string | null
          whatsapp_number: string | null
          whatsapp_template: string | null
          youtube: string | null
        }
        Insert: {
          about_text?: string | null
          address?: string | null
          agency_name?: string
          email?: string | null
          facebook?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: number
          instagram?: string | null
          jamaah_count?: number | null
          legal_name?: string | null
          license_text?: string | null
          logo_url?: string | null
          founded_year?: number | null
          ppiu_license_number?: string | null
          service_areas?: string[]
          services?: string[]
          tagline?: string | null
          theme?: string
          updated_at?: string
          operating_hours?: string | null
          whatsapp_number?: string | null
          whatsapp_template?: string | null
          youtube?: string | null
        }
        Update: {
          about_text?: string | null
          address?: string | null
          agency_name?: string
          email?: string | null
          facebook?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: number
          instagram?: string | null
          jamaah_count?: number | null
          legal_name?: string | null
          license_text?: string | null
          logo_url?: string | null
          founded_year?: number | null
          ppiu_license_number?: string | null
          service_areas?: string[]
          services?: string[]
          tagline?: string | null
          theme?: string
          updated_at?: string
          operating_hours?: string | null
          whatsapp_number?: string | null
          whatsapp_template?: string | null
          youtube?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
