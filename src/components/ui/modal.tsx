import React, { ReactNode } from 'react';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
