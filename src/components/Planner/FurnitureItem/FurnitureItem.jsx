import "./FurnitureItem.css";

export default function FurnitureItem({
    furniture,
    scale,
    isSelected,
    isColliding,
    onPointerDown,
    onResizePointerDown,
}) {
    const widthPx = (furniture.width / 100) * scale;
    const heightPx = (furniture.height / 100) * scale;

    const isDoor = furniture.type === "door";
    const isWindow = furniture.type === "window";
    const isWallItem = isDoor || isWindow;

    const xPx = (furniture.x / 100) * scale;
    const yPx = (furniture.y / 100) * scale;

    const isQuarterTurn = furniture.rotation === 90 || furniture.rotation === 270;
    
    const wallImageSizePx = Math.max(widthPx, heightPx);
    const windowVisualThicknessPx = 22;

    const isVerticalWall =
        furniture.wallSide === "left" ||
        furniture.wallSide === "right";

    const wallVisualWidthPx = isDoor
        ? wallImageSizePx
        : isVerticalWall
            ? windowVisualThicknessPx
            : wallImageSizePx;

    const wallVisualHeightPx = isDoor
        ? wallImageSizePx
        : isVerticalWall
            ? wallImageSizePx
            : windowVisualThicknessPx;

    const getWallVisualPosition = () => {
        switch (furniture.wallSide) {
            case "top":
                return {
                    left: "50%",
                    top: 0,
                    transform: "translateX(-50%)",
                };

            case "bottom":
                return {
                    left: "50%",
                    bottom: 0,
                    transform: "translateX(-50%)",
                };

            case "left":
                return {
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                };

            case "right":
                return {
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                };

            default:
                return {};
        }
    };

    const wallVisualPosition = getWallVisualPosition();

    const imageWidthPx = isQuarterTurn
        ? heightPx
        : widthPx;

    const imageHeightPx = isQuarterTurn
        ? widthPx
        : heightPx;

    const windowLengthPx = Math.max(widthPx, heightPx);
    const windowThicknessPx = 20;
    const windowRotation = isVerticalWall
        ? 90
        : 0;

    return (
        <div
            className={[
                "furniture-item",

                isSelected
                    ? "furniture-item--selected"
                    : "",

                isColliding
                    ? "furniture-item--colliding"
                    : "",

                isWallItem
                    ? "furniture-item--wall"
                    : "",

                isWallItem
                    ? `furniture-item--wall-${furniture.wallSide}`
                    : "",

                isDoor
                    ? "furniture-item--door"
                    : "",

                isWindow
                    ? "furniture-item--window"
                    : "",
            ]
                .filter(Boolean)
                .join(" ")}
                
            style={{
                left: `${xPx}px`,
                top: `${yPx}px`,

                width: `${widthPx}px`,
                height: `${heightPx}px`,

                zIndex: furniture.zIndex,
            }}

            onPointerDown={(event) => 
                onPointerDown(event, furniture)
            }

            onClick={(e) => {
                e.stopPropagation();
            }}
        >

        {furniture.image ? (
            isWindow ? (
                <img
                    src={furniture.image}
                    alt={furniture.name}
                    draggable={false}
                    className="furniture-item__image furniture-item__image--window"
                    style={{
                        width: `${windowLengthPx}px`,
                        height: `${windowThicknessPx}px`,

                        left: "50%",
                        top: "50%",

                        transform: `
                            translate(-50%, -50%)
                            rotate(${windowRotation}deg)
                        `,
                    }}
                />
            ) : isDoor ? (
                <div
                    className="furniture-item__wall-visual"
                    style={{
                        width: `${wallVisualWidthPx}px`,
                        height: `${wallVisualHeightPx}px`,
                        ...wallVisualPosition,
                    }}
                >
                    <img
                        src={furniture.image}
                        alt={furniture.name}
                        draggable={false}
                        className="furniture-item__image furniture-item__image--wall"
                        style={{
                            width: "100%",
                            height: "100%",

                            transform: `
                                translate(-50%, -50%)
                                rotate(${furniture.rotation}deg)
                            `,
                        }}
                    />
                </div>
            ) : (
                <img
                    src={furniture.image}
                    alt={furniture.name}
                    draggable={false}
                    className="furniture-item__image"
                    style={{
                        width: `${isQuarterTurn ? heightPx : widthPx}px`,
                        height: `${isQuarterTurn ? widthPx : heightPx}px`,

                        transform: `
                            translate(-50%, -50%)
                            rotate(${furniture.rotation}deg)
                        `,
                    }}
                />
            )
        ) : (
            <span className="furniture-item__name">
                {furniture.name}
            </span>
        )}

            {isSelected && !furniture.isLocked && (
                <button
                    type="button"
                    className="furniture-item__resize-handle"
                    aria-label={`${furniture.name} boyutunu değiştir`}
                    onPointerDown={(event) =>
                        onResizePointerDown(
                            event,
                            furniture
                        )
                    }
                />
            )}
        </div>
    );
}