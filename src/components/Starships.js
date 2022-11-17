import { Button, Card, Loader, Message } from 'semantic-ui-react'
import { useGetStarshipsQuery } from '../services/swapApi'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { addFave } from '../features/faves'
import { useEffect } from 'react'

const Starships = ({page, setTotalPages}) => {

	const { data, isError, isLoading } = useGetStarshipsQuery(page);
	const dispatch = useDispatch()

	const selectStarship = e => {
		const { title } = e.currentTarget.dataset
		const starship = data.results.find(starship => starship.name === title)
		return starship
	}
	const addToFavourites = e => dispatch(addFave(selectStarship(e)))

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
				{data.results.map(starship => (
					<Card key={nanoid()}>
						<Card.Content>
							<Card.Header>{starship.name}</Card.Header>
							{starship && <Card.Meta>Model: {starship.model} </Card.Meta>}
							<Card.Description>
								<ul>
                                    <li>Credits: {starship.cost_in_credits}</li>
                                    <li>Crew: {starship.crew}</li>
                                    <li>Passengers: {starship.passengers}</li>
								</ul>
							</Card.Description>
						</Card.Content>
						<Card.Content extra>
							<Button
								icon={{ name: 'plus', size: 'small' }}
								data-title={starship.name}
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
export default Starships
