import React, { useState, useEffect } from 'react';

const maps = [
  {
    name: "Standard Farm",
    icon: "/icons/Standard_Farm_Map_Icon.png",
    baseImages: {
      all: "/maps/standard-all.svg",
      house: "/maps/standard-house.svg",
      greenhouse: "/maps/standard-greenhouse.svg",
      none: "/maps/standard-none.svg"
    }
  },
  {
    name: "Riverland Farm",
    icon: "/icons/Riverland_Farm_Map_Icon.png",
    baseImages: {
      all: "/maps/riverland-all.svg",
      house: "/maps/riverland-house.svg",
      greenhouse: "/maps/riverland-greenhouse.svg",
      none: "/maps/riverland-none.svg"
    }
  },
  {
    name: "Forest Farm",
    icon: "/icons/Forest_Farm_Map_Icon.png",
    baseImages: {
      all: "/maps/forest-all.svg",
      house: "/maps/forest-house.svg",
      greenhouse: "/maps/forest-greenhouse.svg",
      none: "/maps/forest-none.svg"
    }
  },
  {
    name: "Hilltop Farm",
    icon: "/icons/Hilltop_Farm_Map_Icon.png",
    baseImages: {
      all: "/maps/hilltop-all.svg",
      house: "/maps/hilltop-house.svg",
      greenhouse: "/maps/hilltop-greenhouse.svg",
      none: "/maps/hilltop-none.svg"
    }
  },
  {
    name: "Wilderness Farm",
    icon: "/icons/Wilderness_Farm_Map_Icon.png",
    baseImages: {
      all: "/maps/wilderness-all.svg",
      house: "/maps/wilderness-house.svg",
      greenhouse: "/maps/wilderness-greenhouse.svg",
      none: "/maps/wilderness-none.svg"
    }
  },
  {
    name: "Four Corners Farm",
    icon: "/icons/Four_Corners_Farm_Map_Icon.png",
    baseImages: {
      all: "/maps/fourcorners-all.svg",
      house: "/maps/fourcorners-house.svg",
      greenhouse: "/maps/fourcorners-greenhouse.svg",
      none: "/maps/fourcorners-none.svg"
    }
  },
  {
    name: "Beach Farm",
    icon: "/icons/Beach_Farm_Map_Icon.png",
    baseImages: {
      all: "/maps/beach-all.svg",
      house: "/maps/beach-house.svg",
      greenhouse: "/maps/beach-greenhouse.svg",
      none: "/maps/beach-none.svg"
    }
  },
  {
    name: "Meadowlands Farm",
    icon: "/icons/Meadowlands_Farm_Map_Icon.png",
    baseImages: {
      all: "/maps/meadowlands-all.svg",
      house: "/maps/meadowlands-house.svg",
      greenhouse: "/maps/meadowlands-greenhouse.svg",
      none: "/maps/meadowlands-none.svg"
    }
  }
];

  export default function AsideContentFarm({ onMapChange }) {
    const [selectedFarm, setSelectedFarm] = useState(maps[0]);
    const [showHouse, setShowHouse] = useState(true);
    const [showGreenhouse, setShowGreenhouse] = useState(true);
  
    useEffect(() => {
      if (showHouse && showGreenhouse) {
        onMapChange(selectedFarm.baseImages.all);
      } else if (showHouse && !showGreenhouse) {
        onMapChange(selectedFarm.baseImages.house);
      } else if (!showHouse && showGreenhouse) {
        onMapChange(selectedFarm.baseImages.greenhouse);
      } else {
        onMapChange(selectedFarm.baseImages.none);
      }
    }, [showHouse, showGreenhouse, selectedFarm, onMapChange]);
  
    const handleFarmChange = (farm) => {
      setSelectedFarm(farm);
      setShowHouse(true);
      setShowGreenhouse(true);
    };
  
    return (
      <div style={{ padding: '10px' }}>
        {/* Checklist Section */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', fontSize: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input
              type="checkbox"
              checked={showHouse}
              onChange={() => setShowHouse(!showHouse)}
              style={{ marginRight: '8px' }}
            />
            Default House
          </label>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={showGreenhouse}
              onChange={() => setShowGreenhouse(!showGreenhouse)}
              style={{ marginRight: '8px' }}
            />
            Default Greenhouse
          </label>
        </div>
  
        {/* Farm Selection Section */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {maps.map((farm, idx) => (
            <div
              key={idx}
              onClick={() => handleFarmChange(farm)}
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                marginBottom: '10px',
                backgroundColor: farm.name === selectedFarm.name ? '#f0f0f0' : 'transparent',
                padding: '5px',
                borderRadius: '4px',
                fontSize: '20px',
              }}
            >
              <img src={farm.icon} alt={farm.name} style={{ width: '60px', height: '60px', marginRight: '10px' }} />
              <span>{farm.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }