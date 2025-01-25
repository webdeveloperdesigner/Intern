console.clear();

const { gsap, imagesLoaded } = window;

const buttons = {
    prev: document.querySelector(".btn--left"),
    next: document.querySelector(".btn--right"),
};
const cardsContainerEl = document.querySelector(".cards__wrapper");
const appBgContainerEl = document.querySelector(".app__bg");

const cardInfosContainerEl = document.querySelector(".info__wrapper");

buttons.next.addEventListener("click", () => swapCards("right"));
buttons.prev.addEventListener("click", () => swapCards("left"));

function swapCards(direction) {
    const currentCardEls = cardsContainerEl.querySelectorAll(".current--card");
    const previousCardEls = cardsContainerEl.querySelectorAll(".previous--card");
    const nextCardEls = cardsContainerEl.querySelectorAll(".next--card");

    const currentBgImageEls = appBgContainerEl.querySelectorAll(".current--image");
    const previousBgImageEls = appBgContainerEl.querySelectorAll(".previous--image");
    const nextBgImageEls = appBgContainerEl.querySelectorAll(".next--image");

    changeInfo(direction);
    swapCardsClass();

    currentCardEls.forEach(card => removeCardEvents(card));

    function swapCardsClass() {
        currentCardEls.forEach(card => card.classList.remove("current--card"));
        previousCardEls.forEach(card => card.classList.remove("previous--card"));
        nextCardEls.forEach(card => card.classList.remove("next--card"));

        currentBgImageEls.forEach(bg => bg.classList.remove("current--image"));
        previousBgImageEls.forEach(bg => bg.classList.remove("previous--image"));
        nextBgImageEls.forEach(bg => bg.classList.remove("next--image"));

        currentCardEls.forEach(card => card.style.zIndex = "50");
        currentBgImageEls.forEach(bg => bg.style.zIndex = "-2");

        if (direction === "right") {
            previousCardEls.forEach(card => card.style.zIndex = "20");
            nextCardEls.forEach(card => card.style.zIndex = "30");

            nextBgImageEls.forEach(bg => bg.style.zIndex = "-1");

            currentCardEls.forEach(card => card.classList.add("previous--card"));
            previousCardEls.forEach(card => card.classList.add("next--card"));
            nextCardEls.forEach(card => card.classList.add("current--card"));

            currentBgImageEls.forEach(bg => bg.classList.add("previous--image"));
            previousBgImageEls.forEach(bg => bg.classList.add("next--image"));
            nextBgImageEls.forEach(bg => bg.classList.add("current--image"));
        } else if (direction === "left") {
            previousCardEls.forEach(card => card.style.zIndex = "30");
            nextCardEls.forEach(card => card.style.zIndex = "20");

            previousBgImageEls.forEach(bg => bg.style.zIndex = "-1");

            currentCardEls.forEach(card => card.classList.add("next--card"));
            previousCardEls.forEach(card => card.classList.add("current--card"));
            nextCardEls.forEach(card => card.classList.add("previous--card"));

            currentBgImageEls.forEach(bg => bg.classList.add("next--image"));
            previousBgImageEls.forEach(bg => bg.classList.add("current--image"));
            nextBgImageEls.forEach(bg => bg.classList.add("previous--image"));
        }
    }
}

