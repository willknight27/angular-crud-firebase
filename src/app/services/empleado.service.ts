import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Empleado, EmpleadoActualizado } from '../interfaces/empleado';
import { Observable } from 'rxjs';
import { query } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor( private firestore: AngularFirestore) { }

  // Agregar un empleado a la base de datos en firebase
  agregarempleado(empleado:Empleado): Promise<any>{
    return this.firestore.collection('empleados').add(empleado)
  }


  // Obtener todos los empleados desde firebase
  /* como segundo parametro de la funcion collection
  ordenar los datos por la fecha de creación en forma ascendente */
  getEmpleados(): Observable<any>{
    return this.firestore.collection(

      'empleados',
      query => query.orderBy('fechaCreación', 'asc'))
      .snapshotChanges()
  }

  // Obtener empleado
  getEmpleado(id: string): Observable<any>{
    return this.firestore.collection('empleados').doc(id).snapshotChanges();
  }

  // Eliminar empleado de acuedo a su id
  deleteEmpleado(id:string): Promise<any>{
    // .doc nos retorna un documento en especifico, en este caso de acuerdo al ID
    return this.firestore.collection('empleados').doc(id).delete()
  }

  // Editar empleado
  actualizarEmpleado(id:string, empleado:EmpleadoActualizado): Promise<any>{
    return this.firestore.collection('empleados').doc(id).update(empleado);
  }
}
