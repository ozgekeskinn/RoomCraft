import {
    ArrowLeft,
    Grid3X3,
    Magnet,
    Maximize,
    Minus,
    Pencil,
    Plus,
    Ruler,
    Save,
    Undo2,
    Redo2,
    Trash2,
} from "lucide-react";

import "./PlannerToolbar.css";

export default function PlannerToolbar({ 
    onPageChange,
    room,
    onEditRoom, 
    snapToGrid,
    onToggleSnapToGrid,

    onUndo,
    onRedo,
    canUndo,
    canRedo,

    zoomLevel,
    onZoomIn,
    onZoomOut,
    onResetZoom,
    onFitRoom,

    onClearRoom,
    canClearRoom,

    onSaveDesign,
    canSaveDesign,
    isSaving,
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
                    className="planner-toolbar__tool-button"
                    onClick={onUndo}
                    disabled={!canUndo}
                    aria-label="Geri al"
                    title="Geri Al"
                >
                    <Undo2
                        size={17}
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />

                    <span>Geri Al</span>
                </button>

                <button
                    type="button"
                    className="planner-toolbar__tool-button"
                    onClick={onRedo}
                    disabled={!canRedo}
                    aria-label="İleri al"
                    title="İleri Al"
                >
                    <Redo2
                        size={17}
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />

                    <span>İleri Al</span>
                </button>

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
                    className={`planner-toolbar__tool-button ${
                        snapToGrid
                            ? "planner-toolbar__tool-button--active"
                            : ""
                    }`}
                    onClick={onToggleSnapToGrid}
                    aria-pressed={snapToGrid}
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

                <button
                    type="button"
                    className="planner-toolbar__tool-button planner-toolbar__tool-button--save"
                    onClick={onSaveDesign}
                    disabled={!canSaveDesign || isSaving}
                    title="Tasarımı Kaydet"
                >
                    <Save
                        size={17}
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />

                    <span>
                        {isSaving
                            ? "Kaydediliyor..."
                            : "Kaydet"
                        }
                    </span>
                </button>

                <button
                    type="button"
                    className="planner-toolbar__tool-button planner-toolbar__tool-button--danger"
                    onClick={onClearRoom}
                    disabled={!canClearRoom}
                    title="Tüm Mobilyaları Temizle"
                >
                    <Trash2
                        size={17}
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />

                    <span>Temizle</span>
                </button>
            </div>

            <div className="planner-toolbar__zoom">
                <button
                    type="button"
                    className="planner-toolbar__zoom-button"
                    aria-label="Uzaklaştır"
                    onClick={onZoomOut}
                    disabled={zoomLevel <= 50}
                >
                    <Minus
                        size={16}
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />
                </button>

                <span className="planner-toolbar__zoom-value">
                    <button
                        type="button"
                        className="planner-toolbar__zoom-value"
                        onClick={onResetZoom}
                        title="%100'e dön"
                    >
                        %{zoomLevel}
                    </button>
                </span>

                <button
                    type="button"
                    className="planner-toolbar__zoom-button"
                    aria-label="Yakınlaştır"
                    onClick={onZoomIn}
                    disabled={zoomLevel >= 150}
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
                    aria-label="Ekrana Sığdır"
                    onClick={onFitRoom}
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