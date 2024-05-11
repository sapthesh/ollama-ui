import { url, model } from '../helpers';
import { test, expect } from 'playwright/test';
import { GITHUB_ACTIONS, AppTest } from '../AppTest';

test.describe('Application tests', () => {
  let app;

  test.beforeEach(async () => {
    app = new AppTest();
    await app.start();
  });

  test.afterEach(async ({ page }) => {
    // Taking a screenshot if a test fails
    if (test.info().status === 'failed') {
      await page.screenshot({ path: `${test.info().title}-failure.png` });
    }
    await app.close(test.info().title);
  });

  // Individual tests remain unchanged...

  /*
  test('Send message (server down)', async () => {
    await app.updateSettings('http://localhost:999999')
    await app.page.fill('#message-input', 'What is the meaning of life?')
    await app.page.click('#send-button')
    await app.page.waitForTimeout(500) // Small delay to allow UI to update
    await expect(app.page.locator('#abort-button')).not.toBeVisible()
    await expect(app.page.locator('#send-button')).toBeVisible()
  })
  */

  test('New chat', async () => {
    await app.newChat('Happy Hamster');
  });

  test('Delete chat', async () => {
    await app.newChat('Happy Hamster');
    await app.deleteChat('Happy Hamster');
  });

  test('Clear chats', async () => {
    await app.newChat('Happy Hamster');
    await app.deleteChat('Happy Hamster');
  });

  test('Select chat', async () => {
    await app.newChat('Happy Hamster');
    await app.newChat('Smart Hamster');
    await app.newChat('Super Hamster');
    await app.selectChat('Happy Hamster');
    await app.selectChat('Super Hamster');
    await app.selectChat('Smart Hamster');
  });

  test('Edit chat title', async () => {
    await app.newChat('Happy Hamster');
    await app.editChatTitle('Super Hamster');
  });

  test('Search chats', async () => {
    // Create chats for each country
    for (const name of [
      'History of Finland',
      'History of Sweden',
      'History of Canada',
      'History of Norway',
      'History of Denmark',
    ]) {
      await app.newChat(name);
    }

    // Initiate search
    await app.page.click('#chats-menu-button');
    await app.page.click('#search-button');

    // Search for 'USA' and check that 'Sweden' and 'Finland' are not visible
    await app.page.type('#search-input', 'USA');
    await app.page.waitForTimeout(500); // Small delay to allow UI to update
    // Check if 'Sweden' is NOT visible
    let swedenVisible = await app.page
      .locator('.chat-list-item:has-text("Sweden")')
      .isVisible();
    expect(swedenVisible).not.toBeTruthy();
    // Check if 'Finland' is NOT visible
    let finlandVisible = await app.page
      .locator('.chat-list-item:has-text("Finland")')
      .isVisible();
    expect(finlandVisible).not.toBeTruthy();

    // Search for 'Sweden', and verify its visibility
    await app.page.fill('#search-input', '');
    await app.page.type('#search-input', 'w');
    await app.page.waitForTimeout(500); // Small delay to allow UI to update
    await app.screenshot('search.png');
    // Check if 'Sweden' is visible
    swedenVisible = await app.page
      .locator('.chat-list-item:has-text("Sweden")')
      .isVisible();
    expect(swedenVisible).toBeTruthy();
    // Check if 'Finland' is NOT visible
    finlandVisible = await app.page
      .locator('.chat-list-item:has-text("Finland")')
      .isVisible();
    expect(finlandVisible).toBeFalsy();
  });

  test('Collapse sidebar', async () => {
    for (const name of [
      'History of Finland',
      'History of Sweden',
      'History of Norway',
      'History of Denmark',
      'History of Germany',
      'History of Ukraine',
      'History of France',
    ]) {
      await app.newChat(name);
    }
    // Collapse sidebar
    await app.page.click('#hamburger-menu');
    await expect(app.sidebar).toHaveClass(/.*collapsed.*/);
    await app.page.reload();
    // Remembers collaped state
    await expect(app.sidebar).toHaveClass(/.*collapsed.*/);
  });

  if (GITHUB_ACTIONS === false) {
    test('Send message', async () => {
      await app.updateSettings(url, model);
      // Create chat
      await app.editChatTitle('Tell me a joke');
      await app.sendMessage('Tell me a joke');
      await app.sendMessage('Make it more ridiculous');
      await app.sendMessage('Make it even more ridiculous');
      await app.screenshot('chat.png');
      // Collapse
      await app.page.click('#hamburger-menu');
      await app.page.waitForTimeout(500); // Wait for 500 milliseconds to allow animation to complete
      await app.screenshot('chat-collapsed.png');
    });

    test('Show settings', async () => {
      await app.updateSettings(url, model);
      await app.showSettings();
      await app.screenshot('settings.png');
    });

    test('Update settings', async () => {
      await app.updateSettings(url, model);
    });
  }

  /*
  TODO:
  test('Download chat', async () => {
    await app.updateSettings(url, model)
    await app.sendMessage('What is 10+10?')

    // Set up a listener for the download event
    const [ download ] = await Promise.all([
      // It's important to set up the listener before triggering the download
      app.page.waitForEvent('download'),
      // Trigger the download here
      app.page.click('.download-button')
    ])

    // Wait for the download to complete
    const path = await download.path()

    // Verify the download (e.g., check file name, size, etc.)
    console.log(`Downloaded file: ${path}`)

    // Optional: Check the download's filename
    console.log(`Downloaded filename: ${download.suggestedFilename()}`)
  })
  */
});
