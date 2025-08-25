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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          city_town: string
          country: string
          id: number
          postal_zip_code: string
          province_state: string
          street_address: string
        }
        Insert: {
          city_town?: string
          country?: string
          id?: number
          postal_zip_code: string
          province_state?: string
          street_address: string
        }
        Update: {
          city_town?: string
          country?: string
          id?: number
          postal_zip_code?: string
          province_state?: string
          street_address?: string
        }
        Relationships: []
      }
      athlete_highlight_tags: {
        Row: {
          athlete_highlight_id: number | null
          athlete_id: number | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          id: number
          sequence_no: number | null
          tag_id: number | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          athlete_highlight_id?: number | null
          athlete_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          id?: number
          sequence_no?: number | null
          tag_id?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          athlete_highlight_id?: number | null
          athlete_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          id?: number
          sequence_no?: number | null
          tag_id?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "athlete_highlights_athlete_highlight_id_fkey"
            columns: ["athlete_highlight_id"]
            isOneToOne: false
            referencedRelation: "athlete_highlights"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_highlights_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_highlights_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_highlights_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_highlights_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      athlete_highlights: {
        Row: {
          athlete_id: number | null
          athlete_profile_id: number | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          id: number
          is_active: boolean | null
          media_file_id: number | null
          sequence_no: number | null
          title: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          athlete_id?: number | null
          athlete_profile_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          media_file_id?: number | null
          sequence_no?: number | null
          title?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          athlete_id?: number | null
          athlete_profile_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          media_file_id?: number | null
          sequence_no?: number | null
          title?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "athlete_highlights_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_highlights_athlete_profile_id_fkey"
            columns: ["athlete_profile_id"]
            isOneToOne: false
            referencedRelation: "athlete_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_highlights_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_highlights_media_file_id_fkey"
            columns: ["media_file_id"]
            isOneToOne: false
            referencedRelation: "media_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_highlights_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      athlete_payments: {
        Row: {
          athlete_id: number
          athlete_registration_id: number | null
          athlete_subscription_id: number | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          id: number
          installment_no: number | null
          organization_id: number | null
          payment_amount: number | null
          payment_category: string | null
          payment_date: string | null
          payment_due: number | null
          payment_due_date: string | null
          payment_method: string | null
          payment_status: string | null
          program_id: number | null
          transaction_reference: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          athlete_id: number
          athlete_registration_id?: number | null
          athlete_subscription_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          installment_no?: number | null
          organization_id?: number | null
          payment_amount?: number | null
          payment_category?: string | null
          payment_date?: string | null
          payment_due?: number | null
          payment_due_date?: string | null
          payment_method?: string | null
          payment_status?: string | null
          program_id?: number | null
          transaction_reference?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          athlete_id?: number
          athlete_registration_id?: number | null
          athlete_subscription_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          installment_no?: number | null
          organization_id?: number | null
          payment_amount?: number | null
          payment_category?: string | null
          payment_date?: string | null
          payment_due?: number | null
          payment_due_date?: string | null
          payment_method?: string | null
          payment_status?: string | null
          program_id?: number | null
          transaction_reference?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "athlete_payments_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_payments_athlete_registration_id_fkey"
            columns: ["athlete_registration_id"]
            isOneToOne: false
            referencedRelation: "athlete_registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_payments_athlete_subscription_id_fkey"
            columns: ["athlete_subscription_id"]
            isOneToOne: false
            referencedRelation: "athlete_subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_payments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_payments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_payments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_payments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      athlete_positions: {
        Row: {
          athlete_id: number | null
          athlete_profile_id: number | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          id: number
          position_id: number | null
          sequence_no: number | null
          skill_level: number | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          athlete_id?: number | null
          athlete_profile_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          position_id?: number | null
          sequence_no?: number | null
          skill_level?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          athlete_id?: number | null
          athlete_profile_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          position_id?: number | null
          sequence_no?: number | null
          skill_level?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "athlete_positions_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_positions_athlete_profile_id_fkey"
            columns: ["athlete_profile_id"]
            isOneToOne: false
            referencedRelation: "athlete_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_positions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_positions_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_positions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      athlete_profiles: {
        Row: {
          about: string | null
          athlete_id: number | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          gpa: string | null
          graduation_year: number | null
          height: string | null
          id: number
          play_style: string | null
          slug: string | null
          sport: string | null
          strong_foot: string | null
          updated_at: string | null
          updated_by: number | null
          weight: string | null
        }
        Insert: {
          about?: string | null
          athlete_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          gpa?: string | null
          graduation_year?: number | null
          height?: string | null
          id?: number
          play_style?: string | null
          slug?: string | null
          sport?: string | null
          strong_foot?: string | null
          updated_at?: string | null
          updated_by?: number | null
          weight?: string | null
        }
        Update: {
          about?: string | null
          athlete_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          gpa?: string | null
          graduation_year?: number | null
          height?: string | null
          id?: number
          play_style?: string | null
          slug?: string | null
          sport?: string | null
          strong_foot?: string | null
          updated_at?: string | null
          updated_by?: number | null
          weight?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "athlete_profiles_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_profiles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_profiles_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      athlete_registrations: {
        Row: {
          athlete_id: number
          coupon_code: string | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          discount_amount: number | null
          id: number
          organization_id: number
          payment_mode: string | null
          payment_status: string | null
          program_id: number
          registration_date: string | null
          registration_status: string | null
          total_amount_due: number | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          athlete_id: number
          coupon_code?: string | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          discount_amount?: number | null
          id?: number
          organization_id: number
          payment_mode?: string | null
          payment_status?: string | null
          program_id: number
          registration_date?: string | null
          registration_status?: string | null
          total_amount_due?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          athlete_id?: number
          coupon_code?: string | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          discount_amount?: number | null
          id?: number
          organization_id?: number
          payment_mode?: string | null
          payment_status?: string | null
          program_id?: number
          registration_date?: string | null
          registration_status?: string | null
          total_amount_due?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "athlete_registrations_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_registrations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_registrations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_registrations_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_registrations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      athlete_stats: {
        Row: {
          birth_date: string
          dominant_foot: string
          dribbling: number
          free_kick: number
          full_name: string
          gender: string
          goalkeeper_agility: number
          goalkeeper_diving: number
          goalkeeper_positioning: number
          heading: number
          id: number
          pace: number
          passing: number
          shot_accuracy: number
          shot_power: number
          tackling: number
        }
        Insert: {
          birth_date: string
          dominant_foot?: string
          dribbling?: number
          free_kick?: number
          full_name: string
          gender?: string
          goalkeeper_agility?: number
          goalkeeper_diving?: number
          goalkeeper_positioning?: number
          heading?: number
          id?: number
          pace?: number
          passing?: number
          shot_accuracy?: number
          shot_power?: number
          tackling?: number
        }
        Update: {
          birth_date?: string
          dominant_foot?: string
          dribbling?: number
          free_kick?: number
          full_name?: string
          gender?: string
          goalkeeper_agility?: number
          goalkeeper_diving?: number
          goalkeeper_positioning?: number
          heading?: number
          id?: number
          pace?: number
          passing?: number
          shot_accuracy?: number
          shot_power?: number
          tackling?: number
        }
        Relationships: []
      }
      athlete_subscriptions: {
        Row: {
          athlete_id: number
          cancelled_at: string | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          end_date: string | null
          id: number
          product_id: number | null
          product_plan_id: number | null
          slug: string | null
          start_date: string | null
          status: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          athlete_id: number
          cancelled_at?: string | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: number
          product_id?: number | null
          product_plan_id?: number | null
          slug?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          athlete_id?: number
          cancelled_at?: string | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: number
          product_id?: number | null
          product_plan_id?: number | null
          slug?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "athlete_subscriptions_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_subscriptions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_subscriptions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_subscriptions_product_plan_id_fkey"
            columns: ["product_plan_id"]
            isOneToOne: false
            referencedRelation: "product_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_subscriptions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      athlete_waivers: {
        Row: {
          athlete_id: number | null
          athlete_registration_id: number | null
          created_at: string | null
          created_by: number | null
          deleted_at: string | null
          id: number
          organization_id: number | null
          program_id: number | null
          program_waiver_id: number | null
          signed_at: string | null
          signed_by: number | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          athlete_id?: number | null
          athlete_registration_id?: number | null
          created_at?: string | null
          created_by?: number | null
          deleted_at?: string | null
          id?: number
          organization_id?: number | null
          program_id?: number | null
          program_waiver_id?: number | null
          signed_at?: string | null
          signed_by?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          athlete_id?: number | null
          athlete_registration_id?: number | null
          created_at?: string | null
          created_by?: number | null
          deleted_at?: string | null
          id?: number
          organization_id?: number | null
          program_id?: number | null
          program_waiver_id?: number | null
          signed_at?: string | null
          signed_by?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "athlete_waivers_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_waivers_athlete_registration_id_fkey"
            columns: ["athlete_registration_id"]
            isOneToOne: false
            referencedRelation: "athlete_registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_waivers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_waivers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_waivers_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_waivers_program_waiver_id_fkey"
            columns: ["program_waiver_id"]
            isOneToOne: false
            referencedRelation: "program_waivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_waivers_signed_by_fkey"
            columns: ["signed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_waivers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      athletes: {
        Row: {
          created_at: string
          created_by: number | null
          customer_id: number | null
          date_of_birth: string
          deleted_at: string | null
          first_name: string | null
          full_name: string
          gender: string | null
          id: number
          is_available: boolean
          last_name: string | null
          level: Database["public"]["Enums"]["level"]
          media_release: boolean
          photo: string | null
          profile_slug: string | null
          profile_url: string | null
          subscription_code: string | null
          updated_at: string | null
          updated_by: number | null
          user_id: number | null
          wants_kit: boolean | null
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          customer_id?: number | null
          date_of_birth: string
          deleted_at?: string | null
          first_name?: string | null
          full_name: string
          gender?: string | null
          id?: number
          is_available?: boolean
          last_name?: string | null
          level?: Database["public"]["Enums"]["level"]
          media_release?: boolean
          photo?: string | null
          profile_slug?: string | null
          profile_url?: string | null
          subscription_code?: string | null
          updated_at?: string | null
          updated_by?: number | null
          user_id?: number | null
          wants_kit?: boolean | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          customer_id?: number | null
          date_of_birth?: string
          deleted_at?: string | null
          first_name?: string | null
          full_name?: string
          gender?: string | null
          id?: number
          is_available?: boolean
          last_name?: string | null
          level?: Database["public"]["Enums"]["level"]
          media_release?: boolean
          photo?: string | null
          profile_slug?: string | null
          profile_url?: string | null
          subscription_code?: string | null
          updated_at?: string | null
          updated_by?: number | null
          user_id?: number | null
          wants_kit?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "athletes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athletes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athletes_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athletes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance: {
        Row: {
          athlete_id: number
          created_at: string
          event_starts: string
          going: boolean
          id: number
          location: string | null
          title: string
        }
        Insert: {
          athlete_id: number
          created_at?: string
          event_starts: string
          going?: boolean
          id?: number
          location?: string | null
          title: string
        }
        Update: {
          athlete_id?: number
          created_at?: string
          event_starts?: string
          going?: boolean
          id?: number
          location?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
        ]
      }
      competition_highlights: {
        Row: {
          competition: string
          week_number: number
        }
        Insert: {
          competition: string
          week_number?: number
        }
        Update: {
          competition?: string
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "competition_highlights_competition_fkey"
            columns: ["competition"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["slug"]
          },
        ]
      }
      competition_registrations: {
        Row: {
          competition_id: number | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          division_id: number | null
          email_address: string | null
          first_name: string | null
          id: number
          last_name: string | null
          logo_url: string | null
          organization_name: string | null
          payment_status: string | null
          phone_number: string | null
          registration_status: string | null
          team_name: string | null
          updated_at: string | null
          updated_by: number | null
          waiver_signed_at: string | null
        }
        Insert: {
          competition_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          division_id?: number | null
          email_address?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          logo_url?: string | null
          organization_name?: string | null
          payment_status?: string | null
          phone_number?: string | null
          registration_status?: string | null
          team_name?: string | null
          updated_at?: string | null
          updated_by?: number | null
          waiver_signed_at?: string | null
        }
        Update: {
          competition_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          division_id?: number | null
          email_address?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          logo_url?: string | null
          organization_name?: string | null
          payment_status?: string | null
          phone_number?: string | null
          registration_status?: string | null
          team_name?: string | null
          updated_at?: string | null
          updated_by?: number | null
          waiver_signed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "competition_registrations_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_registrations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_registrations_division_id_fkey"
            columns: ["division_id"]
            isOneToOne: false
            referencedRelation: "divisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_registrations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      competition_teams: {
        Row: {
          competition_id: number | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          division_id: number | null
          division_tier_id: number | null
          draws: number | null
          games_played: number | null
          goal_diff: number | null
          goals_against: number | null
          goals_for: number | null
          id: number
          losses: number | null
          points: number | null
          points_per_game: number | null
          status: string | null
          team_id: number | null
          updated_at: string | null
          updated_by: number | null
          wins: number | null
        }
        Insert: {
          competition_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          division_id?: number | null
          division_tier_id?: number | null
          draws?: number | null
          games_played?: number | null
          goal_diff?: number | null
          goals_against?: number | null
          goals_for?: number | null
          id?: number
          losses?: number | null
          points?: number | null
          points_per_game?: number | null
          status?: string | null
          team_id?: number | null
          updated_at?: string | null
          updated_by?: number | null
          wins?: number | null
        }
        Update: {
          competition_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          division_id?: number | null
          division_tier_id?: number | null
          draws?: number | null
          games_played?: number | null
          goal_diff?: number | null
          goals_against?: number | null
          goals_for?: number | null
          id?: number
          losses?: number | null
          points?: number | null
          points_per_game?: number | null
          status?: string | null
          team_id?: number | null
          updated_at?: string | null
          updated_by?: number | null
          wins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "competition_teams_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_teams_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_teams_division_id_fkey"
            columns: ["division_id"]
            isOneToOne: false
            referencedRelation: "divisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_teams_division_tier_id_fkey"
            columns: ["division_tier_id"]
            isOneToOne: false
            referencedRelation: "division_tiers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_teams_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_teams_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      competitions: {
        Row: {
          competition_type: string | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          end_date: string | null
          id: number
          name: string | null
          organization_id: number | null
          reg_end_date: string | null
          reg_start_date: string | null
          slug: string | null
          start_date: string | null
          status: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          competition_type?: string | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: number
          name?: string | null
          organization_id?: number | null
          reg_end_date?: string | null
          reg_start_date?: string | null
          slug?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          competition_type?: string | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: number
          name?: string | null
          organization_id?: number | null
          reg_end_date?: string | null
          reg_start_date?: string | null
          slug?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "competitions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competitions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competitions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          athlete_id: number | null
          coupon_code: string
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          discount_amount: number | null
          discount_mode: string
          discount_percentage: number | null
          id: number
          is_active: boolean | null
          name: string
          organization_id: number | null
          program_id: number | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          athlete_id?: number | null
          coupon_code: string
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          discount_amount?: number | null
          discount_mode: string
          discount_percentage?: number | null
          id?: number
          is_active?: boolean | null
          name: string
          organization_id?: number | null
          program_id?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          athlete_id?: number | null
          coupon_code?: string
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          discount_amount?: number | null
          discount_mode?: string
          discount_percentage?: number | null
          id?: number
          is_active?: boolean | null
          name?: string
          organization_id?: number | null
          program_id?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "coupons_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupons_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupons_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupons_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupons_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      credentials: {
        Row: {
          created_at: string
          email: string | null
          email_hash: string
          password_hash: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          email_hash: string
          password_hash: string
        }
        Update: {
          created_at?: string
          email?: string | null
          email_hash?: string
          password_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "credentials_email_fkey"
            columns: ["email"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["email"]
          },
        ]
      }
      currencies: {
        Row: {
          created_at: string
          created_by: number | null
          currency_code: string
          decimal_places: number
          deleted_at: string | null
          id: number
          is_active: boolean | null
          name: string
          symbol: string
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          currency_code: string
          decimal_places?: number
          deleted_at?: string | null
          id?: number
          is_active?: boolean | null
          name: string
          symbol: string
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          currency_code?: string
          decimal_places?: number
          deleted_at?: string | null
          id?: number
          is_active?: boolean | null
          name?: string
          symbol?: string
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "currencies_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "currencies_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          city_town: string
          country: string
          created_at: string
          created_by: number | null
          deleted_at: string | null
          email: string
          first_name: string | null
          full_name: string
          id: number
          last_name: string | null
          otp: string | null
          phone: string
          postal_zip_code: string
          state_province: string
          street_1: string
          street_2: string | null
          updated_at: string | null
          updated_by: number | null
          user_id: number | null
        }
        Insert: {
          city_town: string
          country: string
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          email: string
          first_name?: string | null
          full_name: string
          id?: number
          last_name?: string | null
          otp?: string | null
          phone: string
          postal_zip_code: string
          state_province: string
          street_1: string
          street_2?: string | null
          updated_at?: string | null
          updated_by?: number | null
          user_id?: number | null
        }
        Update: {
          city_town?: string
          country?: string
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          email?: string
          first_name?: string | null
          full_name?: string
          id?: number
          last_name?: string | null
          otp?: string | null
          phone?: string
          postal_zip_code?: string
          state_province?: string
          street_1?: string
          street_2?: string | null
          updated_at?: string | null
          updated_by?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      division_tiers: {
        Row: {
          competion_id: number | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          division_id: number | null
          id: number
          name: string | null
          organization_id: number | null
          status: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          competion_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          division_id?: number | null
          id?: number
          name?: string | null
          organization_id?: number | null
          status?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          competion_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          division_id?: number | null
          id?: number
          name?: string | null
          organization_id?: number | null
          status?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "division_tiers_competion_id_fkey"
            columns: ["competion_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "division_tiers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "division_tiers_division_id_fkey"
            columns: ["division_id"]
            isOneToOne: false
            referencedRelation: "divisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "division_tiers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "division_tiers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      divisions: {
        Row: {
          competition_id: number | null
          created_at: string
          created_by: number | null
          currency_code: string | null
          deleted_at: string | null
          description: string | null
          fee: number | null
          game_format: string | null
          game_length: number | null
          gender: string | null
          half_time_break: number | null
          half_time_length: number | null
          has_tier: boolean | null
          id: number
          image_url: string
          name: string | null
          organization_id: number | null
          sequence_no: number | null
          status: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          competition_id?: number | null
          created_at?: string
          created_by?: number | null
          currency_code?: string | null
          deleted_at?: string | null
          description?: string | null
          fee?: number | null
          game_format?: string | null
          game_length?: number | null
          gender?: string | null
          half_time_break?: number | null
          half_time_length?: number | null
          has_tier?: boolean | null
          id?: number
          image_url?: string
          name?: string | null
          organization_id?: number | null
          sequence_no?: number | null
          status?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          competition_id?: number | null
          created_at?: string
          created_by?: number | null
          currency_code?: string | null
          deleted_at?: string | null
          description?: string | null
          fee?: number | null
          game_format?: string | null
          game_length?: number | null
          gender?: string | null
          half_time_break?: number | null
          half_time_length?: number | null
          has_tier?: boolean | null
          id?: number
          image_url?: string
          name?: string | null
          organization_id?: number | null
          sequence_no?: number | null
          status?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "divisions_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "divisions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "divisions_currency_code_fkey"
            columns: ["currency_code"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["currency_code"]
          },
          {
            foreignKeyName: "divisions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "divisions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      domains: {
        Row: {
          created_at: string
          id: number
          name: string | null
          organization_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          organization_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          organization_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "domains_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      field_schedules: {
        Row: {
          competition_id: number | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          end_time: string | null
          field_address: string | null
          field_id: number | null
          field_name: string | null
          id: number
          organization_id: number | null
          schedule_date: string | null
          start_time: string | null
          status: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          competition_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          end_time?: string | null
          field_address?: string | null
          field_id?: number | null
          field_name?: string | null
          id?: number
          organization_id?: number | null
          schedule_date?: string | null
          start_time?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          competition_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          end_time?: string | null
          field_address?: string | null
          field_id?: number | null
          field_name?: string | null
          id?: number
          organization_id?: number | null
          schedule_date?: string | null
          start_time?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "field_schedules_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_schedules_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_schedules_field_id_fkey"
            columns: ["field_id"]
            isOneToOne: false
            referencedRelation: "fields"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_schedules_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_schedules_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      fields: {
        Row: {
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          field_size: string | null
          field_type: string | null
          id: number
          location_id: number | null
          name: string
          parent_field_id: number | null
          status: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          field_size?: string | null
          field_type?: string | null
          id?: number
          location_id?: number | null
          name: string
          parent_field_id?: number | null
          status?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          field_size?: string | null
          field_type?: string | null
          id?: number
          location_id?: number | null
          name?: string
          parent_field_id?: number | null
          status?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fields_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fields_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fields_parent_field_id_fkey"
            columns: ["parent_field_id"]
            isOneToOne: false
            referencedRelation: "fields"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fields_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      fixture_events: {
        Row: {
          competition: string
          event_type: string
          fixture_id: number
          player: string
          team: string
          url: string
        }
        Insert: {
          competition?: string
          event_type?: string
          fixture_id: number
          player: string
          team: string
          url: string
        }
        Update: {
          competition?: string
          event_type?: string
          fixture_id?: number
          player?: string
          team?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "fixture_events_competition_fkey"
            columns: ["competition"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "fixture_events_fixture_id_fkey"
            columns: ["fixture_id"]
            isOneToOne: false
            referencedRelation: "fixtures"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fixture_events_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["name"]
          },
        ]
      }
      fixture_lineup: {
        Row: {
          age: number
          drop_in_fee: number
          fixture_id: number
          goals: number
          goals_conceded: number | null
          id: number
          is_available: boolean | null
          kit_number: number | null
          name: string
          position: string
          saves: number | null
          shots_on_goal: number
          team: string
        }
        Insert: {
          age?: number
          drop_in_fee?: number
          fixture_id: number
          goals?: number
          goals_conceded?: number | null
          id?: number
          is_available?: boolean | null
          kit_number?: number | null
          name: string
          position?: string
          saves?: number | null
          shots_on_goal?: number
          team: string
        }
        Update: {
          age?: number
          drop_in_fee?: number
          fixture_id?: number
          goals?: number
          goals_conceded?: number | null
          id?: number
          is_available?: boolean | null
          kit_number?: number | null
          name?: string
          position?: string
          saves?: number | null
          shots_on_goal?: number
          team?: string
        }
        Relationships: [
          {
            foreignKeyName: "fixture_lineup_fixture_id_fkey"
            columns: ["fixture_id"]
            isOneToOne: false
            referencedRelation: "fixtures"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fixture_lineup_name_fkey"
            columns: ["name"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["full_name"]
          },
          {
            foreignKeyName: "fixture_lineup_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["name"]
          },
        ]
      }
      fixtures: {
        Row: {
          away_pk_score: number | null
          away_team: string | null
          competition_slug: string
          end_time: string | null
          extra_break_seconds: number | null
          first_break_seconds: number | null
          first_extra_seconds: number | null
          first_half_seconds: number
          goal_difference: number
          goals_allowed: number
          goals_for: number
          id: number
          is_home: boolean
          location: string | null
          pk_score: number | null
          points: number
          second_extra_seconds: number | null
          second_half_seconds: number
          start_date: string
          start_time: string
          team: string | null
        }
        Insert: {
          away_pk_score?: number | null
          away_team?: string | null
          competition_slug?: string
          end_time?: string | null
          extra_break_seconds?: number | null
          first_break_seconds?: number | null
          first_extra_seconds?: number | null
          first_half_seconds?: number
          goal_difference?: number
          goals_allowed?: number
          goals_for?: number
          id?: number
          is_home?: boolean
          location?: string | null
          pk_score?: number | null
          points?: number
          second_extra_seconds?: number | null
          second_half_seconds?: number
          start_date?: string
          start_time?: string
          team?: string | null
        }
        Update: {
          away_pk_score?: number | null
          away_team?: string | null
          competition_slug?: string
          end_time?: string | null
          extra_break_seconds?: number | null
          first_break_seconds?: number | null
          first_extra_seconds?: number | null
          first_half_seconds?: number
          goal_difference?: number
          goals_allowed?: number
          goals_for?: number
          id?: number
          is_home?: boolean
          location?: string | null
          pk_score?: number | null
          points?: number
          second_extra_seconds?: number | null
          second_half_seconds?: number
          start_date?: string
          start_time?: string
          team?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fixtures_away_team_fkey"
            columns: ["away_team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "fixtures_location_fkey"
            columns: ["location"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "fixtures_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["name"]
          },
        ]
      }
      goals: {
        Row: {
          id: number
          name: string
          team: string
          video_url: string | null
        }
        Insert: {
          id?: number
          name: string
          team: string
          video_url?: string | null
        }
        Update: {
          id?: number
          name?: string
          team?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "goals_name_fkey"
            columns: ["name"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["full_name"]
          },
          {
            foreignKeyName: "goals_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["name"]
          },
        ]
      }
      household_users: {
        Row: {
          created_at: string
          created_by: number | null
          deleted_at: string | null
          household_id: number
          id: number
          role: string | null
          updated_at: string | null
          updated_by: number | null
          user_id: number
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          household_id: number
          id?: number
          role?: string | null
          updated_at?: string | null
          updated_by?: number | null
          user_id: number
        }
        Update: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          household_id?: number
          id?: number
          role?: string | null
          updated_at?: string | null
          updated_by?: number | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "household_users_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "household_users_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "household_users_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "household_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      households: {
        Row: {
          created_at: string
          created_by: number | null
          deleted_at: string | null
          id: number
          name: string
          organizer_user_id: number | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          id?: number
          name: string
          organizer_user_id?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          id?: number
          name?: string
          organizer_user_id?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "households_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "households_organizer_user_id_fkey"
            columns: ["organizer_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          city_town: string
          country: string
          created_at: string
          id: number
          name: string
          postal_zip_code: string
          state_province: string
          street_1: string | null
          street_2: string | null
        }
        Insert: {
          city_town: string
          country: string
          created_at?: string
          id?: number
          name: string
          postal_zip_code: string
          state_province: string
          street_1?: string | null
          street_2?: string | null
        }
        Update: {
          city_town?: string
          country?: string
          created_at?: string
          id?: number
          name?: string
          postal_zip_code?: string
          state_province?: string
          street_1?: string | null
          street_2?: string | null
        }
        Relationships: []
      }
      match_teams: {
        Row: {
          competition_team_id: number | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          goals_against: number | null
          goals_for: number | null
          id: number
          match_id: number | null
          match_result: string | null
          match_side: string | null
          penalties_scored: number | null
          team_id: number | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          competition_team_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          goals_against?: number | null
          goals_for?: number | null
          id?: number
          match_id?: number | null
          match_result?: string | null
          match_side?: string | null
          penalties_scored?: number | null
          team_id?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          competition_team_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          goals_against?: number | null
          goals_for?: number | null
          id?: number
          match_id?: number | null
          match_result?: string | null
          match_side?: string | null
          penalties_scored?: number | null
          team_id?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "match_teams_competition_team_id_fkey"
            columns: ["competition_team_id"]
            isOneToOne: false
            referencedRelation: "competition_teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_teams_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_teams_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_teams_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_teams_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      match_videos: {
        Row: {
          date: string
          team: string
          url: string
        }
        Insert: {
          date: string
          team: string
          url: string
        }
        Update: {
          date?: string
          team?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "match_videos_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["name"]
          },
        ]
      }
      matches: {
        Row: {
          away_score: number | null
          away_team_id: number | null
          away_team_name: string | null
          away_team_org_id: number | null
          competition_id: number | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          division_id: number | null
          division_tier_id: number | null
          field_schedule_id: number | null
          home_score: number | null
          home_team_id: number | null
          home_team_name: string | null
          home_team_org_id: number | null
          id: number
          match_video: string | null
          notes: string | null
          organization_id: number | null
          penalty_shootout: boolean | null
          penalty_winner_team_id: number | null
          stage: string | null
          status: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          away_score?: number | null
          away_team_id?: number | null
          away_team_name?: string | null
          away_team_org_id?: number | null
          competition_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          division_id?: number | null
          division_tier_id?: number | null
          field_schedule_id?: number | null
          home_score?: number | null
          home_team_id?: number | null
          home_team_name?: string | null
          home_team_org_id?: number | null
          id?: number
          match_video?: string | null
          notes?: string | null
          organization_id?: number | null
          penalty_shootout?: boolean | null
          penalty_winner_team_id?: number | null
          stage?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          away_score?: number | null
          away_team_id?: number | null
          away_team_name?: string | null
          away_team_org_id?: number | null
          competition_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          division_id?: number | null
          division_tier_id?: number | null
          field_schedule_id?: number | null
          home_score?: number | null
          home_team_id?: number | null
          home_team_name?: string | null
          home_team_org_id?: number | null
          id?: number
          match_video?: string | null
          notes?: string | null
          organization_id?: number | null
          penalty_shootout?: boolean | null
          penalty_winner_team_id?: number | null
          stage?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_division_id_fkey"
            columns: ["division_id"]
            isOneToOne: false
            referencedRelation: "divisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_division_tier_id_fkey"
            columns: ["division_tier_id"]
            isOneToOne: false
            referencedRelation: "division_tiers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_field_schedule_id_fkey"
            columns: ["field_schedule_id"]
            isOneToOne: false
            referencedRelation: "field_schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_penalty_winner_team_id_fkey"
            columns: ["penalty_winner_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      media_components: {
        Row: {
          created_at: string
          id: number
          organization_id: number
          segment_index: number
          segment_name: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: number
          organization_id: number
          segment_index?: number
          segment_name?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: number
          organization_id?: number
          segment_index?: number
          segment_name?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_components_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      media_files: {
        Row: {
          athlete_id: number | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          duration_seconds: number | null
          file_format: string | null
          file_size: number | null
          file_url: string | null
          id: number
          is_active: boolean | null
          media_type: string | null
          s3_key: string | null
          thumbnail_url: string | null
          title: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          athlete_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          duration_seconds?: number | null
          file_format?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: number
          is_active?: boolean | null
          media_type?: string | null
          s3_key?: string | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          athlete_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          duration_seconds?: number | null
          file_format?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: number
          is_active?: boolean | null
          media_type?: string | null
          s3_key?: string | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_files_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_files_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_files_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          created_at: string
          email: string
          id: number
          is_active: boolean
          organization_id: number
          role: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          is_active?: boolean
          organization_id: number
          role?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          is_active?: boolean
          organization_id?: number
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "members_email_fkey"
            columns: ["email"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["email"]
          },
          {
            foreignKeyName: "members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_email_recipients: {
        Row: {
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          email_address: string
          email_category: string | null
          id: number
          is_active: boolean | null
          organization_id: number
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          created_at: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          email_address: string
          email_category?: string | null
          id?: number
          is_active?: boolean | null
          organization_id: number
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          email_address?: string
          email_category?: string | null
          id?: number
          is_active?: boolean | null
          organization_id?: number
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_email_recipients_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_email_recipients_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_email_recipients_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_events: {
        Row: {
          created_at: string
          ends_at: string | null
          event_type: string
          id: number
          location: string
          organization_id: number
          starts_at: string
        }
        Insert: {
          created_at?: string
          ends_at?: string | null
          event_type?: string
          id?: number
          location: string
          organization_id: number
          starts_at: string
        }
        Update: {
          created_at?: string
          ends_at?: string | null
          event_type?: string
          id?: number
          location?: string
          organization_id?: number
          starts_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_users: {
        Row: {
          created_at: string
          created_by: number | null
          deleted_at: string | null
          id: number
          organization_id: number
          role: string
          updated_at: string | null
          updated_by: number | null
          user_id: number
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          id?: number
          organization_id: number
          role?: string
          updated_at?: string | null
          updated_by?: number | null
          user_id: number
        }
        Update: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          id?: number
          organization_id?: number
          role?: string
          updated_at?: string | null
          updated_by?: number | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "organization_users_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_users_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_users_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_waivers: {
        Row: {
          content: string | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          id: number
          is_default: boolean | null
          name: string | null
          organization_id: number | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          content?: string | null
          created_at: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          is_default?: boolean | null
          name?: string | null
          organization_id?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          content?: string | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          is_default?: boolean | null
          name?: string | null
          organization_id?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_waivers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_waivers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_waivers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          administrator_id: number | null
          city_town: string | null
          colours: string | null
          country: string | null
          created_at: string
          created_by: number | null
          currency_code: string | null
          deleted_at: string | null
          email: string | null
          id: number
          is_active: boolean
          logo_url: string | null
          name: string
          organization_type: string
          phone: string | null
          postal_zip_code: string | null
          short_name: string | null
          slug: string | null
          state_province: string | null
          street_1: string | null
          street_2: string | null
          subdomain: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          administrator_id?: number | null
          city_town?: string | null
          colours?: string | null
          country?: string | null
          created_at?: string
          created_by?: number | null
          currency_code?: string | null
          deleted_at?: string | null
          email?: string | null
          id?: number
          is_active?: boolean
          logo_url?: string | null
          name: string
          organization_type?: string
          phone?: string | null
          postal_zip_code?: string | null
          short_name?: string | null
          slug?: string | null
          state_province?: string | null
          street_1?: string | null
          street_2?: string | null
          subdomain?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          administrator_id?: number | null
          city_town?: string | null
          colours?: string | null
          country?: string | null
          created_at?: string
          created_by?: number | null
          currency_code?: string | null
          deleted_at?: string | null
          email?: string | null
          id?: number
          is_active?: boolean
          logo_url?: string | null
          name?: string
          organization_type?: string
          phone?: string | null
          postal_zip_code?: string | null
          short_name?: string | null
          slug?: string | null
          state_province?: string | null
          street_1?: string | null
          street_2?: string | null
          subdomain?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_administrator_id_fkey"
            columns: ["administrator_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_currency_code_fkey"
            columns: ["currency_code"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["currency_code"]
          },
          {
            foreignKeyName: "organizations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      parents: {
        Row: {
          city_town: string | null
          country: string | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          email_notifications: boolean | null
          first_name: string | null
          full_name: string | null
          id: number
          last_name: string | null
          otp: number | null
          postal_zip_code: string | null
          relationship: string
          state_province: string | null
          street_1: string | null
          street_2: string | null
          updated_at: string | null
          updated_by: number | null
          user_id: number | null
          whatsapp_notifications: boolean | null
        }
        Insert: {
          city_town?: string | null
          country?: string | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          email_notifications?: boolean | null
          first_name?: string | null
          full_name?: string | null
          id?: number
          last_name?: string | null
          otp?: number | null
          postal_zip_code?: string | null
          relationship: string
          state_province?: string | null
          street_1?: string | null
          street_2?: string | null
          updated_at?: string | null
          updated_by?: number | null
          user_id?: number | null
          whatsapp_notifications?: boolean | null
        }
        Update: {
          city_town?: string | null
          country?: string | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          email_notifications?: boolean | null
          first_name?: string | null
          full_name?: string | null
          id?: number
          last_name?: string | null
          otp?: number | null
          postal_zip_code?: string | null
          relationship?: string
          state_province?: string | null
          street_1?: string | null
          street_2?: string | null
          updated_at?: string | null
          updated_by?: number | null
          user_id?: number | null
          whatsapp_notifications?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "parents_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parents_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      phone_logins: {
        Row: {
          code: string
          expires_at: number
          phone_hash: string
        }
        Insert: {
          code: string
          expires_at: number
          phone_hash: string
        }
        Update: {
          code?: string
          expires_at?: number
          phone_hash?: string
        }
        Relationships: []
      }
      player_stats: {
        Row: {
          assists: number | null
          competition_id: number
          goals: number | null
          player: string
          saves: number | null
          successful_dribbles: number | null
          tackles: number | null
          team: string
        }
        Insert: {
          assists?: number | null
          competition_id?: number
          goals?: number | null
          player: string
          saves?: number | null
          successful_dribbles?: number | null
          tackles?: number | null
          team: string
        }
        Update: {
          assists?: number | null
          competition_id?: number
          goals?: number | null
          player?: string
          saves?: number | null
          successful_dribbles?: number | null
          tackles?: number | null
          team?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_highlights_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "player_stats_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_stats_player_fkey"
            columns: ["player"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["full_name"]
          },
        ]
      }
      players: {
        Row: {
          assists: number
          description: string | null
          full_name: string
          goals: number
          parent: string
          phone: string | null
          saves: number
        }
        Insert: {
          assists?: number
          description?: string | null
          full_name: string
          goals?: number
          parent?: string
          phone?: string | null
          saves?: number
        }
        Update: {
          assists?: number
          description?: string | null
          full_name?: string
          goals?: number
          parent?: string
          phone?: string | null
          saves?: number
        }
        Relationships: []
      }
      positions: {
        Row: {
          abbreviation: string | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          id: number
          name: string | null
          sport: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          abbreviation?: string | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          sport?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          abbreviation?: string | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          sport?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "positions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "positions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      product_plans: {
        Row: {
          billing_cycle: string | null
          created_at: string
          created_by: number | null
          currency_code: string | null
          deleted_at: string | null
          description: string | null
          id: number
          is_active: boolean | null
          name: string | null
          price: number | null
          product_id: number | null
          stripe_price_id: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          billing_cycle?: string | null
          created_at?: string
          created_by?: number | null
          currency_code?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          name?: string | null
          price?: number | null
          product_id?: number | null
          stripe_price_id?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          billing_cycle?: string | null
          created_at?: string
          created_by?: number | null
          currency_code?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          name?: string | null
          price?: number | null
          product_id?: number | null
          stripe_price_id?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_plans_currency_code_fkey"
            columns: ["currency_code"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["currency_code"]
          },
          {
            foreignKeyName: "product_plans_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          id: number
          image_url: string | null
          is_active: boolean | null
          name: string | null
          slug: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          name?: string | null
          slug?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          name?: string | null
          slug?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          athlete_id: number | null
          created_at: string
          id: string
          url: string
        }
        Insert: {
          athlete_id?: number | null
          created_at?: string
          id: string
          url: string
        }
        Update: {
          athlete_id?: number | null
          created_at?: string
          id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
        ]
      }
      program_fee_installments: {
        Row: {
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          id: number
          installment_amount: number
          installment_due_date: string | null
          installment_no: number
          organization_id: number
          program_fee_id: number
          program_id: number
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          installment_amount: number
          installment_due_date?: string | null
          installment_no: number
          organization_id: number
          program_fee_id: number
          program_id: number
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          installment_amount?: number
          installment_due_date?: string | null
          installment_no?: number
          organization_id?: number
          program_fee_id?: number
          program_id?: number
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "program_fee_installments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_fee_installments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_fee_installments_program_fee_id_fkey"
            columns: ["program_fee_id"]
            isOneToOne: false
            referencedRelation: "program_fees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_fee_installments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_fee_installments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      program_fees: {
        Row: {
          created_at: string
          created_by: number | null
          currency_code: string | null
          deleted_at: string | null
          description: string | null
          fee: number | null
          fee_end_date: string | null
          fee_start_date: string | null
          id: number
          installment_available: boolean | null
          is_active: boolean | null
          name: string | null
          organization_id: number
          program_id: number
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          currency_code?: string | null
          deleted_at?: string | null
          description?: string | null
          fee?: number | null
          fee_end_date?: string | null
          fee_start_date?: string | null
          id?: number
          installment_available?: boolean | null
          is_active?: boolean | null
          name?: string | null
          organization_id: number
          program_id: number
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          currency_code?: string | null
          deleted_at?: string | null
          description?: string | null
          fee?: number | null
          fee_end_date?: string | null
          fee_start_date?: string | null
          id?: number
          installment_available?: boolean | null
          is_active?: boolean | null
          name?: string | null
          organization_id?: number
          program_id?: number
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "program_fees_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_fees_currency_code_fkey"
            columns: ["currency_code"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["currency_code"]
          },
          {
            foreignKeyName: "program_fees_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_fees_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_fees_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      program_waivers: {
        Row: {
          created_at: string | null
          created_by: number | null
          deleted_at: string | null
          description: string | null
          id: number
          organization_id: number | null
          organization_waiver_id: number | null
          program_id: number | null
          sequence_no: number | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          organization_id?: number | null
          organization_waiver_id?: number | null
          program_id?: number | null
          sequence_no?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          organization_id?: number | null
          organization_waiver_id?: number | null
          program_id?: number | null
          sequence_no?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "program_waivers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_waivers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_waivers_organization_waiver_id_fkey"
            columns: ["organization_waiver_id"]
            isOneToOne: false
            referencedRelation: "organization_waivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_waivers_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_waivers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          birth_year_from: string | null
          birth_year_to: string | null
          coaches: string[] | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          id: number
          image_url: string | null
          is_active: boolean
          max_age: number | null
          min_age: number | null
          name: string | null
          organization_id: number | null
          registration_end_date: string | null
          registration_start_date: string | null
          schedule_id: number | null
          season_id: number | null
          slug: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          birth_year_from?: string | null
          birth_year_to?: string | null
          coaches?: string[] | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean
          max_age?: number | null
          min_age?: number | null
          name?: string | null
          organization_id?: number | null
          registration_end_date?: string | null
          registration_start_date?: string | null
          schedule_id?: number | null
          season_id?: number | null
          slug?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          birth_year_from?: string | null
          birth_year_to?: string | null
          coaches?: string[] | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean
          max_age?: number | null
          min_age?: number | null
          name?: string | null
          organization_id?: number | null
          registration_end_date?: string | null
          registration_start_date?: string | null
          schedule_id?: number | null
          season_id?: number | null
          slug?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "programs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "programs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "programs_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "programs_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "programs_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      saves: {
        Row: {
          id: number
          name: string | null
          team: string | null
          video_url: string | null
        }
        Insert: {
          id?: number
          name?: string | null
          team?: string | null
          video_url?: string | null
        }
        Update: {
          id?: number
          name?: string | null
          team?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saves_name_fkey"
            columns: ["name"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["full_name"]
          },
          {
            foreignKeyName: "saves_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["name"]
          },
        ]
      }
      scheduled_breaks: {
        Row: {
          date: string
          id: number
          reason: string
          schedule: string | null
        }
        Insert: {
          date?: string
          id?: number
          reason?: string
          schedule?: string | null
        }
        Update: {
          date?: string
          id?: number
          reason?: string
          schedule?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_breaks_schedule_fkey"
            columns: ["schedule"]
            isOneToOne: false
            referencedRelation: "schedules"
            referencedColumns: ["name"]
          },
        ]
      }
      schedules: {
        Row: {
          created_at: string
          ends_at: string | null
          fridays: string | null
          id: number
          index: number | null
          is_active: boolean
          location: string | null
          mondays: string | null
          name: string
          organization: string | null
          saturdays: string | null
          season: string | null
          starts_at: string
          sundays: string | null
          thursdays: string | null
          tuesdays: string | null
          video_url: string | null
          wednesdays: string | null
        }
        Insert: {
          created_at?: string
          ends_at?: string | null
          fridays?: string | null
          id?: number
          index?: number | null
          is_active?: boolean
          location?: string | null
          mondays?: string | null
          name: string
          organization?: string | null
          saturdays?: string | null
          season?: string | null
          starts_at: string
          sundays?: string | null
          thursdays?: string | null
          tuesdays?: string | null
          video_url?: string | null
          wednesdays?: string | null
        }
        Update: {
          created_at?: string
          ends_at?: string | null
          fridays?: string | null
          id?: number
          index?: number | null
          is_active?: boolean
          location?: string | null
          mondays?: string | null
          name?: string
          organization?: string | null
          saturdays?: string | null
          season?: string | null
          starts_at?: string
          sundays?: string | null
          thursdays?: string | null
          tuesdays?: string | null
          video_url?: string | null
          wednesdays?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schedules_location_fkey"
            columns: ["location"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "schedules_organization_fkey"
            columns: ["organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "schedules_season_fkey"
            columns: ["season"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["name"]
          },
        ]
      }
      season_attendance: {
        Row: {
          answer: string
          athlete: string
          created_at: string
          date_of_birth: string | null
          id: number
          phone: string
          text_response: string
        }
        Insert: {
          answer?: string
          athlete: string
          created_at?: string
          date_of_birth?: string | null
          id?: number
          phone: string
          text_response: string
        }
        Update: {
          answer?: string
          athlete?: string
          created_at?: string
          date_of_birth?: string | null
          id?: number
          phone?: string
          text_response?: string
        }
        Relationships: []
      }
      season_members: {
        Row: {
          created_at: string
          id: number
          is_active: boolean
          program: string | null
          season_membership_payment_id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          is_active?: boolean
          program?: string | null
          season_membership_payment_id: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          is_active?: boolean
          program?: string | null
          season_membership_payment_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "season_members_program_fkey"
            columns: ["program"]
            isOneToOne: false
            referencedRelation: "season_programs"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "season_members_season_membership_payment_id_fkey"
            columns: ["season_membership_payment_id"]
            isOneToOne: false
            referencedRelation: "season_membership_payments"
            referencedColumns: ["id"]
          },
        ]
      }
      season_membership_payments: {
        Row: {
          address_id: number | null
          customer_name: string
          date_of_birth: string
          full_name: string
          id: number
          paid: number
          phone: string
          total: number
        }
        Insert: {
          address_id?: number | null
          customer_name: string
          date_of_birth: string
          full_name: string
          id?: number
          paid?: number
          phone: string
          total?: number
        }
        Update: {
          address_id?: number | null
          customer_name?: string
          date_of_birth?: string
          full_name?: string
          id?: number
          paid?: number
          phone?: string
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "season_membership_payments_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
        ]
      }
      season_programs: {
        Row: {
          description: string
          discount_ends_at: string | null
          fee: number
          full_description: string | null
          is_active: boolean
          league_discount: number | null
          name: string
          range: string
          season: string
          selected_by_default: boolean
          sort_order: number
        }
        Insert: {
          description?: string
          discount_ends_at?: string | null
          fee?: number
          full_description?: string | null
          is_active?: boolean
          league_discount?: number | null
          name: string
          range: string
          season: string
          selected_by_default?: boolean
          sort_order?: number
        }
        Update: {
          description?: string
          discount_ends_at?: string | null
          fee?: number
          full_description?: string | null
          is_active?: boolean
          league_discount?: number | null
          name?: string
          range?: string
          season?: string
          selected_by_default?: boolean
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "season_programs_season_fkey"
            columns: ["season"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["name"]
          },
        ]
      }
      season_schedules: {
        Row: {
          athlete: string
          cancelled: string | null
          completed: string | null
          duration: string
          event_type: Database["public"]["Enums"]["event_type"]
          id: number
          location: string | null
          manager_phone: string
          phone: string
          starts: string
          title: string
        }
        Insert: {
          athlete: string
          cancelled?: string | null
          completed?: string | null
          duration?: string
          event_type?: Database["public"]["Enums"]["event_type"]
          id?: number
          location?: string | null
          manager_phone?: string
          phone?: string
          starts: string
          title?: string
        }
        Update: {
          athlete?: string
          cancelled?: string | null
          completed?: string | null
          duration?: string
          event_type?: Database["public"]["Enums"]["event_type"]
          id?: number
          location?: string | null
          manager_phone?: string
          phone?: string
          starts?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "season_schedule_location_fkey"
            columns: ["location"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["name"]
          },
        ]
      }
      seasons: {
        Row: {
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          end_date: string | null
          id: number
          is_active: boolean | null
          name: string
          organization_id: number | null
          start_date: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: number
          is_active?: boolean | null
          name: string
          organization_id?: number | null
          start_date?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: number
          is_active?: boolean | null
          name?: string
          organization_id?: number | null
          start_date?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "seasons_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seasons_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seasons_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      slack_channels: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      slack_users: {
        Row: {
          athlete_id: number
          id: number
          username: string
        }
        Insert: {
          athlete_id: number
          id?: number
          username: string
        }
        Update: {
          athlete_id?: number
          id?: number
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "slack_users_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          athlete_id: number
          code: string
          created_at: string
          id: number
          organization_id: number
          price: number
        }
        Insert: {
          athlete_id: number
          code: string
          created_at?: string
          id?: number
          organization_id: number
          price?: number
        }
        Update: {
          athlete_id?: number
          code?: string
          created_at?: string
          id?: number
          organization_id?: number
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "pricing_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pricing_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          created_by: number | null
          deleted_at: string | null
          id: number
          name: string
          sport: string
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          id?: number
          name?: string
          sport?: string
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          id?: number
          name?: string
          sport?: string
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "positions_duplicate_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "positions_duplicate_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          id: number
          kit_number: number | null
          name: string
          position: string
          size: Database["public"]["Enums"]["size"] | null
          status: string
          team_name: string
        }
        Insert: {
          id?: number
          kit_number?: number | null
          name: string
          position?: string
          size?: Database["public"]["Enums"]["size"] | null
          status?: string
          team_name?: string
        }
        Update: {
          id?: number
          kit_number?: number | null
          name?: string
          position?: string
          size?: Database["public"]["Enums"]["size"] | null
          status?: string
          team_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_name_fkey"
            columns: ["name"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["full_name"]
          },
          {
            foreignKeyName: "team_members_team_name_fkey"
            columns: ["team_name"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["name"]
          },
        ]
      }
      team_trainings: {
        Row: {
          duration: number
          id: number
          starts_at: string
          team: string
          venue: string
        }
        Insert: {
          duration?: number
          id?: number
          starts_at?: string
          team?: string
          venue?: string
        }
        Update: {
          duration?: number
          id?: number
          starts_at?: string
          team?: string
          venue?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_trainings_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "team_trainings_venue_fkey"
            columns: ["venue"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["name"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          gender: string | null
          id: number
          logo_url: string | null
          name: string | null
          organization_id: number | null
          schedule_url: string | null
          slug: string | null
          status: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          gender?: string | null
          id?: number
          logo_url?: string | null
          name?: string | null
          organization_id?: number | null
          schedule_url?: string | null
          slug?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          gender?: string | null
          id?: number
          logo_url?: string | null
          name?: string | null
          organization_id?: number | null
          schedule_url?: string | null
          slug?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          author_description: string
          body: string
          created_at: string
          customer_id: number
          feature: boolean
          id: number
          organization_id: number
        }
        Insert: {
          author_description: string
          body: string
          created_at?: string
          customer_id: number
          feature?: boolean
          id?: number
          organization_id?: number
        }
        Update: {
          author_description?: string
          body?: string
          created_at?: string
          customer_id?: number
          feature?: boolean
          id?: number
          organization_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonials_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          activated_at: string | null
          city_town: string | null
          country: string | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          email: string | null
          first_name: string | null
          household_id: number | null
          id: number
          is_activated: boolean | null
          is_locked: boolean | null
          last_name: string | null
          login_attempt: number | null
          password_hash: string | null
          password_reset_expiry: string | null
          password_reset_token: string | null
          phone: string | null
          postal_zip_code: string | null
          registration_verification_token: string | null
          role: string | null
          state_province: string | null
          street_1: string | null
          street_2: string | null
          stripe_customer_id: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          activated_at?: string | null
          city_town?: string | null
          country?: string | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          email?: string | null
          first_name?: string | null
          household_id?: number | null
          id?: number
          is_activated?: boolean | null
          is_locked?: boolean | null
          last_name?: string | null
          login_attempt?: number | null
          password_hash?: string | null
          password_reset_expiry?: string | null
          password_reset_token?: string | null
          phone?: string | null
          postal_zip_code?: string | null
          registration_verification_token?: string | null
          role?: string | null
          state_province?: string | null
          street_1?: string | null
          street_2?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          activated_at?: string | null
          city_town?: string | null
          country?: string | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          email?: string | null
          first_name?: string | null
          household_id?: number | null
          id?: number
          is_activated?: boolean | null
          is_locked?: boolean | null
          last_name?: string | null
          login_attempt?: number | null
          password_hash?: string | null
          password_reset_expiry?: string | null
          password_reset_token?: string | null
          phone?: string | null
          postal_zip_code?: string | null
          registration_verification_token?: string | null
          role?: string | null
          state_province?: string | null
          street_1?: string | null
          street_2?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "users_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
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
      event_type: "TRAINING" | "MATCH" | "MEETING"
      level: "Premier" | "A" | "B" | "C" | "Grassroots"
      size: "L" | "M" | "S" | "XS" | "YXL" | "YL" | "YM" | "YS" | "YXS"
      user_role: "Super Admin" | "Org Admin" | "User"
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
      event_type: ["TRAINING", "MATCH", "MEETING"],
      level: ["Premier", "A", "B", "C", "Grassroots"],
      size: ["L", "M", "S", "XS", "YXL", "YL", "YM", "YS", "YXS"],
      user_role: ["Super Admin", "Org Admin", "User"],
    },
  },
} as const
