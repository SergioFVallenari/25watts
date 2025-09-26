export interface FormProps {
    accion: string; // 'a' para alta, 'm' para modificar, 'c' para visualizar (consulta)
    id?: number; // ID del registro a modificar o consultar
    onClose: () => void; // Callback para manejar éxito después de la operación
    formDisabled?: boolean; // Deshabilitar formulario
    setRecargaGrid: (descripcion: string) => void; // Callback para recargar el grid
}
export interface FormData {
    id?: number;
    codigo: string;
    descripcion: string;
    valor: string;
    fecha_expiracion: string;
    estado: string;
}