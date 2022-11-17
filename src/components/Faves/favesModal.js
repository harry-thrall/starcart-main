import { useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'

const FavesModal = () => {
	const [modalOpen, setModalOpen] = useState(true)

		return (
			<Modal
				onOpen={() => setModalOpen(true)}
				onClose={() => setModalOpen(false)}
				open={modalOpen}
                className="faves-modal"
			>
				<Modal.Header>Careful Padawan</Modal.Header>
				<Modal.Content>
					Adding that again would cause a disturbance in the force!
				</Modal.Content>
			</Modal>
		)
}
export default FavesModal
