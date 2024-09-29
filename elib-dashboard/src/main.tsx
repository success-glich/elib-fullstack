import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import App from './router.tsx'
import { Toaster } from './components/ui/toaster.tsx'

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <App />
      <Toaster />    
    </QueryClientProvider>
  </React.StrictMode>,
)
