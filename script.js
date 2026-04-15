const config = {
    mask: "SEVERYAN", mask2: "CODE", fillText: "", fontMask: "Manrope", fontFill: "Manrope", layout: "center",
    intro: "explosion", idle: "wave", outro: "none", mouseFX: "repel",
    scale: 100, scale2: 80, speedX: 30, speedY: 0,
    gapDur: 0.5, introDur: 2, mainDur: 3, outroDur: 2,
    introReverse: false, outroReverse: false,
    mouseRadius: 100, mouseForce: 100, videoThreshold: 50, objPadding: 15,
    bgColor: "#ffffff", textColor: "#111111", fillSize: 14, glitchColor: "#ff0040"
};

document.getElementById('sidebarToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('open');
});
document.getElementById('sidebarClose').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
});

document.getElementById('toggleTheme').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    if (!document.getElementById('cfgBgColor')._userSet) {
        config.bgColor = isLight ? '#ffffff' : '#111111';
        document.getElementById('cfgBgColor').value = config.bgColor;
        document.getElementById('cfgBgColorHex').value = config.bgColor;
    }
    if (!document.getElementById('cfgTextColor')._userSet) {
        config.textColor = isLight ? '#111111' : '#eeeeee';
        document.getElementById('cfgTextColor').value = config.textColor;
        document.getElementById('cfgTextColorHex').value = config.textColor;
    }
});

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        header.classList.toggle('active');
        header.nextElementSibling.classList.toggle('open');
    });
});

function syncSlider(sliderId, inputId) {
    const slider = document.getElementById(sliderId);
    const input = document.getElementById(inputId);
    if (!slider || !input) return;
    slider.addEventListener('input', e => { input.value = e.target.value; updateConfig(); });
    input.addEventListener('input', e => { slider.value = e.target.value; updateConfig(); });
}
syncSlider('cfgScale', 'cfgScaleVal');
syncSlider('cfgScale2', 'cfgScaleVal2');
syncSlider('cfgGapDur', 'cfgGapDurVal');
syncSlider('cfgIntroDur', 'cfgIntroDurVal');
syncSlider('cfgMainDur', 'cfgMainDurVal');
syncSlider('cfgOutroDur', 'cfgOutroDurVal');
syncSlider('cfgSpeedX', 'cfgSpeedXVal');
syncSlider('cfgSpeedY', 'cfgSpeedYVal');
syncSlider('cfgMouseRadius', 'cfgMouseRadiusVal');
syncSlider('cfgMouseForce', 'cfgMouseForceVal');
syncSlider('cfgVideoThreshold', 'cfgVideoThresholdVal');
syncSlider('cfgObjPadding', 'cfgObjPaddingVal');
syncSlider('cfgFillSize', 'cfgFillSizeVal');

function syncColor(colorId, hexId, configKey) {
    const picker = document.getElementById(colorId);
    const hex = document.getElementById(hexId);
    picker.addEventListener('input', e => { hex.value = e.target.value; config[configKey] = e.target.value; picker._userSet = true; updateConfig(); });
    hex.addEventListener('input', e => { if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) { picker.value = e.target.value; config[configKey] = e.target.value; picker._userSet = true; updateConfig(); } });
}
syncColor('cfgBgColor', 'cfgBgColorHex', 'bgColor');
syncColor('cfgTextColor', 'cfgTextColorHex', 'textColor');
syncColor('cfgGlitchColor', 'cfgGlitchColorHex', 'glitchColor');
document.getElementById('cfgIntroReverse').addEventListener('change', updateConfig);
document.getElementById('cfgOutroReverse').addEventListener('change', updateConfig);

const FONT_CATALOG = [
    { name: 'Inter', cat: 'Sans-serif' },
    { name: 'Roboto', cat: 'Sans-serif' },
    { name: 'Montserrat', cat: 'Sans-serif' },
    { name: 'Manrope', cat: 'Sans-serif' },
    { name: 'Poppins', cat: 'Sans-serif' },
    { name: 'Raleway', cat: 'Sans-serif' },
    { name: 'Rubik', cat: 'Sans-serif' },
    { name: 'Open Sans', cat: 'Sans-serif' },
    { name: 'Lato', cat: 'Sans-serif' },
    { name: 'Nunito', cat: 'Sans-serif' },
    { name: 'Outfit', cat: 'Sans-serif' },
    { name: 'DM Sans', cat: 'Sans-serif' },
    { name: 'Space Grotesk', cat: 'Sans-serif' },
    { name: 'Ubuntu', cat: 'Sans-serif' },
    { name: 'Bebas Neue', cat: 'Display' },
    { name: 'Oswald', cat: 'Display' },
    { name: 'Anton', cat: 'Display' },
    { name: 'Teko', cat: 'Display' },
    { name: 'Passion One', cat: 'Display' },
    { name: 'Russo One', cat: 'Display' },
    { name: 'Bungee', cat: 'Display' },
    { name: 'Righteous', cat: 'Display' },
    { name: 'Orbitron', cat: 'Display' },
    { name: 'Audiowide', cat: 'Display' },
    { name: 'Black Ops One', cat: 'Display' },
    { name: 'Permanent Marker', cat: 'Display' },
    { name: 'Comfortaa', cat: 'Display' },
    { name: 'Playfair Display', cat: 'Serif' },
    { name: 'Merriweather', cat: 'Serif' },
    { name: 'Lora', cat: 'Serif' },
    { name: 'PT Serif', cat: 'Serif' },
    { name: 'Noto Serif', cat: 'Serif' },
    { name: 'Crimson Text', cat: 'Serif' },
    { name: 'Fira Code', cat: 'Mono' },
    { name: 'JetBrains Mono', cat: 'Mono' },
    { name: 'Source Code Pro', cat: 'Mono' },
    { name: 'IBM Plex Mono', cat: 'Mono' },
    { name: 'Arial', cat: 'System', sys: true },
    { name: 'Georgia', cat: 'System', sys: true },
    { name: 'Courier New', cat: 'System', sys: true },
    { name: 'Verdana', cat: 'System', sys: true },
];

const FONT_CAT_ORDER = ['Sans-serif', 'Display', 'Serif', 'Mono', 'System'];

function loadAllFonts() {
    const gFonts = FONT_CATALOG.filter(f => !f.sys);
    const families = gFonts.map(f =>
        `family=${f.name.replace(/ /g, '+')}:wght@400;700;900`
    ).join('&');
    const link = document.getElementById('googleFontsLink');
    link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
}
loadAllFonts();

let activeFontPicker = null;

class FontPicker {
    constructor(containerId, hiddenInputId, initialFont) {
        this.container = document.getElementById(containerId);
        this.hiddenInput = document.getElementById(hiddenInputId);
        this.selected = initialFont;
        this.isOpen = false;
        this.dropdown = null;
        this._onDocClick = this._onDocClick.bind(this);
        this._onScroll = this._onScroll.bind(this);
        this._buildTrigger();
    }

    _buildTrigger() {
        this.trigger = document.createElement('button');
        this.trigger.type = 'button';
        this.trigger.className = 'fp-trigger';
        this.trigger.innerHTML = `<span class="fp-preview" style="font-family:'${this.selected}',sans-serif">${this.selected}</span><span class="fp-caret">&#9660;</span>`;
        this.container.appendChild(this.trigger);
        this.trigger.addEventListener('click', e => {
            e.stopPropagation();
            this.isOpen ? this.close() : this.open();
        });
    }

    open() {
        if (activeFontPicker && activeFontPicker !== this) activeFontPicker.close();
        activeFontPicker = this;
        this.isOpen = true;
        this.trigger.classList.add('open');

        this.dropdown = document.createElement('div');
        this.dropdown.className = 'fp-dropdown';
        this.dropdown.innerHTML = `
            <div class="fp-search-wrap">
                <span class="fp-search-icon">&#128269;</span>
                <input type="text" class="fp-search" placeholder="Поиск шрифта...">
            </div>
            <div class="fp-list"></div>
        `;
        document.body.appendChild(this.dropdown);
        this.dropdown.addEventListener('click', e => e.stopPropagation());

        this._position();
        this._fillList();

        const search = this.dropdown.querySelector('.fp-search');
        search.addEventListener('input', () => this._fillList(search.value));
        setTimeout(() => search.focus(), 30);

        document.addEventListener('click', this._onDocClick);
        document.querySelector('.sidebar-scroll')?.addEventListener('scroll', this._onScroll);
        window.addEventListener('resize', this._onScroll);
    }

    _position() {
        const r = this.trigger.getBoundingClientRect();
        const dh = 360;
        const spaceBelow = window.innerHeight - r.bottom - 8;
        const openAbove = spaceBelow < 200 && r.top > dh;
        this.dropdown.style.left = r.left + 'px';
        this.dropdown.style.width = Math.max(r.width, 260) + 'px';
        if (openAbove) {
            this.dropdown.style.bottom = (window.innerHeight - r.top + 4) + 'px';
            this.dropdown.style.top = 'auto';
        } else {
            this.dropdown.style.top = (r.bottom + 4) + 'px';
            this.dropdown.style.bottom = 'auto';
        }
    }

    _fillList(filter = '') {
        const list = this.dropdown.querySelector('.fp-list');
        list.innerHTML = '';
        const q = filter.toLowerCase();
        let hasItems = false;

        for (const cat of FONT_CAT_ORDER) {
            const fonts = FONT_CATALOG.filter(f => f.cat === cat && f.name.toLowerCase().includes(q));
            if (!fonts.length) continue;
            hasItems = true;

            const catEl = document.createElement('div');
            catEl.className = 'fp-cat';
            catEl.textContent = cat === 'Mono' ? 'Моноширинные' : cat === 'System' ? 'Системные' : cat;
            list.appendChild(catEl);

            for (const font of fonts) {
                const el = document.createElement('div');
                el.className = 'fp-item' + (font.name === this.selected ? ' active' : '');
                el.textContent = font.name;
                el.style.fontFamily = `'${font.name}', sans-serif`;
                el.addEventListener('click', () => this.select(font.name));
                list.appendChild(el);
            }
        }

        if (!hasItems) {
            const empty = document.createElement('div');
            empty.className = 'fp-empty';
            empty.textContent = 'Ничего не найдено';
            list.appendChild(empty);
        }

        if (!filter) {
            const activeEl = list.querySelector('.fp-item.active');
            if (activeEl) setTimeout(() => activeEl.scrollIntoView({ block: 'center' }), 10);
        }
    }

    select(fontName) {
        this.selected = fontName;
        this.hiddenInput.value = fontName;
        this.trigger.querySelector('.fp-preview').textContent = fontName;
        this.trigger.querySelector('.fp-preview').style.fontFamily = `'${fontName}', sans-serif`;
        this.close();
        updateConfig();
    }

    setFont(fontName) {
        this.selected = fontName;
        this.hiddenInput.value = fontName;
        this.trigger.querySelector('.fp-preview').textContent = fontName;
        this.trigger.querySelector('.fp-preview').style.fontFamily = `'${fontName}', sans-serif`;
    }

    close() {
        if (!this.isOpen) return;
        this.isOpen = false;
        this.trigger.classList.remove('open');
        if (this.dropdown) { this.dropdown.remove(); this.dropdown = null; }
        document.removeEventListener('click', this._onDocClick);
        document.querySelector('.sidebar-scroll')?.removeEventListener('scroll', this._onScroll);
        window.removeEventListener('resize', this._onScroll);
        if (activeFontPicker === this) activeFontPicker = null;
    }

    _onDocClick() { this.close(); }
    _onScroll() { if (this.isOpen) this._position(); }
}

let fontPickerMask, fontPickerFill;

