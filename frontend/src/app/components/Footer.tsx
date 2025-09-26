import React from 'react';
const Footer: React.FC = () => {
    return (
        <footer className="content-footer footer bg-footer-theme">
            <div className="container-xxl">
                <div className="footer-container d-flex align-items-center justify-content-between py-2 flex-md-row flex-column">
                    <small>© {new Date().getFullYear()}, desarrollado por <a href="https://www.linkedin.com/in/sergiovallenari" target="_blank" className="fw-semibold">Sergio Vallenari</a></small>
                </div>
            </div>
        </footer>
    );
};
export default Footer;