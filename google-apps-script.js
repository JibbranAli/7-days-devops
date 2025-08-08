// Google Apps Script Code for DevOps Training Registration Form
// Replace YOUR_SPREADSHEET_ID with your actual Google Sheets ID
// Replace YOUR_EMAIL with your actual email address

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const spreadsheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
    const sheet = spreadsheet.getActiveSheet();
    
    // Prepare the data for the spreadsheet
    const rowData = [
      new Date(), // Timestamp
      data.fullName,
      data.collegeCompany,
      data.contactNumber,
      data.emailId,
      data.currentCity,
      data.sourceOfInformation,
      data.reference || '',
      data.profession,
      data.yearsOfExperience || '',
      data.currentRole,
      data.expectations || '',
      data.additionalInfo || '',
      data.timestamp,
      data.source
    ];
    
    // Append the data to the spreadsheet
    sheet.appendRow(rowData);
    
    // Send confirmation email to the student
    sendConfirmationEmail(data);
    
    // Send notification email to admin
    sendAdminNotification(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Registration successful' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendConfirmationEmail(studentData) {
  const subject = 'Welcome to DevOps Training Program - Registration Confirmed! 🎉';
  
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>DevOps Training Registration Confirmed</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
        .highlight { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Registration Confirmed!</h1>
          <p>Welcome to the DevOps Training Program</p>
        </div>
        
        <div class="content">
          <h2>Hello ${studentData.fullName},</h2>
          
          <p>Thank you for registering for our <strong>FREE 7-Day DevOps Training Program</strong>! Your registration has been successfully confirmed.</p>
          
          <div class="highlight">
            <h3>📋 Registration Details:</h3>
            <ul>
              <li><strong>Name:</strong> ${studentData.fullName}</li>
              <li><strong>Email:</strong> ${studentData.emailId}</li>
              <li><strong>Contact:</strong> ${studentData.contactNumber}</li>
              <li><strong>City:</strong> ${studentData.currentCity}</li>
              <li><strong>Profession:</strong> ${studentData.profession}</li>
            </ul>
          </div>
          
          <h3>🚀 What's Next?</h3>
          <ol>
            <li><strong>Welcome Email:</strong> You'll receive detailed program information within 24 hours</li>
            <li><strong>WhatsApp Group:</strong> Join our community group for updates and discussions</li>
            <li><strong>Pre-course Materials:</strong> Access to preparatory content and resources</li>
            <li><strong>Live Sessions:</strong> Interactive training sessions starting August 20, 2025</li>
          </ol>
          
          <h3>📅 Important Dates:</h3>
          <ul>
            <li><strong>Program Start:</strong> August 20, 2025</li>
            <li><strong>Duration:</strong> 7 Days Intensive Training</li>
            <li><strong>Format:</strong> Live Online Sessions + Hands-on Practice</li>
          </ul>
          
          <h3>🎯 What You'll Learn:</h3>
          <ul>
            <li>Linux Fundamentals & Shell Scripting</li>
            <li>Docker Containerization</li>
            <li>Git Version Control</li>
            <li>CI/CD Pipeline Implementation</li>
            <li>Cloud Computing Basics</li>
            <li>DevOps Best Practices</li>
          </ul>
          
          <div class="highlight">
            <h3>💡 Pro Tips:</h3>
            <ul>
              <li>Install the required software before the program starts</li>
              <li>Join our WhatsApp group for community support</li>
              <li>Complete the pre-course assignments for better understanding</li>
              <li>Prepare questions for the live Q&A sessions</li>
            </ul>
          </div>
          
          <p><strong>Stay tuned for more exciting updates!</strong></p>
          
          <p>Best regards,<br>
          <strong>Vimal Daga</strong><br>
          DevOps Guru of India<br>
          <a href="mailto:contact@vimaldaga-devops.com">contact@vimaldaga-devops.com</a></p>
        </div>
        
        <div class="footer">
          <p>This email was sent to ${studentData.emailId} as part of your DevOps Training registration.</p>
          <p>© 2025 DevOps Training by Vimal Daga. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const textBody = `
Registration Confirmed - DevOps Training Program

Hello ${studentData.fullName},

Thank you for registering for our FREE 7-Day DevOps Training Program! Your registration has been successfully confirmed.

REGISTRATION DETAILS:
- Name: ${studentData.fullName}
- Email: ${studentData.emailId}
- Contact: ${studentData.contactNumber}
- City: ${studentData.currentCity}
- Profession: ${studentData.profession}

WHAT'S NEXT:
1. Welcome Email: You'll receive detailed program information within 24 hours
2. WhatsApp Group: Join our community group for updates and discussions
3. Pre-course Materials: Access to preparatory content and resources
4. Live Sessions: Interactive training sessions starting August 20, 2025

IMPORTANT DATES:
- Program Start: August 20, 2025
- Duration: 7 Days Intensive Training
- Format: Live Online Sessions + Hands-on Practice

WHAT YOU'LL LEARN:
- Linux Fundamentals & Shell Scripting
- Docker Containerization
- Git Version Control
- CI/CD Pipeline Implementation
- Cloud Computing Basics
- DevOps Best Practices

Stay tuned for more exciting updates!

Best regards,
Vimal Daga
DevOps Guru of India
contact@vimaldaga-devops.com
  `;
  
  // Send the email
  GmailApp.sendEmail(
    studentData.emailId,
    subject,
    textBody,
    {
      htmlBody: htmlBody,
      name: 'DevOps Training by Vimal Daga'
    }
  );
}

function sendAdminNotification(studentData) {
  const subject = 'New Registration - DevOps Training Program';
  
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>New Registration</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2196F3; color: white; padding: 20px; text-align: center; border-radius: 5px; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px; }
        .highlight { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Registration Received</h1>
        </div>
        
        <div class="content">
          <h2>Registration Details:</h2>
          <div class="highlight">
            <p><strong>Full Name:</strong> ${studentData.fullName}</p>
            <p><strong>Email:</strong> ${studentData.emailId}</p>
            <p><strong>Contact Number:</strong> ${studentData.contactNumber}</p>
            <p><strong>College/Company:</strong> ${studentData.collegeCompany}</p>
            <p><strong>Current City:</strong> ${studentData.currentCity}</p>
            <p><strong>Profession:</strong> ${studentData.profession}</p>
            <p><strong>Current Role:</strong> ${studentData.currentRole}</p>
            <p><strong>Source of Information:</strong> ${studentData.sourceOfInformation}</p>
            ${studentData.reference ? `<p><strong>Reference:</strong> ${studentData.reference}</p>` : ''}
            ${studentData.yearsOfExperience ? `<p><strong>Years of Experience:</strong> ${studentData.yearsOfExperience}</p>` : ''}
            ${studentData.expectations ? `<p><strong>Expectations:</strong> ${studentData.expectations}</p>` : ''}
            ${studentData.additionalInfo ? `<p><strong>Additional Info:</strong> ${studentData.additionalInfo}</p>` : ''}
          </div>
          
          <p><strong>Registration Time:</strong> ${new Date(studentData.timestamp).toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const textBody = `
New Registration - DevOps Training Program

Registration Details:
- Full Name: ${studentData.fullName}
- Email: ${studentData.emailId}
- Contact Number: ${studentData.contactNumber}
- College/Company: ${studentData.collegeCompany}
- Current City: ${studentData.currentCity}
- Profession: ${studentData.profession}
- Current Role: ${studentData.currentRole}
- Source of Information: ${studentData.sourceOfInformation}
${studentData.reference ? `- Reference: ${studentData.reference}` : ''}
${studentData.yearsOfExperience ? `- Years of Experience: ${studentData.yearsOfExperience}` : ''}
${studentData.expectations ? `- Expectations: ${studentData.expectations}` : ''}
${studentData.additionalInfo ? `- Additional Info: ${studentData.additionalInfo}` : ''}

Registration Time: ${new Date(studentData.timestamp).toLocaleString()}
  `;
  
  // Send notification to admin
  GmailApp.sendEmail(
    'YOUR_EMAIL', // Replace with your email
    subject,
    textBody,
    {
      htmlBody: htmlBody,
      name: 'DevOps Training Registration System'
    }
  );
}

// Function to set up the spreadsheet headers (run once)
function setupSpreadsheet() {
  const spreadsheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
  const sheet = spreadsheet.getActiveSheet();
  
  const headers = [
    'Timestamp',
    'Full Name',
    'College/Company',
    'Contact Number',
    'Email ID',
    'Current City',
    'Source of Information',
    'Reference',
    'Profession',
    'Years of Experience',
    'Current Role/Position',
    'Expectations',
    'Additional Information',
    'Registration Timestamp',
    'Source'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.getRange(1, 1, 1, headers.length).setBackground('#4285f4');
  sheet.getRange(1, 1, 1, headers.length).setFontColor('white');
} 