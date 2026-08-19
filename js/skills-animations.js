/**
 * Technical Stack — Ultra Premium Skills Dashboard Interactivity
 * =============================================================
 * 1. SkillsSearchFilter: Real-time search matching & category filtering
 * 2. SkillsRadarManager: SVG Radar chart construction, entry animations, & section highlight hover triggers
 * 3. CardTiltManager: 3D perspective mouse-tilt card interactions
 * 4. ScrollProgressBarAnimator: Staggered animation of progress bars when scrolled into view
 */

const techProjectsMap = {
    'TensorFlow': ['GlucoGuard AI'],
    'PyTorch': ['AI Symptom Analyser', 'GlucoGuard AI', 'Language Translator'],
    'Scikit-Learn': ['AI Symptom Analyser', 'Smart Property', 'GlucoGuard AI'],
    'Gen AI': ['ResumeInsight Platform'],
    'NLP': ['WhatsApp Chat Analyser'],
    'OpenCV': ['AI Symptom Analyser'],
    'Flask': ['ResumeInsight Platform'],
    'FastAPI': ['AgriSuper'],
    'Django': ['ResumeInsight Platform'],
    'Node.js': ['AgriSuper'],
    'PostgreSQL': ['ResumeInsight Platform'],
    'MongoDB': ['AgriSuper'],
    'React.js': ['DataVista Analytics'],
    'Tailwind CSS': ['Developer Portfolio'],
    'JavaScript': ['Developer Portfolio', 'CalcHub', 'Weather Dashboard'],
    'HTML/CSS': ['Developer Portfolio', 'CalcHub', 'Weather Dashboard'],
    'Bootstrap': ['Developer Portfolio'],
    'Plotly': ['DataVista Analytics'],
    'Docker': ['ResumeInsight Platform'],
    'Git/GitHub': ['Developer Portfolio', 'WhatsApp Chat Analyser'],
    'AWS': ['ResumeInsight Platform'],
    'DSA': ['CalcHub', 'AgriSuper'],
    'Pandas': ['WhatsApp Chat Analyser', 'DataVista Analytics'],
    'Postman': ['AgriSuper', 'ResumeInsight Platform']
};

/* ━━━ 1. Search & Category Filter Console ━━━ */
class SkillsSearchFilter {
    constructor(radarManager) {
        this.radarManager = radarManager;
        this.searchInput = document.getElementById('skills-search-input');
        this.clearBtn = document.getElementById('skills-search-clear');
        this.filterButtons = document.querySelectorAll('.skill-filter-btn');
        this.sections = document.querySelectorAll('.skills-section-group');
        this.cards = document.querySelectorAll('.tech-card-new');
        this.noResultsCard = document.getElementById('skills-no-results');
        this.resetBtn = document.getElementById('skills-reset-search');
        
        this.activeFilter = 'all';
        this.searchQuery = '';

        if (!this.searchInput) return;
        this.init();
    }

