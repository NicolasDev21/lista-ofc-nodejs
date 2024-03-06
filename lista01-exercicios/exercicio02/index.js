/* Exercício 02: Pergunta de entrada

Criar um algoritmo que solicite ao usuário seu nome e apresente uma saudação personalizada */

const inquirer = require('inquirer');
const chalk = require('chalk');

const userData = [
    {
        name: 'nome',
        username: 'username',
        message: 'Digite o seu nome:'
    }
];

inquirer
    .prompt(userData)
    .then((answers) => {
        const user = answers.nome;
        console.log(`Olá, ${user} ! Seja bem vindo(a) à nossa empresa.`);
    });