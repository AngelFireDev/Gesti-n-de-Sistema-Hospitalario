export interface Paciente {
  id: number;
  documento: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  genero: string;
  telefono: string;
  direccion: string;
  email: string;
  tipo_sangre: string;
  edad?: number;
  diagnostico?: string;
}
