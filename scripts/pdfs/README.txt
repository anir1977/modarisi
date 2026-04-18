Place PDF files here for the import script to pick up automatically.

Directory structure:
  scripts/pdfs/<niveau>/<matiere>/<chapitre>-<lecon>.pdf

Examples:
  scripts/pdfs/1ere/maths/1-1.pdf        ← 1ere année, Maths, chapitre 1, leçon 1
  scripts/pdfs/1ere/maths/1-2.pdf        ← 1ere année, Maths, chapitre 1, leçon 2
  scripts/pdfs/2eme/pc/3-1.pdf           ← 2ème année, PC, chapitre 3, leçon 1
  scripts/pdfs/1ere/maths/ch1.pdf        ← whole-chapter PDF (processed per lesson)

Niveau values : 1ere | 2eme | 3eme
Matiere values: maths | pc | svt | francais | arabe | islam | hg

If no local PDF is found, the script tries to download from moutamadris.ma.
If that also fails (403 / blocked), it generates content from curriculum metadata
using Claude — so the import always produces something useful.

Running the importer:
  npm run import:cours                    # all content (slow — hundreds of lessons)
  npm run import:cours -- --niveau 1ere  --matiere maths   # one subject
  npm run import:cours -- --chapitre 1   --lecon 1         # single lesson
  npm run import:cours:dry               # preview without writing to Supabase
  npm run import:cours -- --force        # re-generate already-cached lessons
  npm run import:cours -- --skip-pdf     # always generate, never use PDFs
