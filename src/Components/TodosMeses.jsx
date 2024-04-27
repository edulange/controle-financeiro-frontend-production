import React from 'react'
import meses from '../../utils/meses'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const TodosMeses = ({ usuario, despesas }) => {
	const dispatch = useDispatch()

	// Função para calcular o total das despesas por mês para o usuário logado
	const calcularTotalDespesasPorMes = () => {
		const totalDespesasPorMes = {}

		// Inicializar o objeto totalDespesasPorMes com os meses
		meses.forEach(({ value }) => {
			totalDespesasPorMes[value] = 0
		})

		// Filtrar as despesas do usuário logado
		const despesasUsuario = despesas.filter((despesa) => despesa.createdBy.id === usuario)

		// Iterar sobre as despesas do usuário logado
		despesasUsuario.forEach((despesa) => {
			// Obter o mês da despesa
			const [dia, mes, ano] = despesa.dia.split('/')
			const mesDespesa = mes

			// Adicionar o valor da despesa ao total do mês correspondente
			totalDespesasPorMes[mesDespesa] += despesa.valor
		})

		return totalDespesasPorMes
	}

	const calcularTodoInvestimentoPorMes = () => {
		const totalInvestimentoPorMes = {}

		meses.forEach(({ value }) => {
			totalInvestimentoPorMes[value] = 0
		})

		const despesasUsuario = despesas.filter((despesa) => despesa.createdBy.id === usuario)
		const investimentoUsuario = despesasUsuario.filter((despesa) => despesa.categoria === 'Investimento')

		investimentoUsuario.forEach((despesa) => {
			const [dia, mes, ano] = despesa.dia.split('/')
			const mesDespesa = mes

			// Adicionar o valor da despesa ao total do mês correspondente
			totalInvestimentoPorMes[mesDespesa] += despesa.valor
		})

		return totalInvestimentoPorMes
	}

	const totalInvestimentoPorMes = calcularTodoInvestimentoPorMes()

	// Calcular o total das despesas por mês para o usuário logado
	const totalDespesasPorMes = calcularTotalDespesasPorMes()

	const filtrarPorMes = (mes) => dispatch(setFilter(mes))

	return (
		<div>
			<h2 className='text-lg font-bold mb-2 min-w-80'>Histórico Meses</h2>
			<div className='grid grid-cols-1 gap-4'>
				{meses.map(
					({ value, label }) =>
						totalDespesasPorMes[value] !== 0 && (
							<div
								key={value}
								className={`flex flex-col bg-gray-100 p-2 rounded-xl mb-1 ${
									totalDespesasPorMes[value] > 0 ? 'shadow-lucro' : 'shadow-deficit'
								}`}
							>
								<div
									className='flex justify-between items-center mb-1'
									onClick={() => filtrarPorMes(value)}
								>
									<span className='font-semibold'>{label}</span>
									<span>{totalDespesasPorMes[value].toFixed(2)}</span>
								</div>
								<div
									className='flex justify-between items-center'
									onClick={() => filtrarPorMes(value)}
								>
									<span className='font-thin text-xs text-gray-600'>Investimento:</span>
									<span className='text-xs text-primary'>
										{(totalInvestimentoPorMes[value] * -1).toFixed(2)}
									</span>
								</div>
							</div>
						)
				)}
			</div>
		</div>
	)
}

export default TodosMeses
