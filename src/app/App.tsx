import React, { useState } from 'react'
import { NavContext } from './components/context'
import { LoginScreen } from './components/Login'
import { ASHome, ASKanban, ASMonitor, ASEnc, ASAlerts, ASFamilia } from './components/AS'
import { SDHome, SDConsultas, SDPaciente, SDEnc, SDVacina, SDVisitas, SDAlerts } from './components/SD'
import { ECHome, ECAlunos, ECAluno, ECEnc, ECAlerts } from './components/EC'
import { Visao360 } from './components/Visao360'
import { Modals } from './components/Modals'

function renderScreen(screen: string) {
  switch (screen) {
    case 's-login':       return <LoginScreen />
    case 's-as-home':     return <ASHome />
    case 's-as-kanban':   return <ASKanban />
    case 's-as-monitor':  return <ASMonitor />
    case 's-as-enc':      return <ASEnc />
    case 's-as-alerts':   return <ASAlerts />
    case 's-as-familia':  return <ASFamilia />
    case 's-sd-home':     return <SDHome />
    case 's-sd-consultas':return <SDConsultas />
    case 's-sd-paciente': return <SDPaciente />
    case 's-sd-enc':      return <SDEnc />
    case 's-sd-vacina':   return <SDVacina />
    case 's-sd-visitas':  return <SDVisitas />
    case 's-sd-alerts':   return <SDAlerts />
    case 's-ec-home':     return <ECHome />
    case 's-ec-alunos':   return <ECAlunos />
    case 's-ec-aluno':    return <ECAluno />
    case 's-ec-enc':      return <ECEnc />
    case 's-ec-alerts':   return <ECAlerts />
    case 's-visao360':    return <Visao360 />
    default:              return <LoginScreen />
  }
}

export default function App() {
  const [screen, setScreen] = useState('s-login')
  const [histStack, setHistStack] = useState<string[]>([])
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  function goTo(s: string) {
    setHistStack(h => [...h, screen])
    setScreen(s)
    window.scrollTo(0, 0)
  }

  function goToWith(s: string, id: string) {
    setSelectedId(id)
    setHistStack(h => [...h, screen])
    setScreen(s)
    window.scrollTo(0, 0)
  }

  function goBack() {
    setHistStack(h => {
      if (h.length === 0) return h
      const prev = h[h.length - 1]
      setScreen(prev)
      return h.slice(0, -1)
    })
  }

  function doLogin(targetScreen: string) {
    setHistStack([])
    setScreen(targetScreen)
  }

  function doLogout() {
    setHistStack([])
    setScreen('s-login')
    setActiveModal(null)
  }

  function openModal(modal: string) {
    setActiveModal(modal)
  }

  function closeModal() {
    setActiveModal(null)
  }

  return (
    <NavContext.Provider value={{ screen, selectedId, menuOpen: false, goTo, goToWith, goBack, openModal, closeModal, openMenu: () => {}, closeMenu: () => {}, doLogin, doLogout }}>
      <div className="cv-app">
        {renderScreen(screen)}
        <Modals activeModal={activeModal} />
      </div>
    </NavContext.Provider>
  )
}
