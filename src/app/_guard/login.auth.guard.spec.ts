import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginAuthGuard } from './login.auth.guard';

describe('LoginAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [LoginAuthGuard]
    });
  });

  it('should ...', inject([LoginAuthGuard], (guard: LoginAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
