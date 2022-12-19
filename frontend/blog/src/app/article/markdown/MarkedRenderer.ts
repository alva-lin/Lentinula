import highlightjs from 'highlight.js';
import { marked, Renderer } from "marked";

function highlightCode(code: string, language: string): string {
  if (!(language && highlightjs.getLanguage(language))) {
    language = 'markdown';
  }
  console.log(language)

  const result = highlightjs.highlight(code, { language: language }).value;
  return `<pre><code class="hljs language-${ language }">${ result }</code></pre>`;
}


const renderer = new Renderer();
renderer.code = highlightCode;

export const customMarked = marked.setOptions({ renderer });