const presets = {
    hero: { mask: "HELLO", fillText: "Welcome to the future of design.", fontMask: "Bebas Neue", fontFill: "Inter", layout: "center", intro: "explosion", idle: "wave", outro: "none", mouseFX: "repel", scale: 100, speedX: 20, speedY: 0, bgColor: "#0a0a0a", textColor: "#ffffff", fillSize: 14, gapDur: 0.5, introDur: 2, mainDur: 4, outroDur: 2, mouseRadius: 120, mouseForce: 100 },
    newspaper: { mask: "NEWS", fillText: "Breaking news from around the world. Stay informed with the latest updates and stories that matter most to you and your community.", fontMask: "Playfair Display", fontFill: "Roboto", layout: "col-indep", intro: "fade", idle: "none", outro: "fade", mouseFX: "repel", scale: 100, speedX: 0, speedY: 5, bgColor: "#f5f0e8", textColor: "#222222", fillSize: 11, gapDur: 0.3, introDur: 1.5, mainDur: 5, outroDur: 1.5, mouseRadius: 80, mouseForce: 60 },
    matrix: { mask: "MATRIX", fillText: "01001010 11010010 00101101 10110100", fontMask: "Oswald", fontFill: "Courier New", layout: "center", intro: "glitch-slam", idle: "glitch", outro: "glitch-slam", mouseFX: "repel", scale: 100, speedX: 0, speedY: -40, bgColor: "#000000", textColor: "#00ff41", glitchColor: "#00ff41", fillSize: 12, gapDur: 1, introDur: 2.5, mainDur: 3, outroDur: 2, mouseRadius: 100, mouseForce: 150 },
    liquid: { mask: "LIQUID", fillText: "Flow and motion design elements.", fontMask: "Montserrat", fontFill: "Manrope", layout: "center", intro: "tape", idle: "liquid", outro: "fade", mouseFX: "vortex", scale: 100, speedX: 10, speedY: 0, bgColor: "#1a0033", textColor: "#cc88ff", fillSize: 14, gapDur: 0.5, introDur: 2, mainDur: 4, outroDur: 2, mouseRadius: 150, mouseForce: 120 },
    neon: { mask: "NEON", fillText: "Glow in the dark. Electric vibes.", fontMask: "Bebas Neue", fontFill: "Raleway", layout: "center", intro: "spin", idle: "pulse", outro: "spin", mouseFX: "gravity", scale: 100, speedX: 15, speedY: 0, bgColor: "#0d0d1a", textColor: "#ff00cc", fillSize: 16, gapDur: 0.5, introDur: 2, mainDur: 3, outroDur: 2, mouseRadius: 130, mouseForce: 100 },
    minimal: { mask: "clean", fillText: "Less is more. Simple and elegant.", fontMask: "Inter", fontFill: "Inter", layout: "center", intro: "fade", idle: "none", outro: "fade", mouseFX: "none", scale: 80, speedX: 5, speedY: 0, bgColor: "#fafafa", textColor: "#333333", fillSize: 10, gapDur: 0.5, introDur: 3, mainDur: 4, outroDur: 2, mouseRadius: 100, mouseForce: 100 }
};

document.getElementById('cfgPreset').addEventListener('change', e => {
    const p = presets[e.target.value];
    if (!p) return;
    document.getElementById('cfgMaskText').value = p.mask;
    document.getElementById('cfgFillText').value = p.fillText;
    document.getElementById('cfgLayout').value = p.layout;
    document.getElementById('cfgIntro').value = p.intro;
    document.getElementById('cfgIdle').value = p.idle;
    document.getElementById('cfgOutro').value = p.outro;
    document.getElementById('cfgMouse').value = p.mouseFX;
    document.getElementById('cfgScale').value = p.scale; document.getElementById('cfgScaleVal').value = p.scale;
    document.getElementById('cfgSpeedX').value = p.speedX; document.getElementById('cfgSpeedXVal').value = p.speedX;
    document.getElementById('cfgSpeedY').value = p.speedY; document.getElementById('cfgSpeedYVal').value = p.speedY;
    document.getElementById('cfgGapDur').value = p.gapDur; document.getElementById('cfgGapDurVal').value = p.gapDur;
    document.getElementById('cfgIntroDur').value = p.introDur; document.getElementById('cfgIntroDurVal').value = p.introDur;
    document.getElementById('cfgMainDur').value = p.mainDur; document.getElementById('cfgMainDurVal').value = p.mainDur;
    document.getElementById('cfgOutroDur').value = p.outroDur; document.getElementById('cfgOutroDurVal').value = p.outroDur;
    document.getElementById('cfgMouseRadius').value = p.mouseRadius; document.getElementById('cfgMouseRadiusVal').value = p.mouseRadius;
    document.getElementById('cfgMouseForce').value = p.mouseForce; document.getElementById('cfgMouseForceVal').value = p.mouseForce;
    document.getElementById('cfgBgColor').value = p.bgColor; document.getElementById('cfgBgColorHex').value = p.bgColor;
    document.getElementById('cfgTextColor').value = p.textColor; document.getElementById('cfgTextColorHex').value = p.textColor;
    document.getElementById('cfgFillSize').value = p.fillSize; document.getElementById('cfgFillSizeVal').value = p.fillSize;
    if (p.glitchColor) { document.getElementById('cfgGlitchColor').value = p.glitchColor; document.getElementById('cfgGlitchColorHex').value = p.glitchColor; }
    document.getElementById('cfgIntroReverse').checked = !!p.introReverse;
    document.getElementById('cfgOutroReverse').checked = !!p.outroReverse;
    document.getElementById('cfgBgColor')._userSet = true;
    document.getElementById('cfgTextColor')._userSet = true;
    if (fontPickerMask) fontPickerMask.setFont(p.fontMask);
    if (fontPickerFill) fontPickerFill.setFont(p.fontFill);
    const r = parseInt(p.bgColor.slice(1,3),16), g = parseInt(p.bgColor.slice(3,5),16), b = parseInt(p.bgColor.slice(5,7),16);
    const lum = r * 0.299 + g * 0.587 + b * 0.114;
    if (lum > 128) document.body.classList.add('light-theme'); else document.body.classList.remove('light-theme');
    resetAnimation();
    updateConfig();
    e.target.value = '';
});

const inputs = {
    mask: document.getElementById('cfgMaskText'), mask2: document.getElementById('cfgMaskText2'),
    fillText: document.getElementById('cfgFillText'),
    layout: document.getElementById('cfgLayout'), intro: document.getElementById('cfgIntro'),
    idle: document.getElementById('cfgIdle'), outro: document.getElementById('cfgOutro'),
    mouseFX: document.getElementById('cfgMouse')
};


function updateConfig() {
    const prevIntro = config.intro;
    const prevOutro = config.outro;
    if (inputs.mask) config.mask = inputs.mask.value || " ";
    if (inputs.mask2) config.mask2 = inputs.mask2.value || " ";
    if (inputs.fillText) config.fillText = inputs.fillText.value;
    config.fontMask = document.getElementById('cfgFontMask').value;
    config.fontFill = document.getElementById('cfgFontFill').value;
    if (inputs.layout) config.layout = inputs.layout.value;
    if (inputs.intro) config.intro = inputs.intro.value;
    if (inputs.idle) config.idle = inputs.idle.value;
    if (inputs.outro) config.outro = inputs.outro.value;
    if (inputs.mouseFX) config.mouseFX = inputs.mouseFX.value;

    config.scale = Number(document.getElementById('cfgScale').value);
    config.scale2 = Number(document.getElementById('cfgScale2').value);
    config.gapDur = Number(document.getElementById('cfgGapDur').value);
    config.introDur = Number(document.getElementById('cfgIntroDur').value);
    config.mainDur = Number(document.getElementById('cfgMainDur').value);
    config.outroDur = Number(document.getElementById('cfgOutroDur').value);
    config.speedX = Number(document.getElementById('cfgSpeedX').value);
    config.speedY = Number(document.getElementById('cfgSpeedY').value);
    config.mouseRadius = Number(document.getElementById('cfgMouseRadius').value);
    config.mouseForce = Number(document.getElementById('cfgMouseForce').value);
    config.videoThreshold = Number(document.getElementById('cfgVideoThreshold').value);
    config.objPadding = Number(document.getElementById('cfgObjPadding').value);
    config.fillSize = Number(document.getElementById('cfgFillSize').value);
    config.bgColor = document.getElementById('cfgBgColor').value;
    config.textColor = document.getElementById('cfgTextColor').value;
    config.glitchColor = document.getElementById('cfgGlitchColor').value;
    config.introReverse = document.getElementById('cfgIntroReverse').checked;
    config.outroReverse = document.getElementById('cfgOutroReverse').checked;

    const groupWord2 = document.getElementById('groupWord2');
    if (groupWord2) { groupWord2.classList.toggle('visible', config.layout === 'center2'); }
    const groupImage = document.getElementById('groupImage');
    if (groupImage) { groupImage.classList.toggle('visible', config.layout === 'image'); }
    const groupVideo = document.getElementById('groupVideo');
    if (groupVideo) { groupVideo.classList.toggle('visible', config.layout === 'video'); }
    const groupThreshold = document.getElementById('groupThreshold');
    if (groupThreshold) { groupThreshold.classList.toggle('visible', config.layout === 'image' || config.layout === 'video'); }

    if (typeof rebuildOnTheFly === 'function') rebuildOnTheFly();
    if (prevIntro !== config.intro || prevOutro !== config.outro) resetAnimation();
}

for (const key in inputs) {
    if (inputs[key]) {
        inputs[key].addEventListener('input', updateConfig);
        inputs[key].addEventListener('change', updateConfig);
    }
}

let uploadedImage = null;
let isAnimatedImage = false;
document.getElementById('cfgImage').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    isAnimatedImage = file.type === 'image/gif' || file.name.toLowerCase().endsWith('.gif');
    const img = new Image();
    img.onload = () => { uploadedImage = img; if (config.layout === 'image') rebuildOnTheFly(); };
    img.src = URL.createObjectURL(file);
});

let uploadedVideo = null;
let videoReady = false;
let videoBase64 = null;
const videoEl = document.createElement('video');
videoEl.muted = true; videoEl.loop = true; videoEl.playsInline = true;
document.getElementById('cfgVideo').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    if (uploadedVideo) URL.revokeObjectURL(uploadedVideo);
    uploadedVideo = URL.createObjectURL(file);
    videoEl.src = uploadedVideo;
    videoEl.oncanplay = () => { videoReady = true; videoEl.play(); };
    const reader = new FileReader();
    reader.onload = () => { videoBase64 = reader.result; };
    reader.readAsDataURL(file);
});

let sceneObjects = [];
let dragObj = null;
let dragOffX = 0, dragOffY = 0;

document.getElementById('cfgAddObject').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
        const scale = Math.min(150 / img.width, 150 / img.height, 1);
        const obj = {
            img, name: file.name,
            x: width / 2 - (img.width * scale) / 2,
            y: height / 2 - (img.height * scale) / 2,
            w: img.width * scale, h: img.height * scale
        };
        sceneObjects.push(obj);
        renderObjectsList();
        rebuildOnTheFly();
    };
    img.src = URL.createObjectURL(file);
    e.target.value = '';
});

function renderObjectsList() {
    const list = document.getElementById('objectsList');
    list.innerHTML = '';
    sceneObjects.forEach((obj, i) => {
        const div = document.createElement('div');
        div.className = 'obj-item';
        const thumb = document.createElement('img');
        thumb.src = obj.img.src;
        const span = document.createElement('span');
        span.textContent = obj.name;
        const btn = document.createElement('button');
        btn.textContent = '\u00d7';
        btn.title = 'Удалить';
        btn.addEventListener('click', () => { sceneObjects.splice(i, 1); renderObjectsList(); rebuildOnTheFly(); });
        div.append(thumb, span, btn);
        list.appendChild(div);
    });
}

const canvasEl = document.getElementById('canvas');
canvasEl.addEventListener('mousedown', e => {
    const rect = canvasEl.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    for (let i = sceneObjects.length - 1; i >= 0; i--) {
        const o = sceneObjects[i];
        if (mx >= o.x && mx <= o.x + o.w && my >= o.y && my <= o.y + o.h) {
            dragObj = o;
            dragOffX = mx - o.x;
            dragOffY = my - o.y;
            e.preventDefault();
            return;
        }
    }
});
window.addEventListener('mousemove', e => {
    if (!dragObj) return;
    const rect = canvasEl.getBoundingClientRect();
    dragObj.x = e.clientX - rect.left - dragOffX;
    dragObj.y = e.clientY - rect.top - dragOffY;
    rebuildOnTheFly();
});
window.addEventListener('mouseup', () => { dragObj = null; });

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
let width, height;
let maskIntervals = [];
let maskClipPath = null;
let maskBBoxX1 = 0, maskBBoxX2 = 0;
let charWidths = {};
let lineHeight = 16;
let startTime = Date.now();
let introProgress = 0;
let outroProgress = 0;
let animPhase = 'gap'; // 'gap' | 'intro' | 'main' | 'outro'
let phaseStart = Date.now();
let currentAnimType = 'explosion'; // which intro/outro effect is active
let objMask = null;

function resetAnimation(now) {
    const t = now || Date.now();
    animPhase = (config.gapDur > 0) ? 'gap' : 'intro';
    introProgress = 0;
    outroProgress = 0;
    phaseStart = t;
    startTime = t;
}

let mouse = { x: -1000, y: -1000, radius: 100 };
canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});
canvas.addEventListener('mouseleave', () => { if (!dragObj) { mouse.x = -1000; mouse.y = -1000; } });

