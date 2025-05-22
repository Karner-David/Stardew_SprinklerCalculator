import { useState } from "react";
import AsideButton from "./Aside-button";
import AsideContentFarm from "./Aside-Content-Farm";
import AsideContentBuildings from "./Aside-Content-Buildings";

export default function Aside({ onMapChange, onSizeChange }) {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div style={{
      display: 'fixed',
      height: '100%',
      width: '450px',
      backgroundColor: '#ffffff',
      borderLeft: '2px solid rgba(0, 0, 0, 0.11)',
      overflowY: 'auto',
      boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.19)',
      flexShrink: 0,
    }}>
      <aside>
        <AsideButton activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'tab1' && <AsideContentBuildings onSizeChange={onSizeChange} />}
        {activeTab === 'tab2' && <AsideContentFarm onMapChange={onMapChange} />}
      </aside>
    </div>
  );
}