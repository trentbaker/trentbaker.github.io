"use client";

import { makeDraggable } from "@/lib/makeDraggable";
import { randomBytes } from "crypto";
import { useRef, useState } from "react";

interface Player {
  name: string;
  pointHistory: number[];
}

interface CribbageBoardConfig {
  svgHeight: number;
  svgWidth: number;
  holeCount: number;
}

const CribbageBoard = (config: CribbageBoardConfig) => {
  const { svgHeight, svgWidth, holeCount } = config;

  const pathRoute = `
    M 100 50
    L 100 750
    `;
    // A 1 1 0 0 0 200 400
    // A 1 1 0 0 0 200 50

  const [pathElement, setPathElement] = useState<SVGPathElement>();

  const holeSpacing = (pathElement?.getTotalLength() || 0) / (holeCount + 1);

  const holeCoordinates = Array.from({ length: holeCount }).map((_, i) => {
    const distance = (i + 1) * holeSpacing;
    return pathElement?.getPointAtLength(distance);
  });

  return (
    <svg height={svgHeight} width={svgWidth} className="bg-base-content">
      <path
        ref={(pathElement) => {
          if (pathElement) setPathElement(pathElement);
        }}
        d={pathRoute}
        stroke="black"
        fill="none"
        strokeWidth="15px"
      ></path>
      {holeCoordinates.map((hole) => {
        return (
          <circle
            stroke="blue"
            fill="none"
            strokeWidth="2px"
            r="10px"
            key={randomBytes(6).toString()}
            cx={hole?.x}
            cy={hole?.y}
          ></circle>
        );
      })}
    </svg>
  );
};

export default function CribbageScoreCard() {
  const players: Player[] = [
    { name: "trent", pointHistory: [1, 1, 3] },
    { name: "bonney", pointHistory: [2, 2] },
    { name: "shy", pointHistory: [2, 2] },
    { name: "garrett", pointHistory: [1, 1, 1, 1] },
  ];
  return (
    <div className="flex flex-col h-screen place-content-around">
      <div className="flex place-content-around">
        <CribbageBoard
          svgHeight={800}
          svgWidth={400}
          holeCount={10}
        ></CribbageBoard>
      </div>
      <div className="flex justify-center items-center">
        {players.map((player) => {
          return (
            <div className="stats shadow bg-base-content" key={player.name}>
              <div className="stat">
                <div className="stat-title text-base-100">{player.name}</div>
                <div className="stat-value text-base-100">
                  {player.pointHistory.reduce((a, b) => a + b)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
