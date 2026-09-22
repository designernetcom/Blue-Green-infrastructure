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

const projectTabs = $$('[role="tab"]');
function activateTab(tab, focus = false) {
  projectTabs.forEach(item => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
  });
  if (focus) tab.focus();
}
projectTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % projectTabs.length;
    if (event.key === 'ArrowLeft') next = (index + projectTabs.length - 1) % projectTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = projectTabs.length - 1;
    if (next !== undefined) { event.preventDefault(); activateTab(projectTabs[next], true); }
  });
});

const projects = {
  reliance: {
    title: 'Reliance Corporate Park', category: 'FOUNDING-FIRM LEGACY · NAVI MUMBAI', image: 'assets/image15.jpg',
    alt: 'Circular landscaped courtyard at Reliance Corporate Park',
    paragraphs: ['Reliance Corporate Park, Ghansoli, is part of the corporate and industrial client legacy of Agrotech Engineers & Consultants, one of the three enterprises behind Blue & Green Infrastructure.', 'The campus reflects the scale of environments within our founding firms’ established portfolio, where landscape, water infrastructure and day-to-day operations share the same ground.'],
    note: 'Part of the established Agrotech Engineers & Consultants project legacy, brought together under the Blue & Green vision.'
  },
  nda: {
    title: 'National Defence Academy', category: 'FOUNDING-FIRM LEGACY · KHADAKWASLA, PUNE', image: 'assets/image28.jpg',
    alt: 'National Defence Academy gardens and main building',
    paragraphs: ['The National Defence Academy is included in Agrotech Engineers & Consultants’ institutional, defence and research client legacy.', 'It forms part of an established body of work across complex institutional environments that our founding partners bring to Blue & Green Infrastructure.'],
    note: 'Part of the established Agrotech Engineers & Consultants project legacy, brought together under the Blue & Green vision.'
  },
  bajaj: {
    title: 'Bajaj Auto, Chakan', category: 'FOUNDING-FIRM LEGACY · CHAKAN, MAHARASHTRA', image: 'assets/image16.jpg',
    alt: 'Landscaped industrial campus at Bajaj Auto, Chakan',
    paragraphs: ['Bajaj Auto’s Chakan manufacturing plant is featured in the corporate and industrial client legacy of Agrotech Engineers & Consultants.', 'The site photography brings together expansive planted grounds, water features and industrial architecture, illustrating the scale of the founding-firm portfolio.'],
    note: 'Part of the established Agrotech Engineers & Consultants project legacy, brought together under the Blue & Green vision.'
  },
  tata: {
    title: 'Ratan Tata Memorial', category: 'BLUE & GREEN COMMISSION · PIMPRI-CHINCHWAD, PUNE',
    paragraphs: ['At Tata Motors’ Pimpri-Chinchwad plant, Blue & Green Infrastructure delivered the water feature framing the Ratan Tata memorial, unveiled on 28 December 2025.', 'The rain curtain and bubbler nozzle installation was delivered as a complete package: design, equipment supply, installation, testing and commissioning of the electromechanical and plumbing works.', 'The engineering focused on an even water curtain, reliable operation and a composed visual backdrop to the memorial.'],
    note: 'Scope: Water feature design · Supply · Installation · Testing & commissioning · Maintenance handover'
  },
  adani: {
    title: 'Adani Data Centre Campuses', category: 'BLUE & GREEN COMMISSION · NAVI MUMBAI & HYDERABAD',
    paragraphs: ['A landscape and irrigation design consultancy programme across four sites: two in Navi Mumbai and two in Hyderabad, with a combined campus extent of 170.17 acres.', 'Blue & Green Infrastructure works alongside the architectural master plan, developing landscape design and irrigation documentation at the 60%, 90% and 100% design stages.', 'The integrated approach resolves planting zones, drainage, service routes and irrigation against the operational requirements of data centre campuses.'],
    note: 'Role: Design consultancy. Scope: Landscape & irrigation design. Campus extent: 170.17 acres across four sites.'
  },
  brahmacorp: {
    title: 'Brahmacorp Mini-India Theme Park', category: 'BLUE & GREEN COMMISSION · PERNEM, NORTH GOA',
    paragraphs: ['Blue & Green Infrastructure is engaged as landscape partner for Brahmacorp’s Mini-India theme park in North Goa.', 'The scope includes landscaping, irrigation and fountain works across the site, including water and landscape treatments around the park’s monuments.', 'Planting, irrigation schedules, water quality and maintainability must work together in an environment designed for continuous public use.'],
    note: 'Role: Landscape partner. Scope: Landscaping · Irrigation · Fountains & water features'
  }
};

