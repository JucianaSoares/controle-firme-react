import { useState, useEffect } from 'react';

export default function App() {
  const [abaAtual, setAbaAtual] = useState('dashboard');
  
  // Estados para a Calculadora Freelancer
  const [custoVida, setCustoVida] = useState('2000');
  const [horasSemana, setHorasSemana] = useState('40');
  const [valorHoraResultado, setValorHoraResultado] = useState(0);

  // Média de faturamento base para a IA comparar (R$ 3.116)
  const mediaFaturamento = 3116;

  // Estado do Colchão de Segurança
  const [colchaoAtual, setColchaoAtual] = useState(() => {
    const salvo = localStorage.getItem('@controlefirme:colchao');
    return salvo ? parseFloat(salvo) : 0;
  });

  // ESTADO DO OPEN FINANCE: Armazena se o banco está conectado ou não
  const [bancoConectado, setBancoConectado] = useState(() => {
    const salvo = localStorage.getItem('@controlefirme:banco_conectado');
    return salvo === 'true';
  });

  const [carregandoConexao, setCarregandoConexao] = useState(false);

  const metaColchao = mediaFaturamento * 3; // Meta de 3 meses
  const progressoPorcentagem = Math.min(Math.round((colchaoAtual / metaColchao) * 100), 100);

  // Inputs e Mensagens
  const [novoGanho, setNovoGanho] = useState('');
  const [mensagemGamificada, setMensagemGamificada] = useState('');
  
  // Estado dinâmico dos Action Cards controlados pela IA
  const [aiCards, setAiCards] = useState([
    {
      tipo: 'previsao',
      titulo: '🔮 Previsão dos Próximos Meses',
      texto: 'Seu faturamento médio histórico é estável. A IA detectou que o mercado de freelas costuma oscilar no próximo mês.',
      dica: 'Ação recomendada: Mantenha a calma e evite gastos fixos grandes esta semana.'
    },
    {
      tipo: 'impulso',
      titulo: '🔥 Alerta Anti-Gasto por Impulso',
      texto: 'Seu colchão está na fase inicial de construção. Foco em dar os primeiros passos!',
      dica: 'Regra de Ouro: Deixe desejos de consumo na lista de espera por 48 horas.'
    }
  ]);

  // Efeito para salvar o valor do colchão
  useEffect(() => {
    localStorage.setItem('@controlefirme:colchao', colchaoAtual.toString());
  }, [colchaoAtual]);

  // Efeito para salvar o estado da conexão do banco
  useEffect(() => {
    localStorage.setItem('@controlefirme:banco_conectado', bancoConectado.toString());
    
    // Se o banco já estiver conectado ao abrir o app, atualiza os cards para o modo automático
    if (bancoConectado) {
      setAiCards([
        {
          tipo: 'previsao',
          titulo: '🤖 Monitoramento Automático Ativo',
          texto: 'Open Finance conectado com sucesso. A IA está lendo seus extratos em tempo real para reter o colchão automaticamente.',
          dica: '✅ Status: Sua conta bancária está blindada contra gastos por impulso.'
        },
        {
          tipo: 'impulso',
          titulo: '📊 Histórico dos Últimos 6 Meses',
          texto: 'Análise concluída: identificamos que suas maiores receitas entram entre os dias 5 e 12. Seu planejamento se adaptou a isso.',
          dica: '💡 Inteligência: Nos dias de pico, nossa taxa de retenção preventiva subirá sutilmente.'
        }
      ]);
    }
  }, [bancoConectado]);

  // Simulação de Conexão com o Open Finance
  const handleConectarBanco = () => {
    if (bancoConectado) {
      // Se já estava conectado, permite desconectar para testar
      setBancoConectado(false);
      setMensagemGamificada('Banco desconectado. O app voltou para o modo de registro manual.');
      return;
    }

    setCarregandoConexao(true);
    setMensagemGamificada('Conectando às APIs do Open Finance de forma segura...');

    // Simula um delay de 2 segundos de rede/autenticação
    setTimeout(() => {
      setBancoConectado(true);
      setCarregandoConexao(false);
      setMensagemGamificada('Sensacional! Conta integrada via Open Finance. Agora a IA cuida de tudo sozinha a cada Pix recebido! 🏦✨');
    }, 2000);
  };

  // Lógica da Calculadora Valor/Hora
  const calcularValorHora = (e: any) => {
    e.preventDefault();
    const custo = parseFloat(custoVida) || 0;
    const horas = parseFloat(horasSemana) || 0;
    if (horas <= 0) return;
    const valorNecessario = (custo * 1.3) / (horas * 4.3);
    setValorHoraResultado(Math.round(valorNecessario));
  };

  // Lógica de IA Dinâmica ao Registrar Ganhos Manuais
  const handleRegistrarGanho = (e: any) => {
    e.preventDefault();
    const valor = parseFloat(novoGanho) || 0;
    if (valor <= 0) return;

    let taxaRetencao = 0.05;
    let novosCards = [...aiCards];

    if (valor >= 3000) {
      taxaRetencao = 0.20;
      novosCards = [
        {
          tipo: 'previsao',
          titulo: '🚀 Mês de Alta Detectado!',
          texto: `Esse Pix de R$ ${valor} foi lindo! A IA calculou que você está acima da sua média. Hora de acelerar o progresso.`,
          dica: '💡 Meta Semanal: Colchão turbinado com sucesso. Aproveite a onda para focar em organizar suas ferramentas.'
        },
        {
          tipo: 'impulso',
          titulo: '💎 Recompensa Inteligente',
          texto: 'Você trabalhou duro e merece celebrar. Mas em vez de gastar tudo, que tal separar 10% para um agrado sem culpa?',
          dica: '🎉 Dica: O resto a IA já guardou para te dar 100% de paz de espírito no futuro.'
        }
      ];
    } else {
      taxaRetencao = 0.05;
      novosCards = [
        {
          tipo: 'previsao',
          titulo: '🌱 Faturamento Suave',
          texto: `Entrada de R$ ${valor} registrada. Como o mês está mais calmo, a IA reduziu sua retenção para não apertar seu orçamento.`,
          dica: '🤝 Aliança Freela: Zero pressão por aqui. O foco agora é cobrir o custo de vida básico.'
        },
        {
          tipo: 'impulso',
          titulo: '🛡️ Modo Blindagem Ativado',
          texto: 'O momento pede foco em estabilidade psicológica imediata. Esqueça metas absurdas de investimento por hoje.',
          dica: '🎯 Próximo passo: Dê uma olhada na Calculadora Valor/Hora para recalcular seus próximos orçamentos.'
        }
      ];
    }

    const guardadoParaOColchao = valor * taxaRetencao;
    setColchaoAtual(prev => prev + guardadoParaOColchao);
    setAiCards(novosCards);
    setMensagemGamificada(
      `Boa! Separamos R$ ${guardadoParaOColchao.toFixed(2)} (${taxaRetencao * 100}%) direto pro seu Colchão de Segurança! 🛡️`
    );
    setNovoGanho('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 antialiased font-sans pb-12">
      
      {/* Barra de Navegação */}
      <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-xl tracking-tight">
            <span className="text-emerald-400 text-2xl">⚡</span>
            <span>Controle<span className="text-emerald-400">Firme</span></span>
          </div>
          <div className="flex gap-2 font-semibold text-xs">
            <button 
              onClick={() => setAbaAtual('dashboard')}
              className={`py-2 px-4 rounded-xl transition-all ${abaAtual === 'dashboard' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              Meu Painel
            </button>
            <button 
              onClick={() => setAbaAtual('calculadora')}
              className={`py-2 px-4 rounded-xl transition-all ${abaAtual === 'calculadora' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              Calculadora Val/Hora
            </button>
          </div>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {abaAtual === 'dashboard' ? (
          <>
            {/* Seção de Boas-vindas + Botão de Open Finance */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl font-black tracking-tight text-white">Fala, chefe! 👋</h1>
                <p className="text-slate-400 text-sm max-w-xl">
                  Seu aliado financeiro inteligente. Sem termos técnicos chatos.
                </p>
              </div>
              
              {/* BOTÃO DA INTEGRAÇÃO BANCÁRIA */}
              <button
                onClick={handleConectarBanco}
                disabled={carregandoConexao}
                className={`text-xs font-bold py-3 px-4 rounded-2xl border transition-all active:scale-95 flex items-center gap-2 self-start ${
                  bancoConectado 
                    ? 'bg-slate-950 text-emerald-400 border-emerald-800/60 hover:bg-slate-900' 
                    : 'bg-indigo-600 text-white border-transparent hover:bg-indigo-500 shadow-lg shadow-indigo-950/40'
                }`}
              >
                <span>{bancoConectado ? '🏦 Banco Conectado ✓' : '🔌 Conectar Banco (Open Finance)'}</span>
                {carregandoConexao && <span className="animate-spin text-sm">⌛</span>}
              </button>
            </div>

            {/* O COLCHÃO DE SEGURANÇA */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-800/50">
                    🛡️ Seu Colchão de Segurança
                  </span>
                  <h2 className="text-4xl font-black mt-3 text-white">
                    R$ {colchaoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Meta Inteligente: <span className="text-slate-200 font-bold">R$ {metaColchao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </p>
                </div>
                <span className="text-4xl bg-slate-900 p-3 rounded-2xl border border-slate-800">🛌</span>
              </div>

              <div className="space-y-1 pt-2">
                <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressoPorcentagem}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-slate-500">
                  <span>Zero ansiedade</span>
                  <span className="text-emerald-400">{progressoPorcentagem}% Concluído</span>
                  <span>Vacas magras pagas!</span>
                </div>
              </div>
            </div>

            {/* Input de Pix de Job (Ocultado ou com aviso se o banco estiver conectado) */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>💰</span> {bancoConectado ? 'Monitoramento Open Finance ativo' : 'Caiu um Pix de job? Registre aqui:'}
              </h3>
              
              {bancoConectado ? (
                <p className="text-xs text-slate-400">
                  Você não precisa mais registrar suas entradas manualmente. Nossa IA está integrada ao seu extrato e cuidará de tudo automaticamente no próximo Pix que entrar na sua conta.
                </p>
              ) : (
                <form onSubmit={handleRegistrarGanho} className="flex gap-3">
                  <input 
                    type="number" 
                    placeholder="Ex: 3500 ou 450" 
                    value={novoGanho}
                    onChange={e => setNovoGanho(e.target.value)}
                    style={{ backgroundColor: '#020617', color: '#f8fafc', border: '2px solid #334155' }}
                    className="flex-1 px-4 py-3 rounded-2xl text-base font-medium focus:outline-none focus:border-emerald-500 transition-all placeholder-slate-600"
                  />
                  <button 
                    type="submit"
                    className="bg-emerald-600 text-white font-black px-6 rounded-2xl text-sm hover:bg-emerald-500 active:scale-95 transition-all"
                  >
                    Alimentar o Colchão
                  </button>
                </form>
              )}

              {mensagemGamificada && (
                <div className="bg-emerald-950/30 border border-emerald-800 p-4 rounded-2xl text-sm text-emerald-300">
                  {mensagemGamificada}
                </div>
              )}
            </div>

            {/* SEÇÃO DINÂMICA: ACTION CARDS ALTERADOS PELA IA */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">
                ⚡ Insights Dinâmicos da IA
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiCards.map((card, index) => (
                  <div 
                    key={index} 
                    className={`bg-slate-950 p-5 rounded-2xl space-y-2 border transition-all ${
                      card.tipo === 'previsao' ? 'border-emerald-900/40 hover:border-emerald-500/40' : 'border-amber-900/40 hover:border-amber-500/40'
                    }`}
                  >
                    <div className={`font-bold text-sm ${card.tipo === 'previsao' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {card.titulo}
                    </div>
                    <p className="text-slate-300 text-sm">{card.texto}</p>
                    <div className="bg-slate-900 p-2.5 rounded-xl text-xs text-slate-400 font-medium border border-slate-800">
                      {card.dica}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* CALCULADORA VALOR/HORA */
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-6 max-w-xl mx-auto">
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <span>🮦</span> Calculadora Inteligente Valor/Hora
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                Descubra quanto cobrar por hora para pagar suas contas sem neura.
              </p>
            </div>

            <form onSubmit={calcularValorHora} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Qual o seu custo de vida real por mês? (R$)</label>
                <input 
                  type="number" 
                  value={custoVida}
                  onChange={e => setCustoVida(e.target.value)}
                  style={{ backgroundColor: '#020617', color: '#f8fafc', border: '2px solid #334155' }}
                  className="w-full px-4 py-3 rounded-xl text-base focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Quantas horas quer trabalhar por semana?</label>
                <input 
                  type="number" 
                  value={horasSemana}
                  onChange={e => setHorasSemana(e.target.value)}
                  style={{ backgroundColor: '#020617', color: '#f8fafc', border: '2px solid #334155' }}
                  className="w-full px-4 py-3 rounded-xl text-base focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-emerald-600 text-white font-black py-4 rounded-xl text-sm hover:bg-emerald-500 transition-all active:scale-95"
              >
                Calcular Meu Preço Mínimo
              </button>
            </form>

            {valorHoraResultado > 0 && (
              <div className="bg-slate-900 p-5 rounded-2xl border-2 border-emerald-500/20 text-center space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Seu valor/hora mínimo deve ser:</p>
                <h3 className="text-3xl font-black text-emerald-400">R$ {valorHoraResultado},00 / hora</h3>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto pt-2">
                  *Já inclui uma margem protetora de 30% para o seu colchão de segurança e dias de folga.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
