import {Component} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BaseComponent} from "../../../../core/components/base.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
  loading = false;

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private authService: AuthenticationService, private readonly fb: FormBuilder, private readonly router: Router,) {
    super();
  }

  override async ngOnInit(): Promise<void> {

  }

  public async login() {
    console.log(this.form.value)
    this.loading = true;
    const {email, password} = this.form.value;
    await this.authService.getApi().loginWithEmail({email, password}).then(async token => {
      await this.authService.authenticate(token)
    })
      .catch(err => {
        if (err) {
          this.loading = false;
          return;
        }
      });
  }
}
