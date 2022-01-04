import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Empleado,Empleados } from 'src/app/interfaces/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.scss']
})
export class ListaEmpleadosComponent implements OnInit {

  empleados:Empleados[] = []

  constructor(private empleadoService: EmpleadoService,
              private toastr : ToastrService) { }

  ngOnInit(): void {
    this.getEmpleadosFire();
  }

  getEmpleadosFire(){
    this.empleadoService.getEmpleados().subscribe(data=>{
      this.empleados = [];
      // data retorna 5 objetos con info de firebase sin el id
      // Es necesario iterar la data con foreach para obtener los datos (alternativa: map o pipes)
      data.forEach((element:any) => {

        // Agregar al array un objeto con el id y un objeto con los otros datos del empleado
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })

      });
      /* console.log(this.empleados); */
      
    })
  }

  eliminarEmpleado(id: string){
    this.empleadoService.deleteEmpleado(id).then( ()=> {

      this.toastr.info("El empleado ha sido eliminado con exito","Empleado eliminado",
      {positionClass: 'toast-bottom-right' })
      console.log("Empleado eliminado");
      
    }).catch( error => {
      console.log(error);
      
    })
  }

}
