const DECKS = [
  { id: 1, name: "De La Rue Standard Pack", back: "card-back-1", year: "c. 1880", origin: "England", manufacturer: "Thomas De La Rue", description: "Thomas De La Rue & Co. began producing playing cards in the 1830s after acquiring the stamp duty contract from the British government. Their Standard Pack became the benchmark for English-suited decks throughout the Victorian era. The characteristic red diamond-pattern back was widely imitated and remained in near-continuous production for over fifty years. De La Rue's cards were noted for their high-quality lithography and crisp corner indices, among the first English manufacturers to adopt them." },
  { id: 2, name: "Dondorf Rhinegold", back: "card-back-2", year: "1906", origin: "Germany", manufacturer: "B. Dondorf GmbH", description: "The Rhinegold deck from Bernhard Dondorf's Frankfurt atelier is widely regarded as one of the finest examples of German chromolithographic card production. Designed to coincide with the popularity of Wagner's Ring Cycle operas, the court figures are rendered in a richly detailed romantic-historicist style drawing on medieval Germanic motifs. The back pattern — a repeating mandala in deep navy and gold — is distinctive among Dondorf's output and commands high prices among collectors." },
  { id: 3, name: "Fournier No. 26", back: "card-back-3", year: "1924", origin: "Spain", manufacturer: "Heraclio Fournier", description: "Fournier of Vitoria-Gasteiz had been printing cards since 1868, but the No. 26 — commissioned for the Spanish national market — represented a significant refinement of the Spanish-suited tradition. The courts are elegant and restrained compared to the more elaborate German contemporaries, drawn in a clean art deco-adjacent style with minimal ornamentation. The deep green back with gold ruled border became a standard reference point for Spanish casino decks well into the mid-century." },
  { id: 4, name: "USPC Bicycle Rider Back", back: "card-back-4", year: "c. 1885", origin: "United States", manufacturer: "USPC / Russell & Morgan", description: "The Bicycle brand was introduced by Russell & Morgan (later consolidated into the United States Playing Card Company) in the mid-1880s, and the Rider Back design — featuring cherubs on bicycles — was part of the first run. It quickly became America's best-selling deck, prized for its air-cushion finish which enabled smooth dealing and shuffling. The courts were redrawn several times through the early 20th century but the back design has remained essentially unchanged, making it one of the longest-lived card designs in continuous production." },
  { id: 5, name: "Congress No. 606", back: "card-back-5", year: "1881", origin: "United States", manufacturer: "Russell & Morgan", description: "Congress cards were positioned as the premium tier of the Russell & Morgan catalogue from their first appearance in 1881, featuring a thicker stock, a linen finish, and gold-edged gilding on the first editions. The No. 606 back — a repeating fleur-de-lis in antique gold on ivory — was aimed at the parlour market and frequently appeared in hotel lounges and gentlemen's clubs. The Congress brand later passed to USPC and continues today, though the original finishes have not been replicated." },
  { id: 6, name: "NYCC Transformation Deck", back: "card-back-6", year: "c. 1878", origin: "United States", manufacturer: "New York Card Company", description: "Transformation decks — in which each pip is incorporated into an illustrated scene — enjoyed a vogue in the second half of the nineteenth century, originating largely in Germany and Austria before spreading to English and American producers. This example from the short-lived New York Card Company is exceptional for the density and wit of its illustrations: each pip card contains a fully realised composition, reportedly drawn by a staff artist whose identity has been lost. Fewer than twelve complete examples are known to survive." }
];

const RANKS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
const SUITS = ['♠','♥','♦','♣'];
const RED = new Set(['♥','♦']);

function buildGallery() {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '';
  DECKS.forEach(deck => {
    const wrapper = document.createElement('div');
    wrapper.className = 'sleeve-wrapper';
    wrapper.innerHTML = `
      <div class="sleeve" onclick="openDeck(${deck.id})" title="${deck.name}">
        <div class="card ${deck.back}"></div>
      </div>
      <span class="sleeve-label">${deck.name}</span>
    `;
    grid.appendChild(wrapper);
  });
}

function buildFaceGrid() {
  const grid = document.getElementById('face-grid');
  grid.innerHTML = '';
  SUITS.forEach(suit => {
    RANKS.forEach(rank => {
      const sleeve = document.createElement('div');
      sleeve.className = 'face-sleeve';
      const color = RED.has(suit) ? 'red' : 'black';
      sleeve.innerHTML = `
        <div class="face-card ${color}">
          <span class="rank">${rank}<br>${suit}</span>
          <span class="suit-center">${suit}</span>
        </div>`;
      grid.appendChild(sleeve);
    });
  });
}

function openDeck(id) {
  const deck = DECKS.find(d => d.id === id);
  if (!deck) return;
  document.getElementById('deck-title').textContent = deck.name;
  document.getElementById('deck-date').textContent = deck.year;
  document.getElementById('deck-origin').textContent = deck.origin;
  document.getElementById('deck-manufacturer').textContent = deck.manufacturer;
  document.getElementById('deck-description').textContent = deck.description;
  buildFaceGrid();
  showView('deck');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + name).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleExisting(el) {
  document.getElementById('existing-select-row').style.display =
    el.value === 'existing' ? 'block' : 'none';
}

function handleSubmit(e) {
  e.preventDefault();
  document.querySelector('.submit-form').style.display = 'none';
  document.getElementById('success-msg').style.display = 'block';
}

buildGallery();
