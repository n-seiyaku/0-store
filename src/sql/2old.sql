DROP TABLE IF EXISTS love_sentences;

CREATE TABLE IF NOT EXISTS love_sentences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sentence TEXT NOT NULL,
  is_loving_caring BOOLEAN NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sentence ON love_sentences(sentence);
