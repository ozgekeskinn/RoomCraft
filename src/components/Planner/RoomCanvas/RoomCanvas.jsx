import FurnitureItem from "../FurnitureItem/FurnitureItem.jsx";
import "./RoomCanvas.css";

export default function RoomCanvas({ 
    room,
    furnitureItems = [], 
    selectedFurnitureId,
    onSelectFurniture,
}) {
    if (!room) {
        return (
            <div className="room-canvas__empty">
                <p>Oda henüz oluşturulmadı.</p>
            </div>
        );
    }

    /*
        Temel ölçek:
        1 metre = 100 piksel

        Örnek:
        5 m × 4 m
        ↓
        500 px × 400 px

        Oda ekrana sığmıyorsa scale otomatik küçülür.
    */

    const MAX_ROOM_WIDTH = 650;
    const MAX_ROOM_HEIGHT = 500;
    const BASE_SCALE = 100;

    const scale = Math.min(
        BASE_SCALE,
        MAX_ROOM_WIDTH / room.width,
        MAX_ROOM_HEIGHT / room.height
    );

    const roomWidthPx = room.width * scale;
    const roomHeightPx = room.height * scale;

    return (
        <div className="room-canvas">

            <div className="room-canvas__stage">
                {/* üst genişlik ölçüsü */}
                <div 
                    className="room-canvas__measurement room-canvas__measurement--width"
                    style={{
                        width: `${roomWidthPx}px`
                    }}
                >
                    <span>{room.width} m</span>
                </div>

                <div className="room-canvas__room-wrapper">
                    {/* sol yükseklik ölçüsü */}
                    <div
                        className="room-canvas__measurement room-canvas__measurement--height"
                        style={{
                            height: `${roomHeightPx}px`,
                        }}
                    >
                        <span>{room.height} m</span>
                    </div>

                    {/* gerçek oda */}
                    <div
                        className="room-canvas__room"
                        style={{
                            width: `${roomWidthPx}px`,
                            height: `${roomHeightPx}px`,
                            backgroundColor: room.floorColor,
                            borderColor: room.wallColor,
                        }}
                        onClick={() => onSelectFurniture(null)}
                    >
                        <div className="room-canvas__grid" />

                        {/* odaya eklenen mobilyalar */}
                        {furnitureItems.map((furniture) =>(
                            <FurnitureItem
                                key={furniture.id}
                                furniture={furniture}
                                scale={scale}
                                isSelected={
                                    selectedFurnitureId === furniture.id
                                }
                                onSelect={onSelectFurniture}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}