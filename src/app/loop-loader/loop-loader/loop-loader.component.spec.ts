import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { routerServiceStub } from '@app/test';
import { LoopLoaderComponent } from '@app/loop-loader/loop-loader/loop-loader.component';
import { LoaderService } from '@app/loop-loader/services';
import { DebugElement } from '@angular/core/src/debug/debug_node';

describe('LoopLoaderComponent', () => {
  let component: LoopLoaderComponent;
  let fixture: ComponentFixture<LoopLoaderComponent>;
  let loaderService: LoaderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatProgressBarModule, RouterTestingModule],
      declarations: [LoopLoaderComponent],
      providers: [LoaderService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopLoaderComponent);
    component = fixture.componentInstance;
    loaderService = TestBed.get(LoaderService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should hide if loader is not loading', () => {
    let loader: DebugElement;
    loader = fixture.debugElement.query(By.css('#loop-progressbar'));

    expect(loader).toBeNull();
  });

  it('show loader if Loading', () => {
    let loader: DebugElement;
    loaderService.show('test/url');
    fixture.detectChanges();

    loader = fixture.debugElement.query(By.css('#loop-progressbar'));
    expect(loader).toBeTruthy();
  });
});
