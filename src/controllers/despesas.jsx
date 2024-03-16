import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:3000/api/despesas',
})

// Função para obter o token JWT do armazenamento local
const getToken = () => {
  return localStorage.getItem('token')
}

const getAll = () => {
  return api.get('/', {
    headers: {
      Authorization: `Bearer ${getToken()}` // Inclui o token JWT no cabeçalho da solicitação
    }
  })
}

const create = (newObject) => {
  return api.post('/', newObject, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}

const update = (id, newObject) => {
  return api.put(`/${id}`, newObject, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}

const deleteDespesa = (id) => {
  return api.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}

export default { getAll, create, update, deleteDespesa }
