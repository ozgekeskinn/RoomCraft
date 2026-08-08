import savedDesigns from "../../../data/savedDesigns.js";
import SavedDesignRow from "./SavedDesignRow.jsx";
import "./SavedDesignsPreview.css";

import { ArrowRight } from "lucide-react";

export default function SavedDesignsPreview(){
    return (
        <section className="saved-designs-preview">
            <div className="page-container saved-designs-preview__container">
                <div className="section-header saved-designs-preview__header">
                    <h2 className="section-title saved-designs-preview__title">
                        Kaydedilmiş Tasarımlar
                    </h2>

                    <button
                        type="button"
                        className="saved-designs-preview__link"
                    >
                        Tüm Tasarımları Gör
                        <ArrowRight
                            size={18}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                    </button>
                </div>

                <div className="saved-designs-preview__list">
                    {savedDesigns.map((design) => {
                        return (
                            <SavedDesignRow
                                key={design.id}
                                image={design.image}
                                name={design.name}
                                roomType={design.roomType}
                                furnitureCount={design.furnitureCount}
                                updatedAt={design.updatedAt}
                                totalCost={design.totalCost}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    )
}