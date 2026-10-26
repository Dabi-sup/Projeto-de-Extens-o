    async function iniciar(client, remetente) {
    const menu = "🪚 *Marcenaria Planejada - Nilton César*\n\n" +
                 "1 - Ver Mostruário Virtual\n" +
                 "2 - Tabela de Estimativas de Preços\n" +
                 "3 - Iniciar Formulário de Orçamento\n\n" +
                 "0 - Voltar ao menu principal";
    await client.sendMessage(remetente, menu);
}

async function responder(client, remetente, texto) {
    if (texto === '1') {
        await client.sendMessage(remetente, "Confira nossos trabalhos recentes (portas, janelas, bancos) no Instagram: [Link aqui]");
    } else if (texto === '2') {
        await client.sendMessage(remetente, "💰 *Estimativas Básicas:*\n- Bancos de madeira: a partir de R$ 150\n- Portas maciças: a partir de R$ 400\n\n*Valores exatos exigem orçamento.");
    } else if (texto === '3') {
        await client.sendMessage(remetente, "📏 *Formulário de Medidas:*\nPor favor, digite o TIPO DO MÓVEL e as MEDIDAS aproximadas (Altura x Largura).");
    } else if (texto === '0') {
        await client.sendMessage(remetente, "Digite 'menu' para recomeçar.");
    } else {
        await client.sendMessage(remetente, "Não entendi. Digite 1, 2, 3 ou 0.");
    }
}

module.exports = { iniciar, responder };