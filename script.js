// Initialize Lenis for smooth slow scrolling with easing
const lenis = new Lenis({
  smooth: true,
  lerp: 0.05, // smaller value for slower, smoother scroll (default is 0.1)
  duration: 1.2, // in seconds, slow it down further for a "perfect" controlled scroll
  wheelMultiplier: 0.7, // reduce mousewheel speed, play with value for desired "slowness"
  easing: (t) => 1 - Math.pow(1 - t, 3) // Add cubic easing (easeOutCubic)
});

// handle frame updates
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf);

// (Optional) Sync Lenis with GSAP's ScrollTrigger if used
if (window.gsap && window.ScrollTrigger) {
  lenis.on('scroll', ScrollTrigger.update)
}






// The problem is in the very first line: 
// `getElementById` expects the *id* of the element, not a selector with '.' like a class.
// In your HTML, the main container is <div class="page1"> (class, not id).
// To select by class, use document.querySelector(".page1").
// Here's the corrected code:

const activeZone = document.querySelector('.page1');

const images = [
  "download-1.png",
  "download-2.png",
  "download-3.png",
  "download-4.png",
];

let imageIndex = 0;
let lastX = 0;
let lastY = 0;
// Decrease the threshold to reduce space between images (closer spacing)
const threshold = 25;

// Listen for mouse moves inside the .page1 div
activeZone.addEventListener('mousemove', (e) => {
  const rect = activeZone.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const distance = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));

  if (distance > threshold) {
    spawnImage(x, y);
    lastX = x;
    lastY = y;
  }
});

// Reset last positions when entering to prevent a "jump"
activeZone.addEventListener('mouseenter', (e) => {
  const rect = activeZone.getBoundingClientRect();
  lastX = e.clientX - rect.left;
  lastY = e.clientY - rect.top;
});

function spawnImage(x, y) {
  const img = document.createElement('img');
  img.src = images[imageIndex];
  img.className = 'trail-img';

  img.style.left = `${x}px`;
  img.style.top = `${y}px`;

  // Append images ONLY to the active zone, not the body
  activeZone.appendChild(img);

  imageIndex = (imageIndex + 1) % images.length;

  // Use only opacity for show/hide, increase speed
  gsap.timeline({
    onComplete: () => img.remove()
  })
    .to(img, {
      scale: 1,
      duration: 0.18,     // much faster "pop in"
      ease: "back.out(1.7)"
    })
    .to(img, {
      opacity: 0,
      scale: 0.5,
      y: 0,
      duration: 1,     // much faster "fade out"
      delay: 0.07,     // small delay so effect is visible but quick overall
      ease: "back.out(1.7)"
    });
}



// Animate the .page1_mask_inner_image_1 moving up
// Create a timeline for both the .page1_mask_inner_image_1 movement and the SVG mask path animations
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1",
    start: "top top",
    end: "+=300%",
    scrub: true,
    pin: true,
    //markers: true // Uncomment for debugging
  }
});

// Animate .page1_mask_inner_image_1 moving up
tl.to(".page1_mask_inner_image_1", {
  y: "-100%",
  ease: "none",
}); // Start immediately at time 0




// Animate all SVG mask paths - staggered within the same timeline



tl.to(".mask-path_hight", {
  scaleY: 20,
  rotation: 0,
  opacity: 0,
  transformOrigin: "center center",
  ease: "power2.inOut",

  duration: 1,
}, "maskimage");

tl.to(".mask-path_center", {
  scale: 0,
  rotation: 0,

  transformOrigin: "center center",
  ease: "power2.inOut",

  duration: 1,
}, "maskimage");

tl.to(".mask-path_width", {
  scaleX: 20,
  rotation: 0,
  opacity: 0,
  transformOrigin: "center center",
  ease: "power2.inOut",

  duration: 1,
}, "maskimage");


// Start at the same time as the first animation
tl.to(".page1_mask_image", {
  scale: 15,
  opacity: 0,
  // rotation: 50,
  transformOrigin: "center center",
  ease: "power2.inOut",

  duration: 1,


}

  , "maskimage"); // Start at the same time as the first animation

tl.to(".page1_mask_inner_image_2", {
  opacity: 0,


  ease: "power2.inOut",

  duration: 1,
  // Set .page1 background size to 100% at the start
  onStart: function () {

  },

}, "maskimage"); // Start at the same time as the first animation


tl.to(".page1_background_image", 
{ 
    opacity:1, 
    //  duration: 1,
     delay:0.4,
      ease: "power2.inOut"
}, "maskimage");

