import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';
import hljs from 'highlight.js';

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  headerIds: true,
  headerPrefix: 'title-',
});

@Pipe({
  name: 'marked',
})
export class MarkedPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value && value.length > 0) {
      return marked.parse(value);
    }
    return value;
  }
}
