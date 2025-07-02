import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Organisateur } from './organisateur';

describe('Organisateur', () => {
  let component: Organisateur;
  let fixture: ComponentFixture<Organisateur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Organisateur]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Organisateur);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
