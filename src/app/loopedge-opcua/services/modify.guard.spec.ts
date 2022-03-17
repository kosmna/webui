import { TestBed, async, inject } from '@angular/core/testing';

import { ModifyGuard } from './modify.guard';
import { MatDialogModule } from '@angular/material';

describe('ModifyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [ModifyGuard],
    });
  });

  it('should ...', inject([ModifyGuard], (guard: ModifyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
