import { useCallback, useEffect, useState } from 'react';
import { AgeGuess } from '../../../types/age-guess';

export function AgeGuesser() {
	const [name, setName] = useState('');
	const [initialGuess, setInitialGuess] = useState<AgeGuess>();
	const [currentGuess, setCurrentGuess] = useState(0);
	const [min, setMin] = useState(0);
	const [max, setMax] = useState(100);
	const [guessesCount, setGuessesCount] = useState(0);
	const [correct, setCorrect] = useState(false);
	const [guesses, setGuesses] = useState([0]);

	const randomNumber = useCallback(
		(min: number, max: number) => {
			let randomNumber = 0;

			do {
				randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
			} while (guesses.find((number) => number === randomNumber));
			return randomNumber;
		},
		[guesses]
	);

	const guess = useCallback(
		(direction: string) => {
			if (direction === '') {
				const fetchData = async () => {
					await fetch(`https://api.agify.io?name=${name}&country_id=US`)
						.then((res) => res.json())
						.then((result) => {
							setInitialGuess(result);
							setCurrentGuess(result.age);
							setGuessesCount(1);
							setMin(0);
							setMax(100);
							setCorrect(false);
						});
				};
				fetchData();
			} else {
				if (direction === 'higher') {
					setMin(currentGuess);
					setCurrentGuess((currentGuess) => randomNumber(currentGuess, max));
				} else {
					setMax(currentGuess);
					setCurrentGuess((currentGuess) => randomNumber(min, currentGuess));
				}
				setGuessesCount((guessesCount) => guessesCount + 1);
			}
		},
		[name, currentGuess, randomNumber, max, min]
	);

	useEffect(() => {
		setGuesses((guesses) => [...guesses, currentGuess]);
	}, [currentGuess]);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				guess('');
			}
		};

		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [guess]);

	return (
		<div className='age-guesser ms-3'>
			<h6>Give me your first name and I'm going to try and guess your age in 5 guesses</h6>
			<p>
				<b>Directions:</b> Give me your first name and I'm going to guess your age. If I'm correct hit 'correct'. If not then select
				whether I am too high or too low. I will try and guess your age in 5 guesses
			</p>
			<div className='d-flex justify-content-center'>
				<input placeholder='First Name' className='input' id='name' onChange={(e) => setName(e.target.value)}></input>
				<button className={`btn ms-2 ${name ? 'btn-primary' : 'disabled'}`} onClick={() => guess('')}>
					Guess!
				</button>
			</div>

			{initialGuess && guessesCount === 1 && (
				<div>
					{!correct && (
						<div>
							<div className='text-center'>
								<p className='mt-3'>
									Using the average age from {initialGuess.count.toLocaleString()} people in the US with the name{' '}
									{name.charAt(0).toUpperCase() + name.slice(1)}
								</p>
								<p>My guess is you are {currentGuess}</p>
							</div>
							<div className='d-flex justify-content-center mt-3'>
								<button className='btn btn-info' onClick={() => guess('higher')}>
									Too low
								</button>
								<button className='btn btn-success me-2 ms-2' onClick={() => setCorrect(true)}>
									Correct!
								</button>
								<button className='btn btn-info' onClick={() => guess('lower')}>
									Too high
								</button>
							</div>
						</div>
					)}
				</div>
			)}
			{guessesCount > 1 && guessesCount < 6 && !correct ? (
				<div>
					{guessesCount > 1 && guessesCount < 6 ? (
						<p>Ok, so are you {currentGuess}?</p>
					) : (
						<p>Okay, last guess. Are you {currentGuess}?</p>
					)}
					<div className='d-flex justify-content-center mt-3'>
						<button className='btn btn-info' onClick={() => guess('higher')}>
							Too low
						</button>
						<button className='btn btn-success me-2 ms-2' onClick={() => setCorrect(true)}>
							Correct!
						</button>
						<button className='btn btn-info' onClick={() => guess('lower')}>
							Too high
						</button>
					</div>
				</div>
			) : (
				!correct &&
				guessesCount > 1 && (
					<div>
						<div className='mt-3'>Alright, well unless you're lying or don't know your own age, you win. Congrats I guess</div>
						<button className='btn btn-dark' onClick={() => setGuessesCount(1)}>
							Keep guessing
						</button>
					</div>
				)
			)}
			{correct && <div className='mt-3'>Yaay! I win! Genius status</div>}
		</div>
	);
}
