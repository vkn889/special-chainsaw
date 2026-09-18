// Generated from the live Supabase schema (mcp: generate_typescript_types).
// Regenerate after changing tables/columns rather than hand-editing.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.15";
  };
  public: {
    Tables: {
      events: {
        Row: {
          created_at: string;
          description: string;
          end_time: string | null;
          event_date: string;
          id: string;
          image_path: string | null;
          location: string;
          registration_url: string | null;
          start_time: string;
          timezone: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          end_time?: string | null;
          event_date: string;
          id?: string;
          image_path?: string | null;
          location?: string;
          registration_url?: string | null;
          start_time: string;
          timezone?: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          end_time?: string | null;
          event_date?: string;
          id?: string;
          image_path?: string | null;
          location?: string;
          registration_url?: string | null;
          start_time?: string;
          timezone?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      session_stories: {
        Row: {
          body: string;
          created_at: string;
          id: string;
          image_path: string | null;
          session_type: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          body: string;
          created_at?: string;
          id?: string;
          image_path?: string | null;
          session_type?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          body?: string;
          created_at?: string;
          id?: string;
          image_path?: string | null;
          session_type?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
