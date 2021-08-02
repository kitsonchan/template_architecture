gsap.registerPlugin(ScrollTrigger);

const cleanGSAP = () => {
    ScrollTrigger.getAll().forEach(t => t.kill(false));
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
            markers: true,
            scrub: 1,
        },
    });

    tlStage1.to('.homebg', { y: '-=30%', duration: 1, ease: 'power1.easeOut' });

    gsap.fromTo(".imgwrap", {
        y: "-50vh"
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
        ease: 'none'
    });

    var tlStage2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".homesection1",
            start: "top-=40% top+=30%",
            end: "bottom-=10% bottom-=50%",
            // markers: true,
            once: true,
            scrub: 1,
        },
    });
    gsap.set('.bannerspan', { y: '100', opacity: 0 });
    gsap.set('.homesection1span', { y: '100', opacity: 0 });
    tlStage2.to('.bannerspan', { y: '0', opacity: '1', duration: 1 }, 0).to('.homesection1span', { y: '0', opacity: 1, duration: 1 }, 0.8);
    // tlStage2.from('.bannerspan', { y: '+=50%', duration: 1 }, 0).from('.homesection1span', { y: '+=50%', duration: 1 }, 1);

    var changetext = ['People', 'Society', 'Creativity'];
    var index = 0;
    var textfield = document.querySelector('.changetext');

    setInterval(function() {
        index++;
        textfield.innerHTML = changetext[index];
        if (index > 2) {
            index = index % 3;
            textfield.innerHTML = changetext[index];
        };
    }, 3000);

    // window.dispatchEvent(new Event('resize'));
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
            console.log("enter")
        },

        // async once(data) {
        //     contentAnimation();
        // },
    }, ],
    views: [{
            namespace: "home",
            afterEnter(data) {
                window.scrollTo(0, 0);
                homeinit();
            },
        },
        {
            namespace: "test",
            afterEnter(data) {
                console.log("going test");
                window.scrollTo(0, 0);
            },
        },
    ],
});

// window.onbeforeunload = function() {
//     window.scrollTo(0, 0);
// }