$('.company-slider').slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 5,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});


// Function to animate the counters
function animateCounter(element, targetNumber, duration) {
  const interval = 50; // Update interval in milliseconds
  const increment = targetNumber / (duration / interval);
  let currentNumber = 0;

  // Counter function
  function updateCounter() {
    currentNumber += increment;
    if (currentNumber < targetNumber) {
      element.textContent = Math.floor(currentNumber) + ' +';
    } else {
      element.textContent = targetNumber + ' +';
      clearInterval(counterInterval);
    }
  }

  // Run the counter
  const counterInterval = setInterval(updateCounter, interval);
}

// Callback for IntersectionObserver
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counterElement = entry.target;
      const targetNumber = +counterElement.getAttribute('data-target');

      // Start the counter animation
      animateCounter(counterElement, targetNumber, 2000); // Duration set to 2000ms (2 seconds)
      
      // Unobserve the element to avoid re-running the counter
      observer.unobserve(counterElement);
    }
  });
}

// Set up the IntersectionObserver
const options = {
  threshold: 0.5 // Trigger when at least 50% of the element is visible
};
const observer = new IntersectionObserver(handleIntersection, options);

// Select all counter elements and observe them
const counters = document.querySelectorAll('.counter-txt h4');
counters.forEach(counter => {
  observer.observe(counter);
});