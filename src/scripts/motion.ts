// VUMIBO hareket sistemi: GSAP + ScrollTrigger. "Hareketi azalt" aciksa hicbiri calismaz.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Basligi kelimelere boler (gokkusagi gecisi bozulmasin diye .rainbow butun kalir). */
function bol(el: HTMLElement): HTMLElement[] {
  const sar = (icerik: Node) => {
    const d = document.createElement('span'); d.className = 'split-w';
    const i = document.createElement('span'); i.appendChild(icerik); d.appendChild(i); return d;
  };
  const isle = (n: Node): Node[] => {
    if (n.nodeType === Node.TEXT_NODE) {
      return (n.textContent || '').split(/(\s+)/).filter((p) => p !== '').map((p) =>
        /^\s+$/.test(p) ? document.createTextNode(p) : sar(document.createTextNode(p)));
    }
    const e = n as HTMLElement;
    if (e.tagName === 'BR') return [e.cloneNode()];
    if (e.classList?.contains('rainbow')) return [sar(e.cloneNode(true))];
    const kopya = e.cloneNode(false) as HTMLElement;
    e.childNodes.forEach((c) => isle(c).forEach((x) => kopya.appendChild(x)));
    return [kopya];
  };
  el.replaceChildren(...Array.from(el.childNodes).flatMap(isle));
  return Array.from(el.querySelectorAll<HTMLElement>('.split-w > span'));
}

