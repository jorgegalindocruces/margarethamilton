const fs = require('fs');
const path = require('path');

// Simple CSV parser
function parseCSV(content) {
  const lines = content.split('\n');
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });
      rows.push(row);
    }
  }

  return rows;
}

function parseCSVLine(line) {
  const values = [];
  let currentValue = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      values.push(currentValue.trim());
      currentValue = '';
    } else {
      currentValue += char;
    }
  }

  values.push(currentValue.trim());
  return values;
}

// HTML to Markdown converter (basic)
function htmlToMarkdown(html) {
  if (!html) return '';

  let markdown = html
    // Convert paragraphs
    .replace(/<p[^>]*>/g, '\n\n')
    .replace(/<\/p>/g, '')
    // Convert strong/bold
    .replace(/<strong[^>]*>/g, '**')
    .replace(/<\/strong>/g, '**')
    // Convert emphasis/italic
    .replace(/<em[^>]*>/g, '*')
    .replace(/<\/em>/g, '*')
    // Convert headings
    .replace(/<h2[^>]*>/g, '\n## ')
    .replace(/<\/h2>/g, '')
    .replace(/<h3[^>]*>/g, '\n### ')
    .replace(/<\/h3>/g, '')
    .replace(/<h4[^>]*>/g, '\n#### ')
    .replace(/<\/h4>/g, '')
    // Convert lists
    .replace(/<ul[^>]*>/g, '\n')
    .replace(/<\/ul>/g, '\n')
    .replace(/<ol[^>]*>/g, '\n')
    .replace(/<\/ol>/g, '\n')
    .replace(/<li[^>]*>/g, '\n- ')
    .replace(/<\/li>/g, '')
    // Convert line breaks
    .replace(/<br\s*\/?>/g, '\n')
    // Convert links (try to extract text and URL)
    .replace(/<a[^>]*href=["']?([^"'\s>]+)["']?[^>]*>([^<]*)<\/a>/g, '[$2]($1)')
    // Remove figures, images, iframes
    .replace(/<figure[^>]*>.*?<\/figure>/gs, '')
    .replace(/<iframe[^>]*>.*?<\/iframe>/gs, '')
    .replace(/<img[^>]*>/g, '')
    // Remove divs and spans
    .replace(/<div[^>]*>|<\/div>/g, '')
    .replace(/<span[^>]*>|<\/span>/g, '')
    // Remove any remaining HTML tags
    .replace(/<[^>]+>/g, '')
    // Clean up special characters
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/‍/g, '')
    // Clean up multiple newlines
    .replace(/\n{3,}/g, '\n\n')
    // Trim whitespace
    .trim();

  return markdown;
}

// Process Blog Posts
function processBlogPosts() {
  const csvPath = path.join(__dirname, '../import/Margaret Hamilton School - Blogs.csv');
  const content = fs.readFileSync(csvPath, 'utf-8');
  const posts = parseCSV(content);

  console.log(`Processing ${posts.length} blog posts...`);

  posts.forEach((post, index) => {
    if (!post.Slug || post.Draft === 'true') return;

    const mdxContent = `---
type: "blog"
slug: "${post.Slug}"
title: "${post.Name.replace(/"/g, '\\"')}"
excerpt: "${post['Blog Intro'] ? post['Blog Intro'].replace(/"/g, '\\"') : ''}"
date: "${post['Published On'] ? new Date(post['Published On']).toISOString().split('T')[0] : ''}"
author: "Jorge Galindo"
authorSlug: "jorge-galindo"
category: "${post['Blog Category'] === 'novedades' ? 'Novedades' : post['Blog Category'] === 'inspiracion' ? 'Inspiración' : 'Historias'}"
categorySlug: "${post['Blog Category']}"
coverImage: "${post['Blog Image'] || '/images/blog/default.jpg'}"
tags: []
draft: false
---

${htmlToMarkdown(post['Blog Summary'])}
`;

    const filename = `${post.Slug}.mdx`;
    const filepath = path.join(__dirname, '../content/blog', filename);
    fs.writeFileSync(filepath, mdxContent);
    console.log(`✓ Created ${filename}`);
  });
}

// Process Events
function processEvents() {
  const csvPath = path.join(__dirname, '../import/Margaret Hamilton School - Events.csv');
  const content = fs.readFileSync(csvPath, 'utf-8');
  const events = parseCSV(content);

  console.log(`\nProcessing ${events.length} events...`);

  events.forEach(event => {
    if (!event.Slug || event.Draft === 'true') return;

    const mdxContent = `---
type: "event"
slug: "${event.Slug}"
title: "${event.Name.replace(/"/g, '\\"')}"
excerpt: "${event['Event Intro'] ? event['Event Intro'].replace(/"/g, '\\"') : ''}"
startsAt: "${event['Event Date'] ? new Date(event['Event Date']).toISOString() : ''}"
endsAt: ""
location: "${event['Event Location'] || ''}"
organizer: "${event['Event Organizer'] || 'Proyecto Margaret Hamilton'}"
bannerImage: "${event['Events Post Image'] || '/images/events/default.png'}"
draft: false
---

${htmlToMarkdown(event['Event Summary'])}
`;

    const filename = `${event.Slug}.mdx`;
    const filepath = path.join(__dirname, '../content/events', filename);
    fs.writeFileSync(filepath, mdxContent);
    console.log(`✓ Created ${filename}`);
  });
}

// Process Team Members
function processTeamMembers() {
  const csvPath = path.join(__dirname, '../import/Margaret Hamilton School - Blog Authors.csv');
  if (!fs.existsSync(csvPath)) return;

  const content = fs.readFileSync(csvPath, 'utf-8');
  const authors = parseCSV(content);

  console.log(`\nProcessing ${authors.length} team members...`);

  authors.forEach(author => {
    if (!author.Slug) return;

    const mdxContent = `---
type: "team"
slug: "${author.Slug}"
name: "${author.Name}"
role: "${author['Blog Author Role'] || 'Voluntario'}"
bio: "${author['Blog Author Intro'] || ''}"
avatarImage: "${author['Blog Author Image'] || '/images/team/default.png'}"
active: true
orderIndex: 0
---

${author['Blog Author Intro'] || ''}
`;

    const filename = `${author.Slug}.mdx`;
    const filepath = path.join(__dirname, '../content/team', filename);
    fs.writeFileSync(filepath, mdxContent);
    console.log(`✓ Created ${filename}`);
  });
}

// Run all conversions
try {
  console.log('Starting CSV to MDX conversion...\n');

  processBlogPosts();
  processEvents();
  processTeamMembers();

  console.log('\n✅ Conversion completed successfully!');
} catch (error) {
  console.error('❌ Error during conversion:', error);
  process.exit(1);
}
