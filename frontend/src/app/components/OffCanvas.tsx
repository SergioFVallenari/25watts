import React from 'react';
import Offcanvas from 'react-bootstrap/esm/Offcanvas';
import config from '../services/config';

interface OffCanvasProps {
    isOpen: boolean;
    onClose: () => void;
    position?: "start" | "end" | "top" | "bottom";
    children: React.ReactNode;
    title?: string;
    className: string;
}
const OffCanvas: React.FC<OffCanvasProps> = ({ isOpen, onClose, position="end", children, title, className='' }) => {
    return (
        <Offcanvas show={isOpen} onHide={onClose} placement={position} className={className}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{title || config.nombrePlataforma}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {children}
            </Offcanvas.Body>
        </Offcanvas>
    );
};
export default OffCanvas;