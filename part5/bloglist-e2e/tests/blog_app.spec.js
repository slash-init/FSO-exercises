const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset') //reset dB everytime testing
        await request.post('/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        })

        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByText('log in to application')).toBeVisible()
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'mluukkai', 'salainen')
            await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'mluukkai', 'wrong')
            await expect(page.getByText("wrong credentials")).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'mluukkai', 'salainen')
        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'title', 'author', 'url')
            await expect(page.getByText("title author")).toBeVisible()
        })

        test('blog can be liked', async ({ page }) => {
            await createBlog(page, 'title', 'author', 'url')
            await page.getByRole('button', { name: 'view' }).click()
            const likesBefore = await page.getByText(/likes \d+/).textContent()
            const countBefore = parseInt(likesBefore.match(/\d+/)[0])
            await page.getByRole('button', { name: 'like' }).click()
            await expect(page.getByText(`likes ${countBefore + 1}`)).toBeVisible()
        })

        test('blog can be deleted by the creator', async ({ page }) => {
            await createBlog(page, 'title', 'author', 'url')
            // Handle the confirm dialog
            page.on('dialog', dialog => dialog.accept())

            await page.getByRole('button', { name: 'view' }).click()

            await page.getByRole('button', { name: 'remove' }).click()

            await expect(page.getByText('title author')).not.toBeVisible()
        })

        test('only the creator sees the delete button', async ({ page, request }) => {
            await createBlog(page, 'Test Blog', 'Test Author', 'http://test.com')
            await page.getByRole('button', { name: 'logout' }).click()

            // Create second user
            await request.post('/api/users', {
                data: {
                    name: 'Second User',
                    username: 'seconduser',
                    password: 'password'
                }
            })

            // Login as second user
            await loginWith(page, 'seconduser', 'password')

            // View the blog created by first user
            await page.getByRole('button', { name: 'view' }).click()

            // Verify remove button is NOT visible
            await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })

        test('blogs are ordered by likes in descending order', async ({ page }) => {
            await createBlog(page, 'First Blog', 'Author One', 'http://first.com')
            await createBlog(page, 'Second Blog', 'Author Two', 'http://second.com')
            await createBlog(page, 'Third Blog', 'Author Three', 'http://third.com')

            // Like second blog twice
            const secondBlog = page.locator('.blog', { hasText: 'Second Blog' })
            await secondBlog.getByRole('button', { name: 'view' }).click()
            await secondBlog.getByRole('button', { name: 'like' }).click()
            await expect(secondBlog.getByText('likes 1')).toBeVisible()
            await secondBlog.getByRole('button', { name: 'like' }).click()
            await expect(secondBlog.getByText('likes 2')).toBeVisible()

            // Like third blog once
            const thirdBlog = page.locator('.blog', { hasText: 'Third Blog' })
            await thirdBlog.getByRole('button', { name: 'view' }).click()
            await thirdBlog.getByRole('button', { name: 'like' }).click()
            await expect(thirdBlog.getByText('likes 1')).toBeVisible()

            // Get updated blog order
            const blogsAfter = await page.locator('.blog').all()
            await expect(blogsAfter[0]).toContainText('Second Blog')
            await expect(blogsAfter[1]).toContainText('Third Blog')
            await expect(blogsAfter[2]).toContainText('First Blog')
        })
    })

})