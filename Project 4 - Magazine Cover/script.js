document.addEventListener("DOMContentLoaded", () => {
    const flyer = document.querySelector(".flyer");
    const prevButton = document.querySelector(".prev-page");
    const nextButton = document.querySelector(".next-page");
    const subscribeButton = document.querySelector(".subscribe-btn");

    
    flyer.addEventListener("mousemove", (e) => {
        let x = (window.innerWidth / 2 - e.pageX) / 30;
        let y = (window.innerHeight / 2 - e.pageY) / 30;
        flyer.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });

    flyer.addEventListener("mouseleave", () => {
        flyer.style.transform = "rotateY(0) rotateX(0)";
    });

    // // Pagination (Next & Previous Page)
    prevButton.addEventListener("click", () => {
        alert("Going to the Previous Page! 🚀");
        window.location.href = "404.html"; 
    });

    nextButton.addEventListener("click", () => {
        alert("Going to the Next Page! 🚀");
        window.location.href = "next_page.html"; 
    });

   
    subscribeButton.addEventListener("click", () => {
        alert("Thank you for Subscribing! 🎉");
    });
});
