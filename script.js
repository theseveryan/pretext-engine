const config = {
    mask: "SEVERYAN", mask2: "CODE", fillText: "", fontMask: "Manrope", fontFill: "Manrope", layout: "center",
    intro: "explosion", idle: "wave", mouseFX: "repel",
    scale: 100, scale2: 80, introSpeed: 100, speedX: 30, speedY: 0, isDark: false,
    mouseRadius: 100, mouseForce: 100, videoThreshold: 50, objPadding: 15
};

const themeBtn = document.getElementById('toggleTheme');
themeBtn.addEventListener('click', () => {
    const isLightNow = document.body.classList.toggle('light-theme');
    config.isDark = !isLightNow;
    themeBtn.textContent = isLightNow ? 'Тёмная тема' : 'Светлая тема';
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
syncSlider('cfgIntroSpeed', 'cfgIntroSpeedVal');
syncSlider('cfgSpeedX', 'cfgSpeedXVal');
syncSlider('cfgSpeedY', 'cfgSpeedYVal');
syncSlider('cfgMouseRadius', 'cfgMouseRadiusVal');
syncSlider('cfgMouseForce', 'cfgMouseForceVal');
syncSlider('cfgVideoThreshold', 'cfgVideoThresholdVal');
syncSlider('cfgObjPadding', 'cfgObjPaddingVal');

const inputs = {
    mask: document.getElementById('cfgMaskText'), mask2: document.getElementById('cfgMaskText2'),
    fillText: document.getElementById('cfgFillText'), fontMask: document.getElementById('cfgFontMask'), fontFill: document.getElementById('cfgFontFill'),
    layout: document.getElementById('cfgLayout'), intro: document.getElementById('cfgIntro'),
    idle: document.getElementById('cfgIdle'), mouseFX: document.getElementById('cfgMouse')
};

function updateConfig() {
    const prevIntro = config.intro;
    if (inputs.mask) config.mask = inputs.mask.value || " ";
    if (inputs.mask2) config.mask2 = inputs.mask2.value || " ";
    if (inputs.fillText) config.fillText = inputs.fillText.value;
    if (inputs.fontMask) config.fontMask = inputs.fontMask.value;
    if (inputs.fontFill) config.fontFill = inputs.fontFill.value;
    if (inputs.layout) config.layout = inputs.layout.value;
    if (inputs.intro) config.intro = inputs.intro.value;
    if (inputs.idle) config.idle = inputs.idle.value;
    if (inputs.mouseFX) config.mouseFX = inputs.mouseFX.value;

    config.scale = Number(document.getElementById('cfgScale').value);
    config.scale2 = Number(document.getElementById('cfgScale2').value);
    config.introSpeed = Number(document.getElementById('cfgIntroSpeed').value);
    config.speedX = Number(document.getElementById('cfgSpeedX').value);
    config.speedY = Number(document.getElementById('cfgSpeedY').value);
    config.mouseRadius = Number(document.getElementById('cfgMouseRadius').value);
    config.mouseForce = Number(document.getElementById('cfgMouseForce').value);
    config.videoThreshold = Number(document.getElementById('cfgVideoThreshold').value);
    config.objPadding = Number(document.getElementById('cfgObjPadding').value);

    const groupWord2 = document.getElementById('groupWord2');
    if (groupWord2) { groupWord2.classList.toggle('visible', config.layout === 'center2'); }
    const groupImage = document.getElementById('groupImage');
    if (groupImage) { groupImage.classList.toggle('visible', config.layout === 'image'); }
    const groupVideo = document.getElementById('groupVideo');
    if (groupVideo) { groupVideo.classList.toggle('visible', config.layout === 'video'); }
    const groupThreshold = document.getElementById('groupThreshold');
    if (groupThreshold) { groupThreshold.classList.toggle('visible', config.layout === 'image' || config.layout === 'video'); }

    if (typeof rebuildOnTheFly === 'function') rebuildOnTheFly();
    if (prevIntro !== config.intro) { introProgress = 0; startTime = Date.now(); }
}

for (const key in inputs) {
    if (inputs[key]) {
        inputs[key].addEventListener('input', updateConfig);
        inputs[key].addEventListener('change', updateConfig);
    }
}

let uploadedImage = null;
document.getElementById('cfgImage').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
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
const lineHeight = 16;
let startTime = Date.now();
let introProgress = 0;
let objMask = null;

let mouse = { x: -1000, y: -1000, radius: 100 };
canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});
canvas.addEventListener('mouseleave', () => { if (!dragObj) { mouse.x = -1000; mouse.y = -1000; } });

