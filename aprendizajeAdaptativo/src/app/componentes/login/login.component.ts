import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'; 
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

import { ProfesorService } from 'src/app/servicios/profesorService/profesor.service';
import { ProfesorInterface } from 'src/app/interfaces/profesor-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  usuario:any 


  /*constructor(public userService: LoginServiceService,
    private router: Router,
    private formBuilder: FormBuilder) { 
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.email],
        password: ['', Validators.required] 
    })
  }*/

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private modalService: NgbModal,
    private profesor: ProfesorService){
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
    this.profesor.getProfesor().subscribe(
      data=>{
        this.profesores = <ProfesorInterface[]> data;
      }
    )
  }


  ngOnInit(): void {
  }

  profesores: ProfesorInterface[] = <ProfesorInterface[]>{};
  
  get email(){
    return this.loginForm.get('email') as FormControl;
   }

   get password(){
    return this.loginForm.get('password') as FormControl;
  }

  /*login(contacto:any){
    this.userService.userlogin(this.loginForm.value).subscribe()
    this.router.navigateByUrl('')
  }*/
  flag:boolean = false;
  login(contacto:any){
    for(let i = 0; i < this.profesores.length; i++){
      if(this.profesores[i].correo == this.email.value && this.profesores[i].contrasenia == this.password.value){
        sessionStorage.setItem('sesion', (this.profesores[i].idProfesor).toString());
        this.flag = true;
        this.router.navigate(["/"+this.profesores[i].idProfesor, 'inicio'])
      }
    }
    if(!this.flag){
      alert('Correo o contraseña incorrectos\nIntente de nuevo')
      window.location.reload()
    }
  }
  
}

