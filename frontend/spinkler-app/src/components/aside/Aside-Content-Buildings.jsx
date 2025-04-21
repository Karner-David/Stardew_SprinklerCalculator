import React from 'react';
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

export default function AsideContentBuildings() {
  const buildings = [
    {
      name: 'Barn',
      images: [Barn1, Barn2, Barn3],
      text: ['Barn', 'Big Barn', 'Deluxe Barn']
    },
    {
      name: 'Cabin',
      images: [Cabin1],
      text: ['Cabin'],
    },
    {
      name: 'Coop',
      images: [Coop1, Coop2, Coop3],
      text: ['Coop', 'Big Coop', 'Deluxe Coop'],
    },
    {
      name: 'FishPond',
      images: [FishPond],
      text: ['Fish Pond'],
    },
    {
      name: 'Mill',
      images: [Mill],
      text: ['Mill'],
    },
    {
      name: 'PetBowl',
      images: [PetBowl],
      text: ['Pet Bowl'],
    },
    {
      name: 'Shed',
      images: [Shed1, Shed2],
      text: ['Shed', 'Big Shed']
    },
    {
      name: 'Silo',
      images: [Silo],
      text: ['Silo'],
    },
    {
      name: 'Slime',
      images: [Slime],
      text: ['Slime Hutch'],
    },
    {
      name: 'Horse',
      images: [Horse],
      text: ['Horse Stable'],
    },
    {
      name: 'Well',
      images: [Well],
      text: ['Well'],
    },
  ];

  return (
    <div
      className="buildings"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
        paddingBottom: '50px',
        maxWidth: 'auto'
      }}
    >
      {buildings.map((b, i) => (
        <BuildingItem
          key={i}
          name={b.name}
          images={b.images}
          text={b.text}
        />
      ))}
    </div>
  );
}