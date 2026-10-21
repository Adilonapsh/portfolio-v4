/**
 * Cache config for everything that comes from the admin API.
 *
 * Kenapa 24 jam?
 * Sebelumnya semua fetch pakai `revalidate: 60`. Efeknya bukan cuma data yang
 * di-refresh tiap menit, tapi SETIAP halaman yang memakai fetch tersebut
 * (landing page `/`, `/projects`, dan semua `/projects/[slug]`) ikut menjadi
 * ISR dengan revalidate 60 detik. Setiap revalidate = 1 ISR write di Vercel,
 * jadi 1 landing page saja bisa ~43.000 writes/bulan.
 *
 * Portofolio tidak berubah tiap menit, jadi 24 jam dipakai sebagai safety net
 * saja. Untuk update instan setelah edit project, panggil `/api/revalidate`
 * (lihat app/api/revalidate/route.ts) yang akan menghapus tag di bawah.
 */
export const PROJECTS_TAG = 'projects'

// 24 jam. Harus sama dengan `export const revalidate` di app/page.tsx,
// app/projects/page.tsx, dan app/projects/[slug]/page.tsx.
export const PROJECT_CACHE_TTL_SECONDS = 86_400

export const projectTag = (slug: string) => `${PROJECTS_TAG}:${slug}`
