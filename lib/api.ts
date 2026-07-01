const API_BASE_URL = process.env.NEXT_URL_API || "https://admin-porto.truenapsh.my.id/api";

export async function fetchCareers() {
  try {
    const res = await fetch(`${API_BASE_URL}/career`, {
      next: { revalidate: 60 },
    });
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
    const res = await fetch(`${API_BASE_URL}/faq`, {
      next: { revalidate: 60 },
    });
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
    const res = await fetch(`${API_BASE_URL}/settings`, {
      next: { revalidate: 60 },
    });
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
