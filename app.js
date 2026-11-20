/* Vult de pagina met de gegevens uit data.js. Hier hoef je normaal niets aan te veranderen. */
(function () {
  "use strict";
  var d = window.ONDERZOEK;
  if (!d) return;

  var MAANDEN = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
  var LAAG = 0.5; // onder 50% van het doel = "hier missen we jou"

  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function datum(iso) {
    var p = iso.split("-");
    return parseInt(p[2], 10) + " " + MAANDEN[parseInt(p[1], 10) - 1] + " " + p[0];
  }
  function getal(n) { return Number(n).toLocaleString("nl-NL"); }
  function setText(sel, txt) { $$(sel).forEach(function (el) { el.textContent = txt; }); }
  function setHtml(sel, html) { var el = $(sel); if (el) el.innerHTML = html; }
  function linkAttrs(url) {
    return /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : "";
  }

  // Voorbeeldbalk
  if (d.voorbeeld) {
    $("#demo-bar").hidden = false;
    $("#demo-bar").textContent = d.voorbeeldTekst || "Voorbeeldversie";
  }

  // Deadline
  var vandaag = new Date(); vandaag.setHours(0, 0, 0, 0);
  var sluit = new Date(d.sluitdatum + "T23:59:59");
  var dagen = Math.max(0, Math.ceil((sluit - vandaag) / 86400000) - 1);
  var gesloten = sluit < new Date();

  // Metingen
  var metingen = d.metingen || [];
  var open = metingen.filter(function (m) { return m.status === "open"; })[0];
  var STATUS = { afgerond: "Afgerond", open: "Nu open", gepland: "Gepland" };
  if (open) setText(".js-meting-naam", open.naam.toLowerCase());

  // Knoppen naar de vragenlijst (adviseurs)
  $$(".js-cta").forEach(function (a) {
    if (gesloten) {
      a.href = "#resultaten";
      a.textContent = "Bekijk de resultaten";
    } else {
      a.href = d.vragenlijstUrl;
      if (/^https?:/.test(d.vragenlijstUrl)) { a.target = "_blank"; a.rel = "noopener"; }
    }
  });

  // Knoppen voor aanbieders
  var ab = d.aanbieders || {};
  $$(".js-aanvraag").forEach(function (a) {
    // De knoppen in de kop en de hero scrollen naar het aanbiedersdeel; de andere gaan direct naar de aanvraag.
    if (a.getAttribute("href") === "#aanbieders") return;
    if (ab.aanvraagUrl) a.href = ab.aanvraagUrl;
  });

  // Hero
  setText("#hero-naam", d.naam);
  setText("#hero-editie", d.editie);
  setText("#hero-ondertitel", d.ondertitel);
  setText("#fact-duur", "Ongeveer " + d.duurMinuten + " minuten, anoniem");
  setText(".js-duur", d.duurMinuten);
  setText("#fact-sluit", gesloten ? "Deze meting is gesloten" : "Open tot " + datum(d.sluitdatum));
  setText("#final-sluit", datum(d.sluitdatum));
  if (open) setText("#fact-thema", "Thema: " + open.thema);
  else $("#fact-thema-li").hidden = true;
  setText("#dagen-tekst", gesloten ? "Gesloten" : dagen === 1 ? "nog 1 dag" : "nog " + dagen + " dagen");

  // Voorbereidingslink
  var prep = d.voorbereiding || {};
  if (prep.url) {
    setText("#prep-kop", prep.kop || "");
    setText("#prep-tekst", prep.tekst || "");
    setHtml("#prep-stappen", (prep.stappen || []).map(function (s, i) {
      return '<li><span class="prep-nr" aria-hidden="true">' + (i + 1) + "</span><span>" + esc(s) + "</span></li>";
    }).join(""));
    $$(".js-prep").forEach(function (a) {
      a.href = prep.url;
      if (prep.knop) a.textContent = prep.knop;
      if (/^https?:/.test(prep.url)) { a.target = "_blank"; a.rel = "noopener"; }
    });
  } else {
    if ($("#voorbereiding")) $("#voorbereiding").hidden = true;
    if ($("#prep-hint")) $("#prep-hint").hidden = true;
  }

  // Kerncijfers
  setHtml("#kerncijfers", (d.kerncijfers || []).map(function (k) {
    return '<div class="figure"><strong>' + esc(k.waarde) + "</strong><span>" + esc(k.label) + "</span></div>";
  }).join(""));

  // Metingen
  if (metingen.length) {
    setText("#metingen-intro", d.metingenIntro || "");
    setHtml("#metingen", metingen.map(function (m, i) {
      return '<li class="meting meting-' + esc(m.status) + '">' +
        '<span class="meting-nr" aria-hidden="true">' + (i + 1) + "</span>" +
        '<div class="meting-body"><p class="meting-naam">' + esc(m.naam) + (m.periode ? ", " + esc(m.periode) : "") + "</p>" +
        '<p class="meting-thema">' + esc(m.thema) + "</p></div>" +
        '<span class="pill pill-' + esc(m.status) + '">' + (STATUS[m.status] || esc(m.status)) + "</span></li>";
    }).join(""));
  } else {
    $("#metingen-sectie").hidden = true;
  }

  // Stand van zaken
  var totDoel = 0, totHuidig = 0;
  d.productgroepen.forEach(function (g) {
    totDoel += g.doel;
    totHuidig += Math.min(g.huidig, g.doel);
  });
  var totPct = totDoel ? Math.round((totHuidig / totDoel) * 100) : 0;
  setText("#bijgewerkt", "Bijgewerkt op " + datum(d.laatstBijgewerkt));
  $("#totaal-bar").setAttribute("aria-valuenow", totPct);

  var groepen = d.productgroepen.slice().sort(function (a, b) { return a.huidig / a.doel - b.huidig / b.doel; });
  setHtml("#groepen", groepen.map(function (g) {
    var pct = Math.min(100, Math.round((g.huidig / g.doel) * 100));
    var nodig = Math.max(0, g.doel - g.huidig);
    var laag = pct < LAAG * 100, vol = nodig === 0;
    return '<article class="group' + (laag ? " prio" : "") + '">' +
      '<div class="group-top"><h4>' + esc(g.naam) + '</h4><span class="group-pct">' + pct + "%</span></div>" +
      '<div class="bar' + (laag ? " laag" : vol ? " vol" : "") + '" role="progressbar" aria-label="' + esc(g.naam) + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '" data-pct="' + pct + '"><span></span></div>' +
      '<div class="group-meta"><span>' + (vol ? "Doel gehaald" : "Nog " + getal(nodig) + " beoordelingen nodig") + "</span>" +
      (laag ? '<span class="badge">Hier missen we jou</span>' : vol ? '<span class="badge ok">Gehaald</span>' : "") +
      "</div></article>";
  }).join(""));

  // Opbrengst voor adviseurs
  var iconen = [
    '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/>',
    '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
    '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'
  ];
  setHtml("#opbrengst-lijst", d.opbrengst.map(function (o, i) {
    return '<div class="card"><div class="card-icon" aria-hidden="true"><svg viewBox="0 0 24 24">' + iconen[i % iconen.length] + "</svg></div>" +
      "<h3>" + esc(o.titel) + "</h3><p>" + esc(o.tekst) + "</p></div>";
  }).join(""));

  // Aanbieders
  setText("#aanbieders-kop", ab.kop || "");
  setText("#aanbieders-intro", ab.intro || "");
  if (ab.bewijs) {
    setText("#bewijs-label", ab.bewijs.cijfer);
    setText("#bewijs-tekst", ab.bewijs.tekst);
    setText(".js-bewijs-label", ab.bewijs.cijfer.toLowerCase());
    setText(".js-bewijs-tekst", ab.bewijs.tekst);
  }
  setHtml("#aanbieders-voordelen", (ab.voordelen || []).map(function (v) {
    return "<li><strong>" + esc(v.titel) + "</strong><span>" + esc(v.tekst) + "</span></li>";
  }).join(""));
  setHtml("#pakketten", (ab.pakketten || []).map(function (p) {
    return '<div class="package' + (p.aanbevolen ? " package-best" : "") + '">' +
      (p.aanbevolen ? '<span class="package-tag">Meest gekozen</span>' : "") +
      "<h3>" + esc(p.naam) + "</h3><p>" + esc(p.tekst) + '</p><p class="package-price">' + esc(p.prijs) + "</p></div>";
  }).join(""));
  if (ab.contact) {
    setText("#aanbieders-contact", "Liever eerst overleggen? Bel " + ab.contact.naam + " op " + ab.contact.telefoon + " of mail naar " + ab.contact.email + ".");
  }

  // Eerdere resultaten met tabs
  var tabs = $("#jaar-tabs"), panel = $("#jaar-panel");
  function toonJaar(i) {
    var j = d.vorigeJaren[i];
    $$(".tab").forEach(function (t, k) {
      t.setAttribute("aria-selected", k === i ? "true" : "false");
      t.tabIndex = k === i ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", "tab-" + i);
    var cijfers = j.kerncijfers || [];
    var links = j.links || [];
    panel.innerHTML =
      "<div>" +
        (cijfers.length ? '<div class="year-stats">' + cijfers.map(function (c) {
          return '<div class="stat"><strong>' + esc(c.waarde) + "</strong><span>" + esc(c.label) + "</span></div>";
        }).join("") + "</div>" : "") +
        '<p class="finding"><span class="finding-label">Opvallendste uitkomst</span>' + esc(j.kernbevinding) + "</p>" +
        (links.length ? '<ul class="year-links">' + links.map(function (l) {
          return '<li><a class="year-link" href="' + esc(l.url) + '"' + linkAttrs(l.url) + ">" + esc(l.tekst) + "</a></li>";
        }).join("") + "</ul>" : "") +
        (j.samenvattingUrl
          ? '<p class="year-download"><a class="btn btn-light btn-small" href="' + esc(j.samenvattingUrl) + '"' + linkAttrs(j.samenvattingUrl) + ">Download de samenvatting</a></p>"
          : (j.noot ? '<p class="year-note">' + esc(j.noot) + "</p>" : "")) +
      "</div>" +
      '<div class="winners"><h3>' + esc(j.winnaarsTitel || "Winnaars " + j.jaar) + "</h3>" +
        j.winnaars.map(function (w) {
          var rest = w.top3 && w.top3.length
            ? '<small class="runner-up">' + w.top3.map(function (n, k) { return (k + 2) + ". " + esc(n); }).join(" &middot; ") + "</small>"
            : "";
          return '<div class="winner-row"><span>' + esc(w.productgroep) + '</span><div class="winner-cell"><strong>' + esc(w.winnaar) + "</strong>" + rest + "</div></div>";
        }).join("") +
      "</div>";
  }
  tabs.innerHTML = d.vorigeJaren.map(function (j, i) {
    return '<button class="tab" role="tab" id="tab-' + i + '" aria-controls="jaar-panel">' + esc(j.jaar) + "</button>";
  }).join("");
  $$(".tab").forEach(function (t, i) {
    t.addEventListener("click", function () { toonJaar(i); });
    t.addEventListener("keydown", function (e) {
      var n = d.vorigeJaren.length, k = null;
      if (e.key === "ArrowRight") k = (i + 1) % n;
      if (e.key === "ArrowLeft") k = (i - 1 + n) % n;
      if (k !== null) { toonJaar(k); $$(".tab")[k].focus(); e.preventDefault(); }
    });
  });
  if (d.vorigeJaren.length) toonJaar(0);

  // Impact
  setText("#impact-citaat", d.impact.citaat);
  setText("#impact-bron", d.impact.bron);
  setHtml("#impact-punten", d.impact.punten.map(function (p) {
    var titel = p.link ? '<a href="' + esc(p.link) + '"' + linkAttrs(p.link) + ">" + esc(p.titel) + "</a>" : esc(p.titel);
    return "<li><strong>" + titel + "</strong><p>" + esc(p.tekst) + "</p></li>";
  }).join(""));
  function persKaarten(lijst) {
    return '<ul class="press-list">' + lijst.map(function (a) {
      return '<li><a href="' + esc(a.url) + '"' + linkAttrs(a.url) + '><span class="press-medium">' + esc(a.medium) + '</span><span class="press-head">' + esc(a.titel) + '</span><span class="press-date">' + esc(a.datum) + "</span></a></li>";
    }).join("") + "</ul>";
  }
  var pers = d.impact.vakpers || [], eigen = d.impact.aanbiedersOver || [], persHtml = "";
  if (pers.length) {
    persHtml += '<h3 class="press-title">In de vakpers</h3>' + persKaarten(pers.slice(0, 4));
    if (pers.length > 4) {
      persHtml += '<details class="press-more"><summary>Nog ' + (pers.length - 4) + " artikelen</summary>" + persKaarten(pers.slice(4)) + "</details>";
    }
  }
  if (eigen.length) {
    persHtml += '<h3 class="press-title press-title-gap">De winnaars delen hun resultaat</h3>' + persKaarten(eigen);
  }
  if (persHtml && $("#vakpers")) setHtml("#vakpers", persHtml);

  // FAQ
  function faqHtml(lijst) {
    return (lijst || []).map(function (f) {
      return "<details><summary>" + esc(f.vraag) + "</summary><p>" + esc(f.antwoord) + "</p></details>";
    }).join("");
  }
  setHtml("#faq", faqHtml(d.faq));
  setHtml("#faq-aanbieders", faqHtml(d.faqAanbieders));

  // Balken vullen (direct zichtbaar, met een korte animatie)
  function vul(bar) { bar.querySelector("span").style.width = (bar.getAttribute("data-pct") || totPct) + "%"; }
  requestAnimationFrame(function () { $$(".bar").forEach(vul); });

  // Tellen van het totaalpercentage
  var el = $("#totaal-pct"), start = null;
  function tel(t) {
    if (!start) start = t;
    var v = Math.min(1, (t - start) / 1200);
    el.textContent = Math.round(totPct * (1 - Math.pow(1 - v, 3)));
    if (v < 1) requestAnimationFrame(tel);
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) el.textContent = totPct;
  else requestAnimationFrame(tel);

  // Plakknop op mobiel: tonen zodra de hero uit beeld is
  var sticky = $("#sticky-cta"), hero = $(".hero");
  if ("IntersectionObserver" in window && !gesloten) {
    new IntersectionObserver(function (items) {
      sticky.classList.toggle("zichtbaar", !items[0].isIntersecting);
    }).observe(hero);
  }
})();
