import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificRecipePageComponent } from './specific-recipe-page.component';

describe('SpecificRecipePageComponent', () => {
  let component: SpecificRecipePageComponent;
  let fixture: ComponentFixture<SpecificRecipePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificRecipePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificRecipePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
