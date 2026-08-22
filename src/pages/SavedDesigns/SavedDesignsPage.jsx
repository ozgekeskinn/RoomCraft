import { useEffect, useState } from "react";
import { 
    Copy,
    Pencil,
    FolderOpen,
    Trash2 
} from "lucide-react";

import { 
    getAllDesigns,
    deleteDesign,
    updateDesign,
    saveCompleteDesign
} from "../../services/designService.js";

import {getFurnitureByDesignId} from "../../services/furnitureService.js";

import ConfirmModal from '../../components/Shared/ConfirmModal/ConfirmModal.jsx';
import NotificationToast from '../../components/Shared/NotificationToast/NotificationToast.jsx';

import "./SavedDesignsPage.css";

export default function SavedDesignsPage({
    onPageChange,
    onOpenDesign,
}) {
    const [designs, setDesigns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [designToDelete, setDesignToDelete] = useState(null);
    const [notification, setNotification] = useState(null);

    const [designToRename, setDesignToRename] = useState(null);
    const [newDesignName, setNewDesignName] = useState("");

    useEffect(() => {
        async function loadDesigns() {
            const data = await getAllDesigns();
            const designsWithFurnitureCount =
                await Promise.all(
                    data.map(async (design) => {
                        const furniture = await getFurnitureByDesignId(design.id);

                        return {
                            ...design,
                            furnitureCount:
                                furniture.length,
                        };
                    })
                );

            setDesigns(designsWithFurnitureCount);
            setIsLoading(false);
        }
        loadDesigns();
    }, []);

    function handleDeleteClick(design){
        setDesignToDelete(design);
    }

    function handleRenameClick(design){
        setDesignToRename(design);
        setNewDesignName(design.designName);
    }

    function handleOpenDesignClick(design) {
        onOpenDesign(design.id);
    }

    async function handleConfirmDelete() {
        if(!designToDelete){
            return;
        }

        const isSuccess = await deleteDesign(designToDelete.id);

        if(!isSuccess){
            setNotification({
                message : "Tasarım silinirken bir hata oluştu.",
                type : "danger",
            })

            setDesignToDelete(null);
            return;
        }

        setDesigns((previousDesigns) => 
            previousDesigns.filter(
                (design) => design.id !== designToDelete.id
            )
        );

        setNotification({
            message : "Tasarım başarıyla silindi.",
            type: "success",
        });

        setDesignToDelete(null);
    }

    async function handleConfirmRename() {
        if(!designToRename){
            return;
        }

        const trimmedName = newDesignName.trim();

        if(!trimmedName){
            setNotification({
                message: "Tasarım Adı Boş Bırakılamaz.",
                type: "warning",
            });
            return;
        }

        const updatedDesign = {         
            ...designToRename, 
            designName: trimmedName,
        };

        const isSuccess = await updateDesign(designToRename.id, updatedDesign);

        if(!isSuccess){
            setNotification({
                message: "Tasarım Adı Değiştirilemedi",
                type: "danger",
            });
            return;
        }

        setDesigns((previousDesigns) =>
            previousDesigns.map((design) =>
                design.id === designToRename.id
                    ? {
                        ...design,
                        designName: trimmedName,
                    }
                    : design
            )
        );

        setNotification({
            message:
                "Tasarım adı başarıyla değiştirildi.",
            type: "success",
        });

        setDesignToRename(null);
        setNewDesignName("");
    }

    async function handleCopyDesign(design) {
        const sourceFurniture = await getFurnitureByDesignId(design.id);
        const copiedDesign = {
            designName: `${design.designName} - Kopya`,
            roomType: design.roomType,
            roomWidth: design.roomWidth,
            roomHeight: design.roomHeight,
            wallColor: design.wallColor,
            floorColor: design.floorColor,
            budget: design.budget,
            totalCost: design.totalCost,
        };

        const copiedFurniture =
            sourceFurniture.map(
                (furniture) => ({
                    catalogId: String(furniture.catalogId),
                    name: furniture.name,
                    type: furniture.type,
                    category: furniture.category,
                    x: furniture.x,
                    y: furniture.y,
                    width: furniture.width,
                    height: furniture.height,
                    rotation: furniture.rotation,
                    price: furniture.price,
                    zIndex: furniture.zIndex,
                    isLocked: furniture.isLocked,
                    wallSide: furniture.wallSide ?? null,
                })
            );

        const copiedDesignResult = await saveCompleteDesign(null, copiedDesign,copiedFurniture);

        if (!copiedDesignResult) {
            setNotification({
                message: "Tasarım kopyalanamadı.",
                type: "danger",
            });
            return;
        }

        const updatedDesigns = await getAllDesigns();
        const designsWithFurnitureCount =
            await Promise.all(
                updatedDesigns.map(
                    async (updatedDesign) => {
                        const furniture = await getFurnitureByDesignId(updatedDesign.id);
                        return {
                            ...updatedDesign,
                            furnitureCount:
                                furniture.length,
                        };
                    }
                )
            );

        setDesigns(designsWithFurnitureCount);
        setNotification({
            message: "Tasarım Başarıyla Kopyalandı.",
            type: "success",
        });
    }

    if (isLoading) {
        return (
            <div className="saved-designs-page">
                <div className="container py-5">
                    <p>Tasarımlar yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="saved-designs-page">
            <div className="container py-5">
                <div className="saved-designs-page__header">
                    <div>
                        <h1>Tasarımlarım</h1>
                        <p>
                            Kaydettiğiniz oda tasarımlarını
                            buradan görüntüleyebilirsiniz.
                        </p>
                    </div>
                </div>


                {designs.length === 0 ? (
                    <div className="saved-designs-page__empty">
                        <h3>Henüz kayıtlı tasarım yok</h3>
                        <p>
                            Oluşturduğunuz tasarımlar burada
                            görüntülenecek.
                        </p>
                    </div>
                ) : (
                    <div className="row g-4">
                        {designs.map((design) => (
                            <div
                                className="col-12 col-md-6 col-xl-4"
                                key={design.id}
                            >
                                <div className="card saved-design-card h-100">
                                    <div className="card-body">

                                        <h5 className="card-title">
                                            {design.designName}
                                        </h5>

                                        <p className="saved-design-card__type">
                                            {design.roomType}
                                        </p>

                                        <div className="saved-design-card__info">
                                            <div>
                                                <span>Oda Ölçüsü</span>
                                                <strong>
                                                    {design.roomWidth} m ×{" "}
                                                    {design.roomHeight} m
                                                </strong>
                                            </div>

                                            <div>
                                                <span>Mobilya Sayısı</span>
                                                <strong>
                                                    {design.furnitureCount}
                                                </strong>
                                            </div>

                                            <div>
                                                <span>Bütçe</span>
                                                <strong>
                                                    {Number(
                                                        design.budget
                                                    ).toLocaleString("tr-TR")} ₺
                                                </strong>
                                            </div>

                                            <div>
                                                <span>Toplam Maliyet</span>
                                                <strong>
                                                    {Number(
                                                        design.totalCost
                                                    ).toLocaleString("tr-TR")} ₺
                                                </strong>
                                            </div>

                                            <div>
                                                <span>Son Güncelleme</span>
                                                <strong>
                                                    {new Date(
                                                        design.updatedAt
                                                    ).toLocaleDateString(
                                                        "tr-TR"
                                                    )}
                                                </strong>
                                            </div>
                                        </div>

                                        <div className="saved-design-card__actions">
                                            <button
                                                type="button"
                                                className="btn btn-outline-success btn-sm"
                                                onClick={() =>
                                                    handleOpenDesignClick(design)
                                                }
                                            >
                                                <FolderOpen
                                                    size={16}
                                                    aria-hidden="true"
                                                />
                                                    Aç
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() =>
                                                    handleCopyDesign(design)
                                                }
                                            >
                                                <Copy
                                                    size={16}
                                                    aria-hidden="true"
                                                />
                                                    Kopyala
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() =>
                                                    handleRenameClick(design)
                                                }
                                            >
                                                <Pencil
                                                    size={16}
                                                    aria-hidden="true"
                                                />
                                                    Ad Değiştir
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() =>
                                                    handleDeleteClick(design)
                                                }
                                            >
                                                <Trash2
                                                    size={16}
                                                    aria-hidden="true"
                                                />
                                                    Sil
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {designToRename && (
                <>
                    <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                        role="dialog"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Tasarım Adını Değiştir
                                    </h5>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Kapat"
                                        onClick={() => {
                                            setDesignToRename(null);
                                            setNewDesignName("");
                                        }}
                                    />
                                </div>

                                <div className="modal-body">
                                    <label
                                        htmlFor="new-design-name"
                                        className="form-label"
                                    >
                                        Tasarım Adı
                                    </label>

                                    <input
                                        id="new-design-name"
                                        type="text"
                                        className="form-control"
                                        value={newDesignName}
                                        onChange={(event) =>
                                            setNewDesignName(
                                                event.target.value
                                            )
                                        }
                                        autoFocus
                                    />
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => {
                                            setDesignToRename(null);
                                            setNewDesignName("");
                                        }}
                                    >
                                        Vazgeç
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleConfirmRename}
                                    >
                                        Kaydet
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show" />
                </>
            )}

            <ConfirmModal
                isOpen={Boolean(designToDelete)}
                title="Tasarımı Sil"
                message={
                    designToDelete
                        ? `"${designToDelete.designName}" tasarımı kalıcı olarak silinecek. Devam etmek istiyor musunuz?`
                        : ""
                }
                confirmText="Tasarımı Sil"
                cancelText="Vazgeç"
                danger={true}
                onConfirm={handleConfirmDelete}
                onCancel={() =>
                    setDesignToDelete(null)
                }
            />

            <NotificationToast
                notification={notification}
                onClose={() =>
                    setNotification(null)
                }
            />
        </div>
    );
}