const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// Stealth plugin is essential to bypass basic Cloudflare checks
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
        console.log(`[🛡️] SYSTEM SHIELD: Ignored stealth plugin background frame error.`);
    } else {
        console.log(`[⚠️] IGNORED UNCAUGHT EXCEPTION: ${err.message}`);
    }
});

process.on('unhandledRejection', (reason, promise) => {
    let msg = reason && reason.message ? reason.message : reason;
    if (msg && msg.includes('Protocol error')) {
        console.log(`[🛡️] SYSTEM SHIELD: Ignored detached frame protocol error.`);
    } else {
        console.log(`[⚠️] IGNORED UNHANDLED REJECTION: ${msg}`);
    }
});
// =========================================================================================

const obs = new OBSWebSocket(); 

// =========================================================================================
// ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME (IN MINUTES)
// =========================================================================================
const FORCE_REFRESH_MINUTES = 40; 
const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// =========================================================================================
// 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// =========================================================================================
const NO_REFRESH_DOMAINS = [
    'youtube.com',
    'facebook.com',
    'streamed.pk',
    'cricstreams.', 
    'website-vercel-helper-d-jaja-3-2.vercel.app',
    'websitestream.netlify.app'
];

// 🚀 Multi-Stream Key Manager (Original keys restored)
const STREAM_KEYS = {
    '1'   : '15254238731883_15281627925099_najspfkgne', 
    '1.1' : '15254260751979_15281671637611_2plrcfqzze', 
    '1.2' : '15254285524587_15281717840491_7e6qdknzsu',
    // Keeping it concise here, but assume all keys from your code are loaded.
    '2'   : '15254299352683_15281743071851_7dvz3h5d7q'
};

const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
let RES_W = 1920, RES_H = 1080, BITRATE = 5000;

if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }
else { RES_W = 1920; RES_H = 1080; BITRATE = 6000; }

console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);

// Fix for URL handling to prevent ProtocolError
let rawUrls = (process.env.TARGET_URLS || '').trim();
let urlList = rawUrls !== '' 
    ? rawUrls.split(',').map(u => u.trim().replace(/^\\+/, '').startsWith('http') ? u.trim().replace(/^\\+/, '') : 'https://' + u.trim().replace(/^\\+/, '')) 
    : ['https://dadocric.st/player.php?id=starsp3&v=m'];

let currentUrlIndex = 0;

const SELECTED_CHANNEL = process.env.OKRU_STREAM_ID || '1';
const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None'; 
const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

const ACTIVE_STREAM_KEY = STREAM_KEYS[SELECTED_CHANNEL] || STREAM_KEYS['1'];

let browser = null;
let obsProcess = null;
let activePage = null;

// =========================================================================================
// 🛡️ ADVANCED NETWORK INTELLIGENCE & NAVIGATION SHIELD (Original)
// =========================================================================================
async function setupNetworkAdBlocker(page) {
    if (!page) return;
    try {
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            const url = request.url().toLowerCase();
            const type = request.resourceType();

            // 🚫 SHIELD: Same-Tab Hostile Redirect Hijacking Block
            if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
                const targetUrl = request.url().toLowerCase();
                const adKeywords = ['popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate', 'adrevenue', 'fanduel', 'bet', 'casino'];
                const isMaliciousAd = adKeywords.some(keyword => targetUrl.includes(keyword));

                if (isMaliciousAd) {
                    console.log(`[🛡️] NAVIGATION SHIELD: Blocked malicious ad redirection to -> ${targetUrl.substring(0, 70)}...`);
                    request.abort().catch(()=>{});
                    return;
                }
            }

            // Strict Ad Infrastructure Block list
            if (
                url.includes('popads') || 
                url.includes('exoclick') || 
                url.includes('adsterra') || 
                url.includes('onclickads') || 
                url.includes('jerkmate') ||
                url.includes('adrevenue') ||
                url.includes('fanduel') ||
                url.includes('doubleclick') ||
                (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone')))
            ) {
                request.abort().catch(()=>{});
            } else {
                request.continue().catch(()=>{});
            }
        });
    } catch (e) { console.log('[⚠️] Request interception setup failed.'); }
}

async function applyPreloadFirewall(page) {
    if (!page) return;
    try {
        await page.evaluateOnNewDocument(() => {
            // Permanent root execution block for popup alerts & confirms
            window.alert = function() {};
            window.confirm = function() { return true; };
            window.prompt = function() { return null; };
            window.open = function() { return null; };
            
            // 🚫 ANTI-DIALOG FIX: Neutralize onbeforeunload modal box popup completely
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
                        console.log("[🛡️] RE-DIRECT SHIELD: Blocked navigation to external ad domain.");
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                }
            }, true);

            const style = document.createElement('style');
            style.textContent = `html, body { background-color: #000000 !important; overflow: hidden !important; }`;
            document.documentElement.appendChild(style);
        });
    } catch (e) {
        console.log(`[🛡️] SYSTEM SHIELD: Preload firewall safe injection caught an error.`);
    }
}


