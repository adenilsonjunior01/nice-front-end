import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule,  LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './theme/shared/shared.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { ToggleFullScreenDirective } from './theme/shared/full-screen/toggle-full-screen';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* Menu Items */
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* Page errors */
import { ErrorNotFoundComponent } from './main/pages/page-errors/error-not-found/error-not-found.component';
import { ErrorServidorComponent } from './main/pages/page-errors/error-servidor/error-servidor.component';
import { UsersModule } from './main/pages/users/users.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmpresaModule } from './main/pages/form-registro-colaborador/registro/empresa/empresa.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EditUserModule } from './main/pages/users/edit-user/edit-user.module';
import { RefreshTokenInterceptor } from './main/pages/authentication/interceptors/refresh-token-interceptor';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

registerLocaleData(localePt, 'pt');
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavRightComponent,
    NavLeftComponent,
    NavSearchComponent,
    ConfigurationComponent,
    ToggleFullScreenDirective,
    ErrorNotFoundComponent,
    ErrorServidorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    UsersModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    EmpresaModule,
    BsDatepickerModule.forRoot(),
    EditUserModule,
  ],
  providers: [
    NavigationItem,
    { provide: LOCALE_ID, useValue: 'pt'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
