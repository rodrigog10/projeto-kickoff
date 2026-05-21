import React, { useState } from 'react'
import { useNav, C } from './context'
import logoImg from '../../imports/logo-removebg-preview.png'

export function LoginScreen() {
  const { doLogin } = useNav()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)

  function handleLogin() {
    const routes: Record<string, { pass: string; screen: string }> = {
      assistente: { pass: 'assistente', screen: 's-as-home' },
      saude: { pass: 'saude', screen: 's-sd-home' },
      escolar: { pass: 'escolar', screen: 's-ec-home' },
    }
    const route = routes[user.trim().toLowerCase()]
    if (route && pass.trim().toLowerCase() === route.pass) {
      setError(false)
      doLogin(route.screen)
    } else {
      setError(true)
      setPass('')
    }
  }

  return (
    <div style={{ background: C.gradDiag, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: '32px 24px', width: '100%', maxWidth: 380, boxShadow: '0 20px 60px rgba(0,0,0,.25)' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <img
            src={logoImg}
            alt="ConectaVidas"
            style={{ width: 72, height: 72, objectFit: 'contain', flexShrink: 0 }}
          />
          <div>
            <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-.5px', background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1.1 }}>ConectaVidas</div>
            <div style={{ fontSize: 12, color: C.t3, marginTop: 4 }}>Prefeitura do Recife · Integração Social Inteligente</div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: C.redB, border: '1px solid #fca5a5', color: C.red, padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 12 }}>
            Usuário ou senha incorretos. Tente novamente.
          </div>
        )}

        {/* Form */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.t2, marginBottom: 5 }}>Usuário</label>
          <input
            type="text"
            value={user}
            onChange={e => setUser(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && document.getElementById('cv-pass')?.focus()}
            placeholder="Digite seu usuário"
            autoComplete="username"
            style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${C.bd}`, borderRadius: 10, fontSize: 14, fontFamily: 'inherit', outline: 'none', background: '#fafafa', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.t2, marginBottom: 5 }}>Senha</label>
          <input
            id="cv-pass"
            type="password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Digite sua senha"
            autoComplete="current-password"
            style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${C.bd}`, borderRadius: 10, fontSize: 14, fontFamily: 'inherit', outline: 'none', background: '#fafafa', boxSizing: 'border-box' }}
          />
        </div>
        <button
          onClick={handleLogin}
          style={{ width: '100%', padding: 13, background: C.gradDiag, color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: 4 }}
        >
          Entrar no Sistema
        </button>

        {/* Hints */}
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${C.bd}` }}>
          <p style={{ fontSize: 11, color: C.t3, marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px' }}>Acessos de demonstração</p>
          {[
            { user: 'assistente / assistente', role: 'Social' },
            { user: 'saude / saude', role: 'Saúde' },
            { user: 'escolar / escolar', role: 'Escolar' },
          ].map((h, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.t2, padding: '3px 0' }}>
              <span>{h.user}</span>
              <span style={{ color: C.green, fontWeight: 600 }}>{h.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
