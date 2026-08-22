import {
    ArrowRight,
    Maximize2,
} from "lucide-react";

import roomTemplates from "../../data/roomTemplates";
import "./TemplatesPage.css";

export default function TemplatesPage({
    onUseTemplate,
}) {
    return (
        <main className="templates-page">
            <div className="page-container templates-page__container">

                <header className="templates-page__header">
                    <span className="templates-page__eyebrow">
                        Hazır Oda Planları
                    </span>

                    <h1 className="templates-page__title">
                        Tasarıma hazır bir şablonla başlayın
                    </h1>

                    <p className="templates-page__description">
                        Odanıza en uygun başlangıç planını seçin
                        ve mobilyaları dilediğiniz gibi düzenleyin.
                    </p>
                </header>


                <div className="templates-page__grid">
                    {roomTemplates.map((template) => (
                        <article
                            key={template.id}
                            className="template-card"
                        >
                            <div className="template-card__image-wrapper">
                                <img
                                    src={template.image}
                                    alt={template.name}
                                    className="template-card__image"
                                />

                                <div className="template-card__area-badge">
                                    <Maximize2
                                        size={15}
                                        strokeWidth={1.8}
                                        aria-hidden="true"
                                    />

                                    {template.area} m²
                                </div>
                            </div>


                            <div className="template-card__content">

                                <div className="template-card__top">
                                    <div>
                                        <span className="template-card__type">
                                            {template.type}
                                        </span>

                                        <h2 className="template-card__title">
                                            {template.name}
                                        </h2>
                                    </div>
                                </div>


                                <div className="template-card__details">
                                    <span>
                                        Oda Ölçüsü
                                    </span>

                                    <strong>
                                        {template.width} × {template.height} m
                                    </strong>
                                </div>


                                <button
                                    type="button"
                                    className="template-card__button"
                                    onClick={() =>
                                        onUseTemplate(template)
                                    }
                                >
                                    <span>
                                        Bu Şablonu Kullan
                                    </span>

                                    <ArrowRight
                                        size={18}
                                        strokeWidth={1.8}
                                        aria-hidden="true"
                                    />
                                </button>

                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </main>
    );
}