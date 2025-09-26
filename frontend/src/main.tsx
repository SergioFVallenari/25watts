import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store, persistor } from './app/redux/store'
import { PersistGate } from 'redux-persist/integration/react'

import 'tabler-icons-react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'flag-icons/css/flag-icons.min.css'
import 'node-waves/dist/waves.css'
import '@assets/css/core.css'
import '@assets/css/theme-default.css'
import '@assets/css/demo.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
