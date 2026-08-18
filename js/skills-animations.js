/**
 * Technical Stack — Ultra Premium 3D Animations
 * ==============================================
 * 1. Interactive 3D Canvas Tag Cloud with connection lines & pulsing glow
 * 2. 3D Parallax Card Tilt with depth layers
 * 3. Category Tab Switcher with animated progress bars
 * 4. Count-Up Stats Animation
 */

/* ━━━ 1. 3D Tag Cloud ━━━ */
class Skills3DManager {
    constructor() {
        this.canvas = document.getElementById('skills-3d-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.tags = [];
        this.radius = 160;
        this.focalLength = 320;
        this.velocityX = 0.003;
        this.velocityY = 0.002;
        this.speedLimit = 0.04;
        this.time = 0;

        // Mouse state
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isMouseOver = false;
        this.targetVelocityX = 0.002;
        this.targetVelocityY = 0.0015;

        this.tagList = [
            // AI & ML
            { text: 'TensorFlow', color: '#c084fc', rgb: '168,85,247', cat: 'ai' },
            { text: 'PyTorch', color: '#c084fc', rgb: '168,85,247', cat: 'ai' },
            { text: 'Scikit-Learn', color: '#c084fc', rgb: '168,85,247', cat: 'ai' },
            { text: 'XGBoost', color: '#c084fc', rgb: '168,85,247', cat: 'ai' },
            { text: 'Gen AI', color: '#c084fc', rgb: '168,85,247', cat: 'ai' },
            { text: 'NLP', color: '#c084fc', rgb: '168,85,247', cat: 'ai' },
            { text: 'Gemini AI', color: '#c084fc', rgb: '168,85,247', cat: 'ai' },
            { text: 'RAG', color: '#c084fc', rgb: '168,85,247', cat: 'ai' },
            { text: 'Deep Learning', color: '#c084fc', rgb: '168,85,247', cat: 'ai' },
            { text: 'Computer Vision', color: '#c084fc', rgb: '168,85,247', cat: 'ai' },
            { text: 'OpenCV', color: '#c084fc', rgb: '168,85,247', cat: 'ai' },
            // Backend & DB
            { text: 'Flask', color: '#22d3ee', rgb: '6,182,212', cat: 'be' },
            { text: 'FastAPI', color: '#22d3ee', rgb: '6,182,212', cat: 'be' },
            { text: 'Django', color: '#22d3ee', rgb: '6,182,212', cat: 'be' },
            { text: 'Node.js', color: '#22d3ee', rgb: '6,182,212', cat: 'be' },
            { text: 'Express.js', color: '#22d3ee', rgb: '6,182,212', cat: 'be' },
            { text: 'PostgreSQL', color: '#22d3ee', rgb: '6,182,212', cat: 'be' },
            { text: 'MySQL', color: '#22d3ee', rgb: '6,182,212', cat: 'be' },
            { text: 'MongoDB', color: '#22d3ee', rgb: '6,182,212', cat: 'be' },
            { text: 'Firebase', color: '#22d3ee', rgb: '6,182,212', cat: 'be' },
            { text: 'SQLAlchemy', color: '#22d3ee', rgb: '6,182,212', cat: 'be' },
            { text: 'REST APIs', color: '#22d3ee', rgb: '6,182,212', cat: 'be' },
            // Frontend & UX
            { text: 'React.js', color: '#fb7185', rgb: '244,63,94', cat: 'fe' },
            { text: 'Tailwind CSS', color: '#fb7185', rgb: '244,63,94', cat: 'fe' },
            { text: 'JavaScript', color: '#fb7185', rgb: '244,63,94', cat: 'fe' },
            { text: 'HTML5/CSS3', color: '#fb7185', rgb: '244,63,94', cat: 'fe' },
            { text: 'Bootstrap', color: '#fb7185', rgb: '244,63,94', cat: 'fe' },
            { text: 'Chart.js', color: '#fb7185', rgb: '244,63,94', cat: 'fe' },
            { text: 'Plotly', color: '#fb7185', rgb: '244,63,94', cat: 'fe' },
            { text: 'Dash', color: '#fb7185', rgb: '244,63,94', cat: 'fe' },
            { text: 'Streamlit', color: '#fb7185', rgb: '244,63,94', cat: 'fe' },
            // Tools & CS
            { text: 'Docker', color: '#34d399', rgb: '16,185,129', cat: 'tool' },
            { text: 'Git/GitHub', color: '#34d399', rgb: '16,185,129', cat: 'tool' },
            { text: 'AWS', color: '#34d399', rgb: '16,185,129', cat: 'tool' },
            { text: 'Postman', color: '#34d399', rgb: '16,185,129', cat: 'tool' },
            { text: 'Java', color: '#34d399', rgb: '16,185,129', cat: 'tool' },
            { text: 'DSA', color: '#34d399', rgb: '16,185,129', cat: 'tool' },
            { text: 'Pandas', color: '#34d399', rgb: '16,185,129', cat: 'tool' },
            { text: 'NumPy', color: '#34d399', rgb: '16,185,129', cat: 'tool' },
            { text: 'VS Code', color: '#34d399', rgb: '16,185,129', cat: 'tool' },
            { text: 'Python', color: '#34d399', rgb: '16,185,129', cat: 'tool' },
            { text: 'Jupyter', color: '#34d399', rgb: '16,185,129', cat: 'tool' },
        ];

        this.init();
    }

    init() {
        this.resize();
        this.setupTags();
        this.bindEvents();
        this.animate();

        setTimeout(() => {
            this.resize();
            this.setupTags();
        }, 600);
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.width = rect.width || 400;
        this.height = this.width;

        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx.scale(dpr, dpr);

        this.radius = this.width * 0.36;
        this.focalLength = this.radius * 2.2;
    }

    setupTags() {
        const count = this.tagList.length;
        this.tags = [];
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));