function initCharCache() {
    ctx.font = `900 14px '${config.fontFill}', sans-serif`;
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

function animate() {
    ctx.clearRect(0, 0, width, height);

    if (config.layout === 'video' && videoReady) {
        const now = Date.now();
        if (now - lastVideoRebuild > 66) {
            lastVideoRebuild = now;
            createMask();
        }
    }

    let introSpeedMult = config.introSpeed / 100;
    if (config.intro === 'none') introProgress = 1;
    else if (introProgress < 1) { introProgress += 0.008 * introSpeedMult; if (introProgress >= 1) introProgress = 1; }

    ctx.font = `900 14px '${config.fontFill}', sans-serif`;
    ctx.textBaseline = 'top';
    ctx.globalAlpha = (config.intro === 'fade') ? introProgress : 1;

    const ease = 1 - Math.pow(1 - introProgress, 3);
    const time = Date.now() * 0.0015;
    let charOffsetX = (Date.now() - startTime) * 0.01 * (config.speedX / 15);

    let yPixelOffset = 0;
    let needsClip = config.speedY !== 0 && maskClipPath;
    if (config.speedY !== 0) yPixelOffset = (Date.now() - startTime) * 0.15 * (config.speedY / 15);

    mouse.radius = config.mouseRadius;

    if (needsClip) { ctx.save(); ctx.clip(maskClipPath); }

    let patternH = maskIntervals.length > 1
        ? maskIntervals[maskIntervals.length - 1].y - maskIntervals[0].y + lineHeight : height;
    if (patternH <= 0) patternH = height;

    const copies = needsClip ? [-1, 0, 1] : [0];

    for (const copy of copies) {
        let yOff = needsClip ? (yPixelOffset % patternH) + copy * patternH : 0;
        if (config.layout === 'col-indep') {
            const maxCols = Math.max(...maskIntervals.map(r => r.intervals.length));
            let cumCharIdx = Math.floor(charOffsetX);
            for (let col = 0; col < maxCols; col++) {
                for (let i = 0; i < maskIntervals.length; i++) {
                    const row = maskIntervals[i];
                    if (col >= row.intervals.length) continue;
                    let renderY = row.y + yOff;
                    if (renderY < -lineHeight || renderY > height + lineHeight) { cumCharIdx += Math.floor((row.intervals[col].end - row.intervals[col].start) / 8); continue; }
                    const interval = row.intervals[col];
                    drawTextSegment(interval.start, interval.end, renderY, ease, time, cumCharIdx, i);
                    cumCharIdx += Math.floor((interval.end - interval.start) / 8);
                }
            }
        } else {
            const isShapeMask = needsClip && (config.layout === 'center' || config.layout === 'center2' || config.layout === 'image');
            for (let i = 0; i < maskIntervals.length; i++) {
                const row = maskIntervals[i];
                let renderY = row.y + yOff;
                if (renderY < -lineHeight || renderY > height + lineHeight) continue;
                let rowCharIndex = Math.floor(charOffsetX + (i * 23));
                if (isShapeMask) {
                    drawTextSegment(maskBBoxX1, maskBBoxX2, renderY, ease, time, rowCharIndex, i);
                } else {
                    for (let j = 0; j < row.intervals.length; j++) {
                        const interval = row.intervals[j];
                        drawTextSegment(interval.start, interval.end, renderY, ease, time, rowCharIndex, i);
                        rowCharIndex += Math.floor((interval.end - interval.start) / 8);
                    }
                }
            }
        }
    }

    if (needsClip) ctx.restore();

    for (const o of sceneObjects) {
        ctx.drawImage(o.img, o.x, o.y, o.w, o.h);
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
}

function drawTextSegment(startX, endX, targetY, ease, time, startIndex, rowIndex) {
    ctx.fillStyle = config.isDark ? '#eeeeee' : '#111111';
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

            if (config.intro === 'explosion') {
                const nX = Math.sin(seed * 12.9898) * 43758.5453, rDX = (nX - Math.floor(nX) - 0.5) * 2.5;
                const nY = Math.sin(seed * 78.233) * 23421.134, rDY = (nY - Math.floor(nY)) * -1.2;
                const sp = 800, ctX = centerX + rDX * sp, ctY = centerY + rDY * sp - 100;
                const t = ease, t1 = 1 - t;
                drawX = t1 * t1 * centerX + 2 * t1 * t * ctX + t * t * currentX;
                drawY = t1 * t1 * centerY + 2 * t1 * t * ctY + t * t * targetY;
            } else if (config.intro === 'tape') {
                drawX = currentX + (1 - ease) * (-width);
                drawY = targetY + Math.sin(currentX * 0.01 + ease * 10) * (1 - ease) * 200;
            } else if (config.intro === 'drop') {
                drawY = targetY - Math.pow(1 - ease, 2) * (height + 200);
            } else if (config.intro === 'spin') {
                const dx = currentX - centerX, dy = targetY - centerY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) + (1 - ease) * 10;
                const radius = dist + Math.pow(1 - ease, 3) * 1000;
                drawX = centerX + Math.cos(angle) * radius;
                drawY = centerY + Math.sin(angle) * radius;
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
}

const exportModal = document.getElementById('exportModal');
const exportCode = document.getElementById('exportCode');

// Open modal
document.getElementById('exportOpenBtn').addEventListener('click', () => {
    exportCode.value = generateExportHTML();
    exportModal.classList.add('active');
});
document.getElementById('modalClose').addEventListener('click', () => exportModal.classList.remove('active'));
exportModal.addEventListener('click', e => { if (e.target === exportModal) exportModal.classList.remove('active'); });

// Tabs
document.querySelectorAll('.export-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.export-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.export-tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab === 'code' ? 'tabCode' : 'tabGif').classList.add('active');
    });
});

