const navToggle = document.querySelector('.nav-toggle');
const navMain = document.querySelector('.nav-main');

if (navToggle && navMain) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMain.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 740 && navMain.classList.contains('nav-open')) {
      navMain.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const details = document.querySelectorAll('.faq-item');
details.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      details.forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
  });
});

const quizQuestions = [
  {
    id: 1,
    prompt: 'Valdisney reside no DF e passou por uma grande tragédia: sua esposa faleceu no parto e a criança nasceu sem vida (natimorto). Diante desse cruzamento de benefícios, como a assistência social amparará Valdisney?',
    options: ['Ele receberá o auxílio-natalidade apenas em pecúnia (R$ 200,00) e poderá receber cumulativamente o auxílio por morte em bens de consumo (urna e sepultamento).', 'Ele perderá o direito ao auxílio-natalidade, visto que a criança não sobreviveu, restando-lhe o auxílio por morte em pecúnia.', 'Ele receberá o auxílio-natalidade em formato de enxoval para guardar de recordação, e o auxílio por morte em pecúnia.', 'O SUAS unificará os eventos em um único "auxílio por calamidade", pagando a cota de R$ 408,00.', 'Ele deverá escolher entre receber o auxílio por morte ou o auxílio-natalidade, pois a lei veda a cumulação absoluta.'],
    correctAnswer: 0,
    explanation: 'A lei permite a cumulação em casos específicos, com o auxílio-natalidade e o auxílio por morte.'
  },
  {
    id: 2,
    prompt: 'Deoclécio teve sua casa e a rua inteira onde mora destruídas por uma enchente avassaladora. Ao mesmo tempo, no bairro vizinho, Astolfo sofreu um curto-circuito isolado e perdeu os móveis de sua sala. Qual é o enquadramento correto para os benefícios dessas duas famílias?',
    options: ['Ambos receberão o Auxílio por Calamidade Pública, pois ambos sofreram perdas imprevistas.', 'Deoclécio receberá o Benefício Excepcional obrigatoriamente, enquanto Astolfo receberá o Auxílio-Natalidade.', 'Deoclécio enquadra-se no Auxílio por Desastre/Calamidade Pública (evento anormal coletivo), enquanto Astolfo acessará o Auxílio por Vulnerabilidade Temporária (crise familiar isolada).', 'Ambos receberão o Auxílio por Vulnerabilidade Temporária, limitado a uma parcela anual.', 'Astolfo não receberá nada, pois acidentes domésticos são de responsabilidade privada.'],
    correctAnswer: 2,
    explanation: 'A calamidade pública é coletiva e anormal; a vulnerabilidade temporária trata de situações familiares isoladas.'
  },
  {
    id: 3,
    prompt: 'Claudete vive em um barraco com risco de desabar por falta de telhas adequadas, mas ela não perdeu a moradia (não está desabrigada). Ela procura o CRAS pedindo uma ajuda financeira para consertar o teto. Como a lei lida com isso?',
    options: ['O pedido será negado, pois a assistência social não atua com melhoria de habitabilidade.', 'Ela será inscrita no Benefício Excepcional, ganhando R$ 600,00 para pagar um mestre de obras.', 'Ela será encaminhada para o Auxílio-Natalidade, que fornece materiais de construção básicos.', 'O CRAS acionará o Auxílio por Calamidade Pública, já que o telhado pode cair a qualquer momento.', 'O auxílio em situação de vulnerabilidade temporária poderá ser concedido visando à melhoria de habitabilidade, sem prejudicar outras rendas.'],
    correctAnswer: 4,
    explanation: 'A vulnerabilidade temporária pode abranger melhoria de habitabilidade, desde que haja avaliação técnica.'
  },
  {
    id: 4,
    prompt: 'Lindomar foi assaltado e perdeu todos os seus pertences, incluindo RG e CPF. Desesperado, ele vai ao CRAS e a assistente social descobre que a renda dele é de R$ 900,00 per capita (acima do meio salário mínimo). O que acontece com Lindomar?',
    options: ['Ele não será atendido, pois a falta de documentos barra a liberação de dinheiro público.', 'O benefício poderá ser concedido excepcionalmente mediante avaliação técnica que justifique o risco, e a ausência de documentos não impede a concessão inicial.', 'Ele será atendido apenas se comprovar filiação sindical no Distrito Federal.', 'Ele será inserido no Auxílio por Morte, visto que perdeu sua "identidade civil".', 'O benefício será sumariamente negado em virtude da renda, que é um teto absoluto inquebrável.'],
    correctAnswer: 1,
    explanation: 'A ausência de documentos não impede a concessão inicial se houver avaliação técnica e justificativa de risco.'
  },
  {
    id: 5,
    prompt: 'Epaminondas, borracheiro do DF, quer entender como os pagamentos eventuais chegam ao bolso do cidadão. Assinale a alternativa que traz uma correspondência verdadeira:',
    options: ['Auxílio-Natalidade: 6 parcelas mensais de R$ 200,00.', 'Benefício Excepcional: Parcela única de R$ 600,00.', 'Auxílio por Morte: Até 12 parcelas mensais de R$ 415,00.', 'Auxílio por Vulnerabilidade Temporária: Até seis parcelas anuais de até R$ 408,00.', 'Auxílio Calamidade: Mensalidades fixas de R$ 408,00 por dois anos.'],
    correctAnswer: 3,
    explanation: 'A vulnerabilidade temporária pode ser concedida em até seis parcelas anuais de até R$ 408,00.'
  },
  {
    id: 6,
    prompt: 'Astrogildo teve sua geladeira queimada em um pico de energia. Ele foi de manhã ao CRAS de Ceilândia pedir o Auxílio Vulnerabilidade. À tarde, mandou sua esposa ir ao CRAS de Taguatinga pedir o mesmo auxílio pelo mesmo motivo. De acordo com as Disposições Finais da Lei nº 5.165/2013, essa conduta:',
    options: ['É expressamente vedada, acarretando o cancelamento do benefício por se tratar de pedido de mais de um membro da família pelo mesmo advento.', 'É válida, desde que o valor total recebido não ultrapasse R$ 816,00.', 'Configura direito adquirido, pois a Constituição permite múltiplos requerimentos familiares.', 'Gera a conversão obrigatória dos dois benefícios em um Auxílio Calamidade.', 'Resultará no pagamento duplicado, desde que o casal assine um termo de confissão de dívida.'],
    correctAnswer: 0,
    explanation: 'A lei veda pedidos duplicados para a mesma situação familiar no mesmo evento.'
  },
  {
    id: 7,
    prompt: 'Creusa mora na Bahia, mas foi passear na Torre de TV em Brasília e, infelizmente, sofreu um mal súbito e faleceu no DF. O Auxílio por Morte poderá ser concedido a essa família baiana?',
    options: ['Não, o DF só atende a quem comprova seis meses de moradia.', 'Sim, a lei garante o benefício em caso de falecimento de pessoa que venha a óbito no DF, ainda que a família resida fora.', 'Sim, mas será limitado exclusivamente a passagens de ônibus para a Bahia.', 'Não, pois a cooperação federativa exige que o estado da Bahia faça um PIX para o DF antes do enterro.', 'Sim, mas apenas na modalidade de pecúnia, pois urnas são limitadas aos brasilienses.'],
    correctAnswer: 1,
    explanation: 'O auxílio por morte pode ser concedido mesmo que a família resida fora do DF, desde que o óbito tenha ocorrido no DF.'
  },
  {
    id: 8,
    prompt: 'Zé, imigrante em situação de rua, quer voltar para o Piauí para reatar os laços com sua família. Para isso, solicita uma passagem interestadual. A rede de assistência do DF concederá esse auxílio da vulnerabilidade sob qual regra?',
    options: ['Ele receberá uma passagem por mês até arrumar emprego.', 'É proibida a concessão de passagens para fora do DF; apenas intraurbanas são autorizadas.', 'Ele terá direito a 1 (uma) passagem a cada 365 dias, mediante avaliação técnica, visando garantir a convivência familiar.', 'Ele receberá o valor em dinheiro vivo para negociar diretamente com os motoristas na rodoviária.', 'A passagem será dada se ele pagar uma taxa simbólica de R$ 5,00 ao Tesouro do DF.'],
    correctAnswer: 2,
    explanation: 'A concessão de passagem interestadual é excepcional e depende de avaliação técnica, geralmente uma passagem a cada 365 dias.'
  },
  {
    id: 9,
    prompt: 'Ricardo, concurseiro atento, notou uma diferença na fonte do dinheiro que banca os benefícios. Qual é a regra orçamentária correta?',
    options: ['O Natalidade é bancado pelo Ministério da Economia.', 'O Auxílio Morte sai do salário do Governador.', 'Todos os benefícios saem exclusivamente do Fundo Nacional de Habitação.', 'Os benefícios eventuais clássicos correm pelo Fundo de Assistência Social do DF (FAS), mas os recursos do Benefício Excepcional (aluguel) vêm do Tesouro do DF.', 'A Calamidade é custeada por doações de ONGs internacionais.'],
    correctAnswer: 3,
    explanation: 'Os benefícios eventuais clássicos são do FAS, enquanto o Benefício Excepcional (aluguel) é custeado pelo Tesouro do DF.'
  },
  {
    id: 10,
    prompt: 'Marinalva morava há 6 anos em um assentamento precário de lona no DF. O Governo aprovou a urbanização da área e ela sofreu deslocamento compulsório. Qual o limite de prorrogação do seu Benefício Excepcional (Auxílio-Aluguel)?',
    options: ['Até 6 meses, prazo fixo de qualquer desabrigo.', 'Até 12 meses, desde que ela tenha filhos.', 'Até 24 meses, condicionado à aprovação do GDF.', 'Prazo vitalício até ganhar uma mansão.', 'Até 48 meses, por se tratar da super prorrogação para ocupações de mais de 5 anos em regularização.'],
    correctAnswer: 4,
    explanation: 'Para ocupações de mais de 5 anos em regularização, a prorrogação pode chegar a 48 meses.'
  },
  {
    id: 11,
    prompt: 'O Serviço de Proteção Social Especial de Média Complexidade, no contexto da assistência social, caracteriza-se por qual natureza de atuação?',
    options: ['Preventiva e institucional, focando exclusivamente no atendimento dentro dos equipamentos da rede socioassistencial.', 'Reativa e centralizada, aguardando demandas espontâneas dos usuários nas unidades fixas de atendimento.', 'Corretiva e setorial, atuando mediante encaminhamentos formais de outros órgãos do sistema de garantia de direitos.', 'Proativa e territorial, realizando busca ativa nos espaços onde se encontram as situações de vulnerabilidade.'],
    correctAnswer: 3,
    explanation: 'O serviço é proativo e territorial, com atuação de busca ativa.'
  },
  {
    id: 12,
    prompt: 'Qual é o principal instrumento metodológico utilizado no Serviço de Abordagem Social para garantir a efetividade das intervenções junto à população em situação de rua?',
    options: ['O encaminhamento compulsório para unidades de acolhimento institucional mediante termo de compromisso.', 'A construção e fortalecimento do vínculo de confiança com os usuários do serviço.', 'O cadastramento imediato no sistema informatizado de controle de benefícios eventuais.', 'A aplicação de formulários padronizados de diagnóstico socioeconômico na primeira abordagem.'],
    correctAnswer: 1,
    explanation: 'O vínculo de confiança é o principal instrumento metodológico da abordagem social.'
  },
  {
    id: 13,
    prompt: 'O público-alvo prioritário do Serviço de Abordagem Social compreende pessoas que utilizam os espaços públicos de forma específica. Qual caracterização melhor define esse público?',
    options: ['Apenas pessoas com transtornos mentais graves que perambulam sem destino pelos logradouros públicos.', 'Crianças, adolescentes, jovens, adultos, idosos e famílias que utilizam as ruas como espaço de moradia, sobrevivência ou sociabilidade.', 'Exclusivamente adultos em situação de desemprego que frequentam praças e terminais rodoviários durante o dia.', 'Trabalhadores informais que exercem atividades comerciais irregulares em vias públicas e necessitam de regularização.'],
    correctAnswer: 1,
    explanation: 'O público prioritário inclui pessoas e famílias que usam as ruas como moradia, sobrevivência ou sociabilidade.'
  },
  {
    id: 14,
    prompt: 'Segundo os princípios que fundamentam a abordagem social, qual postura deve ser adotada em relação ao desligamento das ruas e à aceitação dos serviços da rede socioassistencial?',
    options: ['Consentimento informado do usuário, respeitando sua autonomia e dignidade pessoal.', 'Autorização familiar ou de responsável legal para validar a decisão de aceitar o acolhimento.', 'Estabelecimento de prazos obrigatórios para adesão aos serviços, sob pena de suspensão do atendimento.', 'Determinação judicial prévia para garantir a legalidade do processo de institucionalização.'],
    correctAnswer: 0,
    explanation: 'A abordagem social respeita a autonomia do usuário, com consentimento informado.'
  },
  {
    id: 15,
    prompt: 'O princípio do direito à cidade, aplicado ao contexto da população em situação de rua, fundamenta-se em qual entendimento sobre a ocupação dos espaços públicos?',
    options: ['O pernoite em logradouros públicos constitui contravenção penal que deve ser coibida mediante ação policial preventiva.', 'A ocupação de espaços públicos para moradia configura uso irregular que autoriza a remoção administrativa compulsória.', 'O fato de pernoitar ou ocupar espaços públicos não constitui crime ou contravenção, sendo direito legítimo do cidadão.', 'A permanência em vias públicas é tolerada temporariamente até que vagas em abrigos sejam disponibilizadas pelo poder público.'],
    correctAnswer: 2,
    explanation: 'Pernoitar ou ocupar espaços públicos não é crime ou contravenção; é um direito legítimo do cidadão.'
  },
  {
    id: 16,
    prompt: 'A legislação civil não considera benfeitoria a que não foi originada da intervenção do proprietário, possuidor ou detentor.',
    options: ['Certo', 'Errado'],
    correctAnswer: 0,
    explanation: 'O enunciado está correto: benfeitoria é a melhoria feita por intervenção do proprietário, possuidor ou detentor.'
  },
  {
    id: 17,
    prompt: 'No que concerne ao Código Civil, os bens móveis que podem substituir-se por outros da mesma espécie, qualidade e quantidade são classificados como:',
    options: ['divisíveis', 'públicos', 'dominicais', 'infungíveis', 'fungíveis'],
    correctAnswer: 4,
    explanation: 'Bens fungíveis são aqueles que podem ser substituídos por outros da mesma espécie, qualidade e quantidade.'
  },
  {
    id: 18,
    prompt: 'São bens imóveis o solo e tudo quanto se lhe incorporar natural ou artificialmente.',
    options: ['Certo', 'Errado'],
    correctAnswer: 0,
    explanation: 'Essa afirmação está correta, pois inclui o solo e suas incorporações.'
  },
  {
    id: 19,
    prompt: 'Os bens naturalmente divisíveis somente podem tornar-se indivisíveis por determinação da lei.',
    options: ['Certo', 'Errado'],
    correctAnswer: 1,
    explanation: 'Os bens naturalmente divisíveis podem se tornar indivisíveis por vontade das partes ou por determinação da lei.'
  },
  {
    id: 20,
    prompt: 'Apesar de ainda não separados do bem principal, os frutos e produtos podem ser objeto de negócio jurídico.',
    options: ['Certo', 'Errado'],
    correctAnswer: 0,
    explanation: 'Frutos e produtos, mesmo não separados, podem ser objeto de negócio jurídico.'
  }
];

