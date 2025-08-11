import * as XLSX from 'xlsx';

/**
 * Converts CSV data to an Excel file and triggers a download.
 * @param csvData - The CSV data as a string.
 * @param fileName - The desired Excel file name (e.g., 'output.xlsx').
 */
export function convertCsvToExcel(csvData: string, fileName: string = 'output.xlsx') {
    // Parse CSV to worksheet
    const workbook = XLSX.read(csvData, { type: 'string' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    // Create a new workbook and append the worksheet
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, worksheet, 'Sheet1');
    // Write the workbook and trigger download
    XLSX.writeFile(newWorkbook, fileName);
}