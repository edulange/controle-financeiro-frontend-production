import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import HistoricoDespesas from '../Components/HistoricoDespesas'
import DespesaForm from '../Components/DespesaForm'
import SaldoMensal from '../Components/SaldoMensal'
import TodosMeses from '../Components/TodosMeses'
import despesaService from '../controllers/despesas'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { setFilter } from '../reducers/filterReducer'

const HomePage = () => {
	const [despesas, setDespesas] = useState([])
	const [usuario, setUsuario] = useState(null)
	const [showDespesaForm, setShowDespesaForm] = useState(false)
	const mesSelecionado = useSelector((state) => state.filter)

	// Hook para navegação
	const navigate = useNavigate()

	const dispatch = useDispatch()

	// Hook para carregar dados do usuário e despesas
	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) {
			navigate('/login')
			return
		}

		try {
			const decoded = jwtDecode(token)
			setUsuario(decoded.userId)
		} catch (error) {
			navigate('/login')
		}
	}, [])

	useEffect(() => {
		const fetchDespesas = async () => {
			try {
				const response = await despesaService.getAll()
				setDespesas(response.data)
			} catch (error) {
				console.error('Error fetching despesas:', error)
			}
		}
		fetchDespesas()
	}, [])

	// Função para adicionar despesa
	const handleAddDespesa = (novaDespesa) => {
		setDespesas((prevDespesas) => [...prevDespesas, { id: prevDespesas.length + 1, ...novaDespesa }])
		setShowDespesaForm(false)
	}

	// Função para fazer logout
	const handleLogout = () => {
		localStorage.removeItem('token')
		navigate('/login')
	}

	return (
		<div className='container mx-auto bg-tertiary  mt-8 px-4 py-8 rounded-2xl flex flex-col items-center shadow-2xl relative max-w-[800px]'>
			<div className='mb-8'>
				<SaldoMensal despesas={despesas} usuario={usuario} />
			</div>
			<div>
				{mesSelecionado !== '00' ? (
					<div className='mb-8'>
						<HistoricoDespesas despesas={despesas} setDespesas={setDespesas} usuario={usuario} />
					</div>
				) : (
					<TodosMeses usuario={usuario} despesas={despesas} />
				)}
			</div>
			<div className='flex flex-col items-center'>
				<button
					onClick={() => setShowDespesaForm(true)}
					className='bg-forth hover:bg-forthHover text-white font-bold py-2 px-4 rounded-2xl mt-2'
				>
					Adicionar Despesa
				</button>
				{showDespesaForm && (
					<div className='fixed inset-0 z-50 overflow-y-auto flex justify-center items-center bg-gray-500 bg-opacity-50 transition-opacity'>
						<div className='relative bg-white rounded-2xl shadow-lg w-128 h-128'>
							<div className='absolute top-0 right-0 -mt-4 -mr-4'></div>
							<div className='p-6'>
								<DespesaForm
									handleAddDespesa={handleAddDespesa}
									usuario={usuario}
									setShowDespesaForm={setShowDespesaForm}
								/>
							</div>
							<div className='p-4'></div>
						</div>
					</div>
				)}
			</div>
			{mesSelecionado !== '00' && (
				<button
				onClick={() => dispatch(setFilter('00'))}
				className='bg-primary hover:bg-primaryHover text-sm text-tertiary py-2 px-2 rounded-2xl absolute bottom-4 left-4'
				>
					Voltar
				</button>
			)}

			<button
				onClick={handleLogout}
				className='bg-cancel hover:bg-cancelHover text-sm text-tertiary py-2 px-2 rounded-2xl absolute bottom-4 right-4'
			>
				Logout
			</button>
		</div>
	)
}

export default HomePage
