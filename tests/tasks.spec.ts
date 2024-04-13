import { expect, test } from '@playwright/test'

import { TaskModel } from './fixtures/task.model'
import { deleteTaskByHelper, postTask } from './support/helpers'
import { TasksPage } from './pages/tasks'

import data from './fixtures/tasks.json'

test.describe('Cadastro de task', () => {
    test('Cadastrar uma nova tarefa', async ({ page, request }) => {
        // Massa de teste
        const task = data.sucess as TaskModel

        // Chamadas na API
        await deleteTaskByHelper(request, task.name)

        // Instanciando o page object
        const tasksPage: TasksPage = new TasksPage(page)
        
        // Cenário de teste
        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.shouldHaveText(task.name)

    });

    test('Não deve permitir cadastrar tarefa repetida', async ({ page, request }) => {
        // Massa de teste
        const task = data.duplicate as TaskModel

        // Chamadas na API 
        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        // Instanciando o page object
        const tasksPage: TasksPage = new TasksPage(page)

        // Cenário de teste
        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.alertHaveText('Task already exists!')

    });

    test('Não deve permitir criar tarefa vazia', async ({ page }) => {
        // Massa de teste
        const task = data.required as TaskModel

        // Instanciando o page object
        const tasksPage: TasksPage = new TasksPage(page)

        // Cenário de teste
        await tasksPage.go()
        await tasksPage.create(task)
        const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)

        // Assert
        expect(validationMessage).toEqual('This is a required field')
    });
});

test.describe('Atualização', ()=>{
    test('Deve conseguir concluir uma tarefa', async ({ page, request }) => {
        // Massa de teste
        const task = data.update as TaskModel

        // Chamada na API para excluir e adicionar a tarefa
        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        // Instanciando o page object
        const tasksPage: TasksPage = new TasksPage(page)

        // Cenário
        await tasksPage.go()
        await tasksPage.toggle(task.name)

        // Assert
        await tasksPage.shoulBeDone(task.name)


    });
});
