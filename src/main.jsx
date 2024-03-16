import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './styles/global.css'
import { Provider } from 'react-redux' //tive que instalar o pacote redux react-redux
import { store } from './state/store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)
