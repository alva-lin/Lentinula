import { NgModule } from '@angular/core';
import { LentinulaLibComponent } from './lentinula-lib.component';
import { MarkdownPipe } from './pipe/markdown.pipe';

@NgModule({
  declarations: [LentinulaLibComponent, MarkdownPipe],
  imports: [],
  exports: [LentinulaLibComponent, MarkdownPipe],
})
export class LentinulaLibModule {}
