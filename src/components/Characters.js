import { Button, Card, Loader, Message } from 'semantic-ui-react'
import { useGetCharactersQuery, useGetPlanetQuery } from '../services/swapApi'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { addFave } from '../features/faves'
import PaginationButtons from './PaginationButtons'
import Planet from './planet'
import { useEffect } from 'react'

const Characters = ({page, setTotalPages}) => {

	const { data, isError, isLoading } = useGetCharactersQuery(page);
	const dispatch = useDispatch()

	const selectCharacter = e => {
		const { title } = e.currentTarget.dataset
		const character = data.results.find(character => character.name === title)
		return character
	}
	const addToFavourites = e => dispatch(addFave(selectCharacter(e)))

	let totalPages = Math.floor(data?.count / 9);

	useEffect(() => {
		setTotalPages(totalPages);
	})

	if (isLoading) {
		return <Loader active={isLoading} />
	}
	if (isError) {
		return <Message error={isError}>There was an error</Message>
	}
	if (data && Boolean(data?.results?.length)) {
		
		return (
			<>
			<Card.Group centered>
				{data.results.map(character => (
					<Card key={nanoid()}>
						<Card.Content>
							<Card.Header>{character.name}</Card.Header>
							{character && <Card.Meta> <Planet planet={character.homeworld} /> </Card.Meta>}
							<Card.Description>
								<ul>
								<li>Height: {character.height}cm</li>
								<li>Mass: {character.mass}kg</li>
								<li>Hair Colour: {character.hair_color}</li>
								<li>Eye Colour: {character.eye_color}</li>
								<li>Gender: {character.gender}</li>
								<li>Birth Year: {character.birth_year}</li>
								</ul>
							</Card.Description>
						</Card.Content>
						<Card.Content extra>
							<Button
								icon={{ name: 'plus', size: 'small' }}
								data-title={character.name}
								positive
								content="Add to faves"
								onClick={addToFavourites}
							/>
						</Card.Content>
					</Card>
				))}
			</Card.Group>
			</>
		)
	} else if (data?.results?.length === 0) {
		return <Message warning>no characters found</Message>
	}
	return null
}
export default Characters
