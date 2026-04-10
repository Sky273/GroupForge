# GroupForge

GroupForge est une application Next.js pour concevoir visuellement des groupes, les instancier dans des événements, puis affecter des personnes ou des sous-groupes via une interface orientée canevas.

## Stack
- Next.js 16
- TypeScript
- Tailwind CSS v4
- Zustand
- dnd-kit
- Zod
- Prisma
- PostgreSQL

## État actuel
Cette première itération pose le socle du produit :
- app shell premium clair/sombre
- dashboard produit
- vues fondation pour événements, modèles, personnes, éditeur, paramètres
- prototype visuel du canevas
- schéma Prisma MVP
- premiers stores et schémas de validation

## Lancer le projet
```bash
npm install
cp .env.example .env.local
npx prisma generate
npm run dev
```

## Base de données locale
GroupForge repasse sur **PostgreSQL**.

Exemple de connexion locale :
```env
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/groupforge?schema=public"
```

Quand ta base PostgreSQL est prête :
```bash
npm run db:push
npm run db:seed
```

## Variables d'environnement
Copier `.env.example` vers `.env.local` puis renseigner :
- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_URL`

## Priorités de build
1. Auth et shell applicatif robuste
2. Prisma + PostgreSQL
3. CRUD people / events / templates
4. vrai éditeur de modèles
5. instanciation modèle → groupe
6. drag and drop des affectations
7. persistance + QA
