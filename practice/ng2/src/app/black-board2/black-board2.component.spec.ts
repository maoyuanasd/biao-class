import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackBoard2Component } from './black-board2.component';

describe('BlackBoard2Component', () => {
  let component: BlackBoard2Component;
  let fixture: ComponentFixture<BlackBoard2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlackBoard2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackBoard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