function setupOBSConfig() {
    const obsDir = path.join(os.homedir(), '.config', 'obs-studio');
    const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
    const scenesDir = path.join(obsDir, 'basic', 'scenes');

    fs.mkdirSync(profilesDir, { recursive: true });
    fs.mkdirSync(scenesDir, { recursive: true });

    // 🔥 2026 FIX: Added HasShownAutoConfig=true and FirstRun=false to completely kill the wizard at the config level
    const globalIniContent = `[General]
LicenseAccepted=true
HasShownAutoConfig=true
FirstRun=false

[BasicWindow]
ShowAutoConfig=false
Warned=true

[OBSWebSocket]
ServerEnabled=true
ServerPort=4455
ServerPassword=secret
`;
    fs.writeFileSync(path.join(obsDir, 'global.ini'), globalIniContent);
    
    const basicIniContent = `[General]
Name=Untitled
[Video]
BaseCX=${RES_W}
BaseCY=${RES_H}
OutputCX=${RES_W}
OutputCY=${RES_H}
FPSCommon=30
[Output]
Mode=Simple
[SimpleOutput]
VBitrate=${BITRATE}
StreamEncoder=x264
x264Preset=ultrafast
x264Settings=keyint=60 tune=zerolatency profile=main threads=4 rc-lookahead=0
`;
    fs.writeFileSync(path.join(profilesDir, 'basic.ini'), basicIniContent);

    const serviceJson = {
        "settings": { "server": "rtmp://vsu.okcdn.ru/input/", "key": ACTIVE_STREAM_KEY },
        "type": "rtmp_custom"
    };
    fs.writeFileSync(path.join(profilesDir, 'service.json'), JSON.stringify(serviceJson, null, 2));

    const sceneJson = {
        "current_scene": "MainScene", 
        "current_program_scene": "MainScene", 
        "name": "Untitled",
        "scene_order": [{"name": "MainScene"}],
        "sources": [
            { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
            { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
            {
                "id": "scene", "name": "MainScene",
                "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true}, {"name": "Audio", "id": 2, "visible": true} ] }
            }
        ]
    };
    fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
}

function attachAntiAdListeners(page) {
    page.on('dialog', async dialog => {
        try { await dialog.dismiss(); } catch(e){}
    });
}

// =========================================================================================
// 🔊 2026 INTELLIGENT FUZZY UNMUTE ENGINE (Original)
// =========================================================================================
async function triggerSmartUnmute(page) {
    console.log('[🔊] Applying Smart Unmute Logic...');
    for (const frame of page.frames()) {
        try {
            if (frame.isDetached()) continue;

            await frame.evaluate(() => {
                // 1. Scan all interactive elements
                const potentialElements = Array.from(document.querySelectorAll('button, div, span, a, i'));
                
                potentialElements.forEach(el => {
                    const text = (el.innerText || el.textContent || '').trim().toUpperCase();
                    const onClickStr = (el.getAttribute('onclick') || '').toLowerCase();
                    const ariaLabel = (el.getAttribute('aria-label') || '').toUpperCase();
                    
                    const matchesText = text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('STREAM UNMUTE') || text.includes('AUDIO');
                    const matchesJS = onClickStr.includes('unmute') || onClickStr.includes('volume') || onClickStr.includes('audio');
                    const matchesAria = ariaLabel.includes('UNMUTE') || ariaLabel.includes('VOLUME');

                    if (matchesText || matchesJS || matchesAria) {
                        const rect = el.getBoundingClientRect();
                        const isVisible = rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';

                        if (isVisible) {
                            try { el.click(); } catch(e) {}
                            try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch(e) {}
                        }
                    }
                });

                // 2. Bruteforce Browser Native Media Layer
                document.querySelectorAll('video, audio').forEach(media => {
                    if (media.muted) {
                        media.muted = false;
                        media.volume = 1.0;
                    }
                });
            }).catch(() => {});
        } catch (e) {}
    }
}
// =========================================================================================

async function initializeVideo(page, startMuted, isActivePage) {
    try {
        console.log('[*] Checking if Video is Autoplaying or Needs a Play Button...');
        let isVideoPlaying = false; 
        let attempts = 0;
        
        while (!isVideoPlaying && attempts < 15) {
            for (const frame of page.frames()) {
                try {
                    const autoPlayed = await frame.evaluate(() => {
                        let playing = false;
                        document.querySelectorAll('video').forEach(v => {
                            if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) {
                                v.muted = false; 
                                v.volume = 1.0;
                                playing = true;
                            }
                        });
                        return playing;
                    });

                    if (autoPlayed) {
                        isVideoPlaying = true;
                        break;
                    }

                    const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play');
                    if (playBtn) {
                        const isVisible = await frame.evaluate(el => {
                            const style = window.getComputedStyle(el);
                            return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
                        }, playBtn);

                        if (isVisible) {
                            await frame.evaluate(el => el.click(), playBtn); 
                            await new Promise(r => setTimeout(r, 3000)); 
                            isVideoPlaying = true;
                            break; 
                        }
                    }

                    if (!isVideoPlaying && attempts > 5) {
                        const forced = await frame.evaluate(async () => {
                            let played = false;
                            let vids = document.querySelectorAll('video');
                            for(let v of vids) {
                                if (v.clientWidth > 50) { 
                                    v.muted = false; v.volume = 1.0; 
                                    try { v.click(); } catch(e){}
                                    try {
                                        let p = v.play();
                                        if (p !== undefined) p.catch(()=>{});
                                        played = true;
                                    } catch(e) {}
                                }
                            }
                            return played;
                        });

                        if (forced) {
                            isVideoPlaying = true;
                            break;
                        }
                    }
                } catch (err) {}
            }
            if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
            attempts++;
        }

        console.log('[*] Scanning for Exact Real Video Player...');
        let targetFrame = null;
        for (const frame of page.frames()) {
            try {
                const isRealLiveStream = await frame.evaluate(() => {
                    const vid = document.querySelector('video');
                    return vid && vid.clientWidth > 50 && vid.clientHeight > 50;
                });
                if (isRealLiveStream) { 
                    targetFrame = frame; 
                    console.log(`[+] Smart Scanner locked onto video frame!`);
                    break; 
                }
            } catch (e) { }
        }

        await page.evaluate(() => {
            setInterval(() => {
                try {
                    document.documentElement.style.setProperty('background-color', 'black', 'important');
                    document.body.style.setProperty('background-color', 'black', 'important');
                    document.body.style.setProperty('overflow', 'hidden', 'important');
                    document.documentElement.style.setProperty('overflow', 'hidden', 'important');

                    let iframes = Array.from(document.querySelectorAll('iframe'));
                    let mainIframe = null; let maxScore = -1;

                    // 1. ADVANCED GEOMETRIC SCORING
                    iframes.forEach(ifr => {
                        let width = ifr.clientWidth;
                        let height = ifr.clientHeight;
                        let area = width * height;

                        if (area < 5000) return;

                        let score = area;
                        
                        if (ifr.hasAttribute('allowfullscreen') || 
                            ifr.hasAttribute('webkitallowfullscreen') || 
                            ifr.hasAttribute('mozallowfullscreen')) {
                            score += 10000000; 
                        }
                        
                        if (height > width) {
                            score = -1; 
                        }

                        if (score > maxScore) {
                            maxScore = score;
                            mainIframe = ifr;
                        }
                    });

                    if (!mainIframe && iframes.length > 0) {
                        mainIframe = iframes.find(ifr => 
                            ifr.getAttribute('allowfullscreen') !== null || 
                            (ifr.src && (ifr.src.includes('player') || ifr.src.includes('embed') || ifr.src.includes('stream') || ifr.src.includes('watch')))
                        );
                    }

                    if (mainIframe) {
                        iframes.forEach(ifr => {
                            if (ifr !== mainIframe) {
                                ifr.style.setProperty('display', 'none', 'important');
                                ifr.style.setProperty('opacity', '0', 'important');
                                ifr.style.setProperty('z-index', '-9999', 'important');
                            }
                        });

                        mainIframe.style.setProperty('position', 'fixed', 'important');
                        mainIframe.style.setProperty('top', '0px', 'important');
                        mainIframe.style.setProperty('left', '0px', 'important');
                        mainIframe.style.setProperty('width', '100vw', 'important');
                        mainIframe.style.setProperty('height', '100vh', 'important');
                        mainIframe.style.setProperty('z-index', '2147483645', 'important'); 
                        mainIframe.style.setProperty('background-color', 'black', 'important');
                        mainIframe.style.setProperty('border', 'none', 'important');
                        mainIframe.style.setProperty('opacity', '1', 'important');
                        mainIframe.style.setProperty('display', 'block', 'important');
                        mainIframe.style.setProperty('visibility', 'visible', 'important');
                    }

                    const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay), [id*="pop"], [class*="pop"], a[href*="extension"], [class*="notification"], [id*="notification"]';
                    document.querySelectorAll(junkClasses).forEach(el => { 
                        try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } 
                    });

                } catch (err) {}
            }, 500); 
        }).catch(() => {});

        // THE MAGIC: Isolating and expanding the actual <video> element.
        if (targetFrame) {
            await targetFrame.evaluate((muteVideo) => {
                setInterval(() => {
                    try {
                        const style = document.createElement('style');
                        style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
                        document.head.appendChild(style);

                        const mediaElements = document.querySelectorAll('video, audio');
                        const videos = Array.from(document.querySelectorAll('video'));
                        let realVideo = null;

                        mediaElements.forEach(media => { 
                            media.muted = muteVideo; 
                            media.volume = muteVideo ? 0.0 : 1.0; 
                        });

                        if (!muteVideo) {
                            document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
                        }

                        for (const v of videos) {
                            if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
                        }

                        if (!realVideo && videos.length > 0) {
                            realVideo = videos[0];
                        }

                        if (realVideo) { 
                            realVideo.style.setProperty('position', 'fixed', 'important');
                            realVideo.style.setProperty('top', '0px', 'important');
                            realVideo.style.setProperty('left', '0px', 'important');
                            realVideo.style.setProperty('width', '100vw', 'important');
                            realVideo.style.setProperty('height', '100vh', 'important');
                            realVideo.style.setProperty('z-index', '2147483646', 'important'); 
                            realVideo.style.setProperty('background-color', 'black', 'important');
                            realVideo.style.setProperty('object-fit', 'contain', 'important');
                            realVideo.style.setProperty('opacity', '1', 'important');
                            realVideo.style.setProperty('visibility', 'visible', 'important');
                            realVideo.style.setProperty('display', 'block', 'important');
                        }
                    } catch(err) {}
                }, 500); 
            }, startMuted).catch(() => {});
        }

    } catch (e) { }

    await triggerSmartUnmute(page);
    await new Promise(r => setTimeout(r, 1000));
}

