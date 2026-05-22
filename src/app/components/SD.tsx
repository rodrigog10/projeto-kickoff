import React from 'react'
import { useNav } from './context'
import { DL } from './DesktopLayout'
import {
  StatCard, AlertBanner, SectionTitle, ListItem, Badge,
  ActionCard, EncItem, AlertItem, Card, CardHeader, CardBody, CardTitle,
  ProfileHero, InfoGrid, HistoryItem, ProgressRow, BarChart,
  ConsultItem, VacItem, VisitItem, Btn, C
} from './ui'

// ── Dados dos pacientes ──
const PATIENTS: Record<string, {
  initials: string; name: string; meta: string; tags: string[]; color: string
  resp: string; tel: string; nis: string; origem: string; risco: string; riscoColor: string; end: string
  alerta: string; alertVariant: 'red' | 'yel' | 'blu'
  historico: { color: string; title: string; date: string }[]
}> = {
  luana: {
    initials: 'LS', name: 'Luana Silva', meta: '3 anos · Feminino · UBS Ibura II',
    tags: ['Urgente', 'Vacinação', 'CRAS Ibura'], color: C.red,
    resp: 'Ana Silva', tel: '(81) 99999-0001', nis: '1234567890', origem: 'CRAS Ibura',
    risco: 'Alto', riscoColor: C.red, end: 'R. das Palmeiras, 114 · Ibura',
    alerta: 'Vacinação tríplice viral com 6 semanas de atraso. Família não comparece às consultas.',
    alertVariant: 'red',
    historico: [
      { color: C.yel, title: 'Consulta — Faltou', date: '15/05/2026 · UBS Ibura II' },
      { color: C.yel, title: 'Consulta — Faltou', date: '01/05/2026 · UBS Ibura II' },
      { color: C.green, title: 'Consulta realizada — Rotina', date: '15/04/2026 · UBS Ibura II' },
      { color: C.green, title: 'Encaminhamento recebido — CRAS', date: '10/04/2026 · CRAS Ibura' },
    ],
  },
  joao: {
    initials: 'JG', name: 'João Gomes', meta: '7 anos · Masculino · UBS Ibura II',
    tags: ['Urgente', 'Consulta Pendente', 'EMEF Ibura'], color: C.blu,
    resp: 'Sandra Gomes', tel: '(81) 99999-0002', nis: '9876543210', origem: 'Escola EMEF Ibura',
    risco: 'Alto', riscoColor: C.red, end: 'R. do Cajueiro, 23 · Ibura',
    alerta: 'Segunda falta consecutiva à consulta. Escola reportou suspeita de negligência familiar.',
    alertVariant: 'red',
    historico: [
      { color: C.yel, title: 'Consulta — Faltou', date: '15/05/2026 · UBS Ibura II' },
      { color: C.yel, title: 'Consulta — Faltou', date: '08/05/2026 · UBS Ibura II' },
      { color: C.blu, title: 'Encaminhado pela escola — EMEF Ibura', date: '03/05/2026' },
      { color: C.green, title: 'Consulta realizada — Rotina', date: '10/04/2026 · UBS Ibura II' },
    ],
  },
  carlos: {
    initials: 'CR', name: 'Carlos Ramos', meta: '5 anos · Masculino · UBS Ibura II',
    tags: ['Retorno', 'Desnutrição', 'CRAS Jordão'], color: C.yel,
    resp: 'Beatriz Ramos', tel: '(81) 99999-0003', nis: '5647382910', origem: 'CRAS Jordão',
    risco: 'Alto', riscoColor: C.red, end: 'R. Nova Esperança, 45 · Jordão',
    alerta: 'Peso abaixo da curva. Suspeita de desnutrição. Encaminhado ao NASF para avaliação nutricional.',
    alertVariant: 'yel',
    historico: [
      { color: C.blu, title: 'Retorno agendado — Nutrição', date: '15/05/2026 · UBS Ibura II' },
      { color: C.red, title: 'Alerta de desnutrição gerado', date: '10/05/2026 · Sistema' },
      { color: C.blu, title: 'Encaminhado ao NASF', date: '05/05/2026 · CRAS Jordão' },
      { color: C.green, title: 'Triagem inicial realizada', date: '28/04/2026 · UBS Ibura II' },
    ],
  },
  maria: {
    initials: 'MF', name: 'Maria Ferreira', meta: '34 anos · Feminino · UBS Ibura II',
    tags: ['Pré-natal', 'Gestante', 'CRAS Ibura'], color: '#7c3aed',
    resp: 'Própria paciente', tel: '(81) 99999-0004', nis: '3021948576', origem: 'CRAS Ibura',
    risco: 'Médio', riscoColor: C.yel, end: 'Av. Recife, 890 · Ibura',
    alerta: '2 consultas de pré-natal perdidas consecutivamente. Gestação de 20 semanas. Ação necessária.',
    alertVariant: 'yel',
    historico: [
      { color: C.yel, title: 'Pré-natal — Faltou', date: '15/05/2026 · UBS Ibura II' },
      { color: C.yel, title: 'Pré-natal — Faltou', date: '01/05/2026 · UBS Ibura II' },
      { color: C.green, title: 'Pré-natal realizado — 16 semanas', date: '10/04/2026 · UBS Ibura II' },
      { color: C.blu, title: 'Cadastro pré-natal', date: '15/03/2026 · UBS Ibura II' },
    ],
  },
  rosa: {
    initials: 'RP', name: 'Rosa Pereira', meta: '68 anos · Feminino · UBS Ibura II',
    tags: ['HAS', 'Idosa', 'Mustardinha'], color: C.green,
    resp: 'Filha: Clara Pereira', tel: '(81) 99999-0005', nis: '7654321098', origem: 'CRAS Mustardinha',
    risco: 'Médio', riscoColor: C.yel, end: 'Av. Mustardinha, 320',
    alerta: 'Hipertensão sem acompanhamento há 45 dias. Paciente com dificuldade de locomoção.',
    alertVariant: 'yel',
    historico: [
      { color: C.green, title: 'Consulta realizada — Rotina', date: '14/05/2026 · UBS Ibura II' },
      { color: C.blu, title: 'Visita domiciliar agendada', date: '08/05/2026' },
      { color: C.green, title: 'Aferição de pressão — 14x9', date: '01/05/2026 · UBS Ibura II' },
      { color: C.green, title: 'Encaminhamento — Cardiologia', date: '03/04/2026 · CRAS Mustardinha' },
    ],
  },
  souza: {
    initials: 'FS', name: 'Família Souza', meta: 'Triagem inicial · 3 membros · UBS Ibura II',
    tags: ['Triagem', 'Nova Família', 'CRAS'], color: C.t2,
    resp: 'Paulo Souza', tel: '(81) 99999-0006', nis: 'Pendente', origem: 'CRAS Ibura',
    risco: 'A avaliar', riscoColor: C.t2, end: 'R. do Cajueiro, 57 · Ibura',
    alerta: 'Família recém encaminhada pelo CRAS. Triagem inicial necessária. 3 membros: adulto + 2 crianças.',
    alertVariant: 'blu',
    historico: [
      { color: C.blu, title: 'Triagem agendada', date: '14/05/2026 · UBS Ibura II' },
      { color: C.green, title: 'Encaminhamento recebido — CRAS', date: '12/05/2026 · CRAS Ibura' },
    ],
  },
}

