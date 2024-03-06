/* Exercício 04: Pergunta de múltipla escolha 

Crie um algoritmo que permita ao usuário selecionar suas frutas favoritas entre as seguintes opções:

Frutas Cítricas: 'Laranja','Limão','Tangerina'.

Outras frutas: 'Morango', 'Abacaxi', 'Mirtilo'.

Após receber as respostas imprima as frutas selecionadas

*/

const inquirer = require('inquirer');
const chalk = require('chalk');

const questionTypeFruit = [
    {
        type: 'list',
        name: 'typeFruits',
        message: 'Escolha um tipo de fruta:',
        choices: ['Frutas cítricas','Frutas não cítricas']
    }
];

const citrusFruits = [
    {
        type: 'checkbox',
        name: 'citrus',
        message: 'Selecione suas frutas cítricas favoritas',
        choices: ['Laranja','Limão','Tangerina']
    }
];

const otherFruits = [
    {
        type: 'checkbox',
        name: 'notCitrus',
        message: 'Selecione suas frutas favoritas',
        choices: ['Morango','Abacaxi','Mirtilo']
    }
];

inquirer
    .prompt(questionTypeFruit)
    .then((answers) => {

        const response = answers.typeFruits;

        if(response == 'Frutas cítricas'){
            inquirer.prompt(citrusFruits).then((answers) => {
                const responseCitrus = answers.citrus;

                console.log(`Frutas selecionadas: ${responseCitrus}`);
            });
        }else{
            inquirer.prompt(otherFruits).then((answers) => {
                const responseNotCitrus = answers.notCitrus;

                console.log(`Frutas selecionadas: ${responseNotCitrus}`);
            });
        };
    })
    
    .catch((err) => {
       console.error('Deu ruim!', err);
    })


