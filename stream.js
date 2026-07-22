const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn, execSync, exec } = require('child_process');
const { OBSWebSocket } = require('obs-websocket-js');

// =========================================================================================
// 🛡️ GLOBAL CRASH PREVENTION SHIELD
// =========================================================================================
process.on('uncaughtException', (err) => {
    if (err.message && err.message.includes('Requesting main frame too early')) {
        console.log(`[🛡️] SYSTEM SHIELD: Ignored stealth plugin frame error.`);
    } else {
        console.log(`[⚠️] IGNORED UNCAUGHT EXCEPTION: ${err.message}`);
    }
});
process.on('unhandledRejection', (reason) => {
    const msg = reason && reason.message ? reason.message : reason;
    if (msg && msg.includes('Protocol error')) {
        console.log(`[🛡️] SYSTEM SHIELD: Ignored detached frame protocol error.`);
    } else {
        console.log(`[⚠️] IGNORED UNHANDLED REJECTION: ${msg}`);
    }
});
// =========================================================================================

const obs = new OBSWebSocket();

// =========================================================================================
// ⏱️ FORCE AUTO-REFRESH TIME
// =========================================================================================
const FORCE_REFRESH_MINUTES = 40;
const FORCE_REFRESH_MS      = FORCE_REFRESH_MINUTES * 60 * 1000;

// =========================================================================================
// 🛡️ NO-REFRESH WHITELIST
// =========================================================================================
const NO_REFRESH_DOMAINS = [
    'youtube.com',
    'facebook.com',
    'streamed.pk',
    'cricstreams.',
    'website-vercel-helper-d-jaja-3-2.vercel.app',
    'websitestream.netlify.app/?ch=Channel%20HD%2071'
];

// =========================================================================================
// 🚀 STREAM KEYS
// =========================================================================================
const STREAM_KEYS = {
    '1'   : '15254238731883_15281627925099_najspfkgne',
    '1.1' : '15254260751979_15281671637611_2plrcfqzze',
    '1.2' : '15254285524587_15281717840491_7e6qdknzsu',
    '2'   : '15254299352683_15281743071851_7dvz3h5d7q',
    '2.1' : '15254308986475_15281761618539_3xca7oij3u',
    '2.2' : '15254328122987_15281795566187_zjqa6bqzoq',
    '3'   : '15254341885547_15281821059691_hhlpb5vicy',
    '3.1' : '15254357089899_15281848322667_sxeexgvzl4',
    '3.2' : '15254367510123_15281868180075_pc4jrytfgm',
    '4'   : '15255022345835_15283095800427_vwrupxzstm',
    '4.1' : '15255038074475_15283122080363_ai5qqp2we4',
    '4.2' : '15255045480043_15283135842923_tldl4bhmii',
    '4.3' : '15255208599147_15283449629291_abltofuc7m',
    '4.4' : '15255217708651_15283466603115_bojrrqtlmu',
    '4.5' : '15255227670123_15283486263915_jpntt54mve',
    '5'   : '15273689226859_15317451606635_d7zzy3c7qi',
    '5.1' : '15273713933931_15317494860395_avj47smmim',
    '5.2' : '15273722257003_15317510195819_6edjluvdqi',
    '5.3' : '15273739624043_15317541653099_ii4bxpvabe',
    '5.4' : '15273750175339_15317561707115_csel26ku5a',
    '5.5' : '15273760071275_15317579467371_cnewcj54me',
    '5.6' : '15273767935595_15317595851371_3q43tk7tvm',
    's1.1'  : '14204232736303_14846150314543_37jq4ryehq',
    's1.2'  : '14204288179759_14846247373359_tnsknmapva',
    's1.3'  : '14204319768111_14846302489135_sr4ht4ccwq',
    's1.4'  : '14204331957807_14846326147631_dji2acqcze',
    's1.5'  : '14204346572335_14846351641135_7gvns4o5ue',
    's1.6'  : '14204361252399_14846376479279_cjajhf4d3y',
    's1.7'  : '14204370492975_14846393649711_6fduhdqite',
    's1.8'  : '14204395527727_14846438017583_s2jlti7lsm',
    's1.9'  : '14204411387439_14846464887343_f5lxgcqj5y',
    's1.10' : '14204424691247_14846487562799_xmbvntt6wa',
    's2.1'  : '14204490948143_14846603495983_kzevn36tii',
    's2.2'  : '14204506742319_14846634494511_ta2rxyg2oy',
    's2.3'  : '14204523322927_14846661233199_foqb3q7zb4',
    's2.4'  : '14204540034607_14846689085999_gjejdie4uy',
    's2.5'  : '14204555304495_14846715497007_zdanghuxzu',
    's2.6'  : '14204565200431_14846734371375_ap3bqpabpu',
    's2.7'  : '14204577259055_14846756194863_3ecad2535u',
    's2.8'  : '14204592528943_14846785227311_4hjl46y62e',
    's2.9'  : '14204602621487_14846802594351_ilnp6lxekq',
    's2.10' : '14206184136239_14849618610735_ihnbx7hkoi'
};

// =========================================================================================
// ⚙️ QUALITY CONFIG
// =========================================================================================
const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
let RES_W = 1920, RES_H = 1080, BITRATE = 5000;
if      (selectedQuality === '360p')  { RES_W = 640;  RES_H = 360;  BITRATE = 800;  }
else if (selectedQuality === '480p')  { RES_W = 854;  RES_H = 480;  BITRATE = 1500; }
else if (selectedQuality === '720p')  { RES_W = 1280; RES_H = 720;  BITRATE = 3000; }
else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }
else                                  { RES_W = 1920; RES_H = 1080; BITRATE = 6000; }

console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);
console.log(`[⏱️] Auto-Refresh Time: ${FORCE_REFRESH_MINUTES} Minutes`);

let rawUrls = (process.env.TARGET_URLS || '').trim();
let urlList = rawUrls !== ''
    ? rawUrls.split(',').map(u => u.trim().startsWith('http') ? u.trim() : 'https://' + u.trim())
    : ['https://dadocric.st/player.php?id=starsp3&v=m'];

let currentUrlIndex = 0;
let backupUrlIndex  = urlList.length > 1 ? 1 : 0;

const SELECTED_CHANNEL  = process.env.OKRU_STREAM_ID  || '1';
const SERVER_SELECTION  = process.env.SERVER_SELECTION || 'None';
const PROXY_ENGINE      = process.env.PROXY_ENGINE     || 'Cloudflare WARP (Recommended)';
const ACTIVE_STREAM_KEY = STREAM_KEYS[SELECTED_CHANNEL] || STREAM_KEYS['1'];

let browser    = null;
let obsProcess = null;
let activePage = null;
let backupPage = null;

