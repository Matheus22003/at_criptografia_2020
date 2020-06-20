const fs = require('fs');

const pegarNotas = () => {
    return "Suas Notas";
}

const carregarNotas = () => {
    const dados = fs.readFileSync('notas.json');   
    const dadosFormatados = dados.toString();   
    const dadosJSON = JSON.parse(dadosFormatados);

    return dadosJSON;
}

const salvarNotas = (notas) => {
    //transformo objeto em String
    const dadosJSON = JSON.stringify(notas);
    //Escrevo essa string no arquivo.json
    fs.writeFileSync('notas.json', dadosJSON);
}

const removerNota = ( nota_titulo ) => {
    const notas = carregarNotas();
    const notas_para_manter = notas.filter( (nota) => {
        //returna apenas as notas que o titulo
        //não é igual ao "nota_titulo"
        return nota.titulo.toUpperCase() != nota_titulo.toUpperCase();
    });

    //Se o tamanho da lista "notas_para_manter" for menor
    //que a lista "notas", significa que uma nota teve que ser removida
    if ( notas.length > notas_para_manter.length ){
        console.log("Nota removida!");
        salvarNotas(notas_para_manter);
    }else{
        console.log("Nenhum nota encontrada para remover!");
    }
}

const adicionarNota = ( novo_titulo, novo_texto ) => {
    const notas = carregarNotas();
    const notasDuplicadas = notas.filter( (nota) => {
            return nota.titulo.toUpperCase() === novo_titulo.toUpperCase();
    } )

    if( notasDuplicadas == 0 ){
        notas.push( {
            titulo: novo_titulo,
            texto: novo_texto
        });
        console.log("Nota Adicionada!");
        salvarNotas(notas);
    }else{
        console.log("Titulo da sua nota já existe");
    }

}

const listarNotas = () => {
    const notas = carregarNotas();

    notas.forEach( (nota) => {
        console.log("Titulo: " + nota.titulo);
        console.log("Texto: " + nota.texto);
    } )
}

const lerNota = ( titulo_nota ) => {
    const notas = carregarNotas();

    const nota_para_ler = notas.find( (nota) => {
        return nota.titulo.toUpperCase() === titulo_nota.toUpperCase();
    });

    if ( nota_para_ler ) {
        console.log("Titulo: " + nota_para_ler.titulo);
        console.log("texto: " + nota_para_ler.texto);
    }else{
        console.log("Nota não encontrada...");
    }
}

module.exports = {
    pegarNotas: pegarNotas,
    listarNotas: listarNotas,
    lerNota: lerNota,
    adicionarNota: adicionarNota,
    removerNota: removerNota
}