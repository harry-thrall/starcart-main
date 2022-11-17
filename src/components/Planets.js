import { Button, Card, Loader, Message } from 'semantic-ui-react'
import { useGetPlanetsQuery } from '../services/swapApi'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { addFave } from '../features/faves'
import { useEffect } from 'react'

const Planets = ({page, setTotalPages}) => {

	const { data, isError, isLoading } = useGetPlanetsQuery(page);
	const dispatch = useDispatch()

	const selectPlanet = e => {
		const { title } = e.currentTarget.dataset
		const planet = data.results.find(planet => planet.name === title)
		return planet
	}
	const addToFavourites = e => dispatch(addFave(selectPlanet(e)))

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
				{data.results.map(planet => (
					<Card key={nanoid()}>
						<Card.Content>
							<Card.Header>{planet.name}</Card.Header>
							{planet && <Card.Meta>Terrain: {planet.terrain} </Card.Meta>}
							<Card.Description>
								<ul>
                                    <li>Gravity: {planet.gravity}</li>
                                    <li>Climate: {planet.climate}</li>
                                    <li>Diameter: {planet.diameter}</li>
                                    <li>Population: {planet.population}</li>
								</ul>
							</Card.Description>
						</Card.Content>
						<Card.Content extra>
							<Button
								icon={{ name: 'plus', size: 'small' }}
								data-title={planet.name}
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
export default Planets
