import Logo from "../../../assets/images/logo.png";
import "./Footer.css";

import {
    Globe,
    Mail,
    MapPin,
} from 'lucide-react';

import {
    FaFacebookF,
    FaInstagram,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";

export default function Footer(){
    return (
        <footer className="footer">
            <div className="page-container footer__container">
                <div className="footer__main">
                    <div className="footer__brand">
                        <img 
                            src={Logo}
                            alt="RoomCraft"
                            className="footer__logo"
                        />
                        <p className="footer__description">
                            Ev ve oda yerleşim planlamasını kolaylaştıran; pratik, hızlı ve kullanışlı bir tasarım aracıdır.
                        </p>

                        <div className="footer__socials">
                            <button
                                type="button"
                                className="footer__social-button"
                                aria-label="RoomCraft Instagram hesabını aç"
                            >
                                <FaInstagram
                                    size={18}
                                    aria-hidden="true"
                                />
                            </button>

                            <button
                                type="button"
                                className="footer__social-button"
                                aria-label="RoomCraft Facebook hesabını aç"
                            >
                                <FaFacebookF
                                    size={18}
                                    aria-hidden="true"
                                />
                            </button>

                            <button
                                type="button"
                                className="footer__social-button"
                                aria-label="RoomCraft Twitter hesabını aç"
                            >
                                <FaXTwitter
                                    size={18}
                                    aria-hidden="true"
                                />
                            </button>

                            <button
                                type="button"
                                className="footer__social-button"
                                aria-label="RoomCraft YouTube hesabını aç"
                            >
                                <FaYoutube
                                    size={18}
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>

                    <nav 
                        className="footer__navigation"
                        aria-label="Footer hızlı bağlantıları"
                    >
                        <h3 className="footer__heading">
                            Hızlı Linkler
                        </h3>

                        <div className="footer__links">
                            <button
                                type="button"
                                className="footer__link"
                            >
                                Ana Sayfa
                            </button>

                            <button
                                type="button"
                                className="footer__link"
                            >
                                Tasarımlarım
                            </button>

                            <button
                                type="button"
                                className="footer__link"
                            >
                                Hazır Şablonlar
                            </button>

                            <button
                                type="button"
                                className="footer__link"
                            >
                                Hakkında
                            </button>

                            <button
                                type="button"
                                className="footer__link"
                            >
                                SSS
                            </button>
                        </div>
                    </nav>

                    <div className="footer__contact">
                        <h3 className="footer__heading">
                            İletişim
                        </h3>

                        <div className="footer__contact-list">
                            <a
                                href="mailto:info@roomcraft.app"
                                className="footer__contact-item"
                            >
                                <Mail
                                size={18}
                                strokeWidth={1.8}
                                aria-hidden="true"
                                />

                                <span>info@roomcraft.app</span>
                            </a>

                            <a
                                href="https://www.roomcraft.app"
                                className="footer__contact-item"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Globe
                                size={18}
                                strokeWidth={1.8}
                                aria-hidden="true"
                                />

                                <span>www.roomcraft.app</span>
                            </a>

                            <div className="footer__contact-item">
                                <MapPin
                                size={18}
                                strokeWidth={1.8}
                                aria-hidden="true"
                                />
                                <span>Türkiye</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © 2026 RoomCraft
                    </p>
                </div>
            </div>
        </footer>
    )
}