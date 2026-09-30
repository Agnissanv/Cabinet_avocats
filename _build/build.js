// Génère les pages HTML statiques : node _build/build.js
const fs = require('fs');
const path = require('path');
const out = path.join(__dirname, '..');

const SITE = 'Cabinet Kouadio & Associés';
const CODE_AZ_URL = 'https://agnissanisaac.com';
const PHONE = '+225 27 20 00 00 00';
const WA = 'https://wa.me/2250700000000?text=Bonjour%2C%20je%20souhaite%20un%20rendez-vous.';

const lockIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="1"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';
const waIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z"/></svg>';

const domains = [
  { id: 'droit-des-affaires', n: '01', t: 'Droit des affaires', cat: 'entreprises',
    s: 'Sociétés, contrats, associés : sécuriser avant le litige.',
    d: 'Nous accompagnons les créateurs d’entreprise et les dirigeants dans le choix de la forme juridique, la rédaction des statuts, des contrats commerciaux et des pactes entre associés. Notre rôle : sécuriser vos décisions avant qu’un litige ne survienne.',
    l: ['Choix de la structure et statuts', 'Contrats commerciaux et conditions générales', 'Relations entre associés'] },
  { id: 'droit-de-la-famille', n: '02', t: 'Droit de la famille', cat: 'particuliers',
    s: 'Mariage, divorce, enfants, succession : une écoute attentive.',
    d: 'Les questions familiales touchent à l’intime. Nous vous écoutons, vous expliquons vos options avec des mots simples et recherchons, chaque fois que c’est possible, une solution apaisée avant d’envisager le tribunal.',
    l: ['Mariage, séparation et divorce', 'Garde des enfants et pension', 'Succession et partage'] },
  { id: 'droit-immobilier', n: '03', t: 'Droit immobilier', cat: 'particuliers entreprises',
    s: 'Achat, vente, bail : vérifier les titres avant de s’engager.',
    d: 'Un achat immobilier est souvent l’engagement d’une vie. Nous vérifions les documents, relisons les promesses de vente et les baux, et vous conseillons en cas de désaccord avec un vendeur, un locataire ou un bailleur.',
    l: ['Vérification des titres et documents', 'Baux d’habitation et commerciaux', 'Conflits bailleur et locataire'] },
  { id: 'droit-du-travail', n: '04', t: 'Droit du travail', cat: 'particuliers entreprises',
    s: 'Contrats, ruptures, conflits : conseil des deux côtés de la table.',
    d: 'Employeurs comme salariés ont besoin de règles claires. Nous rédigeons et relisons les contrats de travail, conseillons en cas de rupture et assistons nos clients dans les procédures devant les juridictions compétentes.',
    l: ['Contrats de travail et règlements intérieurs', 'Rupture du contrat de travail', 'Assistance en cas de conflit'] },
  { id: 'droit-penal', n: '05', t: 'Droit pénal', cat: 'particuliers',
    s: 'Assistance et défense à chaque étape de la procédure.',
    d: 'Être mis en cause est une épreuve. Nous assurons l’assistance de nos clients dès les premières étapes de la procédure, veillons au respect de leurs droits et préparons leur défense avec rigueur et discrétion.',
    l: ['Assistance lors des auditions', 'Préparation et plaidoirie', 'Suivi de la procédure'] },
  { id: 'contentieux', n: '06', t: 'Contentieux', cat: 'entreprises particuliers',
    s: 'Négocier d’abord, plaider quand il le faut.',
    d: 'Quand un désaccord ne se règle pas à l’amiable, nous défendons vos intérêts devant les juridictions. Nous privilégions la négociation et la médiation lorsqu’elles sont dans votre intérêt, et plaidons lorsque cela devient nécessaire.',
    l: ['Recouvrement de créances', 'Litiges commerciaux et civils', 'Négociation et médiation'] },
];

const team = [
  { n: 'Me Adjoua Kouadio', ini: 'AK', r: 'Associée fondatrice', sp: 'Droit des affaires · Immobilier', since: '2006',
    p: 'Elle conseille des entrepreneurs et des PME sur la création, les contrats et les acquisitions immobilières.', l: 'Français · Anglais' },
  { n: 'Me Serge Yao', ini: 'SY', r: 'Associé', sp: 'Famille · Travail', since: '2014',
    p: 'Il accompagne familles, salariés et employeurs avec un souci constant de médiation et de clarté.', l: 'Français · Baoulé' },
  { n: 'Me Fatou Diabaté', ini: 'FD', r: 'Avocate', sp: 'Pénal · Contentieux', since: '2018',
    p: 'Rompue à la plaidoirie, elle assiste des particuliers et des entreprises dans les procédures pénales et civiles.', l: 'Français · Dioula · Anglais' },
];

