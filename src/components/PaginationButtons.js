import usePagination from "../hooks/pagination";
import { useState } from "react";
import { useGetCharactersQuery } from '../services/swapApi';
import Characters from "./Characters";
import { selectCurrent } from '../features/app'
import { useSelector } from 'react-redux'


const PaginationButtons = (props) => {
    let totalPages = Math.ceil(props.totalPages / 9);
    
	const [activePage, setActivePage] = useState(1)
	const [paginatedData, setPaginatedData] = useState([])

    const handleNextClick = () => {
        setActivePage(activePage + 1);
    }

    const handlePrevClick = () => {
        setActivePage(activePage - 1);
    }

    return (
<>
<div className="btn-group">
{activePage > 1 && <button onClick={handlePrevClick}>Previous</button>}
<p>Page {activePage}</p>
{activePage < totalPages && <button onClick={handleNextClick}>Next</button>}
</div>
</>
    );
}

export default PaginationButtons;