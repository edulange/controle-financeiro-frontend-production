import React, { useCallback } from 'react'

const DespesaItem = ({ despesa, onDelete }) => {
	const handleDelete = useCallback(() => {
		onDelete(despesa.id)
	}, [despesa.id, onDelete])

	const { dia: data, valor, observacao, categoria } = despesa

	const [dia, mes, ano] = data.split('/')

	return (
		<li
			onClick={handleDelete}
			className='flex items-center justify-between py-2 border-b-2 border-primary cursor-pointer'
		>
			<div className='flex'>
				<div className='min-w-16'>
					{dia}/{mes}
				</div>
				<div className={`min-w-24 ${valor >= 0 ? 'text-green-500' : 'text-red-500'}`}>
					R$ {valor.toFixed(2)}
				</div>

				<div className='ms-4 min-w-24'>{categoria}</div>
				<div className='ms-4 flex-grow'>{observacao}</div>
			</div>
		</li>
	)
}

export default DespesaItem
