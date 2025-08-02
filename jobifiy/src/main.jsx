import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MyContextProvider } from './context/context.jsx';
import '@ant-design/v5-patch-for-react-19';
import './index.css'
import App from './page/page.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <MyContextProvider>
    <App />
  </MyContextProvider>
  // </StrictMode>,
)
