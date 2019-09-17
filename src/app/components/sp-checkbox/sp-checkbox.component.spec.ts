import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpCheckboxComponent } from './sp-checkbox.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('SpCheckboxComponent', () => {
  let component: SpCheckboxComponent;
  let fixture: ComponentFixture<SpCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpCheckboxComponent],
      imports: [CheckboxModule, FormsModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpCheckboxComponent);
    component = fixture.componentInstance;
    component.size = {
      size: '350x250',
      selected: true,
      id: 'testId',
      enabled: true
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