// =========================================================================================
// 🔬 FREEZE DETECTION THRESHOLDS (Smart HLS-aware)
// =========================================================================================
// If a stream has BIG totalBuffer (>30s) but tiny bufferAhead (<0.5s),
// it's a normal HLS/DASH segment boundary gap — these self-recover in 2-5s.
// We wait longer before swapping. Only swap fast if there's truly no buffer at all.
const FROZEN_THRESHOLD_REAL_MS = 8000;   // true dead stream (buffer = 0) → swap after 8s
const FROZEN_THRESHOLD_HLS_MS  = 15000;  // HLS segment gap (big buffer, tiny ahead) → wait 15s

if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
let pendingScreenshots = [];
let uploadCycleCount   = 0;

// =========================================================================================
// 📡 NETWORK & CONSOLE DIAGNOSTICS (Deep HLS/DASH Debugging)
// =========================================================================================
function setupNetworkDiagnostics(page, pageName) {
    if (!page) return;

    // 1. Log Console Errors
    page.on("console", msg => {
        const type = msg.type();
        const text = msg.text();
        const textLower = text.toLowerCase();
        
        // Only log errors, warnings, or messages containing key failure terms
        if (type === 'error' || type === 'warning' || textLower.includes('manifest') || textLower.includes('hls') || textLower.includes('network') || textLower.includes('403') || textLower.includes('404')) {
            console.log(`[💻] ${pageName.toUpperCase()} CONSOLE [${type.toUpperCase()}]: ${text}`);
        }
    });

    // 2. Log Failed Requests
    page.on("requestfailed", req => {
        const url = req.url();
        const errText = req.failure() ? req.failure().errorText : 'UNKNOWN_ERROR';
        
        // Always log media request failures
        if (url.includes('.m3u8') || url.includes('.ts') || url.includes('.mpd') || url.includes('blob:')) {
            console.log(`[❌] ${pageName.toUpperCase()} MEDIA REQ FAILED: ${errText} -> ${url.substring(0, 150)}`);
        } else if (!url.includes('google') && !url.includes('analytics') && !url.includes('ads') && !url.includes('pop') && !url.includes('tracker')) {
            // Log other potentially blocked requests (ignoring ads/trackers which are naturally blocked)
            // console.log(`[❌] ${pageName.toUpperCase()} REQ FAILED: ${errText} -> ${url.substring(0, 120)}`);
        }
    });

    // 3. Log Media Responses (to check 403, 404, etc.)
    page.on("response", async (res) => {
        const url = res.url();
        const status = res.status();
        
        if (url.includes('.m3u8') || url.includes('.ts') || url.includes('.mpd')) {
            let symbol = status >= 200 && status < 300 ? '✅' : '🔴';
            if (status >= 400) symbol = '❌';
            
            console.log(`[📡] ${pageName.toUpperCase()} MEDIA RES: ${symbol} ${status} -> ${url.substring(0, 150)}`);
        }
    });
}

// =========================================================================================
// 🛡️ NETWORK AD-BLOCKER (REFINED FOR 2026 OBFS)
// =========================================================================================
async function setupNetworkAdBlocker(page) {
    if (!page) return;
    try {
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            const url  = request.url().toLowerCase();
            const type = request.resourceType();

            // We MUST NOT aggressively block popads/exoclick via request.abort() 
            // because streamed.pk and JWPlayer ties their m3u8 token generation to the popup firing.
            // If the network request fails, the player crashes with manifestLoadError.
            // Instead, we let the network request go through, but we kill the new tab via 'targetcreated'.

            if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
                const adKw = ['fanduel','bet','casino','adrevenue'];
                if (adKw.some(k => url.includes(k))) {
                    console.log(`[🛡️] NAVIGATION SHIELD: Blocked -> ${url.substring(0, 70)}`);
                    request.abort().catch(() => {}); return;
                }
            }

            if (
                url.includes('doubleclick') ||
                (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('zone')))
            ) {
                request.abort().catch(() => {});
            } else {
                request.continue().catch(() => {});
            }
        });
    } catch (e) { console.log('[⚠️] Request interception setup failed.'); }
}

// =========================================================================================
// 🔥 PRELOAD FIREWALL
// =========================================================================================
async function applyPreloadFirewall(page) {
    if (!page) return;
    try {
        await page.evaluateOnNewDocument(() => {
            window.alert   = function() {};
            window.confirm = function() { return true; };
            window.prompt  = function() { return null; };
            window.open    = function() { return null; };
            Object.defineProperty(window, 'onbeforeunload', {
                configurable: true,
                get: function() { return null; },
                set: function() { return null; }
            });
            document.addEventListener('click', (e) => {
                const target = e.target;
                if (target && (target.tagName === 'A' || target.closest('a'))) {
                    const link = target.tagName === 'A' ? target : target.closest('a');
                    if (link.href && !link.href.includes(window.location.hostname) && !link.href.includes('javascript')) {
                        e.preventDefault(); e.stopPropagation(); return false;
                    }
                }
            }, true);
            const style = document.createElement('style');
            style.textContent = `html, body { background-color: #000 !important; overflow: hidden !important; }`;
            document.documentElement.appendChild(style);
        });
    } catch (e) { console.log(`[🛡️] Preload firewall error.`); }
}

// =========================================================================================
// 📸 SCREENSHOT + BATCH UPLOAD
// =========================================================================================
async function takeAndBatchScreenshot(page, stepName) {
    if (!page) return;
    try {
        const ts       = new Date().toISOString().replace(/[:.]/g, '-');
        const filePath = `./screenshots/snap_${ts}_${stepName}.png`;
        await page.screenshot({ path: filePath });
        console.log(`[📸] Screenshot: ${filePath}`);
        pendingScreenshots.push(filePath);
        if (pendingScreenshots.length >= 3) {
            try {
                const tag = 'live-stream-logs';
                try { execSync(`gh release view ${tag} || gh release create ${tag} -t "Live Logs"`, { stdio: 'ignore' }); } catch(e) {}
                try {
                    const old = execSync(`gh release view ${tag} --json assets -q ".assets[].name"`, { encoding: 'utf-8' }).trim().split('\n');
                    for (const a of old) if (a) execSync(`gh release delete-asset ${tag} "${a}" -y`, { stdio: 'ignore' });
                } catch(e) {}
                exec(`gh release upload ${tag} ${pendingScreenshots.join(' ')} --clobber`, (err) => { if (!err) uploadCycleCount++; });
                pendingScreenshots = [];
            } catch (err) {}
        }
    } catch (e) {}
}

