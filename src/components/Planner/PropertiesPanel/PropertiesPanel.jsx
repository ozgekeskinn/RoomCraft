import { useEffect, useState } from "react";
import { 
    Trash2,
    Copy,
    RotateCw,
    TriangleAlert,
    Lock,
    Unlock,
    Armchair,

    ArrowUp,
    ArrowDown,
    ChevronsUp,
    ChevronsDown,
} from "lucide-react";
import "./PropertiesPanel.css";

export default function PropertiesPanel({
    furniture,
    onDeleteFurniture,
    onDuplicateFurniture,
    onRotateFurniture,
    onUpdateFurniture,
    onToggleFurnitureLock,
    onChangeFurnitureWall,

    onBringFurnitureForward,
    onSendFurnitureBackward,
    onBringFurnitureToFront,
    onSendFurnitureToBack,

    collisions = [],
}){
    const [formValues, setFormValues] = useState({
        x: "",
        y: "",
        width: "",
        height: "",
    });

    // mobilya değiştiğinde input'ları güncel tutar
    useEffect(() => {
        if (!furniture) {
            return;
        }

        setFormValues({
            x: Math.round(furniture.x),
            y: Math.round(furniture.y),
            width: Math.round(furniture.width),
            height: Math.round(furniture.height),
        });
    }, [
        furniture?.id,
        furniture?.x,
        furniture?.y,
        furniture?.width,
        furniture?.height,
    ]);

    if (!furniture) {
        return (
            <section className="properties-panel">
                <h2 className="properties-panel__title">
                    Seçili Mobilya
                </h2>

                <div className="properties-panel__empty-state">
                    <div className="properties-panel__empty-visual">
                        <Armchair
                            size={38}
                            strokeWidth={1.4}
                            aria-hidden="true"
                        />
                    </div>

                    <strong>
                        Henüz mobilya seçilmedi
                    </strong>

                    <p>
                        Özelliklerini düzenlemek için
                        bir mobilyaya tıklayın.
                    </p>
                </div>
            </section>
        );
    }

    const isWallItem = furniture.type === "door" || furniture.type === "window";

    function handleInputChange(field, value) {
        setFormValues((prevValues) => ({
            ...prevValues,
            [field]: value,
        }));
    }

    function handleInputCommit(field) {
        const rawValue = formValues[field];

        if (rawValue === "") {
            setFormValues((prevValues) => ({
                ...prevValues,
                [field]: Math.round(furniture[field]),
            }));

            return;
        }

        const numericValue = Number(rawValue);

        if (Number.isNaN(numericValue)) {
            return;
        }

        onUpdateFurniture(
            furniture.id,
            {
                [field]: numericValue,
            }
        );
    }

    return (
        <div className="properties-panel">
            <h2 className="properties-panel__title">
                Seçili Mobilya
            </h2>

            <div className="properties-panel__content">
                <h3 className="properties-panel__name">
                    {furniture.name}
                </h3>

                {collisions.length > 0 && (
                    <div
                        className="alert alert-danger py-2 px-3 mb-3"
                        role="alert"
                    >
                        <div className="d-flex align-items-start gap-2">
                            <TriangleAlert
                                size={18}
                                strokeWidth={1.8}
                                aria-hidden="true"
                                className="flex-shrink-0 mt-1"
                            />

                            <div>
                                <strong className="d-block mb-1">
                                    Çakışma Uyarısı
                                </strong>

                                <span>
                                    Bu mobilya{" "}
                                    {collisions
                                        .map((item) => item.name)
                                        .join(", ")}{" "}
                                    ile çakışıyor.
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="properties-panel__row">
                    <span>Tür</span>
                    <strong>{furniture.type}</strong>
                </div>

                {isWallItem && (
                    <div className="mb-3">
                        <label
                            htmlFor="wallSide"
                            className="form-label"
                        >
                            Duvar Konumu
                        </label>

                        <select
                            id="wallSide"
                            className="form-select"
                            value={furniture.wallSide ?? "top"}
                            disabled={furniture.isLocked}
                            onChange={(event) =>
                                onChangeFurnitureWall(
                                    furniture.id,
                                    event.target.value
                                )
                            }
                        >
                            <option value="top">
                                Üst Duvar
                            </option>

                            <option value="right">
                                Sağ Duvar
                            </option>

                            <option value="bottom">
                                Alt Duvar
                            </option>

                            <option value="left">
                                Sol Duvar
                            </option>
                        </select>
                    </div>
                )}

                <div className="properties-panel__row">
                    <label htmlFor="furniture-x">
                        X Konumu
                    </label>

                    <div className="properties-panel__input-wrapper">
                        <input
                            id="furniture-x"
                            type="number"
                            min="0"
                            value={formValues.x}
                            disabled={furniture.isLocked}
                            onChange={(event) =>
                                handleInputChange(
                                    "x",
                                    event.target.value
                                )
                            }
                            onBlur={() =>
                                handleInputCommit("x")
                            }
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    event.currentTarget.blur();
                                }
                            }}
                        />
                        <span>cm</span>
                    </div>
                </div>

                <div className="properties-panel__row">
                    <label htmlFor="furniture-y">
                        Y Konumu
                    </label>

                    <div className="properties-panel__input-wrapper">
                        <input
                            id="furniture-y"
                            type="number"
                            min="0"
                            value={formValues.y}
                            disabled={furniture.isLocked}
                            onChange={(event) =>
                                handleInputChange(
                                    "y",
                                    event.target.value
                                )
                            }
                            onBlur={() =>
                                handleInputCommit("y")
                            }
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    event.currentTarget.blur();
                                }
                            }}
                        />
                        <span>cm</span>
                    </div>
                </div>

                <div className="properties-panel__row">
                    <label htmlFor="furniture-width">
                        Genişlik
                    </label>

                    <div className="properties-panel__input-wrapper">
                        <input
                            id="furniture-width"
                            type="number"
                            min={furniture.minWidth ?? 20}
                            value={formValues.width}
                            disabled={furniture.isLocked}
                            onChange={(event) =>
                                handleInputChange(
                                    "width",
                                    event.target.value
                                )
                            }
                            onBlur={() => handleInputCommit("width")}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    event.currentTarget.blur();
                                }
                            }}
                        />
                        <span>cm</span>
                    </div>
                </div>

                <div className="properties-panel__row">
                    <label htmlFor="furniture-height">
                        Yükseklik
                    </label>

                    <div className="properties-panel__input-wrapper">
                        <input
                            id="furniture-height"
                            type="number"
                            min={furniture.minHeight ?? 20}
                            value={formValues.height}
                            disabled={furniture.isLocked}
                            onChange={(event) =>
                                handleInputChange(
                                    "height",
                                    event.target.value
                                )
                            }
                            onBlur={() =>
                                handleInputCommit("height")
                            }
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    event.currentTarget.blur();
                                }
                            }}
                        />
                        <span>cm</span>
                    </div>
                </div>

                <div className="properties-panel__row">
                    <span>Dönüş</span>
                    <strong>{furniture.rotation}°</strong>
                </div>

                <div className="properties-panel__row">
                    <span>Fiyat</span>
                    <strong>
                        {furniture.price.toLocaleString("tr-TR")} TL
                    </strong>
                </div>

                <div className="properties-panel__row">
                    <span>Katman</span>
                    <strong>{furniture.zIndex}</strong>
                </div>

                <div className="properties-panel__row">
                    <span>Durum</span>
                    <strong>
                        {furniture.isLocked ? "Kilitli" : "Kilitli değil"}
                    </strong>
                </div>

                <div className="properties-panel__actions">
                    <button
                        type="button"
                        className="properties-panel__action-button"
                        onClick={() =>
                            onBringFurnitureForward(furniture.id)
                        }
                    >
                        <ArrowUp
                            size={17}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                        <span>Öne Getir</span>
                    </button>

                    <button
                        type="button"
                        className="properties-panel__action-button"
                        onClick={() =>
                            onSendFurnitureBackward(furniture.id)
                        }
                    >
                        <ArrowDown
                            size={17}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                        <span>Arkaya Gönder</span>
                    </button>

                    <button
                        type="button"
                        className="properties-panel__action-button"
                        onClick={() =>
                            onBringFurnitureToFront(furniture.id)
                        }
                    >
                        <ChevronsUp
                            size={17}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                        <span>En Öne Getir</span>
                    </button>

                    <button
                        type="button"
                        className="properties-panel__action-button"
                        onClick={() =>
                            onSendFurnitureToBack(furniture.id)
                        }
                    >
                        <ChevronsDown
                            size={17}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                        <span>En Arkaya Gönder</span>
                    </button>

                    <button
                        type="button"
                        className="properties-panel__action-button"
                        onClick={() =>
                            onToggleFurnitureLock(furniture.id)
                        }
                    >
                        {furniture.isLocked ? (
                            <Unlock
                                size={17}
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />
                        ) : (
                            <Lock
                                size={17}
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />
                        )}

                        <span>
                            {furniture.isLocked
                                ? "Kilidi Aç"
                                : "Kilitle"}
                        </span>
                    </button>

                    <button
                        type="button"
                        className="properties-panel__action-button"
                        disabled={furniture.isLocked}
                        onClick={() =>
                            onRotateFurniture(furniture.id)
                        }
                    >
                        <RotateCw
                            size={17}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                        <span>90° Döndür</span>
                    </button>

                    <button
                        type="button"
                        className="properties-panel__action-button"
                        onClick={() =>
                            onDuplicateFurniture(furniture.id)
                        }
                    >
                        <Copy
                            size={17}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />

                        <span>Kopyala</span>
                    </button>

                    <button
                        type="button"
                        className="properties-panel__delete-button"
                        onClick={() => onDeleteFurniture(furniture.id)}
                    >
                        <Trash2
                            size={17}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />

                        <span>Mobilyayı Sil</span>
                    </button>
                </div>
            </div>
        </div>
    )
}