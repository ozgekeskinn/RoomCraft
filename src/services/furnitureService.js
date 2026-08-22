const API_URL = "http://localhost:5243/api/furniture";

export async function addFurniture(furniture) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(furniture),
        });

        if (!response.ok) {
            throw new Error("Mobilya kaydedilemedi.");
        }
        return true;
    }
    catch (error) {
        console.error("Mobilya kaydedilirken hata oluştu:", error);
        return false;
    }
}

export async function getFurnitureByDesignId(designId) {
    try {
        const response = await fetch(`${API_URL}/design/${designId}`);

        if (!response.ok) {
            throw new Error("Mobilyalar alınamadı.");
        }

        const furnitureItems = await response.json();
        return furnitureItems;
    }
    catch (error) {
        console.error("Mobilyalar getirilirken hata oluştu:", error);
        return [];
    }
}

export async function deleteFurnitureByDesignId(designId) {
    try {
        const response = await fetch(`${API_URL}/design/${designId}`,
            {
                method: "DELETE",
            }
        );

        if(!response.ok){
            throw new Error("Tasarıma Ait Mobilyalar Silinemedi.");
        }

        return true;
    } catch (error) {
        console.error("Mobilyalar Silinirken Hata Oluştu.", error);
        return false;
    }
}