function initCharCache() {
    lineHeight = Math.round(config.fillSize * 1.15);
    ctx.font = `900 ${config.fillSize}px '${config.fontFill}', sans-serif`;
    charWidths = {};
    const text = config.fillText || "SEVERYAN";
    for (const char of new Set(text + " ")) {
        charWidths[char] = ctx.measureText(char).width;
    }
}

function rebuildOnTheFly() {
    initCharCache();
    createMask();
}

function resizeCanvas() {
    const preview = document.getElementById('preview');
    width = preview.clientWidth;
    height = preview.clientHeight;
    canvas.width = width;
    canvas.height = height;
    rebuildOnTheFly();
}
window.addEventListener('resize', resizeCanvas);

const vidOff = document.createElement('canvas');
const vidCtx = vidOff.getContext('2d', { willReadFrequently: true });

function createMask() {
    if (!width || !height) return;
    maskIntervals = [];

    const offCtx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
    offCtx.canvas.width = width;
    offCtx.canvas.height = height;
    offCtx.fillStyle = '#000';

    const paddingX = 40; const paddingY = 40;
    const maxUsableWidth = width - paddingX * 2;
    const maxUsableHeight = height - paddingY * 2;

    let maxAllowedScale = 200;
    let maxAllowedScale2 = 200;

    if (config.layout === 'center' || config.layout === 'center2') {
        offCtx.font = `900 300px '${config.fontMask}', sans-serif`;
        let metrics = offCtx.measureText(config.mask);
        if (metrics.width > 0) maxAllowedScale = Math.floor((maxUsableWidth / metrics.width) * 100);
        maxAllowedScale = Math.min(Math.max(maxAllowedScale, 10), 500);
        if (config.layout === 'center2') {
            let m2 = offCtx.measureText(config.mask2);
            if (m2.width > 0) maxAllowedScale2 = Math.floor((maxUsableWidth / m2.width) * 100);
            maxAllowedScale2 = Math.min(Math.max(maxAllowedScale2, 10), 500);
        }
    }
    else if (config.layout === 'col-single') maxAllowedScale = 142;
    else if (config.layout === 'col-narrow') maxAllowedScale = 117;
    else if (config.layout === 'col-indep') maxAllowedScale = 117;
    else if (config.layout === 'image' || config.layout === 'video') maxAllowedScale = 200;

    const scaleSlider = document.getElementById('cfgScale');
    if (scaleSlider && Number(scaleSlider.max) !== maxAllowedScale) {
        scaleSlider.max = maxAllowedScale;
        if (config.scale > maxAllowedScale) { config.scale = maxAllowedScale; scaleSlider.value = maxAllowedScale; document.getElementById('cfgScaleVal').value = maxAllowedScale; }
    }
    const scaleSlider2 = document.getElementById('cfgScale2');
    if (scaleSlider2 && Number(scaleSlider2.max) !== maxAllowedScale2) {
        scaleSlider2.max = maxAllowedScale2;
        if (config.scale2 > maxAllowedScale2) { config.scale2 = maxAllowedScale2; scaleSlider2.value = maxAllowedScale2; document.getElementById('cfgScaleVal2').value = maxAllowedScale2; }
    }

    const scaleMult = config.scale / 100;
    const scaleMult2 = config.scale2 / 100;

    if (config.layout === 'center') {
        offCtx.textAlign = 'center'; offCtx.textBaseline = 'middle';
        let fs = 300 * scaleMult; offCtx.font = `900 ${fs}px '${config.fontMask}', sans-serif`;
        let m = offCtx.measureText(config.mask);
        if (m.width > maxUsableWidth) { fs *= maxUsableWidth / m.width; offCtx.font = `900 ${fs}px '${config.fontMask}', sans-serif`; }
        offCtx.fillText(config.mask, width / 2, height / 2);
    }
    else if (config.layout === 'center2') {
        offCtx.textAlign = 'center'; offCtx.textBaseline = 'middle';
        let f1 = 300 * scaleMult; offCtx.font = `900 ${f1}px '${config.fontMask}', sans-serif`;
        let m1 = offCtx.measureText(config.mask);
        if (m1.width > maxUsableWidth) f1 *= maxUsableWidth / m1.width;
        let f2 = 300 * scaleMult2; offCtx.font = `900 ${f2}px '${config.fontMask}', sans-serif`;
        let m2 = offCtx.measureText(config.mask2);
        if (m2.width > maxUsableWidth) f2 *= maxUsableWidth / m2.width;
        let gap = 20, sy = (height / 2) - (f1 + f2 + gap) / 2;
        offCtx.font = `900 ${f1}px '${config.fontMask}', sans-serif`; offCtx.fillText(config.mask, width / 2, sy + f1 / 2);
        offCtx.font = `900 ${f2}px '${config.fontMask}', sans-serif`; offCtx.fillText(config.mask2, width / 2, sy + f1 + gap + f2 / 2);
    }
    else if (config.layout === 'col-single') {
        let tw = Math.min(maxUsableWidth * 0.7 * scaleMult, maxUsableWidth);
        let ch = Math.min(height * 0.75 * scaleMult, maxUsableHeight);
        offCtx.fillRect((width - tw) / 2, (height - ch) / 2, tw, ch);
    }
    else if (config.layout === 'col-narrow') {
        let tw = Math.min(maxUsableWidth * 0.85 * scaleMult, maxUsableWidth);
        let ch = Math.min(height * 0.75 * scaleMult, maxUsableHeight);
        let cw = Math.max((tw - 60) / 3, 10);
        offCtx.fillRect((width - cw) / 2, (height - ch) / 2, cw, ch);
    }
    else if (config.layout === 'col-indep') {
        let tw = Math.min(maxUsableWidth * 0.85 * scaleMult, maxUsableWidth);
        let ch = Math.min(height * 0.75 * scaleMult, maxUsableHeight);
        let cw = Math.max((tw - 60) / 3, 10);
        const sx = (width - (cw * 3 + 60)) / 2;
        const sy = (height - ch) / 2;
        offCtx.fillRect(sx, sy, cw, ch);
        offCtx.fillRect(sx + cw + 30, sy, cw, ch);
        offCtx.fillRect(sx + (cw + 30) * 2, sy, cw, ch);
    }
    else if (config.layout === 'image' && uploadedImage) {
        drawImageMask(offCtx, uploadedImage, maxUsableWidth, maxUsableHeight, scaleMult);
    }
    else if (config.layout === 'video' && videoReady) {
        vidOff.width = width; vidOff.height = height;
        const vw = videoEl.videoWidth, vh = videoEl.videoHeight;
        if (vw && vh) {
            const ia = vw / vh, ca = maxUsableWidth / maxUsableHeight;
            let dw, dh;
            if (ia > ca) { dw = maxUsableWidth * scaleMult; dh = dw / ia; }
            else { dh = maxUsableHeight * scaleMult; dw = dh * ia; }
            if (dw > maxUsableWidth) { dw = maxUsableWidth; dh = dw / ia; }
            if (dh > maxUsableHeight) { dh = maxUsableHeight; dw = dh * ia; }
            offCtx.drawImage(videoEl, (width - dw) / 2, (height - dh) / 2, dw, dh);
            thresholdMask(offCtx, width, height);
        }
    }

    const imgData = offCtx.getImageData(0, 0, width, height).data;

    buildObjMask();

    for (let y = 0; y < height; y += lineHeight) {
        let rowIntervals = []; let inText = false; let startX = 0;
        for (let x = 0; x < width; x += 1) {
            const hasMask = imgData[(y * width + x) * 4 + 3] > 128;
            const blocked = objMask ? objMask[y * width + x] : false;
            const visible = hasMask && !blocked;
            if (visible) { if (!inText) { inText = true; startX = x; } }
            else if (inText) { inText = false; rowIntervals.push({ start: startX, end: x }); }
        }
        if (inText) rowIntervals.push({ start: startX, end: width });
        if (rowIntervals.length > 0) maskIntervals.push({ y, intervals: rowIntervals });
    }

    maskClipPath = new Path2D();
    maskBBoxX1 = Infinity; maskBBoxX2 = 0;
    for (const row of maskIntervals) {
        for (const iv of row.intervals) {
            maskClipPath.rect(iv.start, row.y, iv.end - iv.start, lineHeight);
            if (iv.start < maskBBoxX1) maskBBoxX1 = iv.start;
            if (iv.end > maskBBoxX2) maskBBoxX2 = iv.end;
        }
    }
}

function drawImageMask(offCtx, img, mw, mh, s) {
    const ia = img.width / img.height, ca = mw / mh;
    let dw, dh;
    if (ia > ca) { dw = mw * s; dh = dw / ia; } else { dh = mh * s; dw = dh * ia; }
    if (dw > mw) { dw = mw; dh = dw / ia; } if (dh > mh) { dh = mh; dw = dh * ia; }
    offCtx.drawImage(img, (width - dw) / 2, (height - dh) / 2, dw, dh);
    thresholdMask(offCtx, width, height);
}

function thresholdMask(offCtx, w, h) {
    const iData = offCtx.getImageData(0, 0, w, h);
    const px = iData.data;
    const thr = config.videoThreshold / 100 * 255;
    for (let p = 0; p < px.length; p += 4) {
        const lum = px[p] * 0.299 + px[p + 1] * 0.587 + px[p + 2] * 0.114;
        px[p + 3] = px[p + 3] < 250 ? px[p + 3] : (lum < thr ? 255 : 0);
    }
    offCtx.putImageData(iData, 0, 0);
}

function buildObjMask() {
    if (sceneObjects.length === 0) { objMask = null; return; }
    objMask = new Uint8Array(width * height);
    const pad = config.objPadding;
    const padSq = pad * pad;

    for (const o of sceneObjects) {
        const oc = document.createElement('canvas');
        const ocW = Math.ceil(o.w), ocH = Math.ceil(o.h);
        oc.width = ocW; oc.height = ocH;
        const octx = oc.getContext('2d', { willReadFrequently: true });
        octx.drawImage(o.img, 0, 0, o.w, o.h);
        const oData = octx.getImageData(0, 0, ocW, ocH).data;

        const opaque = new Uint8Array(ocW * ocH);
        for (let i = 0; i < ocW * ocH; i++) {
            if (oData[i * 4 + 3] > 64) opaque[i] = 1;
        }

        const oxi = Math.floor(o.x), oyi = Math.floor(o.y);
        const x1 = Math.max(0, oxi - pad);
        const y1 = Math.max(0, oyi - pad);
        const x2 = Math.min(width, oxi + ocW + pad);
        const y2 = Math.min(height, oyi + ocH + pad);

        for (let gy = y1; gy < y2; gy++) {
            const ly = gy - oyi;
            for (let gx = x1; gx < x2; gx++) {
                const lx = gx - oxi;

                if (lx >= 0 && lx < ocW && ly >= 0 && ly < ocH && opaque[ly * ocW + lx]) {
                    objMask[gy * width + gx] = 1;
                    continue;
                }

                const sx1 = Math.max(0, lx - pad);
                const sy1 = Math.max(0, ly - pad);
                const sx2 = Math.min(ocW - 1, lx + pad);
                const sy2 = Math.min(ocH - 1, ly + pad);

                let found = false;
                for (let sy = sy1; sy <= sy2 && !found; sy++) {
                    const dyy = ly - sy;
                    const dySq = dyy * dyy;
                    if (dySq > padSq) continue;
                    for (let sx = sx1; sx <= sx2; sx++) {
                        if (opaque[sy * ocW + sx]) {
                            const dxx = lx - sx;
                            if (dxx * dxx + dySq <= padSq) {
                                found = true; break;
                            }
                        }
                    }
                }
                if (found) objMask[gy * width + gx] = 1;
            }
        }
    }
}

let lastVideoRebuild = 0;
let animFrameId = null;

