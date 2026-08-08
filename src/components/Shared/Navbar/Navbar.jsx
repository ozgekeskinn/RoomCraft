import { useState } from 'react';
import { Menu, X } from "lucide-react";

import Logo from '../../../assets/images/logo.png';
import './Navbar.css';

export default function Navbar({
    currentPage,
    onPageChange,
}){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu(){
        setIsMenuOpen((prev) => !prev);
    }

    function closeMenu(){
        setIsMenuOpen(false);
    }

    return (
        <header className="navbar">
            <div className="page-container navbar__container">
                <button
                    type='button'
                    className='navbar__brand'
                    onClick={() => {
                        onPageChange("home");
                        closeMenu();
                    }}
                    aria-label='Ana sayfaya dön'
                >
                    <img
                        src={Logo}
                        alt='RoomCraft'
                        className='navbar__logo'
                    />
                </button>

                <nav className="navbar__menu" aria-label="Ana menü">
                    <button 
                        type='button' 
                        className={`navbar__link ${
                            currentPage === "home"
                                ? "navbar__link--active"
                                : ""
                        }`}
                        onClick={() => onPageChange("home")}
                    >
                        Anasayfa
                    </button>

                    <button
                        type='button'
                        className={`navbar__link ${
                            currentPage === "saved-designs"
                                ? "navbar__link--active"
                                : ""
                        }`}
                        onClick={() => onPageChange("saved-designs")}
                    >
                        Tasarımlarım
                    </button>

                    <a href="#" className="navbar__link">
                        Hazır Şablonlar
                    </a>

                    <a href="#" className="navbar__link">
                        Hakkımızda
                    </a>
                </nav>

                <button 
                    type="button"
                    className="btn-primary-custom navbar__button"
                    onClick={() => {
                        onPageChange("planner");
                        closeMenu();
                    }}
                >
                    <span aria-hidden="true">+</span>
                    Yeni Tasarım
                </button>

                {/* mobil */}
                <button
                    type='button'
                    className='navbar__toggle'
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? (
                        <X size={24} aria-hidden="true" />
                    ) : (
                        <Menu size={24} aria-hidden="true" />
                    )}
                </button>
            </div>

            {/* tablet */}
            {isMenuOpen && (
                <div
                    className="navbar__overlay"
                    onClick={closeMenu}
                >
                    <div
                        className="navbar__drawer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="navbar__drawer-header">
                            <img
                                src={Logo}
                                alt="RoomCraft"
                                className="navbar__drawer-logo"
                            />

                            <button
                                type="button"
                                className="navbar__drawer-close"
                                onClick={closeMenu}
                                aria-label="Menüyü kapat"
                            >
                                <X
                                    size={24}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />
                            </button>
                        </div>

                        <nav
                            className="navbar__mobile-nav"
                            aria-label="Mobil menü"
                        >
                            <a
                                href="#"
                                className="navbar__mobile-link navbar__mobile-link--active"
                                onClick={closeMenu}
                            >
                                Anasayfa
                            </a>

                            <a
                                href="#"
                                className="navbar__mobile-link"
                                onClick={closeMenu}
                            >
                                Tasarımlarım
                            </a>

                            <a
                                href="#"
                                className="navbar__mobile-link"
                                onClick={closeMenu}
                            >
                                Hazır Şablonlar
                            </a>

                            <a
                                href="#"
                                className="navbar__mobile-link"
                                onClick={closeMenu}
                            >
                                Hakkımızda
                            </a>

                            <button
                                type="button"
                                className="btn-primary-custom navbar__mobile-button"
                                onClick={() => {
                                    onPageChange("planner");
                                    closeMenu();
                                }}
                            >
                                <span aria-hidden="true">+</span>
                                Yeni Tasarım
                            </button>
                        </nav>
                    </div>
                </div>
            )}

        </header>
    )
}