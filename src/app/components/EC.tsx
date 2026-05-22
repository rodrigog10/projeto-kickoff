import React from 'react'
import { useNav } from './context'
import {
  TopBar, BottomNav, PageContent, StatCard, StatsGrid, AlertBanner,
  SectionTitle, ListItem, Badge, Divider, ActionCard, EncItem,
  AlertItem, Card, CardHeader, CardBody, CardTitle, ProfileHero, InfoGrid,
  HistoryItem, ProgressRow, BarChart, Btn, BrandTitle, C
} from './ui'

// ── Dados dos alunos ──
const ALUNOS: Record<string, {
  initials: string; name: string; meta: string; tags: string[]; color: string
  resp: string; tel: string; nis: string; freq: string; freqColor: string
  serie: string; turno: string; end: string
  alerta: string; alertVariant: 'red' | 'yel' | 'blu'
  notas: { label: string; value: number; color: string; display: string }[]
  historico: { color: string; title: string; date: string }[]
}> = {
  joao: {
    initials: 'JG', name: 'João Gomes', meta: '7 anos · 3º Ano A · EMEF Ibura',
    tags: ['Risco de Evasão', '8 Faltas'], color: C.red,
    resp: 'Sandra Gomes', tel: '(81) 99999-0002', nis: '9876543210',
    freq: '61%', freqColor: C.red, serie: '3º Ano A', turno: 'Manhã',
    end: 'R. do Cajueiro, 23 · Ibura',
    alerta: '8 faltas consecutivas. Suspeita de negligência familiar. Ação imediata necessária.',
    alertVariant: 'red',
    notas: [
      { label: 'Português', value: 55, color: C.yel, display: '5,5' },
      { label: 'Matemática', value: 40, color: C.red, display: '4,0' },
      { label: 'Ciências', value: 70, color: C.yel, display: '7,0' },
      { label: 'Frequência', value: 61, color: C.red, display: '61%' },
    ],
    historico: [
      { color: C.red, title: 'Alerta de evasão gerado', date: '15/05/2026 · Sistema' },
      { color: C.yel, title: 'Falta não justificada — 3ª consecutiva', date: '14/05/2026' },
      { color: C.yel, title: 'Contato com responsável — sem retorno', date: '10/05/2026' },
      { color: C.blu, title: 'Encaminhado para CRAS', date: '05/05/2026' },
    ],
  },
  luana: {
    initials: 'LS', name: 'Luana Silva', meta: '3 anos · Pré I · EMEF Ibura',
    tags: ['Atenção', '5 Faltas no Mês'], color: C.yel,
    resp: 'Ana Silva', tel: '(81) 99999-0001', nis: '1234567890',
    freq: '74%', freqColor: C.yel, serie: 'Pré I', turno: 'Tarde',
    end: 'R. das Palmeiras, 114 · Ibura',
    alerta: '5 faltas no mês sem justificativa. Criança de 3 anos com histórico de vacinação atrasada.',
    alertVariant: 'yel',
    notas: [
      { label: 'Desenvolvimento', value: 65, color: C.yel, display: '6,5' },
      { label: 'Socialização', value: 75, color: C.green, display: '7,5' },
      { label: 'Motricidade', value: 80, color: C.green, display: '8,0' },
      { label: 'Frequência', value: 74, color: C.yel, display: '74%' },
    ],
    historico: [
      { color: C.yel, title: 'Falta não justificada — 5ª do mês', date: '14/05/2026' },
      { color: C.blu, title: 'Comunicado enviado à família', date: '10/05/2026' },
      { color: C.yel, title: 'Falta não justificada', date: '05/05/2026' },
      { color: C.green, title: 'Matriculada — Pré I', date: '01/02/2026' },
    ],
  },
  carlos: {
    initials: 'CR', name: 'Carlos Ramos', meta: '5 anos · 1º Ano B · EMEF Ibura',
    tags: ['Atenção', 'Queda de Desempenho'], color: '#7c3aed',
    resp: 'Beatriz Ramos', tel: '(81) 99999-0003', nis: '5647382910',
    freq: '82%', freqColor: C.yel, serie: '1º Ano B', turno: 'Manhã',
    end: 'R. Nova Esperança, 45 · Jordão',
    alerta: 'Queda de notas em todas as disciplinas. Suspeita de vulnerabilidade alimentar — encaminhado à saúde.',
    alertVariant: 'yel',
    notas: [
      { label: 'Português', value: 50, color: C.yel, display: '5,0' },
      { label: 'Matemática', value: 45, color: C.red, display: '4,5' },
      { label: 'Ciências', value: 60, color: C.yel, display: '6,0' },
      { label: 'Frequência', value: 82, color: C.yel, display: '82%' },
    ],
    historico: [
      { color: C.blu, title: 'Encaminhado à UBS — Suspeita desnutrição', date: '13/05/2026' },
      { color: C.yel, title: 'Queda de desempenho registrada', date: '08/05/2026' },
      { color: C.yel, title: 'Reunião com responsável', date: '02/05/2026' },
      { color: C.green, title: 'Matriculado — 1º Ano B', date: '01/02/2026' },
    ],
  },
  pedro: {
    initials: 'PA', name: 'Pedro Alves', meta: '4 anos · Pré II · EMEF Ibura',
    tags: ['Regular', 'Frequência OK'], color: C.green,
    resp: 'Marcos Alves', tel: '(81) 99999-0007', nis: '1122334455',
    freq: '94%', freqColor: C.green, serie: 'Pré II', turno: 'Manhã',
    end: 'R. Nova Esperança, 88 · Ibura',
    alerta: 'Aluno sem pendências. Frequência e desenvolvimento dentro do esperado.',
    alertVariant: 'blu',
    notas: [
      { label: 'Desenvolvimento', value: 90, color: C.green, display: '9,0' },
      { label: 'Socialização', value: 85, color: C.green, display: '8,5' },
      { label: 'Motricidade', value: 88, color: C.green, display: '8,8' },
      { label: 'Frequência', value: 94, color: C.green, display: '94%' },
    ],
    historico: [
      { color: C.green, title: 'Vacinação atualizada — visita domiciliar', date: '13/05/2026' },
      { color: C.green, title: 'Avaliação semestral — Excelente', date: '01/05/2026' },
      { color: C.green, title: 'Caso CRAS encerrado com sucesso', date: '10/04/2026' },
      { color: C.green, title: 'Matriculado — Pré II', date: '01/02/2026' },
    ],
  },
  maria: {
    initials: 'MA', name: 'Maria Alves', meta: '6 anos · 2º Ano C · EMEF Ibura',
    tags: ['Regular'], color: C.blu,
    resp: 'Fernanda Alves', tel: '(81) 99999-0008', nis: '6677889900',
    freq: '91%', freqColor: C.green, serie: '2º Ano C', turno: 'Tarde',
    end: 'R. das Mangueiras, 200 · Ibura',
    alerta: 'Aluna sem pendências. Bom desempenho acadêmico e frequência regular.',
    alertVariant: 'blu',
    notas: [
      { label: 'Português', value: 82, color: C.green, display: '8,2' },
      { label: 'Matemática', value: 78, color: C.green, display: '7,8' },
      { label: 'Ciências', value: 85, color: C.green, display: '8,5' },
      { label: 'Frequência', value: 91, color: C.green, display: '91%' },
    ],
    historico: [
      { color: C.green, title: 'Avaliação bimestral — Bom', date: '01/05/2026' },
      { color: C.green, title: 'Participação na feira de ciências', date: '15/04/2026' },
      { color: C.green, title: 'Matriculada — 2º Ano C', date: '01/02/2026' },
    ],
  },
  tiago: {
    initials: 'TS', name: 'Tiago Santos', meta: '8 anos · 4º Ano A · EMEF Ibura',
    tags: ['Atenção', 'Queda de Notas'], color: '#0891b2',
    resp: 'Roberto Santos', tel: '(81) 99999-0009', nis: '9988776655',
    freq: '85%', freqColor: C.yel, serie: '4º Ano A', turno: 'Manhã',
    end: 'Av. Recife, 550 · Ibura',
    alerta: 'Queda de notas no último bimestre. Sem atestado médico atualizado. Acompanhamento recomendado.',
    alertVariant: 'yel',
    notas: [
      { label: 'Português', value: 58, color: C.yel, display: '5,8' },
      { label: 'Matemática', value: 52, color: C.yel, display: '5,2' },
      { label: 'Ciências', value: 65, color: C.yel, display: '6,5' },
      { label: 'Frequência', value: 85, color: C.yel, display: '85%' },
    ],
    historico: [
      { color: C.yel, title: 'Queda de notas registrada', date: '08/05/2026' },
      { color: C.blu, title: 'Solicitado atestado médico', date: '02/05/2026' },
      { color: C.green, title: 'Avaliação bimestral anterior — Regular', date: '01/03/2026' },
      { color: C.green, title: 'Matriculado — 4º Ano A', date: '01/02/2026' },
    ],
  },
  bruna: {
    initials: 'BN', name: 'Bruna Neto', meta: '9 anos · 4º Ano B · EMEF Ibura',
    tags: ['Regular', 'Destaque'], color: '#059669',
    resp: 'Célia Neto', tel: '(81) 99999-0010', nis: '1029384756',
    freq: '96%', freqColor: C.green, serie: '4º Ano B', turno: 'Tarde',
    end: 'R. do Sol, 78 · Ibura',
    alerta: 'Aluna destaque. Frequência exemplar e ótimo desempenho em todas as disciplinas.',
    alertVariant: 'blu',
    notas: [
      { label: 'Português', value: 92, color: C.green, display: '9,2' },
      { label: 'Matemática', value: 88, color: C.green, display: '8,8' },
      { label: 'Ciências', value: 95, color: C.green, display: '9,5' },
      { label: 'Frequência', value: 96, color: C.green, display: '96%' },
    ],
    historico: [
      { color: C.green, title: 'Premiação — Aluna destaque bimestre', date: '01/05/2026' },
      { color: C.green, title: 'Avaliação bimestral — Excelente', date: '01/03/2026' },
      { color: C.green, title: 'Matriculada — 4º Ano B', date: '01/02/2026' },
    ],
  },
}

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
  const { goTo, goToWith, doLogout, openModal } = useNav()
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
        <ListItem av={<div style={{ width: 38, height: 38, borderRadius: '50%', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>JG</div>} name="João Gomes · 7 anos" sub="3º Ano A · 8 faltas consecutivas" right={<Badge variant="red">Evasão</Badge>} onClick={() => goToWith('s-ec-aluno', 'joao')} />
        <ListItem av={<div style={{ width: 38, height: 38, borderRadius: '50%', background: C.yel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>LS</div>} name="Luana Silva · 3 anos" sub="Pré I · 5 faltas no mês" right={<Badge variant="yel">Atenção</Badge>} onClick={() => goToWith('s-ec-aluno', 'luana')} />
        <ListItem av={<div style={{ width: 38, height: 38, borderRadius: '50%', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>CR</div>} name="Carlos Ramos · 5 anos" sub="1º Ano B · Queda de desempenho" right={<Badge variant="yel">Atenção</Badge>} onClick={() => goToWith('s-ec-aluno', 'carlos')} />
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
  const { goBack, goToWith } = useNav()
  const alunos = [
    { id: 'joao', av: 'JG', color: C.red, name: 'João Gomes · 7 anos', sub: '3º Ano A · 8 faltas · Evasão', badge: <Badge variant="red">Evasão</Badge> },
    { id: 'luana', av: 'LS', color: C.yel, name: 'Luana Silva · 3 anos', sub: 'Pré I · 5 faltas', badge: <Badge variant="yel">Atenção</Badge> },
    { id: 'carlos', av: 'CR', color: '#7c3aed', name: 'Carlos Ramos · 5 anos', sub: '1º Ano B · Desnutrição', badge: <Badge variant="yel">Atenção</Badge> },
    { id: 'pedro', av: 'PA', color: C.green, name: 'Pedro Alves · 4 anos', sub: 'Pré II · Frequência regular', badge: <Badge variant="green">Regular</Badge> },
    { id: 'maria', av: 'MA', color: C.blu, name: 'Maria Alves · 6 anos', sub: '2º Ano C · Frequência regular', badge: <Badge variant="green">Regular</Badge> },
    { id: 'tiago', av: 'TS', color: '#0891b2', name: 'Tiago Santos · 8 anos', sub: '4º Ano A · Queda de notas', badge: <Badge variant="yel">Atenção</Badge> },
    { id: 'bruna', av: 'BN', color: '#059669', name: 'Bruna Neto · 9 anos', sub: '4º Ano B · Frequência regular', badge: <Badge variant="green">Regular</Badge> },
  ]
  return (
    <div className="cv-screen">
      <TopBar title="Lista de Alunos" onBack={goBack} />
      <PageContent>
        {alunos.map((a) => (
          <ListItem key={a.id} av={<div style={{ width: 38, height: 38, borderRadius: '50%', background: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>{a.av}</div>} name={a.name} sub={a.sub} right={a.badge} onClick={() => goToWith('s-ec-aluno', a.id)} />
        ))}
      </PageContent>
      <ECNav active="alunos" />
    </div>
  )
}

// ── EC ALUNO ──
export function ECAluno() {
  const { goBack, openModal, selectedId } = useNav()
  const a = ALUNOS[selectedId ?? 'joao'] ?? ALUNOS['joao']
  return (
    <div className="cv-screen">
      <TopBar title="Perfil do Aluno" onBack={goBack} />
      <PageContent>
        <ProfileHero initials={a.initials} name={a.name} meta={a.meta} tags={a.tags} />
        <InfoGrid items={[
          { label: 'Responsável', value: a.resp },
          { label: 'Telefone', value: a.tel },
          { label: 'NIS', value: a.nis },
          { label: 'Frequência', value: a.freq, color: a.freqColor },
          { label: 'Série', value: a.serie },
          { label: 'Turno', value: a.turno },
        ]} />
        <AlertBanner variant={a.alertVariant}>{a.alerta}</AlertBanner>
        <SectionTitle>Progresso Escolar</SectionTitle>
        <Card>
          <CardBody>
            {a.notas.map((n, i) => <ProgressRow key={i} label={n.label} value={n.value} color={n.color} display={n.display} />)}
          </CardBody>
        </Card>
        <SectionTitle>Histórico de Ocorrências</SectionTitle>
        <Card>
          <CardBody style={{ padding: '10px 14px' }}>
            {a.historico.map((h, i) => <HistoryItem key={i} color={h.color} title={h.title} date={h.date} />)}
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
        <EncItem name="Tiago Santos · 8 anos" spec="UBS Ibura II – Atestado médico" priority="yel" status="blu" date="09/05" />
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
        <AlertItem stripe={C.yel} title="Aluno sem Acompanhamento Médico — Tiago Santos" desc="Sem atestado médico atualizado. Queda de notas associada à possível problema de saúde." tags={['Médio', 'Saúde']} time="Há 4 dias" />
        <AlertItem stripe={C.green} title="Frequência Regularizada — Pedro Alves" desc="Após encaminhamento ao CRAS, família regularizou situação." tags={['Resolvido']} time="10/05" opacity={0.6} />
      </PageContent>
      <ECNav active="alerts" />
    </div>
  )
}