const detailDialog = $('#detail-dialog');
const enquiryDialog = $('#enquiry-dialog');
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
  if (project.image) {
    const image = document.createElement('img');
    image.className = 'detail-image'; image.src = project.image; image.alt = project.alt;
    content.append(image);
  }
  const body = document.createElement('div');
  body.className = 'detail-body';
  const category = document.createElement('span'); category.className = 'eyebrow'; category.textContent = project.category;
  const title = document.createElement('h2'); title.id = 'detail-title'; title.textContent = project.title;
  body.append(category, title);
  project.paragraphs.forEach(text => { const p = document.createElement('p'); p.textContent = text; body.append(p); });
  const note = document.createElement('p'); note.className = 'detail-note'; note.textContent = project.note; body.append(note);
  const cta = document.createElement('button'); cta.className = 'button button-green'; cta.type = 'button'; cta.textContent = 'Plan a project with us ↗';
  cta.addEventListener('click', () => { detailDialog.close(); showDialog(enquiryDialog); });
  body.append(cta); content.append(body); showDialog(detailDialog);
}
$$('[data-project]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project)));

$$('[data-story]').forEach(button => button.addEventListener('click', () => {
  $('#detail-content').innerHTML = `<div class="detail-body"><span class="eyebrow">THREE ENTERPRISES. ONE SHARED VISION.</span><h2 id="detail-title">Experience, brought together.</h2><p>Based in Pune, Blue & Green Infrastructure combines complementary strengths in engineering, execution, technology and procurement.</p><h3>Mr. Anil S. Pund</h3><p><strong>Agrotech Engineers & Consultants · Established 1996</strong><br>An agricultural engineer with professional experience since 1990, bringing technical design, project execution and industrial supply expertise.</p><h3>Mr. Pramod Ballal</h3><p><strong>Aditi Irrigation Technologies Pvt. Ltd. · Established 2007</strong><br>A civil engineer working across landscape execution, automation and architectural water features, with pan-India delivery and international exposure.</p><h3>Mr. Rahul Kshirsagar</h3><p><strong>Samruddhi Enterprises · Established 2007</strong><br>An irrigation and water-management specialist bringing extensive procurement, supplier-network and commercial operations expertise.</p><p class="detail-note">Together, the founding enterprises support an integrated Design–Supply–Build–Maintain approach.</p></div>`;
  showDialog(detailDialog);
}));
$$('[data-enquiry]').forEach(button => button.addEventListener('click', () => showDialog(enquiryDialog)));

const form = $('#enquiry-form');
$$('input, textarea', form).forEach(input => input.addEventListener('input', () => input.setCustomValidity('')));
form.addEventListener('submit', event => {
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
  $('#slide-current').textContent = String(currentSlide + 1).padStart(2, '0');
}
function setSlideshow(playing) {
  clearInterval(slideshowTimer);
  slideshowTimer = playing ? setInterval(() => displaySlide(currentSlide + 1), 6500) : null;
  const control = $('#slide-play');
  control.setAttribute('aria-label', playing ? 'Pause slideshow' : 'Play slideshow');
  control.setAttribute('aria-pressed', String(playing));
  $('use', control).setAttribute('href', playing ? '#pause' : '#play');
}
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
  { title: 'About Blue & Green', text: 'Our company, founding enterprises and integrated approach.', keywords: 'about people partners company team pune', section: 'about' },
  { title: 'Our Expertise', text: 'Landscape, irrigation, water features and infrastructure.', keywords: 'services capabilities engineering design', section: 'expertise' },
  { title: 'Selected Projects', text: 'Founding-firm legacy and Blue & Green commissions.', keywords: 'work projects portfolio', section: 'projects' },
  { title: 'Our Legacy', text: 'Three enterprises. Decades of specialist experience.', keywords: 'history experience founders agrotech aditi samruddhi', section: 'legacy' },
  { title: 'Sustainability', text: 'Water efficiency, ecological care and responsible engineering.', keywords: 'sustainable ecology nature environment solar', section: 'sustainability' },
  { title: 'Plan Your Project', text: 'Prepare a project brief to share with our team.', keywords: 'contact enquiry email talk brief', section: 'contact' },
  ...Object.entries(projects).map(([key, project]) => ({ title: project.title, text: project.category, keywords: project.paragraphs.join(' '), project: key })),
  ...capabilities.map(item => ({ title: item.title, text: item.description, keywords: item.group, expertise: item.group }))
];
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
      else {
        const section = document.getElementById(item.section);
        section.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        history.replaceState(null, '', `#${item.section}`);
        const heading = $('h2', section);
        if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
      }
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

$('#year').textContent = new Date().getFullYear();
