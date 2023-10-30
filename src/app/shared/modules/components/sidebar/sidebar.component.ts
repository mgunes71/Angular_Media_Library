import {Component} from '@angular/core';
import {BaseComponent} from "../../../../core/components/base.component";
import {AuthenticationService} from "../../../../modules/auth/services/authentication.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends BaseComponent {
  constructor(private authService: AuthenticationService) {
    super();
  }

  async logout() {
    this.authService.endSession();
  }
}
