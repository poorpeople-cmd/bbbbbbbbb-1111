// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD (2026 LATEST FIX)
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     if (err.message && err.message.includes('Requesting main frame too early')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored stealth plugin background frame error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNCAUGHT EXCEPTION: ${err.message}`);
//     }
// });

// process.on('unhandledRejection', (reason, promise) => {
//     let msg = reason && reason.message ? reason.message : reason;
//     if (msg && msg.includes('Protocol error')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored detached frame protocol error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNHANDLED REJECTION: ${msg}`);
//     }
// });
// // =========================================================================================

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME (IN MINUTES)
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 40; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// // =========================================================================================
// // 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// // =========================================================================================
// const NO_REFRESH_DOMAINS = [
//     'youtube.com',
//     'facebook.com',
//     'streamed.pk',
//     'cricstreams.', 
//     'website-vercel-helper-d-jaja-3-2.vercel.app',
//     'websitestream.netlify.app/?ch=Channel%20HD%2071'
// ];

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
// console.log(`[⏱️] Auto-Refresh Time Set To: ${FORCE_REFRESH_MINUTES} Minutes`);

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

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount = 0;

// // =========================================================================================
// // 🛡️ ADVANCED NETWORK INTELLIGENCE & NAVIGATION SHIELD
// // =========================================================================================
// async function setupNetworkAdBlocker(page) {
//     if (!page) return;
//     try {
//         await page.setRequestInterception(true);
//         page.on('request', (request) => {
//             const url = request.url().toLowerCase();
//             const type = request.resourceType();

//             // 🛑 Aggressive payload blocking added here
//             const adDomains = [
//                 'popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate', 
//                 'adrevenue', 'fanduel', 'adexchangerapid', 'doubleclick', 'propellerads'
//             ];

//             const isAdDomain = adDomains.some(keyword => url.includes(keyword));

//             if (isAdDomain) {
//                 console.log(`[🛡️] NETWORK SHIELD: Blocked known ad payload -> ${url.substring(0, 50)}...`);
//                 request.abort().catch(()=>{});
//                 return;
//             }

//             if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
//                 const adKeywords = ['bet', 'casino'];
//                 if (adKeywords.some(keyword => url.includes(keyword))) {
//                     request.abort().catch(()=>{});
//                     return;
//                 }
//             }

//             if (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone'))) {
//                 request.abort().catch(()=>{});
//             } else {
//                 request.continue().catch(()=>{});
//             }
//         });
//     } catch (e) { console.log('[⚠️] Request interception setup failed.'); }
// }

// async function applyPreloadFirewall(page) {
//     if (!page) return;
//     try {
//         await page.evaluateOnNewDocument(() => {
//             // =========================================================
//             // 🛑 ULTIMATE SHADOW DOM AD KILLER (Monkey Patching)
//             // =========================================================
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') {
//                     init.mode = 'open'; // Force open to allow inspection
//                 }
//                 const shadowRoot = originalAttachShadow.call(this, init);
                
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) {
//                         console.log('[🛡️] SHIELD: Shadow DOM Ad Detected & Destroyed!');
//                         this.remove(); // Kill the entire host element
//                     }
//                 });
                
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };

//             // Standard Protections
//             window.alert = function() {};
//             window.confirm = function() { return true; };
//             window.prompt = function() { return null; };
//             window.open = function() { return null; };
            
//             Object.defineProperty(window, 'onbeforeunload', {
//                 configurable: true,
//                 get: function() { return null; },
//                 set: function() { return null; }
//             });

//             document.addEventListener('click', (e) => {
//                 const target = e.target;
//                 if (target && (target.tagName === 'A' || target.closest('a'))) {
//                     const link = target.tagName === 'A' ? target : target.closest('a');
//                     if (link.href && !link.href.includes(window.location.hostname) && !link.href.includes('javascript')) {
//                         console.log("[🛡️] RE-DIRECT SHIELD: Blocked navigation to external ad domain.");
//                         e.preventDefault();
//                         e.stopPropagation();
//                         return false;
//                     }
//                 }
//             }, true);

//             const style = document.createElement('style');
//             style.textContent = `
//                 html, body { background-color: #000000 !important; overflow: hidden !important; }
//                 in-page-message, [id^="note-"], [id^="missclick-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }
//             `;
//             document.documentElement.appendChild(style);

//             const attachOverlay = () => {
//                 let target = document.body || document.documentElement;
//                 if (target && !document.getElementById('smart-stream-overlay')) {
//                     const overlay = document.createElement('div');
//                     overlay.id = 'smart-stream-overlay';
//                     overlay.innerHTML = `
//                         <style>
//                             #smart-stream-overlay {
//                                 position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                                 width: 100vw !important; height: 100vh !important; background: #000000 !important;
//                                 z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                                 justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                                 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                                 pointer-events: all !important;
//                             }
//                             .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                             .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                             .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                             @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                             @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                             .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                             .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                         </style>
//                         <div class="stream-spinner"></div>
//                         <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                         <div class="stream-title">STREAM LOADING</div>
//                         <div class="stream-sub">Connecting to secure stream engine...</div>
//                     `;
//                     target.appendChild(overlay);
//                 } else if (!target) {
//                     requestAnimationFrame(attachOverlay);
//                 }
//             };
//             attachOverlay();
//         });
//     } catch (e) {
//         console.log(`[🛡️] SYSTEM SHIELD: Preload firewall safe injection caught an error.`);
//     }
// }

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

//             if (overlay) {
//                 const titleEl = overlay.querySelector('.stream-title');
//                 const subEl = overlay.querySelector('.stream-sub');
//                 if (titleEl) titleEl.innerHTML = t;
//                 if (subEl) subEl.innerHTML = s;
                
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 overlay.style.setProperty('opacity', '1', 'important');
//                 overlay.style.setProperty('z-index', '2147483647', 'important');
//             } 
//             else {
//                 overlay = document.createElement('div');
//                 overlay.id = 'smart-stream-overlay';
//                 overlay.innerHTML = `
//                     <style>
//                         #smart-stream-overlay {
//                             position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                             width: 100vw !important; height: 100vh !important; background: #000000 !important;
//                             z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                             justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                             pointer-events: all !important;
//                         }
//                         .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                         .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                         .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                         @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                         @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                         .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                         .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                     </style>
//                     <div class="stream-spinner"></div>
//                     <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                     <div class="stream-title">${t}</div>
//                     <div class="stream-sub">${s}</div>
//                 `;
//                 document.documentElement.appendChild(overlay);
//             }
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'none', 'important');
//                 overlay.style.setProperty('opacity', '0', 'important');
//                 overlay.style.setProperty('z-index', '-9999', 'important');
//                 overlay.remove();
//             }
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
//                 "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true} ] } 
//             }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// function attachAntiAdListeners(page) {
//     page.on('dialog', async dialog => {
//         try { await dialog.dismiss(); } catch(e){}
//     });
// }

// // =========================================================================================
// // 🔊 2026 INTELLIGENT FUZZY UNMUTE ENGINE
// // =========================================================================================
// async function triggerSmartUnmute(page) {
//     for (const frame of page.frames()) {
//         try {
//             if (frame.isDetached()) continue;

//             await frame.evaluate(() => {
//                 const potentialElements = Array.from(document.querySelectorAll('button, div, span, a, i'));
                
//                 potentialElements.forEach(el => {
//                     const text = (el.innerText || el.textContent || '').trim().toUpperCase();
//                     const onClickStr = (el.getAttribute('onclick') || '').toLowerCase();
//                     const ariaLabel = (el.getAttribute('aria-label') || '').toUpperCase();
                    
//                     const matchesText = text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('STREAM UNMUTE') || text.includes('AUDIO');
//                     const matchesJS = onClickStr.includes('unmute') || onClickStr.includes('volume') || onClickStr.includes('audio');
//                     const matchesAria = ariaLabel.includes('UNMUTE') || ariaLabel.includes('VOLUME');

//                     if (matchesText || matchesJS || matchesAria) {
//                         const rect = el.getBoundingClientRect();
//                         const isVisible = rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';

//                         if (isVisible) {
//                             console.log(`[🔊 ENGINE]: Dynamically triggered click on element with text: "${text || 'JS Action'}"`);
//                             try { el.click(); } catch(e) {}
//                             try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch(e) {}
//                         }
//                     }
//                 });

//                 document.querySelectorAll('video, audio').forEach(media => {
//                     if (media.muted) {
//                         media.muted = false;
//                         media.volume = 1.0;
//                     }
//                 });
//             }).catch(() => {});
//         } catch (e) {}
//     }
// }
// // =========================================================================================

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

//                     // NAYA LOGIC: Hidden play button aur togglePlayPause ko direct trigger karega
//                     // NAYA LOGIC: Sirf tab click karega jab video sach mein paused ho
//                     const playedCustom = await frame.evaluate(() => {
//                         const playBtn = document.getElementById('play-pause-button');
                        
//                         // Agar button majood hai aur usme 'play' ki class hai (yani video ruki hui hai)
//                         if (playBtn && playBtn.classList.contains('play')) {
//                             if (typeof togglePlayPause === 'function') {
//                                 togglePlayPause();
//                                 return true;
//                             } else {
//                                 playBtn.click();
//                                 return true;
//                             }
//                         }
                        
//                         // Ek aur backup check iframe ke kisi aur play button ke liye
//                         const alternativeBtn = document.querySelector('.fp-playbtn.play');
//                         if (alternativeBtn) {
//                             alternativeBtn.click();
//                             return true;
//                         }
                        
//                         return false; // Agar pehle se chal rahi hai (class 'pause' hai) toh kuch na kare
//                     });

//                     if (playedCustom) {
//                         await takeAndBatchScreenshot(page, `smart-play-btn-clicked`);
//                         await new Promise(r => setTimeout(r, 3000));
//                         isVideoPlaying = true;
//                         break;
//                     }

//                     // STANDARD LOGIC: Baki normal players ke liye (Jaise JW Player, VideoJS waghera)
//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play, #hero-play-btn');
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

//         await page.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     document.documentElement.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('overflow', 'hidden', 'important');
//                     document.documentElement.style.setProperty('overflow', 'hidden', 'important');

//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = null; let maxScore = -1;

//                     iframes.forEach(ifr => {
//                         let width = ifr.clientWidth;
//                         let height = ifr.clientHeight;
//                         let area = width * height;

//                         if (area < 5000) return;

//                         let score = area;
                        
//                         if (ifr.hasAttribute('allowfullscreen') || 
//                             ifr.hasAttribute('webkitallowfullscreen') || 
//                             ifr.hasAttribute('mozallowfullscreen')) {
//                             score += 10000000; 
//                         }
                        
//                         if (height > width) {
//                             score = -1; 
//                         }

//                         if (score > maxScore) {
//                             maxScore = score;
//                             mainIframe = ifr;
//                         }
//                     });

//                     if (!mainIframe && iframes.length > 0) {
//                         mainIframe = iframes.find(ifr => 
//                             ifr.getAttribute('allowfullscreen') !== null || 
//                             (ifr.src && (ifr.src.includes('player') || ifr.src.includes('embed') || ifr.src.includes('stream') || ifr.src.includes('watch')))
//                         );
//                     }

//                     if (mainIframe) {
//                         iframes.forEach(ifr => {
//                             if (ifr !== mainIframe) {
//                                 ifr.style.setProperty('display', 'none', 'important');
//                                 ifr.style.setProperty('opacity', '0', 'important');
//                                 ifr.style.setProperty('z-index', '-9999', 'important');
                                
//                                 if (ifr.parentNode && ifr.parentNode !== document.body) {
//                                     try { 
//                                         ifr.parentNode.style.setProperty('display', 'none', 'important'); 
//                                         ifr.parentNode.style.setProperty('opacity', '0', 'important');
//                                     } catch(e) {}
//                                 }
//                             }
//                         });

//                         mainIframe.style.setProperty('position', 'fixed', 'important');
//                         mainIframe.style.setProperty('top', '0px', 'important');
//                         mainIframe.style.setProperty('left', '0px', 'important');
//                         mainIframe.style.setProperty('width', '100vw', 'important');
//                         mainIframe.style.setProperty('height', '100vh', 'important');
//                         mainIframe.style.setProperty('z-index', '2147483645', 'important'); 
//                         mainIframe.style.setProperty('background-color', 'black', 'important');
//                         mainIframe.style.setProperty('border', 'none', 'important');
//                         mainIframe.style.setProperty('opacity', '1', 'important');
//                         mainIframe.style.setProperty('display', 'block', 'important');
//                         mainIframe.style.setProperty('visibility', 'visible', 'important');
//                     }

//                     const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay), [id*="pop"], [class*="pop"], a[href*="extension"], [class*="notification"], [id*="notification"]';
//                     document.querySelectorAll(junkClasses).forEach(el => { 
//                         try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } 
//                     });

//                     const adKeywords = ['jerk', 'mate', 'free', 'online', 'adult', 'dating', 'close', 'notification', 'justine', 'paying', 'job'];
//                     document.querySelectorAll('div, section, span, a').forEach(el => {
//                         if (el.id === 'smart-stream-overlay') return;
                        
//                         const style = window.getComputedStyle(el);
//                         const isFloating = style.position === 'fixed' || style.position === 'absolute';
                        
//                         if (isFloating && el.innerText) {
//                             const textLower = el.innerText.toLowerCase();
//                             const hasBadKeyword = adKeywords.some(keyword => textLower.includes(keyword));
                            
//                             if (hasBadKeyword || (parseInt(style.zIndex) > 100000 && !el.querySelector('video') && !el.querySelector('iframe'))) {
//                                 try { el.remove(); } catch(e) { el.style.setProperty('display', 'none', 'important'); }
//                             }
//                         }
//                     });

//                 } catch (err) {}
//             }, 500); 
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
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (!realVideo && videos.length > 0) {
//                         realVideo = videos[0];
//                     }

//                     if (realVideo) { 
//                         realVideo.style.setProperty('position', 'fixed', 'important');
//                         realVideo.style.setProperty('top', '0px', 'important');
//                         realVideo.style.setProperty('left', '0px', 'important');
//                         realVideo.style.setProperty('width', '100vw', 'important');
//                         realVideo.style.setProperty('height', '100vh', 'important');
//                         realVideo.style.setProperty('z-index', '2147483646', 'important'); 
//                         realVideo.style.setProperty('background-color', 'black', 'important');
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         realVideo.style.setProperty('opacity', '1', 'important');
//                         realVideo.style.setProperty('visibility', 'visible', 'important');
//                         realVideo.style.setProperty('display', 'block', 'important');
//                     }
//                 } catch(err) {}
//             }, 500); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     await triggerSmartUnmute(page);
//     await new Promise(r => setTimeout(r, 1000));
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
                        
//                         if (targetV && !targetV.ended && targetV.currentTime > 0) {
//                             let frames = 0;
//                             if (targetV.getVideoPlaybackQuality) {
//                                 frames = targetV.getVideoPlaybackQuality().totalVideoFrames;
//                             } else if (targetV.webkitDecodedFrameCount !== undefined) {
//                                 frames = targetV.webkitDecodedFrameCount;
//                             }
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

// async function startWatchdog() {
//     let watchdogTicks = 0;
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     const WARMUP_MAX_TIME = 15000; 

//     let activeUrlStr = urlList[currentUrlIndex];
//     let backupUrlStr = urlList[backupUrlIndex];

//     let currentStreamStartTime = Date.now();

//     while (true) {
//         if (!browser || !browser.isConnected()) throw new Error("Browser closed.");

//         let activeStatus = await checkPageStatus(activePage);

//         if (activeStatus.status === 'HEALTHY' && !isWarmupPhase) {
//             let elapsedMs = Date.now() - currentStreamStartTime;
//             let isExempted = NO_REFRESH_DOMAINS.some(domain => activeUrlStr.includes(domain));

//             if (elapsedMs > FORCE_REFRESH_MS) {
//                 if (!isExempted) {
//                     console.log(`\n[⏱️ PROACTIVE REFRESH]: Stream ran smoothly for ${FORCE_REFRESH_MINUTES} minutes! Forcing SAME LINK swap to keep connection fresh...`);
//                     activeStatus.status = 'FORCE_REFRESH'; 
//                 }
//             }
//         }

//         if (activeStatus.status === 'HEALTHY') {
//             await hideLoadingUI(activePage); 
//             isWarmupPhase = false; 

//             await triggerSmartUnmute(activePage);
            
//             for (const frame of activePage.frames()) {
//         try {
//             if (!frame.isDetached()) {
//                 await frame.evaluate(() => { 
//                     document.querySelectorAll('video, audio').forEach(m => { 
//                         m.muted = false; 
//                         m.volume = 1.0; 
                        
//                         // 🛑 NAYA LOGIC: Agar video pause ho gayi hai toh force play karein
//                         if (m.tagName === 'VIDEO' && m.paused && !m.ended && m.currentTime > 0) {
//                             try {
//                                 console.log('[▶️] Auto-resuming paused video...');
//                                 let p = m.play();
//                                 if (p !== undefined) p.catch(() => {});
//                             } catch(e) {}
//                         }
//                     }); 
//                     document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                 });
//             }
//         } catch(e) {}
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
        
//         if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
//             console.log(`\n[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
            
//             if (activeStatus.status === 'HEALTHY') {
//                 console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//                 console.log(`[⏭️] NEXT IN QUEUE    : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//             } else {
//                 console.log(`[⚠️] STREAM IS NOT ACTIVE: Waiting for system to recover or swap...`);
//             }
//         }

//         if (watchdogTicks % 120 === 0) {
//             await takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
//         }

//         if (activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH') {
            
//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 console.log(`[⏳] Watchdog detected '${activeStatus.status}', but stream is in WARM-UP phase. Waiting...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             }

//             let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

//             if (isProactiveRefresh) {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] 🔄 PROACTIVE REFRESH TRIGGERED`);
//                 console.log(`[*] Preparing a FRESH copy of SAME Server [${currentUrlIndex}] in background...`);
//                 console.log(`==================================================`);
                
//                 for (const frame of activePage.frames()) {
//                     try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                 }

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{});
//                 } catch(e) {
//                     console.log(`[⏳] Proactive refresh buffer navigation handled safely.`);
//                 }
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
//                 console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`==================================================`);
//                 await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
//             }
            
//             console.log(`[*] Checking Backup Tab status before switching...`);
//             let backupStatus = await checkPageStatus(backupPage);

//             if (backupStatus.status === 'HEALTHY' || backupStatus.status === 'DEAD') { 
                
//                 if (!isProactiveRefresh) {
//                     for (const frame of activePage.frames()) {
//                         try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                     }
//                 }
                
//                 await showLoadingUI(backupPage, isProactiveRefresh ? "REFRESHING CONNECTION" : "RECONNECTING", isProactiveRefresh ? "Optimizing current server stream <span class='stream-blink'>...</span>" : "Establishing secure connection to backup server <span class='stream-blink'>...</span>");
//                 await backupPage.bringToFront();
//                 await new Promise(r => setTimeout(r, 1000)); 
                
//                 try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                 console.log(`[*] Initializing Video on the newly active tab...`);
//                 await initializeVideo(backupPage, false, true); 
//                 await hideLoadingUI(backupPage);

//                 let brokenPage = activePage; activePage = backupPage; backupPage = brokenPage;

//                 if (!isProactiveRefresh) {
//                     currentUrlIndex = backupUrlIndex; activeUrlStr = urlList[currentUrlIndex]; 
//                     backupUrlIndex = (backupUrlIndex + 1) % urlList.length; backupUrlStr = urlList[backupUrlIndex]; 
//                 } 

//                 console.log(`\n==================================================`);
//                 console.log(isProactiveRefresh ? `[🔄] SAME-SERVER FRESH SWAP EXECUTED SUCCESSFULLY` : `[🔄] SMART HOT-SWAP TO NEXT SERVER EXECUTED SUCCESSFULLY`);
//                 console.log(`==================================================`);
//                 console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`[🔊] LIVE AUDIO STATUS : ON (Unmuted & Forced)`);
//                 console.log(`--------------------------------------------------`);
//                 console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//                 console.log(`[🔇] BACKUP AUDIO      : MUTED (Background Loading)`);
//                 console.log(`==================================================\n`);

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 } catch (e) {
//                     console.log(`[⏳] Background buffer navigation handled safely.`);
//                 }
                
//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true;
//                 currentStreamStartTime = Date.now();

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
//             console.log('[+] Enforced WaitingScene (Loading Bar Buffer Active)');
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
//         '--disable-renderer-backgrounding',
        
//         `--disable-extensions-except=${path.join(process.cwd(), 'ublock-lite')}`,
//         `--load-extension=${path.join(process.cwd(), 'ublock-lite')}`
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

//     const pages = await browser.pages();
//     activePage = pages[0]; 
//     backupPage = await browser.newPage();
    
//     await setupNetworkAdBlocker(activePage);
//     await setupNetworkAdBlocker(backupPage);

//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await applyPreloadFirewall(activePage);
//     await applyPreloadFirewall(backupPage);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex]}`);
//     await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });
    
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     await initializeVideo(activePage, false, true); 
//     await hideLoadingUI(activePage); 

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex]}`);
//     backupPage.goto(urlList[backupUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 
//     await hideLoadingUI(activePage);

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










































































































// ============= ads bypass done alhamdullah dlhd server 3 ===============





// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD (2026 LATEST FIX)
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     if (err.message && err.message.includes('Requesting main frame too early')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored stealth plugin background frame error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNCAUGHT EXCEPTION: ${err.message}`);
//     }
// });

// process.on('unhandledRejection', (reason, promise) => {
//     let msg = reason && reason.message ? reason.message : reason;
//     if (msg && msg.includes('Protocol error')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored detached frame protocol error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNHANDLED REJECTION: ${msg}`);
//     }
// });
// // =========================================================================================

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME (IN MINUTES)
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 40; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// // =========================================================================================
// // 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// // =========================================================================================
// const NO_REFRESH_DOMAINS = [
//     'youtube.com',
//     'facebook.com',
//     'streamed.pk',
//     'cricstreams.', 
//     'website-vercel-helper-d-jaja-3-2.vercel.app',
//     'websitestream.netlify.app/?ch=Channel%20HD%2071'
// ];

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
// console.log(`[⏱️] Auto-Refresh Time Set To: ${FORCE_REFRESH_MINUTES} Minutes`);

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

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount = 0;

// // =========================================================================================
// // 🛡️ ADVANCED NETWORK INTELLIGENCE & NAVIGATION SHIELD
// // =========================================================================================
// async function setupNetworkAdBlocker(page) {
//     if (!page) return;
//     try {
//         await page.setRequestInterception(true);
//         page.on('request', (request) => {
//             const url = request.url().toLowerCase();
//             const type = request.resourceType();

//             // 🛑 Aggressive payload blocking added here
//             const adDomains = [
//                 'popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate', 
//                 'adrevenue', 'fanduel', 'adexchangerapid', 'doubleclick', 'propellerads'
//             ];

//             const isAdDomain = adDomains.some(keyword => url.includes(keyword));

//             if (isAdDomain) {
//                 console.log(`[🛡️] NETWORK SHIELD: Blocked known ad payload -> ${url.substring(0, 50)}...`);
//                 request.abort().catch(()=>{});
//                 return;
//             }

//             if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
//                 const adKeywords = ['bet', 'casino'];
//                 if (adKeywords.some(keyword => url.includes(keyword))) {
//                     request.abort().catch(()=>{});
//                     return;
//                 }
//             }

//             if (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone'))) {
//                 request.abort().catch(()=>{});
//             } else {
//                 request.continue().catch(()=>{});
//             }
//         });
//     } catch (e) { console.log('[⚠️] Request interception setup failed.'); }
// }

// async function applyPreloadFirewall(page) {
//     if (!page) return;
//     try {
//         await page.evaluateOnNewDocument(() => {
//             // =========================================================
//             // 🛑 ULTIMATE SHADOW DOM AD KILLER (Monkey Patching)
//             // =========================================================
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') {
//                     init.mode = 'open'; // Force open to allow inspection
//                 }
//                 const shadowRoot = originalAttachShadow.call(this, init);
                
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) {
//                         console.log('[🛡️] SHIELD: Shadow DOM Ad Detected & Destroyed!');
//                         this.remove(); // Kill the entire host element
//                     }
//                 });
                
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };

//             // Standard Protections
//             window.alert = function() {};
//             window.confirm = function() { return true; };
//             window.prompt = function() { return null; };
//             window.open = function() { return null; };
            
//             Object.defineProperty(window, 'onbeforeunload', {
//                 configurable: true,
//                 get: function() { return null; },
//                 set: function() { return null; }
//             });

//             document.addEventListener('click', (e) => {
//                 const target = e.target;
//                 if (target && (target.tagName === 'A' || target.closest('a'))) {
//                     const link = target.tagName === 'A' ? target : target.closest('a');
//                     if (link.href && !link.href.includes(window.location.hostname) && !link.href.includes('javascript')) {
//                         console.log("[🛡️] RE-DIRECT SHIELD: Blocked navigation to external ad domain.");
//                         e.preventDefault();
//                         e.stopPropagation();
//                         return false;
//                     }
//                 }
//             }, true);

//             const style = document.createElement('style');
//             style.textContent = `
//                 html, body { background-color: #000000 !important; overflow: hidden !important; }
//                 in-page-message, [id^="note-"], [id^="missclick-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }
//             `;
//             document.documentElement.appendChild(style);

//             const attachOverlay = () => {
//                 let target = document.body || document.documentElement;
//                 if (target && !document.getElementById('smart-stream-overlay')) {
//                     const overlay = document.createElement('div');
//                     overlay.id = 'smart-stream-overlay';
//                     overlay.innerHTML = `
//                         <style>
//                             #smart-stream-overlay {
//                                 position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                                 width: 100vw !important; height: 100vh !important; background: #000000 !important;
//                                 z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                                 justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                                 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                                 pointer-events: all !important;
//                             }
//                             .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                             .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                             .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                             @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                             @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                             .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                             .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                         </style>
//                         <div class="stream-spinner"></div>
//                         <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                         <div class="stream-title">STREAM LOADING</div>
//                         <div class="stream-sub">Connecting to secure stream engine...</div>
//                     `;
//                     target.appendChild(overlay);
//                 } else if (!target) {
//                     requestAnimationFrame(attachOverlay);
//                 }
//             };
//             attachOverlay();
//         });
//     } catch (e) {
//         console.log(`[🛡️] SYSTEM SHIELD: Preload firewall safe injection caught an error.`);
//     }
// }

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

//             if (overlay) {
//                 const titleEl = overlay.querySelector('.stream-title');
//                 const subEl = overlay.querySelector('.stream-sub');
//                 if (titleEl) titleEl.innerHTML = t;
//                 if (subEl) subEl.innerHTML = s;
                
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 overlay.style.setProperty('opacity', '1', 'important');
//                 overlay.style.setProperty('z-index', '2147483647', 'important');
//             } 
//             else {
//                 overlay = document.createElement('div');
//                 overlay.id = 'smart-stream-overlay';
//                 overlay.innerHTML = `
//                     <style>
//                         #smart-stream-overlay {
//                             position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                             width: 100vw !important; height: 100vh !important; background: #000000 !important;
//                             z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                             justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                             pointer-events: all !important;
//                         }
//                         .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                         .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                         .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                         @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                         @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                         .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                         .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                     </style>
//                     <div class="stream-spinner"></div>
//                     <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                     <div class="stream-title">${t}</div>
//                     <div class="stream-sub">${s}</div>
//                 `;
//                 document.documentElement.appendChild(overlay);
//             }
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'none', 'important');
//                 overlay.style.setProperty('opacity', '0', 'important');
//                 overlay.style.setProperty('z-index', '-9999', 'important');
//                 overlay.remove();
//             }
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
//                 "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true} ] } 
//             }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// function attachAntiAdListeners(page) {
//     page.on('dialog', async dialog => {
//         try { await dialog.dismiss(); } catch(e){}
//     });
// }

// // =========================================================================================
// // 🔊 2026 INTELLIGENT FUZZY UNMUTE ENGINE
// // =========================================================================================
// async function triggerSmartUnmute(page) {
//     for (const frame of page.frames()) {
//         try {
//             if (frame.isDetached()) continue;

//             await frame.evaluate(() => {
//                 const potentialElements = Array.from(document.querySelectorAll('button, div, span, a, i'));
                
//                 potentialElements.forEach(el => {
//                     const text = (el.innerText || el.textContent || '').trim().toUpperCase();
//                     const onClickStr = (el.getAttribute('onclick') || '').toLowerCase();
//                     const ariaLabel = (el.getAttribute('aria-label') || '').toUpperCase();
                    
//                     const matchesText = text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('STREAM UNMUTE') || text.includes('AUDIO');
//                     const matchesJS = onClickStr.includes('unmute') || onClickStr.includes('volume') || onClickStr.includes('audio');
//                     const matchesAria = ariaLabel.includes('UNMUTE') || ariaLabel.includes('VOLUME');

//                     if (matchesText || matchesJS || matchesAria) {
//                         const rect = el.getBoundingClientRect();
//                         const isVisible = rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';

//                         if (isVisible) {
//                             console.log(`[🔊 ENGINE]: Dynamically triggered click on element with text: "${text || 'JS Action'}"`);
//                             try { el.click(); } catch(e) {}
//                             try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch(e) {}
//                         }
//                     }
//                 });

//                 document.querySelectorAll('video, audio').forEach(media => {
//                     if (media.muted) {
//                         media.muted = false;
//                         media.volume = 1.0;
//                     }
//                 });
//             }).catch(() => {});
//         } catch (e) {}
//     }
// }
// // =========================================================================================

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

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play, #hero-play-btn');
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

//         await page.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     document.documentElement.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('overflow', 'hidden', 'important');
//                     document.documentElement.style.setProperty('overflow', 'hidden', 'important');

//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = null; let maxScore = -1;

//                     iframes.forEach(ifr => {
//                         let width = ifr.clientWidth;
//                         let height = ifr.clientHeight;
//                         let area = width * height;

//                         if (area < 5000) return;

//                         let score = area;
                        
//                         if (ifr.hasAttribute('allowfullscreen') || 
//                             ifr.hasAttribute('webkitallowfullscreen') || 
//                             ifr.hasAttribute('mozallowfullscreen')) {
//                             score += 10000000; 
//                         }
                        
//                         if (height > width) {
//                             score = -1; 
//                         }

//                         if (score > maxScore) {
//                             maxScore = score;
//                             mainIframe = ifr;
//                         }
//                     });

//                     if (!mainIframe && iframes.length > 0) {
//                         mainIframe = iframes.find(ifr => 
//                             ifr.getAttribute('allowfullscreen') !== null || 
//                             (ifr.src && (ifr.src.includes('player') || ifr.src.includes('embed') || ifr.src.includes('stream') || ifr.src.includes('watch')))
//                         );
//                     }

//                     if (mainIframe) {
//                         iframes.forEach(ifr => {
//                             if (ifr !== mainIframe) {
//                                 ifr.style.setProperty('display', 'none', 'important');
//                                 ifr.style.setProperty('opacity', '0', 'important');
//                                 ifr.style.setProperty('z-index', '-9999', 'important');
                                
//                                 if (ifr.parentNode && ifr.parentNode !== document.body) {
//                                     try { 
//                                         ifr.parentNode.style.setProperty('display', 'none', 'important'); 
//                                         ifr.parentNode.style.setProperty('opacity', '0', 'important');
//                                     } catch(e) {}
//                                 }
//                             }
//                         });

//                         mainIframe.style.setProperty('position', 'fixed', 'important');
//                         mainIframe.style.setProperty('top', '0px', 'important');
//                         mainIframe.style.setProperty('left', '0px', 'important');
//                         mainIframe.style.setProperty('width', '100vw', 'important');
//                         mainIframe.style.setProperty('height', '100vh', 'important');
//                         mainIframe.style.setProperty('z-index', '2147483645', 'important'); 
//                         mainIframe.style.setProperty('background-color', 'black', 'important');
//                         mainIframe.style.setProperty('border', 'none', 'important');
//                         mainIframe.style.setProperty('opacity', '1', 'important');
//                         mainIframe.style.setProperty('display', 'block', 'important');
//                         mainIframe.style.setProperty('visibility', 'visible', 'important');
//                     }

//                     const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay), [id*="pop"], [class*="pop"], a[href*="extension"], [class*="notification"], [id*="notification"]';
//                     document.querySelectorAll(junkClasses).forEach(el => { 
//                         try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } 
//                     });

//                     const adKeywords = ['jerk', 'mate', 'free', 'online', 'adult', 'dating', 'close', 'notification', 'justine', 'paying', 'job'];
//                     document.querySelectorAll('div, section, span, a').forEach(el => {
//                         if (el.id === 'smart-stream-overlay') return;
                        
//                         const style = window.getComputedStyle(el);
//                         const isFloating = style.position === 'fixed' || style.position === 'absolute';
                        