const STORAGE_KEY = 'simuladoEliteState';
const RESULT_KEY = 'simuladoEliteResult';
const QUIZ_DURATION = 15 * 60;
const ACTIVE_QUESTION_COUNT = 15;

function parseStoredState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    return null;
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resetQuizState() {
  localStorage.removeItem(STORAGE_KEY);
}

function buildInitialState() {
  return {
    quizId: 'simulado-estrategia-2026',
    currentIndex: 0,
    answers: {},
    review: [],
    timeLeft: QUIZ_DURATION,
    completed: false,
    questions: quizQuestions.slice(0, ACTIVE_QUESTION_COUNT).map((question) => ({ ...question }))
  };
}

function ensureState(forceReset = false) {
  const storedState = parseStoredState();
  if (forceReset || !storedState || storedState.questions?.length !== ACTIVE_QUESTION_COUNT) {
    const state = buildInitialState();
    saveState(state);
    return state;
  }
  return storedState;
}

function computeResults(state) {
  const total = state.questions.length;
  let correct = 0;
  let wrong = 0;
  let blank = 0;
  const review = state.questions.map((question) => {
    const selectedIndex = state.answers[question.id];
    if (selectedIndex === undefined) {
      blank += 1;
      return {
        ...question,
        selectedIndex: undefined,
        isBlank: true,
        isCorrect: false
      };
    }

    if (selectedIndex === question.correctAnswer) {
      correct += 1;
      return {
        ...question,
        selectedIndex,
        isBlank: false,
        isCorrect: true
      };
    }

    wrong += 1;
    return {
      ...question,
      selectedIndex,
      isBlank: false,
      isCorrect: false
    };
  });

  const score = Math.round((correct / total) * 100);
  const performance = score >= 85 ? 'Excelente' : score >= 70 ? 'Muito bom' : score >= 50 ? 'Bom' : 'Ainda dá para evoluir';
  const feedback = score >= 85
    ? 'Você mostrou excelente domínio. Continue assim e mantenha a consistência.'
    : score >= 70
      ? 'Muito bom! Seu raciocínio está forte. Ajuste detalhes para chegar ao topo.'
      : score >= 50
        ? 'Você está no caminho certo. Foque nas questões mais desafiadoras e pratique mais.'
        : 'Atenção: a revisão precisa ser mais intensa. Cada simulado é uma oportunidade de crescer.';

  return {
    score,
    correct,
    wrong,
    blank,
    total,
    performance,
    feedback,
    timeLeft: state.timeLeft,
    reviewedCount: state.review.length,
    questions: review
  };
}

