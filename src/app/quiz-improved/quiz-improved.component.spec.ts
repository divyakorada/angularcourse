import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizImprovedComponent } from './quiz-improved.component';

describe('QuizImprovedComponent', () => {
  let component: QuizImprovedComponent;
  let fixture: ComponentFixture<QuizImprovedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizImprovedComponent]
    });
    fixture = TestBed.createComponent(QuizImprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
