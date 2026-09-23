/* =========================================================
   PATHLY APP
========================================================= */

const pageContent = document.getElementById("pageContent");

const breadcrumb = document.getElementById("breadcrumb");

const sidebar = document.getElementById("sidebar");

const mobileMenu = document.getElementById("mobileMenu");

const themeToggle = document.getElementById("themeToggle");

/* =========================================================
   PAGE DATA
========================================================= */

const pages = {
  dashboard: {
    title: "Welcome back, Ismet 👋",

    subtitle: "Continue your journey toward your university goals.",

    html: `

      <section class="stats">

        ${stat("target", "68%", "Overall Progress")}
        ${stat("route", "4", "Completed Steps")}
        ${stat("graduation-cap", "12", "Scholarships Found")}
        ${stat("calendar-check", "05", "Upcoming Tasks")}

      </section>


      <section class="grid-2">

        <div class="card">

          <div class="card-header">

            <div>
              <h2>Your Roadmap</h2>
              <p>Follow each checkpoint step by step.</p>
            </div>

            <button class="secondary">
              View all
            </button>

          </div>

          ${roadmap()}

        </div>


        <div class="stack">

          ${progressCard()}

          ${tasks()}

        </div>

      </section>

    `,
  },

  /* =======================================================
     ROADMAP
  ======================================================= */

  roadmap: {
    title: "Your Roadmap",

    subtitle: "A step-by-step path to help you reach your university goals.",

    html: `

      <div class="card">

        <div class="card-header">

          <div>
            <h2>University Journey</h2>
            <p>Complete each checkpoint to move forward.</p>
          </div>

          <button class="primary">
            <i data-lucide="plus"></i>
            Add Step
          </button>

        </div>

        ${roadmap()}

      </div>

    `,
  },

  /* =======================================================
     SCHOLARSHIP
  ======================================================= */

  scholarship: {
    title: "Scholarships",

    subtitle: "Find opportunities that match your goals.",

    html: `

      <div class="card" style="padding:20px;margin-bottom:16px">

        <div class="search-box">

          <i data-lucide="search"></i>

          <input
            id="scholarshipSearch"
            placeholder="Search scholarships..."
          >

        </div>

        <div class="filters">

          <button class="filter active" data-filter="all">
            All
          </button>

          <button class="filter" data-filter="government">
            Program Pemerintah
          </button>

          <button class="filter" data-filter="free">
            Gratis
          </button>

          <button class="filter" data-filter="competitive">
            Kompetitif
          </button>

          <button class="filter" data-filter="international">
            Internasional
          </button>

        </div>

      </div>


      <div class="cards" id="scholarshipGrid">

        ${scholarship(
          "landmark",
          "Beasiswa Pendidikan Indonesia",
          "Program pendidikan untuk mahasiswa Indonesia.",
          "government",
          "Pemerintah",
        )}

        ${scholarship(
          "globe",
          "Global Excellence Scholarship",
          "Kesempatan pendanaan studi internasional.",
          "international competitive",
          "International",
        )}

        ${scholarship(
          "book-open-check",
          "Academic Future Grant",
          "Dukungan pendidikan berdasarkan prestasi.",
          "free",
          "Gratis",
        )}

        ${scholarship(
          "award",
          "Future Leader Scholarship",
          "Program untuk calon pemimpin masa depan.",
          "competitive",
          "Competitive",
        )}

        ${scholarship(
          "building-2",
          "National Student Grant",
          "Bantuan pendidikan tingkat nasional.",
          "government",
          "Pemerintah",
        )}

        ${scholarship(
          "plane",
          "Global Study Fund",
          "Pendanaan untuk program studi luar negeri.",
          "international",
          "International",
        )}

      </div>

    `,
  },

  /* =======================================================
     RESOURCES
  ======================================================= */

  resources: {
    title: "Resources",

    subtitle: "Useful resources to help you prepare.",

    html: `

      <div class="cards">

        ${resource(
          "book-open",
          "University Guide",
          "Panduan lengkap memilih universitas dan jurusan.",
        )}

        ${resource(
          "file-text",
          "Document Checklist",
          "Checklist dokumen yang perlu disiapkan.",
        )}

        ${resource(
          "wallet",
          "Budget Planner",
          "Hitung estimasi biaya kuliah dan kebutuhan.",
        )}

        ${resource(
          "languages",
          "Language Preparation",
          "Persiapan bahasa untuk studi internasional.",
        )}

        ${resource(
          "briefcase",
          "Career Guide",
          "Kenali prospek karier dari berbagai jurusan.",
        )}

        ${resource(
          "video",
          "Learning Videos",
          "Kumpulan materi belajar yang berguna.",
        )}

      </div>

    `,
  },

  /* =======================================================
     PROGRESS
  ======================================================= */

  progress: {
    title: "Your Progress",

    subtitle: "See how far you have come.",

    html: `

      <section class="stats">

        ${stat("target", "68%", "Overall")}
        ${stat("check-circle", "4", "Completed")}
        ${stat("clock", "3", "In Progress")}
        ${stat("lock", "5", "Locked")}

      </section>


      <div class="card">

        <div class="card-header">

          <div>
            <h2>Journey Progress</h2>
            <p>Your current completion status.</p>
          </div>

        </div>

        <div class="progress-content">

          <div class="progress-number">

            <strong>68%</strong>

            <span>
              4 of 8 completed
            </span>

          </div>

          <div class="progress-bar">

            <div class="progress-fill"></div>

          </div>

        </div>

      </div>

    `,
  },

  /* =======================================================
     SETTINGS
  ======================================================= */

  settings: {
    title: "Settings",

    subtitle: "Manage your preferences.",

    html: `

      <div class="card settings">

        ${setting(
          "Notifications",
          "Receive reminders about your roadmap.",
          true,
        )}

        ${setting("Weekly Summary", "Get a weekly progress summary.", true)}

        ${setting(
          "Scholarship Alerts",
          "Notify me about new opportunities.",
          false,
        )}

        ${setting("Auto Save", "Automatically save your progress.", true)}

      </div>

    `,
  },
};

