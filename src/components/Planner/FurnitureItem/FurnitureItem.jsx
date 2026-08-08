import "./FurnitureItem.css";

export default function FurnitureItem({
    furniture,
    scale,
    isSelected,
    onSelect,
}) {
    const widthPx = (furniture.width / 100) * scale;
    const heightPx = (furniture.height / 100) * scale;
    const xPx = (furniture.x / 100) * scale;
    const yPx = (furniture.y / 100) * scale;

    return (
        <div
            className={`furniture-item ${
                isSelected
                    ? "furniture-item--selected"
                    : ""
            }`}
            style={{
                left: `${xPx}px`,
                top: `${yPx}px`,

                width: `${widthPx}px`,
                height: `${heightPx}px`,

                zIndex: furniture.zIndex,
                transform: `rotate(${furniture.rotation}deg)`,
            }}
            onClick={(e) => {
                e.stopPropagation();
                onSelect(furniture.id);
            }}
        >
            {furniture.image ? (
                <img
                    src={furniture.image}
                    alt={furniture.name}
                    className="furniture-item__image"
                />
            ) : (
                <span className="furniture-item__name">
                    {furniture.name}
                </span>
            )}
        </div>
    );
}