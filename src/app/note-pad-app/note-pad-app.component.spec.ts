import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotePadAppComponent } from './note-pad-app.component';

describe('NotePadAppComponent', () => {
  let component: NotePadAppComponent;
  let fixture: ComponentFixture<NotePadAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotePadAppComponent]
    });
    fixture = TestBed.createComponent(NotePadAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
