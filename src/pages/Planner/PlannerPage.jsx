import { 
    useState, 
    useEffect, 
    useRef,
    useCallback,
} from "react";

import {
    calculateFurnitureSubtotal,
    calculateTotal,
    calculateBudgetSummary,
} from "../../utils/calculations.js";

import PlannerToolbar from "../../components/Planner/PlannerToolbar/PlannerToolbar.jsx";
import FurnitureSideBar from "../../components/Planner/FurnitureSideBar/FurnitureSidebar.jsx";
import RoomCanvas from "../../components/Planner/RoomCanvas/RoomCanvas.jsx";
import PropertiesPanel from "../../components/Planner/PropertiesPanel/PropertiesPanel.jsx";
import CostSummary from "../../components/Planner/CostSummary/CostSummary.jsx";
import RoomForm from "../../components/Planner/RoomForm/RoomForm.jsx";
import NotificationToast from "../../components/Shared/NotificationToast/NotificationToast.jsx";
import RoomPropertiesPanel from "../../components/Planner/RoomPropertiesPanel/RoomPropertiesPanel.jsx";

import ConfirmModal from "../../components/Shared/ConfirmModal/ConfirmModal.jsx";

import "./PlannerPage.css";

import furnitureCatalog from "../../data/furnitureCatalog.js";

import {
    getCollidingFurniture,
    getCollidingFurnitureIds,
} from "../../utils/collision.js";

import { 
    getDesignById,
    saveCompleteDesign,
} from "../../services/designService.js";

import {  getFurnitureByDesignId } from "../../services/furnitureService.js";

const MAX_HISTORY = 50;
const ZOOM_LEVELS = [50, 75, 100, 125, 150];

