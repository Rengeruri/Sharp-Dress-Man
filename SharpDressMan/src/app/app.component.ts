import { Component, ChangeDetectorRef } from '@angular/core';
import { FormFieldTypes, onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sharp-Dress-Man';
  user: CognitoUserInterface | undefined;
  authState: AuthState | undefined;
  formFieldsIn: FormFieldTypes;
  formFieldsUp: FormFieldTypes;
  formFieldConfirm: FormFieldTypes;
  formFieldFortPass: FormFieldTypes;

  constructor(private ref: ChangeDetectorRef) {
    this.formFieldsIn = [
      {
        type: "username",
        label: "Nombre de usuario *",
        placeholder: "Ingrese su nombre de usuario",
        required: true,
      },
      {
        type: "password",
        label: "Contraseña *",
        placeholder: "Ingrese su contraseña",
        required: true,
      }
    ];
    this.formFieldsUp = [
      {
        type: "username",
        label: "Nombre de usuario *",
        placeholder: "Ingrese su nombre de usuario",
        required: false,
      },
      {
        type: "email",
        label: "Correo",
        placeholder: "Ingrese su correo",
        required: true,
      },
      {
        type: "password",
        label: "Contraseña",
        placeholder: "Ingrese su contraseña",
        required: true,
      }
    ];
    this.formFieldConfirm = [
      {
        type: "username",
        label: "Nombre de usuario *",
        placeholder: "Confirme su nombre de usuario",
        required: true,
      },
      {
        type: "code",
        label: "Código",
        placeholder: "Ingrese el código que le enviamos al correo",
        required: true,
      }
    ];
    this.formFieldFortPass = [
      {
        type: "username",
        label: "Nombre de usuario *",
        placeholder: "Ingrese su nombre de usuario",
        required: true,
      }
    ];
  }

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
