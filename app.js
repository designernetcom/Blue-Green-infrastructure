const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

// The contact endpoint is intentionally not invented. The brief is generated locally.
const menuButton = $('.menu-toggle');
const mobileNav = $('#mobile-nav');
const setMenu = (open) => {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mobileNav.classList.toggle('is-open', open);
  mobileNav.inert = !open;
  document.body.classList.toggle('menu-open', open);
};
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
$$('a', mobileNav).forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
  if (event.key === 'Tab' && menuButton.getAttribute('aria-expanded') === 'true') {
    const focusable = [menuButton, ...$$('a', mobileNav)];
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

// Every project names its executing firm. Partner-firm work is never presented as Blue & Green's own.
const agrotech = { partner: 'Mr. Anil S. Pund', firm: 'Agrotech Engineers & Consultants' };
const blueGreen = { partner: 'Blue & Green founding partners', firm: 'Blue & Green Infrastructure' };
const projects = {
  reliance: {
    ...agrotech, title: 'Reliance Corporate Park', location: 'Ghansoli, Navi Mumbai', category: 'PARTNERS’ TRACK RECORD · CORPORATE & INDUSTRIAL',
    details: 'Corporate campus listed in Agrotech’s corporate and industrial client record.',
    gallery: [['assets/image15.jpg', 'Circular landscaped courtyard in front of the Jio building at Reliance Corporate Park'], ['assets/image19.jpg', 'Aerial view of landscaped gardens and roads across Reliance Corporate Park'], ['assets/image23.jpg', 'Seasonal flower beds and lawns beside the glass office blocks']],
    paragraphs: ['Reliance Corporate Park at Ghansoli is part of the corporate and industrial client record of Agrotech Engineers & Consultants, the firm Mr. Anil Pund founded in 1996.', 'The campus shows the scale of environment in Agrotech’s portfolio: landscaped courtyards, planted avenues and seasonal beds woven through a working corporate headquarters.']
  },
  bajaj: {
    ...agrotech, title: 'Bajaj Auto Manufacturing Plant', location: 'Chakan, Pune', category: 'PARTNERS’ TRACK RECORD · CORPORATE & INDUSTRIAL',
    details: 'Manufacturing campus listed in Agrotech’s corporate and industrial client record.',
    gallery: [['assets/image16.jpg', 'Aerial view of lawns, planting and a circular water feature at Bajaj Auto, Chakan'], ['assets/image27.png', 'Office building fronted by a reflecting pool with fountain jets'], ['assets/image21.jpg', 'Main entrance gateway to the Bajaj Auto plant']],
    paragraphs: ['Bajaj Auto’s Chakan manufacturing plant is part of the corporate and industrial client record of Agrotech Engineers & Consultants.', 'The site brings together expansive planted grounds, formal water features and industrial architecture.']
  },
  nagothane: {
    ...agrotech, title: 'Reliance Industries, Nagothane Manufacturing Division', location: 'Nagothane, Raigad', category: 'PARTNERS’ TRACK RECORD · CORPORATE & INDUSTRIAL',
    details: 'Industrial complex listed in Agrotech’s corporate and industrial client record.',
    gallery: [['assets/image24.jpg', 'Aerial view of the Nagothane manufacturing division set within green landscape and water bodies'], ['assets/image18.jpg', 'Tree-lined entrance avenue at the Nagothane manufacturing division']],
    paragraphs: ['Reliance Industries’ Nagothane Manufacturing Division in Raigad district is part of Agrotech Engineers & Consultants’ corporate and industrial client record.', 'Its green buffers, avenues and water bodies show landscape working at industrial scale.']
  },
  dharwad: {
    ...agrotech, title: 'Tata Motors, Dharwad', location: 'Dharwad, Karnataka', category: 'PARTNERS’ TRACK RECORD · CORPORATE & INDUSTRIAL',
    details: 'Manufacturing plant listed in Agrotech’s corporate and industrial client record.',
    gallery: [['assets/image22.jpg', 'Topiary lettering and flower beds at the Tata Motors Dharwad entrance'], ['assets/image30.png', 'Landscaped approach to the Tata Motors Dharwad gateway']],
    paragraphs: ['Tata Motors’ Dharwad plant is part of Agrotech Engineers & Consultants’ corporate and industrial client record.', 'Tata Motors has been a client of the partners’ firms across both its Pimpri and Dharwad plants.']
  },
  nda: {
    ...agrotech, title: 'National Defence Academy', location: 'Khadakwasla, Pune', category: 'PARTNERS’ TRACK RECORD · INSTITUTIONAL & DEFENCE',
    details: 'Defence campus listed in Agrotech’s institutional, defence and research client record.',
    gallery: [['assets/image28.jpg', 'Formal gardens and the main building of the National Defence Academy']],
    paragraphs: ['The National Defence Academy is part of Agrotech Engineers & Consultants’ institutional, defence and research client record.', 'It reflects the partners’ experience in complex institutional environments.']
  },
  serum: {
    ...agrotech, title: 'Serum Institute of India', location: 'Hadapsar, Pune', category: 'PARTNERS’ TRACK RECORD · INSTITUTIONAL & RESEARCH',
    details: 'Research and manufacturing campus listed in Agrotech’s institutional client record.',
    gallery: [['assets/image31.jpg', 'Landscaped entrance to the Serum Institute of India campus at Hadapsar']],
    paragraphs: ['The Serum Institute of India is part of Agrotech Engineers & Consultants’ institutional, defence and research client record.']
  },
  tata: {
    ...blueGreen, title: 'Ratan Tata Memorial Water Curtain', location: 'Tata Motors plant, Pimpri-Chinchwad, Pune', category: 'BLUE & GREEN COMMISSION · UNVEILED 28 DECEMBER 2025',
    details: 'Rain curtain and bubbler nozzle water feature: design, supply, installation, testing and commissioning.',
    paragraphs: ['On 28 December 2025, the birth anniversary of the late Ratan Tata, a life-size statue of the industrialist was unveiled at Tata Motors’ Pimpri-Chinchwad plant, part of a wider initiative to establish memorials at its major manufacturing sites.', 'Blue & Green Infrastructure delivered the water feature that frames the memorial as a single package: design, supply, installation, testing and commissioning of the complete electromechanical and plumbing works.', 'The feature sits within a working plant, so it must run reliably and quietly, hold an even, unbroken curtain, and frame the figure without competing with it.'],
    list: ['Design of the water feature plumbing and electromechanical system', 'Supply of pumps, manifolds, nozzles, valves, filtration and control equipment', 'Installation of the rain curtain manifold and bubbler nozzle array', 'Testing, commissioning and performance verification', 'Handover to plant maintenance']
  },
  adani: {
    ...blueGreen, title: 'Adani Data Centre Campuses', location: 'Navi Mumbai ×2 · Hyderabad ×2', category: 'BLUE & GREEN COMMISSION · DESIGN CONSULTANCY',
    details: 'Landscape and irrigation design consultancy across 170.17 acres, with Ar. Gautami Renuse of The Thin Architect.',
    paragraphs: ['The programme comprises data centre campuses extending to 170.17 acres across four sites, with multiple data centre buildings and ancillary infrastructure including a DG building, HSD yard and associated services.', 'In design collaboration with Principal Architect Ar. Gautami Renuse of The Thin Architect, Blue & Green issues landscape design and irrigation documentation at the 60%, 90% and 100% design stages, alongside the architectural package at each gate.', 'Working concurrently with the architect lets levels, drainage falls, service routes and planting zones be resolved while they can still be changed on paper.'],
    list: ['Water accountability: demonstrably efficient, low-draw irrigation', 'Security zoning: planting that respects sightlines, perimeter security and controlled access', 'Service coordination: routes resolved against DG buildings, HSD yards, cable trenches and utility corridors', 'Operational continuity: maintenance that never interrupts a facility that cannot go offline']
  },
  brahmacorp: {
    ...blueGreen, title: 'Brahmacorp Mini-India Theme Park', location: 'Pernem, North Goa', category: 'BLUE & GREEN COMMISSION · LANDSCAPE PARTNER',
    details: 'Landscaping, irrigation and fountain works across the park, including water treatments to its monuments.',
    paragraphs: ['Blue & Green Infrastructure is the appointed landscape partner for Brahmacorp’s theme park in North Goa, responsible for landscape execution, irrigation automation and fountain engineering.', 'Planting must hold its appearance under continuous footfall, irrigation must run around visitor hours, and water features within reach of the public must be safe, clean and fail-safe.'],
    list: ['Landscape design and execution across the park', 'Irrigation for park planting and landscaped zones', 'Fountains and water treatments to the monuments: Gateway of India, Swami Vivekananda Memorial, Golden Temple, Taj Mahal, Sher Shah Tomb, Statue of Unity and Jal Mahal', 'Mist system and monument filtration systems']
  }
};

const aditiProjects = [
  ['Capgemini Software Park', 'Hinjewadi, Pune', 'tech'], ['Infosys Campus', '', 'tech'], ['Tata Consultancy Services Campus', '', 'tech'], ['Microsoft', 'Hyderabad', 'tech'], ['Wipro', 'Pune', 'tech'], ['Ascendas IT Park', 'Kharadi, Pune', 'tech'], ['Bagmane Group', 'Bengaluru', 'tech'], ['Principal Global Services Pvt. Ltd.', 'Pune', 'tech'], ['Forbes Marshall', 'Pune', 'tech'], ['Volkswagen Car Plant', 'Pune', 'tech'], ['ITC', 'Ranjangaon', 'tech'],
  ['GMR Hyderabad International Airport', 'Hyderabad', 'civic'], ['AURIC', 'Bidkin, Chhatrapati Sambhajinagar', 'civic'], ['Bruhat Bengaluru Mahanagara Palike', 'Bengaluru', 'civic'], ['Pune Municipal Corporation · Okayama Garden', 'Pune', 'civic'], ['STP Unit, Chikhali · PCMC', 'Pimpri-Chinchwad', 'civic'], ['Chhatrapati Raje Shivaji Udyan', 'Wadgaon Sheri, Pune', 'civic'], ['IIT Hyderabad', 'Hyderabad', 'civic'], ['IIT Gandhinagar', 'Gandhinagar', 'civic'], ['Capital Center', 'Raipur', 'civic'], ['Dumas Road', 'Surat', 'civic'],
  ['Residence Antilia', 'Mumbai', 'res'], ['Lodha Park · Lodha Place · The Park', 'Mumbai', 'res'], ['Godrej Serenity', 'Mumbai', 'res'], ['Life Republic, Kolte Patil', 'Pune', 'res'], ['Lavasa Corporation Ltd.', 'Pune', 'res'], ['Pune Golf Course (18 holes)', 'Pune', 'res'], ['RSI Army Golf Course', 'Pune', 'res'], ['Poonawalla Stud Farms', 'Pune', 'res'], ['GIFT Samruddhi Sarovar', 'Ahmedabad', 'res'], ['Ramnath City', 'Nagpur', 'res'], ['RAS Township', 'Beawar, Rajasthan', 'res'], ['Finedine Hotel', 'Belgaum', 'res']
];
const sectorNames = { tech: 'Technology & corporate campuses', civic: 'Infrastructure, civic & institutional', res: 'Residential, hospitality & estates' };

const detailDialog = $('#detail-dialog');
const enquiryDialog = $('#enquiry-dialog'); // Absent on the contact page, where the form is inline.
function showDialog(dialog) {
  setMenu(false);
  setSlideshow(false);
  dialog.showModal();
  document.body.classList.add('modal-open');
}
$$('dialog').forEach(dialog => {
  $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.toggle('modal-open', $$('dialog[open]').length > 0));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});
