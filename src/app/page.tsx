"use client";

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
  players: Player[];
}

const CribbageBoard = (config: CribbageBoardConfig) => {
  const { svgHeight, svgWidth, holeCount, players } = config;

  const pathRoute = `
    M 100 50
    L 100 750
    `;

  const [pathElement, setPathElement] = useState<SVGPathElement>();

  const holeSpacing = (pathElement?.getTotalLength() || 0) / (holeCount + 1);

  const holeCoordinates = Array.from({ length: holeCount }).map((_, i) => {
    const distance = (i + 1) * holeSpacing;
    return pathElement?.getPointAtLength(distance);
  });

  const playerPegs = players.flatMap((player) => {
    const score = player.pointHistory.reduce((a, b) => a + b);
    const out = [
      holeCoordinates[score],
      holeCoordinates[score - player.pointHistory.slice(-1)[0]],
    ];

    return out;
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
      {holeCoordinates.map((hole) => (
        <circle
          stroke="blue"
          fill="none"
          strokeWidth="2px"
          r="10px"
          key={randomBytes(6).toString()}
          cx={hole?.x}
          cy={hole?.y}
        ></circle>
      ))}
      {playerPegs.map((peg, i) => (
        <circle
          key={randomBytes(4).toString()}
          cx={peg?.x}
          cy={peg?.y}
          stroke="yellow"
          strokeWidth="2px"
          r="4px"
        ></circle>
      ))}
    </svg>
  );
};

export default function CribbageScoreCard() {
  const [players, setPlayers] = useState([
    { name: "trent", pointHistory: [1, 1, 3] },
    // { name: "bonney", pointHistory: [2, 2] },
    // { name: "shy", pointHistory: [2, 2] },
    // { name: "garrett", pointHistory: [1, 1, 1, 1] },
  ]);

  const updatePlayerPoints = (name: string, score: number) =>
    setPlayers(
      players.map((p) => {
        if (name == p.name)
          return { ...p, pointHistory: [...p.pointHistory, score] };
        else return p;
      })
    );

  const [selectedPlayerName, setSelectedPlayerName] = useState(players[0].name);
  const pointRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col h-screen place-content-around">
      <div className="flex place-content-around">
        <CribbageBoard
          svgHeight={800}
          svgWidth={400}
          holeCount={10}
          players={players}
        ></CribbageBoard>
      </div>
      <div className="flex justify-center items-center˝">
        {players.map((player) => {
          return (
            <div key={player.name} className="stats bg-base-content">
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
      <div className="flex justify-center items-center">
        <div className="input-group">
          <select
            className="select select-bordered"
            value={selectedPlayerName}
            onChange={(e) => setSelectedPlayerName(e.target.value)}
          >
            {players.map((player) => {
              return (
                <option key={player.name} value={player.name}>
                  {player.name}
                </option>
              );
            })}
          </select>
          <input
            className="input input-bordered grow-0"
            type="number"
            ref={pointRef}
          ></input>
          <a
            className="btn"
            onClick={() => {
              updatePlayerPoints(
                selectedPlayerName,
                Number(pointRef.current?.value || 0)
              );
            }}
          >
            Score
          </a>
        </div>
      </div>
    </div>
  );
}
