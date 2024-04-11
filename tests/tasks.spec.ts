import { test } from '@playwright/test'

import { TaskModel } from './fixtures/task.model'
import { deleteTaskByHelper, postTask } from './support/helpers'
import { TasksPage } from './pages/tasks'

test('Cadastrar uma nova tarefa', async ({ page, request }) => {

    const task: TaskModel = { name: "Comprar o curso do papito", is_done: false }

    await deleteTaskByHelper(request, task.name)

    const tasksPage: TasksPage = new TasksPage(page)
    await tasksPage.go()
    await tasksPage.create(task)
    await tasksPage.shouldHaveText(task.name)

});

test('Não deve permitir cadastrar tarefa repetida', async ({ page, request }) => {

    const task: TaskModel = { name: "Estudar Playwright", is_done: false }

    // Chamadas na API para: Fazer o reset da massa, realizar o cadastro, verificar se o status recebido foi true
    await deleteTaskByHelper(request, task.name)
    await postTask(request, task)

    // Teste em si
    const tasksPage: TasksPage = new TasksPage(page)
    await tasksPage.go()
    await tasksPage.create(task)
    await tasksPage.alertHaveText('Task already exists!')

});