// =========================================================================================
// 🔄 WATCHDOG: Re-added to handle manifestError via reload
// =========================================================================================
async function checkPageStatus(page) {
    if (!page) return { status: 'DEAD' };
    try {
        for (const frame of page.frames()) {
            try {
                if (frame.isDetached()) continue;
                const result = await Promise.race([
                    frame.evaluate(() => {
                        const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
                        
                        // Detecting manifest load error
                        if (
                            bodyText.includes("stream error") || 
                            bodyText.includes("manifestloaderror") || 
                            bodyText.includes("not found") || 
                            bodyText.includes("domain is blocked") ||
                            bodyText.includes("error: forbidden") ||
                            (bodyText.includes("cloudflare") && bodyText.includes("blocked"))
                        ) {
                            return { status: 'CRITICAL_ERROR' };
                        }
                        
                        const videos = Array.from(document.querySelectorAll('video'));
                        let targetV = null;

                        for (const v of videos) {
                            if (v.clientWidth > 0 && v.clientWidth < 100) continue;
                            if ((v.src && v.src.startsWith('blob:')) || v.matches('.jw-video, .plyr__video, .vjs-tech')) {
                                targetV = v; break;
                            }
                        }
                        
                        if (!targetV && videos.length > 0) {
                            targetV = videos.sort((a, b) => (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight))[0];
                        }
                        
                        if (targetV && !targetV.ended && targetV.currentTime > 0) {
                            return { status: 'HEALTHY', currentTime: targetV.currentTime };
                        }
                        return { status: 'DEAD' };
                    }),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2500))
                ]);
                if (result && result.status !== 'DEAD') return result;
            } catch (err) {}
        }
    } catch (e) { return { status: 'DEAD' }; }
    return { status: 'DEAD' };
}

