This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Cache & revalidation

Semua data project di-cache 24 jam (`lib/cache.ts`), bukan 60 detik lagi.
Ini membuat landing page dan halaman project hanya menulis ISR cache sekali
per hari, bukan sekali per menit.

Untuk menampilkan perubahan dari admin API secara instan, set environment
variable `REVALIDATE_SECRET` (lokal dan di Vercel), lalu panggil:

```bash
# Semua halaman project
curl -X POST "https://<domain>/api/revalidate?secret=<REVALIDATE_SECRET>"

# Satu project saja
curl -X POST "https://<domain>/api/revalidate?secret=<REVALIDATE_SECRET>&slug=<slug>"
```

Endpoint ini menghapus tag `projects` (Data Cache) dan me-revalidate `/`,
`/projects`, serta `/projects/<slug>`. Panggil endpoint ini dari admin panel
setelah project ditambah/diubah/dihapus (bisa lewat webhook).

Catatan: `app/projects/[slug]/page.tsx` memakai `dynamicParams = false`.
Project baru tetap butuh deploy ulang agar masuk `generateStaticParams`;
edit/hapus project yang sudah ada cukup lewat endpoint di atas.
