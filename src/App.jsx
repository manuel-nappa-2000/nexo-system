import { useState, useEffect } from 'react'

import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'

import { Particles } from './components/Particles'

import { 

  ShoppingCart, Wrench, Shirt, CheckCircle, AlertTriangle, 

  TrendingDown, Clock, FileText, Server, Zap, MessageCircle 

} from 'lucide-react'


// --- COMPONENTE: PROGRESS BAR NEON ---
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-brand z-[100] origin-left shadow-[0_0_20px_rgba(0,240,255,0.8)]"
      style={{ scaleX }}
    />
  );
};

// --- COMPONENTE: EFFETTO RIVELAZIONE 3D (SCROLL REVEAL) ---
const RevealSection = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.9, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8, delay: delay, type: "spring", bounce: 0.4 }}
      className="w-full perspective-1000"
    >
      {children}
    </motion.div>
  );
};

function App() {

  const [activeTab, setActiveTab] = useState('inventario');

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  

  // Stati per il form di contatto

  const [formData, setFormData] = useState({

    nome: '',

    email: '',

    telefono: '',

    tipoSoluzione: '',

    descrizione: ''

  });

  const [formErrors, setFormErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [faqOpen, setFaqOpen] = useState(null);

  

  // Stati per il calcolatore interattivo

  const [calculatorValues, setCalculatorValues] = useState({

    oreGiorno: 0.5,

    canoneMensile: 100,

    clientiPersi: 2

  });

  // Effetto parallasse cursore

  useEffect(() => {

      const handleMouseMove = (e) => {

          setMousePos({ x: e.clientX, y: e.clientY });

      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => window.removeEventListener('mousemove', handleMouseMove);

  }, []);

  // Scroll Smooth

  const smoothScrollTo = (id) => {

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  };

  // Funzione per aprire WhatsApp

  const openWhatsApp = (message = '') => {

    const whatsappBaseURL = 'https://wa.me/message/MAHRMXO665OJO1';

    if (message) {

      const encodedMessage = encodeURIComponent(message);

      const whatsappURL = `${whatsappBaseURL}?text=${encodedMessage}`;

      window.open(whatsappURL, '_blank');

    } else {

      window.open(whatsappBaseURL, '_blank');

    }

  };

  // Gestione form di contatto

  const handleFormChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    if (formErrors[name]) {

      setFormErrors(prev => ({ ...prev, [name]: '' }));

    }

  };

  const validateForm = () => {

    const errors = {};

    

    if (!formData.nome.trim()) {

      errors.nome = 'Il nome è obbligatorio';

    }

    

    if (!formData.email.trim() && !formData.telefono.trim()) {

      errors.contatto = 'Inserisci almeno email o telefono';

    }

    

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {

      errors.email = 'Email non valida';

    }

    

    if (formData.telefono && !/^[\d\s\+\-\(\)]+$/.test(formData.telefono)) {

      errors.telefono = 'Telefono non valido';

    }

    

    if (!formData.tipoSoluzione) {

      errors.tipoSoluzione = 'Seleziona il tipo di soluzione';

    }

    

    setFormErrors(errors);

    return Object.keys(errors).length === 0;

  };

  const handleFormSubmit = (e) => {

    e.preventDefault();

    

    if (!validateForm()) {

      return;

    }

    

    setIsSubmitting(true);

    

    setTimeout(() => {

      let message = `Ciao! Vorrei un preventivo per NEXO System.\n\n`;

      message += `📋 DATI CLIENTE:\n`;

      message += `Nome: ${formData.nome}\n`;

      if (formData.email) message += `Email: ${formData.email}\n`;

      if (formData.telefono) message += `Telefono: ${formData.telefono}\n`;

      message += `\n💼 TIPO DI SOLUZIONE:\n${formData.tipoSoluzione}\n`;

      if (formData.descrizione) {

        message += `\n📝 DESCRIZIONE:\n${formData.descrizione}\n`;

      }

      

      openWhatsApp(message);

      

      setFormData({

        nome: '',

        email: '',

        telefono: '',

        tipoSoluzione: '',

        descrizione: ''

      });

      

      setIsSubmitting(false);

    }, 800);

  };

  const toggleFaq = (index) => {

    setFaqOpen(faqOpen === index ? null : index);

  };

  return (

      <div className="min-h-screen relative font-body text-white bg-dark overflow-x-hidden selection:bg-brand selection:text-black">

          {/* Progress Bar Neon */}
          <ScrollProgress />

          {/* Particles Background */}
          <Particles
            className="fixed inset-0 z-[-2]"
            quantity={150}
            ease={100}
            color="#00F0FF"
            refresh
          />

          {/* Griglia Sfondo CSS */}
          <div className="fixed inset-0 z-[-3] noise-pattern opacity-20"></div>

          <div className="fixed inset-0 z-[-4] bg-dark"></div>

          


          {/* HEADER */}
          <nav className="fixed w-full z-50 px-6 py-4 bg-black/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                  
                  {/* LOGO NEXO SYSTEM - Una riga con animazione X */}
                  <div className="flex items-center group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-head font-black tracking-tight leading-none relative">
                          <span className="text-brand">NE</span>
                          <span className="text-brand inline-block animate-x-move">X</span>
                          <span className="text-brand">O</span>
                          <span className="text-white ml-2">SYSTEM</span>
                      </h1>
                  </div>

                  <button onClick={() => openWhatsApp()} className="bg-white text-black hover:bg-brand hover:text-black px-5 py-2 font-bold uppercase text-xs md:text-sm tracking-widest transition duration-300 clip-path-polygon rounded-sm flex items-center gap-2 shadow-lg hover:shadow-brand/50">
                      <MessageCircle size={16} /> <span className="hidden md:inline">Parla con me</span>
                  </button>
              </div>
          </nav>

          {/* HERO SECTION */}

          <section className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">

              {/* Sfera interattiva */}

              <div 

                  className="absolute w-[600px] h-[600px] bg-brand/10 rounded-full blur-[120px] -z-10 pointer-events-none transition-transform duration-100 ease-out"

                  style={{ transform: `translate(${mousePos.x / 40}px, ${mousePos.y / 40}px)` }}

              ></div>

              <motion.div 

                initial={{ opacity: 0, y: -20 }} 

                animate={{ opacity: 1, y: 0 }}

                className="inline-block border border-danger/50 bg-danger/10 text-danger px-4 py-1 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6 animate-pulse"

              >

                  ⚠ Attenzione: Stai perdendo soldi

              </motion.div>

              <h1 className="text-5xl md:text-8xl font-head font-black leading-[0.9] mb-8 relative z-10">

                  IL TUO BUSINESS<br/>

                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-blue-600 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">AUTONOMO</span>

              </h1>

              <p className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed relative z-10">

                  NEXO System crea software gestionali che <span className="text-white font-bold border-b-2 border-brand">uccidono la carta</span>.

                  <br/>Zero Canone. Zero Scuse.

              </p>

              <div className="flex flex-col md:flex-row gap-6 items-center w-full justify-center relative z-10">

                  <button onClick={() => smoothScrollTo('demo')} className="group relative px-10 py-5 bg-brand text-black font-black text-xl uppercase tracking-wider overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.3)] rounded-sm hover:scale-105 transition-transform cursor-pointer">

                      Voglio Vedere Come

                  </button>

              </div>

          </section>

          {/* PAIN AGITATION */}
          <RevealSection delay={0.1}>
          <section className="py-24 px-6 bg-black/50 border-y border-white/5 relative">

              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

      <div>

                      <h2 className="text-4xl md:text-6xl font-head font-bold mb-8">

                          La tua azienda <br/><span className="text-danger drop-shadow-[0_0_15px_rgba(255,46,99,0.5)]">SANGUINA?</span>

                      </h2>

                      <div className="space-y-6">

                          <div className="group p-6 border border-white/10 hover:border-danger/50 bg-white/5 hover:bg-danger/5 transition duration-300 cursor-default rounded-xl">

                              <div className="flex items-center justify-between mb-2">

                                  <h3 className="font-bold text-xl flex gap-2 items-center"><TrendingDown className="text-danger"/> Emorragia Mensile</h3>

                              </div>

                              <p className="text-gray-400 text-sm">Paghi canoni per software che non sono tuoi. In 5 anni butti €6.000.</p>

                          </div>

                          <div className="group p-6 border border-white/10 hover:border-danger/50 bg-white/5 hover:bg-danger/5 transition duration-300 cursor-default rounded-xl">

                              <div className="flex items-center justify-between mb-2">

                                  <h3 className="font-bold text-xl flex gap-2 items-center"><FileText className="text-danger"/> Caos Cartaceo</h3>

                              </div>

                              <p className="text-gray-400 text-sm">Ordini persi sui foglietti? Se non trovi un dato in 3 secondi, perdi clienti.</p>

                          </div>

                      </div>

                  </div>

                  

                  <div className="relative h-[400px] bg-gradient-to-br from-danger/20 to-transparent rounded-3xl border border-danger/30 flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(255,46,99,0.2)]">

                      <div className="text-center z-10">

                          <div className="text-6xl font-black text-white mb-2 animate-pulse">- € 6.000</div>

                          <div className="text-danger font-mono uppercase tracking-widest">Soldi bruciati in canoni</div>

                      </div>

                  </div>

              </div>

          </section>
          </RevealSection>

          {/* CALCOLATORE INTERATTIVO */}
          <RevealSection delay={0.2}>
          <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-dark via-black to-dark">

              <div className="max-w-6xl mx-auto">

                  <div className="text-center mb-12">

                      <div className="inline-block border border-brand/50 bg-brand/10 text-brand px-4 py-1 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6 animate-pulse">

                          ⚡ Calcolatore Interattivo

                      </div>

                      <h2 className="text-4xl md:text-6xl font-head font-bold mb-4">

                          Calcola Quanto Stai <span className="text-danger">Perdendo</span> Ogni Anno

                      </h2>

                      <p className="text-gray-400 text-lg max-w-2xl mx-auto">

                          Muovi gli slider e scopri in tempo reale quanto denaro stai buttando via.

                      </p>

                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-12">

                      <div className="bg-[#0A0A0F] border border-white/10 rounded-2xl p-8">

                          <h3 className="text-2xl font-bold mb-6 text-white">I Tuoi Dati</h3>

                          

                          <div className="mb-8">

                              <div className="flex justify-between items-center mb-3">

                                  <label className="text-white font-bold">Ore perse al giorno</label>

                                  <span className="text-brand font-mono text-xl font-bold">{calculatorValues.oreGiorno}h</span>

                              </div>

                              <input type="range" min="0.5" max="4" step="0.5" value={calculatorValues.oreGiorno} onChange={(e) => setCalculatorValues(prev => ({ ...prev, oreGiorno: parseFloat(e.target.value) }))} className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand" />

                          </div>

                          <div className="mb-8">

                              <div className="flex justify-between items-center mb-3">

                                  <label className="text-white font-bold">Canone mensile software</label>

                                  <span className="text-brand font-mono text-xl font-bold">€ {calculatorValues.canoneMensile}</span>

                              </div>

                              <input type="range" min="0" max="300" step="10" value={calculatorValues.canoneMensile} onChange={(e) => setCalculatorValues(prev => ({ ...prev, canoneMensile: parseInt(e.target.value) }))} className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand" />

                          </div>

                          <div className="mb-8">

                              <div className="flex justify-between items-center mb-3">

                                  <label className="text-white font-bold">Clienti persi all'anno</label>

                                  <span className="text-brand font-mono text-xl font-bold">{calculatorValues.clientiPersi}</span>

                              </div>

                              <input type="range" min="0" max="10" step="1" value={calculatorValues.clientiPersi} onChange={(e) => setCalculatorValues(prev => ({ ...prev, clientiPersi: parseInt(e.target.value) }))} className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand" />

                          </div>

                      </div>

                      <div className="space-y-6">

                          {/* Totale Perdita */}

                          <motion.div

                              initial={{ opacity: 0, y: 20 }}

                              animate={{ opacity: 1, y: 0 }}

                              transition={{ duration: 0.5 }}

                              className="bg-gradient-to-br from-danger/30 to-danger/10 border-2 border-danger rounded-3xl p-10 relative overflow-hidden h-full flex flex-col justify-center items-center"

                          >

                              <div className="absolute inset-0 opacity-20 carbon-fibre"></div>

                              <div className="relative z-10 text-center">

                                  <div className="text-sm text-gray-400 mb-4 uppercase tracking-widest">Totale Perdita Annuale</div>

                                  <div className="text-6xl md:text-7xl font-black text-white mb-4 glitch" data-text={`€ ${(Math.round(calculatorValues.oreGiorno * 20 * 12 * 25) + (calculatorValues.canoneMensile * 12) + (calculatorValues.clientiPersi * 1000)).toLocaleString('it-IT')}`}>

                                      € {(Math.round(calculatorValues.oreGiorno * 20 * 12 * 25) + (calculatorValues.canoneMensile * 12) + (calculatorValues.clientiPersi * 1000)).toLocaleString('it-IT')}

                                  </div>

                                  <div className="text-danger font-bold text-xl uppercase tracking-widest mb-6">

                                      Buttati via ogni anno

                                  </div>

                              </div>

                          </motion.div>

                      </div>

                  </div>

      </div>

          </section>
          </RevealSection>

          {/* THE SOLUTION */}
          <RevealSection delay={0.3}>
          <section id="demo" className="py-32 px-6 text-center">

              <div className="inline-block text-brand font-mono mb-4 tracking-widest">SYSTEM CORE: NEXO_V1</div>

              <h2 className="text-4xl md:text-6xl font-head font-bold mb-16">

                  Non vendo software.<br/>

                  Vendo <span className="text-brand drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">Tempo Libero.</span>

              </h2>

              <div className="max-w-5xl mx-auto bg-[#0A0A0F] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative group">

                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand via-purple-500 to-brand animate-pulse"></div>

                  

                  <div className="flex border-b border-white/10 overflow-x-auto">

                      {['inventario', 'prenotazioni', 'pos', 'app'].map((tab) => (

                        <button 

                          key={tab}

                          onClick={() => setActiveTab(tab)} 

                          className={`flex-1 py-4 font-bold text-sm uppercase tracking-widest hover:bg-white/5 transition whitespace-nowrap px-4 ${activeTab === tab ? 'text-brand bg-white/5 border-b-2 border-brand' : 'text-gray-500'}`}

                        >

                          {tab === 'inventario' ? 'Inventario' : tab === 'prenotazioni' ? 'Prenotazioni' : tab === 'pos' ? 'POS' : 'App Mobile'}

        </button>

                      ))}

                  </div>

                  <div className="p-8 md:p-12 min-h-[450px] bg-neutral-900/50 text-left">

                      <AnimatePresence mode='wait'>

                        {activeTab === 'inventario' && (
                            <motion.div 
                              key="inventario"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <div className="text-left">
                                        <h3 className="text-2xl font-bold text-white">Gestione Inventario con Codice a Barre/QR</h3>
                                        <p className="text-brand text-sm">Scansiona, traccia, controlla in tempo reale</p>
                                    </div>
                                    <div className="text-4xl">📱</div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 text-left">
                                    <div className="p-5 bg-dark border border-brand/30 rounded-lg hover:bg-brand/10 transition">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-brand/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h-1m-6 0h1m6 0v-1m-6 1h.01M19 10h-1m1-1v1m-1 1h.01M12 7h.01M7 10H6m1 1h.01M7 7h.01" />
                                                </svg>
                                            </div>
                                            <div className="text-xs text-brand uppercase font-bold">Scansione QR/Barre</div>
                                        </div>
                                        <div className="font-bold text-white mb-2">Scanner Integrato</div>
                                        <div className="text-sm text-gray-400">Usa la fotocamera del telefono o tablet per scansionare codici. Funziona anche con scanner esterni USB.</div>
                                    </div>
                                    <div className="p-5 bg-dark border border-brand/30 rounded-lg hover:bg-brand/10 transition relative overflow-hidden">
                                        <div className="absolute inset-0 bg-brand/10 animate-pulse"></div>
                                        <div className="flex items-center gap-3 mb-3 relative z-10">
                                            <div className="w-10 h-10 bg-brand/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </div>
                                            <div className="text-xs text-brand uppercase font-bold">Inventario Real-time</div>
                                        </div>
                                        <div className="font-bold text-white mb-2 relative z-10">Aggiornamento Istantaneo</div>
                                        <div className="text-sm text-gray-400 relative z-10">Ogni scansione aggiorna immediatamente il database. Vedi subito quantità disponibili, ubicazioni, movimenti.</div>
                                    </div>
                                    <div className="p-5 bg-dark border border-brand/30 rounded-lg hover:bg-brand/10 transition">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-brand/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <div className="text-xs text-brand uppercase font-bold">Report Automatici</div>
                                        </div>
                                        <div className="font-bold text-white mb-2">Storico Completo</div>
                                        <div className="text-sm text-gray-400">Traccia ogni movimento: entrate, uscite, trasferimenti. Report PDF esportabili per contabilità.</div>
                                    </div>
                                    <div className="p-5 bg-dark border border-brand/30 rounded-lg hover:bg-brand/10 transition">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-brand/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="text-xs text-brand uppercase font-bold">Allarmi Stock</div>
                                        </div>
                                        <div className="font-bold text-white mb-2">Notifiche Automatiche</div>
                                        <div className="text-sm text-gray-400">Ricevi avvisi quando un prodotto scende sotto la soglia minima. Mai più prodotti esauriti.</div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'prenotazioni' && (
                            <motion.div 
                              key="prenotazioni"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <div className="text-left">
                                        <h3 className="text-2xl font-bold text-white">Sistema Prenotazioni per Barbieri/Parrucchieri</h3>
                                        <p className="text-orange-500 text-sm">Gestione appuntamenti automatica e professionale</p>
                                    </div>
                                    <div className="text-4xl">✂️</div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 text-left">
                                    <div className="p-5 bg-dark border border-orange-500/30 rounded-lg hover:bg-orange-500/10 transition">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="text-xs text-orange-500 uppercase font-bold">Calendario Interattivo</div>
                                        </div>
                                        <div className="font-bold text-white mb-2">Vista Giornaliera/Settimanale</div>
                                        <div className="text-sm text-gray-400">Vedi tutti gli appuntamenti in un colpo d'occhio. Drag & drop per spostare prenotazioni. Colori diversi per ogni operatore.</div>
                                    </div>
                                    <div className="p-5 bg-dark border border-orange-500/30 rounded-lg hover:bg-orange-500/10 transition relative overflow-hidden">
                                        <div className="absolute inset-0 bg-orange-500/10 animate-pulse"></div>
                                        <div className="flex items-center gap-3 mb-3 relative z-10">
                                            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="text-xs text-orange-500 uppercase font-bold">Prenotazione Online</div>
                                        </div>
                                        <div className="font-bold text-white mb-2 relative z-10">Clienti Prenotano da Casa</div>
                                        <div className="text-sm text-gray-400 relative z-10">I tuoi clienti possono prenotare 24/7 dal loro telefono. Ricevi notifica istantanea. Zero telefonate perse.</div>
                                    </div>
                                    <div className="p-5 bg-dark border border-orange-500/30 rounded-lg hover:bg-orange-500/10 transition">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            <div className="text-xs text-orange-500 uppercase font-bold">Gestione Clienti</div>
                                        </div>
                                        <div className="font-bold text-white mb-2">Database Clienti Completo</div>
                                        <div className="text-sm text-gray-400">Storico servizi, preferenze, note personali. SMS/Email automatici per conferme e promemoria.</div>
                                    </div>
                                    <div className="p-5 bg-dark border border-orange-500/30 rounded-lg hover:bg-orange-500/10 transition">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </div>
                                            <div className="text-xs text-orange-500 uppercase font-bold">Statistiche</div>
                                        </div>
                                        <div className="font-bold text-white mb-2">Report e Analisi</div>
                                        <div className="text-sm text-gray-400">Vedi i servizi più richiesti, orari di punta, operatori più prenotati. Ottimizza il tuo business.</div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'pos' && (
                            <motion.div 
                              key="pos"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <div className="text-left">
                                        <h3 className="text-2xl font-bold text-white">POS Personalizzato</h3>
                                        <p className="text-purple-500 text-sm">Cassa completa per negozi, supermercati, attività commerciali</p>
                                    </div>
                                    <div className="text-4xl">💳</div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 text-left">
                                    <div className="p-5 bg-dark border border-purple-500/30 rounded-lg hover:bg-purple-500/10 transition">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            <div className="text-xs text-purple-500 uppercase font-bold">Vendita Rapida</div>
                                        </div>
                                        <div className="font-bold text-white mb-2">Scansione e Vendita</div>
                                        <div className="text-sm text-gray-400">Scansiona codice a barre o cerca prodotto. Aggiungi al carrello, applica sconti, stampa scontrino. Veloce e intuitivo.</div>
                                    </div>
                                    <div className="p-5 bg-dark border border-purple-500/30 rounded-lg hover:bg-purple-500/10 transition relative overflow-hidden">
                                        <div className="absolute inset-0 bg-purple-500/10 animate-pulse"></div>
                                        <div className="flex items-center gap-3 mb-3 relative z-10">
                                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <div className="text-xs text-purple-500 uppercase font-bold">Stampa Scontrino</div>
                                        </div>
                                        <div className="font-bold text-white mb-2 relative z-10">Scontrini Fiscali</div>
                                        <div className="text-sm text-gray-400 relative z-10">Stampa automatica su stampante termica. Compatibile con stampanti fiscali. Totale, sconti, IVA calcolati automaticamente.</div>
                                    </div>
                                    <div className="p-5 bg-dark border border-purple-500/30 rounded-lg hover:bg-purple-500/10 transition">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="text-xs text-purple-500 uppercase font-bold">Gestione Cassa</div>
                                        </div>
                                        <div className="font-bold text-white mb-2">Apertura/Chiusura</div>
                                        <div className="text-sm text-gray-400">Apertura cassa con fondo iniziale. Chiusura con conteggio automatico. Report giornaliero con incasso totale.</div>
                                    </div>
                                    <div className="p-5 bg-dark border border-purple-500/30 rounded-lg hover:bg-purple-500/10 transition">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </div>
                                            <div className="text-xs text-purple-500 uppercase font-bold">Report Vendite</div>
                                        </div>
                                        <div className="font-bold text-white mb-2">Analisi Dettagliata</div>
                                        <div className="text-sm text-gray-400">Vedi prodotti più venduti, orari di punta, incasso giornaliero/settimanale/mensile. Esporta in Excel.</div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'app' && (
                            <motion.div 
                              key="app"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <div className="text-left">
                                        <h3 className="text-2xl font-bold text-white">App Mobile Personalizzata</h3>
                                        <p className="text-green-500 text-sm">App nativa per iOS e Android, funziona offline</p>
                                    </div>
                                    <div className="text-4xl">📱</div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 text-left">
                                    <div className="p-5 bg-dark border border-green-500/30 rounded-lg hover:bg-green-500/10 transition">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="text-xs text-green-500 uppercase font-bold">iOS & Android</div>
                                        </div>
                                        <div className="font-bold text-white mb-2">App Nativa</div>
                                        <div className="text-sm text-gray-400">App installabile su iPhone e Android. Design moderno, veloce, responsive. Funziona anche su tablet.</div>
                                    </div>
                                    <div className="p-5 bg-dark border border-green-500/30 rounded-lg hover:bg-green-500/10 transition relative overflow-hidden">
                                        <div className="absolute inset-0 bg-green-500/10 animate-pulse"></div>
                                        <div className="flex items-center gap-3 mb-3 relative z-10">
                                            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                                </svg>
                                            </div>
                                            <div className="text-xs text-green-500 uppercase font-bold">Funziona Offline</div>
                                        </div>
                                        <div className="font-bold text-white mb-2 relative z-10">Senza Internet</div>
                                        <div className="text-sm text-gray-400 relative z-10">Lavora anche senza connessione. I dati si sincronizzano automaticamente quando torni online.</div>
                                    </div>
                                    <div className="p-5 bg-dark border border-green-500/30 rounded-lg hover:bg-green-500/10 transition">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            <div className="text-xs text-green-500 uppercase font-bold">Sicurezza</div>
                                        </div>
                                        <div className="font-bold text-white mb-2">Login Protetto</div>
                                        <div className="text-sm text-gray-400">Autenticazione sicura, ruoli utente, permessi personalizzati. I dati sono criptati e protetti.</div>
                                    </div>
                                    <div className="p-5 bg-dark border border-green-500/30 rounded-lg hover:bg-green-500/10 transition">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                            </div>
                                            <div className="text-xs text-green-500 uppercase font-bold">Sincronizzazione</div>
                                        </div>
                                        <div className="font-bold text-white mb-2">Cloud Sync</div>
                                        <div className="text-sm text-gray-400">Tutti i dispositivi sincronizzati in tempo reale. Modifichi da telefono, vedi su PC. Sempre aggiornato.</div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                      </AnimatePresence>

                  </div>

              </div>

          </section>
          </RevealSection>

          {/* CONFRONTO CON CONCORRENTI */}
          <RevealSection delay={0.3}>
          <section className="py-24 px-6 relative overflow-hidden bg-black/50">
              <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-12">
                      <div className="inline-block text-danger font-mono mb-4">ATTENZIONE</div>
                      <h2 className="text-4xl md:text-5xl font-head font-bold mb-4">
                          Loro Ti <span className="text-danger">Succhiano il Sangue</span>
                      </h2>
                      <p className="text-gray-400 text-lg">Confronto diretto: TeamSystem, Zucchetti, Sage vs NEXO System</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                      {/* LORO - Software Tradizionali */}
                      <div className="bg-danger/10 border-2 border-danger/50 rounded-2xl p-8 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-danger/20 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
                          <div className="relative z-10">
                              <div className="flex items-center gap-3 mb-6">
                                  <div className="w-12 h-12 bg-danger/20 rounded-lg flex items-center justify-center">
                                      <svg className="w-6 h-6 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                      </svg>
                                  </div>
                                  <h3 className="text-2xl font-bold text-white">TeamSystem, Zucchetti, Sage</h3>
                              </div>
                              
                              <div className="space-y-4">
                                  <div className="flex items-start gap-3">
                                      <span className="text-danger text-xl">✗</span>
                                      <div>
                                          <div className="font-bold text-white mb-1">€80-200/mese per sempre</div>
                                          <div className="text-gray-400 text-sm">Canone mensile infinito. In 5 anni: €4.800-12.000 buttati</div>
                                      </div>
                                  </div>
                                  
                                  <div className="flex items-start gap-3">
                                      <span className="text-danger text-xl">✗</span>
                                      <div>
                                          <div className="font-bold text-white mb-1">Software generico</div>
                                          <div className="text-gray-400 text-sm">Stesso software per tutti. Non si adatta alle tue esigenze</div>
                                      </div>
                                  </div>
                                  
                                  <div className="flex items-start gap-3">
                                      <span className="text-danger text-xl">✗</span>
                                      <div>
                                          <div className="font-bold text-white mb-1">Lento e complicato</div>
                                          <div className="text-gray-400 text-sm">Interfaccia datata, difficile da usare, perdi tempo</div>
                                      </div>
                                  </div>
                                  
                                  <div className="flex items-start gap-3">
                                      <span className="text-danger text-xl">✗</span>
                                      <div>
                                          <div className="font-bold text-white mb-1">Non è tuo</div>
                                          <div className="text-gray-400 text-sm">Se smetti di pagare, perdi TUTTO. I dati non sono tuoi</div>
                                      </div>
                                  </div>
                                  
                                  <div className="flex items-start gap-3">
                                      <span className="text-danger text-xl">✗</span>
                                      <div>
                                          <div className="font-bold text-white mb-1">Nessuna personalizzazione</div>
                                          <div className="text-gray-400 text-sm">Devi adattarti al software, non il contrario</div>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="mt-8 p-4 bg-danger/20 rounded-lg border border-danger/50">
                                  <div className="text-center">
                                      <div className="text-3xl font-black text-danger mb-2">€ 6.000+</div>
                                      <div className="text-sm text-gray-400">Buttati via in 5 anni</div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* IO - NEXO System */}
                      <div className="bg-brand/10 border-2 border-brand/50 rounded-2xl p-8 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
                          <div className="relative z-10">
                              <div className="flex items-center gap-3 mb-6">
                                  <div className="w-12 h-12 bg-brand/20 rounded-lg flex items-center justify-center">
                                      <Zap className="w-6 h-6 text-brand" />
                                  </div>
                                  <h3 className="text-2xl font-bold text-white">NEXO System</h3>
                              </div>
                              
                              <div className="space-y-4">
                                  <div className="flex items-start gap-3">
                                      <span className="text-brand text-xl">✓</span>
                                      <div>
                                          <div className="font-bold text-white mb-1">Zero canone mensile</div>
                                          <div className="text-gray-400 text-sm">Prezzo una tantum. È tuo per sempre. Risparmi migliaia di euro</div>
                                      </div>
                                  </div>
                                  
                                  <div className="flex items-start gap-3">
                                      <span className="text-brand text-xl">✓</span>
                                      <div>
                                          <div className="font-bold text-white mb-1">Software personalizzato</div>
                                          <div className="text-gray-400 text-sm">Fatto su misura per la TUA attività. Si adatta a te</div>
                                      </div>
                                  </div>
                                  
                                  <div className="flex items-start gap-3">
                                      <span className="text-brand text-xl">✓</span>
                                      <div>
                                          <div className="font-bold text-white mb-1">Veloce e semplice</div>
                                          <div className="text-gray-400 text-sm">Interfaccia moderna, intuitiva, risparmi tempo ogni giorno</div>
                                      </div>
                                  </div>
                                  
                                  <div className="flex items-start gap-3">
                                      <span className="text-brand text-xl">✓</span>
                                      <div>
                                          <div className="font-bold text-white mb-1">È TUO per sempre</div>
                                          <div className="text-gray-400 text-sm">Il codice è tuo. I dati sono tuoi. Nessun vincolo</div>
                                      </div>
                                  </div>
                                  
                                  <div className="flex items-start gap-3">
                                      <span className="text-brand text-xl">✓</span>
                                      <div>
                                          <div className="font-bold text-white mb-1">Personalizzazione totale</div>
                                          <div className="text-gray-400 text-sm">Aggiungi, modifica, personalizza tutto quello che vuoi</div>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="mt-8 p-4 bg-brand/20 rounded-lg border border-brand/50">
                                  <div className="text-center">
                                      <div className="text-3xl font-black text-brand mb-2">€ 0</div>
                                      <div className="text-sm text-gray-400">Canone mensile</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="text-center mt-12">
                      <button 
                          onClick={() => openWhatsApp('Ciao! Voglio saperne di più su NEXO System e come risparmiare rispetto ai software tradizionali.')}
                          className="inline-flex items-center gap-3 bg-brand hover:bg-white text-black font-black px-8 py-4 rounded-lg text-lg uppercase tracking-wider transition duration-300 shadow-[0_0_30px_rgba(0,240,255,0.4)] cursor-pointer"
                      >
                          <Zap className="w-5 h-5" />
                          <span>Scopri Quanto Risparmi</span>
                      </button>
                  </div>
              </div>
          </section>
          </RevealSection>

          {/* RECENSIONI */}
          <RevealSection delay={0.4}>
          <section className="py-24 px-6 relative overflow-hidden">
              <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-12">
                      <div className="inline-block text-brand font-mono mb-4">RECENSIONI</div>
                      <h2 className="text-4xl md:text-5xl font-head font-bold mb-4">
                          Cosa Dicono i <span className="text-brand">Miei Clienti</span>
                      </h2>
                      <p className="text-gray-400 text-lg">Clienti reali, risultati reali</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                      {/* Recensione 1 */}
                      <div className="bg-[#0A0A0F] border border-white/10 rounded-2xl p-6 hover:border-brand/50 transition duration-300">
                          <div className="flex items-center gap-1 mb-4">
                              {[...Array(5)].map((_, i) => (
                                  <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                              ))}
                          </div>
                          <p className="text-gray-300 mb-6 leading-relaxed">
                              "Finalmente ho eliminato tutti i fogli Excel e i blocchi note. Il gestionale di NEXO System è perfetto per la mia lavanderia. Risparmio almeno 2 ore al giorno."
                          </p>
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-brand/20 rounded-full flex items-center justify-center text-brand font-bold text-lg">
                                  MR
                              </div>
                              <div>
                                  <div className="font-bold text-white">Marco R.</div>
                                  <div className="text-xs text-gray-500">Lavanderia Express, Napoli</div>
                              </div>
                          </div>
                      </div>

                      {/* Recensione 2 */}
                      <div className="bg-[#0A0A0F] border border-white/10 rounded-2xl p-6 hover:border-brand/50 transition duration-300">
                          <div className="flex items-center gap-1 mb-4">
                              {[...Array(5)].map((_, i) => (
                                  <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                              ))}
                          </div>
                          <p className="text-gray-300 mb-6 leading-relaxed">
                              "Ho un sistema di prenotazioni online per il mio salone. I clienti prenotano 24/7, io non perdo più telefonate. NEXO System ha capito perfettamente le mie esigenze."
                          </p>
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-500 font-bold text-lg">
                                  LS
                              </div>
                              <div>
                                  <div className="font-bold text-white">Laura S.</div>
                                  <div className="text-xs text-gray-500">Salone di Bellezza, Salerno</div>
                              </div>
                          </div>
                      </div>

                      {/* Recensione 3 */}
                      <div className="bg-[#0A0A0F] border border-white/10 rounded-2xl p-6 hover:border-brand/50 transition duration-300">
                          <div className="flex items-center gap-1 mb-4">
                              {[...Array(5)].map((_, i) => (
                                  <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                              ))}
                          </div>
                          <p className="text-gray-300 mb-6 leading-relaxed">
                              "Il POS personalizzato ha rivoluzionato il mio negozio. Scansione veloce, scontrini automatici, inventario sempre aggiornato. Zero errori, zero stress."
                          </p>
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-500 font-bold text-lg">
                                  GF
                              </div>
                              <div>
                                  <div className="font-bold text-white">Giuseppe F.</div>
                                  <div className="text-xs text-gray-500">Tech Store, Caserta</div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          </RevealSection>

          {/* FOOTER NEXO */}

          <footer className="py-12 text-center text-gray-600 border-t border-white/5 bg-black">

              <div className="flex justify-center items-center gap-2 mb-4">

                  <div className="w-8 h-8 bg-brand rounded flex items-center justify-center text-black font-black text-xl">N</div>

                  <span className="font-head font-bold text-2xl text-white tracking-tighter">NEXO<span className="text-brand">SYSTEM</span></span>

              </div>

              <p>Sviluppo Software Sartoriale</p>

              <div className="flex justify-center gap-4 mt-4 text-xs">

                  <a href="#" className="hover:text-brand">Privacy Policy</a>

                  <span>•</span>

                  <a href="#" className="hover:text-brand">Cookie Policy</a>

              </div>

          </footer>

      </div>

  )

}

export default App
