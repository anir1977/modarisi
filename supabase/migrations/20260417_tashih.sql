-- ── tashih_corrections table ──────────────────────────────────────────────────
-- Stores metadata for each AI correction (not the full content, to save space)

CREATE TABLE IF NOT EXISTS tashih_corrections (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       uuid REFERENCES auth.users NOT NULL,
  matiere       text NOT NULL,
  niveau        text NOT NULL,
  chapitre      text,
  type_exercice text NOT NULL,
  exercice      text,                       -- truncated enoncé (max 1000 chars)
  note          smallint CHECK (note >= 0 AND note <= 20),
  badge         text CHECK (badge IN ('Excellent', 'Bien', 'À améliorer', 'À reprendre')),
  has_image     boolean DEFAULT false,
  created_at    timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS tashih_corrections_user_id_idx ON tashih_corrections(user_id);
CREATE INDEX IF NOT EXISTS tashih_corrections_created_at_idx ON tashih_corrections(created_at DESC);

-- RLS
ALTER TABLE tashih_corrections ENABLE ROW LEVEL SECURITY;

-- Users can only read and insert their own corrections
CREATE POLICY "tashih_corrections_select_own"
  ON tashih_corrections FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "tashih_corrections_insert_own"
  ON tashih_corrections FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admins (service role) can read all
-- (service role bypasses RLS by default)
