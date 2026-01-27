/**
 * Google Apps Script for iGovernAI Lead Capture Form
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Paste this code into the editor
 * 4. Create a new Google Sheet and note its ID (from the URL)
 * 5. Replace 'YOUR_SHEET_ID' below with your actual Sheet ID
 * 6. Save the script
 * 7. Click "Deploy" > "New deployment"
 * 8. Select type "Web app"
 * 9. Set "Execute as" to "Me"
 * 10. Set "Who has access" to "Anyone"
 * 11. Click "Deploy" and copy the Web App URL
 * 12. Update the GOOGLE_SCRIPT_URL in index.html with your Web App URL
 */

// Replace this with your Google Sheet ID
const SHEET_ID = 'YOUR_SHEET_ID';

function doPost(e) {
  try {
    // Log that we received a request
    Logger.log('Received POST request');
    
    // Handle case where e might be undefined
    if (!e) {
      Logger.log('Warning: Event object is undefined');
      e = { parameter: {}, postData: null };
    }
    
    Logger.log('Event object exists: ' + (e ? 'yes' : 'no'));
    Logger.log('Parameters: ' + JSON.stringify(e.parameter || {}));
    Logger.log('PostData: ' + JSON.stringify(e.postData || {}));
    
    // Check if Sheet ID is configured
    if (SHEET_ID === 'YOUR_SHEET_ID') {
      throw new Error('Sheet ID not configured. Please set SHEET_ID in the script.');
    }
    
    // Get form data from URL-encoded parameters
    // Try both e.parameter (for form-encoded) and e.postData.contents (for JSON)
    let data = {};
    
    if (e.parameter && (e.parameter.name || e.parameter.email)) {
      // Form-encoded data from URL parameters
      data = {
        name: e.parameter.name || '',
        email: e.parameter.email || '',
        company: e.parameter.company || '',
        role: e.parameter.role || ''
      };
      Logger.log('Using form-encoded data from parameters');
    } else if (e.postData && e.postData.contents) {
      // Try to parse as JSON first
      try {
        data = JSON.parse(e.postData.contents);
        Logger.log('Using JSON data');
      } catch (parseError) {
        // If not JSON, try to parse as form-encoded string
        const params = e.postData.contents.split('&');
        data = {};
        params.forEach(param => {
          const [key, value] = param.split('=');
          if (key && value) {
            data[decodeURIComponent(key)] = decodeURIComponent(value);
          }
        });
        Logger.log('Parsed form-encoded string from postData');
      }
    } else {
      // Try to get from query string if available
      const queryString = e.queryString || '';
      if (queryString) {
        const params = queryString.split('&');
        params.forEach(param => {
          const [key, value] = param.split('=');
          if (key && value) {
            data[decodeURIComponent(key)] = decodeURIComponent(value);
          }
        });
        Logger.log('Parsed data from query string');
      } else {
        throw new Error('No data received in request. Event: ' + JSON.stringify(e));
      }
    }
    
    Logger.log('Parsed data: ' + JSON.stringify(data));
    
    // Validate required fields
    if (!data.name || !data.email) {
      throw new Error('Name and email are required');
    }
    
    // Open the Google Sheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    
    Logger.log('Opened sheet: ' + spreadsheet.getName());
    
    // If the sheet is empty, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Company', 'Role']);
      Logger.log('Added headers to sheet');
    }
    
    // Add the form data to the sheet
    const timestamp = new Date();
    sheet.appendRow([
      timestamp,
      data.name,
      data.email,
      data.company || '',
      data.role || ''
    ]);
    
    Logger.log('Successfully added row to sheet');
    
    // Return simple success response
    return ContentService
      .createTextOutput('Success')
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    // Log detailed error for debugging
    const errorMsg = 'Error: ' + error.toString() + ' | Stack: ' + error.stack;
    Logger.log(errorMsg);
    
    // Return error response
    return ContentService
      .createTextOutput('Error: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

// Handle GET requests (fallback)
function doGet(e) {
  // Redirect GET requests to doPost logic
  return doPost(e);
}

// Test function (optional - for testing in the script editor)
function testDoPost() {
  // Make sure SHEET_ID is set before testing
  if (SHEET_ID === 'YOUR_SHEET_ID') {
    Logger.log('ERROR: Please set SHEET_ID before testing');
    return;
  }
  
  const mockEvent = {
    parameter: {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company',
      role: 'executive'
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log('Test result: ' + result.getContent());
  Logger.log('Check your sheet to verify the data was added');
}

