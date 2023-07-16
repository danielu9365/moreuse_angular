import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Userusecase } from 'src/app/domain/models/User/usecase/userusecase';
import { User } from 'src/app/domain/models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  public validationMessages = {
    name: [
      { type: 'required', message: 'Este campo es requerido' },
    ],
    email: [ 
      { type: 'required', message: 'Este campo es requerido' },
      { type: 'email', message: 'Este campo es de tipo email' }
    ],
    password: [
      { type: 'required', message: 'Este campo es requerido' },
      { type: 'pattern', message: 'Este campo debe contener por lo menos 1 mayuscula y una minuscula' }
    ],
    confirmPassword: [
      { type: 'required', message: 'Este campo es requerido' },
      { type: 'pattern', message: 'Este campo debe contener por lo menos 1 mayuscula y una minuscula' }
    ]
  }
  constructor(private formBuilder: FormBuilder, private router: Router, private _userUseCase: Userusecase) { }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
      ]
      ],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: [
        '', [
          Validators.required,
          Validators.pattern(/^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/gm)
        ]
      ],
      confirmPassword: [
        '', [
          Validators.required,
          Validators.pattern(/^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/gm)
        ]
      ],
    })
  }

  public get campos() {
    return this.registerForm.controls
  }

  register(){
    var name = this.registerForm.controls['name'].value;
    var email = this.registerForm.controls['email'].value;
    var password = this.registerForm.controls['password'].value;

    if (this.registerForm.valid) {
          this._userUseCase.register(name,email,password).subscribe((response: User) => {
            if (response) {
              console.log(response);
              alert('Usuario registrado')
              Swal.fire({
                title: 'Registro exitoso',
                text: 'Usuario ya se encuentra disponible',
                icon: 'success',
                timer: 5000
              })
              this.router.navigate(['/fullscreen/login']);
            }
            else {
              alert('Usuario no pudo ser registrado')
            }
          })
        }
        else {
          alert('Este registro no es valido');
        }
  }

}
