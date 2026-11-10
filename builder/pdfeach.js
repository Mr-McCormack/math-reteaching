/* One PDF per student, bundled in a .zip — no outside libraries.
 * Each student sheet is split into Letter pages (never cutting an item in half), drawn to an image through an SVG
 * "foreignObject" (the KaTeX fonts are embedded so the math renders), and written into a small hand-made PDF.
 * Pages are pictures, so the text can't be selected, but they print sharp (2x resolution). */
(function (root, factory) { if (typeof module === 'object' && module.exports) module.exports = factory(); else root.ReteachPDF = factory(); })(typeof self !== 'undefined' ? self : this, function () {
  const PW = 816, PH = 1056, M = 48, CW = PW - 2 * M, CH = PH - 2 * M, SC = 2; // CSS px at 96 dpi
  const XHTML = 'http://www.w3.org/1999/xhtml', SVGNS = 'http://www.w3.org/2000/svg';
  let cssCache = null;

  const b64 = (buf) => { let s = ''; const u = new Uint8Array(buf); for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s); };
  async function fontCss() {
    if (cssCache) return cssCache;
    let css = await (await fetch('vendor/katex/katex.min.css')).text();
    css = css.replace(/,\s*url\(fonts\/[^)]+\.(?:woff|ttf)\)\s*format\("[^"]+"\)/g, '');
    const urls = [...new Set([...css.matchAll(/url\((fonts\/[^)]+\.woff2)\)/g)].map((m) => m[1]))];
    const data = {};
    await Promise.all(urls.map(async (u) => { data[u] = 'data:font/woff2;base64,' + b64(await (await fetch('vendor/katex/' + u)).arrayBuffer()); }));
    css = css.replace(/url\((fonts\/[^)]+\.woff2)\)/g, (m, u) => 'url(' + data[u] + ')');
    const page = [...document.querySelectorAll('style')].map((s) => s.textContent).join('\n');
    const bodyFont = getComputedStyle(document.body).fontFamily;
    const extra = '.pdfpage{width:' + CW + 'px;height:' + CH + 'px;overflow:hidden;background:#fff;color:#000;font-family:' + bodyFont.replace(/"/g, "'") + ';font-size:12pt;line-height:1.35}' +
      '.pdfpage .sheet{border:0;border-radius:0;margin:0;padding:0;max-width:none;box-shadow:none}.pdfpage .graphs svg{width:2.3in}.pdfpage .graphs.one svg{width:2.4in}.pdfpage .dmline{color:#000}';
    // keep the page's own rules but drop @media print blocks (not needed, and they hide everything but #printRoot)
    cssCache = css + '\n' + page.replace(/@media\s+print\s*\{(?:[^{}]|\{[^{}]*\})*\}/g, '') + '\n' + extra;
    return cssCache;
  }

  const mh = (el) => { const r = el.getBoundingClientRect(), cs = getComputedStyle(el); return Math.ceil(r.height + parseFloat(cs.marginTop || 0) + parseFloat(cs.marginBottom || 0)); };
  function measure(sectionEl) { // -> array of {el, h, leaves?}; leaves lets an item taller than the space left be split between pages
    const host = document.createElement('div');
    host.style.cssText = 'position:absolute;left:-10000px;top:0;visibility:hidden;width:' + CW + 'px';
    const wrap = document.createElement('div'); wrap.className = 'pdfpage'; wrap.style.height = 'auto'; wrap.style.overflow = 'visible';
    const sec = sectionEl.cloneNode(true); wrap.appendChild(sec); host.appendChild(wrap); document.body.appendChild(host);
    const blocks = [...sec.children].map((el) => {
      const b = { el: el.cloneNode(true), h: mh(el) };
      if (el.classList.contains('item')) {
        b.leaves = []; b.shell = el.cloneNode(false); let pre = [];
        [...el.children].forEach((ch) => {
          if (ch.classList.contains('tier')) {
            const kids = [...ch.children];
            kids.forEach((k, i) => {
              const parts = i === 1 && kids[0].classList.contains('tl') ? [kids[0], k] : [k];
              if (i === 0 && k.classList.contains('tl') && kids.length > 1) return; // label travels with the first problem
              b.leaves.push({ pre: pre.map((x) => x.cloneNode(true)), els: parts.map((x) => x.cloneNode(true)), tier: ch.cloneNode(false), tid: ch, h: parts.reduce((a, x) => a + mh(x), 0) + pre.reduce((a, x) => a + mh(x), 0) }); pre = [];
            });
          } else pre.push(ch); // title / warning lines stay with whatever follows them
        });
        if (pre.length) b.leaves.push({ pre: [], els: pre.map((x) => x.cloneNode(true)), tier: null, tid: null, h: pre.reduce((a, x) => a + mh(x), 0) });
      }
      return b;
    });
    host.remove(); return blocks;
  }
  function pieceOf(b, leaves) { // rebuild an item holding just these leaves
    const item = b.shell.cloneNode(false); let tier = null, lastTid = null;
    leaves.forEach((lf) => {
      (lf.pre || []).forEach((x) => { item.appendChild(x.cloneNode(true)); tier = null; lastTid = null; });
      if (!lf.tid) { lf.els.forEach((x) => item.appendChild(x.cloneNode(true))); tier = null; lastTid = null; return; }
      if (lf.tid !== lastTid) { tier = lf.tier.cloneNode(false); item.appendChild(tier); lastTid = lf.tid; }
      lf.els.forEach((e) => tier.appendChild(e.cloneNode(true)));
    });
    return { el: item, h: leaves.reduce((a, l) => a + l.h, 0) + 12 };
  }
  function paginate(blocks) {
    const pages = []; let cur = [], used = 0;
    const flush = () => { if (cur.length) pages.push(cur); cur = []; used = 0; };
    for (const b of blocks) {
      if (used + b.h <= CH) { cur.push(b); used += b.h; continue; }
      if (b.leaves && (b.h > CH || cur.length <= 1)) { // split the item across pages
        let grp = [], gh = 12;
        const emit = () => { if (grp.length) { const pc = pieceOf(b, grp); if (cur.length && used + pc.h > CH) flush(); cur.push(pc); used += pc.h; grp = []; gh = 12; } };
        for (const lf of b.leaves) {
          if (used + gh + lf.h > CH && (grp.length || cur.length > 0)) { emit(); flush(); gh = 12; }
          grp.push(lf); gh += lf.h;
        }
        emit(); continue;
      }
      flush(); cur.push(b); used = b.h;
    }
    flush(); return pages;
  }
  const loadImg = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('page could not be drawn')); i.src = src; });
  async function renderPage(blocks, css) {
    const wrap = document.createElementNS(XHTML, 'div'); wrap.setAttribute('class', 'pdfpage');
    const sec = document.createElementNS(XHTML, 'section'); sec.setAttribute('class', 'sheet'); wrap.appendChild(sec);
    blocks.forEach((b) => sec.appendChild(b.el.cloneNode(true)));
    const style = document.createElementNS(XHTML, 'style'); style.textContent = css; wrap.insertBefore(style, sec);
    const xml = new XMLSerializer().serializeToString(wrap);
    const svg = '<svg xmlns="' + SVGNS + '" width="' + CW + '" height="' + CH + '"><foreignObject x="0" y="0" width="100%" height="100%">' + xml + '</foreignObject></svg>';
    const img = await loadImg('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg));
    const c = document.createElement('canvas'); c.width = PW * SC; c.height = PH * SC; const x = c.getContext('2d');
    x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(img, M * SC, M * SC, CW * SC, CH * SC);
    const blob = await new Promise((r) => c.toBlob(r, 'image/jpeg', 0.92));
    return { bytes: new Uint8Array(await blob.arrayBuffer()), w: c.width, h: c.height };
  }

  function pdf(pages) { // pages: [{bytes (JPEG), w, h}] -> Uint8Array
    const enc = new TextEncoder(), parts = [], offs = []; let len = 0;
    const push = (x) => { const u = typeof x === 'string' ? enc.encode(x) : x; parts.push(u); len += u.length; };
    const obj = (n, body) => { offs[n] = len; push(n + ' 0 obj\n'); body(); push('\nendobj\n'); };
    const np = pages.length, kids = pages.map((_, i) => (3 + i * 3 + 2) + ' 0 R').join(' ');
    push('%PDF-1.4\n%\xe2\xe3\xcf\xd3\n');
    obj(1, () => push('<< /Type /Catalog /Pages 2 0 R >>'));
    obj(2, () => push('<< /Type /Pages /Kids [' + kids + '] /Count ' + np + ' >>'));
    pages.forEach((p, i) => {
      const im = 3 + i * 3, ct = im + 1, pg = im + 2;
      obj(im, () => { push('<< /Type /XObject /Subtype /Image /Width ' + p.w + ' /Height ' + p.h + ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + p.bytes.length + ' >>\nstream\n'); push(p.bytes); push('\nendstream'); });
      const cs = 'q 612 0 0 792 0 0 cm /Im0 Do Q';
      obj(ct, () => push('<< /Length ' + cs.length + ' >>\nstream\n' + cs + '\nendstream'));
      obj(pg, () => push('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /XObject << /Im0 ' + im + ' 0 R >> >> /Contents ' + ct + ' 0 R >>'));
    });
    const total = 3 + np * 3, xref = len;
    push('xref\n0 ' + total + '\n0000000000 65535 f \n');
    for (let n = 1; n < total; n++) push(String(offs[n]).padStart(10, '0') + ' 00000 n \n');
    push('trailer\n<< /Size ' + total + ' /Root 1 0 R >>\nstartxref\n' + xref + '\n%%EOF');
    const out = new Uint8Array(len); let o = 0; for (const p of parts) { out.set(p, o); o += p.length; } return out;
  }

  /* sections: array of {name, el} -> [{name, data}] */
  async function studentPdfs(sections, progress) {
    const css = await fontCss(), out = [];
    for (let i = 0; i < sections.length; i++) {
      if (progress) progress(i, sections.length, sections[i].name);
      const pages = paginate(measure(sections[i].el)), imgs = [];
      for (const pg of pages) imgs.push(await renderPage(pg, css));
      out.push({ name: sections[i].name, data: pdf(imgs) });
    }
    if (progress) progress(sections.length, sections.length, '');
    return out;
  }
  return { studentPdfs, pdf, paginate };
});
