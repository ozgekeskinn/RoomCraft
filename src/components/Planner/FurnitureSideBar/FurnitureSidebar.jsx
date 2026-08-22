import { useState } from "react";
import {
    Plus,
    Settings,
    Search,
    LayoutGrid,
    Armchair,
    BedDouble,
    Package,
    Monitor,
    Sparkles,
    Hammer,
} from "lucide-react";

import furnitureCatalog from "../../../data/furnitureCatalog.js";
import "./FurnitureSidebar.css";

const categories = [
    {
        id: "all",
        name: "Tümü",
        icon: LayoutGrid,
    },
    {
        id: "oturma",
        name: "Oturma",
        icon: Armchair,
    },
    {
        id: "yatak-odasi",
        name: "Yatak Odası",
        icon: BedDouble,
    },
    {
        id: "depolama",
        name: "Depolama",
        icon: Package,
    },
    {
        id: "elektronik",
        name: "Elektronik",
        icon: Monitor,
    },
    {
        id: "dekorasyon",
        name: "Dekorasyon",
        icon: Sparkles,
    },
    {
        id: "yapisal",
        name: "Yapısal Öğeler",
        icon: Hammer,
    },
];

export default function FurnitureSidebar({onAddFurniture}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortOption, setSortOption] = useState("default");

    function formatPrice(price) {
        return new Intl.NumberFormat("tr-TR").format(price);
    }

    const filteredFurniture = furnitureCatalog
        .filter((item) => {
            const normalizedSearch = searchTerm
                .trim()
                .toLocaleLowerCase("tr-TR");

            const matchesSearch =
                normalizedSearch === "" ||
                item.name
                    .toLocaleLowerCase("tr-TR")
                    .includes(normalizedSearch);

            const matchesCategory =
                activeCategory === "all" ||
                item.category === activeCategory;

            const matchesPrice =
                maxPrice === "" ||
                item.price <= Number(maxPrice);

            return (
                matchesSearch &&
                matchesCategory &&
                matchesPrice
            );
        })
        .sort((a, b) => {
            switch (sortOption) {
                case "price-asc":
                    return a.price - b.price;

                case "price-desc":
                    return b.price - a.price;

                case "name-asc":
                    return a.name.localeCompare(
                        b.name,
                        "tr"
                    );

                default:
                    return 0;
            }
        });

    return (
        <section className="furniture-sidebar">
            <div className="furniture-sidebar__container">
                {/* Üst bölüm */}
                <div className="furniture-sidebar__header">
                    <h2 className="furniture-sidebar__title">
                        Mobilyalar
                    </h2>

                    {/* Arama */}
                    <div className="furniture-sidebar__search">
                        <Search
                            size={17}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />

                        <input
                            type="search"
                            placeholder="Mobilya ara..."
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(event.target.value)
                            }
                            aria-label="Mobilya ara"
                        />
                    </div>

                    {/* fiyat + sıralama */}
                    <div className="furniture-sidebar__filters">
                        <div className="furniture-sidebar__filter">
                            <label htmlFor="max-price">
                                Maksimum Fiyat
                            </label>

                            <div className="furniture-sidebar__price-input">
                                <input
                                    id="max-price"
                                    type="number"
                                    min="0"
                                    placeholder="Örn. 15000"
                                    value={maxPrice}
                                    onChange={(event) =>
                                        setMaxPrice(event.target.value)
                                    }
                                />
                                <span>TL</span>
                            </div>
                        </div>

                        <div className="furniture-sidebar__filter">
                            <label htmlFor="furniture-sort">
                                Sırala
                            </label>
                            <select
                                id="furniture-sort"
                                value={sortOption}
                                onChange={(event) =>
                                    setSortOption(event.target.value)
                                }
                            >
                                <option value="default">
                                    Varsayılan
                                </option>

                                <option value="price-asc">
                                    Fiyat: Artan
                                </option>

                                <option value="price-desc">
                                    Fiyat: Azalan
                                </option>

                                <option value="name-asc">
                                    Ada Göre
                                </option>
                            </select>
                        </div>
                    </div>

                    {/* Kategoriler */}
                    <div
                        className="furniture-sidebar__categories"
                        aria-label="Mobilya kategorileri"
                    >
                        {categories.map((category) => {
                            const Icon = category.icon;

                            return (
                                <button
                                    key={category.id}
                                    type="button"
                                    className={[
                                        "furniture-sidebar__category-button",
                                        activeCategory === category.id
                                            ? "furniture-sidebar__category-button--active"
                                            : "",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                    onClick={() =>
                                        setActiveCategory(category.id)
                                    }
                                >
                                    <Icon
                                        size={17}
                                        strokeWidth={1.7}
                                        aria-hidden="true"
                                    />

                                    <span>
                                        {category.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Liste başlığı */}
                <div className="furniture-sidebar__list-header">
                    <h3>
                        Mobilya Listesi
                    </h3>

                    <span>
                        {filteredFurniture.length}
                    </span>
                </div>

                {/* Mobilya listesi */}
                <div className="furniture-sidebar__content">
                    {filteredFurniture.length > 0 ? (
                        filteredFurniture.map((item) => (
                            <article
                                key={item.id}
                                className="furniture-sidebar__card"
                            >
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

                                <div className="furniture-sidebar__card-info">
                                    <h3 className="furniture-sidebar__card-title">
                                        {item.name}
                                    </h3>

                                    <p className="furniture-sidebar__dimensions">
                                        {item.defaultWidth} × {item.defaultHeight} cm
                                    </p>

                                    <p className="furniture-sidebar__price">
                                        {formatPrice(item.price)} TL
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="furniture-sidebar__add-button"
                                    aria-label={`${item.name} ekle`}
                                    onClick={() =>
                                        onAddFurniture(item)
                                    }
                                >
                                    <Plus
                                        size={18}
                                        strokeWidth={1.8}
                                        aria-hidden="true"
                                    />
                                </button>
                            </article>
                        ))
                    ) : (
                        <div className="furniture-sidebar__empty">
                            <Search
                                size={20}
                                strokeWidth={1.6}
                                aria-hidden="true"
                            />

                            <span>
                                Aramanıza uygun mobilya bulunamadı.
                            </span>
                        </div>
                    )}
                </div>

                {/* Alt buton */}
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
    );
}