"use client";
import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import store from "@/fsd/app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// UI Libraries
// radix
import { ThemeProvider } from "next-themes";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "@radix-ui/themes/tokens.css";
import "@radix-ui/themes/components.css";
import "@radix-ui/themes/utilities.css";
// react-toastify
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
          <ThemeProvider attribute="class">
            <Theme>
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
            </Theme>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
  );
};

export default Preload;