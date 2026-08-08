import picture from '../../../assets/images/hero-room.jpg';
import './Hero.css';

import { LayoutGrid, Palette } from 'lucide-react';

export default function Hero({onPageChange}) {

    return (
        <section className="hero section">
            <div className="page-container hero__container">
                <div className="hero__content">
                    <h1 className="hero__title">
                        Hayalindeki odayı kolayca tasarla.
                    </h1>
                    <p className="hero__description">
                        Kendi odanı tasarlamak hiç bu kadar kolay olmamıştı. RoomCraft ile hayalindeki odayı tasarla ve 3D olarak gör.
                        Tasarımını kaydet, dilediğin zaman devam et.
                    </p>

                    <div className="hero__actions">
            
                        <button 
                            className="btn-primary-custom hero__button"
                            type="button"
                            onClick={() => onPageChange("planner")}
                        >
                            <span className="hero__button-icon">
                                <Palette size={18} strokeWidth={1.8} aria-hidden="true"/>
                            </span>
                            Tasarlamaya Başla
                        </button>

                        <button 
                            className="btn-secondary-custom hero__button"
                            type="button"
                        >
                            <span className="hero__button-icon">
                                <LayoutGrid size={18} strokeWidth={1.8} aria-hidden="true"/>
                            </span>
                            Hazır Şablonlara Göz At
                        </button>
                    </div>
                </div>

                <div className="hero__visual">
                    <img src={picture} alt="Mobilyalarla düzenlenmiş izometrik oda tasarımı" className="hero__image"/>
                </div>
            </div>
        </section>
    )
}