export function motion() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || location.search.includes('static')) return;
  const q = (s: string) => Array.from(document.querySelectorAll<HTMLElement>(s));
  const ince = matchMedia('(pointer: fine)').matches;

  // ---------- HERO acilis
  const baslik = document.querySelector<HTMLElement>('.hero__title');
  if (baslik) {
    const kel = bol(baslik);
    gsap.timeline({ defaults: { ease: 'back.out(1.8)' } })
      .from('.hero__rays', { scale: .3, opacity: 0, duration: 1.4, ease: 'power3.out' }, 0)
      .from('.hero__hills path', { yPercent: 60, duration: 1.1, stagger: .12, ease: 'power3.out' }, 0)
      .from('.cloud', { x: -80, opacity: 0, duration: 1.2, stagger: .15, ease: 'power3.out' }, .1)
      .from(kel, { yPercent: 120, rotate: 8, duration: .9, stagger: .07 }, .25)
      .from('.h-in', { y: 30, opacity: 0, duration: .7, stagger: .1, ease: 'power3.out' }, .55)
      .from('.hero__kids', { y: 300, scale: .7, opacity: 0, duration: 1.4, ease: 'elastic.out(1, .55)' }, .45)
      .from('.hero__crew li', { y: 160, opacity: 0, duration: 1, stagger: .09, ease: 'back.out(2.2)' }, .9);

    gsap.to('.hero__stage', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero__rays', { scale: 1.25, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    if (ince) {
      const kart = document.querySelector<HTMLElement>('.hero__card');
      const kx = gsap.quickTo('.hero__kids', 'x', { duration: 1, ease: 'power3' });
      const bx = gsap.quickTo('.cloud', 'x', { duration: 1.4, ease: 'power3' });
      const sx = gsap.quickTo('.star', 'x', { duration: 1, ease: 'power3' });
      const sy = gsap.quickTo('.star', 'y', { duration: 1, ease: 'power3' });
      kart?.addEventListener('pointermove', (e) => {
        const r = kart.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - .5, ny = (e.clientY - r.top) / r.height - .5;
        kx(nx * -22); bx(nx * 40); sx(nx * 26); sy(ny * 18);
      });
    }
  }

  // ---------- bolum basliklari kelime kelime
  q('.sec__head h2, h2[data-split], .phero h1[data-split]').forEach((h) => {
    const k = bol(h);
    gsap.from(k, { yPercent: 110, rotate: 6, duration: .8, stagger: .06, ease: 'back.out(1.6)', scrollTrigger: { trigger: h, start: 'top 85%', toggleActions: 'play none none none', once: true } });
  });

  // ---------- kayan serit kaydirma hizina gore hizlanir
  const ser = document.querySelector<HTMLElement>('.marquee__track');
  const anim = ser?.getAnimations()[0];
  if (anim) {
    const hiz = { v: 1 };
    ScrollTrigger.create({
      onUpdate: (s) => {
        hiz.v = 1 + Math.min(Math.abs(s.getVelocity()) / 350, 6);
        anim.playbackRate = hiz.v;
        gsap.to(hiz, { v: 1, duration: .9, overwrite: true, onUpdate: () => { anim.playbackRate = hiz.v; } });
      },
    });
  }

  // ---------- KURTARMA KONVOYU (sabitlenen sahne)
  const parade = document.querySelector<HTMLElement>('.parade');
  if (parade) {
    const seri = parade.querySelector<HTMLElement>('.parade__cars')!;
    const etiket = parade.querySelector<HTMLElement>('.parade__label')!;
    const araclar = Array.from(parade.querySelectorAll<HTMLElement>('.pcar'));
    let aktif = -1;
    const yaz = (i: number) => {
      if (i === aktif) return; aktif = i;
      const a = araclar[i];
      etiket.innerHTML = `<strong style="color:${getComputedStyle(a).getPropertyValue('--c')}">${a.dataset.name}</strong><span>${a.dataset.role}</span>`;
      gsap.fromTo(etiket, { scale: .6, opacity: 0 }, { scale: 1, opacity: 1, duration: .5, ease: 'back.out(2.5)' });
    };
    const mesafe = () => seri.scrollWidth + innerWidth;
    gsap.fromTo(seri, { x: () => innerWidth }, {
      x: () => -seri.scrollWidth, ease: 'none',
      scrollTrigger: {
        trigger: parade, start: 'top top', end: () => `+=${mesafe() * 1.1}`, pin: '.parade__pin', scrub: .6, invalidateOnRefresh: true,
        onUpdate: () => {
          const orta = innerWidth / 2; let en = 0, ek = Infinity;
          araclar.forEach((a, i) => { const r = a.getBoundingClientRect(); const d = Math.abs(r.left + r.width / 2 - orta); if (d < ek) { ek = d; en = i; } });
          if (ek < innerWidth * .35) yaz(en);
        },
      },
    });
    gsap.to('.parade__clouds i', { xPercent: -80, ease: 'none', scrollTrigger: { trigger: parade, start: 'top top', end: () => `+=${mesafe()}`, scrub: true } });
  }

  // ---------- ekip kartlari: 3B donerek gelir + fareyle egilir
  const kartlar = q('.card');
  kartlar.forEach((k) => { k.classList.remove('reveal'); gsap.set(k, { opacity: 0 }); });
  ScrollTrigger.batch(kartlar, {
    start: 'top 90%',
    once: true,
    onLeave: (b) => gsap.to(b, { opacity: 1, rotateX: 0, y: 0, scale: 1, duration: .3, overwrite: true }),
    onEnter: (b) => gsap.fromTo(b, { rotateX: -35, y: 110, scale: .85, opacity: 0, transformPerspective: 900, transformOrigin: '50% 100%' },
      { rotateX: 0, y: 0, scale: 1, opacity: 1, duration: 1.1, stagger: .1, ease: 'elastic.out(1, .7)', overwrite: true }),
  });
  if (ince) kartlar.forEach((k) => {
    k.addEventListener('pointermove', (e) => {
      const r = k.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - .5, ny = (e.clientY - r.top) / r.height - .5;
      gsap.to(k, { rotateY: nx * 16, rotateX: -ny * 14, y: -10, transformPerspective: 700, duration: .4, ease: 'power2.out' });
    });
    k.addEventListener('pointerleave', () => gsap.to(k, { rotateY: 0, rotateX: 0, y: 0, duration: .9, ease: 'elastic.out(1, .5)' }));
  });

  // ---------- adim numaralari ziplar
  q('.step__n').forEach((n, i) => {
    gsap.from(n, { scale: 0, rotate: -90, duration: 1, delay: i * .12, ease: 'elastic.out(1, .45)', scrollTrigger: { trigger: n, start: 'top 90%', once: true } });
  });

  // ---------- Vumi & Bo portresi
  if (document.querySelector('.kids__art')) {
    gsap.from('.kids__art img', { y: 120, scale: .8, rotate: -6, duration: 1.3, ease: 'elastic.out(1, .6)', scrollTrigger: { trigger: '.kids__art', start: 'top 80%' } });
  }

  // ---------- QR kartlari havada suzulur
  q('.qr').forEach((k, i) => gsap.to(k, { y: -12, rotate: i ? 1.5 : -1.5, duration: 2.4 + i * .4, yoyo: true, repeat: -1, ease: 'sine.inOut' }));

  // ---------- footer ekibi kayarak gelir
  if (document.querySelector('.foot__crew')) {
    gsap.from('.foot__crew', { x: -200, opacity: 0, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: '.foot', start: 'top 95%' } });
  }

  // ---------- miknatisli butonlar
  if (ince) q('.btn').forEach((b) => {
    const xT = gsap.quickTo(b, 'x', { duration: .5, ease: 'power3' }), yT = gsap.quickTo(b, 'y', { duration: .5, ease: 'power3' });
    b.addEventListener('pointermove', (e) => { const r = b.getBoundingClientRect(); xT((e.clientX - r.left - r.width / 2) * .25); yT((e.clientY - r.top - r.height / 2) * .35); });
    b.addEventListener('pointerleave', () => { xT(0); yT(0); });
  });

  addEventListener('load', () => ScrollTrigger.refresh());
}
