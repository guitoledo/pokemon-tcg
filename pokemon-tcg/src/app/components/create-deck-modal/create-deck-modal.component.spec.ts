import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeckModalComponent } from './create-deck-modal.component';

describe('CreateDeckModalComponent', () => {
  let component: CreateDeckModalComponent;
  let fixture: ComponentFixture<CreateDeckModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDeckModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDeckModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