// Code export buttons
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

// === GIF EXPORT ===
let gifWorkerUrl = null;
fetch('https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js')
    .then(r => r.text())
    .then(code => {
        gifWorkerUrl = URL.createObjectURL(new Blob([code], { type: 'application/javascript' }));
    })
    .catch(() => { console.warn('gif.worker.js preload failed, will retry on export'); });

document.getElementById('gifBtn').addEventListener('click', async () => {
    const gifBtn = document.getElementById('gifBtn');
    if (gifBtn.disabled) return;
    gifBtn.disabled = true;

    const progressArea = document.getElementById('gifProgressArea');
    const progressFill = document.getElementById('gifProgressFill');
    const progressText = document.getElementById('gifProgressText');
    progressArea.style.display = 'block';
    progressFill.style.width = '0%';
    progressText.textContent = 'Подготовка...';

    // Close modal so canvas is visible for capture
    exportModal.classList.remove('active');

    if (!gifWorkerUrl) {
        try {
            const code = await fetch('https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js').then(r => r.text());
            gifWorkerUrl = URL.createObjectURL(new Blob([code], { type: 'application/javascript' }));
        } catch (e) {
            alert('Не удалось загрузить gif.worker.js. Проверьте интернет-соединение.');
            gifBtn.disabled = false;
            progressArea.style.display = 'none';
            return;
        }
    }

    const duration = parseFloat(document.getElementById('gifDuration').value) || 3;
    const fps = parseInt(document.getElementById('gifFps').value) || 20;
    const scale = parseFloat(document.getElementById('gifScale').value) || 1;
    const totalFrames = Math.round(duration * fps);
    const delay = Math.round(1000 / fps);

    const gifW = Math.round(canvas.width * scale);
    const gifH = Math.round(canvas.height * scale);

    const offCanvas = document.createElement('canvas');
    offCanvas.width = gifW;
    offCanvas.height = gifH;
    const offCtx2 = offCanvas.getContext('2d');

    const frames = [];
    let framesCaptured = 0;

    // Small delay to let modal close & canvas render
    await new Promise(r => setTimeout(r, 100));

    function captureFrame() {
        return new Promise(resolve => {
            requestAnimationFrame(() => {
                offCtx2.clearRect(0, 0, gifW, gifH);
                offCtx2.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, gifW, gifH);
                frames.push(offCtx2.getImageData(0, 0, gifW, gifH));
                framesCaptured++;
                resolve();
            });
        });
    }

    for (let i = 0; i < totalFrames; i++) {
        await captureFrame();
        if (i < totalFrames - 1) await new Promise(r => setTimeout(r, delay));
    }

    // Re-open modal to show encoding progress
    exportModal.classList.add('active');
    // Switch to GIF tab
    document.querySelectorAll('.export-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.export-tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector('.export-tab[data-tab="gif"]').classList.add('active');
    document.getElementById('tabGif').classList.add('active');

    progressArea.style.display = 'block';
    progressText.textContent = 'Кодирование GIF...';
    progressFill.style.width = '40%';

    const gif = new GIF({
        workers: navigator.hardwareConcurrency || 4,
        workerScript: gifWorkerUrl,
        width: gifW,
        height: gifH,
        quality: 5,
        repeat: 0
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
        gifBtn.disabled = false;
        frames.length = 0;
        progressText.textContent = 'Готово! GIF скачан.';
        progressFill.style.width = '100%';
        setTimeout(() => { progressArea.style.display = 'none'; }, 2000);
    });

    gif.render();
});

