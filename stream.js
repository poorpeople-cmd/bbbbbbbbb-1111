
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn, execSync, exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec); 
const { OBSWebSocket } = require('obs-websocket-js'); 

const obs = new OBSWebSocket(); 

// GLOBAL ANTI-CRASH SHIELD
process.on('uncaughtException', (err) => {
    if (err.message && (err.message.includes('Session closed') || err.message.includes('TargetCloseError') || err.message.includes('Requesting main frame too early'))) return;
    console.error('[!] Uncaught Exception:', err.message);
});
process.on('unhandledRejection', (reason, promise) => {
    if (reason && reason.message && (reason.message.includes('Session closed') || reason.message.includes('TargetCloseError') || reason.message.includes('Requesting main frame too early'))) return;
});

// 🚀 Multi-Stream Key Manager
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
    's1.1'  : '14204232736303_14846150314543_37jq4ryehq',
    's1.2'  : '14204288179759_14846247373359_tnsknmapva',
    's1.3'  : '14204319768111_14846302489135_sr4ht4ccwq',
    's1.4'  : '14204331957807_14846326147631_dji2acqcze',
    's1.5'  : '14204346572335_14846351641135_7gvns4o5ue',
    's2.1'  : '14204490948143_14846603495983_kzevn36tii',
    's2.2'  : '14204506742319_14846634494511_ta2rxyg2oy',
    's2.3'  : '14204523322927_14846661233199_foqb3q7zb4',
    's2.10' : '14206184136239_14849618610735_ihnbx7hkoi'
};

const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
let RES_W = 1920, RES_H = 1080, BITRATE = 5000;

if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }
else { RES_W = 1920; RES_H = 1080; BITRATE = 6000; }

console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);

let rawUrls = (process.env.TARGET_URLS || '').trim();
let urlList = rawUrls !== '' 
    ? rawUrls.split(',').map(u => u.trim().startsWith('http') ? u.trim() : 'https://' + u.trim()) 
    : ['https://dadocric.st/player.php?id=starsp3&v=m'];

let currentUrlIndex = 0;
let backupUrlIndex = urlList.length > 1 ? 1 : 0; 

const SELECTED_CHANNEL = process.env.OKRU_STREAM_ID || '1';
const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None'; 
const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

const ACTIVE_STREAM_KEY = STREAM_KEYS[SELECTED_CHANNEL] || STREAM_KEYS['1'];

let browser = null;
let obsProcess = null;
let activePage = null;
let backupPage = null;
let isObsHidden = false; 

const FROZEN_THRESHOLD_MS = 8000; 

if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
let pendingScreenshots = [];
let uploadCycleCount = 0;

async function takeAndBatchScreenshot(page, stepName) {
    if (!page) return;
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filePath = `./screenshots/snap_${timestamp}_${stepName}.png`;
        await page.screenshot({ path: filePath });
        console.log(`[📸] Screenshot saved: ${filePath}`);
        pendingScreenshots.push(filePath);

        if (pendingScreenshots.length >= 3) {
            const filesToUpload = pendingScreenshots.join(' ');
            pendingScreenshots = []; 
            
            (async () => {
                try {
                    const tag = 'live-stream-logs';
                    try { await execPromise(`gh release view ${tag} || gh release create ${tag} -t "Live Logs"`); } catch(e) {}
                    try {
                        const { stdout } = await execPromise(`gh release view ${tag} --json assets -q ".assets[].name"`);
                        const oldAssets = stdout.trim().split('\n');
                        for (const asset of oldAssets) {
                            if (asset) await execPromise(`gh release delete-asset ${tag} "${asset}" -y`).catch(e=>{});
                        }
                    } catch(e) {}
                    await execPromise(`gh release upload ${tag} ${filesToUpload} --clobber`).catch(e=>{});
                    uploadCycleCount++;
                } catch (err) { }
            })();
        }
    } catch (e) { }
}

