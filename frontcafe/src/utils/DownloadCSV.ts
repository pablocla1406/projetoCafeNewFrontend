export function downloadCSV(data: any[], headers: string[], filename: string) {
    // Add BOM to handle special characters in Excel
    const BOM = '\uFEFF';
    
    // Create CSV content with headers and data rows
    const csvRows = [
        // Header row with proper formatting
        headers.map(header => `"${header}"`).join(';'),
        // Data rows
        ...data.map(item => 
            headers.map(header => {
                const value = item[header];
                // Handle different types of values
                if (value === null || value === undefined) {
                    return '""';
                }
                if (typeof value === 'number') {
                    return value.toString().replace('.', ',');
                }
                return `"${value.toString().replace(/"/g, '""')}"`;
            }).join(';')
        )
    ];
    
    const csvContent = BOM + csvRows.join('\r\n');
    
    // Create blob with proper MIME type
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    
    // Create File object
    const file = new File([blob], `${filename}.csv`, { type: 'text/csv;charset=utf-8' });
    
    // Create download link for user
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // Clean up the URL object
    URL.revokeObjectURL(link.href);
    
    return file;
}