// =========================================================================================
// 🖥️ LOADING UI
// =========================================================================================
async function showLoadingUI(page, title, sub) {
    try {
        await page.evaluate((t, s) => {
            if (window.self !== window.top) return;
            let ov = document.getElementById('smart-stream-overlay');
            if (ov) {
                const te = ov.querySelector('.stream-title');
                const se = ov.querySelector('.stream-sub');
                if (te) te.innerHTML = t;
                if (se) se.innerHTML = s;
                ov.style.setProperty('display', 'flex', 'important');
                ov.style.setProperty('opacity', '1', 'important');
                ov.style.setProperty('z-index', '2147483647', 'important');
            } else {
                ov = document.createElement('div');
                ov.id = 'smart-stream-overlay';
                ov.innerHTML = `
                <style>
                    #smart-stream-overlay{position:fixed!important;top:0!important;left:0!important;right:0!important;bottom:0!important;
                    width:100vw!important;height:100vh!important;background:#000!important;z-index:2147483647!important;
                    display:flex!important;flex-direction:column!important;justify-content:center!important;align-items:center!important;
                    color:#fff!important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif!important;}
                    .ss-spin{width:80px;height:80px;border:6px solid rgba(255,255,255,0.1);border-top:6px solid #e50914;border-radius:50%;
                    animation:ss-s 1s linear infinite;margin-bottom:25px;box-shadow:0 0 25px rgba(229,9,20,0.4);}
                    .ss-bar{width:300px;height:6px;background:rgba(255,255,255,0.1);border-radius:10px;margin-bottom:30px;overflow:hidden;position:relative;}
                    .ss-fill{width:100%;height:100%;background:linear-gradient(90deg,#e50914,#ff4d4d);position:absolute;left:-100%;animation:ss-p 2s cubic-bezier(0.4,0,0.2,1) infinite;}
                    @keyframes ss-s{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
                    @keyframes ss-p{0%{left:-100%}50%{left:0}100%{left:100%}}
                    .stream-title{font-size:36px!important;font-weight:800!important;letter-spacing:3px!important;margin-bottom:15px!important;text-transform:uppercase!important;}
                    .stream-sub{font-size:20px!important;color:#ccc!important;text-align:center!important;}
                </style>
                <div class="ss-spin"></div>
                <div class="ss-bar"><div class="ss-fill"></div></div>
                <div class="stream-title">${t}</div>
                <div class="stream-sub">${s}</div>`;
                document.documentElement.appendChild(ov);
            }
        }, title, sub);
    } catch (e) {}
}

async function hideLoadingUI(page) {
    try {
        await page.evaluate(() => {
            const ov = document.getElementById('smart-stream-overlay');
            if (ov) { ov.style.setProperty('display', 'none', 'important'); ov.remove(); }
        });
    } catch (e) {}
}

// =========================================================================================
// ⚠️ RECOVERY SHIELD UI
// =========================================================================================
async function showRecoveryUI(page) {
    try {
        await page.evaluate(() => {
            if (window.self !== window.top) return;
            let ov = document.getElementById('stream-recovery-overlay');
            if (ov) { ov.style.setProperty('display', 'flex', 'important'); return; }
            ov = document.createElement('div');
            ov.id = 'stream-recovery-overlay';
            ov.innerHTML = `
            <style>
                #stream-recovery-overlay{position:fixed!important;top:0!important;left:0!important;right:0!important;bottom:0!important;
                width:100vw!important;height:100vh!important;background:rgba(0,0,0,0.95)!important;z-index:2147483647!important;
                display:flex!important;flex-direction:column!important;justify-content:center!important;align-items:center!important;
                color:#fff!important;font-family:Arial,sans-serif!important;}
                .rr{width:100px;height:100px;border-radius:50%;border:3px solid transparent;border-top-color:#ff9800;border-bottom-color:#ff9800;
                animation:rrs 1.5s cubic-bezier(0.68,-0.55,0.265,1.55) infinite;margin-bottom:20px;box-shadow:0 0 30px rgba(255,152,0,0.3);}
                @keyframes rrs{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
                .rt{font-size:32px!important;font-weight:800!important;color:#ff9800!important;letter-spacing:2px!important;
                margin-bottom:10px!important;text-transform:uppercase!important;}
                .rs{font-size:18px!important;color:#ddd!important;animation:rp 1.5s infinite;}
                @keyframes rp{0%,100%{opacity:1}50%{opacity:0.4}}
            </style>
            <div class="rr"></div>
            <div class="rt">SIGNAL LOST</div>
            <div class="rs">Attempting Auto-Recovery...</div>`;
            document.documentElement.appendChild(ov);
        });
    } catch (e) {}
}

async function hideRecoveryUI(page) {
    try {
        await page.evaluate(() => {
            const ov = document.getElementById('stream-recovery-overlay');
            if (ov) ov.style.setProperty('display', 'none', 'important');
        });
    } catch (e) {}
}

// =========================================================================================
// ⚙️ OBS CONFIG
// =========================================================================================
function setupOBSConfig() {
    const obsDir      = path.join(os.homedir(), '.config', 'obs-studio');
    const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
    const scenesDir   = path.join(obsDir, 'basic', 'scenes');
    fs.mkdirSync(profilesDir, { recursive: true });
    fs.mkdirSync(scenesDir,   { recursive: true });

    fs.writeFileSync(path.join(obsDir, 'global.ini'),
        `[General]\nLicenseAccepted=true\n[BasicWindow]\nShowAutoConfig=false\nWarned=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`);

    fs.writeFileSync(path.join(profilesDir, 'basic.ini'),
        `[General]\nName=Untitled\n[Video]\nBaseCX=${RES_W}\nBaseCY=${RES_H}\nOutputCX=${RES_W}\nOutputCY=${RES_H}\nFPSCommon=30\n[Output]\nMode=Simple\n[SimpleOutput]\nVBitrate=${BITRATE}\nStreamEncoder=x264\nx264Preset=ultrafast\nx264Settings=keyint=60 tune=zerolatency profile=main threads=4 rc-lookahead=0\n`);

    fs.writeFileSync(path.join(profilesDir, 'service.json'), JSON.stringify({
        settings: { server: 'rtmp://vsu.okcdn.ru/input/', key: ACTIVE_STREAM_KEY },
        type: 'rtmp_custom'
    }, null, 2));

    fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify({
        current_scene: 'WaitingScene', current_program_scene: 'WaitingScene', name: 'Untitled',
        scene_order: [{ name: 'WaitingScene' }, { name: 'MainScene' }],
        sources: [
            { id: 'xshm_input',           name: 'Screen', settings: { show_cursor: false } },
            { id: 'pulse_output_capture', name: 'Audio',  settings: {} },
            { id: 'scene', name: 'MainScene',    settings: { items: [{ name: 'Screen', id: 1, visible: true }, { name: 'Audio', id: 2, visible: true }] } },
            { id: 'scene', name: 'WaitingScene', settings: { items: [{ name: 'Screen', id: 1, visible: true }] } }
        ]
    }, null, 2));
    console.log('[⚙️] OBS config written.');
}

function attachAntiAdListeners(page) {
    page.on('dialog', async d => { try { await d.dismiss(); } catch(e) {} });
}