function setupOBSConfig() {
    const obsDir = path.join(os.homedir(), '.config', 'obs-studio');
    const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
    const scenesDir = path.join(obsDir, 'basic', 'scenes');

    fs.mkdirSync(profilesDir, { recursive: true });
    fs.mkdirSync(scenesDir, { recursive: true });

    const globalIniContent = `[General]\nLicenseAccepted=true\n[BasicWindow]\nShowAutoConfig=false\nWarned=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`;
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
        "current_scene": "WaitingScene", 
        "current_program_scene": "WaitingScene", 
        "name": "Untitled",
        "scene_order": [{"name": "WaitingScene"}, {"name": "MainScene"}],
        "sources": [
            { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
            { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
            {
                "id": "scene", "name": "MainScene",
                "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true}, {"name": "Audio", "id": 2, "visible": true} ] }
            },
            {
                "id": "scene", "name": "WaitingScene",
                "settings": { "items": [] } 
            }
        ]
    };
    fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
}

function attachAntiAdListeners(page) {
    if(!page || page.isClosed()) return;
    page.on('dialog', async dialog => {
        try {
            console.log(`[🛡️] AD-BLOCKER: Dismissed a Javascript alert/dialog!`);
            await dialog.dismiss();
        } catch(e) {}
    });
}

async function safeNewPage(browserInst) {
    let newPage = await browserInst.newPage();
    await new Promise(r => setTimeout(r, 500));
    attachAntiAdListeners(newPage);
    return newPage;
}

async function safeClosePage(pageToClose) {
    if (pageToClose && !pageToClose.isClosed()) {
        try {
            pageToClose.removeAllListeners('dialog');
            await pageToClose.close();
        } catch(e) {}
    }
}

async function showLoadingUI(page, title, sub) {
    if(!page || page.isClosed()) return;
    try {
        await page.evaluate((t, s) => {
            if (window.self !== window.top) return; 
            let overlay = document.getElementById('smart-stream-overlay');
            if (overlay) overlay.remove();

            overlay = document.createElement('div');
            overlay.id = 'smart-stream-overlay';
            overlay.innerHTML = `
                <style>
                    #smart-stream-overlay {
                        position: fixed !important; top: 0 !important; left: 0 !important; 
                        width: 100vw !important; height: 100vh !important;
                        background: radial-gradient(circle at center, #1a1a1a 0%, #000000 100%) !important;
                        z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
                        justify-content: center !important; align-items: center !important; color: #ffffff !important;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
                        pointer-events: none !important;
                    }
                    .stream-spinner {
                        width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1);
                        border-top: 6px solid #e50914; border-radius: 50%;
                        animation: spin-overlay 1s linear infinite; margin-bottom: 30px;
                        box-shadow: 0 0 25px rgba(229, 9, 20, 0.4);
                    }
                    @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                    .stream-title { 
                        font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; 
                        margin-bottom: 15px !important; text-transform: uppercase !important; 
                        text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important;
                    }
                    .stream-sub { 
                        font-size: 20px !important; color: #cccccc !important; text-align: center !important; 
                        max-width: 600px !important; line-height: 1.6 !important; font-weight: 400 !important;
                    }
                    .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
                    @keyframes blinker { 50% { opacity: 0.3; } }
                </style>
                <div class="stream-spinner"></div>
                <div class="stream-title" id="overlay-title">${t}</div>
                <div class="stream-sub" id="overlay-sub">${s}</div>
            `;
            document.body.appendChild(overlay);
        }, title, sub);
    } catch (e) {}
}

async function hideLoadingUI(page) {
    if(!page || page.isClosed()) return;
    try {
        await page.evaluate(() => {
            const overlay = document.getElementById('smart-stream-overlay');
            if (overlay) overlay.remove();
        });
    } catch (e) {}
}

async function initializeVideo(page, startMuted, isActivePage) {
    if(!page || page.isClosed()) return;
    try {
        if (SERVER_SELECTION !== 'None') {
            console.log(`[*] Clicking specific Server: ${SERVER_SELECTION}`);
            let serverClicked = false; let serverAttempts = 0;
            while (!serverClicked && serverAttempts < 10) { 
                if(page.isClosed()) return;
                serverAttempts++;
                try {
                    const clickSuccess = await page.evaluate((serverName) => {
                        const buttons = Array.from(document.querySelectorAll('button'));
                        const targetBtn = buttons.find(b => b.innerText && b.innerText.trim().includes(serverName));
                        if (targetBtn) { targetBtn.click(); return true; }
                        return false;
                    }, SERVER_SELECTION);

                    if (clickSuccess) {
                        serverClicked = true; 
                        console.log(`[+] Server Button clicked successfully!`);
                        await takeAndBatchScreenshot(page, `server-clicked`);
                        await new Promise(r => setTimeout(r, 2000)); 
                        if (isActivePage && !page.isClosed()) await page.bringToFront(); 
                    } else await new Promise(r => setTimeout(r, 2000));
                } catch (err) { await new Promise(r => setTimeout(r, 2000)); }
            }
        }

        console.log('[*] Checking if Video is Autoplaying or Needs a Play Button...');
        let isVideoPlaying = false; 
        let attempts = 0;
        
        while (!isVideoPlaying && attempts < 15) {
            if(page.isClosed()) return;
            for (const frame of page.frames()) {
                if(frame.isDetached()) continue;
                try {
                    const autoPlayed = await frame.evaluate(() => {
                        let playing = false;
                        document.querySelectorAll('video').forEach(v => {
                            if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) {
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
                            await takeAndBatchScreenshot(page, `play-btn-clicked`);
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
                            await takeAndBatchScreenshot(page, `force-play-applied`);
                            isVideoPlaying = true;
                            break;
                        }
                    }
                } catch (err) {}
            }
            if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
            attempts++;
        }

        if(page.isClosed()) return;
        await page.evaluate((initMuted) => {
            window.__isMuted = initMuted; 
            setInterval(() => {
                try {
                    const mediaElements = document.querySelectorAll('video, audio');
                    mediaElements.forEach(media => { 
                        if (media.muted !== window.__isMuted) media.muted = window.__isMuted; 
                        let targetVol = window.__isMuted ? 0.0 : 1.0;
                        if (media.volume !== targetVol) media.volume = targetVol; 
                    });

                    if (!window.__isMuted) {
                        document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => {
                            try { btn.click(); } catch(e){}
                        });
                    }
                } catch(err) {}
            }, 1000); 
        }, startMuted).catch(() => {});

    } catch (e) { }
}

async function checkPageStatus(page) {
    if (!page || page.isClosed()) return { status: 'DEAD' };
    try {
        for (const frame of page.frames()) {
            try {
                if (frame.isDetached()) continue;
                const result = await Promise.race([
                    frame.evaluate(() => {
                        const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
                        
                        if (
                            bodyText.includes("stream error") || 
                            bodyText.includes("not found") || 
                            bodyText.includes("domain is blocked") ||
                            bodyText.includes("error: forbidden") ||
                            bodyText.includes("access denied") ||
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
                        
                        if (targetV) {
                            const isDataFlowing = targetV.readyState >= 3; 
                            const isPlaying = !targetV.paused && targetV.currentTime > 0;

                            if (isPlaying && isDataFlowing) {
                                return { status: 'HEALTHY', currentTime: targetV.currentTime };
                            } else if (!isDataFlowing && isPlaying) {
                                return { status: 'NO_DATA_FLOW', currentTime: targetV.currentTime };
                            } else if (!isPlaying) {
                                return { status: 'DEAD', currentTime: targetV.currentTime };
                            }
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

async function startWatchdog() {
    let lastActiveTime = -1;
    let frozenCheckTimestamp = Date.now();
    let watchdogTicks = 0;
    
    let streamSetupTime = Date.now(); 
    let isWarmupPhase = true; 
    const WARMUP_MAX_TIME = 15000; 

    let activeUrlStr = urlList[currentUrlIndex];
    let backupUrlStr = urlList[backupUrlIndex];

    let failStrikes = 0; 
    isObsHidden = true; 

    let lastBackupLoadTime = Date.now();
    const ROLLING_REFRESH_INTERVAL_MS = 15 * 60 * 1000; 

    while (true) {
        if (!browser || !browser.isConnected()) throw new Error("Browser closed.");

        let activeStatus = await checkPageStatus(activePage);

        if (activeStatus.status === 'HEALTHY') {
            await hideLoadingUI(activePage);
            isWarmupPhase = false; 

            if (activeStatus.currentTime === lastActiveTime) {
                if (Date.now() - frozenCheckTimestamp > FROZEN_THRESHOLD_MS) activeStatus.status = 'FROZEN';
            } else {
                lastActiveTime = activeStatus.currentTime; frozenCheckTimestamp = Date.now();
                failStrikes = 0; 
                
                if (isObsHidden) {
                    try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch(e){}
                    isObsHidden = false;
                    console.log(`[+] Stream Validated! OBS Scene Unlocked (Viewers can see now).`);
                }

                if(activePage && !activePage.isClosed()){
                    for (const frame of activePage.frames()) {
                        try {
                            if (!frame.isDetached()) {
                                frame.evaluate(() => { 
                                    window.__isMuted = false;
                                    document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
                                }).catch(()=>{});
                            }
                        } catch(e) {}
                    }
                }
            }
        }

        if (backupPage && !backupPage.isClosed()) {
            for (const frame of backupPage.frames()) {
                try {
                    if (!frame.isDetached()) {
                        frame.evaluate(() => { 
                            window.__isMuted = true;
                            document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); 
                        }).catch(()=>{});
                    }
                } catch(e) {}
            }
        }

        if (backupPage && !backupPage.isClosed() && (Date.now() - lastBackupLoadTime > ROLLING_REFRESH_INTERVAL_MS)) {
            console.log(`\n[🔄] ROLLING REFRESH: Background token age reached 15 mins. Refreshing session dynamically...`);
            backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
            lastBackupLoadTime = Date.now();
        }

        watchdogTicks++;
        if (watchdogTicks % 180 === 0) {
            console.log(`\n[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
            console.log(`[▶️] CURRENT ACTIVE : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
            console.log(`[⏭️] BACKUP QUEUE   : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
            takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
        }

        if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'NO_DATA_FLOW') {
            
            if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
                await new Promise(r => setTimeout(r, 1000));
                continue; 
            }

            failStrikes++;
            console.log(`[🚨] Data Flow Alert: Detected '${activeStatus.status}' (Strike ${failStrikes}/2)`);
            
            if (failStrikes < 2) {
                // Graceful wait 1 second
            } else {
                console.log(`\n==================================================`);
                console.log(`[!] ❌ BACKEND CONNECTION LOST: ${activeStatus.status} - INITIATING ZERO-LATENCY SWAP`);
                console.log(`==================================================`);
                
                // 🌟 1. INSTANT OBS SHIELD
                if (!isObsHidden) {
                    try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch(e){}
                    isObsHidden = true;
                }

                await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
                
                // 🌟 2. ZERO-SECOND PROMOTE BACKUP TO ACTIVE
                let backupStatus = await checkPageStatus(backupPage);

                if (backupStatus.status === 'HEALTHY' || backupStatus.status === 'DEAD' || backupStatus.status === 'NO_DATA_FLOW') { 
                    
                    let deadPage = activePage; 
                    activePage = backupPage; // Instant Swap
                    
                    if(!activePage.isClosed()){
                        await activePage.bringToFront();
                        try { activePage.mouse.click(10, 10); } catch(e){} 
                        
                        // Force Unmute immediately
                        for (const frame of activePage.frames()) {
                            try {
                                if (!frame.isDetached()) await frame.evaluate(() => { window.__isMuted = false; document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); });
                            } catch(e) {}
                        }
                    }

                    // 🌟 3. OBS SHIELD OFF (Stream is back online instantly)
                    if (isObsHidden) {
                        try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch(e){}
                        isObsHidden = false;
                    }

                    // Shift indices
                    currentUrlIndex = backupUrlIndex; 
                    activeUrlStr = urlList[currentUrlIndex]; 
                    backupUrlIndex = (backupUrlIndex + 1) % urlList.length; // 🌟 The broken link goes back to the queue to be tested in background!
                    backupUrlStr = urlList[backupUrlIndex]; 

                    console.log(`\n==================================================`);
                    console.log(`[🔄] 0-LATENCY SWAP COMPLETE`);
                    console.log(`==================================================`);
                    console.log(`[📺] NEW ACTIVE LIVE : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
                    console.log(`[🔊] LIVE AUDIO      : ON (Unmuted & Forced)`);
                    console.log(`==================================================\n`);

                    // 🌟 4. PROVISION NEW BACKGROUND STANDBY (No waiting for viewers)
                    console.log(`[*] Provisioning next standby server in background: ${backupUrlStr}`);
                    backupPage = await safeNewPage(browser); 
                    backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
                    
                    // Kill the old dead page safely to prevent memory leak
                    await safeClosePage(deadPage); 

                    lastActiveTime = -1; frozenCheckTimestamp = Date.now();
                    lastBackupLoadTime = Date.now();
                    failStrikes = 0; 
                    streamSetupTime = Date.now(); 
                    isWarmupPhase = true;

                } else {
                    console.error(`[!] ❌ Backup Tab Failed too. Restarting System...`);
                    throw new Error("Both Tabs failed.");
                }
            }
        } else {
            failStrikes = 0; 
        }

        await new Promise(r => setTimeout(r, 1000)); 
    }
}

async function startDirectStreaming() {
    console.log(`[*] Starting OBS Studio FIRST...`);
    setupOBSConfig();

    obsProcess = spawn('obs', ['--startstreaming', '--minimize-to-tray']);
    obsProcess.stdout.on('data', (data) => {
        const d = data.toString().trim();
        if(d.includes('error') || d.includes('fail')) console.log(`[OBS]: ${d}`);
    });
    obsProcess.stderr.on('data', (data) => {
        const msg = data.toString().trim();
        if (msg.includes('error') || msg.includes('fail')) console.log(`[OBS Error]: ${msg}`);
    });

    console.log('[*] Waiting for OBS to initialize before launching browser...');
    await new Promise(r => setTimeout(r, 6000));

    let isObsConnected = false;
    console.log('[*] Attempting to connect to OBS WebSocket (Polling Engine Active)...');
    for (let attempt = 1; attempt <= 15; attempt++) {
        try {
            await Promise.race([
                obs.connect('ws://127.0.0.1:4455', 'secret'),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
            ]);
            isObsConnected = true;
            console.log('[+] OBS WebSocket Connected Successfully!');
            break;
        } catch (e) {
            console.log(`[⏳] OBS Port 4455 not ready yet. Retrying (${attempt}/15)...`);
            await new Promise(r => setTimeout(r, 2000));
        }
    }

    if (isObsConnected) {
        try {
            await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' });
            console.log('[+] Enforced WaitingScene (Black Screen Buffer)');
        } catch(e){}
    }

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
    ];

    if (PROXY_ENGINE.includes('Cloudflare')) {
        browserArgs.push('--proxy-server=socks5://127.0.0.1:40000');
        console.log(`[*] Starting browser with EXACT viewport dimensions: ${RES_W}x${RES_H} and [CLOUDFLARE WARP] Proxy...`);
    } else {
        console.log(`[*] Starting browser with EXACT viewport dimensions: ${RES_W}x${RES_H} using [DIRECT GITHUB IP]...`);
    }

    browser = await puppeteer.launch({
        headless: false, 
        defaultViewport: { width: RES_W, height: RES_H },
        ignoreDefaultArgs: ['--enable-automation'], 
        args: browserArgs
    });

    browser.on('targetcreated', async (target) => {
        if (target.type() === 'page') {
            try {
                const newPage = await target.page();
                setTimeout(async () => {
                    if (newPage && !newPage.isClosed() && newPage !== activePage && newPage !== backupPage) {
                        console.log(`[🛡️] AD-BLOCKER: Killed an unwanted pop-up tab!`);
                        try { await safeClosePage(newPage); } catch(e) {}
                    }
                }, 2500);
            } catch(e){}
        }
    });

    activePage = (await browser.pages())[0]; 
    attachAntiAdListeners(activePage);
    backupPage = await safeNewPage(browser); 
    
    // GLOBAL AGGRESSIVE IFRAME PENETRATOR
    setInterval(async () => {
        if (!activePage || activePage.isClosed()) return;
        try {
            const frames = activePage.frames();
            for (const frame of frames) {
                if (frame.isDetached()) continue;
                await frame.evaluate(() => {
                    try {
                        let iframes = Array.from(document.querySelectorAll('iframe'));
                        let maxArea = 0; let mainIfr = null;
                        iframes.forEach(ifr => {
                            let area = ifr.clientWidth * ifr.clientHeight;
                            if (area > 5000 && area > maxArea) { maxArea = area; mainIfr = ifr; }
                            ifr.style.setProperty('opacity', ifr === mainIfr ? '1' : '0', 'important');
                        });
                        if (mainIfr) {
                            mainIfr.style.setProperty('position', 'fixed', 'important');
                            mainIfr.style.setProperty('top', '0px', 'important');
                            mainIfr.style.setProperty('left', '0px', 'important');
                            mainIfr.style.setProperty('width', '100vw', 'important');
                            mainIfr.style.setProperty('height', '100vh', 'important');
                            mainIfr.style.setProperty('z-index', '2147483646', 'important');
                            mainIfr.style.setProperty('background', 'black', 'important');
                        }

                        document.body.style.setProperty('background-color', 'black', 'important');
                        document.body.style.setProperty('overflow', 'hidden', 'important');
                        const junk = document.querySelectorAll('.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]');
                        junk.forEach(el => { try { el.style.setProperty('display', 'none', 'important'); } catch(e){} });

                        const videos = document.querySelectorAll('video');
                        for (const v of videos) {
                            if (v.clientWidth > 50) {
                                v.style.setProperty('position', 'fixed', 'important');
                                v.style.setProperty('top', '0px', 'important');
                                v.style.setProperty('left', '0px', 'important');
                                v.style.setProperty('width', '100vw', 'important');
                                v.style.setProperty('height', '100vh', 'important');
                                v.style.setProperty('z-index', '2147483647', 'important');
                                v.style.setProperty('background-color', 'black', 'important');
                                v.style.setProperty('object-fit', 'contain', 'important');
                                v.removeAttribute('controls'); 
                            }
                        }
                        
                        if (!document.getElementById('anti-ui-css')) {
                            const style = document.createElement('style');
                            style.id = 'anti-ui-css';
                            style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
                            document.head.appendChild(style);
                        }
                    } catch(e) {}
                }).catch(()=>{});
            }
        } catch(e) {}
    }, 1000);

    await activePage.bringToFront(); 

    console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex]}`);
    await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });
    await initializeVideo(activePage, false, true); 

    console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex]}`);
    backupPage.goto(urlList[backupUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
    
    await activePage.bringToFront();
    try { await activePage.mouse.click(10, 10); } catch(e){} 

    console.log(`\n==================================================`);
    console.log(`[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
    console.log(`==================================================`);
    console.log(`[📺] CURRENT ACTIVE LIVE : Server [${currentUrlIndex}] -> ${urlList[currentUrlIndex]}`);
    console.log(`[🔊] LIVE AUDIO STATUS   : ON (Unmuted)`);
    console.log(`--------------------------------------------------`);
    console.log(`[🛡️] NEXT BACKUP QUEUE   : Server [${backupUrlIndex}] -> ${urlList[backupUrlIndex]}`);
    console.log(`[🔇] BACKUP AUDIO STATUS : MUTED (Background)`);
    console.log(`==================================================\n`);

    console.log('[*] Everything Setup! Dual-Tab Monitoring is Active.');
    await startWatchdog();
}

async function mainLoop() {
    while (true) {
        try { 
            await startDirectStreaming(); 
        } 
        catch (error) {
            console.error(`\n[!] ALERT: ${error.message}`);
            console.log('[*] 🔄 Hard Restarting everything in 3 seconds...');
            await cleanup();
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
}

async function cleanup() {
    console.log('[*] Cleaning up resources...');
    try { await obs.disconnect(); } catch (e) { } 
    if (browser) { try { await browser.close(); } catch(e) { } browser = null; }
    if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch(e) { } obsProcess = null; }
    try {
        execSync('pkill -9 obs || true', { stdio: 'ignore' });
        execSync('pkill -9 chrome || true', { stdio: 'ignore' });
        execSync('pkill -9 puppeteer || true', { stdio: 'ignore' });
    } catch (e) { }
}

process.on('SIGINT', async () => { await cleanup(); process.exit(0); });

const customDurationStr = process.env.CUSTOM_DURATION || 'None';
function parseDurationToMs(str) {
    if (!str || str.toLowerCase() === 'none') return null;
    let ms = 0;
    const hMatch = str.match(/(\d+)\s*h/i);
    const mMatch = str.match(/(\d+)\s*m/i);
    if (hMatch) ms += parseInt(hMatch[1]) * 60 * 60 * 1000;
    if (mMatch) ms += parseInt(mMatch[1]) * 60 * 1000;
    return ms > 0 ? ms : null;
}

const exactDurationMs = parseDurationToMs(customDurationStr);
if (exactDurationMs) {
    setTimeout(async () => {
        console.log(`\n[*] 🛑 Time's up! The assigned duration (${customDurationStr}) is complete. Shutting down cleanly...`);
        await cleanup();
        process.exit(0);
    }, exactDurationMs);
} else {
    setTimeout(() => {
        try {
            const targetUrls = process.env.TARGET_URLS || 'https://dadocric.st/player.php?id=starsp3&v=m';
            const channel = process.env.OKRU_STREAM_ID || '1';
            const quality = process.env.STREAM_QUALITY || '110KBps (Balanced 480p)';
            const server = process.env.SERVER_SELECTION || 'None';
            const cmd = `gh workflow run main.yml -f target_urls="${targetUrls}" -f okru_stream_channel="${channel}" -f stream_quality="${quality}" -f server_selection="${server}" -f proxy_engine="${PROXY_ENGINE}" -f custom_duration="None"`;
            execSync(cmd, { stdio: 'inherit' });
            setTimeout(async () => {
                await cleanup(); 
                process.exit(0); 
            }, 300000); 
        } catch (err) { }
    }, 21000000);
}

mainLoop();












// ========== iss me yeh jo link khrb usskoo teek karna thaa lekin 6seconds lekin 6seconds kaam hai yeh user experince low karta hai yar =========================


// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const util = require('util');
// const execPromise = util.promisify(exec); 
// const { OBSWebSocket } = require('obs-websocket-js'); 

// const obs = new OBSWebSocket(); 

// // 🌟 2026 FIX: GLOBAL ANTI-CRASH SHIELD
// // Yeh system ko stealth plugin ke background crashes se bachayega
// process.on('uncaughtException', (err) => {
//     if (err.message && (err.message.includes('Session closed') || err.message.includes('TargetCloseError') || err.message.includes('Requesting main frame too early'))) return;
//     console.error('[!] Uncaught Exception:', err.message);
// });
// process.on('unhandledRejection', (reason, promise) => {
//     if (reason && reason.message && (reason.message.includes('Session closed') || reason.message.includes('TargetCloseError') || reason.message.includes('Requesting main frame too early'))) return;
// });

// // 🚀 Multi-Stream Key Manager
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
//     's1.1'  : '14204232736303_14846150314543_37jq4ryehq',
//     's1.2'  : '14204288179759_14846247373359_tnsknmapva',
//     's1.3'  : '14204319768111_14846302489135_sr4ht4ccwq',
//     's1.4'  : '14204331957807_14846326147631_dji2acqcze',
//     's1.5'  : '14204346572335_14846351641135_7gvns4o5ue',
//     's2.1'  : '14204490948143_14846603495983_kzevn36tii',
//     's2.2'  : '14204506742319_14846634494511_ta2rxyg2oy',
//     's2.3'  : '14204523322927_14846661233199_foqb3q7zb4',
//     's2.10' : '14206184136239_14849618610735_ihnbx7hkoi'
// };

// const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
// let RES_W = 1920, RES_H = 1080, BITRATE = 5000;

// if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
// else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
// else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
// else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }
// else { RES_W = 1920; RES_H = 1080; BITRATE = 6000; }

// console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);

// let rawUrls = (process.env.TARGET_URLS || '').trim();
// let urlList = rawUrls !== '' 
//     ? rawUrls.split(',').map(u => u.trim().startsWith('http') ? u.trim() : 'https://' + u.trim()) 
//     : ['https://dadocric.st/player.php?id=starsp3&v=m'];

// let currentUrlIndex = 0;
// let backupUrlIndex = urlList.length > 1 ? 1 : 0; 

// const SELECTED_CHANNEL = process.env.OKRU_STREAM_ID || '1';
// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None'; 
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';
// const DYNAMIC_PROXY = process.env.DYNAMIC_PROXY || '';

// const ACTIVE_STREAM_KEY = STREAM_KEYS[SELECTED_CHANNEL] || STREAM_KEYS['1'];

// let browser = null;
// let obsProcess = null;
// let activePage = null;
// let backupPage = null;
// let isObsHidden = false; 

// const FROZEN_THRESHOLD_MS = 8000; 

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount = 0;

// async function takeAndBatchScreenshot(page, stepName) {
//     if (!page) return;
//     try {
//         const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
//         const filePath = `./screenshots/snap_${timestamp}_${stepName}.png`;
//         await page.screenshot({ path: filePath });
//         console.log(`[📸] Screenshot saved: ${filePath}`);
//         pendingScreenshots.push(filePath);

//         if (pendingScreenshots.length >= 3) {
//             const filesToUpload = pendingScreenshots.join(' ');
//             pendingScreenshots = []; 
            
//             (async () => {
//                 try {
//                     const tag = 'live-stream-logs';
//                     try { await execPromise(`gh release view ${tag} || gh release create ${tag} -t "Live Logs"`); } catch(e) {}
//                     try {
//                         const { stdout } = await execPromise(`gh release view ${tag} --json assets -q ".assets[].name"`);
//                         const oldAssets = stdout.trim().split('\n');
//                         for (const asset of oldAssets) {
//                             if (asset) await execPromise(`gh release delete-asset ${tag} "${asset}" -y`).catch(e=>{});
//                         }
//                     } catch(e) {}
//                     await execPromise(`gh release upload ${tag} ${filesToUpload} --clobber`).catch(e=>{});
//                     uploadCycleCount++;
//                 } catch (err) { }
//             })();
//         }
//     } catch (e) { }
// }

// function setupOBSConfig() {
//     const obsDir = path.join(os.homedir(), '.config', 'obs-studio');
//     const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
//     const scenesDir = path.join(obsDir, 'basic', 'scenes');

//     fs.mkdirSync(profilesDir, { recursive: true });
//     fs.mkdirSync(scenesDir, { recursive: true });

//     const globalIniContent = `[General]\nLicenseAccepted=true\n[BasicWindow]\nShowAutoConfig=false\nWarned=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`;
//     fs.writeFileSync(path.join(obsDir, 'global.ini'), globalIniContent);
    
//     const basicIniContent = `[General]
// Name=Untitled
// [Video]
// BaseCX=${RES_W}
// BaseCY=${RES_H}
// OutputCX=${RES_W}
// OutputCY=${RES_H}
// FPSCommon=30
// [Output]
// Mode=Simple
// [SimpleOutput]
// VBitrate=${BITRATE}
// StreamEncoder=x264
// x264Preset=ultrafast
// x264Settings=keyint=60 tune=zerolatency profile=main threads=4 rc-lookahead=0
// `;
//     fs.writeFileSync(path.join(profilesDir, 'basic.ini'), basicIniContent);

//     const serviceJson = {
//         "settings": { "server": "rtmp://vsu.okcdn.ru/input/", "key": ACTIVE_STREAM_KEY },
//         "type": "rtmp_custom"
//     };
//     fs.writeFileSync(path.join(profilesDir, 'service.json'), JSON.stringify(serviceJson, null, 2));

//     const sceneJson = {
//         "current_scene": "WaitingScene", 
//         "current_program_scene": "WaitingScene", 
//         "name": "Untitled",
//         "scene_order": [{"name": "WaitingScene"}, {"name": "MainScene"}],
//         "sources": [
//             { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
//             { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
//             {
//                 "id": "scene", "name": "MainScene",
//                 "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true}, {"name": "Audio", "id": 2, "visible": true} ] }
//             },
//             {
//                 "id": "scene", "name": "WaitingScene",
//                 "settings": { "items": [] } 
//             }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// function attachAntiAdListeners(page) {
//     if(!page || page.isClosed()) return;
//     page.on('dialog', async dialog => {
//         try {
//             console.log(`[🛡️] AD-BLOCKER: Dismissed a Javascript alert/dialog!`);
//             await dialog.dismiss();
//         } catch(e) {}
//     });
// }

// async function safeNewPage(browserInst) {
//     let newPage = await browserInst.newPage();
//     await new Promise(r => setTimeout(r, 500));
//     attachAntiAdListeners(newPage);
//     return newPage;
// }

// async function safeClosePage(pageToClose) {
//     if (pageToClose && !pageToClose.isClosed()) {
//         try {
//             pageToClose.removeAllListeners('dialog');
//             await pageToClose.close();
//         } catch(e) {}
//     }
// }

// async function showLoadingUI(page, title, sub) {
//     if(!page || page.isClosed()) return;
//     try {
//         await page.evaluate((t, s) => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) overlay.remove();

//             overlay = document.createElement('div');
//             overlay.id = 'smart-stream-overlay';
//             overlay.innerHTML = `
//                 <style>
//                     #smart-stream-overlay {
//                         position: fixed !important; top: 0 !important; left: 0 !important; 
//                         width: 100vw !important; height: 100vh !important;
//                         background: radial-gradient(circle at center, #1a1a1a 0%, #000000 100%) !important;
//                         z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                         justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                         pointer-events: none !important;
//                     }
//                     .stream-spinner {
//                         width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1);
//                         border-top: 6px solid #e50914; border-radius: 50%;
//                         animation: spin-overlay 1s linear infinite; margin-bottom: 30px;
//                         box-shadow: 0 0 25px rgba(229, 9, 20, 0.4);
//                     }
//                     @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                     .stream-title { 
//                         font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; 
//                         margin-bottom: 15px !important; text-transform: uppercase !important; 
//                         text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important;
//                     }
//                     .stream-sub { 
//                         font-size: 20px !important; color: #cccccc !important; text-align: center !important; 
//                         max-width: 600px !important; line-height: 1.6 !important; font-weight: 400 !important;
//                     }
//                     .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
//                     @keyframes blinker { 50% { opacity: 0.3; } }
//                 </style>
//                 <div class="stream-spinner"></div>
//                 <div class="stream-title" id="overlay-title">${t}</div>
//                 <div class="stream-sub" id="overlay-sub">${s}</div>
//             `;
//             document.body.appendChild(overlay);
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     if(!page || page.isClosed()) return;
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) overlay.remove();
//         });
//     } catch (e) {}
// }


// async function initializeVideo(page, startMuted, isActivePage) {
//     if(!page || page.isClosed()) return;
//     try {
//         if (SERVER_SELECTION !== 'None') {
//             console.log(`[*] Clicking specific Server: ${SERVER_SELECTION}`);
//             let serverClicked = false; let serverAttempts = 0;
//             while (!serverClicked && serverAttempts < 10) { 
//                 if(page.isClosed()) return;
//                 serverAttempts++;
//                 try {
//                     const clickSuccess = await page.evaluate((serverName) => {
//                         const buttons = Array.from(document.querySelectorAll('button'));
//                         const targetBtn = buttons.find(b => b.innerText && b.innerText.trim().includes(serverName));
//                         if (targetBtn) { targetBtn.click(); return true; }
//                         return false;
//                     }, SERVER_SELECTION);

//                     if (clickSuccess) {
//                         serverClicked = true; 
//                         console.log(`[+] Server Button clicked successfully!`);
//                         await takeAndBatchScreenshot(page, `server-clicked`);
//                         await new Promise(r => setTimeout(r, 2000)); 
//                         if (isActivePage && !page.isClosed()) await page.bringToFront(); 
//                     } else await new Promise(r => setTimeout(r, 2000));
//                 } catch (err) { await new Promise(r => setTimeout(r, 2000)); }
//             }
//         }

//         console.log('[*] Checking if Video is Autoplaying or Needs a Play Button...');
//         let isVideoPlaying = false; 
//         let attempts = 0;
        
//         while (!isVideoPlaying && attempts < 15) {
//             if(page.isClosed()) return;
//             for (const frame of page.frames()) {
//                 if(frame.isDetached()) continue;
//                 try {
//                     const autoPlayed = await frame.evaluate(() => {
//                         let playing = false;
//                         document.querySelectorAll('video').forEach(v => {
//                             if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) {
//                                 playing = true;
//                             }
//                         });
//                         return playing;
//                     });

//                     if (autoPlayed) {
//                         isVideoPlaying = true;
//                         break;
//                     }

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play');
//                     if (playBtn) {
//                         const isVisible = await frame.evaluate(el => {
//                             const style = window.getComputedStyle(el);
//                             return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
//                         }, playBtn);

//                         if (isVisible) {
//                             await frame.evaluate(el => el.click(), playBtn); 
//                             await takeAndBatchScreenshot(page, `play-btn-clicked`);
//                             await new Promise(r => setTimeout(r, 3000)); 
//                             isVideoPlaying = true;
//                             break; 
//                         }
//                     }

//                     if (!isVideoPlaying && attempts > 5) {
//                         const forced = await frame.evaluate(async () => {
//                             let played = false;
//                             let vids = document.querySelectorAll('video');
//                             for(let v of vids) {
//                                 if (v.clientWidth > 50) { 
//                                     try { v.click(); } catch(e){}
//                                     try {
//                                         let p = v.play();
//                                         if (p !== undefined) p.catch(()=>{});
//                                         played = true;
//                                     } catch(e) {}
//                                 }
//                             }
//                             return played;
//                         });

//                         if (forced) {
//                             await takeAndBatchScreenshot(page, `force-play-applied`);
//                             isVideoPlaying = true;
//                             break;
//                         }
//                     }
//                 } catch (err) {}
//             }
//             if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
//             attempts++;
//         }

//         if(page.isClosed()) return;
//         await page.evaluate((initMuted) => {
//             window.__isMuted = initMuted; 
//             setInterval(() => {
//                 try {
//                     const mediaElements = document.querySelectorAll('video, audio');
//                     mediaElements.forEach(media => { 
//                         if (media.muted !== window.__isMuted) media.muted = window.__isMuted; 
//                         let targetVol = window.__isMuted ? 0.0 : 1.0;
//                         if (media.volume !== targetVol) media.volume = targetVol; 
//                     });

//                     if (!window.__isMuted) {
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => {
//                             try { btn.click(); } catch(e){}
//                         });
//                     }
//                 } catch(err) {}
//             }, 1000); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }
// }

// async function checkPageStatus(page) {
//     if (!page || page.isClosed()) return { status: 'DEAD' };
//     try {
//         for (const frame of page.frames()) {
//             try {
//                 if (frame.isDetached()) continue;
//                 const result = await Promise.race([
//                     frame.evaluate(() => {
//                         const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
                        
//                         if (
//                             bodyText.includes("stream error") || 
//                             bodyText.includes("not found") || 
//                             bodyText.includes("domain is blocked") ||
//                             bodyText.includes("error: forbidden") ||
//                             bodyText.includes("access denied") ||
//                             (bodyText.includes("cloudflare") && bodyText.includes("blocked"))
//                         ) {
//                             return { status: 'CRITICAL_ERROR' };
//                         }
                        
//                         const videos = Array.from(document.querySelectorAll('video'));
//                         let targetV = null;

//                         for (const v of videos) {
//                             if (v.clientWidth > 0 && v.clientWidth < 100) continue;
//                             if ((v.src && v.src.startsWith('blob:')) || v.matches('.jw-video, .plyr__video, .vjs-tech')) {
//                                 targetV = v; break;
//                             }
//                         }
                        
//                         if (!targetV && videos.length > 0) {
//                             targetV = videos.sort((a, b) => (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight))[0];
//                         }
                        
//                         if (targetV) {
//                             const isDataFlowing = targetV.readyState >= 3; 
//                             const isPlaying = !targetV.paused && targetV.currentTime > 0;

//                             if (isPlaying && isDataFlowing) {
//                                 return { status: 'HEALTHY', currentTime: targetV.currentTime };
//                             } else if (!isDataFlowing && isPlaying) {
//                                 return { status: 'NO_DATA_FLOW', currentTime: targetV.currentTime };
//                             } else if (!isPlaying) {
//                                 return { status: 'DEAD', currentTime: targetV.currentTime };
//                             }
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

// async function startWatchdog() {
//     let lastActiveTime = -1;
//     let frozenCheckTimestamp = Date.now();
//     let watchdogTicks = 0;
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     const WARMUP_MAX_TIME = 15000; 

//     let activeUrlStr = urlList[currentUrlIndex];
//     let backupUrlStr = urlList[backupUrlIndex];

//     let failStrikes = 0; 
//     isObsHidden = true; // Stream starts blind

//     while (true) {
//         if (!browser || !browser.isConnected()) throw new Error("Browser closed.");

//         let activeStatus = await checkPageStatus(activePage);

//         if (activeStatus.status === 'HEALTHY') {
//             await hideLoadingUI(activePage);
//             isWarmupPhase = false; 

//             if (activeStatus.currentTime === lastActiveTime) {
//                 if (Date.now() - frozenCheckTimestamp > FROZEN_THRESHOLD_MS) activeStatus.status = 'FROZEN';
//             } else {
//                 lastActiveTime = activeStatus.currentTime; frozenCheckTimestamp = Date.now();
//                 failStrikes = 0; 
                
//                 if (isObsHidden) {
//                     try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch(e){}
//                     isObsHidden = false;
//                     console.log(`[+] Stream Validated! OBS Scene Unlocked (Viewers can see now).`);
//                 }

//                 if(activePage && !activePage.isClosed()){
//                     for (const frame of activePage.frames()) {
//                         try {
//                             if (!frame.isDetached()) {
//                                 frame.evaluate(() => { 
//                                     window.__isMuted = false;
//                                     document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                                 }).catch(()=>{});
//                             }
//                         } catch(e) {}
//                     }
//                 }
//             }
//         }

//         if (backupPage && !backupPage.isClosed()) {
//             for (const frame of backupPage.frames()) {
//                 try {
//                     if (!frame.isDetached()) {
//                         frame.evaluate(() => { 
//                             window.__isMuted = true;
//                             document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); 
//                         }).catch(()=>{});
//                     }
//                 } catch(e) {}
//             }
//         }

//         watchdogTicks++;
        
//         // 🌟 2026 FIX: CLEAN LOGS
//         // Print HEALTHY heartbeats only once every 3 MINUTES (180 seconds)
//         // Errors are printed immediately when they happen.
//         if (watchdogTicks % 180 === 0) {
//             console.log(`\n[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//             console.log(`[▶️] CURRENT ACTIVE : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//             console.log(`[⏭️] BACKUP QUEUE   : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//             takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
//         }

//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'NO_DATA_FLOW') {
            
//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 await new Promise(r => setTimeout(r, 1000));
//                 continue; 
//             }

//             failStrikes++;
//             console.log(`[🚨] Data Flow Alert: Detected '${activeStatus.status}' (Strike ${failStrikes}/2)`);
            
//             if (failStrikes < 2) {
//                 // Graceful wait
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ BACKEND CONNECTION LOST: ${activeStatus.status} - INITIATING HA FAILOVER`);
//                 console.log(`==================================================`);
                
//                 if (!isObsHidden) {
//                     try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch(e){}
//                     isObsHidden = true;
//                     console.log(`[!] OBS Shield Activated: Viewers now see Black Screen (No UI leaks).`);
//                 }

//                 await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
                
//                 // 🌟 TRACK A: SAME LINK RECOVERY ATTEMPT 🌟
//                 console.log(`[*] TRACK A: Attempting to recycle the current session (Same Server)...`);
                
//                 let recoveryPage = await safeNewPage(browser); 
                
//                 let isRecovered = false;
//                 try {
//                     await recoveryPage.evaluateOnNewDocument(() => { window.__isMuted = true; }); 
//                     await recoveryPage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 6000 });
//                     await initializeVideo(recoveryPage, true, false); 
//                     await new Promise(r => setTimeout(r, 2000)); 
                    
//                     let recStatus = await checkPageStatus(recoveryPage);
//                     if (recStatus.status === 'HEALTHY' || recStatus.status === 'NO_DATA_FLOW') {
//                         isRecovered = true;
//                     }
//                 } catch (e) {
//                     console.log(`[-] TRACK A ERROR: Server didn't respond fast enough.`);
//                 }

//                 if (isRecovered) {
//                     console.log(`[+] TRACK A SUCCESS: Connection restored on the same server!`);
                    
//                     let deadPage = activePage;
//                     activePage = recoveryPage;
                    
//                     await activePage.bringToFront();
//                     for (const frame of activePage.frames()) {
//                         try {
//                             if (!frame.isDetached()) await frame.evaluate(() => { window.__isMuted = false; document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); });
//                         } catch(e) {}
//                     }
                    
//                     await safeClosePage(deadPage); 
                    
//                     failStrikes = 0; 
//                     streamSetupTime = Date.now(); 
//                     isWarmupPhase = true;
//                     continue; 
//                 }

//                 // 🌟 TRACK B: NEXT LINK FALLBACK 🌟
//                 console.log(`[-] TRACK A FAILED: Link is completely dead. Moving to Track B (Next Server).`);
//                 await safeClosePage(recoveryPage); 
                
//                 let backupStatus = await checkPageStatus(backupPage);

//                 if (backupStatus.status === 'HEALTHY' || backupStatus.status === 'DEAD' || backupStatus.status === 'NO_DATA_FLOW') { 
                    
//                     if(!backupPage.isClosed()){
//                         await backupPage.bringToFront();
//                         try { await backupPage.mouse.click(10, 10); } catch(e){} 
//                     }

//                     console.log(`[*] Initiating Instant Switch to Pre-loaded Backup Tab...`);
//                     await initializeVideo(backupPage, false, true); 

//                     let deadPage = activePage; 
//                     activePage = backupPage; 
                    
//                     backupPage = await safeNewPage(browser); 
                    
//                     await safeClosePage(deadPage); 

//                     lastActiveTime = -1; frozenCheckTimestamp = Date.now();

//                     currentUrlIndex = backupUrlIndex; activeUrlStr = urlList[currentUrlIndex]; 
//                     backupUrlIndex = (backupUrlIndex + 1) % urlList.length; backupUrlStr = urlList[backupUrlIndex]; 

//                     console.log(`\n==================================================`);
//                     console.log(`[🔄] HA MULTI-CDN SWAP EXECUTED SUCCESSFULLY`);
//                     console.log(`==================================================`);
//                     console.log(`[📺] NEW ACTIVE LIVE : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                     console.log(`[🔊] LIVE AUDIO      : ON (Unmuted & Forced)`);
//                     console.log(`==================================================\n`);

//                     backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
                    
//                     failStrikes = 0; 
//                     streamSetupTime = Date.now(); 
//                     isWarmupPhase = true;

//                 } else {
//                     console.error(`[!] ❌ Backup Tab Failed. Restarting System...`);
//                     throw new Error("Tabs failed.");
//                 }
//             }
//         } else {
//             failStrikes = 0; 
//         }

//         await new Promise(r => setTimeout(r, 1000)); 
//     }
// }

// async function startDirectStreaming() {
//     console.log(`[*] Starting OBS Studio FIRST...`);
//     setupOBSConfig();

//     obsProcess = spawn('obs', ['--startstreaming', '--minimize-to-tray']);
//     obsProcess.stdout.on('data', (data) => {
//         const d = data.toString().trim();
//         // Hide spammy generic obs info from terminal unless it's a major error
//         if(d.includes('error') || d.includes('fail')) console.log(`[OBS]: ${d}`);
//     });
//     obsProcess.stderr.on('data', (data) => {
//         const msg = data.toString().trim();
//         if (msg.includes('error') || msg.includes('fail')) console.log(`[OBS Error]: ${msg}`);
//     });

//     console.log('[*] Waiting for OBS to initialize before launching browser...');
//     await new Promise(r => setTimeout(r, 6000));

//     let isObsConnected = false;
//     console.log('[*] Attempting to connect to OBS WebSocket (Polling Engine Active)...');
//     for (let attempt = 1; attempt <= 15; attempt++) {
//         try {
//             await Promise.race([
//                 obs.connect('ws://127.0.0.1:4455', 'secret'),
//                 new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
//             ]);
//             isObsConnected = true;
//             console.log('[+] OBS WebSocket Connected Successfully!');
//             break;
//         } catch (e) {
//             console.log(`[⏳] OBS Port 4455 not ready yet. Retrying (${attempt}/15)...`);
//             await new Promise(r => setTimeout(r, 2000));
//         }
//     }

//     if (isObsConnected) {
//         try {
//             await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' });
//             console.log('[+] Enforced WaitingScene (Black Screen Buffer)');
//         } catch(e){}
//     }

//     let browserArgs = [
//         '--no-sandbox', 
//         '--disable-setuid-sandbox',
//         `--window-size=${RES_W},${RES_H}`, 
//         '--window-position=0,0', 
//         '--kiosk', 
//         '--start-fullscreen',
//         '--autoplay-policy=no-user-gesture-required',
//         '--disable-dev-shm-usage', 
//         '--ignore-certificate-errors',
//         '--disable-web-security',
//         '--ignore-gpu-blocklist', 
//         '--use-gl=egl',
//         '--disable-accelerated-video-decode', 
//         '--disable-accelerated-video-encode',
//         '--disable-smooth-scrolling',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion',
//         '--disable-background-timer-throttling',
//         '--disable-backgrounding-occluded-windows',
//         '--disable-renderer-backgrounding'
//     ];

//     if (PROXY_ENGINE.includes('Cloudflare')) {
//         browserArgs.push('--proxy-server=socks5://127.0.0.1:40000');
//         console.log(`[*] Starting browser with EXACT viewport dimensions: ${RES_W}x${RES_H} and [CLOUDFLARE WARP] Proxy...`);
//     } else {
//         console.log(`[*] Starting browser with EXACT viewport dimensions: ${RES_W}x${RES_H} using [DIRECT GITHUB IP]...`);
//     }

//     browser = await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: browserArgs
//     });

//     // 🌟 2026 FIX: INCREASED POPUP KILL DELAY to let Stealth finish injecting safely
//     browser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             try {
//                 const newPage = await target.page();
//                 // 2500ms delay protects against "Requesting main frame too early" Session crashes
//                 setTimeout(async () => {
//                     if (newPage && !newPage.isClosed() && newPage !== activePage && newPage !== backupPage) {
//                         console.log(`[🛡️] AD-BLOCKER: Killed an unwanted pop-up tab!`);
//                         try { await safeClosePage(newPage); } catch(e) {}
//                     }
//                 }, 2500);
//             } catch(e){}
//         }
//     });

//     activePage = (await browser.pages())[0]; 
//     attachAntiAdListeners(activePage);
//     backupPage = await safeNewPage(browser); 
    
//     // 🌟 GLOBAL AGGRESSIVE IFRAME PENETRATOR
//     setInterval(async () => {
//         if (!activePage || activePage.isClosed()) return;
//         try {
//             const frames = activePage.frames();
//             for (const frame of frames) {
//                 if (frame.isDetached()) continue;
//                 await frame.evaluate(() => {
//                     try {
//                         let iframes = Array.from(document.querySelectorAll('iframe'));
//                         let maxArea = 0; let mainIfr = null;
//                         iframes.forEach(ifr => {
//                             let area = ifr.clientWidth * ifr.clientHeight;
//                             if (area > 5000 && area > maxArea) { maxArea = area; mainIfr = ifr; }
//                             ifr.style.setProperty('opacity', ifr === mainIfr ? '1' : '0', 'important');
//                         });
//                         if (mainIfr) {
//                             mainIfr.style.setProperty('position', 'fixed', 'important');
//                             mainIfr.style.setProperty('top', '0px', 'important');
//                             mainIfr.style.setProperty('left', '0px', 'important');
//                             mainIfr.style.setProperty('width', '100vw', 'important');
//                             mainIfr.style.setProperty('height', '100vh', 'important');
//                             mainIfr.style.setProperty('z-index', '2147483646', 'important');
//                             mainIfr.style.setProperty('background', 'black', 'important');
//                         }

//                         document.body.style.setProperty('background-color', 'black', 'important');
//                         document.body.style.setProperty('overflow', 'hidden', 'important');
//                         const junk = document.querySelectorAll('.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]');
//                         junk.forEach(el => { try { el.style.setProperty('display', 'none', 'important'); } catch(e){} });

//                         const videos = document.querySelectorAll('video');
//                         for (const v of videos) {
//                             if (v.clientWidth > 50) {
//                                 v.style.setProperty('position', 'fixed', 'important');
//                                 v.style.setProperty('top', '0px', 'important');
//                                 v.style.setProperty('left', '0px', 'important');
//                                 v.style.setProperty('width', '100vw', 'important');
//                                 v.style.setProperty('height', '100vh', 'important');
//                                 v.style.setProperty('z-index', '2147483647', 'important');
//                                 v.style.setProperty('background-color', 'black', 'important');
//                                 v.style.setProperty('object-fit', 'contain', 'important');
//                                 v.removeAttribute('controls'); 
//                             }
//                         }
                        
//                         if (!document.getElementById('anti-ui-css')) {
//                             const style = document.createElement('style');
//                             style.id = 'anti-ui-css';
//                             style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                             document.head.appendChild(style);
//                         }
//                     } catch(e) {}
//                 }).catch(()=>{});
//             }
//         } catch(e) {}
//     }, 1000);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex]}`);
//     await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });
//     await initializeVideo(activePage, false, true); 

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex]}`);
//     backupPage.goto(urlList[backupUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 

//     console.log(`\n==================================================`);
//     console.log(`[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     console.log(`==================================================`);
//     console.log(`[📺] CURRENT ACTIVE LIVE : Server [${currentUrlIndex}] -> ${urlList[currentUrlIndex]}`);
//     console.log(`[🔊] LIVE AUDIO STATUS   : ON (Unmuted)`);
//     console.log(`--------------------------------------------------`);
//     console.log(`[🛡️] NEXT BACKUP QUEUE   : Server [${backupUrlIndex}] -> ${urlList[backupUrlIndex]}`);
//     console.log(`[🔇] BACKUP AUDIO STATUS : MUTED (Background)`);
//     console.log(`==================================================\n`);

//     console.log('[*] Everything Setup! Dual-Tab Monitoring is Active.');
//     await startWatchdog();
// }

// async function mainLoop() {
//     while (true) {
//         try { 
//             await startDirectStreaming(); 
//         } 
//         catch (error) {
//             console.error(`\n[!] ALERT: ${error.message}`);
//             console.log('[*] 🔄 Hard Restarting everything in 3 seconds...');
//             await cleanup();
//             await new Promise(resolve => setTimeout(resolve, 3000));
//         }
//     }
// }

// async function cleanup() {
//     console.log('[*] Cleaning up resources...');
//     try { await obs.disconnect(); } catch (e) { } 
//     if (browser) { try { await browser.close(); } catch(e) { } browser = null; }
//     if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch(e) { } obsProcess = null; }
//     try {
//         execSync('pkill -9 obs || true', { stdio: 'ignore' });
//         execSync('pkill -9 chrome || true', { stdio: 'ignore' });
//         execSync('pkill -9 puppeteer || true', { stdio: 'ignore' });
//     } catch (e) { }
// }

// process.on('SIGINT', async () => { await cleanup(); process.exit(0); });

// const customDurationStr = process.env.CUSTOM_DURATION || 'None';
// function parseDurationToMs(str) {
//     if (!str || str.toLowerCase() === 'none') return null;
//     let ms = 0;
//     const hMatch = str.match(/(\d+)\s*h/i);
//     const mMatch = str.match(/(\d+)\s*m/i);
//     if (hMatch) ms += parseInt(hMatch[1]) * 60 * 60 * 1000;
//     if (mMatch) ms += parseInt(mMatch[1]) * 60 * 1000;
//     return ms > 0 ? ms : null;
// }

// const exactDurationMs = parseDurationToMs(customDurationStr);
// if (exactDurationMs) {
//     setTimeout(async () => {
//         console.log(`\n[*] 🛑 Time's up! The assigned duration (${customDurationStr}) is complete. Shutting down cleanly...`);
//         await cleanup();
//         process.exit(0);
//     }, exactDurationMs);
// } else {
//     setTimeout(() => {
//         try {
//             const targetUrls = process.env.TARGET_URLS || 'https://dadocric.st/player.php?id=starsp3&v=m';
//             const channel = process.env.OKRU_STREAM_ID || '1';
//             const quality = process.env.STREAM_QUALITY || '110KBps (Balanced 480p)';
//             const server = process.env.SERVER_SELECTION || 'None';
//             const cmd = `gh workflow run main.yml -f target_urls="${targetUrls}" -f okru_stream_channel="${channel}" -f stream_quality="${quality}" -f server_selection="${server}" -f proxy_engine="${PROXY_ENGINE}" -f custom_duration="None"`;
//             execSync(cmd, { stdio: 'inherit' });
//             setTimeout(async () => {
//                 await cleanup(); 
//                 process.exit(0); 
//             }, 300000); 
//         } catch (err) { }
//     }, 21000000);
// }

// mainLoop();












// =========== Alhamduallh teek hai , eek kaam karo iss mei eek system add karo like multiple stream links hai tuu asaa like humney deekha k stream sahey huty hai lekin hamar cross hu jata hai new mey pher see sahey kaam kar raha hu taa key aiss mei assaa functionality like system or acha banaye k liyee like link1 hai and wo start hai jab woo cancel huqaa too assaa kuch system k link1 ko again background mei and link2 ko bey deeky agar link1 teek hai data hai iss bar detect naehy huwaa tuu link1 new tab wala teek hai other wize next link . Lekin iss functionality ko add karney se behely disgram,flow,sab kuch latest information 2026 taakey koi crash na ayee and user experince tuu bilkul heey khraab n huu ============================


// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const util = require('util');
// const execPromise = util.promisify(exec); 
// const { OBSWebSocket } = require('obs-websocket-js'); 

// const obs = new OBSWebSocket(); 

// // 🚀 Multi-Stream Key Manager
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
//     's1.1'  : '14204232736303_14846150314543_37jq4ryehq',
//     's1.2'  : '14204288179759_14846247373359_tnsknmapva',
//     's1.3'  : '14204319768111_14846302489135_sr4ht4ccwq',
//     's1.4'  : '14204331957807_14846326147631_dji2acqcze',
//     's1.5'  : '14204346572335_14846351641135_7gvns4o5ue',
//     's2.1'  : '14204490948143_14846603495983_kzevn36tii',
//     's2.2'  : '14204506742319_14846634494511_ta2rxyg2oy',
//     's2.3'  : '14204523322927_14846661233199_foqb3q7zb4',
//     's2.10' : '14206184136239_14849618610735_ihnbx7hkoi'
// };

// const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
// let RES_W = 1920, RES_H = 1080, BITRATE = 5000;

// if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
// else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
// else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
// else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }
// else { RES_W = 1920; RES_H = 1080; BITRATE = 6000; }

// console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);

// let rawUrls = (process.env.TARGET_URLS || '').trim();
// let urlList = rawUrls !== '' 
//     ? rawUrls.split(',').map(u => u.trim().startsWith('http') ? u.trim() : 'https://' + u.trim()) 
//     : ['https://dadocric.st/player.php?id=starsp3&v=m'];

// let currentUrlIndex = 0;
// let backupUrlIndex = urlList.length > 1 ? 1 : 0; 

// const SELECTED_CHANNEL = process.env.OKRU_STREAM_ID || '1';
// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None'; 
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';
// const DYNAMIC_PROXY = process.env.DYNAMIC_PROXY || '';

// const ACTIVE_STREAM_KEY = STREAM_KEYS[SELECTED_CHANNEL] || STREAM_KEYS['1'];

// let browser = null;
// let obsProcess = null;
// let activePage = null;
// let backupPage = null;

// const FROZEN_THRESHOLD_MS = 8000; 

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount = 0;

// async function takeAndBatchScreenshot(page, stepName) {
//     if (!page) return;
//     try {
//         const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
//         const filePath = `./screenshots/snap_${timestamp}_${stepName}.png`;
//         await page.screenshot({ path: filePath });
//         console.log(`[📸] Screenshot saved: ${filePath}`);
//         pendingScreenshots.push(filePath);

//         if (pendingScreenshots.length >= 3) {
//             const filesToUpload = pendingScreenshots.join(' ');
//             pendingScreenshots = []; 
            
//             (async () => {
//                 try {
//                     const tag = 'live-stream-logs';
//                     try { await execPromise(`gh release view ${tag} || gh release create ${tag} -t "Live Logs"`); } catch(e) {}
//                     try {
//                         const { stdout } = await execPromise(`gh release view ${tag} --json assets -q ".assets[].name"`);
//                         const oldAssets = stdout.trim().split('\n');
//                         for (const asset of oldAssets) {
//                             if (asset) await execPromise(`gh release delete-asset ${tag} "${asset}" -y`).catch(e=>{});
//                         }
//                     } catch(e) {}
//                     await execPromise(`gh release upload ${tag} ${filesToUpload} --clobber`).catch(e=>{});
//                     uploadCycleCount++;
//                 } catch (err) { }
//             })();
//         }
//     } catch (e) { }
// }

// async function showLoadingUI(page, title, sub) {
//     try {
//         await page.evaluate((t, s) => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) overlay.remove();

//             overlay = document.createElement('div');
//             overlay.id = 'smart-stream-overlay';
//             overlay.innerHTML = `
//                 <style>
//                     #smart-stream-overlay {
//                         position: fixed !important; top: 0 !important; left: 0 !important; 
//                         width: 100vw !important; height: 100vh !important;
//                         background: radial-gradient(circle at center, #1a1a1a 0%, #000000 100%) !important;
//                         z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                         justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                         pointer-events: none !important;
//                     }
//                     .stream-spinner {
//                         width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1);
//                         border-top: 6px solid #e50914; border-radius: 50%;
//                         animation: spin-overlay 1s linear infinite; margin-bottom: 30px;
//                         box-shadow: 0 0 25px rgba(229, 9, 20, 0.4);
//                     }
//                     @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                     .stream-title { 
//                         font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; 
//                         margin-bottom: 15px !important; text-transform: uppercase !important; 
//                         text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important;
//                     }
//                     .stream-sub { 
//                         font-size: 20px !important; color: #cccccc !important; text-align: center !important; 
//                         max-width: 600px !important; line-height: 1.6 !important; font-weight: 400 !important;
//                     }
//                     .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
//                     @keyframes blinker { 50% { opacity: 0.3; } }
//                 </style>
//                 <div class="stream-spinner"></div>
//                 <div class="stream-title" id="overlay-title">${t}</div>
//                 <div class="stream-sub" id="overlay-sub">${s}</div>
//             `;
//             document.body.appendChild(overlay);
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) overlay.remove();
//         });
//     } catch (e) {}
// }

// function setupOBSConfig() {
//     const obsDir = path.join(os.homedir(), '.config', 'obs-studio');
//     const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
//     const scenesDir = path.join(obsDir, 'basic', 'scenes');

//     fs.mkdirSync(profilesDir, { recursive: true });
//     fs.mkdirSync(scenesDir, { recursive: true });

//     const globalIniContent = `[General]\nLicenseAccepted=true\n[BasicWindow]\nShowAutoConfig=false\nWarned=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`;
//     fs.writeFileSync(path.join(obsDir, 'global.ini'), globalIniContent);
    
//     const basicIniContent = `[General]
// Name=Untitled
// [Video]
// BaseCX=${RES_W}
// BaseCY=${RES_H}
// OutputCX=${RES_W}
// OutputCY=${RES_H}
// FPSCommon=30
// [Output]
// Mode=Simple
// [SimpleOutput]
// VBitrate=${BITRATE}
// StreamEncoder=x264
// x264Preset=ultrafast
// x264Settings=keyint=60 tune=zerolatency profile=main threads=4 rc-lookahead=0
// `;
//     fs.writeFileSync(path.join(profilesDir, 'basic.ini'), basicIniContent);

//     const serviceJson = {
//         "settings": { "server": "rtmp://vsu.okcdn.ru/input/", "key": ACTIVE_STREAM_KEY },
//         "type": "rtmp_custom"
//     };
//     fs.writeFileSync(path.join(profilesDir, 'service.json'), JSON.stringify(serviceJson, null, 2));

//     const sceneJson = {
//         "current_scene": "WaitingScene", 
//         "current_program_scene": "WaitingScene", 
//         "name": "Untitled",
//         "scene_order": [{"name": "WaitingScene"}, {"name": "MainScene"}],
//         "sources": [
//             { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
//             { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
//             {
//                 "id": "scene", "name": "MainScene",
//                 "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true}, {"name": "Audio", "id": 2, "visible": true} ] }
//             },
//             {
//                 "id": "scene", "name": "WaitingScene",
//                 "settings": { "items": [] } 
//             }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// function attachAntiAdListeners(page) {
//     page.on('dialog', async dialog => {
//         console.log(`[🛡️] AD-BLOCKER: Dismissed a Javascript alert/dialog!`);
//         await dialog.dismiss();
//     });
// }

// async function initializeVideo(page, startMuted, isActivePage) {
//     try {
//         if (SERVER_SELECTION !== 'None') {
//             console.log(`[*] Clicking specific Server: ${SERVER_SELECTION}`);
//             let serverClicked = false; let serverAttempts = 0;
//             while (!serverClicked && serverAttempts < 10) { 
//                 serverAttempts++;
//                 try {
//                     const clickSuccess = await page.evaluate((serverName) => {
//                         const buttons = Array.from(document.querySelectorAll('button'));
//                         const targetBtn = buttons.find(b => b.innerText && b.innerText.trim().includes(serverName));
//                         if (targetBtn) { targetBtn.click(); return true; }
//                         return false;
//                     }, SERVER_SELECTION);

//                     if (clickSuccess) {
//                         serverClicked = true; 
//                         console.log(`[+] Server Button clicked successfully!`);
//                         await takeAndBatchScreenshot(page, `server-clicked`);
//                         await new Promise(r => setTimeout(r, 2000)); 
//                         if (isActivePage) await page.bringToFront(); 
//                     } else await new Promise(r => setTimeout(r, 2000));
//                 } catch (err) { await new Promise(r => setTimeout(r, 2000)); }
//             }
//         }

//         console.log('[*] Checking if Video is Autoplaying or Needs a Play Button...');
//         let isVideoPlaying = false; 
//         let attempts = 0;
        
//         while (!isVideoPlaying && attempts < 15) {
//             for (const frame of page.frames()) {
//                 try {
//                     const autoPlayed = await frame.evaluate(() => {
//                         let playing = false;
//                         document.querySelectorAll('video').forEach(v => {
//                             if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) {
//                                 v.muted = false; 
//                                 v.volume = 1.0;
//                                 playing = true;
//                             }
//                         });
//                         return playing;
//                     });

//                     if (autoPlayed) {
//                         isVideoPlaying = true;
//                         break;
//                     }

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play');
//                     if (playBtn) {
//                         const isVisible = await frame.evaluate(el => {
//                             const style = window.getComputedStyle(el);
//                             return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
//                         }, playBtn);

//                         if (isVisible) {
//                             await frame.evaluate(el => el.click(), playBtn); 
//                             await takeAndBatchScreenshot(page, `play-btn-clicked`);
//                             await new Promise(r => setTimeout(r, 3000)); 
//                             isVideoPlaying = true;
//                             break; 
//                         }
//                     }

//                     if (!isVideoPlaying && attempts > 5) {
//                         const forced = await frame.evaluate(async () => {
//                             let played = false;
//                             let vids = document.querySelectorAll('video');
//                             for(let v of vids) {
//                                 if (v.clientWidth > 50) { 
//                                     v.muted = false; v.volume = 1.0; 
//                                     try { v.click(); } catch(e){}
//                                     try {
//                                         let p = v.play();
//                                         if (p !== undefined) p.catch(()=>{});
//                                         played = true;
//                                     } catch(e) {}
//                                 }
//                             }
//                             return played;
//                         });

//                         if (forced) {
//                             await takeAndBatchScreenshot(page, `force-play-applied`);
//                             isVideoPlaying = true;
//                             break;
//                         }
//                     }
//                 } catch (err) {}
//             }
//             if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
//             attempts++;
//         }

//         console.log('[*] Scanning for Exact Real Video Player...');
//         let targetFrame = null;
//         for (const frame of page.frames()) {
//             try {
//                 const isRealLiveStream = await frame.evaluate(() => {
//                     const vid = document.querySelector('video');
//                     return vid && vid.clientWidth > 50 && vid.clientHeight > 50;
//                 });
//                 if (isRealLiveStream) { 
//                     targetFrame = frame; 
//                     console.log(`[+] Smart Scanner locked onto video frame!`);
//                     break; 
//                 }
//             } catch (e) { }
//         }

//         if (!targetFrame) targetFrame = page.mainFrame();

//         await page.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     document.documentElement.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('overflow', 'hidden', 'important');

//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = null; let maxArea = 0;

//                     iframes.forEach(ifr => {
//                         let area = ifr.clientWidth * ifr.clientHeight;
//                         if (area > maxArea && area > 5000) { maxArea = area; mainIframe = ifr; }
//                     });

//                     iframes.forEach(ifr => {
//                         if (ifr !== mainIframe) {
//                             ifr.style.setProperty('opacity', '0', 'important');
//                             ifr.style.setProperty('pointer-events', 'none', 'important');
//                             ifr.style.setProperty('z-index', '-999', 'important');
//                         }
//                     });

//                     if (mainIframe) {
//                         mainIframe.style.setProperty('position', 'fixed', 'important');
//                         mainIframe.style.setProperty('top', '0px', 'important');
//                         mainIframe.style.setProperty('left', '0px', 'important');
//                         mainIframe.style.setProperty('width', '100vw', 'important');
//                         mainIframe.style.setProperty('height', '100vh', 'important');
//                         mainIframe.style.setProperty('z-index', '2147483645', 'important');
//                         mainIframe.style.setProperty('background-color', 'black', 'important');
//                         mainIframe.style.setProperty('border', 'none', 'important');
//                         mainIframe.style.setProperty('opacity', '1', 'important');
//                         mainIframe.style.setProperty('visibility', 'visible', 'important');
//                     }

//                     const junk = document.querySelectorAll('.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"], [id*="pop"], [class*="pop"], a[href*="extension"]');
//                     junk.forEach(el => { try { el.style.setProperty('display', 'none', 'important'); } catch(e){} });
//                 } catch (err) {}
//             }, 1000); 
//         }).catch(() => {});

//         await targetFrame.evaluate((initMuted) => {
//             window.__isMuted = initMuted; 
//             setInterval(() => {
//                 try {
//                     const style = document.createElement('style');
//                     style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                     document.head.appendChild(style);

//                     const mediaElements = document.querySelectorAll('video, audio');
//                     const videos = Array.from(document.querySelectorAll('video'));
//                     let realVideo = null;

//                     mediaElements.forEach(media => { 
//                         if (media.muted !== window.__isMuted) media.muted = window.__isMuted; 
//                         let targetVol = window.__isMuted ? 0.0 : 1.0;
//                         if (media.volume !== targetVol) media.volume = targetVol; 
//                     });

//                     if (!window.__isMuted) {
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => {
//                             try { btn.click(); } catch(e){}
//                         });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (realVideo) { 
//                         realVideo.style.setProperty('position', 'fixed', 'important');
//                         realVideo.style.setProperty('top', '0px', 'important');
//                         realVideo.style.setProperty('left', '0px', 'important');
//                         realVideo.style.setProperty('width', '100vw', 'important');
//                         realVideo.style.setProperty('height', '100vh', 'important');
//                         realVideo.style.setProperty('z-index', '2147483647', 'important'); 
//                         realVideo.style.setProperty('background-color', 'black', 'important');
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         realVideo.style.setProperty('opacity', '1', 'important');
//                         realVideo.style.setProperty('visibility', 'visible', 'important');
//                         realVideo.style.setProperty('display', 'block', 'important');
//                     }
//                 } catch(err) {}
//             }, 1000); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     await hideLoadingUI(page);
// }

// async function checkPageStatus(page) {
//     if (!page) return { status: 'DEAD' };
//     try {
//         for (const frame of page.frames()) {
//             try {
//                 if (frame.isDetached()) continue;
//                 const result = await Promise.race([
//                     frame.evaluate(() => {
//                         const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
                        
//                         if (
//                             bodyText.includes("stream error") || 
//                             bodyText.includes("not found") || 
//                             bodyText.includes("domain is blocked") ||
//                             bodyText.includes("error: forbidden") ||
//                             bodyText.includes("access denied") ||
//                             (bodyText.includes("cloudflare") && bodyText.includes("blocked"))
//                         ) {
//                             return { status: 'CRITICAL_ERROR' };
//                         }
                        
//                         const videos = Array.from(document.querySelectorAll('video'));
//                         let targetV = null;

//                         for (const v of videos) {
//                             if (v.clientWidth > 0 && v.clientWidth < 100) continue;
//                             if ((v.src && v.src.startsWith('blob:')) || v.matches('.jw-video, .plyr__video, .vjs-tech')) {
//                                 targetV = v; break;
//                             }
//                         }
                        
//                         if (!targetV && videos.length > 0) {
//                             targetV = videos.sort((a, b) => (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight))[0];
//                         }
                        
//                         if (targetV) {
//                             const isDataFlowing = targetV.readyState >= 3; 
//                             const isPlaying = !targetV.paused && targetV.currentTime > 0;

//                             if (isPlaying && isDataFlowing) {
//                                 return { status: 'HEALTHY', currentTime: targetV.currentTime };
//                             } else if (!isDataFlowing && isPlaying) {
//                                 return { status: 'NO_DATA_FLOW', currentTime: targetV.currentTime };
//                             }
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

// async function startWatchdog() {
//     let lastActiveTime = -1;
//     let frozenCheckTimestamp = Date.now();
//     let watchdogTicks = 0;
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     const WARMUP_MAX_TIME = 15000; 

//     let activeUrlStr = urlList[currentUrlIndex];
//     let backupUrlStr = urlList[backupUrlIndex];

//     let failStrikes = 0; 

//     while (true) {
//         if (!browser || !browser.isConnected()) throw new Error("Browser closed.");

//         let activeStatus = await checkPageStatus(activePage);

//         if (activeStatus.status === 'HEALTHY') {
//             await hideLoadingUI(activePage); 
//             isWarmupPhase = false; 

//             if (activeStatus.currentTime === lastActiveTime) {
//                 if (Date.now() - frozenCheckTimestamp > FROZEN_THRESHOLD_MS) activeStatus.status = 'FROZEN';
//             } else {
//                 lastActiveTime = activeStatus.currentTime; frozenCheckTimestamp = Date.now();
//                 failStrikes = 0; 
                
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             frame.evaluate(() => { 
//                                 window.__isMuted = false;
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                             }).catch(()=>{});
//                         }
//                     } catch(e) {}
//                 }
//             }
//         }

//         if (backupPage) {
//             for (const frame of backupPage.frames()) {
//                 try {
//                     if (!frame.isDetached()) {
//                         frame.evaluate(() => { 
//                             window.__isMuted = true;
//                             document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); 
//                         }).catch(()=>{});
//                     }
//                 } catch(e) {}
//             }
//         }

//         watchdogTicks++;
//         if (watchdogTicks % 4 === 0) {
//             console.log(`\n[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//             console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//             console.log(`[⏭️] NEXT IN QUEUE    : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//             if (watchdogTicks % 120 === 0) {
//                 takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
//             }
//         }

//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'NO_DATA_FLOW') {
            
//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 await new Promise(r => setTimeout(r, 1000));
//                 continue; 
//             }

//             failStrikes++;
//             console.log(`[🚨] Data Flow Alert: Detected '${activeStatus.status}' (Strike ${failStrikes}/2)`);
            
//             if (failStrikes < 2) {
//                 // Wait for next 1 second loop tick safely
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ BACKEND CONNECTION LOST: ${activeStatus.status} - EXECUTING INSTANT HOT-SWAP`);
//                 console.log(`==================================================`);
                
//                 await showLoadingUI(activePage, "RECONNECTING", "Establishing secure connection to backup server <span class='stream-blink'>...</span>");
//                 await new Promise(r => setTimeout(r, 500)); 

//                 await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
                
//                 let backupStatus = await checkPageStatus(backupPage);

//                 if (backupStatus.status === 'HEALTHY' || backupStatus.status === 'DEAD' || backupStatus.status === 'NO_DATA_FLOW') { 
                    
//                     for (const frame of activePage.frames()) {
//                         try {
//                             if (!frame.isDetached()) await frame.evaluate(() => { window.__isMuted = true; document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); });
//                         } catch(e) {}
//                     }
                    
//                     await showLoadingUI(backupPage, "RECONNECTING", "Optimizing live video connection <span class='stream-blink'>...</span>");
//                     await backupPage.bringToFront();
//                     await new Promise(r => setTimeout(r, 500)); 
                    
//                     try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                     console.log(`[*] Initiating Instant Switch to Backup Tab...`);
//                     await initializeVideo(backupPage, false, true); 

//                     let brokenPage = activePage; activePage = backupPage; backupPage = brokenPage;
//                     lastActiveTime = -1; frozenCheckTimestamp = Date.now();

//                     currentUrlIndex = backupUrlIndex; activeUrlStr = urlList[currentUrlIndex]; 
//                     backupUrlIndex = (backupUrlIndex + 1) % urlList.length; backupUrlStr = urlList[backupUrlIndex]; 

//                     console.log(`\n==================================================`);
//                     console.log(`[🔄] ZERO-LATENCY SWAP EXECUTED SUCCESSFULLY`);
//                     console.log(`==================================================`);
//                     console.log(`[📺] NEW ACTIVE LIVE : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                     console.log(`[🔊] LIVE AUDIO      : ON (Unmuted & Forced)`);
//                     console.log(`==================================================\n`);

//                     backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
                    
//                     failStrikes = 0; 
//                     streamSetupTime = Date.now(); 
//                     isWarmupPhase = true;

//                 } else {
//                     console.error(`[!] ❌ Backup Tab Failed. Restarting System...`);
//                     throw new Error("Tabs failed.");
//                 }
//             }
//         } else {
//             failStrikes = 0; 
//         }

//         await new Promise(r => setTimeout(r, 1000)); 
//     }
// }

// async function startDirectStreaming() {
//     console.log(`[*] Starting OBS Studio FIRST...`);
//     setupOBSConfig();

//     obsProcess = spawn('obs', ['--startstreaming', '--minimize-to-tray']);
//     obsProcess.stdout.on('data', (data) => console.log(`[OBS]: ${data.toString().trim()}`));
//     obsProcess.stderr.on('data', (data) => {
//         const msg = data.toString().trim();
//         if (msg.includes('error') || msg.includes('fail')) console.log(`[OBS Error]: ${msg}`);
//     });

//     console.log('[*] Waiting for OBS to initialize before launching browser...');
//     await new Promise(r => setTimeout(r, 6000));

//     let isObsConnected = false;
//     console.log('[*] Attempting to connect to OBS WebSocket (Polling Engine Active)...');
//     for (let attempt = 1; attempt <= 15; attempt++) {
//         try {
//             // 🌟 FIX: Added 'await' so OBS connection does not infinite loop
//             await Promise.race([
//                 obs.connect('ws://127.0.0.1:4455', 'secret'),
//                 new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
//             ]);
//             isObsConnected = true;
//             console.log('[+] OBS WebSocket Connected Successfully!');
//             break;
//         } catch (e) {
//             console.log(`[⏳] OBS Port 4455 not ready yet. Retrying (${attempt}/15)...`);
//             await new Promise(r => setTimeout(r, 2000));
//         }
//     }

//     if (isObsConnected) {
//         try {
//             await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' });
//             console.log('[+] Enforced WaitingScene (Black Screen Buffer)');
//         } catch(e){}
//     }

//     let browserArgs = [
//         '--no-sandbox', 
//         '--disable-setuid-sandbox',
//         `--window-size=${RES_W},${RES_H}`, 
//         '--window-position=0,0', 
//         '--kiosk', 
//         '--start-fullscreen',
//         '--autoplay-policy=no-user-gesture-required',
//         '--disable-dev-shm-usage', 
//         '--ignore-certificate-errors',
//         '--disable-web-security',
//         '--ignore-gpu-blocklist', 
//         '--use-gl=egl',
//         '--disable-accelerated-video-decode', 
//         '--disable-accelerated-video-encode',
//         '--disable-smooth-scrolling',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion',
//         '--disable-background-timer-throttling',
//         '--disable-backgrounding-occluded-windows',
//         '--disable-renderer-backgrounding'
//     ];

//     if (PROXY_ENGINE.includes('Cloudflare')) {
//         browserArgs.push('--proxy-server=socks5://127.0.0.1:40000');
//         console.log(`[*] Starting browser with EXACT viewport dimensions: ${RES_W}x${RES_H} and [CLOUDFLARE WARP] Proxy...`);
//     } else {
//         console.log(`[*] Starting browser with EXACT viewport dimensions: ${RES_W}x${RES_H} using [DIRECT GITHUB IP]...`);
//     }

//     browser = await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: browserArgs
//     });

//     browser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => {
//                 if (newPage && newPage !== activePage && newPage !== backupPage) {
//                     console.log(`[🛡️] AD-BLOCKER: Killed an unwanted pop-up tab!`);
//                     try { await newPage.close(); } catch(e) {}
//                 }
//             }, 500);
//         }
//     });

//     activePage = (await browser.pages())[0]; 
//     backupPage = await browser.newPage();
    
//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex]}`);
//     await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
//     await initializeVideo(activePage, false, true); 

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Black Screen to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex]}`);
//     backupPage.goto(urlList[backupUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 

//     console.log(`\n==================================================`);
//     console.log(`[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     console.log(`==================================================`);
//     console.log(`[📺] CURRENT ACTIVE LIVE : Server [${currentUrlIndex}] -> ${urlList[currentUrlIndex]}`);
//     console.log(`[🔊] LIVE AUDIO STATUS   : ON (Unmuted)`);
//     console.log(`--------------------------------------------------`);
//     console.log(`[🛡️] NEXT BACKUP QUEUE   : Server [${backupUrlIndex}] -> ${urlList[backupUrlIndex]}`);
//     console.log(`[🔇] BACKUP AUDIO STATUS : MUTED (Background)`);
//     console.log(`==================================================\n`);

//     console.log('[*] Everything Setup! Dual-Tab Monitoring is Active.');
//     await startWatchdog();
// }

// async function mainLoop() {
//     while (true) {
//         try { 
//             // 🌟 FIX: Added the critical 'await' to prevent infinite execution loop crash!
//             await startDirectStreaming(); 
//         } 
//         catch (error) {
//             console.error(`\n[!] ALERT: ${error.message}`);
//             console.log('[*] 🔄 Hard Restarting everything in 3 seconds...');
//             await cleanup();
//             await new Promise(resolve => setTimeout(resolve, 3000));
//         }
//     }
// }

// async function cleanup() {
//     console.log('[*] Cleaning up resources...');
//     try { await obs.disconnect(); } catch (e) { } 
//     if (browser) { try { await browser.close(); } catch(e) { } browser = null; }
//     if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch(e) { } obsProcess = null; }
//     try {
//         execSync('pkill -9 obs || true', { stdio: 'ignore' });
//         execSync('pkill -9 chrome || true', { stdio: 'ignore' });
//         execSync('pkill -9 puppeteer || true', { stdio: 'ignore' });
//     } catch (e) { }
// }

// process.on('SIGINT', async () => { await cleanup(); process.exit(0); });

// const customDurationStr = process.env.CUSTOM_DURATION || 'None';
// function parseDurationToMs(str) {
//     if (!str || str.toLowerCase() === 'none') return null;
//     let ms = 0;
//     const hMatch = str.match(/(\d+)\s*h/i);
//     const mMatch = str.match(/(\d+)\s*m/i);
//     if (hMatch) ms += parseInt(hMatch[1]) * 60 * 60 * 1000;
//     if (mMatch) ms += parseInt(mMatch[1]) * 60 * 1000;
//     return ms > 0 ? ms : null;
// }

// const exactDurationMs = parseDurationToMs(customDurationStr);
// if (exactDurationMs) {
//     setTimeout(async () => {
//         console.log(`\n[*] 🛑 Time's up! The assigned duration (${customDurationStr}) is complete. Shutting down cleanly...`);
//         await cleanup();
//         process.exit(0);
//     }, exactDurationMs);
// } else {
//     setTimeout(() => {
//         try {
//             const targetUrls = process.env.TARGET_URLS || 'https://dadocric.st/player.php?id=starsp3&v=m';
//             const channel = process.env.OKRU_STREAM_ID || '1';
//             const quality = process.env.STREAM_QUALITY || '110KBps (Balanced 480p)';
//             const server = process.env.SERVER_SELECTION || 'None';
//             const cmd = `gh workflow run main.yml -f target_urls="${targetUrls}" -f okru_stream_channel="${channel}" -f stream_quality="${quality}" -f server_selection="${server}" -f proxy_engine="${PROXY_ENGINE}" -f custom_duration="None"`;
//             execSync(cmd, { stdio: 'inherit' });
//             setTimeout(async () => {
//                 await cleanup(); 
//                 process.exit(0); 
//             }, 300000); 
//         } catch (err) { }
//     }, 21000000);
// }

// mainLoop();







// ================ yeh bs teek hai bas jab dosra link chta hai too woo overlay reconnecting wala nahey hu raha hai ================


// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const util = require('util');
// const execPromise = util.promisify(exec); 
// const { OBSWebSocket } = require('obs-websocket-js'); 

// const obs = new OBSWebSocket(); 

// // 🚀 Multi-Stream Key Manager
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
//     's1.1'  : '14204232736303_14846150314543_37jq4ryehq',
//     's1.2'  : '14204288179759_14846247373359_tnsknmapva',
//     's1.3'  : '14204319768111_14846302489135_sr4ht4ccwq',
//     's1.4'  : '14204331957807_14846326147631_dji2acqcze',
//     's1.5'  : '14204346572335_14846351641135_7gvns4o5ue',
//     's2.1'  : '14204490948143_14846603495983_kzevn36tii',
//     's2.2'  : '14204506742319_14846634494511_ta2rxyg2oy',
//     's2.3'  : '14204523322927_14846661233199_foqb3q7zb4',
//     's2.10' : '14206184136239_14849618610735_ihnbx7hkoi'
// };

// const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
// let RES_W = 1920, RES_H = 1080, BITRATE = 5000;

// if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
// else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
// else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
// else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }
// else { RES_W = 1920; RES_H = 1080; BITRATE = 6000; }

// console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);

// let rawUrls = (process.env.TARGET_URLS || '').trim();
// let urlList = rawUrls !== '' 
//     ? rawUrls.split(',').map(u => u.trim().startsWith('http') ? u.trim() : 'https://' + u.trim()) 
//     : ['https://dadocric.st/player.php?id=starsp3&v=m'];

// let currentUrlIndex = 0;
// let backupUrlIndex = urlList.length > 1 ? 1 : 0; 

// const SELECTED_CHANNEL = process.env.OKRU_STREAM_ID || '1';
// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None'; 
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

// const ACTIVE_STREAM_KEY = STREAM_KEYS[SELECTED_CHANNEL] || STREAM_KEYS['1'];

// let browser = null;
// let obsProcess = null;
// let activePage = null;
// let backupPage = null;

// const FROZEN_THRESHOLD_MS = 8000; 

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount = 0;

// async function takeAndBatchScreenshot(page, stepName) {
//     if (!page) return;
//     try {
//         const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
//         const filePath = `./screenshots/snap_${timestamp}_${stepName}.png`;
//         await page.screenshot({ path: filePath });
//         console.log(`[📸] Screenshot saved: ${filePath}`);
//         pendingScreenshots.push(filePath);

//         if (pendingScreenshots.length >= 3) {
//             const filesToUpload = pendingScreenshots.join(' ');
//             pendingScreenshots = []; 
            
//             (async () => {
//                 try {
//                     const tag = 'live-stream-logs';
//                     try { await execPromise(`gh release view ${tag} || gh release create ${tag} -t "Live Logs"`); } catch(e) {}
//                     try {
//                         const { stdout } = await execPromise(`gh release view ${tag} --json assets -q ".assets[].name"`);
//                         const oldAssets = stdout.trim().split('\n');
//                         for (const asset of oldAssets) {
//                             if (asset) await execPromise(`gh release delete-asset ${tag} "${asset}" -y`).catch(e=>{});
//                         }
//                     } catch(e) {}
//                     await execPromise(`gh release upload ${tag} ${filesToUpload} --clobber`).catch(e=>{});
//                     uploadCycleCount++;
//                 } catch (err) { }
//             })();
//         }
//     } catch (e) { }
// }

// async function showLoadingUI(page, title, sub) {
//     try {
//         await page.evaluate((t, s) => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) overlay.remove();

//             overlay = document.createElement('div');
//             overlay.id = 'smart-stream-overlay';
//             overlay.innerHTML = `
//                 <style>
//                     #smart-stream-overlay {
//                         position: fixed !important; top: 0 !important; left: 0 !important; 
//                         width: 100vw !important; height: 100vh !important;
//                         background: radial-gradient(circle at center, #1a1a1a 0%, #000000 100%) !important;
//                         z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                         justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                         pointer-events: none !important;
//                     }
//                     .stream-spinner {
//                         width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1);
//                         border-top: 6px solid #e50914; border-radius: 50%;
//                         animation: spin-overlay 1s linear infinite; margin-bottom: 30px;
//                         box-shadow: 0 0 25px rgba(229, 9, 20, 0.4);
//                     }
//                     @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                     .stream-title { 
//                         font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; 
//                         margin-bottom: 15px !important; text-transform: uppercase !important; 
//                         text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important;
//                     }
//                     .stream-sub { 
//                         font-size: 20px !important; color: #cccccc !important; text-align: center !important; 
//                         max-width: 600px !important; line-height: 1.6 !important; font-weight: 400 !important;
//                     }
//                     .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
//                     @keyframes blinker { 50% { opacity: 0.3; } }
//                 </style>
//                 <div class="stream-spinner"></div>
//                 <div class="stream-title" id="overlay-title">${t}</div>
//                 <div class="stream-sub" id="overlay-sub">${s}</div>
//             `;
//             document.body.appendChild(overlay);
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) overlay.remove();
//         });
//     } catch (e) {}
// }

// function setupOBSConfig() {
//     const obsDir = path.join(os.homedir(), '.config', 'obs-studio');
//     const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
//     const scenesDir = path.join(obsDir, 'basic', 'scenes');

//     fs.mkdirSync(profilesDir, { recursive: true });
//     fs.mkdirSync(scenesDir, { recursive: true });

//     const globalIniContent = `[General]\nLicenseAccepted=true\n[BasicWindow]\nShowAutoConfig=false\nWarned=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`;
//     fs.writeFileSync(path.join(obsDir, 'global.ini'), globalIniContent);
    
//     const basicIniContent = `[General]
// Name=Untitled
// [Video]
// BaseCX=${RES_W}
// BaseCY=${RES_H}
// OutputCX=${RES_W}
// OutputCY=${RES_H}
// FPSCommon=30
// [Output]
// Mode=Simple
// [SimpleOutput]
// VBitrate=${BITRATE}
// StreamEncoder=x264
// x264Preset=ultrafast
// x264Settings=keyint=60 tune=zerolatency profile=main threads=4 rc-lookahead=0
// `;
//     fs.writeFileSync(path.join(profilesDir, 'basic.ini'), basicIniContent);

//     const serviceJson = {
//         "settings": { "server": "rtmp://vsu.okcdn.ru/input/", "key": ACTIVE_STREAM_KEY },
//         "type": "rtmp_custom"
//     };
//     fs.writeFileSync(path.join(profilesDir, 'service.json'), JSON.stringify(serviceJson, null, 2));

//     const sceneJson = {
//         "current_scene": "WaitingScene", 
//         "current_program_scene": "WaitingScene", 
//         "name": "Untitled",
//         "scene_order": [{"name": "WaitingScene"}, {"name": "MainScene"}],
//         "sources": [
//             { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
//             { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
//             {
//                 "id": "scene", "name": "MainScene",
//                 "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true}, {"name": "Audio", "id": 2, "visible": true} ] }
//             },
//             {
//                 "id": "scene", "name": "WaitingScene",
//                 "settings": { "items": [] } 
//             }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// function attachAntiAdListeners(page) {
//     page.on('dialog', async dialog => {
//         console.log(`[🛡️] AD-BLOCKER: Dismissed a Javascript alert/dialog!`);
//         await dialog.dismiss();
//     });
// }

// async function initializeVideo(page, startMuted, isActivePage) {
//     try {
//         if (SERVER_SELECTION !== 'None') {
//             console.log(`[*] Clicking specific Server: ${SERVER_SELECTION}`);
//             let serverClicked = false; let serverAttempts = 0;
//             while (!serverClicked && serverAttempts < 10) { 
//                 serverAttempts++;
//                 try {
//                     const clickSuccess = await page.evaluate((serverName) => {
//                         const buttons = Array.from(document.querySelectorAll('button'));
//                         const targetBtn = buttons.find(b => b.innerText && b.innerText.trim().includes(serverName));
//                         if (targetBtn) { targetBtn.click(); return true; }
//                         return false;
//                     }, SERVER_SELECTION);

//                     if (clickSuccess) {
//                         serverClicked = true; 
//                         console.log(`[+] Server Button clicked successfully!`);
//                         await takeAndBatchScreenshot(page, `server-clicked`);
//                         await new Promise(r => setTimeout(r, 2000)); 
//                         if (isActivePage) await page.bringToFront(); 
//                     } else await new Promise(r => setTimeout(r, 2000));
//                 } catch (err) { await new Promise(r => setTimeout(r, 2000)); }
//             }
//         }

//         console.log('[*] Checking if Video is Autoplaying or Needs a Play Button...');
//         let isVideoPlaying = false; 
//         let attempts = 0;
        
//         while (!isVideoPlaying && attempts < 15) {
//             for (const frame of page.frames()) {
//                 try {
//                     const autoPlayed = await frame.evaluate(() => {
//                         let playing = false;
//                         document.querySelectorAll('video').forEach(v => {
//                             if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) {
//                                 v.muted = false; 
//                                 v.volume = 1.0;
//                                 playing = true;
//                             }
//                         });
//                         return playing;
//                     });

//                     if (autoPlayed) {
//                         isVideoPlaying = true;
//                         break;
//                     }

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play');
//                     if (playBtn) {
//                         const isVisible = await frame.evaluate(el => {
//                             const style = window.getComputedStyle(el);
//                             return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
//                         }, playBtn);

//                         if (isVisible) {
//                             await frame.evaluate(el => el.click(), playBtn); 
//                             await takeAndBatchScreenshot(page, `play-btn-clicked`);
//                             await new Promise(r => setTimeout(r, 3000)); 
//                             isVideoPlaying = true;
//                             break; 
//                         }
//                     }

//                     if (!isVideoPlaying && attempts > 5) {
//                         const forced = await frame.evaluate(async () => {
//                             let played = false;
//                             let vids = document.querySelectorAll('video');
//                             for(let v of vids) {
//                                 if (v.clientWidth > 50) { 
//                                     v.muted = false; v.volume = 1.0; 
//                                     try { v.click(); } catch(e){}
//                                     try {
//                                         let p = v.play();
//                                         if (p !== undefined) p.catch(()=>{});
//                                         played = true;
//                                     } catch(e) {}
//                                 }
//                             }
//                             return played;
//                         });

//                         if (forced) {
//                             await takeAndBatchScreenshot(page, `force-play-applied`);
//                             isVideoPlaying = true;
//                             break;
//                         }
//                     }
//                 } catch (err) {}
//             }
//             if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
//             attempts++;
//         }

//         console.log('[*] Scanning for Exact Real Video Player...');
//         let targetFrame = null;
//         for (const frame of page.frames()) {
//             try {
//                 const isRealLiveStream = await frame.evaluate(() => {
//                     const vid = document.querySelector('video');
//                     return vid && vid.clientWidth > 50 && vid.clientHeight > 50;
//                 });
//                 if (isRealLiveStream) { 
//                     targetFrame = frame; 
//                     console.log(`[+] Smart Scanner locked onto video frame!`);
//                     break; 
//                 }
//             } catch (e) { }
//         }

//         if (!targetFrame) targetFrame = page.mainFrame();

//         await page.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     document.documentElement.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('overflow', 'hidden', 'important');

//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = null; let maxArea = 0;

//                     iframes.forEach(ifr => {
//                         let area = ifr.clientWidth * ifr.clientHeight;
//                         if (area > maxArea && area > 5000) { maxArea = area; mainIframe = ifr; }
//                     });

//                     iframes.forEach(ifr => {
//                         if (ifr !== mainIframe) {
//                             ifr.style.setProperty('opacity', '0', 'important');
//                             ifr.style.setProperty('pointer-events', 'none', 'important');
//                             ifr.style.setProperty('z-index', '-999', 'important');
//                         }
//                     });

//                     if (mainIframe) {
//                         mainIframe.style.setProperty('position', 'fixed', 'important');
//                         mainIframe.style.setProperty('top', '0px', 'important');
//                         mainIframe.style.setProperty('left', '0px', 'important');
//                         mainIframe.style.setProperty('width', '100vw', 'important');
//                         mainIframe.style.setProperty('height', '100vh', 'important');
//                         mainIframe.style.setProperty('z-index', '2147483645', 'important');
//                         mainIframe.style.setProperty('background-color', 'black', 'important');
//                         mainIframe.style.setProperty('border', 'none', 'important');
//                         mainIframe.style.setProperty('opacity', '1', 'important');
//                         mainIframe.style.setProperty('visibility', 'visible', 'important');
//                     }

//                     const junk = document.querySelectorAll('.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"], [id*="pop"], [class*="pop"], a[href*="extension"]');
//                     junk.forEach(el => { try { el.style.setProperty('display', 'none', 'important'); } catch(e){} });
//                 } catch (err) {}
//             }, 1000); 
//         }).catch(() => {});

//         await targetFrame.evaluate((initMuted) => {
//             window.__isMuted = initMuted; 
//             setInterval(() => {
//                 try {
//                     const style = document.createElement('style');
//                     style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                     document.head.appendChild(style);

//                     const mediaElements = document.querySelectorAll('video, audio');
//                     const videos = Array.from(document.querySelectorAll('video'));
//                     let realVideo = null;

//                     mediaElements.forEach(media => { 
//                         if (media.muted !== window.__isMuted) media.muted = window.__isMuted; 
//                         let targetVol = window.__isMuted ? 0.0 : 1.0;
//                         if (media.volume !== targetVol) media.volume = targetVol; 
//                     });

//                     if (!window.__isMuted) {
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => {
//                             try { btn.click(); } catch(e){}
//                         });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (realVideo) { 
//                         realVideo.style.setProperty('position', 'fixed', 'important');
//                         realVideo.style.setProperty('top', '0px', 'important');
//                         realVideo.style.setProperty('left', '0px', 'important');
//                         realVideo.style.setProperty('width', '100vw', 'important');
//                         realVideo.style.setProperty('height', '100vh', 'important');
//                         realVideo.style.setProperty('z-index', '2147483647', 'important'); 
//                         realVideo.style.setProperty('background-color', 'black', 'important');
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         realVideo.style.setProperty('opacity', '1', 'important');
//                         realVideo.style.setProperty('visibility', 'visible', 'important');
//                         realVideo.style.setProperty('display', 'block', 'important');
//                     }
//                 } catch(err) {}
//             }, 1000); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     await hideLoadingUI(page);
// }

// // 🌟 FIX: Ultra-Fast Data Flow Sensor (Network Stall Detection)
// async function checkPageStatus(page) {
//     if (!page) return { status: 'DEAD' };
//     try {
//         for (const frame of page.frames()) {
//             try {
//                 if (frame.isDetached()) continue;
//                 const result = await Promise.race([
//                     frame.evaluate(() => {
//                         const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
                        
//                         if (
//                             bodyText.includes("stream error") || 
//                             bodyText.includes("not found") || 
//                             bodyText.includes("domain is blocked") ||
//                             bodyText.includes("error: forbidden") ||
//                             bodyText.includes("access denied") ||
//                             (bodyText.includes("cloudflare") && bodyText.includes("blocked"))
//                         ) {
//                             return { status: 'CRITICAL_ERROR' };
//                         }
                        
//                         const videos = Array.from(document.querySelectorAll('video'));
//                         let targetV = null;

//                         for (const v of videos) {
//                             if (v.clientWidth > 0 && v.clientWidth < 100) continue;
//                             if ((v.src && v.src.startsWith('blob:')) || v.matches('.jw-video, .plyr__video, .vjs-tech')) {
//                                 targetV = v; break;
//                             }
//                         }
                        
//                         if (!targetV && videos.length > 0) {
//                             targetV = videos.sort((a, b) => (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight))[0];
//                         }
                        
//                         // 🌟 MAGIC SENSOR: Checking Data Flow from Server
//                         if (targetV) {
//                             // readyState < 3 means network stopped sending data!
//                             const isDataFlowing = targetV.readyState >= 3; 
//                             const isPlaying = !targetV.paused && targetV.currentTime > 0;

//                             if (isPlaying && isDataFlowing) {
//                                 return { status: 'HEALTHY', currentTime: targetV.currentTime };
//                             } else if (!isDataFlowing && isPlaying) {
//                                 return { status: 'NO_DATA_FLOW', currentTime: targetV.currentTime };
//                             }
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

// async function startWatchdog() {
//     let lastActiveTime = -1;
//     let frozenCheckTimestamp = Date.now();
//     let watchdogTicks = 0;
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     const WARMUP_MAX_TIME = 15000; 

//     let activeUrlStr = urlList[currentUrlIndex];
//     let backupUrlStr = urlList[backupUrlIndex];

//     let failStrikes = 0; 

//     while (true) {
//         if (!browser || !browser.isConnected()) throw new Error("Browser closed.");

//         let activeStatus = await checkPageStatus(activePage);

//         if (activeStatus.status === 'HEALTHY') {
//             await hideLoadingUI(activePage); 
//             isWarmupPhase = false; 

//             if (activeStatus.currentTime === lastActiveTime) {
//                 if (Date.now() - frozenCheckTimestamp > FROZEN_THRESHOLD_MS) activeStatus.status = 'FROZEN';
//             } else {
//                 lastActiveTime = activeStatus.currentTime; frozenCheckTimestamp = Date.now();
//                 failStrikes = 0; 
                
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             frame.evaluate(() => { 
//                                 window.__isMuted = false;
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                             }).catch(()=>{});
//                         }
//                     } catch(e) {}
//                 }
//             }
//         }

//         if (backupPage) {
//             for (const frame of backupPage.frames()) {
//                 try {
//                     if (!frame.isDetached()) {
//                         frame.evaluate(() => { 
//                             window.__isMuted = true;
//                             document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); 
//                         }).catch(()=>{});
//                     }
//                 } catch(e) {}
//             }
//         }

//         watchdogTicks++;
//         // Print logs more frequently (every 4 seconds) so you can monitor real-time
//         if (watchdogTicks % 4 === 0) {
//             console.log(`\n[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//             console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//             console.log(`[⏭️] NEXT IN QUEUE    : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//             if (watchdogTicks % 120 === 0) {
//                 takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
//             }
//         }

//         // 🌟 FIX: React instantly to NO_DATA_FLOW or FROZEN
//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'NO_DATA_FLOW') {
            
//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 await new Promise(r => setTimeout(r, 1000));
//                 continue; 
//             }

//             failStrikes++;
//             console.log(`[🚨] Data Flow Alert: Detected '${activeStatus.status}' (Strike ${failStrikes}/2)`);
            
//             // Reduced to only 2 Strikes (Max 1-2 seconds wait) for Zero-Latency swapping!
//             if (failStrikes < 2) {
//                 // Wait just 1 second and check again
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ BACKEND CONNECTION LOST: ${activeStatus.status} - EXECUTING INSTANT HOT-SWAP`);
//                 console.log(`==================================================`);
                
//                 await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
                
//                 let backupStatus = await checkPageStatus(backupPage);

//                 if (backupStatus.status === 'HEALTHY' || backupStatus.status === 'DEAD' || backupStatus.status === 'NO_DATA_FLOW') { 
                    
//                     for (const frame of activePage.frames()) {
//                         try {
//                             if (!frame.isDetached()) await frame.evaluate(() => { window.__isMuted = true; document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); });
//                         } catch(e) {}
//                     }
                    
//                     await backupPage.bringToFront();
//                     try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                     console.log(`[*] Initiating Instant Switch to Backup Tab...`);
//                     await initializeVideo(backupPage, false, true); 

//                     let brokenPage = activePage; activePage = backupPage; backupPage = brokenPage;
//                     lastActiveTime = -1; frozenCheckTimestamp = Date.now();

//                     currentUrlIndex = backupUrlIndex; activeUrlStr = urlList[currentUrlIndex]; 
//                     backupUrlIndex = (backupUrlIndex + 1) % urlList.length; backupUrlStr = urlList[backupUrlIndex]; 

//                     console.log(`\n==================================================`);
//                     console.log(`[🔄] ZERO-LATENCY SWAP EXECUTED SUCCESSFULLY`);
//                     console.log(`==================================================`);
//                     console.log(`[📺] NEW ACTIVE LIVE : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                     console.log(`[🔊] LIVE AUDIO      : ON (Unmuted & Forced)`);
//                     console.log(`==================================================\n`);

//                     backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
                    
//                     failStrikes = 0; 
//                     streamSetupTime = Date.now(); 
//                     isWarmupPhase = true;

//                 } else {
//                     console.error(`[!] ❌ Backup Tab Failed. Restarting System...`);
//                     throw new Error("Tabs failed.");
//                 }
//             }
//         } else {
//             failStrikes = 0; 
//         }

//         // 🌟 FAST LOOP: Checks every 1 second instead of 2 seconds
//         await new Promise(r => setTimeout(r, 1000)); 
//     }
// }

// async function startDirectStreaming() {
//     console.log(`[*] Starting OBS Studio FIRST...`);
//     setupOBSConfig();

//     obsProcess = spawn('obs', ['--startstreaming', '--minimize-to-tray']);
//     obsProcess.stdout.on('data', (data) => console.log(`[OBS]: ${data.toString().trim()}`));
//     obsProcess.stderr.on('data', (data) => {
//         const msg = data.toString().trim();
//         if (msg.includes('error') || msg.includes('fail')) console.log(`[OBS Error]: ${msg}`);
//     });

//     console.log('[*] Waiting for OBS to initialize before launching browser...');
//     await new Promise(r => setTimeout(r, 6000));

//     let isObsConnected = false;
//     console.log('[*] Attempting to connect to OBS WebSocket (Polling Engine Active)...');
//     for (let attempt = 1; attempt <= 15; attempt++) {
//         try {
//             await Promise.race([
//                 obs.connect('ws://127.0.0.1:4455', 'secret'),
//                 new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
//             ]);
//             isObsConnected = true;
//             console.log('[+] OBS WebSocket Connected Successfully!');
//             break;
//         } catch (e) {
//             console.log(`[⏳] OBS Port 4455 not ready yet. Retrying (${attempt}/15)...`);
//             await new Promise(r => setTimeout(r, 2000));
//         }
//     }

//     if (isObsConnected) {
//         try {
//             await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' });
//             console.log('[+] Enforced WaitingScene (Black Screen Buffer)');
//         } catch(e){}
//     }

//     let browserArgs = [
//         '--no-sandbox', 
//         '--disable-setuid-sandbox',
//         `--window-size=${RES_W},${RES_H}`, 
//         '--window-position=0,0', 
//         '--kiosk', 
//         '--start-fullscreen',
//         '--autoplay-policy=no-user-gesture-required',
//         '--disable-dev-shm-usage', 
//         '--ignore-certificate-errors',
//         '--disable-web-security',
//         '--ignore-gpu-blocklist', 
//         '--use-gl=egl',
//         '--disable-accelerated-video-decode', 
//         '--disable-accelerated-video-encode',
//         '--disable-smooth-scrolling',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion',
//         '--disable-background-timer-throttling',
//         '--disable-backgrounding-occluded-windows',
//         '--disable-renderer-backgrounding'
//     ];

//     if (PROXY_ENGINE.includes('Cloudflare')) {
//         browserArgs.push('--proxy-server=socks5://127.0.0.1:40000');
//         console.log(`[*] Starting browser with EXACT viewport dimensions: ${RES_W}x${RES_H} and [CLOUDFLARE WARP] Proxy...`);
//     } else {
//         console.log(`[*] Starting browser with EXACT viewport dimensions: ${RES_W}x${RES_H} using [DIRECT GITHUB IP]...`);
//     }

//     browser = await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: browserArgs
//     });

//     browser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => {
//                 if (newPage && newPage !== activePage && newPage !== backupPage) {
//                     console.log(`[🛡️] AD-BLOCKER: Killed an unwanted pop-up tab!`);
//                     try { await newPage.close(); } catch(e) {}
//                 }
//             }, 500);
//         }
//     });

//     activePage = (await browser.pages())[0]; 
//     backupPage = await browser.newPage();
    
//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex]}`);
//     await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
//     await initializeVideo(activePage, false, true); 

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Black Screen to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex]}`);
//     backupPage.goto(urlList[backupUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 

//     console.log(`\n==================================================`);
//     console.log(`[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     console.log(`==================================================`);
//     console.log(`[📺] CURRENT ACTIVE LIVE : Server [${currentUrlIndex}] -> ${urlList[currentUrlIndex]}`);
//     console.log(`[🔊] LIVE AUDIO STATUS   : ON (Unmuted)`);
//     console.log(`--------------------------------------------------`);
//     console.log(`[🛡️] NEXT BACKUP QUEUE   : Server [${backupUrlIndex}] -> ${urlList[backupUrlIndex]}`);
//     console.log(`[🔇] BACKUP AUDIO STATUS : MUTED (Background)`);
//     console.log(`==================================================\n`);

//     console.log('[*] Everything Setup! Dual-Tab Monitoring is Active.');
//     await startWatchdog();
// }

// async function mainLoop() {
//     while (true) {
//         try { await startDirectStreaming(); } 
//         catch (error) {
//             console.error(`\n[!] ALERT: ${error.message}`);
//             console.log('[*] 🔄 Hard Restarting everything in 3 seconds...');
//             await cleanup();
//             await new Promise(resolve => setTimeout(resolve, 3000));
//         }
//     }
// }

// async function cleanup() {
//     console.log('[*] Cleaning up resources...');
//     try { await obs.disconnect(); } catch (e) { } 
//     if (browser) { try { await browser.close(); } catch(e) { } browser = null; }
//     if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch(e) { } obsProcess = null; }
//     try {
//         execSync('pkill -9 obs || true', { stdio: 'ignore' });
//         execSync('pkill -9 chrome || true', { stdio: 'ignore' });
//         execSync('pkill -9 puppeteer || true', { stdio: 'ignore' });
//     } catch (e) { }
// }

// process.on('SIGINT', async () => { await cleanup(); process.exit(0); });

// const customDurationStr = process.env.CUSTOM_DURATION || 'None';
// function parseDurationToMs(str) {
//     if (!str || str.toLowerCase() === 'none') return null;
//     let ms = 0;
//     const hMatch = str.match(/(\d+)\s*h/i);
//     const mMatch = str.match(/(\d+)\s*m/i);
//     if (hMatch) ms += parseInt(hMatch[1]) * 60 * 60 * 1000;
//     if (mMatch) ms += parseInt(mMatch[1]) * 60 * 1000;
//     return ms > 0 ? ms : null;
// }

// const exactDurationMs = parseDurationToMs(customDurationStr);
// if (exactDurationMs) {
//     setTimeout(async () => {
//         console.log(`\n[*] 🛑 Time's up! The assigned duration (${customDurationStr}) is complete. Shutting down cleanly...`);
//         await cleanup();
//         process.exit(0);
//     }, exactDurationMs);
// } else {
//     setTimeout(() => {
//         try {
//             const targetUrls = process.env.TARGET_URLS || 'https://dadocric.st/player.php?id=starsp3&v=m';
//             const channel = process.env.OKRU_STREAM_ID || '1';
//             const quality = process.env.STREAM_QUALITY || '110KBps (Balanced 480p)';
//             const server = process.env.SERVER_SELECTION || 'None';
//             const cmd = `gh workflow run main.yml -f target_urls="${targetUrls}" -f okru_stream_channel="${channel}" -f stream_quality="${quality}" -f server_selection="${server}" -f proxy_engine="${PROXY_ENGINE}" -f custom_duration="None"`;
//             execSync(cmd, { stdio: 'inherit' });
//             setTimeout(async () => {
//                 await cleanup(); 
//                 process.exit(0); 
//             }, 300000); 
//         } catch (err) { }
//     }, 21000000);
// }

// mainLoop();








// ========= below code me 3 strikes hai isko remove karoo yeh teek nahey hai measn yeh user k time zyda kar rha ahai issue yeh hai k peechey se data correct hai bas browser mei =====================

// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const util = require('util');
// const execPromise = util.promisify(exec); 
// const { OBSWebSocket } = require('obs-websocket-js'); 

// const obs = new OBSWebSocket(); 

// // 🚀 Multi-Stream Key Manager
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
//     's1.1'  : '14204232736303_14846150314543_37jq4ryehq',
//     's1.2'  : '14204288179759_14846247373359_tnsknmapva',
//     's1.3'  : '14204319768111_14846302489135_sr4ht4ccwq',
//     's1.4'  : '14204331957807_14846326147631_dji2acqcze',
//     's1.5'  : '14204346572335_14846351641135_7gvns4o5ue',
//     's2.1'  : '14204490948143_14846603495983_kzevn36tii',
//     's2.2'  : '14204506742319_14846634494511_ta2rxyg2oy',
//     's2.3'  : '14204523322927_14846661233199_foqb3q7zb4',
//     's2.10' : '14206184136239_14849618610735_ihnbx7hkoi'
// };

// const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
// let RES_W = 1920, RES_H = 1080, BITRATE = 5000;

// if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
// else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
// else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
// else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }
// else { RES_W = 1920; RES_H = 1080; BITRATE = 6000; }

// console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);

// let rawUrls = (process.env.TARGET_URLS || '').trim();
// let urlList = rawUrls !== '' 
//     ? rawUrls.split(',').map(u => u.trim().startsWith('http') ? u.trim() : 'https://' + u.trim()) 
//     : ['https://dadocric.st/player.php?id=starsp3&v=m'];

// let currentUrlIndex = 0;
// let backupUrlIndex = urlList.length > 1 ? 1 : 0; 

// const SELECTED_CHANNEL = process.env.OKRU_STREAM_ID || '1';
// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None'; 
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';
// const DYNAMIC_PROXY = process.env.DYNAMIC_PROXY || '';

// const ACTIVE_STREAM_KEY = STREAM_KEYS[SELECTED_CHANNEL] || STREAM_KEYS['1'];

// let browser = null;
// let obsProcess = null;
// let activePage = null;
// let backupPage = null;

// const FROZEN_THRESHOLD_MS = 8000; 

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount = 0;

// async function takeAndBatchScreenshot(page, stepName) {
//     if (!page) return;
//     try {
//         const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
//         const filePath = `./screenshots/snap_${timestamp}_${stepName}.png`;
//         await page.screenshot({ path: filePath });
//         console.log(`[📸] Screenshot saved: ${filePath}`);
//         pendingScreenshots.push(filePath);

//         if (pendingScreenshots.length >= 3) {
//             const filesToUpload = pendingScreenshots.join(' ');
//             pendingScreenshots = []; 
            
//             (async () => {
//                 try {
//                     const tag = 'live-stream-logs';
//                     try { await execPromise(`gh release view ${tag} || gh release create ${tag} -t "Live Logs"`); } catch(e) {}
//                     try {
//                         const { stdout } = await execPromise(`gh release view ${tag} --json assets -q ".assets[].name"`);
//                         const oldAssets = stdout.trim().split('\n');
//                         for (const asset of oldAssets) {
//                             if (asset) await execPromise(`gh release delete-asset ${tag} "${asset}" -y`).catch(e=>{});
//                         }
//                     } catch(e) {}
//                     await execPromise(`gh release upload ${tag} ${filesToUpload} --clobber`).catch(e=>{});
//                     uploadCycleCount++;
//                 } catch (err) { }
//             })();
//         }
//     } catch (e) { }
// }

// async function showLoadingUI(page, title, sub) {
//     try {
//         await page.evaluate((t, s) => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) overlay.remove();

//             overlay = document.createElement('div');
//             overlay.id = 'smart-stream-overlay';
//             overlay.innerHTML = `
//                 <style>
//                     #smart-stream-overlay {
//                         position: fixed !important; top: 0 !important; left: 0 !important; 
//                         width: 100vw !important; height: 100vh !important;
//                         background: radial-gradient(circle at center, #1a1a1a 0%, #000000 100%) !important;
//                         z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                         justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                         pointer-events: none !important;
//                     }
//                     .stream-spinner {
//                         width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1);
//                         border-top: 6px solid #e50914; border-radius: 50%;
//                         animation: spin-overlay 1s linear infinite; margin-bottom: 30px;
//                         box-shadow: 0 0 25px rgba(229, 9, 20, 0.4);
//                     }
//                     @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                     .stream-title { 
//                         font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; 
//                         margin-bottom: 15px !important; text-transform: uppercase !important; 
//                         text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important;
//                     }
//                     .stream-sub { 
//                         font-size: 20px !important; color: #cccccc !important; text-align: center !important; 
//                         max-width: 600px !important; line-height: 1.6 !important; font-weight: 400 !important;
//                     }
//                     .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
//                     @keyframes blinker { 50% { opacity: 0.3; } }
//                 </style>
//                 <div class="stream-spinner"></div>
//                 <div class="stream-title" id="overlay-title">${t}</div>
//                 <div class="stream-sub" id="overlay-sub">${s}</div>
//             `;
//             document.body.appendChild(overlay);
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) overlay.remove();
//         });
//     } catch (e) {}
// }

// function setupOBSConfig() {
//     const obsDir = path.join(os.homedir(), '.config', 'obs-studio');
//     const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
//     const scenesDir = path.join(obsDir, 'basic', 'scenes');

//     fs.mkdirSync(profilesDir, { recursive: true });
//     fs.mkdirSync(scenesDir, { recursive: true });

//     const globalIniContent = `[General]\nLicenseAccepted=true\n[BasicWindow]\nShowAutoConfig=false\nWarned=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`;
//     fs.writeFileSync(path.join(obsDir, 'global.ini'), globalIniContent);
    
//     const basicIniContent = `[General]
// Name=Untitled
// [Video]
// BaseCX=${RES_W}
// BaseCY=${RES_H}
// OutputCX=${RES_W}
// OutputCY=${RES_H}
// FPSCommon=30
// [Output]
// Mode=Simple
// [SimpleOutput]
// VBitrate=${BITRATE}
// StreamEncoder=x264
// x264Preset=ultrafast
// x264Settings=keyint=60 tune=zerolatency profile=main threads=4 rc-lookahead=0
// `;
//     fs.writeFileSync(path.join(profilesDir, 'basic.ini'), basicIniContent);

//     const serviceJson = {
//         "settings": { "server": "rtmp://vsu.okcdn.ru/input/", "key": ACTIVE_STREAM_KEY },
//         "type": "rtmp_custom"
//     };
//     fs.writeFileSync(path.join(profilesDir, 'service.json'), JSON.stringify(serviceJson, null, 2));

//     const sceneJson = {
//         "current_scene": "WaitingScene", 
//         "current_program_scene": "WaitingScene", 
//         "name": "Untitled",
//         "scene_order": [{"name": "WaitingScene"}, {"name": "MainScene"}],
//         "sources": [
//             { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
//             { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
//             {
//                 "id": "scene", "name": "MainScene",
//                 "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true}, {"name": "Audio", "id": 2, "visible": true} ] }
//             },
//             {
//                 "id": "scene", "name": "WaitingScene",
//                 "settings": { "items": [] } 
//             }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// function attachAntiAdListeners(page) {
//     page.on('dialog', async dialog => {
//         console.log(`[🛡️] AD-BLOCKER: Dismissed a Javascript alert/dialog!`);
//         await dialog.dismiss();
//     });
// }

// async function initializeVideo(page, startMuted, isActivePage) {
//     try {
//         if (SERVER_SELECTION !== 'None') {
//             console.log(`[*] Clicking specific Server: ${SERVER_SELECTION}`);
//             let serverClicked = false; let serverAttempts = 0;
//             while (!serverClicked && serverAttempts < 10) { 
//                 serverAttempts++;
//                 try {
//                     const clickSuccess = await page.evaluate((serverName) => {
//                         const buttons = Array.from(document.querySelectorAll('button'));
//                         const targetBtn = buttons.find(b => b.innerText && b.innerText.trim().includes(serverName));
//                         if (targetBtn) { targetBtn.click(); return true; }
//                         return false;
//                     }, SERVER_SELECTION);

//                     if (clickSuccess) {
//                         serverClicked = true; 
//                         console.log(`[+] Server Button clicked successfully!`);
//                         await takeAndBatchScreenshot(page, `server-clicked`);
//                         await new Promise(r => setTimeout(r, 2000)); 
//                         if (isActivePage) await page.bringToFront(); 
//                     } else await new Promise(r => setTimeout(r, 2000));
//                 } catch (err) { await new Promise(r => setTimeout(r, 2000)); }
//             }
//         }

//         console.log('[*] Checking if Video is Autoplaying or Needs a Play Button...');
//         let isVideoPlaying = false; 
//         let attempts = 0;
        
//         while (!isVideoPlaying && attempts < 15) {
//             for (const frame of page.frames()) {
//                 try {
//                     const autoPlayed = await frame.evaluate(() => {
//                         let playing = false;
//                         document.querySelectorAll('video').forEach(v => {
//                             if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) {
//                                 v.muted = false; 
//                                 v.volume = 1.0;
//                                 playing = true;
//                             }
//                         });
//                         return playing;
//                     });

//                     if (autoPlayed) {
//                         isVideoPlaying = true;
//                         break;
//                     }

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play');
//                     if (playBtn) {
//                         const isVisible = await frame.evaluate(el => {
//                             const style = window.getComputedStyle(el);
//                             return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
//                         }, playBtn);

//                         if (isVisible) {
//                             await frame.evaluate(el => el.click(), playBtn); 
//                             await takeAndBatchScreenshot(page, `play-btn-clicked`);
//                             await new Promise(r => setTimeout(r, 3000)); 
//                             isVideoPlaying = true;
//                             break; 
//                         }
//                     }

//                     if (!isVideoPlaying && attempts > 5) {
//                         const forced = await frame.evaluate(async () => {
//                             let played = false;
//                             let vids = document.querySelectorAll('video');
//                             for(let v of vids) {
//                                 if (v.clientWidth > 50) { 
//                                     v.muted = false; v.volume = 1.0; 
//                                     try { v.click(); } catch(e){}
//                                     try {
//                                         let p = v.play();
//                                         if (p !== undefined) p.catch(()=>{});
//                                         played = true;
//                                     } catch(e) {}
//                                 }
//                             }
//                             return played;
//                         });

//                         if (forced) {
//                             await takeAndBatchScreenshot(page, `force-play-applied`);
//                             isVideoPlaying = true;
//                             break;
//                         }
//                     }
//                 } catch (err) {}
//             }
//             if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
//             attempts++;
//         }

//         console.log('[*] Scanning for Exact Real Video Player...');
//         let targetFrame = null;
//         for (const frame of page.frames()) {
//             try {
//                 const isRealLiveStream = await frame.evaluate(() => {
//                     const vid = document.querySelector('video');
//                     return vid && vid.clientWidth > 50 && vid.clientHeight > 50;
//                 });
//                 if (isRealLiveStream) { 
//                     targetFrame = frame; 
//                     console.log(`[+] Smart Scanner locked onto video frame!`);
//                     break; 
//                 }
//             } catch (e) { }
//         }

//         if (!targetFrame) targetFrame = page.mainFrame();

//         await page.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     document.documentElement.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('overflow', 'hidden', 'important');

//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = null; let maxArea = 0;

//                     iframes.forEach(ifr => {
//                         let area = ifr.clientWidth * ifr.clientHeight;
//                         if (area > maxArea && area > 5000) { maxArea = area; mainIframe = ifr; }
//                     });

//                     iframes.forEach(ifr => {
//                         if (ifr !== mainIframe) {
//                             ifr.style.setProperty('opacity', '0', 'important');
//                             ifr.style.setProperty('pointer-events', 'none', 'important');
//                             ifr.style.setProperty('z-index', '-999', 'important');
//                         }
//                     });

//                     if (mainIframe) {
//                         mainIframe.style.setProperty('position', 'fixed', 'important');
//                         mainIframe.style.setProperty('top', '0px', 'important');
//                         mainIframe.style.setProperty('left', '0px', 'important');
//                         mainIframe.style.setProperty('width', '100vw', 'important');
//                         mainIframe.style.setProperty('height', '100vh', 'important');
//                         mainIframe.style.setProperty('z-index', '2147483645', 'important');
//                         mainIframe.style.setProperty('background-color', 'black', 'important');
//                         mainIframe.style.setProperty('border', 'none', 'important');
//                         mainIframe.style.setProperty('opacity', '1', 'important');
//                         mainIframe.style.setProperty('visibility', 'visible', 'important');
//                     }

//                     const junk = document.querySelectorAll('.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"], [id*="pop"], [class*="pop"], a[href*="extension"]');
//                     junk.forEach(el => { try { el.style.setProperty('display', 'none', 'important'); } catch(e){} });
//                 } catch (err) {}
//             }, 1000); 
//         }).catch(() => {});

//         // 🌟 FIX 2: Dynamic Audio State to prevent "Ghost Audio" fighting
//         await targetFrame.evaluate((initMuted) => {
//             window.__isMuted = initMuted; 
//             setInterval(() => {
//                 try {
//                     const style = document.createElement('style');
//                     style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                     document.head.appendChild(style);

//                     const mediaElements = document.querySelectorAll('video, audio');
//                     const videos = Array.from(document.querySelectorAll('video'));
//                     let realVideo = null;

//                     // Strictly enforce the global __isMuted variable
//                     mediaElements.forEach(media => { 
//                         if (media.muted !== window.__isMuted) media.muted = window.__isMuted; 
//                         let targetVol = window.__isMuted ? 0.0 : 1.0;
//                         if (media.volume !== targetVol) media.volume = targetVol; 
//                     });

//                     if (!window.__isMuted) {
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => {
//                             try { btn.click(); } catch(e){}
//                         });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (realVideo) { 
//                         realVideo.style.setProperty('position', 'fixed', 'important');
//                         realVideo.style.setProperty('top', '0px', 'important');
//                         realVideo.style.setProperty('left', '0px', 'important');
//                         realVideo.style.setProperty('width', '100vw', 'important');
//                         realVideo.style.setProperty('height', '100vh', 'important');
//                         realVideo.style.setProperty('z-index', '2147483647', 'important'); 
//                         realVideo.style.setProperty('background-color', 'black', 'important');
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         realVideo.style.setProperty('opacity', '1', 'important');
//                         realVideo.style.setProperty('visibility', 'visible', 'important');
//                         realVideo.style.setProperty('display', 'block', 'important');
//                     }
//                 } catch(err) {}
//             }, 1000); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     await hideLoadingUI(page);
// }

// async function checkPageStatus(page) {
//     if (!page) return { status: 'DEAD' };
//     try {
//         for (const frame of page.frames()) {
//             try {
//                 if (frame.isDetached()) continue;
//                 const result = await Promise.race([
//                     frame.evaluate(() => {
//                         const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
                        
//                         if (
//                             bodyText.includes("stream error") || 
//                             bodyText.includes("not found") || 
//                             bodyText.includes("domain is blocked") ||
//                             bodyText.includes("error: forbidden") ||
//                             bodyText.includes("does not have permission") ||
//                             bodyText.includes("access denied") ||
//                             (bodyText.includes("cloudflare") && bodyText.includes("blocked"))
//                         ) {
//                             return { status: 'CRITICAL_ERROR' };
//                         }
                        
//                         const videos = Array.from(document.querySelectorAll('video'));
//                         let targetV = null;

//                         for (const v of videos) {
//                             if (v.clientWidth > 0 && v.clientWidth < 100) continue;
//                             if ((v.src && v.src.startsWith('blob:')) || v.matches('.jw-video, .plyr__video, .vjs-tech')) {
//                                 targetV = v; break;
//                             }
//                         }
                        
//                         if (!targetV && videos.length > 0) {
//                             targetV = videos.sort((a, b) => (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight))[0];
//                         }
                        
//                         if (targetV && !targetV.ended && targetV.currentTime > 0) return { status: 'HEALTHY', currentTime: targetV.currentTime };
//                         return { status: 'DEAD' };
//                     }),
//                     new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
//                 ]);
//                 if (result && result.status !== 'DEAD') return result;
//             } catch (err) {}
//         }
//     } catch (e) { return { status: 'DEAD' }; }
//     return { status: 'DEAD' };
// }

// async function startWatchdog() {
//     let lastActiveTime = -1;
//     let frozenCheckTimestamp = Date.now();
//     let watchdogTicks = 0;
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     const WARMUP_MAX_TIME = 15000; 

//     let activeUrlStr = urlList[currentUrlIndex];
//     let backupUrlStr = urlList[backupUrlIndex];

//     let failStrikes = 0; 

//     while (true) {
//         if (!browser || !browser.isConnected()) throw new Error("Browser closed.");

//         let activeStatus = await checkPageStatus(activePage);

//         if (activeStatus.status === 'HEALTHY') {
//             await hideLoadingUI(activePage); 
//             isWarmupPhase = false; 

//             if (activeStatus.currentTime === lastActiveTime) {
//                 if (Date.now() - frozenCheckTimestamp > FROZEN_THRESHOLD_MS) activeStatus.status = 'FROZEN';
//             } else {
//                 lastActiveTime = activeStatus.currentTime; frozenCheckTimestamp = Date.now();
//                 failStrikes = 0; 
                
//                 // 🌟 FIX 2: Correctly UNMUTE Active Tab natively
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             frame.evaluate(() => { 
//                                 window.__isMuted = false;
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                             }).catch(()=>{});
//                         }
//                     } catch(e) {}
//                 }
//             }
//         }

//         // 🌟 FIX 2: Correctly Force MUTE Backup Tab natively so it never leaks audio!
//         if (backupPage) {
//             for (const frame of backupPage.frames()) {
//                 try {
//                     if (!frame.isDetached()) {
//                         frame.evaluate(() => { 
//                             window.__isMuted = true;
//                             document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); 
//                         }).catch(()=>{});
//                     }
//                 } catch(e) {}
//             }
//         }

//         watchdogTicks++;
//         if (watchdogTicks % 6 === 0) {
//             console.log(`\n[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//             console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//             console.log(`[⏭️] NEXT IN QUEUE    : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//             if (watchdogTicks % 120 === 0) {
//                 takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
//             }
//         }

//         // 🌟 FIX 1: Non-Blocking 3-Strike Tolerance Shield (No Stuttering/Stopping)
//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD') {
            
//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 console.log(`[⏳] Watchdog detected '${activeStatus.status}', but stream is in WARM-UP phase. Waiting...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             }

//             failStrikes++;
//             console.log(`[🕵️] Watchdog Shield: Detected '${activeStatus.status}' (Strike ${failStrikes}/3)`);
            
//             if (failStrikes < 3) {
//                 console.log(`[⏳] Ignoring false alarm. Giving stream a chance to recover naturally...`);
//                 // Continues normal loop without freezing!
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ WATCHDOG CONFIRMED ISSUE: ${activeStatus.status} (3 Strikes Reached)`);
//                 console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`==================================================`);
                
//                 await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
                
//                 console.log(`[*] Checking Backup Tab status before switching...`);
//                 let backupStatus = await checkPageStatus(backupPage);

//                 if (backupStatus.status === 'HEALTHY' || backupStatus.status === 'DEAD') { 
                    
//                     for (const frame of activePage.frames()) {
//                         try {
//                             if (!frame.isDetached()) await frame.evaluate(() => { window.__isMuted = true; document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); });
//                         } catch(e) {}
//                     }
                    
//                     await showLoadingUI(backupPage, "RECONNECTING", "Establishing secure connection to backup server <span class='stream-blink'>...</span>");
//                     await backupPage.bringToFront();
//                     await new Promise(r => setTimeout(r, 1000)); 
                    
//                     try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                     console.log(`[*] Initializing Video on the newly active tab...`);
//                     await initializeVideo(backupPage, false, true); 

//                     let brokenPage = activePage; activePage = backupPage; backupPage = brokenPage;
//                     lastActiveTime = -1; frozenCheckTimestamp = Date.now();

//                     currentUrlIndex = backupUrlIndex; activeUrlStr = urlList[currentUrlIndex]; 
//                     backupUrlIndex = (backupUrlIndex + 1) % urlList.length; backupUrlStr = urlList[backupUrlIndex]; 

//                     console.log(`\n==================================================`);
//                     console.log(`[🔄] SMART HOT-SWAP EXECUTED SUCCESSFULLY`);
//                     console.log(`==================================================`);
//                     console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                     console.log(`[🔊] LIVE AUDIO STATUS : ON (Unmuted & Forced)`);
//                     console.log(`--------------------------------------------------`);
//                     console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//                     console.log(`[🔇] BACKUP AUDIO      : MUTED (Background Loading)`);
//                     console.log(`==================================================\n`);

//                     backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
                    
//                     failStrikes = 0; 
//                     streamSetupTime = Date.now(); 
//                     isWarmupPhase = true;

//                 } else {
//                     console.error(`[!] ❌ Backup Tab is ALSO DEAD/FROZEN. Hard Restarting System...`);
//                     throw new Error("Both Active and Backup tabs failed.");
//                 }
//             }
//         } else {
//             failStrikes = 0; 
//         }

//         await new Promise(r => setTimeout(r, 2000)); 
//     }
// }

// async function startDirectStreaming() {
//     console.log(`[*] Starting OBS Studio FIRST...`);
//     setupOBSConfig();

//     obsProcess = spawn('obs', ['--startstreaming', '--minimize-to-tray']);
//     obsProcess.stdout.on('data', (data) => console.log(`[OBS]: ${data.toString().trim()}`));
//     obsProcess.stderr.on('data', (data) => {
//         const msg = data.toString().trim();
//         if (msg.includes('error') || msg.includes('fail')) console.log(`[OBS Error]: ${msg}`);
//     });

//     console.log('[*] Waiting for OBS to initialize before launching browser...');
//     await new Promise(r => setTimeout(r, 6000));

//     let isObsConnected = false;
//     console.log('[*] Attempting to connect to OBS WebSocket (Polling Engine Active)...');
//     for (let attempt = 1; attempt <= 15; attempt++) {
//         try {
//             await Promise.race([
//                 obs.connect('ws://127.0.0.1:4455', 'secret'),
//                 new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
//             ]);
//             isObsConnected = true;
//             console.log('[+] OBS WebSocket Connected Successfully!');
//             break;
//         } catch (e) {
//             console.log(`[⏳] OBS Port 4455 not ready yet. Retrying (${attempt}/15)...`);
//             await new Promise(r => setTimeout(r, 2000));
//         }
//     }

//     if (isObsConnected) {
//         try {
//             await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' });
//             console.log('[+] Enforced WaitingScene (Black Screen Buffer)');
//         } catch(e){}
//     }

//     let browserArgs = [
//         '--no-sandbox', 
//         '--disable-setuid-sandbox',
//         `--window-size=${RES_W},${RES_H}`, 
//         '--window-position=0,0', 
//         '--kiosk', 
//         '--start-fullscreen',
//         '--autoplay-policy=no-user-gesture-required',
//         '--disable-dev-shm-usage', 
//         '--ignore-certificate-errors',
//         '--disable-web-security',
//         '--ignore-gpu-blocklist', 
//         '--use-gl=egl',
//         '--disable-accelerated-video-decode', 
//         '--disable-accelerated-video-encode',
//         '--disable-smooth-scrolling',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion',
//         '--disable-background-timer-throttling',
//         '--disable-backgrounding-occluded-windows',
//         '--disable-renderer-backgrounding'
//     ];

//     if (PROXY_ENGINE.includes('Cloudflare')) {
//         browserArgs.push('--proxy-server=socks5://127.0.0.1:40000');
//         console.log(`[*] Starting browser with EXACT viewport dimensions: ${RES_W}x${RES_H} and [CLOUDFLARE WARP] Proxy...`);
//     } else {
//         console.log(`[*] Starting browser with EXACT viewport dimensions: ${RES_W}x${RES_H} using [DIRECT GITHUB IP]...`);
//     }

//     browser = await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: browserArgs
//     });

//     browser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => {
//                 if (newPage && newPage !== activePage && newPage !== backupPage) {
//                     console.log(`[🛡️] AD-BLOCKER: Killed an unwanted pop-up tab!`);
//                     try { await newPage.close(); } catch(e) {}
//                 }
//             }, 500);
//         }
//     });

//     activePage = (await browser.pages())[0]; 
//     backupPage = await browser.newPage();
    
//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex]}`);
//     await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
//     await initializeVideo(activePage, false, true); 

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Black Screen to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex]}`);
//     backupPage.goto(urlList[backupUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 

//     console.log(`\n==================================================`);
//     console.log(`[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     console.log(`==================================================`);
//     console.log(`[📺] CURRENT ACTIVE LIVE : Server [${currentUrlIndex}] -> ${urlList[currentUrlIndex]}`);
//     console.log(`[🔊] LIVE AUDIO STATUS   : ON (Unmuted)`);
//     console.log(`--------------------------------------------------`);
//     console.log(`[🛡️] NEXT BACKUP QUEUE   : Server [${backupUrlIndex}] -> ${urlList[backupUrlIndex]}`);
//     console.log(`[🔇] BACKUP AUDIO STATUS : MUTED (Background)`);
//     console.log(`==================================================\n`);

//     console.log('[*] Everything Setup! Dual-Tab Monitoring is Active.');
//     await startWatchdog();
// }

// async function mainLoop() {
//     while (true) {
//         try { await startDirectStreaming(); } 
//         catch (error) {
//             console.error(`\n[!] ALERT: ${error.message}`);
//             console.log('[*] 🔄 Hard Restarting everything in 3 seconds...');
//             await cleanup();
//             await new Promise(resolve => setTimeout(resolve, 3000));
//         }
//     }
// }

// async function cleanup() {
//     console.log('[*] Cleaning up resources...');
//     try { await obs.disconnect(); } catch (e) { } 
//     if (browser) { try { await browser.close(); } catch(e) { } browser = null; }
//     if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch(e) { } obsProcess = null; }
//     try {
//         execSync('pkill -9 obs || true', { stdio: 'ignore' });
//         execSync('pkill -9 chrome || true', { stdio: 'ignore' });
//         execSync('pkill -9 puppeteer || true', { stdio: 'ignore' });
//     } catch (e) { }
// }

// process.on('SIGINT', async () => { await cleanup(); process.exit(0); });

// const customDurationStr = process.env.CUSTOM_DURATION || 'None';
// function parseDurationToMs(str) {
//     if (!str || str.toLowerCase() === 'none') return null;
//     let ms = 0;
//     const hMatch = str.match(/(\d+)\s*h/i);
//     const mMatch = str.match(/(\d+)\s*m/i);
//     if (hMatch) ms += parseInt(hMatch[1]) * 60 * 60 * 1000;
//     if (mMatch) ms += parseInt(mMatch[1]) * 60 * 1000;
//     return ms > 0 ? ms : null;
// }

// const exactDurationMs = parseDurationToMs(customDurationStr);
// if (exactDurationMs) {
//     setTimeout(async () => {
//         console.log(`\n[*] 🛑 Time's up! The assigned duration (${customDurationStr}) is complete. Shutting down cleanly...`);
//         await cleanup();
//         process.exit(0);
//     }, exactDurationMs);
// } else {
//     setTimeout(() => {
//         try {
//             const targetUrls = process.env.TARGET_URLS || 'https://dadocric.st/player.php?id=starsp3&v=m';
//             const channel = process.env.OKRU_STREAM_ID || '1';
//             const quality = process.env.STREAM_QUALITY || '110KBps (Balanced 480p)';
//             const server = process.env.SERVER_SELECTION || 'None';
//             const cmd = `gh workflow run main.yml -f target_urls="${targetUrls}" -f okru_stream_channel="${channel}" -f stream_quality="${quality}" -f server_selection="${server}" -f proxy_engine="${PROXY_ENGINE}" -f custom_duration="None"`;
//             execSync(cmd, { stdio: 'inherit' });
//             setTimeout(async () => {
//                 await cleanup(); 
//                 process.exit(0); 
//             }, 300000); 
//         } catch (err) { }
//     }, 21000000);
// }

// mainLoop();
















































































































































// ================== Alhamdullah A one , bas yeh eek issue hai k vieo on hai lekin pher bey detect and nect cycle mei teek hu jata hai below code mei isko upper teek karty hai try karty hai ===================



// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// const obs = new OBSWebSocket(); 

// // 🚀 Multi-Stream Key Manager
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

// const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
// let RES_W = 1920, RES_H = 1080, BITRATE = 5000;

// if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
// else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
// else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
// else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }
// else { RES_W = 1920; RES_H = 1080; BITRATE = 6000; }

// console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);

// let rawUrls = (process.env.TARGET_URLS || '').trim();
// let urlList = rawUrls !== '' 
//     ? rawUrls.split(',').map(u => u.trim().startsWith('http') ? u.trim() : 'https://' + u.trim()) 
//     : ['https://dadocric.st/player.php?id=starsp3&v=m'];

// let currentUrlIndex = 0;
// let backupUrlIndex = urlList.length > 1 ? 1 : 0; 

// const SELECTED_CHANNEL = process.env.OKRU_STREAM_ID || '1';
// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None'; 
// // 🌟 NEW: Proxy Engine Variable
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

// const ACTIVE_STREAM_KEY = STREAM_KEYS[SELECTED_CHANNEL] || STREAM_KEYS['1'];

// let browser = null;
// let obsProcess = null;
// let activePage = null;
// let backupPage = null;

// const FROZEN_THRESHOLD_MS = 8000; 

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount = 0;

// async function takeAndBatchScreenshot(page, stepName) {
//     if (!page) return;
//     try {
//         const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
//         const filePath = `./screenshots/snap_${timestamp}_${stepName}.png`;
//         await page.screenshot({ path: filePath });
//         console.log(`[📸] Screenshot saved: ${filePath}`);
//         pendingScreenshots.push(filePath);

//         if (pendingScreenshots.length >= 3) {
//             try {
//                 const tag = 'live-stream-logs';
//                 try { execSync(`gh release view ${tag} || gh release create ${tag} -t "Live Logs"`, { stdio: 'ignore' }); } catch(e) {}
//                 try {
//                     const oldAssets = execSync(`gh release view ${tag} --json assets -q ".assets[].name"`, { encoding: 'utf-8' }).trim().split('\n');
//                     for (const asset of oldAssets) if (asset) execSync(`gh release delete-asset ${tag} "${asset}" -y`, { stdio: 'ignore' });
//                 } catch(e) {}

//                 const fileList = pendingScreenshots.join(' ');
//                 exec(`gh release upload ${tag} ${fileList} --clobber`, (err) => {
//                     if (!err) uploadCycleCount++;
//                 });
//                 pendingScreenshots = []; 
//             } catch (err) { }
//         }
//     } catch (e) { }
// }

// async function showLoadingUI(page, title, sub) {
//     try {
//         await page.evaluate((t, s) => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) overlay.remove();

//             overlay = document.createElement('div');
//             overlay.id = 'smart-stream-overlay';
//             overlay.innerHTML = `
//                 <style>
//                     #smart-stream-overlay {
//                         position: fixed !important; top: 0 !important; left: 0 !important; 
//                         width: 100vw !important; height: 100vh !important;
//                         background: radial-gradient(circle at center, #1a1a1a 0%, #000000 100%) !important;
//                         z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                         justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                         pointer-events: none !important;
//                     }
//                     .stream-spinner {
//                         width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1);
//                         border-top: 6px solid #e50914; border-radius: 50%;
//                         animation: spin-overlay 1s linear infinite; margin-bottom: 30px;
//                         box-shadow: 0 0 25px rgba(229, 9, 20, 0.4);
//                     }
//                     @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                     .stream-title { 
//                         font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; 
//                         margin-bottom: 15px !important; text-transform: uppercase !important; 
//                         text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important;
//                     }
//                     .stream-sub { 
//                         font-size: 20px !important; color: #cccccc !important; text-align: center !important; 
//                         max-width: 600px !important; line-height: 1.6 !important; font-weight: 400 !important;
//                     }
//                     .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
//                     @keyframes blinker { 50% { opacity: 0.3; } }
//                 </style>
//                 <div class="stream-spinner"></div>
//                 <div class="stream-title" id="overlay-title">${t}</div>
//                 <div class="stream-sub" id="overlay-sub">${s}</div>
//             `;
//             document.body.appendChild(overlay);
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) overlay.remove();
//         });
//     } catch (e) {}
// }

// function setupOBSConfig() {
//     const obsDir = path.join(os.homedir(), '.config', 'obs-studio');
//     const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
//     const scenesDir = path.join(obsDir, 'basic', 'scenes');

//     fs.mkdirSync(profilesDir, { recursive: true });
//     fs.mkdirSync(scenesDir, { recursive: true });

//     const globalIniContent = `[General]\nLicenseAccepted=true\n[BasicWindow]\nShowAutoConfig=false\nWarned=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`;
//     fs.writeFileSync(path.join(obsDir, 'global.ini'), globalIniContent);
    
//     const basicIniContent = `[General]
// Name=Untitled
// [Video]
// BaseCX=${RES_W}
// BaseCY=${RES_H}
// OutputCX=${RES_W}
// OutputCY=${RES_H}
// FPSCommon=30
// [Output]
// Mode=Simple
// [SimpleOutput]
// VBitrate=${BITRATE}
// StreamEncoder=x264
// x264Preset=ultrafast
// x264Settings=keyint=60 tune=zerolatency profile=main threads=4 rc-lookahead=0
// `;
//     fs.writeFileSync(path.join(profilesDir, 'basic.ini'), basicIniContent);

//     const serviceJson = {
//         "settings": { "server": "rtmp://vsu.okcdn.ru/input/", "key": ACTIVE_STREAM_KEY },
//         "type": "rtmp_custom"
//     };
//     fs.writeFileSync(path.join(profilesDir, 'service.json'), JSON.stringify(serviceJson, null, 2));

//     const sceneJson = {
//         "current_scene": "WaitingScene", 
//         "current_program_scene": "WaitingScene", 
//         "name": "Untitled",
//         "scene_order": [{"name": "WaitingScene"}, {"name": "MainScene"}],
//         "sources": [
//             { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
//             { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
//             {
//                 "id": "scene", "name": "MainScene",
//                 "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true}, {"name": "Audio", "id": 2, "visible": true} ] }
//             },
//             {
//                 "id": "scene", "name": "WaitingScene",
//                 "settings": { "items": [] } 
//             }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// function attachAntiAdListeners(page) {
//     page.on('dialog', async dialog => {
//         console.log(`[🛡️] AD-BLOCKER: Dismissed a Javascript alert/dialog!`);
//         await dialog.dismiss();
//     });
// }

// async function initializeVideo(page, startMuted, isActivePage) {
//     try {
//         if (SERVER_SELECTION !== 'None') {
//             console.log(`[*] Clicking specific Server: ${SERVER_SELECTION}`);
//             let serverClicked = false; let serverAttempts = 0;
//             while (!serverClicked && serverAttempts < 10) { 
//                 serverAttempts++;
//                 try {
//                     const clickSuccess = await page.evaluate((serverName) => {
//                         const buttons = Array.from(document.querySelectorAll('button'));
//                         const targetBtn = buttons.find(b => b.innerText && b.innerText.trim().includes(serverName));
//                         if (targetBtn) { targetBtn.click(); return true; }
//                         return false;
//                     }, SERVER_SELECTION);

//                     if (clickSuccess) {
//                         serverClicked = true; 
//                         console.log(`[+] Server Button clicked successfully!`);
//                         await takeAndBatchScreenshot(page, `server-clicked`);
//                         await new Promise(r => setTimeout(r, 2000)); 
//                         if (isActivePage) await page.bringToFront(); 
//                     } else await new Promise(r => setTimeout(r, 2000));
//                 } catch (err) { await new Promise(r => setTimeout(r, 2000)); }
//             }
//         }

//         console.log('[*] Checking if Video is Autoplaying or Needs a Play Button...');
//         let isVideoPlaying = false; 
//         let attempts = 0;
        
//         while (!isVideoPlaying && attempts < 15) {
//             for (const frame of page.frames()) {
//                 try {
//                     const autoPlayed = await frame.evaluate(() => {
//                         let playing = false;
//                         document.querySelectorAll('video').forEach(v => {
//                             if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) {
//                                 v.muted = false; 
//                                 v.volume = 1.0;
//                                 playing = true;
//                             }
//                         });
//                         return playing;
//                     });

//                     if (autoPlayed) {
//                         isVideoPlaying = true;
//                         break;
//                     }

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play');
//                     if (playBtn) {
//                         const isVisible = await frame.evaluate(el => {
//                             const style = window.getComputedStyle(el);
//                             return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
//                         }, playBtn);

//                         if (isVisible) {
//                             await frame.evaluate(el => el.click(), playBtn); 
//                             await takeAndBatchScreenshot(page, `play-btn-clicked`);
//                             await new Promise(r => setTimeout(r, 3000)); 
//                             isVideoPlaying = true;
//                             break; 
//                         }
//                     }

//                     if (!isVideoPlaying && attempts > 5) {
//                         const forced = await frame.evaluate(async () => {
//                             let played = false;
//                             let vids = document.querySelectorAll('video');
//                             for(let v of vids) {
//                                 if (v.clientWidth > 50) { 
//                                     v.muted = false; v.volume = 1.0; 
//                                     try { v.click(); } catch(e){}
//                                     try {
//                                         let p = v.play();
//                                         if (p !== undefined) p.catch(()=>{});
//                                         played = true;
//                                     } catch(e) {}
//                                 }
//                             }
//                             return played;
//                         });

//                         if (forced) {
//                             await takeAndBatchScreenshot(page, `force-play-applied`);
//                             isVideoPlaying = true;
//                             break;
//                         }
//                     }
//                 } catch (err) {}
//             }
//             if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
//             attempts++;
//         }

//         console.log('[*] Scanning for Exact Real Video Player...');
//         let targetFrame = null;
//         for (const frame of page.frames()) {
//             try {
//                 const isRealLiveStream = await frame.evaluate(() => {
//                     const vid = document.querySelector('video');
//                     return vid && vid.clientWidth > 50 && vid.clientHeight > 50;
//                 });
//                 if (isRealLiveStream) { 
//                     targetFrame = frame; 
//                     console.log(`[+] Smart Scanner locked onto video frame!`);
//                     break; 
//                 }
//             } catch (e) { }
//         }

//         if (!targetFrame) targetFrame = page.mainFrame();

//         await page.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     document.documentElement.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('overflow', 'hidden', 'important');

//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = null; let maxArea = 0;

//                     iframes.forEach(ifr => {
//                         let area = ifr.clientWidth * ifr.clientHeight;
//                         if (area > maxArea && area > 5000) { maxArea = area; mainIframe = ifr; }
//                     });

//                     iframes.forEach(ifr => {
//                         if (ifr !== mainIframe) {
//                             ifr.style.setProperty('opacity', '0', 'important');
//                             ifr.style.setProperty('pointer-events', 'none', 'important');
//                             ifr.style.setProperty('z-index', '-999', 'important');
//                         }
//                     });

//                     if (mainIframe) {
//                         mainIframe.style.setProperty('position', 'fixed', 'important');
//                         mainIframe.style.setProperty('top', '0px', 'important');
//                         mainIframe.style.setProperty('left', '0px', 'important');
//                         mainIframe.style.setProperty('width', '100vw', 'important');
//                         mainIframe.style.setProperty('height', '100vh', 'important');
//                         mainIframe.style.setProperty('z-index', '2147483645', 'important');
//                         mainIframe.style.setProperty('background-color', 'black', 'important');
//                         mainIframe.style.setProperty('border', 'none', 'important');
//                         mainIframe.style.setProperty('opacity', '1', 'important');
//                         mainIframe.style.setProperty('visibility', 'visible', 'important');
//                     }

//                     const junk = document.querySelectorAll('.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"], [id*="pop"], [class*="pop"], a[href*="extension"]');
//                     junk.forEach(el => { try { el.style.setProperty('display', 'none', 'important'); } catch(e){} });
//                 } catch (err) {}
//             }, 1000); 
//         }).catch(() => {});

//         await targetFrame.evaluate((muteVideo) => {
//             setInterval(() => {
//                 try {
//                     const style = document.createElement('style');
//                     style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                     document.head.appendChild(style);

//                     const mediaElements = document.querySelectorAll('video, audio');
//                     const videos = Array.from(document.querySelectorAll('video'));
//                     let realVideo = null;

//                     mediaElements.forEach(media => { 
//                         media.muted = muteVideo; 
//                         media.volume = muteVideo ? 0.0 : 1.0; 
//                     });

//                     if (!muteVideo) {
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => {
//                             try { btn.click(); } catch(e){}
//                         });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (realVideo) { 
//                         realVideo.style.setProperty('position', 'fixed', 'important');
//                         realVideo.style.setProperty('top', '0px', 'important');
//                         realVideo.style.setProperty('left', '0px', 'important');
//                         realVideo.style.setProperty('width', '100vw', 'important');
//                         realVideo.style.setProperty('height', '100vh', 'important');
//                         realVideo.style.setProperty('z-index', '2147483647', 'important'); 
//                         realVideo.style.setProperty('background-color', 'black', 'important');
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         realVideo.style.setProperty('opacity', '1', 'important');
//                         realVideo.style.setProperty('visibility', 'visible', 'important');
//                         realVideo.style.setProperty('display', 'block', 'important');
//                     }
//                 } catch(err) {}
//             }, 1000); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     await hideLoadingUI(page);
// }

// async function checkPageStatus(page) {
//     if (!page) return { status: 'DEAD' };
//     try {
//         for (const frame of page.frames()) {
//             try {
//                 if (frame.isDetached()) continue;
//                 const result = await Promise.race([
//                     frame.evaluate(() => {
//                         const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
                        
//                         if (
//                             bodyText.includes("stream error") || 
//                             bodyText.includes("not found") || 
//                             bodyText.includes("domain is blocked") ||
//                             bodyText.includes("error: forbidden") ||
//                             bodyText.includes("does not have permission") ||
//                             bodyText.includes("access denied") ||
//                             (bodyText.includes("cloudflare") && bodyText.includes("blocked"))
//                         ) {
//                             return { status: 'CRITICAL_ERROR' };
//                         }
                        
//                         const videos = Array.from(document.querySelectorAll('video'));
//                         let targetV = null;

//                         for (const v of videos) {
//                             if (v.clientWidth > 0 && v.clientWidth < 100) continue;
//                             if ((v.src && v.src.startsWith('blob:')) || v.matches('.jw-video, .plyr__video, .vjs-tech')) {
//                                 targetV = v; break;
//                             }
//                         }
                        
//                         if (!targetV && videos.length > 0) {
//                             targetV = videos.sort((a, b) => (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight))[0];
//                         }
                        
//                         if (targetV && !targetV.ended && targetV.currentTime > 0) return { status: 'HEALTHY', currentTime: targetV.currentTime };
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

// async function startWatchdog() {
//     let lastActiveTime = -1;
//     let frozenCheckTimestamp = Date.now();
//     let watchdogTicks = 0;
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     const WARMUP_MAX_TIME = 15000; 

//     let activeUrlStr = urlList[currentUrlIndex];
//     let backupUrlStr = urlList[backupUrlIndex];

//     while (true) {
//         if (!browser || !browser.isConnected()) throw new Error("Browser closed.");

//         let activeStatus = await checkPageStatus(activePage);

//         if (activeStatus.status === 'HEALTHY') {
//             await hideLoadingUI(activePage); 
//             isWarmupPhase = false; 

//             if (activeStatus.currentTime === lastActiveTime) {
//                 if (Date.now() - frozenCheckTimestamp > FROZEN_THRESHOLD_MS) activeStatus.status = 'FROZEN';
//             } else {
//                 lastActiveTime = activeStatus.currentTime; frozenCheckTimestamp = Date.now();
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             frame.evaluate(() => { 
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                                 document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                             }).catch(()=>{});
//                         }
//                     } catch(e) {}
//                 }
//             }
//         }

//         if (backupPage) {
//             for (const frame of backupPage.frames()) {
//                 try {
//                     if (!frame.isDetached()) {
//                         frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }).catch(()=>{});
//                     }
//                 } catch(e) {}
//             }
//         }

//         watchdogTicks++;
//         if (watchdogTicks % 6 === 0) {
//             console.log(`\n[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//             console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//             console.log(`[⏭️] NEXT IN QUEUE    : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//             if (watchdogTicks % 120 === 0) {
//                 await takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
//             }
//         }

//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD') {
            
//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 console.log(`[⏳] Watchdog detected '${activeStatus.status}', but stream is in WARM-UP phase. Waiting...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             }

//             console.log(`\n==================================================`);
//             console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
//             console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//             console.log(`==================================================`);
            
//             await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
            
//             console.log(`[*] Checking Backup Tab status before switching...`);
//             let backupStatus = await checkPageStatus(backupPage);

//             if (backupStatus.status === 'HEALTHY' || backupStatus.status === 'DEAD') { 
                
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); });
//                     } catch(e) {}
//                 }
                