function changeInfo(direction) {
    let currentInfoEls = cardInfosContainerEl.querySelectorAll(".current--info");
    let previousInfoEls = cardInfosContainerEl.querySelectorAll(".previous--info");
    let nextInfoEls = cardInfosContainerEl.querySelectorAll(".next--info");

    gsap.timeline()
        .to([buttons.prev, buttons.next], {
            duration: 0.2,
            opacity: 0.5,
            pointerEvents: "none",
        })
        .to(
            currentInfoEls.forEach(info => info.querySelectorAll(".text")),
            {
                duration: 0.4,
                stagger: 0.1,
                translateY: "-120px",
                opacity: 0,
            },
            "-="
        )
        .call(() => swapInfosClass(direction))
        .call(() => initCardEvents())
        .fromTo(
            direction === "right"
                ? nextInfoEls.forEach(info => info.querySelectorAll(".text"))
                : previousInfoEls.forEach(info => info.querySelectorAll(".text")),
            {
                opacity: 0,
                translateY: "40px",
            },
            {
                duration: 0.4,
                stagger: 0.1,
                translateY: "0px",
                opacity: 1,
            }
        )
        .to([buttons.prev, buttons.next], {
            duration: 0.2,
            opacity: 1,
            pointerEvents: "all",
        });

    function swapInfosClass() {
        currentInfoEls.forEach(info => info.classList.remove("current--info"));
        previousInfoEls.forEach(info => info.classList.remove("previous--info"));
        nextInfoEls.forEach(info => info.classList.remove("next--info"));

        if (direction === "right") {
            currentInfoEls.forEach(info => info.classList.add("previous--info"));
            nextInfoEls.forEach(info => info.classList.add("current--info"));
            previousInfoEls.forEach(info => info.classList.add("next--info"));
        } else if (direction === "left") {
            currentInfoEls.forEach(info => info.classList.add("next--info"));
            nextInfoEls.forEach(info => info.classList.add("previous--info"));
            previousInfoEls.forEach(info => info.classList.add("current--info"));
        }
    }
}

function updateCard(e) {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const centerPosition = {
        x: box.left + box.width / 2,
        y: box.top + box.height / 2,
    };
    let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
    gsap.set(card, {
        "--current-card-rotation-offset": `${angle}deg`,
    });
    const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
    gsap.set(currentInfoEl, {
        rotateY: `${angle}deg`,
    });
}

function resetCardTransforms(e) {
    const card = e.currentTarget;
    const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
    gsap.set(card, {
        "--current-card-rotation-offset": 0,
    });
    gsap.set(currentInfoEl, {
        rotateY: 0,
    });
}

function initCardEvents() {
    const currentCardEls = cardsContainerEl.querySelectorAll(".current--card");
    currentCardEls.forEach(card => {
        card.addEventListener("pointermove", updateCard);
        card.addEventListener("pointerout", (e) => {
            resetCardTransforms(e);
        });
    });
}

function removeCardEvents(card) {
    card.removeEventListener("pointermove", updateCard);
}

function init() {
    let tl = gsap.timeline();

    tl.to(cardsContainerEl.children, {
        delay: 0.15,
        duration: 0.5,
        stagger: {
            ease: "power4.inOut",
            from: "right",
            amount: 0.1,
        },
        "--card-translateY-offset": "0%",
    })
    .to(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
        delay: 0.5,
        duration: 0.4,
        stagger: 0.1,
        opacity: 1,
        translateY: 0,
    })
    .to(
        [buttons.prev, buttons.next],
        {
            duration: 0.4,
            opacity: 1,
            pointerEvents: "all",
        },
        "-=0.4"
    );
}

const waitForImages = () => {
    const images = [...document.querySelectorAll("img")];
    const totalImages = images.length;
    let loadedImages = 0;
    const loaderEl = document.querySelector(".loader span");

    gsap.set(cardsContainerEl.children, {
        "--card-translateY-offset": "100vh",
    });
    gsap.set(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
        translateY: "40px",
        opacity: 0,
    });
    gsap.set([buttons.prev, buttons.next], {
        pointerEvents: "none",
        opacity: "0",
    });

    images.forEach((image) => {
        imagesLoaded(image, (instance) => {
            if (instance.isComplete) {
                loadedImages++;
                let loadProgress = loadedImages / totalImages;

                gsap.to(loaderEl, {
                    duration: 1,
                    scaleX: loadProgress,
                    backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
                });

                if (totalImages == loadedImages) {
                    gsap.timeline()
                        .to(".loading__wrapper", {
                            duration: 0.4,
                            opacity: 0,
                            y: "-100%",
                            display: "none",
                        })
                        .call(init);
                }
            }
        });
    });
};

waitForImages();
