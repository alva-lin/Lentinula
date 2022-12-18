import { Component, Input, OnChanges, SimpleChange, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import * as DOMPurify from "dompurify";
import { marked, Renderer } from "marked";

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MarkdownComponent implements OnChanges {

  @Input() text: string;
  data: SafeHtml;
  md: any;

  static highlightCode(code: string, language: string): string {
    // if (!(language && highlightjs.getLanguage(language))) {
    //   language = 'markdown';
    // }
    //
    // const result = highlightjs.highlight(language, code).value;
    const result = '';
    return `
      <code class="hljs ${ language }">${ result }</code>
    `;
  }

  constructor(
    private sanitizer: DomSanitizer
  ) {
    const renderer = new Renderer();
    renderer.code = MarkdownComponent.highlightCode;

    this.md = marked.setOptions({ renderer });

    this.data = '';
    this.text = '';
  }

  mdToSafeHtml(value: string): SafeHtml {
    const html = this.md(value);
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
}