    init() {
        // Search Input events
        this.searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase().trim();
            this.filter();
        });

        // Clear Search button events
        this.clearBtn.addEventListener('click', () => {
            this.searchInput.value = '';
            this.searchQuery = '';
            this.searchInput.focus();
            this.filter();
        });

        // Category Filter Button events
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.activeFilter = btn.getAttribute('data-filter');
                this.filter();
            });
        });

        // Reset Search button events
        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => {
                this.searchInput.value = '';
                this.searchQuery = '';
                
                this.filterButtons.forEach(b => b.classList.remove('active'));
                const allBtn = document.querySelector('.skill-filter-btn[data-filter="all"]');
                if (allBtn) allBtn.classList.add('active');
                
                this.activeFilter = 'all';
                this.filter();
            });
        }
    }

    filter() {
        // Toggle Clear button visibility
        if (this.searchQuery.length > 0) {
            this.clearBtn.style.display = 'block';
        } else {
            this.clearBtn.style.display = 'none';
        }

        let totalVisibleCards = 0;

        this.sections.forEach(section => {
            const sectionCategory = section.getAttribute('data-category');
            const sectionCards = section.querySelectorAll('.tech-card-new');
            let matchingCardsInSection = 0;

            sectionCards.forEach(card => {
                const techName = (card.getAttribute('data-tech') || '').toLowerCase();
                const title = card.querySelector('h4').textContent.toLowerCase();
                const desc = card.querySelector('p').textContent.toLowerCase();
                const chips = Array.from(card.querySelectorAll('.sub-skill-chip'))
                                   .map(c => c.textContent.toLowerCase())
                                   .join(' ');

                // Card matches search text?
                const matchesSearch = this.searchQuery === '' ||
                                      techName.includes(this.searchQuery) ||
                                      title.includes(this.searchQuery) ||
                                      desc.includes(this.searchQuery) ||
                                      chips.includes(this.searchQuery);

                // Card matches category filter?
                const matchesCategory = this.activeFilter === 'all' || sectionCategory === this.activeFilter;

                if (matchesSearch && matchesCategory) {
                    card.classList.remove('filtered-out');
                    if (this.searchQuery !== '') {
                        card.classList.add('search-match');
                    } else {
                        card.classList.remove('search-match');
                    }
                    matchingCardsInSection++;
                    totalVisibleCards++;
                } else {
                    card.classList.add('filtered-out');
                    card.classList.remove('search-match');
                }
            });

            // Show section if it belongs to current filter category AND has matching cards
            const sectionBelongsToFilter = this.activeFilter === 'all' || sectionCategory === this.activeFilter;
            
            if (sectionBelongsToFilter && matchingCardsInSection > 0) {
                section.classList.remove('hidden-section');
                
                // Update header count badge dynamically
                const countBadge = section.querySelector('.skills-section-count');
                if (countBadge) {
                    countBadge.textContent = `${matchingCardsInSection} Skill${matchingCardsInSection > 1 ? 's' : ''}`;
                }

                // If progress bars aren't animated yet, trigger animation on newly visible cards
                this.animateProgressBarsInGroup(section);
            } else {
                section.classList.add('hidden-section');
            }
        });

        // Show "no results" state if no cards are matched
        if (totalVisibleCards === 0) {
            if (this.noResultsCard) this.noResultsCard.style.display = 'flex';
        } else {
            if (this.noResultsCard) this.noResultsCard.style.display = 'none';
        }

        // Highlight SVG radar nodes matching the active filter
        if (this.radarManager) {
            this.radarManager.highlightCategoryNodes(this.activeFilter);
        }
    }

    animateProgressBarsInGroup(group) {
        const fills = group.querySelectorAll('.progress-bar-fill');
        fills.forEach(fill => {
            if (fill.style.width === '0%' || fill.style.width === '') {
                const targetWidth = fill.getAttribute('data-target-width') || fill.style.width;
                if (!fill.getAttribute('data-target-width')) {
                    // Extract initial style width
                    const styleWidth = fill.style.width || '0%';
                    fill.setAttribute('data-target-width', styleWidth);
                }
                
                // Stagger transition
                fill.style.width = '0%';
                fill.offsetHeight; // trigger reflow
                fill.style.transition = 'width 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
                fill.style.width = fill.getAttribute('data-target-width');
                
                // Fade in percent indicator
                const percent = fill.parentElement.querySelector('.progress-percent');
                if (percent) {
                    percent.style.opacity = '1';
                    percent.style.transform = 'translateY(0)';
                }
            }
        });
    }
}

/* ━━━ 2. SVG Radar Chart Manager ━━━ */
class SkillsRadarManager {
    constructor() {
        this.svg = document.getElementById('skills-radar-svg');
        if (!this.svg) return;

        this.polygon = document.getElementById('radar-skill-polygon');
        
        // Data points (cx, cy coordinates animated)
        this.points = {
            ai: document.getElementById('radar-pt-ai'),
            backend: document.getElementById('radar-pt-backend'),
            frontend: document.getElementById('radar-pt-frontend'),
            tools: document.getElementById('radar-pt-tools'),
            data: document.getElementById('radar-pt-data')
        };

        this.labels = this.svg.querySelectorAll('.radar-label');

        this.center = 150;
        this.maxRadius = 100;
        
        // Angle offsets in radians matching axes: AI, Backend, Frontend, Tools, Data Science
        this.angles = [
            -Math.PI / 2,                          // AI & Deep Learning (Top)
            -Math.PI / 2 + 2 * Math.PI / 5,         // Backend Systems (Up-Right)
            -Math.PI / 2 + 4 * Math.PI / 5,         // Frontend & UI (Down-Right)
            -Math.PI / 2 + 6 * Math.PI / 5,         // DevOps & Infrastructure (Down-Left)
            -Math.PI / 2 + 8 * Math.PI / 5          // Data Science (Up-Left)
        ];

        // Ankit Raj Skill Ratings (out of 1.0)
        this.targetRatings = [0.92, 0.90, 0.85, 0.80, 0.94];
        this.currentRatings = [0, 0, 0, 0, 0];
        
        this.isAnimated = false;
        this.init();
    }

    init() {
        this.setupObservers();
        this.setupInteractivity();
    }

    setupObservers() {
        // Animate radar polygon expansion when scrolled into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimated) {
                    this.isAnimated = true;
                    this.animateChart();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(this.svg);
    }

    animateChart() {
        const duration = 1200; // ms
        const startTime = performance.now();

        const easeOutElastic = (x) => {
            const c4 = (2 * Math.PI) / 3;
            return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
        };

        const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutElastic(progress);

            // Interpolate ratings
            for (let i = 0; i < 5; i++) {
                this.currentRatings[i] = this.targetRatings[i] * eased;
            }

            this.updateDOM();

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
    }