//                 await showLoadingUI(backupPage, "RECONNECTING", "Establishing secure connection to backup server <span class='stream-blink'>...</span>");
//                 await backupPage.bringToFront();
//                 await new Promise(r => setTimeout(r, 1000)); 
                
//                 try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                 console.log(`[*] Initializing Video on the newly active tab...`);
//                 await initializeVideo(backupPage, false, true); 

//                 let brokenPage = activePage; activePage = backupPage; backupPage = brokenPage;
//                 lastActiveTime = -1; frozenCheckTimestamp = Date.now();

//                 currentUrlIndex = backupUrlIndex; activeUrlStr = urlList[currentUrlIndex]; 
//                 backupUrlIndex = (backupUrlIndex + 1) % urlList.length; backupUrlStr = urlList[backupUrlIndex]; 

//                 console.log(`\n==================================================`);
//                 console.log(`[🔄] SMART HOT-SWAP EXECUTED SUCCESSFULLY`);
//                 console.log(`==================================================`);
//                 console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`[🔊] LIVE AUDIO STATUS : ON (Unmuted & Forced)`);
//                 console.log(`--------------------------------------------------`);
//                 console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//                 console.log(`[🔇] BACKUP AUDIO      : MUTED (Background Loading)`);
//                 console.log(`==================================================\n`);

