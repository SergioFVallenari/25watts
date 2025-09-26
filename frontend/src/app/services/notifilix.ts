import { Confirm, Report, Loading } from 'notiflix';
const EnviarMensaje = (tipo:string, msg:string) => {
  if (msg === undefined) {
    msg = '';
  }
  switch (tipo) {
    case 'success':
      Report.success('Registro Exitoso', msg, 'Cerrar');
      break;
    case 'danger':
      Report.failure('Ups, tenemos un problema', msg, 'Cerrar');
      break;
    case 'warning':
      Report.warning('Atencion!', msg, 'Cerrar');
      break;
  }
};
export const IniciarSpinner = () => {
  Loading.standard()
}
export const FinalizarSpinner = () => {
  Loading.remove()
}
interface ConfirmModalCallback {
    (): void;
}
export const ConfirmModal = (titulo: string, msg: string, cbFnOk: ConfirmModalCallback): void => {
    Confirm.show(
        titulo,
        msg,
        'Aceptar',
        'Cancelar',
        () => {
            cbFnOk();
        }
    );
}
const Modal = (titulo:string, msg:string, cbFnOk:any, okButtonText = 'Aceptar', cancelButtonText = 'Cancelar') => {
  Confirm.show(titulo, msg, okButtonText, cancelButtonText, () => cbFnOk())
}
export default {
  Modal,
  EnviarMensaje,
  IniciarSpinner,
  FinalizarSpinner
}