import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompressedLinkComponent } from './compressed-link.component';

describe('CompressedLinkComponent', () => {
  let component: CompressedLinkComponent;
  let fixture: ComponentFixture<CompressedLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompressedLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompressedLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