/* =========================================================
   COMPONENT HELPERS
========================================================= */

function stat(icon, value, label) {
  return `

    <div class="stat">

      <div class="stat-icon">

        <i data-lucide="${icon}"></i>

      </div>

      <strong>${value}</strong>

      <span>${label}</span>

    </div>

  `;
}

function roadmap() {
  const steps = [
    [
      "Riset Persyaratan",
      "Pelajari persyaratan universitas dan jurusan.",
      true,
    ],

    ["Siapkan Dokumen", "Kumpulkan dokumen akademik dan pendukung.", true],

    ["Cari Universitas", "Bandingkan universitas berdasarkan kebutuhan.", true],

    ["Daftar & Submit", "Submit pendaftaran setelah semua siap.", false],
  ];

  return `

    <div class="roadmap">

      ${steps
        .map(
          (step, index) => `

        <div class="step">

          <div class="step-line"></div>

          <div class="dot ${step[2] ? "completed" : ""}">

            <i data-lucide="${step[2] ? "check" : "lock"}"></i>

          </div>

          <div class="step-card">

            <h3>
              ${index + 1}. ${step[0]}
            </h3>

            <p>
              ${step[1]}
            </p>

          </div>

        </div>

      `,
        )
        .join("")}

    </div>

  `;
}

function progressCard() {
  return `

    <div class="card">

      <div class="card-header">

        <div>

          <h2>Overall Progress</h2>

          <p>Your current journey.</p>

        </div>

        <i data-lucide="trending-up"></i>

      </div>

      <div class="progress-content">

        <div class="progress-number">

          <strong>68%</strong>

          <span>Goal completion</span>

        </div>

        <div class="progress-bar">

          <div class="progress-fill"></div>

        </div>

      </div>

    </div>

  `;
}

function tasks() {
  const list = [
    ["Research university", "Today", true],

    ["Prepare documents", "Sep 25", false],

    ["Check scholarship", "Sep 27", false],

    ["Submit application", "Oct 01", false],
  ];

  return `

    <div class="card">

      <div class="card-header">

        <div>

          <h2>Upcoming Tasks</h2>

          <p>Stay on track.</p>

        </div>

      </div>

      <div class="tasks">

        ${list
          .map(
            (task) => `

          <div class="task ${task[2] ? "done" : ""}">

            <div class="task-check">

              <i data-lucide="check"></i>

            </div>

            <span class="task-name">
              ${task[0]}
            </span>

            <span class="task-date">
              ${task[1]}
            </span>

          </div>

        `,
          )
          .join("")}

      </div>

    </div>

  `;
}

