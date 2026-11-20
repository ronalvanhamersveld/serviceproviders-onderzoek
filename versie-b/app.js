/* Versie B: vult de pagina met de gegevens uit data.js. Hier hoef je normaal niets aan te veranderen. */
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
  function cijfer(n) { return Number(n).toLocaleString("nl-NL", { minimumFractionDigits: 1, maximumFractionDigits: 1 }); }
  function setText(sel, txt) { $$(sel).forEach(function (el) { el.textContent = txt; }); }
  function setHtml(sel, html) { var el = $(sel); if (el) el.innerHTML = html; }
  function extern(url) { return /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : ""; }
  // Versie B staat in een submap: relatieve links (zoals samenvattingen/...) krijgen de basis uit index.html.
  var BASIS = window.ONDERZOEK_BASIS || "";
  function pad(url) { return (!url || /^(https?:|mailto:|tel:|#|\/)/.test(url)) ? url : BASIS + url; }
  function sleutel(naam) { return String(naam).trim().split(/\s+/)[0].toLowerCase(); }
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  var metingen = d.metingen || [];
  var open = metingen.filter(function (m) { return m.status === "open"; })[0];
  if (open) setText(".js-meting-naam", open.naam.toLowerCase());

  // Knoppen naar de vragenlijst
  $$(".js-cta").forEach(function (a) {
    if (gesloten) {
      a.href = "#eerder";
      a.textContent = "Bekijk de resultaten";
    } else {
      a.href = d.vragenlijstUrl;
      if (/^https?:/.test(d.vragenlijstUrl)) { a.target = "_blank"; a.rel = "noopener"; }
    }
  });

  // 1. Hero
  var jaar = (d.sluitdatum || "").slice(0, 4);
  setText("#hero-eyebrow", d.naam + (jaar ? " " + jaar : ""));
  var laatste = (d.vorigeJaren || [])[0];
  setText("#hero-lead", laatste ? laatste.kernbevinding : d.ondertitel);
  setText(".js-duur", d.duurMinuten);
  setHtml("#cta-facts",
    "Ongeveer " + esc(d.duurMinuten) + " minuten<span class=\"sep\">|</span>anoniem<span class=\"sep\">|</span>" +
    (gesloten ? "deze meting is gesloten"
      : "open tot " + esc(datum(d.sluitdatum))));
  setHtml("#checks", (d.opbrengst || []).slice(0, 3).map(function (o) { return "<li>" + esc(o.titel) + "</li>"; }).join(""));

  // Uitgelicht cijferpaar
  var u = d.uitgelicht;
  if (u) {
    setText("#uitkomst-label", u.label);
    setText("#uitkomst-titel", u.onderwerp);
    function rij(cls, naam, v) {
      var w = Math.max(0, Math.min(100, ((v - 1) / 9) * 100));
      return '<div class="cijfer-rij ' + cls + '"><span class="naam">' + naam + '</span><span class="waarde">' + cijfer(v) + "</span>" +
        '<div class="schaal" role="img" aria-label="' + naam + " " + cijfer(v) + ' op een schaal van 1 tot 10"><span data-w="' + w.toFixed(1) + '"></span></div></div>';
    }
    var ticks = "";
    for (var t = 1; t <= 10; t++) ticks += "<span>" + t + "</span>";
    setHtml("#uitkomst-cijfers",
      rij("belang", "Hoe belangrijk adviseurs het vinden", u.belang) +
      rij("waardering", "Hoe ze serviceproviders beoordelen", u.waardering) +
      '<div class="ticks" aria-hidden="true">' + ticks + "</div>");
    $("#uitkomst-tekst").insertAdjacentHTML("beforebegin",
      '<p class="kloof">' + cijfer(u.belang - u.waardering) + " punt verschil</p>");
    setText("#uitkomst-tekst", u.tekst);
    setText("#uitkomst-bron", u.bron);
  } else {
    $("#uitkomst").hidden = true;
  }

  // Metingenbalk
  var STATUS = { afgerond: "Afgerond", open: "Nu open", gepland: "Gepland" };
  setHtml("#meetbalk", metingen.map(function (m, i) {
    return '<li class="' + esc(m.status) + '"><span class="nr" aria-hidden="true">' + (m.status === "afgerond" ? "&#10003;" : i + 1) + "</span>" +
      '<span class="tekst"><strong>' + esc(m.naam) + ": " + esc(m.thema) + "</strong><span>" + (STATUS[m.status] || esc(m.status)) +
      (m.periode ? ", " + esc(m.periode) : "") + "</span>" +
      (m.samenvattingUrl
        ? '<a class="meet-download" href="' + esc(pad(m.samenvattingUrl)) + '"' + extern(m.samenvattingUrl) + '><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>Download samenvatting</a>'
        : "") +
      (m.status === "open" && !gesloten
        ? '<a class="btn btn-small meet-cta" href="' + esc(d.vragenlijstUrl) + '"' + extern(d.vragenlijstUrl) + ">Vul de vragenlijst in</a>"
        : "") +
      "</span></li>";
  }).join(""));
  if (!metingen.length) $("#meetbalk").hidden = true;

  // 2. Kies jouw markt (alleen de best beoordeelde serviceproviders, geen voortgang)
  var groepen = (d.markten || []).map(function (naam) { return { naam: naam }; });

  function winnaarsVoor(markt) {
    var k = sleutel(markt.naam);
    return (d.vorigeJaren || []).map(function (j) {
      var rijen = (j.winnaars || []).filter(function (w) { return sleutel(w.productgroep) === k; });
      return { jaar: j.jaar, rijen: rijen };
    }).filter(function (x) { return x.rijen.length; });
  }
  function segment(pg) {
    var m = /\(([^)]+)\)/.exec(pg);
    return m ? m[1] : "";
  }

  setHtml("#markt-keuze", groepen.map(function (g, i) {
    return '<button class="markt-knop" role="tab" id="markt-' + i + '" aria-controls="markt-panel" aria-selected="false" tabindex="-1">' +
      '<span class="naam">' + esc(g.naam) + "</span></button>";
  }).join(""));

  function toonMarkt(i) {
    var g = groepen[i];
    $$(".markt-knop").forEach(function (b, k) {
      b.setAttribute("aria-selected", k === i ? "true" : "false");
      b.tabIndex = k === i ? 0 : -1;
    });
    var panel = $("#markt-panel");
    panel.setAttribute("aria-labelledby", "markt-" + i);
    var w = winnaarsVoor(g);
    panel.innerHTML =
      '<div class="markt-stand">' +
        '<p class="label">Jouw markt</p>' +
        "<h3>" + esc(g.naam) + "</h3>" +
        "<p>Werk je met een serviceprovider in deze markt? Jouw oordeel telt mee in " + (open ? esc(open.naam.toLowerCase()) + ": " + esc(open.thema.toLowerCase()) : "de volgende meting") + ".</p>" +
        '<a class="btn js-cta-panel" href="#">Start de vragenlijst</a>' +
      "</div>" +
      '<div class="markt-winnaars"><h3>Best beoordeeld in deze markt</h3>' +
        (w.length ? w.map(function (x) {
          return '<div class="winnaar-rij"><span class="wanneer">' + esc(x.jaar) + "</span><ul>" +
            x.rijen.map(function (r) {
              var s = segment(r.productgroep);
              var rest = r.top3 && r.top3.length ? " <small>gevolgd door " + r.top3.map(esc).join(" en ") + "</small>" : "";
              return "<li><strong>" + esc(r.winnaar) + "</strong>" + (s ? "<small>" + esc(s) + "</small>" : "") + rest + "</li>";
            }).join("") + "</ul></div>";
        }).join("") : '<p class="leeg">Voor deze markt zijn nog geen eerdere uitkomsten gepubliceerd.</p>') +
      "</div>";
    var knop = panel.querySelector(".js-cta-panel");
    if (gesloten) { knop.href = "#eerder"; knop.textContent = "Bekijk de resultaten"; }
    else { knop.href = d.vragenlijstUrl; if (/^https?:/.test(d.vragenlijstUrl)) { knop.target = "_blank"; knop.rel = "noopener"; } }
    vulBalken(panel);
  }
  $$(".markt-knop").forEach(function (b, i) {
    b.addEventListener("click", function () { toonMarkt(i); });
    b.addEventListener("keydown", function (e) {
      var n = groepen.length, k = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") k = (i + 1) % n;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") k = (i - 1 + n) % n;
      if (k !== null) { toonMarkt(k); $$(".markt-knop")[k].focus(); e.preventDefault(); }
    });
  });
  if (groepen.length) toonMarkt(0); else $("#markt").hidden = true;

  // 3. Voorbereidingslink
  var prep = d.voorbereiding || {};
  if (prep.url) {
    setText("#prep-kop", prep.kop || "");
    setText("#prep-tekst", prep.tekst || "");
    $$(".js-prep").forEach(function (a) {
      a.href = prep.url;
      if (prep.knop) a.textContent = prep.knop;
      if (/^https?:/.test(prep.url)) { a.target = "_blank"; a.rel = "noopener"; }
    });
  } else {
    $("#voorbereiding").hidden = true;
  }

  // 4. Eerdere metingen
  setHtml("#kerncijfers", (d.kerncijfers || []).map(function (k) {
    return '<div class="kerncijfer"><strong>' + esc(k.waarde) + "</strong><span>" + esc(k.label) + "</span></div>";
  }).join(""));
  setHtml("#metingen-lijst", (d.vorigeJaren || []).map(function (j, i) {
    var stats = (j.kerncijfers || []).map(function (c) {
      return "<div><strong>" + esc(c.waarde) + "</strong><span>" + esc(c.label) + "</span></div>";
    }).join("");
    var links = (j.links || []).map(function (l) {
      return '<a href="' + esc(pad(l.url)) + '"' + extern(l.url) + ">" + esc(l.tekst) + "</a>";
    }).join("");
    var download = j.samenvattingUrl
      ? '<a class="btn btn-light btn-small" href="' + esc(pad(j.samenvattingUrl)) + '"' + extern(j.samenvattingUrl) + ">Download de samenvatting</a>"
      : "";
    var winnaars = (j.winnaars || []).map(function (w) {
      return "<dt>" + esc(w.productgroep) + "</dt><dd>" + esc(w.winnaar) + "</dd>";
    }).join("");
    return '<details class="meting"' + (i === 0 ? " open" : "") + "><summary><span class=\"titel\">" + esc(j.jaar) +
      (j.winnaarsTitel ? '<span class="thema">' + esc(j.winnaarsTitel) + "</span>" : "") + "</span></summary>" +
      '<div class="meting-body"><div>' +
        (stats ? '<div class="meting-stats">' + stats + "</div>" : "") +
        '<p class="bevinding">' + esc(j.kernbevinding) + "</p>" +
        ((download || links) ? '<div class="meting-links">' + download + links + "</div>" : "") +
        (!j.samenvattingUrl && j.noot ? '<p class="meting-noot">' + esc(j.noot) + "</p>" : "") +
      "</div>" +
      (winnaars ? '<div class="meting-winnaars"><h3>Best beoordeeld</h3><dl>' + winnaars + "</dl></div>" : "") +
      "</div></details>";
  }).join(""));

  // 5. Impact en pers
  var imp = d.impact || {};
  setText("#impact-citaat", imp.citaat || "");
  setText("#impact-bron", imp.bron || "");
  setHtml("#impact-punten", (imp.punten || []).map(function (p) {
    var titel = p.link ? '<a href="' + esc(p.link) + '"' + extern(p.link) + ">" + esc(p.titel) + "</a>" : esc(p.titel);
    return "<li><strong>" + titel + "</strong><p>" + esc(p.tekst) + "</p></li>";
  }).join(""));
  function persLijst(lijst) {
    return '<ul class="pers-lijst">' + lijst.map(function (a) {
      return '<li><a href="' + esc(a.url) + '"' + extern(a.url) + '><span class="medium">' + esc(a.medium) + '</span><span class="kop">' + esc(a.titel) + '</span><span class="datum">' + esc(a.datum) + "</span></a></li>";
    }).join("") + "</ul>";
  }
  var pers = imp.vakpers || [], eigen = imp.aanbiedersOver || [], html = "";
  if (pers.length) {
    var bladen = [];
    pers.forEach(function (a) { if (bladen.indexOf(a.medium) < 0) bladen.push(a.medium); });
    html += '<div class="pers-blok"><h3>Over het onderzoek in</h3><div class="pers-bladen">' +
      bladen.map(function (b) { return "<span>" + esc(b) + "</span>"; }).join("") + "</div>" + persLijst(pers.slice(0, 3)) +
      (pers.length > 3 ? '<details class="pers-meer"><summary>Alle artikelen (' + pers.length + ")</summary>" + persLijst(pers.slice(3)) + "</details>" : "") +
      "</div>";
  }
  if (eigen.length) {
    html += '<div class="pers-blok"><h3>De winnaars delen hun resultaat</h3>' + persLijst(eigen.slice(0, 3)) +
      (eigen.length > 3 ? '<details class="pers-meer"><summary>Meer berichten (' + (eigen.length - 3) + ")</summary>" + persLijst(eigen.slice(3)) + "</details>" : "") +
      "</div>";
  }
  setHtml("#pers", html);

  // 6. Vragen
  setHtml("#faq", (d.faq || []).map(function (f) {
    return "<details><summary>" + esc(f.vraag) + "</summary><p>" + esc(f.antwoord) + "</p></details>";
  }).join(""));

  // 7. Afsluiter
  setText("#final-sluit", datum(d.sluitdatum));

  // Balken vullen
  function vulBalken(root) {
    var spans = Array.prototype.slice.call((root || document).querySelectorAll("[data-w]"));
    function zet() { spans.forEach(function (s) { s.style.width = s.getAttribute("data-w") + "%"; }); }
    if (reduceMotion) zet(); else requestAnimationFrame(function () { requestAnimationFrame(zet); });
  }
  vulBalken(document);

  // Vaste knop op de telefoon: tonen zodra de hero uit beeld is
  var sticky = $("#sticky-cta"), hero = $(".hero");
  if ("IntersectionObserver" in window && !gesloten) {
    new IntersectionObserver(function (items) {
      sticky.classList.toggle("zichtbaar", !items[0].isIntersecting);
    }).observe(hero);
  }
})();
