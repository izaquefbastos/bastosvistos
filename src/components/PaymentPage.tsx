import React from 'react';
import { VisaApplication, PRICING } from '../types';
import { CreditCard, QrCode, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PaymentPageProps {
  application: VisaApplication;
  onSuccess: () => void;
  onBack: () => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ application, onSuccess, onBack }) => {
  const price = PRICING[application.visaType];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors font-medium"
        >
          Voltar ao Contrato
        </button>
      </div>
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold tracking-tight text-zinc-900">Pagamento da Assessoria</h2>
        <p className="text-zinc-600">Escolha a forma de pagamento para darmos início ao seu processo.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* PIX Option */}
        <div className="bg-white p-10 rounded-[40px] border-2 border-emerald-100 shadow-sm space-y-8 relative overflow-hidden group">
          <div className="absolute top-6 right-6 px-4 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">RECOMENDADO</div>
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <QrCode className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Pagamento via PIX</h3>
            <p className="text-zinc-500 text-sm">Liberação imediata do seu processo.</p>
          </div>
          <div className="text-4xl font-bold text-zinc-900">
            R$ {price.toFixed(2)}
          </div>
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 flex flex-col items-center space-y-4">
            <div className="w-48 h-48 bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
              <img src="https://picsum.photos/seed/pix/400/400" alt="QR Code PIX" className="w-full h-full object-contain opacity-50 grayscale" />
            </div>
            <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 underline underline-offset-4">Copiar Código PIX</button>
          </div>
          <button
            onClick={onSuccess}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
          >
            Já realizei o pagamento
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Credit Card Option */}
        <div className="bg-white p-10 rounded-[40px] border border-zinc-100 shadow-sm space-y-8 group">
          <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:text-emerald-600 transition-colors">
            <CreditCard className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Cartão de Crédito</h3>
            <p className="text-zinc-500 text-sm">Parcele em até 12x (com juros).</p>
          </div>
          <div className="text-4xl font-bold text-zinc-900">
            R$ {price.toFixed(2)}
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Número do Cartão</label>
              <div className="w-full h-12 bg-zinc-50 rounded-xl border border-zinc-200" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Validade</label>
                <div className="w-full h-12 bg-zinc-50 rounded-xl border border-zinc-200" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">CVV</label>
                <div className="w-full h-12 bg-zinc-50 rounded-xl border border-zinc-200" />
              </div>
            </div>
          </div>
          <button
            disabled
            className="w-full py-4 bg-zinc-100 text-zinc-400 rounded-2xl font-bold cursor-not-allowed"
          >
            Pagar com Cartão
          </button>
          <p className="text-[10px] text-zinc-400 text-center italic">Pagamento via cartão indisponível no momento. Utilize o PIX para liberação imediata.</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 py-8 border-t border-zinc-100">
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          Pagamento 100% Seguro
        </div>
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          Dados Criptografados
        </div>
      </div>
    </div>
  );
};
