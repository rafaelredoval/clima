const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// VEJA SE SUA CHAVE ESTÁ CORRETA AQUI
const WEATHER_API_KEY = 'SUA_CHAVE_AQUI'; 

app.get('/clima', async (req, res) => {
    const cidade = req.query.cidade;
    if (!cidade) {
        return res.send('Uso correto: !clima [nome da cidade]');
    }

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
        res.send(mensagem);

    } catch (error) {
        res.send('⚠️ Cidade não encontrada ou erro ao buscar o clima. Tente novamente!');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
