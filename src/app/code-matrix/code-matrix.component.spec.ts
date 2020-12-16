import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeMatrixComponent } from './code-matrix.component';

describe('CodeMatrixComponent', () => {
  let component: CodeMatrixComponent;
  let fixture: ComponentFixture<CodeMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeMatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
