import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from './firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { VisaProcessExplanation } from './components/VisaProcessExplanation';
import { ApplicationForm } from './components/ApplicationForm';
import { VisaRenewalDenial } from './components/VisaRenewalDenial';
import { ContractView } from './components/ContractView';
import { PaymentPage } from './components/PaymentPage';
import { VisaApplication, PRICING } from './types';
import { Plane, Shield, Clock, Users, LogIn, LogOut, ChevronRight, CheckCircle2, Zap, XCircle } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'landing' | 'form' | 'contract' | 'payment' | 'success'>('landing');
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [currentApplication, setCurrentApplication] = useState<VisaApplication | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const logout = () => auth.signOut();

  const handleHireClick = () => {
    if (!user) {
      login();
    } else {
      setView('form');
    }
  };

  const handleFormSubmit = (application: VisaApplication) => {
    setCurrentApplication(application);
    setView('contract');
  };

  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-zinc-100 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              B
            </div>
            <span className="text-xl font-bold tracking-tight">Bastos Vistos</span>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-medium">{user.displayName}</span>
                  <button onClick={logout} className="text-xs text-zinc-500 hover:text-red-500 transition-colors">Sair</button>
                </div>
                <img src={user.photoURL || ''} alt="Profile" className="w-10 h-10 rounded-full border border-zinc-200" />
              </div>
            ) : (
              <button
                onClick={login}
                className="flex items-center gap-2 px-6 py-2.5 bg-zinc-900 text-white rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Entrar</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-20"
            >
              {/* Hero Section */}
              <section className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold">
                    <Shield className="w-4 h-4" />
                    Assessoria Especializada
                  </div>
                  <h1 className="text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9] text-zinc-900">
                    Seu Visto Americano <br />
                    <span className="text-emerald-600 italic font-serif font-light">Sem Complicação.</span>
                  </h1>
                  <p className="text-xl text-zinc-600 max-w-xl leading-relaxed">
                    A Bastos Vistos cuida de toda a burocracia para você. Do preenchimento do formulário à preparação para a entrevista.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleHireClick}
                      className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 hover:scale-[1.02] transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
                    >
                      Contratar Assessoria
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-6 px-4">
                      <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map(i => (
                          <img
                            key={i}
                            src={`https://picsum.photos/seed/user${i}/100/100`}
                            className="w-10 h-10 rounded-full border-2 border-white"
                            alt="User"
                          />
                        ))}
                      </div>
                      <div className="text-sm">
                        <div className="font-bold text-zinc-900">+500 Clientes</div>
                        <div className="text-zinc-500">Aprovados este ano</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl rotate-2">
                    <img
                      src="https://picsum.photos/seed/travel/1200/1500"
                      className="w-full h-full object-cover"
                      alt="Travel"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-zinc-100 max-w-[240px] -rotate-3">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                        <Plane className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-zinc-900">Visto Turismo</span>
                    </div>
                    <div className="text-3xl font-bold text-zinc-900">R$ {PRICING.tourist}</div>
                    <div className="text-xs text-zinc-500 mt-1">Assessoria Completa</div>
                  </div>
                </div>
              </section>

              {/* Stats */}
              <section className="grid sm:grid-cols-3 gap-8">
                {[
                  { icon: <Clock />, title: "Rápido", desc: "Agendamento otimizado" },
                  { icon: <Shield />, title: "Seguro", desc: "Dados protegidos" },
                  { icon: <Users />, title: "Suporte", desc: "Acompanhamento 24/7" },
                ].map((stat, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-white border border-zinc-100 flex items-center gap-6">
                    <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center text-emerald-600">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="font-bold text-lg text-zinc-900">{stat.title}</div>
                      <div className="text-zinc-500">{stat.desc}</div>
                    </div>
                  </div>
                ))}
              </section>

              {/* Renewal and Denial Section */}
              <section>
                <VisaRenewalDenial />
              </section>

              {/* Explanation Section */}
              <section id="explanation">
                <VisaProcessExplanation />
              </section>

              {/* Pricing Section */}
              <section className="space-y-12">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-bold tracking-tight">Nossos Serviços</h2>
                  <p className="text-zinc-600">Escolha a assessoria ideal para o seu objetivo.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { type: 'tourist', title: 'Turismo', price: PRICING.tourist, desc: 'Férias, visitas ou negócios rápidos.', features: ['DS-160', 'Agendamento', 'Orientação'] },
                    { type: 'student', title: 'Estudante', price: PRICING.student, desc: 'Cursos, graduação ou intercâmbio.', features: ['Taxa SEVIS', 'Análise I-20', 'Suporte Financeiro'], highlight: true },
                    { type: 'renewal', title: 'Renovação', price: PRICING.renewal, desc: 'Visto vencido há menos de 48 meses.', features: ['Sem Entrevista', 'Processo Rápido', 'Burocracia Zero'] },
                    { type: 'denial_reversal', title: 'Reversão', price: PRICING.denial_reversal, desc: 'Para quem já teve o visto negado.', features: ['Auditoria de Perfil', 'Nova Estratégia', 'Análise de Erros'] },
                  ].map((pkg) => (
                    <div key={pkg.type} className={`p-8 rounded-[32px] border ${pkg.highlight ? 'bg-zinc-900 text-white border-zinc-800' : 'bg-white border-zinc-100'} space-y-6 flex flex-col`}>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">{pkg.title}</h3>
                        <p className={`text-sm ${pkg.highlight ? 'text-zinc-400' : 'text-zinc-500'}`}>{pkg.desc}</p>
                      </div>
                      <div className="text-3xl font-bold">R$ {pkg.price}</div>
                      <ul className="space-y-3 flex-grow">
                        {pkg.features.map(f => (
                          <li key={f} className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className={`w-4 h-4 ${pkg.highlight ? 'text-emerald-400' : 'text-emerald-600'}`} />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={handleHireClick}
                        className={`w-full py-3 rounded-xl font-bold text-sm transition-colors ${pkg.highlight ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-zinc-900 text-white hover:bg-zinc-800'}`}
                      >
                        Contratar
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {view === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ApplicationForm onBack={() => setView('landing')} onNext={handleFormSubmit} />
            </motion.div>
          )}

          {view === 'contract' && currentApplication && (
            <motion.div
              key="contract"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <ContractView 
                application={currentApplication} 
                onNext={() => setView('payment')} 
                onBack={() => setView('form')}
              />
            </motion.div>
          )}

          {view === 'payment' && currentApplication && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <PaymentPage 
                application={currentApplication} 
                onSuccess={() => setView('success')} 
                onBack={() => setView('contract')}
              />
            </motion.div>
          )}

          {view === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-12 rounded-[40px] shadow-sm border border-zinc-100 text-center space-y-6 max-w-2xl mx-auto"
            >
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-zinc-900">Tudo Pronto!</h2>
              <p className="text-zinc-600 leading-relaxed">
                Seu pagamento foi registrado e sua assessoria já está ativa. Nossa equipe entrará em contato via WhatsApp em até 24h úteis para iniciar o preenchimento do seu DS-160.
              </p>
              <button
                onClick={() => setView('landing')}
                className="px-8 py-3 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors"
              >
                Voltar ao Início
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-zinc-100 py-16 print:hidden">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-4 col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white font-bold">B</div>
                <span className="font-bold text-xl">Bastos Vistos</span>
              </div>
              <p className="text-zinc-500 text-sm max-w-md leading-relaxed">
                Assessoria especializada em vistos americanos. Nossa missão é simplificar o processo e aumentar suas chances de aprovação com um método estratégico e humano.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-zinc-900">Serviços</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li>Visto de Turismo</li>
                <li>Visto de Estudante</li>
                <li>Renovação de Visto</li>
                <li>Reversão de Negativa</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-zinc-900">Contato</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li>contato@bastosvistos.com.br</li>
                <li>(11) 99999-9999</li>
                <li>São Paulo, SP</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-100 space-y-8">
            <div className="p-6 bg-zinc-50 rounded-2xl text-[10px] text-zinc-400 leading-relaxed text-center italic">
              Legal Notice - Netvistos is not affiliated with any government agency or department. The costs of consulting services DO NOT include any government application, medical examination, or biometric fees. We are a private travel consulting provider. You can apply directly for visas on the websites of Embassies or Consulates.
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-zinc-500 text-xs font-bold">© BASTOS VISTOS ASSESSORIA – CNPJ 57.448.732/0001-66</p>
              <div className="flex gap-6 text-xs font-medium text-zinc-400">
                <a href="#" className="hover:text-emerald-600 transition-colors">Termos de Uso</a>
                <a href="#" className="hover:text-emerald-600 transition-colors">Política de Privacidade</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
