import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEngineSelectorComponent } from './search-engine-selector.component';

describe('SearchEngineSelectorComponent', () => {
  let component: SearchEngineSelectorComponent;
  let fixture: ComponentFixture<SearchEngineSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchEngineSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEngineSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