//                         if (isFloating && el.innerText) {
//                             const textLower = el.innerText.toLowerCase();
//                             const hasBadKeyword = adKeywords.some(keyword => textLower.includes(keyword));
                            
//                             if (hasBadKeyword || (parseInt(style.zIndex) > 100000 && !el.querySelector('video') && !el.querySelector('iframe'))) {
//                                 try { el.remove(); } catch(e) { el.style.setProperty('display', 'none', 'important'); }
//                             }
//                         }
//                     });

//                 } catch (err) {}
//             }, 500); 
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
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (!realVideo && videos.length > 0) {
//                         realVideo = videos[0];
//                     }

//                     if (realVideo) { 
//                         realVideo.style.setProperty('position', 'fixed', 'important');
//                         realVideo.style.setProperty('top', '0px', 'important');
//                         realVideo.style.setProperty('left', '0px', 'important');
//                         realVideo.style.setProperty('width', '100vw', 'important');
//                         realVideo.style.setProperty('height', '100vh', 'important');
//                         realVideo.style.setProperty('z-index', '2147483646', 'important'); 
//                         realVideo.style.setProperty('background-color', 'black', 'important');
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         realVideo.style.setProperty('opacity', '1', 'important');
//                         realVideo.style.setProperty('visibility', 'visible', 'important');
//                         realVideo.style.setProperty('display', 'block', 'important');
//                     }
//                 } catch(err) {}
//             }, 500); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     await triggerSmartUnmute(page);
//     await new Promise(r => setTimeout(r, 1000));
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
                        
//                         if (targetV && !targetV.ended && targetV.currentTime > 0) {
//                             let frames = 0;
//                             if (targetV.getVideoPlaybackQuality) {
//                                 frames = targetV.getVideoPlaybackQuality().totalVideoFrames;
//                             } else if (targetV.webkitDecodedFrameCount !== undefined) {
//                                 frames = targetV.webkitDecodedFrameCount;
//                             }
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

// async function startWatchdog() {
//     let watchdogTicks = 0;
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     const WARMUP_MAX_TIME = 15000; 

//     let activeUrlStr = urlList[currentUrlIndex];
//     let backupUrlStr = urlList[backupUrlIndex];

//     let currentStreamStartTime = Date.now();

//     while (true) {
//         if (!browser || !browser.isConnected()) throw new Error("Browser closed.");

//         let activeStatus = await checkPageStatus(activePage);

//         if (activeStatus.status === 'HEALTHY' && !isWarmupPhase) {
//             let elapsedMs = Date.now() - currentStreamStartTime;
//             let isExempted = NO_REFRESH_DOMAINS.some(domain => activeUrlStr.includes(domain));

//             if (elapsedMs > FORCE_REFRESH_MS) {
//                 if (!isExempted) {
//                     console.log(`\n[⏱️ PROACTIVE REFRESH]: Stream ran smoothly for ${FORCE_REFRESH_MINUTES} minutes! Forcing SAME LINK swap to keep connection fresh...`);
//                     activeStatus.status = 'FORCE_REFRESH'; 
//                 }
//             }
//         }

//         if (activeStatus.status === 'HEALTHY') {
//             await hideLoadingUI(activePage); 
//             isWarmupPhase = false; 

//             await triggerSmartUnmute(activePage);
            
//             for (const frame of activePage.frames()) {
//         try {
//             if (!frame.isDetached()) {
//                 await frame.evaluate(() => { 
//                     document.querySelectorAll('video, audio').forEach(m => { 
//                         m.muted = false; 
//                         m.volume = 1.0; 
                        
//                         // 🛑 NAYA LOGIC: Agar video pause ho gayi hai toh force play karein
//                         if (m.tagName === 'VIDEO' && m.paused && !m.ended && m.currentTime > 0) {
//                             try {
//                                 console.log('[▶️] Auto-resuming paused video...');
//                                 let p = m.play();
//                                 if (p !== undefined) p.catch(() => {});
//                             } catch(e) {}
//                         }
//                     }); 
//                     document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                 });
//             }
//         } catch(e) {}
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
        
//         if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
//             console.log(`\n[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
            
//             if (activeStatus.status === 'HEALTHY') {
//                 console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//                 console.log(`[⏭️] NEXT IN QUEUE    : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//             } else {
//                 console.log(`[⚠️] STREAM IS NOT ACTIVE: Waiting for system to recover or swap...`);
//             }
//         }

//         if (watchdogTicks % 120 === 0) {
//             await takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
//         }

//         if (activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH') {
            
//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 console.log(`[⏳] Watchdog detected '${activeStatus.status}', but stream is in WARM-UP phase. Waiting...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             }

//             let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

//             if (isProactiveRefresh) {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] 🔄 PROACTIVE REFRESH TRIGGERED`);
//                 console.log(`[*] Preparing a FRESH copy of SAME Server [${currentUrlIndex}] in background...`);
//                 console.log(`==================================================`);
                
//                 for (const frame of activePage.frames()) {
//                     try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                 }

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{});
//                 } catch(e) {
//                     console.log(`[⏳] Proactive refresh buffer navigation handled safely.`);
//                 }
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
//                 console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`==================================================`);
//                 await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
//             }
            
//             console.log(`[*] Checking Backup Tab status before switching...`);
//             let backupStatus = await checkPageStatus(backupPage);

//             if (backupStatus.status === 'HEALTHY' || backupStatus.status === 'DEAD') { 
                
//                 if (!isProactiveRefresh) {
//                     for (const frame of activePage.frames()) {
//                         try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                     }
//                 }
                
//                 await showLoadingUI(backupPage, isProactiveRefresh ? "REFRESHING CONNECTION" : "RECONNECTING", isProactiveRefresh ? "Optimizing current server stream <span class='stream-blink'>...</span>" : "Establishing secure connection to backup server <span class='stream-blink'>...</span>");
//                 await backupPage.bringToFront();
//                 await new Promise(r => setTimeout(r, 1000)); 
                
//                 try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                 console.log(`[*] Initializing Video on the newly active tab...`);
//                 await initializeVideo(backupPage, false, true); 
//                 await hideLoadingUI(backupPage);

//                 let brokenPage = activePage; activePage = backupPage; backupPage = brokenPage;

//                 if (!isProactiveRefresh) {
//                     currentUrlIndex = backupUrlIndex; activeUrlStr = urlList[currentUrlIndex]; 
//                     backupUrlIndex = (backupUrlIndex + 1) % urlList.length; backupUrlStr = urlList[backupUrlIndex]; 
//                 } 

//                 console.log(`\n==================================================`);
//                 console.log(isProactiveRefresh ? `[🔄] SAME-SERVER FRESH SWAP EXECUTED SUCCESSFULLY` : `[🔄] SMART HOT-SWAP TO NEXT SERVER EXECUTED SUCCESSFULLY`);
//                 console.log(`==================================================`);
//                 console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`[🔊] LIVE AUDIO STATUS : ON (Unmuted & Forced)`);
//                 console.log(`--------------------------------------------------`);
//                 console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//                 console.log(`[🔇] BACKUP AUDIO      : MUTED (Background Loading)`);
//                 console.log(`==================================================\n`);

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 } catch (e) {
//                     console.log(`[⏳] Background buffer navigation handled safely.`);
//                 }
                
//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true;
//                 currentStreamStartTime = Date.now();

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
//             console.log('[+] Enforced WaitingScene (Loading Bar Buffer Active)');
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
//         '--disable-renderer-backgrounding',
        
//         `--disable-extensions-except=${path.join(process.cwd(), 'ublock-lite')}`,
//         `--load-extension=${path.join(process.cwd(), 'ublock-lite')}`
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

//     const pages = await browser.pages();
//     activePage = pages[0]; 
//     backupPage = await browser.newPage();
    
//     await setupNetworkAdBlocker(activePage);
//     await setupNetworkAdBlocker(backupPage);

//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await applyPreloadFirewall(activePage);
//     await applyPreloadFirewall(backupPage);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex]}`);
//     await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });
    
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     await initializeVideo(activePage, false, true); 
//     await hideLoadingUI(activePage); 

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex]}`);
//     backupPage.goto(urlList[backupUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 
//     await hideLoadingUI(activePage);

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





























































































































































// ================== 2  ================


// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD (2026 LATEST FIX)
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     if (err.message && err.message.includes('Requesting main frame too early')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored stealth plugin background frame error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNCAUGHT EXCEPTION: ${err.message}`);
//     }
// });

// process.on('unhandledRejection', (reason, promise) => {
//     let msg = reason && reason.message ? reason.message : reason;
//     if (msg && msg.includes('Protocol error')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored detached frame protocol error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNHANDLED REJECTION: ${msg}`);
//     }
// });
// // =========================================================================================

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME (IN MINUTES)
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 40; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// // =========================================================================================
// // 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// // =========================================================================================
// const NO_REFRESH_DOMAINS = [
//     'youtube.com',
//     'facebook.com',
//     'streamed.pk',
//     'cricstreams.', 
//     'website-vercel-helper-d-jaja-3-2.vercel.app',
//     'websitestream.netlify.app/?ch=Channel%20HD%2071'
// ];

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
// console.log(`[⏱️] Auto-Refresh Time Set To: ${FORCE_REFRESH_MINUTES} Minutes`);

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

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount = 0;

// // =========================================================================================
// // 🛡️ ADVANCED NETWORK INTELLIGENCE & NAVIGATION SHIELD
// // =========================================================================================
// async function setupNetworkAdBlocker(page) {
//     if (!page) return;
//     try {
//         await page.setRequestInterception(true);
//         page.on('request', (request) => {
//             const url = request.url().toLowerCase();
//             const type = request.resourceType();

//             if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
//                 const targetUrl = request.url().toLowerCase();
//                 const adKeywords = ['popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate', 'adrevenue', 'fanduel', 'bet', 'casino'];
//                 const isMaliciousAd = adKeywords.some(keyword => targetUrl.includes(keyword));

//                 if (isMaliciousAd) {
//                     console.log(`[🛡️] NAVIGATION SHIELD: Blocked malicious ad redirection to -> ${targetUrl.substring(0, 70)}...`);
//                     request.abort().catch(()=>{});
//                     return;
//                 }
//             }

//             if (
//                 url.includes('popads') || 
//                 url.includes('exoclick') || 
//                 url.includes('adsterra') || 
//                 url.includes('onclickads') || 
//                 url.includes('jerkmate') ||
//                 url.includes('adrevenue') ||
//                 url.includes('fanduel') ||
//                 url.includes('doubleclick') ||
//                 (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone')))
//             ) {
//                 request.abort().catch(()=>{});
//             } else {
//                 request.continue().catch(()=>{});
//             }
//         });
//     } catch (e) { console.log('[⚠️] Request interception setup failed.'); }
// }

// async function applyPreloadFirewall(page) {
//     if (!page) return;
//     try {
//         await page.evaluateOnNewDocument(() => {
//             window.alert = function() {};
//             window.confirm = function() { return true; };
//             window.prompt = function() { return null; };
//             window.open = function() { return null; };
            
//             Object.defineProperty(window, 'onbeforeunload', {
//                 configurable: true,
//                 get: function() { return null; },
//                 set: function() { return null; }
//             });

//             document.addEventListener('click', (e) => {
//                 const target = e.target;
//                 if (target && (target.tagName === 'A' || target.closest('a'))) {
//                     const link = target.tagName === 'A' ? target : target.closest('a');
//                     if (link.href && !link.href.includes(window.location.hostname) && !link.href.includes('javascript')) {
//                         console.log("[🛡️] RE-DIRECT SHIELD: Blocked navigation to external ad domain.");
//                         e.preventDefault();
//                         e.stopPropagation();
//                         return false;
//                     }
//                 }
//             }, true);

//             const style = document.createElement('style');
//             style.textContent = `html, body { background-color: #000000 !important; overflow: hidden !important; }`;
//             document.documentElement.appendChild(style);

//             const attachOverlay = () => {
//                 let target = document.body || document.documentElement;
//                 if (target && !document.getElementById('smart-stream-overlay')) {
//                     const overlay = document.createElement('div');
//                     overlay.id = 'smart-stream-overlay';
//                     overlay.innerHTML = `
//                         <style>
//                             #smart-stream-overlay {
//                                 position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                                 width: 100vw !important; height: 100vh !important; background: #000000 !important;
//                                 z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                                 justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                                 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                                 pointer-events: all !important;
//                             }
//                             .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                             .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                             .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                             @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                             @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                             .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                             .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                         </style>
//                         <div class="stream-spinner"></div>
//                         <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                         <div class="stream-title">STREAM LOADING</div>
//                         <div class="stream-sub">Connecting to secure stream engine...</div>
//                     `;
//                     target.appendChild(overlay);
//                 } else if (!target) {
//                     requestAnimationFrame(attachOverlay);
//                 }
//             };
//             attachOverlay();
//         });
//     } catch (e) {
//         console.log(`[🛡️] SYSTEM SHIELD: Preload firewall safe injection caught an error.`);
//     }
// }

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

//             if (overlay) {
//                 const titleEl = overlay.querySelector('.stream-title');
//                 const subEl = overlay.querySelector('.stream-sub');
//                 if (titleEl) titleEl.innerHTML = t;
//                 if (subEl) subEl.innerHTML = s;
                
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 overlay.style.setProperty('opacity', '1', 'important');
//                 overlay.style.setProperty('z-index', '2147483647', 'important');
//             } 
//             else {
//                 overlay = document.createElement('div');
//                 overlay.id = 'smart-stream-overlay';
//                 overlay.innerHTML = `
//                     <style>
//                         #smart-stream-overlay {
//                             position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                             width: 100vw !important; height: 100vh !important; background: #000000 !important;
//                             z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                             justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                             pointer-events: all !important;
//                         }
//                         .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                         .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                         .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                         @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                         @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                         .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                         .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                         .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
//                         @keyframes blinker { 50% { opacity: 0.3; } }
//                     </style>
//                     <div class="stream-spinner"></div>
//                     <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                     <div class="stream-title">${t}</div>
//                     <div class="stream-sub">${s}</div>
//                 `;
//                 document.documentElement.appendChild(overlay);
//             }
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'none', 'important');
//                 overlay.style.setProperty('opacity', '0', 'important');
//                 overlay.style.setProperty('z-index', '-9999', 'important');
//                 overlay.remove();
//             }
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
//                 "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true} ] } 
//             }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// function attachAntiAdListeners(page) {
//     page.on('dialog', async dialog => {
//         try { await dialog.dismiss(); } catch(e){}
//     });
// }

// // =========================================================================================
// // 🔊 2026 INTELLIGENT FUZZY UNMUTE ENGINE
// // =========================================================================================
// async function triggerSmartUnmute(page) {
//     for (const frame of page.frames()) {
//         try {
//             if (frame.isDetached()) continue;

//             await frame.evaluate(() => {
//                 const potentialElements = Array.from(document.querySelectorAll('button, div, span, a, i'));
                
//                 potentialElements.forEach(el => {
//                     const text = (el.innerText || el.textContent || '').trim().toUpperCase();
//                     const onClickStr = (el.getAttribute('onclick') || '').toLowerCase();
//                     const ariaLabel = (el.getAttribute('aria-label') || '').toUpperCase();
                    
//                     const matchesText = text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('STREAM UNMUTE') || text.includes('AUDIO');
//                     const matchesJS = onClickStr.includes('unmute') || onClickStr.includes('volume') || onClickStr.includes('audio');
//                     const matchesAria = ariaLabel.includes('UNMUTE') || ariaLabel.includes('VOLUME');

//                     if (matchesText || matchesJS || matchesAria) {
//                         const rect = el.getBoundingClientRect();
//                         const isVisible = rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';

//                         if (isVisible) {
//                             console.log(`[🔊 ENGINE]: Dynamically triggered click on element with text: "${text || 'JS Action'}"`);
//                             try { el.click(); } catch(e) {}
//                             try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch(e) {}
//                         }
//                     }
//                 });

//                 document.querySelectorAll('video, audio').forEach(media => {
//                     if (media.muted) {
//                         media.muted = false;
//                         media.volume = 1.0;
//                     }
//                 });
//             }).catch(() => {});
//         } catch (e) {}
//     }
// }
// // =========================================================================================

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

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play, #hero-play-btn');
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

//         await page.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     document.documentElement.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('overflow', 'hidden', 'important');
//                     document.documentElement.style.setProperty('overflow', 'hidden', 'important');

//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = null; let maxScore = -1;

//                     iframes.forEach(ifr => {
//                         let width = ifr.clientWidth;
//                         let height = ifr.clientHeight;
//                         let area = width * height;

//                         if (area < 5000) return;

//                         let score = area;
                        
//                         if (ifr.hasAttribute('allowfullscreen') || 
//                             ifr.hasAttribute('webkitallowfullscreen') || 
//                             ifr.hasAttribute('mozallowfullscreen')) {
//                             score += 10000000; 
//                         }
                        
//                         if (height > width) {
//                             score = -1; 
//                         }

//                         if (score > maxScore) {
//                             maxScore = score;
//                             mainIframe = ifr;
//                         }
//                     });

//                     if (!mainIframe && iframes.length > 0) {
//                         mainIframe = iframes.find(ifr => 
//                             ifr.getAttribute('allowfullscreen') !== null || 
//                             (ifr.src && (ifr.src.includes('player') || ifr.src.includes('embed') || ifr.src.includes('stream') || ifr.src.includes('watch')))
//                         );
//                     }

//                     if (mainIframe) {
//                         iframes.forEach(ifr => {
//                             if (ifr !== mainIframe) {
//                                 ifr.style.setProperty('display', 'none', 'important');
//                                 ifr.style.setProperty('opacity', '0', 'important');
//                                 ifr.style.setProperty('z-index', '-9999', 'important');
                                
//                                 if (ifr.parentNode && ifr.parentNode !== document.body) {
//                                     try { 
//                                         ifr.parentNode.style.setProperty('display', 'none', 'important'); 
//                                         ifr.parentNode.style.setProperty('opacity', '0', 'important');
//                                     } catch(e) {}
//                                 }
//                             }
//                         });

//                         mainIframe.style.setProperty('position', 'fixed', 'important');
//                         mainIframe.style.setProperty('top', '0px', 'important');
//                         mainIframe.style.setProperty('left', '0px', 'important');
//                         mainIframe.style.setProperty('width', '100vw', 'important');
//                         mainIframe.style.setProperty('height', '100vh', 'important');
//                         mainIframe.style.setProperty('z-index', '2147483645', 'important'); 
//                         mainIframe.style.setProperty('background-color', 'black', 'important');
//                         mainIframe.style.setProperty('border', 'none', 'important');
//                         mainIframe.style.setProperty('opacity', '1', 'important');
//                         mainIframe.style.setProperty('display', 'block', 'important');
//                         mainIframe.style.setProperty('visibility', 'visible', 'important');
//                     }

//                     const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay), [id*="pop"], [class*="pop"], a[href*="extension"], [class*="notification"], [id*="notification"]';
//                     document.querySelectorAll(junkClasses).forEach(el => { 
//                         try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } 
//                     });

//                     const adKeywords = ['jerk', 'mate', 'free', 'online', 'adult', 'dating', 'close', 'notification', 'justine', 'paying', 'job'];
//                     document.querySelectorAll('div, section, span, a').forEach(el => {
//                         if (el.id === 'smart-stream-overlay') return;
                        
//                         const style = window.getComputedStyle(el);
//                         const isFloating = style.position === 'fixed' || style.position === 'absolute';
                        
//                         if (isFloating && el.innerText) {
//                             const textLower = el.innerText.toLowerCase();
//                             const hasBadKeyword = adKeywords.some(keyword => textLower.includes(keyword));
                            
//                             if (hasBadKeyword || (parseInt(style.zIndex) > 100000 && !el.querySelector('video') && !el.querySelector('iframe'))) {
//                                 try { el.remove(); } catch(e) { el.style.setProperty('display', 'none', 'important'); }
//                             }
//                         }
//                     });

//                 } catch (err) {}
//             }, 500); 
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
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (!realVideo && videos.length > 0) {
//                         realVideo = videos[0];
//                     }

//                     if (realVideo) { 
//                         realVideo.style.setProperty('position', 'fixed', 'important');
//                         realVideo.style.setProperty('top', '0px', 'important');
//                         realVideo.style.setProperty('left', '0px', 'important');
//                         realVideo.style.setProperty('width', '100vw', 'important');
//                         realVideo.style.setProperty('height', '100vh', 'important');
//                         realVideo.style.setProperty('z-index', '2147483646', 'important'); 
//                         realVideo.style.setProperty('background-color', 'black', 'important');
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         realVideo.style.setProperty('opacity', '1', 'important');
//                         realVideo.style.setProperty('visibility', 'visible', 'important');
//                         realVideo.style.setProperty('display', 'block', 'important');
//                     }
//                 } catch(err) {}
//             }, 500); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     await triggerSmartUnmute(page);
//     await new Promise(r => setTimeout(r, 1000));
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
                        
//                         if (targetV && !targetV.ended && targetV.currentTime > 0) {
//                             let frames = 0;
//                             if (targetV.getVideoPlaybackQuality) {
//                                 frames = targetV.getVideoPlaybackQuality().totalVideoFrames;
//                             } else if (targetV.webkitDecodedFrameCount !== undefined) {
//                                 frames = targetV.webkitDecodedFrameCount;
//                             }
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

// async function startWatchdog() {
//     let watchdogTicks = 0;
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     const WARMUP_MAX_TIME = 15000; 

//     let activeUrlStr = urlList[currentUrlIndex];
//     let backupUrlStr = urlList[backupUrlIndex];

//     let currentStreamStartTime = Date.now();

//     while (true) {
//         if (!browser || !browser.isConnected()) throw new Error("Browser closed.");

//         let activeStatus = await checkPageStatus(activePage);

//         if (activeStatus.status === 'HEALTHY' && !isWarmupPhase) {
//             let elapsedMs = Date.now() - currentStreamStartTime;
//             let isExempted = NO_REFRESH_DOMAINS.some(domain => activeUrlStr.includes(domain));

//             if (elapsedMs > FORCE_REFRESH_MS) {
//                 if (!isExempted) {
//                     console.log(`\n[⏱️ PROACTIVE REFRESH]: Stream ran smoothly for ${FORCE_REFRESH_MINUTES} minutes! Forcing SAME LINK swap to keep connection fresh...`);
//                     activeStatus.status = 'FORCE_REFRESH'; 
//                 }
//             }
//         }

//         if (activeStatus.status === 'HEALTHY') {
//             await hideLoadingUI(activePage); 
//             isWarmupPhase = false; 

//             await triggerSmartUnmute(activePage);
            
//             for (const frame of activePage.frames()) {
//         try {
//             if (!frame.isDetached()) {
//                 await frame.evaluate(() => { 
//                     document.querySelectorAll('video, audio').forEach(m => { 
//                         m.muted = false; 
//                         m.volume = 1.0; 
                        
//                         // 🛑 NAYA LOGIC: Agar video pause ho gayi hai toh force play karein
//                         if (m.tagName === 'VIDEO' && m.paused && !m.ended && m.currentTime > 0) {
//                             try {
//                                 console.log('[▶️] Auto-resuming paused video...');
//                                 let p = m.play();
//                                 if (p !== undefined) p.catch(() => {});
//                             } catch(e) {}
//                         }
//                     }); 
//                     document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                 });
//             }
//         } catch(e) {}
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
        
//         if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
//             console.log(`\n[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
            
//             if (activeStatus.status === 'HEALTHY') {
//                 console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//                 console.log(`[⏭️] NEXT IN QUEUE    : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//             } else {
//                 console.log(`[⚠️] STREAM IS NOT ACTIVE: Waiting for system to recover or swap...`);
//             }
//         }

//         if (watchdogTicks % 120 === 0) {
//             await takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
//         }

//         if (activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH') {
            
//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 console.log(`[⏳] Watchdog detected '${activeStatus.status}', but stream is in WARM-UP phase. Waiting...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             }

//             let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

//             if (isProactiveRefresh) {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] 🔄 PROACTIVE REFRESH TRIGGERED`);
//                 console.log(`[*] Preparing a FRESH copy of SAME Server [${currentUrlIndex}] in background...`);
//                 console.log(`==================================================`);
                
//                 for (const frame of activePage.frames()) {
//                     try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                 }

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{});
//                 } catch(e) {
//                     console.log(`[⏳] Proactive refresh buffer navigation handled safely.`);
//                 }
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
//                 console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`==================================================`);
//                 await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
//             }
            
//             console.log(`[*] Checking Backup Tab status before switching...`);
//             let backupStatus = await checkPageStatus(backupPage);

//             if (backupStatus.status === 'HEALTHY' || backupStatus.status === 'DEAD') { 
                
//                 if (!isProactiveRefresh) {
//                     for (const frame of activePage.frames()) {
//                         try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                     }
//                 }
                
//                 await showLoadingUI(backupPage, isProactiveRefresh ? "REFRESHING CONNECTION" : "RECONNECTING", isProactiveRefresh ? "Optimizing current server stream <span class='stream-blink'>...</span>" : "Establishing secure connection to backup server <span class='stream-blink'>...</span>");
//                 await backupPage.bringToFront();
//                 await new Promise(r => setTimeout(r, 1000)); 
                
//                 try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                 console.log(`[*] Initializing Video on the newly active tab...`);
//                 await initializeVideo(backupPage, false, true); 
//                 await hideLoadingUI(backupPage);

//                 let brokenPage = activePage; activePage = backupPage; backupPage = brokenPage;

//                 if (!isProactiveRefresh) {
//                     currentUrlIndex = backupUrlIndex; activeUrlStr = urlList[currentUrlIndex]; 
//                     backupUrlIndex = (backupUrlIndex + 1) % urlList.length; backupUrlStr = urlList[backupUrlIndex]; 
//                 } 

//                 console.log(`\n==================================================`);
//                 console.log(isProactiveRefresh ? `[🔄] SAME-SERVER FRESH SWAP EXECUTED SUCCESSFULLY` : `[🔄] SMART HOT-SWAP TO NEXT SERVER EXECUTED SUCCESSFULLY`);
//                 console.log(`==================================================`);
//                 console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`[🔊] LIVE AUDIO STATUS : ON (Unmuted & Forced)`);
//                 console.log(`--------------------------------------------------`);
//                 console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//                 console.log(`[🔇] BACKUP AUDIO      : MUTED (Background Loading)`);
//                 console.log(`==================================================\n`);

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 } catch (e) {
//                     console.log(`[⏳] Background buffer navigation handled safely.`);
//                 }
                
//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true;
//                 currentStreamStartTime = Date.now();

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
//             console.log('[+] Enforced WaitingScene (Loading Bar Buffer Active)');
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
//         '--disable-renderer-backgrounding',
        
//         `--disable-extensions-except=${path.join(process.cwd(), 'ublock-lite')}`,
//         `--load-extension=${path.join(process.cwd(), 'ublock-lite')}`
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

//     const pages = await browser.pages();
//     activePage = pages[0]; 
//     backupPage = await browser.newPage();
    
//     await setupNetworkAdBlocker(activePage);
//     await setupNetworkAdBlocker(backupPage);

//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await applyPreloadFirewall(activePage);
//     await applyPreloadFirewall(backupPage);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex]}`);
//     await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });
    
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     await initializeVideo(activePage, false, true); 
//     await hideLoadingUI(activePage); 

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex]}`);
//     backupPage.goto(urlList[backupUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 
//     await hideLoadingUI(activePage);

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














// 1

// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD (2026 LATEST FIX)
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     if (err.message && err.message.includes('Requesting main frame too early')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored stealth plugin background frame error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNCAUGHT EXCEPTION: ${err.message}`);
//     }
// });

// process.on('unhandledRejection', (reason, promise) => {
//     let msg = reason && reason.message ? reason.message : reason;
//     if (msg && msg.includes('Protocol error')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored detached frame protocol error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNHANDLED REJECTION: ${msg}`);
//     }
// });
// // =========================================================================================

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME (IN MINUTES)
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 40; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// // =========================================================================================
// // 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// // =========================================================================================
// const NO_REFRESH_DOMAINS = [
//     'youtube.com',
//     'facebook.com',
//     'streamed.pk',
//     'cricstreams.', 
//     'website-vercel-helper-d-jaja-3-2.vercel.app',
//     'websitestream.netlify.app/?ch=Channel%20HD%2071'
// ];

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
// console.log(`[⏱️] Auto-Refresh Time Set To: ${FORCE_REFRESH_MINUTES} Minutes`);

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

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount = 0;

// // =========================================================================================
// // 🛡️ ADVANCED NETWORK INTELLIGENCE & NAVIGATION SHIELD
// // =========================================================================================
// async function setupNetworkAdBlocker(page) {
//     if (!page) return;
//     try {
//         await page.setRequestInterception(true);
//         page.on('request', (request) => {
//             const url = request.url().toLowerCase();
//             const type = request.resourceType();

//             if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
//                 const targetUrl = request.url().toLowerCase();
//                 const adKeywords = ['popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate', 'adrevenue', 'fanduel', 'bet', 'casino'];
//                 const isMaliciousAd = adKeywords.some(keyword => targetUrl.includes(keyword));

//                 if (isMaliciousAd) {
//                     console.log(`[🛡️] NAVIGATION SHIELD: Blocked malicious ad redirection to -> ${targetUrl.substring(0, 70)}...`);
//                     request.abort().catch(()=>{});
//                     return;
//                 }
//             }

//             if (
//                 url.includes('popads') || 
//                 url.includes('exoclick') || 
//                 url.includes('adsterra') || 
//                 url.includes('onclickads') || 
//                 url.includes('jerkmate') ||
//                 url.includes('adrevenue') ||
//                 url.includes('fanduel') ||
//                 url.includes('doubleclick') ||
//                 (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone')))
//             ) {
//                 request.abort().catch(()=>{});
//             } else {
//                 request.continue().catch(()=>{});
//             }
//         });
//     } catch (e) { console.log('[⚠️] Request interception setup failed.'); }
// }

// async function applyPreloadFirewall(page) {
//     if (!page) return;
//     try {
//         await page.evaluateOnNewDocument(() => {
//             window.alert = function() {};
//             window.confirm = function() { return true; };
//             window.prompt = function() { return null; };
//             window.open = function() { return null; };
            
//             Object.defineProperty(window, 'onbeforeunload', {
//                 configurable: true,
//                 get: function() { return null; },
//                 set: function() { return null; }
//             });

//             document.addEventListener('click', (e) => {
//                 const target = e.target;
//                 if (target && (target.tagName === 'A' || target.closest('a'))) {
//                     const link = target.tagName === 'A' ? target : target.closest('a');
//                     if (link.href && !link.href.includes(window.location.hostname) && !link.href.includes('javascript')) {
//                         console.log("[🛡️] RE-DIRECT SHIELD: Blocked navigation to external ad domain.");
//                         e.preventDefault();
//                         e.stopPropagation();
//                         return false;
//                     }
//                 }
//             }, true);

//             const style = document.createElement('style');
//             style.textContent = `html, body { background-color: #000000 !important; overflow: hidden !important; }`;
//             document.documentElement.appendChild(style);

//             const attachOverlay = () => {
//                 let target = document.body || document.documentElement;
//                 if (target && !document.getElementById('smart-stream-overlay')) {
//                     const overlay = document.createElement('div');
//                     overlay.id = 'smart-stream-overlay';
//                     overlay.innerHTML = `
//                         <style>
//                             #smart-stream-overlay {
//                                 position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                                 width: 100vw !important; height: 100vh !important; background: #000000 !important;
//                                 z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                                 justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                                 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                                 pointer-events: all !important;
//                             }
//                             .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                             .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                             .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                             @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                             @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                             .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                             .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                         </style>
//                         <div class="stream-spinner"></div>
//                         <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                         <div class="stream-title">STREAM LOADING</div>
//                         <div class="stream-sub">Connecting to secure stream engine...</div>
//                     `;
//                     target.appendChild(overlay);
//                 } else if (!target) {
//                     requestAnimationFrame(attachOverlay);
//                 }
//             };
//             attachOverlay();
//         });
//     } catch (e) {
//         console.log(`[🛡️] SYSTEM SHIELD: Preload firewall safe injection caught an error.`);
//     }
// }

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

