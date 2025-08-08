// Google Apps Script for DevOps Training Registration Form
// This script handles form submissions, stores data in Google Sheets, and sends confirmation emails

// Configuration - Update these values
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your actual spreadsheet ID
const SHEET_NAME = 'Registrations'; // Name of the sheet where data will be stored
const SENDER_EMAIL = 'your-email@gmail.com'; // Replace with your Gmail address
const SENDER_NAME = 'Vimal Daga DevOps Training'; // Replace with your sender name

// Main function to handle POST requests from the registration form
function doPost(e) {
  try {
    let data;
    
    // Try to parse the incoming data
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      // If JSON parsing fails, try to handle form data
      const formData = e.parameter;
      if (formData && formData.data) {
        data = JSON.parse(formData.data);
      } else {
        return ContentService
          .createTextOutput(JSON.stringify({
            success: false,
            error: 'Invalid data format'
          }))
          .setMimeType(ContentService.MimeType.JSON)
          .setHeader('Access-Control-Allow-Origin', '*')
          .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
          .setHeader('Access-Control-Allow-Headers', 'Content-Type');
      }
    }
    
    // Validate required fields
    const validationResult = validateFormData(data);
    if (!validationResult.isValid) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: validationResult.error
        }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeader('Access-Control-Allow-Origin', '*')
        .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        .setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
    
    // Store data in Google Sheets
    const sheetResult = storeDataInSheet(data);
    if (!sheetResult.success) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Failed to store data: ' + sheetResult.error
        }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeader('Access-Control-Allow-Origin', '*')
        .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        .setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
    
    // Send confirmation email
    const emailResult = sendConfirmationEmail(data);
    if (!emailResult.success) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Data stored but email failed: ' + emailResult.error
        }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeader('Access-Control-Allow-Origin', '*')
        .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        .setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Registration successful! Check your email for confirmation.',
        rowNumber: sheetResult.rowNumber
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'Server error: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

// Handle OPTIONS requests for CORS preflight
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type')
    .setHeader('Access-Control-Max-Age', '86400');
}

// Function to validate form data
function validateFormData(data) {
  const requiredFields = [
    'fullName',
    'collegeCompany',
    'contactNumber',
    'emailId',
    'currentCity',
    'howDidYouKnow',
    'studentOrProfessional',
    'currentRole',
    'expectations'
  ];
  
  for (const field of requiredFields) {
    if (!data[field] || data[field].trim() === '') {
      return {
        isValid: false,
        error: `Missing required field: ${field}`
      };
    }
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.emailId)) {
    return {
      isValid: false,
      error: 'Invalid email format'
    };
  }
  
  // Validate phone number (basic validation)
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  if (!phoneRegex.test(data.contactNumber)) {
    return {
      isValid: false,
      error: 'Invalid phone number format'
    };
  }
  
  return { isValid: true };
}

