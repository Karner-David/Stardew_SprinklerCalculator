import React, { useState, useEffect } from 'react';

const maps = [
  {
    name: "Standard Farm",
    icon: "/icons/Standard_Farm_Map_Icon.png",
    baseImages: {
      all: "/maps/standard-all.svg",
      house: "/maps/standard-house.svg",
      houseGreen: "/maps/standard-house-greenhouse.svg",
      greenhouse: "/maps/standard-greenhouse.svg",
      greenPet: "/maps/standard-greenhouse-pet.svg",
      pet: "/maps/standard-pet.svg",
      petHouse: "/maps/standard-house-pet.svg",
      none: "/maps/standard-none.svg"
    }
  },
  {
    name: "Riverland Farm",
    icon: "/icons/Riverland_Farm_Map_Icon.png",
    baseImages: {
      all: "/maps/river-all.svg",
      house: "/maps/river-house.svg",
      houseGreen: "/maps/river-house-green.svg",
      greenhouse: "/maps/river-greenhouse.svg",
      greenPet: "/maps/river-greenhouse-pet.svg",
      pet: "/maps/river-pet.svg",
      petHouse: "/maps/river-house-pet.svg",
      none: "/maps/river-none.svg"
    }
  },
  {
    name: "Forest Farm",
    icon: "/icons/Forest_Farm_Map_Icon.png",
    baseImages: {
      all: "/maps/forest-all.svg",
      house: "/maps/forest-house.svg",
      houseGreen: "/maps/forest-house-greenhouse.svg",
      greenhouse: "/maps/forest-greenhouse.svg",
      greenPet: "/maps/forest-greenhouse-pet.svg",
      pet: "/maps/forest-pet.svg",
      petHouse: "/maps/forest-house-pet.svg",
      none: "/maps/forest-none.svg"
    }
  },
  {
    name: "Hilltop Farm",
    icon: "/icons/Hilltop_Farm_Map_Icon.png",
    baseImages: {
      all: "/maps/hilltop-all.svg",
      house: "/maps/hilltop-house.svg",
      houseGreen: "/maps/hilltop-house-greenhouse.svg",
      greenhouse: "/maps/hilltop-greenhouse.svg",
      greenPet: "/maps/hilltop-greenhouse-pet.svg",
      pet: "/maps/hilltop-pet.svg",
      petHouse: "/maps/hilltop-house-pet.svg",
      none: "/maps/hilltop-none.svg"
    }
  },
  {
    name: "Wilderness Farm",
    icon: "/icons/Wilderness_Farm_Map_Icon.png",
    baseImages: {
      all: "/maps/wilderness-all.svg",
      house: "/maps/wilderness-house.svg",
      houseGreen: "/maps/wilderness-house-greenhouse.svg",
      greenhouse: "/maps/wilderness-greenhouse.svg",
      greenPet: "/maps/wilderness-greenhouse-pet.svg",
      pet: "/maps/wilderness-pet.svg",
      petHouse: "/maps/wilderness-house-pet.svg",
      none: "/maps/wilderness-none.svg"
    }
  },
  {
    name: "Four Corners Farm",
    icon: "/icons/Four_Corners_Farm_Map_Icon.png",
    baseImages: {
      all: "/maps/fourcorners-all.svg",
      house: "/maps/fourcorners-house.svg",
      houseGreen: "/maps/fourcorners-house-greenhouse.svg",
      greenhouse: "/maps/fourcorners-greenhouse.svg",
      greenPet: "/maps/fourcorners-greenhouse-pet.svg",
      pet: "/maps/fourcorners-pet.svg",
      petHouse: "/maps/fourcorners-house-pet.svg",
      none: "/maps/fourcorners-none.svg"
    }
  },
  {
    name: "Beach Farm",
    icon: "/icons/Beach_Farm_Map_Icon.png",
    baseImages: {
      all: "/maps/beach-all.svg",
      house: "/maps/beach-house.svg",
      houseGreen: "/maps/beach-house-greenhouse.svg",
      greenhouse: "/maps/beach-greenhouse.svg",
      greenPet: "/maps/beach-greenhouse-pet.svg",
      pet: "/maps/beach-pet.svg",
      petHouse: "/maps/beach-house-pet.svg",
      none: "/maps/beach-none.svg"
    }
  },
  {
    name: "Meadowlands Farm",
    icon: "/icons/Meadowlands_Farm_Map_Icon.png",
    baseImages: {
      all: "/maps/meadowlands-all.svg",
      barn: "/maps/meadowlands-barn.svg",
      barnPet: "/maps/meadowlands-barn-pet.svg",
      barnHouse: "/maps/meadowlands-house-barn.svg",
      barnGreen: "/maps/meadowlands-greenhouse-barn.svg",
      barnGreenPet: "/maps/meadowlands-greenhouse-barn-pet.svg",
      barnHousePet: "/maps/meadowlands-house-barn-pet.svg",
      house: "/maps/meadowlands-house.svg",
      housePet: "/maps/meadowlands-house-pet.svg",
      houseGreen: "/maps/meadowlands-house-greenhouse.svg",
      houseGreenPet: "/maps/meadowlands-house-greenhouse-pet.svg",
      houseGreenBarn: "/maps/meadowlands-house-greenhouse-barn.svg",
      greenhouse: "/maps/meadowlands-greenhouse.svg",
      greenPet: "/maps/meadowlands-greenhouse-pet.svg",
      pet: "/maps/meadowlands-pet.svg",
      none: "/maps/meadowlands-none.svg"
    }
  }
];