//             if (overlay) {
//                 const titleEl = overlay.querySelector('.stream-title');
//                 const subEl = overlay.querySelector('.stream-sub');
//                 if (titleEl) titleEl.innerHTML = t;
//                 if (subEl) subEl.innerHTML = s;
                
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 overlay.style.setProperty('opacity', '1', 'important');
//                 overlay.style.setProperty('z-index', '2147483647', 'important');
//             } 
//             else {
//                 overlay = document.createElement('div');
//                 overlay.id = 'smart-stream-overlay';
//                 overlay.innerHTML = `
//                     <style>
//                         #smart-stream-overlay {
//                             position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                             width: 100vw !important; height: 100vh !important; background: #000000 !important;
//                             z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                             justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                             pointer-events: all !important;
//                         }
//                         .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                         .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                         .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                         @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                         @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                         .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                         .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                         .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
//                         @keyframes blinker { 50% { opacity: 0.3; } }
//                     </style>
//                     <div class="stream-spinner"></div>
//                     <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                     <div class="stream-title">${t}</div>
//                     <div class="stream-sub">${s}</div>
//                 `;
//                 document.documentElement.appendChild(overlay);
//             }
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'none', 'important');
//                 overlay.style.setProperty('opacity', '0', 'important');
//                 overlay.style.setProperty('z-index', '-9999', 'important');
//                 overlay.remove();
//             }
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
//                 "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true} ] } 
//             }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// function attachAntiAdListeners(page) {
//     page.on('dialog', async dialog => {
//         try { await dialog.dismiss(); } catch(e){}
//     });
// }

// // =========================================================================================
// // 🔊 2026 INTELLIGENT FUZZY UNMUTE ENGINE
// // =========================================================================================
// async function triggerSmartUnmute(page) {
//     for (const frame of page.frames()) {
//         try {
//             if (frame.isDetached()) continue;

//             await frame.evaluate(() => {
//                 const potentialElements = Array.from(document.querySelectorAll('button, div, span, a, i'));
                
//                 potentialElements.forEach(el => {
//                     const text = (el.innerText || el.textContent || '').trim().toUpperCase();
//                     const onClickStr = (el.getAttribute('onclick') || '').toLowerCase();
//                     const ariaLabel = (el.getAttribute('aria-label') || '').toUpperCase();
                    
//                     const matchesText = text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('STREAM UNMUTE') || text.includes('AUDIO');
//                     const matchesJS = onClickStr.includes('unmute') || onClickStr.includes('volume') || onClickStr.includes('audio');
//                     const matchesAria = ariaLabel.includes('UNMUTE') || ariaLabel.includes('VOLUME');

//                     if (matchesText || matchesJS || matchesAria) {
//                         const rect = el.getBoundingClientRect();
//                         const isVisible = rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';

//                         if (isVisible) {
//                             console.log(`[🔊 ENGINE]: Dynamically triggered click on element with text: "${text || 'JS Action'}"`);
//                             try { el.click(); } catch(e) {}
//                             try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch(e) {}
//                         }
//                     }
//                 });

//                 document.querySelectorAll('video, audio').forEach(media => {
//                     if (media.muted) {
//                         media.muted = false;
//                         media.volume = 1.0;
//                     }
//                 });
//             }).catch(() => {});
//         } catch (e) {}
//     }
// }
// // =========================================================================================

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

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play, #hero-play-btn');
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

//         await page.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     document.documentElement.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('overflow', 'hidden', 'important');
//                     document.documentElement.style.setProperty('overflow', 'hidden', 'important');

//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = null; let maxScore = -1;

//                     iframes.forEach(ifr => {
//                         let width = ifr.clientWidth;
//                         let height = ifr.clientHeight;
//                         let area = width * height;

//                         if (area < 5000) return;

//                         let score = area;
                        
//                         if (ifr.hasAttribute('allowfullscreen') || 
//                             ifr.hasAttribute('webkitallowfullscreen') || 
//                             ifr.hasAttribute('mozallowfullscreen')) {
//                             score += 10000000; 
//                         }
                        
//                         if (height > width) {
//                             score = -1; 
//                         }

//                         if (score > maxScore) {
//                             maxScore = score;
//                             mainIframe = ifr;
//                         }
//                     });

//                     if (!mainIframe && iframes.length > 0) {
//                         mainIframe = iframes.find(ifr => 
//                             ifr.getAttribute('allowfullscreen') !== null || 
//                             (ifr.src && (ifr.src.includes('player') || ifr.src.includes('embed') || ifr.src.includes('stream') || ifr.src.includes('watch')))
//                         );
//                     }

//                     if (mainIframe) {
//                         iframes.forEach(ifr => {
//                             if (ifr !== mainIframe) {
//                                 ifr.style.setProperty('display', 'none', 'important');
//                                 ifr.style.setProperty('opacity', '0', 'important');
//                                 ifr.style.setProperty('z-index', '-9999', 'important');
                                
//                                 if (ifr.parentNode && ifr.parentNode !== document.body) {
//                                     try { 
//                                         ifr.parentNode.style.setProperty('display', 'none', 'important'); 
//                                         ifr.parentNode.style.setProperty('opacity', '0', 'important');
//                                     } catch(e) {}
//                                 }
//                             }
//                         });

//                         mainIframe.style.setProperty('position', 'fixed', 'important');
//                         mainIframe.style.setProperty('top', '0px', 'important');
//                         mainIframe.style.setProperty('left', '0px', 'important');
//                         mainIframe.style.setProperty('width', '100vw', 'important');
//                         mainIframe.style.setProperty('height', '100vh', 'important');
//                         mainIframe.style.setProperty('z-index', '2147483645', 'important'); 
//                         mainIframe.style.setProperty('background-color', 'black', 'important');
//                         mainIframe.style.setProperty('border', 'none', 'important');
//                         mainIframe.style.setProperty('opacity', '1', 'important');
//                         mainIframe.style.setProperty('display', 'block', 'important');
//                         mainIframe.style.setProperty('visibility', 'visible', 'important');
//                     }

//                     const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay), [id*="pop"], [class*="pop"], a[href*="extension"], [class*="notification"], [id*="notification"]';
//                     document.querySelectorAll(junkClasses).forEach(el => { 
//                         try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } 
//                     });

//                     const adKeywords = ['jerk', 'mate', 'free', 'online', 'adult', 'dating', 'close', 'notification', 'justine', 'paying', 'job'];
//                     document.querySelectorAll('div, section, span, a').forEach(el => {
//                         if (el.id === 'smart-stream-overlay') return;
                        
//                         const style = window.getComputedStyle(el);
//                         const isFloating = style.position === 'fixed' || style.position === 'absolute';
                        
//                         if (isFloating && el.innerText) {
//                             const textLower = el.innerText.toLowerCase();
//                             const hasBadKeyword = adKeywords.some(keyword => textLower.includes(keyword));
                            
//                             if (hasBadKeyword || (parseInt(style.zIndex) > 100000 && !el.querySelector('video') && !el.querySelector('iframe'))) {
//                                 try { el.remove(); } catch(e) { el.style.setProperty('display', 'none', 'important'); }
//                             }
//                         }
//                     });

//                 } catch (err) {}
//             }, 500); 
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
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (!realVideo && videos.length > 0) {
//                         realVideo = videos[0];
//                     }

//                     if (realVideo) { 
//                         realVideo.style.setProperty('position', 'fixed', 'important');
//                         realVideo.style.setProperty('top', '0px', 'important');
//                         realVideo.style.setProperty('left', '0px', 'important');
//                         realVideo.style.setProperty('width', '100vw', 'important');
//                         realVideo.style.setProperty('height', '100vh', 'important');
//                         realVideo.style.setProperty('z-index', '2147483646', 'important'); 
//                         realVideo.style.setProperty('background-color', 'black', 'important');
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         realVideo.style.setProperty('opacity', '1', 'important');
//                         realVideo.style.setProperty('visibility', 'visible', 'important');
//                         realVideo.style.setProperty('display', 'block', 'important');
//                     }
//                 } catch(err) {}
//             }, 500); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     await triggerSmartUnmute(page);
//     await new Promise(r => setTimeout(r, 1000));
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
                        
//                         if (targetV && !targetV.ended && targetV.currentTime > 0) {
//                             let frames = 0;
//                             if (targetV.getVideoPlaybackQuality) {
//                                 frames = targetV.getVideoPlaybackQuality().totalVideoFrames;
//                             } else if (targetV.webkitDecodedFrameCount !== undefined) {
//                                 frames = targetV.webkitDecodedFrameCount;
//                             }
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

// async function startWatchdog() {
//     let watchdogTicks = 0;
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     const WARMUP_MAX_TIME = 15000; 

//     let activeUrlStr = urlList[currentUrlIndex];
//     let backupUrlStr = urlList[backupUrlIndex];

//     let currentStreamStartTime = Date.now();

//     while (true) {
//         if (!browser || !browser.isConnected()) throw new Error("Browser closed.");

//         let activeStatus = await checkPageStatus(activePage);

//         if (activeStatus.status === 'HEALTHY' && !isWarmupPhase) {
//             let elapsedMs = Date.now() - currentStreamStartTime;
//             let isExempted = NO_REFRESH_DOMAINS.some(domain => activeUrlStr.includes(domain));

//             if (elapsedMs > FORCE_REFRESH_MS) {
//                 if (!isExempted) {
//                     console.log(`\n[⏱️ PROACTIVE REFRESH]: Stream ran smoothly for ${FORCE_REFRESH_MINUTES} minutes! Forcing SAME LINK swap to keep connection fresh...`);
//                     activeStatus.status = 'FORCE_REFRESH'; 
//                 }
//             }
//         }

//         if (activeStatus.status === 'HEALTHY') {
//             await hideLoadingUI(activePage); 
//             isWarmupPhase = false; 

//             await triggerSmartUnmute(activePage);
            
//             for (const frame of activePage.frames()) {
//                 try {
//                     if (!frame.isDetached()) {
//                         frame.evaluate(() => { 
//                             document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                             document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                         }).catch(()=>{});
//                     }
//                 } catch(e) {}
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
        
//         if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
//             console.log(`\n[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
            
//             if (activeStatus.status === 'HEALTHY') {
//                 console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//                 console.log(`[⏭️] NEXT IN QUEUE    : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//             } else {
//                 console.log(`[⚠️] STREAM IS NOT ACTIVE: Waiting for system to recover or swap...`);
//             }
//         }

//         if (watchdogTicks % 120 === 0) {
//             await takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
//         }

//         if (activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH') {
            
//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 console.log(`[⏳] Watchdog detected '${activeStatus.status}', but stream is in WARM-UP phase. Waiting...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             }

//             let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

//             if (isProactiveRefresh) {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] 🔄 PROACTIVE REFRESH TRIGGERED`);
//                 console.log(`[*] Preparing a FRESH copy of SAME Server [${currentUrlIndex}] in background...`);
//                 console.log(`==================================================`);
                
//                 for (const frame of activePage.frames()) {
//                     try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                 }

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{});
//                 } catch(e) {
//                     console.log(`[⏳] Proactive refresh buffer navigation handled safely.`);
//                 }
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
//                 console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`==================================================`);
//                 await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
//             }
            
//             console.log(`[*] Checking Backup Tab status before switching...`);
//             let backupStatus = await checkPageStatus(backupPage);

//             if (backupStatus.status === 'HEALTHY' || backupStatus.status === 'DEAD') { 
                
//                 if (!isProactiveRefresh) {
//                     for (const frame of activePage.frames()) {
//                         try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                     }
//                 }
                
//                 await showLoadingUI(backupPage, isProactiveRefresh ? "REFRESHING CONNECTION" : "RECONNECTING", isProactiveRefresh ? "Optimizing current server stream <span class='stream-blink'>...</span>" : "Establishing secure connection to backup server <span class='stream-blink'>...</span>");
//                 await backupPage.bringToFront();
//                 await new Promise(r => setTimeout(r, 1000)); 
                
//                 try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                 console.log(`[*] Initializing Video on the newly active tab...`);
//                 await initializeVideo(backupPage, false, true); 
//                 await hideLoadingUI(backupPage);

//                 let brokenPage = activePage; activePage = backupPage; backupPage = brokenPage;

//                 if (!isProactiveRefresh) {
//                     currentUrlIndex = backupUrlIndex; activeUrlStr = urlList[currentUrlIndex]; 
//                     backupUrlIndex = (backupUrlIndex + 1) % urlList.length; backupUrlStr = urlList[backupUrlIndex]; 
//                 } 

//                 console.log(`\n==================================================`);
//                 console.log(isProactiveRefresh ? `[🔄] SAME-SERVER FRESH SWAP EXECUTED SUCCESSFULLY` : `[🔄] SMART HOT-SWAP TO NEXT SERVER EXECUTED SUCCESSFULLY`);
//                 console.log(`==================================================`);
//                 console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`[🔊] LIVE AUDIO STATUS : ON (Unmuted & Forced)`);
//                 console.log(`--------------------------------------------------`);
//                 console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//                 console.log(`[🔇] BACKUP AUDIO      : MUTED (Background Loading)`);
//                 console.log(`==================================================\n`);

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 } catch (e) {
//                     console.log(`[⏳] Background buffer navigation handled safely.`);
//                 }
                
//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true;
//                 currentStreamStartTime = Date.now();

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
//             console.log('[+] Enforced WaitingScene (Loading Bar Buffer Active)');
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
//         '--disable-renderer-backgrounding',
        
//         `--disable-extensions-except=${path.join(process.cwd(), 'ublock-lite')}`,
//         `--load-extension=${path.join(process.cwd(), 'ublock-lite')}`
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

//     const pages = await browser.pages();
//     activePage = pages[0]; 
//     backupPage = await browser.newPage();
    
//     await setupNetworkAdBlocker(activePage);
//     await setupNetworkAdBlocker(backupPage);

//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await applyPreloadFirewall(activePage);
//     await applyPreloadFirewall(backupPage);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex]}`);
//     await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });
    
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     await initializeVideo(activePage, false, true); 
//     await hideLoadingUI(activePage); 

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex]}`);
//     backupPage.goto(urlList[backupUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 
//     await hideLoadingUI(activePage);

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


















































































































// ==========================================================================================================
// ==========================================================================================================



// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD (2026 LATEST FIX)
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     if (err.message && err.message.includes('Requesting main frame too early')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored stealth plugin background frame error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNCAUGHT EXCEPTION: ${err.message}`);
//     }
// });

// process.on('unhandledRejection', (reason, promise) => {
//     let msg = reason && reason.message ? reason.message : reason;
//     if (msg && msg.includes('Protocol error')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored detached frame protocol error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNHANDLED REJECTION: ${msg}`);
//     }
// });
// // =========================================================================================

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME (IN MINUTES)
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 400; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// // =========================================================================================
// // 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// // =========================================================================================
// const NO_REFRESH_DOMAINS = [
//     'youtube.com',
//     'facebook.com',
//     'streamed.pk',
//     'cricstreams.', // crichd
//     'website-vercel-helper-d-jaja-3-2.vercel.app',
//     'websitestream.netlify.app/?ch=Channel%20HD%2071'
// ];

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
// console.log(`[⏱️] Auto-Refresh Time Set To: ${FORCE_REFRESH_MINUTES} Minutes`);

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

// const FROZEN_THRESHOLD_MS = 16000;

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount = 0;

// // =========================================================================================
// // 🛡️ ADVANCED NETWORK INTELLIGENCE & NAVIGATION SHIELD
// // =========================================================================================
// async function setupNetworkAdBlocker(page) {
//     if (!page) return;
//     try {
//         await page.setRequestInterception(true);
//         page.on('request', (request) => {
//             const url = request.url().toLowerCase();
//             const type = request.resourceType();

//             // 🛑 Aggressive payload blocking added here
//             const adDomains = [
//                 'popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate', 
//                 'adrevenue', 'fanduel', 'adexchangerapid', 'doubleclick', 'propellerads'
//             ];

//             const isAdDomain = adDomains.some(keyword => url.includes(keyword));

//             if (isAdDomain) {
//                 console.log(`[🛡️] NETWORK SHIELD: Blocked known ad payload -> ${url.substring(0, 50)}...`);
//                 request.abort().catch(()=>{});
//                 return;
//             }

//             // 🚫 SHIELD: Same-Tab Hostile Redirect Hijacking Block
//             if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
//                 const targetUrl = request.url().toLowerCase();
//                 const adKeywords = ['bet', 'casino'];
//                 if (adKeywords.some(keyword => targetUrl.includes(keyword))) {
//                     console.log(`[🛡️] NAVIGATION SHIELD: Blocked malicious ad redirection to -> ${targetUrl.substring(0, 70)}...`);
//                     request.abort().catch(()=>{});
//                     return;
//                 }
//             }

//             if (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone'))) {
//                 request.abort().catch(()=>{});
//             } else {
//                 request.continue().catch(()=>{});
//             }
//         });
//     } catch (e) { console.log('[⚠️] Request interception setup failed.'); }
// }

// async function applyPreloadFirewall(page) {
//     if (!page) return;
//     try {
//         await page.evaluateOnNewDocument(() => {
//             // =========================================================
//             // 🛑 ULTIMATE SHADOW DOM AD KILLER (Monkey Patching)
//             // =========================================================
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') {
//                     init.mode = 'open'; // Force open to allow inspection
//                 }
//                 const shadowRoot = originalAttachShadow.call(this, init);
                
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) {
//                         console.log('[🛡️] SHIELD: Shadow DOM Ad Detected & Destroyed!');
//                         this.remove(); // Kill the entire host element
//                     }
//                 });
                
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };

//             // Permanent root execution block for popup alerts & confirms
            
            
//             // 🚫 ANTI-DIALOG FIX: Neutralize onbeforeunload modal box popup completely
//             Object.defineProperty(window, 'onbeforeunload', {
//                 configurable: true,
//                 get: function() { return null; },
//                 set: function() { return null; }
//             });

//             document.addEventListener('click', (e) => {
//                 const target = e.target;
//                 if (target && (target.tagName === 'A' || target.closest('a'))) {
//                     const link = target.tagName === 'A' ? target : target.closest('a');
//                     if (link.href && !link.href.includes(window.location.hostname) && !link.href.includes('javascript')) {
//                         console.log("[🛡️] RE-DIRECT SHIELD: Blocked navigation to external ad domain.");
//                         e.preventDefault();
//                         e.stopPropagation();
//                         return false;
//                     }
//                 }
//             }, true);

//             const style = document.createElement('style');
//             style.textContent = `
//                 html, body { background-color: #000000 !important; overflow: hidden !important; }
//                 in-page-message, [id^="note-"], [id^="missclick-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }
//             `;
//             document.documentElement.appendChild(style);

//             const attachOverlay = () => {
//                 let target = document.body || document.documentElement;
//                 if (target && !document.getElementById('smart-stream-overlay')) {
//                     const overlay = document.createElement('div');
//                     overlay.id = 'smart-stream-overlay';
//                     overlay.innerHTML = `
//                         <style>
//                             #smart-stream-overlay {
//                                 position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                                 width: 100vw !important; height: 100vh !important; background: #000000 !important;
//                                 z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                                 justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                                 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                                 pointer-events: all !important;
//                             }
//                             .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                             .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                             .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                             @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                             @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                             .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                             .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                         </style>
//                         <div class="stream-spinner"></div>
//                         <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                         <div class="stream-title">STREAM LOADING</div>
//                         <div class="stream-sub">Connecting to secure stream engine...</div>
//                     `;
//                     target.appendChild(overlay);
//                 } else if (!target) {
//                     requestAnimationFrame(attachOverlay);
//                 }
//             };
//             attachOverlay();
//         });
//     } catch (e) {
//         console.log(`[🛡️] SYSTEM SHIELD: Preload firewall safe injection caught an error.`);
//     }
// }

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

//             if (overlay) {
//                 const titleEl = overlay.querySelector('.stream-title');
//                 const subEl = overlay.querySelector('.stream-sub');
//                 if (titleEl) titleEl.innerHTML = t;
//                 if (subEl) subEl.innerHTML = s;
                
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 overlay.style.setProperty('opacity', '1', 'important');
//                 overlay.style.setProperty('z-index', '2147483647', 'important');
//             } 
//             else {
//                 overlay = document.createElement('div');
//                 overlay.id = 'smart-stream-overlay';
//                 overlay.innerHTML = `
//                     <style>
//                         #smart-stream-overlay {
//                             position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                             width: 100vw !important; height: 100vh !important; background: #000000 !important;
//                             z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                             justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                             pointer-events: all !important;
//                         }
//                         .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                         .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                         .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                         @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                         @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                         .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                         .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                     </style>
//                     <div class="stream-spinner"></div>
//                     <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                     <div class="stream-title">${t}</div>
//                     <div class="stream-sub">${s}</div>
//                 `;
//                 document.documentElement.appendChild(overlay);
//             }
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'none', 'important');
//                 overlay.style.setProperty('opacity', '0', 'important');
//                 overlay.style.setProperty('z-index', '-9999', 'important');
//                 overlay.remove();
//             }
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
//                 "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true} ] } 
//             }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// function attachAntiAdListeners(page) {
//     page.on('dialog', async dialog => {
//         try { await dialog.dismiss(); } catch(e){}
//     });
// }

// // =========================================================================================
// // 🔊 2026 INTELLIGENT FUZZY UNMUTE ENGINE (No Class/ID Dependence)
// // =========================================================================================
// async function triggerSmartUnmute(page) {
//     for (const frame of page.frames()) {
//         try {
//             if (frame.isDetached()) continue;

//             await frame.evaluate(() => {
//                 // 1. Scan all interactive elements
//                 const potentialElements = Array.from(document.querySelectorAll('button, div, span, a, i'));
                
//                 potentialElements.forEach(el => {
//                     const text = (el.innerText || el.textContent || '').trim().toUpperCase();
//                     const onClickStr = (el.getAttribute('onclick') || '').toLowerCase();
//                     const ariaLabel = (el.getAttribute('aria-label') || '').toUpperCase();
                    
//                     // Fuzzy match checking
//                     const matchesText = text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('STREAM UNMUTE') || text.includes('AUDIO');
//                     const matchesJS = onClickStr.includes('unmute') || onClickStr.includes('volume') || onClickStr.includes('audio');
//                     const matchesAria = ariaLabel.includes('UNMUTE') || ariaLabel.includes('VOLUME');

//                     if (matchesText || matchesJS || matchesAria) {
//                         const rect = el.getBoundingClientRect();
//                         const isVisible = rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';

//                         if (isVisible) {
//                             console.log(`[🔊 ENGINE]: Dynamically triggered click on element with text: "${text || 'JS Action'}"`);
//                             try { el.click(); } catch(e) {}
//                             try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch(e) {}
//                         }
//                     }
//                 });

//                 // 2. Bruteforce Browser Native Media Layer
//                 document.querySelectorAll('video, audio').forEach(media => {
//                     if (media.muted) {
//                         media.muted = false;
//                         media.volume = 1.0;
//                     }
//                 });
//             }).catch(() => {});
//         } catch (e) {}
//     }
// }
// // =========================================================================================

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

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play, #hero-play-btn');
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

//         await page.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     document.documentElement.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('overflow', 'hidden', 'important');
//                     document.documentElement.style.setProperty('overflow', 'hidden', 'important');

//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = null; let maxScore = -1;

//                     // 1. ADVANCED GEOMETRIC SCORING
//                     iframes.forEach(ifr => {
//                         let width = ifr.clientWidth;
//                         let height = ifr.clientHeight;
//                         let area = width * height;

//                         if (area < 5000) return;

//                         let score = area;
                        
//                         if (ifr.hasAttribute('allowfullscreen') || 
//                             ifr.hasAttribute('webkitallowfullscreen') || 
//                             ifr.hasAttribute('mozallowfullscreen')) {
//                             score += 10000000; 
//                         }
                        
//                         if (height > width) {
//                             score = -1; 
//                         }

//                         if (score > maxScore) {
//                             maxScore = score;
//                             mainIframe = ifr;
//                         }
//                     });

//                     if (!mainIframe && iframes.length > 0) {
//                         mainIframe = iframes.find(ifr => 
//                             ifr.getAttribute('allowfullscreen') !== null || 
//                             (ifr.src && (ifr.src.includes('player') || ifr.src.includes('embed') || ifr.src.includes('stream') || ifr.src.includes('watch')))
//                         );
//                     }

//                     if (mainIframe) {
//                         iframes.forEach(ifr => {
//                             if (ifr !== mainIframe) {
//                                 ifr.style.setProperty('display', 'none', 'important');
//                                 ifr.style.setProperty('opacity', '0', 'important');
//                                 ifr.style.setProperty('z-index', '-9999', 'important');
                                
//                                 if (ifr.parentNode && ifr.parentNode !== document.body) {
//                                     try { 
//                                         ifr.parentNode.style.setProperty('display', 'none', 'important'); 
//                                         ifr.parentNode.style.setProperty('opacity', '0', 'important');
//                                     } catch(e) {}
//                                 }
//                             }
//                         });

//                         mainIframe.style.setProperty('position', 'fixed', 'important');
//                         mainIframe.style.setProperty('top', '0px', 'important');
//                         mainIframe.style.setProperty('left', '0px', 'important');
//                         mainIframe.style.setProperty('width', '100vw', 'important');
//                         mainIframe.style.setProperty('height', '100vh', 'important');
//                         mainIframe.style.setProperty('z-index', '2147483645', 'important'); 
//                         mainIframe.style.setProperty('background-color', 'black', 'important');
//                         mainIframe.style.setProperty('border', 'none', 'important');
//                         mainIframe.style.setProperty('opacity', '1', 'important');
//                         mainIframe.style.setProperty('display', 'block', 'important');
//                         mainIframe.style.setProperty('visibility', 'visible', 'important');
//                     }

//                     const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay), [id*="pop"], [class*="pop"], a[href*="extension"], [class*="notification"], [id*="notification"]';
//                     document.querySelectorAll(junkClasses).forEach(el => { 
//                         try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } 
//                     });

//                     const adKeywords = ['jerk', 'mate', 'free', 'online', 'adult', 'dating', 'close', 'notification', 'justine', 'paying', 'job'];
//                     document.querySelectorAll('div, section, span, a').forEach(el => {
//                         if (el.id === 'smart-stream-overlay') return;
                        
//                         const style = window.getComputedStyle(el);
//                         const isFloating = style.position === 'fixed' || style.position === 'absolute';
                        
//                         if (isFloating && el.innerText) {
//                             const textLower = el.innerText.toLowerCase();
//                             const hasBadKeyword = adKeywords.some(keyword => textLower.includes(keyword));
                            
//                             if (hasBadKeyword || (parseInt(style.zIndex) > 100000 && !el.querySelector('video') && !el.querySelector('iframe'))) {
//                                 try { el.remove(); } catch(e) { el.style.setProperty('display', 'none', 'important'); }
//                             }
//                         }
//                     });

//                 } catch (err) {}
//             }, 500); 
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
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (!realVideo && videos.length > 0) {
//                         realVideo = videos[0];
//                     }

//                     if (realVideo) { 
//                         realVideo.style.setProperty('position', 'fixed', 'important');
//                         realVideo.style.setProperty('top', '0px', 'important');
//                         realVideo.style.setProperty('left', '0px', 'important');
//                         realVideo.style.setProperty('width', '100vw', 'important');
//                         realVideo.style.setProperty('height', '100vh', 'important');
//                         realVideo.style.setProperty('z-index', '2147483646', 'important'); 
//                         realVideo.style.setProperty('background-color', 'black', 'important');
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         realVideo.style.setProperty('opacity', '1', 'important');
//                         realVideo.style.setProperty('visibility', 'visible', 'important');
//                         realVideo.style.setProperty('display', 'block', 'important');
//                     }
//                 } catch(err) {}
//             }, 500); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     // 🔥 Added Smart Unmute Execution Here
//     await triggerSmartUnmute(page);
//     await new Promise(r => setTimeout(r, 1000));
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
                        
//                         if (targetV && !targetV.ended && targetV.currentTime > 0) {
//                             let frames = 0;
//                             if (targetV.getVideoPlaybackQuality) {
//                                 frames = targetV.getVideoPlaybackQuality().totalVideoFrames;
//                             } else if (targetV.webkitDecodedFrameCount !== undefined) {
//                                 frames = targetV.webkitDecodedFrameCount;
//                             }
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

// async function startWatchdog() {
//     let lastActiveTime = -1;
//     let lastDecodedFrames = -1; 
//     let frozenCheckTimestamp = Date.now();
//     let watchdogTicks = 0;

//     // Naye tracker flags hang state aur logging frequency monitor karne ke liye
//     let isCurrentlyHanging = false; 
//     let lastHangLogTime = 0;
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     let hasPrintedReady = false; // <--- Yeh naya add kiya hai
//     // const WARMUP_MAX_TIME = 15000;
//     const WARMUP_MAX_TIME = 35000; // <--- Isko 35000 (35 seconds) kar dein

//     let activeUrlStr = urlList[currentUrlIndex];
//     let backupUrlStr = urlList[backupUrlIndex];

//     let currentStreamStartTime = Date.now();

//     while (true) {
//         if (!browser || !browser.isConnected()) throw new Error("Browser closed.");

//         let activeStatus = await checkPageStatus(activePage);

//         if (activeStatus.status === 'HEALTHY' && !isWarmupPhase) {
//             let elapsedMs = Date.now() - currentStreamStartTime;
//             let isExempted = NO_REFRESH_DOMAINS.some(domain => activeUrlStr.includes(domain));

//             if (elapsedMs > FORCE_REFRESH_MS) {
//                 if (!isExempted) {
//                     console.log(`\n[⏱️ PROACTIVE REFRESH]: Stream ran smoothly for ${FORCE_REFRESH_MINUTES} minutes! Forcing SAME LINK swap to keep connection fresh...`);
//                     activeStatus.status = 'FORCE_REFRESH'; 
//                 }
//             }
//         }

//         // if (activeStatus.status === 'HEALTHY') {
//         //     await hideLoadingUI(activePage); 
//         //     isWarmupPhase = false; 

//         if (activeStatus.status === 'HEALTHY') {
//             // Sirf ek dafa print karne ke liye
//             if (!hasPrintedReady) {
//                 let setupTimeSec = ((Date.now() - streamSetupTime) / 1000).toFixed(1);
//                 console.log(`\n[🚀] STREAM READY: Video successfully start ho gayi hai! Initial Setup & Buffering me ${setupTimeSec} seconds lagay.\n`);
//                 hasPrintedReady = true; 
//             }

//             await hideLoadingUI(activePage); 
            
//             // Shield ab direct off nahi hoga, balkay poore 35s baad khud off hoga
//             if (Date.now() - streamSetupTime >= WARMUP_MAX_TIME) {
//                 isWarmupPhase = false; 
//             }

//             // 🔥 Added Smart Unmute Continuous Engine Here

//             // 🔥 Added Smart Unmute Continuous Engine Here

//             // 🔥 Added Smart Unmute Continuous Engine Here
//             await triggerSmartUnmute(activePage);

//             let isTimeStuck = (activeStatus.currentTime === lastActiveTime);
//             let isFrameStuck = (activeStatus.decodedFrames === lastDecodedFrames && activeStatus.decodedFrames > 0);

//             if (isTimeStuck || isFrameStuck) {
//                 let hangDuration = Date.now() - frozenCheckTimestamp;
                
//                 // Freeze detect hone par first alert
//                 if (!isCurrentlyHanging) {
//                     isCurrentlyHanging = true;
//                     console.log(`\n[⚠️] HANG DETECTED: Stream lag check start... Monitoring recovery.`);
//                 }

//                 // Har 4000ms (4 seconds) baad progress print karega jab tak 16 sec pore na hon
//                 if (Date.now() - lastHangLogTime >= 4000 && hangDuration < FROZEN_THRESHOLD_MS) {
//                     console.log(`[⏳] HANG MONITOR: Stream abhi bhi pause/stuck hai... (${(hangDuration / 1000).toFixed(1)}s / 16.0s elapsed)`);
//                     lastHangLogTime = Date.now();
//                 }

//                 // Final 16 sec cross hone par action
//                 if (hangDuration > FROZEN_THRESHOLD_MS) {
//                     activeStatus.status = 'FROZEN';
//                     if (isFrameStuck && !isTimeStuck) {
//                         console.log(`[!] ⚠️ SYSTEM SHIELD: Detected Black Screen (Audio playing, but video frames stuck). Triggering HOT-SWAP.`);
//                     }
//                 }
//             } else {
//                 // Agar 16 sec se pehle frames dobara start ho jayen
//                 if (isCurrentlyHanging) {
//                     console.log(`[✅] RECOVERY SUCCESS: Stream wapas start ho gayi hai! (Hot-swap trigger hone se pehle). Total Hang Time: ${((Date.now() - frozenCheckTimestamp) / 1000).toFixed(1)}s\n`);
//                     isCurrentlyHanging = false;
//                 }

//                 lastActiveTime = activeStatus.currentTime; 
//                 lastDecodedFrames = activeStatus.decodedFrames; 
//                 frozenCheckTimestamp = Date.now();
//                 lastHangLogTime = Date.now(); // Log timer reset
                
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
        
//         if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
//             console.log(`\n[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//             console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//             console.log(`[⏭️] NEXT IN QUEUE    : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//         }

//         if (watchdogTicks % 120 === 0) {
//             await takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
//         }

//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH') {
            
//             // if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//             //     console.log(`[⏳] Watchdog detected '${activeStatus.status}', but stream is in WARM-UP phase. Waiting...`);
//             //     await new Promise(r => setTimeout(r, 2000));
//             //     continue; 
//             // }

//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 let warmupElapsed = ((Date.now() - streamSetupTime) / 1000).toFixed(1);
//                 let warmupTotal = (WARMUP_MAX_TIME / 1000).toFixed(1);
//                 console.log(`[⏳] WARM-UP MONITOR: Detected '${activeStatus.status}', stream abhi buffering/setup phase me hai... (${warmupElapsed}s / ${warmupTotal}s elapsed)`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             }

//             let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

//             if (isProactiveRefresh) {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] 🔄 PROACTIVE REFRESH TRIGGERED`);
//                 console.log(`[*] Preparing a FRESH copy of SAME Server [${currentUrlIndex}] in background...`);
//                 console.log(`==================================================`);
                
//                 for (const frame of activePage.frames()) {
//                     try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                 }

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{});
//                 } catch(e) {
//                     console.log(`[⏳] Proactive refresh buffer navigation handled safely.`);
//                 }
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
//                 console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`==================================================`);
//                 await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
//             }
            
