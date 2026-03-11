import React from 'react';
import { VisaApplication, PRICING } from '../types';
import { Printer, Download, Check } from 'lucide-react';

interface ContractViewProps {
  application: VisaApplication;
  onNext: () => void;
  onBack: () => void;
}

export const ContractView: React.FC<ContractViewProps> = ({ application, onNext, onBack }) => {
  const date = new Date().toLocaleDateString('pt-BR');
  const price = PRICING[application.visaType];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-white p-12 rounded-3xl shadow-sm border border-zinc-100 space-y-8 print:shadow-none print:border-none print:p-0">
        <div className="text-center space-y-2 border-b border-zinc-100 pb-8">
          <h1 className="text-2xl font-bold uppercase tracking-widest">Contrato de Prestação de Serviços</h1>
          <p className="text-zinc-500 text-sm">BASTOS VISTOS ASSESSORIA – CNPJ 57.448.732/0001-66</p>
        </div>

        <div className="space-y-6 text-sm text-zinc-800 leading-relaxed">
          <section>
            <h2 className="font-bold mb-2">1. DAS PARTES</h2>
            <p>
              <strong>CONTRATADA:</strong> BASTOS VISTOS ASSESSORIA, inscrita no CNPJ sob o nº 57.448.732/0001-66.
            </p>
            <p className="mt-2">
              <strong>CONTRATANTE:</strong> {application.fullName}, CPF nº {application.taxId}, residente e domiciliado em {application.address}.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-2">2. DO OBJETO</h2>
            <p>
              O presente contrato tem como objeto a prestação de serviços de assessoria e consultoria para solicitação de visto americano na modalidade <strong>{application.visaType.toUpperCase()}</strong>.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-2">3. DOS VALORES</h2>
            <p>
              Pela prestação dos serviços descritos, o CONTRATANTE pagará à CONTRATADA o valor de <strong>R$ {price.toFixed(2)}</strong>.
            </p>
            <p className="mt-2 text-xs text-zinc-500 italic">
              * Nota: Este valor refere-se exclusivamente aos serviços de consultoria da BASTOS VISTOS e NÃO inclui taxas consulares (MRV), taxas SEVIS, exames médicos ou quaisquer outras taxas governamentais.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-2">4. DAS OBRIGAÇÕES</h2>
            <p>
              A CONTRATADA compromete-se a realizar o preenchimento do formulário DS-160, realizar os agendamentos necessários e fornecer orientações para a entrevista. O CONTRATANTE compromete-se a fornecer informações verídicas e comparecer aos agendamentos.
            </p>
          </section>

          <div className="pt-12 flex flex-col items-center space-y-8">
            <p>São Paulo, {date}</p>
            
            <div className="grid grid-cols-2 gap-20 w-full max-w-2xl pt-12">
              <div className="border-t border-zinc-900 pt-2 text-center">
                <p className="font-bold text-xs">BASTOS VISTOS ASSESSORIA</p>
                <p className="text-[10px] text-zinc-500">CONTRATADA</p>
              </div>
              <div className="border-t border-zinc-900 pt-2 text-center">
                <p className="font-bold text-xs">{application.fullName.toUpperCase()}</p>
                <p className="text-[10px] text-zinc-500">CONTRATANTE</p>
                <div className="mt-2 flex items-center justify-center gap-1 text-emerald-600 font-bold text-[10px]">
                  <Check className="w-3 h-3" />
                  ASSINADO DIGITALMENTE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center print:hidden">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-zinc-100 text-zinc-900 rounded-2xl font-bold hover:bg-zinc-200 transition-colors"
        >
          Voltar
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-zinc-100 text-zinc-900 rounded-2xl font-bold hover:bg-zinc-200 transition-colors"
        >
          <Printer className="w-5 h-5" />
          Imprimir Contrato
        </button>
        <button
          onClick={onNext}
          className="flex items-center justify-center gap-2 px-12 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
        >
          Prosseguir para Pagamento
        </button>
      </div>
    </div>
  );
};
