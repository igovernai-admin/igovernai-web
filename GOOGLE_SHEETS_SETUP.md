# Google Sheets Integration Setup Guide

This guide will help you connect the iGovernAI lead capture form to Google Sheets.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "iGovernAI Leads" or similar
4. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
   - The `YOUR_SHEET_ID_HERE` is what you need

## Step 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Delete the default code
4. Copy the contents of `google-apps-script.js` and paste it into the editor
5. Replace `'YOUR_SHEET_ID'` with your actual Sheet ID from Step 1
6. Click "Save" (floppy disk icon) and name your project (e.g., "iGovernAI Form Handler")

## Step 3: Deploy as Web App

1. In the Google Apps Script editor, click "Deploy" > "New deployment"
2. Click the gear icon (⚙️) next to "Select type" and choose "Web app"
3. Configure the deployment:
   - **Description**: "iGovernAI Lead Capture Form Handler" (or any description)
   - **Execute as**: "Me" (your account)
   - **Who has access**: "Anyone" (this allows your website to submit data)
4. Click "Deploy"
5. **IMPORTANT**: Copy the Web App URL that appears
6. Click "Done"

## Step 4: Update Your HTML File

1. Open `index.html` in a text editor
2. Find this line near the top of the `<script>` section:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_SCRIPT_URL_HERE'` with the Web App URL you copied in Step 3
4. Save the file

## Step 5: Test the Integration

1. Open your website
2. Fill out and submit the form
3. Check your Google Sheet - you should see the data appear with a timestamp

## Troubleshooting

### Data not appearing in the sheet?
- Verify the Sheet ID in the Google Apps Script is correct
- Check that the Web App URL in `index.html` is correct
- Make sure the deployment has "Anyone" access
- Check the browser console for any error messages

### Permission errors?
- Make sure the Google Apps Script deployment is set to "Anyone" access
- You may need to authorize the script the first time (it will prompt you)

### Need to update the script?
- After making changes to the Google Apps Script, you need to create a new deployment
- Go to "Deploy" > "Manage deployments"
- Click the edit icon (pencil) on your deployment
- Click "New version" and then "Deploy"
- Update the version number if prompted

## Security Note

The current setup allows anyone to submit data to your sheet. For production use, consider:
- Adding rate limiting
- Implementing CAPTCHA
- Adding server-side validation
- Using a more secure authentication method

## Sheet Structure

The script will automatically create these columns in your sheet:
- Timestamp
- Name
- Email
- Company
- Role

The headers are created automatically on the first submission.



