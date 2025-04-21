import AsideContentBuildings from "./Aside-Content-Buildings";
import AsideContentFarm from "./Aside-Content-Farm";

export default function AsideContent({ activeTab }) {
    return (
        <div style = {
            {
                padding: '16px',
                height: '100%',
                boxSizing: 'border-box',
                overflowY: 'auto'
            }
        }>

            <div className="aside-content">
                {activeTab === 'tab1' && <AsideContentBuildings />}
                {activeTab === 'tab2' && <AsideContentFarm />}
            </div>
        </div>
    );
};