function finishQuiz(state, source = 'manual') {
  const results = computeResults(state);
  localStorage.setItem(RESULT_KEY, JSON.stringify({ ...results, source }));
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = 'resultado.html';
}

function initQuizPage() {
  const questionCounter = document.getElementById('questionCounter');
  const questionText = document.getElementById('questionText');
  const optionList = document.getElementById('optionList');
  const questionNav = document.getElementById('questionNav');
  const timerElement = document.getElementById('timer');
  const progressBar = document.getElementById('progressBar');
  const timeBar = document.getElementById('timeBar');
  const reviewBar = document.getElementById('reviewBar');
  const prevButton = document.getElementById('prevQuestion');
  const nextButton = document.getElementById('nextQuestion');
  const toggleReviewButton = document.getElementById('toggleReviewBtn');
  const finishButton = document.getElementById('finishQuizBtn');
  const finishHeaderButton = document.getElementById('finishHeaderBtn');
  const finishHeaderLink = document.getElementById('finishHeaderLink');
  const questionStatus = document.getElementById('questionStatus');
  const progressLabel = document.getElementById('progressLabel');

  if (!questionCounter || !questionText || !optionList || !questionNav || !timerElement) {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const state = ensureState(urlParams.get('reset') === '1');

  function renderQuiz() {
    const total = state.questions.length;
    const question = state.questions[state.currentIndex];
    const answeredCount = Object.keys(state.answers).length;
    const reviewCount = state.review.length;
    const progressPercent = Math.round((answeredCount / total) * 100);
    const timePercent = Math.round((state.timeLeft / QUIZ_DURATION) * 100);
    const reviewPercent = Math.round((reviewCount / total) * 100);

    questionCounter.textContent = `Questão ${state.currentIndex + 1} de ${total}`;
    questionText.textContent = question.prompt;
    questionStatus.textContent = state.review.includes(question.id) ? 'Marcada para revisar' : (state.answers[question.id] !== undefined ? 'Respondida' : 'Em aberto');
    progressLabel.textContent = `${answeredCount}/${total} respondidas`;

    optionList.innerHTML = '';
    question.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'option-btn';
      if (state.answers[question.id] === index) {
        button.classList.add('selected');
      }
      if (state.review.includes(question.id)) {
        button.classList.add('review');
      }
      button.innerHTML = `<span class="option-label">${String.fromCharCode(65 + index)})</span><span>${option}</span>`;
      button.addEventListener('click', () => {
        state.answers[question.id] = index;
        saveState(state);
        renderQuiz();
      });
      optionList.appendChild(button);
    });

    questionNav.innerHTML = '';
    state.questions.forEach((item, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = index + 1;
      if (index === state.currentIndex) {
        button.classList.add('active');
      }
      if (state.answers[item.id] !== undefined) {
        button.classList.add('answered');
      }
      if (state.review.includes(item.id)) {
        button.classList.add('review');
      }
      button.addEventListener('click', () => {
        state.currentIndex = index;
        saveState(state);
        renderQuiz();
      });
      questionNav.appendChild(button);
    });

    prevButton.disabled = state.currentIndex === 0;
    nextButton.style.display = state.currentIndex === total - 1 ? 'none' : 'inline-flex';
    nextButton.disabled = state.currentIndex === total - 1;
    toggleReviewButton.textContent = state.review.includes(question.id) ? 'Remover da revisão' : 'Marcar para revisar';

    progressBar.style.width = `${progressPercent}%`;
    timeBar.style.width = `${Math.max(0, timePercent)}%`;
    reviewBar.style.width = `${reviewPercent}%`;
    timerElement.textContent = `${String(Math.floor(state.timeLeft / 60)).padStart(2, '0')}:${String(state.timeLeft % 60).padStart(2, '0')}`;
  }

  function stepTime() {
    state.timeLeft -= 1;
    if (state.timeLeft <= 0) {
      state.timeLeft = 0;
      saveState(state);
      finishQuiz(state, 'timeout');
      return;
    }
    saveState(state);
    renderQuiz();
  }

  prevButton.addEventListener('click', () => {
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
      saveState(state);
      renderQuiz();
    }
  });

  nextButton.addEventListener('click', () => {
    if (state.currentIndex < state.questions.length - 1) {
      state.currentIndex += 1;
      saveState(state);
      renderQuiz();
    }
  });

  toggleReviewButton.addEventListener('click', () => {
    const question = state.questions[state.currentIndex];
    const index = state.review.indexOf(question.id);
    if (index >= 0) {
      state.review.splice(index, 1);
    } else {
      state.review.push(question.id);
    }
    saveState(state);
    renderQuiz();
  });

  finishButton?.addEventListener('click', () => finishQuiz(state, 'manual'));
  finishHeaderButton?.addEventListener('click', () => finishQuiz(state, 'manual'));
  finishHeaderLink?.addEventListener('click', () => finishQuiz(state, 'manual'));

  renderQuiz();
  window.setInterval(stepTime, 1000);
}