function scholarship(icon, title, description, category, tag) {
  return `

    <article
      class="scholarship-card"
      data-category="${category}"
      data-name="${title}"
    >

      <div class="card-icon">

        <i data-lucide="${icon}"></i>

      </div>

      <h3>${title}</h3>

      <p>${description}</p>

      <div class="tags">

        <span class="tag">
          ${tag}
        </span>

        <span class="tag">
          Opportunity
        </span>

      </div>

    </article>

  `;
}

function resource(icon, title, description) {
  return `

    <article class="resource-card">

      <div class="card-icon">

        <i data-lucide="${icon}"></i>

      </div>

      <h3>${title}</h3>

      <p>${description}</p>

      <br>

      <button class="secondary">
        Open Resource →
      </button>

    </article>

  `;
}

function setting(title, description, checked) {
  return `

    <div class="setting">

      <div>

        <h3>${title}</h3>

        <p>${description}</p>

      </div>

      <label class="switch">

        <input
          type="checkbox"
          ${checked ? "checked" : ""}
        >

        <span class="slider"></span>

      </label>

    </div>

  `;
}

/* =========================================================
   LOAD PAGE
========================================================= */

function loadPage(page) {
  const data = pages[page];

  if (!data) return;

  pageContent.innerHTML = `

    <section class="page">

      <div class="page-header">

        <div>

          <h1>${data.title}</h1>

          <p>${data.subtitle}</p>

        </div>

      </div>

      ${data.html}

    </section>

  `;

  breadcrumb.textContent = page.charAt(0).toUpperCase() + page.slice(1);

  lucide.createIcons();

  setupPageInteractions();
}

/* =========================================================
   NAVIGATION
========================================================= */

document.querySelectorAll(".nav-item[data-page]").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".nav-item")
      .forEach((item) => item.classList.remove("active"));

    button.classList.add("active");

    loadPage(button.dataset.page);

    if (window.innerWidth <= 800) {
      sidebar.classList.remove("open");
    }
  });
});

/* =========================================================
   TASK INTERACTION
========================================================= */

function setupPageInteractions() {
  document.querySelectorAll(".task").forEach((task) => {
    task.addEventListener("click", () => {
      task.classList.toggle("done");
    });
  });

  setupScholarshipFilter();
}

/* =========================================================
   SCHOLARSHIP FILTER
========================================================= */

function setupScholarshipFilter() {
  const search = document.getElementById("scholarshipSearch");

  const cards = document.querySelectorAll(".scholarship-card");

  const filters = document.querySelectorAll(".filter");

  if (!search) return;

  let currentFilter = "all";

  function apply() {
    const query = search.value.toLowerCase().trim();

    cards.forEach((card) => {
      const name = card.dataset.name.toLowerCase();

      const category = card.dataset.category.toLowerCase();

      const matchesSearch = name.includes(query);

      const matchesFilter =
        currentFilter === "all" || category.includes(currentFilter);

      card.style.display = matchesSearch && matchesFilter ? "block" : "none";
    });
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((item) => item.classList.remove("active"));

      button.classList.add("active");

      currentFilter = button.dataset.filter;

      apply();
    });
  });

  search.addEventListener("input", apply);
}

/* =========================================================
   PREMIUM DARK / LIGHT MODE
========================================================= */

