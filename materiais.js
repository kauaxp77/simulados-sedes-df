const materiaisData = [
  {
    id: 'mat-1',
    titulo: 'Apostila de Conhecimentos Básicos',
    categoria: 'apostilas',
    tipo: 'PDF',
    descricao: 'Resumo estratégico de Português, Raciocínio Lógico e Atualidades para nível médio e superior.',
    tamanho: '2.4 MB',
    url: 'assets/pdfs/apostila-basicos-teste.pdf',
    bloqueado: true
  },
  {
    id: 'mat-2',
    titulo: 'Apostila de Legislação Socioassistencial',
    categoria: 'apostilas',
    tipo: 'PDF',
    descricao: 'Guia objetivo com os principais artigos e pontos de cobrança da banca Quadrix.',
    tamanho: '3.1 MB',
    url: 'assets/pdfs/apostila-legislacao-teste.pdf',
    bloqueado: true
  },
  {
    id: 'mat-3',
    titulo: 'Lista de Questões - Nível Médio',
    categoria: 'questoes',
    tipo: 'PDF',
    descricao: 'Pacote de questões comentadas para cargos de nível médio, com foco em revisão ativa.',
    tamanho: '1.8 MB',
    url: 'assets/pdfs/lista-questoes-medio-teste.pdf',
    bloqueado: true
  },
  {
    id: 'mat-4',
    titulo: 'Lista de Questões - Nível Superior',
    categoria: 'questoes',
    tipo: 'PDF',
    descricao: 'Questões por tema para consolidar conhecimentos específicos comuns de nível superior.',
    tamanho: '2.2 MB',
    url: 'assets/pdfs/lista-questoes-superior-teste.pdf',
    bloqueado: true
  }
];

function createMaterialCard(material) {
  return `
    <article class="info-card glass material-card ${material.bloqueado ? 'card-bloqueado' : ''}" data-categoria="${material.categoria}">
      ${material.bloqueado ? `<div class="ribbon-container">
                                 <div class="ribbon-em-breve ribbon-1"><div class="ribbon-text"><span>EM BREVE</span><span>EM BREVE</span><span>EM BREVE</span><span>EM BREVE</span><span>EM BREVE</span><span>EM BREVE</span></div></div>
                                 <div class="ribbon-em-breve ribbon-2"><div class="ribbon-text"><span>EM BREVE</span><span>EM BREVE</span><span>EM BREVE</span><span>EM BREVE</span><span>EM BREVE</span><span>EM BREVE</span></div></div>
                               </div>` : ''}
      <div class="material-meta">
        <span class="meta-chip">${material.tipo}</span>
        <span class="meta-chip">${material.categoria === 'apostilas' ? 'Apostilas' : 'Questões'}</span>
      </div>
      <h3>${material.titulo}</h3>
      <p>${material.descricao}</p>
      <div class="material-actions">
        <a class="btn btn-primary" href="${material.url}" data-download="true" data-filename="${material.titulo}.pdf">Download</a>
      </div>
    </article>
  `;
}

async function forceFileDownload(url, filename) {
  const response = await fetch(url, { method: 'GET' });
  if (!response.ok) {
    throw new Error('Falha ao baixar o arquivo.');
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const tempLink = document.createElement('a');
  tempLink.href = objectUrl;
  tempLink.download = filename || 'material.pdf';
  document.body.appendChild(tempLink);
  tempLink.click();
  tempLink.remove();
  URL.revokeObjectURL(objectUrl);
}

function initMaterialDownloads() {
  const grid = document.getElementById('materialsGrid');
  if (!grid) return;

  grid.addEventListener('click', async (event) => {
    const link = event.target.closest('a[data-download="true"]');
    if (!link) return;

    event.preventDefault();
    const url = link.getAttribute('href');
    const filename = link.getAttribute('data-filename') || 'material.pdf';
    if (!url) return;

    const originalText = link.textContent;
    link.textContent = 'Baixando...';
    link.style.pointerEvents = 'none';

    try {
      await forceFileDownload(url, filename);
    } catch (error) {
      alert('Não foi possível iniciar o download automático deste arquivo.');
    } finally {
      link.textContent = originalText;
      link.style.pointerEvents = '';
    }
  });
}

function renderMateriais(filter = 'todos') {
  const grid = document.getElementById('materialsGrid');
  if (!grid) return;

  // Estrutura preparada para futura substituição por documentos do Firestore.
  const items = materiaisData.filter((material) => filter === 'todos' || material.categoria === filter);

  if (!items.length) {
    grid.innerHTML = '<article class="info-card glass"><h3>Nenhum material encontrado</h3><p>Ajuste o filtro para visualizar outros arquivos.</p></article>';
    return;
  }

  grid.innerHTML = items.map(createMaterialCard).join('');
}

function initMateriaisFilters() {
  const tabs = document.querySelectorAll('.materials-toolbar .tab-btn');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((button) => {
        button.classList.remove('active');
        button.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderMateriais(tab.dataset.filter || 'todos');
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  renderMateriais();
  initMateriaisFilters();
  initMaterialDownloads();
});
