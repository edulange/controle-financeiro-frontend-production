import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const SaldoMensal = ({ despesas, usuario }) => {
	const dispatch = useDispatch()
	const mesSelecionado = useSelector((state) => state.filter)
	const [saldo, setSaldo] = useState(0)

	// Filtrar despesas pelo ID do usuário atual
	const despesasDoUsuario = despesas.filter((despesa) => despesa.createdBy.id === usuario)

	// Filtrar despesas pelo mês selecionado
	const despesasFiltradas = despesasDoUsuario.filter((despesa) =>
		despesa.dia.includes(`/${mesSelecionado}/`)
	)

	useEffect(() => {
		const despesasParaCalcularSaldo = mesSelecionado === '00' ? despesasDoUsuario : despesasFiltradas
		const saldoTotal = despesasParaCalcularSaldo.reduce((total, despesa) => total + despesa.valor, 0)
		setSaldo(saldoTotal)
	}, [mesSelecionado, despesas, despesasFiltradas])
	//essas 3 [] indicam que sempre que um deles sofrer alguma alteração
	//irá fazer novamente uma renderização

	const filtrarPorMes = (mes) => {
		dispatch(setFilter(mes))
		console.log(`Escolhido o mês ${mes}`)
	}

	const meses = [
		{ value: '00', label: 'Anual' },
		{ value: '01', label: 'Janeiro' },
		{ value: '02', label: 'Fevereiro' },
		{ value: '03', label: 'Março' },
		{ value: '04', label: 'Abril' },
		{ value: '05', label: 'Maio' },
		{ value: '06', label: 'Junho' },
		{ value: '07', label: 'Julho' },
		{ value: '08', label: 'Agosto' },
		{ value: '09', label: 'Setembro' },
		{ value: '10', label: 'Outubro' },
		{ value: '11', label: 'Novembro' },
		{ value: '12', label: 'Dezembro' },
	]

	return (
		<div className='flex justify-center items-center'>
			<select
				value={mesSelecionado}
				onChange={(e) => filtrarPorMes(e.target.value)}
				className='font-bold block mr-4 p-2 border border-gray-300 rounded-xl shadow-2xl focus:outline-none focus:border-primary bg-tertiary text-gray-700'
			>
				{meses.map(({ value, label }) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</select>
			<p className='text-xl font-bold'>
				Balanço <br />
				<span className='text-3xl font-bold text-forth'>R$ {saldo.toFixed(2)}</span>
			</p>
		</div>
	)
}

export default SaldoMensal
