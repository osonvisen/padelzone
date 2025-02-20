import { ReactNode } from "react";
import "./styling/Modal.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-layer" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-btn" onClick={onClose}>
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
