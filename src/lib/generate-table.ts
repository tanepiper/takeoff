import table from 'tty-table';

const DEFAULT_WIDTH = 10;
const PADDING = 5;

export = (tableValues: string[], headers: TableHeader[], options: TableOptions = {}) => {
  const colWidths = (tableValues || [])
    .map(([...text]) =>
      text.map((rowText: string) => {
        let checkText = rowText;
        if (rowText.includes('\n')) {
          checkText = rowText
            .split('\n')
            .reduce((result: string, row: string) => (row.trim().length > result.length ? row : result), '');
        }
        return checkText.length || 0;
      })
    )
    .reduce(
      (headerWidths: number[], textWidths: number[]) =>
        headers.map(
          (h: TableHeader, index: number) =>
            textWidths[index] > headerWidths[index] ? textWidths[index] : headerWidths[index]
        ),
      [DEFAULT_WIDTH, DEFAULT_WIDTH, DEFAULT_WIDTH, DEFAULT_WIDTH]
    );

  headers.map((header: TableHeader, index: number) => (header.width = colWidths[index] + PADDING));

  return new table(headers, tableValues, options);
};
