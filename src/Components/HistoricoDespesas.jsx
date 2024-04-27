import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import despesaService from '../controllers/despesas'
import DeleteModal from './DeleteModal'
import DespesaItem from './DespesaItem'

const HistoricoDespesas = ({ despesas, setDespesas, usuario }) => {
	const [showModal, setShowModal] = useState(false)
	const [deletingDespesaId, setDeletingDespesaId] = useState(null)

	// Obter o mês selecionado do Redux
	const mesSelecionado = useSelector((state) => state.filter)

	const handleDelete = async (despesaId) => {
		setShowModal(true)
		setDeletingDespesaId(despesaId)
	}

	const cancelDelete = () => {
		setShowModal(false)
		setDeletingDespesaId(null)
	}

	const confirmDelete = async () => {
		try {
			await despesaService.deleteDespesa(deletingDespesaId)

			// Atualiza o estado para refletir a exclusão no frontend
			setDespesas((prevDespesas) => prevDespesas.filter((despesa) => despesa.id !== deletingDespesaId))
			// Fecha o modal de confirmação
			setShowModal(false)
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

			{showModal && <DeleteModal onConfirm={confirmDelete} onCancel={cancelDelete} />}
		</div>
	)
}

export default HistoricoDespesas
