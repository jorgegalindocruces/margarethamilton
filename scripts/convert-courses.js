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

// HTML to Markdown converter
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
    // Remove/convert iframes to video links
    .replace(/<iframe[^>]*src=["']?([^"'\s>]+)["']?[^>]*>.*?<\/iframe>/gs, '\n\n[Video]($1)\n\n')
    // Remove figures and images
    .replace(/<figure[^>]*>.*?<\/figure>/gs, '')
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

// Extract course number from name
function extractCourseNumber(name) {
  const match = name.match(/^(\d+)\s*-/);
  return match ? match[1] : null;
}

// Process Courses
function processCourses() {
  const csvPath = path.join(__dirname, '../import/Margaret Hamilton School - Cursos (2).csv');
  const content = fs.readFileSync(csvPath, 'utf-8');
  const courses = parseCSV(content);

  console.log(`Processing ${courses.length} courses...`);

  let processedCount = 0;

  courses.forEach((course, index) => {
    if (!course.Slug || course.Draft === 'true') return;

    const courseNumber = extractCourseNumber(course.Name);
    const title = course.Name.replace(/^\d+\s*-\s*/, '').replace(/"/g, '\\"');

    // Determine category
    let category = 'Clases Paso a Paso';
    let categorySlug = 'clases-paso-a-paso';

    if (course['Causes Category'] === 'talleres') {
      category = 'Talleres';
      categorySlug = 'talleres';
    } else if (course['Causes Tags'] && course['Causes Tags'].includes('logistica')) {
      category = 'Crea tu Escuela';
      categorySlug = 'crea-tu-escuela';
    }

    const mdxContent = `---
type: "course"
slug: "${course.Slug}"
courseNumber: "${courseNumber || ''}"
title: "${title}"
excerpt: "${course['Causes Intro'] ? course['Causes Intro'].replace(/"/g, '\\"').substring(0, 150) : ''}"
category: "${category}"
categorySlug: "${categorySlug}"
tags: ${JSON.stringify(course['Causes Tags'] ? course['Causes Tags'].split(',').map(t => t.trim()) : [])}
coverImage: "${course['Causes Post Image'] || '/images/courses/default.jpg'}"
author: "${course['Causes Member'] === 'javier-gonzalez' ? 'Javier González' : 'Jorge Galindo'}"
authorSlug: "${course['Causes Member'] || 'jorge-galindo'}"
googleDocUrl: "${course['Links a los recursos'] && course['Links a los recursos'].includes('docs.google') ? course['Links a los recursos'] : ''}"
youtubeUrl: "${course['Links a los recursos'] && course['Links a los recursos'].includes('youtube') || course['Links a los recursos'] && course['Links a los recursos'].includes('youtu.be') ? course['Links a los recursos'] : ''}"
scratchUrl: "${course['Links a los recursos'] && course['Links a los recursos'].includes('scratch') ? course['Links a los recursos'] : ''}"
orderIndex: ${index}
draft: false
---

${htmlToMarkdown(course['Causes Summary'])}
`;

    const filename = `${course.Slug}.mdx`;
    const filepath = path.join(__dirname, '../content/courses', filename);
    fs.writeFileSync(filepath, mdxContent);
    processedCount++;

    if (processedCount <= 10 || processedCount % 10 === 0) {
      console.log(`✓ Created ${filename}`);
    }
  });

  console.log(`\n✅ Processed ${processedCount} courses successfully!`);
}

// Run conversion
try {
  console.log('Starting courses conversion...\n');
  processCourses();
} catch (error) {
  console.error('❌ Error during conversion:', error);
  process.exit(1);
}
