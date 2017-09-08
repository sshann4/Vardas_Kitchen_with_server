import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostRecommendedComponent } from './most-recommended.component';

describe('MostRecommendedComponent', () => {
  let component: MostRecommendedComponent;
  let fixture: ComponentFixture<MostRecommendedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostRecommendedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostRecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
