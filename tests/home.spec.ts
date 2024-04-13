import { expect, test } from '@playwright/test'

import { TaskModel } from './fixtures/task.model'
import { TasksPage } from './pages/tasks'

let tasksPage: TasksPage

test.beforeEach(({ page }) => {
    tasksPage = new TasksPage(page)
});

test('Webapp deve estar online', async ({page}) => {
    await tasksPage.go()
    await expect(page).toHaveTitle('Gerencie suas tarefas com Mark L')
});