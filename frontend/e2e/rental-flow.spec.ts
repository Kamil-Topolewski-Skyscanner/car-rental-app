import { test, expect } from '@playwright/test';

test.describe('Car Rental App E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('complete car rental flow', async ({ page }) => {
    // Browse cars
    await expect(page.getByText('Available Cars')).toBeVisible();

    // Filter by car type
    await page.getByRole('button', { name: 'SUV' }).click();
    await expect(page.getByText('Honda CR-V')).toBeVisible();

    // Search functionality
    await page.getByPlaceholderText('Search by make or model...').fill('Honda');
    await expect(page.getByText('Honda CR-V')).toBeVisible();
    await expect(page.getByText('Toyota Camry')).not.toBeVisible();

    // Select a car
    await page.getByText('Honda CR-V').click();
    await expect(page.getByText('Select Rental Dates')).toBeVisible();

    // Select dates
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() + 1);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 3);

    await page.getByLabel('Start Date').click();
    await page.getByText(startDate.getDate().toString()).click();
    await page.getByLabel('End Date').click();
    await page.getByText(endDate.getDate().toString()).click();

    // Verify total price calculation
    await expect(page.getByText('Total Price: $210.00')).toBeVisible();

    // Start reservation
    await page.getByRole('button', { name: 'Reserve Now' }).click();
    await expect(page.getByText('Complete Your Reservation')).toBeVisible();

    // Fill reservation form
    await page.getByLabel('Full Name').fill('John Doe');
    await page.getByLabel('Email').fill('john@example.com');

    // Submit reservation
    await page.getByRole('button', { name: 'Confirm Reservation' }).click();

    // Verify success
    await expect(page.getByText('Reservation Confirmed')).toBeVisible();
    await expect(page.getByText('Confirmation sent to: john@example.com')).toBeVisible();
  });

  test('error handling in rental flow', async ({ page }) => {
    // Try to submit reservation without dates
    await page.getByText('Honda CR-V').click();
    await page.getByRole('button', { name: 'Reserve Now' }).click();
    await expect(page.getByText('Please select rental dates')).toBeVisible();

    // Try to submit form with invalid email
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByRole('button', { name: 'Confirm Reservation' }).click();
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();

    // Try to select unavailable dates
    await page.getByLabel('Start Date').click();
    await page.getByText('15').click();
    await expect(page.getByText('Not Available')).toBeVisible();
  });

  test('car browsing and filtering features', async ({ page }) => {
    // Verify filter buttons
    const filterButtons = ['ECONOMY', 'COMPACT', 'MIDSIZE', 'LUXURY', 'SUV', 'VAN'];
    for (const button of filterButtons) {
      await expect(page.getByRole('button', { name: button })).toBeVisible();
    }

    // Test multiple filters
    await page.getByRole('button', { name: 'LUXURY' }).click();
    await page.getByPlaceholderText('Search by make or model...').fill('BMW');

    // Verify filtered results
    await expect(page.getByText('BMW 7 Series')).toBeVisible();
    await expect(page.getByText('Toyota Camry')).not.toBeVisible();

    // Clear filters
    await page.getByRole('button', { name: 'LUXURY' }).click();
    await page.getByPlaceholderText('Search by make or model...').clear();

    // Verify all cars are shown
    await expect(page.getByText('Toyota Camry')).toBeVisible();
    await expect(page.getByText('BMW 7 Series')).toBeVisible();
  });
});
