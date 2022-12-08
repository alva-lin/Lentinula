import { NgModule } from '@angular/core';

import {
  ArrowLeftOutline,
  CloseCircleOutline,
  DashboardOutline,
  DeleteOutline,
  EditOutline,
  EyeInvisibleOutline,
  EyeOutline,
  FileTextOutline,
  LoadingOutline,
  LockOutline,
  PlusOutline,
  SaveOutline,
  UndoOutline,
  UserOutline
} from '@ant-design/icons-angular/icons';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

const icons = [
  UserOutline,
  CloseCircleOutline,
  LockOutline,
  EyeOutline,
  EyeInvisibleOutline,
  DashboardOutline,
  FileTextOutline,
  ArrowLeftOutline,
  DeleteOutline,
  PlusOutline,
  EditOutline,
  SaveOutline,
  LoadingOutline,
  UndoOutline
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
