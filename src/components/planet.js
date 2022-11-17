import { Button, Card, Loader, Message } from 'semantic-ui-react'
import { useGetCharactersQuery, useGetPlanetQuery } from '../services/swapApi'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const Planet = (planet) => {
    const {data}  = useGetPlanetQuery(planet.planet);

    return (
        <>
        <p>Homeworld: {data?.name}</p>
        </>
    )
}

export default Planet