function renderScene(now) {
    ctx.fillStyle = config.bgColor;
    ctx.fillRect(0, 0, width, height);

    // During gap phase — only background + scene objects, no text
    if (animPhase === 'gap') {
        for (const o of sceneObjects) { ctx.drawImage(o.img, o.x, o.y, o.w, o.h); }
        return;
    }

    if (config.layout === 'video' && videoReady || config.layout === 'image' && isAnimatedImage && uploadedImage) {
        if (now - lastVideoRebuild > 66) {
            lastVideoRebuild = now;
            createMask();
        }
    }

    ctx.font = `900 ${config.fillSize}px '${config.fontFill}', sans-serif`;
    ctx.textBaseline = 'top';

    // Compute ease based on current phase
    let ease, glitchPP = false;
    if (animPhase === 'intro') {
        currentAnimType = config.intro;
        let rawP = introProgress;
        // Reverse: intro plays as if it's an outro (1→0 direction)
        if (config.introReverse) rawP = 1 - rawP;
        ease = 1 - Math.pow(1 - rawP, 3);
        ctx.globalAlpha = (config.intro === 'fade') ? rawP : 1;
        if ((config.intro === 'glitch' || config.intro === 'glitch-slam') && introProgress < 1) {
            ctx.globalAlpha = Math.min(1, rawP * 2.5);
            glitchPP = config.intro === 'glitch';
        }
    } else if (animPhase === 'outro') {
        currentAnimType = config.outro;
        let rawP = outroProgress;
        // Normal outro: ease goes 1→0; Reverse: ease goes 0→1
        if (config.outroReverse) {
            ease = 1 - Math.pow(1 - rawP, 3);
            ctx.globalAlpha = (config.outro === 'fade') ? rawP : 1;
        } else {
            const outroEased = 1 - Math.pow(1 - rawP, 3);
            ease = 1 - outroEased;
            ctx.globalAlpha = (config.outro === 'fade') ? (1 - rawP) : 1;
        }
        if ((config.outro === 'glitch' || config.outro === 'glitch-slam') && rawP < 1) {
            ctx.globalAlpha = config.outroReverse ? Math.min(1, rawP * 2.5) : Math.min(1, (1 - rawP) * 2.5);
            glitchPP = config.outro === 'glitch';
        }
    } else {
        currentAnimType = 'none';
        ease = 1;
        ctx.globalAlpha = 1;
    }

    const time = now * 0.0015;
    let charOffsetX = (now - startTime) * 0.01 * (config.speedX / 15);

    let yPixelOffset = 0;
    let needsClip = config.speedY !== 0 && maskClipPath;
    if (config.speedY !== 0) yPixelOffset = (now - startTime) * 0.15 * (config.speedY / 15);

    mouse.radius = config.mouseRadius;

    if (needsClip) { ctx.save(); ctx.clip(maskClipPath); }

    let patternH = maskIntervals.length > 1
        ? maskIntervals[maskIntervals.length - 1].y - maskIntervals[0].y + lineHeight : height;
    if (patternH <= 0) patternH = height;

    const copies = needsClip ? [-1, 0, 1] : [0];

    for (const copy of copies) {
        let yOff = needsClip ? (yPixelOffset % patternH) + copy * patternH : 0;
        const isColumn = config.layout === 'col-single' || config.layout === 'col-narrow' || config.layout === 'col-indep';
        const isShapeMask = needsClip && !isColumn;
        if (config.layout === 'col-indep') {
            const maxCols = Math.max(...maskIntervals.map(r => r.intervals.length));
            let cumCharIdx = Math.floor(charOffsetX);
            for (let col = 0; col < maxCols; col++) {
                for (let i = 0; i < maskIntervals.length; i++) {
                    const row = maskIntervals[i];
                    if (col >= row.intervals.length) continue;
                    const interval = row.intervals[col];
                    let renderY = row.y + yOff;
                    cumCharIdx += drawTextSegment(interval.start, interval.end, renderY, ease, time, cumCharIdx, i);
                }
            }
        } else if (isColumn) {
            let cumCharIdx = Math.floor(charOffsetX);
            for (let i = 0; i < maskIntervals.length; i++) {
                const row = maskIntervals[i];
                let renderY = row.y + yOff;
                for (let j = 0; j < row.intervals.length; j++) {
                    cumCharIdx += drawTextSegment(row.intervals[j].start, row.intervals[j].end, renderY, ease, time, cumCharIdx, i);
                }
            }
        } else {
            for (let i = 0; i < maskIntervals.length; i++) {
                const row = maskIntervals[i];
                let renderY = row.y + yOff;
                if (renderY < -lineHeight || renderY > height + lineHeight) continue;
                let rowCharIndex = Math.floor(charOffsetX + (i * 23));
                if (isShapeMask) {
                    drawTextSegment(maskBBoxX1, maskBBoxX2, renderY, ease, time, rowCharIndex, i);
                } else {
                    for (let j = 0; j < row.intervals.length; j++) {
                        rowCharIndex += drawTextSegment(row.intervals[j].start, row.intervals[j].end, renderY, ease, time, rowCharIndex, i);
                    }
                }
            }
        }
    }

    if (needsClip) ctx.restore();

    // Glitch post-process for both glitch and glitch-slam
    const isGlitchType = currentAnimType === 'glitch' || currentAnimType === 'glitch-slam';
    if (isGlitchType && ((animPhase === 'intro' && introProgress < 1) || (animPhase === 'outro' && outroProgress < 1))) {
        const gpProgress = animPhase === 'intro' ? introProgress : outroProgress;
        const gpDir = (animPhase === 'intro' && !config.introReverse) || (animPhase === 'outro' && config.outroReverse);
        const gpVal = gpDir ? gpProgress : (1 - gpProgress);
        applyGlitchPostProcess(gpVal, currentAnimType === 'glitch-slam');
    }

    for (const o of sceneObjects) {
        ctx.drawImage(o.img, o.x, o.y, o.w, o.h);
    }

    ctx.globalAlpha = 1;
}

function getTotalCycleDur() {
    let total = config.mainDur + (config.gapDur || 0);
    if (config.intro !== 'none') total += config.introDur;
    if (config.outro !== 'none') total += config.outroDur;
    return Math.max(0.5, total);
}

function advancePhase(now) {
    const elapsed = (now - phaseStart) / 1000;

    if (animPhase === 'gap') {
        if (elapsed >= (config.gapDur || 0)) {
            animPhase = 'intro';
            phaseStart = now;
            startTime = now;
        }
    } else if (animPhase === 'intro') {
        if (config.intro === 'none') {
            introProgress = 1;
            animPhase = 'main';
            phaseStart = now;
        } else {
            introProgress = Math.min(1, elapsed / Math.max(0.1, config.introDur));
            if (introProgress >= 1) {
                introProgress = 1;
                animPhase = 'main';
                phaseStart = now;
            }
        }
    } else if (animPhase === 'main') {
        introProgress = 1;
        outroProgress = 0;
        if (elapsed >= config.mainDur) {
            if (config.outro === 'none') {
                resetAnimation(now);
            } else {
                animPhase = 'outro';
                phaseStart = now;
            }
        }
    } else if (animPhase === 'outro') {
        if (config.outro === 'none') {
            resetAnimation(now);
        } else {
            outroProgress = Math.min(1, elapsed / Math.max(0.1, config.outroDur));
            if (outroProgress >= 1) {
                resetAnimation(now);
            }
        }
    }
}

function animate() {
    const now = Date.now();
    advancePhase(now);
    renderScene(now);
    animFrameId = requestAnimationFrame(animate);
}

function applyGlitchPostProcess(progress, isSlam) {
    const baseIntensity = Math.pow(1 - progress, 2);
    const intensity = isSlam ? Math.min(1, baseIntensity * 2.5) : baseIntensity;
    if (intensity < 0.01) return;

    const gc = config.glitchColor || '#ff0040';
    const gR = parseInt(gc.slice(1, 3), 16);
    const gG = parseInt(gc.slice(3, 5), 16);
    const gB = parseInt(gc.slice(5, 7), 16);

    const imgData = ctx.getImageData(0, 0, width, height);

    // RGB channel shift — more aggressive for slam
    const rgbShift = Math.floor(intensity * (isSlam ? 30 : 15) + Math.random() * intensity * (isSlam ? 20 : 10));
    if (rgbShift > 0) {
        const copy = new Uint8ClampedArray(imgData.data);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const idx = (y * width + x) * 4;
                const srcR = Math.min(width - 1, x + rgbShift);
                imgData.data[idx] = copy[(y * width + srcR) * 4];
                const srcB = Math.max(0, x - rgbShift);
                imgData.data[idx + 2] = copy[(y * width + srcB) * 4 + 2];
            }
        }
    }

    // Horizontal slice displacement — bigger & more slices for slam
    const numSlices = Math.floor(intensity * (isSlam ? 15 : 8) + Math.random() * (isSlam ? 10 : 6));
    for (let s = 0; s < numSlices; s++) {
        const sliceY = Math.floor(Math.random() * height);
        const sliceH = Math.floor(Math.random() * (isSlam ? 40 : 20) * intensity + 2);
        const shift = Math.floor((Math.random() - 0.5) * intensity * (isSlam ? 160 : 80));
        if (Math.abs(shift) < 1) continue;
        for (let y = sliceY; y < Math.min(height, sliceY + sliceH); y++) {
            const rowStart = y * width * 4;
            const rowCopy = new Uint8ClampedArray(width * 4);
            rowCopy.set(imgData.data.subarray(rowStart, rowStart + width * 4));
            for (let x = 0; x < width; x++) {
                const srcX = x - shift;
                const dstIdx = rowStart + x * 4;
                if (srcX >= 0 && srcX < width) {
                    const srcIdx = srcX * 4;
                    imgData.data[dstIdx] = rowCopy[srcIdx];
                    imgData.data[dstIdx + 1] = rowCopy[srcIdx + 1];
                    imgData.data[dstIdx + 2] = rowCopy[srcIdx + 2];
                    imgData.data[dstIdx + 3] = rowCopy[srcIdx + 3];
                }
            }
        }
    }

    // Colored glitch blocks — Watch Dogs / Cyberpunk style
    if (isSlam && intensity > 0.1) {
        const blockCount = Math.floor(intensity * 12 + Math.random() * 8);
        for (let b = 0; b < blockCount; b++) {
            const bx = Math.floor(Math.random() * width);
            const by = Math.floor(Math.random() * height);
            const bw = Math.floor(Math.random() * 80 * intensity + 10);
            const bh = Math.floor(Math.random() * 12 * intensity + 2);
            const alpha = intensity * (0.3 + Math.random() * 0.5);
            for (let py = by; py < Math.min(height, by + bh); py++) {
                for (let px = bx; px < Math.min(width, bx + bw); px++) {
                    const idx = (py * width + px) * 4;
                    imgData.data[idx] = Math.floor(imgData.data[idx] * (1 - alpha) + gR * alpha);
                    imgData.data[idx + 1] = Math.floor(imgData.data[idx + 1] * (1 - alpha) + gG * alpha);
                    imgData.data[idx + 2] = Math.floor(imgData.data[idx + 2] * (1 - alpha) + gB * alpha);
                }
            }
        }
    }

    // Scanlines
    const scanOpacity = intensity * (isSlam ? 0.5 : 0.3);
    for (let y = 0; y < height; y += (isSlam ? 2 : 3)) {
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            imgData.data[idx] = Math.floor(imgData.data[idx] * (1 - scanOpacity));
            imgData.data[idx + 1] = Math.floor(imgData.data[idx + 1] * (1 - scanOpacity));
            imgData.data[idx + 2] = Math.floor(imgData.data[idx + 2] * (1 - scanOpacity));
        }
    }

    ctx.putImageData(imgData, 0, 0);

    // Colored flash lines
    const flashChance = isSlam ? 0.8 : 0.6;
    if (Math.random() < intensity * flashChance) {
        ctx.save();
        ctx.globalAlpha = intensity * (isSlam ? 0.35 : 0.15);
        ctx.fillStyle = gc;
        const lineY = Math.floor(Math.random() * height);
        const lineH = Math.floor(Math.random() * (isSlam ? 8 : 4) + 1);
        ctx.fillRect(0, lineY, width, lineH);
        ctx.restore();
    }

    // Full-screen color flash on high intensity
    if (isSlam && intensity > 0.5 && Math.random() < 0.3) {
        ctx.save();
        ctx.globalAlpha = intensity * 0.1;
        ctx.fillStyle = gc;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    }
}

