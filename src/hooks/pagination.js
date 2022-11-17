import { useEffect, useState } from 'react'
import { Pagination } from 'semantic-ui-react'
import { useGetCharactersQuery } from '../services/swapApi'

const usePagination = data => {
	const [activePage, setActivePage] = useState(1)
	const [paginatedData, setPaginatedData] = useState([])

	/* 
    ? your code here
    */

	return {
		activePage,
		paginatedData,
	}
}

export default usePagination