//                 backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
                
//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true;

//             } else {
//                 console.error(`[!] ❌ Backup Tab is ALSO DEAD/FROZEN. Hard Restarting System...`);
//                 throw new Error("Both Active and Backup tabs failed.");
//             }
//         }

//         await new Promise(r => setTimeout(r, 2000)); 
//     }
// }

// async function startDirectStreaming() {
//     console.log(`[*] Starting OBS Studio FIRST...`);
//     setupOBSConfig();

//     obsProcess = spawn('obs', ['--startstreaming', '--minimize-to-tray']);
//     obsProcess.stdout.on('data', (data) => console.log(`[OBS]: ${data.toString().trim()}`));
//     obsProcess.stderr.on('data', (data) => {
//         const msg = data.toString().trim();
//         if (msg.includes('error') || msg.includes('fail')) console.log(`[OBS Error]: ${msg}`);
//     });

//     console.log('[*] Waiting for OBS to initialize before launching browser...');
//     await new Promise(r => setTimeout(r, 6000));

//     let isObsConnected = false;
//     console.log('[*] Attempting to connect to OBS WebSocket (Polling Engine Active)...');
//     for (let attempt = 1; attempt <= 15; attempt++) {
//         try {
//             await Promise.race([
//                 obs.connect('ws://127.0.0.1:4455', 'secret'),
//                 new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
//             ]);
//             isObsConnected = true;
//             console.log('[+] OBS WebSocket Connected Successfully!');
//             break;
//         } catch (e) {
//             console.log(`[⏳] OBS Port 4455 not ready yet. Retrying (${attempt}/15)...`);
//             await new Promise(r => setTimeout(r, 2000));
//         }
//     }

