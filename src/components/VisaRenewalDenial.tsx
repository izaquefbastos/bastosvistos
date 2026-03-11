import React from 'react';
import { motion } from 'motion/react';
import { RefreshCw, XCircle, Zap, ShieldCheck, Search } from 'lucide-react';

export const VisaRenewalDenial: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Renewal Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="p-10 rounded-[40px] bg-white border border-zinc-100 space-y-6 relative overflow-hidden group"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl group-hover:bg-emerald-100 transition-colors" />
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
          <RefreshCw className="w-8 h-8" />
        </div>
        <h3 className="text-3xl font-bold text-zinc-900 leading-tight">
          Renovação Ultra-Rápida <br />
          <span className="text-emerald-600 italic">Sem Entrevista</span>
        </h3>
        <p className="text-zinc-600 leading-relaxed">
          Seu visto ainda está válido ou venceu há menos de 48 meses? Você pode renovar <strong>sem precisar passar pela entrevista consular</strong>. 
          Nós cuidamos de todo o processo burocrático em tempo recorde.
        </p>
        <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
          <Zap className="w-5 h-5 text-amber-500" />
          <div className="text-sm">
            <div className="font-bold text-zinc-900">Apenas R$ 250</div>
            <div className="text-zinc-500">Assessoria completa de renovação</div>
          </div>
        </div>
      </motion.div>

      {/* Denial Reversal Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="p-10 rounded-[40px] bg-zinc-900 text-white space-y-6 relative overflow-hidden group"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-4">
          <XCircle className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-3xl font-bold leading-tight">
          Teve o Visto Negado? <br />
          <span className="text-emerald-400 italic">Nós Revertemos.</span>
        </h3>
        <p className="text-zinc-400 leading-relaxed">
          Uma negativa não é o fim do seu sonho. Realizamos uma <strong>auditoria minuciosa</strong> no seu formulário anterior para identificar o erro exato e traçar uma nova estratégia vencedora para sua próxima tentativa.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <Search className="w-4 h-4 text-emerald-400" />
            Auditoria de Perfil
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Nova Estratégia
          </div>
        </div>
      </motion.div>
    </div>
  );
};
