import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedRecipeComponent } from './saved-recipe.component';

describe('SavedRecipeComponent', () => {
  let component: SavedRecipeComponent;
  let fixture: ComponentFixture<SavedRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedRecipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
