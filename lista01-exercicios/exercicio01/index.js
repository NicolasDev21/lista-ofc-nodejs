/* Exercício 01: Pergunta múltipla escolha

Criar um programa que pergunte ao usuário qual sua cor favorita entre as opções: 'Vermelho','Verde','Azul' */

const inquirer = require('inquirer');
const chalk = require('chalk');

const colorOption = [
    {
        type: 'list',
        name: 'colors',
        message: 'Qual é a sua cor favorita?',
        choices: ['Vermelho','Verde','Azul']
    }
]

inquirer
    .prompt(colorOption)
    .then( (answers) => {

        const response = answers.colors;

        if(response === 'Vermelho'){
            console.log(`Sua cor favorita é: ${chalk.bgRed.black(response)}`);
        }else if(response === 'Verde'){
            console.log(`Sua cor preferida é: ${chalk.bgGreen.black(response)}`);
        }else{
            console.log(`Sua cor preferida é: ${chalk.bgBlue.black(response)}`);
        }
    });

