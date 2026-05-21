import React from 'react'
import { useNav } from './context'
import { Btn, FormRow, Input, Select, Textarea, AlertBanner, C } from './ui'

function ModalSheet({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="cv-modal-overlay" onClick={onClose}>
      <div className="cv-modal-sheet" onClick={e => e.stopPropagation()}>
        <div style={{ width: 36, height: 4, background: C.bd, borderRadius: 2, margin: '0 auto 16px' }} />
        {children}
      </div>
    </div>
  )
}

// ── Modal: Agendar Consulta ──
function ModalAgendar({ onClose }: { onClose: () => void }) {
  return (
    <ModalSheet onClose={onClose}>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Agendar Consulta</div>
      <FormRow label="Paciente / Família"><Input placeholder="Nome ou CPF" /></FormRow>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.t2, marginBottom: 5 }}>Data</label>
          <Input type="date" />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.t2, marginBottom: 5 }}>Horário</label>
          <Input type="time" />
        </div>
      </div>
      <FormRow label="Tipo de Consulta"><Select options={['Rotina', 'Urgente', 'Retorno', 'Especialista']} /></FormRow>
      <FormRow label="Observações"><Textarea placeholder="Motivo da consulta…" /></FormRow>
      <Btn variant="primary" onClick={onClose}>Confirmar Agendamento</Btn>
      <Btn variant="secondary" onClick={onClose}>Cancelar</Btn>
    </ModalSheet>
  )
}

// ── Modal: Encaminhamento ──
function ModalEnc({ onClose }: { onClose: () => void }) {
  return (
    <ModalSheet onClose={onClose}>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Novo Encaminhamento</div>
      <FormRow label="Paciente / Família"><Input placeholder="Nome ou CPF" /></FormRow>
      <FormRow label="Secretaria / Serviço">
        <Select options={['CRAS – Assistência Social', 'UBS – Saúde', 'CAPS Infantil', 'NASF – Nutrição', 'Escola', 'Psicologia']} />
      </FormRow>
      <FormRow label="Prioridade"><Select options={['Urgente', 'Médio', 'Rotina']} /></FormRow>
      <FormRow label="Motivo"><Textarea placeholder="Descreva o motivo do encaminhamento…" /></FormRow>
      <Btn variant="primary" onClick={onClose}>Enviar Encaminhamento</Btn>
      <Btn variant="secondary" onClick={onClose}>Cancelar</Btn>
    </ModalSheet>
  )
}

// ── Modal: Registrar Falta ──
function ModalFalta({ onClose }: { onClose: () => void }) {
  return (
    <ModalSheet onClose={onClose}>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Registrar Falta</div>
      <FormRow label="Aluno"><Input placeholder="Nome do aluno" /></FormRow>
      <FormRow label="Data"><Input type="date" /></FormRow>
      <FormRow label="Justificativa">
        <Select options={['Não justificada', 'Atestado médico', 'Evento familiar', 'Outro']} />
      </FormRow>
      <FormRow label="Observações"><Textarea placeholder="Observações adicionais…" /></FormRow>
      <Btn variant="primary" onClick={onClose}>Registrar Falta</Btn>
      <Btn variant="secondary" onClick={onClose}>Cancelar</Btn>
    </ModalSheet>
  )
}

// ── Modal: Alerta de Evasão ──
function ModalEvasao({ onClose }: { onClose: () => void }) {
  return (
    <ModalSheet onClose={onClose}>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: C.red }}>⚠ Alerta de Evasão Escolar</div>
      <AlertBanner variant="red">Este alerta será enviado ao CRAS e à Secretaria de Educação.</AlertBanner>
      <FormRow label="Aluno"><Input placeholder="Nome do aluno" value="João Gomes" /></FormRow>
      <FormRow label="Número de Faltas"><Input type="number" value="8" /></FormRow>
      <FormRow label="Justificativa para o Alerta"><Textarea placeholder="Descreva a situação de risco…" /></FormRow>
      <Btn variant="danger" onClick={onClose}>Gerar Alerta de Evasão</Btn>
      <Btn variant="secondary" onClick={onClose}>Cancelar</Btn>
    </ModalSheet>
  )
}

// ── Modal: Solicitar Visita ──
function ModalVisita({ onClose }: { onClose: () => void }) {
  return (
    <ModalSheet onClose={onClose}>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Solicitar Visita Domiciliar</div>
      <FormRow label="Paciente / Família"><Input placeholder="Nome ou CPF" /></FormRow>
      <FormRow label="Endereço Completo"><Input placeholder="Rua, número, bairro, referência…" /></FormRow>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.t2, marginBottom: 5 }}>Data Sugerida</label>
          <Input type="date" />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.t2, marginBottom: 5 }}>Prioridade</label>
          <Select options={['Urgente', 'Médio', 'Rotina']} />
        </div>
      </div>
      <FormRow label="Motivo">
        <Select options={['Vacinação em atraso', 'Falta às consultas', 'Difícil acesso à UBS', 'Triagem inicial']} />
      </FormRow>
      <FormRow label="Observações ao ACS"><Textarea placeholder="Informações para quem vai realizar a visita…" /></FormRow>
      <Btn variant="primary" onClick={onClose}>Solicitar Visita</Btn>
      <Btn variant="secondary" onClick={onClose}>Cancelar</Btn>
    </ModalSheet>
  )
}

// ── Modals Router ──
export function Modals({ activeModal }: { activeModal: string | null }) {
  const { closeModal } = useNav()
  if (!activeModal) return null
  return (
    <>
      {activeModal === 'agendar' && <ModalAgendar onClose={closeModal} />}
      {activeModal === 'enc' && <ModalEnc onClose={closeModal} />}
      {activeModal === 'falta' && <ModalFalta onClose={closeModal} />}
      {activeModal === 'evasao' && <ModalEvasao onClose={closeModal} />}
      {activeModal === 'visita' && <ModalVisita onClose={closeModal} />}
    </>
  )
}
