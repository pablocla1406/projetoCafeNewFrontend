export function downloadCSV(data: any[], headers: string[], filename: string) {

    const csvContent = 'data:text/csv;charset=utf-8';

    [headers.join(",")]
    .concat(
        data.map((item) => headers.map((header) => item[header]).join(","))
    )
    .join("\n")

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);


    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}