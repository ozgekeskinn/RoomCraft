import roomTemplates from "../../../data/roomTemplates";
import RoomTemplateCard from "./RoomTemplateCard";
import { ArrowRight } from "lucide-react";

import './RoomTemplatesSection.css';

export default function RoomTemplatesSection(){
    return (
        <section className="room-templates">
            <div className="page-container room-templates__container">
                <div className="section-header room-templates__header">
                    <h2 className="section-title room-templates__title">
                        Hazır Oda Şablonları
                    </h2>

                    <button
                        type="button"
                        className="room-templates__link"
                    >
                        Tüm Şablonları Gör
                        <ArrowRight
                            size={18}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                    </button>
                </div>

                <div className="room-templates__grid">
                    {roomTemplates.map((template) => (
                        <RoomTemplateCard
                            key={template.id}
                            name={template.name}
                            area={template.area}
                            width={template.width}
                            height={template.height}
                            image={template.image}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}