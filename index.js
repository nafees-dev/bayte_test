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
    imageSrc: "https://randomuser.me/api/portraits/men/60.jpg",
    name: "Jane Smith",
    profession: "Graphic Designer",
    cvLink: "https://example.com/jane-smith-cv.pdf"
  },
  {
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae molestiae magni animi ipsa! Adipisci a quisquam eligendi velit facere ratione, dolore numquam? Culpa, sit optio!",
    imageSrc: "https://randomuser.me/api/portraits/men/91.jpg",
    name: "Lady Johnson",
    profession: "Software Engineer",
    cvLink: "https://example.com/mark-johnson-cv.pdf"
  }
];


// Define the Slider class
class Slider {
  constructor(element) {
    const animationTime = parseInt(element.dataset.animationTime) || 3000;
    const autoplayInterval = parseInt(element.dataset.autoplayInterval) || 5000;
    const showNavigation = element.dataset.showNavigation === "true";
    this.createSlides(element)

    this.slides = Array.from(element.querySelectorAll(".slide"));
    this.dots = [];
    this.dotContainer = null;
    this.prevArrow = element.querySelector(".prev");
    // this.sliderWrapper = element.querySelector(".slider");
    this.nextArrow = element.querySelector(".next");
    this.dotsWrapper = element.querySelector(".dots");
    this.currentSlide = 0;
    this.animationTime = animationTime;
    this.autoplayInterval = autoplayInterval;
    this.showNavigation = showNavigation;

    this.prevArrow.addEventListener("click", () => this.navigatePrev());
    this.nextArrow.addEventListener("click", () => this.navigateNext());

    if (this.autoplayInterval) {
      this.autoplayId = setInterval(() => this.navigateNext(), this.autoplayInterval);
    }

    if (this.showNavigation) {
      this.prevArrow.style.display = "block";
      this.nextArrow.style.display = "block";
    }

    this.slides.forEach((slide, index) => {
      const content = sliderContents[index];
      const dot = document.createElement("div");
      // const secondWrapper = slide.querySelector(".sliderImage");
      dot.classList.add("dot");
      if(index===0) dot.classList.add("active");

      const img = slide.querySelector(".sliderImage");
      const name = slide.querySelector(".name");
      const description = slide.querySelector(".description");

      img.src = content.imageSrc || "";
      img.alt = content.name;
      name.textContent = content.name;
      description.textContent = content.description;
    
      this.dots.push(dot);
      // slide.style.opacity = index === 0 ? 1 : 0;
      this.dotsWrapper.appendChild(dot);
    });

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.navigateToSlide(index));
    });
  }

  showSlide(index) {
    this.slides.forEach((slide) => { 
      slide.style.opacity = 0; slide.classList.remove("active"); 
    });
    this.slides[index].style.opacity = 1;
    // this.slides[index].style.width = "100%" ;
    // this.slides[index].style.height = "100%" ;
    this.slides[index].classList.add("active");
    // this.slides[index].classList.remove("hide");
    this.dots.forEach((dot) => dot.classList.remove("active"));
    this.dots[index].classList.add("active");
  }

  createSlides(element){
    // const controls = element.querySelector(".controls");
    const firstWrapper = element.querySelector(".first-wrapper");
    sliderContents.forEach((content, index) => {
      const sliderWrapper = document.createElement("div");
      sliderWrapper.classList.add("slide");
      if(index === 0){ sliderWrapper.classList.add("active"); }
      // create description
      const sliderDescription = document.createElement("div");
      sliderDescription.classList.add("description");
      sliderDescription.textContent = content.description;
      // create slider image
      const sliderImage = document.createElement("img");
      sliderImage.classList.add("sliderImage");
      sliderImage.src = content.imageSrc;
      // create name
      const sliderName = document.createElement("div");
      sliderName.classList.add("name");
      sliderName.textContent = content.name;
      // create profession
      const sliderProfession = document.createElement("div");
      sliderProfession.classList.add("profession");
      sliderProfession.textContent = content.profession;
      // create cv link
      const sliderCvLink = document.createElement("button");
      sliderCvLink.classList.add("view-cv-btn");
      sliderCvLink.textContent = "View CV";
      // append all elements to slider wrapper
      sliderWrapper.appendChild(sliderDescription);
      sliderWrapper.appendChild(sliderImage);
      sliderWrapper.appendChild(sliderName);
      sliderWrapper.appendChild(sliderProfession);
      sliderWrapper.appendChild(sliderCvLink);

      firstWrapper.appendChild(sliderWrapper);
    });
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

    clearInterval(this.autoplayId);
    if (this.autoplayInterval) {
      this.autoplayId = setTimeout(() => {
        this.autoplayId = setInterval(() => this.navigateNext(), this.autoplayInterval);
      }, this.animationTime);
    }
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

window.addEventListener("load", () => {
  const sliders = Array.from(document.querySelectorAll(".slider"));
  sliders.forEach((slider) => {
    new Slider(slider);
  });
});