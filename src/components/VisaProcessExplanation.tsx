import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Info, Calendar, FileText, MapPin, CreditCard, Users, Plane } from 'lucide-react';

export const VisaProcessExplanation: React.FC = () => {
  const flowchartSteps = [
    { title: "Análise de Perfil", desc: "O primeiro passo para a aprovação. Avaliamos seus vínculos e objetivos.", icon: <Users className="w-5 h-5" /> },
    { title: "Perguntas da Entrevista", desc: "Saiba exatamente o que responder com base no seu perfil.", icon: <FileText className="w-5 h-5" /> },
    { title: "Documentação", desc: "Nenhum detalhe pode faltar. Checklist completo e revisado.", icon: <CheckCircle2 className="w-5 h-5" /> },
    { title: "Formulário DS-160", desc: "Preenchimento impecável, sem erros que causam negativas.", icon: <FileText className="w-5 h-5" /> },
    { title: "Taxa MRV", desc: "Pagamento correto para liberação imediata do agendamento.", icon: <CreditCard className="w-5 h-5" /> },
    { title: "Agendamento", desc: "Datas estratégicas para você, monitoradas 24h por dia.", icon: <Calendar className="w-5 h-5" /> },
    { title: "CASV", desc: "O que você precisa saber antes de ir para a coleta de dados.", icon: <MapPin className="w-5 h-5" /> },
    { title: "Entrevista", desc: "O momento mais decisivo! Você estará 100% preparado.", icon: <Plane className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 space-y-12">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Fluxograma da Aprovação</h2>
        <p className="text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          Nosso método exclusivo cobre cada detalhe do processo, garantindo que você chegue na entrevista com total confiança.
        </p>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-100 -translate-y-1/2 z-0" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {flowchartSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm hover:border-emerald-200 transition-all group"
            >
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                {step.icon}
              </div>
              <div className="text-xs font-bold text-emerald-600 mb-1 uppercase tracking-wider">Passo {index + 1}</div>
              <h3 className="font-bold text-zinc-900 mb-2">{step.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-100 space-y-6">
        <div className="flex items-center gap-2 text-emerald-800 font-bold">
          <Info className="w-5 h-5" />
          <h4>Diferenças Importantes</h4>
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <h5 className="font-bold text-emerald-900">Turismo (B1/B2)</h5>
            <ul className="space-y-1 text-emerald-800">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Válido por até 10 anos</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Foco em lazer e negócios</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Prova de vínculos no Brasil</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-emerald-900">Estudante (F1)</h5>
            <ul className="space-y-1 text-emerald-800">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Requer formulário I-20 da escola</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Taxa SEVIS adicional</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Prova de suporte financeiro</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
