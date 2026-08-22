import { useState } from "react";
import { Menu, X } from "lucide-react";

import Logo from "../../../assets/images/logo.png";
import "./Navbar.css";

export default function Navbar({
    currentPage,
    onPageChange,
    onNewDesign,
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        setIsMenuOpen((prev) => !prev);
    }

    function closeMenu() {
        setIsMenuOpen(false);
    }

    function navigateTo(page) {
        onPageChange(page);
        closeMenu();
    }

    function handleNewDesignClick() {
        onNewDesign();
        closeMenu();
    }

    return (
        <header className="navbar">
            <div className="page-container navbar__container">

                {/* Logo */}
                <button
                    type="button"
                    className="navbar__brand"
                    onClick={() => navigateTo("home")}
                    aria-label="Ana sayfaya dön"
                >
                    <img
                        src={Logo}
                        alt="RoomCraft"
                        className="navbar__logo"
                    />
                </button>


                {/* Desktop Menü */}
                <nav
                    className="navbar__menu"
                    aria-label="Ana menü"
                >
                    <button
                        type="button"
                        className={`navbar__link ${
                            currentPage === "home"
                                ? "navbar__link--active"
                                : ""
                        }`}
                        onClick={() => navigateTo("home")}
                    >
                        Anasayfa
                    </button>

                    <button
                        type="button"
                        className={`navbar__link ${
                            currentPage === "saved-designs"
                                ? "navbar__link--active"
                                : ""
                        }`}
                        onClick={() =>
                            navigateTo("saved-designs")
                        }
                    >
                        Tasarımlarım
                    </button>

                    <button
                        type="button"
                        className={`navbar__link ${
                            currentPage === "templates"
                                ? "navbar__link--active"
                                : ""
                        }`}
                        onClick={() =>
                            navigateTo("templates")
                        }
                    >
                        Hazır Şablonlar
                    </button>

                    <button
                        type="button"
                        className={`navbar__link ${
                            currentPage === "about"
                                ? "navbar__link--active"
                                : ""
                        }`}
                        onClick={() =>
                            navigateTo("about")
                        }
                    >
                        Hakkımızda
                    </button>
                </nav>


                {/* Yeni Tasarım */}
                <button
                    type="button"
                    className="btn-primary-custom navbar__button"
                    onClick={handleNewDesignClick}
                >
                    <span aria-hidden="true">+</span>
                    Yeni Tasarım
                </button>


                {/* Mobil Menü Butonu */}
                <button
                    type="button"
                    className="navbar__toggle"
                    onClick={toggleMenu}
                    aria-label={
                        isMenuOpen
                            ? "Menüyü kapat"
                            : "Menüyü aç"
                    }
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? (
                        <X
                            size={24}
                            aria-hidden="true"
                        />
                    ) : (
                        <Menu
                            size={24}
                            aria-hidden="true"
                        />
                    )}
                </button>
            </div>


            {/* Mobil / Tablet Menü */}
            {isMenuOpen && (
                <div
                    className="navbar__overlay"
                    onClick={closeMenu}
                >
                    <div
                        className="navbar__drawer"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
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
                            <button
                                type="button"
                                className={`navbar__mobile-link ${
                                    currentPage === "home"
                                        ? "navbar__mobile-link--active"
                                        : ""
                                }`}
                                onClick={() =>
                                    navigateTo("home")
                                }
                            >
                                Anasayfa
                            </button>

                            <button
                                type="button"
                                className={`navbar__mobile-link ${
                                    currentPage === "saved-designs"
                                        ? "navbar__mobile-link--active"
                                        : ""
                                }`}
                                onClick={() =>
                                    navigateTo(
                                        "saved-designs"
                                    )
                                }
                            >
                                Tasarımlarım
                            </button>

                            <button
                                type="button"
                                className={`navbar__mobile-link ${
                                    currentPage === "templates"
                                        ? "navbar__mobile-link--active"
                                        : ""
                                }`}
                                onClick={() =>
                                    navigateTo(
                                        "templates"
                                    )
                                }
                            >
                                Hazır Şablonlar
                            </button>

                            <button
                                type="button"
                                className={`navbar__mobile-link ${
                                    currentPage === "about"
                                        ? "navbar__mobile-link--active"
                                        : ""
                                }`}
                                onClick={() =>
                                    navigateTo("about")
                                }
                            >
                                Hakkımızda
                            </button>

                            <button
                                type="button"
                                className="btn-primary-custom navbar__mobile-button"
                                onClick={handleNewDesignClick}
                            >
                                <span aria-hidden="true">
                                    +
                                </span>
                                Yeni Tasarım
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}