import { useState } from "react";
import AsideButton from "./Aside-button";
import AsideContent from "./Aside-content";

export default function Aside() {
    const [activeTab, setActiveTab] = useState('tab1');
  
    return (
      <div style= {
        {
          position: 'fixed',
          marginTop: '4px',
          marginRight: '8px',
          right: '0',
          height: '100vh',
          width: '450px',
          backgroundColor: '#ffffff',
          borderRadius: '5px',
          borderLeft: '2px solid rgba(0, 0, 0, 0.11)',
          overflowY: 'auto',
          boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.19)',
          zIndex: 1000
        }
      }>

        <aside className="aside">
          <AsideButton activeTab={activeTab} setActiveTab={setActiveTab} />
          <AsideContent activeTab={activeTab} />
        </aside>
      </div>

    );
}