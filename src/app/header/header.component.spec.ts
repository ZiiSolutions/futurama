import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTitleComponent } from './header.component';

describe('DynamicTitleComponent', () => {
  let component: DynamicTitleComponent;
  let fixture: ComponentFixture<DynamicTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