function drawTextSegment(startX, endX, targetY, ease, time, startIndex, rowIndex) {
    ctx.fillStyle = config.textColor;
    let currentX = startX;
    let charIndex = startIndex;
    const text = config.fillText || "SEVERYAN";
    const textLen = text.length;
    const centerX = width / 2;
    const centerY = height / 2;
    const forceMult = config.mouseForce / 100;

    while (currentX < endX) {
        const safeIndex = ((charIndex % textLen) + textLen) % textLen;
        const char = text[safeIndex];
        const charW = charWidths[char] || 8;
        if (currentX + charW > endX) break;

        if (char !== ' ') {
            const seed = rowIndex * 1000 + Math.abs(charIndex);
            let drawX = currentX, drawY = targetY;

            if (currentAnimType === 'explosion') {
                const nX = Math.sin(seed * 12.9898) * 43758.5453, rDX = (nX - Math.floor(nX) - 0.5) * 2.5;
                const nY = Math.sin(seed * 78.233) * 23421.134, rDY = (nY - Math.floor(nY)) * -1.2;
                const sp = 800, ctX = centerX + rDX * sp, ctY = centerY + rDY * sp - 100;
                const t = ease, t1 = 1 - t;
                drawX = t1 * t1 * centerX + 2 * t1 * t * ctX + t * t * currentX;
                drawY = t1 * t1 * centerY + 2 * t1 * t * ctY + t * t * targetY;
            } else if (currentAnimType === 'tape') {
                drawX = currentX + (1 - ease) * (-width);
                drawY = targetY + Math.sin(currentX * 0.01 + ease * 10) * (1 - ease) * 200;
            } else if (currentAnimType === 'drop') {
                drawY = targetY - Math.pow(1 - ease, 2) * (height + 200);
            } else if (currentAnimType === 'spin') {
                const dx = currentX - centerX, dy = targetY - centerY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) + (1 - ease) * 10;
                const radius = dist + Math.pow(1 - ease, 3) * 1000;
                drawX = centerX + Math.cos(angle) * radius;
                drawY = centerY + Math.sin(angle) * radius;
            } else if (currentAnimType === 'glitch') {
                const glitchIntensity = Math.pow(1 - ease, 2);
                const band = Math.floor(targetY / 30);
                const bandSeed = Math.sin(band * 45.17 + Math.floor(time * 8)) * 9999;
                const bandShift = (bandSeed - Math.floor(bandSeed) - 0.5) * 2;
                drawX = currentX + bandShift * glitchIntensity * 60;
                const vJitter = Math.sin(seed * 33.33 + Math.floor(time * 12)) * glitchIntensity * 15;
                drawY = targetY + vJitter;
                if (Math.random() < glitchIntensity * 0.3) {
                    currentX += charW;
                    charIndex++;
                    continue;
                }
            } else if (currentAnimType === 'glitch-slam') {
                // Cinematic glitch slam: short flash → blackout → bigger flash → blackout → full slam
                // Timeline on ease 0→1:
                // 0.00-0.08: quick flash (tiny peek)
                // 0.08-0.20: blackout with scattered artifacts
                // 0.20-0.38: bigger flash with heavy distortion
                // 0.38-0.50: blackout with RGB bugs
                // 0.50-0.72: full slam in with medium glitch
                // 0.72-0.85: settling with light jitter
                // 0.85-1.00: clean
                if (ease < 0.08) {
                    // Quick flash — only show ~30% of chars with huge offset
                    if (Math.random() > 0.3) { currentX += charW; charIndex++; continue; }
                    drawX = currentX + (Math.random() - 0.5) * 200;
                    drawY = targetY + (Math.random() - 0.5) * 60;
                } else if (ease < 0.20) {
                    // Blackout — almost nothing, just scattered artifact chars
                    if (Math.random() > 0.05) { currentX += charW; charIndex++; continue; }
                    drawX = currentX + (Math.random() - 0.5) * 300;
                    drawY = targetY + (Math.random() - 0.5) * 100;
                } else if (ease < 0.38) {
                    // Bigger flash — show ~60% of chars, heavy horizontal bands
                    const localE = (ease - 0.20) / 0.18;
                    if (Math.random() > 0.4 + localE * 0.2) { currentX += charW; charIndex++; continue; }
                    const band = Math.floor(targetY / 15);
                    const bs = Math.sin(band * 89.3 + Math.floor(time * 20)) * 9999;
                    drawX = currentX + (bs - Math.floor(bs) - 0.5) * 150 * (1 - localE * 0.5);
                    drawY = targetY + Math.sin(seed * 53.7 + Math.floor(time * 15)) * 25 * (1 - localE);
                } else if (ease < 0.50) {
                    // Second blackout — scattered RGB artifacts only
                    if (Math.random() > 0.08) { currentX += charW; charIndex++; continue; }
                    drawX = currentX + (Math.random() - 0.5) * 250;
                    drawY = targetY + (Math.random() - 0.5) * 80;
                } else if (ease < 0.72) {
                    // Full slam — text mostly visible, medium distortion
                    const localE = (ease - 0.50) / 0.22;
                    const gI = Math.pow(1 - localE, 2);
                    if (Math.random() < gI * 0.15) { currentX += charW; charIndex++; continue; }
                    const band = Math.floor(targetY / 25);
                    const bs = Math.sin(band * 37.9 + Math.floor(time * 12)) * 9999;
                    drawX = currentX + (bs - Math.floor(bs) - 0.5) * gI * 80;
                    drawY = targetY + Math.sin(seed * 29.3 + Math.floor(time * 10)) * gI * 18;
                } else if (ease < 0.85) {
                    // Settling — light jitter
                    const gI = Math.pow((0.85 - ease) / 0.13, 2) * 0.3;
                    const band = Math.floor(targetY / 40);
                    const bs = Math.sin(band * 19.7 + Math.floor(time * 8)) * 9999;
                    drawX = currentX + (bs - Math.floor(bs) - 0.5) * gI * 30;
                    drawY = targetY + Math.sin(seed * 17.1 + time * 6) * gI * 6;
                }
                // 0.85-1.0: clean, drawX/drawY stay at currentX/targetY
            }

            let idleX = 0, idleY = 0;
            if (config.idle === 'wave') {
                idleX = Math.cos(time + currentX * 0.01) * 1.5 * ease;
                idleY = Math.sin(time + currentX * 0.015) * 3 * ease;
            } else if (config.idle === 'pulse') {
                const pdx = currentX - width / 2, pdy = targetY - height / 2;
                const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
                const pw = Math.sin(time * 3 - pdist * 0.01) * 3 * ease;
                idleX = pdist > 0 ? (pdx / pdist) * pw : 0;
                idleY = pdist > 0 ? (pdy / pdist) * pw : 0;
            } else if (config.idle === 'glitch') {
                if (Math.random() > 0.95) { idleX = (Math.random() - 0.5) * 10; idleY = (Math.random() - 0.5) * 10; }
            } else if (config.idle === 'lens') {
                const lensX = width / 2 + Math.cos(time * 0.4) * width * 0.25;
                const lensY = height / 2 + Math.sin(time * 0.6) * height * 0.25;
                const lensR = 120;
                const ldx = currentX - lensX, ldy = targetY - lensY;
                const ldist = Math.sqrt(ldx * ldx + ldy * ldy);
                if (ldist < lensR && ldist > 0) {
                    const f = Math.pow(1 - ldist / lensR, 2) * 12 * ease;
                    idleX = (ldx / ldist) * f; idleY = (ldy / ldist) * f;
                }
            } else if (config.idle === 'liquid') {
                const w1 = Math.sin(time * 1.5 + currentX * 0.008 + targetY * 0.006) * 4;
                const w2 = Math.cos(time * 0.7 + currentX * 0.012 - targetY * 0.008) * 3;
                const w3 = Math.sin(time * 2.3 - currentX * 0.005 + targetY * 0.01) * 2;
                idleX = (w1 + w2 * 0.5) * ease; idleY = (w2 + w3) * ease;
            }

            let mouseX = 0, mouseY = 0;
            const actualX = drawX + idleX, actualY = drawY + idleY;
            const dx = actualX - mouse.x, dy = actualY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            let renderChar = true;

            if (dist < mouse.radius && dist > 0.1) {
                const force = Math.pow((mouse.radius - dist) / mouse.radius, 2);
                if (config.mouseFX === 'repel') {
                    mouseX = (dx / dist) * force * 50 * forceMult; mouseY = (dy / dist) * force * 50 * forceMult;
                } else if (config.mouseFX === 'gravity') {
                    mouseX = -(dx / dist) * force * 30 * forceMult; mouseY = -(dy / dist) * force * 30 * forceMult;
                } else if (config.mouseFX === 'vortex') {
                    const angle = Math.atan2(dy, dx) + Math.PI / 2;
                    mouseX = Math.cos(angle) * force * 50 * forceMult; mouseY = Math.sin(angle) * force * 50 * forceMult;
                }
            }
            if (config.mouseFX === 'flashlight' && dist > mouse.radius) renderChar = false;

            if (renderChar && objMask) {
                const rx = Math.round(actualX + mouseX), ry = Math.round(actualY + mouseY);
                if (rx >= 0 && rx < width && ry >= 0 && ry < height && objMask[ry * width + rx]) renderChar = false;
            }

            if (renderChar) ctx.fillText(char, actualX + mouseX, actualY + mouseY);
        }
        currentX += charW;
        charIndex++;
    }
    return charIndex - startIndex;
}

const exportModal = document.getElementById('exportModal');
const exportCode = document.getElementById('exportCode');

document.getElementById('exportOpenBtn').addEventListener('click', () => {
    exportCode.value = generateExportHTML();
    exportModal.classList.add('active');
    if (typeof updateRecInfo === 'function') updateRecInfo();
});
document.getElementById('modalClose').addEventListener('click', () => exportModal.classList.remove('active'));
exportModal.addEventListener('click', e => { if (e.target === exportModal) exportModal.classList.remove('active'); });

document.querySelectorAll('.export-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.export-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.export-tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab === 'code' ? 'tabCode' : 'tabGif').classList.add('active');
    });
});

document.getElementById('copyCodeBtn').addEventListener('click', () => {
    exportCode.select();
    navigator.clipboard.writeText(exportCode.value);
    const btn = document.getElementById('copyCodeBtn');
    btn.textContent = 'Скопировано!';
    setTimeout(() => btn.textContent = 'Скопировать код', 1500);
});

