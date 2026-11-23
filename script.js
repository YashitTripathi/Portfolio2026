(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Typing effect for the hero skill
  var el = document.getElementById("rot");
  var words = ["Oracle ADF", "PL/SQL", "Java EE", "Spring"];
  if (el && !reduce) {
    var w = 0, i = words[0].length, del = true;
    (function tick() {
      var word = words[w];
      el.textContent = word.slice(0, i);
      var delay = del ? 60 : 110;
      if (del && i === 0) { del = false; w = (w + 1) % words.length; delay = 300; }
      else if (!del && i === words[w].length) { del = true; delay = 1600; }
      else { i += del ? -1 : 1; }
      setTimeout(tick, delay);
    })();
  }

  // 2. Highlight the nav link of the section in view
  var links = document.querySelectorAll("nav a[href^='#']");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("section[id], footer[id]").forEach(function (n) { io.observe(n); });
  }

  // 3. Back to top button
  var top = document.getElementById("top");
  if (top) {
    window.addEventListener("scroll", function () { top.hidden = window.scrollY < 600; }, { passive: true });
    top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });
  }

  // 4. Copy email
  var copy = document.getElementById("copy");
  if (copy) {
    copy.addEventListener("click", function () {
      var email = "yashittripathi@gmail.com";
      function done(ok) {
        copy.textContent = ok ? "Copied" : email;
        setTimeout(function () { copy.textContent = "Copy email"; }, 2000);
      }
      try {
        navigator.clipboard.writeText(email).then(function () { done(true); }, function () { done(false); });
      } catch (err) { done(false); }
    });
  }
})();
