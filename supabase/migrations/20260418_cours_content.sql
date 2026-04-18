-- ── cours_content — AI-generated lesson content cache ────────────────────────
-- Note: a more granular per-lesson version of this table already exists from
-- the previous migration (20260417_cours.sql). This migration adds IF NOT EXISTS
-- guards so it is safe to run in any environment.

CREATE TABLE IF NOT EXISTS cours_content (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  niveau     text NOT NULL,
  matiere    text NOT NULL,
  chapitre   text NOT NULL,
  lecon      text NOT NULL DEFAULT '1',
  content    jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(matiere, niveau, chapitre, lecon)
);

-- RLS: anyone can read; only service role can write
ALTER TABLE cours_content ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'cours_content' AND policyname = 'public read cours_content'
  ) THEN
    CREATE POLICY "public read cours_content"
      ON cours_content FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'cours_content' AND policyname = 'service role write cours_content'
  ) THEN
    CREATE POLICY "service role write cours_content"
      ON cours_content FOR ALL USING (auth.role() = 'service_role');
  END IF;
END $$;

-- Fast lookup index
CREATE INDEX IF NOT EXISTS idx_cours_content_lookup
  ON cours_content(matiere, niveau, chapitre, lecon);
