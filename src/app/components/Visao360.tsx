import React, { useState, useMemo } from 'react'
import { useNav, C } from './context'
import { DL } from './DesktopLayout'
import { Card, CardHeader, CardBody, CardTitle, Badge, InfoGrid, Btn } from './ui'

type Risco = 'alto' | 'medio' | 'baixo'
type SecVariant = 'red' | 'yel' | 'green'

interface CidadaoData {
  id: string
  initials: string
  nome: string
  idade: string
  cpf: string
  nis: string
  resp: string
  end: string
  risco: Risco
  social: { status: string; statusVariant: SecVariant; cras: string; caso: string; encaminhamentos: number }
  saude: { status: string; statusVariant: SecVariant; ubs: string; ultimaConsulta: string; vacinas: string; alerta: string }
  escolar: { status: string; statusVariant: SecVariant; escola: string; serie: string; freq: string; faltas: number; notas: string }
  timeline: { color: string; secretaria: string; titulo: string; data: string }[]
}

const DADOS: Record<string, CidadaoData> = {
  joao: {
    id: 'joao', initials: 'JG', risco: 'alto',
    nome: 'João Gomes', idade: '7 anos · Masculino', resp: 'Sandra Gomes',
    cpf: '012.345.678-90', nis: '9876543210', end: 'R. do Cajueiro, 23 · Ibura',
    social: { status: 'Caso Ativo', statusVariant: 'red', cras: 'CRAS Ibura', caso: 'Risco Alto — Suspeita de negligência familiar. Encaminhado ao CAPS Infantil.', encaminhamentos: 2 },
    saude: { status: 'Consulta Perdida', statusVariant: 'red', ubs: 'UBS Ibura II', ultimaConsulta: 'Faltou em 15/05/2026', vacinas: 'Varicela em atraso (2 semanas)', alerta: 'Segunda falta consecutiva. Aguarda reagendamento urgente.' },
    escolar: { status: 'Risco de Evasão', statusVariant: 'red', escola: 'EMEF Ibura', serie: '3º Ano A · Manhã', freq: '61%', faltas: 8, notas: 'Português 5,5 · Matemática 4,0' },
    timeline: [
      { color: C.red, secretaria: 'Escola', titulo: 'Alerta de evasão gerado — 8 faltas', data: '15/05/2026' },
      { color: C.red, secretaria: 'Saúde', titulo: 'Consulta — faltou (2ª vez)', data: '15/05/2026' },
      { color: C.yel, secretaria: 'Social', titulo: 'Contato com responsável — sem retorno', data: '10/05/2026' },
      { color: C.blu, secretaria: 'Saúde', titulo: 'Consulta — faltou', data: '08/05/2026' },
      { color: C.blu, secretaria: 'Social', titulo: 'Encaminhado ao CAPS Infantil', data: '05/05/2026' },
      { color: C.green, secretaria: 'Social', titulo: 'Cadastro realizado no CRAS', data: '20/03/2026' },
    ],
  },
  luana: {
    id: 'luana', initials: 'LS', risco: 'alto',
    nome: 'Luana Silva', idade: '3 anos · Feminino', resp: 'Ana Silva',
    cpf: '098.765.432-10', nis: '1234567890', end: 'R. das Palmeiras, 114 · Ibura',
    social: { status: 'Caso Ativo', statusVariant: 'red', cras: 'CRAS Ibura', caso: 'Risco Alto — Vacinação atrasada. Família não comparece às consultas.', encaminhamentos: 1 },
    saude: { status: 'Vacinação Atrasada', statusVariant: 'red', ubs: 'UBS Ibura II', ultimaConsulta: 'Faltou em 15/05/2026', vacinas: 'Tríplice viral — 6 semanas de atraso', alerta: 'Situação crítica. Visita domiciliar solicitada para vacinação.' },
    escolar: { status: 'Atenção', statusVariant: 'yel', escola: 'EMEF Ibura', serie: 'Pré I · Tarde', freq: '74%', faltas: 5, notas: 'Desenvolvimento 6,5 · Socialização 7,5' },
    timeline: [
      { color: C.red, secretaria: 'Saúde', titulo: 'Alerta de vacinação gerado', data: '15/05/2026' },
      { color: C.yel, secretaria: 'Escola', titulo: '5ª falta no mês sem justificativa', data: '14/05/2026' },
      { color: C.yel, secretaria: 'Saúde', titulo: 'Consulta — faltou', data: '01/05/2026' },
      { color: C.blu, secretaria: 'Social', titulo: 'Encaminhamento para pediatria', data: '01/05/2026' },
      { color: C.green, secretaria: 'Social', titulo: 'Cadastro realizado no CRAS', data: '10/04/2026' },
    ],
  },
  carlos: {
    id: 'carlos', initials: 'CR', risco: 'medio',
    nome: 'Carlos Ramos', idade: '5 anos · Masculino', resp: 'Beatriz Ramos',
    cpf: '111.222.333-44', nis: '5647382910', end: 'R. Nova Esperança, 45 · Jordão',
    social: { status: 'Caso Ativo', statusVariant: 'red', cras: 'CRAS Jordão', caso: 'Risco Alto — Suspeita de desnutrição. Encaminhado ao NASF para avaliação.', encaminhamentos: 2 },
    saude: { status: 'Retorno Agendado', statusVariant: 'yel', ubs: 'UBS Ibura II', ultimaConsulta: 'Triagem em 28/04/2026', vacinas: 'DTP — 3 semanas de atraso', alerta: 'Peso abaixo da curva. Avaliação nutricional pelo NASF em andamento.' },
    escolar: { status: 'Atenção', statusVariant: 'yel', escola: 'EMEF Ibura', serie: '1º Ano B · Manhã', freq: '82%', faltas: 3, notas: 'Português 5,0 · Matemática 4,5' },
    timeline: [
      { color: C.red, secretaria: 'Social', titulo: 'Alerta de desnutrição gerado', data: '10/05/2026' },
      { color: C.blu, secretaria: 'Saúde', titulo: 'Encaminhado ao NASF – Nutrição', data: '05/05/2026' },
      { color: C.yel, secretaria: 'Escola', titulo: 'Queda de rendimento registrada', data: '02/05/2026' },
      { color: C.green, secretaria: 'Social', titulo: 'Cadastro realizado no CRAS', data: '15/03/2026' },
    ],
  },
  maria: {
    id: 'maria', initials: 'MF', risco: 'medio',
    nome: 'Maria Ferreira', idade: '34 anos · Feminino', resp: 'Própria paciente',
    cpf: '222.333.444-55', nis: '3021948576', end: 'Av. Recife, 890 · Ibura',
    social: { status: 'Acompanhamento', statusVariant: 'yel', cras: 'CRAS Ibura', caso: 'Gestante de 20 semanas. 2 consultas pré-natal perdidas. Família em vulnerabilidade.', encaminhamentos: 1 },
    saude: { status: 'Pré-natal Irregular', statusVariant: 'yel', ubs: 'UBS Ibura II', ultimaConsulta: 'Faltou em 15/05/2026', vacinas: 'Em dia', alerta: '2 consultas de pré-natal perdidas consecutivamente. Ação necessária.' },
    escolar: { status: 'N/A', statusVariant: 'green', escola: '—', serie: '—', freq: '—', faltas: 0, notas: 'Não se aplica (adulta)' },
    timeline: [
      { color: C.yel, secretaria: 'Saúde', titulo: 'Pré-natal — faltou (2ª vez)', data: '15/05/2026' },
      { color: C.yel, secretaria: 'Saúde', titulo: 'Pré-natal — faltou', data: '01/05/2026' },
      { color: C.green, secretaria: 'Saúde', titulo: 'Pré-natal realizado — 16 semanas', data: '10/04/2026' },
      { color: C.green, secretaria: 'Social', titulo: 'Cadastro realizado no CRAS', data: '15/03/2026' },
    ],
  },
  rosa: {
    id: 'rosa', initials: 'RP', risco: 'medio',
    nome: 'Rosa Pereira', idade: '68 anos · Feminino', resp: 'Clara Pereira (filha)',
    cpf: '333.444.555-66', nis: '7654321098', end: 'Av. Mustardinha, 320',
    social: { status: 'Acompanhamento', statusVariant: 'yel', cras: 'CRAS Mustardinha', caso: 'Idosa com hipertensão. Dificuldade de locomoção. Visita domiciliar agendada.', encaminhamentos: 1 },
    saude: { status: 'HAS sem Acomp.', statusVariant: 'yel', ubs: 'UBS Ibura II', ultimaConsulta: 'Realizada em 14/05/2026', vacinas: 'Gripe e Pneumonia em dia', alerta: 'Hipertensão sem acompanhamento há 45 dias. Dificuldade de locomoção.' },
    escolar: { status: 'N/A', statusVariant: 'green', escola: '—', serie: '—', freq: '—', faltas: 0, notas: 'Não se aplica (idosa)' },
    timeline: [
      { color: C.green, secretaria: 'Saúde', titulo: 'Consulta realizada — Rotina', data: '14/05/2026' },
      { color: C.blu, secretaria: 'Social', titulo: 'Visita domiciliar agendada', data: '08/05/2026' },
      { color: C.green, secretaria: 'Social', titulo: 'Cadastro realizado no CRAS', data: '10/02/2026' },
    ],
  },
  pedro: {
    id: 'pedro', initials: 'PA', risco: 'baixo',
    nome: 'Pedro Alves', idade: '4 anos · Masculino', resp: 'Marcos Alves',
    cpf: '444.555.666-77', nis: '1122334455', end: 'R. Nova Esperança, 88 · Ibura',
    social: { status: 'Resolvido', statusVariant: 'green', cras: 'CRAS Ibura', caso: 'Caso encerrado com sucesso. Família estabilizada.', encaminhamentos: 0 },
    saude: { status: 'Em Dia', statusVariant: 'green', ubs: 'UBS Ibura II', ultimaConsulta: 'Realizada em 13/05/2026', vacinas: 'Todas as doses em dia', alerta: 'Criança sem pendências de saúde.' },
    escolar: { status: 'Regular', statusVariant: 'green', escola: 'EMEF Ibura', serie: 'Pré II · Manhã', freq: '94%', faltas: 1, notas: 'Desenvolvimento 9,0 · Socialização 8,5' },
    timeline: [
      { color: C.green, secretaria: 'Saúde', titulo: 'Vacinação atualizada — visita domiciliar', data: '13/05/2026' },
      { color: C.green, secretaria: 'Social', titulo: 'Caso CRAS encerrado com sucesso', data: '10/04/2026' },
      { color: C.green, secretaria: 'Escola', titulo: 'Avaliação semestral — Excelente', data: '01/05/2026' },
    ],
  },
}

