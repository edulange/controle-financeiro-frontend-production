import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import despesaService from '../controllers/despesas'
import DeleteModal from './DeleteModal'
import DespesaItem from './DespesaItem'

const HistoricoDespesas = ({ despesas, setDespesas, usuario }) => {
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [deletingDespesaId, setDeletingDespesaId] = useState(null)

	// Obter o mês selecionado do Redux
	const mesSelecionado = useSelector((state) => state.filter)

	const handleDelete = async (despesaId) => {
		setShowDeleteModal(true)
		setDeletingDespesaId(despesaId)
	}

	const cancelDelete = () => {
		setShowDeleteModal(false)
		setDeletingDespesaId(null)
	}

	const confirmDelete = async () => {
		try {
			await despesaService.deleteDespesa(deletingDespesaId)

			// Atualiza o estado para refletir a exclusão no frontend
			setDespesas((prevDespesas) => prevDespesas.filter((despesa) => despesa.id !== deletingDespesaId))
			// Fecha o modal de confirmação
			setShowDeleteModal(false)
			setDeletingDespesaId(null)
		} catch (error) {
			console.error('Erro ao deletar despesa:', error)
		}
	}

		const despesasFiltradas = despesas.filter((despesa) => despesa.dia.includes(`/${mesSelecionado}/`))


	return (
		<div>
			<h2 className='text-xl font-bold mb-4'>Histórico de Despesas</h2>
			<ul>
				{(mesSelecionado === '00' ? despesas : despesasFiltradas)
					.filter((despesa) => despesa.createdBy.id === usuario) // Filtra despesas pelo usuário atual
					.sort((a, b) => {
						// Converta as strings 'dd/mm/yyyy' em objetos de data
						const dateA = new Date(
							parseInt(a.dia.split('/')[2]),
							parseInt(a.dia.split('/')[1]) - 1,
							parseInt(a.dia.split('/')[0])
						)
						const dateB = new Date(
							parseInt(b.dia.split('/')[2]),
							parseInt(b.dia.split('/')[1]) - 1,
							parseInt(b.dia.split('/')[0])
						)

						// Compare as datas para ordenação crescente
						return dateA - dateB
					})
					.map((despesa) => (
						<DespesaItem key={despesa.id} despesa={despesa} onDelete={handleDelete} />
					))}
			</ul>

			{showDeleteModal && (
				<div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
					<div className='absolute inset-0 bg-black opacity-50' onClick={cancelDelete}></div>
					<div className='relative w-auto max-w-lg mx-auto my-6'>
						<div className='relative flex flex-col w-full bg-white  border-0 rounded-xl shadow-2xl outline-none focus:outline-none'>
							<div className='flex items-start justify-between p-5 border-b-4 border-solid border-primary rounded-t'>
								<h3 className='text-xl font-semibold italic '>Confirmação de Exclusão</h3>
								<button
									className='p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
									onClick={() => setShowDeleteModal(false)}
								></button>
							</div>
							<div className='relative p-6 flex-auto'>
								<DeleteModal onConfirm={confirmDelete} onCancel={cancelDelete} />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default HistoricoDespesas
