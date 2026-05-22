import React, { useState } from 'react'
import { useNav, C } from './context'
import { DL } from './DesktopLayout'
import { Card, CardHeader, CardBody, CardTitle, Badge, InfoGrid, Btn } from './ui'

const cidadaos = [
  { id: 'joao', label: 'João Gomes · 7 anos', initials: 'JG', color: C.red },
  { id: 'luana', label: 'Luana Silva · 3 anos', initials: 'LS', color: '#7c3aed' },
  { id: 'carlos', label: 'Carlos Ramos · 5 anos', initials: 'CR', color: C.yel },
]

const DADOS: Record<string, {
  nome: string; idade: string; resp: string; nis: string; end: string
  social: { status: string; statusVariant: 'red' | 'yel' | 'green'; cras: string; caso: string; encaminhamentos: number }
  saude: { status: string; statusVariant: 'red' | 'yel' | 'green'; ubs: string; ultimaConsulta: string; vacinas: string; alerta: string }
  escolar: { status: string; statusVariant: 'red' | 'yel' | 'green'; escola: string; serie: string; freq: string; faltas: number; notas: string }
  timeline: { color: string; secretaria: string; titulo: string; data: string }[]
}> = {
  joao: {
    nome: 'João Gomes', idade: '7 anos · Masculino', resp: 'Sandra Gomes', nis: '9876543210', end: 'R. do Cajueiro, 23 · Ibura',
    social: { status: 'Caso Ativo', statusVariant: 'red', cras: 'CRAS Ibura', caso: 'Risco Alto — Suspeita de negligência familiar. Encaminhado ao CAPS Infantil.', encaminhamentos: 2 },
    saude: { status: 'Consulta Perdida', statusVariant: 'red', ubs: 'UBS Ibura II', ultimaConsulta: 'Faltou em 15/05/2026', vacinas: 'Varicela em atraso (2 semanas)', alerta: 'Segunda falta consecutiva. Aguarda reagendamento urgente.' },
    escolar: { status: 'Risco de Evasão', statusVariant: 'red', escola: 'EMEF Ibura', serie: '3º Ano A · Manhã', freq: '61%', faltas: 8, notas: 'Português 5,5 · Matemática 4,0' },
    timeline: [
      { color: C.red, secretaria: 'Escola', titulo: 'Alerta de evasão gerado — 8 faltas', data: '15/05/2026' },
      { color: C.red, secretaria: 'Saúde', titulo: 'Consulta — faltou (2ª vez)', data: '15/05/2026' },
      { color: C.yel, secretaria: 'Social', titulo: 'Contato com responsável — sem retorno', data: '10/05/2026' },
      { color: C.blu, secretaria: 'Saúde', titulo: 'Consulta — faltou', data: '08/05/2026' },
      { color: C.blu, secretaria: 'Social', titulo: 'Encaminhado ao CAPS Infantil', data: '05/05/2026' },
      { color: C.blu, secretaria: 'Escola', titulo: 'Encaminhado ao CRAS Ibura', data: '05/05/2026' },
      { color: C.green, secretaria: 'Social', titulo: 'Cadastro realizado no CRAS', data: '20/03/2026' },
    ],
  },
  luana: {
    nome: 'Luana Silva', idade: '3 anos · Feminino', resp: 'Ana Silva', nis: '1234567890', end: 'R. das Palmeiras, 114 · Ibura',
    social: { status: 'Caso Ativo', statusVariant: 'red', cras: 'CRAS Ibura', caso: 'Risco Alto — Vacinação atrasada. Família não comparece às consultas.', encaminhamentos: 1 },
    saude: { status: 'Vacinação Atrasada', statusVariant: 'red', ubs: 'UBS Ibura II', ultimaConsulta: 'Faltou em 15/05/2026', vacinas: 'Tríplice viral — 6 semanas de atraso', alerta: 'Situação crítica. Visita domiciliar solicitada para vacinação.' },
    escolar: { status: 'Atenção', statusVariant: 'yel', escola: 'EMEF Ibura', serie: 'Pré I · Tarde', freq: '74%', faltas: 5, notas: 'Desenvolvimento 6,5 · Socialização 7,5' },
    timeline: [
      { color: C.red, secretaria: 'Saúde', titulo: 'Alerta de vacinação gerado', data: '15/05/2026' },
      { color: C.yel, secretaria: 'Escola', titulo: '5ª falta no mês sem justificativa', data: '14/05/2026' },
      { color: C.yel, secretaria: 'Saúde', titulo: 'Consulta — faltou', data: '01/05/2026' },
      { color: C.blu, secretaria: 'Escola', titulo: 'Comunicado enviado à família', data: '10/05/2026' },
      { color: C.blu, secretaria: 'Social', titulo: 'Encaminhamento para pediatria', data: '01/05/2026' },
      { color: C.green, secretaria: 'Social', titulo: 'Cadastro realizado no CRAS', data: '10/04/2026' },
    ],
  },
  carlos: {
    nome: 'Carlos Ramos', idade: '5 anos · Masculino', resp: 'Beatriz Ramos', nis: '5647382910', end: 'R. Nova Esperança, 45 · Jordão',
    social: { status: 'Caso Ativo', statusVariant: 'red', cras: 'CRAS Jordão', caso: 'Risco Alto — Suspeita de desnutrição. Encaminhado ao NASF para avaliação.', encaminhamentos: 2 },
    saude: { status: 'Retorno Agendado', statusVariant: 'yel', ubs: 'UBS Ibura II', ultimaConsulta: 'Triagem em 28/04/2026', vacinas: 'DTP — 3 semanas de atraso', alerta: 'Peso abaixo da curva. Avaliação nutricional pelo NASF em andamento.' },
    escolar: { status: 'Atenção', statusVariant: 'yel', escola: 'EMEF Ibura', serie: '1º Ano B · Manhã', freq: '82%', faltas: 3, notas: 'Português 5,0 · Matemática 4,5' },
    timeline: [
      { color: C.red, secretaria: 'Social', titulo: 'Alerta de desnutrição gerado', data: '10/05/2026' },
      { color: C.blu, secretaria: 'Saúde', titulo: 'Encaminhado ao NASF – Nutrição', data: '05/05/2026' },
      { color: C.yel, secretaria: 'Escola', titulo: 'Queda de rendimento registrada', data: '02/05/2026' },
      { color: C.blu, secretaria: 'Social', titulo: 'Encaminhado pelo CRAS Jordão', data: '28/04/2026' },
      { color: C.green, secretaria: 'Saúde', titulo: 'Triagem inicial realizada', data: '28/04/2026' },
      { color: C.green, secretaria: 'Social', titulo: 'Cadastro realizado no CRAS', data: '15/03/2026' },
    ],
  },
}

