import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface Author {
  name: string;
  role?: string;
  avatar?: string;
}

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  summary: string;
  description: string;
  author: Author | string;
  readingTime: string;
  category: "Desktop Architecture" | "Algorithms" | "AI Pipelines" | "Graphics & Audio" | string;
  tags: string[];
  featured?: boolean;
  aliases?: string[];
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export interface Post extends PostMetadata {
  content: string;
  contentHtml: string;
  toc: TableOfContentsItem[];
}

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "logbook");

/**
 * Normalizes text to a clean URL/anchor slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Escapes XML entities for RSS safety
 */
export function escapeXml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Formats ISO date string to RFC-822 / RSS pubDate (e.g. 'Tue, 01 Sep 2026 00:00:00 GMT')
 */
export function formatRssDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      return new Date().toUTCString();
    }
    return d.toUTCString();
  } catch {
    return new Date().toUTCString();
  }
}

/**
 * Minimal, secure, zero-dependency Markdown to HTML compiler with syntax highlighting tokenization
 */
export function renderMarkdownToHtml(markdown: string): { html: string; toc: TableOfContentsItem[] } {
  const toc: TableOfContentsItem[] = [];
  const lines = markdown.split(/\r?\n/);
  const out: string[] = [];

  let inCodeBlock = false;
  let codeBlockLang = "";
  let codeBlockLines: string[] = [];
  let inList = false;
  let listType: "ul" | "ol" = "ul";

  function closeList() {
    if (inList) {
      out.push(listType === "ul" ? "</ul>" : "</ol>");
      inList = false;
    }
  }

  function highlightCode(rawCode: string, lang: string): string {
    const escaped = rawCode
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const isPythonOrShell = ["python", "py", "bash", "sh", "shell"].includes(lang);

    // Syntax highlighting tokenization for TS, JS, Python, Rust, Shell
    const highlighted = escaped
      .replace(
        isPythonOrShell ? /(#.*$)/gm : /(\/\/.*$|#.*$)/gm,
        '<span class="text-[#71717a] italic">$1</span>'
      )
      .replace(
        /(&quot;[\s\S]*?&quot;|'[\s\S]*?'|`[\s\S]*?`)/g,
        '<span class="text-[#10b981]">$1</span>'
      )
      .replace(
        /\b(const|let|var|function|return|import|from|export|default|if|else|switch|case|break|for|while|try|catch|finally|throw|new|class|extends|async|await|interface|type|public|private|protected|def|elif|in|is|not|and|or|None|True|False)\b/g,
        '<span class="text-[#ff5722] font-semibold">$1</span>'
      )
      .replace(
        /\b(string|number|boolean|any|void|unknown|never|null|undefined|Promise|Array|Record|Uint8Array|Float32Array|Buffer|HTMLCanvasElement|CanvasRenderingContext2D)\b/g,
        '<span class="text-[#00b4d8]">$1</span>'
      )
      .replace(
        /\b(\d+(?:\.\d+)?(?:px|ms|s|rem|%)?)\b/g,
        '<span class="text-[#f59e0b]">$1</span>'
      );

    return highlighted;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.trim().startsWith("```")) {
      if (!inCodeBlock) {
        closeList();
        inCodeBlock = true;
        codeBlockLang = line.trim().slice(3).trim().toLowerCase() || "typescript";
        codeBlockLines = [];
      } else {
        inCodeBlock = false;
        const rawCode = codeBlockLines.join("\n");
        const highlighted = highlightCode(rawCode, codeBlockLang);
        const encodedRaw = encodeURIComponent(rawCode);

        out.push(
          `<div class="my-6 rounded-[3px] border-2 border-black bg-[#121217] overflow-hidden code-block-wrapper shadow-brutal-sm" data-code="${encodedRaw}">
            <div class="flex items-center justify-between px-4 py-2 bg-[#1a1a22] border-b-2 border-black text-xs font-mono">
              <span class="text-white uppercase tracking-wider font-bold">${codeBlockLang}</span>
              <button type="button" class="copy-code-btn inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white transition-colors bg-[#27272a] hover:bg-[#3f3f46] border border-zinc-600 px-2.5 py-1 rounded-[2px] font-bold">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>Copy</span>
              </button>
            </div>
            <pre class="p-4 text-xs sm:text-sm font-mono text-zinc-100 overflow-x-auto leading-relaxed scrollbar-thin"><code>${highlighted}</code></pre>
          </div>`
        );
        codeBlockLines = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // Blank lines
    if (!line.trim()) {
      closeList();
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      closeList();
      const text = line.slice(4).trim();
      const id = slugify(text);
      toc.push({ id, text, level: 3 });
      out.push(
        `<h3 id="${id}" class="group font-space text-xl sm:text-2xl font-bold text-black mt-8 mb-4 flex items-center gap-2 scroll-mt-24">
          <a href="#${id}" class="text-black hover:text-[#ff4400] transition-colors">${text}</a>
          <span class="text-black/40 opacity-0 group-hover:opacity-100 text-sm font-mono transition-opacity font-bold">#</span>
        </h3>`
      );
      continue;
    }

    if (line.startsWith("## ")) {
      closeList();
      const text = line.slice(3).trim();
      const id = slugify(text);
      toc.push({ id, text, level: 2 });
      out.push(
        `<h2 id="${id}" class="group font-space text-2xl sm:text-3xl font-black text-black mt-12 mb-6 pb-2 border-b-2 border-black flex items-center justify-between scroll-mt-24">
          <a href="#${id}" class="text-black hover:text-[#ff4400] transition-colors">${text}</a>
          <span class="text-[#ff4400] text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity font-bold">§</span>
        </h2>`
      );
      continue;
    }

    if (line.startsWith("# ")) {
      closeList();
      const text = line.slice(2).trim();
      const id = slugify(text);
      out.push(
        `<h1 id="${id}" class="font-space text-3xl sm:text-4xl font-black text-black mb-6 scroll-mt-24 pb-2 border-b-2 border-black">${text}</h1>`
      );
      continue;
    }

    // Blockquote & callouts
    if (line.startsWith("> ")) {
      closeList();
      const quoteText = line.slice(2).trim();
      out.push(
        `<blockquote class="my-6 pl-5 border-l-4 border-[#ff4400] text-black italic bg-[#f4f4ee] py-4 pr-5 rounded-[2px] border-y border-r border-black/20 font-medium">
          <p class="leading-relaxed text-black font-medium">${renderInline(quoteText)}</p>
        </blockquote>`
      );
      continue;
    }

    // Unordered lists
    if (/^[-*]\s+/.test(line)) {
      if (!inList || listType !== "ul") {
        closeList();
        inList = true;
        listType = "ul";
        out.push('<ul class="my-4 space-y-2 pl-6 list-disc list-outside text-black font-sans font-medium">');
      }
      const itemText = line.replace(/^[-*]\s+/, "");
      out.push(`<li class="leading-relaxed text-black">${renderInline(itemText)}</li>`);
      continue;
    }

    // Ordered lists
    if (/^\d+\.\s+/.test(line)) {
      if (!inList || listType !== "ol") {
        closeList();
        inList = true;
        listType = "ol";
        out.push('<ol class="my-4 space-y-2 pl-6 list-decimal list-outside text-black font-sans font-medium">');
      }
      const itemText = line.replace(/^\d+\.\s+/, "");
      out.push(`<li class="leading-relaxed text-black">${renderInline(itemText)}</li>`);
      continue;
    }

    // Standard paragraphs
    closeList();
    out.push(`<p class="my-4 leading-relaxed text-black font-sans text-base sm:text-lg font-normal">${renderInline(line)}</p>`);
  }

  closeList();

  return { html: out.join("\n"), toc };
}

/**
 * Renders inline formatting: bold, italic, inline code, links, math
 */
function renderInline(text: string): string {
  return text
    // Inline code
    .replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 rounded-[2px] bg-[#eaeae2] border border-black text-black font-mono text-xs sm:text-sm font-bold">$1</code>'
    )
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-black text-black">$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em class="italic text-black font-medium">$1</em>')
    // Math formulas ($...$)
    .replace(
      /\$([^$]+)\$/g,
      '<span class="font-mono text-black bg-[#ff4400]/10 px-1.5 py-0.5 rounded-[2px] border border-black text-xs sm:text-sm font-bold">$1</span>'
    )
    // Markdown links [text](url)
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-[#ff4400] hover:text-[#d33700] underline underline-offset-4 decoration-black hover:decoration-[#ff4400] transition-colors font-bold" target="_blank" rel="noopener noreferrer">$1</a>'
    );
}

/**
 * Calculates estimated reading time in minutes
 */
export function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/**
 * Retrieves all published devlog articles sorted by date descending
 */
export function getAllPosts(): PostMetadata[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  const posts: PostMetadata[] = fileNames
    .map((fileName) => {
      const fullPath = path.join(CONTENT_DIR, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const fileSlug = fileName.replace(/\.md$/, "");
      const primarySlug = data.slug || fileSlug;
      const summary = data.summary || data.description || "";
      const description = data.description || summary;
      const readingTime = data.readingTime || calculateReadingTime(content);

      const author = data.author
        ? typeof data.author === "string"
          ? { name: data.author, role: "Founder & Engineer", avatar: "/images/author-sabry.jpg" }
          : data.author
        : { name: "Sabry Belal", role: "Founder & Engineer", avatar: "/images/author-sabry.jpg" };

      return {
        slug: primarySlug,
        title: data.title || "Untitled Article",
        date: data.date || "2026-09-01",
        summary,
        description,
        author,
        readingTime,
        category: data.category || "Engineering",
        tags: Array.isArray(data.tags) ? data.tags : [],
        featured: Boolean(data.featured),
        aliases: Array.isArray(data.aliases) ? data.aliases : [],
      };
    })
    .sort((a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0));

  return posts;
}

/**
 * Resolves a single post by primary slug or alias slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!slug || typeof slug !== "string") return null;

  // Protect against directory traversal
  if (slug.includes("..") || slug.includes("/") || slug.includes("\\")) {
    return null;
  }

  if (!fs.existsSync(CONTENT_DIR)) {
    return null;
  }

  const fileNames = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  for (const fileName of fileNames) {
    const fullPath = path.join(CONTENT_DIR, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const fileSlug = fileName.replace(/\.md$/, "");
    const primarySlug = data.slug || fileSlug;
    const aliases: string[] = Array.isArray(data.aliases) ? data.aliases : [];

    const isMatch =
      primarySlug === slug ||
      fileSlug === slug ||
      aliases.includes(slug);

    if (isMatch) {
      const summary = data.summary || data.description || "";
      const description = data.description || summary;
      const readingTime = data.readingTime || calculateReadingTime(content);
      const { html, toc } = renderMarkdownToHtml(content);

      const author = data.author
        ? typeof data.author === "string"
          ? { name: data.author, role: "Founder & Engineer", avatar: "/images/author-sabry.jpg" }
          : data.author
        : { name: "Sabry Belal", role: "Founder & Engineer", avatar: "/images/author-sabry.jpg" };

      return {
        slug: primarySlug,
        title: data.title || "Untitled Article",
        date: data.date || "2026-09-01",
        summary,
        description,
        author,
        readingTime,
        category: data.category || "Engineering",
        tags: Array.isArray(data.tags) ? data.tags : [],
        featured: Boolean(data.featured),
        aliases,
        content,
        contentHtml: html,
        toc,
      };
    }
  }

  return null;
}

/**
 * Returns all possible slug paths (including aliases) for static path generation
 */
export function getAllSlugs(): string[] {
  const posts = getAllPosts();
  const slugSet = new Set<string>();

  for (const post of posts) {
    slugSet.add(post.slug);
    if (post.aliases) {
      for (const alias of post.aliases) {
        slugSet.add(alias);
      }
    }
  }

  return Array.from(slugSet);
}

/**
 * Generates valid RSS 2.0 XML with edge caching compliance
 */
export function generateRssXml(): string {
  const posts = getAllPosts();
  const siteUrl = "https://sabrylabs.com";
  const lastBuildDate = posts.length > 0 ? formatRssDate(posts[0].date) : new Date().toUTCString();

  const itemsXml = posts
    .map((post) => {
      const postUrl = `${siteUrl}/logbook/${post.slug}`;
      const escapedTitle = escapeXml(post.title);
      const escapedCategory = escapeXml(post.category);
      const pubDate = formatRssDate(post.date);

      return `    <item>
      <title>${escapedTitle}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.summary}]]></description>
      <category>${escapedCategory}</category>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sabry Labs — Engineering Logbook</title>
    <link>${siteUrl}</link>
    <description>Independent software laboratory and vibe-coding atelier by Sabry Belal. Devlogs, architecture blueprints, and product updates.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;
}
