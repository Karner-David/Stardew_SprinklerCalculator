import { useState } from "react";
import AsideButton from "./Aside-button";
import AsideContentFarm from "./Aside-Content-Farm";
import AsideContentBuildings from "./Aside-Content-Buildings";

export default function Aside({ onMapChange, onSizeChange }) {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div style={{
      border: '4px solid #dc7b05',
      padding: '4px',
      outline: '4px solid #5b2b2a'
    }}>
      <div 
      className="aside-scroll"
      style={{
        height: '100%',
        width: '450px',
        backgroundColor: '#f7b870',
        borderLeft: '2px solid rgba(0, 0, 0, 0.11)',
        overflowY: 'auto',
        boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.19)',
        flexShrink: 0,
        border: '4px solid #853605',
        outline: '4px solid #b14e05',
        boxShadow: 'inset 0 0 30px #c47a48'
      }}>
      
        <aside>
          <AsideButton activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === 'tab1' && <AsideContentBuildings onSizeChange={onSizeChange} />}
          {activeTab === 'tab2' && <AsideContentFarm onMapChange={onMapChange} />}
        </aside>
      </div>
    </div>
  );
}