//     if (isObsConnected) {
//         try {
//             await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' });
//             console.log('[+] Enforced WaitingScene (Black Screen Buffer)');
//         } catch(e){}
//     }

//     // 🌟 DYNAMIC PROXY INJECTION LOGIC
//     let browserArgs = [
//         '--no-sandbox', 
//         '--disable-setuid-sandbox',
//         `--window-size=${RES_W},${RES_H}`, 
//         '--window-position=0,0', 
//         '--kiosk', 
//         '--start-fullscreen',
//         '--autoplay-policy=no-user-gesture-required',
//         '--disable-dev-shm-usage', 
//         '--ignore-certificate-errors',
//         '--disable-web-security',
//         '--ignore-gpu-blocklist', 
//         '--use-gl=egl',
//         '--disable-accelerated-video-decode', 
//         '--disable-accelerated-video-encode',
//         '--disable-smooth-scrolling',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion',
//         '--disable-background-timer-throttling',
//         '--disable-backgrounding-occluded-windows',
//         '--disable-renderer-backgrounding'
//     ];

//     if (PROXY_ENGINE.includes('Cloudflare')) {
//         browserArgs.push('--proxy-server=socks5://127.0.0.1:40000');
//         console.log(`[*] Starting browser with EXACT viewport dimensions: ${RES_W}x${RES_H} and [CLOUDFLARE WARP] Proxy...`);
//     } else {
//         console.log(`[*] Starting browser with EXACT viewport dimensions: ${RES_W}x${RES_H} using [DIRECT GITHUB IP]...`);
//     }

