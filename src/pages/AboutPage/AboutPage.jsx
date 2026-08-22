import {
    Armchair,
    LayoutDashboard,
    Move,
    WalletCards,
    MousePointer2,
    Layers3,
    Save,
    ArrowRight,
} from "lucide-react";

import "./AboutPage.css";

const features = [
    {
        id: 1,
        icon: LayoutDashboard,
        title: "Odanı Planla",
        description:
            "Gerçek oda ölçülerini kullanarak yerleşim alanını oluştur ve tasarımına sağlam bir başlangıç yap.",
    },
    {
        id: 2,
        icon: Armchair,
        title: "Mobilyalarını Yerleştir",
        description:
            "Katalogdan mobilya ekle, sürükle, yeniden boyutlandır ve istediğin konuma yerleştir.",
    },
    {
        id: 3,
        icon: Move,
        title: "Özgürce Düzenle",
        description:
            "Döndürme, katman yönetimi ve çakışma kontrolüyle tasarım üzerinde tam kontrol sağla.",
    },
    {
        id: 4,
        icon: WalletCards,
        title: "Bütçeni Takip Et",
        description:
            "Mobilya maliyetlerini anlık olarak gör ve belirlediğin bütçe içerisinde tasarımını planla.",
    },
];

const steps = [
    {
        id: "01",
        icon: LayoutDashboard,
        title: "Odanı oluştur",
        description:
            "Oda türünü, ölçülerini ve renklerini belirle.",
    },
    {
        id: "02",
        icon: MousePointer2,
        title: "Mobilyaları yerleştir",
        description:
            "Katalogdan ekle ve oda içerisinde istediğin yere taşı.",
    },
    {
        id: "03",
        icon: Layers3,
        title: "Tasarımını düzenle",
        description:
            "Boyut, dönüş, konum ve katman ayarlarını değiştir.",
    },
    {
        id: "04",
        icon: Save,
        title: "Kaydet ve devam et",
        description:
            "Tasarımını kaydet ve daha sonra kaldığın yerden devam et.",
    },
];

export default function AboutPage({onNewDesign}) {
    return (
        <main className="about-page">
            <section className="about-page__hero">
                <div className="page-container about-page__hero-layout">
                    <div className="about-page__hero-content">
                        <span className="about-page__eyebrow">
                            RoomCraft Hakkında
                        </span>
                        <h1 className="about-page__title">
                            Odanı planla.
                            <span> Karar vermeden önce gör.</span>
                        </h1>
                        <p className="about-page__description">
                            RoomCraft, yaşam alanlarını daha kolay planlamak
                            için geliştirilmiş interaktif bir oda yerleşim
                            uygulamasıdır. Mobilyalarını yerleştir, düzenle,
                            maliyetini takip et ve tasarımını kaydet.
                        </p>
                    </div>

                    <div
                        className="about-page__hero-visual"
                        aria-hidden="true"
                    >
                        <div className="about-page__visual-room">
                            <div className="about-page__visual-sofa">
                                <Armchair
                                    size={48}
                                    strokeWidth={1.4}
                                />
                            </div>
                            <div className="about-page__visual-desk" />
                            <div className="about-page__visual-rug" />
                        </div>

                        <div className="about-page__floating-card">
                            <span>Tasarım durumu</span>
                            <strong>Planlamaya hazır</strong>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-page__features">
                <div className="page-container">
                    <div className="about-page__section-header">
                        <span>RoomCraft ile</span>
                        <h2>
                            Fikrini gerçek bir yerleşim planına dönüştür.
                        </h2>
                        <p>
                            Tasarım sürecinde ihtiyaç duyabileceğin temel
                            araçları tek ekranda kullan.
                        </p>
                    </div>

                    <div className="about-page__feature-grid">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <article
                                    key={feature.id}
                                    className="about-page__feature-card"
                                >
                                    <div className="about-page__feature-icon">
                                        <Icon
                                            size={23}
                                            strokeWidth={1.7}
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>


            <section className="about-page__process">
                <div className="page-container">
                    <div className="about-page__section-header">
                        <span>Nasıl Çalışır?</span>

                        <h2>
                            Birkaç adımda kendi oda planını oluştur.
                        </h2>
                    </div>

                    <div className="about-page__steps">
                        {steps.map((step) => {
                            const Icon = step.icon;

                            return (
                                <article
                                    key={step.id}
                                    className="about-page__step"
                                >
                                    <span className="about-page__step-number">
                                        {step.id}
                                    </span>

                                    <div className="about-page__step-icon">
                                        <Icon
                                            size={20}
                                            strokeWidth={1.7}
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="about-page__mission">
                <div className="page-container about-page__mission-card">
                    <div>
                        <span className="about-page__eyebrow">
                            RoomCraft
                        </span>

                        <h2>
                            Tasarımını oluşturmaya hazır mısın?
                        </h2>

                        <p>
                            Oda ölçülerini belirle, mobilyalarını yerleştir
                            ve kendi yaşam alanını planlamaya başla.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="about-page__mission-button"
                        onClick={onNewDesign}
                        aria-label="Yeni tasarım oluştur"
                    >
                        <ArrowRight
                            size={30}
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </section>
        </main>
    );
}