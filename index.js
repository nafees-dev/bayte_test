const sliderContents = [
  {
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae molestiae magni animi ipsa! Adipisci a quisquam eligendi velit facere ratione, dolore numquam? Culpa, sit optio!",
    imageSrc: "https://randomuser.me/api/portraits/men/94.jpg",
    name: "John Doe",
    profession: "Web Developer",
    cvLink: "https://example.com/john-doe-cv.pdf"
  },
  {
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    imageSrc: "https://randomuser.me/api/portraits/women/60.jpg",
    name: "Jane Smith",
    profession: "Graphic Designer",
    cvLink: "https://example.com/jane-smith-cv.pdf"
  },
  {
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae molestiae magni animi ipsa! Adipisci a quisquam eligendi velit facere ratione, dolore numquam? Culpa, sit optio!",
    imageSrc: "https://randomuser.me/api/portraits/women/91.jpg",
    name: "Lady Johnson",
    profession: "Software Engineer",
    cvLink: "https://example.com/mark-johnson-cv.pdf"
  }
];


// Define the Slider class
class Slider {
  constructor(element) {
    // Initialize configuration options
    const animationTime = parseInt(element.dataset.animationTime) || 3000;
    const autoplayInterval = parseInt(element.dataset.autoplayInterval) || 5000;
    const showNavigation = element.dataset.showNavigation === "true";

    // Initialize instance variables
    this.slides = Array.from(element.querySelectorAll(".slide"));
    this.dots = Array.from(element.querySelectorAll(".dot"));
    this.prevArrow = element.querySelector(".prev");
    this.nextArrow = element.querySelector(".next");
    this.currentSlide = 0;
    this.animationTime = animationTime;
    this.autoplayInterval = autoplayInterval;
    this.showNavigation = showNavigation;

    // Attach event listeners
    this.prevArrow.addEventListener("click", () => this.navigatePrev());
    this.nextArrow.addEventListener("click", () => this.navigateNext());
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.navigateToSlide(index));
    });

    // Start autoplay if enabled
    if (this.autoplayInterval) {
      this.autoplayId = setInterval(() => this.navigateNext(), this.autoplayInterval);
    }

    // Show navigation if enabled
    if (this.showNavigation) {
      this.prevArrow.style.display = "block";
      this.nextArrow.style.display = "block";
    }

    // Populate the slides with content
    this.slides.forEach((slide, index) => {
      const content = sliderContents[index];
      const img = slide.querySelector(".sliderImage");
      const name = slide.querySelector(".name");
      const description = slide.querySelector(".description");;

      img.src = content.imageSrc || "";
      img.alt = content.name;
      name.textContent = content.name;
      description.textContent = content.description;
    });
  }

  showSlide(index) {
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.dots.forEach((dot) => dot.classList.remove("active"));

    this.slides[index].classList.add("active");
    this.dots[index].classList.add("active");
  }

  navigateToSlide(index) {
    if (index < 0) {
      this.currentSlide = this.slides.length - 1;
    } else if (index >= this.slides.length) {
      this.currentSlide = 0;
    } else {
      this.currentSlide = index;
    }

    this.showSlide(this.currentSlide);
  }

  navigatePrev() {
    this.navigateToSlide(this.currentSlide - 1);
  }

  navigateNext() {
    this.navigateToSlide(this.currentSlide + 1);
  }

  destroy() {
    clearInterval(this.autoplayId);
  }
}

// Initialize slider components on page load
window.addEventListener("load", () => {
  const sliders = Array.from(document.querySelectorAll(".slider"));

  sliders.forEach((slider) => {
    new Slider(slider);
  });
});