//             console.log(`[*] Checking Backup Tab status before switching...`);
//             let backupStatus = await checkPageStatus(backupPage);

//             // if (backupStatus.status === 'HEALTHY' || backupStatus.status === 'DEAD') { 
                
//             //     if (!isProactiveRefresh) {
//             //         for (const frame of activePage.frames()) {
//             //             try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//             //         }
//             //     }

//                 // await showLoadingUI(backupPage, isProactiveRefresh ? "REFRESHING CONNECTION" : "RECONNECTING", isProactiveRefresh ? "Optimizing current server stream <span class='stream-blink'>...</span>" : "Establishing secure connection to backup server <span class='stream-blink'>...</span>");

//             if (backupStatus.status === 'HEALTHY' || backupStatus.status === 'DEAD') { 
            
//             if (!isProactiveRefresh) {
//                 for (const frame of activePage.frames()) {
//                     try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                 }
//             }

//             // NAYA FIX: Agar 1 hi link tha, toh usay swap ke waqt load karein
//             if (urlList.length === 1 && !isProactiveRefresh) {
//                 console.log(`[*] Single URL Mode: Loading stream fresh on Backup Tab...`);
//                 await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{});
//                 await applyPreloadFirewall(backupPage);
//             }
            
//             await showLoadingUI(backupPage, isProactiveRefresh ? "REFRESHING CONNECTION" : "RECONNECTING", isProactiveRefresh ? "Optimizing current server stream <span class='stream-blink'>...</span>" : "Establishing secure connection to backup server <span class='stream-blink'>...</span>");

//                 await backupPage.bringToFront();
//                 await new Promise(r => setTimeout(r, 1000)); 
                
//                 try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                 console.log(`[*] Initializing Video on the newly active tab...`);
//                 await initializeVideo(backupPage, false, true); 
//                 await hideLoadingUI(backupPage);

//                 let brokenPage = activePage; activePage = backupPage; backupPage = brokenPage;
//                 lastActiveTime = -1; frozenCheckTimestamp = Date.now();

//                 if (!isProactiveRefresh) {
//                     currentUrlIndex = backupUrlIndex; activeUrlStr = urlList[currentUrlIndex]; 
//                     backupUrlIndex = (backupUrlIndex + 1) % urlList.length; backupUrlStr = urlList[backupUrlIndex]; 
//                 } 

//                 console.log(`\n==================================================`);
//                 console.log(isProactiveRefresh ? `[🔄] SAME-SERVER FRESH SWAP EXECUTED SUCCESSFULLY` : `[🔄] SMART HOT-SWAP TO NEXT SERVER EXECUTED SUCCESSFULLY`);
//                 console.log(`==================================================`);
//                 console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`[🔊] LIVE AUDIO STATUS : ON (Unmuted & Forced)`);
//                 console.log(`--------------------------------------------------`);
//                 console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//                 console.log(`[🔇] BACKUP AUDIO      : MUTED (Background Loading)`);
//                 console.log(`==================================================\n`);

//                 // try {
//                 //     await backupPage.goto('about:blank').catch(()=>{});
//                 //     await applyPreloadFirewall(backupPage);
//                 //     backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 // } catch (e) {
//                 //     console.log(`[⏳] Background buffer navigation handled safely.`);
//                 // }


//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     // NAYA FIX: Sirf tab background me load karo agar links 1 se zyada hon
//                     if (urlList.length > 1) {
//                         backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     }
//                 } catch (e) {
//                     console.log(`[⏳] Background buffer navigation handled safely.`);
//                 }
                
//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true;
//                 hasPrintedReady = false; // <--- Naye tab ke liye reset kar diya
//                 currentStreamStartTime = Date.now();

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
//             console.log('[+] Enforced WaitingScene (Loading Bar Buffer Active)');
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
//         '--disable-renderer-backgrounding',
        
//         `--disable-extensions-except=${path.join(process.cwd(), 'ublock-lite')}`,
//         `--load-extension=${path.join(process.cwd(), 'ublock-lite')}`
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

//     // const pages = await browser.pages();
//     // activePage = pages[0]; 
//     // backupPage = await browser.newPage();
    
//     // await setupNetworkAdBlocker(activePage);
//     // await setupNetworkAdBlocker(backupPage);

//     const pages = await browser.pages();
//     const defaultPage = pages[0]; // Is un-stealthed tab ko mark kar liya

//     // NAYA FIX: Dono tabs naye create karenge taake Stealth Plugin 100% apply ho
//     activePage = await browser.newPage(); 
//     backupPage = await browser.newPage();
    
//     // Default tab ko close kar denge taake memory ya background noise na aaye
//     try { await defaultPage.close(); } catch(e) {}
    
//     await setupNetworkAdBlocker(activePage);
//     await setupNetworkAdBlocker(backupPage);

//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await applyPreloadFirewall(activePage);
//     await applyPreloadFirewall(backupPage);

//     await activePage.bringToFront(); 

//     // console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex]}`);
//     // await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });
    
//     // await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     // await initializeVideo(activePage, false, true); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex]}`);
//     await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });
    
//     // Naya Fix: DOM Structure ko stable hone ke liye 4 seconds ka time dena
//     console.log(`[*] Waiting 4 seconds for DOM & Iframes to fully settle before scanning...`);
//     await new Promise(r => setTimeout(r, 4000));
    
//     // await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     // await initializeVideo(activePage, false, true);
//     // await hideLoadingUI(activePage); 


//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     // NAYA FIX: Tab 2 ki tarah yahan bhi delay aur click add kiya hai taake Player unlock ho jaye
//     await new Promise(r => setTimeout(r, 1000));
//     try { await activePage.mouse.click(10, 10); } catch(e){}
    
//     await initializeVideo(activePage, false, true); 
//     await hideLoadingUI(activePage);

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     // console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex]}`);
//     // backupPage.goto(urlList[backupUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});

//     if (urlList.length > 1) {
//         console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex]}`);
//         backupPage.goto(urlList[backupUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//     } else {
//         console.log(`[*] STEP 2: Single URL detected! Background Tab preload disabled to prevent IP/Token crash.`);
//     }
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 
//     await hideLoadingUI(activePage);

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






// ========================== 111111111111111111111111-cccccccccccccccccccccccccccccccccccc (remove 35 seconds dead wait from the 111111111111----bbbbbbbb code )


const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn, execSync, exec } = require('child_process');
const { OBSWebSocket } = require('obs-websocket-js');

// =========================================================================================
// 🛡️ GLOBAL CRASH PREVENTION SHIELD (2026 LATEST FIX)
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
const FORCE_REFRESH_MINUTES = 400;
const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// =========================================================================================
// 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// =========================================================================================
const NO_REFRESH_DOMAINS = [
    'youtube.com',
    'facebook.com',
    'streamed.pk',
    'cricstreams.', // crichd
    'website-vercel-helper-d-jaja-3-2.vercel.app',
    'websitestream.netlify.app/?ch=Channel%20HD%2071'
];

// 🚀 Multi-Stream Key Manager
const STREAM_KEYS = {
    '1': '15254238731883_15281627925099_najspfkgne',
    '1.1': '15254260751979_15281671637611_2plrcfqzze',
    '1.2': '15254285524587_15281717840491_7e6qdknzsu',

    '2': '15254299352683_15281743071851_7dvz3h5d7q',
    '2.1': '15254308986475_15281761618539_3xca7oij3u',
    '2.2': '15254328122987_15281795566187_zjqa6bqzoq',

    '3': '15254341885547_15281821059691_hhlpb5vicy',
    '3.1': '15254357089899_15281848322667_sxeexgvzl4',
    '3.2': '15254367510123_15281868180075_pc4jrytfgm',

    '4': '15255022345835_15283095800427_vwrupxzstm',
    '4.1': '15255038074475_15283122080363_ai5qqp2we4',
    '4.2': '15255045480043_15283135842923_tldl4bhmii',
    '4.3': '15255208599147_15283449629291_abltofuc7m',
    '4.4': '15255217708651_15283466603115_bojrrqtlmu',
    '4.5': '15255227670123_15283486263915_jpntt54mve',

    '5': '15273689226859_15317451606635_d7zzy3c7qi',
    '5.1': '15273713933931_15317494860395_avj47smmim',
    '5.2': '15273722257003_15317510195819_6edjluvdqi',
    '5.3': '15273739624043_15317541653099_ii4bxpvabe',
    '5.4': '15273750175339_15317561707115_csel26ku5a',
    '5.5': '15273760071275_15317579467371_cnewcj54me',
    '5.6': '15273767935595_15317595851371_3q43tk7tvm',

    's1.1': '14204232736303_14846150314543_37jq4ryehq',
    's1.2': '14204288179759_14846247373359_tnsknmapva',
    's1.3': '14204319768111_14846302489135_sr4ht4ccwq',
    's1.4': '14204331957807_14846326147631_dji2acqcze',
    's1.5': '14204346572335_14846351641135_7gvns4o5ue',
    's1.6': '14204361252399_14846376479279_cjajhf4d3y',
    's1.7': '14204370492975_14846393649711_6fduhdqite',
    's1.8': '14204395527727_14846438017583_s2jlti7lsm',
    's1.9': '14204411387439_14846464887343_f5lxgcqj5y',
    's1.10': '14204424691247_14846487562799_xmbvntt6wa',

    's2.1': '14204490948143_14846603495983_kzevn36tii',
    's2.2': '14204506742319_14846634494511_ta2rxyg2oy',
    's2.3': '14204523322927_14846661233199_foqb3q7zb4',
    's2.4': '14204540034607_14846689085999_gjejdie4uy',
    's2.5': '14204555304495_14846715497007_zdanghuxzu',
    's2.6': '14204565200431_14846734371375_ap3bqpabpu',
    's2.7': '14204577259055_14846756194863_3ecad2535u',
    's2.8': '14204592528943_14846785227311_4hjl46y62e',
    's2.9': '14204602621487_14846802594351_ilnp6lxekq',
    's2.10': '14206184136239_14849618610735_ihnbx7hkoi'
};

const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
let RES_W = 1920, RES_H = 1080, BITRATE = 5000;

if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }
else { RES_W = 1920; RES_H = 1080; BITRATE = 6000; }

console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);
console.log(`[⏱️] Auto-Refresh Time Set To: ${FORCE_REFRESH_MINUTES} Minutes`);

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

const FROZEN_THRESHOLD_MS = 16000;

if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
let pendingScreenshots = [];
let uploadCycleCount = 0;

// =========================================================================================
// 🛡️ ADVANCED NETWORK INTELLIGENCE & NAVIGATION SHIELD
// =========================================================================================
async function setupNetworkAdBlocker(page) {
    if (!page) return;
    try {
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            const url = request.url().toLowerCase();
            const type = request.resourceType();

            // 🛑 Aggressive payload blocking added here
            const adDomains = [
                'popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate',
                'adrevenue', 'fanduel', 'adexchangerapid', 'doubleclick', 'propellerads'
            ];

            const isAdDomain = adDomains.some(keyword => url.includes(keyword));

            if (isAdDomain) {
                console.log(`[🛡️] NETWORK SHIELD: Blocked known ad payload -> ${url.substring(0, 50)}...`);
                request.abort().catch(() => { });
                return;
            }

            // 🚫 SHIELD: Same-Tab Hostile Redirect Hijacking Block
            if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
                const targetUrl = request.url().toLowerCase();
                const adKeywords = ['bet', 'casino'];
                if (adKeywords.some(keyword => targetUrl.includes(keyword))) {
                    console.log(`[🛡️] NAVIGATION SHIELD: Blocked malicious ad redirection to -> ${targetUrl.substring(0, 70)}...`);
                    request.abort().catch(() => { });
                    return;
                }
            }

            if (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone'))) {
                request.abort().catch(() => { });
            } else {
                request.continue().catch(() => { });
            }
        });
    } catch (e) { console.log('[⚠️] Request interception setup failed.'); }
}

async function applyPreloadFirewall(page) {
    if (!page) return;
    try {
        await page.evaluateOnNewDocument(() => {
            // =========================================================
            // 🛑 ULTIMATE SHADOW DOM AD KILLER (Monkey Patching)
            // =========================================================
            const originalAttachShadow = Element.prototype.attachShadow;
            Element.prototype.attachShadow = function (init) {
                if (init && init.mode === 'closed') {
                    init.mode = 'open'; // Force open to allow inspection
                }
                const shadowRoot = originalAttachShadow.call(this, init);

                const observer = new MutationObserver(() => {
                    const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [src*="adexchangerapid"]');
                    if (adElements.length > 0) {
                        console.log('[🛡️] SHIELD: Shadow DOM Ad Detected & Destroyed!');
                        this.remove(); // Kill the entire host element
                    }
                });

                observer.observe(shadowRoot, { childList: true, subtree: true });
                return shadowRoot;
            };

            // Permanent root execution block for popup alerts & confirms
            // window.alert = function() {};
            // window.confirm = function() { return true; };
            // window.prompt = function() { return null; };
            // window.open = function() { return null; };

            // 🚫 ANTI-DIALOG FIX: Neutralize onbeforeunload modal box popup completely
            Object.defineProperty(window, 'onbeforeunload', {
                configurable: true,
                get: function () { return null; },
                set: function () { return null; }
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
            style.textContent = `
                html, body { background-color: #000000 !important; overflow: hidden !important; }
                in-page-message, [id^="note-"], [id^="missclick-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }
            `;
            document.documentElement.appendChild(style);

            const attachOverlay = () => {
                let target = document.body || document.documentElement;
                if (target && !document.getElementById('smart-stream-overlay')) {
                    const overlay = document.createElement('div');
                    overlay.id = 'smart-stream-overlay';
                    overlay.innerHTML = `
                        <style>
                            #smart-stream-overlay {
                                position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
                                width: 100vw !important; height: 100vh !important; background: #000000 !important;
                                z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
                                justify-content: center !important; align-items: center !important; color: #ffffff !important;
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
                                pointer-events: all !important;
                            }
                            .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
                            .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
                            .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
                            @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                            @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
                            .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
                            .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
                        </style>
                        <div class="stream-spinner"></div>
                        <div class="progress-container"><div class="progress-bar-fill"></div></div>
                        <div class="stream-title">STREAM LOADING</div>
                        <div class="stream-sub">Connecting to secure stream engine...</div>
                    `;
                    target.appendChild(overlay);
                } else if (!target) {
                    requestAnimationFrame(attachOverlay);
                }
            };
            attachOverlay();
        });
    } catch (e) {
        console.log(`[🛡️] SYSTEM SHIELD: Preload firewall safe injection caught an error.`);
    }
}

async function takeAndBatchScreenshot(page, stepName) {
    if (!page) return;
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filePath = `./screenshots/snap_${timestamp}_${stepName}.png`;
        await page.screenshot({ path: filePath });
        console.log(`[📸] Screenshot saved: ${filePath}`);
        pendingScreenshots.push(filePath);

        if (pendingScreenshots.length >= 3) {
            try {
                const tag = 'live-stream-logs';
                try { execSync(`gh release view ${tag} || gh release create ${tag} -t "Live Logs"`, { stdio: 'ignore' }); } catch (e) { }
                try {
                    const oldAssets = execSync(`gh release view ${tag} --json assets -q ".assets[].name"`, { encoding: 'utf-8' }).trim().split('\n');
                    for (const asset of oldAssets) if (asset) execSync(`gh release delete-asset ${tag} "${asset}" -y`, { stdio: 'ignore' });
                } catch (e) { }

                const fileList = pendingScreenshots.join(' ');
                exec(`gh release upload ${tag} ${fileList} --clobber`, (err) => {
                    if (!err) uploadCycleCount++;
                });
                pendingScreenshots = [];
            } catch (err) { }
        }
    } catch (e) { }
}

async function showLoadingUI(page, title, sub) {
    try {
        await page.evaluate((t, s) => {
            if (window.self !== window.top) return;
            let overlay = document.getElementById('smart-stream-overlay');

            if (overlay) {
                const titleEl = overlay.querySelector('.stream-title');
                const subEl = overlay.querySelector('.stream-sub');
                if (titleEl) titleEl.innerHTML = t;
                if (subEl) subEl.innerHTML = s;

                overlay.style.setProperty('display', 'flex', 'important');
                overlay.style.setProperty('opacity', '1', 'important');
                overlay.style.setProperty('z-index', '2147483647', 'important');
            }
            else {
                overlay = document.createElement('div');
                overlay.id = 'smart-stream-overlay';
                overlay.innerHTML = `
                    <style>
                        #smart-stream-overlay {
                            position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
                            width: 100vw !important; height: 100vh !important; background: #000000 !important;
                            z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
                            justify-content: center !important; align-items: center !important; color: #ffffff !important;
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
                            pointer-events: all !important;
                        }
                        .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
                        .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
                        .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
                        @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                        @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
                        .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
                        .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
                    </style>
                    <div class="stream-spinner"></div>
                    <div class="progress-container"><div class="progress-bar-fill"></div></div>
                    <div class="stream-title">${t}</div>
                    <div class="stream-sub">${s}</div>
                `;
                document.documentElement.appendChild(overlay);
            }
        }, title, sub);
    } catch (e) { }
}

async function hideLoadingUI(page) {
    try {
        await page.evaluate(() => {
            const overlay = document.getElementById('smart-stream-overlay');
            if (overlay) {
                overlay.style.setProperty('display', 'none', 'important');
                overlay.style.setProperty('opacity', '0', 'important');
                overlay.style.setProperty('z-index', '-9999', 'important');
                overlay.remove();
            }
        });
    } catch (e) { }
}

async function updateRecoveryOverlay(page, elapsedMs, thresholdMs) {
    if (!page) return;
    try {
        await page.evaluate((elapsed, threshold) => {
            if (window.self !== window.top) return;

            let overlay = document.getElementById('smart-recovery-overlay');
            let percentage = Math.min(100, (elapsed / threshold) * 100);
            let elapsedSec = (elapsed / 1000).toFixed(1);

            const messages = [
                "Connecting to stream server...",
                "Synchronizing video...",
                "Recovering playback...",
                "Optimizing connection...",
                "Almost ready...",
                "Resuming live video..."
            ];
            let msgIndex = Math.floor(elapsed / 2000) % messages.length;
            let currentMsg = messages[msgIndex];

            const icons = ["📡", "🔄", "⚡", "📺", "✓"];
            let iconIndex = Math.floor(elapsed / 800) % icons.length;
            let currentIcon = icons[iconIndex];

            if (overlay) {
                const barFill = overlay.querySelector('.recovery-bar-fill');
                const timeEl = overlay.querySelector('.recovery-time');
                const msgEl = overlay.querySelector('.recovery-msg');
                const iconEl = overlay.querySelector('.recovery-icon');

                if (barFill) barFill.style.width = percentage + '%';
                if (timeEl) timeEl.innerText = elapsedSec + ' seconds';
                if (msgEl) msgEl.innerText = currentMsg;
                if (iconEl) iconEl.innerText = currentIcon;
            } else {
                overlay = document.createElement('div');
                overlay.id = 'smart-recovery-overlay';
                overlay.innerHTML = `
                    <style>
                        #smart-recovery-overlay {
                            position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
                            width: 100vw !important; height: 100vh !important; background: rgba(0, 0, 0, 0.85) !important;
                            backdrop-filter: blur(8px) !important;
                            z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
                            justify-content: center !important; align-items: center !important; color: #ffffff !important;
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
                            pointer-events: none !important;
                        }
                        .recovery-icon-container { font-size: 50px; margin-bottom: 20px; text-shadow: 0 0 20px rgba(255,255,255,0.5); }
                        .recovery-title { font-size: 32px !important; font-weight: 800 !important; letter-spacing: 2px !important; margin-bottom: 25px !important; text-transform: uppercase !important; }
                        .recovery-stats-box { background: rgba(255,255,255,0.1); padding: 15px 30px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); text-align: center; margin-bottom: 30px; min-width: 250px; }
                        .recovery-label { font-size: 14px; color: #aaaaaa; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
                        .recovery-time { font-size: 24px; font-weight: bold; color: #ff4d4d; font-variant-numeric: tabular-nums; }
                        .recovery-bar-container { width: 350px; height: 8px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; margin-bottom: 20px; }
                        .recovery-bar-fill { width: ${percentage}%; height: 100%; background: linear-gradient(90deg, #ff4d4d, #ff0000); transition: width 0.3s ease; }
                        .recovery-msg { font-size: 16px; color: #dddddd; font-style: italic; }
                    </style>
                    <div class="recovery-icon-container"><span class="recovery-icon">${currentIcon}</span></div>
                    <div class="recovery-title">LIVE RECOVERY</div>
                    <div class="recovery-stats-box">
                        <div class="recovery-label">Recovery Time</div>
                        <div class="recovery-time">${elapsedSec} seconds</div>
                    </div>
                    <div class="recovery-bar-container"><div class="recovery-bar-fill"></div></div>
                    <div class="recovery-msg">${currentMsg}</div>
                `;
                document.documentElement.appendChild(overlay);
            }
        }, elapsedMs, thresholdMs);
    } catch (e) { }
}

async function removeRecoveryOverlay(page) {
    if (!page) return;
    try {
        await page.evaluate(() => {
            const overlay = document.getElementById('smart-recovery-overlay');
            if (overlay) overlay.remove();
        });
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
        "scene_order": [{ "name": "WaitingScene" }, { "name": "MainScene" }],
        "sources": [
            { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
            { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
            {
                "id": "scene", "name": "MainScene",
                "settings": { "items": [{ "name": "Screen", "id": 1, "visible": true }, { "name": "Audio", "id": 2, "visible": true }] }
            },
            {
                "id": "scene", "name": "WaitingScene",
                "settings": { "items": [{ "name": "Screen", "id": 1, "visible": true }] }
            }
        ]
    };
    fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
}

function attachAntiAdListeners(page) {
    page.on('dialog', async dialog => {
        try { await dialog.dismiss(); } catch (e) { }
    });
}

// =========================================================================================
// 🔊 2026 INTELLIGENT FUZZY UNMUTE ENGINE (No Class/ID Dependence)
// =========================================================================================
async function triggerSmartUnmute(page) {
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

                    // Fuzzy match checking
                    const matchesText = text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('STREAM UNMUTE') || text.includes('AUDIO');
                    const matchesJS = onClickStr.includes('unmute') || onClickStr.includes('volume') || onClickStr.includes('audio');
                    const matchesAria = ariaLabel.includes('UNMUTE') || ariaLabel.includes('VOLUME');

                    if (matchesText || matchesJS || matchesAria) {
                        const rect = el.getBoundingClientRect();
                        const isVisible = rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';

                        if (isVisible) {
                            console.log(`[🔊 ENGINE]: Dynamically triggered click on element with text: "${text || 'JS Action'}"`);
                            try { el.click(); } catch (e) { }
                            try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch (e) { }
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
            }).catch(() => { });
        } catch (e) { }
    }
}
// =========================================================================================

async function initializeVideo(page, startMuted, isActivePage) {
    try {
        if (SERVER_SELECTION !== 'None') {
            console.log(`[*] Clicking specific Server: ${SERVER_SELECTION}`);
            let serverClicked = false; let serverAttempts = 0;
            while (!serverClicked && serverAttempts < 10) {
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
                        if (isActivePage) await page.bringToFront();
                    } else await new Promise(r => setTimeout(r, 2000));
                } catch (err) { await new Promise(r => setTimeout(r, 2000)); }
            }
        }

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


                    const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play, #hero-play-btn');
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
                            for (let v of vids) {
                                if (v.clientWidth > 50) {
                                    v.muted = false; v.volume = 1.0;
                                    try { v.click(); } catch (e) { }
                                    try {
                                        let p = v.play();
                                        if (p !== undefined) p.catch(() => { });
                                        played = true;
                                    } catch (e) { }
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
                } catch (err) { }
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

                                if (ifr.parentNode && ifr.parentNode !== document.body) {
                                    try {
                                        ifr.parentNode.style.setProperty('display', 'none', 'important');
                                        ifr.parentNode.style.setProperty('opacity', '0', 'important');
                                    } catch (e) { }
                                }
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
                        try { el.remove(); } catch (e) { el.style.setProperty('display', 'none', 'important'); }
                    });

                    const adKeywords = ['jerk', 'mate', 'free', 'online', 'adult', 'dating', 'close', 'notification', 'justine', 'paying', 'job'];
                    document.querySelectorAll('div, section, span, a').forEach(el => {
                        if (el.id === 'smart-stream-overlay') return;

                        const style = window.getComputedStyle(el);
                        const isFloating = style.position === 'fixed' || style.position === 'absolute';

                        if (isFloating && el.innerText) {
                            const textLower = el.innerText.toLowerCase();
                            const hasBadKeyword = adKeywords.some(keyword => textLower.includes(keyword));

                            if (hasBadKeyword || (parseInt(style.zIndex) > 100000 && !el.querySelector('video') && !el.querySelector('iframe'))) {
                                try { el.remove(); } catch (e) { el.style.setProperty('display', 'none', 'important'); }
                            }
                        }
                    });

                } catch (err) { }
            }, 500);
        }).catch(() => { });

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
                        document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch (e) { } });
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
                } catch (err) { }
            }, 500);
        }, startMuted).catch(() => { });

    } catch (e) { }

    // 🔥 Added Smart Unmute Execution Here
    await triggerSmartUnmute(page);
    await new Promise(r => setTimeout(r, 1000));
}

async function checkPageStatus(page) {
    if (!page) return { status: 'DEAD' };
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
                            bodyText.includes("does not have permission") ||
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
                            let frames = 0;
                            if (targetV.getVideoPlaybackQuality) {
                                frames = targetV.getVideoPlaybackQuality().totalVideoFrames;
                            } else if (targetV.webkitDecodedFrameCount !== undefined) {
                                frames = targetV.webkitDecodedFrameCount;
                            }

                            let bufferRemaining = 0;
                            try {
                                if (targetV.buffered && targetV.buffered.length > 0) {
                                    bufferRemaining = targetV.buffered.end(targetV.buffered.length - 1) - targetV.currentTime;
                                }
                            } catch (e) { }

                            let isHealthy = !targetV.ended && targetV.currentTime > 0 && !targetV.paused;
                            return {
                                status: isHealthy ? 'HEALTHY' : 'BUFFERING',
                                currentTime: targetV.currentTime,
                                decodedFrames: frames,
                                readyState: targetV.readyState,
                                networkState: targetV.networkState,
                                paused: targetV.paused,
                                bufferRemaining: bufferRemaining
                            };
                        }
                        return { status: 'DEAD' };
                    }),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2500))
                ]);
                if (result && result.status !== 'DEAD') return result;
            } catch (err) { }
        }
    } catch (e) { return { status: 'DEAD' }; }
    return { status: 'DEAD' };
}