export default function PlannerPage({
    onPageChange,
    template,
    designId,
}){
    console.error(
        "PLANNER'A GELEN DESIGN ID:",
        designId
    );
    const [isRoomFormOpen, setIsRoomFormOpen] = useState(
        !designId && !template
    );
    const [room, setRoom] = useState(null);  // oda verisi
    const [furnitureItems, setFurnitureItems] = useState([]);  // mobilyalar

    const [snapToGrid, setSnapToGrid] = useState(true);

    const [selectedFurnitureId, setSelectedFurnitureId] = useState(null);
    const [budget, setBudget] = useState("");

    const [isSaving, setIsSaving] = useState(false);

    const [pastFurnitureStates, setPastFurnitureStates] = useState([]);
    const [futureFurnitureStates, setFutureFurnitureStates] = useState([]);

    const interactionStartStateRef = useRef(null);
    const [zoomLevel, setZoomLevel] = useState(100);
    const [isClearRoomModalOpen, setIsClearRoomModalOpen] =
    useState(false);

    const [notification, setNotification] = useState(null);
    const notificationTimeoutRef = useRef(null);

    const [activeDesignId, setActiveDesignId] = useState(designId ?? null)
    useEffect(() => {
        setActiveDesignId(designId ?? null);
    }, [designId]);

    const showNotification = useCallback(
        (message, type = "success") => {
            if (notificationTimeoutRef.current) {
                clearTimeout(notificationTimeoutRef.current);
            }

            setNotification({
                message,
                type,
            });

            notificationTimeoutRef.current =
                setTimeout(() => {
                    setNotification(null);
                    notificationTimeoutRef.current = null;
                }, 2500);
        },
        []
    );

    const selectedFurniture = furnitureItems.find (
        (item) => item.id === selectedFurnitureId
    ) || null;

    const collidingFurnitureIds = getCollidingFurnitureIds(furnitureItems);

    const selectedFurnitureCollisions = selectedFurniture
        ? getCollidingFurniture( selectedFurniture, furnitureItems)
        : [];

    const furnitureCount = furnitureItems.length;
    const subtotal = calculateFurnitureSubtotal( furnitureItems );
    const discount = 0;

    const total = calculateTotal(subtotal, discount);

    const {
        budgetAmount,
        remainingBudget,
        isOverBudget,
        exceededAmount,
        budgetUsagePercentage,
    } = calculateBudgetSummary(
        budget,
        total
    );

    const wasOverBudgetRef = useRef(false);
    useEffect(() => {
        if (
            isOverBudget &&
            !wasOverBudgetRef.current
        ) {
            const formattedExceededAmount =
                new Intl.NumberFormat(
                    "tr-TR"
                ).format(exceededAmount);

            showNotification(
                `Bütçenizi ${formattedExceededAmount} TL aştınız.`,
                "warning"
            );
        }
        wasOverBudgetRef.current = isOverBudget;
    }, [
        isOverBudget,
        exceededAmount,
        showNotification,
    ]);

    function handleCreateRoom(roomData){
        setRoom(roomData);
        setIsRoomFormOpen(false);
    }

    function handleEditRoom(){
        setIsRoomFormOpen(true);
    }

    async function handleSaveDesign() {
        if (!room) {
            showNotification("Önce bir oda oluşturmalısınız.","warning");
            return;
        }

        const roomTypeMap = {
            "salon": "Salon",
            "yatak-odasi": "Yatak Odası",
            "calisma-odasi": "Çalışma Odası",
            "ofis": "Ofis",
            "diger": "Diğer",
        };

        const designData = {
            designName: room.designName || "Yeni Tasarım",
            roomType: roomTypeMap[room.type] || room.type,

            roomWidth: room.width,
            roomHeight: room.height,

            wallColor: room.wallColor || null,
            floorColor: room.floorColor || null,

            budget: Number(budget) || 0,
            totalCost: Number(total) || 0,
        };
        const furnitureData = furnitureItems.map((furniture) =>({
            catalogId: String(furniture.catalogId),

            name: furniture.name,
            type: furniture.type,
            category: furniture.category,

            x: furniture.x,
            y: furniture.y,

            width: furniture.width,
            height: furniture.height,

            rotation: furniture.rotation,

            price: furniture.price,
            zIndex: furniture.zIndex,

            isLocked: furniture.isLocked,

            wallSide: furniture.wallSide ?? null,
        }));

        setIsSaving(true);

        const wasExistingDesign = Boolean(activeDesignId);
        const savedDesign = await saveCompleteDesign(activeDesignId,designData,furnitureData);

        setIsSaving(false);
        if (!savedDesign) {
            showNotification("Tasarım kaydedilemedi.","danger");
            return;
        }

        if(!activeDesignId){
            setActiveDesignId(savedDesign.id);
        }

        showNotification(
            wasExistingDesign
                ? "Tasarım başarıyla güncellendi."
                : "Tasarım ve mobilyalar başarıyla kaydedildi.",
            "success"
        );
    }

    function handleCloseRoomForm(){
        setIsRoomFormOpen(false);
    }

    function handleLoadTemplate(template) {
        if (!template) {
            return;
        }

        const roomTypeMap = {
            "Yatak Odası": "yatak-odasi",
            "Çalışma Odası": "calisma-odasi",
            "Salon": "salon",
            "Ofis": "ofis",
        };

        const newRoom = {
            designName: `${template.name} Tasarımı`,
            type: roomTypeMap[template.type] ?? template.type,
            width: template.width,
            height: template.height,
            wallColor: "#F3EFE7",
            floorColor: "#D8C3A5",
        };

        const roomWidthCm = template.width * 100;
        const roomHeightCm = template.height * 100;

        const templateFurniture = template.furniture
            .map((templateItem, index) => {
                const catalogItem = furnitureCatalog.find(
                    (item) =>
                        item.id === templateItem.catalogId
                );

                if (!catalogItem) {
                    return null;
                }

                const rotation = templateItem.rotation ?? 0;

                const isQuarterTurn = rotation === 90 || rotation === 270;

                const width = isQuarterTurn ? catalogItem.defaultHeight : catalogItem.defaultWidth;
                const height = isQuarterTurn ? catalogItem.defaultWidth : catalogItem.defaultHeight;

                const maxX = Math.max(0, roomWidthCm - width);
                const maxY = Math.max(0, roomHeightCm - height);

                let x = Math.max(0, Math.min(templateItem.x ?? 0, maxX));
                let y = Math.max(0, Math.min(templateItem.y ?? 0, maxY));

                const wallSide = templateItem.wallSide ?? null;

                if (wallSide === "top") {
                    y = 0;
                }

                if (wallSide === "bottom") {
                    y = maxY;
                }

                if (wallSide === "left") {
                    x = 0;
                }

                if (wallSide === "right") {
                    x = maxX;
                }

                return {
                    id: crypto.randomUUID(),
                    catalogId: catalogItem.id,
                    type: catalogItem.type,
                    name: catalogItem.name,
                    category: catalogItem.category,

                    x,
                    y,

                    width,
                    height,

                    minWidth: catalogItem.minWidth,
                    minHeight: catalogItem.minHeight,

                    rotation,
                    price: catalogItem.price,

                    image:
                        catalogItem.topViewImage ??
                        catalogItem.image,

                    wallSide,
                    zIndex:
                        catalogItem.type === "rug"
                            ? 1
                            : index + 2,

                    isLocked: false,
                };
            })
            .filter(Boolean);

        setRoom(newRoom);
        setFurnitureItems(templateFurniture);
        setSelectedFurnitureId(null);
        setIsRoomFormOpen(false);
        setPastFurnitureStates([]);
        setFutureFurnitureStates([]);
    }

    useEffect(() => {
        if (!designId) {
            return;
        }
        setIsRoomFormOpen(false);

        async function loadSavedDesign() {
            const design = await getDesignById(designId);
            const savedFurniture = await getFurnitureByDesignId(designId);

            if (!design) {
                showNotification( "Tasarım yüklenemedi.","danger");
                return;
            }

            const roomTypeMap = {
                "Salon": "salon",
                "Yatak Odası": "yatak-odasi",
                "Çalışma Odası": "calisma-odasi",
                "Ofis": "ofis",
                "Diğer": "diger",
            };

            const loadedRoom = {
                designName: design.designName,
                type: roomTypeMap[design.roomType] ?? "diger",

                width: Number(design.roomWidth),
                height: Number(design.roomHeight),

                wallColor: design.wallColor,
                floorColor: design.floorColor,
            };

            const loadedFurniture =
                savedFurniture.map((savedItem) => {
                    const catalogItem = furnitureCatalog.find(
                        (item) =>
                            String(item.id) ===
                            String(savedItem.catalogId)
                        );

                    return {
                        id: crypto.randomUUID(),
                        catalogId: savedItem.catalogId,
                        type: savedItem.type,
                        name: savedItem.name,
                        category: savedItem.category,

                        x: Number(savedItem.x),
                        y: Number(savedItem.y),
                        width: Number(savedItem.width),
                        height:Number(savedItem.height),
                        minWidth:catalogItem?.minWidth ?? 20,
                        minHeight: catalogItem?.minHeight ?? 20,

                        rotation: savedItem.rotation,
                        price: Number(savedItem.price),
                        image:
                            catalogItem?.topViewImage ??
                            catalogItem?.image ??
                            null,

                        wallSide: savedItem.wallSide,
                        zIndex: savedItem.zIndex,
                        isLocked: savedItem.isLocked,
                        isColliding: false,
                    };
                });
            setRoom(loadedRoom);
            setFurnitureItems(loadedFurniture);
            setBudget( String(design.budget ?? 0));
            setSelectedFurnitureId(null);
            setPastFurnitureStates([]);
            setFutureFurnitureStates([]);
            setIsRoomFormOpen(false);
        }
        loadSavedDesign();
    }, [
        designId,
        showNotification,
    ]);

    useEffect(() => {
        if (!template) {
            return;
        }
        handleLoadTemplate(template);
    }, [template]);

    function handleAddFurniture(catalogItem){
        if(!room){
            return;
        }

        const roomWidthCm = room.width * 100;
        const roomHeightCm = room.height * 100;

        const isWallItem =  catalogItem.type === "door" || catalogItem.type === "window";

        const x = Math.max(0,(roomWidthCm - catalogItem.defaultWidth) / 2);

        const y = isWallItem
            ? 0 
            : Math.max(
                0, 
                (roomHeightCm - catalogItem.defaultHeight) / 2
            );
            
        const nextZIndex = 
            furnitureItems.length > 0
                ? Math.max(
                    ...furnitureItems.map(
                        (item) => item.zIndex ?? 1
                    )
                ) + 1
            : 1;

        // oda gridine eklenen eşya oluşturulur.
        const newFurniture = {
            id: crypto.randomUUID(),
            catalogId: catalogItem.id,
            type: catalogItem.type,
            name: catalogItem.name,
            category: catalogItem.category,
            wallSide: isWallItem ? "top" : null,

            x,
            y,

            width: catalogItem.defaultWidth,
            height: catalogItem.defaultHeight,

            minWidth: catalogItem.minWidth,
            minHeight: catalogItem.minHeight,

            rotation: 0,

            price: catalogItem.price,
            image: catalogItem.topViewImage ?? catalogItem.image,

            zIndex: nextZIndex,
            isLocked: false,
            isColliding: false,
        };

        recordFurnitureHistory();
        setFurnitureItems((prevItems) => [
            ...prevItems,
            newFurniture,
        ]);

        setSelectedFurnitureId(newFurniture.id);  // burda yeni eklenen mobilya otomatik olarak seçilir ve PropertiesPanel'de otomatik olarak onun bilgileri gösterilir.

        showNotification( "Mobilya başarıyla eklendi.", "success");
    }

    // mobilya hareket
    function handleMoveFurniture(id, newX, newY) {
        setFurnitureItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id !== id) {
                    return item;
                }

                if (item.isLocked) {
                    return item;
                }

                return {
                    ...item,
                    x: newX,
                    y: newY,
                };
            })
        );
    }

    function handleKeyboardMoveFurniture(id, deltaX, deltaY) {
        if (!room || !id) {
            return;
        }

        const furniture = furnitureItems.find(
            (item) => item.id === id
        );

        if (!furniture || furniture.isLocked) {
            return;
        }

        recordFurnitureHistory();

        handleUpdateFurniture(id, {
            x: furniture.x + deltaX,
            y: furniture.y + deltaY,
        });
    }

    function handleDeleteFurniture(id) {
        if (!id) {
            return;
        }
        recordFurnitureHistory();
        // bu ID dışındaki bütün mobilyaları getir
        setFurnitureItems((prevItems) =>
            prevItems.filter((item) => item.id !== id)
        );

        // silinen mobilya seçilirse var olmayan ID kalmasın diye seçimi temizler.
        setSelectedFurnitureId((prevId) =>
            prevId === id ? null : prevId
        );
        showNotification("Mobilya tasarımdan kaldırıldı.","danger");
    }

    // kopyalama
    function handleDuplicateFurniture(id) {
        if (!room || !id) {
            return;
        }

        const furnitureToCopy = furnitureItems.find(
            (item) => item.id === id
        );

        if (!furnitureToCopy) {
            return;
        }

        const roomWidthCm = room.width * 100;
        const roomHeightCm = room.height * 100;

        const maxX = roomWidthCm - furnitureToCopy.width;
        const maxY = roomHeightCm - furnitureToCopy.height;
        const OFFSET = 20;

        // 20 cm sağ ve 20 cm aşağı kaydırır
        let newX = furnitureToCopy.x + OFFSET;
        let newY = furnitureToCopy.y + OFFSET;

        // Mobilya sağ veya alt sınıra çok yakınsa kopyayı ters yönde kaydır.
    
        if (newX > maxX) {
            newX = Math.max(
                0,
                furnitureToCopy.x - OFFSET
            );
        }

        if (newY > maxY) {
            newY = Math.max(
                0,
                furnitureToCopy.y - OFFSET
            );
        }

        const nextZIndex = 
            Math.max(
                ...furnitureItems.map(
                    (item) => item.zIndex ?? 1
                )
            ) + 1;

        const duplicatedFurniture = {
            ...furnitureToCopy,
            id: crypto.randomUUID(),
            x: newX,
            y: newY,
            zIndex: nextZIndex,
            isColliding: false,
        };

        recordFurnitureHistory();
        setFurnitureItems((prevItems) => [
            ...prevItems,
            duplicatedFurniture,
        ]);

        setSelectedFurnitureId(duplicatedFurniture.id );
        showNotification( "Mobilya kopyalandı.", "success");
    }

    function handleRotateFurniture(id) {
        if (!room || !id) {
            return;
        }

        const furnitureToRotate = furnitureItems.find((item) => item.id === id);

        if (!furnitureToRotate || furnitureToRotate.isLocked) {
            return;
        }

        recordFurnitureHistory();

        setFurnitureItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id !== id) {
                    return item;
                }

                if (item.isLocked) {
                    return item;
                }

                const nextRotation =
                    (item.rotation + 90) % 360;

                /*
                    90 derece döndüğümüzde mobilyanın odada kapladığı genişlik ve yükseklik yer değiştirir.

                    Örnek: 
                    90 x 190 yatak
                       ↓
                    190 x 90
                */

                const nextWidth = item.height;
                const nextHeight = item.width;

                const roomWidthCm = room.width * 100;
                const roomHeightCm = room.height * 100;

                // Döndürülen mobilya odaya hiçbir şekilde sığmıyorsa dönüş işlemini yapma.
                if (
                    nextWidth > roomWidthCm ||
                    nextHeight > roomHeightCm
                ) {
                    return item;
                }

                const maxX = roomWidthCm - nextWidth;
                const maxY = roomHeightCm - nextHeight;

                // Mobilya duvara yakınken döndürülürse oda dışına taşmaması için tekrar sınırlandır.

                const nextX = Math.max(0, Math.min(item.x, maxX));

                const nextY = Math.max(0, Math.min(item.y, maxY));

                return {
                    ...item,
                    rotation: nextRotation,
                    width: nextWidth,
                    height: nextHeight,
                    x: nextX,
                    y: nextY,
                };
            })
        );
    }

    function handleUpdateFurniture(id, updates) {
        if (!room || !id) {
            return;
        }

        setFurnitureItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id !== id) {
                    return item;
                }

                if (item.isLocked) {
                    return item;
                }

                const roomWidthCm = room.width * 100;
                const roomHeightCm = room.height * 100;

                const minWidth = item.minWidth ?? 20;
                const minHeight = item.minHeight ?? 20;

                // Önce mevcut mobilya ile gelen yeni değerleri birleştiriyoruz.
                const updatedItem = {
                    ...item,
                    ...updates,
                };

                // Genişlik ve yükseklik değerlerini güvenli aralıkta tut.
                const nextWidth = Math.min(
                    Math.max(
                        Number(updatedItem.width) || minWidth,
                        minWidth
                    ),
                    roomWidthCm
                );

                const nextHeight = Math.min(
                    Math.max(
                        Number(updatedItem.height) || minHeight,
                        minHeight
                    ),
                    roomHeightCm
                );

                //Yeni boyuta göre mobilyanın gidebileceği maksimum X/Y değişebilir.
                const maxX = Math.max(0, roomWidthCm - nextWidth);
                const maxY = Math.max(0, roomHeightCm - nextHeight);

                const nextX = Math.max(
                    0,
                    Math.min(
                        Number(updatedItem.x) || 0,
                        maxX
                    )
                );

                const nextY = Math.max(
                    0,
                    Math.min(
                        Number(updatedItem.y) || 0,
                        maxY
                    )
                );

                return {
                    ...updatedItem,
                    x: nextX,
                    y: nextY,
                    width: nextWidth,
                    height: nextHeight,
                };
            })
        );
    }

    function handlePropertyFurnitureUpdate(id, updates) {
        if (!room || !id) {
            return;
        }

        const furniture = furnitureItems.find(
            (item) => item.id === id
        );

        if (!furniture || furniture.isLocked) {
            return;
        }

        const hasChanged = Object.entries(updates).some(
            ([field, value]) =>
                Number(furniture[field]) !== Number(value)
        );

        if (!hasChanged) {
            return;
        }

        recordFurnitureHistory();
        handleUpdateFurniture(id, updates);
    }

    function handleToggleFurnitureLock(id){
        if(!id){
            return;
        }

        setFurnitureItems((prevItems) => 
            prevItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        isLocked: !item.isLocked,
                    }
                    : item
            )
        );
    }

    function handleChangeFurnitureWall(id, newWallSide) {
        if (!id || !room) {
            return;
        }

        const roomWidthCm = room.width * 100;
        const roomHeightCm = room.height * 100;

        setFurnitureItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id !== id) {
                    return item;
                }

                const isWallItem = item.type === "door" || item.type === "window";

                if (!isWallItem || item.isLocked) {
                    return item;
                }

                const longSide = Math.max(item.width, item.height);

                const thickness = 10; //kalınlık

                switch (newWallSide) {
                    case "top":
                        return {
                            ...item,
                            wallSide: "top",
                            width: longSide,
                            height: thickness,
                            rotation: 0,
                            x: Math.max(
                                0,
                                (roomWidthCm - longSide) / 2
                            ),
                            y: 0,
                        };

                    case "bottom":
                        return {
                            ...item,
                            wallSide: "bottom",
                            width: longSide,
                            height: thickness,
                            rotation: 180,
                            x: Math.max(0, (roomWidthCm - longSide) / 2),
                            y: roomHeightCm - thickness,
                        };

                    case "left":
                        return {
                            ...item,
                            wallSide: "left",
                            width: thickness,
                            height: longSide,
                            rotation: 270,
                            x: 0,
                            y: Math.max(0, (roomHeightCm - longSide) / 2),
                        };

                    case "right":
                        return {
                            ...item,
                            wallSide: "right",
                            width: thickness,
                            height: longSide,
                            rotation: 90,
                            x: roomWidthCm - thickness,
                            y: Math.max(0, (roomHeightCm - longSide) / 2),
                        };

                    default:
                        return item;
                }
            })
        );
    }

    function handleBringFurnitureForward(id) {
        if (!id) {
            return;
        }

        setFurnitureItems((prevItems) => {
            const currentFurniture = prevItems.find(
                (item) => item.id === id
            );

            if (!currentFurniture) {
                return prevItems;
            }

            const furnitureAbove = prevItems.filter(
                    (item) =>
                        item.zIndex > currentFurniture.zIndex
                )
                .sort(
                    (a, b) => a.zIndex - b.zIndex
                )[0];

            if (!furnitureAbove) {
                return prevItems;
            }

            return prevItems.map((item) => {
                if (item.id === currentFurniture.id) {
                    return {
                        ...item,
                        zIndex: furnitureAbove.zIndex,
                    };
                }

                if (item.id === furnitureAbove.id) {
                    return {
                        ...item,
                        zIndex: currentFurniture.zIndex,
                    };
                }

                return item;
            });
        });
    }

    function handleSendFurnitureBackward(id) {
        if (!id) {
            return;
        }

        setFurnitureItems((prevItems) => {
            const currentFurniture = prevItems.find(
                (item) => item.id === id
            );

            if (!currentFurniture) {
                return prevItems;
            }

            const furnitureBelow = prevItems
                .filter(
                    (item) =>
                        item.zIndex < currentFurniture.zIndex
                )
                .sort(
                    (a, b) => b.zIndex - a.zIndex
                )[0];

            if (!furnitureBelow) {
                return prevItems;
            }

            return prevItems.map((item) => {
                if (item.id === currentFurniture.id) {
                    return {
                        ...item,
                        zIndex: furnitureBelow.zIndex,
                    };
                }

                if (item.id === furnitureBelow.id) {
                    return {
                        ...item,
                        zIndex: currentFurniture.zIndex,
                    };
                }

                return item;
            });
        });
    }

    function handleBringFurnitureToFront(id) {
        if (!id) {
            return;
        }

        setFurnitureItems((prevItems) => {
            const maxZIndex = Math.max(
                ...prevItems.map(
                    (item) => item.zIndex ?? 1
                )
            );

            return prevItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        zIndex: maxZIndex + 1,
                    }
                    : item
            );
        });
    }

    function handleSendFurnitureToBack(id) {
        if (!id) {
            return;
        }

        setFurnitureItems((prevItems) => {
            const currentFurniture = prevItems.find(
                (item) => item.id === id
            );

            if (!currentFurniture) {
                return prevItems;
            }

            return prevItems.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        zIndex: 1,
                    };
                }

                return {
                    ...item,
                    zIndex:
                        item.zIndex < currentFurniture.zIndex
                            ? item.zIndex + 1
                            : item.zIndex,
                };
            });
        });
    }

    // geçmiş işlemler
    function recordFurnitureHistory() {
        setPastFurnitureStates((prevStates) => [
            ...prevStates.slice(-(MAX_HISTORY - 1)),
            furnitureItems,
        ]);

        setFutureFurnitureStates([]);
    }

    function handleFurnitureInteractionStart() {
        interactionStartStateRef.current = furnitureItems;
    }    

    function handleFurnitureInteractionEnd() {
        const startState = interactionStartStateRef.current;

        if (!startState) {
            return;
        }

        const hasChanged = JSON.stringify(startState) !== JSON.stringify(furnitureItems);

        if (hasChanged) {
            setPastFurnitureStates((prevStates) => [
                ...prevStates.slice(-(MAX_HISTORY - 1)),
                startState,
            ]);

            setFutureFurnitureStates([]);
        }
        interactionStartStateRef.current = null;
    }

    function handleUndo() {
        if (pastFurnitureStates.length === 0) {
            return;
        }

        const previousState = pastFurnitureStates[pastFurnitureStates.length - 1];

        setPastFurnitureStates((prevStates) => prevStates.slice(0, -1));

        setFutureFurnitureStates((prevStates) => [
            furnitureItems,
            ...prevStates,
        ].slice(0, MAX_HISTORY));

        setFurnitureItems(previousState);
        setSelectedFurnitureId(null);
        showNotification("Geri alma işlemi gerçekleştirildi.","info");
    }

    function handleRedo() {
        if (futureFurnitureStates.length === 0) {
            return;
        }

        const nextState = futureFurnitureStates[0];

        setFutureFurnitureStates((prevStates) => prevStates.slice(1));

        setPastFurnitureStates((prevStates) => [
            ...prevStates,
            furnitureItems,
        ].slice(-MAX_HISTORY));

        setFurnitureItems(nextState);
        setSelectedFurnitureId(null);
        showNotification("İleri alma işlemi gerçekleştirildi.","info");
    }

    function handleZoomIn() {
        setZoomLevel((currentZoom) => {
            const nextZoom = ZOOM_LEVELS.find(
                (level) => level > currentZoom
            );

            return nextZoom ?? currentZoom;
        });
    }

    function handleZoomOut() {
        setZoomLevel((currentZoom) => {
            const previousZoom = [...ZOOM_LEVELS]
                .reverse()
                .find((level) => level < currentZoom);

            return previousZoom ?? currentZoom;
        });
    }

    function handleResetZoom() {
        setZoomLevel(100);
    }

    function handleFitRoom() {
        setZoomLevel(100);
    }

    function handleClearRoom() {
        if (furnitureItems.length === 0) {
            return;
        }
        setIsClearRoomModalOpen(true);
    }

    function handleConfirmClearRoom() {
        if (furnitureItems.length === 0) {
            setIsClearRoomModalOpen(false);
            return;
        }
        recordFurnitureHistory();
        setFurnitureItems([]);
        setSelectedFurnitureId(null);
        setIsClearRoomModalOpen(false);
        showNotification("Odadaki tüm mobilyalar kaldırıldı.","danger");
    }

    function handleCancelClearRoom() {
        setIsClearRoomModalOpen(false);
    }

    useEffect(() => {
        return () => {
            if (notificationTimeoutRef.current) {
                clearTimeout(
                    notificationTimeoutRef.current
                );
            }
        };
    }, []);

    const canUndo = pastFurnitureStates.length > 0;
    const canRedo = futureFurnitureStates.length > 0;

    useEffect(() => {
        function handleKeyDown(event) {
            const target = event.target;

            const isTyping =
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.tagName === "SELECT" ||
                target.isContentEditable;

            if (isTyping) {
                return;
            }

            // CTRL + Z → Undo
            if (event.ctrlKey && event.key.toLowerCase() === "z") {
                event.preventDefault();
                handleUndo();
                return;
            }

            // CTRL + Y → Redo
            if (event.ctrlKey && event.key.toLowerCase() === "y") {
                event.preventDefault();
                handleRedo();
                return;
            }

            // ESC → seçimi kaldır
            if (event.key === "Escape") {
                setSelectedFurnitureId(null);
                return;
            }

            // Bundan sonraki işlemler için
            // seçili mobilya olması gerekiyor.
            if (!selectedFurnitureId) {
                return;
            }

            // DELETE → sil
            if (event.key === "Delete") {
                event.preventDefault();
                handleDeleteFurniture(selectedFurnitureId);
                return;
            }

            // R → döndür
            if (event.key.toLowerCase() === "r") {
                event.preventDefault();
                handleRotateFurniture( selectedFurnitureId);
                return;
            }

            // CTRL + D → kopyala
            if (event.ctrlKey && event.key.toLowerCase() === "d") {
                event.preventDefault();
                handleDuplicateFurniture(selectedFurnitureId);
                return;
            }

            const moveAmount = event.shiftKey ? 50 : 10;

            switch (event.key) {
                case "ArrowUp":
                    event.preventDefault();
                    handleKeyboardMoveFurniture(selectedFurnitureId, 0, -moveAmount);
                    break;

                case "ArrowDown":
                    event.preventDefault();
                    handleKeyboardMoveFurniture(selectedFurnitureId, 0, moveAmount);
                    break;

                case "ArrowLeft":
                    event.preventDefault();
                    handleKeyboardMoveFurniture(selectedFurnitureId, -moveAmount, 0);
                    break;

                case "ArrowRight":
                    event.preventDefault();
                    handleKeyboardMoveFurniture(selectedFurnitureId, moveAmount, 0);
                    break;

                default:
                    break;
            }
        }

        window.addEventListener( "keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [
        selectedFurnitureId,
        furnitureItems,
        room,
        pastFurnitureStates,
        futureFurnitureStates,
    ]);

    return (
        <section className="planner-page">
            <div className="page-container planner-page__container">

                {/*üst araç alanı */}
                <PlannerToolbar 
                    onPageChange={onPageChange}
                    room={room}
                    onEditRoom={handleEditRoom}

                    snapToGrid={snapToGrid}
                    onToggleSnapToGrid={() =>
                        setSnapToGrid((prev) => !prev)
                    }

                    onUndo={handleUndo}
                    onRedo={handleRedo}
                    canUndo={canUndo}
                    canRedo={canRedo}

                    zoomLevel={zoomLevel}
                    onZoomIn={handleZoomIn}
                    onZoomOut={handleZoomOut}
                    onResetZoom={handleResetZoom}
                    onFitRoom={handleFitRoom}

                    onClearRoom={handleClearRoom}
                    canClearRoom={furnitureItems.length > 0}

                    onSaveDesign={handleSaveDesign}
                    canSaveDesign={Boolean(room)}
                    isSaving={isSaving}
                />

                {/* Bootstrap Grid */}
                <div className="row g-3 planner-page__workspace">

                    {/* Sol panel */}
                    <aside className="col-12 col-lg-2">
                        <div className="planner-page__sidebar">
                            <FurnitureSideBar 
                                onAddFurniture={handleAddFurniture}
                            />
                        </div>
                    </aside>

                    {/* Orta oda alanı */}
                    <section
                        className="col-12 col-lg-7"
                        aria-label="Oda tasarım alanı"
                    >
                        <div className="planner-page__canvas-area">
                            <RoomCanvas 
                                room={room}
                                furnitureItems={furnitureItems}
                                selectedFurnitureId={selectedFurnitureId}
                                onSelectFurniture={setSelectedFurnitureId}
                                onMoveFurniture={handleMoveFurniture}
                                onUpdateFurniture={handleUpdateFurniture}

                                snapToGrid={snapToGrid}
                                collidingFurnitureIds={collidingFurnitureIds}

                                onInteractionStart={handleFurnitureInteractionStart}
                                onInteractionEnd={handleFurnitureInteractionEnd}

                                zoomLevel={zoomLevel}
                            />
                        </div>        
                    </section>

                    {/* Sağ panel */}
                    <aside className="col-12 col-lg-3">
                        <div className="planner-page__right-panel">
                            <PropertiesPanel 
                                furniture={selectedFurniture}
                                onDeleteFurniture={handleDeleteFurniture}
                                onDuplicateFurniture={handleDuplicateFurniture}
                                onRotateFurniture={handleRotateFurniture}
                                onUpdateFurniture={handlePropertyFurnitureUpdate}
                                onToggleFurnitureLock={handleToggleFurnitureLock}
                                onChangeFurnitureWall={handleChangeFurnitureWall}

                                onBringFurnitureForward={handleBringFurnitureForward}
                                onSendFurnitureBackward={handleSendFurnitureBackward}
                                onBringFurnitureToFront={handleBringFurnitureToFront}
                                onSendFurnitureToBack={handleSendFurnitureToBack}

                                collisions={selectedFurnitureCollisions}
                            />
                            <RoomPropertiesPanel
                                room={room}
                                snapToGrid={snapToGrid}
                                onEditRoom={handleEditRoom}
                            />
                        </div>
                    </aside>
                </div>

                {/* Alt maliyet alanı */}
                <div className="planner-page__cost">
                    <CostSummary 
                        furnitureCount={furnitureCount}
                        subtotal={subtotal}
                        discount={discount}
                        total={total}

                        budget={budget}
                        onBudgetChange={setBudget}

                        remainingBudget={remainingBudget}
                        budgetUsagePercentage={budgetUsagePercentage}

                        isOverBudget={isOverBudget}
                        exceededAmount={exceededAmount}
                    />
                </div>
            </div>

            {/* oda oluşturma modalı */}
            {isRoomFormOpen && (
                <div 
                    className="planner-page__modal-overlay"
                    onClick={handleCloseRoomForm}
                >
                    <div
                        className="planner-page__modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="room-form-title"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <RoomForm 
                            onCreateRoom={handleCreateRoom}
                            initialRoom={room}
                            onClose={handleCloseRoomForm}
                        />
                    </div>
                </div>
            )}

            <ConfirmModal
                isOpen={isClearRoomModalOpen}
                title="Tüm Mobilyaları Temizle"
                message="Odadaki bütün mobilyalar silinecek. Devam etmek istiyor musunuz?"
                confirmText="Tümünü Temizle"
                cancelText="Vazgeç"
                danger={true}
                onConfirm={handleConfirmClearRoom}
                onCancel={handleCancelClearRoom}
            />

            <NotificationToast
                notification={notification}
                onClose={() => setNotification(null) }
            />
        </section>
    );
}