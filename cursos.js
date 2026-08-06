const cursosData = [
  {
    id: 'simulados',
    titulo: 'Cursos de Simulados',
    descricao:
      'Pacote completo com cronograma guiado, simulados inéditos e banco de questões para evolução contínua.',
    destaques: ['Cronograma semanal orientado', 'Banco de questões atualizado', 'Acompanhamento de desempenho'],
    ctaTexto: 'Conhecer pacote',
    ctaLink: 'simulados.html',
    bloqueado: true
  },
  {
    id: 'd14',
    titulo: 'D.14',
    descricao:
      'Metodologia direcionada para consolidar base teórica e aplicação prática em questões de alta recorrência.',
    destaques: ['Método estruturado em blocos', 'Foco em revisão ativa', 'Treino com padrão da banca'],
    ctaTexto: 'Ver metodologia',
    ctaLink: 'simulados.html',
    bloqueado: true
  },
  {
    id: 'master-quadrix',
    titulo: 'Master Class - Técnica de prova para a Quadrix',
    descricao:
      'Treinamento de estratégias de resolução para ganhar velocidade, precisão e controle emocional na prova.',
    destaques: ['Gestão de tempo por bloco', 'Técnicas de eliminação de alternativas', 'Plano de reta final'],
    ctaTexto: 'Acessar master class',
    ctaLink: 'simulados.html',
    bloqueado: true
  },
  {
    id: 'questoes',
    titulo: 'Curso de Questões',
    descricao:
      'Trilha para fixação por prática intensiva, com subdivisão por nível e perfil de cargo.',
    trilhas: [
      'Conhecimentos específicos comuns para cargos de nível médio',
      'Conhecimentos específicos comuns para cargos de nível superior'
    ],
    ctaTexto: 'Explorar trilhas',
    ctaLink: 'simulados.html',
    bloqueado: true
  }
];

function renderCursos() {
  const grid = document.getElementById('coursesGrid');
  if (!grid) return;

  // Estrutura pronta para troca futura por consulta ao Firestore.
  const cards = cursosData
    .map((curso) => {
      const listaDestaques = (curso.destaques || [])
        .map((item) => `<li class="feature-item">${item}</li>`)
        .join('');

      const trilhas = (curso.trilhas || [])
        .map((item) => `<li class="course-track-item">${item}</li>`)
        .join('');

      return `
        <article class="info-card glass course-card ${curso.bloqueado ? 'card-bloqueado' : ''}">
          ${curso.bloqueado ? `<div class="ribbon-container">
                                 <div class="ribbon-em-breve ribbon-1"><div class="ribbon-text"><span>EM BREVE</span><span>EM BREVE</span><span>EM BREVE</span><span>EM BREVE</span><span>EM BREVE</span><span>EM BREVE</span></div></div>
                                 <div class="ribbon-em-breve ribbon-2"><div class="ribbon-text"><span>EM BREVE</span><span>EM BREVE</span><span>EM BREVE</span><span>EM BREVE</span><span>EM BREVE</span><span>EM BREVE</span></div></div>
                               </div>` : ''}
          <p class="eyebrow">${curso.id === 'questoes' ? 'Prática orientada' : 'Curso premium'}</p>
          <h3>${curso.titulo}</h3>
          <p>${curso.descricao}</p>
          ${listaDestaques ? `<ul class="features-list">${listaDestaques}</ul>` : ''}
          ${trilhas ? `<div class="course-track"><h4>Subdivisão de conhecimentos</h4><ul>${trilhas}</ul></div>` : ''}
          <div class="course-actions">
            <a class="btn btn-primary" href="${curso.ctaLink}">${curso.ctaTexto}</a>
          </div>
        </article>
      `;
    })
    .join('');

  grid.innerHTML = cards;
}

window.addEventListener('DOMContentLoaded', renderCursos);
