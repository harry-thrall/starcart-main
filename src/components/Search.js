import { Header, Icon } from 'semantic-ui-react'
import SearchApi from './SearchApi'

const SearchBar = () => (
	<>
		<Header icon>
			<Icon name="search" />
			Search
		</Header>
		<SearchApi />
	</>
)
export default SearchBar
