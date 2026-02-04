'use client';

export async function submitToGoogleSheets(sheetName: string, row: any[]) {
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwaxoApXoXqWsj22UcczEScpx0xY2sDrfHcVbe2Ke2SOUTE-g1DZMW_6JehskSt0-JA/exec';
    
    try {
        const formData = new FormData();
        formData.append('sheetName', sheetName);
        formData.append('row', JSON.stringify(row));
        
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' 
        });

        return { success: true, message: 'Success' };

    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        return { success: false, message: 'Failed to submit' };
    }
}