// =========================================================================================
// 🔊 SMART UNMUTE ENGINE
// =========================================================================================
async function triggerSmartUnmute(page) {
    for (const frame of page.frames()) {
        try {
            if (frame.isDetached()) continue;
            await frame.evaluate(() => {
                Array.from(document.querySelectorAll('button, div, span, a, i')).forEach(el => {
                    const text  = (el.innerText || el.textContent || '').trim().toUpperCase();
                    const onclick = (el.getAttribute('onclick') || '').toLowerCase();
                    const aria  = (el.getAttribute('aria-label') || '').toUpperCase();
                    if (text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('AUDIO') ||
                        onclick.includes('unmute') || onclick.includes('volume') || onclick.includes('audio') ||
                        aria.includes('UNMUTE') || aria.includes('VOLUME')) {
                        const r = el.getBoundingClientRect();
                        if (r.width > 0 && r.height > 0 && window.getComputedStyle(el).display !== 'none') {
                            try { el.click(); } catch(e) {}
                            try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch(e) {}
                        }
                    }
                });
                document.querySelectorAll('video, audio').forEach(m => { if (m.muted) { m.muted = false; m.volume = 1.0; } });
            }).catch(() => {});
        } catch (e) {}
    }
}

// =========================================================================================
// 🎬 VIDEO INITIALIZER
// =========================================================================================
async function initializeVideo(page, startMuted, isActivePage) {
    try {
        if (SERVER_SELECTION !== 'None') {
            console.log(`[*] Clicking Server: ${SERVER_SELECTION}`);
            let clicked = false, attempts = 0;
            while (!clicked && attempts < 10) {
                attempts++;
                try {
                    const ok = await page.evaluate((name) => {
                        const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText && b.innerText.trim().includes(name));
                        if (btn) { btn.click(); return true; } return false;
                    }, SERVER_SELECTION);
                    if (ok) {
                        clicked = true;
                        console.log(`[+] Server button clicked!`);
                        await takeAndBatchScreenshot(page, 'server-clicked');
                        await new Promise(r => setTimeout(r, 2000));
                        if (isActivePage) await page.bringToFront();
                    } else { await new Promise(r => setTimeout(r, 2000)); }
                } catch (err) { await new Promise(r => setTimeout(r, 2000)); }
            }
        }

        console.log('[*] Checking autoplay / play button...');
        let playing = false, tries = 0;
        while (!playing && tries < 15) {
            for (const frame of page.frames()) {
                try {
                    const autoPlayed = await frame.evaluate(() => {
                        let p = false;
                        document.querySelectorAll('video').forEach(v => {
                            if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) { v.muted = false; v.volume = 1.0; p = true; }
                        });
                        return p;
                    });
                    if (autoPlayed) { playing = true; break; }

                    const btn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play');
                    if (btn) {
                        const vis = await frame.evaluate(el => {
                            const s = window.getComputedStyle(el);
                            return s.display !== 'none' && s.visibility !== 'hidden' && s.opacity !== '0';
                        }, btn);
                        if (vis) {
                            await frame.evaluate(el => el.click(), btn);
                            await takeAndBatchScreenshot(page, 'play-btn-clicked');
                            await new Promise(r => setTimeout(r, 3000));
                            playing = true; break;
                        }
                    }

                    if (!playing && tries > 5) {
                        const forced = await frame.evaluate(async () => {
                            let done = false;
                            for (const v of document.querySelectorAll('video')) {
                                if (v.clientWidth > 50) {
                                    v.muted = false; v.volume = 1.0;
                                    try { v.click(); } catch(e) {}
                                    try { const p = v.play(); if (p) p.catch(() => {}); done = true; } catch(e) {}
                                }
                            }
                            return done;
                        });
                        if (forced) { await takeAndBatchScreenshot(page, 'force-play'); playing = true; break; }
                    }
                } catch (err) {}
            }
            if (!playing) await new Promise(r => setTimeout(r, 2000));
            tries++;
        }

        // Find primary video frame
        let targetFrame = null;
        for (const frame of page.frames()) {
            try {
                const isReal = await frame.evaluate(() => {
                    const v = document.querySelector('video');
                    return v && v.clientWidth > 50 && v.clientHeight > 50;
                });
                if (isReal) { targetFrame = frame; console.log(`[+] Video frame locked!`); break; }
            } catch (e) {}
        }
        if (!targetFrame) targetFrame = page.mainFrame();

        // Page-level layout enforcer (500ms interval)
        await page.evaluate(() => {
            setInterval(() => {
                try {
                    document.documentElement.style.setProperty('background-color', 'black', 'important');
                    document.body.style.setProperty('background-color', 'black', 'important');
                    document.body.style.setProperty('overflow', 'hidden', 'important');

                    const iframes = Array.from(document.querySelectorAll('iframe'));
                    let mainIframe = null, maxScore = -1;
                    iframes.forEach(ifr => {
                        const area = ifr.clientWidth * ifr.clientHeight;
                        if (area < 5000) return;
                        let score = area;
                        if (ifr.hasAttribute('allowfullscreen') || ifr.hasAttribute('webkitallowfullscreen')) score += 10000000;
                        if (ifr.clientHeight > ifr.clientWidth) score = -1;
                        if (score > maxScore) { maxScore = score; mainIframe = ifr; }
                    });
                    if (!mainIframe && iframes.length > 0) {
                        mainIframe = iframes.find(ifr => ifr.getAttribute('allowfullscreen') !== null ||
                            (ifr.src && (ifr.src.includes('player') || ifr.src.includes('embed') || ifr.src.includes('stream'))));
                    }
                    if (mainIframe) {
                        iframes.forEach(ifr => {
                            if (ifr !== mainIframe) {
                                ifr.style.setProperty('display', 'none', 'important');
                                if (ifr.parentNode && ifr.parentNode !== document.body)
                                    try { ifr.parentNode.style.setProperty('display', 'none', 'important'); } catch(e) {}
                            }
                        });
                        ['position:fixed','top:0','left:0','width:100vw','height:100vh',
                         'z-index:2147483645','border:none'].forEach(s => {
                            const [k, v] = s.split(':');
                            mainIframe.style.setProperty(k, v, 'important');
                        });
                    }

                    // Remove junk UI
                    document.querySelectorAll('.chat, #chat, header, footer, .sidebar, .banner, .ads, [id*="pop"], [class*="pop"], [class*="notification"]').forEach(el => {
                        try { el.remove(); } catch(e) { el.style.setProperty('display', 'none', 'important'); }
                    });
                    const badKw = ['jerk','mate','adult','dating','close','notification','justine','paying'];
                    document.querySelectorAll('div, section, span, a').forEach(el => {
                        if (el.id === 'smart-stream-overlay' || el.id === 'stream-recovery-overlay') return;
                        const s = window.getComputedStyle(el);
                        if ((s.position === 'fixed' || s.position === 'absolute') && el.innerText) {
                            if (badKw.some(k => el.innerText.toLowerCase().includes(k)) ||
                                (parseInt(s.zIndex) > 100000 && !el.querySelector('video') && !el.querySelector('iframe'))) {
                                try { el.remove(); } catch(e) { el.style.setProperty('display', 'none', 'important'); }
                            }
                        }
                    });
                } catch (err) {}
            }, 500);
        }).catch(() => {});

        // Frame-level video enforcer (500ms interval)
        await targetFrame.evaluate((muted) => {
            setInterval(() => {
                try {
                    const style = document.createElement('style');
                    style.innerHTML = `.jw-controls,.jw-ui,.plyr__controls,.vjs-control-bar{display:none!important;opacity:0!important;}`;
                    document.head.appendChild(style);

                    const videos = Array.from(document.querySelectorAll('video'));
                    document.querySelectorAll('video, audio').forEach(m => { m.muted = muted; m.volume = muted ? 0 : 1.0; });
                    if (!muted) {
                        document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted').forEach(btn => { try { btn.click(); } catch(e) {} });
                    }
                    const realVideo = videos.find(v => v.clientWidth > 100 && v.clientHeight > 100) || videos[0];
                    if (realVideo) {
                        ['position:fixed','top:0','left:0','width:100vw','height:100vh',
                         'z-index:2147483646','object-fit:contain','opacity:1','display:block'].forEach(s => {
                            const [k, v] = s.split(':');
                            realVideo.style.setProperty(k, v, 'important');
                        });
                    }
                } catch(err) {}
            }, 500);
        }, startMuted).catch(() => {});

    } catch (e) {}

    await triggerSmartUnmute(page);
    await new Promise(r => setTimeout(r, 1000));
}

