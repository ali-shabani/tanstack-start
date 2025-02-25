import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { create } from "zustand";
import { combine } from "zustand/middleware";

export const Route = createFileRoute("/tic-tac-toe")({
  component: RouteComponent,
});

function RouteComponent() {
  const { history, status, moves, fill, reset, goto } = useTicTacToe();

  const state = history.at(-1);

  if (!state) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Board state={state} fill={fill} />
      <History history={history} goto={goto} />
      <div className="mt-4">{status}</div>
      <div className="mt-4">{moves}</div>
    </div>
  );
}

export function History({
  history,
  goto,
}: {
  history: State[];
  goto: (index: number) => void;
}) {
  return (
    <div className="mt-4">
      {history.map((state, index) => (
        <div key={index}>
          <button onClick={() => goto(index)}>
            {index === history.length - 1 ? "Current" : "Step #" + index}
          </button>
        </div>
      ))}
    </div>
  );
}

type Cell = "X" | "O" | null;

type State = Cell[];

class TicTacToe {
  history: State[];

  constructor() {
    this.history = [Array(9).fill(null)];
  }

  fill(index: number) {
    if (this.end()) {
      return;
    }

    const state = this.history.at(-1);

    if (!state) {
      return;
    }

    if (state[index] !== null) {
      return;
    }

    const newState = [...state];
    newState[index] = this.getCurrentPlayer();

    this.history.push(newState);
  }

  reset() {
    this.history = [Array(9).fill(null)];
  }

  goto(index: number) {
    this.history = this.history.slice(0, index + 1);
  }

  get moves() {
    return this.history.length - 1;
  }

  getCurrentPlayer() {
    return this.moves % 2 === 0 ? "X" : "O";
  }

  getWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const state = this.history.at(-1);

    if (!state) {
      return null;
    }

    for (const line of lines) {
      const [a, b, c] = line;
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }

    return null;
  }

  isDraw() {
    return this.moves === 9 && this.getWinner() === null;
  }

  status() {
    if (this.getWinner()) {
      return `${this.getWinner()} wins!`;
    }

    if (this.isDraw()) {
      return "Draw";
    }

    return `${this.getCurrentPlayer()}'s turn`;
  }

  end() {
    return this.getWinner() || this.isDraw();
  }

  get state() {
    return {
      history: this.history,
      status: this.status(),
      moves: this.moves,
    };
  }
}

const ticTacToe = new TicTacToe();

const useTicTacToe = create(
  combine(
    {
      ...ticTacToe.state,
    },
    (set) => ({
      fill: (index: number) => {
        ticTacToe.fill(index);
        set(ticTacToe.state);
      },
      reset: () => {
        ticTacToe.reset();
        set(ticTacToe.state);
      },
      goto: (index: number) => {
        ticTacToe.goto(index);
        set(ticTacToe.state);
      },
    })
  )
);

export function Square({
  value,
  onClick,
}: {
  value: Cell;
  onClick: () => void;
}) {
  return (
    <button
      className="w-16 h-16 text-2xl font-bold flex items-center justify-center hover:bg-gray-100"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export function Board({
  state,
  fill,
}: {
  state: State;
  fill: (index: number) => void;
}) {
  return (
    <table className="mx-auto border-collapse border-2 border-black">
      <tbody>
        {[0, 1, 2].map((row) => (
          <tr key={row}>
            {[0, 1, 2].map((col) => (
              <td key={col} className="border border-black">
                <Square
                  value={state[row * 3 + col]}
                  onClick={() => fill(row * 3 + col)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
