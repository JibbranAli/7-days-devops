# Quick Setup Guide - Google Apps Script Integration

## 🚀 Quick Start (5 minutes)

### 1. Create Google Spreadsheet
- Go to [sheets.google.com](https://sheets.google.com)
- Create new spreadsheet named "DevOps Training Registrations"
- Copy the Spreadsheet ID from URL (between `/d/` and `/edit`)

### 2. Create Google Apps Script
- Go to [script.google.com](https://script.google.com)
- Create new project named "DevOps Training Registration Handler"
- Replace default code with content from `google-apps-script.gs`
- Update these 3 values in the script:
  ```javascript
  const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
  const SENDER_EMAIL = 'your-email@gmail.com';
  const SENDER_NAME = 'Vimal Daga DevOps Training';
  ```

### 3. Deploy as Web App
- Click "Deploy" → "New deployment"
- Type: Web app
- Execute as: Me
- Who has access: Anyone
- Click "Deploy"
- Copy the Web App URL

### 4. Update React App
- Open `src/components/RegistrationForm.tsx`
- Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with your actual Web App URL

### 5. Test
- Fill out registration form
- Submit and check:
  - Data appears in Google Sheet
  - Confirmation email received

## 📋 Required Fields

The script expects these field names:
- `fullName` - Full Name
- `collegeCompany` - College/Company
- `contactNumber` - Contact Number
- `emailId` - Email ID
- `currentCity` - Current City
- `howDidYouKnow` - How did you come to know about this training?
- `reference` - Reference (optional)
- `studentOrProfessional` - Are you a Student or Professional?
- `yearsOfExperience` - Years of Experience (optional)
- `currentRole` - Current Role/Position
- `expectations` - What do you expect from this training?
- `additionalInformation` - Additional Information (optional)

## 🔧 Troubleshooting

### Common Issues:
1. **"Spreadsheet not found"** - Check SPREADSHEET_ID
2. **"Email sending failed"** - Check SENDER_EMAIL and Gmail permissions
3. **"CORS error"** - Normal for Google Apps Script, script handles it
4. **Form data not appearing** - Check Web App URL and execution logs

### Testing:
- Use `testScript()` function in Apps Script
- Check execution logs in Apps Script
- Verify all configuration values

## 📧 Email Template

The script sends professional HTML emails with:
- Training details (Aug 20, 2025, 11 PM - 7 PM)
- Registration confirmation
- Next steps
- Contact information

## 🔒 Security Notes

- Keep Web App URL private
- Only share spreadsheet with trusted users
- Monitor email sending limits
- Use OAuth2 for production

## 📞 Support

If issues persist:
1. Check Apps Script execution logs
2. Verify all configuration values
3. Test with `testScript()` function
4. Check browser console for errors 