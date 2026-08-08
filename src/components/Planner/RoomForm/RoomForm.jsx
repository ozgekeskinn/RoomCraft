import "./RoomForm.css";
import { X } from "lucide-react";

export default function RoomForm({ 
    onCreateRoom, 
    initialRoom,
    onClose 
}) {
    function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const roomData = {
            designName: formData.get("designName"),
            type: formData.get("roomType"),
            width: Number(formData.get("roomWidth")),
            height: Number(formData.get("roomHeight")),
            wallColor: formData.get("wallColor"),
            floorColor: formData.get("floorColor"),
        };

        onCreateRoom(roomData);
    }

    return (
        <section className="room-form">
            <div className="room-form__header">
                <div className="room-form__header-content">
                    <span className="room-form__eyebrow">
                        {initialRoom ? "Tasarımı Düzenle" : "Yeni Tasarım"}
                    </span>

                    <h2 
                        id="room-form-title"
                        className="room-form__title"
                    >
                        {initialRoom ? "Oda Bilgilerini Düzenle" : "Odanı Oluştur"}
                    </h2>

                    <p className="room-form__description">
                        Tasarıma başlamadan önce oda bilgilerini belirle.
                    </p>           
                </div>

                <button
                    type="button"
                    className="room-form__close-button"
                    onClick={onClose}
                    aria-label="Pencereyi kapat"
                >
                    <X
                        size={20}
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />
                </button>
            </div>

            <form 
                className="room-form__form"
                onSubmit={handleSubmit}
            >

                {/* Tasarım adı */}
                <div className="room-form__field">
                    <label
                        htmlFor="designName"
                        className="room-form__label"
                    >
                        Tasarım Adı
                    </label>

                    <input
                        type="text"
                        id="designName"
                        name="designName"
                        className="room-form__input"
                        defaultValue={initialRoom?.designName || "Yeni Tasarım"}
                        required
                    />
                </div>

                {/* Oda türü */}
                <div className="room-form__field">
                    <label
                        htmlFor="roomType"
                        className="room-form__label"
                    >
                        Oda Türü
                    </label>

                    <select
                        id="roomType"
                        name="roomType"
                        className="room-form__select"
                        defaultValue={initialRoom?.type || "salon"}
                    >
                        <option value="salon">
                            Salon
                        </option>

                        <option value="yatak-odasi">
                            Yatak Odası
                        </option>

                        <option value="calisma-odasi">
                            Çalışma Odası
                        </option>

                        <option value="ofis">
                            Ofis
                        </option>

                        <option value="diger">
                            Diğer
                        </option>
                    </select>
                </div>

                {/* Oda ölçüleri */}
                <div className="room-form__group">
                    <div className="room-form__field">
                        <label
                            htmlFor="roomWidth"
                            className="room-form__label"
                        >
                            Oda Genişliği
                        </label>

                        <div className="room-form__input-wrapper">
                            <input
                                type="number"
                                id="roomWidth"
                                name="roomWidth"
                                className="room-form__input"
                                min="2"
                                max="15"
                                step="0.1"
                                defaultValue={initialRoom?.width || 5}
                                required
                            />

                            <span className="room-form__unit">
                                m
                            </span>
                        </div>
                    </div>

                    <div className="room-form__field">
                        <label
                            htmlFor="roomHeight"
                            className="room-form__label"
                        >
                            Oda Uzunluğu
                        </label>

                        <div className="room-form__input-wrapper">
                            <input
                                type="number"
                                id="roomHeight"
                                name="roomHeight"
                                className="room-form__input"
                                min="2"
                                max="15"
                                step="0.1"
                                defaultValue={initialRoom?.height || 4}
                                required
                            />

                            <span className="room-form__unit">
                                m
                            </span>
                        </div>
                    </div>
                </div>

                {/* Renk seçimleri */}
                <div className="room-form__group">
                    <div className="room-form__field">
                        <label
                            htmlFor="wallColor"
                            className="room-form__label"
                        >
                            Duvar Rengi
                        </label>

                        <div className="room-form__color-wrapper">
                            <input
                                type="color"
                                id="wallColor"
                                name="wallColor"
                                className="room-form__color-input"
                                defaultValue={initialRoom?.wallColor || "#F3EFE7"}
                            />

                            <span className="room-form__color-text">
                                Duvar
                            </span>
                        </div>
                    </div>

                    <div className="room-form__field">
                        <label
                            htmlFor="floorColor"
                            className="room-form__label"
                        >
                            Zemin Rengi
                        </label>

                        <div className="room-form__color-wrapper">
                            <input
                                type="color"
                                id="floorColor"
                                name="floorColor"
                                className="room-form__color-input"
                                defaultValue={initialRoom?.floorColor || "#D8C3A5"}
                            />

                            <span className="room-form__color-text">
                                Zemin
                            </span>
                        </div>
                    </div>
                </div>

                <div className="room-form__info">
                    Oda ölçüleri 2 ile 15 metre arasında olmalıdır.
                </div>

                {/* Form butonu */}
                <div className="room-form__actions">
                    <button
                        type="submit"
                        className="btn-primary-custom room-form__submit"
                    >
                        {initialRoom ? "Değişiklikleri Kaydet" : "Odayı Oluştur"}
                    </button>
                </div>
            </form>
        </section>
    );
}