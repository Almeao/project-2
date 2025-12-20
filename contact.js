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
  












// Function to animate .header_top height and border based on scroll position
function animateHeaderOnScroll() {
    const headerTop = document.querySelector('.header_top');
    if (!headerTop) return;
    const currentScrollY = window.scrollY;
  
    if (currentScrollY > 10) {
      // Scroll Y > 2: height 5vh and border bottom
      gsap.to(headerTop, {
        height: "5vh",
        borderBottom: "0.5px solid #00000065",
        duration: 1,
        ease: window.CustomEase ? CustomEase.create("custom", "M0,0 C1,0.012 0,1 1,1 ") : "power2.out",

  
        overwrite: "auto"
      });
    } else {
      // Scroll Y <= 2: height 10vh and remove border bottom
      gsap.to(headerTop, {
        height: "10vh",
        borderBottom: "none",
        duration: 1,
        // Fix: Ensure CustomEase is loaded and registered with GSAP, and the name matches.
        // If CustomEase is unavailable, fallback to a standard GSAP ease for now.
        // To use a custom ease, ensure to include: 
        // <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/CustomEase.min.js"></script>
        ease: window.CustomEase ? CustomEase.create("custom", "M0,0 C1,0.012 0,1 1,1 ") : "power2.out",
        overwrite: "auto"
      });
    }
  }
  
  // Attach function to the 'scroll' event of the window
  window.addEventListener('scroll', animateHeaderOnScroll);
  
  // Also, set on page load to ensure correct state
  animateHeaderOnScroll();
  
  
  
  
  
  // Animate entire header hide on scroll down, show on scroll up
  (function () {
    const header = document.querySelector('header');
    if (!header) return;
  
    let lastScrollY = window.scrollY;
    let ticking = false;
  
    function onScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // Scrolling down, hide header
        gsap.to(header, {
          y: "-100%",
          duration: 1,
          ease: "power4.out",
          overwrite: true
        });
      } else {
        // Scrolling up, show header
        gsap.to(header, {
          y: "0%",
          duration: 1.5,
          ease: "power4.out",
          overwrite: true
        });
      }
      lastScrollY = currentScrollY;
      ticking = false;
    }
  
    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    });
  })();
  
  
  
  
  
  const btn1 = document.querySelector('.header_top_option_1');
  const curtain1 = document.querySelector('.headder_container1_cover');
  const headerTop1 = document.querySelector('.header_top');
  const main1 = document.querySelector('main');
  
  if (btn1 && curtain1 && headerTop1 && main1) {
    gsap.set(curtain1, { height: 0, clearProps: "opacity" });
    headerTop1.style.borderBottom = "none";
    main1.style.filter = "none";
  
    let isOverBtn1 = false;
    let isOverCurtain1 = false;
  
    function showCurtain1() {
      gsap.to(curtain1, {
        height: "75vh",
        opacity: 1,
        scrub: 5,
        stagger: 5,
        duration: 0.7,
        ease: window.CustomEase ? CustomEase.create("custom", "M0,0 C3.81,0.012 -2.808,0.987 1,0.987 ") : "power2.out",

        overwrite: "auto"
      });
      headerTop1.style.borderBottom = "0.5px solid #00000065";
      gsap.to(main1, {
        filter: "blur(15px)",
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  
    function hideCurtain1() {
      gsap.to(curtain1, {
        height: 0,
        opacity: 0,
        scrub: 5,
        stagger: 5,
        duration: 0.5,
        ease: "expoScale(1,2,power2.inOut)",
        overwrite: "auto"
      });
      headerTop1.style.borderBottom = "none";
      gsap.to(main1, {
        filter: "none",
        duration: 0.3,
        ease: "power2.in",
        overwrite: "auto"
      });
    }
  
    btn1.addEventListener('mouseenter', () => {
      isOverBtn1 = true;
      showCurtain1();
    });
  
    btn1.addEventListener('mouseleave', () => {
      isOverBtn1 = false;
      // Only hide if not over .headder_container1_cover
      setTimeout(() => {
        if (!isOverBtn1 && !isOverCurtain1) hideCurtain1();
      }, 500);
    });
  
    curtain1.addEventListener('mouseenter', () => {
      isOverCurtain1 = true;
      showCurtain1();
    });
  
    curtain1.addEventListener('mouseleave', () => {
      isOverCurtain1 = false;
      // Only hide if not over .header_top_option_1
      setTimeout(() => {
        if (!isOverBtn1 && !isOverCurtain1) hideCurtain1();
      }, 10);
    });
  }
  
  
  
  // Animation for .headder_container2_cover (second curtain)
  const btn2 = document.querySelector(".header_top_option_2");
  const curtain2 = document.querySelector('.headder_container2_cover');
  // const headerTop2 = document.querySelector('.header_top');
  // const main2 = document.querySelector('main');
  
  if (btn2 && curtain2 && main1) {
    gsap.set(curtain2, { height: 0, clearProps: "opacity" });
    headerTop1.style.borderBottom = "none";
    main1.style.filter = "none";
  
    let isOverBtn2 = false;
    let isOverCurtain2 = false;
  
    function showCurtain2() {
      gsap.to(curtain2, {
        height: "60vh",
        opacity: 1,
        scrub: 5,
        stagger: 5,
        duration: 0.4,
        ease: window.CustomEase ? CustomEase.create("custom", "M0,0 C3.81,0.012 -2.808,0.987 1,0.987 ") : "power2.out",
        overwrite: "auto"
      });
      headerTop1.style.borderBottom = "0.5px solid #00000065";
      gsap.to(main1, {
        filter: "blur(15px)",
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  
    function hideCurtain2() {
      gsap.to(curtain2, {
        height: 0,
        opacity: 0,
        scrub: 5,
        stagger: 5,
        duration: 0.4,
        ease: "expoScale(1,2,power2.inOut)",
        overwrite: "auto"
      });
      headerTop1.style.borderBottom = "none";
      gsap.to(main1, {
        filter: "none",
        duration: 0.3,
        ease: "power2.in",
        overwrite: "auto"
      });
    }
  
    btn2.addEventListener('mouseenter', () => {
      isOverBtn2 = true;
      showCurtain2();
    });
  
    btn2.addEventListener('mouseleave', () => {
      isOverBtn2 = false;
      setTimeout(() => {
        if (!isOverCurtain2 && !isOverBtn2) {
          hideCurtain2();
        }
      }, 500);
    });
  
    curtain2.addEventListener('mouseenter', () => {
      isOverCurtain2 = true;
      showCurtain2();
    });
  
    curtain2.addEventListener('mouseleave', () => {
      isOverCurtain2 = false;
      setTimeout(() => {
        if (!isOverBtn2 && !isOverCurtain2) {
          hideCurtain2();
        }
      }, 10);
    });
  
  }
  
// --- Footer Logo Animate Morph with GSAP/MorphSVG (16-path SVG version) ---

// Function to check if MorphSVGPlugin is available
function checkMorphSVGPlugin() {
    if (typeof gsap === 'undefined') {
        return false;
    }
    // Check if plugin is already registered or available
    if (typeof MorphSVGPlugin !== 'undefined') {
        return true;
    }
    // Check if it's available in gsap.plugins
    if (gsap.plugins && gsap.plugins.morphSVG) {
        return true;
    }
    return false;
}

// Wait for all scripts to load
function initFooterLogoMorph() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.error("GSAP is not loaded. Make sure GSAP is included.");
        return;
    }

    // Check if MorphSVGPlugin is available
    if (!checkMorphSVGPlugin()) {
        console.error("MorphSVGPlugin is not loaded. Make sure to include: https://unpkg.com/gsap@3/dist/MorphSVGPlugin.min.js");
        console.log("Note: MorphSVGPlugin is a premium GSAP plugin. The free CDN may not work.");
        return;
    }

    // Register MorphSVGPlugin if not already registered
    try {
        if (typeof MorphSVGPlugin !== 'undefined') {
            gsap.registerPlugin(MorphSVGPlugin);
            console.log("MorphSVGPlugin registered successfully");
        }
    } catch (e) {
        console.error("Error registering MorphSVGPlugin:", e);
        return;
    }

    // Every entry in logoFrames is an array of 16 strings (empty "" to "hide" a path for a morph phase).
    const logoFrames = [
        // FRAME 1: original logo
        [
            "M78.06 16.6799H61.38V52.3299H78.06V16.6799Z", // 0
            "M61.38 0H16.6801V16.68H61.38V0Z",             // 1
            "M47.37 29.47H30.6899V52.33H47.37V29.47Z",     // 2
            "M16.68 16.6799H0V52.3299H16.68V16.6799Z",     // 3
            "M123.38 61.38H87.73V78.0601H123.38V61.38Z",   // 4
            "M140.06 16.6799H123.38V61.3799H140.06V16.6799Z", // 5
            "M110.58 30.7H87.72V47.3799H110.58V30.7Z",     // 6
            "M123.38 0H87.73V16.68H123.38V0Z",             // 7
            "M78.68 87.73H62V123.38H78.68V87.73Z",         // 8
            "M123.38 123.38H78.6801V140.06H123.38V123.38Z",// 9
            "M109.37 87.72H92.6899V110.58H109.37V87.72Z",  // 10
            "M140.06 87.73H123.38V123.38H140.06V87.73Z",   // 11
            "M52.33 62H16.6801V78.6801H52.33V62Z",         // 12
            "M16.68 78.6801H0V123.38H16.68V78.6801Z",      // 13
            "M52.33 92.6899H29.47V109.37H52.33V92.6899Z",  // 14
            "M52.33 123.38H16.6801V140.06H52.33V123.38Z"   // 15
        ],
        // FRAME 2: diamond (only first path, others hidden)
        [
            "M100 20 L180 100 L100 180 L20 100 Z", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""
        ],
        // FRAME 3: hexagon
        [
            "M60 30 L140 30 L180 100 L140 170 L60 170 L20 100 Z", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""
        ],
        // FRAME 4: blob
        [
            "M100 20 C160 20 180 100 100 180 C20 100 40 20 100 20 Z", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""
        ],
        // FRAME 5: sharp star
        [
            "M100 20 L120 80 L180 100 L120 120 L100 180 L80 120 L20 100 L80 80 Z", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""
        ],
        // FRAME 6: rounded square
        [
            "M50 60 Q50 30 80 30 H120 Q150 30 150 60 V140 Q150 170 120 170 H80 Q50 170 50 140 Z", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""
        ],
        // FRAME 7: abstract wave
        [
            "M40 100 C60 10 140 10 160 100 C140 190 60 190 40 100 Z", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""
        ]
    ];

    // Get all .footer-logo-morph paths in correct order
    const paths = document.querySelectorAll(".footer_down_1_animate_logo .footer-logo-morph");
    
    console.log("Found paths:", paths.length);

    // Sanity check
    function logoPathSanity() {
        if (paths.length !== 16) {
            console.error("ERROR: You must have exactly 16 <path class='footer-logo-morph'> in your SVG for logo morphing! Found:", paths.length);
            console.log("Available paths:", Array.from(paths).map(p => p.getAttribute('d')));
            return false;
        }
        if (!logoFrames.every(f => Array.isArray(f) && f.length === 16)) {
            console.error("ERROR: Each frame array in logoFrames must have 16 path strings.");
            return false;
        }
        return true;
    }

    if (logoPathSanity()) {
        console.log("Starting logo morph animation...");
        
        // Set initial paths
        paths.forEach((p, i) => {
            if (logoFrames[0][i]) {
                p.setAttribute("d", logoFrames[0][i]);
            }
        });

        // Check if morphSVG is available (MorphSVGPlugin is loaded)
        const hasMorphSVG = gsap.plugins && gsap.plugins.morphSVG;
        
        if (!hasMorphSVG && typeof MorphSVGPlugin === 'undefined') {
            console.warn("MorphSVGPlugin not available. Using fallback animation.");
            // Fallback: animate opacity and scale for a simpler effect
            animateLogoFallback(paths, logoFrames);
            return;
        }

        const tl = gsap.timeline({ repeat: -1 });

        for (let frame = 1; frame < logoFrames.length; frame++) {
            tl.to(paths, {
                // Morph each path by index to corresponding d string in next frame
                morphSVG: function (i, el) {
                    const targetPath = logoFrames[frame][i] || "";
                    return targetPath;
                },
                duration: 1,
                stagger: 0,
                ease: "power3.inOut"
            });
        }
        // Morph back to start
        tl.to(paths, {
            morphSVG: function (i, el) {
                return logoFrames[0][i] || "";
            },
            duration: 1,
            stagger: 0,
            ease: "power3.inOut"
        });
        
        console.log("Logo morph animation started successfully!");
    } else {
        console.error("Logo morph animation failed sanity check.");
    }
}

// Fallback animation if MorphSVGPlugin is not available
function animateLogoFallback(paths, logoFrames) {
    let currentFrame = 0;
    
    function animateToNextFrame() {
        const nextFrame = (currentFrame + 1) % logoFrames.length;
        
        // Fade out current paths
        gsap.to(paths, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                // Update paths
                paths.forEach((p, i) => {
                    const targetPath = logoFrames[nextFrame][i];
                    if (targetPath) {
                        p.setAttribute("d", targetPath);
                    } else {
                        p.style.display = "none";
                    }
                });
                
                // Fade in new paths
                gsap.to(paths, {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => {
                        currentFrame = nextFrame;
                        setTimeout(animateToNextFrame, 1000);
                    }
                });
            }
        });
    }
    
    // Start animation
    setTimeout(animateToNextFrame, 1000);
}

// Try to initialize immediately if scripts are already loaded
if (document.readyState === 'complete') {
    setTimeout(initFooterLogoMorph, 100);
} else {
    // Wait for window load event
    window.addEventListener('load', function() {
        setTimeout(initFooterLogoMorph, 100);
    });
}
  