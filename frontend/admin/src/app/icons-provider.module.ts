import { NgModule } from '@angular/core';

import {
  CloseCircleOutline,
  EyeInvisibleOutline,
  EyeOutline,
  LockOutline,
  UserOutline,
  DashboardOutline,
  FileTextOutline
} from '@ant-design/icons-angular/icons';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

const icons = [
  UserOutline,
  CloseCircleOutline,
  LockOutline,
  EyeOutline,
  EyeInvisibleOutline,
  DashboardOutline,
  FileTextOutline
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class IconsProviderModule {
}