function initResultsPage() {
  const resultTitle = document.getElementById('resultTitle');
  const resultScore = document.getElementById('resultScore');
  const resultSummary = document.getElementById('resultSummary');
  const resultMeter = document.getElementById('resultMeter');
  const reviewList = document.getElementById('reviewList');
  const resultStats = document.getElementById('resultStats');

  if (!resultTitle || !resultScore || !resultSummary || !reviewList || !resultStats) {
    return;
  }

  const storedResult = parseStoredResult();
  if (!storedResult) {
    resultTitle.textContent = 'Ainda não há resultado para mostrar.';
    resultScore.textContent = '0%';
    resultSummary.textContent = 'Complete o simulado para gerar sua análise.';
    resultMeter.style.width = '0%';
    reviewList.innerHTML = '<p class="result-empty">Complete o simulado para ver a revisão detalhada.</p>';
    return;
  }

  resultTitle.textContent = `${storedResult.performance}! Você fechou a prova com ${storedResult.score}%`;
  resultScore.textContent = `${storedResult.score}%`;
  resultSummary.textContent = storedResult.feedback;
  resultMeter.style.width = `${storedResult.score}%`;

  resultStats.innerHTML = `
    <tr><td>Acertos</td><td>${storedResult.correct}</td></tr>
    <tr><td>Erros</td><td>${storedResult.wrong}</td></tr>
    <tr><td>Brancos</td><td>${storedResult.blank}</td></tr>
    <tr><td>Tempo restante</td><td>${String(Math.floor(storedResult.timeLeft / 60)).padStart(2, '0')}:${String(storedResult.timeLeft % 60).padStart(2, '0')}</td></tr>
    <tr><td>Questões revisadas</td><td>${storedResult.reviewedCount}</td></tr>
  `;

  reviewList.innerHTML = '';
  storedResult.questions.forEach((question) => {
    const card = document.createElement('article');
    card.className = 'review-card';
    const userAnswer = question.selectedIndex === undefined ? 'Sem resposta' : question.options[question.selectedIndex];
    const correctAnswer = question.options[question.correctAnswer];
    card.innerHTML = `
      <div class="review-card-head">
        <h4>${question.prompt}</h4>
        <span class="answer-pill ${question.isCorrect ? 'correct' : 'wrong'}">${question.isCorrect ? 'Acertou' : 'Errou'}</span>
      </div>
      <p><strong>Sua resposta:</strong> ${userAnswer}</p>
      <p><strong>Resposta correta:</strong> ${correctAnswer}</p>
      <p class="review-explanation">${question.explanation}</p>
    `;
    reviewList.appendChild(card);
  });
}

