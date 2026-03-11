import React, { useState } from 'react';
import { motion } from 'motion/react';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { VisaType, PRICING, VisaApplication } from '../types';
import { CameraCapture } from './CameraCapture';
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react';

interface ApplicationFormProps {
  onBack: () => void;
  onNext: (application: VisaApplication) => void;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ onBack, onNext }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    taxId: '',
    visaType: 'tourist' as VisaType,
  });
  const [passportPhoto, setPassportPhoto] = useState<string | null>(null);
  const [idPhoto, setIdPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("Por favor, faça login para continuar.");
      return;
    }

    setIsSubmitting(true);
    try {
      const applicationData: VisaApplication = {
        ...formData,
        passportPhotoUrl: passportPhoto || undefined,
        idPhotoUrl: idPhoto || undefined,
        createdAt: Date.now(),
        status: 'pending',
        uid: auth.currentUser.uid,
      };
      
      await addDoc(collection(db, 'applications'), applicationData);
      onNext(applicationData);
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Erro ao enviar solicitação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 space-y-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-500 hover:text-zinc-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar</span>
      </button>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Contratar Assessoria</h2>
        <p className="text-zinc-600">Preencha os dados abaixo para iniciarmos seu processo.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700">Nome Completo</label>
            <input
              required
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              placeholder="Como no passaporte"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700">E-mail</label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              placeholder="seu@email.com"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700">Telefone (WhatsApp)</label>
            <input
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              placeholder="(00) 00000-0000"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700">CPF</label>
            <input
              required
              type="text"
              value={formData.taxId}
              onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              placeholder="000.000.000-00"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-zinc-700">Endereço Completo</label>
            <input
              required
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              placeholder="Rua, Número, Bairro, Cidade, Estado, CEP"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-zinc-700">Tipo de Visto</label>
            <select
              value={formData.visaType}
              onChange={(e) => setFormData({ ...formData, visaType: e.target.value as VisaType })}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white"
            >
              <option value="tourist">Turismo (R$ {PRICING.tourist})</option>
              <option value="student">Estudante (R$ {PRICING.student})</option>
              <option value="renewal">Renovação (R$ {PRICING.renewal})</option>
              <option value="denial_reversal">Reversão de Negativa (R$ {PRICING.denial_reversal})</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <CameraCapture label="Foto do Passaporte" onCapture={setPassportPhoto} />
          <CameraCapture label="Foto do RG / CNH" onCapture={setIdPhoto} />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Enviando...</span>
            </>
          ) : (
            <span>Finalizar e Contratar Assessoria</span>
          )}
        </button>
      </form>
    </div>
  );
};
