import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackpackersHomeComponent } from './backpackers-home.component';

describe('BackpackersHomeComponent', () => {
  let component: BackpackersHomeComponent;
  let fixture: ComponentFixture<BackpackersHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackpackersHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackpackersHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
