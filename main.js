let scroll;

function delay(n) {
  n = n || 2000;
  return new Promise(done => {
    setTimeout(() => {
      done();
    }, n);
  });
}

barba.hooks.after(() => {
  scroll.init();
});

barba.init({
  sync: true,
  transitions: [{
    name: 'custom-transition',
    once({ next }) {
      smooth(next.container);
    },
    beforeEnter({ next }) {
      smooth(next.container);
      scroll.destroy();
    },
    async leave(data) {
      const done = this.async();
      gsap.to(".o-wrapper", {
        duration: 1, opacity: 0, ease: "expo.out"
      });
      gsap.to(".i-wrapper", {
        duration: 1, x:"10vw", opacity: 0, ease: "expo.out"
      });
      gsap.to("p", {
        duration: 1, x: "-5vw", opacity: 0, ease: "expo.out"
      });
      await delay(1000);
      done();
    },
    async enter(data) {
        scroll.update();
      gsap.fromTo(".o-wrapper", {
        opacity: 0
      }, {
        duration: 2, opacity: 1, ease: "expo.out"
      });
      gsap.fromTo(".i-wrapper", {
        x: "10vh", opacity: 0
      }, {
        duration: 3, x: 0, opacity: 1, ease: "expo.out"
      });
      gsap.fromTo("p", {
        x: "-5vw", opacity: 0
      }, {
        duration: 1, x: 0, opacity: 1, ease: "expo.out"
      });
    },
  }]
});

function smooth(container) {
  scroll = new LocomotiveScroll({
    el: container.querySelector('[data-scroll-container]'),
    smooth: true
  });
}