// =========================================================================================
// 🔬 CHECK PAGE STATUS — Deep Video Diagnostics
// =========================================================================================
async function checkPageStatus(page) {
    if (!page) return { status: 'DEAD', diag: { reason: 'Page is null' } };
    try {
        for (const frame of page.frames()) {
            try {
                if (frame.isDetached()) continue;
                const result = await Promise.race([
                    frame.evaluate(() => {
                        const bodyText = document.body ? document.body.innerText.toLowerCase() : '';
                        if (bodyText.includes('stream error') || bodyText.includes('not found') ||
                            bodyText.includes('domain is blocked') || bodyText.includes('error: forbidden') ||
                            bodyText.includes('access denied') ||
                            (bodyText.includes('cloudflare') && bodyText.includes('blocked'))) {
                            return { status: 'CRITICAL_ERROR', diag: { reason: 'Error text on page', bodySnippet: bodyText.substring(0, 200) } };
                        }

                        const videos = Array.from(document.querySelectorAll('video'));
                        if (videos.length === 0)
                            return { status: 'DEAD', diag: { reason: 'No <video> elements found', iframeCount: document.querySelectorAll('iframe').length } };

                        let targetV = null;
                        for (const v of videos) {
                            if (v.clientWidth > 0 && v.clientWidth < 100) continue;
                            if ((v.src && v.src.startsWith('blob:')) || v.matches('.jw-video,.plyr__video,.vjs-tech')) { targetV = v; break; }
                        }
                        if (!targetV) targetV = videos.sort((a, b) => (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight))[0];

                        const READY   = ['HAVE_NOTHING','HAVE_METADATA','HAVE_CURRENT_DATA','HAVE_FUTURE_DATA','HAVE_ENOUGH_DATA'];
                        const NETWORK = ['NETWORK_EMPTY','NETWORK_IDLE','NETWORK_LOADING','NETWORK_NO_SOURCE'];

                        const buildDiag = (v) => {
                            if (!v) return { reason: 'No suitable video element', videoCount: videos.length };
                            let bufferedRanges = [], totalBufferedSec = 0, bufferAheadSec = 0;
                            try {
                                for (let i = 0; i < v.buffered.length; i++) {
                                    const s = v.buffered.start(i), e = v.buffered.end(i);
                                    bufferedRanges.push(`${s.toFixed(1)}-${e.toFixed(1)}`);
                                    totalBufferedSec += (e - s);
                                    if (s <= v.currentTime && v.currentTime <= e) bufferAheadSec = e - v.currentTime;
                                }
                            } catch(e) {}

                            let totalFrames = 0, droppedFrames = 0, corruptedFrames = 0;
                            try {
                                if (v.getVideoPlaybackQuality) {
                                    const q = v.getVideoPlaybackQuality();
                                    totalFrames = q.totalVideoFrames || 0;
                                    droppedFrames = q.droppedVideoFrames || 0;
                                    corruptedFrames = q.corruptedVideoFrames || 0;
                                } else if (v.webkitDecodedFrameCount !== undefined) {
                                    totalFrames = v.webkitDecodedFrameCount;
                                    droppedFrames = v.webkitDroppedFrameCount || 0;
                                }
                            } catch(e) {}

                            let errorInfo = null;
                            if (v.error) {
                                const CODES = {1:'MEDIA_ERR_ABORTED',2:'MEDIA_ERR_NETWORK',3:'MEDIA_ERR_DECODE',4:'MEDIA_ERR_SRC_NOT_SUPPORTED'};
                                errorInfo = { code: v.error.code, name: CODES[v.error.code] || 'UNKNOWN', message: v.error.message || '' };
                            }

                            let srcType = 'unknown';
                            if (v.src) {
                                if (v.src.startsWith('blob:'))     srcType = 'MSE/blob';
                                else if (v.src.includes('.m3u8'))  srcType = 'HLS';
                                else if (v.src.includes('.mpd'))   srcType = 'DASH';
                                else if (v.src.startsWith('http')) srcType = 'Direct URL';
                            }

                            return {
                                currentTime: parseFloat(v.currentTime.toFixed(3)),
                                duration: v.duration === Infinity ? 'LIVE' : (isNaN(v.duration) ? 'NaN' : parseFloat(v.duration.toFixed(1))),
                                paused: v.paused, ended: v.ended, seeking: v.seeking,
                                playbackRate: v.playbackRate, muted: v.muted, volume: v.volume,
                                readyState: v.readyState, readyStateName: READY[v.readyState] || 'UNKNOWN',
                                networkState: v.networkState, networkStateName: NETWORK[v.networkState] || 'UNKNOWN',
                                videoWidth: v.videoWidth, videoHeight: v.videoHeight,
                                clientWidth: v.clientWidth, clientHeight: v.clientHeight,
                                bufferedRanges: bufferedRanges.length > 0 ? bufferedRanges.join(', ') : 'NONE',
                                totalBufferedSec: parseFloat(totalBufferedSec.toFixed(2)),
                                bufferAheadSec: parseFloat(bufferAheadSec.toFixed(2)),
                                totalFrames, droppedFrames, corruptedFrames,
                                frameDropRate: totalFrames > 0 ? ((droppedFrames / totalFrames) * 100).toFixed(2) + '%' : 'N/A',
                                srcType, srcSnippet: v.src ? v.src.substring(0, 80) : 'NO SRC',
                                videoCount: videos.length, error: errorInfo
                            };
                        };

                        if (targetV && !targetV.ended && targetV.currentTime > 0) {
                            let frames = 0;
                            if (targetV.getVideoPlaybackQuality) frames = targetV.getVideoPlaybackQuality().totalVideoFrames;
                            else if (targetV.webkitDecodedFrameCount !== undefined) frames = targetV.webkitDecodedFrameCount;
                            return { status: 'HEALTHY', currentTime: targetV.currentTime, decodedFrames: frames, diag: buildDiag(targetV) };
                        }
                        return { status: 'DEAD', diag: buildDiag(targetV) };
                    }),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2500))
                ]);
                if (result && result.status !== 'DEAD') return result;
            } catch (err) {}
        }
    } catch (e) { return { status: 'DEAD', diag: { reason: 'Exception: ' + (e.message || e) } }; }
    return { status: 'DEAD', diag: { reason: 'No frame returned healthy video' } };
}