const posts = [
  { id: 'creer-entreprise', t: 'Créer une entreprise en Côte d’Ivoire : les 5 erreurs à éviter', date: '12 septembre 2026', iso: '2026-09-12', min: 3, dom: 'Droit des affaires',
    p: ['Beaucoup de créateurs se lancent vite et corrigent ensuite. Voici cinq erreurs fréquentes : choisir la forme juridique sans en comprendre les conséquences, négliger les statuts, mélanger comptes personnels et comptes de l’entreprise, oublier de formaliser l’accord entre associés, et signer un bail commercial sans le faire relire.',
        'Chaque situation est différente. Avant de vous engager, faites-vous conseiller par un professionnel qui étudiera votre projet précis.'] },
  { id: 'conflit-de-bail', t: 'Que faire en cas de conflit de bail ?', date: '28 août 2026', iso: '2026-08-28', min: 3, dom: 'Droit immobilier',
    p: ['Loyer contesté, travaux non réalisés, préavis discuté : les conflits de bail sont courants. Le premier réflexe est de relire le contrat et de conserver tous les échanges écrits, y compris les messages.',
        'Adressez ensuite une demande claire et datée à l’autre partie. Si le désaccord persiste, une discussion encadrée par un avocat permet souvent d’éviter une procédure. Les règles varient selon le type de bail : un avis personnalisé reste indispensable.'] },
  { id: 'documents-divorce', t: 'Quels documents pour un divorce ?', date: '9 août 2026', iso: '2026-08-09', min: 2, dom: 'Droit de la famille',
    p: ['Un dossier de divorce s’appuie généralement sur des pièces d’identité, l’acte de mariage, les actes de naissance des enfants et des justificatifs sur la situation des époux : ressources, logement, biens communs.',
        'La liste exacte dépend de votre situation et de la procédure envisagée. Lors du premier rendez-vous, nous vous indiquons les documents utiles pour éviter les allers-retours inutiles.'] },
];

const navItems = [['/', 'Accueil'], ['/domaines', 'Domaines'], ['/equipe', 'L’équipe'], ['/actualites', 'Actualités']];

function head({ title, desc, schema, preload }) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#5B1A2B">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/newsreader-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/public-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
${preload || ''}<link rel="stylesheet" href="/css/style.css">
${schema || ''}</head>
<body>
<a class="skip" href="#contenu">Aller au contenu</a>
`;
}

function header(current) {
  const links = navItems.map(([h, l]) => `<li><a href="${h}"${h === current ? ' aria-current="page"' : ''}>${l}</a></li>`).join('');
  return `<header class="site-header"><div class="header-in">
<a class="brand" href="/" aria-label="${SITE}, accueil"><span class="seal" aria-hidden="true">K&amp;A</span><span><strong>Kouadio &amp; Associés</strong><small>Avocats · Abidjan</small></span></a>
<button class="menu-btn" aria-expanded="false" aria-controls="nav">Menu</button>
<nav class="nav" id="nav" aria-label="Navigation principale"><ul>${links}</ul><a class="btn" href="/contact">Prendre rendez-vous</a></nav>
</div></header>
<main id="contenu">
`;
}

function footer() {
  return `</main>
<footer class="site-footer"><div class="wrap">
<div class="foot-grid">
<div><p class="foot-name">Kouadio <em>&amp;</em> Associés</p><p>Cabinet d’avocats d’affaires et de droit de la famille à Abidjan.</p></div>
<div><h2>Nous trouver</h2><p>Immeuble Les Cèdres, 4<sup>e</sup> étage<br>Rue du Commerce, Plateau, Abidjan<br><a href="tel:+22527200000000">${PHONE}</a></p><p>Lundi au vendredi : 8 h 30 – 17 h 30<br>Samedi : 9 h – 12 h</p></div>
<div><h2>Le cabinet</h2><ul><li><a href="/domaines">Domaines d’intervention</a></li><li><a href="/equipe">L’équipe</a></li><li><a href="/actualites">Actualités juridiques</a></li><li><a href="/contact">Prendre rendez-vous</a></li><li><a href="/confidentialite">Confidentialité</a></li></ul></div>
</div>
<div class="legal"><span>© 2026 ${SITE}. Site de démonstration : cabinet et personnes fictifs.</span>
<span class="signature">Site créé par <a href="${CODE_AZ_URL}" rel="noopener">Code AZ</a> · agence web</span></div>
</div></footer>
<a class="wa" href="${WA}" rel="noopener" aria-label="Écrire au cabinet sur WhatsApp">${waIcon}<span>WhatsApp</span></a>
<script src="/js/main.js" defer></script>
</body>
</html>
`;
}

function form(idp) {
  const opts = domains.map(d => `<option>${d.t}</option>`).join('') + '<option>Je ne sais pas encore</option>';
  return `<form data-demo novalidate aria-label="Demande de rendez-vous">
