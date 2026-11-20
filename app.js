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
        '<p class="meting-thema">' + esc(m.thema) + "</p>" +
        (m.samenvattingUrl ? '<a class="meting-download" href="' + esc(m.samenvattingUrl) + '"' + linkAttrs(m.samenvattingUrl) + '><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>Download samenvatting</a>' : "") +
        (m.status === "open" && !gesloten ? '<a class="btn btn-small meting-cta" href="' + esc(d.vragenlijstUrl) + '"' + linkAttrs(d.vragenlijstUrl) + ">Vul de vragenlijst in</a>" : "") +
        "</div>" +
        '<span class="pill pill-' + esc(m.status) + '">' + (STATUS[m.status] || esc(m.status)) + "</span></li>";
    }).join(""));
  } else {
    $("#metingen-sectie").hidden = true;
  }


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

  // Inzichten: kleine grafieken uit het onderzoek
  function nl(n, dec) { return n == null ? "–" : Number(n).toLocaleString("nl-NL", { minimumFractionDigits: dec, maximumFractionDigits: dec }); }
  function grafiek(g) {
    var W = 320, LBL = g.soort === "staven" ? 150 : 128, RECHTS = g.soort === "staven" ? 30 : 38, TOP = 6, RIJ = g.soort === "staven" ? 28 : 32, AS = 22;
    var x0 = LBL, x1 = W - RECHTS, H = TOP + g.rijen.length * RIJ + AS;
    var lo = g.domein[0], hi = g.domein[1];
    function X(v) { return x0 + (v - lo) / (hi - lo) * (x1 - x0); }
    var s = '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(g.kop) + '">';
    g.ticks.forEach(function (t) {
      s += '<line class="grid" x1="' + X(t) + '" x2="' + X(t) + '" y1="' + TOP + '" y2="' + (H - AS) + '"/>' +
        '<text class="tick" x="' + X(t) + '" y="' + (H - 6) + '" text-anchor="middle">' + nl(t, 0) + "</text>";
    });
    g.rijen.forEach(function (r, i) {
      var cy = TOP + i * RIJ + RIJ / 2, tip;
      s += '<text class="row-label" x="' + (LBL - 10) + '" y="' + (cy + 4) + '" text-anchor="end">' + esc(r.label) + "</text>";
      if (g.soort === "staven") {
        var w = Math.max(0, X(r.waarde) - x0), h = 14, y = cy - h / 2, rr = Math.min(4, w / 2);
        s += '<path fill="' + g.kleur + '" d="M' + x0 + " " + y + "h" + (w - rr) + "a" + rr + " " + rr + " 0 0 1 " + rr + " " + rr + "v" + (h - 2 * rr) + "a" + rr + " " + rr + " 0 0 1 -" + rr + " " + rr + "h-" + (w - rr) + 'z"/>' +
          '<text class="val" x="' + (X(r.waarde) + 6) + '" y="' + (cy + 4) + '">' + nl(r.waarde, g.decimalen) + "</text>";
        tip = r.label + ": " + nl(r.waarde, 2);
      } else {
        if (r.a != null && r.b != null) s += '<line class="link" x1="' + X(r.a) + '" x2="' + X(r.b) + '" y1="' + cy + '" y2="' + cy + '"/>';
        [["a", g.reeksA], ["b", g.reeksB]].forEach(function (p) {
          var v = r[p[0]], rs = p[1];
          if (v == null) return;
          s += rs.open
            ? '<circle cx="' + X(v) + '" cy="' + cy + '" r="5.5" fill="#FFFFFF" stroke="' + rs.kleur + '" stroke-width="2.5"/>'
            : '<circle cx="' + X(v) + '" cy="' + cy + '" r="6.5" fill="' + rs.kleur + '" stroke="#FFFFFF" stroke-width="2"/>';
        });
        var rechts = g.verschil ? "+" + nl(r.b - r.a, 1) : nl(r.b, g.decimalen);
        s += '<text class="val" x="' + (W - 4) + '" y="' + (cy + 4) + '" text-anchor="end">' + rechts + "</text>";
        tip = r.label + " · " + g.reeksA.naam + ": " + nl(r.a, g.verschil ? 2 : 0) + " · " + g.reeksB.naam + ": " + nl(r.b, g.verschil ? 2 : 0) +
          (g.verschil ? " · verschil " + nl(r.b - r.a, 2) : "");
      }
      s += '<rect class="hit" x="0" y="' + (cy - RIJ / 2) + '" width="' + W + '" height="' + RIJ + '" tabindex="0" data-tip="' + esc(tip) + '" aria-label="' + esc(tip) + '"/>';
    });
    s += "</svg>";

    var legenda = "";
    if (g.soort === "paar") {
      legenda = '<ul class="legend">' + [g.reeksA, g.reeksB].map(function (rs) {
        return '<li><span class="swatch' + (rs.open ? " swatch-open" : "") + '" style="' + (rs.open ? "border-color:" : "background:") + rs.kleur + '"></span>' + esc(rs.naam) + "</li>";
      }).join("") + (g.verschil ? '<li class="legend-note">rechts: verschil</li>' : "") + "</ul>";
    }
    var kol = g.soort === "staven" ? ["Aspect", "Belang"] : ["Markt", g.reeksA.naam, g.reeksB.naam].concat(g.verschil ? ["Verschil"] : []);
    var tabel = '<details class="chart-table"><summary>Bekijk als tabel</summary><div class="table-scroll"><table><thead><tr>' +
      kol.map(function (k, i) { return "<th" + (i ? ' class="num"' : "") + ">" + esc(k) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      g.rijen.map(function (r) {
        var cellen = g.soort === "staven" ? [nl(r.waarde, 2)] : [nl(r.a, g.verschil ? 2 : 0), nl(r.b, g.verschil ? 2 : 0)].concat(g.verschil ? [nl(r.b - r.a, 2)] : []);
        return "<tr><td>" + esc(r.label) + "</td>" + cellen.map(function (c) { return '<td class="num">' + c + "</td>"; }).join("") + "</tr>";
      }).join("") + "</tbody></table></div></details>";

    return '<figure class="insight"><figcaption><h3>' + esc(g.kop) + "</h3><p>" + esc(g.uitleg) + "</p></figcaption>" +
      legenda + s + (g.noot ? '<p class="chart-note">' + esc(g.noot) + "</p>" : "") +
      '<p class="chart-source">Bron: ' + esc(g.bron) + "</p>" + tabel + "</figure>";
  }
  var inzichten = d.inzichten || [];
  if (inzichten.length && $("#inzichten-lijst")) {
    setHtml("#inzichten-lijst", inzichten.map(grafiek).join(""));
    var tipEl = $("#chart-tip");
    function toonTip(t, x, y) {
      tipEl.textContent = t; tipEl.hidden = false;
      var bw = tipEl.offsetWidth, bh = tipEl.offsetHeight;
      var left = Math.min(window.innerWidth - bw - 8, Math.max(8, x - bw / 2));
      var top = y - bh - 12; if (top < 8) top = y + 16;
      tipEl.style.left = left + "px"; tipEl.style.top = top + "px";
    }
    $$("#inzichten-lijst .hit").forEach(function (h) {
      h.addEventListener("mousemove", function (e) { toonTip(h.getAttribute("data-tip"), e.clientX, e.clientY); h.classList.add("active"); });
      h.addEventListener("mouseleave", function () { tipEl.hidden = true; h.classList.remove("active"); });
      h.addEventListener("focus", function () { var b = h.getBoundingClientRect(); toonTip(h.getAttribute("data-tip"), b.left + b.width / 2, b.top); });
      h.addEventListener("blur", function () { tipEl.hidden = true; });
    });
    window.addEventListener("scroll", function () { tipEl.hidden = true; }, { passive: true });
  } else if ($("#inzichten")) {
    $("#inzichten").hidden = true;
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
  // Carrousels: vakpers en berichten van winnaars
  function carrousel(titel, lijst, extraKlasse) {
    var id = "car-" + Math.random().toString(36).slice(2, 7);
    return '<div class="carousel' + (extraKlasse ? " " + extraKlasse : "") + '" role="region" aria-roledescription="carrousel" aria-label="' + esc(titel) + '">' +
      '<div class="carousel-head"><h3 class="press-title">' + esc(titel) + " <span class=\"press-count\">(" + lijst.length + ")</span></h3>" +
      '<div class="carousel-nav"><button type="button" class="car-btn" data-dir="-1" aria-controls="' + id + '" aria-label="Vorige">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>' +
      '<button type="button" class="car-btn" data-dir="1" aria-controls="' + id + '" aria-label="Volgende">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button></div></div>' +
      '<ul class="carousel-track" id="' + id + '" tabindex="0">' + lijst.map(function (a) {
        return '<li><a href="' + esc(a.url) + '"' + linkAttrs(a.url) + '><span class="press-medium">' + esc(a.medium) + "</span>" +
          '<span class="press-head">' + esc(a.titel) + "</span>" +
          '<span class="press-foot"><span class="press-date">' + esc(a.datum) + "</span>" +
          (a.soort ? '<span class="press-type">' + esc(a.soort) + "</span>" : "") + "</span></a></li>";
      }).join("") + "</ul></div>";
  }
  var pers = d.impact.vakpers || [], eigen = d.impact.aanbiedersOver || [], persHtml = "";
  if (pers.length) persHtml += carrousel("In de vakpers", pers);
  if (eigen.length) persHtml += carrousel("De winnaars delen hun resultaat", eigen, "carousel-gap");
  if (persHtml && $("#vakpers")) {
    setHtml("#vakpers", persHtml);
    $$("#vakpers .carousel").forEach(function (c) {
      var track = c.querySelector(".carousel-track"), knoppen = c.querySelectorAll(".car-btn");
      function bijwerken() {
        var max = track.scrollWidth - track.clientWidth - 2;
        knoppen[0].disabled = track.scrollLeft <= 2;
        knoppen[1].disabled = track.scrollLeft >= max;
        c.classList.toggle("is-static", max <= 0);
      }
      Array.prototype.forEach.call(knoppen, function (b) {
        b.addEventListener("click", function () {
          track.scrollBy({ left: Number(b.getAttribute("data-dir")) * track.clientWidth * 0.9, behavior: "smooth" });
        });
      });
      track.addEventListener("scroll", bijwerken, { passive: true });
      window.addEventListener("resize", bijwerken);
      bijwerken();
    });
  }

  // FAQ
  function faqHtml(lijst) {
    return (lijst || []).map(function (f) {
      return "<details><summary>" + esc(f.vraag) + "</summary><p>" + esc(f.antwoord) + "</p></details>";
    }).join("");
  }
  setHtml("#faq", faqHtml(d.faq));
  setHtml("#faq-aanbieders", faqHtml(d.faqAanbieders));

  // Plakknop op mobiel: tonen zodra de hero uit beeld is
  var sticky = $("#sticky-cta"), hero = $(".hero");
  if ("IntersectionObserver" in window && !gesloten) {
    new IntersectionObserver(function (items) {
      sticky.classList.toggle("zichtbaar", !items[0].isIntersecting);
    }).observe(hero);
  }
})();
