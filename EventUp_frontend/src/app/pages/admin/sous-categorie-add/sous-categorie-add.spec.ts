import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousCategorieAdd } from './sous-categorie-add';

describe('SousCategorieAdd', () => {
  let component: SousCategorieAdd;
  let fixture: ComponentFixture<SousCategorieAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SousCategorieAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SousCategorieAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
