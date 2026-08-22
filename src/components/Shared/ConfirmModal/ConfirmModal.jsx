export default function ConfirmModal({
    isOpen,
    title,
    message,
    confirmText = "Onayla",
    cancelText = "Vazgeç",
    onConfirm,
    onCancel,
    danger = false,
}) {
    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                className="modal show d-block"
                tabIndex="-1"
                role="dialog"
                aria-modal="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">
                                {title}
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Kapat"
                                onClick={onCancel}
                            />
                        </div>

                        <div className="modal-body">
                            <p className="mb-0">
                                {message}
                            </p>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={onCancel}
                            >
                                {cancelText}
                            </button>

                            <button
                                type="button"
                                className={
                                    danger
                                        ? "btn btn-danger"
                                        : "btn btn-primary"
                                }
                                onClick={onConfirm}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show" />
        </>
    );
}