//     browser = await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: browserArgs
//     });

//     browser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => {
//                 if (newPage && newPage !== activePage && newPage !== backupPage) {
//                     console.log(`[🛡️] AD-BLOCKER: Killed an unwanted pop-up tab!`);
//                     try { await newPage.close(); } catch(e) {}
//                 }
//             }, 500);
//         }
//     });

//     activePage = (await browser.pages())[0]; 
//     backupPage = await browser.newPage();
    
//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex]}`);
//     await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
//     await initializeVideo(activePage, false, true); 

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Black Screen to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex]}`);
//     backupPage.goto(urlList[backupUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 

//     console.log(`\n==================================================`);
//     console.log(`[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     console.log(`==================================================`);
//     console.log(`[📺] CURRENT ACTIVE LIVE : Server [${currentUrlIndex}] -> ${urlList[currentUrlIndex]}`);
//     console.log(`[🔊] LIVE AUDIO STATUS   : ON (Unmuted)`);
//     console.log(`--------------------------------------------------`);
//     console.log(`[🛡️] NEXT BACKUP QUEUE   : Server [${backupUrlIndex}] -> ${urlList[backupUrlIndex]}`);
//     console.log(`[🔇] BACKUP AUDIO STATUS : MUTED (Background)`);
//     console.log(`==================================================\n`);

//     console.log('[*] Everything Setup! Dual-Tab Monitoring is Active.');
//     await startWatchdog();
// }

// async function mainLoop() {
//     while (true) {
//         try { await startDirectStreaming(); } 
//         catch (error) {
//             console.error(`\n[!] ALERT: ${error.message}`);
//             console.log('[*] 🔄 Hard Restarting everything in 3 seconds...');
//             await cleanup();
//             await new Promise(resolve => setTimeout(resolve, 3000));
//         }
//     }
// }

// async function cleanup() {
//     console.log('[*] Cleaning up resources...');
//     try { await obs.disconnect(); } catch (e) { } 
//     if (browser) { try { await browser.close(); } catch(e) { } browser = null; }
//     if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch(e) { } obsProcess = null; }
//     try {
//         execSync('pkill -9 obs || true', { stdio: 'ignore' });
//         execSync('pkill -9 chrome || true', { stdio: 'ignore' });
//         execSync('pkill -9 puppeteer || true', { stdio: 'ignore' });
//     } catch (e) { }
// }

// process.on('SIGINT', async () => { await cleanup(); process.exit(0); });

// const customDurationStr = process.env.CUSTOM_DURATION || 'None';
// function parseDurationToMs(str) {
//     if (!str || str.toLowerCase() === 'none') return null;
//     let ms = 0;
//     const hMatch = str.match(/(\d+)\s*h/i);
//     const mMatch = str.match(/(\d+)\s*m/i);
//     if (hMatch) ms += parseInt(hMatch[1]) * 60 * 60 * 1000;
//     if (mMatch) ms += parseInt(mMatch[1]) * 60 * 1000;
//     return ms > 0 ? ms : null;
// }

// const exactDurationMs = parseDurationToMs(customDurationStr);
// if (exactDurationMs) {
//     setTimeout(async () => {
//         console.log(`\n[*] 🛑 Time's up! The assigned duration (${customDurationStr}) is complete. Shutting down cleanly...`);
//         await cleanup();
//         process.exit(0);
//     }, exactDurationMs);
// } else {
//     setTimeout(() => {
//         try {
//             const targetUrls = process.env.TARGET_URLS || 'https://dadocric.st/player.php?id=starsp3&v=m';
//             const channel = process.env.OKRU_STREAM_ID || '1';
//             const quality = process.env.STREAM_QUALITY || '110KBps (Balanced 480p)';
//             const server = process.env.SERVER_SELECTION || 'None';
//             // 🌟 NEW: Passing Proxy Engine parameter to auto-loop so it remembers choice
//             const cmd = `gh workflow run main.yml -f target_urls="${targetUrls}" -f okru_stream_channel="${channel}" -f stream_quality="${quality}" -f server_selection="${server}" -f proxy_engine="${PROXY_ENGINE}" -f custom_duration="None"`;
//             execSync(cmd, { stdio: 'inherit' });
//             setTimeout(async () => {
//                 await cleanup(); 
//                 process.exit(0); 
//             }, 300000); 
//         } catch (err) { }
//     }, 21000000);
// }

// mainLoop();
















// ======= below code is : Aapka yeh idea bohot hi professional aur smart hai! Ek Drop-down Menu banana jisme option ho ke "Cloudflare WARP" use karna hai ya "Direct GitHub IP", is se aapko code baar baar change nahi karna padega.

// Maine system mein ek "Dynamic Proxy Injector" bana diya hai. Ab:

// Aapko GitHub Actions ke menu mein ek naya option dikhega: Proxy Engine.

// By default usme Cloudflare WARP (Recommended) selected hoga.

// Agar aap usay None (Direct GitHub IP) par set karte hain, toh code khud-ba-khud Cloudflare ki installation skip kar dega aur Puppeteer (Chrome) ko direct internet par chala dega ===================


// ================================= Alhamdullah =====================


// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// const obs = new OBSWebSocket(); 

// // 🚀 Multi-Stream Key Manager
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

// const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
// let RES_W = 1920, RES_H = 1080, BITRATE = 5000;

// if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
// else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
// else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
// else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }
// else { RES_W = 1920; RES_H = 1080; BITRATE = 6000; }

// console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);

// let rawUrls = (process.env.TARGET_URLS || '').trim();
// let urlList = rawUrls !== '' 
//     ? rawUrls.split(',').map(u => u.trim().startsWith('http') ? u.trim() : 'https://' + u.trim()) 
//     : ['https://dadocric.st/player.php?id=starsp3&v=m'];

// let currentUrlIndex = 0;
// let backupUrlIndex = urlList.length > 1 ? 1 : 0; 

// const SELECTED_CHANNEL = process.env.OKRU_STREAM_ID || '1';
// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None'; 
// const ACTIVE_STREAM_KEY = STREAM_KEYS[SELECTED_CHANNEL] || STREAM_KEYS['1'];

// let browser = null;
// let obsProcess = null;
// let activePage = null;
// let backupPage = null;

// const FROZEN_THRESHOLD_MS = 8000; 

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount = 0;

// async function takeAndBatchScreenshot(page, stepName) {
//     if (!page) return;
//     try {
//         const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
//         const filePath = `./screenshots/snap_${timestamp}_${stepName}.png`;
//         await page.screenshot({ path: filePath });
//         console.log(`[📸] Screenshot saved: ${filePath}`);
//         pendingScreenshots.push(filePath);

//         if (pendingScreenshots.length >= 3) {
//             try {
//                 const tag = 'live-stream-logs';
//                 try { execSync(`gh release view ${tag} || gh release create ${tag} -t "Live Logs"`, { stdio: 'ignore' }); } catch(e) {}
//                 try {
//                     const oldAssets = execSync(`gh release view ${tag} --json assets -q ".assets[].name"`, { encoding: 'utf-8' }).trim().split('\n');
//                     for (const asset of oldAssets) if (asset) execSync(`gh release delete-asset ${tag} "${asset}" -y`, { stdio: 'ignore' });
//                 } catch(e) {}

//                 const fileList = pendingScreenshots.join(' ');
//                 exec(`gh release upload ${tag} ${fileList} --clobber`, (err) => {
//                     if (!err) uploadCycleCount++;
//                 });
//                 pendingScreenshots = []; 
//             } catch (err) { }
//         }
//     } catch (e) { }
// }

// async function showLoadingUI(page, title, sub) {
//     try {
//         await page.evaluate((t, s) => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) overlay.remove();

//             overlay = document.createElement('div');
//             overlay.id = 'smart-stream-overlay';
//             overlay.innerHTML = `
//                 <style>
//                     #smart-stream-overlay {
//                         position: fixed !important; top: 0 !important; left: 0 !important; 
//                         width: 100vw !important; height: 100vh !important;
//                         background: radial-gradient(circle at center, #1a1a1a 0%, #000000 100%) !important;
//                         z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                         justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                         pointer-events: none !important;
//                     }
//                     .stream-spinner {
//                         width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1);
//                         border-top: 6px solid #e50914; border-radius: 50%;
//                         animation: spin-overlay 1s linear infinite; margin-bottom: 30px;
//                         box-shadow: 0 0 25px rgba(229, 9, 20, 0.4);
//                     }
//                     @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                     .stream-title { 
//                         font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; 
//                         margin-bottom: 15px !important; text-transform: uppercase !important; 
//                         text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important;
//                     }
//                     .stream-sub { 
//                         font-size: 20px !important; color: #cccccc !important; text-align: center !important; 
//                         max-width: 600px !important; line-height: 1.6 !important; font-weight: 400 !important;
//                     }
//                     .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
//                     @keyframes blinker { 50% { opacity: 0.3; } }
//                 </style>
//                 <div class="stream-spinner"></div>
//                 <div class="stream-title" id="overlay-title">${t}</div>
//                 <div class="stream-sub" id="overlay-sub">${s}</div>
//             `;
//             document.body.appendChild(overlay);
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) overlay.remove();
//         });
//     } catch (e) {}
// }

