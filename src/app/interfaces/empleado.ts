export interface Empleado{

    nombre: string;
    apellido: string;
    rut:string;
    salario:number;
    fechaCreación:Date;
    fechaActualizacion:Date;
}

export interface Empleados {
    id: string;
    nombre: string;
    apellido: string;
    rut:string;
    salario:number;
    fechaCreación:Date;
    fechaActualizacion:Date;

}

export interface EmpleadoActualizado{
    nombre: string;
    apellido: string;
    rut:string;
    salario:number;
    fechaActualizacion:Date;
}