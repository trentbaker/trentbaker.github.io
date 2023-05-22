"use client";

interface Player {
  name: string;
  pointHistory: number[];
  score: number;
}

interface CribbageBoardProps {
  players: Player[];
}

interface Coodinate {
  x: number;
  y: number;
}

const CribbageBoard = (props: CribbageBoardProps) => {
  const { players } = props;

  const svgWidth = 500;
  const svgHeight = 1000;
  const padding = 25;

  const boardWidth = svgWidth - padding * 2;
  const boardHeight = svgHeight - padding * 2;

  const holeSpacing = boardHeight / 120;
  const laneSpacing = boardWidth / (players.length + 1);

  const laneCoordinates: Coodinate[][] = players.map((_, playerIndex) =>
    Array.from({ length: 120 }, (_, holeIndex) => {
      return {
        x: (1 + playerIndex) * laneSpacing + padding,
        y: (1 + holeIndex) * holeSpacing + padding,
      };
    })
  );

  const playerPegCoordinates: Coodinate[][] = players.map(
    (player, playerIndex) => {
      return player.pointHistory
        .slice(player.pointHistory.length - 2)
        .map((peg, pegIndex) => {
          return laneCoordinates[playerIndex][player.score - pegIndex * peg];
        });
    }
  );

  return (
    <svg className="bg-base-content" width={svgWidth} height={svgHeight}>
      <g
        // drawing all holes
        stroke="black"
        fill="none"
        strokeWidth="2px"
        width={boardWidth}
        height={boardHeight}
      >
        {laneCoordinates.map((lane) =>
          lane.map((hole) => {
            return (
              <circle
                key={JSON.stringify(hole)}
                cx={hole.x}
                cy={hole.y}
                r="1px"
              ></circle>
            );
          })
        )}
      </g>

      <g
        // drawing player pegs
        stroke="yellow"
        fill="none"
        strokeWidth="2px"
        width={boardWidth}
        height={boardHeight}
      >
        {playerPegCoordinates.map((playerPegs) =>
          playerPegs.map((peg) => {
            return (
              <circle
                key={JSON.stringify(peg)}
                cx={peg.x}
                cy={peg.y}
                r="1px"
              ></circle>
            );
          })
        )}
      </g>
    </svg>
  );
};

export default function CribbageScoreCard() {
  const players: Player[] = [
    { name: "trent", pointHistory: [1, 1, 3], score: 40 },
    { name: "bonney", pointHistory: [2, 2], score: 40 },
    { name: "shy", pointHistory: [2, 2], score: 40 },
    { name: "garrett", pointHistory: [1, 1, 1, 1], score: 40 },
  ];
  return (
    <div className="flex flex-col h-screen place-content-around">
      <div className="flex place-content-around">
        <CribbageBoard players={players.slice(0, 4)}></CribbageBoard>
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
