import { Pencil } from "lucide-react";
import "./RoomPropertiesPanel.css";

const roomTypeLabels = {
    salon: "Salon",
    "yatak-odasi": "Yatak Odası",
    "calisma-odasi": "Çalışma Odası",
    ofis: "Ofis",
    diger: "Diğer",
};

export default function RoomPropertiesPanel({
    room,
    snapToGrid,
    onEditRoom,
}) {
    if (!room) {
        return null;
    }

    const roomType = roomTypeLabels[room.type] ?? room.type;

    return (
        <section className="room-properties-panel">
            <h2 className="room-properties-panel__title">
                Oda Özellikleri
            </h2>

            <div className="room-properties-panel__content">
                <div className="room-properties-panel__row">
                    <span>Oda Adı</span>
                    <strong>{room.designName}</strong>
                </div>

                <div className="room-properties-panel__row">
                    <span>Oda Türü</span>
                    <strong>{roomType}</strong>
                </div>

                <div className="room-properties-panel__row">
                    <span>Genişlik</span>
                    <strong>
                        {Number(room.width).toFixed(2)} m
                    </strong>
                </div>

                <div className="room-properties-panel__row">
                    <span>Uzunluk</span>
                    <strong>
                        {Number(room.height).toFixed(2)} m
                    </strong>
                </div>

                <div className="room-properties-panel__row">
                    <span>Duvar Rengi</span>
                    <div className="room-properties-panel__color">
                        <span
                            className="room-properties-panel__color-swatch"
                            style={{
                                backgroundColor: room.wallColor,
                            }}
                        />
                        <strong>
                            {room.wallColor?.toUpperCase()}
                        </strong>
                    </div>
                </div>

                <div className="room-properties-panel__row">
                    <span>Zemin Rengi</span>
                    <div className="room-properties-panel__color">
                        <span
                            className="room-properties-panel__color-swatch"
                            style={{
                                backgroundColor: room.floorColor,
                            }}
                        />
                        <strong>
                            {room.floorColor?.toUpperCase()}
                        </strong>
                    </div>
                </div>

                <div className="room-properties-panel__row">
                    <span>Izgara</span>
                    <strong>Açık</strong>
                </div>

                <div className="room-properties-panel__row">
                    <span>Izgaraya Yapış</span>
                    <strong>
                        {snapToGrid ? "Açık" : "Kapalı"}
                    </strong>
                </div>
            </div>

            <button
                type="button"
                className="room-properties-panel__edit"
                onClick={onEditRoom}
            >
                <Pencil
                    size={16}
                    strokeWidth={1.8}
                    aria-hidden="true"
                />
                    Oda Özelliklerini Düzenle
            </button>
        </section>
    );
}