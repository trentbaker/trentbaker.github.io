"use client";

import { randomBytes } from "crypto";
import { useEffect, useRef, useState } from "react";

interface CribbageBoardConfig {
  svgHeight: number;
  svgWidth: number;
  holeCount: number;
  players: Player[];
}

const CribbageBoard = (config: CribbageBoardConfig) => {
  const { svgHeight, svgWidth, holeCount, players } = config;

  const lanePadding = 20;
  const padding = (svgHeight + svgWidth) / 2 / 20;

  const boardHeight = svgHeight - 2 * padding;
  const boardWidth = svgWidth - 2 * padding;

  const startingY = svgHeight - padding;
  const firstCurveY = padding + boardWidth / 2;
  const secondCurveY = padding + boardHeight - boardWidth / 3;
  const lastStretchX = boardWidth / 2;

  console.log(
    JSON.stringify(
      {
        padding,
        boardHeight,
        boardWidth,
        lanePadding,
        startingY,
        firstCurveY,
        secondCurveY,
        lastStretchX,
      },
      null,
      2
    )
  );

  const lanes = players.map((_, i) => {
    const offset = (i + 1) * lanePadding;

    return `
      M ${padding + offset} ${startingY}
      L ${padding + offset} ${firstCurveY}
      A 1 1 0 0 1 ${padding + boardWidth - offset} ${firstCurveY}
      L ${padding + boardWidth - offset} ${secondCurveY}
      A 1 1 0 0 1 ${lastStretchX + offset} ${secondCurveY}
      L ${lastStretchX + offset} ${firstCurveY}
    `;
  });

  const newLanes = players.map((player, i) => {
    const offset = (i + 1) * lanePadding;

    const pathString = `
      M ${padding + offset} ${startingY}
      L ${padding + offset} ${firstCurveY}
      A 1 1 0 0 1 ${padding + boardWidth - offset} ${firstCurveY}
      L ${padding + boardWidth - offset} ${secondCurveY}
      A 1 1 0 0 1 ${lastStretchX + offset} ${secondCurveY}
      L ${lastStretchX + offset} ${firstCurveY}
    `;
    const colors = ["red", "blue", "green", "grey"];
    const playerColor = colors[i % colors.length];

    return {
      id: player.name,
      pathString,
      holeCount: 120,
      playerColor,
    } as CribbageBoardLane;
  });

const laneRefs = useRef()

  return (
    <svg height={svgHeight} width={svgWidth} className="bg-base-content">
      {newLanes.map((lane, laneIndex) => {
        return (
          <path
            key={JSON.stringify(lane)}
            d={lane.pathString}
            ref={}
            fill="none"
            stroke="black"
            strokeWidth="2px"
          ></path>
        );
      })}
      {/* {holeCoordinates.map((hole) => {
        if (!hole) return;
        return (
          <circle
            stroke="none"
            fill="black"
            strokeWidth="2px"
            r="4px"
            key={JSON.stringify({ x: hole?.x, y: hole?.y })}
            cx={hole?.x}
            cy={hole?.y}
          ></circle>
        );
      })}
      {playerPegs.map((peg, i) => (
        <circle
          key={randomBytes(4).toString()}
          cx={peg?.x}
          cy={peg?.y}
          stroke="yellow"
          strokeWidth="2px"
          r="4px"
        ></circle>
      ))} */}
    </svg>
  );
};

export default function CribbageScoreCard() {
  const [players, setPlayers] = useState([
    { name: "trent", pointHistory: [1, 2, 3, 15, 8, 10] },
    { name: "bonney", pointHistory: [2, 2, 12, 2, 8] },
    { name: "shy", pointHistory: [2, 2, 8, 6, 3, 7] },
    { name: "gurt", pointHistory: [1, 1, 1, 1, 4, 6, 8] },
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
          holeCount={120}
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