// function setupOBSConfig() {
//     const obsDir = path.join(os.homedir(), '.config', 'obs-studio');
//     const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
//     const scenesDir = path.join(obsDir, 'basic', 'scenes');

//     fs.mkdirSync(profilesDir, { recursive: true });
//     fs.mkdirSync(scenesDir, { recursive: true });

//     const globalIniContent = `[General]\nLicenseAccepted=true\n[BasicWindow]\nShowAutoConfig=false\nWarned=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`;
//     fs.writeFileSync(path.join(obsDir, 'global.ini'), globalIniContent);
    
//     const basicIniContent = `[General]
// Name=Untitled
// [Video]
// BaseCX=${RES_W}
// BaseCY=${RES_H}
// OutputCX=${RES_W}
// OutputCY=${RES_H}
// FPSCommon=30
// [Output]
// Mode=Simple
// [SimpleOutput]
// VBitrate=${BITRATE}
// StreamEncoder=x264
// x264Preset=ultrafast
// x264Settings=keyint=60 tune=zerolatency profile=main threads=4 rc-lookahead=0
// `;
//     fs.writeFileSync(path.join(profilesDir, 'basic.ini'), basicIniContent);

//     const serviceJson = {
//         "settings": { "server": "rtmp://vsu.okcdn.ru/input/", "key": ACTIVE_STREAM_KEY },
//         "type": "rtmp_custom"
//     };
//     fs.writeFileSync(path.join(profilesDir, 'service.json'), JSON.stringify(serviceJson, null, 2));

