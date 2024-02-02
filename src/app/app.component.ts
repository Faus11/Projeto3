import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {CommonModule, NgSwitchCase} from "@angular/common";
import {CmdkComponent} from "./cmdk/cmdk.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgSwitchCase,
    CommonModule,
    CmdkComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cmdk';
}
