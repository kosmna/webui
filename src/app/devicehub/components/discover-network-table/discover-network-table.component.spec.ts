import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverNetworkTableComponent } from './discover-network-table.component';
import { MatTableModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ClipboardModule } from 'ngx-clipboard';
import { AddSpacePipe, CopyButtonComponent } from '@app/shared';

describe('DiscoverNetworkTableComponent', () => {
  let component: DiscoverNetworkTableComponent;
  let fixture: ComponentFixture<DiscoverNetworkTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ClipboardModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatTableModule,
      ],
      declarations: [ DiscoverNetworkTableComponent, AddSpacePipe, CopyButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverNetworkTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
