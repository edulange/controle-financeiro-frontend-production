// Importe as dependências necessárias
import axios from 'axios';

// Função para fazer login
const login = async (username, password) => {
  try {
    // Faz a solicitação POST para a rota de login no backend
    const response = await axios.post('http://localhost:3000/api/users/login', {
      username,
      password
    });

    // Verifica se a resposta possui um token JWT
    const { token } = response.data;
    console.log('token :>> ', response);
    if (token) {
      // Armazena o token JWT no localStorage
      localStorage.setItem('token', token);
      console.log('login bem sucedido, do controller login => frontend')
      // Retorna true para indicar que o login foi bem-sucedido
      return true;
    } else {
        console.log('token faltando, do controller login')
        // Retorna false se não houver token na resposta
        return false;
    }
} catch (error) {
    console.error('Erro ao fazer login (frontend):', error.response.data);
    //verificar isso amanhã, lembre a mensagem error está passando, mas deve ser error.response.data?
    // Retorna false se ocorrer algum erro durante o processo de login
    return false;
  }
};

const logout = async () => {
    localStorage.clear()
    window.alert('logout bem sucedido')
}

// Exporta a função de login para ser utilizada em outros componentes
export default { login, logout };
