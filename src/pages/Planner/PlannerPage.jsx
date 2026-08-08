import { useState } from "react";

import PlannerToolbar from "../../components/Planner/PlannerToolbar/PlannerToolbar.jsx";
import FurnitureSideBar from "../../components/Planner/FurnitureSideBar/FurnitureSidebar.jsx";
import RoomCanvas from "../../components/Planner/RoomCanvas/RoomCanvas.jsx";
import PropertiesPanel from "../../components/Planner/PropertiesPanel/PropertiesPanel.jsx";
import CostSummary from "../../components/Planner/CostSummary/CostSummary.jsx";
import RoomForm from "../../components/Planner/RoomForm/RoomForm.jsx";
import "./PlannerPage.css";
import { Calculator } from "lucide-react";

export default function PlannerPage({ onPageChange }){
    const [isRoomFormOpen, setIsRoomFormOpen] = useState(true);
    const [room, setRoom] = useState(null);
    const [furnitureItems, setFurnitureItems] = useState([]);

    const [selectedFurnitureId, setSelectedFurnitureId] = useState(null);
    const selectedFurniture = furnitureItems.find (
        (item) => item.id === selectedFurnitureId
    ) || null;

    function handleCreateRoom(roomData){
        setRoom(roomData);
        setIsRoomFormOpen(false);
    }

    function handleEditRoom(){
        setIsRoomFormOpen(true);
    }

    function handleCloseRoomForm(){
        setIsRoomFormOpen(false);
    }

    function handleAddFurniture(catalogItem){
        if(!room){
            return;
        }

        const roomWidthCm = room.width * 100;
        const roomHeightCm = room.height * 100;

        const x = Math.max(
            0,
            (roomWidthCm - catalogItem.defaultWidth) / 2
        );

        const y = Math.max(
            0,
            (roomHeightCm - catalogItem.defaultHeight) / 2
        );

        const newFurniture = {
            id: crypto.randomUUID(),
            catalogId: catalogItem.id,
            type: catalogItem.type,
            name: catalogItem.name,
            category: catalogItem.category,

            x,
            y,

            width: catalogItem.defaultWidth,
            height: catalogItem.defaultHeight,

            minWidth: catalogItem.minWidth,
            minHeight: catalogItem.minHeight,

            rotation: 0,

            price: catalogItem.price,
            image: catalogItem.image,

            zIndex: 1,
            isLocked: false,
            isColliding: false,
        };

        setFurnitureItems((prevItems) => [
            ...prevItems,
            newFurniture,
        ]);

        setSelectedFurnitureId(newFurniture.id);
    }

    return (
        <section className="planner-page">
            <div className="page-container planner-page__container">

                {/*üst araç alanı */}
                <PlannerToolbar 
                    onPageChange={onPageChange}
                    room={room}
                    onEditRoom={handleEditRoom}
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
                                onSelectedFurniture={setSelectedFurnitureId}
                            />
                        </div>        
                    </section>

                    {/* Sağ panel */}
                    <aside className="col-12 col-lg-3">
                        <div>
                            <PropertiesPanel />
                        </div>
                    </aside>
                </div>

                {/* Alt maliyet alanı */}
                <div className="planner-page__cost">
                    <CostSummary />
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
        </section>
    );
}