<div class="ok" role="status"><p class="stamp">Reçue</p><p><strong>Merci <span class="ok-name"></span>.</strong><br>Un membre du cabinet vous rappellera sous 24 heures ouvrées.</p><p class="label" style="color:var(--muted)">Démonstration : aucun message n’a été envoyé.</p></div>
<label for="${idp}nom">Nom et prénom</label>
<input id="${idp}nom" name="nom" type="text" autocomplete="name" required>
<p class="err" data-err-for="${idp}nom">Indiquez votre nom.</p>
<label for="${idp}tel">Téléphone</label>
<input id="${idp}tel" name="tel" type="tel" autocomplete="tel" placeholder="+225 07 00 00 00 00" required>
<p class="err" data-err-for="${idp}tel">Indiquez un numéro de téléphone valide.</p>
<label for="${idp}dom">Domaine concerné</label>
<select id="${idp}dom" name="domaine">${opts}</select>
<label for="${idp}msg">Votre situation (facultatif)</label>
<textarea id="${idp}msg" name="message" placeholder="En quelques lignes, sans documents confidentiels."></textarea>
<div class="check"><input id="${idp}ok" type="checkbox" required><label for="${idp}ok">J’accepte que le cabinet utilise ces informations pour me recontacter, selon la <a href="/confidentialite">politique de confidentialité</a>.</label></div>
<p class="err" data-err-for="${idp}ok">Le consentement est nécessaire pour envoyer la demande.</p>
<p style="display:flex;flex-wrap:wrap;gap:16px 24px;align-items:center;margin:0"><button class="btn" type="submit">Déposer ma demande</button><span class="secure">${lockIcon}Vos échanges restent confidentiels.</span></p>
</form>`;
}

const secMark = (n, t) => `<p class="sec-mark"><b>§ ${n}</b><span>${t}</span></p>`;
const pageTitle = (mark, h1, lead) => `<div class="page-title"><div class="wrap">${secMark('', mark).replace('§ ', '§')}<h1>${h1}</h1><p class="lead">${lead}</p></div></div>\n`;
const banner = (img, alt) => `<div class="duo banner"><img src="/img/${img}.webp" alt="${alt}" width="1400" height="260" fetchpriority="low"></div>\n`;

const pages = {};

// ---------- Accueil
const schema = `<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org', '@type': 'LegalService', name: SITE,
  description: 'Cabinet d’avocats d’affaires et de droit de la famille à Abidjan.',
  telephone: PHONE,
  address: { '@type': 'PostalAddress', streetAddress: 'Immeuble Les Cèdres, Rue du Commerce', addressLocality: 'Abidjan', addressRegion: 'Plateau', addressCountry: 'CI' },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:30', closes: '17:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '12:00' }],
})}</script>
`;
pages['index.html'] = head({ title: 'Cabinet Kouadio & Associés · Avocats à Abidjan', desc: 'Avocats d’affaires et de droit de la famille à Abidjan : écoute, stratégie et action. Prenez rendez-vous pour une première consultation.', schema, preload: '<link rel="preload" href="/img/sceau.webp" as="image" type="image/webp">\n' })
+ header('/') + `
<section class="hero" style="padding-bottom:72px"><div class="wrap hero-grid">
<div>
${secMark('01', 'Cabinet d’avocats · Plateau, Abidjan')}
<h1>Défendre <em>vos droits</em>, protéger vos intérêts.</h1>
<p class="lead">Un cabinet à taille humaine pour les particuliers et les chefs d’entreprise : nous vous écoutons, vous expliquons clairement votre situation et agissons avec rigueur.</p>
<div class="hero-actions"><a class="btn" href="/contact">Prendre rendez-vous</a><a class="btn btn-ghost" href="/domaines">Nos domaines</a></div>
</div>
<div class="hero-art">
<img class="wax" src="/img/sceau.webp" width="1100" height="1022" alt="Sceau de cire rouge sombre apposé sur un courrier ancien" fetchpriority="high">
<svg class="badge" viewBox="0 0 200 200" role="img" aria-label="Vos échanges restent confidentiels"><defs><path id="ring" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"/></defs><g class="ring"><text><textPath href="#ring" textLength="470">Vos échanges restent confidentiels · </textPath></text></g><g class="lock" transform="translate(76 76) scale(2)" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="10" width="16" height="11" rx="1"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></g></svg>
<div class="fiche" aria-hidden="true"><span>Dossier</span> n° 2026-001<br><span>Objet</span> première consultation<br><span>Lieu</span> Plateau, Abidjan<br><span>Statut</span> ouvert</div>
</div>
</div></section>

