import React from 'react'
import { useNav } from './context'
import {
  TopBar, BottomNav, PageContent, StatCard, StatsGrid, AlertBanner,
  SectionTitle, ListItem, Badge, Divider, ActionCard, EncItem,
  AlertItem, Card, CardHeader, CardBody, CardTitle, ProfileHero, InfoGrid,
  HistoryItem, ProgressRow, BarChart, ConsultItem, VacItem, VisitItem,
  Btn, BrandTitle, C
} from './ui'

function SDNav({ active }: { active: string }) {
  const { goTo } = useNav()
  const items = [
    { label: 'Home', active: active === 'home', onClick: () => goTo('s-sd-home'), icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { label: 'Consultas', active: active === 'consultas', onClick: () => goTo('s-sd-consultas'), icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
    { label: 'Encam.', active: active === 'enc', onClick: () => goTo('s-sd-enc'), icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/></svg> },
    { label: 'Vacinas', active: active === 'vacina', onClick: () => goTo('s-sd-vacina'), badge: 7, icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
    { label: 'Alertas', active: active === 'alerts', onClick: () => goTo('s-sd-alerts'), badge: 3, icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg> },
  ]
  return <BottomNav items={items} />
}

// ── SD HOME ──
export function SDHome() {
  const { goTo, doLogout, openModal } = useNav()
  return (
    <div className="cv-screen">
      <TopBar
        title=""
        customTitle={<BrandTitle subtitle="UBS Ibura II · Clínico Geral" />}
        rightContent={<>
          <div onClick={() => goTo('s-sd-alerts')} style={{ width: 34, height: 34, borderRadius: '50%', background: C.bg, border: `1px solid ${C.bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
            <svg width="16" height="16" fill="none" stroke={C.t2} strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <div style={{ width: 8, height: 8, background: C.red, borderRadius: '50%', position: 'absolute', top: 3, right: 3, border: '1.5px solid #fff' }} />
          </div>
          <div onClick={doLogout} style={{ width: 34, height: 34, borderRadius: '50%', background: C.gradDiag, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>DM</div>
        </>}
      />
      <PageContent>
        <AlertBanner variant="red"><strong>2 pacientes</strong> não compareceram às consultas de hoje.</AlertBanner>
        <StatsGrid cols={2}>
          <StatCard label="Hoje" value="4" sub="Consultas" />
          <StatCard label="Faltas" value="2" sub="Hoje" color={C.red} />
          <StatCard label="Críticos" value="3" sub="Urgentes" color={C.red} />
          <StatCard label="Vacinas" value="7" sub="Atrasadas" color={C.yel} />
        </StatsGrid>
        <SectionTitle link="Ver todos →" onLink={() => goTo('s-sd-consultas')}>Pacientes — Hoje</SectionTitle>
        <ListItem av={<div style={{ width: 38, height: 38, borderRadius: '50%', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>LS</div>} name="Luana Silva · 3 anos" sub="10h30 · Urgente · Vacinação" right={<Badge variant="yel">Faltou</Badge>} onClick={() => goTo('s-sd-paciente')} />
        <ListItem av={<div style={{ width: 38, height: 38, borderRadius: '50%', background: C.blu, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>JG</div>} name="João Gomes · 7 anos" sub="08h00 · Rotina" right={<Badge variant="yel">Faltou</Badge>} onClick={() => goTo('s-sd-paciente')} />
        <ListItem av={<div style={{ width: 38, height: 38, borderRadius: '50%', background: C.yel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>CR</div>} name="Carlos Ramos · 5 anos" sub="14h00 · Retorno · Desnutrição" right={<Badge variant="blu">Agendada</Badge>} onClick={() => goTo('s-sd-paciente')} />
        <ListItem av={<div style={{ width: 38, height: 38, borderRadius: '50%', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>MF</div>} name="Maria Ferreira · 34 anos" sub="16h30 · Pré-natal" right={<Badge variant="blu">Agendada</Badge>} onClick={() => goTo('s-sd-paciente')} />
        <Divider />
        <SectionTitle>Ações Rápidas</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          <ActionCard icon={<div style={{ width: 36, height: 36, background: C.greenL, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.green} strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>} label="Agendar" sub="Nova consulta" onClick={() => openModal('agendar')} />
          <ActionCard icon={<div style={{ width: 36, height: 36, background: C.bluB, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.blu} strokeWidth="2" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/></svg></div>} label="Encaminhar" sub="Especialista" onClick={() => goTo('s-sd-enc')} />
          <ActionCard icon={<div style={{ width: 36, height: 36, background: C.yelB, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.yel} strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></div>} label="Visitas" sub="Domiciliares" onClick={() => goTo('s-sd-visitas')} />
          <ActionCard icon={<div style={{ width: 36, height: 36, background: C.redB, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.red} strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>} label="Vacinação" sub="7 atrasadas" onClick={() => goTo('s-sd-vacina')} />
        </div>
      </PageContent>
      <SDNav active="home" />
    </div>
  )
}

// ── SD CONSULTAS ──
export function SDConsultas() {
  const { goBack, goTo, openModal } = useNav()
  return (
    <div className="cv-screen">
      <TopBar title="Consultas" onBack={goBack} rightContent={<Btn variant="primary" small onClick={() => openModal('agendar')}>+ Agendar</Btn>} />
      <PageContent>
        <StatsGrid cols={4}>
          <StatCard label="Hoje" value="4" />
          <StatCard label="Faltas" value="2" color={C.red} />
          <StatCard label="Semana" value="17" color={C.green} />
          <StatCard label="30 dias" value="23" color={C.yel} />
        </StatsGrid>
        <ConsultItem variant="faltou" name="Luana Silva · 3 anos" meta="Via CRAS Ibura · Vacinação atrasada" time="15/05 · 10h30" tag="Urgente" status="yel" onClick={() => goTo('s-sd-paciente')} />
        <ConsultItem variant="faltou" name="João Gomes · 7 anos" meta="Via Escola EMEF Ibura · Consulta pendente" time="15/05 · 08h00" tag="Rotina" status="yel" onClick={() => goTo('s-sd-paciente')} />
        <ConsultItem variant="agendada" name="Carlos Ramos · 5 anos" meta="Via CRAS Jordão · Suspeita de desnutrição" time="15/05 · 14h00" tag="Retorno" status="blu" onClick={() => goTo('s-sd-paciente')} />
        <ConsultItem variant="agendada" name="Maria Ferreira · 34 anos" meta="Via CRAS Ibura · Pré-natal em atraso" time="15/05 · 16h30" tag="Retorno" status="blu" onClick={() => goTo('s-sd-paciente')} />
        <ConsultItem variant="realizada" name="Rosa Pereira · 68 anos" meta="Via CRAS Mustardinha · HAS sem acompanhamento" time="14/05 · 09h00" tag="Rotina" status="green" onClick={() => goTo('s-sd-paciente')} />
        <ConsultItem variant="urgente" name="Família Souza · Triagem" meta="Via CRAS · Nova família · 3 membros" time="14/05 · 11h00" tag="Especialista" status="gray" onClick={() => goTo('s-sd-paciente')} />
      </PageContent>
      <SDNav active="consultas" />
    </div>
  )
}

// ── SD PACIENTE ──
export function SDPaciente() {
  const { goBack, goTo, openModal } = useNav()
  return (
    <div className="cv-screen">
      <TopBar title="Perfil do Paciente" onBack={goBack} />
      <PageContent>
        <ProfileHero initials="LS" name="Luana Silva" meta="3 anos · Feminino · UBS Ibura II" tags={['Urgente', 'Vacinação', 'CRAS Ibura']} />
        <InfoGrid items={[
          { label: 'Responsável', value: 'Ana Silva' },
          { label: 'Telefone', value: '(81) 99999-0001' },
          { label: 'NIS', value: '1234567890' },
          { label: 'Origem', value: 'CRAS Ibura' },
          { label: 'Risco', value: 'Alto', color: C.red },
          { label: 'Endereço', value: 'R. das Palmeiras, 114' },
        ]} />
        <AlertBanner variant="red">Vacinação tríplice viral com 6 semanas de atraso. Família não comparece às consultas.</AlertBanner>
        <SectionTitle>Histórico de Consultas</SectionTitle>
        <Card>
          <CardBody style={{ padding: '10px 14px' }}>
            <HistoryItem color={C.yel} title="Consulta — Faltou" date="15/05/2026 · UBS Ibura II" />
            <HistoryItem color={C.yel} title="Consulta — Faltou" date="01/05/2026 · UBS Ibura II" />
            <HistoryItem color={C.green} title="Consulta realizada — Rotina" date="15/04/2026 · UBS Ibura II" />
            <HistoryItem color={C.green} title="Encaminhamento recebido — CRAS" date="10/04/2026 · CRAS Ibura" />
          </CardBody>
        </Card>
        <Btn variant="primary" onClick={() => openModal('agendar')}>
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Remarcar Consulta
        </Btn>
        <Btn variant="secondary" onClick={() => openModal('enc')}>Encaminhar Especialista</Btn>
        <Btn variant="secondary" onClick={() => goTo('s-sd-visitas')}>Solicitar Visita Domiciliar</Btn>
      </PageContent>
    </div>
  )
}

// ── SD ENCAMINHAMENTOS ──
export function SDEnc() {
  const { goBack, openModal } = useNav()
  return (
    <div className="cv-screen">
      <TopBar title="Encaminhamentos" onBack={goBack} rightContent={<Btn variant="primary" small onClick={() => openModal('enc')}>+ Novo</Btn>} />
      <PageContent>
        <StatsGrid cols={4}>
          <StatCard label="Ativos" value="12" />
          <StatCard label="Aguard." value="5" color={C.yel} />
          <StatCard label="Em And." value="4" color={C.blu} />
          <StatCard label="Concluídos" value="19" color={C.green} />
        </StatsGrid>
        <EncItem name="João Gomes · 7 anos" spec="CAPS Infantil – Psicologia" priority="red" status="yel" date="11/05" />
        <EncItem name="Carlos Ramos · 5 anos" spec="NASF – Nutrição" priority="red" status="yel" date="13/05" />
        <EncItem name="Maria Ferreira · 34 anos" spec="Ginecologia / Pré-natal" priority="yel" status="blu" date="01/05" />
        <EncItem name="Rosa Pereira · 68 anos" spec="Cardiologia" priority="yel" status="blu" date="03/05" />
        <EncItem name="Pedro Alves · 4 anos" spec="Pediatria" priority="green" date="Concluído em 10/05" opacity={0.6} />
      </PageContent>
      <SDNav active="enc" />
    </div>
  )
}

// ── SD VACINAÇÃO ──
export function SDVacina() {
  const { goBack, goTo } = useNav()
  return (
    <div className="cv-screen">
      <TopBar title="Controle de Vacinação" onBack={goBack} />
      <PageContent>
        <StatsGrid cols={2}>
          <StatCard label="Atrasadas" value="7" sub="Famílias sem atualização" color={C.red} />
          <StatCard label="Em Dia" value="18" sub="Carteira atualizada" color={C.green} />
        </StatsGrid>
        <AlertBanner variant="yel">7 famílias com vacinação em atraso. Considere visita domiciliar para casos críticos.</AlertBanner>
        <SectionTitle>Vacinação Atrasada</SectionTitle>
        <VacItem
          icon={<div style={{ background: C.redB, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.red} strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg></div>}
          name="Luana Silva · 3 anos" meta="Tríplice viral · 6 semanas de atraso" badge="Crítico" badgeVariant="red"
        />
        <VacItem
          icon={<div style={{ background: C.yelB, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.yel} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>}
          name="Carlos Ramos · 5 anos" meta="DTP · 3 semanas de atraso" badge="Atenção" badgeVariant="yel"
        />
        <VacItem
          icon={<div style={{ background: C.yelB, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.yel} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>}
          name="João Gomes · 7 anos" meta="Varicela · 2 semanas de atraso" badge="Atenção" badgeVariant="yel"
        />
        <VacItem
          icon={<div style={{ background: C.yelB, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.yel} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg></div>}
          name="Família Lima · 2 crianças" meta="Hepatite B · 4 semanas" badge="Atenção" badgeVariant="yel"
        />
        <SectionTitle>Em Dia</SectionTitle>
        <VacItem
          icon={<div style={{ background: C.greenL, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.green} strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>}
          name="Pedro Alves · 4 anos" meta="Todas as doses em dia" badge="OK" badgeVariant="green"
        />
        <VacItem
          icon={<div style={{ background: C.greenL, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.green} strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>}
          name="Rosa Pereira · 68 anos" meta="Gripe · Pneumonia · Atualizadas" badge="OK" badgeVariant="green"
        />
        <Btn variant="primary" style={{ marginTop: 12 }} onClick={() => goTo('s-sd-visitas')}>
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          Solicitar Visita para Vacinação
        </Btn>
      </PageContent>
      <SDNav active="vacina" />
    </div>
  )
}

// ── SD VISITAS ──
export function SDVisitas() {
  const { goBack, openModal } = useNav()
  return (
    <div className="cv-screen">
      <TopBar title="Visitas Domiciliares" onBack={goBack} rightContent={<Btn variant="primary" small onClick={() => openModal('visita')}>+ Solicitar</Btn>} />
      <PageContent>
        <StatsGrid cols={2}>
          <StatCard label="Agendadas" value="3" sub="Próximas" color={C.blu} />
          <StatCard label="Urgentes" value="1" sub="Imediata" color={C.red} />
        </StatsGrid>
        <VisitItem variant="urgente" name="Luana Silva · 3 anos" badge={<Badge variant="red">Urgente</Badge>} addr="R. das Palmeiras, 114 · Ibura" reason="Vacinação tríplice viral em atraso. Família não comparece." tags={['Hoje', 'ACS: Maria Souza']} />
        <VisitItem variant="agendada" name="Rosa Pereira · 68 anos" badge={<Badge variant="blu">Agendada</Badge>} addr="Av. Mustardinha, 320" reason="HAS sem acompanhamento. Dificuldade de locomoção." tags={['16/05', 'Enfermeira']} />
        <VisitItem variant="agendada" name="Família Souza" badge={<Badge variant="blu">Agendada</Badge>} addr="R. do Cajueiro, 57 · Ibura" reason="Triagem inicial. Nova família encaminhada pelo CRAS." tags={['17/05', 'CRAS']} />
        <VisitItem variant="realizada" name="Pedro Alves · 4 anos" badge={<Badge variant="green">Realizada</Badge>} addr="R. Nova Esperança, 88" reason="Vacinação atualizada com sucesso. Mãe orientada." tags={['13/05', 'Concluída']} />
      </PageContent>
      <SDNav active="home" />
    </div>
  )
}

// ── SD ALERTAS ──
export function SDAlerts() {
  const { goBack } = useNav()
  return (
    <div className="cv-screen">
      <TopBar title="Alertas Clínicos" onBack={goBack} />
      <PageContent>
        <StatsGrid cols={3}>
          <StatCard label="Críticos" value="3" color={C.red} />
          <StatCard label="Médios" value="5" color={C.yel} />
          <StatCard label="Resolv." value="14" color={C.green} />
        </StatsGrid>
        <AlertItem stripe={C.red} title="Vacinação em Atraso — Luana Silva" desc="Tríplice viral com 6 semanas de atraso. Família não comparece às consultas agendadas." tags={['Crítico', 'Vacinação']} time="Hoje" />
        <AlertItem stripe={C.red} title="Suspeita de Desnutrição — Carlos Ramos" desc="Peso abaixo da curva. Necessita avaliação nutricional urgente e encaminhamento ao NASF." tags={['Crítico', 'Nutrição']} time="Há 1 dia" />
        <AlertItem stripe={C.red} title="Consulta Urgente — João Gomes" desc="Segunda falta consecutiva. Suspeita de negligência familiar." tags={['Crítico', 'Falta']} time="Hoje" />
        <AlertItem stripe={C.yel} title="Pré-natal Irregular — Maria Ferreira" desc="2 consultas de pré-natal perdidas consecutivamente. Gestação de 20 semanas." tags={['Médio', 'Pré-natal']} time="Há 2 dias" />
        <AlertItem stripe={C.yel} title="Acompanhamento Psicológico — João Gomes" desc="Solicitação ainda sem agendamento. Aguarda vaga no CAPS Infantil." tags={['Médio', 'Saúde Mental']} time="Há 4 dias" />
      </PageContent>
      <SDNav active="alerts" />
    </div>
  )
}