function getImageBase64(img) {
    if (!img) return null;
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    c.getContext('2d').drawImage(img, 0, 0);
    return c.toDataURL('image/png');
}

function generateExportHTML() {
    const bg = config.isDark ? '#111' : '#ffffff';
    const fg = config.isDark ? '#eeeeee' : '#111111';
    const imgB64 = config.layout === 'image' ? getImageBase64(uploadedImage) : null;
    const vidB64 = config.layout === 'video' ? videoBase64 : null;

    const objsData = sceneObjects.map(o => ({
        src: getImageBase64(o.img), x: o.x, y: o.y, w: o.w, h: o.h
    }));

    const cfgStr = JSON.stringify({
        mask: config.mask, mask2: config.mask2, fillText: config.fillText || 'SEVERYAN',
        fontMask: config.fontMask, fontFill: config.fontFill, layout: config.layout,
        intro: config.intro, idle: config.idle, mouseFX: config.mouseFX,
        scale: config.scale, scale2: config.scale2,
        introSpeed: config.introSpeed, speedX: config.speedX, speedY: config.speedY,
        isDark: config.isDark, mouseRadius: config.mouseRadius, mouseForce: config.mouseForce,
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
var W, H, maskI = [], clipP = null, cW = {}, LH = 16, bbX1 = 0, bbX2 = 0;
var startT = Date.now(), introP = 0;
var mouse = { x: -1000, y: -1000, radius: cfg.mouseRadius };
var scObjs = [], objM = null;

canvas.addEventListener("mousemove", function(e) {
    var r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
});
canvas.addEventListener("mouseleave", function() { mouse.x = -1000; mouse.y = -1000; });

function initCC() {
    ctx.font = "900 14px '" + cfg.fontFill + "', sans-serif"; cW = {};
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
function animate() {
    ctx.clearRect(0, 0, W, H);
    if (cfg.layout === "video" && vidReady) {
        var now = Date.now();
        if (now - lastVidRebuild > 66) { lastVidRebuild = now; createMask(); }
    }
    var introSM = cfg.introSpeed / 100;
    if (cfg.intro === "none") introP = 1;
    else if (introP < 1) { introP += 0.008 * introSM; if (introP >= 1) introP = 1; }
    ctx.font = "900 14px '" + cfg.fontFill + "', sans-serif"; ctx.textBaseline = "top";
    ctx.globalAlpha = (cfg.intro === "fade") ? introP : 1;
    var ease = 1 - Math.pow(1 - introP, 3), time = Date.now() * 0.0015;
    var cOX = (Date.now() - startT) * 0.01 * (cfg.speedX / 15);
    var yOff = 0, needClip = cfg.speedY !== 0 && clipP;
    if (cfg.speedY !== 0) yOff = (Date.now() - startT) * 0.15 * (cfg.speedY / 15);
    if (needClip) { ctx.save(); ctx.clip(clipP); }
    var pH = maskI.length > 1 ? maskI[maskI.length-1].y - maskI[0].y + LH : H;
    if (pH <= 0) pH = H;
    var copies = needClip ? [-1, 0, 1] : [0];
    for (var c = 0; c < copies.length; c++) {
        var yS = needClip ? (yOff % pH) + copies[c] * pH : 0;
        if (cfg.layout === "col-indep") {
            var mxC = 0; for (var mi = 0; mi < maskI.length; mi++) mxC = Math.max(mxC, maskI[mi].intervals.length);
            var cumCI = Math.floor(cOX);
            for (var col = 0; col < mxC; col++) { for (var i = 0; i < maskI.length; i++) {
                var row = maskI[i]; if (col >= row.intervals.length) continue;
                var rY = row.y + yS; var iv = row.intervals[col];
                if (rY < -LH || rY > H + LH) { cumCI += Math.floor((iv.end - iv.start) / 8); continue; }
                drawSeg(iv.start, iv.end, rY, ease, time, cumCI, i);
                cumCI += Math.floor((iv.end - iv.start) / 8);
            } }
        } else {
            var isSM = needClip && (cfg.layout === "center" || cfg.layout === "center2" || cfg.layout === "image");
            for (var i = 0; i < maskI.length; i++) {
                var row = maskI[i], rY = row.y + yS;
                if (rY < -LH || rY > H + LH) continue;
                var rCI = Math.floor(cOX + (i * 23));
                if (isSM) {
                    drawSeg(bbX1, bbX2, rY, ease, time, rCI, i);
                } else {
                    for (var j = 0; j < row.intervals.length; j++) {
                        var iv = row.intervals[j]; drawSeg(iv.start, iv.end, rY, ease, time, rCI, i);
                        rCI += Math.floor((iv.end - iv.start) / 8);
                    }
                }
            }
        }
    }
    if (needClip) ctx.restore();
    for (var oi = 0; oi < scObjs.length; oi++) { var ob = scObjs[oi]; ctx.drawImage(ob.img, ob.x, ob.y, ob.w, ob.h); }
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
}

function drawSeg(sX, eX, tY, ease, time, sIdx, rIdx) {
    ctx.fillStyle = "${fg}";
    var cX = sX, cIdx = sIdx, text = cfg.fillText || "SEVERYAN", tL = text.length;
    var cenX = W / 2, cenY = H / 2, fM = cfg.mouseForce / 100;
    while (cX < eX) {
        var si = ((cIdx % tL) + tL) % tL, ch = text[si], chW = cW[ch] || 8;
        if (cX + chW > eX) break;
        if (ch !== " ") {
            var seed = rIdx * 1000 + Math.abs(cIdx), dX = cX, dY = tY;
            if (cfg.intro === "explosion") {
                var nX = Math.sin(seed*12.9898)*43758.5453, rDX = (nX-Math.floor(nX)-0.5)*2.5;
                var nY = Math.sin(seed*78.233)*23421.134, rDY = (nY-Math.floor(nY))*-1.2;
                var sp = 800, ctX = cenX+rDX*sp, ctY = cenY+rDY*sp-100, t = ease, t1 = 1-t;
                dX = t1*t1*cenX+2*t1*t*ctX+t*t*cX; dY = t1*t1*cenY+2*t1*t*ctY+t*t*tY;
            } else if (cfg.intro === "tape") { dX = cX+(1-ease)*(-W); dY = tY+Math.sin(cX*0.01+ease*10)*(1-ease)*200;
            } else if (cfg.intro === "drop") { dY = tY-Math.pow(1-ease,2)*(H+200);
            } else if (cfg.intro === "spin") { var dx=cX-cenX,dy=tY-cenY,dist=Math.sqrt(dx*dx+dy*dy); var angle=Math.atan2(dy,dx)+(1-ease)*10,radius=dist+Math.pow(1-ease,3)*1000; dX=cenX+Math.cos(angle)*radius; dY=cenY+Math.sin(angle)*radius; }
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
}

loadAssets(function() { document.fonts.ready.then(function() { resize(); animate(); }); });
<\/script>
</body>
</html>`;
}

document.fonts.ready.then(() => {
    updateConfig();
    resizeCanvas();
    animate();
});
