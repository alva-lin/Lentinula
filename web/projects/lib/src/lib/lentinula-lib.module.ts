import { NgModule } from '@angular/core';
import { LentinulaLibComponent } from './lentinula-lib.component';
import { MarkedPipe } from './pipe/marked.pipe';

@NgModule({
  declarations: [LentinulaLibComponent, MarkedPipe],
  imports: [],
  exports: [LentinulaLibComponent, MarkedPipe],
})
export class LentinulaLibModule {}