export default function AsideContentFarm({ onMapChange }) {
  const [selectedFarm, setSelectedFarm] = useState(() => {
    const savedFarm = localStorage.getItem("selectedFarmName");
    return maps.find(f => f.name === savedFarm) || maps[0];
  });
  const [showHouse, setShowHouse] = useState(() => localStorage.getItem("showHouse") !== "false");
  const [showGreenhouse, setShowGreenhouse] = useState(() => localStorage.getItem("showGreenhouse") !== "false");
  const [showPet, setShowPet] = useState(() => localStorage.getItem("showPet") !== "false");
  const [showBarn, setShowBarn] = useState(() => localStorage.getItem("showBarn") !== "false");


  useEffect(() => {
    const savedFarmName = localStorage.getItem("selectedFarmName");
    const savedHouse = localStorage.getItem("showHouse");
    const savedGreenhouse = localStorage.getItem("showGreenhouse");
    const savedPet = localStorage.getItem("showPet");
    const savedBarn = localStorage.getItem("showBarn");

    const farmMatch = maps.find((f) => f.name === savedFarmName);
    if (farmMatch) setSelectedFarm(farmMatch);
    if (savedHouse !== null) setShowHouse(savedHouse === "true");
    if (savedGreenhouse !== null) setShowGreenhouse(savedGreenhouse === "true");
    if (savedPet !== null) setShowPet(savedPet === "true");
    if (savedBarn !== null) setShowBarn(savedBarn === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedFarmName", selectedFarm.name);
    localStorage.setItem("showHouse", showHouse);
    localStorage.setItem("showGreenhouse", showGreenhouse);
    localStorage.setItem("showPet", showPet);
    localStorage.setItem("showBarn", showBarn);
  }, [selectedFarm, showHouse, showGreenhouse, showPet, showBarn]);

  const getImageKey = () => {
    const { baseImages, name } = selectedFarm;
    const keyOrder = [];

    if (name === "Meadowlands Farm") {
      if (showHouse && showGreenhouse && showBarn && showPet && baseImages["all"]) {
        return baseImages["all"];
      }
      if (showHouse && showGreenhouse && showBarn) keyOrder.push("houseGreenBarn");
      if (showHouse && showGreenhouse && showPet) keyOrder.push("houseGreenPet");
      if (showHouse && showGreenhouse) keyOrder.push("houseGreen");
      if (showHouse && showBarn && showPet) keyOrder.push("barnHousePet");
      if (showGreenhouse && showBarn && showPet) keyOrder.push("barnGreenPet");
      if (showBarn && showPet) keyOrder.push("barnPet");
      if (showBarn && showGreenhouse) keyOrder.push("barnGreen");
      if (showBarn && showHouse) keyOrder.push("barnHouse");
      if (showHouse && showPet) keyOrder.push("housePet");
      if (showGreenhouse && showPet) keyOrder.push("greenPet");
      if (showHouse) keyOrder.push("house");
      if (showGreenhouse) keyOrder.push("greenhouse");
      if (showPet) keyOrder.push("pet");
      if (showBarn) keyOrder.push("barn");
    } else {
      if (showHouse && showGreenhouse && showPet) keyOrder.push("all");
      if (showHouse && showGreenhouse) keyOrder.push("houseGreen");
      if (showHouse && showPet) keyOrder.push("petHouse");
      if (showGreenhouse && showPet) keyOrder.push("greenPet");
      if (showHouse) keyOrder.push("house");
      if (showGreenhouse) keyOrder.push("greenhouse");
      if (showPet) keyOrder.push("pet");
    }

    keyOrder.push("none");

    for (const key of keyOrder) {
      if (baseImages[key]) return baseImages[key];
    }

    console.warn(`Missing image for ${name} with keys:`, keyOrder);
    return baseImages.none;
  };

  useEffect(() => {
    const image = getImageKey();
    onMapChange(image);
  }, [selectedFarm, showHouse, showGreenhouse, showPet, showBarn]);

  const handleFarmChange = (farm) => {
    setSelectedFarm(farm);
  };

  return (
    <div style={{ padding: '10px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', fontSize: '40px', fontFamily: 'Svthin' }}>
        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input type="checkbox" checked={showHouse} onChange={() => setShowHouse(!showHouse)} style={{ marginRight: '8px' }} />
          Default House
        </label>
        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input type="checkbox" checked={showGreenhouse} onChange={() => setShowGreenhouse(!showGreenhouse)} style={{ marginRight: '8px' }} />
          Default Greenhouse
        </label>
        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input type="checkbox" checked={showPet} onChange={() => setShowPet(!showPet)} style={{ marginRight: '8px' }} />
          Default Pet Bowl
        </label>
        {selectedFarm.name === "Meadowlands Farm" && (
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" checked={showBarn} onChange={() => setShowBarn(!showBarn)} style={{ marginRight: '8px' }} />
            Default Barn
          </label>
        )}
      </div>

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
              backgroundColor: '#f7b870',
              padding: '8px',
              borderRadius: '4px',
              fontSize: '35px',
              border: farm.name === selectedFarm.name ? '3px solid #be3e15' : '3px solid #5b2b2a',
              borderRadius: '8px',
              fontFamily: 'Svthin'
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