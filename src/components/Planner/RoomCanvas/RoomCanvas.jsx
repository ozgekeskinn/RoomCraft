import FurnitureItem from "../FurnitureItem/FurnitureItem.jsx";
import "./RoomCanvas.css";

import { useRef } from "react";

const GRID_SIZE_CM = 10;  // Mobilyalar 10 cm'lik adımlara hizalanacak.

export default function RoomCanvas({ 
    room,
    furnitureItems = [], 
    selectedFurnitureId,
    onSelectFurniture,
    onMoveFurniture,
    onUpdateFurniture,
    snapToGrid,
    collidingFurnitureIds,

    onInteractionStart,
    onInteractionEnd,

    zoomLevel = 100,
}) {
    const roomRef = useRef(null);

    // sürükleme için
    const dragRef = useRef({
        furnitureId: null,  // başta hiçbir şey sürüklenmez 
        offsetX: 0,
        offsetY: 0,
    });

    const resizeRef = useRef({
        furnitureId: null,

        startPointerX: 0,
        startPointerY: 0,

        startWidth: 0,
        startHeight: 0,
    });

    function handleFurniturePointerDown(event, furniture) {
        event.stopPropagation();
        if (furniture.isLocked) {
            return;
        }

        const roomElement = roomRef.current;
        if (!roomElement) {
            return;
        }

        onInteractionStart?.();

        const roomRect = roomElement.getBoundingClientRect();
        const pointerX = ((event.clientX - roomRect.left) / scale) * 100;
        const pointerY = ((event.clientY - roomRect.top) / scale) * 100;

        dragRef.current = {
            furnitureId: furniture.id,
            offsetX: pointerX - furniture.x,
            offsetY: pointerY - furniture.y,
        };

        onSelectFurniture(furniture.id);

        roomElement.setPointerCapture(event.pointerId); // pointer anlık oda elementi dışına çıkarsa, pointer'ı bırakana kadar hareket eventlerini gönderir
    }

    function handleResizePointerDown(event, furniture) {
        event.preventDefault();
        event.stopPropagation();

        if (furniture.isLocked) {
            return;
        }

        const roomElement = roomRef.current;
        if (!roomElement) {
            return;
        }

        onInteractionStart?.();

        const roomRect = roomElement.getBoundingClientRect();
        const pointerX = ((event.clientX - roomRect.left) / scale) * 100;
        const pointerY = ((event.clientY - roomRect.top) / scale) * 100;

        resizeRef.current = {
            furnitureId: furniture.id,

            startPointerX: pointerX,
            startPointerY: pointerY,

            startWidth: furniture.width,
            startHeight: furniture.height,
        };

        onSelectFurniture(furniture.id);

        roomElement.setPointerCapture(event.pointerId);
    }

    function handlePointerMove(event) {
        // Önce resize işlemi var mı kontrol et. Resize varsa sürükleme koduna geçme.
        if (resizeRef.current.furnitureId) {
            const {
                furnitureId,
                startPointerX,
                startPointerY,
                startWidth,
                startHeight,
            } = resizeRef.current;

            const roomElement = roomRef.current;

            if (!roomElement) {
                return;
            }

            const furniture = furnitureItems.find(
                (item) => item.id === furnitureId
            );

            if (!furniture) {
                return;
            }

            const roomRect = roomElement.getBoundingClientRect();

            const pointerX = ((event.clientX - roomRect.left) / scale) * 100;
            const pointerY = ((event.clientY - roomRect.top) / scale) * 100;

            const deltaX = pointerX - startPointerX;
            const deltaY = pointerY - startPointerY;

            let nextWidth = startWidth + deltaX;
            let nextHeight = startHeight + deltaY;

            // Izgaraya yapışma açıksa boyutları da en yakın 10 cm değerine yuvarla.
            if (snapToGrid) {
                nextWidth = Math.round( nextWidth / GRID_SIZE_CM ) * GRID_SIZE_CM;
                nextHeight = Math.round( nextHeight / GRID_SIZE_CM ) * GRID_SIZE_CM;
            }

            const roomWidthCm = room.width * 100;
            const roomHeightCm = room.height * 100;

            const minWidth = furniture.minWidth ?? 20
            const minHeight = furniture.minHeight ?? 20;

            // Mobilyanın mevcut X/Y konumuna göre büyüyebileceği maksimum alan.
            const maxWidth = roomWidthCm - furniture.x;
            const maxHeight = roomHeightCm - furniture.y;

            const boundedWidth = Math.max(
                minWidth,
                Math.min(nextWidth, maxWidth)
            );

            const boundedHeight = Math.max(
                minHeight,
                Math.min(nextHeight, maxHeight)
            );

            onUpdateFurniture(
                furnitureId,
                {
                    width: boundedWidth,
                    height: boundedHeight,
                }
            );

            return;
        }

        // Resize yoksa normal sürükleme işlemi.
        const { furnitureId, offsetX, offsetY } = dragRef.current;

        if (!furnitureId) {
            return;
        }

        const roomElement = roomRef.current;

        if (!roomElement) {
            return;
        }

        const draggedFurniture = furnitureItems.find(
            (item) => item.id === furnitureId
        );

        if (!draggedFurniture) {
            return;
        }

        const roomRect = roomElement.getBoundingClientRect();

        const pointerX = ((event.clientX - roomRect.left) / scale) * 100;

        const pointerY = ((event.clientY - roomRect.top) / scale) * 100;
        
        const rawX = pointerX - offsetX;
        const rawY = pointerY - offsetY;

        let nextX = snapToGrid
            ? Math.round(rawX / 10) * 10
            : rawX;

        let nextY = snapToGrid
            ? Math.round(rawY / 10) * 10
            : rawY;

        /*
            Izgaraya yapışma açıksa mobilyanın konumunu en yakın GRID_SIZE_CM değerine yuvarla.

            Örnek:
            23 cm -> 20 cm
            27 cm -> 30 cm
        */
        if (snapToGrid) {
            nextX =
                Math.round(nextX / GRID_SIZE_CM) *
                GRID_SIZE_CM;

            nextY =
                Math.round(nextY / GRID_SIZE_CM) *
                GRID_SIZE_CM;
        }

        const roomWidthCm = room.width * 100;
        const roomHeightCm = room.height * 100;

        const maxX = roomWidthCm - draggedFurniture.width;
        const maxY = roomHeightCm - draggedFurniture.height;

        // Mobilyanın oda sınırlarının dışına çıkmasını engelle.

        let boundedX = Math.max(0, Math.min(nextX, maxX));
        let boundedY = Math.max(0, Math.min(nextY, maxY));

        const isWallItem =
            draggedFurniture.type === "door" ||
            draggedFurniture.type === "window";

        if (isWallItem) {
            switch (draggedFurniture.wallSide) {
                case "top":
                    boundedY = 0;
                    break;

                case "bottom":
                    boundedY = maxY;
                    break;

                case "left":
                    boundedX = 0;
                    break;

                case "right":
                    boundedX = maxX;
                    break;

                default:
                    boundedY = 0;
                    break;
            }
        }

        onMoveFurniture(
            furnitureId,
            boundedX,
            boundedY
        );
    }

    function handlePointerUp(event) {
        const hadActiveInteraction =
            Boolean(
                dragRef.current.furnitureId ||
                resizeRef.current.furnitureId
            );

        dragRef.current = {
            furnitureId: null,
            offsetX: 0,
            offsetY: 0,
        };

        resizeRef.current = {
            furnitureId: null,
            startPointerX: 0,
            startPointerY: 0,
            startWidth: 0,
            startHeight: 0,
        };

        if (hadActiveInteraction) {
            onInteractionEnd?.();
        }

        const roomElement = roomRef.current;

        if (roomElement && roomElement.hasPointerCapture(event.pointerId)
        ) {
            roomElement.releasePointerCapture(
                event.pointerId
            );
        }
    }

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

    const fitScale = Math.min(
        BASE_SCALE,
        MAX_ROOM_WIDTH / room.width,
        MAX_ROOM_HEIGHT / room.height
    );

    const scale = fitScale * (zoomLevel / 100) ;

    const roomWidthPx = room.width * scale;
    const roomHeightPx = room.height * scale;
    const gridSizePx = (GRID_SIZE_CM / 100) * scale;

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
                        ref={roomRef}
                        className="room-canvas__room"
                        onPointerDown={(event) => {
                            if (event.target === event.currentTarget) {
                                onSelectFurniture(null);
                            }
                        }}

                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}

                        style={{
                            width: `${roomWidthPx}px`,
                            height: `${roomHeightPx}px`,
                            backgroundColor: room.floorColor,
                            borderColor: room.wallColor,
                        }}
                    >
                        <div 
                            className="room-canvas__grid" 
                            style={{
                                backgroundSize:
                                    `${gridSizePx}px ${gridSizePx}px`,
                            }}
                        />

                        {/* odaya eklenen mobilyalar */}
                        {furnitureItems.map((furniture) =>(
                            <FurnitureItem
                                key={furniture.id}
                                furniture={furniture}
                                scale={scale}
                                isSelected={
                                    selectedFurnitureId === furniture.id
                                }
                                isColliding={
                                    collidingFurnitureIds.has(
                                        furniture.id
                                    )
                                }
                                onPointerDown= {handleFurniturePointerDown}
                                onResizePointerDown={handleResizePointerDown}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}