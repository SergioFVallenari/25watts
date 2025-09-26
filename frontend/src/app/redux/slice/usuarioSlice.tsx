import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface UsuarioState {
  token: string | null;
}
const initialState: UsuarioState = {
  token: null,
};
const usuarioSlice = createSlice({
  name: 'usuario',
  initialState,
  reducers: {
    setUsuario: (state, action: PayloadAction<any>) => {
      state.token = action.payload.token || null;
    },
    clearUsuario: state => {
      state.token = null
    
    },
  }
})
export const { setUsuario, clearUsuario } = usuarioSlice.actions
export default usuarioSlice.reducer
