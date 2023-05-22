"use client";

interface Player {
  name: string;
  pointHistory: number[];
}

interface CribbageBoardProps {
  game: Player[];
}

const CribbageBoard = (props: CribbageBoardProps) => {
  const boardHeight = 1000;
  const boardWidth = 500;
  const padding = 20;
  const laneWidth = 20;
  const topCurveY = (boardWidth - 2 * padding) / 2 + padding;
  const bottomCurveY =boardHeight  - boardWidth / 2 - (props.game.length * laneWidth) / 2

  console.log(
    JSON.stringify(
      {
        boardHeight,
        boardWidth,
        padding,
        laneWidth,
        topCurveY,
        bottomCurveY,
      },
      null,
      2
    )
  );

  const route = (offset: number) => {
    const actual =
      boardWidth / 2 + offset - (props.game.length * laneWidth) / 2;

    return `
    M ${padding + offset} ${bottomCurveY}
    L ${padding + offset} ${topCurveY}
    A 1 1 0 0 1 ${boardWidth - padding - offset} ${topCurveY}
    L ${boardWidth - padding - offset} ${bottomCurveY}
    A 1 1 0 0 1 ${actual} ${bottomCurveY}
    L ${actual} ${topCurveY}
  `;
  };

  const street = (offset: number, streetWidth: number) => {
    return `${route(offset)}${route(streetWidth + offset)}`;
  };

  const allLanes = (laneCount: number, laneWidth: number) => {
    let out = "";
    for (let i = 0; i < laneCount; i++) {
      out += street(i * laneWidth, laneWidth);
    }
    return out;
  };

  return (
    <svg className="bg-base-content" width={boardWidth} height={boardHeight}>
      <g stroke="black" fill="none" strokeWidth="5px">
        <path d={allLanes(props.game.length, laneWidth)}></path>
      </g>
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
    <div className="flex items-center h-screen place-content-around">
      <CribbageBoard game={players.slice(0, 1)}></CribbageBoard>
      <CribbageBoard game={players.slice(0, 2)}></CribbageBoard>
      <CribbageBoard game={players.slice(0, 3)}></CribbageBoard>
      <CribbageBoard game={players.slice(0, 4)}></CribbageBoard>

      {/* {players.map((player) => {
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
      })} */}
    </div>
  );
}
