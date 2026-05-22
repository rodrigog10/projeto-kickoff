import React from 'react'
import { useNav } from './context'
import {
  TopBar, BottomNav, PageContent, StatCard, StatsGrid, AlertBanner,
  SectionTitle, ListItem, Badge, Divider, ActionCard, EncItem,
  AlertItem, Card, CardHeader, CardBody, CardTitle, ProfileHero, InfoGrid,
  HistoryItem, ProgressRow, BarChart, KanbanCard, Btn, BrandTitle, C
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
}

// ── Bottom nav for AS ──
function ASNav({ active }: { active: string }) {
  const { goTo } = useNav()
  const items = [
    { label: 'Home', active: active === 'home', onClick: () => goTo('s-as-home'), icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { label: 'Kanban', active: active === 'kanban', onClick: () => goTo('s-as-kanban'), icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
    { label: 'Monitor', active: active === 'monitor', onClick: () => goTo('s-as-monitor'), icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
    { label: 'Encam.', active: active === 'enc', onClick: () => goTo('s-as-enc'), icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg> },
    { label: 'Alertas', active: active === 'alerts', onClick: () => goTo('s-as-alerts'), icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>, badge: 3 },
  ]
  return <BottomNav items={items} />
}

// ── AS HOME ──
export function ASHome() {
  const { goTo, goToWith, doLogout, openModal } = useNav()
  return (
    <div className="cv-screen">
      <TopBar
        title=""
        customTitle={<BrandTitle subtitle="CRAS Ibura · Assistente Social" />}
        rightContent={<>
          <div onClick={() => goTo('s-as-alerts')} style={{ width: 34, height: 34, borderRadius: '50%', background: C.bg, border: `1px solid ${C.bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
            <svg width="16" height="16" fill="none" stroke={C.t2} strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <div style={{ width: 8, height: 8, background: C.red, borderRadius: '50%', position: 'absolute', top: 3, right: 3, border: '1.5px solid #fff' }} />
          </div>
          <div onClick={doLogout} style={{ width: 34, height: 34, borderRadius: '50%', background: C.gradDiag, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>AP</div>
        </>}
      />
      <PageContent>
        <AlertBanner variant="red"><strong>3 casos críticos</strong> precisam de atenção imediata hoje.</AlertBanner>
        <StatsGrid cols={2}>
          <StatCard label="Famílias" value="42" sub="Ativas" color={C.green} />
          <StatCard label="Críticos" value="3" sub="Urgentes" color={C.red} />
          <StatCard label="Encam." value="7" sub="Pendentes" color={C.yel} />
          <StatCard label="Visitas" value="2" sub="Hoje" color={C.blu} />
        </StatsGrid>

        <SectionTitle link="Ver todos →" onLink={() => goTo('s-as-kanban')}>Casos Críticos</SectionTitle>
        <ListItem av={<div style={{ width: 38, height: 38, borderRadius: '50%', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>LS</div>} name="Família Silva" sub="Luana · 3 anos · Vacinação atrasada" right={<Badge variant="red">Urgente</Badge>} onClick={() => goToWith('s-as-familia', 'silva')} />
        <ListItem av={<div style={{ width: 38, height: 38, borderRadius: '50%', background: C.yel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>CR</div>} name="Família Ramos" sub="Carlos · 5 anos · Desnutrição" right={<Badge variant="yel">Médio</Badge>} onClick={() => goToWith('s-as-familia', 'ramos')} />
        <ListItem av={<div style={{ width: 38, height: 38, borderRadius: '50%', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>MF</div>} name="Família Ferreira" sub="Maria · 34 anos · Pré-natal irregular" right={<Badge variant="yel">Médio</Badge>} onClick={() => goToWith('s-as-familia', 'ferreira')} />

        <Divider />
        <SectionTitle>Ações Rápidas</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          <ActionCard icon={<div style={{ width: 36, height: 36, background: C.bluB, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.blu} strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></div>} label="Kanban" sub="Gestão de casos" onClick={() => goTo('s-as-kanban')} />
          <ActionCard icon={<div style={{ width: 36, height: 36, background: C.greenL, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.green} strokeWidth="2" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg></div>} label="Encaminhar" sub="Nova solicitação" onClick={() => openModal('enc')} />
          <ActionCard icon={<div style={{ width: 36, height: 36, background: C.yelB, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.yel} strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>} label="Monitorar" sub="Evolução de casos" onClick={() => goTo('s-as-monitor')} />
          <ActionCard icon={<div style={{ width: 36, height: 36, background: C.redB, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.red} strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg></div>} label="Alertas" sub="3 pendentes" onClick={() => goTo('s-as-alerts')} />
        </div>
      </PageContent>
      <ASNav active="home" />
    </div>
  )
}

// ── AS KANBAN ──
export function ASKanban() {
  const { goBack, goToWith } = useNav()
  const cols = [
    { title: '🔴 Risco Alto', titleColor: C.red, count: 3, cards: [
      { id: 'silva', name: 'Família Silva', sub: 'Luana · 3 anos', tags: ['Vacinação', 'CRAS Ibura'] },
      { id: 'joao', name: 'Família Gomes', sub: 'João · 7 anos', tags: ['Escola', 'Negligência'] },
      { id: 'ramos', name: 'Família Ramos', sub: 'Carlos · 5 anos', tags: ['Desnutrição'] },
    ]},
    { title: '🟡 Acompanhamento', titleColor: C.yel, count: 5, cards: [
      { id: 'ferreira', name: 'Família Ferreira', sub: 'Maria · 34 anos', tags: ['Pré-natal', 'Gestante'] },
      { id: 'pereira', name: 'Família Pereira', sub: 'Rosa · 68 anos', tags: ['HAS', 'Idoso'] },
      { id: 'souza', name: 'Família Souza', sub: '3 membros', tags: ['Triagem', 'Nova'] },
      { id: 'silva', name: 'Família Lima', sub: '4 membros', tags: ['Benefício'] },
      { id: 'ferreira', name: 'Família Costa', sub: 'Paulo · 45 anos', tags: ['Psiquiatria'] },
    ]},
    { title: '🟢 Resolvidos', titleColor: C.green, count: 4, cards: [
      { id: 'pereira', name: 'Família Alves', sub: 'Pedro · 4 anos', tags: ['Vacinação ✓'] },
      { id: 'ramos', name: 'Família Torres', sub: 'Cecília · 32 anos', tags: ['NASF ✓'] },
      { id: 'souza', name: 'Família Neto', sub: 'Bruno · 28 anos', tags: ['CAPS ✓'] },
      { id: 'silva', name: 'Família Melo', sub: '5 membros', tags: ['Benefício ✓'] },
    ]},
  ]
  return (
    <div className="cv-screen">
      <TopBar title="Kanban de Casos" onBack={goBack} />
      <PageContent>
        <div style={{ fontSize: 11, color: C.t3, textAlign: 'center', padding: '4px 0', marginBottom: 4 }}>← Deslize para ver colunas →</div>
        <div className="cv-kanban">
          {cols.map((col, ci) => (
            <div key={ci} style={{ flexShrink: 0, width: 220, background: '#f9fafb', borderRadius: 12, border: `1px solid ${C.bd}`, overflow: 'hidden' }}>
              <div style={{ padding: '10px 12px', borderBottom: `1px solid ${C.bd}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: col.titleColor }}>{col.title}</span>
                <span style={{ fontSize: 11, fontWeight: 700, background: '#fff', padding: '2px 7px', borderRadius: 8, color: C.t2, border: `1px solid ${C.bd}` }}>{col.count}</span>
              </div>
              <div style={{ padding: 8 }}>
                {col.cards.map((card, ci2) => (
                  <KanbanCard key={ci2} name={card.name} sub={card.sub} tags={card.tags} onClick={() => goToWith('s-as-familia', card.id)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </PageContent>
      <ASNav active="kanban" />
    </div>
  )
}

// ── AS MONITOR ──
export function ASMonitor() {
  const { goBack } = useNav()
  return (
    <div className="cv-screen">
      <TopBar title="Monitoramento" onBack={goBack} />
      <PageContent>
        <StatsGrid cols={2}>
          <StatCard label="Famílias" value="42" sub="Monitoradas" color={C.green} />
          <StatCard label="Em Risco" value="8" sub="Ativas" color={C.red} />
          <StatCard label="Resolvidos" value="14" sub="Este mês" color={C.green} />
          <StatCard label="Benefícios" value="23" sub="Ativos" color={C.blu} />
        </StatsGrid>
        <Card>
          <CardHeader><CardTitle>Casos por Semana</CardTitle></CardHeader>
          <CardBody>
            <BarChart bars={[{ label: 'S1', height: 45, filled: true }, { label: 'S2', height: 58, filled: true }, { label: 'S3', height: 38, filled: true }, { label: 'S4', height: 28, filled: false }]} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Famílias por Situação</CardTitle></CardHeader>
          <CardBody>
            <ProgressRow label="Risco Alto" value={19} color={C.red} display="8" />
            <ProgressRow label="Acompanham." value={48} color={C.yel} display="20" />
            <ProgressRow label="Resolvidos" value={33} color={C.green} display="14" />
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
      </PageContent>
      <ASNav active="monitor" />
    </div>
  )
}

// ── AS ENCAMINHAMENTOS ──
export function ASEnc() {
  const { goBack, openModal } = useNav()
  return (
    <div className="cv-screen">
      <TopBar title="Encaminhamentos" onBack={goBack} rightContent={<Btn variant="primary" small onClick={() => openModal('enc')}>+ Novo</Btn>} />
      <PageContent>
        <StatsGrid cols={3}>
          <StatCard label="Ativos" value="7" color={C.yel} />
          <StatCard label="Em And." value="4" color={C.blu} />
          <StatCard label="Concluídos" value="19" color={C.green} />
        </StatsGrid>
        <SectionTitle>Aguardando Resposta</SectionTitle>
        <EncItem name="João Gomes · 7 anos" spec="CAPS Infantil – Psicologia" priority="red" status="yel" date="11/05/2026" />
        <EncItem name="Carlos Ramos · 5 anos" spec="NASF – Nutrição" priority="red" status="yel" date="13/05/2026" />
        <EncItem name="Maria Ferreira · 34 anos" spec="Ginecologia / Pré-natal" priority="yel" status="blu" date="01/05/2026" />
        <EncItem name="Rosa Pereira · 68 anos" spec="Cardiologia" priority="yel" status="blu" date="03/05/2026" />
        <SectionTitle>Concluídos Recentes</SectionTitle>
        <EncItem name="Pedro Alves · 4 anos" spec="Pediatria – UBS Ibura" priority="green" date="10/05/2026" opacity={0.6} />
        <EncItem name="Cecília Torres · 32 anos" spec="NASF – Nutrição" priority="green" date="09/05/2026" opacity={0.6} />
      </PageContent>
      <ASNav active="enc" />
    </div>
  )
}

// ── AS ALERTS ──
export function ASAlerts() {
  const { goBack } = useNav()
  return (
    <div className="cv-screen">
      <TopBar title="Alertas" onBack={goBack} />
      <PageContent>
        <AlertItem stripe={C.red} title="Vacinação em Atraso — Luana Silva" desc="Tríplice viral com 6 semanas de atraso. Família não comparece às consultas agendadas." tags={['Crítico', 'Vacinação']} time="Hoje, 2h atrás" />
        <AlertItem stripe={C.red} title="Suspeita de Desnutrição — Carlos Ramos" desc="Peso abaixo da curva. Encaminhado pela escola EMEF Ibura. Avaliação nutricional urgente." tags={['Crítico', 'Nutrição']} time="Há 1 dia" />
        <AlertItem stripe={C.red} title="Consulta Urgente — João Gomes" desc="Segunda falta consecutiva. Escola reportou comportamento atípico e suspeita de negligência." tags={['Crítico', 'Escola']} time="Hoje, 3h atrás" />
        <AlertItem stripe={C.yel} title="Pré-natal Irregular — Maria Ferreira" desc="2 consultas perdidas consecutivamente. Gestação de 20 semanas." tags={['Médio', 'Pré-natal']} time="Há 2 dias" />
        <AlertItem stripe={C.yel} title="HAS sem Acompanhamento — Rosa Pereira" desc="Última aferição há 45 dias. Paciente idosa com hipertensão." tags={['Médio', 'HAS']} time="Há 5 dias" />
        <AlertItem stripe={C.green} title="Vacinação Atualizada — Pedro Alves" desc="Cartão de vacinas atualizado após visita domiciliar." tags={['Resolvido']} time="13/05" opacity={0.6} />
      </PageContent>
      <ASNav active="alerts" />
    </div>
  )
}

// ── AS FAMÍLIA ──
export function ASFamilia() {
  const { goBack, openModal, selectedId } = useNav()
  const f = FAMILIAS[selectedId ?? 'silva'] ?? FAMILIAS['silva']
  return (
    <div className="cv-screen">
      <TopBar title="Perfil da Família" onBack={goBack} />
      <PageContent>
        <ProfileHero initials={f.initials} name={f.name} meta={f.meta} tags={f.tags} />
        <InfoGrid items={[
          { label: 'Responsável', value: f.resp },
          { label: 'Telefone', value: f.tel },
          { label: 'NIS', value: f.nis },
          { label: 'UBS Ref.', value: f.ubs },
          { label: 'Endereço', value: f.end, full: true },
        ]} />
        <AlertBanner variant={f.alertVariant}>{f.alerta}</AlertBanner>
        <SectionTitle>Histórico de Atendimentos</SectionTitle>
        <Card>
          <CardBody style={{ padding: '10px 14px' }}>
            {f.historico.map((h, i) => <HistoryItem key={i} color={h.color} title={h.title} date={h.date} />)}
          </CardBody>
        </Card>
        <Btn variant="primary" onClick={() => openModal('enc')}>
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/></svg>
          Gerar Encaminhamento
        </Btn>
        <Btn variant="secondary" onClick={goBack}>Voltar</Btn>
      </PageContent>
    </div>
  )
}
