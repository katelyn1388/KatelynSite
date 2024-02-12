import { useState } from 'react';

export default function Board() {
	const [squares, setSquares] = useState(Array(9).fill(null));
	const [xNext, setXNext] = useState(true);

	function handleClick(square: number) {
		if (squares[square] || winner) return;

		const newSquares = squares.slice();

		if (xNext) {
			newSquares[square] = 'X';
		} else {
			newSquares[square] = 'O';
		}

		setSquares(newSquares);
		setXNext(!xNext);
	}

	const winner = calculateWinner({ squares });
	let status;
	if (winner) {
		status = 'Winner: ' + winner;
	} else {
		status = 'Next player: ' + (xNext ? 'X' : 'O');
	}

	return (
		<div className='m-3'>
			<div className='d-flex justify-content-between' style={{ width: '24rem' }}>
				{status}
				<button className='btn' onClick={() => setSquares(Array(9).fill(null))}>
					Restart
				</button>
			</div>
			<div className='board-row'>
				<Square value={squares[0]} squareClick={() => handleClick(0)} />
				<Square value={squares[1]} squareClick={() => handleClick(1)} />
				<Square value={squares[2]} squareClick={() => handleClick(2)} />
			</div>
			<div className='board-row'>
				<Square value={squares[3]} squareClick={() => handleClick(3)} />
				<Square value={squares[4]} squareClick={() => handleClick(4)} />
				<Square value={squares[5]} squareClick={() => handleClick(5)} />
			</div>
			<div className='board-row'>
				<Square value={squares[6]} squareClick={() => handleClick(6)} />
				<Square value={squares[7]} squareClick={() => handleClick(7)} />
				<Square value={squares[8]} squareClick={() => handleClick(8)} />
			</div>
		</div>
	);
}

function Square({ value, squareClick }: { value: string; squareClick: () => void }) {
	return (
		<button className='square game-square' onClick={squareClick}>
			{value}
		</button>
	);
}

function calculateWinner({ squares }: { squares: string[] }) {
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

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}
