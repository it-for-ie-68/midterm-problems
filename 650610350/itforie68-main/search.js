class HighlightSearch {
  constructor() {
    this.searchIcon = document.getElementById("searchIcon");
    this.searchInput = document.getElementById("searchInput");
    this.logoRows = document.querySelectorAll(".logo-row");
    this.cards = document.querySelectorAll(".card");

    this.init();
  }

  init() {
    if (!this.searchIcon || !this.searchInput) {
      console.log("Search elements not found");
      return;
    }

    this.setupEventListeners();
    this.addDataAttributes();
  }

  addDataAttributes() {
    const brandData = {
      ferrari: {
        category: "hypercar",
        keywords:
          "italian red prancing horse supercar exotic racing f1 formula one",
        models: "sf90 spider laferri",
      },
      lamborghini: {
        category: "hypercar",
        keywords:
          "italian bull green yellow supercar exotic racing aventador huracan",
        models: "revuelto huracan sto",
      },
      mclaren: {
        category: "hypercar",
        keywords: "british orange papaya supercar racing f1 formula one",
        models: "p1 aturas",
      },
      bugatti: {
        category: "hypercar",
        keywords: "french blue exotic fastest speed record luxury",
        models: "chiron veyron 16.4",
      },
      koenigsegg: {
        category: "hypercar",
        keywords: "swedish exotic carbon fiber speed record track",
        models: "sadair s spear gamera",
      },
      bmw: {
        category: "luxury",
        keywords: "german blue white bavarian motor works premium performance",
        models: "i7 xdrive60 m760e xdrive",
      },
      mercedes: {
        category: "luxury",
        keywords: "german silver three pointed star maybach amg luxury premium",
        models: "s680 s class s580e amg premium",
      },
      audi: {
        category: "luxury",
        keywords: "german four rings quattro premium luxury performance",
        models: "a8 l tsfi rs q8 quattro",
      },
      bentley: {
        category: "luxury",
        keywords: "british winged b luxury handcrafted premium elegant",
        models: "bentayga flying spur mulliner ewb v8",
      },
      "rolls royce": {
        category: "luxury",
        keywords: "british spirit of ecstasy ultra luxury premium phantom",
        models: "ghost series 2 ii spectre",
      },
    };

    this.logoRows.forEach((row) => {
      const link = row.querySelector("a");
      const span = row.querySelector("span");
      const img = row.querySelector("img");

      if (link && span) {
        const brandName = span.textContent.trim().toLowerCase();
        const cleanBrandName = brandName.replace(/[^a-z\s]/g, "").trim();

        // Find matching brand data
        let matchedBrand = null;
        for (const [key, value] of Object.entries(brandData)) {
          if (cleanBrandName.includes(key) || key.includes(cleanBrandName)) {
            matchedBrand = value;
            row.setAttribute("data-brand", key);
            break;
          }
        }

        if (matchedBrand) {
          row.setAttribute("data-category", matchedBrand.category);
          row.setAttribute("data-keywords", matchedBrand.keywords);
          row.setAttribute("data-models", matchedBrand.models);
        }

        row.setAttribute("data-name", cleanBrandName);

        if (img && img.alt) {
          row.setAttribute("data-alt", img.alt);
        }
      }
    });
  }

  setupEventListeners() {
    // Search icon click handler
    this.searchIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!this.searchInput.classList.contains("active")) {
        this.searchInput.classList.add("active");
        this.searchInput.focus();
      } else {
        this.clearSearch();
      }
    });

    // Prevent search input from closing when clicked
    this.searchInput.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Main search input handler
    this.searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      this.performSearch(query);
    });

    // Click outside to close search
    document.addEventListener("click", (e) => {
      if (
        this.searchInput.classList.contains("active") &&
        !this.searchInput.contains(e.target) &&
        !this.searchIcon.contains(e.target)
      ) {
        this.clearSearch();
      }
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.clearSearch();
      }
    });
  }

  performSearch(query) {
    // Clear previous highlights
    this.clearHighlights();

    if (query === "") {
      // When search is empty, remove all highlights and stats
      this.hideSearchStats();
      return;
    }

    let totalMatches = 0;
    let matchedRows = 0;

    // Search through logo rows and highlight matches only
    this.logoRows.forEach((row) => {
      const matchInfo = this.searchInRow(row, query);

      if (matchInfo.hasMatch) {
        // Highlight the matching row
        this.highlightMatches(row, query);
        this.addMatchIndicator(row, matchInfo.matchCount);
        this.addGlowEffect(row);

        totalMatches += matchInfo.matchCount;
        matchedRows++;
      }
      // Note: We don't hide non-matching rows - they stay visible
    });

    // Update search statistics
    this.updateSearchStats(totalMatches, matchedRows);

    if (matchedRows === 0) {
      this.showNoMatches(query);
    } else {
      this.hideNoMatches();
    }
  }

  searchInRow(row, query) {
    let matchCount = 0;
    let hasMatch = false;

    // Search in different attributes
    const searchableFields = [
      row.getAttribute("data-brand"),
      row.getAttribute("data-name"),
      row.getAttribute("data-category"),
      row.getAttribute("data-keywords"),
      row.getAttribute("data-models"),
      row.getAttribute("data-alt"),
      row.textContent,
    ];

    searchableFields.forEach((field) => {
      if (field && field.toLowerCase().includes(query)) {
        hasMatch = true;
        matchCount++;
      }
    });

    return { hasMatch, matchCount };
  }

  highlightMatches(row, query) {
    // Store original data to preserve functionality
    if (!row.hasAttribute("data-original-saved")) {
      const links = row.querySelectorAll("a");
      links.forEach((link, index) => {
        row.setAttribute(`data-original-href-${index}`, link.href);
        row.setAttribute(
          `data-original-text-${index}`,
          link.textContent.trim()
        );
      });
      row.setAttribute("data-original-saved", "true");
    }

    // Highlight text content while preserving links
    const textElements = row.querySelectorAll("span, a");

    textElements.forEach((element) => {
      if (element.tagName === "A") {
        // For links, only highlight the text content, preserve the href
        const originalText = element.textContent;
        const originalHref = element.href;

        if (originalText.toLowerCase().includes(query)) {
          const regex = new RegExp(`(${this.escapeRegExp(query)})`, "gi");
          const highlightedText = originalText.replace(
            regex,
            '<mark class="search-highlight">$1</mark>'
          );
          element.innerHTML = highlightedText;
          // Ensure href is preserved
          element.href = originalHref;
        }
      } else {
        // For spans, check if they contain a link
        const linkInside = element.querySelector("a");
        if (linkInside) {
          // Handle span containing link
          const originalText = linkInside.textContent;
          const originalHref = linkInside.href;

          if (originalText.toLowerCase().includes(query)) {
            const regex = new RegExp(`(${this.escapeRegExp(query)})`, "gi");
            const highlightedText = originalText.replace(
              regex,
              '<mark class="search-highlight">$1</mark>'
            );
            linkInside.innerHTML = highlightedText;
            linkInside.href = originalHref;
          }
        } else {
          // Regular span without link
          const originalText = element.textContent;
          if (originalText.toLowerCase().includes(query)) {
            const regex = new RegExp(`(${this.escapeRegExp(query)})`, "gi");
            element.innerHTML = originalText.replace(
              regex,
              '<mark class="search-highlight">$1</mark>'
            );
          }
        }
      }
    });
  }

  addGlowEffect(row) {
    // Add a subtle glow effect to matched rows
    row.style.boxShadow = "0 0 15px rgba(102, 126, 234, 0.3)";
    row.style.border = "2px solid #667eea";
    row.style.borderRadius = "8px";
    row.style.transform = "scale(1.02)";
    row.style.transition = "all 0.3s ease";
    row.classList.add("search-matched");
  }

  addMatchIndicator(row, count) {
    // Remove existing indicator
    const existing = row.querySelector(".match-indicator");
    if (existing) existing.remove();

    // Add new indicator
    const indicator = document.createElement("span");
    indicator.className = "match-indicator";
    indicator.textContent = `${count}`;
    indicator.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            background: #4caf50;
            color: white;
            border-radius: 50%;
            width: 22px;
            height: 22px;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            z-index: 10;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            animation: pulse 1s ease-in-out;
        `;

    row.style.position = "relative";
    row.appendChild(indicator);
  }

  updateSearchStats(totalMatches, matchedRows) {
    let statsDiv = document.getElementById("search-stats");

    if (!statsDiv) {
      statsDiv = document.createElement("div");
      statsDiv.id = "search-stats";
      statsDiv.style.cssText = `
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 12px 24px;
                border-radius: 25px;
                margin: 15px auto;
                text-align: center;
                font-size: 14px;
                font-weight: 500;
                max-width: 350px;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                transition: all 0.3s ease;
            `;

      const slideshow = document.getElementById("slideshow");
      slideshow.parentNode.insertBefore(statsDiv, slideshow.nextSibling);
    }

    if (totalMatches > 0) {
      statsDiv.innerHTML = `
                🎯 Found <strong>${matchedRows}</strong> matching car${
        matchedRows > 1 ? "s" : ""
      } 
                with <strong>${totalMatches}</strong> match${
        totalMatches > 1 ? "es" : ""
      }
            `;
      statsDiv.style.display = "block";
    } else {
      statsDiv.style.display = "none";
    }
  }

  showNoMatches(query) {
    let noMatchDiv = document.getElementById("no-matches");

    if (!noMatchDiv) {
      noMatchDiv = document.createElement("div");
      noMatchDiv.id = "no-matches";
      noMatchDiv.style.cssText = `
                background: #fff8e1;
                color: #f57c00;
                padding: 15px 25px;
                border-radius: 15px;
                margin: 15px auto;
                text-align: center;
                max-width: 400px;
                border: 2px solid #ffb74d;
                box-shadow: 0 4px 15px rgba(245, 124, 0, 0.1);
            `;

      const slideshow = document.getElementById("slideshow");
      slideshow.parentNode.insertBefore(noMatchDiv, slideshow.nextSibling);
    }

    noMatchDiv.innerHTML = `
            <p style="margin: 0 0 8px 0; font-weight: 500;">
                🔍 No matches found for "<em>${query}</em>"
            </p>
            <small style="color: #ff9800;">
                All cars are still visible. Try: Ferrari, BMW, luxury, hypercar, etc.
            </small>
        `;
    noMatchDiv.style.display = "block";
  }

  hideNoMatches() {
    const noMatchDiv = document.getElementById("no-matches");
    if (noMatchDiv) {
      noMatchDiv.style.display = "none";
    }
  }

  hideSearchStats() {
    const statsDiv = document.getElementById("search-stats");
    if (statsDiv) {
      statsDiv.style.display = "none";
    }
  }

  clearHighlights() {
    // Restore original link functionality and clear highlights
    this.logoRows.forEach((row) => {
      if (row.hasAttribute("data-original-saved")) {
        const links = row.querySelectorAll("a");
        links.forEach((link, index) => {
          const originalHref = row.getAttribute(`data-original-href-${index}`);
          const originalText = row.getAttribute(`data-original-text-${index}`);

          if (originalHref && originalText) {
            link.href = originalHref;
            link.textContent = originalText;
          }
        });

        // Clean up stored data
        const attributes = Array.from(row.attributes);
        attributes.forEach((attr) => {
          if (attr.name.startsWith("data-original-")) {
            row.removeAttribute(attr.name);
          }
        });
      }
    });

    // Remove text highlights using a more careful approach
    document.querySelectorAll(".search-highlight").forEach((highlight) => {
      const parent = highlight.parentNode;

      // If parent is a link, preserve the link structure
      if (parent.tagName === "A") {
        const link = parent;
        const allText = link.textContent; // This gets the text without HTML
        link.innerHTML = allText; // Reset to plain text
      } else {
        // Regular text replacement
        parent.replaceChild(
          document.createTextNode(highlight.textContent),
          highlight
        );
        parent.normalize();
      }
    });

    // Remove glow effects from matched rows
    document.querySelectorAll(".search-matched").forEach((row) => {
      row.classList.remove("search-matched");
      row.style.boxShadow = "";
      row.style.border = "";
      row.style.borderRadius = "";
      row.style.transform = "";
      row.style.transition = "";
    });

    // Remove match indicators
    document.querySelectorAll(".match-indicator").forEach((indicator) => {
      indicator.remove();
    });
  }

  clearSearch() {
    this.searchInput.classList.remove("active");
    this.searchInput.value = "";
    this.clearHighlights();
    this.hideSearchStats();
    this.hideNoMatches();
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
}

class Slideshow {
  constructor() {
    this.slideImages = [
      "slide/1.jpg",
      "slide/2.jpg",
      "slide/3.jpg",
      "slide/4.jpg",
      "slide/5.jpg",
      "slide/6.jpg",
      "slide/7.jpg",
      "slide/8.jpg",
      "slide/9.jpg",
      "slide/10.jpg",
      "slide/11.jpg",
      "slide/12.jpg",
      "slide/13.jpg",
      "slide/14.jpg",
      "slide/15.jpg",
    ];

    this.currentSlide = 0;
    this.slideImage = document.getElementById("slideImage");
    this.prevSlideBtn = document.getElementById("prevSlide");
    this.nextSlideBtn = document.getElementById("nextSlide");
    this.slideInterval = null;

    this.init();
  }

  init() {
    if (!this.slideImage || !this.prevSlideBtn || !this.nextSlideBtn) {
      console.log("Slideshow elements not found");
      return;
    }

    this.setupEventListeners();
    this.showSlide(0);
    this.startAutoSlide();
  }

  setupEventListeners() {
    this.prevSlideBtn.addEventListener("click", () => {
      this.showSlide(this.currentSlide - 1);
      this.resetInterval();
    });

    this.nextSlideBtn.addEventListener("click", () => {
      this.showSlide(this.currentSlide + 1);
      this.resetInterval();
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.showSlide(this.currentSlide - 1);
        this.resetInterval();
      } else if (e.key === "ArrowRight") {
        this.showSlide(this.currentSlide + 1);
        this.resetInterval();
      }
    });
  }

  showSlide(index) {
    if (this.slideImages.length === 0) return;

    this.currentSlide =
      (index + this.slideImages.length) % this.slideImages.length;
    this.slideImage.src = this.slideImages[this.currentSlide];

    this.slideImage.onerror = () => {
      console.warn(`Failed to load: ${this.slideImages[this.currentSlide]}`);
    };
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.showSlide(this.currentSlide + 1);
    }, 5000);
  }

  resetInterval() {
    clearInterval(this.slideInterval);
    this.startAutoSlide();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const search = new HighlightSearch();
  const slideshow = new Slideshow();

  console.log("Highlight-only search and slideshow initialized");

  // Debug helper
  window.debugSearch = () => {
    console.log("=== Search Debug ===");
    console.log("Logo rows:", document.querySelectorAll(".logo-row").length);
    console.log("Search input:", document.getElementById("searchInput"));
    console.log("Search icon:", document.getElementById("searchIcon"));
  };
});
