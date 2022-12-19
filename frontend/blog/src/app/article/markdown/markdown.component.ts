import { Component, Input, OnChanges, SimpleChange, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import * as DOMPurify from "dompurify";
import { customMarked } from "./MarkedRenderer";

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

  constructor(
    private sanitizer: DomSanitizer
  ) {
    this.md = customMarked;

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
