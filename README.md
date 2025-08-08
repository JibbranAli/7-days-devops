# DevOps Training Registration Website

A modern, responsive website for Vimal Daga's DevOps Training Program with integrated registration form that saves data to Google Sheets and sends automatic emails.

## Features

- 🎨 Modern, responsive design with dark/light theme
- 📝 Comprehensive registration form with all required fields
- 📊 Google Sheets integration for data storage
- 📧 Automatic email notifications to students and admin
- 🎯 Interactive countdown timer
- 📱 Mobile-friendly design
- ⚡ Fast loading with Vite
- 🔒 Form validation and security

## Registration Form Fields

The registration form collects the following information:

### Required Fields:
- **Full Name** - Student's complete name
- **College/Company** - Educational institution or workplace
- **Contact Number** - Phone number for communication
- **Email ID** - Primary email address
- **Current City** - Student's current location
- **Source of Information** - How they learned about the training (WhatsApp, LinkedIn, Instagram, Other)
- **Profession** - Student or Professional
- **Current Role/Position** - Current job title or student status

### Optional Fields:
- **Reference** - Who referred them (if any)
- **Years of Experience** - For professionals only
- **Expectations** - What they hope to achieve
- **Additional Information** - Any other relevant details

## Setup Instructions

### 1. Google Sheets Setup

1. **Create a new Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new spreadsheet
   - Note down the Spreadsheet ID from the URL

2. **Set up Google Apps Script**
   - Go to [Google Apps Script](https://script.google.com)
   - Create a new project
   - Copy the code from `google-apps-script.js`
   - Replace `YOUR_SPREADSHEET_ID` with your actual spreadsheet ID
   - Replace `YOUR_EMAIL` with your email address

3. **Deploy the Apps Script**
   - Click "Deploy" > "New deployment"
   - Choose "Web app" as the type
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone"
   - Click "Deploy"
   - Copy the Web App URL

4. **Set up Spreadsheet Headers**
   - In the Apps Script editor, run the `setupSpreadsheet()` function once
   - This will create the necessary column headers

### 2. Website Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Update the Apps Script URL**
   - Open `src/components/RegistrationForm.tsx`
   - Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL` with your actual Web App URL

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Google Apps Script Configuration

### Required Permissions:
- Google Sheets API
- Gmail API

### Environment Variables:
- `YOUR_SPREADSHEET_ID` - Your Google Sheets ID
- `YOUR_EMAIL` - Your email address for admin notifications

### Functions:
- `doPost(e)` - Handles form submissions
- `sendConfirmationEmail(studentData)` - Sends welcome email to students
- `sendAdminNotification(studentData)` - Sends notification to admin
- `setupSpreadsheet()` - Sets up spreadsheet headers (run once)

## Email Templates

### Student Welcome Email:
- Professional HTML template
- Registration confirmation
- Program details and next steps
- Important dates and expectations

### Admin Notification:
- New registration alerts
- Complete student information
- Registration timestamp

## Form Validation

The registration form includes comprehensive validation:

- **Name**: Letters and spaces only, minimum 2 characters
- **Email**: Valid email format
- **Phone**: 10-15 digits with optional formatting
- **Required Fields**: All mandatory fields must be completed
- **Real-time Validation**: Instant feedback as users type

## Security Features

- Form data validation
- Secure Google Apps Script deployment
- Email verification
- Data encryption in transit
- No sensitive data stored in frontend

## Customization

### Styling:
- Tailwind CSS for styling
- Dark/light theme support
- Responsive design
- Custom animations and transitions

### Content:
- Update training dates in `src/components/Countdown.tsx`
- Modify email templates in `google-apps-script.js`
- Customize form fields in `src/components/RegistrationForm.tsx`

## Troubleshooting

### Common Issues:

1. **Form not submitting**
   - Check Apps Script URL is correct
   - Verify Apps Script is deployed as web app
   - Check browser console for errors

2. **Emails not sending**
   - Verify Gmail API is enabled
   - Check Apps Script logs for errors
   - Ensure email addresses are valid

3. **Data not saving to Sheets**
   - Verify Spreadsheet ID is correct
   - Check Apps Script permissions
   - Run `setupSpreadsheet()` function

### Debug Mode:
- Open browser developer tools
- Check console for error messages
- Verify network requests are successful

## Support

For technical support or questions:
- Check the troubleshooting section
- Review Google Apps Script documentation
- Contact the development team

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Vimal Daga for the DevOps Training Program
- Google Apps Script for backend functionality
- React and Vite for frontend framework
- Tailwind CSS for styling 