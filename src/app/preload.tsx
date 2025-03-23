"use client";
import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import store from "@/fsd/app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PreloadProps {
  children: ReactNode;
}

const Preload = ({ children }: PreloadProps) => {
  // QueryClient Setting
  const [queryClient] = useState(() => new QueryClient());
  
  return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {children}
        </QueryClientProvider>
      </Provider>
  );
};

export default Preload;