(function () {
  const themeButton = document.getElementById("themeToggle");

  if (!themeButton) {
    return;
  }

  /* =====================================================
     ICON SVG
  ===================================================== */

  const moonIcon = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3
      7 7 0 0 0 21 12.79z"></path>
    </svg>
  `;

  const sunIcon = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4"></circle>

      <line x1="12" y1="2"
            x2="12" y2="4"></line>

      <line x1="12" y1="20"
            x2="12" y2="22"></line>

      <line x1="4.93" y1="4.93"
            x2="6.34" y2="6.34"></line>

      <line x1="17.66" y1="17.66"
            x2="19.07" y2="19.07"></line>

      <line x1="2" y1="12"
            x2="4" y2="12"></line>

      <line x1="20" y1="12"
            x2="22" y2="12"></line>

      <line x1="4.93" y1="19.07"
            x2="6.34" y2="17.66"></line>

      <line x1="17.66" y1="6.34"
            x2="19.07" y2="4.93"></line>
    </svg>
  `;

  /* =====================================================
     UPDATE BUTTON
  ===================================================== */

  function updateThemeButton() {
    const isDark = document.body.classList.contains("dark");

    themeButton.innerHTML = `

      <span class="theme-icon">

        ${isDark ? sunIcon : moonIcon}

      </span>

      <span class="theme-label">

        ${isDark ? "Light" : "Dark"}

      </span>

    `;
  }

  /* =====================================================
     LOAD SAVED THEME
  ===================================================== */

  const savedTheme = localStorage.getItem("pathly-theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  /* =====================================================
     INITIAL BUTTON
  ===================================================== */

  updateThemeButton();

  /* =====================================================
     BUTTON CLICK
  ===================================================== */

  themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    /* Simpan pilihan */

    localStorage.setItem("pathly-theme", isDark ? "dark" : "light");

    /* Update icon + tulisan */

    updateThemeButton();
  });
})();

/* =========================================================
   HELP CENTER — INTEGRATED
========================================================= */
(function () {
  const helpLink = document.getElementById("helpCenterLink");
  const helpPage = document.getElementById("helpCenterPage");
  const pageContent = document.getElementById("pageContent");
  const breadcrumb = document.getElementById("breadcrumb");
  const topbar = document.querySelector(".topbar");

  if (!helpLink || !helpPage || !pageContent) return;

  function refreshIcons() {
    if (typeof lucide !== "undefined") lucide.createIcons();
  }

  function showHelp() {
    pageContent.style.display = "none";
    helpPage.style.display = "block";
    helpLink.classList.add("active");
    document.querySelectorAll(".nav-item[data-page]").forEach((item) => item.classList.remove("active"));
    if (breadcrumb) breadcrumb.textContent = "Help Center";
    window.scrollTo({ top: 0, behavior: "smooth" });
    refreshIcons();
  }

  function showPage(page) {
    helpPage.style.display = "none";
    pageContent.style.display = "block";
    helpLink.classList.remove("active");
    if (breadcrumb) breadcrumb.textContent = page.charAt(0).toUpperCase() + page.slice(1);
  }

  helpLink.addEventListener("click", function (event) {
    event.preventDefault();
    showHelp();
  });

  document.querySelectorAll(".nav-item[data-page]").forEach((button) => {
    button.addEventListener("click", () => showPage(button.dataset.page));
  });

  /* FAQ accordion */
  const faqItems = helpPage.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;
    question.addEventListener("click", () => {
      const active = item.classList.contains("active");
      faqItems.forEach((other) => other.classList.remove("active"));
      if (!active) item.classList.add("active");
    });
  });

  /* Help search: filters FAQ + categories */
  const searchInput = document.getElementById("helpSearch");
  const categories = helpPage.querySelectorAll(".help-category");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const keyword = searchInput.value.toLowerCase().trim();
      faqItems.forEach((item) => {
        item.style.display = !keyword || item.innerText.toLowerCase().includes(keyword) ? "" : "none";
      });
      categories.forEach((card) => {
        card.style.display = !keyword || card.innerText.toLowerCase().includes(keyword) ? "" : "none";
      });
    });
  }

  /* Category shortcuts */
  categories.forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.querySelector("strong")?.textContent.trim();
      const map = {
        "Roadmap": "roadmap",
        "Progress": "progress",
        "Account & Settings": "settings"
      };
      if (map[title]) {
        const target = document.querySelector(`.nav-item[data-page="${map[title]}"]`);
        if (target) target.click();
      } else if (title === "Contact Support") {
        document.querySelector(".help-contact-button")?.click();
      }
    });
  });

  /* Contact support */
  const supportButton = helpPage.querySelector(".help-contact-button");
  if (supportButton) {
    supportButton.addEventListener("click", () => {
      alert("Contact Support\n\nSupport feature coming soon.");
    });
  }

  /* Make sure dashboard remains the default page. */
  helpPage.style.display = "none";
  pageContent.style.display = "block";
  if (typeof loadPage === "function") loadPage("dashboard");
  refreshIcons();
})();