function Av({ initials, color }: { initials: string; color: string }) {
  return <div style={{ width: 38, height: 38, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: 13, flexShrink: 0 }}>{initials}</div>
}

// ── SD HOME ──
export function SDHome() {
  const { goTo, goToWith, openModal } = useNav()
  return (
    <DL title="Saúde" subtitle="UBS Ibura II · Clínico Geral" activeScreen="s-sd-home" userInitials="DM" userSub="Dr. Marcos">
      <AlertBanner variant="red"><strong>2 pacientes</strong> não compareceram às consultas de hoje.</AlertBanner>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14, marginBottom: 24, marginTop: 8 }}>
        <StatCard label="Consultas Hoje" value="4" sub="Agendadas" />
        <StatCard label="Faltas Hoje" value="2" sub="Sem retorno" color={C.red} />
        <StatCard label="Críticos" value="3" sub="Urgentes" color={C.red} />
        <StatCard label="Vacinas Atras." value="7" sub="Famílias" color={C.yel} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <SectionTitle link="Ver todas →" onLink={() => goTo('s-sd-consultas')}>Pacientes — Hoje</SectionTitle>
          <Card>
            <CardBody style={{ padding: 0 }}>
              <ListItem av={<Av initials="LS" color={C.red} />} name="Luana Silva · 3 anos" sub="10h30 · Urgente · Vacinação" right={<Badge variant="yel">Faltou</Badge>} onClick={() => goToWith('s-sd-paciente', 'luana')} />
              <ListItem av={<Av initials="JG" color={C.blu} />} name="João Gomes · 7 anos" sub="08h00 · Rotina" right={<Badge variant="yel">Faltou</Badge>} onClick={() => goToWith('s-sd-paciente', 'joao')} />
              <ListItem av={<Av initials="CR" color={C.yel} />} name="Carlos Ramos · 5 anos" sub="14h00 · Retorno · Desnutrição" right={<Badge variant="blu">Agendada</Badge>} onClick={() => goToWith('s-sd-paciente', 'carlos')} />
              <ListItem av={<Av initials="MF" color="#7c3aed" />} name="Maria Ferreira · 34 anos" sub="16h30 · Pré-natal" right={<Badge variant="blu">Agendada</Badge>} onClick={() => goToWith('s-sd-paciente', 'maria')} />
            </CardBody>
          </Card>
        </div>

        <div>
          <SectionTitle>Ações Rápidas</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            <ActionCard icon={<div style={{ width: 36, height: 36, background: C.greenL, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.green} strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>} label="Agendar" sub="Nova consulta" onClick={() => openModal('agendar')} />
            <ActionCard icon={<div style={{ width: 36, height: 36, background: C.bluB, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.blu} strokeWidth="2" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/></svg></div>} label="Encaminhar" sub="Especialista" onClick={() => goTo('s-sd-enc')} />
            <ActionCard icon={<div style={{ width: 36, height: 36, background: C.yelB, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.yel} strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></div>} label="Visitas" sub="Domiciliares" onClick={() => goTo('s-sd-visitas')} />
            <ActionCard icon={<div style={{ width: 36, height: 36, background: C.redB, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.red} strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>} label="Vacinação" sub="7 atrasadas" onClick={() => goTo('s-sd-vacina')} />
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

// ── SD CONSULTAS ──
export function SDConsultas() {
  const { goBack, goToWith, openModal } = useNav()
  return (
    <DL title="Consultas" activeScreen="s-sd-consultas" onBack={goBack} rightAction={<Btn variant="primary" small onClick={() => openModal('agendar')}>+ Agendar Consulta</Btn>}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14, marginBottom: 24 }}>
        <StatCard label="Hoje" value="4" />
        <StatCard label="Faltas" value="2" color={C.red} />
        <StatCard label="Esta Semana" value="17" color={C.green} />
        <StatCard label="30 Dias" value="23" color={C.yel} />
      </div>
      <Card>
        <CardBody style={{ padding: 0 }}>
          <ConsultItem variant="faltou" name="Luana Silva · 3 anos" meta="Via CRAS Ibura · Vacinação atrasada" time="15/05 · 10h30" tag="Urgente" status="yel" onClick={() => goToWith('s-sd-paciente', 'luana')} />
          <ConsultItem variant="faltou" name="João Gomes · 7 anos" meta="Via Escola EMEF Ibura · Consulta pendente" time="15/05 · 08h00" tag="Rotina" status="yel" onClick={() => goToWith('s-sd-paciente', 'joao')} />
          <ConsultItem variant="agendada" name="Carlos Ramos · 5 anos" meta="Via CRAS Jordão · Suspeita de desnutrição" time="15/05 · 14h00" tag="Retorno" status="blu" onClick={() => goToWith('s-sd-paciente', 'carlos')} />
          <ConsultItem variant="agendada" name="Maria Ferreira · 34 anos" meta="Via CRAS Ibura · Pré-natal em atraso" time="15/05 · 16h30" tag="Retorno" status="blu" onClick={() => goToWith('s-sd-paciente', 'maria')} />
          <ConsultItem variant="realizada" name="Rosa Pereira · 68 anos" meta="Via CRAS Mustardinha · HAS sem acompanhamento" time="14/05 · 09h00" tag="Rotina" status="green" onClick={() => goToWith('s-sd-paciente', 'rosa')} />
          <ConsultItem variant="urgente" name="Família Souza · Triagem" meta="Via CRAS · Nova família · 3 membros" time="14/05 · 11h00" tag="Especialista" status="gray" onClick={() => goToWith('s-sd-paciente', 'souza')} />
        </CardBody>
      </Card>
    </DL>
  )
}

// ── SD PACIENTE ──
export function SDPaciente() {
  const { goBack, goTo, openModal, selectedId } = useNav()
  const p = PATIENTS[selectedId ?? 'luana'] ?? PATIENTS['luana']
  return (
    <DL title="Perfil do Paciente" subtitle={p.name} activeScreen="s-sd-paciente" onBack={goBack} rightAction={<Btn variant="primary" small onClick={() => openModal('agendar')}>Remarcar Consulta</Btn>}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <ProfileHero initials={p.initials} name={p.name} meta={p.meta} tags={p.tags} />
          <InfoGrid items={[
            { label: 'Responsável', value: p.resp },
            { label: 'Telefone', value: p.tel },
            { label: 'NIS', value: p.nis },
            { label: 'Origem', value: p.origem },
            { label: 'Nível de Risco', value: p.risco, color: p.riscoColor },
            { label: 'Endereço', value: p.end, full: true },
          ]} />
          <AlertBanner variant={p.alertVariant}>{p.alerta}</AlertBanner>
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <Btn variant="secondary" onClick={() => openModal('enc')}>Encaminhar Especialista</Btn>
            <Btn variant="secondary" onClick={() => goTo('s-sd-visitas')}>Visita Domiciliar</Btn>
          </div>
        </div>
        <div>
          <SectionTitle>Histórico de Consultas</SectionTitle>
          <Card>
            <CardBody style={{ padding: '10px 14px' }}>
              {p.historico.map((h, i) => <HistoryItem key={i} color={h.color} title={h.title} date={h.date} />)}
            </CardBody>
          </Card>
        </div>
      </div>
    </DL>
  )
}

// ── SD ENCAMINHAMENTOS ──
export function SDEnc() {
  const { goBack, goToWith, openModal } = useNav()
  return (
    <DL title="Encaminhamentos" activeScreen="s-sd-enc" onBack={goBack} rightAction={<Btn variant="primary" small onClick={() => openModal('enc')}>+ Novo Encaminhamento</Btn>}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14, marginBottom: 24 }}>
        <StatCard label="Ativos" value="12" />
        <StatCard label="Aguardando" value="5" color={C.yel} />
        <StatCard label="Em Andamento" value="4" color={C.blu} />
        <StatCard label="Concluídos" value="19" color={C.green} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <SectionTitle>Aguardando Resposta</SectionTitle>
          <EncItem name="João Gomes · 7 anos" spec="CAPS Infantil – Psicologia" priority="red" status="yel" date="11/05" onClick={() => goToWith('s-sd-paciente', 'joao')} />
          <EncItem name="Carlos Ramos · 5 anos" spec="NASF – Nutrição" priority="red" status="yel" date="13/05" onClick={() => goToWith('s-sd-paciente', 'carlos')} />
          <EncItem name="Maria Ferreira · 34 anos" spec="Ginecologia / Pré-natal" priority="yel" status="blu" date="01/05" onClick={() => goToWith('s-sd-paciente', 'maria')} />
          <EncItem name="Rosa Pereira · 68 anos" spec="Cardiologia" priority="yel" status="blu" date="03/05" onClick={() => goToWith('s-sd-paciente', 'rosa')} />
        </div>
        <div>
          <SectionTitle>Concluídos Recentes</SectionTitle>
          <EncItem name="Pedro Alves · 4 anos" spec="Pediatria" priority="green" date="Concluído em 10/05" opacity={0.6} onClick={() => goToWith('s-sd-paciente', 'joao')} />
          <EncItem name="Cecília Torres · 32 anos" spec="NASF – Nutrição" priority="green" date="Concluído em 09/05" opacity={0.6} onClick={() => goToWith('s-sd-paciente', 'rosa')} />
          <EncItem name="Bruno Neto · 28 anos" spec="CAPS – Psiquiatria" priority="green" date="Concluído em 07/05" opacity={0.6} onClick={() => goToWith('s-sd-paciente', 'souza')} />
        </div>
      </div>
    </DL>
  )
}

