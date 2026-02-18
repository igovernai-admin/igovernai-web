# Troubleshooting Google Sheets Integration

## Data Not Appearing in Sheets

If the form says it saved but you don't see data in your Google Sheet, follow these steps:

### Step 1: Verify Sheet ID is Set

1. Open your Google Apps Script project at [script.google.com](https://script.google.com)
2. Check that line 20 has your actual Sheet ID (not `'YOUR_SHEET_ID'`)
3. To find your Sheet ID:
   - Open your Google Sheet
   - Look at the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy the long string between `/d/` and `/edit`

### Step 2: Check Script Execution Logs

1. In Google Apps Script, click "Executions" in the left menu
2. Look for recent executions of `doPost`
3. Click on an execution to see logs
4. Check for any error messages

### Step 3: Test the Script Manually

1. In Google Apps Script, click the function dropdown and select `testDoPost`
2. Click the Run button (▶️)
3. Authorize the script if prompted
4. Check the "Executions" tab to see if it ran successfully
5. Check your Google Sheet to see if test data appeared

### Step 4: Verify Deployment Settings

1. In Google Apps Script, click "Deploy" > "Manage deployments"
2. Make sure:
   - **Execute as**: "Me"
   - **Who has access**: "Anyone" (or "Anyone with Google account")
3. If you made changes to the script, create a new version:
   - Click the edit icon (pencil) on your deployment
   - Click "New version"
   - Click "Deploy"
   - Update the version number if prompted

### Step 5: Check Sheet Permissions

1. Open your Google Sheet
2. Click "Share" button
3. Make sure the sheet is accessible (at least viewable by anyone with the link, or shared with your account)

### Step 6: Verify Form Data Format

The script now handles multiple data formats. Check the execution logs to see which format is being received:
- Form-encoded (URLSearchParams)
- JSON
- Form-encoded string

### Common Issues:

**Issue: "Sheet ID not configured"**
- Solution: Update `SHEET_ID` constant in the script

**Issue: "No data received in request"**
- Solution: Check that the form is sending data correctly. Check browser console for errors.

**Issue: "Cannot find spreadsheet"**
- Solution: Verify the Sheet ID is correct and the sheet exists

**Issue: Permission denied**
- Solution: Make sure the deployment has "Anyone" access and the sheet is accessible

### Debug Mode

To see detailed logs:
1. Go to Google Apps Script
2. Click "Executions" in the left menu
3. Click on a recent execution
4. View the logs to see what data was received and any errors

### Manual Test

You can test the script directly by:
1. Running `testDoPost()` function in the script editor
2. Checking the execution logs
3. Verifying data appears in your sheet

If testDoPost works but the form doesn't, the issue is likely with:
- The form submission format
- CORS/network issues
- The Web App URL