async function startWatchdog() {
    let lastActiveTime = -1;
    let lastDecodedFrames = -1;
    let frozenCheckTimestamp = Date.now();
    let watchdogTicks = 0;

    // Predictive Watchdog State
    let serverHealthScore = 100;
    let recentFreezes = []; // Stores { timestamp, duration }
    let dynamicFreezeThreshold = FROZEN_THRESHOLD_MS;

    let isCurrentlyHanging = false;
    let lastHangLogTime = 0;

    // Adaptive Warmup State
    let warmupLastState = { readyState: -1, networkState: -1, decodedFrames: -1, currentTime: -1 };
    let warmupStuckSince = Date.now();

    let streamSetupTime = Date.now();
    let isWarmupPhase = true;
    const WARMUP_MAX_TIME = 35000;

    let activeUrlStr = urlList[currentUrlIndex];
    let backupUrlStr = urlList[backupUrlIndex];

    let currentStreamStartTime = Date.now();

    while (true) {
        if (!browser || !browser.isConnected()) throw new Error("Browser closed.");

        let activeStatus = await checkPageStatus(activePage);
        let backupStatus = await checkPageStatus(backupPage); // Continuous backup monitoring

        if (activeStatus.status === 'HEALTHY' && !isWarmupPhase) {
            let elapsedMs = Date.now() - currentStreamStartTime;
            let isExempted = NO_REFRESH_DOMAINS.some(domain => activeUrlStr.includes(domain));

            if (elapsedMs > FORCE_REFRESH_MS) {
                if (!isExempted) {
                    console.log(`\n[⏱️ PROACTIVE REFRESH]: Stream ran smoothly for ${FORCE_REFRESH_MINUTES} minutes! Forcing SAME LINK swap to keep connection fresh...`);
                    activeStatus.status = 'FORCE_REFRESH';
                }
            }
        }

        if (activeStatus.status === 'HEALTHY') {
            if (isWarmupPhase) {
                let setupTimeSec = ((Date.now() - streamSetupTime) / 1000).toFixed(1);
                console.log(`\n[🚀] STREAM READY: Video successfully start ho gayi hai! Initial Setup & Buffering me ${setupTimeSec} seconds lagay.\n`);
            }

            await hideLoadingUI(activePage);
            isWarmupPhase = false;

            await triggerSmartUnmute(activePage);

            let isTimeStuck = (activeStatus.currentTime === lastActiveTime) && !activeStatus.paused;
            let isFrameStuck = (activeStatus.decodedFrames === lastDecodedFrames && activeStatus.decodedFrames > 0);
            let isStalling = isTimeStuck || (activeStatus.readyState !== undefined && activeStatus.readyState < 3);

            if (isStalling || isFrameStuck) {
                let hangDuration = Date.now() - frozenCheckTimestamp;

                if (!isCurrentlyHanging) {
                    isCurrentlyHanging = true;
                    console.log(`\n[⚠️] HANG DETECTED: Stream lag check start... Monitoring recovery.`);
                }

                if (hangDuration > 1000) {
                    updateRecoveryOverlay(activePage, hangDuration, dynamicFreezeThreshold);
                }

                // Penalize health score for ongoing freezes > 3 seconds
                if (hangDuration > 3000) {
                    serverHealthScore = Math.max(0, serverHealthScore - 2);
                }

                if (Date.now() - lastHangLogTime >= 4000 && hangDuration < dynamicFreezeThreshold) {
                    console.log(`[⏳] HANG MONITOR: Stream stuck... (${(hangDuration / 1000).toFixed(1)}s) | Score: ${serverHealthScore}`);
                    lastHangLogTime = Date.now();
                }

                // Predictive Swap Condition
                let scoreTooLow = (serverHealthScore < 40 && backupStatus.status === 'HEALTHY');
                let freezeTooLong = (hangDuration > dynamicFreezeThreshold);

                if (scoreTooLow || freezeTooLong) {
                    activeStatus.status = 'FROZEN';
                    if (scoreTooLow) {
                        console.log(`[!] ⚠️ SYSTEM SHIELD: Server unstable (Score: ${serverHealthScore}). Backup is healthy. Triggering PREDICTIVE HOT-SWAP.`);
                    } else if (isFrameStuck && !isTimeStuck) {
                        console.log(`[!] ⚠️ SYSTEM SHIELD: Detected Black Screen (Audio playing, but video frames stuck). Triggering HOT-SWAP.`);
                    }
                }
            } else {
                if (isCurrentlyHanging) {
                    let recoveredHangDuration = Date.now() - frozenCheckTimestamp;
                    console.log(`[✅] RECOVERY SUCCESS: Stream wapas start! Hang Time: ${(recoveredHangDuration / 1000).toFixed(1)}s | Score: ${serverHealthScore}\n`);
                    isCurrentlyHanging = false;
                    removeRecoveryOverlay(activePage);

                    // Track recent freezes
                    recentFreezes.push({ timestamp: Date.now(), duration: recoveredHangDuration });

                    // Clean old freezes (> 2 minutes ago)
                    recentFreezes = recentFreezes.filter(f => Date.now() - f.timestamp < 120000);

                    // Adjust dynamic threshold based on recent micro-freezes
                    if (recentFreezes.length > 2) {
                        dynamicFreezeThreshold = Math.max(5000, FROZEN_THRESHOLD_MS - (recentFreezes.length * 3000));
                        console.log(`[📉] Unstable stream detected (${recentFreezes.length} recent freezes). Lowering freeze threshold to ${(dynamicFreezeThreshold / 1000).toFixed(1)}s`);
                    } else {
                        dynamicFreezeThreshold = FROZEN_THRESHOLD_MS;
                    }
                } else {
                    // Gradual score recovery if playing perfectly
                    if (serverHealthScore < 100 && watchdogTicks % 10 === 0) {
                        serverHealthScore += 1;
                    }
                }

                lastActiveTime = activeStatus.currentTime;
                lastDecodedFrames = activeStatus.decodedFrames;
                frozenCheckTimestamp = Date.now();
                lastHangLogTime = Date.now();

                for (const frame of activePage.frames()) {
                    try {
                        if (!frame.isDetached()) {
                            frame.evaluate(() => {
                                document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; });
                                document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch (e) { } });
                            }).catch(() => { });
                        }
                    } catch (e) { }
                }
            }
        }

        if (backupPage) {
            for (const frame of backupPage.frames()) {
                try {
                    if (!frame.isDetached()) {
                        frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }).catch(() => { });
                    }
                } catch (e) { }
            }
        }

        watchdogTicks++;

        if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
            console.log(`\n[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
            console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
            console.log(`[⏭️] NEXT IN QUEUE    : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
        }

        if (watchdogTicks % 120 === 0) {
            await takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
        }

        if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH' || activeStatus.status === 'BUFFERING') {

            if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) {
                let warmupElapsedMs = Date.now() - streamSetupTime;
                let warmupElapsed = (warmupElapsedMs / 1000).toFixed(1);
                let warmupTotal = (WARMUP_MAX_TIME / 1000).toFixed(1);
                
                let isProgressing = false;
                
                // Stage 1: The Kill Switch (0 - 8s)
                if (warmupElapsedMs > 8000 && (activeStatus.status === 'DEAD' || (activeStatus.networkState === 0 && activeStatus.readyState === 0))) {
                    console.log(`[💀] WARM-UP ABORT: Stream is truly dead (No network, No data) after 8s. Skipping wait!`);
                    isWarmupPhase = false; 
                    activeStatus.status = 'DEAD'; // Force dead for swap logic below
                } else if (activeStatus.status !== 'DEAD') {
                    // Check for changes (Stage 2/3)
                    if (
                        activeStatus.readyState !== warmupLastState.readyState ||
                        activeStatus.networkState !== warmupLastState.networkState ||
                        activeStatus.decodedFrames !== warmupLastState.decodedFrames ||
                        activeStatus.currentTime !== warmupLastState.currentTime
                    ) {
                        isProgressing = true;
                        warmupLastState = {
                            readyState: activeStatus.readyState,
                            networkState: activeStatus.networkState,
                            decodedFrames: activeStatus.decodedFrames,
                            currentTime: activeStatus.currentTime
                        };
                        warmupStuckSince = Date.now();
                    }

                    let stuckMs = Date.now() - warmupStuckSince;

                    // Stage 2 & 3: The Freeze Check
                    if (warmupElapsedMs > 8000 && stuckMs > 5000 && !isProgressing) {
                        console.log(`[🥶] WARM-UP ABORT: Stream stuck buffering without progress for 5s. Skipping wait!`);
                        isWarmupPhase = false; 
                        activeStatus.status = 'DEAD';
                    }
                }

                if (isWarmupPhase) {
                    console.log(`[⏳] WARM-UP MONITOR: Buffering/Setup... (${warmupElapsed}s / ${warmupTotal}s) | Status: ${activeStatus.status} | Progressing: ${isProgressing}`);
                    await new Promise(r => setTimeout(r, 2000));
                    continue;
                }
            }

            let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

            if (isProactiveRefresh) {
                console.log(`\n==================================================`);
                console.log(`[!] 🔄 PROACTIVE REFRESH TRIGGERED`);
                console.log(`[*] Preparing a FRESH copy of SAME Server [${currentUrlIndex}] in background...`);
                console.log(`==================================================`);

                for (const frame of activePage.frames()) {
                    try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch (e) { }
                }

                try {
                    await backupPage.goto('about:blank').catch(() => { });
                    await applyPreloadFirewall(backupPage);
                    await backupPage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => { });
                } catch (e) {
                    console.log(`[⏳] Proactive refresh buffer navigation handled safely.`);
                }
            } else {
                console.log(`\n==================================================`);
                console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
                console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
                console.log(`==================================================`);
                await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
            }

            console.log(`[*] Checking Backup Tab status before switching...`);
            backupStatus = await checkPageStatus(backupPage);

            if (backupStatus.status === 'HEALTHY' || backupStatus.status === 'DEAD' || backupStatus.status === 'BUFFERING') {

                if (!isProactiveRefresh) {
                    for (const frame of activePage.frames()) {
                        try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch (e) { }
                    }
                }

                await showLoadingUI(backupPage, isProactiveRefresh ? "REFRESHING CONNECTION" : "RECONNECTING", isProactiveRefresh ? "Optimizing current server stream <span class='stream-blink'>...</span>" : "Establishing secure connection to backup server <span class='stream-blink'>...</span>");
                await backupPage.bringToFront();
                await new Promise(r => setTimeout(r, 1000));

                try { await backupPage.mouse.click(10, 10); } catch (e) { }

                console.log(`[*] Initializing Video on the newly active tab...`);
                await initializeVideo(backupPage, false, true);
                await hideLoadingUI(backupPage);

                let brokenPage = activePage; activePage = backupPage; backupPage = brokenPage;
                lastActiveTime = -1; frozenCheckTimestamp = Date.now();

                // Reset predictive states
                serverHealthScore = 100;
                recentFreezes = [];
                dynamicFreezeThreshold = FROZEN_THRESHOLD_MS;
                warmupLastState = { readyState: -1, networkState: -1, decodedFrames: -1, currentTime: -1 };
                warmupStuckSince = Date.now();

                if (!isProactiveRefresh) {
                    currentUrlIndex = backupUrlIndex; activeUrlStr = urlList[currentUrlIndex];
                    backupUrlIndex = (backupUrlIndex + 1) % urlList.length; backupUrlStr = urlList[backupUrlIndex];
                }

                console.log(`\n==================================================`);
                console.log(isProactiveRefresh ? `[🔄] SAME-SERVER FRESH SWAP EXECUTED SUCCESSFULLY` : `[🔄] SMART HOT-SWAP TO NEXT SERVER EXECUTED SUCCESSFULLY`);
                console.log(`==================================================`);
                console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
                console.log(`[🔊] LIVE AUDIO STATUS : ON (Unmuted & Forced)`);
                console.log(`--------------------------------------------------`);
                console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
                console.log(`[🔇] BACKUP AUDIO      : MUTED (Background Loading)`);
                console.log(`==================================================\n`);

                try {
                    await backupPage.goto('about:blank').catch(() => { });
                    await applyPreloadFirewall(backupPage);
                    backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => { });
                } catch (e) {
                    console.log(`[⏳] Background buffer navigation handled safely.`);
                }

                streamSetupTime = Date.now();
                isWarmupPhase = true;
                currentStreamStartTime = Date.now();

            } else {
                console.error(`[!] ❌ Backup Tab is ALSO DEAD/FROZEN. Hard Restarting System...`);
                throw new Error("Both Active and Backup tabs failed.");
            }
        }

        await new Promise(r => setTimeout(r, 2000));
    }
}

async function startDirectStreaming() {
    console.log(`[*] Starting OBS Studio FIRST...`);
    setupOBSConfig();

    obsProcess = spawn('obs', ['--startstreaming', '--minimize-to-tray']);
    obsProcess.stdout.on('data', (data) => console.log(`[OBS]: ${data.toString().trim()}`));
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
            console.log('[+] Enforced WaitingScene (Loading Bar Buffer Active)');
        } catch (e) { }
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
        '--disable-renderer-backgrounding',

        `--disable-extensions-except=${path.join(process.cwd(), 'ublock-lite')}`,
        `--load-extension=${path.join(process.cwd(), 'ublock-lite')}`
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
            const newPage = await target.page();
            setTimeout(async () => {
                if (newPage && newPage !== activePage && newPage !== backupPage) {
                    console.log(`[🛡️] AD-BLOCKER: Killed an unwanted pop-up tab!`);
                    try { await newPage.close(); } catch (e) { }
                }
            }, 500);
        }
    });

    const pages = await browser.pages();
    activePage = pages[0];
    backupPage = await browser.newPage();

    await setupNetworkAdBlocker(activePage);
    await setupNetworkAdBlocker(backupPage);

    attachAntiAdListeners(activePage);
    attachAntiAdListeners(backupPage);

    await applyPreloadFirewall(activePage);
    await applyPreloadFirewall(backupPage);

    await activePage.bringToFront();

    console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex]}`);
    await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });

    // await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");

    // await initializeVideo(activePage, false, true); 
    // await hideLoadingUI(activePage); 


    await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");

    // NAYA FIX: Tab 2 ki tarah yahan bhi delay aur click add kiya hai taake Player unlock ho jaye
    await new Promise(r => setTimeout(r, 1000));
    try { await activePage.mouse.click(10, 10); } catch (e) { }

    await initializeVideo(activePage, false, true);
    await hideLoadingUI(activePage);


    if (isObsConnected) {
        console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
        try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) { }
    }

    console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex]}`);
    backupPage.goto(urlList[backupUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => { });

    await activePage.bringToFront();
    try { await activePage.mouse.click(10, 10); } catch (e) { }
    await hideLoadingUI(activePage);

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
        try { await startDirectStreaming(); }
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
    if (browser) { try { await browser.close(); } catch (e) { } browser = null; }
    if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch (e) { } obsProcess = null; }
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






// ========================== 111111111111111111111111-bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb (here below is to add animation on hang screen )


// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js');

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD (2026 LATEST FIX)
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     if (err.message && err.message.includes('Requesting main frame too early')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored stealth plugin background frame error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNCAUGHT EXCEPTION: ${err.message}`);
//     }
// });

// process.on('unhandledRejection', (reason, promise) => {
//     let msg = reason && reason.message ? reason.message : reason;
//     if (msg && msg.includes('Protocol error')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored detached frame protocol error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNHANDLED REJECTION: ${msg}`);
//     }
// });
// // =========================================================================================

// const obs = new OBSWebSocket();

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME (IN MINUTES)
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 400;
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// // =========================================================================================
// // 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// // =========================================================================================
// const NO_REFRESH_DOMAINS = [
//     'youtube.com',
//     'facebook.com',
//     'streamed.pk',
//     'cricstreams.', // crichd
//     'website-vercel-helper-d-jaja-3-2.vercel.app',
//     'websitestream.netlify.app/?ch=Channel%20HD%2071'
// ];

// // 🚀 Multi-Stream Key Manager
// const STREAM_KEYS = {
//     '1': '15254238731883_15281627925099_najspfkgne',
//     '1.1': '15254260751979_15281671637611_2plrcfqzze',
//     '1.2': '15254285524587_15281717840491_7e6qdknzsu',

//     '2': '15254299352683_15281743071851_7dvz3h5d7q',
//     '2.1': '15254308986475_15281761618539_3xca7oij3u',
//     '2.2': '15254328122987_15281795566187_zjqa6bqzoq',

//     '3': '15254341885547_15281821059691_hhlpb5vicy',
//     '3.1': '15254357089899_15281848322667_sxeexgvzl4',
//     '3.2': '15254367510123_15281868180075_pc4jrytfgm',

//     '4': '15255022345835_15283095800427_vwrupxzstm',
//     '4.1': '15255038074475_15283122080363_ai5qqp2we4',
//     '4.2': '15255045480043_15283135842923_tldl4bhmii',
//     '4.3': '15255208599147_15283449629291_abltofuc7m',
//     '4.4': '15255217708651_15283466603115_bojrrqtlmu',
//     '4.5': '15255227670123_15283486263915_jpntt54mve',

//     '5': '15273689226859_15317451606635_d7zzy3c7qi',
//     '5.1': '15273713933931_15317494860395_avj47smmim',
//     '5.2': '15273722257003_15317510195819_6edjluvdqi',
//     '5.3': '15273739624043_15317541653099_ii4bxpvabe',
//     '5.4': '15273750175339_15317561707115_csel26ku5a',
//     '5.5': '15273760071275_15317579467371_cnewcj54me',
//     '5.6': '15273767935595_15317595851371_3q43tk7tvm',

//     's1.1': '14204232736303_14846150314543_37jq4ryehq',
//     's1.2': '14204288179759_14846247373359_tnsknmapva',
//     's1.3': '14204319768111_14846302489135_sr4ht4ccwq',
//     's1.4': '14204331957807_14846326147631_dji2acqcze',
//     's1.5': '14204346572335_14846351641135_7gvns4o5ue',
//     's1.6': '14204361252399_14846376479279_cjajhf4d3y',
//     's1.7': '14204370492975_14846393649711_6fduhdqite',
//     's1.8': '14204395527727_14846438017583_s2jlti7lsm',
//     's1.9': '14204411387439_14846464887343_f5lxgcqj5y',
//     's1.10': '14204424691247_14846487562799_xmbvntt6wa',

//     's2.1': '14204490948143_14846603495983_kzevn36tii',
//     's2.2': '14204506742319_14846634494511_ta2rxyg2oy',
//     's2.3': '14204523322927_14846661233199_foqb3q7zb4',
//     's2.4': '14204540034607_14846689085999_gjejdie4uy',
//     's2.5': '14204555304495_14846715497007_zdanghuxzu',
//     's2.6': '14204565200431_14846734371375_ap3bqpabpu',
//     's2.7': '14204577259055_14846756194863_3ecad2535u',
//     's2.8': '14204592528943_14846785227311_4hjl46y62e',
//     's2.9': '14204602621487_14846802594351_ilnp6lxekq',
//     's2.10': '14206184136239_14849618610735_ihnbx7hkoi'
// };

// const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
// let RES_W = 1920, RES_H = 1080, BITRATE = 5000;

// if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
// else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
// else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
// else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }
// else { RES_W = 1920; RES_H = 1080; BITRATE = 6000; }

// console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);
// console.log(`[⏱️] Auto-Refresh Time Set To: ${FORCE_REFRESH_MINUTES} Minutes`);

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

// const FROZEN_THRESHOLD_MS = 16000;

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount = 0;

// // =========================================================================================
// // 🛡️ ADVANCED NETWORK INTELLIGENCE & NAVIGATION SHIELD
// // =========================================================================================
// async function setupNetworkAdBlocker(page) {
//     if (!page) return;
//     try {
//         await page.setRequestInterception(true);
//         page.on('request', (request) => {
//             const url = request.url().toLowerCase();
//             const type = request.resourceType();

//             // 🛑 Aggressive payload blocking added here
//             const adDomains = [
//                 'popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate',
//                 'adrevenue', 'fanduel', 'adexchangerapid', 'doubleclick', 'propellerads'
//             ];

//             const isAdDomain = adDomains.some(keyword => url.includes(keyword));

//             if (isAdDomain) {
//                 console.log(`[🛡️] NETWORK SHIELD: Blocked known ad payload -> ${url.substring(0, 50)}...`);
//                 request.abort().catch(() => { });
//                 return;
//             }

//             // 🚫 SHIELD: Same-Tab Hostile Redirect Hijacking Block
//             if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
//                 const targetUrl = request.url().toLowerCase();
//                 const adKeywords = ['bet', 'casino'];
//                 if (adKeywords.some(keyword => targetUrl.includes(keyword))) {
//                     console.log(`[🛡️] NAVIGATION SHIELD: Blocked malicious ad redirection to -> ${targetUrl.substring(0, 70)}...`);
//                     request.abort().catch(() => { });
//                     return;
//                 }
//             }

//             if (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone'))) {
//                 request.abort().catch(() => { });
//             } else {
//                 request.continue().catch(() => { });
//             }
//         });
//     } catch (e) { console.log('[⚠️] Request interception setup failed.'); }
// }

// async function applyPreloadFirewall(page) {
//     if (!page) return;
//     try {
//         await page.evaluateOnNewDocument(() => {
//             // =========================================================
//             // 🛑 ULTIMATE SHADOW DOM AD KILLER (Monkey Patching)
//             // =========================================================
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function (init) {
//                 if (init && init.mode === 'closed') {
//                     init.mode = 'open'; // Force open to allow inspection
//                 }
//                 const shadowRoot = originalAttachShadow.call(this, init);

//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) {
//                         console.log('[🛡️] SHIELD: Shadow DOM Ad Detected & Destroyed!');
//                         this.remove(); // Kill the entire host element
//                     }
//                 });

//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };

//             // Permanent root execution block for popup alerts & confirms
//             // window.alert = function() {};
//             // window.confirm = function() { return true; };
//             // window.prompt = function() { return null; };
//             // window.open = function() { return null; };

//             // 🚫 ANTI-DIALOG FIX: Neutralize onbeforeunload modal box popup completely
//             Object.defineProperty(window, 'onbeforeunload', {
//                 configurable: true,
//                 get: function () { return null; },
//                 set: function () { return null; }
//             });

//             document.addEventListener('click', (e) => {
//                 const target = e.target;
//                 if (target && (target.tagName === 'A' || target.closest('a'))) {
//                     const link = target.tagName === 'A' ? target : target.closest('a');
//                     if (link.href && !link.href.includes(window.location.hostname) && !link.href.includes('javascript')) {
//                         console.log("[🛡️] RE-DIRECT SHIELD: Blocked navigation to external ad domain.");
//                         e.preventDefault();
//                         e.stopPropagation();
//                         return false;
//                     }
//                 }
//             }, true);

//             const style = document.createElement('style');
//             style.textContent = `
//                 html, body { background-color: #000000 !important; overflow: hidden !important; }
//                 in-page-message, [id^="note-"], [id^="missclick-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }
//             `;
//             document.documentElement.appendChild(style);

//             const attachOverlay = () => {
//                 let target = document.body || document.documentElement;
//                 if (target && !document.getElementById('smart-stream-overlay')) {
//                     const overlay = document.createElement('div');
//                     overlay.id = 'smart-stream-overlay';
//                     overlay.innerHTML = `
//                         <style>
//                             #smart-stream-overlay {
//                                 position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                                 width: 100vw !important; height: 100vh !important; background: #000000 !important;
//                                 z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                                 justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                                 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                                 pointer-events: all !important;
//                             }
//                             .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                             .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                             .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                             @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                             @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                             .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                             .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                         </style>
//                         <div class="stream-spinner"></div>
//                         <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                         <div class="stream-title">STREAM LOADING</div>
//                         <div class="stream-sub">Connecting to secure stream engine...</div>
//                     `;
//                     target.appendChild(overlay);
//                 } else if (!target) {
//                     requestAnimationFrame(attachOverlay);
//                 }
//             };
//             attachOverlay();
//         });
//     } catch (e) {
//         console.log(`[🛡️] SYSTEM SHIELD: Preload firewall safe injection caught an error.`);
//     }
// }

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
//                 try { execSync(`gh release view ${tag} || gh release create ${tag} -t "Live Logs"`, { stdio: 'ignore' }); } catch (e) { }
//                 try {
//                     const oldAssets = execSync(`gh release view ${tag} --json assets -q ".assets[].name"`, { encoding: 'utf-8' }).trim().split('\n');
//                     for (const asset of oldAssets) if (asset) execSync(`gh release delete-asset ${tag} "${asset}" -y`, { stdio: 'ignore' });
//                 } catch (e) { }

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

//             if (overlay) {
//                 const titleEl = overlay.querySelector('.stream-title');
//                 const subEl = overlay.querySelector('.stream-sub');
//                 if (titleEl) titleEl.innerHTML = t;
//                 if (subEl) subEl.innerHTML = s;

//                 overlay.style.setProperty('display', 'flex', 'important');
//                 overlay.style.setProperty('opacity', '1', 'important');
//                 overlay.style.setProperty('z-index', '2147483647', 'important');
//             }
//             else {
//                 overlay = document.createElement('div');
//                 overlay.id = 'smart-stream-overlay';
//                 overlay.innerHTML = `
//                     <style>
//                         #smart-stream-overlay {
//                             position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                             width: 100vw !important; height: 100vh !important; background: #000000 !important;
//                             z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                             justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                             pointer-events: all !important;
//                         }
//                         .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                         .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                         .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                         @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                         @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                         .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                         .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                     </style>
//                     <div class="stream-spinner"></div>
//                     <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                     <div class="stream-title">${t}</div>
//                     <div class="stream-sub">${s}</div>
//                 `;
//                 document.documentElement.appendChild(overlay);
//             }
//         }, title, sub);
//     } catch (e) { }
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'none', 'important');
//                 overlay.style.setProperty('opacity', '0', 'important');
//                 overlay.style.setProperty('z-index', '-9999', 'important');
//                 overlay.remove();
//             }
//         });
//     } catch (e) { }
// }

// async function updateRecoveryOverlay(page, elapsedMs, thresholdMs) {
//     if (!page) return;
//     try {
//         await page.evaluate((elapsed, threshold) => {
//             if (window.self !== window.top) return;
            
//             let overlay = document.getElementById('smart-recovery-overlay');
//             let percentage = Math.min(100, (elapsed / threshold) * 100);
//             let elapsedSec = (elapsed / 1000).toFixed(1);
            
//             const messages = [
//                 "Connecting to stream server...",
//                 "Synchronizing video...",
//                 "Recovering playback...",
//                 "Optimizing connection...",
//                 "Almost ready...",
//                 "Resuming live video..."
//             ];
//             let msgIndex = Math.floor(elapsed / 2000) % messages.length;
//             let currentMsg = messages[msgIndex];

//             const icons = ["📡", "🔄", "⚡", "📺", "✓"];
//             let iconIndex = Math.floor(elapsed / 800) % icons.length;
//             let currentIcon = icons[iconIndex];

//             if (overlay) {
//                 const barFill = overlay.querySelector('.recovery-bar-fill');
//                 const timeEl = overlay.querySelector('.recovery-time');
//                 const msgEl = overlay.querySelector('.recovery-msg');
//                 const iconEl = overlay.querySelector('.recovery-icon');
                
//                 if (barFill) barFill.style.width = percentage + '%';
//                 if (timeEl) timeEl.innerText = elapsedSec + ' seconds';
//                 if (msgEl) msgEl.innerText = currentMsg;
//                 if (iconEl) iconEl.innerText = currentIcon;
//             } else {
//                 overlay = document.createElement('div');
//                 overlay.id = 'smart-recovery-overlay';
//                 overlay.innerHTML = `
//                     <style>
//                         #smart-recovery-overlay {
//                             position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                             width: 100vw !important; height: 100vh !important; background: rgba(0, 0, 0, 0.85) !important;
//                             backdrop-filter: blur(8px) !important;
//                             z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                             justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                             pointer-events: none !important;
//                         }
//                         .recovery-icon-container { font-size: 50px; margin-bottom: 20px; text-shadow: 0 0 20px rgba(255,255,255,0.5); }
//                         .recovery-title { font-size: 32px !important; font-weight: 800 !important; letter-spacing: 2px !important; margin-bottom: 25px !important; text-transform: uppercase !important; }
//                         .recovery-stats-box { background: rgba(255,255,255,0.1); padding: 15px 30px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); text-align: center; margin-bottom: 30px; min-width: 250px; }
//                         .recovery-label { font-size: 14px; color: #aaaaaa; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
//                         .recovery-time { font-size: 24px; font-weight: bold; color: #ff4d4d; font-variant-numeric: tabular-nums; }
//                         .recovery-bar-container { width: 350px; height: 8px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; margin-bottom: 20px; }
//                         .recovery-bar-fill { width: ${percentage}%; height: 100%; background: linear-gradient(90deg, #ff4d4d, #ff0000); transition: width 0.3s ease; }
//                         .recovery-msg { font-size: 16px; color: #dddddd; font-style: italic; }
//                     </style>
//                     <div class="recovery-icon-container"><span class="recovery-icon">${currentIcon}</span></div>
//                     <div class="recovery-title">LIVE RECOVERY</div>
//                     <div class="recovery-stats-box">
//                         <div class="recovery-label">Recovery Time</div>
//                         <div class="recovery-time">${elapsedSec} seconds</div>
//                     </div>
//                     <div class="recovery-bar-container"><div class="recovery-bar-fill"></div></div>
//                     <div class="recovery-msg">${currentMsg}</div>
//                 `;
//                 document.documentElement.appendChild(overlay);
//             }
//         }, elapsedMs, thresholdMs);
//     } catch (e) { }
// }

// async function removeRecoveryOverlay(page) {
//     if (!page) return;
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('smart-recovery-overlay');
//             if (overlay) overlay.remove();
//         });
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
//         "scene_order": [{ "name": "WaitingScene" }, { "name": "MainScene" }],
//         "sources": [
//             { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
//             { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
//             {
//                 "id": "scene", "name": "MainScene",
//                 "settings": { "items": [{ "name": "Screen", "id": 1, "visible": true }, { "name": "Audio", "id": 2, "visible": true }] }
//             },
//             {
//                 "id": "scene", "name": "WaitingScene",
//                 "settings": { "items": [{ "name": "Screen", "id": 1, "visible": true }] }
//             }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// function attachAntiAdListeners(page) {
//     page.on('dialog', async dialog => {
//         try { await dialog.dismiss(); } catch (e) { }
//     });
// }

// // =========================================================================================
// // 🔊 2026 INTELLIGENT FUZZY UNMUTE ENGINE (No Class/ID Dependence)
// // =========================================================================================
// async function triggerSmartUnmute(page) {
//     for (const frame of page.frames()) {
//         try {
//             if (frame.isDetached()) continue;

//             await frame.evaluate(() => {
//                 // 1. Scan all interactive elements
//                 const potentialElements = Array.from(document.querySelectorAll('button, div, span, a, i'));

//                 potentialElements.forEach(el => {
//                     const text = (el.innerText || el.textContent || '').trim().toUpperCase();
//                     const onClickStr = (el.getAttribute('onclick') || '').toLowerCase();
//                     const ariaLabel = (el.getAttribute('aria-label') || '').toUpperCase();

//                     // Fuzzy match checking
//                     const matchesText = text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('STREAM UNMUTE') || text.includes('AUDIO');
//                     const matchesJS = onClickStr.includes('unmute') || onClickStr.includes('volume') || onClickStr.includes('audio');
//                     const matchesAria = ariaLabel.includes('UNMUTE') || ariaLabel.includes('VOLUME');

//                     if (matchesText || matchesJS || matchesAria) {
//                         const rect = el.getBoundingClientRect();
//                         const isVisible = rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';

//                         if (isVisible) {
//                             console.log(`[🔊 ENGINE]: Dynamically triggered click on element with text: "${text || 'JS Action'}"`);
//                             try { el.click(); } catch (e) { }
//                             try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch (e) { }
//                         }
//                     }
//                 });

//                 // 2. Bruteforce Browser Native Media Layer
//                 document.querySelectorAll('video, audio').forEach(media => {
//                     if (media.muted) {
//                         media.muted = false;
//                         media.volume = 1.0;
//                     }
//                 });
//             }).catch(() => { });
//         } catch (e) { }
//     }
// }
// // =========================================================================================

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

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play, #hero-play-btn');
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
//                             for (let v of vids) {
//                                 if (v.clientWidth > 50) {
//                                     v.muted = false; v.volume = 1.0;
//                                     try { v.click(); } catch (e) { }
//                                     try {
//                                         let p = v.play();
//                                         if (p !== undefined) p.catch(() => { });
//                                         played = true;
//                                     } catch (e) { }
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
//                 } catch (err) { }
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

//         await page.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     document.documentElement.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('overflow', 'hidden', 'important');
//                     document.documentElement.style.setProperty('overflow', 'hidden', 'important');

//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = null; let maxScore = -1;

//                     // 1. ADVANCED GEOMETRIC SCORING
//                     iframes.forEach(ifr => {
//                         let width = ifr.clientWidth;
//                         let height = ifr.clientHeight;
//                         let area = width * height;

//                         if (area < 5000) return;

//                         let score = area;

//                         if (ifr.hasAttribute('allowfullscreen') ||
//                             ifr.hasAttribute('webkitallowfullscreen') ||
//                             ifr.hasAttribute('mozallowfullscreen')) {
//                             score += 10000000;
//                         }

//                         if (height > width) {
//                             score = -1;
//                         }

//                         if (score > maxScore) {
//                             maxScore = score;
//                             mainIframe = ifr;
//                         }
//                     });

//                     if (!mainIframe && iframes.length > 0) {
//                         mainIframe = iframes.find(ifr =>
//                             ifr.getAttribute('allowfullscreen') !== null ||
//                             (ifr.src && (ifr.src.includes('player') || ifr.src.includes('embed') || ifr.src.includes('stream') || ifr.src.includes('watch')))
//                         );
//                     }

//                     if (mainIframe) {
//                         iframes.forEach(ifr => {
//                             if (ifr !== mainIframe) {
//                                 ifr.style.setProperty('display', 'none', 'important');
//                                 ifr.style.setProperty('opacity', '0', 'important');
//                                 ifr.style.setProperty('z-index', '-9999', 'important');

//                                 if (ifr.parentNode && ifr.parentNode !== document.body) {
//                                     try {
//                                         ifr.parentNode.style.setProperty('display', 'none', 'important');
//                                         ifr.parentNode.style.setProperty('opacity', '0', 'important');
//                                     } catch (e) { }
//                                 }
//                             }
//                         });

//                         mainIframe.style.setProperty('position', 'fixed', 'important');
//                         mainIframe.style.setProperty('top', '0px', 'important');
//                         mainIframe.style.setProperty('left', '0px', 'important');
//                         mainIframe.style.setProperty('width', '100vw', 'important');
//                         mainIframe.style.setProperty('height', '100vh', 'important');
//                         mainIframe.style.setProperty('z-index', '2147483645', 'important');
//                         mainIframe.style.setProperty('background-color', 'black', 'important');
//                         mainIframe.style.setProperty('border', 'none', 'important');
//                         mainIframe.style.setProperty('opacity', '1', 'important');
//                         mainIframe.style.setProperty('display', 'block', 'important');
//                         mainIframe.style.setProperty('visibility', 'visible', 'important');
//                     }

//                     const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay), [id*="pop"], [class*="pop"], a[href*="extension"], [class*="notification"], [id*="notification"]';
//                     document.querySelectorAll(junkClasses).forEach(el => {
//                         try { el.remove(); } catch (e) { el.style.setProperty('display', 'none', 'important'); }
//                     });

//                     const adKeywords = ['jerk', 'mate', 'free', 'online', 'adult', 'dating', 'close', 'notification', 'justine', 'paying', 'job'];
//                     document.querySelectorAll('div, section, span, a').forEach(el => {
//                         if (el.id === 'smart-stream-overlay') return;

//                         const style = window.getComputedStyle(el);
//                         const isFloating = style.position === 'fixed' || style.position === 'absolute';

//                         if (isFloating && el.innerText) {
//                             const textLower = el.innerText.toLowerCase();
//                             const hasBadKeyword = adKeywords.some(keyword => textLower.includes(keyword));

//                             if (hasBadKeyword || (parseInt(style.zIndex) > 100000 && !el.querySelector('video') && !el.querySelector('iframe'))) {
//                                 try { el.remove(); } catch (e) { el.style.setProperty('display', 'none', 'important'); }
//                             }
//                         }
//                     });

