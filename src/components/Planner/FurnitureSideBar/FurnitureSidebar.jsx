import {
    Plus,
    Settings,
} from "lucide-react";

import furnitureCatalog from "../../../data/furnitureCatalog.js";
import "./FurnitureSidebar.css";

export default function FurnitureSidebar({onAddFurniture}){
    function formatPrice(price){
        return new Intl.NumberFormat("tr-TR").format(price);
    }

    return (
        <section className="furniture-sidebar">
            <div className="furniture-sidebar__container">

                <div className="furniture-sidebar__header">
                    <h2 className="furniture-sidebar__title">
                        Mobilya Listesi
                    </h2>
                </div>

                <div className="furniture-sidebar__content">
                    {furnitureCatalog.map((item) => (
                        <article
                            key={item.id}
                            className="furniture-sidebar__card"
                        >
                            {/* mobilya görseli */}
                            <div className="furniture-sidebar__image-wrapper">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="furniture-sidebar__image"
                                    />
                                ) : (
                                    <div className="furniture-sidebar__image-placeholder">
                                        Görsel
                                    </div>
                                )}
                            </div>

                            {/* mobilya bilgileri */}
                            <div className="furniture-sidebar__card-info">
                                <h3 className="furniture-sidebar__card-title">
                                    {item.name}
                                </h3>

                                <p className="furniture-sidebar__dimensions">
                                    {item.defaultWidth} x {item.defaultHeight} cm
                                </p>

                                <p className="furniture-sidebar__price">
                                    {formatPrice(item.price)} TL
                                </p>
                            </div>

                            {/* ekle butonu */}
                            <button
                                type="button"
                                className="furniture-sidebar__add-button"
                                aria-label={`${item.name} ekle`}
                                onClick={() => onAddFurniture(item)}
                            >
                                <Plus
                                    size={18}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />
                            </button>
                        </article>
                    ))}
                </div>

                {/* alt buton */}
                <div className="furniture-sidebar__footer">
                    <button
                        type="button"
                        className="furniture-sidebar__manage-button"
                    >
                        <Settings
                            size={17}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                        Kataloğu Yönet
                    </button>
                </div>
            </div>
        </section>
    )
}