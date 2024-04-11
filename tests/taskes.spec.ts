import { test, expect } from '@playwright/test'
import { TaskModel } from './fixtures/task.model';
test('Cadastrar uma nova tarefa', async ({ page, request }) => {

    const task: TaskModel = { name: "Comprar o curso do papito", is_done: false}

    await request.delete('http://localhost:3333/helper/tasks/' + task.name)

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
    await request.delete('http://localhost:3333/helper/tasks/' + task.name)

    const newTask = await request.post('http://localhost:3333/tasks', { data: task })
    expect(newTask.ok()).toBeTruthy();

    // Teste em si
    await page.goto('http://127.0.0.1:8080')

    const inputTaskName = page.locator('input[class*=InputNewTask]')
    await inputTaskName.fill(task.name)
    await page.click('css=button >> text=Create')

    const target = page.locator('.swal2-html-container')
    await expect(target).toHaveText('Task already exists!')
});