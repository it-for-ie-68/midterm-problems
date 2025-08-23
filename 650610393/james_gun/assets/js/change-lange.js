const translations = {
  th: {
    home: "หน้าแรก",
    about: "เกี่ยวกับ",
    works: "ผลงาน",
    play: "เล่นมินิเกม",
    knowJames: "รู้จักเจมส์กันน์",
    viewWorks: "ดูผลงาน",
    featuredWorks: "ผลงานเด่น",
    quote: '"ผมชอบเรื่องราวของคนนอกที่หาครอบครัวของตัวเองเจอ"',
    movie1desc: "ภาพยนตร์ที่ทำให้ James Gunn กลายเป็นชื่อดังในวงการ Marvel",
    movie2desc: "การกลับมาสร้างสรรค์จักรวาล DC ด้วยสไตล์เฉพาะตัว",
    movie3desc:
      "ภาพยนตร์ Superman ที่กำกับโดย James Gunn จะเป็นภาพยนตร์เปิดตัวจักรวาล DC ใหม่ (DCU)",
    copyright: "© 2025 James Gunn Fan Website. สร้างด้วยความรักและความชื่นชม",
  },
  en: {
    home: "Home",
    about: "About",
    works: "Works",
    play: "Play mini game",
    knowJames: "JamesGunn",
    viewWorks: "Works",
    featuredWorks: "Featured Works",
    quote: '"I love stories about outsiders who find their own families."',
    movie1desc: "The movie that made James Gunn famous in the Marvel universe.",
    movie2desc: "A comeback to the DC universe with his unique style.",
    movie3desc: "The Superman movie that will open the new DCU.",
    copyright: "© 2025 James Gunn Fan Website. Created with faith.",
  },
};

function changeLanguage(lang) {
  document.getElementById("nav-home").textContent = translations[lang].home;
  document.getElementById("nav-about").textContent = translations[lang].about;
  document.getElementById("nav-works").textContent = translations[lang].works;
  document.getElementById("nav-play").textContent = translations[lang].play;

  document.getElementById("quote-text").textContent = translations[lang].quote;

  document.getElementById("btn-knowJames").textContent =
    translations[lang].knowJames;
  document.getElementById("btn-viewWorks").textContent =
    translations[lang].viewWorks;

  document.getElementById("movie1desc").textContent =
    translations[lang].movie1desc;
  document.getElementById("movie2desc").textContent =
    translations[lang].movie2desc;
  document.getElementById("movie3desc").textContent =
    translations[lang].movie3desc;

  document.getElementById("copyright-text").textContent =
    translations[lang].copyright;
}
