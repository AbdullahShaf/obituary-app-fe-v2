"use client";

import React from "react";

import Card1 from "../mobile-cards/card1";
import Card2 from "../mobile-cards/card2";
import Card3 from "../mobile-cards/card3";
import Card4 from "../mobile-cards/card4";
import Card5 from "../mobile-cards/card5";

const MobileCards = ({ data, cardRefs, cemetery }) => {
  return (
    <div className="flex flex-wrap items-center justify-center">
      <Card1 cardRefs={cardRefs} data={data} isAssigned={true} index={0} cemetery={cemetery} />
      <Card2 cardRefs={cardRefs} data={data} isAssigned={true} index={1} cemetery={cemetery} />
      <Card3 cardRefs={cardRefs} data={data} isAssigned={true} index={2} cemetery={cemetery} />
      <Card4 cardRefs={cardRefs} data={data} isAssigned={true} index={3} cemetery={cemetery} />
      <Card5 cardRefs={cardRefs} data={data} isAssigned={true} index={4} cemetery={cemetery} />
    </div>
  );
};

export default MobileCards;
