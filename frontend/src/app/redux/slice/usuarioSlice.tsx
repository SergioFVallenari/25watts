import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface UsuarioState {
  token: string | null;
  user: any | null;
}
const initialState: UsuarioState = {
  token: null,
  user: null
};
const usuarioSlice = createSlice({
  name: 'usuario',
  initialState,
  reducers: {
    setUsuario: (state, action: PayloadAction<any>) => {
      state.token = action.payload.token || null;
      state.user = action.payload.user || null;
    },
    clearUsuario: state => {
      state.token = null;
      state.user = null;
    },
  }
})
export const { setUsuario, clearUsuario } = usuarioSlice.actions
export default usuarioSlice.reducer
