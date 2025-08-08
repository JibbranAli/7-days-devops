# Google Apps Script Setup Guide for DevOps Training Registration

This guide will help you set up the Google Apps Script to handle form submissions, store data in Google Sheets, and send confirmation emails.

## Prerequisites

1. A Google account
2. Access to Google Drive
3. Access to Google Sheets
4. Access to Google Apps Script

## Step 1: Create Google Spreadsheet

1. **Go to Google Sheets**
   - Visit [sheets.google.com](https://sheets.google.com)
   - Click "Blank" to create a new spreadsheet

2. **Name your spreadsheet**
   - Click on "Untitled spreadsheet" at the top
   - Rename it to "DevOps Training Registrations"

3. **Get the Spreadsheet ID**
   - Look at the URL in your browser
   - The URL will look like: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`
   - Copy the ID between `/d/` and `/edit`: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

## Step 2: Create Google Apps Script

1. **Go to Google Apps Script**
   - Visit [script.google.com](https://script.google.com)
   - Click "New project"

2. **Name your project**
   - Click on "Untitled project" at the top
   - Rename it to "DevOps Training Registration Handler"

3. **Replace the default code**
   - Delete the default `myFunction()` code
   - Copy and paste the entire code from `google-apps-script.gs`

4. **Update Configuration**
   - Find the configuration section at the top of the code
   - Replace the placeholder values:

```javascript
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your actual spreadsheet ID
const SHEET_NAME = 'Registrations'; // Name of the sheet where data will be stored
const SENDER_EMAIL = 'your-email@gmail.com'; // Replace with your Gmail address
const SENDER_NAME = 'Vimal Daga DevOps Training'; // Replace with your sender name
```

## Step 3: Deploy as Web App

1. **Click Deploy**
   - Click the "Deploy" button in the top right
   - Select "New deployment"

2. **Configure deployment**
   - **Type**: Web app
   - **Description**: DevOps Training Registration Handler v1
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone

3. **Deploy**
   - Click "Deploy"
   - Click "Authorize access" if prompted
   - Grant necessary permissions

4. **Get the Web App URL**
   - Copy the Web App URL that appears
   - It will look like: `https://script.google.com/macros/s/AKfycbz.../exec`

## Step 4: Update Your React Application

1. **Open your React project**
   - Navigate to `src/components/RegistrationForm.tsx`

2. **Update the API URL**
   - Find the `handleSubmit` function
   - Replace the placeholder URL with your actual Web App URL:

```javascript
const response = await fetch('YOUR_WEB_APP_URL_HERE', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
});
```

## Step 5: Test the Setup

1. **Test the script**
   - In Google Apps Script, go to the `testScript` function
   - Click the "Run" button (play icon)
   - Check the execution log for any errors

2. **Test the form**
   - Go to your React application
   - Fill out the registration form
   - Submit the form
   - Check if data appears in your Google Sheet
   - Check if confirmation email is received

## Step 6: Configure Email Settings

1. **Gmail Settings**
   - Make sure your Gmail account allows "less secure app access" or use OAuth2
   - For production, consider setting up OAuth2 authentication

2. **Email Templates**
   - The script includes both HTML and plain text email templates
   - You can customize the email content in the `createEmailTemplate` and `createPlainTextEmail` functions

## Step 7: Security and Permissions

1. **Spreadsheet Permissions**
   - Make sure your Google account has edit access to the spreadsheet
   - The script will create a new sheet called "Registrations" if it doesn't exist

2. **Apps Script Permissions**
   - The script needs permissions to:
     - Read/write to Google Sheets
     - Send emails via Gmail
     - Access Google Drive

## Troubleshooting

### Common Issues:

1. **"Spreadsheet not found" error**
   - Double-check the SPREADSHEET_ID
   - Make sure the spreadsheet is shared with your Google account

2. **"Email sending failed" error**
   - Check if your Gmail account allows script access
   - Verify the SENDER_EMAIL is correct

3. **"CORS error" in browser**
   - This is normal for Google Apps Script
   - The script handles CORS automatically

4. **Form data not appearing in sheet**
   - Check the browser console for errors
   - Verify the Web App URL is correct
   - Check the Apps Script execution log

### Testing:

1. **Test with sample data**
   - Use the `testScript` function in Apps Script
   - Check the execution log for results

2. **Check execution logs**
   - In Apps Script, go to "Executions" in the left sidebar
   - Click on recent executions to see logs

## Advanced Configuration

### Customizing Email Templates:

1. **HTML Template**
   - Edit the `createEmailTemplate` function
   - Modify the HTML and CSS as needed

2. **Plain Text Template**
   - Edit the `createPlainTextEmail` function
   - Update the text content

### Adding Validation:

1. **Form Validation**
   - Edit the `validateFormData` function
   - Add custom validation rules

2. **Data Processing**
   - Modify the `storeDataInSheet` function
   - Add data transformation logic

## Support

If you encounter any issues:

1. Check the Google Apps Script execution logs
2. Verify all configuration values are correct
3. Test with the `testScript` function
4. Check browser console for client-side errors

## Security Notes

1. **Web App URL**
   - Keep your Web App URL private
   - Don't share it publicly

2. **Spreadsheet Access**
   - Only share the spreadsheet with trusted users
   - Consider using Google Apps Script's built-in security features

3. **Email Security**
   - Use OAuth2 for production deployments
   - Monitor email sending limits

## Final Notes

- The script automatically creates the "Registrations" sheet if it doesn't exist
- All form data is validated before processing
- Confirmation emails are sent automatically
- The script handles errors gracefully and returns appropriate responses
- Test thoroughly before going live with your application 