function openProject(key) {
  const project = projects[key];
  const content = $('#detail-content');
  content.replaceChildren();
  if (project.gallery) {
    const figure = document.createElement('figure'); figure.className = 'detail-gallery';
    const main = document.createElement('img'); main.className = 'detail-image';
    const setImage = ([src, alt]) => { main.src = src; main.alt = alt; };
    setImage(project.gallery[0]); figure.append(main);
    if (project.gallery.length > 1) {
      const thumbs = document.createElement('div'); thumbs.className = 'detail-thumbs';
      project.gallery.forEach((image, index) => {
        const thumb = document.createElement('button'); thumb.type = 'button';
        thumb.setAttribute('aria-label', `Show photograph ${index + 1} of ${project.gallery.length}`);
        thumb.setAttribute('aria-pressed', String(index === 0));
        const img = document.createElement('img'); img.src = image[0]; img.alt = '';
        thumb.append(img);
        thumb.addEventListener('click', () => { setImage(image); $$('button', thumbs).forEach(item => item.setAttribute('aria-pressed', String(item === thumb))); });
        thumbs.append(thumb);
      });
      figure.append(thumbs);
    }
    content.append(figure);
  }
  const body = document.createElement('div');
  body.className = 'detail-body';
  const category = document.createElement('span'); category.className = 'eyebrow'; category.textContent = project.category;
  const title = document.createElement('h2'); title.id = 'detail-title'; title.textContent = project.title;
  const meta = document.createElement('dl'); meta.className = 'credit-line detail-credit';
  [['Project', project.title], ['Location', project.location], ['Partner', project.partner], ['Executing firm', project.firm], ['Project details', project.details]].forEach(([term, value]) => {
    const row = document.createElement('div'); const dt = document.createElement('dt'); const dd = document.createElement('dd');
    dt.textContent = term; dd.textContent = value; row.append(dt, dd); meta.append(row);
  });
  body.append(category, title, meta);
  project.paragraphs.forEach(text => { const p = document.createElement('p'); p.textContent = text; body.append(p); });
  if (project.list) {
    const list = document.createElement('ul'); list.className = 'detail-list';
    project.list.forEach(text => { const li = document.createElement('li'); li.textContent = text; list.append(li); });
    body.append(list);
  }
  const cta = document.createElement('button'); cta.className = 'button button-green'; cta.type = 'button'; cta.textContent = 'Plan a project with us ↗';
  cta.addEventListener('click', () => { detailDialog.close(); openEnquiry(); });
  body.append(cta); content.append(body); showDialog(detailDialog);
}
$$('[data-project]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project)));

// The contact page shows the brief form inline; every other page opens it in a dialog.
function openEnquiry() {
  if (enquiryDialog) { showDialog(enquiryDialog); return; }
  const firstField = $('#enquiry-form input');
  firstField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  firstField?.focus({ preventScroll: true });
}
$$('[data-enquiry]').forEach(button => button.addEventListener('click', openEnquiry));

const form = $('#enquiry-form');
$$('input, textarea', form).forEach(input => input.addEventListener('input', () => input.setCustomValidity('')));
form?.addEventListener('submit', event => {
  event.preventDefault();
  for (const input of $$('input[required], textarea[required]', form)) {
    if (!input.value.trim() || (input.minLength > 0 && input.value.trim().length < input.minLength)) {
      input.setCustomValidity(input.tagName === 'TEXTAREA' ? 'Please share at least 10 characters about your project.' : 'Please enter this detail.');
      input.reportValidity(); return;
    }
  }
  const fields = Object.fromEntries([...new FormData(form)].map(([key, value]) => [key, String(value).trim()]));
  const brief = ['BLUE & GREEN INFRASTRUCTURE', 'PROJECT ENQUIRY BRIEF', '', `Prepared: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, '', `Name: ${fields.name}`, `Email: ${fields.email}`, `Organisation: ${fields.company || 'Not specified'}`, `Project location: ${fields.location}`, `Area of expertise: ${fields.service}`, '', 'PROJECT VISION', fields.message, '', 'This brief was prepared locally. It has not been sent to Blue & Green Infrastructure.'].join('\r\n');
  const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = 'Blue-and-Green-Project-Brief.txt';
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
  $('#form-status').textContent = 'Your project brief is ready to download. Share the file with your Blue & Green contact to start the conversation. No enquiry has been sent.';
});

// The photography remains still until the visitor chooses to play the slideshow.
const slides = $$('.hero-slide');
let currentSlide = 0;
let slideshowTimer = null;
function displaySlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === currentSlide);
    slide.setAttribute('aria-hidden', String(i !== currentSlide));
  });
  const slide = slides[currentSlide];
  $('#slide-title').textContent = slide.dataset.title;
  $('#slide-location').textContent = slide.dataset.location;
  $('#slide-credit').textContent = slide.dataset.credit;
  $('#slide-current').textContent = String(currentSlide + 1).padStart(2, '0');
}
function setSlideshow(playing) {
  clearInterval(slideshowTimer);
  const control = $('#slide-play');
  if (!control) return;
  slideshowTimer = playing ? setInterval(() => displaySlide(currentSlide + 1), 6500) : null;
  control.setAttribute('aria-label', playing ? 'Pause slideshow' : 'Play slideshow');
  control.setAttribute('aria-pressed', String(playing));
  $('use', control).setAttribute('href', playing ? '#pause' : '#play');
}
if (slides.length) {
  $('#slide-next').addEventListener('click', () => { setSlideshow(false); displaySlide(currentSlide + 1); });
  $('#slide-prev').addEventListener('click', () => { setSlideshow(false); displaySlide(currentSlide - 1); });
  $('#slide-play').addEventListener('click', () => setSlideshow(!slideshowTimer));
  menuButton.addEventListener('click', () => setSlideshow(false));
  document.addEventListener('visibilitychange', () => { if (document.hidden) setSlideshow(false); });
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => setSlideshow(false));
  $('.hero').addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    setSlideshow(false);
    displaySlide(currentSlide + (event.key === 'ArrowRight' ? 1 : -1));
  });
}

const capabilities = [
  { group: 'landscape', title: 'Landscape & horticulture', description: 'Soil remediation, native planting, mature specimen trees and expansive lawns, brought together with horticultural knowledge and sustainable landscape design.' },
  { group: 'water', title: 'Smart irrigation & automation', description: 'Drip and sprinkler networks, weather-responsive central controllers and precise root-zone irrigation that deliver water where and when it is needed.' },
  { group: 'water', title: 'Fountains & water features', description: 'Reflecting pools, water curtains and dynamic fountains combining hydraulic engineering, lighting, filtration and controls.' },
  { group: 'water', title: 'Lake & pond management', description: 'Aeration, filtration and ecological restoration for lakes, ponds and reservoirs, supporting clearer water and balanced aquatic environments.' },
  { group: 'infrastructure', title: 'Hardscape & civil engineering', description: 'Site grading, structural masonry, stone pathways, retaining walls and storm-water systems that form the foundation of resilient landscapes.' },
  { group: 'infrastructure', title: 'Play & outdoor recreation', description: 'Age-appropriate outdoor play environments for communities, schools and public spaces, with considered equipment and safety surfacing.' },
  { group: 'infrastructure', title: 'Green technology & solar', description: 'Solar pumping, greenhouses and controlled-environment solutions connecting efficient water infrastructure with renewable energy.' },
  { group: 'landscape', title: 'Landscape care & maintenance', description: 'Seasonal horticultural care, water audits and preventive equipment maintenance that keep a landscape performing long after handover.' }
];
const expertiseTitles = { landscape: 'Landscape', water: 'Water', infrastructure: 'Infrastructure', all: 'Our integrated capabilities' };
function openExpertise(group) {
  const body = document.createElement('div');
  body.className = 'detail-body';
  const eyebrow = document.createElement('span'); eyebrow.className = 'eyebrow'; eyebrow.textContent = 'DESIGN · SUPPLY · BUILD · MAINTAIN';
  const title = document.createElement('h2'); title.id = 'detail-title'; title.textContent = expertiseTitles[group];
  const intro = document.createElement('p'); intro.textContent = 'Specialist knowledge, connected from the first design conversation to long-term care.';
  const list = document.createElement('div'); list.className = 'capability-list';
  capabilities.filter(item => group === 'all' || item.group === group).forEach(item => {
    const article = document.createElement('article');
    const heading = document.createElement('h3'); heading.textContent = item.title;
    const description = document.createElement('p'); description.textContent = item.description;
    article.append(heading, description); list.append(article);
  });
  body.append(eyebrow, title, intro, list);
  $('#detail-content').replaceChildren(body);
  showDialog(detailDialog);
}
$$('[data-expertise]').forEach(button => button.addEventListener('click', () => openExpertise(button.dataset.expertise)));

// Local search indexes only the public content of this homepage.
const searchDialog = $('#search-dialog');
const searchInput = $('#site-search');
const searchIndex = [
  { title: 'About Blue & Green', text: 'Established in Pune on 18 December 2025.', keywords: 'about company pune established 2025', href: 'about.html' },
  { title: 'Our History', text: 'Blue & Green’s establishment and our partners’ firm histories.', keywords: 'history timeline 1996 2007 legacy', href: 'about.html#history' },
  { title: 'Founding Partners', text: 'Mr. Anil S. Pund, Mr. Pramod Ballal and Mr. Rahul Kshirsagar.', keywords: 'people partners founders team agrotech aditi hydroscape samruddhi pund ballal kshirsagar', href: 'partners.html' },
  { title: 'Our Expertise', text: 'Landscape, irrigation, water features and infrastructure.', keywords: 'services capabilities engineering design', href: 'expertise.html' },
  { title: 'Engineering Lifecycle', text: 'Five phases from hydraulic audit to stewardship.', keywords: 'process method cad schematic phases', href: 'expertise.html#method' },
  { title: 'Blue & Green Commissions', text: 'Flagship projects executed as Blue & Green.', keywords: 'work projects commissions', href: 'projects.html' },
  { title: 'Our Partners’ Project Track Record', text: 'Projects executed by our partners’ firms.', keywords: 'portfolio legacy sites agrotech aditi', href: 'track-record.html' },
  { title: 'Selected Clients of Our Partners', text: 'Clients served by our partner firms.', keywords: 'clients tata bajaj reliance cummins kirloskar', href: 'clients.html' },
  { title: 'Our Architects & PMC Network', text: 'Architects, landscape architects and project management consultants.', keywords: 'architect pmc consultant network thin venkataramanan halcrow', href: 'network.html' },
  { title: 'Sustainability', text: 'Water efficiency, ecological care and responsible engineering.', keywords: 'sustainable ecology nature environment solar', href: 'expertise.html#sustainability' },
  { title: 'Plan Your Project', text: 'Prepare a project brief to share with our team.', keywords: 'contact enquiry email talk brief', href: 'contact.html' },
  ...Object.entries(projects).map(([key, project]) => ({ title: project.title, text: `${project.location} · ${project.firm}`, keywords: `${project.category} ${project.paragraphs.join(' ')}`, project: key })),
  ...aditiProjects.map(([name, location, sector]) => ({ title: name, text: `${location ? location + ' · ' : ''}Aditi Irrigation Technologies`, keywords: `${sectorNames[sector]} ballal aditi`, href: 'track-record.html#aditi-index' })),
  ...capabilities.map(item => ({ title: item.title, text: item.description, keywords: item.group, expertise: item.group }))
];
// Scroll within the current page when possible; otherwise load the target page.
const pagePath = path => (path.endsWith('/') ? path + 'index.html' : path);
function goTo(href) {
  const url = new URL(href, location.href);
  const target = url.hash && pagePath(url.pathname) === pagePath(location.pathname) ? document.getElementById(url.hash.slice(1)) : null;
  if (!target) { location.href = url.href; return; }
  target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  history.replaceState(null, '', url.hash);
  const heading = $('h2, h3', target);
  if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
}
function renderSearch() {
  const query = searchInput.value.trim().toLowerCase();
  const terms = query.split(/\s+/).filter(Boolean);
  const matching = query ? searchIndex.filter(item => terms.every(term => `${item.title} ${item.text} ${item.keywords}`.toLowerCase().includes(term))) : searchIndex.slice(0, 6);
  $('#search-count').textContent = query ? `${matching.length} ${matching.length === 1 ? 'result' : 'results'}${matching.length ? '' : '. Try landscape, water, a location or a project name.'}` : 'Explore the website';
  $('#search-results').replaceChildren();
  matching.forEach(item => {
    const button = document.createElement('button'); button.className = 'search-result'; button.type = 'button';
    const text = document.createElement('div');
    const title = document.createElement('strong'); title.textContent = item.title;
    const description = document.createElement('span'); description.textContent = item.text;
    text.append(title, description);
    button.append(text);
    button.insertAdjacentHTML('beforeend', '<svg class="icon" aria-hidden="true"><use href="#arrow-up-right"/></svg>');
    button.addEventListener('click', () => {
      searchDialog.close();
      if (item.project) openProject(item.project);
      else if (item.expertise) openExpertise(item.expertise);
      else goTo(item.href);
    });
    $('#search-results').append(button);
  });
}
$('.search-trigger').addEventListener('click', () => {
  searchInput.value = '';
  renderSearch();
  showDialog(searchDialog);
  searchInput.focus();
});
searchInput.addEventListener('input', renderSearch);
searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') { event.preventDefault(); $('.search-result')?.click(); }
  if (event.key === 'ArrowDown') { event.preventDefault(); $('.search-result')?.focus(); }
});

// Aditi's marquee project index, filterable by sector.
const aditiRows = $('#aditi-rows');
if (aditiRows) {
  const indexLabels = ['No.', 'Project', 'Location', 'Sector', 'Partner · Executing firm'];
  aditiProjects.forEach(([name, location, sector], index) => {
    const row = document.createElement('tr'); row.dataset.sector = sector;
    [String(index + 1).padStart(2, '0'), name, location || 'Not specified', sectorNames[sector], 'Mr. Pramod Ballal · Aditi Irrigation Technologies'].forEach((text, column) => {
      const cell = document.createElement(column === 1 ? 'th' : 'td');
      if (column === 1) cell.scope = 'row';
      cell.textContent = text; cell.dataset.label = indexLabels[column];
      row.append(cell);
    });
    aditiRows.append(row);
  });
  function filterIndex(filter) {
    let shown = 0;
    $$('tr', aditiRows).forEach(row => { const visible = filter === 'all' || row.dataset.sector === filter; row.hidden = !visible; shown += visible; });
    $$('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
    $('#index-count').textContent = `Showing ${shown} of ${aditiProjects.length} projects`;
  }
  $$('[data-filter]').forEach(button => button.addEventListener('click', () => filterIndex(button.dataset.filter)));
  filterIndex('all');
}

// Sections ease into view once; reduced-motion visitors see them immediately.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('has-reveal');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  $$('.reveal').forEach(element => observer.observe(element));
}

$('#year').textContent = new Date().getFullYear();
