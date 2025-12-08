import { test, expect } from '@playwright/test';

test.describe('Kaizen Creator Platform E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage and show login screen', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Welcome to Kaizen');
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
  });

  test('should allow user login and navigate to dashboard', async ({ page }) => {
    // Mock login process
    await page.getByRole('button', { name: /login/i }).click();
    
    // Should navigate to creator dashboard
    await expect(page.locator('h1')).toContainText('Creator Dashboard');
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('AI Content Generator should generate unique content', async ({ page }) => {
    // Login first
    await page.getByRole('button', { name: /login/i }).click();
    
    // Navigate to AI Content Generator
    await page.getByRole('link', { name: /ai content/i }).click();
    
    // Fill in prompt
    await page.getByPlaceholder(/add specific requirements/i).fill('gaming content for young adults interested in competitive FPS games');
    
    // Generate content
    await page.getByRole('button', { name: /generate content ideas/i }).click();
    
    // Wait for generation to complete
    await expect(page.getByText(/analyzing & generating/i)).toBeVisible();
    await expect(page.getByText(/analyzing & generating/i)).not.toBeVisible({ timeout: 10000 });
    
    // Check that ideas were generated
    await page.getByRole('tab', { name: /generated ideas/i }).click();
    await expect(page.locator('[data-testid="content-idea"]')).toHaveCount({ min: 3 });
    
    // Test that ideas are unique by checking titles
    const ideaTitles = await page.locator('[data-testid="content-idea"] h3').allTextContents();
    const uniqueTitles = new Set(ideaTitles);
    expect(uniqueTitles.size).toBe(ideaTitles.length); // All titles should be unique
  });

  test('should add content ideas to pipeline', async ({ page }) => {
    // Login and navigate to AI Content Generator  
    await page.getByRole('button', { name: /login/i }).click();
    await page.getByRole('link', { name: /ai content/i }).click();
    
    // Generate ideas
    await page.getByPlaceholder(/add specific requirements/i).fill('tech review content');
    await page.getByRole('button', { name: /generate content ideas/i }).click();
    await expect(page.getByText(/analyzing & generating/i)).not.toBeVisible({ timeout: 10000 });
    
    // Navigate to ideas tab and add to pipeline
    await page.getByRole('tab', { name: /generated ideas/i }).click();
    await page.getByRole('button', { name: /add to pipeline/i }).first().click();
    
    // Check success toast
    await expect(page.getByText(/added to pipeline/i)).toBeVisible();
    
    // Navigate to content hub and verify task was added
    await page.getByRole('link', { name: /content hub/i }).click();
    await expect(page.locator('.content-task')).toHaveCount({ min: 1 });
  });

  test('Growth Engine buttons should be functional', async ({ page }) => {
    // Login and navigate to Growth Engine
    await page.getByRole('button', { name: /login/i }).click();
    await page.getByRole('link', { name: /growth engine/i }).click();
    
    // Analyze growth opportunities
    await page.getByRole('button', { name: /analyze growth opportunities/i }).click();
    await expect(page.getByText(/analyzing/i)).toBeVisible();
    await expect(page.getByText(/analyzing/i)).not.toBeVisible({ timeout: 10000 });
    
    // Check strategies were generated
    await page.getByRole('tab', { name: /strategies/i }).click();
    await expect(page.locator('[data-testid="growth-strategy"]')).toHaveCount({ min: 1 });
    
    // Click on first strategy and test buttons
    await page.locator('[data-testid="growth-strategy"]').first().click();
    
    // Test Start Implementation button
    await page.getByRole('button', { name: /start implementation/i }).click();
    await expect(page.getByText(/implementation started/i)).toBeVisible();
    
    // Test Save for Later button  
    await page.getByRole('button', { name: /save for later/i }).click();
    await expect(page.getByText(/strategy saved/i)).toBeVisible();
    
    // Test Add to Pipeline button
    await page.getByRole('button', { name: /add to pipeline/i }).click();
    await expect(page.getByText(/added.*tasks.*pipeline/i)).toBeVisible();
  });

  test('Account Preview should display user information', async ({ page }) => {
    // Login
    await page.getByRole('button', { name: /login/i }).click();
    
    // Click on account preview (bottom-left avatar)
    await page.locator('[data-testid="account-preview-trigger"]').click();
    
    // Check that profile modal opens with user info
    await expect(page.getByText(/account profile/i)).toBeVisible();
    await expect(page.getByText(/MrBeast/i)).toBeVisible(); // Mock user name
    await expect(page.getByText(/@mrbeast/i)).toBeVisible(); // Mock handle
    await expect(page.getByText(/46.6M/i)).toBeVisible(); // Mock followers
    
    // Test Edit Profile button
    await page.getByRole('button', { name: /edit profile/i }).click();
    // Should show some edit functionality or toast
  });

  test('Brand Ventures should generate contextual product ideas', async ({ page }) => {
    // Login and navigate to Brand Ventures
    await page.getByRole('button', { name: /login/i }).click();
    await page.getByRole('link', { name: /brand ventures/i }).click();
    
    // Fill in audience description
    const audienceText = 'young gamers aged 18-25 interested in competitive esports and streaming';
    await page.getByPlaceholder(/describe your audience/i).fill(audienceText);
    
    // Generate ideas
    await page.getByRole('button', { name: /brainstorm product ideas/i }).click();
    await expect(page.getByText(/brainstorming/i)).toBeVisible();
    await expect(page.getByText(/brainstorming/i)).not.toBeVisible({ timeout: 5000 });
    
    // Check that ideas were generated with proper structure
    await expect(page.locator('.product-idea')).toHaveCount({ min: 3 });
    await expect(page.getByText(/price:/i)).toBeVisible();
    await expect(page.getByText(/margin:/i)).toBeVisible();
    await expect(page.getByText(/relevance:/i)).toBeVisible();
    
    // Test action buttons
    await page.getByRole('button', { name: /add to development/i }).first().click();
    await page.getByRole('button', { name: /market research/i }).first().click();
  });

  test('Content Hub drag and drop should work', async ({ page }) => {
    // Login and navigate to Content Hub
    await page.getByRole('button', { name: /login/i }).click();
    await page.getByRole('link', { name: /content hub/i }).click();
    
    // Add a new task
    await page.getByRole('button', { name: /add task/i }).click();
    
    // Verify task was added to Ideas column
    const ideasColumn = page.locator('[data-column="idea"]');
    await expect(ideasColumn.locator('.content-task')).toHaveCount({ min: 1 });
    
    // Test drag and drop functionality (basic check)
    const firstTask = ideasColumn.locator('.content-task').first();
    await expect(firstTask).toBeVisible();
    await expect(firstTask).toHaveAttribute('draggable', 'true');
  });

  test('Analytics page should display metrics and charts', async ({ page }) => {
    // Login and navigate to Analytics
    await page.getByRole('button', { name: /login/i }).click();
    await page.getByRole('link', { name: /analytics/i }).click();
    
    // Check key metrics are displayed
    await expect(page.getByText(/total followers/i)).toBeVisible();
    await expect(page.getByText(/monthly views/i)).toBeVisible();
    await expect(page.getByText(/avg engagement/i)).toBeVisible();
    await expect(page.getByText(/revenue growth/i)).toBeVisible();
    
    // Check charts are rendered
    await expect(page.locator('[data-testid="audience-growth-chart"]')).toBeVisible();
    await expect(page.locator('[data-testid="platform-distribution-chart"]')).toBeVisible();
    await expect(page.locator('[data-testid="engagement-metrics-chart"]')).toBeVisible();
  });

  test('Talent Network should display and allow talent interaction', async ({ page }) => {
    // Login and navigate to Talent Network
    await page.getByRole('button', { name: /login/i }).click();
    await page.getByRole('link', { name: /talent network/i }).click();
    
    // Check talent cards are displayed
    await expect(page.locator('[data-testid="talent-card"]')).toHaveCount({ min: 1 });
    
    // Click on first talent to view profile
    await page.locator('[data-testid="talent-card"]').first().click();
    
    // Check modal opens with talent details
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText(/about/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /contact/i })).toBeVisible();
    
    // Test contact button
    await page.getByRole('button', { name: /contact/i }).click();
    // Should trigger some action (could be tested with mocked API)
  });
});

