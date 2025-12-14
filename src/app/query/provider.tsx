/**
 * @fileoverview Query Provider
 */

import { QueryClientProvider } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { queryClient, localStoragePersister } from './config'

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  if (!localStoragePersister) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: localStoragePersister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};

export default QueryProvider