//                 } catch (err) { }
//             }, 500);
//         }).catch(() => { });

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
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch (e) { } });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (!realVideo && videos.length > 0) {
//                         realVideo = videos[0];
//                     }

//                     if (realVideo) {
//                         realVideo.style.setProperty('position', 'fixed', 'important');
//                         realVideo.style.setProperty('top', '0px', 'important');
//                         realVideo.style.setProperty('left', '0px', 'important');
//                         realVideo.style.setProperty('width', '100vw', 'important');
//                         realVideo.style.setProperty('height', '100vh', 'important');
//                         realVideo.style.setProperty('z-index', '2147483646', 'important');
//                         realVideo.style.setProperty('background-color', 'black', 'important');
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         realVideo.style.setProperty('opacity', '1', 'important');
//                         realVideo.style.setProperty('visibility', 'visible', 'important');
//                         realVideo.style.setProperty('display', 'block', 'important');
//                     }
//                 } catch (err) { }
//             }, 500);
//         }, startMuted).catch(() => { });

//     } catch (e) { }

//     // 🔥 Added Smart Unmute Execution Here
//     await triggerSmartUnmute(page);
//     await new Promise(r => setTimeout(r, 1000));
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

//                         if (targetV && !targetV.ended && targetV.currentTime > 0) {
//                             let frames = 0;
//                             if (targetV.getVideoPlaybackQuality) {
//                                 frames = targetV.getVideoPlaybackQuality().totalVideoFrames;
//                             } else if (targetV.webkitDecodedFrameCount !== undefined) {
//                                 frames = targetV.webkitDecodedFrameCount;
//                             }
                            
//                             let bufferRemaining = 0;
//                             try {
//                                 if (targetV.buffered && targetV.buffered.length > 0) {
//                                     bufferRemaining = targetV.buffered.end(targetV.buffered.length - 1) - targetV.currentTime;
//                                 }
//                             } catch (e) {}

//                             return { 
//                                 status: 'HEALTHY', 
//                                 currentTime: targetV.currentTime, 
//                                 decodedFrames: frames,
//                                 readyState: targetV.readyState,
//                                 networkState: targetV.networkState,
//                                 paused: targetV.paused,
//                                 bufferRemaining: bufferRemaining
//                             };
//                         }
//                         return { status: 'DEAD' };
//                     }),
//                     new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2500))
//                 ]);
//                 if (result && result.status !== 'DEAD') return result;
//             } catch (err) { }
//         }
//     } catch (e) { return { status: 'DEAD' }; }
//     return { status: 'DEAD' };
// }

// async function startWatchdog() {
//     let lastActiveTime = -1;
//     let lastDecodedFrames = -1;
//     let frozenCheckTimestamp = Date.now();
//     let watchdogTicks = 0;

//     // Predictive Watchdog State
//     let serverHealthScore = 100;
//     let recentFreezes = []; // Stores { timestamp, duration }
//     let dynamicFreezeThreshold = FROZEN_THRESHOLD_MS;

//     let isCurrentlyHanging = false;
//     let lastHangLogTime = 0;

//     let streamSetupTime = Date.now();
//     let isWarmupPhase = true;
//     const WARMUP_MAX_TIME = 35000;

//     let activeUrlStr = urlList[currentUrlIndex];
//     let backupUrlStr = urlList[backupUrlIndex];

//     let currentStreamStartTime = Date.now();

//     while (true) {
//         if (!browser || !browser.isConnected()) throw new Error("Browser closed.");

//         let activeStatus = await checkPageStatus(activePage);
//         let backupStatus = await checkPageStatus(backupPage); // Continuous backup monitoring

//         if (activeStatus.status === 'HEALTHY' && !isWarmupPhase) {
//             let elapsedMs = Date.now() - currentStreamStartTime;
//             let isExempted = NO_REFRESH_DOMAINS.some(domain => activeUrlStr.includes(domain));

//             if (elapsedMs > FORCE_REFRESH_MS) {
//                 if (!isExempted) {
//                     console.log(`\n[⏱️ PROACTIVE REFRESH]: Stream ran smoothly for ${FORCE_REFRESH_MINUTES} minutes! Forcing SAME LINK swap to keep connection fresh...`);
//                     activeStatus.status = 'FORCE_REFRESH';
//                 }
//             }
//         }

//         if (activeStatus.status === 'HEALTHY') {
//             if (isWarmupPhase) {
//                 let setupTimeSec = ((Date.now() - streamSetupTime) / 1000).toFixed(1);
//                 console.log(`\n[🚀] STREAM READY: Video successfully start ho gayi hai! Initial Setup & Buffering me ${setupTimeSec} seconds lagay.\n`);
//             }

//             await hideLoadingUI(activePage);
//             isWarmupPhase = false;

//             await triggerSmartUnmute(activePage);

//             let isTimeStuck = (activeStatus.currentTime === lastActiveTime) && !activeStatus.paused;
//             let isFrameStuck = (activeStatus.decodedFrames === lastDecodedFrames && activeStatus.decodedFrames > 0);
//             let isStalling = isTimeStuck || (activeStatus.readyState !== undefined && activeStatus.readyState < 3);

//             if (isStalling || isFrameStuck) {
//                 let hangDuration = Date.now() - frozenCheckTimestamp;

//                 if (!isCurrentlyHanging) {
//                     isCurrentlyHanging = true;
//                     console.log(`\n[⚠️] HANG DETECTED: Stream lag check start... Monitoring recovery.`);
//                 }

//                 if (hangDuration > 1000) {
//                     updateRecoveryOverlay(activePage, hangDuration, dynamicFreezeThreshold);
//                 }

//                 // Penalize health score for ongoing freezes > 3 seconds
//                 if (hangDuration > 3000) {
//                     serverHealthScore = Math.max(0, serverHealthScore - 2);
//                 }

//                 if (Date.now() - lastHangLogTime >= 4000 && hangDuration < dynamicFreezeThreshold) {
//                     console.log(`[⏳] HANG MONITOR: Stream stuck... (${(hangDuration / 1000).toFixed(1)}s) | Score: ${serverHealthScore}`);
//                     lastHangLogTime = Date.now();
//                 }

//                 // Predictive Swap Condition
//                 let scoreTooLow = (serverHealthScore < 40 && backupStatus.status === 'HEALTHY');
//                 let freezeTooLong = (hangDuration > dynamicFreezeThreshold);

//                 if (scoreTooLow || freezeTooLong) {
//                     activeStatus.status = 'FROZEN';
//                     if (scoreTooLow) {
//                         console.log(`[!] ⚠️ SYSTEM SHIELD: Server unstable (Score: ${serverHealthScore}). Backup is healthy. Triggering PREDICTIVE HOT-SWAP.`);
//                     } else if (isFrameStuck && !isTimeStuck) {
//                         console.log(`[!] ⚠️ SYSTEM SHIELD: Detected Black Screen (Audio playing, but video frames stuck). Triggering HOT-SWAP.`);
//                     }
//                 }
//             } else {
//                 if (isCurrentlyHanging) {
//                     let recoveredHangDuration = Date.now() - frozenCheckTimestamp;
//                     console.log(`[✅] RECOVERY SUCCESS: Stream wapas start! Hang Time: ${(recoveredHangDuration / 1000).toFixed(1)}s | Score: ${serverHealthScore}\n`);
//                     isCurrentlyHanging = false;
//                     removeRecoveryOverlay(activePage);

//                     // Track recent freezes
//                     recentFreezes.push({ timestamp: Date.now(), duration: recoveredHangDuration });
                    
//                     // Clean old freezes (> 2 minutes ago)
//                     recentFreezes = recentFreezes.filter(f => Date.now() - f.timestamp < 120000);
                    
//                     // Adjust dynamic threshold based on recent micro-freezes
//                     if (recentFreezes.length > 2) {
//                         dynamicFreezeThreshold = Math.max(5000, FROZEN_THRESHOLD_MS - (recentFreezes.length * 3000));
//                         console.log(`[📉] Unstable stream detected (${recentFreezes.length} recent freezes). Lowering freeze threshold to ${(dynamicFreezeThreshold/1000).toFixed(1)}s`);
//                     } else {
//                         dynamicFreezeThreshold = FROZEN_THRESHOLD_MS;
//                     }
//                 } else {
//                     // Gradual score recovery if playing perfectly
//                     if (serverHealthScore < 100 && watchdogTicks % 10 === 0) {
//                         serverHealthScore += 1;
//                     }
//                 }

//                 lastActiveTime = activeStatus.currentTime;
//                 lastDecodedFrames = activeStatus.decodedFrames;
//                 frozenCheckTimestamp = Date.now();
//                 lastHangLogTime = Date.now(); 

//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             frame.evaluate(() => {
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; });
//                                 document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch (e) { } });
//                             }).catch(() => { });
//                         }
//                     } catch (e) { }
//                 }
//             }
//         }

//         if (backupPage) {
//             for (const frame of backupPage.frames()) {
//                 try {
//                     if (!frame.isDetached()) {
//                         frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }).catch(() => { });
//                     }
//                 } catch (e) { }
//             }
//         }

//         watchdogTicks++;

//         if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
//             console.log(`\n[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//             console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//             console.log(`[⏭️] NEXT IN QUEUE    : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//         }

//         if (watchdogTicks % 120 === 0) {
//             await takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
//         }

//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH') {

//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) {
//                 let warmupElapsed = ((Date.now() - streamSetupTime) / 1000).toFixed(1);
//                 let warmupTotal = (WARMUP_MAX_TIME / 1000).toFixed(1);
//                 console.log(`[⏳] WARM-UP MONITOR: Detected '${activeStatus.status}', stream abhi buffering/setup phase me hai... (${warmupElapsed}s / ${warmupTotal}s elapsed)`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue;
//             }

//             let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

//             if (isProactiveRefresh) {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] 🔄 PROACTIVE REFRESH TRIGGERED`);
//                 console.log(`[*] Preparing a FRESH copy of SAME Server [${currentUrlIndex}] in background...`);
//                 console.log(`==================================================`);

//                 for (const frame of activePage.frames()) {
//                     try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch (e) { }
//                 }

//                 try {
//                     await backupPage.goto('about:blank').catch(() => { });
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => { });
//                 } catch (e) {
//                     console.log(`[⏳] Proactive refresh buffer navigation handled safely.`);
//                 }
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
//                 console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`==================================================`);
//                 await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
//             }

//             console.log(`[*] Checking Backup Tab status before switching...`);
//             backupStatus = await checkPageStatus(backupPage);

//             if (backupStatus.status === 'HEALTHY' || backupStatus.status === 'DEAD') {

//                 if (!isProactiveRefresh) {
//                     for (const frame of activePage.frames()) {
//                         try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch (e) { }
//                     }
//                 }

//                 await showLoadingUI(backupPage, isProactiveRefresh ? "REFRESHING CONNECTION" : "RECONNECTING", isProactiveRefresh ? "Optimizing current server stream <span class='stream-blink'>...</span>" : "Establishing secure connection to backup server <span class='stream-blink'>...</span>");
//                 await backupPage.bringToFront();
//                 await new Promise(r => setTimeout(r, 1000));

//                 try { await backupPage.mouse.click(10, 10); } catch (e) { }

//                 console.log(`[*] Initializing Video on the newly active tab...`);
//                 await initializeVideo(backupPage, false, true);
//                 await hideLoadingUI(backupPage);

//                 let brokenPage = activePage; activePage = backupPage; backupPage = brokenPage;
//                 lastActiveTime = -1; frozenCheckTimestamp = Date.now();

//                 // Reset predictive states
//                 serverHealthScore = 100;
//                 recentFreezes = [];
//                 dynamicFreezeThreshold = FROZEN_THRESHOLD_MS;

//                 if (!isProactiveRefresh) {
//                     currentUrlIndex = backupUrlIndex; activeUrlStr = urlList[currentUrlIndex];
//                     backupUrlIndex = (backupUrlIndex + 1) % urlList.length; backupUrlStr = urlList[backupUrlIndex];
//                 }

//                 console.log(`\n==================================================`);
//                 console.log(isProactiveRefresh ? `[🔄] SAME-SERVER FRESH SWAP EXECUTED SUCCESSFULLY` : `[🔄] SMART HOT-SWAP TO NEXT SERVER EXECUTED SUCCESSFULLY`);
//                 console.log(`==================================================`);
//                 console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`[🔊] LIVE AUDIO STATUS : ON (Unmuted & Forced)`);
//                 console.log(`--------------------------------------------------`);
//                 console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//                 console.log(`[🔇] BACKUP AUDIO      : MUTED (Background Loading)`);
//                 console.log(`==================================================\n`);

//                 try {
//                     await backupPage.goto('about:blank').catch(() => { });
//                     await applyPreloadFirewall(backupPage);
//                     backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => { });
//                 } catch (e) {
//                     console.log(`[⏳] Background buffer navigation handled safely.`);
//                 }

//                 streamSetupTime = Date.now();
//                 isWarmupPhase = true;
//                 currentStreamStartTime = Date.now();

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
//             console.log('[+] Enforced WaitingScene (Loading Bar Buffer Active)');
//         } catch (e) { }
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
//         '--disable-renderer-backgrounding',

//         `--disable-extensions-except=${path.join(process.cwd(), 'ublock-lite')}`,
//         `--load-extension=${path.join(process.cwd(), 'ublock-lite')}`
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
//                     try { await newPage.close(); } catch (e) { }
//                 }
//             }, 500);
//         }
//     });

//     const pages = await browser.pages();
//     activePage = pages[0];
//     backupPage = await browser.newPage();

//     await setupNetworkAdBlocker(activePage);
//     await setupNetworkAdBlocker(backupPage);

//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await applyPreloadFirewall(activePage);
//     await applyPreloadFirewall(backupPage);

//     await activePage.bringToFront();

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex]}`);
//     await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });

//     // await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");

//     // await initializeVideo(activePage, false, true); 
//     // await hideLoadingUI(activePage); 


//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");

//     // NAYA FIX: Tab 2 ki tarah yahan bhi delay aur click add kiya hai taake Player unlock ho jaye
//     await new Promise(r => setTimeout(r, 1000));
//     try { await activePage.mouse.click(10, 10); } catch (e) { }

//     await initializeVideo(activePage, false, true);
//     await hideLoadingUI(activePage);


//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) { }
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex]}`);
//     backupPage.goto(urlList[backupUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => { });

//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch (e) { }
//     await hideLoadingUI(activePage);

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
//     if (browser) { try { await browser.close(); } catch (e) { } browser = null; }
//     if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch (e) { } obsProcess = null; }
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













// ========================== 111111111111111111111111-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa




// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js');

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD (2026 LATEST FIX)
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     if (err.message && err.message.includes('Requesting main frame too early')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored stealth plugin background frame error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNCAUGHT EXCEPTION: ${err.message}`);
//     }
// });

// process.on('unhandledRejection', (reason, promise) => {
//     let msg = reason && reason.message ? reason.message : reason;
//     if (msg && msg.includes('Protocol error')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored detached frame protocol error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNHANDLED REJECTION: ${msg}`);
//     }
// });
// // =========================================================================================

// const obs = new OBSWebSocket();

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME (IN MINUTES)
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 400;
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// // =========================================================================================
// // 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// // =========================================================================================
// const NO_REFRESH_DOMAINS = [
//     'youtube.com',
//     'facebook.com',
//     'streamed.pk',
//     'cricstreams.', // crichd
//     'website-vercel-helper-d-jaja-3-2.vercel.app',
//     'websitestream.netlify.app/?ch=Channel%20HD%2071'
// ];

// // 🚀 Multi-Stream Key Manager
// const STREAM_KEYS = {
//     '1': '15254238731883_15281627925099_najspfkgne',
//     '1.1': '15254260751979_15281671637611_2plrcfqzze',
//     '1.2': '15254285524587_15281717840491_7e6qdknzsu',

//     '2': '15254299352683_15281743071851_7dvz3h5d7q',
//     '2.1': '15254308986475_15281761618539_3xca7oij3u',
//     '2.2': '15254328122987_15281795566187_zjqa6bqzoq',

//     '3': '15254341885547_15281821059691_hhlpb5vicy',
//     '3.1': '15254357089899_15281848322667_sxeexgvzl4',
//     '3.2': '15254367510123_15281868180075_pc4jrytfgm',

//     '4': '15255022345835_15283095800427_vwrupxzstm',
//     '4.1': '15255038074475_15283122080363_ai5qqp2we4',
//     '4.2': '15255045480043_15283135842923_tldl4bhmii',
//     '4.3': '15255208599147_15283449629291_abltofuc7m',
//     '4.4': '15255217708651_15283466603115_bojrrqtlmu',
//     '4.5': '15255227670123_15283486263915_jpntt54mve',

//     '5': '15273689226859_15317451606635_d7zzy3c7qi',
//     '5.1': '15273713933931_15317494860395_avj47smmim',
//     '5.2': '15273722257003_15317510195819_6edjluvdqi',
//     '5.3': '15273739624043_15317541653099_ii4bxpvabe',
//     '5.4': '15273750175339_15317561707115_csel26ku5a',
//     '5.5': '15273760071275_15317579467371_cnewcj54me',
//     '5.6': '15273767935595_15317595851371_3q43tk7tvm',

//     's1.1': '14204232736303_14846150314543_37jq4ryehq',
//     's1.2': '14204288179759_14846247373359_tnsknmapva',
//     's1.3': '14204319768111_14846302489135_sr4ht4ccwq',
//     's1.4': '14204331957807_14846326147631_dji2acqcze',
//     's1.5': '14204346572335_14846351641135_7gvns4o5ue',
//     's1.6': '14204361252399_14846376479279_cjajhf4d3y',
//     's1.7': '14204370492975_14846393649711_6fduhdqite',
//     's1.8': '14204395527727_14846438017583_s2jlti7lsm',
//     's1.9': '14204411387439_14846464887343_f5lxgcqj5y',
//     's1.10': '14204424691247_14846487562799_xmbvntt6wa',

//     's2.1': '14204490948143_14846603495983_kzevn36tii',
//     's2.2': '14204506742319_14846634494511_ta2rxyg2oy',
//     's2.3': '14204523322927_14846661233199_foqb3q7zb4',
//     's2.4': '14204540034607_14846689085999_gjejdie4uy',
//     's2.5': '14204555304495_14846715497007_zdanghuxzu',
//     's2.6': '14204565200431_14846734371375_ap3bqpabpu',
//     's2.7': '14204577259055_14846756194863_3ecad2535u',
//     's2.8': '14204592528943_14846785227311_4hjl46y62e',
//     's2.9': '14204602621487_14846802594351_ilnp6lxekq',
//     's2.10': '14206184136239_14849618610735_ihnbx7hkoi'
// };

// const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
// let RES_W = 1920, RES_H = 1080, BITRATE = 5000;

// if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
// else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
// else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
// else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }
// else { RES_W = 1920; RES_H = 1080; BITRATE = 6000; }

// console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);
// console.log(`[⏱️] Auto-Refresh Time Set To: ${FORCE_REFRESH_MINUTES} Minutes`);

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

// const FROZEN_THRESHOLD_MS = 16000;

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount = 0;

// // =========================================================================================
// // 🛡️ ADVANCED NETWORK INTELLIGENCE & NAVIGATION SHIELD
// // =========================================================================================
// async function setupNetworkAdBlocker(page) {
//     if (!page) return;
//     try {
//         await page.setRequestInterception(true);
//         page.on('request', (request) => {
//             const url = request.url().toLowerCase();
//             const type = request.resourceType();

//             // 🛑 Aggressive payload blocking added here
//             const adDomains = [
//                 'popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate',
//                 'adrevenue', 'fanduel', 'adexchangerapid', 'doubleclick', 'propellerads'
//             ];

//             const isAdDomain = adDomains.some(keyword => url.includes(keyword));

//             if (isAdDomain) {
//                 console.log(`[🛡️] NETWORK SHIELD: Blocked known ad payload -> ${url.substring(0, 50)}...`);
//                 request.abort().catch(() => { });
//                 return;
//             }

//             // 🚫 SHIELD: Same-Tab Hostile Redirect Hijacking Block
//             if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
//                 const targetUrl = request.url().toLowerCase();
//                 const adKeywords = ['bet', 'casino'];
//                 if (adKeywords.some(keyword => targetUrl.includes(keyword))) {
//                     console.log(`[🛡️] NAVIGATION SHIELD: Blocked malicious ad redirection to -> ${targetUrl.substring(0, 70)}...`);
//                     request.abort().catch(() => { });
//                     return;
//                 }
//             }

//             if (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone'))) {
//                 request.abort().catch(() => { });
//             } else {
//                 request.continue().catch(() => { });
//             }
//         });
//     } catch (e) { console.log('[⚠️] Request interception setup failed.'); }
// }

// async function applyPreloadFirewall(page) {
//     if (!page) return;
//     try {
//         await page.evaluateOnNewDocument(() => {
//             // =========================================================
//             // 🛑 ULTIMATE SHADOW DOM AD KILLER (Monkey Patching)
//             // =========================================================
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function (init) {
//                 if (init && init.mode === 'closed') {
//                     init.mode = 'open'; // Force open to allow inspection
//                 }
//                 const shadowRoot = originalAttachShadow.call(this, init);

//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) {
//                         console.log('[🛡️] SHIELD: Shadow DOM Ad Detected & Destroyed!');
//                         this.remove(); // Kill the entire host element
//                     }
//                 });

//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };

//             // Permanent root execution block for popup alerts & confirms
//             // window.alert = function() {};
//             // window.confirm = function() { return true; };
//             // window.prompt = function() { return null; };
//             // window.open = function() { return null; };

//             // 🚫 ANTI-DIALOG FIX: Neutralize onbeforeunload modal box popup completely
//             Object.defineProperty(window, 'onbeforeunload', {
//                 configurable: true,
//                 get: function () { return null; },
//                 set: function () { return null; }
//             });

//             document.addEventListener('click', (e) => {
//                 const target = e.target;
//                 if (target && (target.tagName === 'A' || target.closest('a'))) {
//                     const link = target.tagName === 'A' ? target : target.closest('a');
//                     if (link.href && !link.href.includes(window.location.hostname) && !link.href.includes('javascript')) {
//                         console.log("[🛡️] RE-DIRECT SHIELD: Blocked navigation to external ad domain.");
//                         e.preventDefault();
//                         e.stopPropagation();
//                         return false;
//                     }
//                 }
//             }, true);

//             const style = document.createElement('style');
//             style.textContent = `
//                 html, body { background-color: #000000 !important; overflow: hidden !important; }
//                 in-page-message, [id^="note-"], [id^="missclick-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }
//             `;
//             document.documentElement.appendChild(style);

//             const attachOverlay = () => {
//                 let target = document.body || document.documentElement;
//                 if (target && !document.getElementById('smart-stream-overlay')) {
//                     const overlay = document.createElement('div');
//                     overlay.id = 'smart-stream-overlay';
//                     overlay.innerHTML = `
//                         <style>
//                             #smart-stream-overlay {
//                                 position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                                 width: 100vw !important; height: 100vh !important; background: #000000 !important;
//                                 z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                                 justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                                 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                                 pointer-events: all !important;
//                             }
//                             .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                             .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                             .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                             @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                             @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                             .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                             .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                         </style>
//                         <div class="stream-spinner"></div>
//                         <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                         <div class="stream-title">STREAM LOADING</div>
//                         <div class="stream-sub">Connecting to secure stream engine...</div>
//                     `;
//                     target.appendChild(overlay);
//                 } else if (!target) {
//                     requestAnimationFrame(attachOverlay);
//                 }
//             };
//             attachOverlay();
//         });
//     } catch (e) {
//         console.log(`[🛡️] SYSTEM SHIELD: Preload firewall safe injection caught an error.`);
//     }
// }

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
//                 try { execSync(`gh release view ${tag} || gh release create ${tag} -t "Live Logs"`, { stdio: 'ignore' }); } catch (e) { }
//                 try {
//                     const oldAssets = execSync(`gh release view ${tag} --json assets -q ".assets[].name"`, { encoding: 'utf-8' }).trim().split('\n');
//                     for (const asset of oldAssets) if (asset) execSync(`gh release delete-asset ${tag} "${asset}" -y`, { stdio: 'ignore' });
//                 } catch (e) { }

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

//             if (overlay) {
//                 const titleEl = overlay.querySelector('.stream-title');
//                 const subEl = overlay.querySelector('.stream-sub');
//                 if (titleEl) titleEl.innerHTML = t;
//                 if (subEl) subEl.innerHTML = s;

//                 overlay.style.setProperty('display', 'flex', 'important');
//                 overlay.style.setProperty('opacity', '1', 'important');
//                 overlay.style.setProperty('z-index', '2147483647', 'important');
//             }
//             else {
//                 overlay = document.createElement('div');
//                 overlay.id = 'smart-stream-overlay';
//                 overlay.innerHTML = `
//                     <style>
//                         #smart-stream-overlay {
//                             position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                             width: 100vw !important; height: 100vh !important; background: #000000 !important;
//                             z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                             justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                             pointer-events: all !important;
//                         }
//                         .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                         .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                         .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                         @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                         @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                         .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                         .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                     </style>
//                     <div class="stream-spinner"></div>
//                     <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                     <div class="stream-title">${t}</div>
//                     <div class="stream-sub">${s}</div>
//                 `;
//                 document.documentElement.appendChild(overlay);
//             }
//         }, title, sub);
//     } catch (e) { }
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'none', 'important');
//                 overlay.style.setProperty('opacity', '0', 'important');
//                 overlay.style.setProperty('z-index', '-9999', 'important');
//                 overlay.remove();
//             }
//         });
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
//         "scene_order": [{ "name": "WaitingScene" }, { "name": "MainScene" }],
//         "sources": [
//             { "id": "xshm_input", "name": "Screen", "settings": { "show_cursor": false } },
//             { "id": "pulse_output_capture", "name": "Audio", "settings": {} },
//             {
//                 "id": "scene", "name": "MainScene",
//                 "settings": { "items": [{ "name": "Screen", "id": 1, "visible": true }, { "name": "Audio", "id": 2, "visible": true }] }
//             },
//             {
//                 "id": "scene", "name": "WaitingScene",
//                 "settings": { "items": [{ "name": "Screen", "id": 1, "visible": true }] }
//             }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// function attachAntiAdListeners(page) {
//     page.on('dialog', async dialog => {
//         try { await dialog.dismiss(); } catch (e) { }
//     });
// }

// // =========================================================================================
// // 🔊 2026 INTELLIGENT FUZZY UNMUTE ENGINE (No Class/ID Dependence)
// // =========================================================================================
// async function triggerSmartUnmute(page) {
//     for (const frame of page.frames()) {
//         try {
//             if (frame.isDetached()) continue;

//             await frame.evaluate(() => {
//                 // 1. Scan all interactive elements
//                 const potentialElements = Array.from(document.querySelectorAll('button, div, span, a, i'));

//                 potentialElements.forEach(el => {
//                     const text = (el.innerText || el.textContent || '').trim().toUpperCase();
//                     const onClickStr = (el.getAttribute('onclick') || '').toLowerCase();
//                     const ariaLabel = (el.getAttribute('aria-label') || '').toUpperCase();

//                     // Fuzzy match checking
//                     const matchesText = text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('STREAM UNMUTE') || text.includes('AUDIO');
//                     const matchesJS = onClickStr.includes('unmute') || onClickStr.includes('volume') || onClickStr.includes('audio');
//                     const matchesAria = ariaLabel.includes('UNMUTE') || ariaLabel.includes('VOLUME');

//                     if (matchesText || matchesJS || matchesAria) {
//                         const rect = el.getBoundingClientRect();
//                         const isVisible = rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';

//                         if (isVisible) {
//                             console.log(`[🔊 ENGINE]: Dynamically triggered click on element with text: "${text || 'JS Action'}"`);
//                             try { el.click(); } catch (e) { }
//                             try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch (e) { }
//                         }
//                     }
//                 });

//                 // 2. Bruteforce Browser Native Media Layer
//                 document.querySelectorAll('video, audio').forEach(media => {
//                     if (media.muted) {
//                         media.muted = false;
//                         media.volume = 1.0;
//                     }
//                 });
//             }).catch(() => { });
//         } catch (e) { }
//     }
// }
// // =========================================================================================

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

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play, #hero-play-btn');
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
//                             for (let v of vids) {
//                                 if (v.clientWidth > 50) {
//                                     v.muted = false; v.volume = 1.0;
//                                     try { v.click(); } catch (e) { }
//                                     try {
//                                         let p = v.play();
//                                         if (p !== undefined) p.catch(() => { });
//                                         played = true;
//                                     } catch (e) { }
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
//                 } catch (err) { }
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

//         await page.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     document.documentElement.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('overflow', 'hidden', 'important');
//                     document.documentElement.style.setProperty('overflow', 'hidden', 'important');

//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = null; let maxScore = -1;

//                     // 1. ADVANCED GEOMETRIC SCORING
//                     iframes.forEach(ifr => {
//                         let width = ifr.clientWidth;
//                         let height = ifr.clientHeight;
//                         let area = width * height;

//                         if (area < 5000) return;

//                         let score = area;

//                         if (ifr.hasAttribute('allowfullscreen') ||
//                             ifr.hasAttribute('webkitallowfullscreen') ||
//                             ifr.hasAttribute('mozallowfullscreen')) {
//                             score += 10000000;
//                         }

//                         if (height > width) {
//                             score = -1;
//                         }

//                         if (score > maxScore) {
//                             maxScore = score;
//                             mainIframe = ifr;
//                         }
//                     });

//                     if (!mainIframe && iframes.length > 0) {
//                         mainIframe = iframes.find(ifr =>
//                             ifr.getAttribute('allowfullscreen') !== null ||
//                             (ifr.src && (ifr.src.includes('player') || ifr.src.includes('embed') || ifr.src.includes('stream') || ifr.src.includes('watch')))
//                         );
//                     }

//                     if (mainIframe) {
//                         iframes.forEach(ifr => {
//                             if (ifr !== mainIframe) {
//                                 ifr.style.setProperty('display', 'none', 'important');
//                                 ifr.style.setProperty('opacity', '0', 'important');
//                                 ifr.style.setProperty('z-index', '-9999', 'important');

//                                 if (ifr.parentNode && ifr.parentNode !== document.body) {
//                                     try {
//                                         ifr.parentNode.style.setProperty('display', 'none', 'important');
//                                         ifr.parentNode.style.setProperty('opacity', '0', 'important');
//                                     } catch (e) { }
//                                 }
//                             }
//                         });

//                         mainIframe.style.setProperty('position', 'fixed', 'important');
//                         mainIframe.style.setProperty('top', '0px', 'important');
//                         mainIframe.style.setProperty('left', '0px', 'important');
//                         mainIframe.style.setProperty('width', '100vw', 'important');
//                         mainIframe.style.setProperty('height', '100vh', 'important');
//                         mainIframe.style.setProperty('z-index', '2147483645', 'important');
//                         mainIframe.style.setProperty('background-color', 'black', 'important');
//                         mainIframe.style.setProperty('border', 'none', 'important');
//                         mainIframe.style.setProperty('opacity', '1', 'important');
//                         mainIframe.style.setProperty('display', 'block', 'important');
//                         mainIframe.style.setProperty('visibility', 'visible', 'important');
//                     }

//                     const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay), [id*="pop"], [class*="pop"], a[href*="extension"], [class*="notification"], [id*="notification"]';
//                     document.querySelectorAll(junkClasses).forEach(el => {
//                         try { el.remove(); } catch (e) { el.style.setProperty('display', 'none', 'important'); }
//                     });

//                     const adKeywords = ['jerk', 'mate', 'free', 'online', 'adult', 'dating', 'close', 'notification', 'justine', 'paying', 'job'];
//                     document.querySelectorAll('div, section, span, a').forEach(el => {
//                         if (el.id === 'smart-stream-overlay') return;

//                         const style = window.getComputedStyle(el);
//                         const isFloating = style.position === 'fixed' || style.position === 'absolute';

//                         if (isFloating && el.innerText) {
//                             const textLower = el.innerText.toLowerCase();
//                             const hasBadKeyword = adKeywords.some(keyword => textLower.includes(keyword));

//                             if (hasBadKeyword || (parseInt(style.zIndex) > 100000 && !el.querySelector('video') && !el.querySelector('iframe'))) {
//                                 try { el.remove(); } catch (e) { el.style.setProperty('display', 'none', 'important'); }
//                             }
//                         }
//                     });