//     const sceneJson = {
//         "current_scene": "WaitingScene", 
//         "current_program_scene": "WaitingScene", 
//         "name": "Untitled",
//         "scene_order": [{"name": "WaitingScene"}, {"name": "MainScene"}],
//         "sources": [
//             { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
//             { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
//             {
//                 "id": "scene", "name": "MainScene",
//                 "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true}, {"name": "Audio", "id": 2, "visible": true} ] }
//             },
//             {
//                 "id": "scene", "name": "WaitingScene",
//                 "settings": { "items": [] } 
//             }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// // 🌟 FIX: Attaching listeners to block Javascript Alerts/Popups
// function attachAntiAdListeners(page) {
//     page.on('dialog', async dialog => {
//         console.log(`[🛡️] AD-BLOCKER: Dismissed a Javascript alert/dialog!`);
//         await dialog.dismiss();
//     });
// }

// async function initializeVideo(page, startMuted, isActivePage) {
//     try {
//         if (SERVER_SELECTION !== 'None') {
//             console.log(`[*] Clicking specific Server: ${SERVER_SELECTION}`);
//             let serverClicked = false; let serverAttempts = 0;
//             while (!serverClicked && serverAttempts < 10) { 
//                 serverAttempts++;
//                 try {
//                     const clickSuccess = await page.evaluate((serverName) => {
//                         const buttons = Array.from(document.querySelectorAll('button'));
//                         const targetBtn = buttons.find(b => b.innerText && b.innerText.trim().includes(serverName));
//                         if (targetBtn) { targetBtn.click(); return true; }
//                         return false;
//                     }, SERVER_SELECTION);

//                     if (clickSuccess) {
//                         serverClicked = true; 
//                         console.log(`[+] Server Button clicked successfully!`);
//                         await takeAndBatchScreenshot(page, `server-clicked`);
//                         await new Promise(r => setTimeout(r, 2000)); 
//                         if (isActivePage) await page.bringToFront(); 
//                     } else await new Promise(r => setTimeout(r, 2000));
//                 } catch (err) { await new Promise(r => setTimeout(r, 2000)); }
//             }
//         }

//         console.log('[*] Checking if Video is Autoplaying or Needs a Play Button...');
//         let isVideoPlaying = false; 
//         let attempts = 0;
        
//         while (!isVideoPlaying && attempts < 15) {
//             for (const frame of page.frames()) {
//                 try {
//                     const autoPlayed = await frame.evaluate(() => {
//                         let playing = false;
//                         document.querySelectorAll('video').forEach(v => {
//                             if (v.clientWidth > 50 && !v.paused && v.currentTime > 0) {
//                                 v.muted = false; 
//                                 v.volume = 1.0;
//                                 playing = true;
//                             }
//                         });
//                         return playing;
//                     });

//                     if (autoPlayed) {
//                         isVideoPlaying = true;
//                         break;
//                     }

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play');
//                     if (playBtn) {
//                         const isVisible = await frame.evaluate(el => {
//                             const style = window.getComputedStyle(el);
//                             return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
//                         }, playBtn);

//                         if (isVisible) {
//                             await frame.evaluate(el => el.click(), playBtn); 
//                             await takeAndBatchScreenshot(page, `play-btn-clicked`);
//                             await new Promise(r => setTimeout(r, 3000)); 
//                             isVideoPlaying = true;
//                             break; 
//                         }
//                     }

//                     if (!isVideoPlaying && attempts > 5) {
//                         const forced = await frame.evaluate(async () => {
//                             let played = false;
//                             let vids = document.querySelectorAll('video');
//                             for(let v of vids) {
//                                 if (v.clientWidth > 50) { 
//                                     v.muted = false; v.volume = 1.0; 
//                                     try { v.click(); } catch(e){}
//                                     try {
//                                         let p = v.play();
//                                         if (p !== undefined) p.catch(()=>{});
//                                         played = true;
//                                     } catch(e) {}
//                                 }
//                             }
//                             return played;
//                         });

//                         if (forced) {
//                             await takeAndBatchScreenshot(page, `force-play-applied`);
//                             isVideoPlaying = true;
//                             break;
//                         }
//                     }
//                 } catch (err) {}
//             }
//             if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
//             attempts++;
//         }

//         console.log('[*] Scanning for Exact Real Video Player...');
//         let targetFrame = null;
//         for (const frame of page.frames()) {
//             try {
//                 const isRealLiveStream = await frame.evaluate(() => {
//                     const vid = document.querySelector('video');
//                     return vid && vid.clientWidth > 50 && vid.clientHeight > 50;
//                 });
//                 if (isRealLiveStream) { 
//                     targetFrame = frame; 
//                     console.log(`[+] Smart Scanner locked onto video frame!`);
//                     break; 
//                 }
//             } catch (e) { }
//         }

//         if (!targetFrame) targetFrame = page.mainFrame();

//         // 🌟 FIX: THE INVINCIBLE LOOP (Main Page Ad Zapper)
//         await page.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     document.documentElement.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('overflow', 'hidden', 'important');

//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = null; let maxArea = 0;

//                     // Find largest iframe (usually the real video player)
//                     iframes.forEach(ifr => {
//                         let area = ifr.clientWidth * ifr.clientHeight;
//                         if (area > maxArea && area > 5000) { maxArea = area; mainIframe = ifr; }
//                     });

//                     // Hide ALL other iframes (pop-unders/ads)
//                     iframes.forEach(ifr => {
//                         if (ifr !== mainIframe) {
//                             ifr.style.setProperty('opacity', '0', 'important');
//                             ifr.style.setProperty('pointer-events', 'none', 'important');
//                             ifr.style.setProperty('z-index', '-999', 'important');
//                         }
//                     });

//                     if (mainIframe) {
//                         mainIframe.style.setProperty('position', 'fixed', 'important');
//                         mainIframe.style.setProperty('top', '0px', 'important');
//                         mainIframe.style.setProperty('left', '0px', 'important');
//                         mainIframe.style.setProperty('width', '100vw', 'important');
//                         mainIframe.style.setProperty('height', '100vh', 'important');
//                         mainIframe.style.setProperty('z-index', '2147483645', 'important');
//                         mainIframe.style.setProperty('background-color', 'black', 'important');
//                         mainIframe.style.setProperty('border', 'none', 'important');
//                         mainIframe.style.setProperty('opacity', '1', 'important');
//                         mainIframe.style.setProperty('visibility', 'visible', 'important');
//                     }

//                     // Destroy all known ad elements dynamically
//                     const junk = document.querySelectorAll('.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"], [id*="pop"], [class*="pop"], a[href*="extension"]');
//                     junk.forEach(el => { try { el.style.setProperty('display', 'none', 'important'); } catch(e){} });
//                 } catch (err) {}
//             }, 1000); // Runs every 1 second continuously!
//         }).catch(() => {});

//         // 🌟 FIX: THE INVINCIBLE LOOP (Video Frame Keeper)
//         await targetFrame.evaluate((muteVideo) => {
//             setInterval(() => {
//                 try {
//                     const style = document.createElement('style');
//                     style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                     document.head.appendChild(style);

//                     const mediaElements = document.querySelectorAll('video, audio');
//                     const videos = Array.from(document.querySelectorAll('video'));
//                     let realVideo = null;

//                     mediaElements.forEach(media => { 
//                         media.muted = muteVideo; 
//                         media.volume = muteVideo ? 0.0 : 1.0; 
//                     });

//                     if (!muteVideo) {
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => {
//                             try { btn.click(); } catch(e){}
//                         });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (realVideo) { 
//                         realVideo.style.setProperty('position', 'fixed', 'important');
//                         realVideo.style.setProperty('top', '0px', 'important');
//                         realVideo.style.setProperty('left', '0px', 'important');
//                         realVideo.style.setProperty('width', '100vw', 'important');
//                         realVideo.style.setProperty('height', '100vh', 'important');
//                         realVideo.style.setProperty('z-index', '2147483647', 'important'); // Always max z-index
//                         realVideo.style.setProperty('background-color', 'black', 'important');
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         realVideo.style.setProperty('opacity', '1', 'important');
//                         realVideo.style.setProperty('visibility', 'visible', 'important');
//                         realVideo.style.setProperty('display', 'block', 'important');
//                     }
//                 } catch(err) {}
//             }, 1000); // Re-applies z-index every second to beat ads!
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     await hideLoadingUI(page);
// }

// async function checkPageStatus(page) {
//     if (!page) return { status: 'DEAD' };
//     try {
//         for (const frame of page.frames()) {
//             try {
//                 if (frame.isDetached()) continue;
//                 const result = await Promise.race([
//                     frame.evaluate(() => {
//                         const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
                        
//                         if (
//                             bodyText.includes("stream error") || 
//                             bodyText.includes("not found") || 
//                             bodyText.includes("domain is blocked") ||
//                             bodyText.includes("error: forbidden") ||
//                             bodyText.includes("does not have permission") ||
//                             bodyText.includes("access denied") ||
//                             (bodyText.includes("cloudflare") && bodyText.includes("blocked"))
//                         ) {
//                             return { status: 'CRITICAL_ERROR' };
//                         }
                        
//                         const videos = Array.from(document.querySelectorAll('video'));
//                         let targetV = null;

//                         for (const v of videos) {
//                             if (v.clientWidth > 0 && v.clientWidth < 100) continue;
//                             if ((v.src && v.src.startsWith('blob:')) || v.matches('.jw-video, .plyr__video, .vjs-tech')) {
//                                 targetV = v; break;
//                             }
//                         }
                        
//                         if (!targetV && videos.length > 0) {
//                             targetV = videos.sort((a, b) => (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight))[0];
//                         }
                        
//                         if (targetV && !targetV.ended && targetV.currentTime > 0) return { status: 'HEALTHY', currentTime: targetV.currentTime };
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

// async function startWatchdog() {
//     let lastActiveTime = -1;
//     let frozenCheckTimestamp = Date.now();
//     let watchdogTicks = 0;
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     const WARMUP_MAX_TIME = 15000; 

//     let activeUrlStr = urlList[currentUrlIndex];
//     let backupUrlStr = urlList[backupUrlIndex];

//     while (true) {
//         if (!browser || !browser.isConnected()) throw new Error("Browser closed.");

//         let activeStatus = await checkPageStatus(activePage);

//         if (activeStatus.status === 'HEALTHY') {
//             await hideLoadingUI(activePage); 
//             isWarmupPhase = false; 

//             if (activeStatus.currentTime === lastActiveTime) {
//                 if (Date.now() - frozenCheckTimestamp > FROZEN_THRESHOLD_MS) activeStatus.status = 'FROZEN';
//             } else {
//                 lastActiveTime = activeStatus.currentTime; frozenCheckTimestamp = Date.now();
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             frame.evaluate(() => { 
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                                 document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                             }).catch(()=>{});
//                         }
//                     } catch(e) {}
//                 }
//             }
//         }

//         if (backupPage) {
//             for (const frame of backupPage.frames()) {
//                 try {
//                     if (!frame.isDetached()) {
//                         frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }).catch(()=>{});
//                     }
//                 } catch(e) {}
//             }
//         }

//         watchdogTicks++;
//         if (watchdogTicks % 6 === 0) {
//             console.log(`\n[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//             console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//             console.log(`[⏭️] NEXT IN QUEUE    : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//             if (watchdogTicks % 120 === 0) {
//                 await takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
//             }
//         }

//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD') {
            
//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 console.log(`[⏳] Watchdog detected '${activeStatus.status}', but stream is in WARM-UP phase. Waiting...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             }

//             console.log(`\n==================================================`);
//             console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
//             console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//             console.log(`==================================================`);
            
//             await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
            
//             console.log(`[*] Checking Backup Tab status before switching...`);
//             let backupStatus = await checkPageStatus(backupPage);

//             if (backupStatus.status === 'HEALTHY' || backupStatus.status === 'DEAD') { 
                
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); });
//                     } catch(e) {}
//                 }
                
//                 await showLoadingUI(backupPage, "RECONNECTING", "Establishing secure connection to backup server <span class='stream-blink'>...</span>");
//                 await backupPage.bringToFront();
//                 await new Promise(r => setTimeout(r, 1000)); 
                
//                 try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                 console.log(`[*] Initializing Video on the newly active tab...`);
//                 await initializeVideo(backupPage, false, true); 

//                 let brokenPage = activePage; activePage = backupPage; backupPage = brokenPage;
//                 lastActiveTime = -1; frozenCheckTimestamp = Date.now();

//                 currentUrlIndex = backupUrlIndex; activeUrlStr = urlList[currentUrlIndex]; 
//                 backupUrlIndex = (backupUrlIndex + 1) % urlList.length; backupUrlStr = urlList[backupUrlIndex]; 

//                 console.log(`\n==================================================`);
//                 console.log(`[🔄] SMART HOT-SWAP EXECUTED SUCCESSFULLY`);
//                 console.log(`==================================================`);
//                 console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`[🔊] LIVE AUDIO STATUS : ON (Unmuted & Forced)`);
//                 console.log(`--------------------------------------------------`);
//                 console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//                 console.log(`[🔇] BACKUP AUDIO      : MUTED (Background Loading)`);
//                 console.log(`==================================================\n`);

//                 backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
                
//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true;

//             } else {
//                 console.error(`[!] ❌ Backup Tab is ALSO DEAD/FROZEN. Hard Restarting System...`);
//                 throw new Error("Both Active and Backup tabs failed.");
//             }
//         }

//         await new Promise(r => setTimeout(r, 2000)); 
//     }
// }

// async function startDirectStreaming() {
//     console.log(`[*] Starting OBS Studio FIRST...`);
//     setupOBSConfig();

//     obsProcess = spawn('obs', ['--startstreaming', '--minimize-to-tray']);
//     obsProcess.stdout.on('data', (data) => console.log(`[OBS]: ${data.toString().trim()}`));
//     obsProcess.stderr.on('data', (data) => {
//         const msg = data.toString().trim();
//         if (msg.includes('error') || msg.includes('fail')) console.log(`[OBS Error]: ${msg}`);
//     });

//     console.log('[*] Waiting for OBS to initialize before launching browser...');
//     await new Promise(r => setTimeout(r, 6000));

//     let isObsConnected = false;
//     console.log('[*] Attempting to connect to OBS WebSocket (Polling Engine Active)...');
//     for (let attempt = 1; attempt <= 15; attempt++) {
//         try {
//             await Promise.race([
//                 obs.connect('ws://127.0.0.1:4455', 'secret'),
//                 new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
//             ]);
//             isObsConnected = true;
//             console.log('[+] OBS WebSocket Connected Successfully!');
//             break;
//         } catch (e) {
//             console.log(`[⏳] OBS Port 4455 not ready yet. Retrying (${attempt}/15)...`);
//             await new Promise(r => setTimeout(r, 2000));
//         }
//     }

//     if (isObsConnected) {
//         try {
//             await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' });
//             console.log('[+] Enforced WaitingScene (Black Screen Buffer)');
//         } catch(e){}
//     }

//     console.log(`[*] Starting browser with EXACT viewport dimensions: ${RES_W}x${RES_H} and Cloudflare WARP Proxy...`);
    
//     browser = await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: [
//             '--no-sandbox', 
//             '--disable-setuid-sandbox',
//             `--window-size=${RES_W},${RES_H}`, 
//             '--window-position=0,0', 
//             '--kiosk', 
//             '--start-fullscreen',
//             '--autoplay-policy=no-user-gesture-required',
//             '--disable-dev-shm-usage', 
//             '--proxy-server=socks5://127.0.0.1:40000', 
//             '--ignore-certificate-errors',
//             '--disable-web-security',
//             '--ignore-gpu-blocklist', 
//             '--use-gl=egl',
//             '--disable-accelerated-video-decode', 
//             '--disable-accelerated-video-encode',
//             '--disable-smooth-scrolling',
//             '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion',
//             '--disable-background-timer-throttling',
//             '--disable-backgrounding-occluded-windows',
//             '--disable-renderer-backgrounding'
//         ]
//     });

//     // 🌟 FIX: THE POP-UP KILLER (Kills any new tab the site tries to open)
//     browser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => {
//                 if (newPage && newPage !== activePage && newPage !== backupPage) {
//                     console.log(`[🛡️] AD-BLOCKER: Killed an unwanted pop-up tab!`);
//                     try { await newPage.close(); } catch(e) {}
//                 }
//             }, 500); // 0.5 sec delay to ensure safe closing
//         }
//     });

//     activePage = (await browser.pages())[0]; 
//     backupPage = await browser.newPage();
    
//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex]}`);
//     await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
//     await initializeVideo(activePage, false, true); 

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Black Screen to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex]}`);
//     backupPage.goto(urlList[backupUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 

//     console.log(`\n==================================================`);
//     console.log(`[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     console.log(`==================================================`);
//     console.log(`[📺] CURRENT ACTIVE LIVE : Server [${currentUrlIndex}] -> ${urlList[currentUrlIndex]}`);
//     console.log(`[🔊] LIVE AUDIO STATUS   : ON (Unmuted)`);
//     console.log(`--------------------------------------------------`);
//     console.log(`[🛡️] NEXT BACKUP QUEUE   : Server [${backupUrlIndex}] -> ${urlList[backupUrlIndex]}`);
//     console.log(`[🔇] BACKUP AUDIO STATUS : MUTED (Background)`);
//     console.log(`==================================================\n`);

//     console.log('[*] Everything Setup! Dual-Tab Monitoring is Active.');
//     await startWatchdog();
// }

// async function mainLoop() {
//     while (true) {
//         try { await startDirectStreaming(); } 
//         catch (error) {
//             console.error(`\n[!] ALERT: ${error.message}`);
//             console.log('[*] 🔄 Hard Restarting everything in 3 seconds...');
//             await cleanup();
//             await new Promise(resolve => setTimeout(resolve, 3000));
//         }
//     }
// }

// async function cleanup() {
//     console.log('[*] Cleaning up resources...');
//     try { await obs.disconnect(); } catch (e) { } 
//     if (browser) { try { await browser.close(); } catch(e) { } browser = null; }
//     if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch(e) { } obsProcess = null; }
//     try {
//         execSync('pkill -9 obs || true', { stdio: 'ignore' });
//         execSync('pkill -9 chrome || true', { stdio: 'ignore' });
//         execSync('pkill -9 puppeteer || true', { stdio: 'ignore' });
//     } catch (e) { }
// }

// process.on('SIGINT', async () => { await cleanup(); process.exit(0); });

// const customDurationStr = process.env.CUSTOM_DURATION || 'None';
// function parseDurationToMs(str) {
//     if (!str || str.toLowerCase() === 'none') return null;
//     let ms = 0;
//     const hMatch = str.match(/(\d+)\s*h/i);
//     const mMatch = str.match(/(\d+)\s*m/i);
//     if (hMatch) ms += parseInt(hMatch[1]) * 60 * 60 * 1000;
//     if (mMatch) ms += parseInt(mMatch[1]) * 60 * 1000;
//     return ms > 0 ? ms : null;
// }

// const exactDurationMs = parseDurationToMs(customDurationStr);
// if (exactDurationMs) {
//     setTimeout(async () => {
//         console.log(`\n[*] 🛑 Time's up! The assigned duration (${customDurationStr}) is complete. Shutting down cleanly...`);
//         await cleanup();
//         process.exit(0);
//     }, exactDurationMs);
// } else {
//     setTimeout(() => {
//         try {
//             const targetUrls = process.env.TARGET_URLS || 'https://dadocric.st/player.php?id=starsp3&v=m';
//             const channel = process.env.OKRU_STREAM_ID || '1';
//             const quality = process.env.STREAM_QUALITY || '110KBps (Balanced 480p)';
//             const server = process.env.SERVER_SELECTION || 'None';
//             const cmd = `gh workflow run main.yml -f target_urls="${targetUrls}" -f okru_stream_channel="${channel}" -f stream_quality="${quality}" -f server_selection="${server}" -f custom_duration="None"`;
//             execSync(cmd, { stdio: 'inherit' });
//             setTimeout(async () => {
//                 await cleanup(); 
//                 process.exit(0); 
//             }, 300000); 
//         } catch (err) { }
//     }, 21000000);
// }

// mainLoop();
