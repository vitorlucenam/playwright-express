import { expect, test } from '@playwright/test'

import { TaskModel } from './fixtures/task.model'
import { deleteTaskByHelper, postTask } from './support/helpers'
import { TasksPage } from './pages/tasks'

import data from './fixtures/tasks.json'

let tasksPage: TasksPage

test.beforeEach(({ page }) => {
    tasksPage = new TasksPage(page)
});

test.describe('Cadastro de task', () => {
    test('Cadastrar uma nova tarefa', async ({ request }) => {
        // Massa de teste
        const task = data.sucess as TaskModel

        // Chamadas na API
        await deleteTaskByHelper(request, task.name)
        
        // Cenário de teste
        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.shouldHaveText(task.name)

    });

    test('Não deve permitir cadastrar tarefa repetida', async ({ request }) => {
        // Massa de teste
        const task = data.duplicate as TaskModel

        // Chamadas na API 
        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        // Cenário de teste
        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.alertHaveText('Task already exists!')

    });

    test('Não deve permitir criar tarefa vazia', async () => {
        // Massa de teste
        const task = data.required as TaskModel

        // Cenário de teste
        await tasksPage.go()
        await tasksPage.create(task)
        const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)

        // Assert
        expect(validationMessage).toEqual('This is a required field')
    });
});

test.describe('Atualização', ()=>{
    test('Deve conseguir concluir uma tarefa', async ({ request }) => {
        // Massa de teste
        const task = data.update as TaskModel

        // Chamada na API para excluir e adicionar a tarefa
        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        // Cenário
        await tasksPage.go()
        await tasksPage.toggle(task.name)

        // Assert
        await tasksPage.shoulBeDone(task.name)


    });
});

test.describe('Exclusão', ()=>{
    test('Deve conseguir excluir uma tarefa', async ({ request }) => {
        // Massa de teste
        const task = data.update as TaskModel

        // Chamada na API para excluir e adicionar a tarefa
        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        // Cenário
        await tasksPage.go()
        await tasksPage.remove(task.name)

        // Assert
        await tasksPage.shouldNotExist(task.name)


    });
});
