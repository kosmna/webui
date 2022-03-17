import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';

import { LoopFileInputComponent } from '@app/shared/components/file/loop-file-input/loop-file-input.component';
import { I18nTestProviders } from 'app/test';

describe('LoopFileInputComponent', () => {
  let component: LoopFileInputComponent;
  let fixture: ComponentFixture<LoopFileInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule
      ],
      declarations:
      [
        LoopFileInputComponent
      ],
      providers: [
        I18nTestProviders
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('input disabled is set to true button will be disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    const button =  fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });
});