// API Integration Tests
test.describe('API Integration Tests', () => {
  test('should handle AI content generation API correctly', async ({ page }) => {
    // Mock API response
    await page.route('**/api/ai/generate-content', async route => {
      await route.fulfill({
        json: {
          ideas: [
            {
              title: 'Test AI Generated Idea',
              description: 'This is a test generated by AI',
              viralityScore: 85,
              engagementPotential: 78
            }
          ]
        }
      });
    });
    
    // Test the actual API integration
    await page.goto('/');
    await page.getByRole('button', { name: /login/i }).click();
    await page.getByRole('link', { name: /ai content/i }).click();
    
    await page.getByPlaceholder(/add specific requirements/i).fill('test prompt');
    await page.getByRole('button', { name: /generate content ideas/i }).click();
    
    // Verify API was called and response handled
    await expect(page.getByText(/test ai generated idea/i)).toBeVisible();
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Mock API error
    await page.route('**/api/**', route => route.abort('failed'));
    
    await page.goto('/');
    await page.getByRole('button', { name: /login/i }).click();
    await page.getByRole('link', { name: /ai content/i }).click();
    
    await page.getByPlaceholder(/add specific requirements/i).fill('test prompt');
    await page.getByRole('button', { name: /generate content ideas/i }).click();
    
    // Should show error message
    await expect(page.getByText(/generation failed/i)).toBeVisible();
  });
});