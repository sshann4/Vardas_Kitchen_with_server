import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchRecipesComponent } from './switch-recipes.component';

describe('SwitchRecipesComponent', () => {
  let component: SwitchRecipesComponent;
  let fixture: ComponentFixture<SwitchRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
