import React from 'react'

const DeleteModal = ({ onConfirm, onCancel }) => {
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
			<div className='absolute inset-0 bg-black opacity-50' onClick={onCancel}></div>
			<div className='relative w-auto max-w-lg mx-auto my-6'>
				<div className='relative flex flex-col w-full bg-white  border-0 rounded-xl shadow-2xl outline-none focus:outline-none'>
					<div className='flex items-start justify-between p-5 border-b-4 border-solid border-primary rounded-t'>
						<h3 className='text-xl font-semibold italic'>Confirmação de Exclusão</h3>
						<button
							className='p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
							onClick={onCancel}
						></button>
					</div>
					<div className='relative p-6 flex-auto'>
						<div className='modal p-4 bg-primary rounded-lg shadow-2xl'>
							<div className='flex justify-between'>
								<button
									className='w-2/5 px-4 py-2 font-semibold bg-forth text-white rounded-xl hover:bg-forthHover focus:outline-none'
									onClick={onConfirm}
								>
									Sim
								</button>
								<button
									className='px-4 py-2 font-semibold bg-cancel text-tertiary rounded-xl hover:bg-cancelHover hover:focus:bg-cancelHover'
									onClick={onCancel}
								>
									Cancelar
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DeleteModal