const secretariaColor: Record<string, string> = {
  Social: '#7936C8',
  Saúde: C.green,
  Escola: C.blu,
}

export function Visao360() {
  const { openModal } = useNav()
  const [selectedCidadao, setSelectedCidadao] = useState('joao')
  const d = DADOS[selectedCidadao]
  const cidadao = cidadaos.find(c => c.id === selectedCidadao)!

  return (
    <DL
      title="Visão 360° do Cidadão"
      subtitle="Integração entre Assistência Social, Saúde e Educação"
      activeScreen="s-visao360"
      rightAction={
        <Btn variant="primary" small onClick={() => openModal('enc')}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/></svg>
          Encaminhamento Integrado
        </Btn>
      }
    >
      {/* Citizen selector */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {cidadaos.map(c => (
          <div
            key={c.id}
            onClick={() => setSelectedCidadao(c.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 18px', borderRadius: 24,
              background: selectedCidadao === c.id ? C.gradDiag : '#fff',
              border: `1.5px solid ${selectedCidadao === c.id ? 'transparent' : C.bd}`,
              cursor: 'pointer', transition: '.15s',
            }}
          >
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: selectedCidadao === c.id ? 'rgba(255,255,255,.3)' : c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>{c.initials}</div>
            <span style={{ fontSize: 13, fontWeight: 600, color: selectedCidadao === c.id ? '#fff' : '#1A2D5A', whiteSpace: 'nowrap' }}>{c.label}</span>
          </div>
        ))}
      </div>

      {/* Citizen header */}
      <div style={{ background: C.gradDiag, borderRadius: 16, padding: '20px 24px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: '#fff', flexShrink: 0 }}>{cidadao.initials}</div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{d.nome}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.85)', marginTop: 3 }}>{d.idade} · NIS {d.nis}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.7)', marginTop: 2 }}>{d.end} · Resp: {d.resp}</div>
        </div>
      </div>

      {/* 3 secretaria cards + timeline side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 320px', gap: 16, alignItems: 'start' }}>

        {/* Assistência Social */}
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#7936C8' }} />
                <CardTitle>Assistência Social</CardTitle>
              </div>
              <Badge variant={d.social.statusVariant}>{d.social.status}</Badge>
            </div>
          </CardHeader>
          <CardBody>
            <InfoGrid items={[
              { label: 'CRAS', value: d.social.cras },
              { label: 'Encaminhamentos', value: String(d.social.encaminhamentos) },
            ]} />
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 8, padding: '8px 10px', background: '#fef2f2', borderRadius: 8 }}>{d.social.caso}</div>
          </CardBody>
        </Card>

        {/* Saúde */}
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: C.green }} />
                <CardTitle>Saúde</CardTitle>
              </div>
              <Badge variant={d.saude.statusVariant}>{d.saude.status}</Badge>
            </div>
          </CardHeader>
          <CardBody>
            <InfoGrid items={[
              { label: 'UBS', value: d.saude.ubs },
              { label: 'Última Consulta', value: d.saude.ultimaConsulta },
              { label: 'Vacinação', value: d.saude.vacinas, color: C.red },
            ]} />
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 8, padding: '8px 10px', background: '#fffbeb', borderRadius: 8 }}>{d.saude.alerta}</div>
          </CardBody>
        </Card>

        {/* Educação */}
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: C.blu }} />
                <CardTitle>Educação</CardTitle>
              </div>
              <Badge variant={d.escolar.statusVariant}>{d.escolar.status}</Badge>
            </div>
          </CardHeader>
          <CardBody>
            <InfoGrid items={[
              { label: 'Escola', value: d.escolar.escola },
              { label: 'Turma', value: d.escolar.serie },
              { label: 'Frequência', value: d.escolar.freq, color: d.escolar.freq < '80%' ? C.red : C.yel },
              { label: 'Faltas', value: `${d.escolar.faltas} faltas`, color: d.escolar.faltas >= 5 ? C.red : C.yel },
            ]} />
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 8, padding: '8px 10px', background: '#eef2fd', borderRadius: 8 }}>{d.escolar.notas}</div>
          </CardBody>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader><CardTitle>Linha do Tempo</CardTitle></CardHeader>
          <CardBody style={{ padding: '12px 14px' }}>
            {d.timeline.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < d.timeline.length - 1 ? 12 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.color, flexShrink: 0, marginTop: 3 }} />
                  {i < d.timeline.length - 1 && <div style={{ width: 2, flex: 1, background: C.bd, marginTop: 3 }} />}
                </div>
                <div style={{ flex: 1, paddingBottom: i < d.timeline.length - 1 ? 4 : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: secretariaColor[t.secretaria] ?? C.t2, padding: '1px 7px', borderRadius: 8 }}>{t.secretaria}</span>
                    <span style={{ fontSize: 10, color: C.t3 }}>{t.data}</span>
                  </div>
                  <div style={{ fontSize: 12, color: C.t1, fontWeight: 500 }}>{t.titulo}</div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </DL>
  )
}
