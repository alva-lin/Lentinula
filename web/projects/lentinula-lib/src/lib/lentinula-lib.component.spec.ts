import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LentinulaLibComponent } from './lentinula-lib.component';

describe('LentinulaLibComponent', () => {
  let component: LentinulaLibComponent;
  let fixture: ComponentFixture<LentinulaLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LentinulaLibComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LentinulaLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
