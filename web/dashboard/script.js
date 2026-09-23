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

const PROFILE_KEY = "pathly-profile";

function getSavedProfile() {
  const defaults = {
    name: "Ismet Zulkarnain",
    role: "Student",
    email: "ismet@example.com",
    university: "Not set yet"
  };
  try {
    return { ...defaults, ...(JSON.parse(localStorage.getItem(PROFILE_KEY)) || {}) };
  } catch {
    return defaults;
  }
}

function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>\"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[char]));
}

function escapeAttr(value) {
  return escapeHTML(value).replace(/'/g, "&#39;");
}

function getInitials(name) {
  const parts = String(name || "Student").trim().split(/\s+/).filter(Boolean);
  return (parts.slice(0, 2).map(part => part[0]).join("") || "ST").toUpperCase();
}

function updateProfileChrome(profile) {
  const initials = getInitials(profile.name);
  document.querySelectorAll(".top-profile .avatar, .sidebar-user .avatar").forEach(el => el.textContent = initials);
  const topName = document.querySelector(".top-profile strong");
  const sideName = document.querySelector(".sidebar-user strong");
  const topRole = document.querySelector(".top-profile span");
  const sideRole = document.querySelector(".sidebar-user span");
  if (topName) topName.textContent = profile.name.split(" ")[0] || profile.name;
  if (sideName) sideName.textContent = profile.name.split(" ")[0] || profile.name;
  if (topRole) topRole.textContent = profile.role;
  if (sideRole) sideRole.textContent = profile.role;
}

updateProfileChrome(getSavedProfile());

function profilePageHTML() {
  const profile = getSavedProfile();
  return `
    <section class="profile-page">
      <div class="profile-hero">
        <div class="profile-avatar-large" id="profileAvatarLarge">${getInitials(profile.name)}</div>
        <div class="profile-identity"><span class="profile-label">PATHLY STUDENT</span><h2 id="profileDisplayName">${escapeHTML(profile.name)}</h2><p><i data-lucide="map-pin"></i> Indonesia · <span id="profileDisplayRole">${escapeHTML(profile.role)}</span></p></div>
        <button class="primary profile-edit" id="profileEditButton" type="button"><i data-lucide="pencil"></i> Edit Profile</button>
      </div>
      <div class="profile-grid">
        <div class="card profile-info-card"><div class="card-header"><div><h2>Personal Information</h2><p>Edit your information, then press Save Profile.</p></div></div><div class="profile-form-grid">
          <label>Full Name<input id="profileName" value="${escapeAttr(profile.name)}" disabled></label>
          <label>Role<input id="profileRole" value="${escapeAttr(profile.role)}" disabled></label>
          <label>Email<input id="profileEmail" type="email" value="${escapeAttr(profile.email)}" disabled></label>
          <label>Target University<input id="profileUniversity" value="${escapeAttr(profile.university)}" disabled></label>
        </div></div>
        <div class="card profile-goal-card"><div class="card-header"><div><h2>My Journey</h2><p>Your current Pathly overview.</p></div></div><div class="profile-stat"><span>Overall Progress</span><strong>68%</strong><div class="profile-progress"><i></i></div></div><div class="profile-mini-grid"><div><strong>4</strong><span>Steps done</span></div><div><strong>12</strong><span>Scholarships</span></div><div><strong>05</strong><span>Tasks</span></div></div></div>
      </div>
    </section>
  `;
}

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
     HOME
  ======================================================= */

  home: {
    title: "Home",
    subtitle: "Your Pathly starting point for your university journey.",
    html: `
      <section class="home-welcome">
        <div class="home-welcome-copy">
          <span class="home-badge"><i data-lucide="sparkles"></i> PATHLY HOME</span>
          <h2>Plan your future.<br><span>Build your path.</span></h2>
          <p>Everything you need to prepare for university, discover roadmaps, find scholarships, and track your progress in one place.</p>
          <div class="home-actions">
            <button class="primary" data-home-action="roadmap-search"><i data-lucide="search"></i> Find a Roadmap</button>
            <button class="secondary" data-home-action="profile"><i data-lucide="user"></i> My Profile</button>
          </div>
        </div>
        <div class="home-visual">
          <div class="home-orbit orbit-one"></div>
          <div class="home-orbit orbit-two"></div>
          <div class="home-visual-card"><i data-lucide="route"></i><strong>Your journey</strong><span>starts here</span></div>
        </div>
      </section>

      <section class="home-grid">
        <button class="home-card" data-home-action="roadmap-search"><span class="home-card-icon"><i data-lucide="map"></i></span><strong>Explore Roadmaps</strong><small>Find a path that matches your university goal.</small><b>→</b></button>
        <button class="home-card" data-home-action="scholarship"><span class="home-card-icon"><i data-lucide="graduation-cap"></i></span><strong>Find Scholarships</strong><small>Discover opportunities for your education journey.</small><b>→</b></button>
        <button class="home-card" data-home-action="progress"><span class="home-card-icon"><i data-lucide="chart-no-axes-combined"></i></span><strong>Check Progress</strong><small>See how far you've moved toward your goals.</small><b>→</b></button>
      </section>
    `,
  },

  /* =======================================================
     ROADMAP SEARCH
  ======================================================= */

  "roadmap-search": {
    title: "Search Roadmap",
    subtitle: "Search and discover a roadmap that fits your university target.",
    html: `
      <div class="roadmap-search-page">
        <div class="roadmap-search-hero">
          <div>
            <span class="home-badge"><i data-lucide="search"></i> ROADMAP FINDER</span>
            <h2>What do you want to become?</h2>
            <p>Search by major, career, skill, or university preparation path.</p>
          </div>
          <div class="roadmap-search-input">
            <i data-lucide="search"></i>
            <input id="roadmapSearchInput" placeholder="Search e.g. Software Engineer, UI/UX, Data Science...">
          </div>
        </div>
        <div class="roadmap-search-results" id="roadmapSearchResults">
          ${roadmapFinderCard("Software Engineering", "Coding, algorithms, web development, Git, and software projects.", "code-2", "12 steps", "Technology")}
          ${roadmapFinderCard("UI / UX Design", "Design fundamentals, user research, wireframes, prototypes, and portfolio.", "pen-tool", "10 steps", "Design")}
          ${roadmapFinderCard("Data Science", "Python, statistics, data analysis, visualization, and machine learning basics.", "database", "14 steps", "Data")}
          ${roadmapFinderCard("Cyber Security", "Networking, Linux, security fundamentals, ethical testing, and defense.", "shield-check", "13 steps", "Security")}
          ${roadmapFinderCard("Digital Business", "Business strategy, product thinking, marketing, and digital entrepreneurship.", "briefcase-business", "9 steps", "Business")}
          ${roadmapFinderCard("General University Prep", "A flexible path covering goals, applications, documents, scholarships, and preparation.", "graduation-cap", "8 steps", "University")}
        </div>
      </div>
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
     PROFILE
  ======================================================= */

  profile: {
    title: "My Profile",
    subtitle: "Manage your Pathly profile and university journey information.",
    html: profilePageHTML(),
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

function roadmapFinderCard(title, description, icon, steps, category) {
  return `
    <button class="roadmap-result-card" data-roadmap-name="${title.toLowerCase()}">
      <span class="roadmap-result-icon"><i data-lucide="${icon}"></i></span>
      <span class="roadmap-result-body"><strong>${title}</strong><small>${description}</small><em><b>${category}</b> · ${steps}</em></span>
      <i class="roadmap-result-arrow" data-lucide="arrow-up-right"></i>
    </button>
  `;
}

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

/* PROFILE SHORTCUTS */
function openProfile() {
  // Profile does not need its own sidebar item. Open the profile page
  // directly from the topbar avatar or the sidebar user card.
  document.querySelectorAll(".nav-item[data-page]").forEach((item) => item.classList.remove("active"));

  loadPage("profile");

  if (breadcrumb) breadcrumb.textContent = "My Profile";

  if (window.innerWidth <= 800) {
    sidebar.classList.remove("open");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("profileButton")?.addEventListener("click", openProfile);
document.getElementById("sidebarProfileButton")?.addEventListener("click", openProfile);

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
  setupRoadmapSearch();
  setupHomeActions();
  setupProfilePage();
}

function setupRoadmapSearch() {
  const input = document.getElementById("roadmapSearchInput");
  const cards = document.querySelectorAll(".roadmap-result-card");
  if (!input) return;
  input.addEventListener("input", () => {
    const q = input.value.toLowerCase().trim();
    cards.forEach(card => {
      card.style.display = !q || card.innerText.toLowerCase().includes(q) ? "flex" : "none";
    });
  });
  cards.forEach(card => card.addEventListener("click", () => {
    const name = card.querySelector("strong")?.textContent || "Roadmap";
    alert(`${name}\n\nRoadmap ini siap untuk dikembangkan ke halaman detail langkah-langkahnya.`);
  }));
}

function setupHomeActions() {
  document.querySelectorAll("[data-home-action]").forEach(button => {
    button.addEventListener("click", () => {
      const action = button.dataset.homeAction;
      if (action === "profile") {
        document.querySelector('.nav-item[data-page="profile"]')?.click();
      } else {
        document.querySelector(`.nav-item[data-page="${action}"]`)?.click();
      }
    });
  });
}

function setupProfilePage() {
  const edit = document.getElementById("profileEditButton");
  if (!edit) return;

  const fields = document.querySelectorAll(".profile-form-grid input");
  const nameField = document.getElementById("profileName");
  const roleField = document.getElementById("profileRole");
  const emailField = document.getElementById("profileEmail");
  const universityField = document.getElementById("profileUniversity");
  const displayName = document.getElementById("profileDisplayName");
  const displayRole = document.getElementById("profileDisplayRole");
  const avatar = document.getElementById("profileAvatarLarge");

  edit.addEventListener("click", () => {
    const editing = edit.dataset.editing === "true";

    if (editing) {
      const profile = {
        name: nameField.value.trim() || "Ismet Zulkarnain",
        role: roleField.value.trim() || "Student",
        email: emailField.value.trim() || "",
        university: universityField.value.trim() || "Not set yet"
      };

      saveProfile(profile);
      pages.profile.html = profilePageHTML();
      updateProfileChrome(profile);
      displayName.textContent = profile.name;
      displayRole.textContent = profile.role;
      avatar.textContent = getInitials(profile.name);
      fields.forEach(field => field.disabled = true);
      edit.dataset.editing = "false";
      edit.innerHTML = '<i data-lucide="pencil"></i> Edit Profile';
      showProfileSavedMessage();
    } else {
      fields.forEach(field => field.disabled = false);
      nameField.focus();
      edit.dataset.editing = "true";
      edit.innerHTML = '<i data-lucide="check"></i> Save Profile';
    }

    lucide.createIcons();
  });
}

function showProfileSavedMessage() {
  const old = document.querySelector(".profile-save-message");
  if (old) old.remove();
  const message = document.createElement("div");
  message.className = "profile-save-message";
  message.innerHTML = '<i data-lucide="check-circle-2"></i><span>Profile berhasil disimpan.</span>';
  document.querySelector(".profile-page")?.prepend(message);
  lucide.createIcons();
  setTimeout(() => message.remove(), 2600);
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
