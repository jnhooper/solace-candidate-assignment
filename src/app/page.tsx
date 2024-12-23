"use client";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import AdvocateTable from '@/AdvocateTable';

const queryClient = new QueryClient();

/**
 * idealy we'd do server side fetching but instructions
 * said no server actions... which i took to include that...?
**/
export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main style={{ margin: "24px" }}>
        <h1
          className='text-7xl'
        >
          Solace Advocates
        </h1>
        <br />
        <br />
        <AdvocateTable />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