document.getElementById('downloadHtmlBtn').addEventListener('click', () => {
    const blob = new Blob([exportCode.value], { type: 'text/html;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'pretext-effect.html';
    a.click();
    URL.revokeObjectURL(a.href);
});

let gifWorkerUrl = null;
fetch('https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js')
    .then(r => r.text())
    .then(code => {
        gifWorkerUrl = URL.createObjectURL(new Blob([code], { type: 'application/javascript' }));
    })
    .catch(() => { console.warn('gif.worker.js preload failed, will retry on export'); });

// Toggle GIF scale vs video quality + update info
function updateRecInfo() {
    const format = document.getElementById('recFormat').value;
    const isGif = format === 'gif';
    document.getElementById('grpQuality').style.display = isGif ? 'none' : '';
    document.getElementById('grpScale').style.display = isGif ? '' : 'none';
    const duration = parseFloat(document.getElementById('recDuration').value) || 5;
    const fps = parseInt(document.getElementById('recFps').value) || 30;
    const totalFrames = Math.round(duration * fps);
    const cycleDur = getTotalCycleDur();
    const cycles = (duration / cycleDur).toFixed(1);
    document.getElementById('recInfo').textContent =
        `${totalFrames} кадров | ${fps} FPS | ${duration}с | ~${cycles} циклов (цикл ${cycleDur.toFixed(1)}с)`;
}
document.getElementById('recFormat').addEventListener('change', updateRecInfo);
document.getElementById('recDuration').addEventListener('input', updateRecInfo);
document.getElementById('recFps').addEventListener('change', updateRecInfo);

document.getElementById('gifBtn').addEventListener('click', async () => {
    const gifBtn = document.getElementById('gifBtn');
    if (gifBtn.disabled) return;
    gifBtn.disabled = true;

    const format = document.getElementById('recFormat').value;
    const quality = document.getElementById('recQuality').value;
    const progressArea = document.getElementById('gifProgressArea');
    const progressFill = document.getElementById('gifProgressFill');
    const progressText = document.getElementById('gifProgressText');
    progressArea.style.display = 'block';
    progressFill.style.width = '0%';
    progressText.textContent = 'Подготовка...';

    exportModal.classList.remove('active');

    const duration = parseFloat(document.getElementById('recDuration').value) || 5;
    const fps = parseInt(document.getElementById('recFps').value) || 30;
    const totalFrames = Math.round(duration * fps);
    const delay = Math.round(1000 / fps); // ms per frame

    // Save mouse and stop live loop
    const savedMouse = { x: mouse.x, y: mouse.y };
    mouse.x = -9999; mouse.y = -9999;
    cancelAnimationFrame(animFrameId);

    function reopenModal() {
        exportModal.classList.add('active');
        document.querySelectorAll('.export-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.export-tab-content').forEach(c => c.classList.remove('active'));
        document.querySelector('.export-tab[data-tab="gif"]').classList.add('active');
        document.getElementById('tabGif').classList.add('active');
    }

    function restoreAndFinish(message) {
        mouse.x = savedMouse.x; mouse.y = savedMouse.y;
        resetAnimation();
        animate();
        reopenModal();
        progressFill.style.width = '100%';
        progressText.textContent = message;
        gifBtn.disabled = false;
        setTimeout(() => { progressArea.style.display = 'none'; }, 2500);
    }

    // === Virtual-time frame-by-frame rendering ===
    const virtualStart = Date.now();
    resetAnimation(virtualStart);

    const srcW = canvas.width, srcH = canvas.height;
    const gifScale = format === 'gif' ? parseFloat(document.getElementById('recScale').value) || 0.5 : 1;
    const outW = Math.round(srcW * gifScale);
    const outH = Math.round(srcH * gifScale);

    const offCanvas = document.createElement('canvas');
    offCanvas.width = outW;
    offCanvas.height = outH;
    const offCtx2 = offCanvas.getContext('2d');

    const frames = [];
    progressText.textContent = 'Рендер кадров...';

    for (let i = 0; i < totalFrames; i++) {
        const virtualNow = virtualStart + i * delay;
        advancePhase(virtualNow);
        renderScene(virtualNow);

        offCtx2.clearRect(0, 0, outW, outH);
        offCtx2.drawImage(canvas, 0, 0, outW, outH);
        frames.push(offCtx2.getImageData(0, 0, outW, outH));

        if (i % 5 === 0) {
            const pct = Math.round(((i + 1) / totalFrames) * 35);
            progressFill.style.width = pct + '%';
            progressText.textContent = `Рендер: ${i + 1}/${totalFrames}`;
            await new Promise(r => setTimeout(r, 0));
        }
    }

    progressFill.style.width = '40%';

    if (format === 'gif') {
        // === GIF ENCODING ===
        if (!gifWorkerUrl) {
            try {
                const code = await fetch('https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js').then(r => r.text());
                gifWorkerUrl = URL.createObjectURL(new Blob([code], { type: 'application/javascript' }));
            } catch (e) {
                alert('Не удалось загрузить gif.worker.js.');
                restoreAndFinish('Ошибка загрузки воркера');
                return;
            }
        }

        reopenModal();
        progressArea.style.display = 'block';
        progressText.textContent = 'Кодирование GIF...';

        const gif = new GIF({
            workers: navigator.hardwareConcurrency || 4,
            workerScript: gifWorkerUrl,
            width: outW, height: outH,
            quality: 10, repeat: 0
        });

        for (let i = 0; i < frames.length; i++) {
            gif.addFrame(frames[i], { delay: delay });
        }

        gif.on('progress', p => {
            const pct = 40 + Math.round(p * 60);
            progressFill.style.width = pct + '%';
            progressText.textContent = `Кодирование: ${Math.round(p * 100)}%`;
        });

        gif.on('finished', blob => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'pretext-animation.gif';
            a.click();
            URL.revokeObjectURL(a.href);
            frames.length = 0;
            restoreAndFinish('Готово! GIF скачан.');
        });

        gif.render();

    } else if (format === 'mp4') {
        // === MP4 ENCODING via WebCodecs + mp4-muxer ===
        reopenModal();
        progressArea.style.display = 'block';

        if (typeof VideoEncoder === 'undefined') {
            alert('Ваш браузер не поддерживает WebCodecs (нужен Chrome/Edge 94+). Попробуйте WebM.');
            restoreAndFinish('WebCodecs не поддерживается');
            return;
        }

        progressText.textContent = 'Загрузка MP4 кодировщика...';

        let Mp4Muxer;
        const cdnUrls = [
            'https://cdn.jsdelivr.net/npm/mp4-muxer@5/build/mp4-muxer.min.mjs',
            'https://cdn.jsdelivr.net/npm/mp4-muxer@5/+esm',
            'https://esm.sh/mp4-muxer@5'
        ];
        for (const url of cdnUrls) {
            try { Mp4Muxer = await import(url); break; }
            catch (e) { console.warn('mp4-muxer load failed from', url, e); }
        }
        if (!Mp4Muxer) {
            alert('Не удалось загрузить mp4-muxer. Проверьте интернет или попробуйте WebM/GIF.');
            restoreAndFinish('Ошибка загрузки mp4-muxer');
            return;
        }

        // H264 requires even dimensions
        const encW = outW % 2 === 0 ? outW : outW + 1;
        const encH = outH % 2 === 0 ? outH : outH + 1;

        const vidCanvas = document.createElement('canvas');
        vidCanvas.width = encW;
        vidCanvas.height = encH;
        const vidCtx2 = vidCanvas.getContext('2d');

        const bpsMap = { medium: 5000000, high: 10000000, max: 20000000 };
        const bitrate = bpsMap[quality] || 10000000;

        const muxer = new Mp4Muxer.Muxer({
            target: new Mp4Muxer.ArrayBufferTarget(),
            video: {
                codec: 'avc',
                width: encW,
                height: encH
            },
            fastStart: 'in-memory'
        });

        let encoderError = null;
        const encoder = new VideoEncoder({
            output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
            error: e => { encoderError = e; console.error('VideoEncoder error:', e); }
        });

        // Try High profile, then Main, then Baseline
        const codecsToTry = ['avc1.640028', 'avc1.4d0028', 'avc1.42001f'];
        let configured = false;
        for (const codecStr of codecsToTry) {
            try {
                const testCfg = { codec: codecStr, width: encW, height: encH, bitrate, framerate: fps };
                const support = await VideoEncoder.isConfigSupported(testCfg);
                if (support.supported) {
                    encoder.configure(testCfg);
                    configured = true;
                    break;
                }
            } catch (e) { continue; }
        }
        if (!configured) {
            alert('H264 кодек не поддерживается. Попробуйте WebM.');
            restoreAndFinish('H264 не поддерживается');
            return;
        }

        const frameDurationUs = Math.round(1000000 / fps);
        progressText.textContent = 'Кодирование MP4...';

        for (let i = 0; i < frames.length; i++) {
            if (encoderError) break;

            vidCtx2.fillStyle = config.bgColor;
            vidCtx2.fillRect(0, 0, encW, encH);
            vidCtx2.putImageData(frames[i], 0, 0);

            const vf = new VideoFrame(vidCanvas, {
                timestamp: i * frameDurationUs,
                duration: frameDurationUs
            });
            encoder.encode(vf, { keyFrame: i % (fps * 2) === 0 });
            vf.close();

            if (i % 10 === 0) {
                const pct = 40 + Math.round(((i + 1) / frames.length) * 55);
                progressFill.style.width = pct + '%';
                progressText.textContent = `MP4: ${i + 1}/${frames.length}`;
                await new Promise(r => setTimeout(r, 0));
            }
        }

        if (encoderError) {
            restoreAndFinish('Ошибка кодирования: ' + encoderError.message);
            return;
        }

        await encoder.flush();
        encoder.close();
        muxer.finalize();

        const buf = muxer.target.buffer;
        const blob = new Blob([buf], { type: 'video/mp4' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'pretext-animation.mp4';
        a.click();
        URL.revokeObjectURL(a.href);
        frames.length = 0;

        restoreAndFinish('Готово! MP4 скачано.');

    } else {
        // === WEBM ENCODING via MediaRecorder ===
        progressText.textContent = 'Кодирование видео...';
        reopenModal();
        progressArea.style.display = 'block';

        const vidCanvas = document.createElement('canvas');
        vidCanvas.width = outW;
        vidCanvas.height = outH;
        const vidCtx2 = vidCanvas.getContext('2d');

        const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
            ? 'video/webm;codecs=vp9' : 'video/webm;codecs=vp8';

        const bpsMap = { medium: 5000000, high: 10000000, max: 20000000 };
        const stream = vidCanvas.captureStream(0);
        const recorder = new MediaRecorder(stream, {
            mimeType: mimeType,
            videoBitsPerSecond: bpsMap[quality] || 10000000
        });
        const chunks = [];
        recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };

        recorder.start();

        const track = stream.getVideoTracks()[0];
        for (let i = 0; i < frames.length; i++) {
            vidCtx2.putImageData(frames[i], 0, 0);
            if (track.requestFrame) {
                track.requestFrame();
            }
            // Small yield to let MediaRecorder process the frame
            await new Promise(r => setTimeout(r, 16));

            if (i % 10 === 0) {
                const pct = 40 + Math.round(((i + 1) / frames.length) * 55);
                progressFill.style.width = pct + '%';
                progressText.textContent = `WebM: ${i + 1}/${frames.length}`;
            }
        }

        recorder.stop();
        await new Promise(r => { recorder.onstop = r; });

        const blob = new Blob(chunks, { type: mimeType });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'pretext-animation.webm';
        a.click();
        URL.revokeObjectURL(a.href);
        frames.length = 0;

        restoreAndFinish('Готово! WebM скачано.');
    }
});

function getImageBase64(img) {
    if (!img) return null;
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    c.getContext('2d').drawImage(img, 0, 0);
    return c.toDataURL('image/png');
}

function generateExportHTML() {
    const bg = config.bgColor;
    const fg = config.textColor;
    const imgB64 = config.layout === 'image' ? getImageBase64(uploadedImage) : null;
    const vidB64 = config.layout === 'video' ? videoBase64 : null;

    const objsData = sceneObjects.map(o => ({
        src: getImageBase64(o.img), x: o.x, y: o.y, w: o.w, h: o.h
    }));

    const cfgStr = JSON.stringify({
        mask: config.mask, mask2: config.mask2, fillText: config.fillText || 'SEVERYAN',
        fontMask: config.fontMask, fontFill: config.fontFill, layout: config.layout,
        intro: config.intro, idle: config.idle, outro: config.outro, mouseFX: config.mouseFX,
        scale: config.scale, scale2: config.scale2,
        introDur: config.introDur, mainDur: config.mainDur, outroDur: config.outroDur,
        introReverse: config.introReverse, outroReverse: config.outroReverse,
        speedX: config.speedX, speedY: config.speedY,
        bgColor: bg, textColor: fg, fillSize: config.fillSize,
        glitchColor: config.glitchColor,
        mouseRadius: config.mouseRadius, mouseForce: config.mouseForce,
        videoThreshold: config.videoThreshold, objPadding: config.objPadding,
        imgData: imgB64, videoData: vidB64, objects: objsData
    }, null, 2);

    return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PreText Effect</title>
<link href="https://fonts.googleapis.com/css2?family=${config.fontMask}:wght@900&family=${config.fontFill}:wght@900&display=swap" rel="stylesheet">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: ${bg}; overflow: hidden; }
canvas { display: block; width: 100vw; height: 100vh; }
</style>
</head>
<body>
<canvas id="canvas"></canvas>
<script>
var cfg = ${cfgStr};
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d", { willReadFrequently: true });
var W, H, maskI = [], clipP = null, cW = {}, LH = Math.round((cfg.fillSize || 14) * 1.15), bbX1 = 0, bbX2 = 0;
var startT = Date.now(), introP = 0, outroP = 0;
var animPh = "intro", phStart = Date.now(), curAT = cfg.intro;
var mouse = { x: -1000, y: -1000, radius: cfg.mouseRadius };
var scObjs = [], objM = null;
function resetAnim(n) { var t = n || Date.now(); animPh = "intro"; introP = 0; outroP = 0; phStart = t; startT = t; }

canvas.addEventListener("mousemove", function(e) {
    var r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
});
canvas.addEventListener("mouseleave", function() { mouse.x = -1000; mouse.y = -1000; });

function initCC() {
    ctx.font = "900 " + (cfg.fillSize || 14) + "px '" + cfg.fontFill + "', sans-serif"; cW = {};
    var t = cfg.fillText || "SEVERYAN", chars = Array.from(new Set(t + " "));
    for (var i = 0; i < chars.length; i++) cW[chars[i]] = ctx.measureText(chars[i]).width;
}

var loadedImg = null;
var vidEl = null, vidReady = false;
function loadAssets(cb) {
    var pending = 1;
    function done() { if (--pending === 0) cb(); }
    if (cfg.imgData) { pending++; loadedImg = new Image(); loadedImg.onload = done; loadedImg.src = cfg.imgData; }
    if (cfg.videoData) {
        pending++;
        vidEl = document.createElement("video");
        vidEl.muted = true; vidEl.loop = true; vidEl.playsInline = true;
        vidEl.oncanplay = function() { vidReady = true; vidEl.play(); done(); };
        vidEl.src = cfg.videoData;
    }
    if (cfg.objects && cfg.objects.length) {
        for (var i = 0; i < cfg.objects.length; i++) { (function(od) {
            pending++; var im = new Image(); im.onload = function() {
                scObjs.push({ img: im, x: od.x, y: od.y, w: od.w, h: od.h }); done();
            }; im.src = od.src;
        })(cfg.objects[i]); }
    }
    done();
}

function resize() { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; initCC(); createMask(); }
window.addEventListener("resize", resize);

function buildOM() {
    if (!scObjs.length) { objM = null; return; }
    objM = new Uint8Array(W * H); var pad = cfg.objPadding, padSq = pad * pad;
    for (var oi = 0; oi < scObjs.length; oi++) {
        var o = scObjs[oi];
        var oc = document.createElement("canvas");
        var ocW = Math.ceil(o.w), ocH = Math.ceil(o.h);
        oc.width = ocW; oc.height = ocH;
        var octx = oc.getContext("2d", { willReadFrequently: true });
        octx.drawImage(o.img, 0, 0, o.w, o.h);
        var oD = octx.getImageData(0, 0, ocW, ocH).data;
        var opq = new Uint8Array(ocW * ocH);
        for (var i = 0; i < ocW * ocH; i++) { if (oD[i * 4 + 3] > 64) opq[i] = 1; }
        var oxi = Math.floor(o.x), oyi = Math.floor(o.y);
        var x1 = Math.max(0, oxi - pad), y1 = Math.max(0, oyi - pad);
        var x2 = Math.min(W, oxi + ocW + pad), y2 = Math.min(H, oyi + ocH + pad);
        for (var gy = y1; gy < y2; gy++) { var ly = gy - oyi;
            for (var gx = x1; gx < x2; gx++) { var lx = gx - oxi;
                if (lx >= 0 && lx < ocW && ly >= 0 && ly < ocH && opq[ly * ocW + lx]) { objM[gy * W + gx] = 1; continue; }
                var sx1 = Math.max(0, lx - pad), sy1 = Math.max(0, ly - pad);
                var sx2 = Math.min(ocW - 1, lx + pad), sy2 = Math.min(ocH - 1, ly + pad);
                var found = false;
                for (var sy = sy1; sy <= sy2 && !found; sy++) { var dyy = ly - sy, dySq = dyy * dyy;
                    if (dySq > padSq) continue;
                    for (var sx = sx1; sx <= sx2; sx++) { if (opq[sy * ocW + sx]) { var dxx = lx - sx;
                        if (dxx * dxx + dySq <= padSq) { found = true; break; } } } }
                if (found) objM[gy * W + gx] = 1;
            }
        }
    }
}

function createMask() {
    if (!W || !H) return; maskI = [];
    var o = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    o.canvas.width = W; o.canvas.height = H; o.fillStyle = "#000";
    var pX = 40, mW = W - pX * 2, mH = H - pX * 2, s = cfg.scale / 100, s2 = cfg.scale2 / 100;
    if (cfg.layout === "center") {
        o.textAlign = "center"; o.textBaseline = "middle";
        var fs = 300 * s; o.font = "900 " + fs + "px '" + cfg.fontMask + "', sans-serif";
        var m = o.measureText(cfg.mask); if (m.width > mW) { fs *= mW / m.width; o.font = "900 " + fs + "px '" + cfg.fontMask + "', sans-serif"; }
        o.fillText(cfg.mask, W / 2, H / 2);
    } else if (cfg.layout === "center2") {
        o.textAlign = "center"; o.textBaseline = "middle";
        var f1 = 300 * s; o.font = "900 " + f1 + "px '" + cfg.fontMask + "', sans-serif";
        var m1 = o.measureText(cfg.mask); if (m1.width > mW) f1 *= mW / m1.width;
        var f2 = 300 * s2; o.font = "900 " + f2 + "px '" + cfg.fontMask + "', sans-serif";
        var m2 = o.measureText(cfg.mask2); if (m2.width > mW) f2 *= mW / m2.width;
        var gap = 20, sY = (H / 2) - (f1 + f2 + gap) / 2;
        o.font = "900 " + f1 + "px '" + cfg.fontMask + "', sans-serif"; o.fillText(cfg.mask, W / 2, sY + f1 / 2);
        o.font = "900 " + f2 + "px '" + cfg.fontMask + "', sans-serif"; o.fillText(cfg.mask2, W / 2, sY + f1 + gap + f2 / 2);
    } else if (cfg.layout === "col-single") {
        var tw = Math.min(mW * 0.7 * s, mW), ch = Math.min(H * 0.75 * s, mH); o.fillRect((W - tw) / 2, (H - ch) / 2, tw, ch);
    } else if (cfg.layout === "col-narrow") {
        var tw = Math.min(mW * 0.85 * s, mW), ch = Math.min(H * 0.75 * s, mH), cw = Math.max((tw - 60) / 3, 10);
        o.fillRect((W - cw) / 2, (H - ch) / 2, cw, ch);
    } else if (cfg.layout === "col-indep") {
        var tw = Math.min(mW * 0.85 * s, mW), ch = Math.min(H * 0.75 * s, mH), cw = Math.max((tw - 60) / 3, 10);
        var sx = (W - (cw * 3 + 60)) / 2, sy = (H - ch) / 2;
        o.fillRect(sx, sy, cw, ch); o.fillRect(sx + cw + 30, sy, cw, ch); o.fillRect(sx + (cw + 30) * 2, sy, cw, ch);
    } else if (cfg.layout === "image" && loadedImg) {
        var iA = loadedImg.width / loadedImg.height, cA = mW / mH, dW, dH;
        if (iA > cA) { dW = mW * s; dH = dW / iA; } else { dH = mH * s; dW = dH * iA; }
        if (dW > mW) { dW = mW; dH = dW / iA; } if (dH > mH) { dH = mH; dW = dH * iA; }
        o.drawImage(loadedImg, (W - dW) / 2, (H - dH) / 2, dW, dH);
        var iD = o.getImageData(0, 0, W, H), px = iD.data, thr = cfg.videoThreshold / 100 * 255;
        for (var p = 0; p < px.length; p += 4) { var lm = px[p]*0.299+px[p+1]*0.587+px[p+2]*0.114; px[p+3] = px[p+3]<250?px[p+3]:(lm<thr?255:0); }
        o.putImageData(iD, 0, 0);
    } else if (cfg.layout === "video" && vidEl && vidReady) {
        var vw = vidEl.videoWidth, vh = vidEl.videoHeight;
        if (vw && vh) {
            var vA = vw / vh, cA2 = mW / mH, dW2, dH2;
            if (vA > cA2) { dW2 = mW * s; dH2 = dW2 / vA; } else { dH2 = mH * s; dW2 = dH2 * vA; }
            if (dW2 > mW) { dW2 = mW; dH2 = dW2 / vA; } if (dH2 > mH) { dH2 = mH; dW2 = dH2 * vA; }
            o.drawImage(vidEl, (W - dW2) / 2, (H - dH2) / 2, dW2, dH2);
            var iD2 = o.getImageData(0, 0, W, H), px2 = iD2.data, thr2 = cfg.videoThreshold / 100 * 255;
            for (var p2 = 0; p2 < px2.length; p2 += 4) { var lm2 = px2[p2]*0.299+px2[p2+1]*0.587+px2[p2+2]*0.114; px2[p2+3] = px2[p2+3]<250?px2[p2+3]:(lm2<thr2?255:0); }
            o.putImageData(iD2, 0, 0);
        }
    }
    buildOM();
    var d = o.getImageData(0, 0, W, H).data;
    for (var y = 0; y < H; y += LH) {
        var ri = [], inT = false, sX = 0;
        for (var x = 0; x < W; x += 1) {
            var vis = d[(y * W + x) * 4 + 3] > 128 && !(objM && objM[y * W + x]);
            if (vis) { if (!inT) { inT = true; sX = x; } }
            else if (inT) { inT = false; ri.push({ start: sX, end: x }); }
        }
        if (inT) ri.push({ start: sX, end: W });
        if (ri.length > 0) maskI.push({ y: y, intervals: ri });
    }
    clipP = new Path2D(); bbX1 = W; bbX2 = 0;
    for (var r = 0; r < maskI.length; r++) for (var iv = 0; iv < maskI[r].intervals.length; iv++) {
        var intv = maskI[r].intervals[iv]; clipP.rect(intv.start, maskI[r].y, intv.end - intv.start, LH);
        if (intv.start < bbX1) bbX1 = intv.start; if (intv.end > bbX2) bbX2 = intv.end;
    }
}

var lastVidRebuild = 0;
function applyGlitchPP(progress, isSlam) {
    var bI = Math.pow(1 - progress, 2), intensity = isSlam ? Math.min(1, bI * 2.5) : bI;
    if (intensity < 0.01) return;
    var gc = cfg.glitchColor || "#ff0040";
    var gR = parseInt(gc.slice(1,3),16), gG = parseInt(gc.slice(3,5),16), gB = parseInt(gc.slice(5,7),16);
    var imgData = ctx.getImageData(0, 0, W, H);
    var rgbS = Math.floor(intensity * (isSlam?30:15) + Math.random() * intensity * (isSlam?20:10));
    if (rgbS > 0) { var cp = new Uint8ClampedArray(imgData.data);
        for (var y = 0; y < H; y++) { for (var x = 0; x < W; x++) { var idx = (y*W+x)*4;
            imgData.data[idx] = cp[(y*W+Math.min(W-1,x+rgbS))*4];
            imgData.data[idx+2] = cp[(y*W+Math.max(0,x-rgbS))*4+2]; } } }
    var nS = Math.floor(intensity*(isSlam?15:8)+Math.random()*(isSlam?10:6));
    for (var s = 0; s < nS; s++) { var sY=Math.floor(Math.random()*H), sH2=Math.floor(Math.random()*(isSlam?40:20)*intensity+2);
        var sh=Math.floor((Math.random()-0.5)*intensity*(isSlam?160:80)); if(Math.abs(sh)<1)continue;
        for(var y=sY;y<Math.min(H,sY+sH2);y++){var rS=y*W*4,rC=new Uint8ClampedArray(W*4);rC.set(imgData.data.subarray(rS,rS+W*4));
        for(var x=0;x<W;x++){var srcX=x-sh,di=rS+x*4;if(srcX>=0&&srcX<W){var si2=srcX*4;imgData.data[di]=rC[si2];imgData.data[di+1]=rC[si2+1];imgData.data[di+2]=rC[si2+2];imgData.data[di+3]=rC[si2+3];}}}}
    if(isSlam&&intensity>0.1){var bc=Math.floor(intensity*12+Math.random()*8);
        for(var b=0;b<bc;b++){var bx=Math.floor(Math.random()*W),by=Math.floor(Math.random()*H),bw=Math.floor(Math.random()*80*intensity+10),bh=Math.floor(Math.random()*12*intensity+2),al=intensity*(0.3+Math.random()*0.5);
        for(var py=by;py<Math.min(H,by+bh);py++){for(var px=bx;px<Math.min(W,bx+bw);px++){var idx=(py*W+px)*4;imgData.data[idx]=Math.floor(imgData.data[idx]*(1-al)+gR*al);imgData.data[idx+1]=Math.floor(imgData.data[idx+1]*(1-al)+gG*al);imgData.data[idx+2]=Math.floor(imgData.data[idx+2]*(1-al)+gB*al);}}}}
    var scO=intensity*(isSlam?0.5:0.3),step=isSlam?2:3;
    for(var y=0;y<H;y+=step){for(var x=0;x<W;x++){var idx=(y*W+x)*4;imgData.data[idx]=Math.floor(imgData.data[idx]*(1-scO));imgData.data[idx+1]=Math.floor(imgData.data[idx+1]*(1-scO));imgData.data[idx+2]=Math.floor(imgData.data[idx+2]*(1-scO));}}
    ctx.putImageData(imgData, 0, 0);
    if(Math.random()<intensity*(isSlam?0.8:0.6)){ctx.save();ctx.globalAlpha=intensity*(isSlam?0.35:0.15);ctx.fillStyle=gc;ctx.fillRect(0,Math.floor(Math.random()*H),W,Math.floor(Math.random()*(isSlam?8:4)+1));ctx.restore();}
    if(isSlam&&intensity>0.5&&Math.random()<0.3){ctx.save();ctx.globalAlpha=intensity*0.1;ctx.fillStyle=gc;ctx.fillRect(0,0,W,H);ctx.restore();}
}
function advPh(now) {
    var el = (now - phStart) / 1000;
    if (animPh === "intro") {
        if (cfg.intro === "none") { introP = 1; animPh = "main"; phStart = now; }
        else { introP = Math.min(1, el / Math.max(0.1, cfg.introDur || 2));
            if (introP >= 1) { introP = 1; animPh = "main"; phStart = now; } }
    } else if (animPh === "main") { introP = 1; outroP = 0;
        if (el >= (cfg.mainDur || 3)) {
            if ((cfg.outro || "none") === "none") resetAnim(now);
            else { animPh = "outro"; phStart = now; } }
    } else if (animPh === "outro") {
        if ((cfg.outro || "none") === "none") { resetAnim(now); }
        else { outroP = Math.min(1, el / Math.max(0.1, cfg.outroDur || 2));
            if (outroP >= 1) resetAnim(now); }
    }
}
function animate() {
    var now = Date.now();
    advPh(now);
    ctx.fillStyle = cfg.bgColor || "#ffffff";
    ctx.fillRect(0, 0, W, H);
    if (cfg.layout === "video" && vidReady) {
        if (now - lastVidRebuild > 66) { lastVidRebuild = now; createMask(); }
    }
    var ease;
    if (animPh === "intro") {
        curAT = cfg.intro;
        var rP = cfg.introReverse ? 1 - introP : introP;
        ease = 1 - Math.pow(1 - rP, 3);
        ctx.globalAlpha = (cfg.intro === "fade") ? rP : 1;
        if ((cfg.intro === "glitch" || cfg.intro === "glitch-slam") && introP < 1) ctx.globalAlpha = Math.min(1, rP * 2.5);
    } else if (animPh === "outro") {
        curAT = cfg.outro || "none";
        if (cfg.outroReverse) { ease = 1 - Math.pow(1 - outroP, 3); ctx.globalAlpha = ((cfg.outro||"none")==="fade")?outroP:1; }
        else { var oE = 1 - Math.pow(1 - outroP, 3); ease = 1 - oE; ctx.globalAlpha = ((cfg.outro||"none")==="fade")?(1-outroP):1; }
        if ((curAT === "glitch" || curAT === "glitch-slam") && outroP < 1) ctx.globalAlpha = cfg.outroReverse ? Math.min(1,outroP*2.5) : Math.min(1,(1-outroP)*2.5);
    } else { curAT = "none"; ease = 1; ctx.globalAlpha = 1; }
    ctx.font = "900 " + (cfg.fillSize || 14) + "px '" + cfg.fontFill + "', sans-serif"; ctx.textBaseline = "top";
    var time = now * 0.0015;
    var cOX = (now - startT) * 0.01 * (cfg.speedX / 15);
    var yOff = 0, needClip = cfg.speedY !== 0 && clipP;
    if (cfg.speedY !== 0) yOff = (now - startT) * 0.15 * (cfg.speedY / 15);
    if (needClip) { ctx.save(); ctx.clip(clipP); }
    var pH = maskI.length > 1 ? maskI[maskI.length-1].y - maskI[0].y + LH : H;
    if (pH <= 0) pH = H;
    var copies = needClip ? [-1, 0, 1] : [0];
    for (var c = 0; c < copies.length; c++) {
        var yS = needClip ? (yOff % pH) + copies[c] * pH : 0;
        var isCol = cfg.layout === "col-single" || cfg.layout === "col-narrow" || cfg.layout === "col-indep";
        var isSM = needClip && !isCol;
        if (cfg.layout === "col-indep") {
            var mxC = 0; for (var mi = 0; mi < maskI.length; mi++) mxC = Math.max(mxC, maskI[mi].intervals.length);
            var cumCI = Math.floor(cOX);
            for (var col = 0; col < mxC; col++) { for (var i = 0; i < maskI.length; i++) {
                var row = maskI[i]; if (col >= row.intervals.length) continue;
                var rY = row.y + yS; var iv = row.intervals[col];
                cumCI += drawSeg(iv.start, iv.end, rY, ease, time, cumCI, i);
            } }
        } else if (isCol) {
            var cumCI = Math.floor(cOX);
            for (var i = 0; i < maskI.length; i++) { var row = maskI[i], rY = row.y + yS;
                for (var j = 0; j < row.intervals.length; j++) { cumCI += drawSeg(row.intervals[j].start, row.intervals[j].end, rY, ease, time, cumCI, i); }
            }
        } else {
            for (var i = 0; i < maskI.length; i++) {
                var row = maskI[i], rY = row.y + yS;
                if (rY < -LH || rY > H + LH) continue;
                var rCI = Math.floor(cOX + (i * 23));
                if (isSM) {
                    drawSeg(bbX1, bbX2, rY, ease, time, rCI, i);
                } else {
                    for (var j = 0; j < row.intervals.length; j++) { rCI += drawSeg(row.intervals[j].start, row.intervals[j].end, rY, ease, time, rCI, i); }
                }
            }
        }
    }
    if (needClip) ctx.restore();
    var isGT = curAT === "glitch" || curAT === "glitch-slam";
    if (isGT && ((animPh === "intro" && introP < 1) || (animPh === "outro" && outroP < 1))) {
        var gp = animPh === "intro" ? introP : outroP;
        var gDir = (animPh === "intro" && !cfg.introReverse) || (animPh === "outro" && cfg.outroReverse);
        applyGlitchPP(gDir ? gp : (1 - gp), curAT === "glitch-slam");
    }
    for (var oi = 0; oi < scObjs.length; oi++) { var ob = scObjs[oi]; ctx.drawImage(ob.img, ob.x, ob.y, ob.w, ob.h); }
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
}

function drawSeg(sX, eX, tY, ease, time, sIdx, rIdx) {
    ctx.fillStyle = cfg.textColor || "#111111";
    var cX = sX, cIdx = sIdx, text = cfg.fillText || "SEVERYAN", tL = text.length;
    var cenX = W / 2, cenY = H / 2, fM = cfg.mouseForce / 100;
    while (cX < eX) {
        var si = ((cIdx % tL) + tL) % tL, ch = text[si], chW = cW[ch] || 8;
        if (cX + chW > eX) break;
        if (ch !== " ") {
            var seed = rIdx * 1000 + Math.abs(cIdx), dX = cX, dY = tY;
            if (curAT === "explosion") {
                var nX = Math.sin(seed*12.9898)*43758.5453, rDX = (nX-Math.floor(nX)-0.5)*2.5;
                var nY = Math.sin(seed*78.233)*23421.134, rDY = (nY-Math.floor(nY))*-1.2;
                var sp = 800, ctX = cenX+rDX*sp, ctY = cenY+rDY*sp-100, t = ease, t1 = 1-t;
                dX = t1*t1*cenX+2*t1*t*ctX+t*t*cX; dY = t1*t1*cenY+2*t1*t*ctY+t*t*tY;
            } else if (curAT === "tape") { dX = cX+(1-ease)*(-W); dY = tY+Math.sin(cX*0.01+ease*10)*(1-ease)*200;
            } else if (curAT === "drop") { dY = tY-Math.pow(1-ease,2)*(H+200);
            } else if (curAT === "spin") { var dx=cX-cenX,dy=tY-cenY,dist=Math.sqrt(dx*dx+dy*dy); var angle=Math.atan2(dy,dx)+(1-ease)*10,radius=dist+Math.pow(1-ease,3)*1000; dX=cenX+Math.cos(angle)*radius; dY=cenY+Math.sin(angle)*radius;
            } else if (curAT === "glitch") {
                var gI = Math.pow(1-ease,2), band = Math.floor(tY/30);
                var bSeed = Math.sin(band*45.17+Math.floor(time*8))*9999;
                var bShift = (bSeed-Math.floor(bSeed)-0.5)*2;
                dX = cX + bShift*gI*60;
                var vJ = Math.sin(seed*33.33+Math.floor(time*12))*gI*15;
                dY = tY + vJ;
                if (Math.random() < gI*0.3) { cX += chW; cIdx++; continue; }
            } else if (curAT === "glitch-slam") {
                if(ease<0.08){if(Math.random()>0.3){cX+=chW;cIdx++;continue;}dX=cX+(Math.random()-0.5)*200;dY=tY+(Math.random()-0.5)*60;
                }else if(ease<0.20){if(Math.random()>0.05){cX+=chW;cIdx++;continue;}dX=cX+(Math.random()-0.5)*300;dY=tY+(Math.random()-0.5)*100;
                }else if(ease<0.38){var le=(ease-0.20)/0.18;if(Math.random()>0.4+le*0.2){cX+=chW;cIdx++;continue;}var bn=Math.floor(tY/15),bs3=Math.sin(bn*89.3+Math.floor(time*20))*9999;dX=cX+(bs3-Math.floor(bs3)-0.5)*150*(1-le*0.5);dY=tY+Math.sin(seed*53.7+Math.floor(time*15))*25*(1-le);
                }else if(ease<0.50){if(Math.random()>0.08){cX+=chW;cIdx++;continue;}dX=cX+(Math.random()-0.5)*250;dY=tY+(Math.random()-0.5)*80;
                }else if(ease<0.72){var le2=(ease-0.50)/0.22,gi3=Math.pow(1-le2,2);if(Math.random()<gi3*0.15){cX+=chW;cIdx++;continue;}var bn2=Math.floor(tY/25),bs4=Math.sin(bn2*37.9+Math.floor(time*12))*9999;dX=cX+(bs4-Math.floor(bs4)-0.5)*gi3*80;dY=tY+Math.sin(seed*29.3+Math.floor(time*10))*gi3*18;
                }else if(ease<0.85){var gi4=Math.pow((0.85-ease)/0.13,2)*0.3,bn3=Math.floor(tY/40),bs5=Math.sin(bn3*19.7+Math.floor(time*8))*9999;dX=cX+(bs5-Math.floor(bs5)-0.5)*gi4*30;dY=tY+Math.sin(seed*17.1+time*6)*gi4*6;}
            }
            var iX=0,iY=0;
            if (cfg.idle==="wave") { iX=Math.cos(time+cX*0.01)*1.5*ease; iY=Math.sin(time+cX*0.015)*3*ease;
            } else if (cfg.idle==="pulse") { var pdx=cX-W/2,pdy=tY-H/2,pd=Math.sqrt(pdx*pdx+pdy*pdy); var pw=Math.sin(time*3-pd*0.01)*3*ease; iX=pd>0?(pdx/pd)*pw:0; iY=pd>0?(pdy/pd)*pw:0;
            } else if (cfg.idle==="glitch") { if(Math.random()>0.95){iX=(Math.random()-0.5)*10;iY=(Math.random()-0.5)*10;}
            } else if (cfg.idle==="lens") { var lX=W/2+Math.cos(time*0.4)*W*0.25,lY=H/2+Math.sin(time*0.6)*H*0.25,lR=120,ldx=cX-lX,ldy=tY-lY,ld=Math.sqrt(ldx*ldx+ldy*ldy); if(ld<lR&&ld>0){var f=Math.pow(1-ld/lR,2)*12*ease;iX=(ldx/ld)*f;iY=(ldy/ld)*f;}
            } else if (cfg.idle==="liquid") { var w1=Math.sin(time*1.5+cX*0.008+tY*0.006)*4,w2=Math.cos(time*0.7+cX*0.012-tY*0.008)*3,w3=Math.sin(time*2.3-cX*0.005+tY*0.01)*2; iX=(w1+w2*0.5)*ease; iY=(w2+w3)*ease; }
            var mX=0,mY=0,aX=dX+iX,aY=dY+iY,ddx=aX-mouse.x,ddy=aY-mouse.y,dd=Math.sqrt(ddx*ddx+ddy*ddy),render=true;
            if(dd<mouse.radius&&dd>0.1){var force=Math.pow((mouse.radius-dd)/mouse.radius,2);
                if(cfg.mouseFX==="repel"){mX=(ddx/dd)*force*50*fM;mY=(ddy/dd)*force*50*fM;}
                else if(cfg.mouseFX==="gravity"){mX=-(ddx/dd)*force*30*fM;mY=-(ddy/dd)*force*30*fM;}
                else if(cfg.mouseFX==="vortex"){var a=Math.atan2(ddy,ddx)+Math.PI/2;mX=Math.cos(a)*force*50*fM;mY=Math.sin(a)*force*50*fM;}}
            if(cfg.mouseFX==="flashlight"&&dd>mouse.radius)render=false;
            if(render&&objM){var rx=Math.round(aX+mX),ry=Math.round(aY+mY);if(rx>=0&&rx<W&&ry>=0&&ry<H&&objM[ry*W+rx])render=false;}
            if(render)ctx.fillText(ch,aX+mX,aY+mY);
        }
        cX += chW; cIdx++;
    }
    return cIdx - sIdx;
}

loadAssets(function() { document.fonts.ready.then(function() { resize(); animate(); }); });
<\/script>
</body>
</html>`;
}

fontPickerMask = new FontPicker('fontPickerMask', 'cfgFontMask', 'Manrope');
fontPickerFill = new FontPicker('fontPickerFill', 'cfgFontFill', 'Manrope');

document.fonts.ready.then(() => {
    updateConfig();
    resizeCanvas();
    animate();
});