// =========================================================================================
// 🔄 HOT-SWAP
// =========================================================================================
async function performHotSwap(reason) {
    console.log(`\n[🔄] ════════════════ HOT-SWAP TRIGGERED ════════════════`);
    console.log(`[🔄] Reason     : ${reason}`);
    console.log(`[🔄] Current URL: [${currentUrlIndex}] ${urlList[currentUrlIndex]}`);

    currentUrlIndex = backupUrlIndex;
    backupUrlIndex  = (backupUrlIndex + 1) % urlList.length;
    if (backupUrlIndex === currentUrlIndex) backupUrlIndex = (currentUrlIndex + 1) % urlList.length;

    const newActiveUrl = urlList[currentUrlIndex];
    const newBackupUrl = urlList[backupUrlIndex];
    console.log(`[🔄] Swapping to : [${currentUrlIndex}] ${newActiveUrl}`);
    console.log(`[🔄] Next backup : [${backupUrlIndex}] ${newBackupUrl}`);

    try {
        await showLoadingUI(activePage, 'SWITCHING STREAM', `Loading server ${currentUrlIndex + 1}...`);
        setupNetworkDiagnostics(activePage, 'Active_HotSwap');
        await activePage.goto(newActiveUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await new Promise(r => setTimeout(r, 3000));
        await initializeVideo(activePage, false, true);
        console.log(`[✅] HOT-SWAP complete → ${newActiveUrl}`);
        await takeAndBatchScreenshot(activePage, 'after-hotswap');
    } catch (err) {
        console.log(`[⚠️] HOT-SWAP navigation error: ${err.message}`);
    }

    if (backupPage && urlList.length > 1 && newBackupUrl !== newActiveUrl) {
        try {
            setupNetworkDiagnostics(backupPage, 'Backup_HotSwap');
            await backupPage.goto(newBackupUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
            await initializeVideo(backupPage, true, false);
            console.log(`[⏭️] Backup ready: ${newBackupUrl}`);
        } catch (err) {
            console.log(`[⚠️] Backup load error: ${err.message}`);
        }
    }
}

// =========================================================================================
// 👁️ WATCHDOG
// =========================================================================================
async function startWatchdog() {
    let lastActiveTime       = -1;
    let lastDecodedFrames    = -1;
    let frozenCheckTimestamp = Date.now();
    let watchdogTicks        = 0;
    let streamSetupTime      = Date.now();
    let isWarmupPhase        = true;
    let firstHealthyTime     = 0;       // when stream first became healthy (for warmup timer)
    let isRecoveryUIShown    = false;
    const WARMUP_MAX_TIME    = 25000;   // 25s max hard warmup
    const WARMUP_HEALTHY_MS  = 10000;   // must be HEALTHY for 10s before hang detection starts

    let currentStreamStartTime = Date.now();

    while (true) {
        if (!browser || !browser.isConnected()) throw new Error('Browser closed unexpectedly.');

        let activeStatus = await checkPageStatus(activePage);

        // ── Proactive force-refresh check ──
        if (activeStatus.status === 'HEALTHY' && !isWarmupPhase) {
            const elapsed    = Date.now() - currentStreamStartTime;
            const isExempted = NO_REFRESH_DOMAINS.some(d => urlList[currentUrlIndex].includes(d));
            if (elapsed > FORCE_REFRESH_MS && !isExempted) {
                console.log(`\n[⏱️] ${FORCE_REFRESH_MINUTES}min limit reached. Proactive refresh...`);
                activeStatus.status = 'FORCE_REFRESH';
            }
        }

        // ── HEALTHY path ──
        if (activeStatus.status === 'HEALTHY') {
            await hideLoadingUI(activePage);
            await triggerSmartUnmute(activePage);

            // Warmup: stream must be HEALTHY for WARMUP_HEALTHY_MS continuously before hang detection
            if (isWarmupPhase) {
                if (firstHealthyTime === 0) firstHealthyTime = Date.now();
                if (Date.now() - firstHealthyTime >= WARMUP_HEALTHY_MS) {
                    isWarmupPhase = false;
                    console.log(`[✅] Warmup complete. Hang detection now active.`);
                }
            }

            const diag         = activeStatus.diag || {};
            const isTimeStuck  = (activeStatus.currentTime === lastActiveTime);
            const isFrameStuck = (activeStatus.decodedFrames === lastDecodedFrames && activeStatus.decodedFrames > 0);

            if (!isWarmupPhase && (isTimeStuck || isFrameStuck)) {
                // Show recovery UI on first detection
                if (!isRecoveryUIShown) {
                    await showRecoveryUI(activePage);
                    isRecoveryUIShown = true;

                    const frozenMs = Date.now() - frozenCheckTimestamp;
                    let hangType = 'UNKNOWN';
                    if (isTimeStuck && isFrameStuck)  hangType = 'COMPLETE_FREEZE (Time + Frames both stuck)';
                    else if (isFrameStuck)             hangType = 'BLACK_SCREEN (Audio plays, video frames stuck)';
                    else if (isTimeStuck)              hangType = 'TIME_STALL (currentTime not advancing)';

                    // ── Smart classification ──
                    const bigBuffer = (diag.totalBufferedSec || 0) > 30;
                    const tinyAhead = (diag.bufferAheadSec  || 0) < 0.5;
                    const isHlsGap  = bigBuffer && tinyAhead;
                    const threshold = isHlsGap ? FROZEN_THRESHOLD_HLS_MS : FROZEN_THRESHOLD_REAL_MS;

                    console.log(`\n[⚠️] ════════════════════════════════════════════════════`);
                    console.log(`[⚠️] 🔬 STREAM HANG — DIAGNOSTIC REPORT`);
                    console.log(`[⚠️] ════════════════════════════════════════════════════`);
                    console.log(`[⚠️]  Hang Type       : ${hangType}`);
                    console.log(`[⚠️]  Mode            : ${isHlsGap ? '⏳ HLS Segment Gap (self-recovery expected)' : '🔴 Real Dead Stream'}`);
                    console.log(`[⚠️]  Swap Threshold  : ${threshold/1000}s`);
                    console.log(`[⚠️]  Frozen for      : ${(frozenMs/1000).toFixed(1)}s`);
                    console.log(`[⚠️]  ── Playback ──`);
                    console.log(`[⚠️]  currentTime     : ${diag.currentTime}s (prev: ${lastActiveTime !== -1 ? lastActiveTime.toFixed(3)+'s' : 'INIT'})`);
                    console.log(`[⚠️]  paused/ended    : ${diag.paused} / ${diag.ended}`);
                    console.log(`[⚠️]  seeking         : ${diag.seeking}`);
                    console.log(`[⚠️]  playbackRate    : ${diag.playbackRate}`);
                    console.log(`[⚠️]  muted/volume    : ${diag.muted} / ${diag.volume}`);
                    console.log(`[⚠️]  ── Media State ──`);
                    console.log(`[⚠️]  readyState      : ${diag.readyState} (${diag.readyStateName})`);
                    console.log(`[⚠️]  networkState    : ${diag.networkState} (${diag.networkStateName})`);
                    console.log(`[⚠️]  ── Frames ──`);
                    console.log(`[⚠️]  totalFrames     : ${diag.totalFrames} (prev: ${lastDecodedFrames})`);
                    console.log(`[⚠️]  droppedFrames   : ${diag.droppedFrames}`);
                    console.log(`[⚠️]  corruptedFrames : ${diag.corruptedFrames}`);
                    console.log(`[⚠️]  frameDropRate   : ${diag.frameDropRate}`);
                    console.log(`[⚠️]  ── Buffer ──`);
                    console.log(`[⚠️]  bufferedRanges  : ${diag.bufferedRanges}`);
                    console.log(`[⚠️]  totalBuffered   : ${diag.totalBufferedSec}s`);
                    console.log(`[⚠️]  bufferAhead     : ${diag.bufferAheadSec}s`);
                    console.log(`[⚠️]  ── Video Element ──`);
                    console.log(`[⚠️]  resolution      : ${diag.videoWidth}x${diag.videoHeight} (display: ${diag.clientWidth}x${diag.clientHeight})`);
                    console.log(`[⚠️]  srcType         : ${diag.srcType}`);
                    console.log(`[⚠️]  src             : ${diag.srcSnippet}`);
                    console.log(`[⚠️]  videoCount      : ${diag.videoCount}`);
                    if (diag.error) {
                        console.log(`[⚠️]  ── VIDEO ERROR ──`);
                        console.log(`[⚠️]  error           : ${diag.error.code} (${diag.error.name}): ${diag.error.message}`);
                    }
                    console.log(`[⚠️] ════════════════════════════════════════════════════\n`);
                }

                // ── Smart swap threshold ──
                const bigBuffer       = (diag.totalBufferedSec || 0) > 30;
                const tinyAhead       = (diag.bufferAheadSec  || 0) < 0.5;
                const isHlsGap        = bigBuffer && tinyAhead;
                const effectiveThresh = isHlsGap ? FROZEN_THRESHOLD_HLS_MS : FROZEN_THRESHOLD_REAL_MS;

                if (Date.now() - frozenCheckTimestamp > effectiveThresh) {
                    let verdict = '⚠️ FROZEN: ';
                    if (isFrameStuck && !isTimeStuck)     verdict += 'BLACK SCREEN (audio ok, video frames dead).';
                    else if (isTimeStuck && isFrameStuck) verdict += 'COMPLETE FREEZE (network stall / source died).';
                    else if (isTimeStuck)                 verdict += 'TIME STALL (buffering underrun).';
                    if (tinyAhead)           verdict += ` Buffer critically low (${diag.bufferAheadSec}s).`;
                    if (isHlsGap)            verdict += ` [HLS gap — waited ${effectiveThresh/1000}s].`;
                    if (diag.networkState === 3) verdict += ' NETWORK_NO_SOURCE!';
                    if (diag.readyState <= 1)    verdict += ` readyState=${diag.readyState}.`;
                    if (diag.error)              verdict += ` VIDEO ERROR: ${diag.error.name}.`;
                    if (diag.droppedFrames > 0 && diag.totalFrames > 0 && (diag.droppedFrames / diag.totalFrames) > 0.1)
                        verdict += ` HIGH DROP RATE: ${diag.frameDropRate}.`;

                    console.log(`[!] ${verdict} → Triggering HOT-SWAP.`);
                    isRecoveryUIShown = false;
                    activeStatus.status = 'FROZEN';
                }

            } else if (!isWarmupPhase) {
                // ── Stream progressing normally ──
                lastActiveTime       = activeStatus.currentTime;
                lastDecodedFrames    = activeStatus.decodedFrames;
                frozenCheckTimestamp = Date.now();

                if (isRecoveryUIShown) {
                    await hideRecoveryUI(activePage);
                    isRecoveryUIShown = false;
                    console.log(`[✅] Stream recovered! Buffer: ${diag.bufferAheadSec || '?'}s | Frames: ${diag.totalFrames || '?'} | Drop: ${diag.frameDropRate || '?'}`);
                }

                // Keep audio unmuted
                for (const frame of activePage.frames()) {
                    try {
                        if (!frame.isDetached()) {
                            frame.evaluate(() => {
                                document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; });
                                document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted').forEach(btn => { try { btn.click(); } catch(e) {} });
                            }).catch(() => {});
                        }
                    } catch(e) {}
                }
            }
        }

        // Keep backup page muted
        if (backupPage) {
            for (const frame of backupPage.frames()) {
                try {
                    if (!frame.isDetached()) {
                        frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0; }); }).catch(() => {});
                    }
                } catch(e) {}
            }
        }

        watchdogTicks++;

        // ── Heartbeat every 90 ticks (~3 min) ──
        if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
            const d = activeStatus.diag || {};
            console.log(`\n[💓] ═══════════ WATCHDOG HEARTBEAT tick #${watchdogTicks} ═══════════`);
            console.log(`[💓] Status  : ${activeStatus.status}${isWarmupPhase ? ' (WARMUP)' : ''} | Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1)+'s' : 'N/A'} | Frames: ${activeStatus.decodedFrames || 0}`);
            console.log(`[💓] Buffer  : ${d.bufferAheadSec || '?'}s ahead | Ready: ${d.readyStateName || '?'} | Net: ${d.networkStateName || '?'}`);
            console.log(`[💓] Dropped : ${d.droppedFrames || 0}/${d.totalFrames || 0} (${d.frameDropRate || 'N/A'}) | Res: ${d.videoWidth || '?'}x${d.videoHeight || '?'}`);
            console.log(`[▶️] LIVE   : [${currentUrlIndex}] ${urlList[currentUrlIndex]}`);
            console.log(`[⏭️] NEXT   : [${backupUrlIndex}] ${urlList[backupUrlIndex]}`);
        }

        if (watchdogTicks % 120 === 0) {
            await takeAndBatchScreenshot(activePage, `tick-${watchdogTicks}`);
        }

        // ── HOT-SWAP trigger ──
        if (['FROZEN','CRITICAL_ERROR','DEAD','FORCE_REFRESH'].includes(activeStatus.status)) {
            if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) {
                console.log(`[⏳] '${activeStatus.status}' during warm-up phase. Waiting...`);
                await new Promise(r => setTimeout(r, 2000));
                continue;
            }

            const reason = activeStatus.status === 'FORCE_REFRESH'
                ? `Proactive ${FORCE_REFRESH_MINUTES}min refresh`
                : `Stream ${activeStatus.status}`;

            await performHotSwap(reason);

            // Reset state after swap
            lastActiveTime         = -1;
            lastDecodedFrames      = -1;
            frozenCheckTimestamp   = Date.now();
            currentStreamStartTime = Date.now();
            isWarmupPhase          = true;
            firstHealthyTime       = 0;
            streamSetupTime        = Date.now();
        }

        await new Promise(r => setTimeout(r, 2000));
    }
}

