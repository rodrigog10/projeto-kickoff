import React from 'react'
import { C } from './context'
export { C }

// ── Topbar ──
interface TopBarProps {
  title?: string
  subtitle?: string
  customTitle?: React.ReactNode
  onBack?: () => void
  rightContent?: React.ReactNode
}
export function TopBar({ title, subtitle, customTitle, onBack, rightContent }: TopBarProps) {
  return (
    <div style={{ background: '#fff', borderBottom: `1px solid ${C.bd}`, padding: '0 16px', height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {onBack && (
          <button onClick={onBack} style={{ width: 34, height: 34, borderRadius: '50%', background: C.bg, border: `1px solid ${C.bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: C.t2 }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
        )}
        {customTitle ?? (
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.t1 }}>{title}</div>
            {subtitle && <div style={{ fontSize: 11, color: C.t3 }}>{subtitle}</div>}
          </div>
        )}
      </div>
      {rightContent && <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{rightContent}</div>}
    </div>
  )
}

// ── Avatar circle ──
export function Av({ initials, color = C.green, onClick }: { initials: string; color?: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{ width: 34, height: 34, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', cursor: onClick ? 'pointer' : 'default', flexShrink: 0 }}>
      {initials}
    </div>
  )
}

// ── Notif bell button ──
export function NotifBtn({ onClick, dot = true }: { onClick?: () => void; dot?: boolean }) {
  return (
    <div onClick={onClick} style={{ width: 34, height: 34, borderRadius: '50%', background: C.bg, border: `1px solid ${C.bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
      <svg width="16" height="16" fill="none" stroke={C.t2} strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      {dot && <div style={{ width: 8, height: 8, background: C.red, borderRadius: '50%', position: 'absolute', top: 3, right: 3, border: '1.5px solid #fff' }} />}
    </div>
  )
}

// ── Bottom nav ──
interface BnItem { label: string; icon: React.ReactNode; onClick: () => void; active?: boolean; badge?: number | string }
export function BottomNav({ items }: { items: BnItem[] }) {
  return (
    <div className="cv-bottom-nav" style={{ background: '#fff', borderTop: `1px solid ${C.bd}`, display: 'flex', flexShrink: 0 }}>
      {items.map((item, i) => (
        <button key={i} onClick={item.onClick} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '8px 4px', cursor: 'pointer', color: item.active ? C.green : C.t3, border: 'none', background: 'transparent', fontFamily: 'inherit', position: 'relative', transition: '.15s' }}>
          <div style={{ width: 20, height: 20 }}>{item.icon}</div>
          <span style={{ fontSize: 10, fontWeight: 600 }}>{item.label}</span>
          {item.badge && (
            <span style={{ position: 'absolute', top: 5, right: 'calc(50% - 14px)', background: C.red, color: '#fff', fontSize: 9, fontWeight: 700, padding: '1px 4px', borderRadius: 8, minWidth: 16, textAlign: 'center' }}>{item.badge}</span>
          )}
        </button>
      ))}
    </div>
  )
}

// ── Stat card ──
export function StatCard({ label, value, sub, color = C.t1 }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, border: `1px solid ${C.bd}`, padding: 14, boxShadow: '0 1px 6px rgba(0,0,0,.08)' }}>
      <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px', color: C.t3, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1, color }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: C.t2, marginTop: 3 }}>{sub}</div>}
    </div>
  )
}

// ── Badge ──
type BadgeVariant = 'red' | 'yel' | 'green' | 'blu' | 'gray'
const badgeStyles: Record<BadgeVariant, { bg: string; color: string }> = {
  red: { bg: C.redB, color: C.red },
  yel: { bg: C.yelB, color: C.yel },
  green: { bg: C.greenL, color: C.green },
  blu: { bg: C.bluB, color: C.blu },
  gray: { bg: '#f3f4f6', color: '#6b7280' },
}
export function Badge({ variant, children }: { variant: BadgeVariant; children: React.ReactNode }) {
  const s = badgeStyles[variant]
  return (
    <span style={{ display: 'inline-block', padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color }}>{children}</span>
  )
}

// ── Alert Banner ──
type AlertVariant = 'red' | 'yel' | 'blu' | 'green'
const alertStyles: Record<AlertVariant, { bg: string; border: string; color: string }> = {
  red: { bg: C.redB, border: '#fca5a5', color: C.red },
  yel: { bg: C.yelB, border: '#fcd34d', color: C.yel },
  blu: { bg: C.bluB, border: '#93c5fd', color: C.blu },
  green: { bg: C.greenL, border: '#86efac', color: C.green },
}
export function AlertBanner({ variant, children }: { variant: AlertVariant; children: React.ReactNode }) {
  const s = alertStyles[variant]
  return (
    <div style={{ borderRadius: 10, padding: '11px 13px', marginBottom: 12, fontSize: 13, display: 'flex', alignItems: 'flex-start', gap: 9, background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
      <div style={{ flexShrink: 0, marginTop: 1 }}>
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      </div>
      <span>{children}</span>
    </div>
  )
}

// ── Card ──
export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, border: `1px solid ${C.bd}`, boxShadow: '0 1px 6px rgba(0,0,0,.08)', overflow: 'hidden', marginBottom: 12, ...style }}>
      {children}
    </div>
  )
}
export function CardHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: '12px 14px', borderBottom: `1px solid ${C.bd}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {children}
    </div>
  )
}
export function CardBody({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ padding: 14, ...style }}>{children}</div>
}
export function CardTitle({ children }: { children: React.ReactNode }) {
  return <span style={{ fontSize: 13, fontWeight: 700, color: C.t1 }}>{children}</span>
}

// ── Section title ──
export function SectionTitle({ children, link, onLink }: { children: React.ReactNode; link?: string; onLink?: () => void }) {
  return (
    <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span>{children}</span>
      {link && <span onClick={onLink} style={{ fontSize: 12, color: C.green, fontWeight: 600, cursor: 'pointer' }}>{link}</span>}
    </div>
  )
}

// ── List item ──
interface ListItemProps {
  av: React.ReactNode
  name: string
  sub: string
  right?: React.ReactNode
  onClick?: () => void
}
export function ListItem({ av, name, sub, right, onClick }: ListItemProps) {
  return (
    <div onClick={onClick} style={{ background: '#fff', borderRadius: 12, border: `1px solid ${C.bd}`, boxShadow: '0 1px 6px rgba(0,0,0,.08)', padding: 13, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, cursor: onClick ? 'pointer' : 'default' }}>
      {av}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
        <div style={{ fontSize: 11, color: C.t2, marginTop: 1 }}>{sub}</div>
      </div>
      {right && <div style={{ flexShrink: 0, textAlign: 'right' }}>{right}</div>}
    </div>
  )
}

// ── Colored avatar ──
export function LiAv({ color, children }: { color: string; children: React.ReactNode }) {
  return <div style={{ width: 38, height: 38, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{children}</div>
}

// ── History item ──
export function HistoryItem({ color, title, date }: { color: string; title: string; date: string }) {
  return (
    <div style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: `1px solid #f3f4f6`, alignItems: 'flex-start' }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, marginTop: 5, flexShrink: 0 }} />
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.t1 }}>{title}</div>
        <div style={{ fontSize: 11, color: C.t3, marginTop: 2 }}>{date}</div>
      </div>
    </div>
  )
}

