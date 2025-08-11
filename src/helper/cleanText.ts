function extractCSVSection(text: string): string {
  const csvRegex = /```csv\s*([\s\S]*?)```/;
  const match = text.match(csvRegex);
  return match ? match[1].trim() : '';
}

export default extractCSVSection