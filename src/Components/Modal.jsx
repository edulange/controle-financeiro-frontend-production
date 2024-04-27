import React from 'react'

const BACKGROUND_STYLE = {
	position: 'fixed',
	top: '0',
	bottom: '0',
	left: '0',
	right: '0',
	backgroundColor: 'rgb(0,0,0, 0.7)',
	zIndex: '1000',
}

const MODAL_STYLE = {
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	padding: '50px',
	backgroundColor: '#fff',
}

//parte de container
//parte externa
const Modal = ({ isOpen, setOpenModal, children }) => {
	if (isOpen) {
		return (
			<div style={BACKGROUND_STYLE}>
				<div style={MODAL_STYLE}>
					<div>
                        {children}
                    </div>
                    <button onClick={setOpenModal}>Fechar</button>
				</div>
			</div>
		)
	}

	return null
}

export default Modal
