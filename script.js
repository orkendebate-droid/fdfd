// ==========================================================================
// DECKFLOW AI — Interactive Behaviors & Simulator
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide SVG Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initFilters();
});

// Category Filter Handling
function initFilters() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.platform-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterValue = pill.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Preset Prompts for Simulator
const presets = {
  'ai-pitch': 'Питч стартапа в сфере AI-агентов для автоматизации B2B продаж: проблема рутины, метрики роста MRR +225%, размер рынка $45B, запрос инвестиций $2M',
  'q3-finance': 'Квартальный финансовый отчет Q3 2026: структура выручки по сегментам, EBITDA маржинальность 38%, прогноз чистой прибыли до конца года',
  'marketing': 'Маркетинговая стратегия запуска EdTech продукта: каналы привлечения, юнит-экономика CAC/LTV, контент-план на 90 дней и цели по конверсиям'
};

function applyPreset(key) {
  const textarea = document.getElementById('promptInput');
  if (textarea && presets[key]) {
    textarea.value = presets[key];
    textarea.focus();
  }
}

// Simulator Generation Effect
function simulateGeneration() {
  const btn = document.getElementById('btnGen');
  const previewTitle = document.getElementById('previewTitle');
  const mockupImage = document.getElementById('mockupImage');
  const overlay = document.getElementById('dynamicOverlay');

  if (!btn) return;

  btn.innerHTML = `<span>Генерация...</span> <i data-lucide="loader-2"></i>`;
  if (window.lucide) window.lucide.createIcons();

  if (mockupImage) {
    mockupImage.style.opacity = '0.4';
  }

  setTimeout(() => {
    btn.innerHTML = `<span>Готово!</span> <i data-lucide="check"></i>`;
    if (window.lucide) window.lucide.createIcons();

    if (mockupImage) {
      mockupImage.style.opacity = '1';
    }

    if (previewTitle) {
      previewTitle.textContent = 'Slide 1 — Generated Deck: AI Pitch Deck 2026';
    }

    if (overlay) {
      overlay.innerHTML = `
        <div class="overlay-card-float">
          <i data-lucide="sparkles"></i>
          <div>
            <strong>Сгенерировано 16 слайдов</strong>
            <span>Готово к экспорту в PPTX / Web</span>
          </div>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
    }

    setTimeout(() => {
      btn.innerHTML = `<span>Сгенерировать</span> <i data-lucide="sparkles"></i>`;
      if (window.lucide) window.lucide.createIcons();
    }, 2500);
  }, 900);
}

// Slide Navigation Simulation
let currentSlide = 14;
const totalSlides = 28;

function nextSlide() {
  if (currentSlide < totalSlides) {
    currentSlide++;
    updateSlideIndicator();
  }
}

function prevSlide() {
  if (currentSlide > 1) {
    currentSlide--;
    updateSlideIndicator();
  }
}

function updateSlideIndicator() {
  const indicator = document.querySelector('.vp-page-indicator');
  const title = document.getElementById('previewTitle');
  if (indicator) {
    indicator.textContent = `Слайд ${currentSlide} из ${totalSlides}`;
  }
  if (title) {
    title.textContent = `Slide ${currentSlide}/${totalSlides} — Traction & Growth Metrics`;
  }
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

function previewPlatform(platformName) {
  scrollToSection('prompt-lab');
  const engineSelect = document.getElementById('engineSelect');
  if (engineSelect) {
    if (platformName === 'gamma') engineSelect.value = 'gamma';
    if (platformName === 'canva') engineSelect.value = 'canva';
    if (platformName === 'beautiful') engineSelect.value = 'beautiful';
  }
  simulateGeneration();
}
