import { createContext, useContext } from 'react'

export const C = {
  green: '#00BFA5', greenL: '#E0F7F5', greenM: '#00CDB8',
  bg: '#f5f6f8', white: '#fff', bd: '#e5e7eb',
  t1: '#1A2D5A', t2: '#6b7280', t3: '#9ca3af',
  red: '#dc2626', redB: '#fef2f2',
  yel: '#d97706', yelB: '#fffbeb',
  blu: '#4472D9', bluB: '#eef2fd',
  grad: 'linear-gradient(90deg, #7936C8 0%, #4472D9 50%, #00BFA5 100%)',
  gradDiag: 'linear-gradient(135deg, #7936C8 0%, #4472D9 50%, #00BFA5 100%)',
}

export type UserRole = 'as' | 'sd' | 'ec'

export interface NavContextType {
  screen: string
  selectedId: string | null
  role: UserRole | null
  menuOpen: boolean
  goTo: (screen: string) => void
  goToWith: (screen: string, id: string) => void
  goBack: () => void
  openModal: (modal: string) => void
  closeModal: () => void
  openMenu: () => void
  closeMenu: () => void
  doLogin: (screen: string, role: UserRole) => void
  doLogout: () => void
}

export const NavContext = createContext<NavContextType>({
  screen: 's-login',
  selectedId: null,
  role: null,
  menuOpen: false,
  goTo: () => {},
  goToWith: () => {},
  goBack: () => {},
  openModal: () => {},
  closeModal: () => {},
  openMenu: () => {},
  closeMenu: () => {},
  doLogin: () => {},
  doLogout: () => {},
})

export const useNav = () => useContext(NavContext)
