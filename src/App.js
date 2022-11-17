import React, { useState, useEffect } from 'react'
import { Container, Header, Menu, Segment } from 'semantic-ui-react'
import { selectCurrent } from './features/app'
import Main from './Main'
import { useSelector } from 'react-redux'
import Films from './components/Films'
import Characters from './components/Characters'
import Starships from './components/Starships'
import Planets from './components/Planets'
import './style.scss';

function App() {
	const current = useSelector(selectCurrent)

	const [activePage, setActivePage] = useState(1)
	const [paginatedData, setPaginatedData] = useState([])
	const [totalPages, setTotalPages] = useState(1)

	const handleNextClick = () => {
		setActivePage(activePage + 1)
	}

	const handlePrevClick = () => {
		setActivePage(activePage - 1)
	}

	useEffect(() => {
		if(activePage > totalPages || !totalPages){
			setActivePage(1);
		}

	});

	return (
		<>
			<Container fluid>
				<Segment inverted>
					<Header as="h1" content="Star Cart 🚀" />
					<Menu pointing secondary></Menu>
					<Main />
				</Segment>
			</Container>
			<Container>
				<Segment>
					{current === 'films' && <Films setTotalPages={setTotalPages} />}
					{current === 'characters' && <Characters page={activePage} setTotalPages={setTotalPages} />}
					{current === 'starships' && <Starships page={activePage} setTotalPages={setTotalPages} />}
					{current === 'planets' && <Planets page={activePage} setTotalPages={setTotalPages} />}
				</Segment>
				<div className="btn-group">
					{activePage > 1 && <button onClick={handlePrevClick}>Previous</button>}
					<p>Page {activePage}</p>
					{activePage < totalPages && <button onClick={handleNextClick}>Next</button>}
				</div>
			</Container>
		</>
	)
}

export default App