        for (let i = 0; i < count; i++) {
            const phi = Math.acos(1 - 2 * (i + 0.5) / count);
            const theta = i * goldenAngle;

            const x = this.radius * Math.sin(phi) * Math.cos(theta);
            const y = this.radius * Math.sin(phi) * Math.sin(theta);
            const z = this.radius * Math.cos(phi);

            this.tags.push({
                ...this.tagList[i],
                x, y, z,
                isHovered: false,
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.setupTags();
        });

        const onStart = (e) => {
            this.isDragging = true;
            const c = e.touches ? e.touches[0] : e;
            this.lastMouseX = c.clientX;
            this.lastMouseY = c.clientY;
        };

        const onMove = (e) => {
            const c = e.touches ? e.touches[0] : e;
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = c.clientX - rect.left - this.width / 2;
            this.mouseY = c.clientY - rect.top - this.height / 2;

            if (!this.isDragging) return;
            const dx = c.clientX - this.lastMouseX;
            const dy = c.clientY - this.lastMouseY;
            this.velocityX = Math.max(-this.speedLimit, Math.min(this.speedLimit, dy * 0.004));
            this.velocityY = Math.max(-this.speedLimit, Math.min(this.speedLimit, -dx * 0.004));
            this.lastMouseX = c.clientX;
            this.lastMouseY = c.clientY;
        };

        const onEnd = () => { this.isDragging = false; };

        this.canvas.addEventListener('mousedown', onStart);
        this.canvas.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onEnd);
        this.canvas.addEventListener('touchstart', onStart, { passive: true });
        this.canvas.addEventListener('touchmove', onMove, { passive: true });
        window.addEventListener('touchend', onEnd);

        this.canvas.addEventListener('mouseenter', () => { this.isMouseOver = true; });
        this.canvas.addEventListener('mouseleave', () => {
            this.isMouseOver = false;
            this.tags.forEach(t => t.isHovered = false);
        });

