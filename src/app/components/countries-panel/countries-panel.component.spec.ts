import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesPanelComponent } from './countries-panel.component';

describe('CountriesPanelComponent', () => {
  let component: CountriesPanelComponent;
  let fixture: ComponentFixture<CountriesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
