const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5243";

const API_URL = `${API_BASE_URL}/api/designs`;

export async function getAllDesigns() {
  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Tasarımlar alınamadı.");
    }

    const designs = await response.json();
    return designs;
  } catch (error) {
    console.error("Tasarımlar getirilirken hata oluştu:", error);
    return [];
  }
}

export async function createDesign(design) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(design),
    });

    if (!response.ok) {
      throw new Error("Tasarım Kaydedilemedi.");
    }

    const createdDesign = await response.json();
    return createdDesign;
  } catch (error) {
    console.error("Tasarım Kaydedilirken Hata Oluştu: ", error);
    return null;
  }
}

export async function deleteDesign(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Tasarım silinemedi");
    }

    return true;
  } catch (error) {
    console.error("Tasarım silinirken hata oluştu: ", error);

    return false;
  }
}

export async function updateDesign(id, design) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(design),
    });

    if (!response.ok) {
      throw new Error("Tasarım Güncellenemedi.");
    }

    return true;
  } catch (error) {
    console.error("Tasarım Güncellenirken Hata Oluştu:", error);

    return false;
  }
}

export async function getDesignById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Tasarım getirilemedi.");
    }

    const design = await response.json();
    return design;
  } catch (error) {
    console.error("Tasarım getirilirken hata oluştu:", error);
    return null;
  }
}

export async function saveCompleteDesign(designId, design, furnitureItems) {
  try {
    const isExistingDesign = Boolean(designId);

    const url = isExistingDesign
      ? `${API_URL}/${designId}/complete`
      : `${API_URL}/complete`;

    const method = isExistingDesign ? "PUT" : "POST";
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        design,
        furnitureItems,
      }),
    });

    if (!response.ok) {
      throw new Error("Tasarım Kaydedilemedi.");
    }

    return await response.json();
  } catch (error) {
    console.error("Tasarım Kaydedilirken Hata Oluştu:", error);
    return null;
  }
}
