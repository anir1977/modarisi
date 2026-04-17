-- ── cours_content (AI-generated lesson cache) ────────────────────────────────
CREATE TABLE IF NOT EXISTS cours_content (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  matiere     text NOT NULL,
  niveau      text NOT NULL,
  chapitre    text NOT NULL,
  lecon       text NOT NULL,
  content     jsonb NOT NULL,
  created_at  timestamptz DEFAULT now(),
  UNIQUE(matiere, niveau, chapitre, lecon)
);

-- RLS: anyone can read cached lessons; only server role can insert/update
ALTER TABLE cours_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read cours_content"
  ON cours_content FOR SELECT
  USING (true);

CREATE POLICY "service role write cours_content"
  ON cours_content FOR ALL
  USING (auth.role() = 'service_role');

-- ── user_progress (per-student lesson completion) ─────────────────────────────
CREATE TABLE IF NOT EXISTS user_progress (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      uuid REFERENCES auth.users NOT NULL,
  matiere      text NOT NULL,
  niveau       text NOT NULL,
  chapitre     text NOT NULL,
  lecon        text NOT NULL,
  completed_at timestamptz DEFAULT now(),
  UNIQUE(user_id, matiere, niveau, chapitre, lecon)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users read own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "users insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users delete own progress"
  ON user_progress FOR DELETE
  USING (auth.uid() = user_id);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson ON user_progress(user_id, matiere, niveau);
CREATE INDEX IF NOT EXISTS idx_cours_content_lookup ON cours_content(matiere, niveau, chapitre, lecon);
