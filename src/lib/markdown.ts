import TurndownService from 'turndown';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  hr: '---',
  bulletListMarker: '-',
});

// Preserve links
turndownService.addRule('preserveLinks', {
  filter: ['a'],
  replacement: (content, node: any) => {
    const href = node.getAttribute('href');
    return href ? `[${content}](${href})` : content;
  },
});

// Preserve images
turndownService.addRule('preserveImages', {
  filter: ['img'],
  replacement: (_content, node: any) => {
    const alt = node.getAttribute('alt') || '';
    const src = node.getAttribute('src') || '';
    return src ? `![${alt}](${src})` : '';
  },
});

export function htmlToMarkdown(html: string): string {
  // Simple extraction of <main> content if present, to avoid boilerplate
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const content = mainMatch ? mainMatch[1] : html;
  
  // Remove scripts, styles, and other non-content elements
  const cleanContent = content
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '');

  return turndownService.turndown(cleanContent);
}

export function formatMarkdownPost(title: string, content: string): string {
  return `# ${title}\n\n${content}`;
}
