import {
    ArrowLeft,
    Grid3X3,
    Magnet,
    Maximize,
    Minus,
    Pencil,
    Plus,
    Ruler,
} from "lucide-react";

import "./PlannerToolbar.css";

export default function PlannerToolbar({ 
    onPageChange,
    room,
    onEditRoom, 
}){
    function formatRoomType(type){
        const roomTypes = {
            "salon": "Salon",
            "yatak-odasi": "Yatak Odası",
            "calisma-odasi": "Çalışma Odası",
            "ofis": "Ofis",
            "diger": "Diğer",
        }
        return roomTypes[type] || "-";
    }

    return (
        <header className="planner-toolbar">

            {/* geri dönüş butonu */}
            <button
                type="button"
                className="planner-toolbar__back-button"
                onClick={() => onPageChange("saved-designs")}
            >
                <ArrowLeft
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                />
                Tasarımlarıma Dön
            </button>

            {/* tasarım bilgileri */}
            <div className="planner-toolbar__design-info">
                <div className="planner-toolbar__info-item">
                    <span className="planner-toolbar__info-label">
                        Tasarım Adı:
                    </span>

                    <span className="planner-toolbar__info-value">
                        {room?.designName || "Yeni Tasarım"}
                    </span>

                    <button
                        type="button"
                        className="planner-toolbar__edit-button"
                        aria-label="Tasarım adını düzenle"
                        onClick={onEditRoom}
                    >
                        <Pencil
                            size={15}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                    </button>
                </div>

                <div className="planner-toolbar__info-item">
                    <span className="planner-toolbar__info-label">
                        Oda Türü:
                    </span>

                    <span className="planner-toolbar__info-value">
                        {room ? formatRoomType(room.type) : "-"}
                    </span>
                </div>

                <div className="planner-toolbar__info-item">
                    <span className="planner-toolbar__info-label">
                        Ölçü:
                    </span>

                    <span className="planner-toolbar__info-value">
                        {room
                            ? `${room.width.toFixed(2)} m × ${room.height.toFixed(2)} m`
                            : "-"}
                    </span>
                </div>
            </div>

            <div className="planner-toolbar__tools">
                <button
                    type="button"
                    className="planner-toolbar__tool-button planner-toolbar__tool-button--active"
                >
                    <Grid3X3
                        size={17}
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />

                    <span>Izgara</span>
                </button>

                <button
                    type="button"
                    className="planner-toolbar__tool-button planner-toolbar__tool-button--active"
                >
                    <Magnet
                        size={17}
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />

                    <span>Izgaraya Yapış</span>
                </button>

                <button
                    type="button"
                    className="planner-toolbar__tool-button"
                >
                    <Ruler
                        size={17}
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />

                    <span>Ölçüler</span>
                </button>
            </div>

            <div className="planner-toolbar__zoom">
                <button
                    type="button"
                    className="planner-toolbar__zoom-button"
                    aria-label="Uzaklaştır"
                >
                    <Minus
                        size={16}
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />
                </button>

                <span className="planner-toolbar__zoom-value">
                    %100
                </span>

                <button
                    type="button"
                    className="planner-toolbar__zoom-button"
                    aria-label="Yakınlaştır"
                >
                    <Plus
                        size={16}
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />
                </button>

                <button
                    type="button"
                    className="planner-toolbar__fullscreen-button"
                    aria-label="Tam ekran"
                >
                    <Maximize
                        size={17}
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />
                </button>
            </div>
        </header>
    )
}