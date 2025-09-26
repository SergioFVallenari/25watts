import React from 'react';
import '@assets/css/principal.css';
import MenuLateral from '../app/components/MenuLateral';
import NavBar from '../app/components/NavBar';
import ScrollBox from '../app/components/ScrollBox';
import Footer from '../app/components/Footer';

const Principal: React.FC = () => {
    return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <MenuLateral />
        <div className="layout-page">
          <NavBar />
          <div className="content-wrapper">
            <ScrollBox reduction={0.85}>
              <div className="container-xl flex-grow-1 container-p-y">
                <div className="row">
                  Dashboard
                </div>
              </div>
            </ScrollBox>
            <Footer />
          </div>
        </div>
      </div>
    </div>
    )
}
export default Principal;
