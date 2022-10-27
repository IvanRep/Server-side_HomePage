import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksPanelComponent } from './links-panel.component';

describe('LinksPanelComponent', () => {
  let component: LinksPanelComponent;
  let fixture: ComponentFixture<LinksPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinksPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