        // Hover detection
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.isDragging) return;
            let closest = null;
            let minDist = 40;
            this.tags.forEach(tag => {
                const s = this.focalLength / (this.focalLength + tag.z);
                const px = tag.x * s;
                const py = tag.y * s;
                const d = Math.hypot(px - this.mouseX, py - this.mouseY);
                if (d < minDist) { minDist = d; closest = tag; }
            });
            this.tags.forEach(t => t.isHovered = (t === closest));

            if (closest) {
                this.targetVelocityX = 0.0004;
                this.targetVelocityY = 0.0004;
            } else {
                this.targetVelocityX = 0.002;
                this.targetVelocityY = 0.0015;
            }
        });
    }

    rotateX(tag, a) {
        const c = Math.cos(a), s = Math.sin(a);
        const y = tag.y * c - tag.z * s;
        const z = tag.z * c + tag.y * s;
        tag.y = y; tag.z = z;
    }

    rotateY(tag, a) {
        const c = Math.cos(a), s = Math.sin(a);
        const x = tag.x * c - tag.z * s;
        const z = tag.z * c + tag.x * s;
        tag.x = x; tag.z = z;
    }

    animate() {
        this.time += 0.01;
        this.ctx.clearRect(0, 0, this.width, this.height);

        if (!this.isDragging) {
            this.velocityX += (this.targetVelocityX - this.velocityX) * 0.04;
            this.velocityY += (this.targetVelocityY - this.velocityY) * 0.04;
        }

        this.tags.forEach(tag => {
            this.rotateX(tag, this.velocityX);
            this.rotateY(tag, this.velocityY);
        });

        const cx = this.width / 2;
        const cy = this.height / 2;

        // ── Draw connection lines between nearby tags ──
        this.ctx.save();
        const connectionDist = this.radius * 0.85;
        for (let i = 0; i < this.tags.length; i++) {
            for (let j = i + 1; j < this.tags.length; j++) {
                const a = this.tags[i], b = this.tags[j];
                // Only connect same-category tags
                if (a.cat !== b.cat) continue;
                const dist = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
                if (dist < connectionDist) {
                    const sa = this.focalLength / (this.focalLength + a.z);
                    const sb = this.focalLength / (this.focalLength + b.z);
                    const ax = cx + a.x * sa, ay = cy + a.y * sa;
                    const bx = cx + b.x * sb, by = cy + b.y * sb;

                    const alphaA = (a.z + this.radius) / (2 * this.radius);
                    const alphaB = (b.z + this.radius) / (2 * this.radius);
                    const lineAlpha = Math.min(alphaA, alphaB) * (1 - dist / connectionDist) * 0.12;

                    this.ctx.beginPath();
                    this.ctx.moveTo(ax, ay);
                    this.ctx.lineTo(bx, by);
                    this.ctx.strokeStyle = `rgba(${a.rgb}, ${lineAlpha})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
        this.ctx.restore();

        // ── Render tags (sorted by depth) ──
        const sorted = [...this.tags].sort((a, b) => b.z - a.z);

        sorted.forEach(tag => {
            const scale = this.focalLength / (this.focalLength + tag.z);
            const x = cx + tag.x * scale;
            const y = cy + tag.y * scale;

            const depthAlpha = (tag.z + this.radius) / (2 * this.radius);
            const opacity = 0.1 + 0.9 * depthAlpha;

            this.ctx.save();

            const baseFontSize = 11.5;
            const fontSize = Math.max(7, Math.min(18, baseFontSize * scale));
            this.ctx.font = `600 ${fontSize}px 'Fira Code', monospace`;

            const textW = this.ctx.measureText(tag.text).width;
            const padX = 10 * scale;
            const padY = 5 * scale;
            const pillW = textW + padX * 2;
            const pillH = fontSize + padY * 2;
            const rx = x - pillW / 2;
            const ry = y - pillH / 2;
            const r = 6 * scale;

            // Hovered: brighter, larger glow
            if (tag.isHovered) {
                this.ctx.shadowBlur = 25;
                this.ctx.shadowColor = tag.color;
                // Outer glow ring
                this.ctx.fillStyle = `rgba(${tag.rgb}, 0.08)`;
                this.ctx.beginPath();
                this.ctx.roundRect(rx - 4, ry - 4, pillW + 8, pillH + 8, r + 3);
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            }

            // Pill background
            this.ctx.fillStyle = tag.isHovered
                ? `rgba(15, 23, 42, 0.92)`
                : `rgba(15, 23, 42, ${0.35 * opacity})`;

            // Pill border
            this.ctx.strokeStyle = tag.isHovered
                ? tag.color
                : `rgba(${tag.rgb}, ${0.06 + 0.2 * opacity})`;
            this.ctx.lineWidth = tag.isHovered ? 1.5 : 0.7;

            if (tag.isHovered) {
                this.ctx.shadowBlur = 12;
                this.ctx.shadowColor = tag.color;
            } else {
                this.ctx.shadowBlur = 2 * opacity;
                this.ctx.shadowColor = `rgba(${tag.rgb}, 0.15)`;
            }

            // Draw pill
            this.ctx.beginPath();
            this.ctx.roundRect(rx, ry, pillW, pillH, r);
            this.ctx.fill();
            this.ctx.stroke();

            // Text
            this.ctx.shadowBlur = 0;
            this.ctx.fillStyle = tag.isHovered
                ? '#fff'
                : `rgba(226, 232, 240, ${0.35 + 0.65 * opacity})`;
            this.ctx.textBaseline = 'middle';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(tag.text, x, y);

            this.ctx.restore();
        });

        requestAnimationFrame(() => this.animate());
    }
}

/* ━━━ 2. 3D Card Tilt ━━━ */
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
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const tiltX = (cy - y) / 14;
        const tiltY = (x - cx) / 14;
        card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(8px)`;
    }

    handleLeave(card) {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
}

/* ━━━ 3. Tab Manager ━━━ */
class TabManager {
    constructor() {
        this.tabs = document.querySelectorAll('.skill-tab-btn');
        this.groups = document.querySelectorAll('.skills-category-group');
        this.init();
    }

    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.getAttribute('data-category');
                this.switchTab(tab, category);
            });
        });

        // Animate initial tab
        setTimeout(() => {
            this.animateProgressBars(document.querySelector('.skills-category-group.active'));
        }, 500);
    }

    switchTab(activeTab, category) {
        this.tabs.forEach(t => t.classList.remove('active'));
        activeTab.classList.add('active');

        this.groups.forEach(group => {
            if (group.id === category) {
                group.style.display = 'block';
                group.offsetWidth; // trigger reflow
                group.classList.add('active');
                this.animateProgressBars(group);
            } else {
                group.classList.remove('active');
                setTimeout(() => {
                    if (!group.classList.contains('active')) {
                        group.style.display = 'none';
                    }
                }, 500);
            }
        });
    }

    animateProgressBars(group) {
        if (!group) return;
        const fills = group.querySelectorAll('.progress-bar-fill');
        fills.forEach((fill, i) => {
            const targetWidth = fill.getAttribute('data-target-width') || fill.style.width;
            if (!fill.getAttribute('data-target-width')) {
                fill.setAttribute('data-target-width', targetWidth);
            }
            fill.style.transition = 'none';
            fill.style.width = '0%';
            fill.offsetWidth;
            
            // Staggered animation
            setTimeout(() => {
                fill.style.transition = `width 1.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.08}s`;
                fill.style.width = targetWidth;
            }, 50);
        });
    }
}

/* ━━━ 4. Count-Up Stats ━━━ */
class StatsCountUp {
    constructor() {
        this.bar = document.querySelector('.skills-stats-bar');
        if (!this.bar) return;
        this.animated = false;
        this.observe();
    }

    observe() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animated = true;
                    this.countUp();
                }
            });
        }, { threshold: 0.5 });
        observer.observe(this.bar);
    }

    countUp() {
        const numbers = this.bar.querySelectorAll('.stat-number');
        numbers.forEach(el => {
            const target = parseInt(el.getAttribute('data-count'), 10);
            const duration = 2000;
            const start = performance.now();

            const tick = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(eased * target) + '+';
                if (progress < 1) requestAnimationFrame(tick);
            };

            requestAnimationFrame(tick);
        });
    }
}

/* ━━━ Bootstrap ━━━ */
document.addEventListener('DOMContentLoaded', () => {
    const boot = () => {
        new Skills3DManager();
        new CardTiltManager();
        new TabManager();
        new StatsCountUp();
    };

    if (document.getElementById('skills-3d-canvas')) {
        boot();
    } else {
        document.addEventListener('sectionsLoaded', boot);
    }
});
