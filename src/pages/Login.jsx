import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import loginController from '../controllers/login'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const navigate = useNavigate()

	const userRef = useRef()

	useEffect(() => {
		//para colocar o foco no user quando o componente é renderizado
		userRef.current.focus()
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()

		// Validação básica
		if (username.trim() === '') {
			setError('Por favor, insira o nome de usuário.')
			return
		}

		if (password.trim() === '') {
			setError('Por favor, insira a senha.')
			return
		}

		// Chama a função de login do controller
		const success = await loginController.login(username, password)

		if (success) {
			// Login bem-sucedido
			setError('')
			navigate('/')
			// Redirecionar ou executar ações apropriadas após o login
		} else {
			setError('Nome de usuário ou senha incorretos.')
		}
	}

	const handleLogout = () => loginController.logout()

	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='bg-white shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4'>
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label htmlFor='username' className='block text-gray-700 text-base font-bold mb-2'>
							Login:
						</label>
						<input
							type='text'
							id='username'
							ref={userRef}
							value={username}
							autoComplete='off'
							onChange={(e) => setUsername(e.target.value)}
							className='shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							placeholder='Nome de usuário'
						/>
					</div>
					<div className='mb-6'>
						<label htmlFor='password' className='block text-gray-700 text-base font-bold mb-2'>
							Senha:
						</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							placeholder='*********'
						/>
					</div>
					{error && <div className='text-red-500 mb-4'>{error}</div>}
					<div className='flex justify-center'>
						<button
							type='submit'
							className='bg-forth hover:bg-forthHover text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline'
						>
							Entrar
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