// Function to store data in Google Sheets
function storeDataInSheet(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Add headers
      const headers = [
        'Timestamp',
        'Full Name',
        'College/Company',
        'Contact Number',
        'Email ID',
        'Current City',
        'How did you come to know about this training?',
        'Reference',
        'Are you a Student or Professional?',
        'Years of Experience',
        'Current Role/Position',
        'What do you expect from this training?',
        'Additional Information'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    }
    
    // Prepare data row
    const rowData = [
      new Date(), // Timestamp
      data.fullName,
      data.collegeCompany,
      data.contactNumber,
      data.emailId,
      data.currentCity,
      data.howDidYouKnow,
      data.reference || '',
      data.studentOrProfessional,
      data.yearsOfExperience || '',
      data.currentRole,
      data.expectations,
      data.additionalInformation || ''
    ];
    
    // Append data to sheet
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);
    
    return {
      success: true,
      rowNumber: lastRow + 1
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

// Function to send confirmation email
function sendConfirmationEmail(data) {
  try {
    const subject = 'DevOps Training Registration Confirmation - Vimal Daga';
    const htmlBody = createEmailTemplate(data);
    const plainBody = createPlainTextEmail(data);
    
    // Send email
    GmailApp.sendEmail(
      data.emailId,
      subject,
      plainBody,
      {
        name: SENDER_NAME,
        htmlBody: htmlBody,
        replyTo: SENDER_EMAIL
      }
    );
    
    return { success: true };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

// Function to create HTML email template
function createEmailTemplate(data) {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .highlight { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .button { display: inline-block; background: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>DevOps Training Registration Confirmed</h1>
          <p>Welcome to the 7-Day DevOps Training Program</p>
        </div>
        
        <div class="content">
          <p>Dear ${data.fullName},</p>
          
          <p>Thank you for registering for our comprehensive 7-Day DevOps Training Program! Your registration has been successfully confirmed.</p>
          
          <div class="highlight">
            <h3>Training Details:</h3>
            <ul>
              <li><strong>Start Date:</strong> August 20, 2025</li>
              <li><strong>Time:</strong> 11:00 PM - 7:00 PM (IST)</li>
              <li><strong>Duration:</strong> 7 Days</li>
              <li><strong>Format:</strong> Live Online Training</li>
              <li><strong>Cost:</strong> COMPLETELY FREE</li>
            </ul>
          </div>
          
          <div class="details">
            <h3>Your Registration Details:</h3>
            <p><strong>Name:</strong> ${data.fullName}</p>
            <p><strong>Email:</strong> ${data.emailId}</p>
            <p><strong>Contact:</strong> ${data.contactNumber}</p>
            <p><strong>City:</strong> ${data.currentCity}</p>
            <p><strong>Organization:</strong> ${data.collegeCompany}</p>
            <p><strong>Role:</strong> ${data.studentOrProfessional}</p>
            ${data.yearsOfExperience ? `<p><strong>Experience:</strong> ${data.yearsOfExperience} years</p>` : ''}
          </div>
          
          <div class="highlight">
            <h3>What's Next?</h3>
            <ol>
              <li><strong>Join our WhatsApp Group:</strong> All updates, session links, and important announcements will be shared in our WhatsApp community group. You'll receive the group link in a separate email within 24 hours.</li>
              <li>Mark your calendar: August 20, 2025 at 11:00 PM</li>
              <li>Prepare for an intensive hands-on learning experience</li>
            </ol>
          </div>
          
          <p><strong>Important Notes:</strong></p>
          <ul>
            <li>All training materials will be provided free of cost</li>
            <li>Live sessions will be recorded for your reference</li>
            <li>Certificate will be provided upon completion</li>
            <li><strong>24/7 Support:</strong> We will add you to our Discord channel where you can ask all your doubts 24/7 and get instant support from our mentors and community</li>
          </ul>
          
          <p>If you have any questions, please don't hesitate to reach out to us.</p>
          
          <p>Best regards,<br>
          <strong>Vimal Daga</strong><br>
          DevOps Guru of India<br>
          ${SENDER_NAME}</p>
        </div>
        
        <div class="footer">
          <p>This is an automated email. Please do not reply to this message.</p>
          <p>For support, contact us through our official channels.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return htmlTemplate;
}

// Function to create plain text email
function createPlainTextEmail(data) {
  const plainText = `
DevOps Training Registration Confirmation - Vimal Daga

Dear ${data.fullName},

Thank you for registering for our comprehensive 7-Day DevOps Training Program! Your registration has been successfully confirmed.

TRAINING DETAILS:
- Start Date: August 20, 2025
- Time: 11:00 PM - 7:00 PM (IST)
- Duration: 7 Days
- Format: Live Online Training
- Cost: COMPLETELY FREE

YOUR REGISTRATION DETAILS:
- Name: ${data.fullName}
- Email: ${data.emailId}
- Contact: ${data.contactNumber}
- City: ${data.currentCity}
- Organization: ${data.collegeCompany}
- Role: ${data.studentOrProfessional}
${data.yearsOfExperience ? `- Experience: ${data.yearsOfExperience} years` : ''}

WHAT'S NEXT?
1. Join our WhatsApp Group: All updates, session links, and important announcements will be shared in our WhatsApp community group. You'll receive the group link in a separate email within 24 hours.
2. Mark your calendar: August 20, 2025 at 11:00 PM
3. Prepare for an intensive hands-on learning experience

IMPORTANT NOTES:
- All training materials will be provided free of cost
- Live sessions will be recorded for your reference
- Certificate will be provided upon completion
- 24/7 Support: We will add you to our Discord channel where you can ask all your doubts 24/7 and get instant support from our mentors and community

If you have any questions, please don't hesitate to reach out to us.

Best regards,
Vimal Daga
DevOps Guru of India
${SENDER_NAME}

---
This is an automated email. Please do not reply to this message.
For support, contact us through our official channels.
  `;
  
  return plainText;
}

// Function to test the script (for development)
function testScript() {
  const testData = {
    fullName: 'Test User',
    collegeCompany: 'Test Company',
    contactNumber: '1234567890',
    emailId: 'test@example.com',
    currentCity: 'Test City',
    howDidYouKnow: 'LinkedIn',
    reference: 'Test Reference',
    studentOrProfessional: 'Professional',
    yearsOfExperience: '5',
    currentRole: 'Software Engineer',
    expectations: 'Learn DevOps',
    additionalInformation: 'Test additional info'
  };
  
  const result = doPost({
    postData: {
      contents: JSON.stringify(testData)
    }
  });
  
  Logger.log(result.getContent());
} 