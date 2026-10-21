// Catatan: fungsi-fungsi di file ini dipanggil dari Client Component
// (app/components/faq.tsx, app/components/career-section.tsx,
// app/about/experience-list.tsx), jadi `fetch` berjalan di browser.
// Opsi `next.revalidate` tidak berlaku di browser dan tidak memengaruhi ISR.
// Kalau nanti dipindah ke Server Component, pakai `PROJECT_CACHE_TTL_SECONDS`
// + `tags` dari lib/cache.ts supaya tidak jadi ISR 60 detik lagi.
const API_BASE_URL = process.env.NEXT_URL_API || "https://admin-porto.truenapsh.my.id/api";

export async function fetchCareers() {
  try {
    const res = await fetch(`${API_BASE_URL}/career`);
    if (!res.ok) {
      console.error("Failed to fetch careers, status:", res.status);
      return [];
    }
    const result = await res.json();
    return result.data || [];
  } catch (e) {
    console.error("Failed to fetch careers:", e);
    return [];
  }
}

export async function fetchFaqs() {
  try {
    const res = await fetch(`${API_BASE_URL}/faq`);
    if (!res.ok) {
      console.error("Failed to fetch faqs, status:", res.status);
      return [];
    }
    const result = await res.json();
    return result.data || [];
  } catch (e) {
    console.error("Failed to fetch faqs:", e);
    return [];
  }
}

export async function fetchSettings() {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`);
    if (!res.ok) {
      console.error("Failed to fetch settings, status:", res.status);
      return {};
    }
    const result = await res.json();
    return result.data || {};
  } catch (e) {
    console.error("Failed to fetch settings:", e);
    return {};
  }
}