<div class="ledger"><ul>
<li><strong>20 ans</strong><span>d’expérience cumulée</span></li>
<li><strong>600+</strong><span>dossiers accompagnés</span></li>
<li><strong>4 langues</strong><span>français, anglais, dioula, baoulé</span></li>
</ul></div>

<section><div class="wrap">
<div class="head"><div>${secMark('02', 'Domaines d’intervention')}<h2>Six domaines, <em>une même exigence.</em></h2></div><p>Du conseil préventif à la plaidoirie, nous intervenons là où vos droits et vos projets sont en jeu.</p></div>
<div class="index">
${domains.map(d => `<a class="row" href="/domaines#${d.id}"><span class="n">${d.n}</span><h3>${d.t}</h3><p>${d.s}</p><span class="go" aria-hidden="true">→</span></a>`).join('\n')}
</div></div></section>

<section class="dark on-dark"><div class="wrap split">
<div class="duo"><img src="/img/colonnes.webp" alt="Deux pilastres à chapiteaux ioniques, en pierre claire" width="900" height="1597" loading="lazy"></div>
<div>${secMark('03', 'Notre approche')}<h2>Écoute, stratégie, <em>action.</em></h2>
<ol class="steps">
<li><div><h3>Écoute</h3><p>Nous prenons le temps de comprendre votre situation, vos craintes et vos objectifs, sans jargon.</p></div></li>
<li><div><h3>Stratégie</h3><p>Nous vous présentons les options, leurs avantages et leurs limites, pour que vous décidiez en connaissance de cause.</p></div></li>
<li><div><h3>Action</h3><p>Négociation, rédaction, procédure : nous agissons avec rigueur et vous tenons informé à chaque étape.</p></div></li>
</ol></div>
</div></section>

<section><div class="wrap">
<div class="head"><div>${secMark('04', 'L’équipe')}<h2>Trois avocats, <em>trois fiches.</em></h2></div><p>Des spécialités complémentaires, réunies autour d’une conviction : un client bien informé décide mieux.</p></div>
<div class="fiches">
${team.map(t => `<article class="card"><div class="top"><span class="seal" aria-hidden="true">${t.ini}</span><div><h3>${t.n}</h3><span class="label">${t.r}</span></div></div><hr><dl><dt>Spécialités</dt><dd>${t.sp}</dd><dt>Langues</dt><dd>${t.l}</dd></dl></article>`).join('\n')}
</div>
<p style="margin-top:56px"><a href="/equipe">Découvrir l’équipe →</a></p>
</div></section>

<figure class="plateau"><div class="duo"><img src="/img/plateau.webp" alt="Le Plateau, quartier d'affaires d'Abidjan, vu depuis l'autre rive de la lagune, avec ses tours éclairées" width="1600" height="433" loading="lazy"></div><figcaption class="label">Le Plateau, Abidjan · Photo : Edison McCullen, <a href="https://creativecommons.org/licenses/by/4.0/" rel="noopener">CC BY 4.0</a>, via Wikimedia Commons</figcaption></figure>