function parseStoredResult() {
  try {
    const stored = localStorage.getItem(RESULT_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    return null;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('questionCounter')) {
    initQuizPage();
  }

  if (document.getElementById('resultTitle')) {
    initResultsPage();
  }
  if (document.getElementById('resultsGrid')) {
    initResultsGallery();
  }

  const swiperContainer = document.querySelector('.plans-carousel.swiper');
  if (!swiperContainer || typeof Swiper === 'undefined') return;

  new Swiper(swiperContainer, {
    loop: true,
    speed: 600,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 24,
    centeredSlides: true,
    autoHeight: false,
    allowTouchMove: true,
    draggable: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      760: {
        slidesPerView: 1.2,
        spaceBetween: 28,
      },
      1024: {
        slidesPerView: 1.4,
        spaceBetween: 32,
      },
      1280: {
        slidesPerView: 1.6,
        spaceBetween: 36,
      },
    },
  });
});

const skeletons = document.querySelectorAll('.skeleton');
skeletons.forEach((element) => {
  element.style.minHeight = `${element.dataset.height || 120}px`;
});

// Intersection observer for reveal animations
const animTargets = document.querySelectorAll('.plan-card, .compare-col, .prof-panel, .feature-item');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
animTargets.forEach((el) => io.observe(el));

