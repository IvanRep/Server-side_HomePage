import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMenuComponent } from './confirm-menu.component';

describe('ConfirmMenuComponent', () => {
  let component: ConfirmMenuComponent;
  let fixture: ComponentFixture<ConfirmMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
