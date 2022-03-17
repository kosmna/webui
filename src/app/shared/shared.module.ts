import 'jwt-decode';
import 'hammerjs';
import 'js-cookie';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'angular-tree-component';
import { CdkTableModule } from '@angular/cdk/table';
import { NvD3Module } from 'ng2-nvd3';
import { NgxPaginationModule } from 'ngx-pagination';
import { IntercomModule } from 'ng-intercom';
import { NgxMdModule } from 'ngx-md';
import { ClipboardModule } from 'ngx-clipboard';
import { TimeAgoPipe } from 'time-ago-pipe';

import { IntercomModConfig } from '@app/core/intercom.config';
// modules
import { UiThemingModule } from '@app/ui-theming';
import { MaterialModule } from '@app/shared/material/material.module';
//  directives & Pipes

import {
  CommonDialogComponent,
  CopyButtonComponent,
  D3ChartComponent,
  DotLoadersComponent,
  LoopAddCardComponent,
  LoopBarComponent,
  LoopFileInputComponent,
  LoopHelpComponent,
  LoopHelpDialogComponent,
  LoopLineChartComponent,
  LoopPaginatorComponent,
  PageNotFoundComponent,
  PasswordIndicatorComponent,
  WifiIconComponent,
  ListFilterComponent,
  HeaderSwitcherComponent,
  ButtonCardComponent,
  SensonodeConfirmationDialogComponent,
  StatusDisplayComponent,
  BreadcrumbsComponent,
} from '@app/shared/components';

import {
  DisableControlDirective,
  InlineCodeDirective,
  LoopButtonDirective,
  LoopCardDirective,
  LoopClearButtonDirective,
  LoopClickOutsideDirective,
  LoopCounterDirective,
  LoopTagDirective,
  LoopToolbarDirective,
  SubmitOnEnterDirective,
} from '@app/shared/directives';

import { DropFileDirective } from '@app/shared/components/file';

import {
  AddSpacePipe,
  CamelcaseToHumanPipe,
  CapitalizePipe,
  OrderByPipe,
  ReplacePipe,
  SearchFilterPipe,
  TruncatePipe,
  UnitFormatPipe,
} from '@app/shared/pipes';
import { IconDateCheckerComponent } from '@app/shared/components/icon-date-checker/icon-date-checker.component';
import { LoadingTemplateComponent } from './components/loading-template/loading-template.component';
import { RouterModule } from '@angular/router';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { GoToPageComponent } from './components/go-to-page/go-to-page.component';

@NgModule({
  imports: [
    CdkTableModule,
    ClipboardModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    IntercomModule.forRoot(IntercomModConfig),
    NgxMdModule.forRoot(),
    MaterialModule,
    NgxPaginationModule,
    NvD3Module,
    ReactiveFormsModule,
    UiThemingModule,
    TreeModule.forRoot(),
    RouterModule,
  ],
  exports: [
    CdkTableModule,
    ClipboardModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    NgxMdModule,
    MaterialModule,
    NgxPaginationModule,
    NvD3Module,
    ReactiveFormsModule,
    UiThemingModule,
    CommonDialogComponent,
    CopyButtonComponent,
    D3ChartComponent,
    DotLoadersComponent,
    LoopAddCardComponent,
    LoopBarComponent,
    LoopFileInputComponent,
    LoopHelpComponent,
    LoopLineChartComponent,
    LoopPaginatorComponent,
    PageNotFoundComponent,
    PasswordIndicatorComponent,
    WifiIconComponent,
    DisableControlDirective,
    DropFileDirective,
    InlineCodeDirective,
    LoopButtonDirective,
    LoopCardDirective,
    LoopClearButtonDirective,
    LoopCounterDirective,
    LoopTagDirective,
    LoopToolbarDirective,
    SubmitOnEnterDirective,
    AddSpacePipe,
    CamelcaseToHumanPipe,
    CapitalizePipe,
    OrderByPipe,
    ReplacePipe,
    SearchFilterPipe,
    TimeAgoPipe,
    TruncatePipe,
    UnitFormatPipe,
    TreeModule,
    IconDateCheckerComponent,
    ListFilterComponent,
    HeaderSwitcherComponent,
    ButtonCardComponent,
    SensonodeConfirmationDialogComponent,
    StatusDisplayComponent,
    LoadingTemplateComponent,
    BreadcrumbsComponent,
    PasswordInputComponent,
    GoToPageComponent,
  ],
  declarations: [
    DisableControlDirective,
    DropFileDirective,
    InlineCodeDirective,
    LoopButtonDirective,
    LoopCardDirective,
    LoopClearButtonDirective,
    LoopClickOutsideDirective,
    LoopCounterDirective,
    LoopTagDirective,
    LoopToolbarDirective,
    SubmitOnEnterDirective,
    CommonDialogComponent,
    CopyButtonComponent,
    D3ChartComponent,
    DotLoadersComponent,
    LoopAddCardComponent,
    LoopBarComponent,
    LoopFileInputComponent,
    LoopHelpComponent,
    LoopHelpDialogComponent,
    LoopLineChartComponent,
    LoopPaginatorComponent,
    PageNotFoundComponent,
    PasswordIndicatorComponent,
    WifiIconComponent,
    AddSpacePipe,
    CamelcaseToHumanPipe,
    OrderByPipe,
    ReplacePipe,
    SearchFilterPipe,
    TimeAgoPipe,
    TruncatePipe,
    UnitFormatPipe,
    CapitalizePipe,
    IconDateCheckerComponent,
    ListFilterComponent,
    HeaderSwitcherComponent,
    ButtonCardComponent,
    SensonodeConfirmationDialogComponent,
    StatusDisplayComponent,
    LoadingTemplateComponent,
    BreadcrumbsComponent,
    PasswordInputComponent,
    GoToPageComponent,
  ],
  entryComponents: [
    LoopHelpDialogComponent,
    SensonodeConfirmationDialogComponent,
    CommonDialogComponent
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      // providers: [
      //   AddOnsService,
      // ]
    };
  }
}
