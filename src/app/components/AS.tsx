import React from 'react'
import { useNav } from './context'
import { DL } from './DesktopLayout'
import {
  StatCard, StatsGrid, AlertBanner, SectionTitle, ListItem, Badge,
  ActionCard, EncItem, AlertItem, Card, CardHeader, CardBody, CardTitle,
  ProfileHero, InfoGrid, HistoryItem, ProgressRow, BarChart, KanbanCard, Btn, C
} from './ui'

// ── Dados das famílias ──
const FAMILIAS: Record<string, {
  initials: string; name: string; meta: string; tags: string[]
  resp: string; tel: string; nis: string; ubs: string; end: string
  alerta: string; alertVariant: 'red' | 'yel' | 'blu'
  historico: { color: string; title: string; date: string }[]
}> = {
  silva: {
    initials: 'LS', name: 'Família Silva', meta: 'Luana Silva · 3 anos · Via CRAS Ibura',
    tags: ['Risco Alto', 'Vacinação', 'CRAS Ibura'],
    resp: 'Ana Silva', tel: '(81) 9 9999-0001', nis: '1234567890',
    ubs: 'UBS Ibura II', end: 'R. das Palmeiras, 114 · Ibura',
    alerta: 'Vacinação tríplice viral com 6 semanas de atraso. Família não comparece às consultas.',
    alertVariant: 'red',
    historico: [
      { color: C.red, title: 'Alerta de vacinação gerado', date: '15/05/2026 · Sistema' },
      { color: C.yel, title: 'Consulta — faltou', date: '10/05/2026 · UBS Ibura II' },
      { color: C.yel, title: 'Encaminhamento para pediatria', date: '01/05/2026 · CRAS Ibura' },
      { color: C.green, title: 'Cadastro realizado', date: '10/04/2026 · CRAS Ibura' },
    ],
  },
  ramos: {
    initials: 'CR', name: 'Família Ramos', meta: 'Carlos Ramos · 5 anos · Via CRAS Jordão',
    tags: ['Risco Alto', 'Desnutrição', 'CRAS Jordão'],
    resp: 'Beatriz Ramos', tel: '(81) 9 9999-0003', nis: '5647382910',
    ubs: 'UBS Ibura II', end: 'R. Nova Esperança, 45 · Jordão',
    alerta: 'Suspeita de desnutrição em criança de 5 anos. Encaminhamento ao NASF em andamento.',
    alertVariant: 'red',
    historico: [
      { color: C.red, title: 'Alerta de desnutrição gerado', date: '10/05/2026 · Sistema' },
      { color: C.blu, title: 'Encaminhado ao NASF – Nutrição', date: '05/05/2026 · CRAS Jordão' },
      { color: C.yel, title: 'Escola reportou queda de rendimento', date: '02/05/2026 · EMEF Ibura' },
      { color: C.green, title: 'Cadastro realizado', date: '15/03/2026 · CRAS Jordão' },
    ],
  },
  ferreira: {
    initials: 'MF', name: 'Família Ferreira', meta: 'Maria Ferreira · 34 anos · Via CRAS Ibura',
    tags: ['Risco Médio', 'Pré-natal', 'Gestante'],
    resp: 'Maria Ferreira', tel: '(81) 9 9999-0004', nis: '3021948576',
    ubs: 'UBS Ibura II', end: 'Av. Recife, 890 · Ibura',
    alerta: '2 consultas de pré-natal perdidas. Gestação de 20 semanas. Atenção imediata necessária.',
    alertVariant: 'yel',
    historico: [
      { color: C.yel, title: 'Pré-natal — faltou (2ª vez)', date: '15/05/2026 · UBS Ibura II' },
      { color: C.yel, title: 'Pré-natal — faltou', date: '01/05/2026 · UBS Ibura II' },
      { color: C.green, title: 'Pré-natal realizado — 16 semanas', date: '10/04/2026 · UBS Ibura II' },
      { color: C.green, title: 'Cadastro pré-natal realizado', date: '15/03/2026 · CRAS Ibura' },
    ],
  },
  pereira: {
    initials: 'RP', name: 'Família Pereira', meta: 'Rosa Pereira · 68 anos · Via CRAS Mustardinha',
    tags: ['Acompanhamento', 'HAS', 'Idosa'],
    resp: 'Clara Pereira (filha)', tel: '(81) 9 9999-0005', nis: '7654321098',
    ubs: 'UBS Ibura II', end: 'Av. Mustardinha, 320',
    alerta: 'Hipertensão arterial sem acompanhamento há 45 dias. Paciente com dificuldade de locomoção.',
    alertVariant: 'yel',
    historico: [
      { color: C.green, title: 'Consulta realizada — Rotina', date: '14/05/2026 · UBS Ibura II' },
      { color: C.blu, title: 'Visita domiciliar agendada', date: '08/05/2026' },
      { color: C.blu, title: 'Encaminhamento — Cardiologia', date: '03/04/2026' },
      { color: C.green, title: 'Cadastro realizado', date: '10/02/2026 · CRAS Mustardinha' },
    ],
  },
  souza: {
    initials: 'FS', name: 'Família Souza', meta: '3 membros · Nova família · Via CRAS Ibura',
    tags: ['Triagem', 'Nova Família'],
    resp: 'Paulo Souza', tel: '(81) 9 9999-0006', nis: 'Pendente',
    ubs: 'A definir', end: 'R. do Cajueiro, 57 · Ibura',
    alerta: 'Nova família recém encaminhada. Triagem inicial pendente. 3 membros: adulto + 2 crianças.',
    alertVariant: 'blu',
    historico: [
      { color: C.blu, title: 'Encaminhamento recebido — CRAS Ibura', date: '12/05/2026' },
      { color: C.blu, title: 'Triagem agendada na UBS', date: '14/05/2026' },
    ],
  },
  gomes: {
    initials: 'JG', name: 'Família Gomes', meta: 'João Gomes · 7 anos · Via EMEF Ibura',
    tags: ['Risco Alto', 'Evasão Escolar', 'Negligência'],
    resp: 'Sandra Gomes', tel: '(81) 9 9999-0002', nis: '9876543210',
    ubs: 'UBS Ibura II', end: 'R. do Cajueiro, 23 · Ibura',
    alerta: '8 faltas consecutivas na escola. Contato com responsável sem retorno. Suspeita de negligência familiar.',
    alertVariant: 'red',
    historico: [
      { color: C.red, title: 'Alerta de evasão recebido — EMEF Ibura', date: '15/05/2026 · Sistema' },
      { color: C.yel, title: 'Contato com responsável — sem retorno', date: '10/05/2026' },
      { color: C.blu, title: 'Encaminhado ao CAPS Infantil – Psicologia', date: '05/05/2026' },
      { color: C.green, title: 'Cadastro realizado', date: '20/03/2026 · CRAS Ibura' },
    ],
  },
  lima: {
    initials: 'FL', name: 'Família Lima', meta: '4 membros · Via CRAS Ibura',
    tags: ['Acompanhamento', 'Benefício Social'],
    resp: 'Carlos Lima', tel: '(81) 9 9999-0011', nis: '4455667788',
    ubs: 'UBS Ibura II', end: 'R. das Mangueiras, 78 · Ibura',
    alerta: 'Família com 2 crianças menores. Benefício Bolsa Família pendente de renovação.',
    alertVariant: 'yel',
    historico: [
      { color: C.yel, title: 'Renovação do Bolsa Família — pendente', date: '10/05/2026' },
      { color: C.blu, title: 'Vacinação das crianças — em atraso', date: '05/05/2026' },
      { color: C.green, title: 'Visita domiciliar realizada', date: '01/04/2026' },
      { color: C.green, title: 'Cadastro realizado', date: '10/01/2026 · CRAS Ibura' },
    ],
  },
  costa: {
    initials: 'PC', name: 'Família Costa', meta: 'Paulo Costa · 45 anos · Via CAPS',
    tags: ['Acompanhamento', 'Psiquiatria'],
    resp: 'Paulo Costa', tel: '(81) 9 9999-0012', nis: '5566778899',
    ubs: 'UBS Ibura II', end: 'Av. Recife, 330 · Ibura',
    alerta: 'Paciente em tratamento psiquiátrico. Acompanhamento mensal necessário. Família de suporte presente.',
    alertVariant: 'yel',
    historico: [
      { color: C.green, title: 'Consulta CAPS realizada', date: '12/05/2026' },
      { color: C.blu, title: 'Medicação renovada', date: '01/05/2026' },
      { color: C.green, title: 'Avaliação psicológica — estável', date: '01/04/2026' },
      { color: C.green, title: 'Cadastro no CAPS', date: '15/02/2026' },
    ],
  },
}

