import { expect, test } from '@playwright/test'

import { TaskModel } from './fixtures/task.model'
import { deleteTaskByHelper, postTask } from './support/helpers'
import { TasksPage } from './pages/tasks'

test('Cadastrar uma nova tarefa', async ({ page, request }) => {
    // Masa de teste
    const task: TaskModel = { name: "Comprar o curso do papito", is_done: false }

    // Chamadas na API
    await deleteTaskByHelper(request, task.name)

    // Cenário de teste
    const tasksPage: TasksPage = new TasksPage(page)
    await tasksPage.go()
    await tasksPage.create(task)
    await tasksPage.shouldHaveText(task.name)

});

test('Não deve permitir cadastrar tarefa repetida', async ({ page, request }) => {
    // Masa de teste
    const task: TaskModel = { name: "Estudar Playwright", is_done: false }

    // Chamadas na API
    await deleteTaskByHelper(request, task.name)
    await postTask(request, task)

    // Cenário de teste
    const tasksPage: TasksPage = new TasksPage(page)
    await tasksPage.go()
    await tasksPage.create(task)
    await tasksPage.alertHaveText('Task already exists!')

});

test   ('Não deve permitir criar tarefa vazia', async ({ page }) => {
    // Masa de teste
    const task: TaskModel = { name: "", is_done: false }

    // Cenário de teste
    const tasksPage: TasksPage = new TasksPage(page)
    await tasksPage.go()
    await tasksPage.create(task)
    const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
    expect(validationMessage).toEqual('This is a required field')
});