// ── Progress row ──
export function ProgressRow({ label, value, max = 100, color = C.green, display }: { label: string; value: number; max?: number; color?: string; display?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
      <span style={{ fontSize: 12, color: C.t2, width: 90, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: 6, background: C.bg, borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 3, background: color, width: `${(value / max) * 100}%` }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: C.t1, width: 30, textAlign: 'right', flexShrink: 0 }}>{display ?? value}</span>
    </div>
  )
}

// ── Bar chart ──
interface BarItem { label: string; height: number; filled?: boolean }
export function BarChart({ bars }: { bars: BarItem[] }) {
  return (
    <div className="cv-bars">
      {bars.map((b, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, height: '100%', justifyContent: 'flex-end' }}>
          <div style={{ width: '100%', borderRadius: '3px 3px 0 0', height: b.height, background: b.filled ? C.blu : C.greenL, border: b.filled ? 'none' : `1px solid ${C.bd}` }} />
          <span style={{ fontSize: 9, color: C.t3 }}>{b.label}</span>
        </div>
      ))}
    </div>
  )
}

// ── Profile hero ──
export function ProfileHero({ initials, name, meta, tags }: { initials: string; name: string; meta: string; tags: string[] }) {
  return (
    <div style={{ background: C.gradDiag, padding: '20px 16px', color: '#fff', margin: '-16px -16px 16px' }}>
      <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{initials}</div>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{name}</div>
      <div style={{ fontSize: 12, opacity: .8 }}>{meta}</div>
      <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
        {tags.map((t, i) => (
          <span key={i} style={{ padding: '4px 10px', background: 'rgba(255,255,255,.2)', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

// ── Info grid ──
export function InfoGrid({ items }: { items: { label: string; value: string; color?: string; full?: boolean }[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
      {items.map((item, i) => (
        <div key={i} style={{ background: '#fff', borderRadius: 10, border: `1px solid ${C.bd}`, padding: '10px 12px', gridColumn: item.full ? '1 / -1' : undefined }}>
          <div style={{ fontSize: 10, color: C.t3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: 3 }}>{item.label}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: item.color ?? C.t1 }}>{item.value}</div>
        </div>
      ))}
    </div>
  )
}

// ── Action card (quick action 2x2 grid) ──
export function ActionCard({ icon, label, sub, onClick }: { icon: React.ReactNode; label: string; sub: string; onClick: () => void }) {
  return (
    <div onClick={onClick} style={{ background: '#fff', borderRadius: 12, border: `1px solid ${C.bd}`, boxShadow: '0 1px 6px rgba(0,0,0,.08)', cursor: 'pointer', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', padding: '16px 10px' }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>{icon}</div>
        <div style={{ fontSize: 12, fontWeight: 700 }}>{label}</div>
        <div style={{ fontSize: 10, color: C.t3 }}>{sub}</div>
      </div>
    </div>
  )
}

// ── Encaminhamento item ──
export function EncItem({ name, spec, priority, status, date, opacity, onClick }: { name: string; spec: string; priority: BadgeVariant; status?: BadgeVariant; date: string; opacity?: number; onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{ background: '#fff', borderRadius: 12, border: `1px solid ${C.bd}`, padding: 13, marginBottom: 8, opacity, cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{name}</div>
        <Badge variant={priority}>{priority === 'red' ? 'Urgente' : priority === 'yel' ? 'Médio' : priority === 'green' ? 'Concluído' : 'Normal'}</Badge>
      </div>
      <div style={{ fontSize: 12, color: C.t2, marginBottom: 5 }}>{spec}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {status ? <Badge variant={status}>{status === 'yel' ? 'Aguardando' : status === 'blu' ? 'Em Andamento' : status === 'green' ? 'Concluído' : ''}</Badge> : <span />}
        <span style={{ fontSize: 11, color: C.t3 }}>{date}</span>
      </div>
    </div>
  )
}

// ── Alert item ──
export function AlertItem({ stripe, title, desc, tags, time, opacity, onClick }: { stripe: string; title: string; desc: string; tags: string[]; time: string; opacity?: number; onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{ background: '#fff', borderRadius: 12, border: `1px solid ${C.bd}`, padding: 13, marginBottom: 8, display: 'flex', gap: 10, opacity, cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ width: 4, borderRadius: 2, background: stripe, flexShrink: 0, alignSelf: 'stretch' }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: 12, color: C.t2, lineHeight: 1.4, marginBottom: 6 }}>{desc}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {tags.map((t, i) => <span key={i} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 20, background: C.bg, color: C.t2, fontWeight: 600 }}>{t}</span>)}
          <span style={{ fontSize: 10, color: C.t3 }}>{time}</span>
        </div>
      </div>
    </div>
  )
}

// ── Consulta item ──
type ConsultaVariant = 'urgente' | 'agendada' | 'realizada' | 'faltou'
const consultaBorderColor: Record<ConsultaVariant, string> = {
  urgente: C.red, agendada: C.blu, realizada: C.green, faltou: C.yel,
}
export function ConsultItem({ variant, name, meta, time, tag, status, onClick }: { variant: ConsultaVariant; name: string; meta: string; time: string; tag: string; status: BadgeVariant; onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{ background: '#fff', borderRadius: 12, border: `1px solid ${C.bd}`, padding: 13, marginBottom: 8, borderLeft: `4px solid ${consultaBorderColor[variant]}`, cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{name}</div>
        <Badge variant={status}>{status === 'yel' ? 'Faltou' : status === 'blu' ? 'Agendada' : status === 'green' ? 'Realizada' : status === 'gray' ? 'Aguardando' : ''}</Badge>
      </div>
      <div style={{ fontSize: 11, color: C.t2, marginBottom: 6 }}>{meta}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: C.t3, fontWeight: 600 }}>{time}</span>
        <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: C.bg, color: C.t2 }}>{tag}</span>
      </div>
    </div>
  )
}

// ── Vacina item ──
export function VacItem({ icon, name, meta, badge, badgeVariant, onClick }: { icon: React.ReactNode; name: string; meta: string; badge: string; badgeVariant: BadgeVariant; onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{ background: '#fff', borderRadius: 12, border: `1px solid ${C.bd}`, padding: 13, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{name}</div>
        <div style={{ fontSize: 11, color: C.t2, marginTop: 2 }}>{meta}</div>
      </div>
      <Badge variant={badgeVariant}>{badge}</Badge>
    </div>
  )
}

// ── Visit item ──
type VisitVariant = 'urgente' | 'agendada' | 'realizada'
const visitBorderColor: Record<VisitVariant, string> = {
  urgente: C.red, agendada: C.blu, realizada: C.green,
}
export function VisitItem({ variant, name, badge, addr, reason, tags, onClick }: { variant: VisitVariant; name: string; badge: React.ReactNode; addr: string; reason: string; tags: string[]; onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{ background: '#fff', borderRadius: 12, border: `1px solid ${C.bd}`, padding: 13, marginBottom: 8, borderLeft: `4px solid ${visitBorderColor[variant]}`, cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{name} {badge}</div>
      <div style={{ fontSize: 11, color: C.t2, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
        <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        {addr}
      </div>
      <div style={{ fontSize: 12, color: C.t2, marginBottom: 7 }}>{reason}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
        {tags.map((t, i) => <span key={i} style={{ display: 'inline-block', padding: '3px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: C.bg, color: C.t2 }}>{t}</span>)}
      </div>
    </div>
  )
}

// ── Btn ──
interface BtnProps { children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' | 'danger'; small?: boolean; style?: React.CSSProperties }
export function Btn({ children, onClick, variant = 'primary', small, style }: BtnProps) {
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: C.gradDiag, color: '#fff', border: 'none' },
    secondary: { background: C.bg, color: C.t1, border: `1px solid ${C.bd}` },
    danger: { background: C.redB, color: C.red, border: `1px solid #fca5a5` },
  }
  return (
    <button onClick={onClick} style={{ width: small ? 'auto' : '100%', padding: small ? '8px 14px' : 13, borderRadius: 10, fontSize: small ? 13 : 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginBottom: small ? 0 : 8, ...styles[variant], ...style }}>
      {children}
    </button>
  )
}

// ── Stats grid ──
export function StatsGrid({ cols = 2, children }: { cols?: number; children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 10, marginBottom: 14 }}>
      {children}
    </div>
  )
}

// ── Divider ──
export function Divider() {
  return <div style={{ height: 1, background: C.bd, margin: '12px 0' }} />
}

// ── Page content ──
export function PageContent({ children }: { children: React.ReactNode }) {
  return <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>{children}</div>
}

// ── Gradient brand title for home screens ──
export function BrandTitle({ subtitle }: { subtitle: string }) {
  return (
    <div>
      <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-.3px', background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1.2 }}>
        ConectaVidas
      </div>
      <div style={{ fontSize: 11, color: C.t3, marginTop: 1 }}>{subtitle}</div>
    </div>
  )
}

// ── Tag ──
export function Tag({ children }: { children: React.ReactNode }) {
  return <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: C.bg, color: C.t2, margin: 2 }}>{children}</span>
}

// ── Form components ──
export function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.t2, marginBottom: 5 }}>{label}</label>
      {children}
    </div>
  )
}
const inputStyle: React.CSSProperties = { width: '100%', padding: '11px 13px', border: `1.5px solid ${C.bd}`, borderRadius: 10, fontSize: 14, fontFamily: 'inherit', color: C.t1, outline: 'none', background: '#fafafa', boxSizing: 'border-box' }
export function Input({ type = 'text', placeholder, defaultValue, value }: { type?: string; placeholder?: string; defaultValue?: string; value?: string }) {
  return <input type={type} placeholder={placeholder} defaultValue={defaultValue} value={value} readOnly={!!value} style={inputStyle} />
}
export function Select({ options }: { options: string[] }) {
  return (
    <select style={{ ...inputStyle }}>
      {options.map((o, i) => <option key={i}>{o}</option>)}
    </select>
  )
}
export function Textarea({ placeholder }: { placeholder?: string }) {
  return <textarea placeholder={placeholder} style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} />
}

// ── Kanban card ──
export function KanbanCard({ name, sub, tags, onClick }: { name: string; sub: string; tags: string[]; onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{ background: '#fff', borderRadius: 8, padding: 10, border: `1px solid ${C.bd}`, cursor: onClick ? 'pointer' : 'default', marginBottom: 7 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.t1 }}>{name}</div>
      <div style={{ fontSize: 11, color: C.t2, marginTop: 2 }}>{sub}</div>
      <div style={{ marginTop: 7, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
        {tags.map((t, i) => <span key={i} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 20, background: C.bg, color: C.t2, fontWeight: 600 }}>{t}</span>)}
      </div>
    </div>
  )
}