// =========================================================================================
// 🚀 MAIN
// =========================================================================================
async function main() {
    console.log(`\n[🚀] ════════════════════════════════════════════════════`);
    console.log(`[🚀]  SMART STREAM ENGINE v2.0`);
    console.log(`[🚀]  Channel  : ${SELECTED_CHANNEL}`);
    console.log(`[🚀]  Quality  : ${selectedQuality} (${RES_W}x${RES_H} @ ${BITRATE}kbps)`);
    console.log(`[🚀]  URLs     : ${urlList.length} stream(s) loaded`);
    console.log(`[🚀]  Proxy    : ${PROXY_ENGINE}`);
    console.log(`[🚀]  HLS Gap Wait : ${FROZEN_THRESHOLD_HLS_MS/1000}s | Real Dead Wait: ${FROZEN_THRESHOLD_REAL_MS/1000}s`);
    console.log(`[🚀] ════════════════════════════════════════════════════\n`);

    // 1. OBS Config
    console.log('[1/5] Writing OBS config...');
    setupOBSConfig();

    // 2. Launch OBS
    console.log('[2/5] Launching OBS Studio...');
    try {
        obsProcess = spawn('obs', [
            '--startstreaming', '--minimize-to-tray', '--scene', 'WaitingScene',
            '--profile', 'Untitled', '--disable-shutdown-check'
        ], { detached: true, stdio: 'ignore' });
        obsProcess.unref();
        console.log(`[+] OBS spawned (PID: ${obsProcess.pid})`);
        await new Promise(r => setTimeout(r, 6000));
    } catch (e) {
        console.log(`[⚠️] OBS launch failed (may already be running): ${e.message}`);
    }

    // 3. OBS WebSocket
    console.log('[3/5] Connecting OBS WebSocket...');
    let obsConnected = false;
    for (let i = 0; i < 10; i++) {
        try {
            await obs.connect('ws://127.0.0.1:4455', 'secret');
            console.log(`[+] OBS WebSocket connected!`);
            obsConnected = true; break;
        } catch (e) {
            console.log(`[...] OBS WS attempt ${i + 1}/10 failed. Retrying...`);
            await new Promise(r => setTimeout(r, 3000));
        }
    }
    if (obsConnected) {
        try {
            await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' });
            await obs.call('StartStream');
            console.log('[+] OBS streaming started!');
        } catch (e) { console.log(`[⚠️] OBS stream start: ${e.message}`); }
    } else {
        console.log('[⚠️] OBS WebSocket not reachable. Continuing without OBS control.');
    }

    // 4. Launch Browser
    console.log('[4/5] Launching Chromium...');
    browser = await puppeteer.launch({
        headless: false,
        executablePath: process.env.PUPPETEER_EXEC_PATH || undefined,
        args: [
            '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
            '--disable-blink-features=AutomationControlled',
            '--autoplay-policy=no-user-gesture-required', '--no-first-run',
            '--no-default-browser-check', '--disable-infobars', '--disable-notifications',
            '--disable-popup-blocking', '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding',
            `--window-size=${RES_W},${RES_H}`, '--start-maximized',
            '--use-fake-ui-for-media-stream', '--enable-usermedia-screen-capturing',
            '--alsa-output-device=pulse'
        ],
        defaultViewport: { width: RES_W, height: RES_H },
        ignoreHTTPSErrors: true,
        timeout: 60000
    });
    console.log('[+] Browser launched!');

    // 🛡️ POPUP KILLER (Bypass Player Init Trap)
    browser.on('targetcreated', async (target) => {
        if (target.type() === 'page') {
            try {
                const newPage = await target.page();
                if (newPage) {
                    const pages = await browser.pages();
                    // If it's not our activePage or backupPage, it's a popup! Kill it instantly.
                    if (pages.length > (urlList.length > 1 ? 2 : 1)) {
                        console.log('[🛡️] POPUP KILLED: Allowed stream init, but destroyed popup tab.');
                        await newPage.close().catch(() => {});
                    }
                }
            } catch (e) {}
        }
    });

    // 5. Open pages
    console.log('[5/5] Loading stream pages...');
    const pages = await browser.pages();
    activePage  = pages[0] || await browser.newPage();

    await applyPreloadFirewall(activePage);
    await setupNetworkAdBlocker(activePage);
    attachAntiAdListeners(activePage);
    setupNetworkDiagnostics(activePage, 'Active');

    const activeUrl = urlList[currentUrlIndex];
    console.log(`[*] Navigating to: ${activeUrl}`);
    await showLoadingUI(activePage, 'STREAM LOADING', 'Connecting...');

    try {
        await activePage.goto(activeUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
    } catch (e) { console.log(`[⚠️] Page load timeout (continuing): ${e.message}`); }

    await activePage.bringToFront();
    await new Promise(r => setTimeout(r, 3000));
    await initializeVideo(activePage, false, true);
    await takeAndBatchScreenshot(activePage, 'initial-load');
    console.log(`[✅] Active page ready: ${activeUrl}`);

    // Backup page
    if (urlList.length > 1) {
        try {
            backupPage = await browser.newPage();
            await applyPreloadFirewall(backupPage);
            await setupNetworkAdBlocker(backupPage);
            attachAntiAdListeners(backupPage);
            setupNetworkDiagnostics(backupPage, 'Backup');
            const backupUrl = urlList[backupUrlIndex];
            console.log(`[*] Loading backup: ${backupUrl}`);
            await backupPage.goto(backupUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
            await new Promise(r => setTimeout(r, 2000));
            await initializeVideo(backupPage, true, false);
            console.log(`[✅] Backup ready: ${backupUrl}`);
        } catch (e) {
            console.log(`[⚠️] Backup page failed (ok): ${e.message}`);
            backupPage = null;
        }
    }

    // Start watchdog (infinite loop)
    console.log('\n[🐕] Watchdog starting...\n');
    await startWatchdog();
}

// =========================================================================================
// 🏁 RUN
// =========================================================================================
main().catch(async (err) => {
    console.error(`\n[💥] FATAL ERROR: ${err.message}`);
    console.error(err.stack);
    try { if (browser) await browser.close(); } catch(e) {}
    try { if (obsProcess) obsProcess.kill(); } catch(e) {}
    console.log('[🔁] Restarting in 10 seconds...');
    await new Promise(r => setTimeout(r, 10000));
    main().catch(e => console.error(`[💥] Restart failed: ${e.message}`));
});
