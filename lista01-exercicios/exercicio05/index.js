/* Exercício 05 | Pergunta com classificação

Crie um algoritmo que solicite ao usuário que classifique um determinado produto usando estrelas. A avaliação deve variar de 1 a 5 estrelas.

*/

const inquirer = require('inquirer');
const chalk = require('chalk');

const rating = [
    {
        type: 'list',
        name: 'rat',
        message: 'Avalie nosso produto!',
        choices: ['⭐','⭐⭐','⭐⭐⭐','⭐⭐⭐⭐','⭐⭐⭐⭐⭐']
    }
];


inquirer
    .prompt(rating)
    .then((answers) => {
        let response = answers.rat;

        switch(response){
            case '⭐':
                console.log(`Avaliado com uma estrela: 1 estrela `);
                break;
            case '⭐⭐':
                console.log(`Avaliado com uma estrela: 2 estrelas `);
                break;
            case '⭐⭐⭐':
                console.log(`Avaliado com uma estrela: 3 estrelas `);
                break;
            case '⭐⭐⭐⭐':
                console.log(`Avaliado com uma estrela: 4 estrelas `);
                break;
            case '⭐⭐⭐⭐⭐':
                console.log(`Avaliado com uma estrela: 5 estrelas `);
                break;
        }
    })