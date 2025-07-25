import React, {useState} from 'react';
import BuildingItem from './Buildings-Items';
import Barn1 from '../../images/buildings/Barn.png'
import Barn2 from '../../images/buildings/Big_Barn.png'
import Barn3 from '../../images/buildings/Deluxe_Barn.png'
import Cabin1 from '../../images/buildings/Plank_Cabin_Stage_1.png'
import Coop1 from '../../images/buildings/Coop.png'
import Coop2 from '../../images/buildings/Big_Coop.png'
import Coop3 from '../../images/buildings/Deluxe_Coop.png'
import FishPond from '../../images/buildings/Fish_Pond.png'
import Mill from '../../images/buildings/Mill.png'
import PetBowl from '../../images/buildings/Pet_Bowl.png'
import Shed1 from '../../images/buildings/Shed.png'
import Shed2 from '../../images/buildings/Big_Shed.png'
import Silo from '../../images/buildings/Silo.png'
import Slime from '../../images/buildings/Slime_Hutch.png'
import Horse from '../../images/buildings/Horse_Stable.png'
import Well from '../../images/buildings/Well.png'

export default function AsideContentBuildings({onSizeChange}) {
const [activeBuilding, setActiveBuilding] = useState('');

  const buildings = [
    {
      name: 'Barn',
      rows: 4, cols: 7,
      images: [Barn1, Barn2, Barn3],
      text: ['Barn', 'Big Barn', 'Deluxe Barn']
    },
    {
      name: 'Cabin',
      rows: 3, cols: 5,
      images: [Cabin1],
      text: ['Cabin'],
    },
    {
      name: 'Coop',
      rows: 3, cols: 6,
      images: [Coop1, Coop2, Coop3],
      text: ['Coop', 'Big Coop', 'Deluxe Coop'],
    },
    {
      name: 'FishPond',
      rows: 5, cols: 5,
      images: [FishPond],
      text: ['Fish Pond'],
    },
    {
      name: 'Mill',
      rows: 2, cols: 4,
      images: [Mill],
      text: ['Mill'],
    },
    {
      name: 'PetBowl',
      rows: 2, cols: 2,
      images: [PetBowl],
      text: ['Pet Bowl'],
    },
    {
      name: 'Shed',
      rows: 3, cols: 7,
      images: [Shed1, Shed2],
      text: ['Shed', 'Big Shed']
    },
    {
      name: 'Silo',
      rows: 3, cols: 3,
      images: [Silo],
      text: ['Silo'],
    },
    {
      name: 'Slime',
      rows: 4, cols: 7,
      images: [Slime],
      text: ['Slime Hutch'],
    },
    {
      name: 'Horse',
      rows: 2, cols: 4,
      images: [Horse],
      text: ['Horse Stable'],
    },
    {
      name: 'Well',
      rows: 3, cols: 3,
      images: [Well],
      text: ['Well'],
    },
  ];

  return (
    <div
      className="buildings"
      style={{
        display: 'fixed',
        alignItems: 'center',
        paddingBottom: '50px',
        maxWidth: 'auto',
      }}
    >
      {buildings.map((b, i) => (
        <BuildingItem
          key={i}
          name={b.name}
          images={b.images}
          text={b.text}
          onClick={() => {onSizeChange({ rows: b.rows, cols: b.cols }); setActiveBuilding(b.name);}}
          imageWidth="300px"
          active={activeBuilding === b.name}
        />
      ))}
    </div>
  );
}