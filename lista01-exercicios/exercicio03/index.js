/* Exercício 03: Pergunta de confirmação

Crie um algoritmo que pergunte ao usuário: "Você deseja continuar?".
O usuário deve escolher entre "Sim" ou "Não".

Imprima a resposta do usuário destacando sua resposta em verde("Sim") ou vermelho("Não") */


const inquirer = require('inquirer');
const chalk = require('chalk');

const questionForUser = [
    {
        type: 'list',
        name: 'question',
        message: 'Você deseja continuar?',
        choices: ['Sim','Não']
    }
];

inquirer
    .prompt(questionForUser)
    .then((answers) => {

        const response = answers.question;

        if(response === 'Sim'){
            console.log(`User response: ${chalk.bgGreen.black(response)}`);
        }else{
            console.log(`User response: ${chalk.bgRed.black(response)}`);
        }
    })
    .catch((err) => {
        console.log('Deu ruim!', err);
    })