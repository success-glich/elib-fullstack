/* eslint-disable @typescript-eslint/ban-ts-comment */
import { create } from 'zustand'
import { devtools,persist } from 'zustand/middleware'

export interface TokenState {
  token: string;
  setToken: (token:string) => void;
}

const useTokenStore = create<TokenState>()(devtools(persist((set) => ({
  token:"",
  setToken: (data:string) => set(() => ({ token:data })),
  
}),{name:'token-store'})));

export default useTokenStore;