    updateDOM() {
        // Calculate coords of the rating polygon vertices
        const pointsString = this.currentRatings.map((rating, index) => {
            const angle = this.angles[index];
            const r = rating * this.maxRadius;
            const x = this.center + r * Math.cos(angle);
            const y = this.center + r * Math.sin(angle);
            return `${x.toFixed(1)},${y.toFixed(1)}`;
        }).join(' ');

        // Update Polygon points attribute
        this.polygon.setAttribute('points', pointsString);

        // Update Individual data points dots
        const ptKeys = ['ai', 'backend', 'frontend', 'tools', 'data'];
        ptKeys.forEach((key, index) => {
            const rating = this.currentRatings[index];
            const angle = this.angles[index];
            const r = rating * this.maxRadius;
            const x = this.center + r * Math.cos(angle);
            const y = this.center + r * Math.sin(angle);
            
            if (this.points[key]) {
                this.points[key].setAttribute('cx', x.toFixed(1));
                this.points[key].setAttribute('cy', y.toFixed(1));
            }
        });
    }

    setupInteractivity() {
        // Map radar click/hover tags to scroll-highlight interactions
        const interactives = [...this.labels, ...Object.values(this.points)];

        interactives.forEach(el => {
            if (!el) return;
            const category = el.getAttribute('data-category');

            el.addEventListener('mouseenter', () => {
                this.highlightLabels(category);
                this.triggerGroupPreviewGlow(category);
            });

            el.addEventListener('mouseleave', () => {
                this.resetLabels();
                this.removePreviewGlows();
            });

            el.addEventListener('click', () => {
                const targetSec = document.getElementById(`sec-${category}`);
                if (targetSec) {
                    // Smooth scroll to the category stacked block on the right column
                    targetSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Activate corresponding filter tab dynamically
                    const filterBtn = document.querySelector(`.skill-filter-btn[data-filter="${category}"]`);
                    if (filterBtn) {
                        filterBtn.click();
                    }
                }
            });
        });
    }

    highlightLabels(category) {
        this.labels.forEach(label => {
            if (label.getAttribute('data-category') === category) {
                label.classList.add('highlighted');
            } else {
                label.classList.remove('highlighted');
            }
        });
    }

    resetLabels() {
        this.labels.forEach(label => label.classList.remove('highlighted'));
    }

    highlightCategoryNodes(category) {
        this.labels.forEach(label => {
            if (category === 'all' || label.getAttribute('data-category') === category) {
                label.style.fill = '#fff';
            } else {
                label.style.fill = '#475569';
            }
        });
    }

    triggerGroupPreviewGlow(category) {
        const targetSec = document.getElementById(`sec-${category}`);
        if (targetSec) {
            targetSec.style.transform = 'scale(1.02)';
            targetSec.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
            const cards = targetSec.querySelectorAll('.tech-card-new');
            cards.forEach(card => {
                card.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                card.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.06)';
            });
        }
    }

    removePreviewGlows() {
        const sections = document.querySelectorAll('.skills-section-group');
        sections.forEach(sec => {
            sec.style.transform = 'scale(1)';
            const cards = sec.querySelectorAll('.tech-card-new');
            cards.forEach(card => {
                card.style.borderColor = '';
                card.style.boxShadow = '';
            });
        });
    }
}

