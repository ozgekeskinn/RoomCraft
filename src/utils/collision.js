// İki mobilyanın dikdörtgen alanlarının birbiriyle kesişip kesişmediğini kontrol eder.
export function isColliding(firstItem, secondItem) {
    return (
        firstItem.x < secondItem.x + secondItem.width &&
        firstItem.x + firstItem.width > secondItem.x &&
        firstItem.y < secondItem.y + secondItem.height &&
        firstItem.y + firstItem.height > secondItem.y
    );
}

// Bir mobilyanın hangi mobilyalarla çakıştığını döndürür.
export function getCollidingFurniture(
    furniture,
    furnitureItems
) {
    return furnitureItems.filter((otherFurniture) => {
        if (otherFurniture.id === furniture.id) {
            return false;
        }

        return isColliding(
            furniture,
            otherFurniture
        );
    });
}

// Oda içerisindeki tüm çakışan mobilyaların ID'lerini bulur.
export function getCollidingFurnitureIds(
    furnitureItems
) {
    const collidingIds = new Set();

    for (let i = 0; i < furnitureItems.length; i++) {
        for (
            let j = i + 1;
            j < furnitureItems.length;
            j++
        ) {
            const firstItem = furnitureItems[i];
            const secondItem = furnitureItems[j];

            if (
                isColliding(
                    firstItem,
                    secondItem
                )
            ) {
                collidingIds.add(firstItem.id);
                collidingIds.add(secondItem.id);
            }
        }
    }
    return collidingIds;
}