const secretariaColor: Record<string, string> = {
  Social: '#7936C8', Saúde: C.green, Escola: C.blu,
}

const riscoConfig: Record<Risco, { label: string; color: string; bg: string }> = {
  alto:  { label: 'Risco Alto',  color: C.red,   bg: C.redB },
  medio: { label: 'Risco Médio', color: C.yel,   bg: C.yelB },
  baixo: { label: 'Risco Baixo', color: C.green,  bg: C.greenL },
}

const avatarColors: Record<string, string> = {
  joao: C.red, luana: '#7c3aed', carlos: C.yel, maria: '#7c3aed', rosa: C.green, pedro: C.green,
}

export function Visao360() {
  const { openModal } = useNav()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [filterRisco, setFilterRisco] = useState<Risco | 'todos'>('todos')
  const [filterSec, setFilterSec] = useState<'todos' | 'social' | 'saude' | 'escolar'>('todos')

  const allCidadaos = Object.values(DADOS)

  const filtered = useMemo(() => {
    const q = query.toLowerCase().replace(/[\.\-\/]/g, '')
    return allCidadaos.filter(c => {
      const matchQuery = !q ||
        c.nome.toLowerCase().includes(q) ||
        c.nis.replace(/\D/g, '').includes(q) ||
        c.cpf.replace(/\D/g, '').includes(q) ||
        c.resp.toLowerCase().includes(q) ||
        c.end.toLowerCase().includes(q)
      const matchRisco = filterRisco === 'todos' || c.risco === filterRisco
      const matchSec = filterSec === 'todos' ||
        (filterSec === 'social' && c.social.statusVariant === 'red') ||
        (filterSec === 'saude' && c.saude.statusVariant === 'red') ||
        (filterSec === 'escolar' && c.escolar.statusVariant === 'red')
      return matchQuery && matchRisco && matchSec
    })
  }, [query, filterRisco, filterSec])

  const selected = selectedId ? DADOS[selectedId] : null

  const FilterChip = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button onClick={onClick} style={{
      padding: '5px 14px', borderRadius: 20, border: `1.5px solid ${active ? C.blu : C.bd}`,
      background: active ? C.bluB : '#fff', color: active ? C.blu : C.t2,
      fontSize: 12, fontWeight: active ? 700 : 500, cursor: 'pointer', fontFamily: 'inherit', transition: '.12s',
    }}>{label}</button>
  )

  return (
    <DL
      title="Visão 360° do Cidadão"
      subtitle="Busca integrada · Assistência Social, Saúde e Educação"
      activeScreen="s-visao360"
      rightAction={selected ? (
        <Btn variant="primary" small onClick={() => openModal('enc')}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/></svg>
          Encaminhamento Integrado
        </Btn>
      ) : undefined}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20, alignItems: 'start' }}>

        {/* ── Painel de busca ── */}
        <div>
          {/* Search box */}
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="16" height="16" fill="none" stroke={C.t3} strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar por nome, NIS, CPF..."
              style={{
                width: '100%', padding: '10px 12px 10px 38px', border: `1.5px solid ${C.bd}`,
                borderRadius: 10, fontSize: 13, fontFamily: 'inherit', outline: 'none',
                background: '#fff', boxSizing: 'border-box', color: C.t1,
              }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: C.t3, fontSize: 16, lineHeight: 1 }}>×</button>
            )}
          </div>

          {/* Filtro risco */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 6 }}>Nível de Risco</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <FilterChip label="Todos" active={filterRisco === 'todos'} onClick={() => setFilterRisco('todos')} />
              <FilterChip label="🔴 Alto" active={filterRisco === 'alto'} onClick={() => setFilterRisco('alto')} />
              <FilterChip label="🟡 Médio" active={filterRisco === 'medio'} onClick={() => setFilterRisco('medio')} />
              <FilterChip label="🟢 Baixo" active={filterRisco === 'baixo'} onClick={() => setFilterRisco('baixo')} />
            </div>
          </div>

          {/* Filtro secretaria com alerta */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 6 }}>Alerta por Secretaria</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <FilterChip label="Todas" active={filterSec === 'todos'} onClick={() => setFilterSec('todos')} />
              <FilterChip label="Social" active={filterSec === 'social'} onClick={() => setFilterSec('social')} />
              <FilterChip label="Saúde" active={filterSec === 'saude'} onClick={() => setFilterSec('saude')} />
              <FilterChip label="Escolar" active={filterSec === 'escolar'} onClick={() => setFilterSec('escolar')} />
            </div>
          </div>

          {/* Lista de resultados */}
          <div style={{ fontSize: 11, color: C.t3, marginBottom: 8 }}>{filtered.length} cidadão(ãos) encontrado(s)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {filtered.length === 0 && (
              <div style={{ background: '#fff', borderRadius: 10, border: `1px solid ${C.bd}`, padding: '20px 16px', textAlign: 'center', color: C.t3, fontSize: 13 }}>
                Nenhum resultado encontrado
              </div>
            )}
            {filtered.map(c => {
              const rConf = riscoConfig[c.risco]
              const isSelected = selectedId === c.id
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedId(isSelected ? null : c.id)}
                  style={{
                    background: '#fff', borderRadius: 12, padding: '12px 14px', cursor: 'pointer', transition: '.12s',
                    border: `1.5px solid ${isSelected ? C.blu : C.bd}`,
                    boxShadow: isSelected ? `0 0 0 3px ${C.bluB}` : 'none',
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}
                >
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: avatarColors[c.id] ?? C.t2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{c.initials}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.t1 }}>{c.nome}</div>
                    <div style={{ fontSize: 11, color: C.t3, marginTop: 1 }}>{c.idade} · NIS {c.nis}</div>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: rConf.color, background: rConf.bg, padding: '2px 8px', borderRadius: 8, flexShrink: 0 }}>{rConf.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Painel de detalhes ── */}
        {!selected ? (
          <div style={{ background: '#fff', borderRadius: 16, border: `1px solid ${C.bd}`, padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, minHeight: 400 }}>
            <svg width="48" height="48" fill="none" stroke={C.t3} strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.t2 }}>Selecione um cidadão</div>
            <div style={{ fontSize: 13, color: C.t3, textAlign: 'center', maxWidth: 280 }}>Use a busca ou os filtros ao lado para encontrar e clique em um cidadão para ver a visão integrada das 3 secretarias.</div>
          </div>
        ) : (
          <div>
            {/* Header do cidadão */}
            <div style={{ background: C.gradDiag, borderRadius: 14, padding: '18px 22px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'rgba(255,255,255,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#fff', flexShrink: 0 }}>{selected.initials}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{selected.nome}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.85)', marginTop: 2 }}>{selected.idade} · NIS {selected.nis} · CPF {selected.cpf}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.7)', marginTop: 1 }}>{selected.end} · Resp: {selected.resp}</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,.25)', color: '#fff', padding: '4px 12px', borderRadius: 20 }}>{riscoConfig[selected.risco].label}</span>
            </div>

            {/* 3 cards das secretarias */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 14 }}>
              <Card>
                <CardHeader>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7936C8' }} />
                      <CardTitle>Social</CardTitle>
                    </div>
                    <Badge variant={selected.social.statusVariant}>{selected.social.status}</Badge>
                  </div>
                </CardHeader>
                <CardBody>
                  <InfoGrid items={[
                    { label: 'CRAS', value: selected.social.cras },
                    { label: 'Encam.', value: String(selected.social.encaminhamentos) },
                  ]} />
                  <div style={{ fontSize: 11, color: C.t2, marginTop: 8, padding: '7px 9px', background: C.redB, borderRadius: 7 }}>{selected.social.caso}</div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.green }} />
                      <CardTitle>Saúde</CardTitle>
                    </div>
                    <Badge variant={selected.saude.statusVariant}>{selected.saude.status}</Badge>
                  </div>
                </CardHeader>
                <CardBody>
                  <InfoGrid items={[
                    { label: 'UBS', value: selected.saude.ubs },
                    { label: 'Consulta', value: selected.saude.ultimaConsulta },
                    { label: 'Vacinas', value: selected.saude.vacinas, color: selected.saude.statusVariant === 'red' ? C.red : undefined },
                  ]} />
                  <div style={{ fontSize: 11, color: C.t2, marginTop: 8, padding: '7px 9px', background: C.yelB, borderRadius: 7 }}>{selected.saude.alerta}</div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.blu }} />
                      <CardTitle>Educação</CardTitle>
                    </div>
                    <Badge variant={selected.escolar.statusVariant}>{selected.escolar.status}</Badge>
                  </div>
                </CardHeader>
                <CardBody>
                  <InfoGrid items={[
                    { label: 'Escola', value: selected.escolar.escola },
                    { label: 'Turma', value: selected.escolar.serie },
                    { label: 'Frequência', value: selected.escolar.freq, color: selected.escolar.freq < '80%' ? C.red : undefined },
                    { label: 'Faltas', value: selected.escolar.faltas > 0 ? `${selected.escolar.faltas} faltas` : '0 faltas', color: selected.escolar.faltas >= 5 ? C.red : undefined },
                  ]} />
                  <div style={{ fontSize: 11, color: C.t2, marginTop: 8, padding: '7px 9px', background: C.bluB, borderRadius: 7 }}>{selected.escolar.notas}</div>
                </CardBody>
              </Card>
            </div>

            {/* Timeline */}
            <Card>
              <CardHeader><CardTitle>Linha do Tempo Integrada</CardTitle></CardHeader>
              <CardBody style={{ padding: '12px 16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                  {selected.timeline.map((t, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.color, flexShrink: 0, marginTop: 3 }} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                          <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: secretariaColor[t.secretaria] ?? C.t2, padding: '1px 7px', borderRadius: 8 }}>{t.secretaria}</span>
                          <span style={{ fontSize: 10, color: C.t3 }}>{t.data}</span>
                        </div>
                        <div style={{ fontSize: 12, color: C.t1, fontWeight: 500 }}>{t.titulo}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </DL>
  )
}