/* ━━━ 3. 3D Card Perspective Tilt ━━━ */
class CardTiltManager {
    constructor() {
        this.cards = document.querySelectorAll('.tech-card-new');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMove(e, card));
            card.addEventListener('mouseleave', () => this.handleLeave(card));
        });
    }

    handleMove(e, card) {
        if (card.classList.contains('filtered-out')) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        
        // Tilt coefficient
        const tiltX = (cy - y) / 10;
        const tiltY = (x - cx) / 10;
        
        card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(5px)`;
    }

    handleLeave(card) {
        card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
}

/* ━━━ 4. Scroll Progress Bar Animator ━━━ */
class ScrollProgressBarAnimator {
    constructor() {
        this.progressBars = document.querySelectorAll('.progress-bar-wrap');
        this.init();
    }

    init() {
        this.progressBars.forEach(bar => {
            const fill = bar.querySelector('.progress-bar-fill');
            const targetWidth = fill.style.width || '0%';
            
            // Set data attribute for caching target size, reset visual width to 0% initially
            fill.setAttribute('data-target-width', targetWidth);
            fill.style.width = '0%';
            
            const percentEl = bar.querySelector('.progress-percent');
            if (percentEl) {
                percentEl.style.opacity = '0';
                percentEl.style.transform = 'translateY(4px)';
            }
        });

        // Trigger fill animation when scroll container enters viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateGroup(entry.target);
                    observer.unobserve(entry.target); // Animate once
                }
            });
        }, { threshold: 0.15 });

        // Observe each skill category section
        document.querySelectorAll('.skills-section-group').forEach(section => {
            observer.observe(section);
        });
    }

    animateGroup(group) {
        const fills = group.querySelectorAll('.progress-bar-fill');
        fills.forEach((fill, index) => {
            const targetWidth = fill.getAttribute('data-target-width');
            
            // Stagger transition slightly
            setTimeout(() => {
                fill.style.transition = 'width 1.5s cubic-bezier(0.25, 1, 0.5, 1)';
                fill.style.width = targetWidth;
                
                const percentEl = fill.parentElement.querySelector('.progress-percent');
                if (percentEl) {
                    percentEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    percentEl.style.opacity = '1';
                    percentEl.style.transform = 'translateY(0)';
                }
            }, index * 80);
        });
    }
}

function setupSkillsRedesign() {
    // 2. Append project counts to detailed cards & dynamically build compact grids
    const sections = document.querySelectorAll('.skills-section-group');
    sections.forEach(section => {
        const category = section.getAttribute('data-category');
        const techGrid = section.querySelector('.tech-grid-new');
        if (!techGrid) return;
        
        // Create compact grid container
        const compactGrid = document.createElement('div');
        compactGrid.className = 'compact-grid-new';
        compactGrid.style.display = 'none';
        
        const cards = techGrid.querySelectorAll('.tech-card-new');
        cards.forEach(card => {
            const techName = card.getAttribute('data-tech') || card.querySelector('h4').textContent.trim();
            const iconHtml = card.querySelector('.tech-icon-orb').innerHTML;
            const level = card.querySelector('.tech-level').textContent.trim();
            
            // Project Association Map
            const projects = techProjectsMap[techName] || [];
            const projectCount = projects.length;
            const projectTooltip = projectCount > 0 
                ? `Used in: ${projects.join(', ')}` 
                : `${techName} — ${level}`;
            
            // Add Project Badge to Detailed Card
            if (projectCount > 0) {
                const titleWrap = card.querySelector('.tech-card-title-wrap');
                if (titleWrap && !card.querySelector('.tech-projects-badge')) {
                    const projBadge = document.createElement('div');
                    projBadge.className = 'tech-projects-badge';
                    projBadge.setAttribute('title', projectTooltip);
                    projBadge.innerHTML = `<i class="fas fa-folder-open"></i> <span>	h${projectCount} Project${projectCount > 1 ? 's' : ''}</span>`;
                    titleWrap.appendChild(projBadge);
                }
            }
            
            // Create Compact Badge
            const badge = document.createElement('div');
            badge.className = `compact-tech-badge card-glow-${category}`;
            badge.setAttribute('data-tech', techName);
            badge.setAttribute('title', projectTooltip);
            
            badge.innerHTML = `
                <div class="badge-icon-wrap">${iconHtml}</div>
                <div class="badge-text-wrap">
                    <span class="badge-name">${techName}</span>
                    <span class="badge-level-tag">${level}</span>
                </div>
                ${projectCount > 0 ? `
                <div class="badge-projects-count" title="${projectTooltip}">
                    <i class="fas fa-folder-open"></i>
                    <span>${projectCount}</span>
                </div>
                ` : ''}
            `;
            
            compactGrid.appendChild(badge);
        });
        
        // Insert compactGrid right next to techGrid
        techGrid.parentNode.insertBefore(compactGrid, techGrid.nextSibling);
    });
    // 3. Bind View Switcher Tab Buttons
    const toggleContainer = document.querySelector('.skills-view-toggle-container');
    const skillsSection = document.getElementById('skills');
    if (toggleContainer && skillsSection) {
        const toggleButtons = toggleContainer.querySelectorAll('.view-toggle-btn');
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const view = btn.getAttribute('data-view');
                if (view === 'compact') {
                    skillsSection.classList.remove('view-detailed');
                    skillsSection.classList.add('view-compact');
                } else {
                    skillsSection.classList.remove('view-compact');
                    skillsSection.classList.add('view-detailed');
                }
            });
        });
        // Add default class
        skillsSection.classList.add('view-detailed');
    }
}

/* ━━━ Bootstrap ━━━ */
document.addEventListener('DOMContentLoaded', () => {
    const boot = () => {
        const radar = new SkillsRadarManager();
        new SkillsSearchFilter(radar);
        new CardTiltManager();
        new ScrollProgressBarAnimator();
    };

    // Support static dispatcher event "sectionsLoaded" and instant DOM binding
    if (document.getElementById('skills-search-input')) {
        boot();
    } else {
        document.addEventListener('sectionsLoaded', boot);
    }
});
// Step 17 marker