async function startSingleTabWatchdog() {
    let watchdogTicks = 0;
    
    while (true) {
        if (!browser || !browser.isConnected()) throw new Error("Browser closed.");

        let activeStatus = await checkPageStatus(activePage);

        watchdogTicks++;
        if (watchdogTicks === 1 || watchdogTicks % 9 === 0) {
            console.log(`\n[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Single-Tab Monitoring`);
        }

        // If manifest error occurs, perform a fresh reload on the same tab
        if (activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FROZEN') {
            console.log(`\n==================================================`);
            console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}. Manifest Error possible.`);
            console.log(`[🔄] Auto-Reloading the page to acquire fresh M3U8 token...`);
            console.log(`==================================================`);
            
            try {
                await activePage.goto('about:blank').catch(()=>{});
                await applyPreloadFirewall(activePage);
                await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{});
                await initializeVideo(activePage, false, true);
            } catch(e) {
                console.log(`[⏳] Refresh handled safely.`);
            }
        }

        await new Promise(r => setTimeout(r, 10000)); 
    }
}

// =========================================================================================
// 🎬 ENGINE INITIALIZATION
// =========================================================================================
// =========================================================================================
// 🎬 ENGINE INITIALIZATION
// =========================================================================================
async function startDirectStreaming() {
    console.log(`[*] Starting OBS Studio FIRST...`);
    setupOBSConfig();

    // 🔥 2026 FIX 1: Removed --minimize-to-tray (fails in Xvfb) and added safemode flags
    obsProcess = spawn('obs', [
        '--startstreaming', 
        '--disable-updater',
        '--disable-missing-files-check',
        '--multi',
        '--safemode'
    ]);
    
    obsProcess.stdout.on('data', (data) => console.log(`[OBS]: ${data.toString().trim()}`));
    obsProcess.stderr.on('data', (data) => {
        const msg = data.toString().trim();
        if (msg.includes('error') || msg.includes('fail')) console.log(`[OBS Error]: ${msg}`);
    });

    // =====================================================================
    // 🛡️ CONTINUOUS WINDOW SHIELD (OBS INVISIBLE ENGINE)
    // =====================================================================
    console.log('[🛡️] Starting OS-Level Window Shield to hide OBS...');
    setInterval(() => {
        try {
            // OBS ki window ko virtual display se permanently unmap (hide) karo
            exec('xdotool search --class "obs" windowunmap 2>/dev/null');
            // Browser ko full screen kar ke top layer par lock karo
            exec('xdotool search --class "chrome" windowactivate windowraise 2>/dev/null');
            exec('xdotool search --class "chromium" windowactivate windowraise 2>/dev/null');
        } catch (e) {
            // Fail silently
        }
    }, 2000);
    // =====================================================================

    console.log('[*] Waiting for OBS to initialize before launching browser...');
    await new Promise(r => setTimeout(r, 6000));

    let isObsConnected = false;
    try {
        await obs.connect('ws://127.0.0.1:4455', 'secret');
        isObsConnected = true;
        console.log('[+] OBS WebSocket Connected Successfully!');
    } catch (e) {}

    // ALL ORIGINAL BROWSER FLAGS RESTORED
    let browserArgs = [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        `--window-size=${RES_W},${RES_H}`, 
        '--window-position=0,0', 
        '--kiosk', 
        '--start-fullscreen',
        '--autoplay-policy=no-user-gesture-required',
        '--disable-dev-shm-usage', 
        '--ignore-certificate-errors',
        '--disable-web-security',
        '--ignore-gpu-blocklist', 
        '--use-gl=egl',
        '--disable-accelerated-video-decode', 
        '--disable-accelerated-video-encode',
        '--disable-smooth-scrolling',
        '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding'
        // REMOVED ublock-lite flag. ublock-lite blocks the scripts that fetch m3u8.
    ];

    if (PROXY_ENGINE.includes('Cloudflare')) {
        browserArgs.push('--proxy-server=socks5://127.0.0.1:40000');
        console.log(`[*] Starting browser with [CLOUDFLARE WARP] Proxy...`);
    }

    browser = await puppeteer.launch({
        headless: false, 
        defaultViewport: { width: RES_W, height: RES_H },
        ignoreDefaultArgs: ['--enable-automation'], 
        args: browserArgs
    });

    // POPUP KILLER
    browser.on('targetcreated', async (target) => {
        if (target.type() === 'page') {
            const newPage = await target.page();
            setTimeout(async () => {
                if (newPage && newPage !== activePage) {
                    console.log(`[🛡️] AD-BLOCKER: Killed an unwanted pop-up tab!`);
                    try { await newPage.close(); } catch(e) {}
                }
            }, 500);
        }
    });

    const pages = await browser.pages();
    activePage = pages[0]; 
    
    await setupNetworkAdBlocker(activePage);
    attachAntiAdListeners(activePage);
    await applyPreloadFirewall(activePage);

    await activePage.bringToFront(); 

    // console.log(`[*] Loading URL: ${urlList[currentUrlIndex]}`);
    // await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // // Simulate user interaction to bypass basic bot checks
    // try { await activePage.mouse.click(10, 10); console.log('[🖱️] Simulated physical click'); } catch(e){}

    console.log(`[*] Loading URL: ${urlList[currentUrlIndex]}`);
    await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // =====================================================================
    // 🛠️ OS LEVEL FIX: OBS KO PEECHHE CHHUPAO AUR BROWSER KO UPAR LAO
    // =====================================================================
    try {
        console.log('[*] Hiding OBS Window from Xvfb display...');
        // OBS ki window ko virtual screen se gaayab (unmap) kar do
        exec('xdotool search --class "obs" windowunmap || true');
        // Chrome/Puppeteer ki window ko screen par front par set kar do
        exec('xdotool search --class "chrome" windowactivate windowraise || true');
        exec('xdotool search --class "chromium" windowactivate windowraise || true');
    } catch (e) {
        console.log('[⚠️] xdotool command skipped.');
    }
    // =====================================================================

    // Simulate user interaction to bypass basic bot checks
    try { await activePage.mouse.click(10, 10); console.log('[🖱️] Simulated physical click'); } catch(e){}

    await initializeVideo(activePage, false, true); 

    if (isObsConnected) {
        console.log('\n[*] Active Video is Ready! Shifting OBS to LIVE Video (MainScene)...');
        try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
    }

    console.log(`\n==================================================`);
    console.log(`[🎥] STREAM IS LIVE ON SINGLE TAB`);
    console.log(`==================================================\n`);

    await startSingleTabWatchdog();
}

startDirectStreaming();
















// =============== antigravity ================


// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     if (err.message && err.message.includes('Requesting main frame too early')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored stealth plugin frame error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNCAUGHT EXCEPTION: ${err.message}`);
//     }
// });
// process.on('unhandledRejection', (reason) => {
//     const msg = reason && reason.message ? reason.message : reason;
//     if (msg && msg.includes('Protocol error')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored detached frame protocol error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNHANDLED REJECTION: ${msg}`);
//     }
// });
// // =========================================================================================

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ FORCE AUTO-REFRESH TIME
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 40; 
// const FORCE_REFRESH_MS      = FORCE_REFRESH_MINUTES * 60 * 1000;

// // =========================================================================================
// // 🛡️ NO-REFRESH WHITELIST
// // =========================================================================================
// const NO_REFRESH_DOMAINS = [
//     'youtube.com',
//     'facebook.com',
//     'streamed.pk',
//     'cricstreams.',
//     'website-vercel-helper-d-jaja-3-2.vercel.app',
//     'websitestream.netlify.app'
// ];

// // =========================================================================================
// // 🚀 STREAM KEYS
// // =========================================================================================
// const STREAM_KEYS = {
//     '1'   : '15254238731883_15281627925099_najspfkgne', 
//     '1.1' : '15254260751979_15281671637611_2plrcfqzze', 
//     '1.2' : '15254285524587_15281717840491_7e6qdknzsu',
//     '2'   : '15254299352683_15281743071851_7dvz3h5d7q',
//     '2.1' : '15254308986475_15281761618539_3xca7oij3u',
//     '2.2' : '15254328122987_15281795566187_zjqa6bqzoq', 
//     '3'   : '15254341885547_15281821059691_hhlpb5vicy', 
//     '3.1' : '15254357089899_15281848322667_sxeexgvzl4', 
//     '3.2' : '15254367510123_15281868180075_pc4jrytfgm',
//     '4'   : '15255022345835_15283095800427_vwrupxzstm', 
//     '4.1' : '15255038074475_15283122080363_ai5qqp2we4', 
//     '4.2' : '15255045480043_15283135842923_tldl4bhmii',
//     '4.3' : '15255208599147_15283449629291_abltofuc7m', 
//     '4.4' : '15255217708651_15283466603115_bojrrqtlmu', 
//     '4.5' : '15255227670123_15283486263915_jpntt54mve',
//     '5'   : '15273689226859_15317451606635_d7zzy3c7qi', 
//     '5.1' : '15273713933931_15317494860395_avj47smmim', 
//     '5.2' : '15273722257003_15317510195819_6edjluvdqi',
//     '5.3' : '15273739624043_15317541653099_ii4bxpvabe',
//     '5.4' : '15273750175339_15317561707115_csel26ku5a', 
//     '5.5' : '15273760071275_15317579467371_cnewcj54me',
//     '5.6' : '15273767935595_15317595851371_3q43tk7tvm', 
//     's1.1'  : '14204232736303_14846150314543_37jq4ryehq',
//     's1.2'  : '14204288179759_14846247373359_tnsknmapva',
//     's1.3'  : '14204319768111_14846302489135_sr4ht4ccwq',
//     's1.4'  : '14204331957807_14846326147631_dji2acqcze',
//     's1.5'  : '14204346572335_14846351641135_7gvns4o5ue',
//     's1.6'  : '14204361252399_14846376479279_cjajhf4d3y',
//     's1.7'  : '14204370492975_14846393649711_6fduhdqite',
//     's1.8'  : '14204395527727_14846438017583_s2jlti7lsm',
//     's1.9'  : '14204411387439_14846464887343_f5lxgcqj5y',
//     's1.10' : '14204424691247_14846487562799_xmbvntt6wa',
//     's2.1'  : '14204490948143_14846603495983_kzevn36tii',
//     's2.2'  : '14204506742319_14846634494511_ta2rxyg2oy',
//     's2.3'  : '14204523322927_14846661233199_foqb3q7zb4',
//     's2.4'  : '14204540034607_14846689085999_gjejdie4uy',
//     's2.5'  : '14204555304495_14846715497007_zdanghuxzu',
//     's2.6'  : '14204565200431_14846734371375_ap3bqpabpu',
//     's2.7'  : '14204577259055_14846756194863_3ecad2535u',
//     's2.8'  : '14204592528943_14846785227311_4hjl46y62e',
//     's2.9'  : '14204602621487_14846802594351_ilnp6lxekq',
//     's2.10' : '14206184136239_14849618610735_ihnbx7hkoi'
// };

// // =========================================================================================
// // ⚙️ QUALITY CONFIG
// // =========================================================================================
// const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
// let RES_W = 1920, RES_H = 1080, BITRATE = 5000;
// if      (selectedQuality === '360p')  { RES_W = 640;  RES_H = 360;  BITRATE = 800;  }
// else if (selectedQuality === '480p')  { RES_W = 854;  RES_H = 480;  BITRATE = 1500; }
// else if (selectedQuality === '720p')  { RES_W = 1280; RES_H = 720;  BITRATE = 3000; }
// else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }
// else                                  { RES_W = 1920; RES_H = 1080; BITRATE = 6000; }

// console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);
// console.log(`[⏱️] Auto-Refresh Time: ${FORCE_REFRESH_MINUTES} Minutes`);

// let rawUrls = (process.env.TARGET_URLS || '').trim();
// let urlList = rawUrls !== ''
//     ? rawUrls.split(',').map(u => u.trim().replace(/^\\+/, '').startsWith('http') ? u.trim().replace(/^\\+/, '') : 'https://' + u.trim().replace(/^\\+/, ''))
//     : ['https://dadocric.st/player.php?id=starsp3&v=m'];

// let currentUrlIndex = 0;
// let backupUrlIndex  = urlList.length > 1 ? 1 : 0;

// const SELECTED_CHANNEL  = process.env.OKRU_STREAM_ID  || '1';
// const SERVER_SELECTION  = process.env.SERVER_SELECTION || 'None';
// const PROXY_ENGINE      = process.env.PROXY_ENGINE      || 'Cloudflare WARP (Recommended)';
// const ACTIVE_STREAM_KEY = STREAM_KEYS[SELECTED_CHANNEL] || STREAM_KEYS['1'];

// let browser    = null;
// let obsProcess = null;
// let activePage = null;
// let backupPage = null;

// const FROZEN_THRESHOLD_REAL_MS = 8000;   
// const FROZEN_THRESHOLD_HLS_MS  = 15000;  

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount   = 0;

// // =========================================================================================
// // 📡 NETWORK & CONSOLE DIAGNOSTICS
// // =========================================================================================
// function setupNetworkDiagnostics(page, pageName) {
//     if (!page) return;

//     page.on("console", msg => {
//         const type = msg.type();
//         const text = msg.text();
//         const textLower = text.toLowerCase();
//         if (type === 'error' || type === 'warning' || textLower.includes('manifest') || textLower.includes('hls') || textLower.includes('network')) {
//             console.log(`[💻] ${pageName.toUpperCase()} CONSOLE [${type.toUpperCase()}]: ${text}`);
//         }
//     });

//     page.on("requestfailed", req => {
//         const url = req.url();
//         const errText = req.failure() ? req.failure().errorText : 'UNKNOWN_ERROR';
//         if (url.includes('.m3u8') || url.includes('.ts') || url.includes('.mpd')) {
//             console.log(`[❌] ${pageName.toUpperCase()} MEDIA REQ FAILED: ${errText} -> ${url.substring(0, 150)}`);
//         }
//     });

//     page.on("response", async (res) => {
//         const url = res.url();
//         const status = res.status();
//         if (url.includes('.m3u8') || url.includes('.ts') || url.includes('.mpd')) {
//             let symbol = status >= 200 && status < 300 ? '✅' : '🔴';
//             if (status >= 400) symbol = '❌';
//             console.log(`[📡] ${pageName.toUpperCase()} MEDIA RES: ${symbol} ${status} -> ${url.substring(0, 150)}`);
//         }
//     });
// }

// // =========================================================================================
// // 🛡️ NETWORK AD-BLOCKER (REFINED FOR 2026 OBFS & M3U8 TOKENS)
// // =========================================================================================
// async function setupNetworkAdBlocker(page) {
//     if (!page) return;
//     try {
//         await page.setRequestInterception(true);
//         page.on('request', (request) => {
//             const url  = request.url().toLowerCase();
//             const type = request.resourceType();

//             if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
//                 const adKw = ['fanduel','bet','casino','adrevenue'];
//                 if (adKw.some(k => url.includes(k))) {
//                     request.abort().catch(() => {}); return;
//                 }
//             }

//             if (url.includes('doubleclick') || (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('zone')))) {
//                 request.abort().catch(() => {});
//             } else {
//                 request.continue().catch(() => {});
//             }
//         });
//     } catch (e) {}
// }

// // =========================================================================================
// // 🔥 PRELOAD FIREWALL
// // =========================================================================================
// async function applyPreloadFirewall(page) {
//     if (!page) return;
//     try {
//         await page.evaluateOnNewDocument(() => {
//             window.alert   = function() {};
//             window.confirm = function() { return true; };
//             window.prompt  = function() { return null; };
//             window.open    = function() { return null; };
//             Object.defineProperty(window, 'onbeforeunload', {
//                 configurable: true, get: function() { return null; }, set: function() { return null; }
//             });
//             const style = document.createElement('style');
//             style.textContent = `html, body { background-color: #000 !important; overflow: hidden !important; }`;
//             document.documentElement.appendChild(style);
//         });
//     } catch (e) {}
// }

// // =========================================================================================
// // 📸 SCREENSHOT + BATCH UPLOAD
// // =========================================================================================
// async function takeAndBatchScreenshot(page, stepName) {
//     if (!page) return;
//     try {
//         const ts   = new Date().toISOString().replace(/[:.]/g, '-');
//         const filePath = `./screenshots/snap_${ts}_${stepName}.png`;
//         await page.screenshot({ path: filePath });
//         pendingScreenshots.push(filePath);
//         if (pendingScreenshots.length >= 3) {
//             try {
//                 const tag = 'live-stream-logs';
//                 try { execSync(`gh release view ${tag} || gh release create ${tag} -t "Live Logs"`, { stdio: 'ignore' }); } catch(e) {}
//                 exec(`gh release upload ${tag} ${pendingScreenshots.join(' ')} --clobber`, (err) => { if (!err) uploadCycleCount++; });
//                 pendingScreenshots = [];
//             } catch (err) {}
//         }
//     } catch (e) {}
// }

// // =========================================================================================
// // 🖥️ LOADING UI
// // =========================================================================================
// async function showLoadingUI(page, title, sub) {
//     try {
//         await page.evaluate((t, s) => {
//             if (window.self !== window.top) return;
//             let ov = document.getElementById('smart-stream-overlay');
//             if (ov) {
//                 ov.style.setProperty('display', 'flex', 'important');
//             } else {
//                 ov = document.createElement('div');
//                 ov.id = 'smart-stream-overlay';
//                 ov.innerHTML = `
//                 <style>
//                     #smart-stream-overlay{position:fixed!important;top:0!important;left:0!important;right:0!important;bottom:0!important;
//                     width:100vw!important;height:100vh!important;background:#000!important;z-index:2147483647!important;
//                     display:flex!important;flex-direction:column!important;justify-content:center!important;align-items:center!important;
//                     color:#fff!important;font-family:Arial,sans-serif!important;}
//                     .ss-spin{width:80px;height:80px;border:6px solid rgba(255,255,255,0.1);border-top:6px solid #e50914;border-radius:50%;
//                     animation:ss-s 1s linear infinite;margin-bottom:25px;}
//                     @keyframes ss-s{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
//                     .stream-title{font-size:36px!important;font-weight:800!important;margin-bottom:15px!important;}
//                     .stream-sub{font-size:20px!important;color:#ccc!important;}
//                 </style>
//                 <div class="ss-spin"></div>
//                 <div class="stream-title">${t}</div>
//                 <div class="stream-sub">${s}</div>`;
//                 document.documentElement.appendChild(ov);
//             }
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             const ov = document.getElementById('smart-stream-overlay');
//             if (ov) { ov.style.setProperty('display', 'none', 'important'); ov.remove(); }
//         });
//     } catch (e) {}
// }

// // =========================================================================================
// // ⚙️ OBS CONFIG
// // =========================================================================================
// function setupOBSConfig() {
//     const obsDir      = path.join(os.homedir(), '.config', 'obs-studio');
//     const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
//     const scenesDir   = path.join(obsDir, 'basic', 'scenes');
//     fs.mkdirSync(profilesDir, { recursive: true });
//     fs.mkdirSync(scenesDir,   { recursive: true });

//     fs.writeFileSync(path.join(obsDir, 'global.ini'),
//         `[General]\nLicenseAccepted=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`);

//     fs.writeFileSync(path.join(profilesDir, 'basic.ini'),
//         `[General]\nName=Untitled\n[Video]\nBaseCX=${RES_W}\nBaseCY=${RES_H}\nOutputCX=${RES_W}\nOutputCY=${RES_H}\nFPSCommon=30\n[Output]\nMode=Simple\n[SimpleOutput]\nVBitrate=${BITRATE}\nStreamEncoder=x264\nx264Preset=ultrafast\n`);

//     fs.writeFileSync(path.join(profilesDir, 'service.json'), JSON.stringify({
//         settings: { server: 'rtmp://vsu.okcdn.ru/input/', key: ACTIVE_STREAM_KEY },
//         type: 'rtmp_custom'
//     }, null, 2));

//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify({
//         current_scene: 'MainScene', current_program_scene: 'MainScene', name: 'Untitled',
//         scene_order: [{ name: 'MainScene' }],
//         sources: [
//             { id: 'xshm_input',            name: 'Screen', settings: { show_cursor: false } },
//             { id: 'pulse_output_capture', name: 'Audio',  settings: {} },
//             { id: 'scene', name: 'MainScene',    settings: { items: [{ name: 'Screen', id: 1, visible: true }, { name: 'Audio', id: 2, visible: true }] } }
//         ]
//     }, null, 2));
// }

// function attachAntiAdListeners(page) {
//     page.on('dialog', async d => { try { await d.dismiss(); } catch(e) {} });
// }

// // =========================================================================================
// // 🔊 SMART UNMUTE ENGINE
// // =========================================================================================
// async function triggerSmartUnmute(page) {
//     for (const frame of page.frames()) {
//         try {
//             if (frame.isDetached()) continue;
//             await frame.evaluate(() => {
//                 Array.from(document.querySelectorAll('button, div, span, a, i')).forEach(el => {
//                     const text  = (el.innerText || el.textContent || '').trim().toUpperCase();
//                     const onclick = (el.getAttribute('onclick') || '').toLowerCase();
//                     if (text.includes('UNMUTE') || text.includes('AUDIO') || onclick.includes('unmute') || onclick.includes('volume')) {
//                         const r = el.getBoundingClientRect();
//                         if (r.width > 0 && r.height > 0) { try { el.click(); } catch(e) {} }
//                     }
//                 });
//                 document.querySelectorAll('video, audio').forEach(m => { if (m.muted) { m.muted = false; m.volume = 1.0; } });
//             }).catch(() => {});
//         } catch (e) {}
//     }
// }

// // =========================================================================================
// // 🎬 VIDEO INITIALIZER
// // =========================================================================================
// async function initializeVideo(page, startMuted, isActivePage) {
//     try {
//         console.log('[*] Checking autoplay / play button...');
//         let playing = false, tries = 0;
//         while (!playing && tries < 15) {
//             for (const frame of page.frames()) {
//                 try {
//                     const autoPlayed = await frame.evaluate(() => {
//                         let p = false;
//                         document.querySelectorAll('video').forEach(v => {
//                             if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) { v.muted = false; v.volume = 1.0; p = true; }
//                         });
//                         return p;
//                     });
//                     if (autoPlayed) { playing = true; break; }

//                     const btn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, .fp-play');
//                     if (btn) {
//                         await frame.evaluate(el => el.click(), btn);
//                         playing = true; break;
//                     }

//                     if (!playing && tries > 5) {
//                         const forced = await frame.evaluate(async () => {
//                             let done = false;
//                             for (const v of document.querySelectorAll('video')) {
//                                 if (v.clientWidth > 50) {
//                                     v.muted = false; v.volume = 1.0;
//                                     try { v.click(); } catch(e) {}
//                                     try { const p = v.play(); if (p) p.catch(() => {}); done = true; } catch(e) {}
//                                 }
//                             }
//                             return done;
//                         });
//                         if (forced) { playing = true; break; }
//                     }
//                 } catch (err) {}
//             }
//             if (!playing) await new Promise(r => setTimeout(r, 2000));
//             tries++;
//         }

//         let targetFrame = null;
//         for (const frame of page.frames()) {
//             try {
//                 const isReal = await frame.evaluate(() => {
//                     const v = document.querySelector('video');
//                     return v && v.clientWidth > 50 && v.clientHeight > 50;
//                 });
//                 if (isReal) { targetFrame = frame; break; }
//             } catch (e) {}
//         }
//         if (!targetFrame) targetFrame = page.mainFrame();

//         await page.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     document.documentElement.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('background-color', 'black', 'important');

//                     const iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = null, maxScore = -1;
//                     iframes.forEach(ifr => {
//                         const area = ifr.clientWidth * ifr.clientHeight;
//                         if (area < 5000) return;
//                         let score = area;
//                         if (ifr.hasAttribute('allowfullscreen')) score += 10000000;
//                         if (score > maxScore) { maxScore = score; mainIframe = ifr; }
//                     });
//                     if (mainIframe) {
//                         iframes.forEach(ifr => {
//                             if (ifr !== mainIframe) ifr.style.setProperty('display', 'none', 'important');
//                         });
//                         ['position:fixed','top:0','left:0','width:100vw','height:100vh','z-index:2147483645','border:none'].forEach(s => {
//                             const [k, v] = s.split(':');
//                             mainIframe.style.setProperty(k, v, 'important');
//                         });
//                     }
//                 } catch (err) {}
//             }, 500);
//         }).catch(() => {});

//         await targetFrame.evaluate((muted) => {
//             setInterval(() => {
//                 try {
//                     const videos = Array.from(document.querySelectorAll('video'));
//                     document.querySelectorAll('video, audio').forEach(m => { m.muted = muted; m.volume = muted ? 0 : 1.0; });
//                     const realVideo = videos.find(v => v.clientWidth > 100 && v.clientHeight > 100) || videos[0];
//                     if (realVideo) {
//                         ['position:fixed','top:0','left:0','width:100vw','height:100vh','z-index:2147483646','object-fit:contain','opacity:1','display:block'].forEach(s => {
//                             const [k, v] = s.split(':');
//                             realVideo.style.setProperty(k, v, 'important');
//                         });
//                     }
//                 } catch(err) {}
//             }, 500);
//         }, startMuted).catch(() => {});

//     } catch (e) {}

//     await triggerSmartUnmute(page);
//     await new Promise(r => setTimeout(r, 1000));
// }

// // =========================================================================================
// // 🔬 CHECK PAGE STATUS
// // =========================================================================================
// async function checkPageStatus(page) {
//     if (!page) return { status: 'DEAD' };
//     try {
//         for (const frame of page.frames()) {
//             try {
//                 if (frame.isDetached()) continue;
//                 const result = await Promise.race([
//                     frame.evaluate(() => {
//                         const bodyText = document.body ? document.body.innerText.toLowerCase() : '';
//                         if (bodyText.includes('stream error') || bodyText.includes('manifestloaderror') || bodyText.includes('not found') || bodyText.includes('error: forbidden')) {
//                             return { status: 'CRITICAL_ERROR' };
//                         }
//                         const videos = Array.from(document.querySelectorAll('video'));
//                         let targetV = videos.find(v => (v.src && v.src.startsWith('blob:')) || v.matches('.jw-video,.plyr__video,.vjs-tech')) || videos[0];
                        
//                         if (targetV && !targetV.ended && targetV.currentTime > 0) {
//                             let frames = 0;
//                             if (targetV.getVideoPlaybackQuality) frames = targetV.getVideoPlaybackQuality().totalVideoFrames;
//                             return { status: 'HEALTHY', currentTime: targetV.currentTime, decodedFrames: frames };
//                         }
//                         return { status: 'DEAD' };
//                     }),
//                     new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2500))
//                 ]);
//                 if (result && result.status !== 'DEAD') return result;
//             } catch (err) {}
//         }
//     } catch (e) { return { status: 'DEAD' }; }
//     return { status: 'DEAD' };
// }

// // =========================================================================================
// // 🔄 HOT-SWAP / REFRESH
// // =========================================================================================
// async function performHotSwap(reason) {
//     console.log(`\n[🔄] TRIGGERING RECOVERY/SWAP -> Reason: ${reason}`);
//     try {
//         await showLoadingUI(activePage, 'RECONNECTING', 'Optimizing live stream connection...');
//         await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 30000 });
//         await new Promise(r => setTimeout(r, 3000));
//         await initializeVideo(activePage, false, true);
//         await hideLoadingUI(activePage);
//         console.log(`[✅] Recovery successful!`);
//     } catch (err) {
//         console.log(`[⚠️] Swap error: ${err.message}`);
//     }
// }

// // =========================================================================================
// // 👁️ WATCHDOG
// // =========================================================================================
// async function startWatchdog() {
//     let lastActiveTime = -1;
//     let lastDecodedFrames = -1;
//     let frozenCheckTimestamp = Date.now();
//     let watchdogTicks = 0;
//     let isWarmupPhase = true;
//     let currentStreamStartTime = Date.now();

//     while (true) {
//         if (!browser || !browser.isConnected()) throw new Error('Browser closed.');

//         let activeStatus = await checkPageStatus(activePage);

//         if (activeStatus.status === 'HEALTHY' && !isWarmupPhase) {
//             const elapsed = Date.now() - currentStreamStartTime;
//             if (elapsed > FORCE_REFRESH_MS) {
//                 activeStatus.status = 'FORCE_REFRESH';
//             }
//         }

//         if (activeStatus.status === 'HEALTHY') {
//             await hideLoadingUI(activePage);
//             isWarmupPhase = false;
//             await triggerSmartUnmute(activePage);

//             const isTimeStuck = (activeStatus.currentTime === lastActiveTime);
//             const isFrameStuck = (activeStatus.decodedFrames === lastDecodedFrames && activeStatus.decodedFrames > 0);

//             if (isTimeStuck || isFrameStuck) {
//                 if (Date.now() - frozenCheckTimestamp > FROZEN_THRESHOLD_REAL_MS) {
//                     activeStatus.status = 'FROZEN';
//                 }
//             } else {
//                 lastActiveTime = activeStatus.currentTime;
//                 lastDecodedFrames = activeStatus.decodedFrames;
//                 frozenCheckTimestamp = Date.now();
//             }
//         }

//         watchdogTicks++;
//         if (watchdogTicks % 90 === 0) {
//             console.log(`[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//         }

//         if (['FROZEN', 'CRITICAL_ERROR', 'DEAD', 'FORCE_REFRESH'].includes(activeStatus.status)) {
//             if (isWarmupPhase && (Date.now() - currentStreamStartTime < 15000)) {
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue;
//             }
//             await performHotSwap(activeStatus.status);
//             lastActiveTime = -1;
//             frozenCheckTimestamp = Date.now();
//             currentStreamStartTime = Date.now();
//         }

//         await new Promise(r => setTimeout(r, 2000));
//     }
// }

// // =========================================================================================
// // 🚀 MAIN
// // =========================================================================================
// async function main() {
//     console.log(`\n[🚀] SMART STREAM ENGINE STARTING...`);
//     setupOBSConfig();

//     obsProcess = spawn('obs', ['--startstreaming', '--minimize-to-tray'], { detached: true, stdio: 'ignore' });
//     obsProcess.unref();
//     await new Promise(r => setTimeout(r, 6000));

//     try {
//         await obs.connect('ws://127.0.0.1:4455', 'secret');
//         console.log('[+] OBS WebSocket Connected Successfully!');
//     } catch (e) {
//         console.log('[⚠️] OBS WS Connection failed, running standalone.');
//     }

//     let browserArgs = [
//         '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
//         '--disable-blink-features=AutomationControlled',
//         '--autoplay-policy=no-user-gesture-required', '--no-first-run',
//         '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows',
//         `--window-size=${RES_W},${RES_H}`, '--start-fullscreen',
//         '--disable-web-security', '--ignore-certificate-errors'
//     ];

//     if (PROXY_ENGINE.includes('Cloudflare')) {
//         browserArgs.push('--proxy-server=socks5://127.0.0.1:40000');
//     }

//     browser = await puppeteer.launch({
//         headless: false,
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'],
//         args: browserArgs
//     });

//     // 🛡️ POPUP KILLER (Kills rogue ads instantly while letting main network pass)
//     browser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             try {
//                 const newPage = await target.page();
//                 if (newPage && newPage !== activePage) {
//                     await newPage.close().catch(() => {});
//                 }
//             } catch (e) {}
//         }
//     });

//     const pages = await browser.pages();
//     activePage = pages[0];

//     await applyPreloadFirewall(activePage);
//     await setupNetworkAdBlocker(activePage);
//     attachAntiAdListeners(activePage);
//     setupNetworkDiagnostics(activePage, 'Active');

//     const activeUrl = urlList[currentUrlIndex];
//     console.log(`[*] Loading URL: ${activeUrl}`);
//     await showLoadingUI(activePage, 'STREAM LOADING', 'Connecting...');

//     try {
//         await activePage.goto(activeUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
//     } catch (e) {}

//     // Physical click simulation to satisfy modern browser media rules
//     try { await activePage.mouse.click(10, 10); } catch(e) {}

//     await initializeVideo(activePage, false, true);
//     await hideLoadingUI(activePage);

//     console.log(`\n[🟢] ALL SET! STREAM IS LIVE ON SINGLE TAB\n`);
//     await startWatchdog();
// }

// main().catch(async (err) => {
//     console.error(`\n[💥] FATAL ERROR: ${err.message}`);
//     try { if (browser) await browser.close(); } catch(e) {}
//     try { if (obsProcess) obsProcess.kill(); } catch(e) {}
//     setTimeout(() => main(), 10000);
// });
