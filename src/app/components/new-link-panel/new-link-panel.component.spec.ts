import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLinkPanelComponent } from './new-link-panel.component';

describe('NewLinkPanelComponent', () => {
  let component: NewLinkPanelComponent;
  let fixture: ComponentFixture<NewLinkPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLinkPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLinkPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
