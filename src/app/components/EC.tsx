import React from 'react'
import { useNav } from './context'
import {
  TopBar, BottomNav, PageContent, StatCard, StatsGrid, AlertBanner,
  SectionTitle, ListItem, Badge, Divider, ActionCard, EncItem,
  AlertItem, Card, CardHeader, CardBody, CardTitle, ProfileHero, InfoGrid,
  HistoryItem, ProgressRow, BarChart, Btn, BrandTitle, C
} from './ui'

function ECNav({ active }: { active: string }) {
  const { goTo } = useNav()
  const items = [
    { label: 'Home', active: active === 'home', onClick: () => goTo('s-ec-home'), icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { label: 'Alunos', active: active === 'alunos', onClick: () => goTo('s-ec-alunos'), icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> },
    { label: 'Encam.', active: active === 'enc', onClick: () => goTo('s-ec-enc'), icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/></svg> },
    { label: 'Alertas', active: active === 'alerts', onClick: () => goTo('s-ec-alerts'), badge: 4, icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg> },
  ]
  return <BottomNav items={items} />
}

// ── EC HOME ──
export function ECHome() {
  const { goTo, doLogout, openModal } = useNav()
  return (
    <div className="cv-screen">
      <TopBar
        title=""
        customTitle={<BrandTitle subtitle="EMEF Ibura · Gestão Escolar" />}
        rightContent={<>
          <div onClick={() => goTo('s-ec-alerts')} style={{ width: 34, height: 34, borderRadius: '50%', background: C.bg, border: `1px solid ${C.bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
            <svg width="16" height="16" fill="none" stroke={C.t2} strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <div style={{ width: 8, height: 8, background: C.red, borderRadius: '50%', position: 'absolute', top: 3, right: 3, border: '1.5px solid #fff' }} />
          </div>
          <div onClick={doLogout} style={{ width: 34, height: 34, borderRadius: '50%', background: C.gradDiag, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>PL</div>
        </>}
      />
      <PageContent>
        <AlertBanner variant="red"><strong>2 alunos</strong> em risco de evasão escolar esta semana.</AlertBanner>
        <StatsGrid cols={2}>
          <StatCard label="Alunos" value="312" sub="Matriculados" color={C.green} />
          <StatCard label="Risco" value="5" sub="Evasão" color={C.red} />
          <StatCard label="Faltas" value="18" sub="Esta semana" color={C.yel} />
          <StatCard label="Freq." value="87%" sub="Média geral" color={C.blu} />
        </StatsGrid>
        <SectionTitle link="Ver todos →" onLink={() => goTo('s-ec-alunos')}>Alunos em Risco</SectionTitle>
        <ListItem av={<div style={{ width: 38, height: 38, borderRadius: '50%', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>JG</div>} name="João Gomes · 7 anos" sub="3º Ano A · 8 faltas consecutivas" right={<Badge variant="red">Evasão</Badge>} onClick={() => goTo('s-ec-aluno')} />
        <ListItem av={<div style={{ width: 38, height: 38, borderRadius: '50%', background: C.yel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>LS</div>} name="Luana Silva · 3 anos" sub="Pré I · 5 faltas no mês" right={<Badge variant="yel">Atenção</Badge>} onClick={() => goTo('s-ec-aluno')} />
        <ListItem av={<div style={{ width: 38, height: 38, borderRadius: '50%', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>CR</div>} name="Carlos Ramos · 5 anos" sub="1º Ano B · Queda de desempenho" right={<Badge variant="yel">Atenção</Badge>} onClick={() => goTo('s-ec-aluno')} />
        <Divider />
        <SectionTitle>Ações Rápidas</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          <ActionCard icon={<div style={{ width: 36, height: 36, background: C.redB, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.red} strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></div>} label="Registrar Falta" sub="Lançar falta" onClick={() => openModal('falta')} />
          <ActionCard icon={<div style={{ width: 36, height: 36, background: C.yelB, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.yel} strokeWidth="2" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/></svg></div>} label="Encaminhar" sub="Para CRAS/Saúde" onClick={() => openModal('enc')} />
          <ActionCard icon={<div style={{ width: 36, height: 36, background: C.bluB, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.blu} strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>} label="Alunos" sub="Lista completa" onClick={() => goTo('s-ec-alunos')} />
          <ActionCard icon={<div style={{ width: 36, height: 36, background: C.redB, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.red} strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg></div>} label="Alertas" sub="4 pendentes" onClick={() => goTo('s-ec-alerts')} />
        </div>
        <Card>
          <CardHeader><CardTitle>Frequência Semanal</CardTitle></CardHeader>
          <CardBody>
            <BarChart bars={[{ label: 'SEG', height: 55, filled: true }, { label: 'TER', height: 48, filled: true }, { label: 'QUA', height: 52, filled: true }, { label: 'QUI', height: 38, filled: false }, { label: 'SEX', height: 30, filled: false }]} />
          </CardBody>
        </Card>
      </PageContent>
      <ECNav active="home" />
    </div>
  )
}

// ── EC ALUNOS ──
export function ECAlunos() {
  const { goBack, goTo } = useNav()
  const alunos = [
    { av: 'JG', color: C.red, name: 'João Gomes · 7 anos', sub: '3º Ano A · 8 faltas · Evasão', badge: <Badge variant="red">Evasão</Badge> },
    { av: 'LS', color: C.yel, name: 'Luana Silva · 3 anos', sub: 'Pré I · 5 faltas', badge: <Badge variant="yel">Atenção</Badge> },
    { av: 'CR', color: '#7c3aed', name: 'Carlos Ramos · 5 anos', sub: '1º Ano B · Desnutrição', badge: <Badge variant="yel">Atenção</Badge> },
    { av: 'PA', color: C.green, name: 'Pedro Alves · 4 anos', sub: 'Pré II · Frequência regular', badge: <Badge variant="green">Regular</Badge> },
    { av: 'MA', color: C.blu, name: 'Maria Alves · 6 anos', sub: '2º Ano C · Frequência regular', badge: <Badge variant="green">Regular</Badge> },
    { av: 'TS', color: '#0891b2', name: 'Tiago Santos · 8 anos', sub: '4º Ano A · Queda de notas', badge: <Badge variant="yel">Atenção</Badge> },
    { av: 'BN', color: '#059669', name: 'Bruna Neto · 9 anos', sub: '4º Ano B · Frequência regular', badge: <Badge variant="green">Regular</Badge> },
  ]
  return (
    <div className="cv-screen">
      <TopBar title="Lista de Alunos" onBack={goBack} />
      <PageContent>
        {alunos.map((a, i) => (
          <ListItem key={i} av={<div style={{ width: 38, height: 38, borderRadius: '50%', background: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>{a.av}</div>} name={a.name} sub={a.sub} right={a.badge} onClick={() => goTo('s-ec-aluno')} />
        ))}
      </PageContent>
      <ECNav active="alunos" />
    </div>
  )
}

// ── EC ALUNO ──
export function ECAluno() {
  const { goBack, openModal } = useNav()
  return (
    <div className="cv-screen">
      <TopBar title="Perfil do Aluno" onBack={goBack} />
      <PageContent>
        <ProfileHero initials="JG" name="João Gomes" meta="7 anos · 3º Ano A · EMEF Ibura" tags={['Risco de Evasão', '8 Faltas']} />
        <InfoGrid items={[
          { label: 'Responsável', value: 'Sandra Gomes' },
          { label: 'Telefone', value: '(81) 99999-0002' },
          { label: 'NIS', value: '9876543210' },
          { label: 'Frequência', value: '61%', color: C.red },
          { label: 'Série', value: '3º Ano A' },
          { label: 'Turno', value: 'Manhã' },
        ]} />
        <AlertBanner variant="red">8 faltas consecutivas. Suspeita de negligência familiar. Ação imediata necessária.</AlertBanner>
        <SectionTitle>Progresso Escolar</SectionTitle>
        <Card>
          <CardBody>
            <ProgressRow label="Português" value={55} color={C.yel} display="5,5" />
            <ProgressRow label="Matemática" value={40} color={C.red} display="4,0" />
            <ProgressRow label="Ciências" value={70} color={C.yel} display="7,0" />
            <ProgressRow label="Frequência" value={61} color={C.red} display="61%" />
          </CardBody>
        </Card>
        <SectionTitle>Histórico de Ocorrências</SectionTitle>
        <Card>
          <CardBody style={{ padding: '10px 14px' }}>
            <HistoryItem color={C.red} title="Alerta de evasão gerado" date="15/05/2026 · Sistema" />
            <HistoryItem color={C.yel} title="Falta não justificada — 3ª consecutiva" date="14/05/2026" />
            <HistoryItem color={C.yel} title="Contato com responsável — sem retorno" date="10/05/2026" />
            <HistoryItem color={C.blu} title="Encaminhado para CRAS" date="05/05/2026" />
          </CardBody>
        </Card>
        <Btn variant="primary" onClick={() => openModal('enc')}>
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/></svg>
          Encaminhar para CRAS / Saúde
        </Btn>
        <Btn variant="danger" onClick={() => openModal('evasao')}>Gerar Alerta de Evasão</Btn>
        <Btn variant="secondary" onClick={() => openModal('falta')}>Registrar Falta</Btn>
      </PageContent>
    </div>
  )
}

// ── EC ENCAMINHAMENTOS ──
export function ECEnc() {
  const { goBack, openModal } = useNav()
  return (
    <div className="cv-screen">
      <TopBar title="Encaminhamentos" onBack={goBack} rightContent={<Btn variant="primary" small onClick={() => openModal('enc')}>+ Novo</Btn>} />
      <PageContent>
        <StatsGrid cols={3}>
          <StatCard label="Enviados" value="6" color={C.yel} />
          <StatCard label="Em And." value="3" color={C.blu} />
          <StatCard label="Concluídos" value="12" color={C.green} />
        </StatsGrid>
        <EncItem name="João Gomes · 7 anos" spec="CRAS Ibura – Assistência Social" priority="red" status="yel" date="11/05" />
        <EncItem name="Carlos Ramos · 5 anos" spec="UBS Ibura II – Saúde" priority="red" status="yel" date="13/05" />
        <EncItem name="Luana Silva · 3 anos" spec="UBS Ibura II – Vacinação" priority="yel" status="blu" date="10/05" />
        <EncItem name="Pedro Alves · 4 anos" spec="CRAS – Benefício Social" priority="green" date="Concluído em 08/05" opacity={0.6} />
      </PageContent>
      <ECNav active="enc" />
    </div>
  )
}

// ── EC ALERTAS ──
export function ECAlerts() {
  const { goBack } = useNav()
  return (
    <div className="cv-screen">
      <TopBar title="Alertas Escolares" onBack={goBack} />
      <PageContent>
        <StatsGrid cols={3}>
          <StatCard label="Evasão" value="2" color={C.red} />
          <StatCard label="Faltas" value="5" color={C.yel} />
          <StatCard label="Resolv." value="8" color={C.green} />
        </StatsGrid>
        <AlertItem stripe={C.red} title="Risco de Evasão — João Gomes" desc="8 faltas consecutivas. Contato com responsável sem retorno. Suspeita de negligência." tags={['Crítico', 'Evasão']} time="Hoje" />
        <AlertItem stripe={C.red} title="Queda de Desempenho — Carlos Ramos" desc="Nota abaixo da média em todas as disciplinas. Suspeita de vulnerabilidade alimentar." tags={['Crítico', 'Desempenho']} time="Há 2 dias" />
        <AlertItem stripe={C.yel} title="Faltas Consecutivas — Luana Silva" desc="5 faltas no mês. Família não justificou ausências. Criança de 3 anos." tags={['Médio', 'Falta']} time="Há 3 dias" />
        <AlertItem stripe={C.yel} title="Aluno sem Acompanhamento Médico" desc="Tiago Santos — sem atestado médico atualizado. Queda de notas associada." tags={['Médio', 'Saúde']} time="Há 4 dias" />
        <AlertItem stripe={C.green} title="Frequência Regularizada — Pedro Alves" desc="Após encaminhamento ao CRAS, família regularizou situação." tags={['Resolvido']} time="10/05" opacity={0.6} />
      </PageContent>
      <ECNav active="alerts" />
    </div>
  )
}
