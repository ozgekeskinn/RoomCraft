import { Palette } from "lucide-react";
import "./HomeCTA.css";

import homeCTA from "../../../assets/images/home-cta.png";

export default function HomeCTA({onPageChange}){
    return (
        <section className="home-cta">
            <div className="page-container home-cta__container">
                <div className="home-cta__box">
                    <div className="home-cta__visual">
                        <img 
                            src={homeCTA} 
                            alt="Yeşil koltuk ve dekoratif bitkiler"
                            className="home-cta__image" 
                        />
                    </div>

                    <div className="home-cta__content">
                        <h2 className="home-cta__title">
                            İlk Tasarımını Oluşturmaya Hazır Mısın?
                        </h2>

                        <p className="home-cta__description">
                            Hayalindeki odayı şimdi tasarla ve gerçeğe bir adım daha yaklaş.
                        </p>
                    </div>

                    <button 
                        className="btn-primary-custom home-cta__button"
                        type="button"
                        onClick={() => onPageChange("planner")}
                    >
                        <Palette 
                            size={20}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                        Tasarlamaya Başla
                    </button>
                </div>
            </div>
        </section>
    );
}