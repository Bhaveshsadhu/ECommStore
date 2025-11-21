
import AppRoutes from './routes/AppRoutes.jsx'
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />
    </>
  )
}

export default App