// ── AS HOME ──
export function ASHome() {
  const { goTo, goToWith, openModal } = useNav()
  return (
    <DL title="Assistência Social" subtitle="CRAS Ibura · Assistente Social" activeScreen="s-as-home" userInitials="AP" userSub="Ana Paula">
      <AlertBanner variant="red"><strong>3 casos críticos</strong> precisam de atenção imediata hoje.</AlertBanner>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14, marginBottom: 24, marginTop: 8 }}>
        <StatCard label="Famílias Ativas" value="42" sub="Total" color={C.green} />
        <StatCard label="Críticos" value="3" sub="Urgentes" color={C.red} />
        <StatCard label="Encam. Pend." value="7" sub="Aguardando" color={C.yel} />
        <StatCard label="Visitas Hoje" value="2" sub="Domiciliares" color={C.blu} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <SectionTitle link="Ver Kanban →" onLink={() => goTo('s-as-kanban')}>Casos Críticos</SectionTitle>
          <Card>
            <CardBody style={{ padding: 0 }}>
              <ListItem av={<Av initials="LS" color={C.red} />} name="Família Silva" sub="Luana · 3 anos · Vacinação atrasada" right={<Badge variant="red">Urgente</Badge>} onClick={() => goToWith('s-as-familia', 'silva')} />
              <ListItem av={<Av initials="CR" color={C.yel} />} name="Família Ramos" sub="Carlos · 5 anos · Desnutrição" right={<Badge variant="yel">Médio</Badge>} onClick={() => goToWith('s-as-familia', 'ramos')} />
              <ListItem av={<Av initials="JG" color={C.red} />} name="Família Gomes" sub="João · 7 anos · Evasão escolar" right={<Badge variant="red">Urgente</Badge>} onClick={() => goToWith('s-as-familia', 'gomes')} />
              <ListItem av={<Av initials="MF" color="#7c3aed" />} name="Família Ferreira" sub="Maria · 34 anos · Pré-natal irregular" right={<Badge variant="yel">Médio</Badge>} onClick={() => goToWith('s-as-familia', 'ferreira')} />
            </CardBody>
          </Card>
        </div>

        <div>
          <SectionTitle>Ações Rápidas</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            <ActionCard icon={<div style={{ width: 36, height: 36, background: C.bluB, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.blu} strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></div>} label="Kanban" sub="Gestão de casos" onClick={() => goTo('s-as-kanban')} />
            <ActionCard icon={<div style={{ width: 36, height: 36, background: C.greenL, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.green} strokeWidth="2" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg></div>} label="Encaminhar" sub="Nova solicitação" onClick={() => openModal('enc')} />
            <ActionCard icon={<div style={{ width: 36, height: 36, background: C.yelB, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.yel} strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>} label="Monitorar" sub="Evolução de casos" onClick={() => goTo('s-as-monitor')} />
            <ActionCard icon={<div style={{ width: 36, height: 36, background: C.redB, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.red} strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg></div>} label="Alertas" sub="3 pendentes" onClick={() => goTo('s-as-alerts')} />
          </div>

          <div onClick={() => goTo('s-visao360')} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 14, background: C.gradDiag, cursor: 'pointer' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Visão 360° do Cidadão</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.75)', marginTop: 2 }}>Saúde · Educação · Assistência Social integrados</div>
            </div>
            <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>
      </div>
    </DL>
  )
}

function Av({ initials, color }: { initials: string; color: string }) {
  return <div style={{ width: 38, height: 38, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: 13, flexShrink: 0 }}>{initials}</div>
}

// ── AS KANBAN ──
export function ASKanban() {
  const { goBack, goToWith } = useNav()
  const cols = [
    { title: 'Risco Alto', titleColor: C.red, bg: '#fef2f2', count: 3, cards: [
      { id: 'silva', name: 'Família Silva', sub: 'Luana · 3 anos', tags: ['Vacinação', 'CRAS Ibura'] },
      { id: 'gomes', name: 'Família Gomes', sub: 'João · 7 anos', tags: ['Escola', 'Negligência'] },
      { id: 'ramos', name: 'Família Ramos', sub: 'Carlos · 5 anos', tags: ['Desnutrição'] },
    ]},
    { title: 'Acompanhamento', titleColor: C.yel, bg: '#fffbeb', count: 5, cards: [
      { id: 'ferreira', name: 'Família Ferreira', sub: 'Maria · 34 anos', tags: ['Pré-natal', 'Gestante'] },
      { id: 'pereira', name: 'Família Pereira', sub: 'Rosa · 68 anos', tags: ['HAS', 'Idoso'] },
      { id: 'souza', name: 'Família Souza', sub: '3 membros', tags: ['Triagem', 'Nova'] },
      { id: 'lima', name: 'Família Lima', sub: '4 membros', tags: ['Benefício'] },
      { id: 'costa', name: 'Família Costa', sub: 'Paulo · 45 anos', tags: ['Psiquiatria'] },
    ]},
    { title: 'Resolvidos', titleColor: C.green, bg: '#f0fdf4', count: 4, cards: [
      { id: 'pereira', name: 'Família Alves', sub: 'Pedro · 4 anos', tags: ['Vacinação ✓'] },
      { id: 'ramos', name: 'Família Torres', sub: 'Cecília · 32 anos', tags: ['NASF ✓'] },
      { id: 'costa', name: 'Família Neto', sub: 'Bruno · 28 anos', tags: ['CAPS ✓'] },
      { id: 'lima', name: 'Família Melo', sub: '5 membros', tags: ['Benefício ✓'] },
    ]},
  ]
  return (
    <DL title="Kanban de Casos" activeScreen="s-as-kanban" onBack={goBack} noPad>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, padding: 28, height: '100%', boxSizing: 'border-box' }}>
        {cols.map((col, ci) => (
          <div key={ci} style={{ background: col.bg, borderRadius: 14, border: `1px solid ${C.bd}`, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.bd}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: col.titleColor }}>{col.title}</span>
              <span style={{ fontSize: 12, fontWeight: 700, background: col.titleColor + '20', color: col.titleColor, padding: '2px 8px', borderRadius: 8 }}>{col.count}</span>
            </div>
            <div style={{ padding: '10px 10px', overflowY: 'auto', flex: 1 }}>
              {col.cards.map((card, ci2) => (
                <KanbanCard key={ci2} name={card.name} sub={card.sub} tags={card.tags} onClick={() => goToWith('s-as-familia', card.id)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </DL>
  )
}

// ── AS MONITOR ──
export function ASMonitor() {
  const { goBack } = useNav()
  return (
    <DL title="Monitoramento de Casos" activeScreen="s-as-monitor" onBack={goBack}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14, marginBottom: 24 }}>
        <StatCard label="Famílias" value="42" sub="Monitoradas" color={C.green} />
        <StatCard label="Em Risco" value="8" sub="Ativas" color={C.red} />
        <StatCard label="Resolvidos" value="14" sub="Este mês" color={C.green} />
        <StatCard label="Benefícios" value="23" sub="Ativos" color={C.blu} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Card>
          <CardHeader><CardTitle>Casos por Semana</CardTitle></CardHeader>
          <CardBody>
            <BarChart bars={[{ label: 'S1', height: 45, filled: true }, { label: 'S2', height: 58, filled: true }, { label: 'S3', height: 38, filled: true }, { label: 'S4', height: 28, filled: false }]} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Famílias por Situação</CardTitle></CardHeader>
          <CardBody>
            <ProgressRow label="Risco Alto" value={19} color={C.red} display="8 famílias" />
            <ProgressRow label="Acompanhamento" value={48} color={C.yel} display="20 famílias" />
            <ProgressRow label="Resolvidos" value={33} color={C.green} display="14 famílias" />
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Tipos de Vulnerabilidade</CardTitle></CardHeader>
          <CardBody>
            <ProgressRow label="Saúde" value={60} color={C.red} display="60%" />
            <ProgressRow label="Alimentar" value={40} color={C.yel} display="40%" />
            <ProgressRow label="Educação" value={30} color={C.blu} display="30%" />
            <ProgressRow label="Habitação" value={25} color={C.green} display="25%" />
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Encaminhamentos Recentes</CardTitle></CardHeader>
          <CardBody>
            <ProgressRow label="CAPS" value={35} color="#7936C8" display="35%" />
            <ProgressRow label="NASF" value={25} color={C.green} display="25%" />
            <ProgressRow label="Pediatria" value={22} color={C.blu} display="22%" />
            <ProgressRow label="Outros" value={18} color={C.t3} display="18%" />
          </CardBody>
        </Card>
      </div>
    </DL>
  )
}

// ── AS ENCAMINHAMENTOS ──
export function ASEnc() {
  const { goBack, goToWith, openModal } = useNav()
  return (
    <DL title="Encaminhamentos" activeScreen="s-as-enc" onBack={goBack} rightAction={<Btn variant="primary" small onClick={() => openModal('enc')}>+ Novo Encaminhamento</Btn>}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 24 }}>
        <StatCard label="Ativos" value="7" color={C.yel} />
        <StatCard label="Em Andamento" value="4" color={C.blu} />
        <StatCard label="Concluídos" value="19" color={C.green} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <SectionTitle>Aguardando Resposta</SectionTitle>
          <EncItem name="João Gomes · 7 anos" spec="CAPS Infantil – Psicologia" priority="red" status="yel" date="11/05/2026" onClick={() => goToWith('s-as-familia', 'gomes')} />
          <EncItem name="Carlos Ramos · 5 anos" spec="NASF – Nutrição" priority="red" status="yel" date="13/05/2026" onClick={() => goToWith('s-as-familia', 'ramos')} />
          <EncItem name="Maria Ferreira · 34 anos" spec="Ginecologia / Pré-natal" priority="yel" status="blu" date="01/05/2026" onClick={() => goToWith('s-as-familia', 'ferreira')} />
          <EncItem name="Rosa Pereira · 68 anos" spec="Cardiologia" priority="yel" status="blu" date="03/05/2026" onClick={() => goToWith('s-as-familia', 'pereira')} />
        </div>
        <div>
          <SectionTitle>Concluídos Recentes</SectionTitle>
          <EncItem name="Pedro Alves · 4 anos" spec="Pediatria – UBS Ibura" priority="green" date="10/05/2026" opacity={0.7} onClick={() => goToWith('s-as-familia', 'silva')} />
          <EncItem name="Cecília Torres · 32 anos" spec="NASF – Nutrição" priority="green" date="09/05/2026" opacity={0.7} onClick={() => goToWith('s-as-familia', 'souza')} />
          <EncItem name="Bruno Neto · 28 anos" spec="CAPS – Psiquiatria" priority="green" date="07/05/2026" opacity={0.7} onClick={() => goToWith('s-as-familia', 'costa')} />
          <EncItem name="Família Melo · 5 membros" spec="Bolsa Família regularizado" priority="green" date="05/05/2026" opacity={0.7} onClick={() => goToWith('s-as-familia', 'lima')} />
        </div>
      </div>
    </DL>
  )
}

// ── AS ALERTS ──
export function ASAlerts() {
  const { goBack } = useNav()
  return (
    <DL title="Alertas" activeScreen="s-as-alerts" onBack={goBack}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <SectionTitle>Críticos</SectionTitle>
          <AlertItem stripe={C.red} title="Vacinação em Atraso — Luana Silva" desc="Tríplice viral com 6 semanas de atraso. Família não comparece às consultas agendadas." tags={['Crítico', 'Vacinação']} time="Hoje, 2h atrás" />
          <AlertItem stripe={C.red} title="Suspeita de Desnutrição — Carlos Ramos" desc="Peso abaixo da curva. Encaminhado pela escola EMEF Ibura. Avaliação nutricional urgente." tags={['Crítico', 'Nutrição']} time="Há 1 dia" />
          <AlertItem stripe={C.red} title="Consulta Urgente — João Gomes" desc="Segunda falta consecutiva. Escola reportou comportamento atípico e suspeita de negligência." tags={['Crítico', 'Escola']} time="Hoje, 3h atrás" />
        </div>
        <div>
          <SectionTitle>Médios e Resolvidos</SectionTitle>
          <AlertItem stripe={C.yel} title="Pré-natal Irregular — Maria Ferreira" desc="2 consultas perdidas consecutivamente. Gestação de 20 semanas." tags={['Médio', 'Pré-natal']} time="Há 2 dias" />
          <AlertItem stripe={C.yel} title="HAS sem Acompanhamento — Rosa Pereira" desc="Última aferição há 45 dias. Paciente idosa com hipertensão." tags={['Médio', 'HAS']} time="Há 5 dias" />
          <AlertItem stripe={C.green} title="Vacinação Atualizada — Pedro Alves" desc="Cartão de vacinas atualizado após visita domiciliar." tags={['Resolvido']} time="13/05" opacity={0.6} />
        </div>
      </div>
    </DL>
  )
}

// ── AS FAMÍLIA ──
export function ASFamilia() {
  const { goBack, openModal, selectedId } = useNav()
  const f = FAMILIAS[selectedId ?? 'silva'] ?? FAMILIAS['silva']
  return (
    <DL title="Perfil da Família" subtitle={f.name} activeScreen="s-as-familia" onBack={goBack} rightAction={<Btn variant="primary" small onClick={() => openModal('enc')}>Gerar Encaminhamento</Btn>}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <ProfileHero initials={f.initials} name={f.name} meta={f.meta} tags={f.tags} />
          <InfoGrid items={[
            { label: 'Responsável', value: f.resp },
            { label: 'Telefone', value: f.tel },
            { label: 'NIS', value: f.nis },
            { label: 'UBS Ref.', value: f.ubs },
            { label: 'Endereço', value: f.end, full: true },
          ]} />
          <AlertBanner variant={f.alertVariant}>{f.alerta}</AlertBanner>
        </div>
        <div>
          <SectionTitle>Histórico de Atendimentos</SectionTitle>
          <Card>
            <CardBody style={{ padding: '10px 14px' }}>
              {f.historico.map((h, i) => <HistoryItem key={i} color={h.color} title={h.title} date={h.date} />)}
            </CardBody>
          </Card>
        </div>
      </div>
    </DL>
  )
}
