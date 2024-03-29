import { NgModule } from '@angular/core';

import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

const icons: unknown[] = [];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class IconsProviderModule {
}
