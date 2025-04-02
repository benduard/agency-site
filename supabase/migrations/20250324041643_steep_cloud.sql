/*
  # Create consultation requests table

  1. New Tables
    - `consultation_requests`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text)
      - `service` (text)
      - `company_name` (text)
      - `problems` (text)
      - `additional_info` (text, nullable)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `consultation_requests` table
    - Add policy for authenticated users to read their own data
    - Add policy for anyone to insert data
*/

CREATE TABLE IF NOT EXISTS consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  service text NOT NULL,
  company_name text NOT NULL,
  problems text NOT NULL,
  additional_info text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert consultation requests"
  ON consultation_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can read own consultation requests"
  ON consultation_requests
  FOR SELECT
  TO authenticated
  USING (email = auth.email());