//                 } catch (err) { }
//             }, 500);
//         }).catch(() => { });

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
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch (e) { } });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (!realVideo && videos.length > 0) {
//                         realVideo = videos[0];
//                     }

//                     if (realVideo) {
//                         realVideo.style.setProperty('position', 'fixed', 'important');
//                         realVideo.style.setProperty('top', '0px', 'important');
//                         realVideo.style.setProperty('left', '0px', 'important');
//                         realVideo.style.setProperty('width', '100vw', 'important');
//                         realVideo.style.setProperty('height', '100vh', 'important');
//                         realVideo.style.setProperty('z-index', '2147483646', 'important');
//                         realVideo.style.setProperty('background-color', 'black', 'important');
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         realVideo.style.setProperty('opacity', '1', 'important');
//                         realVideo.style.setProperty('visibility', 'visible', 'important');
//                         realVideo.style.setProperty('display', 'block', 'important');
//                     }
//                 } catch (err) { }
//             }, 500);
//         }, startMuted).catch(() => { });

//     } catch (e) { }

//     // 🔥 Added Smart Unmute Execution Here
//     await triggerSmartUnmute(page);
//     await new Promise(r => setTimeout(r, 1000));
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

//                         if (targetV && !targetV.ended && targetV.currentTime > 0) {
//                             let frames = 0;
//                             if (targetV.getVideoPlaybackQuality) {
//                                 frames = targetV.getVideoPlaybackQuality().totalVideoFrames;
//                             } else if (targetV.webkitDecodedFrameCount !== undefined) {
//                                 frames = targetV.webkitDecodedFrameCount;
//                             }
                            
//                             let bufferRemaining = 0;
//                             try {
//                                 if (targetV.buffered && targetV.buffered.length > 0) {
//                                     bufferRemaining = targetV.buffered.end(targetV.buffered.length - 1) - targetV.currentTime;
//                                 }
//                             } catch (e) {}

//                             return { 
//                                 status: 'HEALTHY', 
//                                 currentTime: targetV.currentTime, 
//                                 decodedFrames: frames,
//                                 readyState: targetV.readyState,
//                                 networkState: targetV.networkState,
//                                 paused: targetV.paused,
//                                 bufferRemaining: bufferRemaining
//                             };
//                         }
//                         return { status: 'DEAD' };
//                     }),
//                     new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2500))
//                 ]);
//                 if (result && result.status !== 'DEAD') return result;
//             } catch (err) { }
//         }
//     } catch (e) { return { status: 'DEAD' }; }
//     return { status: 'DEAD' };
// }

// async function startWatchdog() {
//     let lastActiveTime = -1;
//     let lastDecodedFrames = -1;
//     let frozenCheckTimestamp = Date.now();
//     let watchdogTicks = 0;

//     // Predictive Watchdog State
//     let serverHealthScore = 100;
//     let recentFreezes = []; // Stores { timestamp, duration }
//     let dynamicFreezeThreshold = FROZEN_THRESHOLD_MS;

//     let isCurrentlyHanging = false;
//     let lastHangLogTime = 0;

//     let streamSetupTime = Date.now();
//     let isWarmupPhase = true;
//     const WARMUP_MAX_TIME = 35000;

//     let activeUrlStr = urlList[currentUrlIndex];
//     let backupUrlStr = urlList[backupUrlIndex];

//     let currentStreamStartTime = Date.now();

//     while (true) {
//         if (!browser || !browser.isConnected()) throw new Error("Browser closed.");

//         let activeStatus = await checkPageStatus(activePage);
//         let backupStatus = await checkPageStatus(backupPage); // Continuous backup monitoring

//         if (activeStatus.status === 'HEALTHY' && !isWarmupPhase) {
//             let elapsedMs = Date.now() - currentStreamStartTime;
//             let isExempted = NO_REFRESH_DOMAINS.some(domain => activeUrlStr.includes(domain));

//             if (elapsedMs > FORCE_REFRESH_MS) {
//                 if (!isExempted) {
//                     console.log(`\n[⏱️ PROACTIVE REFRESH]: Stream ran smoothly for ${FORCE_REFRESH_MINUTES} minutes! Forcing SAME LINK swap to keep connection fresh...`);
//                     activeStatus.status = 'FORCE_REFRESH';
//                 }
//             }
//         }

//         if (activeStatus.status === 'HEALTHY') {
//             if (isWarmupPhase) {
//                 let setupTimeSec = ((Date.now() - streamSetupTime) / 1000).toFixed(1);
//                 console.log(`\n[🚀] STREAM READY: Video successfully start ho gayi hai! Initial Setup & Buffering me ${setupTimeSec} seconds lagay.\n`);
//             }

//             await hideLoadingUI(activePage);
//             isWarmupPhase = false;

//             await triggerSmartUnmute(activePage);

//             let isTimeStuck = (activeStatus.currentTime === lastActiveTime) && !activeStatus.paused;
//             let isFrameStuck = (activeStatus.decodedFrames === lastDecodedFrames && activeStatus.decodedFrames > 0);
//             let isStalling = isTimeStuck || (activeStatus.readyState !== undefined && activeStatus.readyState < 3);

//             if (isStalling || isFrameStuck) {
//                 let hangDuration = Date.now() - frozenCheckTimestamp;

//                 if (!isCurrentlyHanging) {
//                     isCurrentlyHanging = true;
//                     console.log(`\n[⚠️] HANG DETECTED: Stream lag check start... Monitoring recovery.`);
//                 }

//                 // Penalize health score for ongoing freezes > 3 seconds
//                 if (hangDuration > 3000) {
//                     serverHealthScore = Math.max(0, serverHealthScore - 2);
//                 }

//                 if (Date.now() - lastHangLogTime >= 4000 && hangDuration < dynamicFreezeThreshold) {
//                     console.log(`[⏳] HANG MONITOR: Stream stuck... (${(hangDuration / 1000).toFixed(1)}s) | Score: ${serverHealthScore}`);
//                     lastHangLogTime = Date.now();
//                 }

//                 // Predictive Swap Condition
//                 let scoreTooLow = (serverHealthScore < 40 && backupStatus.status === 'HEALTHY');
//                 let freezeTooLong = (hangDuration > dynamicFreezeThreshold);

//                 if (scoreTooLow || freezeTooLong) {
//                     activeStatus.status = 'FROZEN';
//                     if (scoreTooLow) {
//                         console.log(`[!] ⚠️ SYSTEM SHIELD: Server unstable (Score: ${serverHealthScore}). Backup is healthy. Triggering PREDICTIVE HOT-SWAP.`);
//                     } else if (isFrameStuck && !isTimeStuck) {
//                         console.log(`[!] ⚠️ SYSTEM SHIELD: Detected Black Screen (Audio playing, but video frames stuck). Triggering HOT-SWAP.`);
//                     }
//                 }
//             } else {
//                 if (isCurrentlyHanging) {
//                     let recoveredHangDuration = Date.now() - frozenCheckTimestamp;
//                     console.log(`[✅] RECOVERY SUCCESS: Stream wapas start! Hang Time: ${(recoveredHangDuration / 1000).toFixed(1)}s | Score: ${serverHealthScore}\n`);
//                     isCurrentlyHanging = false;

//                     // Track recent freezes
//                     recentFreezes.push({ timestamp: Date.now(), duration: recoveredHangDuration });
                    
//                     // Clean old freezes (> 2 minutes ago)
//                     recentFreezes = recentFreezes.filter(f => Date.now() - f.timestamp < 120000);
                    
//                     // Adjust dynamic threshold based on recent micro-freezes
//                     if (recentFreezes.length > 2) {
//                         dynamicFreezeThreshold = Math.max(5000, FROZEN_THRESHOLD_MS - (recentFreezes.length * 3000));
//                         console.log(`[📉] Unstable stream detected (${recentFreezes.length} recent freezes). Lowering freeze threshold to ${(dynamicFreezeThreshold/1000).toFixed(1)}s`);
//                     } else {
//                         dynamicFreezeThreshold = FROZEN_THRESHOLD_MS;
//                     }
//                 } else {
//                     // Gradual score recovery if playing perfectly
//                     if (serverHealthScore < 100 && watchdogTicks % 10 === 0) {
//                         serverHealthScore += 1;
//                     }
//                 }

//                 lastActiveTime = activeStatus.currentTime;
//                 lastDecodedFrames = activeStatus.decodedFrames;
//                 frozenCheckTimestamp = Date.now();
//                 lastHangLogTime = Date.now(); 

//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             frame.evaluate(() => {
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; });
//                                 document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch (e) { } });
//                             }).catch(() => { });
//                         }
//                     } catch (e) { }
//                 }
//             }
//         }

//         if (backupPage) {
//             for (const frame of backupPage.frames()) {
//                 try {
//                     if (!frame.isDetached()) {
//                         frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }).catch(() => { });
//                     }
//                 } catch (e) { }
//             }
//         }

//         watchdogTicks++;

//         if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
//             console.log(`\n[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//             console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//             console.log(`[⏭️] NEXT IN QUEUE    : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//         }

//         if (watchdogTicks % 120 === 0) {
//             await takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
//         }

//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH') {

//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) {
//                 let warmupElapsed = ((Date.now() - streamSetupTime) / 1000).toFixed(1);
//                 let warmupTotal = (WARMUP_MAX_TIME / 1000).toFixed(1);
//                 console.log(`[⏳] WARM-UP MONITOR: Detected '${activeStatus.status}', stream abhi buffering/setup phase me hai... (${warmupElapsed}s / ${warmupTotal}s elapsed)`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue;
//             }

//             let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

//             if (isProactiveRefresh) {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] 🔄 PROACTIVE REFRESH TRIGGERED`);
//                 console.log(`[*] Preparing a FRESH copy of SAME Server [${currentUrlIndex}] in background...`);
//                 console.log(`==================================================`);

//                 for (const frame of activePage.frames()) {
//                     try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch (e) { }
//                 }

//                 try {
//                     await backupPage.goto('about:blank').catch(() => { });
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => { });
//                 } catch (e) {
//                     console.log(`[⏳] Proactive refresh buffer navigation handled safely.`);
//                 }
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
//                 console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`==================================================`);
//                 await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
//             }

//             console.log(`[*] Checking Backup Tab status before switching...`);
//             backupStatus = await checkPageStatus(backupPage);

//             if (backupStatus.status === 'HEALTHY' || backupStatus.status === 'DEAD') {

//                 if (!isProactiveRefresh) {
//                     for (const frame of activePage.frames()) {
//                         try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch (e) { }
//                     }
//                 }

//                 await showLoadingUI(backupPage, isProactiveRefresh ? "REFRESHING CONNECTION" : "RECONNECTING", isProactiveRefresh ? "Optimizing current server stream <span class='stream-blink'>...</span>" : "Establishing secure connection to backup server <span class='stream-blink'>...</span>");
//                 await backupPage.bringToFront();
//                 await new Promise(r => setTimeout(r, 1000));

//                 try { await backupPage.mouse.click(10, 10); } catch (e) { }

//                 console.log(`[*] Initializing Video on the newly active tab...`);
//                 await initializeVideo(backupPage, false, true);
//                 await hideLoadingUI(backupPage);

//                 let brokenPage = activePage; activePage = backupPage; backupPage = brokenPage;
//                 lastActiveTime = -1; frozenCheckTimestamp = Date.now();

//                 // Reset predictive states
//                 serverHealthScore = 100;
//                 recentFreezes = [];
//                 dynamicFreezeThreshold = FROZEN_THRESHOLD_MS;

//                 if (!isProactiveRefresh) {
//                     currentUrlIndex = backupUrlIndex; activeUrlStr = urlList[currentUrlIndex];
//                     backupUrlIndex = (backupUrlIndex + 1) % urlList.length; backupUrlStr = urlList[backupUrlIndex];
//                 }

//                 console.log(`\n==================================================`);
//                 console.log(isProactiveRefresh ? `[🔄] SAME-SERVER FRESH SWAP EXECUTED SUCCESSFULLY` : `[🔄] SMART HOT-SWAP TO NEXT SERVER EXECUTED SUCCESSFULLY`);
//                 console.log(`==================================================`);
//                 console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`[🔊] LIVE AUDIO STATUS : ON (Unmuted & Forced)`);
//                 console.log(`--------------------------------------------------`);
//                 console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//                 console.log(`[🔇] BACKUP AUDIO      : MUTED (Background Loading)`);
//                 console.log(`==================================================\n`);

//                 try {
//                     await backupPage.goto('about:blank').catch(() => { });
//                     await applyPreloadFirewall(backupPage);
//                     backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => { });
//                 } catch (e) {
//                     console.log(`[⏳] Background buffer navigation handled safely.`);
//                 }

//                 streamSetupTime = Date.now();
//                 isWarmupPhase = true;
//                 currentStreamStartTime = Date.now();

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
//             console.log('[+] Enforced WaitingScene (Loading Bar Buffer Active)');
//         } catch (e) { }
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
//         '--disable-renderer-backgrounding',

//         `--disable-extensions-except=${path.join(process.cwd(), 'ublock-lite')}`,
//         `--load-extension=${path.join(process.cwd(), 'ublock-lite')}`
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
//                     try { await newPage.close(); } catch (e) { }
//                 }
//             }, 500);
//         }
//     });

//     const pages = await browser.pages();
//     activePage = pages[0];
//     backupPage = await browser.newPage();

//     await setupNetworkAdBlocker(activePage);
//     await setupNetworkAdBlocker(backupPage);

//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await applyPreloadFirewall(activePage);
//     await applyPreloadFirewall(backupPage);

//     await activePage.bringToFront();

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex]}`);
//     await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });

//     // await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");

//     // await initializeVideo(activePage, false, true); 
//     // await hideLoadingUI(activePage); 


//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");

//     // NAYA FIX: Tab 2 ki tarah yahan bhi delay aur click add kiya hai taake Player unlock ho jaye
//     await new Promise(r => setTimeout(r, 1000));
//     try { await activePage.mouse.click(10, 10); } catch (e) { }

//     await initializeVideo(activePage, false, true);
//     await hideLoadingUI(activePage);


//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) { }
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex]}`);
//     backupPage.goto(urlList[backupUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => { });

//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch (e) { }
//     await hideLoadingUI(activePage);

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
//     if (browser) { try { await browser.close(); } catch (e) { } browser = null; }
//     if (obsProcess) { try { obsProcess.kill('SIGKILL'); } catch (e) { } obsProcess = null; }
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


















// ========================== 111111111111111111111111

// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD (2026 LATEST FIX)
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     if (err.message && err.message.includes('Requesting main frame too early')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored stealth plugin background frame error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNCAUGHT EXCEPTION: ${err.message}`);
//     }
// });

// process.on('unhandledRejection', (reason, promise) => {
//     let msg = reason && reason.message ? reason.message : reason;
//     if (msg && msg.includes('Protocol error')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored detached frame protocol error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNHANDLED REJECTION: ${msg}`);
//     }
// });
// // =========================================================================================

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME (IN MINUTES)
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 400; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// // =========================================================================================
// // 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// // =========================================================================================
// const NO_REFRESH_DOMAINS = [
//     'youtube.com',
//     'facebook.com',
//     'streamed.pk',
//     'cricstreams.', // crichd
//     'website-vercel-helper-d-jaja-3-2.vercel.app',
//     'websitestream.netlify.app/?ch=Channel%20HD%2071'
// ];

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
// console.log(`[⏱️] Auto-Refresh Time Set To: ${FORCE_REFRESH_MINUTES} Minutes`);

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

// const FROZEN_THRESHOLD_MS = 16000;

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount = 0;

// // =========================================================================================
// // 🛡️ ADVANCED NETWORK INTELLIGENCE & NAVIGATION SHIELD
// // =========================================================================================
// async function setupNetworkAdBlocker(page) {
//     if (!page) return;
//     try {
//         await page.setRequestInterception(true);
//         page.on('request', (request) => {
//             const url = request.url().toLowerCase();
//             const type = request.resourceType();

//             // 🛑 Aggressive payload blocking added here
//             const adDomains = [
//                 'popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate', 
//                 'adrevenue', 'fanduel', 'adexchangerapid', 'doubleclick', 'propellerads'
//             ];

//             const isAdDomain = adDomains.some(keyword => url.includes(keyword));

//             if (isAdDomain) {
//                 console.log(`[🛡️] NETWORK SHIELD: Blocked known ad payload -> ${url.substring(0, 50)}...`);
//                 request.abort().catch(()=>{});
//                 return;
//             }

//             // 🚫 SHIELD: Same-Tab Hostile Redirect Hijacking Block
//             if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
//                 const targetUrl = request.url().toLowerCase();
//                 const adKeywords = ['bet', 'casino'];
//                 if (adKeywords.some(keyword => targetUrl.includes(keyword))) {
//                     console.log(`[🛡️] NAVIGATION SHIELD: Blocked malicious ad redirection to -> ${targetUrl.substring(0, 70)}...`);
//                     request.abort().catch(()=>{});
//                     return;
//                 }
//             }

//             if (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone'))) {
//                 request.abort().catch(()=>{});
//             } else {
//                 request.continue().catch(()=>{});
//             }
//         });
//     } catch (e) { console.log('[⚠️] Request interception setup failed.'); }
// }

// async function applyPreloadFirewall(page) {
//     if (!page) return;
//     try {
//         await page.evaluateOnNewDocument(() => {
//             // =========================================================
//             // 🛑 ULTIMATE SHADOW DOM AD KILLER (Monkey Patching)
//             // =========================================================
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') {
//                     init.mode = 'open'; // Force open to allow inspection
//                 }
//                 const shadowRoot = originalAttachShadow.call(this, init);
                
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) {
//                         console.log('[🛡️] SHIELD: Shadow DOM Ad Detected & Destroyed!');
//                         this.remove(); // Kill the entire host element
//                     }
//                 });
                
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };

//             // Permanent root execution block for popup alerts & confirms
//             // window.alert = function() {};
//             // window.confirm = function() { return true; };
//             // window.prompt = function() { return null; };
//             // window.open = function() { return null; };
            
//             // 🚫 ANTI-DIALOG FIX: Neutralize onbeforeunload modal box popup completely
//             Object.defineProperty(window, 'onbeforeunload', {
//                 configurable: true,
//                 get: function() { return null; },
//                 set: function() { return null; }
//             });

//             document.addEventListener('click', (e) => {
//                 const target = e.target;
//                 if (target && (target.tagName === 'A' || target.closest('a'))) {
//                     const link = target.tagName === 'A' ? target : target.closest('a');
//                     if (link.href && !link.href.includes(window.location.hostname) && !link.href.includes('javascript')) {
//                         console.log("[🛡️] RE-DIRECT SHIELD: Blocked navigation to external ad domain.");
//                         e.preventDefault();
//                         e.stopPropagation();
//                         return false;
//                     }
//                 }
//             }, true);

//             const style = document.createElement('style');
//             style.textContent = `
//                 html, body { background-color: #000000 !important; overflow: hidden !important; }
//                 in-page-message, [id^="note-"], [id^="missclick-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }
//             `;
//             document.documentElement.appendChild(style);

//             const attachOverlay = () => {
//                 let target = document.body || document.documentElement;
//                 if (target && !document.getElementById('smart-stream-overlay')) {
//                     const overlay = document.createElement('div');
//                     overlay.id = 'smart-stream-overlay';
//                     overlay.innerHTML = `
//                         <style>
//                             #smart-stream-overlay {
//                                 position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                                 width: 100vw !important; height: 100vh !important; background: #000000 !important;
//                                 z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                                 justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                                 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                                 pointer-events: all !important;
//                             }
//                             .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                             .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                             .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                             @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                             @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                             .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                             .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                         </style>
//                         <div class="stream-spinner"></div>
//                         <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                         <div class="stream-title">STREAM LOADING</div>
//                         <div class="stream-sub">Connecting to secure stream engine...</div>
//                     `;
//                     target.appendChild(overlay);
//                 } else if (!target) {
//                     requestAnimationFrame(attachOverlay);
//                 }
//             };
//             attachOverlay();
//         });
//     } catch (e) {
//         console.log(`[🛡️] SYSTEM SHIELD: Preload firewall safe injection caught an error.`);
//     }
// }

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

//             if (overlay) {
//                 const titleEl = overlay.querySelector('.stream-title');
//                 const subEl = overlay.querySelector('.stream-sub');
//                 if (titleEl) titleEl.innerHTML = t;
//                 if (subEl) subEl.innerHTML = s;
                
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 overlay.style.setProperty('opacity', '1', 'important');
//                 overlay.style.setProperty('z-index', '2147483647', 'important');
//             } 
//             else {
//                 overlay = document.createElement('div');
//                 overlay.id = 'smart-stream-overlay';
//                 overlay.innerHTML = `
//                     <style>
//                         #smart-stream-overlay {
//                             position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                             width: 100vw !important; height: 100vh !important; background: #000000 !important;
//                             z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                             justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                             pointer-events: all !important;
//                         }
//                         .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                         .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                         .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                         @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                         @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                         .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                         .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                     </style>
//                     <div class="stream-spinner"></div>
//                     <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                     <div class="stream-title">${t}</div>
//                     <div class="stream-sub">${s}</div>
//                 `;
//                 document.documentElement.appendChild(overlay);
//             }
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'none', 'important');
//                 overlay.style.setProperty('opacity', '0', 'important');
//                 overlay.style.setProperty('z-index', '-9999', 'important');
//                 overlay.remove();
//             }
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
//                 "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true} ] } 
//             }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// function attachAntiAdListeners(page) {
//     page.on('dialog', async dialog => {
//         try { await dialog.dismiss(); } catch(e){}
//     });
// }

// // =========================================================================================
// // 🔊 2026 INTELLIGENT FUZZY UNMUTE ENGINE (No Class/ID Dependence)
// // =========================================================================================
// async function triggerSmartUnmute(page) {
//     for (const frame of page.frames()) {
//         try {
//             if (frame.isDetached()) continue;

//             await frame.evaluate(() => {
//                 // 1. Scan all interactive elements
//                 const potentialElements = Array.from(document.querySelectorAll('button, div, span, a, i'));
                
//                 potentialElements.forEach(el => {
//                     const text = (el.innerText || el.textContent || '').trim().toUpperCase();
//                     const onClickStr = (el.getAttribute('onclick') || '').toLowerCase();
//                     const ariaLabel = (el.getAttribute('aria-label') || '').toUpperCase();
                    
//                     // Fuzzy match checking
//                     const matchesText = text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('STREAM UNMUTE') || text.includes('AUDIO');
//                     const matchesJS = onClickStr.includes('unmute') || onClickStr.includes('volume') || onClickStr.includes('audio');
//                     const matchesAria = ariaLabel.includes('UNMUTE') || ariaLabel.includes('VOLUME');

//                     if (matchesText || matchesJS || matchesAria) {
//                         const rect = el.getBoundingClientRect();
//                         const isVisible = rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';

//                         if (isVisible) {
//                             console.log(`[🔊 ENGINE]: Dynamically triggered click on element with text: "${text || 'JS Action'}"`);
//                             try { el.click(); } catch(e) {}
//                             try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch(e) {}
//                         }
//                     }
//                 });

//                 // 2. Bruteforce Browser Native Media Layer
//                 document.querySelectorAll('video, audio').forEach(media => {
//                     if (media.muted) {
//                         media.muted = false;
//                         media.volume = 1.0;
//                     }
//                 });
//             }).catch(() => {});
//         } catch (e) {}
//     }
// }
// // =========================================================================================

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

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play, #hero-play-btn');
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

//         await page.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     document.documentElement.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('overflow', 'hidden', 'important');
//                     document.documentElement.style.setProperty('overflow', 'hidden', 'important');

//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = null; let maxScore = -1;

//                     // 1. ADVANCED GEOMETRIC SCORING
//                     iframes.forEach(ifr => {
//                         let width = ifr.clientWidth;
//                         let height = ifr.clientHeight;
//                         let area = width * height;

//                         if (area < 5000) return;

//                         let score = area;
                        
//                         if (ifr.hasAttribute('allowfullscreen') || 
//                             ifr.hasAttribute('webkitallowfullscreen') || 
//                             ifr.hasAttribute('mozallowfullscreen')) {
//                             score += 10000000; 
//                         }
                        
//                         if (height > width) {
//                             score = -1; 
//                         }

//                         if (score > maxScore) {
//                             maxScore = score;
//                             mainIframe = ifr;
//                         }
//                     });

//                     if (!mainIframe && iframes.length > 0) {
//                         mainIframe = iframes.find(ifr => 
//                             ifr.getAttribute('allowfullscreen') !== null || 
//                             (ifr.src && (ifr.src.includes('player') || ifr.src.includes('embed') || ifr.src.includes('stream') || ifr.src.includes('watch')))
//                         );
//                     }

//                     if (mainIframe) {
//                         iframes.forEach(ifr => {
//                             if (ifr !== mainIframe) {
//                                 ifr.style.setProperty('display', 'none', 'important');
//                                 ifr.style.setProperty('opacity', '0', 'important');
//                                 ifr.style.setProperty('z-index', '-9999', 'important');
                                
//                                 if (ifr.parentNode && ifr.parentNode !== document.body) {
//                                     try { 
//                                         ifr.parentNode.style.setProperty('display', 'none', 'important'); 
//                                         ifr.parentNode.style.setProperty('opacity', '0', 'important');
//                                     } catch(e) {}
//                                 }
//                             }
//                         });

//                         mainIframe.style.setProperty('position', 'fixed', 'important');
//                         mainIframe.style.setProperty('top', '0px', 'important');
//                         mainIframe.style.setProperty('left', '0px', 'important');
//                         mainIframe.style.setProperty('width', '100vw', 'important');
//                         mainIframe.style.setProperty('height', '100vh', 'important');
//                         mainIframe.style.setProperty('z-index', '2147483645', 'important'); 
//                         mainIframe.style.setProperty('background-color', 'black', 'important');
//                         mainIframe.style.setProperty('border', 'none', 'important');
//                         mainIframe.style.setProperty('opacity', '1', 'important');
//                         mainIframe.style.setProperty('display', 'block', 'important');
//                         mainIframe.style.setProperty('visibility', 'visible', 'important');
//                     }

//                     const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay), [id*="pop"], [class*="pop"], a[href*="extension"], [class*="notification"], [id*="notification"]';
//                     document.querySelectorAll(junkClasses).forEach(el => { 
//                         try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } 
//                     });

//                     const adKeywords = ['jerk', 'mate', 'free', 'online', 'adult', 'dating', 'close', 'notification', 'justine', 'paying', 'job'];
//                     document.querySelectorAll('div, section, span, a').forEach(el => {
//                         if (el.id === 'smart-stream-overlay') return;
                        
//                         const style = window.getComputedStyle(el);
//                         const isFloating = style.position === 'fixed' || style.position === 'absolute';
                        
//                         if (isFloating && el.innerText) {
//                             const textLower = el.innerText.toLowerCase();
//                             const hasBadKeyword = adKeywords.some(keyword => textLower.includes(keyword));
                            
//                             if (hasBadKeyword || (parseInt(style.zIndex) > 100000 && !el.querySelector('video') && !el.querySelector('iframe'))) {
//                                 try { el.remove(); } catch(e) { el.style.setProperty('display', 'none', 'important'); }
//                             }
//                         }
//                     });

//                 } catch (err) {}
//             }, 500); 
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
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (!realVideo && videos.length > 0) {
//                         realVideo = videos[0];
//                     }

//                     if (realVideo) { 
//                         realVideo.style.setProperty('position', 'fixed', 'important');
//                         realVideo.style.setProperty('top', '0px', 'important');
//                         realVideo.style.setProperty('left', '0px', 'important');
//                         realVideo.style.setProperty('width', '100vw', 'important');
//                         realVideo.style.setProperty('height', '100vh', 'important');
//                         realVideo.style.setProperty('z-index', '2147483646', 'important'); 
//                         realVideo.style.setProperty('background-color', 'black', 'important');
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         realVideo.style.setProperty('opacity', '1', 'important');
//                         realVideo.style.setProperty('visibility', 'visible', 'important');
//                         realVideo.style.setProperty('display', 'block', 'important');
//                     }
//                 } catch(err) {}
//             }, 500); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     // 🔥 Added Smart Unmute Execution Here
//     await triggerSmartUnmute(page);
//     await new Promise(r => setTimeout(r, 1000));
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
                        
//                         if (targetV && !targetV.ended && targetV.currentTime > 0) {
//                             let frames = 0;
//                             if (targetV.getVideoPlaybackQuality) {
//                                 frames = targetV.getVideoPlaybackQuality().totalVideoFrames;
//                             } else if (targetV.webkitDecodedFrameCount !== undefined) {
//                                 frames = targetV.webkitDecodedFrameCount;
//                             }
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

// async function startWatchdog() {
//     let lastActiveTime = -1;
//     let lastDecodedFrames = -1; 
//     let frozenCheckTimestamp = Date.now();
//     let watchdogTicks = 0;

//     // Naye tracker flags hang state aur logging frequency monitor karne ke liye
//     let isCurrentlyHanging = false; 
//     let lastHangLogTime = 0;
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     // const WARMUP_MAX_TIME = 15000;
//     const WARMUP_MAX_TIME = 35000; // <--- Isko 35000 (35 seconds) kar dein

//     let activeUrlStr = urlList[currentUrlIndex];
//     let backupUrlStr = urlList[backupUrlIndex];

//     let currentStreamStartTime = Date.now();

//     while (true) {
//         if (!browser || !browser.isConnected()) throw new Error("Browser closed.");

//         let activeStatus = await checkPageStatus(activePage);

//         if (activeStatus.status === 'HEALTHY' && !isWarmupPhase) {
//             let elapsedMs = Date.now() - currentStreamStartTime;
//             let isExempted = NO_REFRESH_DOMAINS.some(domain => activeUrlStr.includes(domain));

//             if (elapsedMs > FORCE_REFRESH_MS) {
//                 if (!isExempted) {
//                     console.log(`\n[⏱️ PROACTIVE REFRESH]: Stream ran smoothly for ${FORCE_REFRESH_MINUTES} minutes! Forcing SAME LINK swap to keep connection fresh...`);
//                     activeStatus.status = 'FORCE_REFRESH'; 
//                 }
//             }
//         }

//         // if (activeStatus.status === 'HEALTHY') {
//         //     await hideLoadingUI(activePage); 
//         //     isWarmupPhase = false; 

//         if (activeStatus.status === 'HEALTHY') {
//             // Naya Success Print Statement
//             if (isWarmupPhase) {
//                 let setupTimeSec = ((Date.now() - streamSetupTime) / 1000).toFixed(1);
//                 console.log(`\n[🚀] STREAM READY: Video successfully start ho gayi hai! Initial Setup & Buffering me ${setupTimeSec} seconds lagay.\n`);
//             }

//             await hideLoadingUI(activePage); 
//             isWarmupPhase = false; 

//             // 🔥 Added Smart Unmute Continuous Engine Here

//             // 🔥 Added Smart Unmute Continuous Engine Here
//             await triggerSmartUnmute(activePage);

//             let isTimeStuck = (activeStatus.currentTime === lastActiveTime);
//             let isFrameStuck = (activeStatus.decodedFrames === lastDecodedFrames && activeStatus.decodedFrames > 0);

//             if (isTimeStuck || isFrameStuck) {
//                 let hangDuration = Date.now() - frozenCheckTimestamp;
                
//                 // Freeze detect hone par first alert
//                 if (!isCurrentlyHanging) {
//                     isCurrentlyHanging = true;
//                     console.log(`\n[⚠️] HANG DETECTED: Stream lag check start... Monitoring recovery.`);
//                 }

//                 // Har 4000ms (4 seconds) baad progress print karega jab tak 16 sec pore na hon
//                 if (Date.now() - lastHangLogTime >= 4000 && hangDuration < FROZEN_THRESHOLD_MS) {
//                     console.log(`[⏳] HANG MONITOR: Stream abhi bhi pause/stuck hai... (${(hangDuration / 1000).toFixed(1)}s / 16.0s elapsed)`);
//                     lastHangLogTime = Date.now();
//                 }

//                 // Final 16 sec cross hone par action
//                 if (hangDuration > FROZEN_THRESHOLD_MS) {
//                     activeStatus.status = 'FROZEN';
//                     if (isFrameStuck && !isTimeStuck) {
//                         console.log(`[!] ⚠️ SYSTEM SHIELD: Detected Black Screen (Audio playing, but video frames stuck). Triggering HOT-SWAP.`);
//                     }
//                 }
//             } else {
//                 // Agar 16 sec se pehle frames dobara start ho jayen
//                 if (isCurrentlyHanging) {
//                     console.log(`[✅] RECOVERY SUCCESS: Stream wapas start ho gayi hai! (Hot-swap trigger hone se pehle). Total Hang Time: ${((Date.now() - frozenCheckTimestamp) / 1000).toFixed(1)}s\n`);
//                     isCurrentlyHanging = false;
//                 }

//                 lastActiveTime = activeStatus.currentTime; 
//                 lastDecodedFrames = activeStatus.decodedFrames; 
//                 frozenCheckTimestamp = Date.now();
//                 lastHangLogTime = Date.now(); // Log timer reset
                
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
        
//         if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
//             console.log(`\n[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//             console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//             console.log(`[⏭️] NEXT IN QUEUE    : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//         }

//         if (watchdogTicks % 120 === 0) {
//             await takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
//         }

//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH') {
            
//             // if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//             //     console.log(`[⏳] Watchdog detected '${activeStatus.status}', but stream is in WARM-UP phase. Waiting...`);
//             //     await new Promise(r => setTimeout(r, 2000));
//             //     continue; 
//             // }

//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 let warmupElapsed = ((Date.now() - streamSetupTime) / 1000).toFixed(1);
//                 let warmupTotal = (WARMUP_MAX_TIME / 1000).toFixed(1);
//                 console.log(`[⏳] WARM-UP MONITOR: Detected '${activeStatus.status}', stream abhi buffering/setup phase me hai... (${warmupElapsed}s / ${warmupTotal}s elapsed)`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             }

//             let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

//             if (isProactiveRefresh) {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] 🔄 PROACTIVE REFRESH TRIGGERED`);
//                 console.log(`[*] Preparing a FRESH copy of SAME Server [${currentUrlIndex}] in background...`);
//                 console.log(`==================================================`);
                
//                 for (const frame of activePage.frames()) {
//                     try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                 }

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{});
//                 } catch(e) {
//                     console.log(`[⏳] Proactive refresh buffer navigation handled safely.`);
//                 }
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
//                 console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`==================================================`);
//                 await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
//             }
            
//             console.log(`[*] Checking Backup Tab status before switching...`);
//             let backupStatus = await checkPageStatus(backupPage);

//             if (backupStatus.status === 'HEALTHY' || backupStatus.status === 'DEAD') { 
                
//                 if (!isProactiveRefresh) {
//                     for (const frame of activePage.frames()) {
//                         try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                     }
//                 }
                