// ── SD VACINAÇÃO ──
export function SDVacina() {
  const { goBack, goTo, goToWith } = useNav()
  return (
    <DL title="Controle de Vacinação" activeScreen="s-sd-vacina" onBack={goBack} rightAction={<Btn variant="primary" small onClick={() => goTo('s-sd-visitas')}>Solicitar Visita</Btn>}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
        <StatCard label="Vacinação Atrasada" value="7" sub="Famílias sem atualização" color={C.red} />
        <StatCard label="Em Dia" value="18" sub="Carteira atualizada" color={C.green} />
      </div>
      <AlertBanner variant="yel">7 famílias com vacinação em atraso. Considere visita domiciliar para casos críticos.</AlertBanner>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 8 }}>
        <div>
          <SectionTitle>Vacinação Atrasada</SectionTitle>
          <VacItem icon={<div style={{ background: C.redB, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.red} strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg></div>} name="Luana Silva · 3 anos" meta="Tríplice viral · 6 semanas de atraso" badge="Crítico" badgeVariant="red" onClick={() => goToWith('s-sd-paciente', 'luana')} />
          <VacItem icon={<div style={{ background: C.yelB, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.yel} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>} name="Carlos Ramos · 5 anos" meta="DTP · 3 semanas de atraso" badge="Atenção" badgeVariant="yel" onClick={() => goToWith('s-sd-paciente', 'carlos')} />
          <VacItem icon={<div style={{ background: C.yelB, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.yel} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>} name="João Gomes · 7 anos" meta="Varicela · 2 semanas de atraso" badge="Atenção" badgeVariant="yel" onClick={() => goToWith('s-sd-paciente', 'joao')} />
          <VacItem icon={<div style={{ background: C.yelB, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.yel} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg></div>} name="Família Lima · 2 crianças" meta="Hepatite B · 4 semanas" badge="Atenção" badgeVariant="yel" onClick={() => goToWith('s-sd-paciente', 'souza')} />
        </div>
        <div>
          <SectionTitle>Em Dia</SectionTitle>
          <VacItem icon={<div style={{ background: C.greenL, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.green} strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>} name="Pedro Alves · 4 anos" meta="Todas as doses em dia" badge="OK" badgeVariant="green" onClick={() => goToWith('s-sd-paciente', 'joao')} />
          <VacItem icon={<div style={{ background: C.greenL, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" fill="none" stroke={C.green} strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>} name="Rosa Pereira · 68 anos" meta="Gripe · Pneumonia · Atualizadas" badge="OK" badgeVariant="green" onClick={() => goToWith('s-sd-paciente', 'rosa')} />
        </div>
      </div>
    </DL>
  )
}

// ── SD VISITAS ──
export function SDVisitas() {
  const { goBack, goToWith, openModal } = useNav()
  return (
    <DL title="Visitas Domiciliares" activeScreen="s-sd-visitas" onBack={goBack} rightAction={<Btn variant="primary" small onClick={() => openModal('visita')}>+ Solicitar Visita</Btn>}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
        <StatCard label="Agendadas" value="3" sub="Próximas" color={C.blu} />
        <StatCard label="Urgentes" value="1" sub="Imediata" color={C.red} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <SectionTitle>Pendentes</SectionTitle>
          <VisitItem variant="urgente" name="Luana Silva · 3 anos" badge={<Badge variant="red">Urgente</Badge>} addr="R. das Palmeiras, 114 · Ibura" reason="Vacinação tríplice viral em atraso. Família não comparece." tags={['Hoje', 'ACS: Maria Souza']} onClick={() => goToWith('s-sd-paciente', 'luana')} />
          <VisitItem variant="agendada" name="Rosa Pereira · 68 anos" badge={<Badge variant="blu">Agendada</Badge>} addr="Av. Mustardinha, 320" reason="HAS sem acompanhamento. Dificuldade de locomoção." tags={['16/05', 'Enfermeira']} onClick={() => goToWith('s-sd-paciente', 'rosa')} />
          <VisitItem variant="agendada" name="Família Souza" badge={<Badge variant="blu">Agendada</Badge>} addr="R. do Cajueiro, 57 · Ibura" reason="Triagem inicial. Nova família encaminhada pelo CRAS." tags={['17/05', 'CRAS']} onClick={() => goToWith('s-sd-paciente', 'souza')} />
        </div>
        <div>
          <SectionTitle>Realizadas</SectionTitle>
          <VisitItem variant="realizada" name="Pedro Alves · 4 anos" badge={<Badge variant="green">Realizada</Badge>} addr="R. Nova Esperança, 88" reason="Vacinação atualizada com sucesso. Mãe orientada." tags={['13/05', 'Concluída']} onClick={() => goToWith('s-sd-paciente', 'joao')} />
        </div>
      </div>
    </DL>
  )
}

// ── SD ALERTAS ──
export function SDAlerts() {
  const { goBack, goToWith } = useNav()
  return (
    <DL title="Alertas Clínicos" activeScreen="s-sd-alerts" onBack={goBack}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 24 }}>
        <StatCard label="Críticos" value="3" color={C.red} />
        <StatCard label="Médios" value="5" color={C.yel} />
        <StatCard label="Resolvidos" value="14" color={C.green} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <SectionTitle>Críticos</SectionTitle>
          <AlertItem stripe={C.red} title="Vacinação em Atraso — Luana Silva" desc="Tríplice viral com 6 semanas de atraso. Família não comparece às consultas agendadas." tags={['Crítico', 'Vacinação']} time="Hoje" onClick={() => goToWith('s-sd-paciente', 'luana')} />
          <AlertItem stripe={C.red} title="Suspeita de Desnutrição — Carlos Ramos" desc="Peso abaixo da curva. Necessita avaliação nutricional urgente e encaminhamento ao NASF." tags={['Crítico', 'Nutrição']} time="Há 1 dia" onClick={() => goToWith('s-sd-paciente', 'carlos')} />
          <AlertItem stripe={C.red} title="Consulta Urgente — João Gomes" desc="Segunda falta consecutiva. Suspeita de negligência familiar." tags={['Crítico', 'Falta']} time="Hoje" onClick={() => goToWith('s-sd-paciente', 'joao')} />
        </div>
        <div>
          <SectionTitle>Médios</SectionTitle>
          <AlertItem stripe={C.yel} title="Pré-natal Irregular — Maria Ferreira" desc="2 consultas de pré-natal perdidas consecutivamente. Gestação de 20 semanas." tags={['Médio', 'Pré-natal']} time="Há 2 dias" onClick={() => goToWith('s-sd-paciente', 'maria')} />
          <AlertItem stripe={C.yel} title="Acompanhamento Psicológico — João Gomes" desc="Solicitação ainda sem agendamento. Aguarda vaga no CAPS Infantil." tags={['Médio', 'Saúde Mental']} time="Há 4 dias" onClick={() => goToWith('s-sd-paciente', 'joao')} />
          <AlertItem stripe={C.green} title="Vacinação Atualizada — Pedro Alves" desc="Cartão de vacinas atualizado após visita domiciliar." tags={['Resolvido']} time="13/05" opacity={0.6} onClick={() => goToWith('s-sd-paciente', 'rosa')} />
        </div>
      </div>
    </DL>
  )
}
