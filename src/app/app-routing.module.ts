import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEmpleadoComponent } from './components/crear-empleado/crear-empleado.component';
import { ListaEmpleadosComponent } from './components/lista-empleados/lista-empleados.component';

const routes: Routes = [

  { path: "", redirectTo: 'empleados',pathMatch: 'full' },

  { path: "empleados", component: ListaEmpleadosComponent },

  { path: "agregar-empleado", component: CrearEmpleadoComponent },
  
  { path: "**", redirectTo: 'empleados', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