//                 await showLoadingUI(backupPage, isProactiveRefresh ? "REFRESHING CONNECTION" : "RECONNECTING", isProactiveRefresh ? "Optimizing current server stream <span class='stream-blink'>...</span>" : "Establishing secure connection to backup server <span class='stream-blink'>...</span>");
//                 await backupPage.bringToFront();
//                 await new Promise(r => setTimeout(r, 1000)); 
                
//                 try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                 console.log(`[*] Initializing Video on the newly active tab...`);
//                 await initializeVideo(backupPage, false, true); 
//                 await hideLoadingUI(backupPage);

//                 let brokenPage = activePage; activePage = backupPage; backupPage = brokenPage;
//                 lastActiveTime = -1; frozenCheckTimestamp = Date.now();

//                 if (!isProactiveRefresh) {
//                     currentUrlIndex = backupUrlIndex; activeUrlStr = urlList[currentUrlIndex]; 
//                     backupUrlIndex = (backupUrlIndex + 1) % urlList.length; backupUrlStr = urlList[backupUrlIndex]; 
//                 } 

//                 console.log(`\n==================================================`);
//                 console.log(isProactiveRefresh ? `[🔄] SAME-SERVER FRESH SWAP EXECUTED SUCCESSFULLY` : `[🔄] SMART HOT-SWAP TO NEXT SERVER EXECUTED SUCCESSFULLY`);
//                 console.log(`==================================================`);
//                 console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`[🔊] LIVE AUDIO STATUS : ON (Unmuted & Forced)`);
//                 console.log(`--------------------------------------------------`);
//                 console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//                 console.log(`[🔇] BACKUP AUDIO      : MUTED (Background Loading)`);
//                 console.log(`==================================================\n`);

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 } catch (e) {
//                     console.log(`[⏳] Background buffer navigation handled safely.`);
//                 }
                
//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true;
//                 currentStreamStartTime = Date.now();

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
//             console.log('[+] Enforced WaitingScene (Loading Bar Buffer Active)');
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
//         '--disable-renderer-backgrounding',
        
//         `--disable-extensions-except=${path.join(process.cwd(), 'ublock-lite')}`,
//         `--load-extension=${path.join(process.cwd(), 'ublock-lite')}`
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

//     const pages = await browser.pages();
//     activePage = pages[0]; 
//     backupPage = await browser.newPage();
    
//     await setupNetworkAdBlocker(activePage);
//     await setupNetworkAdBlocker(backupPage);

//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await applyPreloadFirewall(activePage);
//     await applyPreloadFirewall(backupPage);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex]}`);
//     await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });
    
//     // await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     // await initializeVideo(activePage, false, true); 
//     // await hideLoadingUI(activePage); 


//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     // NAYA FIX: Tab 2 ki tarah yahan bhi delay aur click add kiya hai taake Player unlock ho jaye
//     await new Promise(r => setTimeout(r, 1000));
//     try { await activePage.mouse.click(10, 10); } catch(e){}
    
//     await initializeVideo(activePage, false, true); 
//     await hideLoadingUI(activePage);
    

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex]}`);
//     backupPage.goto(urlList[backupUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 
//     await hideLoadingUI(activePage);

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





































































































































































// ===================== Below code me eek issue hai jokey Tab1 me correct live ko detect dead and tab2 me correct huta hai =======================

// Bhai ab aapne script ki aisi "bimari" pakri hai jo bilkul samne thi lekin bohut deeply technical thi. Yeh logs dekh kar 100% clear ho gaya hai ke Tab 1 hamesha 35 seconds tak DEAD rehta hai, aur Tab 2 aatay hi 2 second mein play ho jata hai.

// Main aapko batata hu ke code ke andar Tab 1 ke sath kya aesa zulm ho raha tha jo Tab 2 ke sath nahi hua. Yeh masala kisi lag ya time ka nahi, balkay aapke Preload Firewall (Anti-Ad) aur Player Unlock Click ka hai!

// 🚨 Asal Masala Kya Tha? (The Technical Reality)
// Aapke code mein ek function hai applyPreloadFirewall(). Iska kaam page load hone se pehle hi window.open, window.alert waghera ko block/null kar dena tha taake ads na aayein.

// Tab 1 par kya hua: Code ne page load hone se pehle yeh firewall active kar diya. Vercel website ka player jab video chalane lagta hai, toh woh background mein ek pop-up script run karta hai. Kyunke humne window.open = null kiya hua tha, player ka script crash ho gaya aur video kabhi start hi nahi hui (0.0s par phansi rahi).

// Tab 2 par kya hua: Pichli dafa jab humne Single URL wala code update kiya tha, toh swap hote waqt backupPage.goto() pehle chala tha aur applyPreloadFirewall() baad mein! Is wajah se Tab 2 par firewall late active hua, player ka script crash nahi hua, aur video fauran 2 second mein chal gayi!

// 🔧 The Ultimate Fix (In 2 Steps)
// Humein 2 kaam karne hain:

// Firewall se us toxic code ko nikalna hai jo player ko crash kar raha hai (Ads block karne ke liye hamara network interceptor already kafi hai).

// Tab 1 par bilkul wese hi mouse click (10, 10) karwana hai jese Tab 2 swap hote waqt karta hai (Yeh player ko unlock karta hai).

// Fix 1: Firewall ko Theek Karein
// Apne code mein applyPreloadFirewall function dhoondein aur usme mojood window.alert, window.open wali 4 lines ko DELETE kar dein.

// Old Code:

// JavaScript
// async function applyPreloadFirewall(page) {
//     if (!page) return;
//     try {
//         await page.evaluateOnNewDocument(() => {
//             // Permanent root execution block for popup alerts & confirms
//             window.alert = function() {};
//             window.confirm = function() { return true; };
//             window.prompt = function() { return null; };
//             window.open = function() { return null; };
            
//             // 🚫 ANTI-DIALOG FIX: Neutralize onbeforeunload modal box popup completely
// New Code (In 4 lines ko hata dein):

// JavaScript
// async function applyPreloadFirewall(page) {
//     if (!page) return;
//     try {
//         await page.evaluateOnNewDocument(() => {
//             // Popups ko Puppeteer khud handle kar raha hai, yahan se toxic block remove kar diya
            
//             // 🚫 ANTI-DIALOG FIX: Neutralize onbeforeunload modal box popup completely
// Fix 2: Tab 1 ko Unlock Click Dein
// Ab startDirectStreaming() function mein neeche aayen jahan STEP 1 likha hai. Wahan initializeVideo se pehle 1 second ka delay aur ek dummy mouse click add karein.

// Old Code:

// JavaScript
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     await initializeVideo(activePage, false, true); 
//     await hideLoadingUI(activePage); 
// New Code (Is se replace karein):

// JavaScript
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     // NAYA FIX: Tab 2 ki tarah yahan bhi delay aur click add kiya hai taake Player unlock ho jaye
//     await new Promise(r => setTimeout(r, 1000));
//     try { await activePage.mouse.click(10, 10); } catch(e){}
    
//     await initializeVideo(activePage, false, true); 
//     await hideLoadingUI(activePage); 
// 💡 Is se kya theek hoga?
// Vercel aur doosre free streaming players bohat sensitive hotay hain. Jab aap unke internal window calls ko zabardasti block karte hain, toh unki HLS video stream shuru hi nahi hoti. Is fix ko apply karne ke baad, aapka Pehla Tab (Tab 1) bhi bilkul usi speed (2 seconds) mein play hoga jaise doosra tab hota hai, aur aapko phir 35 second tak us DEAD screen ka wait nahi karna parega!
// ==============================










// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD (2026 LATEST FIX)
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     if (err.message && err.message.includes('Requesting main frame too early')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored stealth plugin background frame error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNCAUGHT EXCEPTION: ${err.message}`);
//     }
// });

// process.on('unhandledRejection', (reason, promise) => {
//     let msg = reason && reason.message ? reason.message : reason;
//     if (msg && msg.includes('Protocol error')) {
//         console.log(`[🛡️] SYSTEM SHIELD: Ignored detached frame protocol error.`);
//     } else {
//         console.log(`[⚠️] IGNORED UNHANDLED REJECTION: ${msg}`);
//     }
// });
// // =========================================================================================

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME (IN MINUTES)
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 400; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// // =========================================================================================
// // 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// // =========================================================================================
// const NO_REFRESH_DOMAINS = [
//     'youtube.com',
//     'facebook.com',
//     'streamed.pk',
//     'cricstreams.', // crichd
//     'website-vercel-helper-d-jaja-3-2.vercel.app',
//     'websitestream.netlify.app/?ch=Channel%20HD%2071'
// ];

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
// console.log(`[⏱️] Auto-Refresh Time Set To: ${FORCE_REFRESH_MINUTES} Minutes`);

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

// const FROZEN_THRESHOLD_MS = 16000;

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount = 0;

// // =========================================================================================
// // 🛡️ ADVANCED NETWORK INTELLIGENCE & NAVIGATION SHIELD
// // =========================================================================================
// async function setupNetworkAdBlocker(page) {
//     if (!page) return;
//     try {
//         await page.setRequestInterception(true);
//         page.on('request', (request) => {
//             const url = request.url().toLowerCase();
//             const type = request.resourceType();

//             // 🛑 Aggressive payload blocking added here
//             const adDomains = [
//                 'popads', 'exoclick', 'adsterra', 'onclickads', 'jerkmate', 
//                 'adrevenue', 'fanduel', 'adexchangerapid', 'doubleclick', 'propellerads'
//             ];

//             const isAdDomain = adDomains.some(keyword => url.includes(keyword));

//             if (isAdDomain) {
//                 console.log(`[🛡️] NETWORK SHIELD: Blocked known ad payload -> ${url.substring(0, 50)}...`);
//                 request.abort().catch(()=>{});
//                 return;
//             }

//             // 🚫 SHIELD: Same-Tab Hostile Redirect Hijacking Block
//             if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
//                 const targetUrl = request.url().toLowerCase();
//                 const adKeywords = ['bet', 'casino'];
//                 if (adKeywords.some(keyword => targetUrl.includes(keyword))) {
//                     console.log(`[🛡️] NAVIGATION SHIELD: Blocked malicious ad redirection to -> ${targetUrl.substring(0, 70)}...`);
//                     request.abort().catch(()=>{});
//                     return;
//                 }
//             }

//             if (type === 'script' && (url.includes('analytics') || url.includes('tracking') || url.includes('ad-delivery') || url.includes('pop') || url.includes('zone'))) {
//                 request.abort().catch(()=>{});
//             } else {
//                 request.continue().catch(()=>{});
//             }
//         });
//     } catch (e) { console.log('[⚠️] Request interception setup failed.'); }
// }

// async function applyPreloadFirewall(page) {
//     if (!page) return;
//     try {
//         await page.evaluateOnNewDocument(() => {
//             // =========================================================
//             // 🛑 ULTIMATE SHADOW DOM AD KILLER (Monkey Patching)
//             // =========================================================
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') {
//                     init.mode = 'open'; // Force open to allow inspection
//                 }
//                 const shadowRoot = originalAttachShadow.call(this, init);
                
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) {
//                         console.log('[🛡️] SHIELD: Shadow DOM Ad Detected & Destroyed!');
//                         this.remove(); // Kill the entire host element
//                     }
//                 });
                
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };

//             // Permanent root execution block for popup alerts & confirms
//             window.alert = function() {};
//             window.confirm = function() { return true; };
//             window.prompt = function() { return null; };
//             window.open = function() { return null; };
            
//             // 🚫 ANTI-DIALOG FIX: Neutralize onbeforeunload modal box popup completely
//             Object.defineProperty(window, 'onbeforeunload', {
//                 configurable: true,
//                 get: function() { return null; },
//                 set: function() { return null; }
//             });

//             document.addEventListener('click', (e) => {
//                 const target = e.target;
//                 if (target && (target.tagName === 'A' || target.closest('a'))) {
//                     const link = target.tagName === 'A' ? target : target.closest('a');
//                     if (link.href && !link.href.includes(window.location.hostname) && !link.href.includes('javascript')) {
//                         console.log("[🛡️] RE-DIRECT SHIELD: Blocked navigation to external ad domain.");
//                         e.preventDefault();
//                         e.stopPropagation();
//                         return false;
//                     }
//                 }
//             }, true);

//             const style = document.createElement('style');
//             style.textContent = `
//                 html, body { background-color: #000000 !important; overflow: hidden !important; }
//                 in-page-message, [id^="note-"], [id^="missclick-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }
//             `;
//             document.documentElement.appendChild(style);

//             const attachOverlay = () => {
//                 let target = document.body || document.documentElement;
//                 if (target && !document.getElementById('smart-stream-overlay')) {
//                     const overlay = document.createElement('div');
//                     overlay.id = 'smart-stream-overlay';
//                     overlay.innerHTML = `
//                         <style>
//                             #smart-stream-overlay {
//                                 position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                                 width: 100vw !important; height: 100vh !important; background: #000000 !important;
//                                 z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                                 justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                                 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                                 pointer-events: all !important;
//                             }
//                             .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                             .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                             .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                             @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                             @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                             .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                             .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                         </style>
//                         <div class="stream-spinner"></div>
//                         <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                         <div class="stream-title">STREAM LOADING</div>
//                         <div class="stream-sub">Connecting to secure stream engine...</div>
//                     `;
//                     target.appendChild(overlay);
//                 } else if (!target) {
//                     requestAnimationFrame(attachOverlay);
//                 }
//             };
//             attachOverlay();
//         });
//     } catch (e) {
//         console.log(`[🛡️] SYSTEM SHIELD: Preload firewall safe injection caught an error.`);
//     }
// }

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

//             if (overlay) {
//                 const titleEl = overlay.querySelector('.stream-title');
//                 const subEl = overlay.querySelector('.stream-sub');
//                 if (titleEl) titleEl.innerHTML = t;
//                 if (subEl) subEl.innerHTML = s;
                
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 overlay.style.setProperty('opacity', '1', 'important');
//                 overlay.style.setProperty('z-index', '2147483647', 'important');
//             } 
//             else {
//                 overlay = document.createElement('div');
//                 overlay.id = 'smart-stream-overlay';
//                 overlay.innerHTML = `
//                     <style>
//                         #smart-stream-overlay {
//                             position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                             width: 100vw !important; height: 100vh !important; background: #000000 !important;
//                             z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                             justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//                             pointer-events: all !important;
//                         }
//                         .stream-spinner { width: 80px; height: 80px; border: 6px solid rgba(255, 255, 255, 0.1); border-top: 6px solid #e50914; border-radius: 50%; animation: spin-overlay 1s linear infinite; margin-bottom: 25px; box-shadow: 0 0 25px rgba(229, 9, 20, 0.4); }
//                         .progress-container { width: 300px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 30px; overflow: hidden; position: relative; }
//                         .progress-bar-fill { width: 100%; height: 100%; background: linear-gradient(90deg, #e50914, #ff4d4d); position: absolute; left: -100%; animation: shift-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
//                         @keyframes spin-overlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                         @keyframes shift-progress { 0% { left: -100%; } 50% { left: 0; } 100% { left: 100%; } }
//                         .stream-title { font-size: 36px !important; font-weight: 800 !important; letter-spacing: 3px !important; margin-bottom: 15px !important; text-transform: uppercase !important; text-shadow: 0px 4px 10px rgba(0,0,0,0.8) !important; }
//                         .stream-sub { font-size: 20px !important; color: #cccccc !important; text-align: center !important; line-height: 1.6 !important; }
//                     </style>
//                     <div class="stream-spinner"></div>
//                     <div class="progress-container"><div class="progress-bar-fill"></div></div>
//                     <div class="stream-title">${t}</div>
//                     <div class="stream-sub">${s}</div>
//                 `;
//                 document.documentElement.appendChild(overlay);
//             }
//         }, title, sub);
//     } catch (e) {}
// }

// async function hideLoadingUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('smart-stream-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'none', 'important');
//                 overlay.style.setProperty('opacity', '0', 'important');
//                 overlay.style.setProperty('z-index', '-9999', 'important');
//                 overlay.remove();
//             }
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
//                 "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true} ] } 
//             }
//         ]
//     };
//     fs.writeFileSync(path.join(scenesDir, 'Untitled.json'), JSON.stringify(sceneJson, null, 2));
// }

// function attachAntiAdListeners(page) {
//     page.on('dialog', async dialog => {
//         try { await dialog.dismiss(); } catch(e){}
//     });
// }

// // =========================================================================================
// // 🔊 2026 INTELLIGENT FUZZY UNMUTE ENGINE (No Class/ID Dependence)
// // =========================================================================================
// async function triggerSmartUnmute(page) {
//     for (const frame of page.frames()) {
//         try {
//             if (frame.isDetached()) continue;

//             await frame.evaluate(() => {
//                 // 1. Scan all interactive elements
//                 const potentialElements = Array.from(document.querySelectorAll('button, div, span, a, i'));
                
//                 potentialElements.forEach(el => {
//                     const text = (el.innerText || el.textContent || '').trim().toUpperCase();
//                     const onClickStr = (el.getAttribute('onclick') || '').toLowerCase();
//                     const ariaLabel = (el.getAttribute('aria-label') || '').toUpperCase();
                    
//                     // Fuzzy match checking
//                     const matchesText = text.includes('UNMUTE') || text.includes('MUTE ME') || text.includes('STREAM UNMUTE') || text.includes('AUDIO');
//                     const matchesJS = onClickStr.includes('unmute') || onClickStr.includes('volume') || onClickStr.includes('audio');
//                     const matchesAria = ariaLabel.includes('UNMUTE') || ariaLabel.includes('VOLUME');

//                     if (matchesText || matchesJS || matchesAria) {
//                         const rect = el.getBoundingClientRect();
//                         const isVisible = rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';

//                         if (isVisible) {
//                             console.log(`[🔊 ENGINE]: Dynamically triggered click on element with text: "${text || 'JS Action'}"`);
//                             try { el.click(); } catch(e) {}
//                             try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch(e) {}
//                         }
//                     }
//                 });

//                 // 2. Bruteforce Browser Native Media Layer
//                 document.querySelectorAll('video, audio').forEach(media => {
//                     if (media.muted) {
//                         media.muted = false;
//                         media.volume = 1.0;
//                     }
//                 });
//             }).catch(() => {});
//         } catch (e) {}
//     }
// }
// // =========================================================================================

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

//                     const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play, #hero-play-btn');
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

//         await page.evaluate(() => {
//             setInterval(() => {
//                 try {
//                     document.documentElement.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('background-color', 'black', 'important');
//                     document.body.style.setProperty('overflow', 'hidden', 'important');
//                     document.documentElement.style.setProperty('overflow', 'hidden', 'important');

//                     let iframes = Array.from(document.querySelectorAll('iframe'));
//                     let mainIframe = null; let maxScore = -1;

//                     // 1. ADVANCED GEOMETRIC SCORING
//                     iframes.forEach(ifr => {
//                         let width = ifr.clientWidth;
//                         let height = ifr.clientHeight;
//                         let area = width * height;

//                         if (area < 5000) return;

//                         let score = area;
                        
//                         if (ifr.hasAttribute('allowfullscreen') || 
//                             ifr.hasAttribute('webkitallowfullscreen') || 
//                             ifr.hasAttribute('mozallowfullscreen')) {
//                             score += 10000000; 
//                         }
                        
//                         if (height > width) {
//                             score = -1; 
//                         }

//                         if (score > maxScore) {
//                             maxScore = score;
//                             mainIframe = ifr;
//                         }
//                     });

//                     if (!mainIframe && iframes.length > 0) {
//                         mainIframe = iframes.find(ifr => 
//                             ifr.getAttribute('allowfullscreen') !== null || 
//                             (ifr.src && (ifr.src.includes('player') || ifr.src.includes('embed') || ifr.src.includes('stream') || ifr.src.includes('watch')))
//                         );
//                     }

//                     if (mainIframe) {
//                         iframes.forEach(ifr => {
//                             if (ifr !== mainIframe) {
//                                 ifr.style.setProperty('display', 'none', 'important');
//                                 ifr.style.setProperty('opacity', '0', 'important');
//                                 ifr.style.setProperty('z-index', '-9999', 'important');
                                
//                                 if (ifr.parentNode && ifr.parentNode !== document.body) {
//                                     try { 
//                                         ifr.parentNode.style.setProperty('display', 'none', 'important'); 
//                                         ifr.parentNode.style.setProperty('opacity', '0', 'important');
//                                     } catch(e) {}
//                                 }
//                             }
//                         });

//                         mainIframe.style.setProperty('position', 'fixed', 'important');
//                         mainIframe.style.setProperty('top', '0px', 'important');
//                         mainIframe.style.setProperty('left', '0px', 'important');
//                         mainIframe.style.setProperty('width', '100vw', 'important');
//                         mainIframe.style.setProperty('height', '100vh', 'important');
//                         mainIframe.style.setProperty('z-index', '2147483645', 'important'); 
//                         mainIframe.style.setProperty('background-color', 'black', 'important');
//                         mainIframe.style.setProperty('border', 'none', 'important');
//                         mainIframe.style.setProperty('opacity', '1', 'important');
//                         mainIframe.style.setProperty('display', 'block', 'important');
//                         mainIframe.style.setProperty('visibility', 'visible', 'important');
//                     }

//                     const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay), [id*="pop"], [class*="pop"], a[href*="extension"], [class*="notification"], [id*="notification"]';
//                     document.querySelectorAll(junkClasses).forEach(el => { 
//                         try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } 
//                     });

//                     const adKeywords = ['jerk', 'mate', 'free', 'online', 'adult', 'dating', 'close', 'notification', 'justine', 'paying', 'job'];
//                     document.querySelectorAll('div, section, span, a').forEach(el => {
//                         if (el.id === 'smart-stream-overlay') return;
                        
//                         const style = window.getComputedStyle(el);
//                         const isFloating = style.position === 'fixed' || style.position === 'absolute';
                        
//                         if (isFloating && el.innerText) {
//                             const textLower = el.innerText.toLowerCase();
//                             const hasBadKeyword = adKeywords.some(keyword => textLower.includes(keyword));
                            
//                             if (hasBadKeyword || (parseInt(style.zIndex) > 100000 && !el.querySelector('video') && !el.querySelector('iframe'))) {
//                                 try { el.remove(); } catch(e) { el.style.setProperty('display', 'none', 'important'); }
//                             }
//                         }
//                     });

//                 } catch (err) {}
//             }, 500); 
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
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (!realVideo && videos.length > 0) {
//                         realVideo = videos[0];
//                     }

//                     if (realVideo) { 
//                         realVideo.style.setProperty('position', 'fixed', 'important');
//                         realVideo.style.setProperty('top', '0px', 'important');
//                         realVideo.style.setProperty('left', '0px', 'important');
//                         realVideo.style.setProperty('width', '100vw', 'important');
//                         realVideo.style.setProperty('height', '100vh', 'important');
//                         realVideo.style.setProperty('z-index', '2147483646', 'important'); 
//                         realVideo.style.setProperty('background-color', 'black', 'important');
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                         realVideo.style.setProperty('opacity', '1', 'important');
//                         realVideo.style.setProperty('visibility', 'visible', 'important');
//                         realVideo.style.setProperty('display', 'block', 'important');
//                     }
//                 } catch(err) {}
//             }, 500); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     // 🔥 Added Smart Unmute Execution Here
//     await triggerSmartUnmute(page);
//     await new Promise(r => setTimeout(r, 1000));
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
                        
//                         if (targetV && !targetV.ended && targetV.currentTime > 0) {
//                             let frames = 0;
//                             if (targetV.getVideoPlaybackQuality) {
//                                 frames = targetV.getVideoPlaybackQuality().totalVideoFrames;
//                             } else if (targetV.webkitDecodedFrameCount !== undefined) {
//                                 frames = targetV.webkitDecodedFrameCount;
//                             }
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

// async function startWatchdog() {
//     let lastActiveTime = -1;
//     let lastDecodedFrames = -1; 
//     let frozenCheckTimestamp = Date.now();
//     let watchdogTicks = 0;

//     // Naye tracker flags hang state aur logging frequency monitor karne ke liye
//     let isCurrentlyHanging = false; 
//     let lastHangLogTime = 0;
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     // const WARMUP_MAX_TIME = 15000;
//     const WARMUP_MAX_TIME = 35000; // <--- Isko 35000 (35 seconds) kar dein

//     let activeUrlStr = urlList[currentUrlIndex];
//     let backupUrlStr = urlList[backupUrlIndex];

//     let currentStreamStartTime = Date.now();

//     while (true) {
//         if (!browser || !browser.isConnected()) throw new Error("Browser closed.");

//         let activeStatus = await checkPageStatus(activePage);

//         if (activeStatus.status === 'HEALTHY' && !isWarmupPhase) {
//             let elapsedMs = Date.now() - currentStreamStartTime;
//             let isExempted = NO_REFRESH_DOMAINS.some(domain => activeUrlStr.includes(domain));

//             if (elapsedMs > FORCE_REFRESH_MS) {
//                 if (!isExempted) {
//                     console.log(`\n[⏱️ PROACTIVE REFRESH]: Stream ran smoothly for ${FORCE_REFRESH_MINUTES} minutes! Forcing SAME LINK swap to keep connection fresh...`);
//                     activeStatus.status = 'FORCE_REFRESH'; 
//                 }
//             }
//         }

//         // if (activeStatus.status === 'HEALTHY') {
//         //     await hideLoadingUI(activePage); 
//         //     isWarmupPhase = false; 

//         if (activeStatus.status === 'HEALTHY') {
//             // Naya Success Print Statement
//             if (isWarmupPhase) {
//                 let setupTimeSec = ((Date.now() - streamSetupTime) / 1000).toFixed(1);
//                 console.log(`\n[🚀] STREAM READY: Video successfully start ho gayi hai! Initial Setup & Buffering me ${setupTimeSec} seconds lagay.\n`);
//             }

//             await hideLoadingUI(activePage); 
//             isWarmupPhase = false; 

//             // 🔥 Added Smart Unmute Continuous Engine Here

//             // 🔥 Added Smart Unmute Continuous Engine Here
//             await triggerSmartUnmute(activePage);

//             let isTimeStuck = (activeStatus.currentTime === lastActiveTime);
//             let isFrameStuck = (activeStatus.decodedFrames === lastDecodedFrames && activeStatus.decodedFrames > 0);

//             if (isTimeStuck || isFrameStuck) {
//                 let hangDuration = Date.now() - frozenCheckTimestamp;
                
//                 // Freeze detect hone par first alert
//                 if (!isCurrentlyHanging) {
//                     isCurrentlyHanging = true;
//                     console.log(`\n[⚠️] HANG DETECTED: Stream lag check start... Monitoring recovery.`);
//                 }

//                 // Har 4000ms (4 seconds) baad progress print karega jab tak 16 sec pore na hon
//                 if (Date.now() - lastHangLogTime >= 4000 && hangDuration < FROZEN_THRESHOLD_MS) {
//                     console.log(`[⏳] HANG MONITOR: Stream abhi bhi pause/stuck hai... (${(hangDuration / 1000).toFixed(1)}s / 16.0s elapsed)`);
//                     lastHangLogTime = Date.now();
//                 }

//                 // Final 16 sec cross hone par action
//                 if (hangDuration > FROZEN_THRESHOLD_MS) {
//                     activeStatus.status = 'FROZEN';
//                     if (isFrameStuck && !isTimeStuck) {
//                         console.log(`[!] ⚠️ SYSTEM SHIELD: Detected Black Screen (Audio playing, but video frames stuck). Triggering HOT-SWAP.`);
//                     }
//                 }
//             } else {
//                 // Agar 16 sec se pehle frames dobara start ho jayen
//                 if (isCurrentlyHanging) {
//                     console.log(`[✅] RECOVERY SUCCESS: Stream wapas start ho gayi hai! (Hot-swap trigger hone se pehle). Total Hang Time: ${((Date.now() - frozenCheckTimestamp) / 1000).toFixed(1)}s\n`);
//                     isCurrentlyHanging = false;
//                 }

//                 lastActiveTime = activeStatus.currentTime; 
//                 lastDecodedFrames = activeStatus.decodedFrames; 
//                 frozenCheckTimestamp = Date.now();
//                 lastHangLogTime = Date.now(); // Log timer reset
                
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
        
//         if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
//             console.log(`\n[💓] WATCHDOG HEARTBEAT: Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//             console.log(`[▶️] CURRENTLY LIVE   : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//             console.log(`[⏭️] NEXT IN QUEUE    : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//         }

//         if (watchdogTicks % 120 === 0) {
//             await takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
//         }

//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH') {
            
//             // if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//             //     console.log(`[⏳] Watchdog detected '${activeStatus.status}', but stream is in WARM-UP phase. Waiting...`);
//             //     await new Promise(r => setTimeout(r, 2000));
//             //     continue; 
//             // }

//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 let warmupElapsed = ((Date.now() - streamSetupTime) / 1000).toFixed(1);
//                 let warmupTotal = (WARMUP_MAX_TIME / 1000).toFixed(1);
//                 console.log(`[⏳] WARM-UP MONITOR: Detected '${activeStatus.status}', stream abhi buffering/setup phase me hai... (${warmupElapsed}s / ${warmupTotal}s elapsed)`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             }

//             let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

//             if (isProactiveRefresh) {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] 🔄 PROACTIVE REFRESH TRIGGERED`);
//                 console.log(`[*] Preparing a FRESH copy of SAME Server [${currentUrlIndex}] in background...`);
//                 console.log(`==================================================`);
                
//                 for (const frame of activePage.frames()) {
//                     try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                 }

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{});
//                 } catch(e) {
//                     console.log(`[⏳] Proactive refresh buffer navigation handled safely.`);
//                 }
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
//                 console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`==================================================`);
//                 await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
//             }
            
//             console.log(`[*] Checking Backup Tab status before switching...`);
//             let backupStatus = await checkPageStatus(backupPage);

//             if (backupStatus.status === 'HEALTHY' || backupStatus.status === 'DEAD') { 
                
//                 if (!isProactiveRefresh) {
//                     for (const frame of activePage.frames()) {
//                         try { if (!frame.isDetached()) await frame.evaluate(() => { document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                     }
//                 }
                
//                 await showLoadingUI(backupPage, isProactiveRefresh ? "REFRESHING CONNECTION" : "RECONNECTING", isProactiveRefresh ? "Optimizing current server stream <span class='stream-blink'>...</span>" : "Establishing secure connection to backup server <span class='stream-blink'>...</span>");
//                 await backupPage.bringToFront();
//                 await new Promise(r => setTimeout(r, 1000)); 
                
//                 try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                 console.log(`[*] Initializing Video on the newly active tab...`);
//                 await initializeVideo(backupPage, false, true); 
//                 await hideLoadingUI(backupPage);

//                 let brokenPage = activePage; activePage = backupPage; backupPage = brokenPage;
//                 lastActiveTime = -1; frozenCheckTimestamp = Date.now();

//                 if (!isProactiveRefresh) {
//                     currentUrlIndex = backupUrlIndex; activeUrlStr = urlList[currentUrlIndex]; 
//                     backupUrlIndex = (backupUrlIndex + 1) % urlList.length; backupUrlStr = urlList[backupUrlIndex]; 
//                 } 

//                 console.log(`\n==================================================`);
//                 console.log(isProactiveRefresh ? `[🔄] SAME-SERVER FRESH SWAP EXECUTED SUCCESSFULLY` : `[🔄] SMART HOT-SWAP TO NEXT SERVER EXECUTED SUCCESSFULLY`);
//                 console.log(`==================================================`);
//                 console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`[🔊] LIVE AUDIO STATUS : ON (Unmuted & Forced)`);
//                 console.log(`--------------------------------------------------`);
//                 console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//                 console.log(`[🔇] BACKUP AUDIO      : MUTED (Background Loading)`);
//                 console.log(`==================================================\n`);

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 } catch (e) {
//                     console.log(`[⏳] Background buffer navigation handled safely.`);
//                 }
                
//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true;
//                 currentStreamStartTime = Date.now();

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
//             console.log('[+] Enforced WaitingScene (Loading Bar Buffer Active)');
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
//         '--disable-renderer-backgrounding',
        
//         `--disable-extensions-except=${path.join(process.cwd(), 'ublock-lite')}`,
//         `--load-extension=${path.join(process.cwd(), 'ublock-lite')}`
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

//     const pages = await browser.pages();
//     activePage = pages[0]; 
//     backupPage = await browser.newPage();
    
//     await setupNetworkAdBlocker(activePage);
//     await setupNetworkAdBlocker(backupPage);

//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await applyPreloadFirewall(activePage);
//     await applyPreloadFirewall(backupPage);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex]}`);
//     await activePage.goto(urlList[currentUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 });
    
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     await initializeVideo(activePage, false, true); 
//     await hideLoadingUI(activePage); 

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex]}`);
//     backupPage.goto(urlList[backupUrlIndex], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 
//     await hideLoadingUI(activePage);

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
