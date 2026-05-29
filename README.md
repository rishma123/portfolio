# Rishma Merkaje Nanaiah — Portfolio

Personal portfolio website for Rishma Merkaje Nanaiah, Frontend Engineer specialising in Angular and enterprise UI systems.

**Live:** [rishma123.github.io/portfolio](https://rishma123.github.io/portfolio) *(deploy to update)*

---

## Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Animations:** Framer Motion
- **Theme:** Light / Dark toggle (next-themes)
- **Icons:** Lucide React

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Install and run

```bash
# Clone the repo
git clone https://github.com/rishma123/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for production

```bash
npm run build
```

Output goes to the `dist/` folder. Deploy that folder to any static host (Vercel, Netlify, GitHub Pages).

---

## Project Structure

```
src/
├── components/
│   ├── About.tsx        # Bio, education, stats
│   ├── Contact.tsx      # Email, LinkedIn, GitHub, phone
│   ├── Experience.tsx   # Work history with tech stack tags
│   ├── Hero.tsx         # Landing section
│   ├── Navbar.tsx       # Navigation + theme toggle
│   ├── Projects.tsx     # Angular Component Analyzer + thesis
│   ├── Skills.tsx       # Skill groups with tags
│   └── ui/              # shadcn/ui component library
├── pages/
│   └── Home.tsx         # Section order: Hero → About → Skills → Experience → Projects → Contact
├── index.css            # CSS variables for light + dark theme
└── main.tsx             # App entry point
```

---

## Sections

| Section | Description |
|---|---|
| Hero | Name, title, CTA buttons |
| About | Bio paragraphs, education, stat cards (5+, 7, 2018, E2E) |
| Skills | Grouped skill tags: Frontend, Backend, DevOps, Testing, etc. |
| Experience | EnBW, LIRA, Bosch, Infopine — role, achievements, stack |
| Projects | Angular Component Analyzer (Next.js + Groq AI), HeaderGen thesis |
| Contact | Email, LinkedIn, GitHub, phone number |

---

## Theme

Both light and dark themes are fully supported. All colours use CSS variables defined in `index.css` under `:root` (light) and `.dark` (dark). No hardcoded dark colours anywhere in components.

Toggle is in the top-right of the navbar.

---

## Deployment

### Vercel (recommended)

1. Go to [vercel.com](https://vercel.com) → Import Git Repository
2. Select `rishma123/portfolio`
3. Framework preset: **Vite**
4. Deploy — done

### Netlify

1. Go to [netlify.com](https://netlify.com) → Add new site → Import from Git
2. Select `rishma123/portfolio`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

---

## Contact

**Rishma Merkaje Nanaiah**
- Email: merkajenanaiah@gmail.com
- LinkedIn: [linkedin.com/in/rishma97](https://www.linkedin.com/in/rishma97/)
- GitHub: [github.com/rishma123](https://github.com/rishma123)
- Location: Erfurt, Germany
