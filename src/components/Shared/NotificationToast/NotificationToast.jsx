import {
    AlertTriangle,
    CheckCircle2,
    Info,
    XCircle,
} from "lucide-react";

const notificationTypes = {
    success: {
        icon: CheckCircle2,
        className: "text-bg-success",
    },

    warning: {
        icon: AlertTriangle,
        className: "text-bg-warning",
    },

    danger: {
        icon: XCircle,
        className: "text-bg-danger",
    },

    info: {
        icon: Info,
        className: "text-bg-primary",
    },
};

export default function NotificationToast({
    notification,
    onClose,
}) {
    if (!notification) {
        return null;
    }

    const {message, type = "success",} = notification;
    const config = notificationTypes[type] ?? notificationTypes.success;
    const Icon = config.icon;

    return (
        <div
            className="position-fixed start-50 translate-middle-x"
            style={{
                zIndex: 2000,
                bottom: "28px",
                width: "min(380px, calc(100vw - 32px))",
            }}
        >
            <div
                className={`toast show border-0 shadow-lg rounded-3 ${config.className}`}
                style={{
                    width: "100%",
                    maxWidth: "100%",
                }}
            >
                <div className="d-flex">
                    <div className="toast-body d-flex align-items-center gap-2">
                        <Icon
                            size={19}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                        <span>
                            {message}
                        </span>
                    </div>

                    <button
                        type="button"
                        className={`btn-close me-2 m-auto ${
                            type !== "warning"
                                ? "btn-close-white"
                                : ""
                        }`}
                        aria-label="Bildirimi kapat"
                        onClick={onClose}
                    />
                </div>
            </div>
        </div>
    );
}