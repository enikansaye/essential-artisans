import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtisansRoutingModule } from './artisans-routing.module';
import { WalletComponent } from './wallet/wallet.component';
import { ProfileComponent } from './profile/profile.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ResizeObserverDirective } from './invoice/resize-observer.directive';
import { KeysPipe } from './invoice/keys.pipe';


@NgModule({
  declarations: [
    WalletComponent,
    ProfileComponent,
    InvoiceComponent,
    ResizeObserverDirective,
    KeysPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ArtisansRoutingModule,
    ReactiveFormsModule,
    AvatarModule,
    MatToolbarModule,
    MatIconModule,
    
  ]
})
export class ArtisansModule { }
