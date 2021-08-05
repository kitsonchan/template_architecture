gsap.registerPlugin(ScrollTrigger);

const cleanGSAP = () => {
    ScrollTrigger.getAll().forEach((t) => t.kill(false));
    ScrollTrigger.refresh();
    // window.dispatchEvent(new Event("resize"));
};

function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
}

function pageTransition() {
    var tl = gsap.timeline();
    tl.to(".loading-screen", {
        duration: 1.2,
        width: "100%",
        left: "0%",
        ease: "Expo.easeInOut",
    });

    tl.to(".loading-screen", {
        duration: 1,
        width: "100%",
        left: "100%",
        ease: "Expo.easeInOut",
        delay: 0.3,
    });
    tl.set(".loading-screen", { left: "-100%" });
}

function contentAnimation() {
    // var tl = gsap.timeline();
    // tl.from(".animate-this", { duration: 1, y: 30, opacity: 0, stagger: 0.4, delay: 0.2 });
    console.log("aaa");
}
////////////////////////////////////////////////////////////////
// let tlStage1;
// let tlStage2;

function homeinit() {
    // cleanGSAP();

    //////important and i dont know why
    // window.dispatchEvent(new Event("resize"));

    var initTl = gsap.timeline();
    gsap.set(".homeheading", { y: "100" });
    gsap.set(".hometext", { y: "100" });
    gsap.set("div.menu-bar a", { opacity: 0 });

    initTl
        .to(".homeheading", { y: "0", opacity: "1", duration: 1.5 }, 0)
        .to(".hometext", { y: "0", opacity: "1", duration: 1.5 }, 0)
        .to(
            ".homebg", {
                clipPath: "polygon(0 0,100% 0, 100% 100%, 0 100%)",
                duration: 1.5,
                ease: "Power1.easeIn",
            },
            0
        )
        .to("div.menu-bar a", { opacity: 1, duration: 1 }, 1.5);

    var tlStage1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".left",
            start: "top+=10% top",
            end: "bottom bottom-=70%",
            // markers: true,
            scrub: 1,
        },
    });

    tlStage1.to(
        ".homebg", { y: "-=30%", duration: 1, ease: "power1.easeOut" },
        0
    );

    gsap.fromTo(
        ".imgwrap", {
            y: "-50vh",
        }, {
            y: "30vh",
            scrollTrigger: {
                trigger: ".banner",
                scrub: true,
                start: "top bottom", // position of trigger meets the scroller position
                // markers: true,
                // snap: {
                //     snapTo: 0.5, // 0.5 'cause the scroll animation range is 200vh for parallax effect
                //     duration: 1,
                //     ease: 'power4.inOut'
                // }
            },
            ease: "none",
        }
    );

    var tlStage2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".homesection1",
            start: "top-=10% top+=30%",
            end: "bottom-=30% bottom-=60%",
            // markers: true,
            once: true,
            scrub: 1,
        },
    });
    gsap.set(".bannerspan", { y: "100", opacity: 0 });
    gsap.set(".homesection1span", { y: "100", opacity: 0 });
    tlStage2
        .to(".bannerspan", { y: "0", opacity: "1", duration: 1 }, 0)
        .to(".homesection1span", { y: "0", opacity: 1, duration: 1 }, 0.8);

    var changetext = ["People", "Society", "Creativity"];
    var index = 0;
    var textfield = document.querySelector(".changetext");

    setInterval(function() {
        index++;
        textfield.innerHTML = changetext[index];
        if (index > 2) {
            index = index % 3;
            textfield.innerHTML = changetext[index];
        }
    }, 3000);

    // window.dispatchEvent(new Event('resize'));
}

function initNumberAnim(i, n, speed) {
    var aboutInfo = document.querySelector(".aboutinfo");
    var selected = aboutInfo.getElementsByTagName("div")[i];
    var selectedNumber = selected.firstElementChild;

    var counter = 0;
    var interval = setInterval(function() {
        counter += 1;
        if (counter === n) {
            clearInterval(interval);
        }
        selectedNumber.innerHTML = counter;
    }, speed);
}

function aboutInit() {
    var initTl = gsap.timeline();
    initTl
        .from(".pun", { y: "+=100%", duration: 2, ease: Expo.esaeOut }, 0)
        .from(".explain", { y: "+=100%", duration: 1, ease: Expo.esaeOut }, 1);

    initNumberAnim(0, 18, 100);
    initNumberAnim(1, 50, 50);
    initNumberAnim(2, 564, 10);
    initNumberAnim(3, 1500, 1);

    var tlAbout1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".about2",
            start: "top-=20% top+=50%",
            end: "bottom bottom-=30%",
            // markers: true,
            once: true,
            scrub: 1,
        },
    });
    gsap.set(".characteristics img, .characteristics p", { y: "100" });
    tlAbout1.staggerTo(
        ".characteristics img, .characteristics p",
        1, { y: 0, ease: "power1.easeIn" },
        0.2
    );

    gsap.set(".text-mask", { scaleX: 0 });

    // var tl = gsap.timeline({ paused: true });

    // tl.to(".text-mask", 1.5, { scaleX: 1 }, )
    //     .to(".text-mask", 1.5, { scaleX: 0, transformOrigin: "left center" }, );

    document.querySelector('svg').addEventListener('mouseover', function(e) {
        // tl.play(0);
        gsap.to(".text-mask", 1.5, { scaleX: 1 }, );
    });

    document.querySelector('svg').addEventListener('mouseout', function(e) {
        // tl.play(0);
        gsap.to(".text-mask", 1.5, { scaleX: 0, transformOrigin: "left center" }, );
    });

    document.querySelector('svg').addEventListener('touchstart', function(e) {
      // tl.play(0);
      gsap.to(".text-mask", 1.5, { scaleX: 1 }, );
  });

  document.querySelector('svg').addEventListener('touchend', function(e) {
      // tl.play(0);
      gsap.to(".text-mask", 1.5, { scaleX: 0, transformOrigin: "left center" }, );
  });
}

barba.init({
    sync: true,
    transitions: [{
        name: "default-transition",
        async leave(data) {
            const done = this.async();
            pageTransition();
            await delay(1000);
            done();
        },
        async enter(data) {
            // window.scrollTo(0, 0);
            console.log("enter");
        },

        async afterEnter(data) {
            /////super important!!!
            window.dispatchEvent(new Event("resize"));
        },
    }, ],
    views: [{
            namespace: "home",
            afterEnter(data) {
                // window.scrollTo(0, 0);
                homeinit();
            },
        },
        {
            namespace: "about",
            afterEnter(data) {
                // window.scrollTo(0, 0);
                aboutInit();
            },
        },
        {
          namespace: "projects",
          afterEnter(data) {
              // window.scrollTo(0, 0);
              console.log("pj")
          },
      },
    ],
});

window.onbeforeunload = function() {
    window.scrollTo(0, 0);
};