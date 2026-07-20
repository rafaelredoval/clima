const axios = require('axios');

module.exports = async (req, res) => {
    const cidade = req.query.cidade;

    if (!cidade) {
        return res.send('Uso correto: !clima [nome da cidade]');
    }

    // LEMBRE-SE DE COLOCAR SUA CHAVE DO WEATHERAPI AQUI
    const WEATHER_API_KEY = 'fe2850fba5e747f0921175505261607'; 

    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(cidade)}&lang=pt`;
        const response = await axios.get(url);
        
        const data = response.data;
        const nomeCidade = data.location.name;
        const estadoOuPais = data.location.region || data.location.country;
        const temp = data.current.temp_c;
        const sensacao = data.current.feelslike_c;
        const condicao = data.current.condition.text;
        const umidade = data.current.humidity;

        const mensagem = `🌤️ Clima em ${nomeCidade} (${estadoOuPais}): ${condicao} | 🌡️ Temp: ${temp}°C | 🥵 Sensação: ${sensacao}°C | 💧 Umidade: ${umidade}%`;
        
        return res.send(mensagem);

    } catch (error) {
        return res.send('⚠️ Cidade não encontrada ou erro ao buscar o clima. Tente novamente!');
    }
};
