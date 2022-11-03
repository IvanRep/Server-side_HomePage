import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineButtonComponent } from './engine-button.component';

describe('EngineButtonComponent', () => {
  let component: EngineButtonComponent;
  let fixture: ComponentFixture<EngineButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
