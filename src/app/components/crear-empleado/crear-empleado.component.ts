import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Empleado } from 'src/app/interfaces/empleado';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.scss']
})
export class CrearEmpleadoComponent implements OnInit {

  // flag: hacer cick al boton para agregar empleado
  submitted: boolean = false;

  // objeto empleado
  empleado: Empleado = {
    nombre: "",
    apellido: "",
    rut: "",
    salario: 0,
    fechaCreación: new Date(0),
    fechaActualizacion: new Date(0),
  }


  constructor(private fb: FormBuilder) { }

  formEmpleado = this.fb.group({

    nombre: ['', [Validators.required, Validators.minLength(2)]],
    apellido: ['', [Validators.required, Validators.minLength(2)]],
    rut: ['', [Validators.required, Validators.minLength(2)]],
    salario: ['', [Validators.required, Validators.minLength(2)]]

  })

  ngOnInit(): void {
  }

  agregarEmpleado() {

    this.submitted = true;

    if (this.formEmpleado.invalid) {
      return
    }

    // si pasa la validación
    this.empleado = {
      nombre: this.formEmpleado.value.nombre,
      apellido: this.formEmpleado.value.apellido,
      rut: this.formEmpleado.value.rut,
      salario: this.formEmpleado.value.salario,
      fechaCreación: new Date,
      fechaActualizacion: new Date,
    }

    console.log(this.empleado);
    

  }

}
