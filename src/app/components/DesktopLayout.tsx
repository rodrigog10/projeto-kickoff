import React from 'react'
import { useNav, C, UserRole } from './context'

// ── Icons ──
const IcoHome = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
const IcoKanban = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
const IcoMonitor = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
const IcoEnc = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
const IcoAlert = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
const IcoCal = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
const IcoVac = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
const IcoVisit = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
const IcoAlunos = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
const IcoGlobe = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
const IcoLogout = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
const IcoBack = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>

interface NavEntry { label: string; screen: string; icon: React.ReactNode; badge?: number }
interface Section { title: string; color: string; dot: string; entries: NavEntry[] }

const NAV_SECTIONS: Section[] = [
  {
    title: 'Assistência Social', color: '#7936C8', dot: '#7936C8',
    entries: [
      { label: 'Painel', screen: 's-as-home', icon: <IcoHome /> },
      { label: 'Kanban', screen: 's-as-kanban', icon: <IcoKanban /> },
      { label: 'Monitor', screen: 's-as-monitor', icon: <IcoMonitor /> },
      { label: 'Encaminhamentos', screen: 's-as-enc', icon: <IcoEnc /> },
      { label: 'Alertas', screen: 's-as-alerts', icon: <IcoAlert />, badge: 3 },
    ],
  },
  {
    title: 'Saúde', color: C.green, dot: C.green,
    entries: [
      { label: 'Painel', screen: 's-sd-home', icon: <IcoHome /> },
      { label: 'Consultas', screen: 's-sd-consultas', icon: <IcoCal /> },
      { label: 'Encaminhamentos', screen: 's-sd-enc', icon: <IcoEnc /> },
      { label: 'Vacinação', screen: 's-sd-vacina', icon: <IcoVac />, badge: 7 },
      { label: 'Visitas', screen: 's-sd-visitas', icon: <IcoVisit /> },
      { label: 'Alertas', screen: 's-sd-alerts', icon: <IcoAlert />, badge: 3 },
    ],
  },
  {
    title: 'Educação', color: C.blu, dot: C.blu,
    entries: [
      { label: 'Painel', screen: 's-ec-home', icon: <IcoHome /> },
      { label: 'Alunos', screen: 's-ec-alunos', icon: <IcoAlunos /> },
      { label: 'Encaminhamentos', screen: 's-ec-enc', icon: <IcoEnc /> },
      { label: 'Alertas', screen: 's-ec-alerts', icon: <IcoAlert />, badge: 4 },
    ],
  },
]

const ROLE_KEY: Record<string, UserRole> = { as: 'as', sd: 'sd', ec: 'ec' }
const SECTION_ROLE: Record<string, UserRole> = {
  'Assistência Social': 'as',
  'Saúde': 'sd',
  'Educação': 'ec',
}

function Sidebar({ activeScreen }: { activeScreen: string }) {
  const { goTo, doLogout, role } = useNav()
  const visibleSections = NAV_SECTIONS.filter(s => SECTION_ROLE[s.title] === role)

  return (
    <div style={{ width: 240, minWidth: 240, background: '#fff', borderRight: `1px solid ${C.bd}`, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: `1px solid ${C.bd}`, flexShrink: 0 }}>
        <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: '-.4px', background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ConectaVidas</div>
        <div style={{ fontSize: 11, color: C.t3, marginTop: 2 }}>Plataforma Integrada · Porto Digital</div>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 10px' }}>
        {visibleSections.map((sec) => (
          <div key={sec.title} style={{ marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 10px', marginBottom: 2 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: sec.color, flexShrink: 0 }} />
              <span style={{ fontSize: 10, fontWeight: 800, color: sec.color, textTransform: 'uppercase', letterSpacing: '.06em' }}>{sec.title}</span>
            </div>
            {sec.entries.map((e) => {
              const isActive = activeScreen === e.screen
              return (
                <button
                  key={e.screen}
                  onClick={() => goTo(e.screen)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                    background: isActive ? `${sec.color}18` : 'transparent',
                    color: isActive ? sec.color : C.t2,
                    marginBottom: 1, transition: '.12s', position: 'relative',
                  }}
                >
                  {isActive && <div style={{ position: 'absolute', left: 0, top: 4, bottom: 4, width: 3, borderRadius: 2, background: sec.color }} />}
                  <span style={{ width: 16, height: 16, flexShrink: 0 }}>{e.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, flex: 1, textAlign: 'left' }}>{e.label}</span>
                  {e.badge && <span style={{ fontSize: 10, fontWeight: 700, background: isActive ? sec.color : C.red, color: '#fff', padding: '1px 6px', borderRadius: 10 }}>{e.badge}</span>}
                </button>
              )
            })}
            <div style={{ height: 8 }} />
          </div>
        ))}

        {/* Visão 360° */}
        <div
          onClick={() => goTo('s-visao360')}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 10px', borderRadius: 10, cursor: 'pointer', marginTop: 4,
            background: activeScreen === 's-visao360' ? 'rgba(121,54,200,.12)' : C.bg,
            border: activeScreen === 's-visao360' ? '1.5px solid #7936C880' : `1.5px solid ${C.bd}`,
          }}
        >
          <div style={{ width: 28, height: 28, borderRadius: 8, background: C.gradDiag, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <IcoGlobe />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.t1 }}>Visão 360°</div>
            <div style={{ fontSize: 10, color: C.t3, marginTop: 1 }}>Visão integrada do cidadão</div>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div style={{ padding: '12px 10px', borderTop: `1px solid ${C.bd}`, flexShrink: 0 }}>
        <button
          onClick={doLogout}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: C.t2, fontFamily: 'inherit' }}
        >
          <IcoLogout />
          <span style={{ fontSize: 13, fontWeight: 500 }}>Sair</span>
        </button>
      </div>
    </div>
  )
}

interface DLProps {
  title: string
  subtitle?: string
  activeScreen: string
  onBack?: () => void
  rightAction?: React.ReactNode
  children: React.ReactNode
  noPad?: boolean
  userInitials?: string
  userSub?: string
}

export function DL({ title, subtitle, activeScreen, onBack, rightAction, children, noPad, userInitials = 'CV', userSub = 'Usuário' }: DLProps) {
  const { doLogout } = useNav()
  return (
    <div style={{ display: 'flex', height: '100vh', background: C.bg, overflow: 'hidden' }}>
      <Sidebar activeScreen={activeScreen} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Top header */}
        <div style={{ height: 56, background: '#fff', borderBottom: `1px solid ${C.bd}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {onBack && (
              <button onClick={onBack} style={{ width: 32, height: 32, borderRadius: '50%', background: C.bg, border: `1px solid ${C.bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: C.t2, flexShrink: 0 }}>
                <IcoBack />
              </button>
            )}
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.t1 }}>{title}</div>
              {subtitle && <div style={{ fontSize: 11, color: C.t3 }}>{subtitle}</div>}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {rightAction}
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: C.gradDiag, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', cursor: 'pointer', title: userSub }}>{userInitials}</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: noPad ? 0 : 28 }}>
          {children}
        </div>
      </div>
    </div>
  )
}