// Tilt effect on cards (mouse move)
document.querySelectorAll('.plan-card').forEach((card) => {
  const inner = document.createElement('div');
  inner.className = 'card-inner';
  while (card.firstChild) inner.appendChild(card.firstChild);
  card.appendChild(inner);

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    inner.style.transform = `rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateZ(8px)`;
  });

  card.addEventListener('mouseleave', () => { inner.style.transform = 'none'; });
});

// Purchase modal flow
const modal = document.getElementById('purchaseModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalConfirm = document.getElementById('modalConfirm');
const modalCancel = document.getElementById('modalCancel');
const modalClose = document.querySelector('.modal-close');
let modalTarget = null;

if (modal && modalTitle && modalBody && modalConfirm && modalCancel && modalClose) {
  document.querySelectorAll('.plan-btn').forEach((btn) => {
    btn.addEventListener('click', (ev) => {
      ev.preventDefault();
      const plan = btn.dataset.plan || btn.textContent.trim();
      modalTarget = btn.href;
      modalTitle.textContent = `Confirmar: ${plan}`;
      modalBody.textContent = 'Você será direcionado para a página de pagamento com segurança. Deseja continuar?';
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modalTarget = null;
  }

  modalConfirm.addEventListener('click', () => {
    if (modalTarget) {
      window.open(modalTarget, '_blank', 'noopener');
      closeModal();
    }
  });
  modalCancel.addEventListener('click', closeModal);
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

// Footer reveal animation
const footerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      footerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

const footerTargets = document.querySelectorAll('.site-footer, .footer-cta-card, .footer-bottom');
footerTargets.forEach((item, index) => {
  item.style.transitionDelay = `${index * 100}ms`;
  footerObserver.observe(item);
});

/* Results gallery: tabs filter + lightbox */
function initResultsGallery() {
  const tabs = document.querySelectorAll('.tab-btn');
  const grid = document.getElementById('resultsGrid');
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.result-card'));

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const filter = tab.dataset.filter;
      cards.forEach((card) => {
        if (!filter || filter === 'all') {
          card.style.display = 'flex';
        } else if (card.classList.contains(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById('resultsLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  if (!lightbox || !lightboxImage) return;

  cards.forEach((card) => {
    const img = card.querySelector('.result-thumb');
    if (!img) return;
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt || '';
      lightboxCaption.textContent = `${card.dataset.name} — ${card.dataset.score} • ${card.dataset.type || ''}`;
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  const lbClose = lightbox.querySelector('.modal-close');
  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxCaption.textContent = '';
  }
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
}

/* Modal Premium - Bloqueio de Cartões */
const premiumModal = document.getElementById('premiumModal');
if (premiumModal) {
  // Prevenir click nos botoes dos cartões com .card-bloqueado
  document.body.addEventListener('click', (e) => {
    const cardBloqueado = e.target.closest('.card-bloqueado');
    if (cardBloqueado) {
      e.preventDefault();
      e.stopPropagation();
      premiumModal.classList.add('active');
    }
  }, true);

  // Botões de fechar do modal Premium
  const closeBtns = premiumModal.querySelectorAll('.premium-btn-close');
  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      premiumModal.classList.remove('active');
    });
  });

  premiumModal.addEventListener('click', (e) => { if (e.target === premiumModal) premiumModal.classList.remove('active'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && premiumModal.classList.contains('active')) premiumModal.classList.remove('active'); });
}
