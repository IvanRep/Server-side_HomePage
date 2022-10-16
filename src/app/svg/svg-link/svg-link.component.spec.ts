import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgLinkComponent } from './svg-link.component';

describe('SvgLinkComponent', () => {
  let component: SvgLinkComponent;
  let fixture: ComponentFixture<SvgLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