<section class="alt"><div class="wrap contact-grid">
<div>${secMark('05', 'Actualité juridique')}<h2>${posts[0].t}</h2>
<p class="label" style="color:var(--muted)"><time datetime="${posts[0].iso}">${posts[0].date}</time> · ${posts[0].min} min de lecture</p>
<p>${posts[0].p[0].slice(0, 190).replace(/\s\S*$/, '')}…</p>
<a class="btn btn-ghost" href="/actualites#${posts[0].id}">Lire l’article</a></div>
<div>${secMark('06', 'Première consultation')}<p>Laissez-nous votre numéro : nous vous rappelons sous 24 heures ouvrées.</p>${form('h-')}</div>
</div></section>
` + footer();

// ---------- Domaines
pages['domaines.html'] = head({ title: 'Domaines d’intervention · Cabinet Kouadio & Associés', desc: 'Droit des affaires, famille, immobilier, travail, pénal et contentieux : les domaines d’intervention de notre cabinet d’avocats à Abidjan.' })
+ header('/domaines') + pageTitle('Domaines d’intervention', 'Ce que nous faisons <em>pour vous.</em>', 'Choisissez votre situation pour afficher les domaines concernés, puis ouvrez une fiche pour en savoir plus.')
+ banner('salle-lecture', 'Grande salle de lecture d’une bibliothèque, avec arcades et verrière, en noir et blanc teinté de bordeaux') + `
<section style="padding-top:56px"><div class="wrap">
<div class="switch" role="group" aria-label="Filtrer les domaines"><span>Vous êtes :</span>
<button type="button" data-filter="all" aria-pressed="true">Tous</button>
<button type="button" data-filter="particuliers" aria-pressed="false">Un particulier</button>
<button type="button" data-filter="entreprises" aria-pressed="false">Une entreprise</button></div>
<p id="filter-count" class="count" role="status">6 domaines affichés</p>
<div class="acc">
${domains.map(d => `<details id="${d.id}" data-cat="${d.cat}"><summary><span class="n">${d.n}</span><h2>${d.t}</h2></summary><div class="in"><div><p>${d.d}</p><a class="btn btn-ghost" href="/contact">Prendre rendez-vous</a></div><ul>${d.l.map(x => `<li>${x}</li>`).join('')}</ul></div></details>`).join('\n')}
</div>
<p class="secure" style="margin-top:36px">Ces informations sont générales et ne remplacent pas un conseil juridique adapté à votre situation.</p>
</div></section>
` + footer();

// ---------- Équipe
pages['equipe.html'] = head({ title: 'L’équipe · Cabinet Kouadio & Associés', desc: 'Rencontrez les trois avocats du cabinet Kouadio & Associés à Abidjan : spécialités, parcours et langues parlées.' })
+ header('/equipe') + pageTitle('L’équipe', 'Des avocats <em>à votre écoute.</em>', 'Trois avocats aux spécialités complémentaires, réunis autour d’une même conviction : un client bien informé prend de meilleures décisions.') + `
<section><div class="wrap"><div class="fiches">
${team.map(t => `<article class="card"><div class="top"><span class="seal big" aria-hidden="true">${t.ini}</span></div><h2>${t.n}</h2><span class="label">${t.r}</span><hr><p>${t.p}</p><dl><dt>Spécialités</dt><dd>${t.sp}</dd><dt>Au barreau depuis</dt><dd>${t.since}</dd><dt>Langues</dt><dd>${t.l}</dd></dl></article>`).join('\n')}
</div>
<p class="secure" style="margin-top:64px">Cabinet et personnes fictifs, créés pour cette démonstration.</p></div></section>
<section class="dark on-dark"><div class="wrap head" style="margin-bottom:0"><h2>Parlons de <em>votre situation.</em></h2><div><p style="color:#D6CFC0">La première consultation permet de faire le point, sans engagement.</p><a class="btn btn-ghost" href="/contact">Prendre rendez-vous</a></div></div></section>
` + footer();

// ---------- Actualités
pages['actualites.html'] = head({ title: 'Actualités juridiques · Cabinet Kouadio & Associés', desc: 'Articles courts et prudents sur la création d’entreprise, le bail et le divorce, rédigés par le cabinet Kouadio & Associés à Abidjan.' })
+ header('/actualites') + pageTitle('Actualités juridiques', 'Comprendre <em>vos droits.</em>', 'Des repères généraux, à titre d’information. Chaque situation demande un avis personnalisé.') + `
<section style="padding-top:24px"><div class="wrap"><div class="register">
${posts.map(p => `<article class="entry" id="${p.id}"><div class="meta"><b>${p.dom}</b><time datetime="${p.iso}">${p.date}</time><br>${p.min} min de lecture</div><div><h2>${p.t}</h2>${p.p.map(x => `<p>${x}</p>`).join('')}<a href="/contact">Poser une question au cabinet →</a></div></article>`).join('\n')}
</div></div></section>
` + footer();

// ---------- Contact
pages['contact.html'] = head({ title: 'Prendre rendez-vous · Cabinet Kouadio & Associés', desc: 'Prenez rendez-vous avec un avocat à Abidjan : formulaire, téléphone, WhatsApp, adresse et horaires du cabinet Kouadio & Associés.' })
+ header('/contact') + pageTitle('Contact', 'Prendre <em>rendez-vous.</em>', 'Décrivez-nous brièvement votre situation : nous vous rappelons pour fixer une première consultation.') + `
<section><div class="wrap contact-grid">
<div>${form('c-')}</div>
<aside class="info on-dark"><h2>Le cabinet</h2><dl style="margin:0">
<dt>Adresse</dt><dd>Immeuble Les Cèdres, 4<sup>e</sup> étage<br>Rue du Commerce, Plateau, Abidjan</dd>
<dt>Téléphone</dt><dd><a href="tel:+22527200000000">${PHONE}</a></dd>
<dt>WhatsApp</dt><dd><a href="${WA}" rel="noopener">Écrire sur WhatsApp</a></dd>
<dt>Horaires</dt><dd>Lundi au vendredi : 8 h 30 – 17 h 30<br>Samedi : 9 h – 12 h</dd></dl>
<div class="duo"><img src="/img/livres.webp" alt="Allées de rayonnages remplis de livres dans une bibliothèque, teintées de bordeaux" width="1400" height="840" loading="lazy"></div>
<p style="margin:22px 0 0;font-size:.9rem">Ne joignez pas de documents confidentiels avant notre premier échange.</p></aside>
</div></section>
` + footer();

// ---------- Confidentialité
pages['confidentialite.html'] = head({ title: 'Confidentialité · Cabinet Kouadio & Associés', desc: 'Comment le cabinet Kouadio & Associés utilise les informations transmises via son formulaire de rendez-vous.' })
+ header('/confidentialite') + pageTitle('Confidentialité', 'Vos données <em>restent confidentielles.</em>', 'Ce que nous ferions de vos informations sur un site réel.') + `
<section><div class="wrap prose">
<p><strong>Site de démonstration :</strong> ce site est une maquette. Le formulaire n’envoie aucune donnée et rien n’est enregistré.</p>
<h2>Données demandées</h2><p>Sur un site réel, nous ne demanderions que votre nom, votre téléphone, le domaine concerné et un message facultatif.</p>
<h2>Utilisation</h2><p>Ces informations serviraient uniquement à vous rappeler pour fixer un rendez-vous, et ne seraient pas transmises à des tiers.</p>
<h2>Vos droits</h2><p>Vous pourriez demander à tout moment l’accès, la correction ou la suppression de vos données en contactant le cabinet.</p>
<h2>Crédits photos</h2><p>Les images proviennent de Wikimedia Commons. Photo du Plateau : Edison McCullen, licence CC BY 4.0. Autres images : domaine public ou CC0.</p>
</div></section>
` + footer();

// Liens relatifs avec .html : le site fonctionne partout (Live Server, Vercel, ouverture directe)
const relink = h => h
  .replace(/href="\/"/g, 'href="index.html"')
  .replace(/href="\/(domaines|equipe|actualites|contact|confidentialite)(#[^"]*)?"/g, 'href="$1.html$2"')
  .replace(/(href|src)="\/(css|js|img|fonts|favicon)/g, '$1="$2');
for (const [f, html] of Object.entries(pages)) fs.writeFileSync(path.join(out, f), relink(html));

fs.writeFileSync(path.join(out, 'favicon.svg'), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 3c15 0 29 11 29 29S46 62 31 61 3 48 3 32 17 3 32 3z" fill="#5B1A2B"/><text x="32" y="41" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="24" fill="#F1E3D0">K&amp;A</text></svg>');
fs.writeFileSync(path.join(out, 'vercel.json'), JSON.stringify({ cleanUrls: true }, null, 2) + '\n');
fs.writeFileSync(path.join(out, '.vercelignore'), ['_build', '_raw', '.claude', 'GUIDE-PUBLICATION.md'].join('\n') + '\n');
console.log('OK', Object.keys(pages).join(', '));
