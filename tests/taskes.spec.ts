import { test, expect } from '@playwright/test'

import { TaskModel } from './fixtures/task.model'
import { deleteTaskByHelper, postTask } from './support/helpers';

test('Cadastrar uma nova tarefa', async ({ page, request }) => {

    const task: TaskModel = { name: "Comprar o curso do papito", is_done: false }

    await deleteTaskByHelper(request, task.name)

    await page.goto('http://127.0.0.1:8080')

    const inputTaskName = page.locator('input[class*=InputNewTask]')
    await inputTaskName.fill(task.name)

    await page.click('css=button >> text=Create')

    const target = page.locator(`css=.task-item p >> text=${task.name}`)

    await expect(target).toBeVisible()
});

test('Não deve permitir cadastrar tarefa repetida', async ({ page, request }) => {

    const task: TaskModel = { name: "Estudar Playwright", is_done: false }

    // Chamadas na API para: Fazer o reset da massa, realizar o cadastro, verificar se o status recebido foi true
    await deleteTaskByHelper(request, task.name)
    await postTask(request, task)

    // Teste em si
    await page.goto('http://127.0.0.1:8080')

    const inputTaskName = page.locator('input[class*=InputNewTask]')
    await inputTaskName.fill(task.name)
    await page.click('css=button >> text=Create')

    const target = page.locator('.swal2-html-container')
    await expect(target).toHaveText('Task already exists!')
});