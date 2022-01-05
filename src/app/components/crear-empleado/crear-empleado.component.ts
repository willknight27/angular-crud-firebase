import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from 'src/app/interfaces/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.scss']
})
export class CrearEmpleadoComponent implements OnInit {

  // FLAG: hacer click al boton para agregar empleado
  submitted: boolean = false;

  // FLAG SPINNER: hacer click al boton agregar para que aparezca el spinner
  loading: boolean = false;

  // ID: variable que sera un string o null si esta el parametro en la url para editar empleado
  id: string | null = '';

  // Titulo de la página: Agregar Empleado o Editar Empleado
  titulo: string = 'Agregar Empleado';

  // objeto empleado
  empleado: Empleado = {
    nombre: "",
    apellido: "",
    rut: "",
    salario: 0,
    fechaCreación: new Date(0),
    fechaActualizacion: new Date(0),
  }


  constructor(private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) {

    // Parametro id es el que esta escrito como parametro en la ruta de editar empleado
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    //console.log(this.id)
  }

  formEmpleado = this.fb.group({

    nombre: ['', [Validators.required, Validators.minLength(2)]],
    apellido: ['', [Validators.required, Validators.minLength(2)]],
    rut: ['', [Validators.required, Validators.minLength(2)]],
    salario: ['', [Validators.required, Validators.minLength(2)]]

  })

  ngOnInit(): void {
    this.formularioEditar();
  }

  
  agregarEditarEmpleado() {

    this.submitted = true;
    if (this.formEmpleado.invalid) {
      return
    }

    if (this.id == null) {
      this.agregarEmpleado()
    }else{
      this.editarEmpleado()
    }


  }

  agregarEmpleado(){
    // si pasa la validación
    this.empleado = {
      nombre: this.formEmpleado.value.nombre,
      apellido: this.formEmpleado.value.apellido,
      rut: this.formEmpleado.value.rut,
      salario: this.formEmpleado.value.salario,
      fechaCreación: new Date,
      fechaActualizacion: new Date,
    }

    // Spinner flag true
    this.loading = true

    this.empleadoService.agregarempleado(this.empleado).then(() => {

      // Toastr
      this.toastr.success("El empleado ha sido registrado con exito", "Empleado registrado",
        { positionClass: 'toast-bottom-right' })

      // redirección
      this.router.navigate(["/empleados"])

    }).catch(error => {

      console.log(error);
      this.loading = false;
    })
  }

  editarEmpleado(){

  }

  // Metodo para obtener datos de empleado para editarlos en el formulario
  formularioEditar() {
    
    if (this.id !== null) {
      this.loading = true;
      this.titulo = 'Editar Empleado';
      this.empleadoService.getEmpleado(this.id).subscribe( data => {
        this.loading = false;
        // Acceder a todos los datos -> data.payload.data()
        // Acceder a un solo dato --> data.payload.data()['nombre']
        // Metodo setVAlue -> para rellenar el formulario con datos
        this.formEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          rut: data.payload.data()['rut'],
          salario: data.payload.data()['salario'],
        });
      });
    }
  }

}
