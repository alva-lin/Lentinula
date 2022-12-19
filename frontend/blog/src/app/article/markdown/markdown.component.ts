import { Component, Input, OnChanges, SimpleChange, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import * as DOMPurify from "dompurify";
import hljs from "highlight.js";
import { marked } from "marked";

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MarkdownComponent implements OnChanges {

  @Input() text: string;
  data: SafeHtml;
  customMarked: typeof marked;

  constructor(
    private sanitizer: DomSanitizer,
    private router: ActivatedRoute
  ) {
    const baseUrl = router.snapshot.url.map(segmant => segmant.path).reduce((prev, curr) => {
      return prev + '/' + curr
    })

    const renderer = new marked.Renderer();
    renderer.heading = this.headingWrapper(baseUrl)
    renderer.code = this.codeWrapper()

    this.customMarked = marked.setOptions({
      renderer: renderer,
      langPrefix: 'hljs language-',
    });

    this.data = '';
    this.text = '';
  }

  mdToSafeHtml(value: string): SafeHtml {
    const html = this.customMarked(value);
    const safeHtml = DOMPurify.sanitize(html);
    return this.sanitizer.bypassSecurityTrustHtml(safeHtml);
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (const propName in changes) {
      if (propName === 'text') {
        const value = changes[propName].currentValue;
        if (value) {
          this.data = this.mdToSafeHtml(value);
        }
      }
    }
  }

  codeWrapper() {
    return (code: string, lang: string | undefined): string => {
      lang = lang || 'plaintext';
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      const result = hljs.highlight(code, { language }).value;
      return `<pre><code class="hljs language-${ language }">${ result }</code></pre>`
    }
  }

  headingWrapper(baseUrl: string) {
    return (text: string, level: 1 | 2 | 3 | 4 | 5 | 6): string => {
      const escapedText = text.toLowerCase().replace(/\s+/g, '-');
      const href = baseUrl + '#' + escapedText;

      return `
        <h${ level } id="${ escapedText }">
            <a href="${ href }">
                <span class="header-link">#</span>
            </a>
            ${ text }
        </h${ level }>
      `
    }
  }
}
