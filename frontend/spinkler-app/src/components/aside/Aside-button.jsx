export default function AsideButton({ activeTab, setActiveTab }) {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px',
  };

  const baseButtonStyle = {
    flex: 1,
    padding: '10px 12px',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    fontSize: '32px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    fontFamily: 'Svbold'
  };

  const activeStyle = {
    borderBottom: '1px solid rgba(0, 0, 0, 0.11)',
    color: '#be3e15',
    backgroundColor: 'transparent'
  };

  const tab1Style = activeTab === 'tab1' ? Object.assign({}, baseButtonStyle, activeStyle) : baseButtonStyle;
  const tab2Style = activeTab === 'tab2' ? Object.assign({}, baseButtonStyle, activeStyle) : baseButtonStyle;

  return (
    <div style={containerStyle}>
      <button style={tab1Style} onClick={() => setActiveTab('tab1')}>
        Buildings
      </button>
      <button style={tab2Style} onClick={() => setActiveTab('tab2')}>
        Farm
      </button>
    </div>
  );
};