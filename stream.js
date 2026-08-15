
// const puppeteer = require('puppeteer-extra');
// let isWarmupPhase = true;
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD (DEBUGGING MODE)
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     console.error('\n========================================');
//     console.error('[💥] UNCAUGHT EXCEPTION');
//     console.error(err);
//     console.error(err.stack);
//     console.error('========================================\n');
// });

// process.on('unhandledRejection', (reason) => {
//     console.error('\n========================================');
//     console.error('[💥] UNHANDLED REJECTION');
//     console.error(reason);
//     console.error('========================================\n');
// });

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME (IN MINUTES)
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 40000; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// // =========================================================================================
// // 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// // =========================================================================================
// const NO_REFRESH_DOMAINS = [
//     'youtube.com',
//     'facebook.com',
//     'streamed.pk',
//     'cricstreams.', 
//     'sport4u.online',
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

// // =========================================================================================
// // 🔄 DYNAMIC URL PARSER & METADATA EXTRACTOR
// // =========================================================================================
// let rawUrls = (process.env.TARGET_URLS || '').trim();
// let urlList = [];

// if (rawUrls !== '') {
//     urlList = rawUrls.split(',').map(u => {
//         let trimmed = u.trim();
//         let hangThreshold = 8000; 
        
//         if (trimmed.startsWith('!')) {
//             hangThreshold = 20000; 
//             trimmed = trimmed.substring(1); 
//         }
//         if (!trimmed.startsWith('http')) trimmed = 'https://' + trimmed;
        
//         return { url: trimmed, hangTime: hangThreshold };
//     });
// } else {
//     urlList = [
//         { url: 'https://sport4u.online', hangTime: 8000 },
//         { url: 'https://dadocric.st/player.php?id=starsp3&v=m', hangTime: 8000 }
//     ];
// }

// function getSafeBackupIndex(activeIndex, currentIndex, list) {
//     if (list.length <= 1) return 0; 
//     let next = (currentIndex + 1) % list.length;
//     if (next === activeIndex) {
//         next = (next + 1) % list.length; 
//     }
//     return next;
// }

// let currentUrlIndex = 0;
// let backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);

// const SELECTED_CHANNEL = process.env.OKRU_STREAM_ID || '1';
// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None'; 
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

// const ACTIVE_STREAM_KEY = STREAM_KEYS[SELECTED_CHANNEL] || STREAM_KEYS['1'];

// let browserArgs = []; // Global Browser Args for Recovery Functions
// let activeBrowser = null;
// let backupBrowser = null;
// let activeBrowserName = "CHROME 1";
// let backupBrowserName = "CHROME 2";
// let obsProcess = null;
// let activePage = null;
// let backupPage = null;


// async function createBrowserInstance(args) {
//     return await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: args
//     });
// }

// // =========================================================================================
// // 🛡️ SMART BROWSER RECOVERY
// // =========================================================================================

// async function preparePage(page) {
//     if (!page) return;
//     await setupNetworkAdBlocker(page);
//     attachAntiAdListeners(page);
//     await applyPreloadFirewall(page);
// }

// async function createFreshBackupBrowser() {
//     console.log('\n[🛠️] BACKUP RECOVERY: Creating fresh backup Chrome...');
//     try {
//         if (backupBrowser && backupBrowser.isConnected()) {
//             try {
//                 const pages = await backupBrowser.pages();
//                 for (const p of pages) {
//                     try { await p.close(); } catch (e) {}
//                 }
//             } catch (e) {}
//         }
//     } catch (e) {}

//     try {
//         if (backupBrowser && !backupBrowser.isConnected()) {
//             backupBrowser = null;
//         }
//     } catch (e) {
//         backupBrowser = null;
//     }

//     backupBrowser = await createBrowserInstance(browserArgs);
//     const pages = await backupBrowser.pages();
//     backupPage = pages[0];
//     await preparePage(backupPage);

//     backupBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             try {
//                 const newPage = await target.page();
//                 setTimeout(async () => {
//                     if (newPage && newPage !== backupPage) {
//                         try { await newPage.close(); } catch (e) {}
//                     }
//                 }, 500);
//             } catch (e) {}
//         }
//     });

//     console.log('[✅] BACKUP RECOVERY: Fresh backup Chrome created.');
//     return true;
// }

// async function createFreshActiveBrowser() {
//     console.log('\n[🛠️] ACTIVE RECOVERY: Creating fresh active Chrome...');
//     try {
//         if (activeBrowser && activeBrowser.isConnected()) {
//             try {
//                 const pages = await activeBrowser.pages();
//                 for (const p of pages) {
//                     try { await p.close(); } catch (e) {}
//                 }
//             } catch (e) {}
//         }
//     } catch (e) {}

//     try {
//         if (activeBrowser && !activeBrowser.isConnected()) {
//             activeBrowser = null;
//         }
//     } catch (e) {
//         activeBrowser = null;
//     }

//     activeBrowser = await createBrowserInstance(browserArgs);
//     const pages = await activeBrowser.pages();
//     activePage = pages[0];
//     await preparePage(activePage);

//     activeBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             try {
//                 const newPage = await target.page();
//                 setTimeout(async () => {
//                     if (newPage && newPage !== activePage) {
//                         try { await newPage.close(); } catch (e) {}
//                     }
//                 }, 500);
//             } catch (e) {}
//         }
//     });

//     console.log('[✅] ACTIVE RECOVERY: Fresh active Chrome created.');
//     return true;
// }

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
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') {
//                     init.mode = 'open'; 
//                 }
//                 const shadowRoot = originalAttachShadow.call(this, init);
                
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) {
//                         console.log('[🛡️] SHIELD: Shadow DOM Ad Detected & Destroyed!');
//                         this.remove(); 
//                     }
//                 });
                
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };
            
//             Element.prototype.attachShadow.toString = function() { return "function attachShadow() { [native code] }"; };

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
//                 in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }
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
//                             .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
//                             @keyframes blinker { 50% { opacity: 0.3; } }
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

// async function showRecoveryUI(page) {
//     try {
//         await page.evaluate(() => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('stream-recovery-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 return;
//             }
            
//             overlay = document.createElement('div');
//             overlay.id = 'stream-recovery-overlay';
//             overlay.innerHTML = `
//                 <style>
//                     #stream-recovery-overlay {
//                         position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                         width: 100vw !important; height: 100vh !important; background: rgba(0, 0, 0, 0.95) !important;
//                         z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                         justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                         font-family: Arial, sans-serif !important; pointer-events: all !important; backdrop-filter: blur(8px);
//                     }
//                     .recovery-radar {
//                         width: 100px; height: 100px; border-radius: 50%;
//                         border: 3px solid transparent; border-top-color: #ff9800; border-bottom-color: #ff9800;
//                         animation: radar-spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
//                         margin-bottom: 20px; box-shadow: 0 0 30px rgba(255, 152, 0, 0.3);
//                     }
//                     .recovery-radar::before {
//                         content: ''; position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px;
//                         border-radius: 50%; border: 3px solid transparent; border-left-color: #f44336; border-right-color: #f44336;
//                         animation: radar-spin 2s linear infinite reverse;
//                     }
//                     @keyframes radar-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                     .warn-title { font-size: 32px !important; font-weight: 800 !important; color: #ff9800 !important; letter-spacing: 2px !important; margin-bottom: 10px !important; text-transform: uppercase !important; }
//                     .warn-sub { font-size: 18px !important; color: #dddddd !important; animation: pulse-text 1.5s infinite; }
//                     @keyframes pulse-text { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
//                 </style>
//                 <div class="recovery-radar"></div>
//                 <div class="warn-title">SIGNAL LOST</div>
//                 <div class="warn-sub">Attempting Auto-Recovery...</div>
//             `;
//             document.documentElement.appendChild(overlay);
//         });
//     } catch (e) {}
// }

// async function hideRecoveryUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('stream-recovery-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'none', 'important');
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
    
//     const basicIniContent = `[General]\nName=Untitled\n[Video]\nBaseCX=${RES_W}\nBaseCY=${RES_H}\nOutputCX=${RES_W}\nOutputCY=${RES_H}\nFPSCommon=30\n[Output]\nMode=Simple\n[SimpleOutput]\nVBitrate=${BITRATE}\nStreamEncoder=x264\nx264Preset=ultrafast\nx264Settings=keyint=60 tune=zerolatency profile=main threads=4 rc-lookahead=0\n`;
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
//                             // await takeAndBatchScreenshot(page, `play-btn-clicked`);
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
//                             // await takeAndBatchScreenshot(page, `force-play-applied`);
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

//                     const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay):not(#stream-recovery-overlay):not([class*="player"]):not([class*="jw"]):not([class*="vjs"]), [id*="pop"], [class*="pop"], a[href*="extension"], [class*="notification"], [id*="notification"]';
//                     document.querySelectorAll(junkClasses).forEach(el => { 
//                         try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } 
//                     });

//                     const adKeywords = ['jerk', 'mate', 'free', 'online', 'adult', 'dating', 'close', 'notification', 'justine', 'paying', 'job'];
//                     document.querySelectorAll('div, section, span, a').forEach(el => {
//                         if (el.id === 'smart-stream-overlay' || el.id === 'stream-recovery-overlay') return;
                        
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
//             // FIX 1: Use window object to control audio globally to avoid Audio War
//             window.isStreamMuted = muteVideo; 

//             setInterval(() => {
//                 try {
//                     const style = document.createElement('style');
//                     style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                     document.head.appendChild(style);

//                     const mediaElements = document.querySelectorAll('video, audio');
//                     const videos = Array.from(document.querySelectorAll('video'));
//                     let realVideo = null;

//                     mediaElements.forEach(media => { 
//                         media.muted = window.isStreamMuted; 
//                         media.volume = window.isStreamMuted ? 0.0 : 1.0; 
//                     });

//                     if (!window.isStreamMuted) {
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (!realVideo && videos.length > 0) {
//                         realVideo = videos[0];
//                     }

//                     if (realVideo) { 
//                         let playerWrap = realVideo.closest('.jwplayer, #player, .plyr, .vjs-player, .shaka-video-container, [data-player]') || realVideo;
                        
//                         playerWrap.style.setProperty('position', 'fixed', 'important');
//                         playerWrap.style.setProperty('top', '0px', 'important');
//                         playerWrap.style.setProperty('left', '0px', 'important');
//                         playerWrap.style.setProperty('width', '100vw', 'important');
//                         playerWrap.style.setProperty('height', '100vh', 'important');
//                         playerWrap.style.setProperty('z-index', '2147483646', 'important'); 
//                         playerWrap.style.setProperty('background-color', 'black', 'important');
//                         playerWrap.style.setProperty('opacity', '1', 'important');
//                         playerWrap.style.setProperty('visibility', 'visible', 'important');
//                         playerWrap.style.setProperty('display', 'block', 'important');
                        
//                         if (playerWrap !== realVideo) {
//                             realVideo.style.setProperty('width', '100%', 'important');
//                             realVideo.style.setProperty('height', '100%', 'important');
//                         }
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                     }
//                 } catch(err) {}
//             }, 500); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     if (!startMuted) {
//         await triggerSmartUnmute(page);
//         await new Promise(r => setTimeout(r, 1000));
//     }
// }



// // async function checkPageStatus(page) {
// //     if (!page) return { status: 'DEAD' };
// //     try {
// //         for (const frame of page.frames()) {
// //             try {
// //                 if (frame.isDetached()) continue;
// //                 const result = await Promise.race([
// //                     frame.evaluate(() => {
// //                         const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
                        
// //                         // 🛠️ FIX 1: HLS Error Detection & "Ctrl + R" (Page Reload)
// //                         if (
// //                             bodyText.includes("hls:networkerror_manifestloaderror") || 
// //                             bodyText.includes("could not play video") ||
// //                             bodyText.includes("problem trying to load the video")
// //                         ) {
// //                             // 1 second ka time de kar automatically page ko refresh (Ctrl+R) kar dega
// //                             setTimeout(() => {
// //                                 window.location.reload(true);
// //                             }, 1000);
                            
// //                             return { status: 'HLS_RECOVERING', currentTime: 0, decodedFrames: 0 };
// //                         }

// //                         // Critical Errors Check
// //                         if (
// //                             bodyText.includes("stream error") || 
// //                             bodyText.includes("not found") || 
// //                             bodyText.includes("domain is blocked") ||
// //                             bodyText.includes("error: forbidden") ||
// //                             bodyText.includes("does not have permission") ||
// //                             bodyText.includes("access denied") ||
// //                             (bodyText.includes("cloudflare") && bodyText.includes("blocked"))
// //                         ) {
// //                             return { status: 'CRITICAL_ERROR' };
// //                         }
                        
// //                         const videos = Array.from(document.querySelectorAll('video'));
// //                         let targetV = null;

// //                         for (const v of videos) {
// //                             if (v.clientWidth > 0 && v.clientWidth < 100) continue;
// //                             if ((v.src && v.src.startsWith('blob:')) || v.matches('.jw-video, .plyr__video, .vjs-tech')) {
// //                                 targetV = v; break;
// //                             }
// //                         }
                        
// //                         if (!targetV && videos.length > 0) {
// //                             targetV = videos.sort((a, b) => (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight))[0];
// //                         }
                        
// //                         // 🛠️ FIX 2: Prevent fake DEAD by allowing targetV.currentTime to be 0 (buffering)
// //                         if (targetV && !targetV.ended) {
// //                             let frames = 0;
// //                             if (targetV.getVideoPlaybackQuality) {
// //                                 frames = targetV.getVideoPlaybackQuality().totalVideoFrames;
// //                             } else if (targetV.webkitDecodedFrameCount !== undefined) {
// //                                 frames = targetV.webkitDecodedFrameCount;
// //                             }
// //                             return { status: 'HEALTHY', currentTime: targetV.currentTime, decodedFrames: frames };
// //                         }
// //                         return { status: 'DEAD' };
// //                     }),
// //                     // 🛠️ FIX 3: Timeout at 4000ms
// //                     new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 4000))
// //                 ]);
// //                 if (result && result.status !== 'DEAD') return result;
// //             } catch (err) {}
// //         }
// //     } catch (e) { return { status: 'DEAD' }; }
// //     return { status: 'DEAD' };
// // }

// async function checkPageStatus(page) {
//     if (!page) return { status: 'DEAD' };
//     try {
//         for (const frame of page.frames()) {
//             try {
//                 if (frame.isDetached()) continue;
//                 const result = await Promise.race([
//                     frame.evaluate(() => {
//                         const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
                        
//                         // 🛠️ FIX 1: HLS Manifest Error Detection & Auto-Recovery Click
//                         if (
//                             bodyText.includes("hls:networkerror_manifestloaderror") || 
//                             bodyText.includes("could not play video") ||
//                             bodyText.includes("problem trying to load the video")
//                         ) {
//                             const reloadElements = document.querySelectorAll('button, div, span, a, i');
//                             reloadElements.forEach(el => {
//                                 const className = (el.className || '').toLowerCase();
//                                 if (className.includes('reload') || className.includes('refresh') || className.includes('retry')) {
//                                     try { el.click(); } catch(e) {}
//                                 }
//                             });
//                             return { status: 'HLS_RECOVERING', currentTime: 0, decodedFrames: 0 };
//                         }

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
                        
//                         // 🛠️ FIX 2: Removed "targetV.currentTime > 0" to stop fake DEAD triggers on buffer
//                         if (targetV && !targetV.ended) {
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
//                     // 🛠️ FIX 3: Increased Promise timeout to 4000ms for stable background evaluation
//                     new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 4000))
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
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     let backupWarmupTime = Date.now(); 
//     const WARMUP_MAX_TIME = 15000; 

//     let activeUrlStr = urlList[currentUrlIndex].url;
//     let backupUrlStr = urlList[backupUrlIndex].url;

//     let currentStreamStartTime = Date.now();
//     let isRecoveryUIShown = false;

//     while (true) {
//         // =====================================================================================
//         // 🛡️ NEVER THROW JUST BECAUSE ONE CHROME DISCONNECTED
//         // Recover the affected side instead.
//         // =====================================================================================
//         const activeBrowserAlive = activeBrowser && activeBrowser.isConnected();
//         const backupBrowserAlive = backupBrowser && backupBrowser.isConnected();

//         // ---------------------------------------------------------------------
//         // CASE 1: ACTIVE CHROME DEAD, BACKUP CHROME STILL ALIVE
//         // ---------------------------------------------------------------------
//         if (!activeBrowserAlive && backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[🚨] ACTIVE CHROME DISCONNECTED');
//             console.log('[🔄] BACKUP CHROME IS ALIVE');
//             console.log('[⚡] PROMOTING BACKUP -> ACTIVE');
//             console.log('[🛡️] OBS WILL CONTINUE RUNNING');
//             console.log('==================================================\n');

//             const oldActiveBrowser = activeBrowser;
//             const oldActivePage = activePage;
//             activeBrowser = backupBrowser;
//             activePage = backupPage;
//             backupBrowser = oldActiveBrowser;
//             backupPage = oldActivePage;

//             const oldActiveName = activeBrowserName;
//             activeBrowserName = backupBrowserName;
//             backupBrowserName = oldActiveName;

//             const previousActiveIndex = currentUrlIndex;
//             currentUrlIndex = backupUrlIndex;
//             activeUrlStr = urlList[currentUrlIndex].url;

//             backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//             backupUrlStr = urlList[backupUrlIndex].url;

//             lastActiveTime = -1; lastDecodedFrames = -1; frozenCheckTimestamp = Date.now();
//             streamSetupTime = Date.now(); currentStreamStartTime = Date.now();
//             isWarmupPhase = true; backupWarmupTime = Date.now(); isRecoveryUIShown = false;

//             try { await activePage.bringToFront(); await hideLoadingUI(activePage); } catch (e) {}

//             console.log('[✅] BACKUP PROMOTED SUCCESSFULLY');
//             console.log(`[📺] NEW ACTIVE SERVER : [${currentUrlIndex}] -> ${activeUrlStr}`);
//             console.log(`[🔊] ACTIVE AUDIO      : ON`);
//             console.log(`[🛡️] NEW BACKUP SERVER : [${backupUrlIndex}] -> ${backupUrlStr}`);

//             try {
//                 await createFreshBackupBrowser();
//                 await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await initializeVideo(backupPage, true, false);
//                 console.log('[✅] NEW BACKUP SERVER IS BUFFERING IN BACKGROUND');
//             } catch (e) {
//                 console.log(`[⚠️] Backup recreation failed. Watchdog will try the NEXT server.`);
//             }
//             continue;
//         }

//         // ---------------------------------------------------------------------
//         // CASE 2: BACKUP CHROME DEAD, ACTIVE CHROME STILL ALIVE
//         // ---------------------------------------------------------------------
//         if (activeBrowserAlive && !backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[⚠️] BACKUP CHROME DISCONNECTED');
//             console.log('[🛡️] ACTIVE STREAM WILL NOT BE TOUCHED');
//             console.log('[🔄] REBUILDING BACKUP WITH NEXT SERVER');
//             console.log('==================================================\n');

//             try {
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] NEXT BACKUP SERVER -> [${backupUrlIndex}] ${backupUrlStr}`);
//                 await createFreshBackupBrowser();
//                 await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await initializeVideo(backupPage, true, false);
//                 backupWarmupTime = Date.now();
//                 console.log(`[✅] BACKUP RECOVERED -> Server [${backupUrlIndex}]`);
//             } catch (e) {
//                 console.log(`[⚠️] Backup recovery failed. NEXT WATCHDOG CYCLE WILL TRY AGAIN.`);
//             }
//         }

//         // ---------------------------------------------------------------------
//         // CASE 3: BOTH CHROMES DEAD
//         // ---------------------------------------------------------------------
//         if (!activeBrowserAlive && !backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[🚨] BOTH CHROME INSTANCES DISCONNECTED');
//             console.log('[🛠️] LOCAL RECOVERY MODE');
//             console.log('[🛑] OBS WILL NOT BE RESTARTED');
//             console.log('==================================================\n');

//             try {
//                 currentUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 activeUrlStr = urlList[currentUrlIndex].url;

//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] RECOVERY ACTIVE -> [${currentUrlIndex}] ${activeUrlStr}`);
//                 console.log(`[*] RECOVERY BACKUP -> [${backupUrlIndex}] ${backupUrlStr}`);

//                 await createFreshActiveBrowser();
//                 await activePage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await showLoadingUI(activePage, "SEARCHING SERVER", "Finding a stable stream connection <span class='stream-blink'>...</span>");
//                 await initializeVideo(activePage, false, true);
//                 await hideLoadingUI(activePage);

//                 console.log('[✅] ACTIVE CHROME RECOVERED');

//                 try {
//                     await createFreshBackupBrowser();
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                     console.log('[✅] BACKUP CHROME RECOVERED');
//                 } catch (backupError) {
//                     console.log('[⚠️] Backup failed. Active stream continues.');
//                 }

//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}

//                 streamSetupTime = Date.now(); currentStreamStartTime = Date.now(); backupWarmupTime = Date.now();
//                 frozenCheckTimestamp = Date.now(); lastActiveTime = -1; lastDecodedFrames = -1;
//                 isWarmupPhase = true; isRecoveryUIShown = false;

//                 console.log('[✅] LOCAL RECOVERY COMPLETE — WATCHDOG CONTINUES');
//             } catch (e) {
//                 console.log(`[❌] Local Chrome recovery failed: ${e.message}`);
//                 await new Promise(r => setTimeout(r, 3000));
//             }
//             continue;
//         }

//         let activeHangThresholdMs = urlList[currentUrlIndex].hangTime;
//         let activeStatus = await checkPageStatus(activePage);

//         // 🔄 1. BACKGROUND SHIELD
//         if (!isWarmupPhase && (Date.now() - backupWarmupTime > 30000)) { 
//             let backupStatus = await checkPageStatus(backupPage);
            
//             if (backupStatus.status === 'DEAD' || backupStatus.status === 'CRITICAL_ERROR' || backupStatus.status === 'FROZEN') {
//                 console.log(`\n[⚠️] BACKGROUND SHIELD: Backup Server [${backupUrlIndex}] failed silently.`);
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;
                
//                 console.log(`[*] Shifting Backup Chrome to NEXT link -> Server [${backupUrlIndex}]`);
//                 backupWarmupTime = Date.now();
                
//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                 } catch(e) {}
//             }
//         }

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

//         // Active Tab Audio Watchdog Fix (Stop Audio War)
//         if (activeStatus.status === 'HEALTHY') {
//             await hideLoadingUI(activePage); 
//             isWarmupPhase = false; 

//             let isTimeStuck = (activeStatus.currentTime === lastActiveTime);
//             let isFrameStuck = (activeStatus.decodedFrames === lastDecodedFrames && activeStatus.decodedFrames > 0);

//             if (isTimeStuck || isFrameStuck) {
//                 if (!isRecoveryUIShown) {
//                     await showRecoveryUI(activePage);
//                     isRecoveryUIShown = true;
//                     console.log(`[⚠️] Stream Hang Detected! Showing Signal Recovery Shield instantly...`);
//                 }

//                 if (Date.now() - frozenCheckTimestamp > activeHangThresholdMs) {
//                     activeStatus.status = 'FROZEN';
//                     if (isFrameStuck && !isTimeStuck) {
//                         console.log(`[!] ⚠️ SYSTEM SHIELD: Detected Black Screen (Audio playing, but video frames stuck). Triggering HOT-SWAP.`);
//                     }
//                     isRecoveryUIShown = false; 
//                 }
//             } else {
//                 lastActiveTime = activeStatus.currentTime; 
//                 lastDecodedFrames = activeStatus.decodedFrames; 
//                 frozenCheckTimestamp = Date.now();
                
//                 if (isRecoveryUIShown) {
//                     await hideRecoveryUI(activePage);
//                     isRecoveryUIShown = false;
//                     console.log(`[✅] Stream Recovered! Signal Recovery Shield removed instantly.`);
//                 }
                
//                 // Mute override for active page (Audio fix applied)
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             frame.evaluate(() => { 
//                                 window.isStreamMuted = false;
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                                 document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                             }).catch(()=>{});
//                         }
//                     } catch(e) {}
//                 }
//             }
//         }

//         // Backup Tab Audio Watchdog Fix
//         if (backupPage) {
//             for (const frame of backupPage.frames()) {
//                 try {
//                     if (!frame.isDetached()) {
//                         frame.evaluate(() => { 
//                             window.isStreamMuted = true;
//                             document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); 
//                         }).catch(()=>{});
//                     }
//                 } catch(e) {}
//             }
//         }

//         watchdogTicks++;

//         if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
//             let logBackupStatus = await checkPageStatus(backupPage);
//             let nextAfterBackupIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//             let nextAfterBackupUrl = urlList[nextAfterBackupIndex].url;
            
//             console.log(`\n==================================================`);
//             console.log(`[💓] ACTIVE HEARTBEAT (${activeBrowserName}): Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'} (Limit: ${activeHangThresholdMs/1000}s)`);
//             console.log(`[▶️] CURRENTLY LIVE              : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//             console.log(`--------------------------------------------------`);
//             console.log(`[🖤] BACKUP HEARTBEAT (${backupBrowserName}): Status is ${logBackupStatus.status} | Video Time: ${logBackupStatus.currentTime ? logBackupStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//             console.log(`[🔄] RUNNING IN BACKGROUND       : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//             console.log(`[⏭️] NEXT QUEUE (AFTER BACKUP)  : Server [${nextAfterBackupIndex}] -> ${nextAfterBackupUrl}`);
//             console.log(`==================================================\n`);
//         }

        

//         // =========================================================================================
//         // 🔄 2. ACTIVE TAB HOT-SWAP SHIELD (UPDATED: INSTANT SEAMLESS PROMOTION)
//         // =========================================================================================
//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH') {
            
//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 console.log(`[⏳] Watchdog detected '${activeStatus.status}', but stream is in WARM-UP phase. Waiting...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             }

//             let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

//             if (isProactiveRefresh) {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] 🔄 PROACTIVE REFRESH TRIGGERED`);
//                 console.log(`[*] Initiating forward rotation to prevent stream drop...`);
//                 console.log(`==================================================`);
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
//                 console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`==================================================`);
                
//             }
            
//             console.log(`[*] Checking Backup Tab status before switching...`);
//             let backupStatus = await checkPageStatus(backupPage);



// // --------------------------------------------------------------------
//             // ⚡ SCENARIO A: INSTANT SEAMLESS HOT-SWAP (BACKUP IS ALREADY HEALTHY)
//             // --------------------------------------------------------------------
//             if (backupStatus.status === 'HEALTHY' && !isProactiveRefresh) {
                
//                 console.log('\n==================================================');
//                 console.log('[⚡] BACKUP STREAM ALREADY HEALTHY');
//                 console.log('[⚡] SHOWING TRANSITION UI & PROMOTING INSTANTLY');
//                 console.log('==================================================');

//                 // 1. Visually ek smooth "RECONNECTING" UI lagayein
//                 await showLoadingUI(backupPage, "RECONNECTING", "Establishing secure connection to backup server <span class='stream-blink'>...</span>");

//                 // 2. Tab ko screen par layein
//                 try { await backupPage.bringToFront(); } catch (e) {}

//                 // 3. Objects swap karein (Chrome 2 ab Chrome 1 ban gaya)
//                 let brokenPage = activePage; 
//                 activePage = backupPage; 
//                 backupPage = brokenPage;

//                 let brokenBrowser = activeBrowser; 
//                 activeBrowser = backupBrowser; 
//                 backupBrowser = brokenBrowser;

//                 let brokenName = activeBrowserName;
//                 activeBrowserName = backupBrowserName;
//                 backupBrowserName = brokenName;

//                 let previousActiveIndex = currentUrlIndex;
//                 currentUrlIndex = backupUrlIndex;
//                 activeUrlStr = urlList[currentUrlIndex].url; 
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 // 4. 🛠️ INSTANT AUDIO FIX: Background tab mute tha, isko foran unmute karein swap hotay hi!
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             await frame.evaluate(() => { 
//                                 window.isStreamMuted = false;
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                                 document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                             });
//                         }
//                     } catch(e) {}
//                 }

//                 // 5. State Reset (Keep isWarmupPhase FALSE because stream is already healthy)
//                 lastActiveTime = -1; 
//                 lastDecodedFrames = -1;
//                 frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false; 

//                 streamSetupTime = Date.now(); 
//                 currentStreamStartTime = Date.now();
//                 isWarmupPhase = false; 
                
//                 // Extra buffer time for background checks to avoid conflicts
//                 backupWarmupTime = Date.now() + 5000; 

//                 // 6. SMOOTH UI REMOVAL: Wait 1.5s for render paint to stabilize
//                 await new Promise(r => setTimeout(r, 1500));
//                 try { await hideLoadingUI(activePage); } catch(e) {}

//                 console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`[🔊] LIVE AUDIO STATUS : ON (Seamlessly Promoted & Unmuted)`);
//                 console.log(`--------------------------------------------------`);
//                 console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//                 console.log(`==================================================\n`);

//                 // 7. 🛠️ CPU BOTTLENECK FIX: Heavy background rebuilding ko 3 seconds delay karein
//                 // Taa k watchdog ka immediate next active check timeout na ho aur "DEAD" issue na aye.
//                 setTimeout(async () => {
//                     try {
//                         console.log(`[⏳] Starting background buffer rebuilding safely...`);
//                         await backupPage.goto('about:blank').catch(()=>{});
//                         await applyPreloadFirewall(backupPage);
//                         await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                         await initializeVideo(backupPage, true, false);
//                     } catch (e) {
//                         console.log(`[⚠️] Background buffer navigation handled safely.`);
//                     }
//                 }, 3000); 
//             }







//             // --------------------------------------------------------------------
//             // 🔄 SCENARIO B: PROACTIVE REFRESH OR FORCED RECONNECTION
//             // --------------------------------------------------------------------
//             else if (isProactiveRefresh || (backupStatus.status === 'HEALTHY' && isProactiveRefresh)) {
                
//                 for (const frame of activePage.frames()) {
//                     try { if (!frame.isDetached()) await frame.evaluate(() => { window.isStreamMuted = true; document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                 }
                
//                 await showLoadingUI(backupPage, "REFRESHING CONNECTION", "Optimizing current server stream <span class='stream-blink'>...</span>");
//                 await backupPage.bringToFront();
//                 await new Promise(r => setTimeout(r, 1000)); 
                
//                 try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                 console.log(`[*] Initializing Video on the newly active tab...`);
//                 await initializeVideo(backupPage, false, true); 
//                 await hideLoadingUI(backupPage);

//                 let brokenPage = activePage; 
//                 activePage = backupPage; 
//                 backupPage = brokenPage;

//                 let brokenBrowser = activeBrowser; 
//                 activeBrowser = backupBrowser; 
//                 backupBrowser = brokenBrowser;

//                 let brokenName = activeBrowserName;
//                 activeBrowserName = backupBrowserName;
//                 backupBrowserName = brokenName;
                
//                 lastActiveTime = -1; frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false; 

//                 let previousActiveIndex = currentUrlIndex;
//                 currentUrlIndex = backupUrlIndex;
//                 activeUrlStr = urlList[currentUrlIndex].url; 
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`\n==================================================`);
//                 console.log(`[🔄] PROACTIVE REFRESH EXECUTED SUCCESSFULLY`);
//                 console.log(`==================================================`);

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                 } catch (e) {}
                
//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true;
//                 currentStreamStartTime = Date.now();
//                 // 🚀 FIX: Lock background watchdog for Proactive Refresh too!
//                 backupWarmupTime = Date.now(); 
//             }



//             // --------------------------------------------------------------------
//             // ❌ SCENARIO C: BOTH TABS FAILED (Fresh Hunting Mode)
//             // --------------------------------------------------------------------
//             else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ BOTH TABS FAILED (Active & Backup Compromised)`);
//                 console.log(`[🔍] FRESH HUNTING MODE ACTIVATED: Spawning clean tabs...`);
//                 console.log(`==================================================`);
                
//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch (e) {}

//                 currentUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 activeUrlStr = urlList[currentUrlIndex].url;
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] Hunting Active -> Server [${currentUrlIndex}]`);
//                 console.log(`[*] Hunting Backup -> Server [${backupUrlIndex}]`);

//                 console.log(`[*] Closing crashed tabs and spawning fresh ones...`);
//                 try { await activePage.close(); } catch(e) {}
//                 try { await backupPage.close(); } catch(e) {}

//                 activePage = await activeBrowser.newPage();
//                 backupPage = await backupBrowser.newPage();

//                 await setupNetworkAdBlocker(activePage);
//                 await setupNetworkAdBlocker(backupPage);
//                 attachAntiAdListeners(activePage);
//                 attachAntiAdListeners(backupPage);
//                 await applyPreloadFirewall(activePage);
//                 await applyPreloadFirewall(backupPage);

//                 try {
//                     await activePage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 });
//                     await showLoadingUI(activePage, "SEARCHING SERVER", "Hunting for a stable stream connection <span class='stream-blink'>...</span>");
//                     await initializeVideo(activePage, false, true); 
//                     await hideLoadingUI(activePage);
//                 } catch(e) {}

//                 try {
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{});
//                     await initializeVideo(backupPage, true, false); 
//                 } catch(e) {}

//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true; 
//                 currentStreamStartTime = Date.now();
//                 backupWarmupTime = Date.now();
//                 lastActiveTime = -1;
//                 frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false;

//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
                
//                 console.log(`[*] Fresh tabs active. Waiting 15 seconds (Warm-up) for video to stabilize...`);
//             }
//         } 
       
//         await new Promise(r => setTimeout(r, 2000)); 
//     }
// }

// async function startDirectStreaming() {
//     activeBrowserName = "CHROME 1";
//     backupBrowserName = "CHROME 2";
    
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

//     browserArgs = [
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
//         '--disable-blink-features=AutomationControlled',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion,NetworkServiceInProcess2',
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

//     console.log(`[*] Starting ACTIVE browser instance...`);
//     activeBrowser = await createBrowserInstance(browserArgs);
//     const activePages = await activeBrowser.pages();
//     activePage = activePages[0];

//     console.log(`[*] Starting BACKUP browser instance in background...`);
//     backupBrowser = await createBrowserInstance(browserArgs);
//     const backupPages = await backupBrowser.pages();
//     backupPage = backupPages[0];

//     activeBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => { if (newPage && newPage !== activePage) { try { await newPage.close(); } catch(e) {} } }, 500);
//         }
//     });

//     backupBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => { if (newPage && newPage !== backupPage) { try { await newPage.close(); } catch(e) {} } }, 500);
//         }
//     });

//     await setupNetworkAdBlocker(activePage);
//     await setupNetworkAdBlocker(backupPage);

//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await applyPreloadFirewall(activePage);
//     await applyPreloadFirewall(backupPage);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex].url}`);
//     try {
//         await activePage.goto(urlList[currentUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 });
//     } catch (e) {
//         console.log(`[⚠️] Network buffer safely handled for primary URL.`);
//     }
    
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     await initializeVideo(activePage, false, true); 
//     await hideLoadingUI(activePage); 

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex].url}`);
//     try {
//         await backupPage.goto(urlList[backupUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 });
//     } catch (e) {}
    
//     await initializeVideo(backupPage, true, false);
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 
//     await hideLoadingUI(activePage);

//     console.log(`\n==================================================`);
//     console.log(`[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     console.log(`==================================================`);
//     console.log(`[📺] CURRENT ACTIVE LIVE : Server [${currentUrlIndex}] -> ${urlList[currentUrlIndex].url}`);
//     console.log(`[🔊] LIVE AUDIO STATUS   : ON (Unmuted)`);
//     console.log(`--------------------------------------------------`);
//     console.log(`[🛡️] NEXT BACKUP QUEUE   : Server [${backupUrlIndex}] -> ${urlList[backupUrlIndex].url}`);
//     console.log(`[🔇] BACKUP AUDIO STATUS : MUTED (Background)`);
//     console.log(`==================================================\n`);

//     console.log('[*] Everything Setup! Dual-Tab Monitoring is Active.');
//     await startWatchdog();
// }

// async function mainLoop() {
//     while (true) {
//         try {
//             await startDirectStreaming();
//         } catch (error) {
//             console.error('\n==================================================');
//             console.error('[🚨] FATAL ENGINE ERROR');
//             console.error(`[!] ${error.message}`);
//             console.error('==================================================');

//             if (activeBrowser && activeBrowser.isConnected()) {
//                 console.log('[🛡️] ACTIVE CHROME STILL ALIVE — NOT RESTARTING ENGINE.');
//                 await new Promise(resolve => setTimeout(resolve, 3000));
//                 continue;
//             }

//             if (backupBrowser && backupBrowser.isConnected()) {
//                 console.log('[🛡️] BACKUP CHROME STILL ALIVE — NOT RESTARTING ENGINE.');
//                 await new Promise(resolve => setTimeout(resolve, 3000));
//                 continue;
//             }

//             console.log('[⚠️] NO CHROME INSTANCE SURVIVED. Performing final recovery.');

//             try { if (activeBrowser) await activeBrowser.close().catch(() => {}); } catch (e) {}
//             try { if (backupBrowser) await backupBrowser.close().catch(() => {}); } catch (e) {}

//             activeBrowser = null; backupBrowser = null; activePage = null; backupPage = null;

//             await new Promise(resolve => setTimeout(resolve, 3000));
//             await cleanup();
//         }
//     }
// }

// async function cleanup() {
//     console.log('[*] Cleaning up resources...');
//     try { await obs.disconnect(); } catch (e) { } 
//     if (activeBrowser) { try { await activeBrowser.close(); } catch(e) { } activeBrowser = null; }
//     if (backupBrowser) { try { await backupBrowser.close(); } catch(e) { } backupBrowser = null; }
    
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
//             const targetUrls = process.env.TARGET_URLS || 'https://sport4u.online';
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

































const puppeteer = require('puppeteer-extra');
let isWarmupPhase = true;
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn, execSync, exec } = require('child_process');
const { OBSWebSocket } = require('obs-websocket-js'); 

// =========================================================================================
// 🛡️ GLOBAL CRASH PREVENTION SHIELD (DEBUGGING MODE)
// =========================================================================================
process.on('uncaughtException', (err) => {
    console.error('\n========================================');
    console.error('[💥] UNCAUGHT EXCEPTION');
    console.error(err);
    console.error(err.stack);
    console.error('========================================\n');
});

process.on('unhandledRejection', (reason) => {
    console.error('\n========================================');
    console.error('[💥] UNHANDLED REJECTION');
    console.error(reason);
    console.error('========================================\n');
});

const obs = new OBSWebSocket(); 

// =========================================================================================
// ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME (IN MINUTES)
// =========================================================================================
const FORCE_REFRESH_MINUTES = 40000; 
const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// =========================================================================================
// 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// =========================================================================================
const NO_REFRESH_DOMAINS = [
    'youtube.com',
    'facebook.com',
    'streamed.pk',
    'cricstreams.', 
    'sport4u.online',
    'website-vercel-helper-d-jaja-3-2.vercel.app',
    'websitestream.netlify.app/?ch=Channel%20HD%2071'
];

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

const selectedQuality = process.env.STREAM_QUALITY || 'Original (1080p Max)';
let RES_W = 1920, RES_H = 1080, BITRATE = 5000;

if (selectedQuality === '360p') { RES_W = 640; RES_H = 360; BITRATE = 800; }
else if (selectedQuality === '480p') { RES_W = 854; RES_H = 480; BITRATE = 1500; }
else if (selectedQuality === '720p') { RES_W = 1280; RES_H = 720; BITRATE = 3000; }
else if (selectedQuality === '1080p') { RES_W = 1920; RES_H = 1080; BITRATE = 4500; }
else { RES_W = 1920; RES_H = 1080; BITRATE = 6000; }

console.log(`[🚀] Smart Engine Locked to: ${RES_W}x${RES_H} @ ${BITRATE}kbps`);
console.log(`[⏱️] Auto-Refresh Time Set To: ${FORCE_REFRESH_MINUTES} Minutes`);

// =========================================================================================
// 🔄 DYNAMIC URL PARSER & METADATA EXTRACTOR
// =========================================================================================
let rawUrls = (process.env.TARGET_URLS || '').trim();
let urlList = [];

if (rawUrls !== '') {
    urlList = rawUrls.split(',').map(u => {
        let trimmed = u.trim();
        let hangThreshold = 8000; 
        
        if (trimmed.startsWith('!')) {
            hangThreshold = 20000; 
            trimmed = trimmed.substring(1); 
        }
        if (!trimmed.startsWith('http')) trimmed = 'https://' + trimmed;
        
        return { url: trimmed, hangTime: hangThreshold };
    });
} else {
    urlList = [
        { url: 'https://sport4u.online', hangTime: 8000 },
        { url: 'https://dadocric.st/player.php?id=starsp3&v=m', hangTime: 8000 }
    ];
}

function getSafeBackupIndex(activeIndex, currentIndex, list) {
    if (list.length <= 1) return 0; 
    let next = (currentIndex + 1) % list.length;
    if (next === activeIndex) {
        next = (next + 1) % list.length; 
    }
    return next;
}

let currentUrlIndex = 0;
let backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);

const SELECTED_CHANNEL = process.env.OKRU_STREAM_ID || '1';
const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None'; 
const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

const ACTIVE_STREAM_KEY = STREAM_KEYS[SELECTED_CHANNEL] || STREAM_KEYS['1'];

let browserArgs = []; // Global Browser Args for Recovery Functions
let activeBrowser = null;
let backupBrowser = null;
let activeBrowserName = "CHROME 1";
let backupBrowserName = "CHROME 2";
let obsProcess = null;
let activePage = null;
let backupPage = null;


async function createBrowserInstance(args) {
    return await puppeteer.launch({
        headless: false, 
        defaultViewport: { width: RES_W, height: RES_H },
        ignoreDefaultArgs: ['--enable-automation'], 
        args: args
    });
}

// =========================================================================================
// 🛡️ SMART BROWSER RECOVERY
// =========================================================================================

async function preparePage(page) {
    if (!page) return;
    await setupNetworkAdBlocker(page);
    attachAntiAdListeners(page);
    await applyPreloadFirewall(page);
}

async function createFreshBackupBrowser() {
    console.log('\n[🛠️] BACKUP RECOVERY: Creating fresh backup Chrome...');
    try {
        if (backupBrowser && backupBrowser.isConnected()) {
            try {
                const pages = await backupBrowser.pages();
                for (const p of pages) {
                    try { await p.close(); } catch (e) {}
                }
            } catch (e) {}
        }
    } catch (e) {}

    try {
        if (backupBrowser && !backupBrowser.isConnected()) {
            backupBrowser = null;
        }
    } catch (e) {
        backupBrowser = null;
    }

    backupBrowser = await createBrowserInstance(browserArgs);
    const pages = await backupBrowser.pages();
    backupPage = pages[0];
    await preparePage(backupPage);

    backupBrowser.on('targetcreated', async (target) => {
        if (target.type() === 'page') {
            try {
                const newPage = await target.page();
                setTimeout(async () => {
                    if (newPage && newPage !== backupPage) {
                        try { await newPage.close(); } catch (e) {}
                    }
                }, 500);
            } catch (e) {}
        }
    });

    console.log('[✅] BACKUP RECOVERY: Fresh backup Chrome created.');
    return true;
}

async function createFreshActiveBrowser() {
    console.log('\n[🛠️] ACTIVE RECOVERY: Creating fresh active Chrome...');
    try {
        if (activeBrowser && activeBrowser.isConnected()) {
            try {
                const pages = await activeBrowser.pages();
                for (const p of pages) {
                    try { await p.close(); } catch (e) {}
                }
            } catch (e) {}
        }
    } catch (e) {}

    try {
        if (activeBrowser && !activeBrowser.isConnected()) {
            activeBrowser = null;
        }
    } catch (e) {
        activeBrowser = null;
    }

    activeBrowser = await createBrowserInstance(browserArgs);
    const pages = await activeBrowser.pages();
    activePage = pages[0];
    await preparePage(activePage);

    activeBrowser.on('targetcreated', async (target) => {
        if (target.type() === 'page') {
            try {
                const newPage = await target.page();
                setTimeout(async () => {
                    if (newPage && newPage !== activePage) {
                        try { await newPage.close(); } catch (e) {}
                    }
                }, 500);
            } catch (e) {}
        }
    });

    console.log('[✅] ACTIVE RECOVERY: Fresh active Chrome created.');
    return true;
}

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
            const originalAttachShadow = Element.prototype.attachShadow;
            Element.prototype.attachShadow = function(init) {
                if (init && init.mode === 'closed') {
                    init.mode = 'open'; 
                }
                const shadowRoot = originalAttachShadow.call(this, init);
                
                const observer = new MutationObserver(() => {
                    const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"], [src*="adexchangerapid"]');
                    if (adElements.length > 0) {
                        console.log('[🛡️] SHIELD: Shadow DOM Ad Detected & Destroyed!');
                        this.remove(); 
                    }
                });
                
                observer.observe(shadowRoot, { childList: true, subtree: true });
                return shadowRoot;
            };
            
            Element.prototype.attachShadow.toString = function() { return "function attachShadow() { [native code] }"; };

            window.alert = function() {};
            window.confirm = function() { return true; };
            window.prompt = function() { return null; };
            window.open = function() { return null; };
            
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
            style.textContent = `
                html, body { background-color: #000000 !important; overflow: hidden !important; }
                in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }
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
                            .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
                            @keyframes blinker { 50% { opacity: 0.3; } }
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
                        .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
                        @keyframes blinker { 50% { opacity: 0.3; } }
                    </style>
                    <div class="stream-spinner"></div>
                    <div class="progress-container"><div class="progress-bar-fill"></div></div>
                    <div class="stream-title">${t}</div>
                    <div class="stream-sub">${s}</div>
                `;
                document.documentElement.appendChild(overlay);
            }
        }, title, sub);
    } catch (e) {}
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
    } catch (e) {}
}

async function showRecoveryUI(page) {
    try {
        await page.evaluate(() => {
            if (window.self !== window.top) return; 
            let overlay = document.getElementById('stream-recovery-overlay');
            if (overlay) {
                overlay.style.setProperty('display', 'flex', 'important');
                return;
            }
            
            overlay = document.createElement('div');
            overlay.id = 'stream-recovery-overlay';
            overlay.innerHTML = `
                <style>
                    #stream-recovery-overlay {
                        position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
                        width: 100vw !important; height: 100vh !important; background: rgba(0, 0, 0, 0.95) !important;
                        z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
                        justify-content: center !important; align-items: center !important; color: #ffffff !important;
                        font-family: Arial, sans-serif !important; pointer-events: all !important; backdrop-filter: blur(8px);
                    }
                    .recovery-radar {
                        width: 100px; height: 100px; border-radius: 50%;
                        border: 3px solid transparent; border-top-color: #ff9800; border-bottom-color: #ff9800;
                        animation: radar-spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
                        margin-bottom: 20px; box-shadow: 0 0 30px rgba(255, 152, 0, 0.3);
                    }
                    .recovery-radar::before {
                        content: ''; position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px;
                        border-radius: 50%; border: 3px solid transparent; border-left-color: #f44336; border-right-color: #f44336;
                        animation: radar-spin 2s linear infinite reverse;
                    }
                    @keyframes radar-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                    .warn-title { font-size: 32px !important; font-weight: 800 !important; color: #ff9800 !important; letter-spacing: 2px !important; margin-bottom: 10px !important; text-transform: uppercase !important; }
                    .warn-sub { font-size: 18px !important; color: #dddddd !important; animation: pulse-text 1.5s infinite; }
                    @keyframes pulse-text { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
                </style>
                <div class="recovery-radar"></div>
                <div class="warn-title">SIGNAL LOST</div>
                <div class="warn-sub">Attempting Auto-Recovery...</div>
            `;
            document.documentElement.appendChild(overlay);
        });
    } catch (e) {}
}

async function hideRecoveryUI(page) {
    try {
        await page.evaluate(() => {
            const overlay = document.getElementById('stream-recovery-overlay');
            if (overlay) {
                overlay.style.setProperty('display', 'none', 'important');
            }
        });
    } catch (e) {}
}

function setupOBSConfig() {
    const obsDir = path.join(os.homedir(), '.config', 'obs-studio');
    const profilesDir = path.join(obsDir, 'basic', 'profiles', 'Untitled');
    const scenesDir = path.join(obsDir, 'basic', 'scenes');

    fs.mkdirSync(profilesDir, { recursive: true });
    fs.mkdirSync(scenesDir, { recursive: true });

    const globalIniContent = `[General]\nLicenseAccepted=true\n[BasicWindow]\nShowAutoConfig=false\nWarned=true\n[OBSWebSocket]\nServerEnabled=true\nServerPort=4455\nServerPassword=secret\n`;
    fs.writeFileSync(path.join(obsDir, 'global.ini'), globalIniContent);
    
    const basicIniContent = `[General]\nName=Untitled\n[Video]\nBaseCX=${RES_W}\nBaseCY=${RES_H}\nOutputCX=${RES_W}\nOutputCY=${RES_H}\nFPSCommon=30\n[Output]\nMode=Simple\n[SimpleOutput]\nVBitrate=${BITRATE}\nStreamEncoder=x264\nx264Preset=ultrafast\nx264Settings=keyint=60 tune=zerolatency profile=main threads=4 rc-lookahead=0\n`;
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
                "settings": { "items": [ {"name": "Screen", "id": 1, "visible": true} ] } 
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

async function triggerSmartUnmute(page) {
    for (const frame of page.frames()) {
        try {
            if (frame.isDetached()) continue;

            await frame.evaluate(() => {
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
                            console.log(`[🔊 ENGINE]: Dynamically triggered click on element with text: "${text || 'JS Action'}"`);
                            try { el.click(); } catch(e) {}
                            try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); } catch(e) {}
                        }
                    }
                });

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

                    const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play');
                    if (playBtn) {
                        const isVisible = await frame.evaluate(el => {
                            const style = window.getComputedStyle(el);
                            return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
                        }, playBtn);

                        if (isVisible) {
                            await frame.evaluate(el => el.click(), playBtn); 
                            // await takeAndBatchScreenshot(page, `play-btn-clicked`);
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
                            // await takeAndBatchScreenshot(page, `force-play-applied`);
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
                                    } catch(e) {}
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

                    const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay):not(#stream-recovery-overlay):not([class*="player"]):not([class*="jw"]):not([class*="vjs"]), [id*="pop"], [class*="pop"], a[href*="extension"], [class*="notification"], [id*="notification"]';
                    document.querySelectorAll(junkClasses).forEach(el => { 
                        try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } 
                    });

                    const adKeywords = ['jerk', 'mate', 'free', 'online', 'adult', 'dating', 'close', 'notification', 'justine', 'paying', 'job'];
                    document.querySelectorAll('div, section, span, a').forEach(el => {
                        if (el.id === 'smart-stream-overlay' || el.id === 'stream-recovery-overlay') return;
                        
                        const style = window.getComputedStyle(el);
                        const isFloating = style.position === 'fixed' || style.position === 'absolute';
                        
                        if (isFloating && el.innerText) {
                            const textLower = el.innerText.toLowerCase();
                            const hasBadKeyword = adKeywords.some(keyword => textLower.includes(keyword));
                            
                            if (hasBadKeyword || (parseInt(style.zIndex) > 100000 && !el.querySelector('video') && !el.querySelector('iframe'))) {
                                try { el.remove(); } catch(e) { el.style.setProperty('display', 'none', 'important'); }
                            }
                        }
                    });

                } catch (err) {}
            }, 500); 
        }).catch(() => {});

        await targetFrame.evaluate((muteVideo) => {
            // FIX 1: Use window object to control audio globally to avoid Audio War
            window.isStreamMuted = muteVideo; 

            setInterval(() => {
                try {
                    const style = document.createElement('style');
                    style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
                    document.head.appendChild(style);

                    const mediaElements = document.querySelectorAll('video, audio');
                    const videos = Array.from(document.querySelectorAll('video'));
                    let realVideo = null;

                    mediaElements.forEach(media => { 
                        media.muted = window.isStreamMuted; 
                        media.volume = window.isStreamMuted ? 0.0 : 1.0; 
                    });

                    if (!window.isStreamMuted) {
                        document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
                    }

                    for (const v of videos) {
                        if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
                    }

                    if (!realVideo && videos.length > 0) {
                        realVideo = videos[0];
                    }

                    if (realVideo) { 
                        let playerWrap = realVideo.closest('.jwplayer, #player, .plyr, .vjs-player, .shaka-video-container, [data-player]') || realVideo;
                        
                        playerWrap.style.setProperty('position', 'fixed', 'important');
                        playerWrap.style.setProperty('top', '0px', 'important');
                        playerWrap.style.setProperty('left', '0px', 'important');
                        playerWrap.style.setProperty('width', '100vw', 'important');
                        playerWrap.style.setProperty('height', '100vh', 'important');
                        playerWrap.style.setProperty('z-index', '2147483646', 'important'); 
                        playerWrap.style.setProperty('background-color', 'black', 'important');
                        playerWrap.style.setProperty('opacity', '1', 'important');
                        playerWrap.style.setProperty('visibility', 'visible', 'important');
                        playerWrap.style.setProperty('display', 'block', 'important');
                        
                        if (playerWrap !== realVideo) {
                            realVideo.style.setProperty('width', '100%', 'important');
                            realVideo.style.setProperty('height', '100%', 'important');
                        }
                        realVideo.style.setProperty('object-fit', 'contain', 'important');
                    }
                } catch(err) {}
            }, 500); 
        }, startMuted).catch(() => {});

    } catch (e) { }

    if (!startMuted) {
        await triggerSmartUnmute(page);
        await new Promise(r => setTimeout(r, 1000));
    }
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
                        
                        // FIX 1: Removed 'targetV.currentTime > 0'
                        if (targetV && !targetV.ended) {
                            let frames = 0;
                            if (targetV.getVideoPlaybackQuality) {
                                frames = targetV.getVideoPlaybackQuality().totalVideoFrames;
                            } else if (targetV.webkitDecodedFrameCount !== undefined) {
                                frames = targetV.webkitDecodedFrameCount;
                            }
                            return { status: 'HEALTHY', currentTime: targetV.currentTime, decodedFrames: frames };
                        }
                        return { status: 'DEAD' };
                    }),
                    // FIX 2: Increased timeout to 4000ms
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 4000))
                ]);
                if (result && result.status !== 'DEAD') return result;
            } catch (err) {}
        }
    } catch (e) { return { status: 'DEAD' }; }
    return { status: 'DEAD' };
}

async function startWatchdog() {
    let lastActiveTime = -1;
    let lastDecodedFrames = -1; 
    let frozenCheckTimestamp = Date.now();
    let watchdogTicks = 0;
    
    let streamSetupTime = Date.now(); 
    let isWarmupPhase = true; 
    let backupWarmupTime = Date.now(); 
    const WARMUP_MAX_TIME = 15000; 

    let activeUrlStr = urlList[currentUrlIndex].url;
    let backupUrlStr = urlList[backupUrlIndex].url;

    let currentStreamStartTime = Date.now();
    let isRecoveryUIShown = false;

    while (true) {
        // =====================================================================================
        // 🛡️ NEVER THROW JUST BECAUSE ONE CHROME DISCONNECTED
        // Recover the affected side instead.
        // =====================================================================================
        const activeBrowserAlive = activeBrowser && activeBrowser.isConnected();
        const backupBrowserAlive = backupBrowser && backupBrowser.isConnected();

        // ---------------------------------------------------------------------
        // CASE 1: ACTIVE CHROME DEAD, BACKUP CHROME STILL ALIVE
        // ---------------------------------------------------------------------
        if (!activeBrowserAlive && backupBrowserAlive) {
            console.log('\n==================================================');
            console.log('[🚨] ACTIVE CHROME DISCONNECTED');
            console.log('[🔄] BACKUP CHROME IS ALIVE');
            console.log('[⚡] PROMOTING BACKUP -> ACTIVE');
            console.log('[🛡️] OBS WILL CONTINUE RUNNING');
            console.log('==================================================\n');

            const oldActiveBrowser = activeBrowser;
            const oldActivePage = activePage;
            activeBrowser = backupBrowser;
            activePage = backupPage;
            backupBrowser = oldActiveBrowser;
            backupPage = oldActivePage;

            const oldActiveName = activeBrowserName;
            activeBrowserName = backupBrowserName;
            backupBrowserName = oldActiveName;

            const previousActiveIndex = currentUrlIndex;
            currentUrlIndex = backupUrlIndex;
            activeUrlStr = urlList[currentUrlIndex].url;

            backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
            backupUrlStr = urlList[backupUrlIndex].url;

            lastActiveTime = -1; lastDecodedFrames = -1; frozenCheckTimestamp = Date.now();
            streamSetupTime = Date.now(); currentStreamStartTime = Date.now();
            isWarmupPhase = true; backupWarmupTime = Date.now(); isRecoveryUIShown = false;

            try { await activePage.bringToFront(); await hideLoadingUI(activePage); } catch (e) {}

            console.log('[✅] BACKUP PROMOTED SUCCESSFULLY');
            console.log(`[📺] NEW ACTIVE SERVER : [${currentUrlIndex}] -> ${activeUrlStr}`);
            console.log(`[🔊] ACTIVE AUDIO      : ON`);
            console.log(`[🛡️] NEW BACKUP SERVER : [${backupUrlIndex}] -> ${backupUrlStr}`);

            try {
                await createFreshBackupBrowser();
                await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
                await initializeVideo(backupPage, true, false);
                console.log('[✅] NEW BACKUP SERVER IS BUFFERING IN BACKGROUND');
            } catch (e) {
                console.log(`[⚠️] Backup recreation failed. Watchdog will try the NEXT server.`);
            }
            continue;
        }

        // ---------------------------------------------------------------------
        // CASE 2: BACKUP CHROME DEAD, ACTIVE CHROME STILL ALIVE
        // ---------------------------------------------------------------------
        if (activeBrowserAlive && !backupBrowserAlive) {
            console.log('\n==================================================');
            console.log('[⚠️] BACKUP CHROME DISCONNECTED');
            console.log('[🛡️] ACTIVE STREAM WILL NOT BE TOUCHED');
            console.log('[🔄] REBUILDING BACKUP WITH NEXT SERVER');
            console.log('==================================================\n');

            try {
                backupUrlIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
                backupUrlStr = urlList[backupUrlIndex].url;

                console.log(`[*] NEXT BACKUP SERVER -> [${backupUrlIndex}] ${backupUrlStr}`);
                await createFreshBackupBrowser();
                await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
                await initializeVideo(backupPage, true, false);
                backupWarmupTime = Date.now();
                console.log(`[✅] BACKUP RECOVERED -> Server [${backupUrlIndex}]`);
            } catch (e) {
                console.log(`[⚠️] Backup recovery failed. NEXT WATCHDOG CYCLE WILL TRY AGAIN.`);
            }
        }

        // ---------------------------------------------------------------------
        // CASE 3: BOTH CHROMES DEAD
        // ---------------------------------------------------------------------
        if (!activeBrowserAlive && !backupBrowserAlive) {
            console.log('\n==================================================');
            console.log('[🚨] BOTH CHROME INSTANCES DISCONNECTED');
            console.log('[🛠️] LOCAL RECOVERY MODE');
            console.log('[🛑] OBS WILL NOT BE RESTARTED');
            console.log('==================================================\n');

            try {
                currentUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
                activeUrlStr = urlList[currentUrlIndex].url;

                backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
                backupUrlStr = urlList[backupUrlIndex].url;

                console.log(`[*] RECOVERY ACTIVE -> [${currentUrlIndex}] ${activeUrlStr}`);
                console.log(`[*] RECOVERY BACKUP -> [${backupUrlIndex}] ${backupUrlStr}`);

                await createFreshActiveBrowser();
                await activePage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
                await showLoadingUI(activePage, "SEARCHING SERVER", "Finding a stable stream connection <span class='stream-blink'>...</span>");
                await initializeVideo(activePage, false, true);
                await hideLoadingUI(activePage);

                console.log('[✅] ACTIVE CHROME RECOVERED');

                try {
                    await createFreshBackupBrowser();
                    await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
                    await initializeVideo(backupPage, true, false);
                    console.log('[✅] BACKUP CHROME RECOVERED');
                } catch (backupError) {
                    console.log('[⚠️] Backup failed. Active stream continues.');
                }

                try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}

                streamSetupTime = Date.now(); currentStreamStartTime = Date.now(); backupWarmupTime = Date.now();
                frozenCheckTimestamp = Date.now(); lastActiveTime = -1; lastDecodedFrames = -1;
                isWarmupPhase = true; isRecoveryUIShown = false;

                console.log('[✅] LOCAL RECOVERY COMPLETE — WATCHDOG CONTINUES');
            } catch (e) {
                console.log(`[❌] Local Chrome recovery failed: ${e.message}`);
                await new Promise(r => setTimeout(r, 3000));
            }
            continue;
        }

        let activeHangThresholdMs = urlList[currentUrlIndex].hangTime;
        let activeStatus = await checkPageStatus(activePage);

        // 🔄 1. BACKGROUND SHIELD
        if (!isWarmupPhase && (Date.now() - backupWarmupTime > 30000)) { 
            let backupStatus = await checkPageStatus(backupPage);
            
            if (backupStatus.status === 'DEAD' || backupStatus.status === 'CRITICAL_ERROR' || backupStatus.status === 'FROZEN') {
                console.log(`\n[⚠️] BACKGROUND SHIELD: Backup Server [${backupUrlIndex}] failed silently.`);
                
                backupUrlIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
                backupUrlStr = urlList[backupUrlIndex].url;
                
                console.log(`[*] Shifting Backup Chrome to NEXT link -> Server [${backupUrlIndex}]`);
                backupWarmupTime = Date.now();
                
                try {
                    await backupPage.goto('about:blank').catch(()=>{});
                    await applyPreloadFirewall(backupPage);
                    await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
                    await initializeVideo(backupPage, true, false);
                } catch(e) {}
            }
        }

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

        // Active Tab Audio Watchdog Fix (Stop Audio War)
        if (activeStatus.status === 'HEALTHY') {
            await hideLoadingUI(activePage); 
            isWarmupPhase = false; 

            let isTimeStuck = (activeStatus.currentTime === lastActiveTime);
            let isFrameStuck = (activeStatus.decodedFrames === lastDecodedFrames && activeStatus.decodedFrames > 0);

            if (isTimeStuck || isFrameStuck) {
                if (!isRecoveryUIShown) {
                    await showRecoveryUI(activePage);
                    isRecoveryUIShown = true;
                    console.log(`[⚠️] Stream Hang Detected! Showing Signal Recovery Shield instantly...`);
                }

                if (Date.now() - frozenCheckTimestamp > activeHangThresholdMs) {
                    activeStatus.status = 'FROZEN';
                    if (isFrameStuck && !isTimeStuck) {
                        console.log(`[!] ⚠️ SYSTEM SHIELD: Detected Black Screen (Audio playing, but video frames stuck). Triggering HOT-SWAP.`);
                    }
                    isRecoveryUIShown = false; 
                }
            } else {
                lastActiveTime = activeStatus.currentTime; 
                lastDecodedFrames = activeStatus.decodedFrames; 
                frozenCheckTimestamp = Date.now();
                
                if (isRecoveryUIShown) {
                    await hideRecoveryUI(activePage);
                    isRecoveryUIShown = false;
                    console.log(`[✅] Stream Recovered! Signal Recovery Shield removed instantly.`);
                }
                
                // Mute override for active page (Audio fix applied)
                for (const frame of activePage.frames()) {
                    try {
                        if (!frame.isDetached()) {
                            frame.evaluate(() => { 
                                window.isStreamMuted = false;
                                document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
                                document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
                            }).catch(()=>{});
                        }
                    } catch(e) {}
                }
            }
        }

        // Backup Tab Audio Watchdog Fix
        if (backupPage) {
            for (const frame of backupPage.frames()) {
                try {
                    if (!frame.isDetached()) {
                        frame.evaluate(() => { 
                            window.isStreamMuted = true;
                            document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); 
                        }).catch(()=>{});
                    }
                } catch(e) {}
            }
        }

        watchdogTicks++;

        if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
            let logBackupStatus = await checkPageStatus(backupPage);
            let nextAfterBackupIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
            let nextAfterBackupUrl = urlList[nextAfterBackupIndex].url;
            
            console.log(`\n==================================================`);
            console.log(`[💓] ACTIVE HEARTBEAT (${activeBrowserName}): Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'} (Limit: ${activeHangThresholdMs/1000}s)`);
            console.log(`[▶️] CURRENTLY LIVE              : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
            console.log(`--------------------------------------------------`);
            console.log(`[🖤] BACKUP HEARTBEAT (${backupBrowserName}): Status is ${logBackupStatus.status} | Video Time: ${logBackupStatus.currentTime ? logBackupStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
            console.log(`[🔄] RUNNING IN BACKGROUND       : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
            console.log(`[⏭️] NEXT QUEUE (AFTER BACKUP)  : Server [${nextAfterBackupIndex}] -> ${nextAfterBackupUrl}`);
            console.log(`==================================================\n`);
        }

        

        // =========================================================================================
        // 🔄 2. ACTIVE TAB HOT-SWAP SHIELD (UPDATED: INSTANT SEAMLESS PROMOTION)
        // =========================================================================================
        if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH') {
            
            if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
                console.log(`[⏳] Watchdog detected '${activeStatus.status}', but stream is in WARM-UP phase. Waiting...`);
                await new Promise(r => setTimeout(r, 2000));
                continue; 
            }

            let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

            if (isProactiveRefresh) {
                console.log(`\n==================================================`);
                console.log(`[!] 🔄 PROACTIVE REFRESH TRIGGERED`);
                console.log(`[*] Initiating forward rotation to prevent stream drop...`);
                console.log(`==================================================`);
            } else {
                console.log(`\n==================================================`);
                console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
                console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
                console.log(`==================================================`);
                
            }
            
            console.log(`[*] Checking Backup Tab status before switching...`);
            let backupStatus = await checkPageStatus(backupPage);



// --------------------------------------------------------------------
            // ⚡ SCENARIO A: INSTANT SEAMLESS HOT-SWAP (BACKUP IS ALREADY HEALTHY)
            // --------------------------------------------------------------------
            if (backupStatus.status === 'HEALTHY' && !isProactiveRefresh) {
                
                console.log('\n==================================================');
                console.log('[⚡] BACKUP STREAM ALREADY HEALTHY');
                console.log('[⚡] SHOWING TRANSITION UI & PROMOTING INSTANTLY');
                console.log('==================================================');

                // 1. Visually ek smooth "RECONNECTING" UI lagayein
                await showLoadingUI(backupPage, "RECONNECTING", "Establishing secure connection to backup server <span class='stream-blink'>...</span>");

                // 2. Tab ko screen par layein
                try { await backupPage.bringToFront(); } catch (e) {}

                // 3. Objects swap karein (Chrome 2 ab Chrome 1 ban gaya)
                let brokenPage = activePage; 
                activePage = backupPage; 
                backupPage = brokenPage;

                let brokenBrowser = activeBrowser; 
                activeBrowser = backupBrowser; 
                backupBrowser = brokenBrowser;

                let brokenName = activeBrowserName;
                activeBrowserName = backupBrowserName;
                backupBrowserName = brokenName;

                let previousActiveIndex = currentUrlIndex;
                currentUrlIndex = backupUrlIndex;
                activeUrlStr = urlList[currentUrlIndex].url; 
                
                backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
                backupUrlStr = urlList[backupUrlIndex].url;

                // 4. 🛠️ INSTANT AUDIO FIX: Background tab mute tha, isko foran unmute karein swap hotay hi!
                for (const frame of activePage.frames()) {
                    try {
                        if (!frame.isDetached()) {
                            await frame.evaluate(() => { 
                                window.isStreamMuted = false;
                                document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
                                document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
                            });
                        }
                    } catch(e) {}
                }

                // 5. State Reset (Keep isWarmupPhase FALSE because stream is already healthy)
                lastActiveTime = -1; 
                lastDecodedFrames = -1;
                frozenCheckTimestamp = Date.now();
                isRecoveryUIShown = false; 

                streamSetupTime = Date.now(); 
                currentStreamStartTime = Date.now();
                isWarmupPhase = false; 
                
                // Extra buffer time for background checks to avoid conflicts
                backupWarmupTime = Date.now() + 5000; 

                // 6. SMOOTH UI REMOVAL: Wait 1.5s for render paint to stabilize
                await new Promise(r => setTimeout(r, 1500));
                try { await hideLoadingUI(activePage); } catch(e) {}

                console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
                console.log(`[🔊] LIVE AUDIO STATUS : ON (Seamlessly Promoted & Unmuted)`);
                console.log(`--------------------------------------------------`);
                console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
                console.log(`==================================================\n`);

                // 7. 🛠️ CPU BOTTLENECK FIX: Heavy background rebuilding ko 3 seconds delay karein
                // Taa k watchdog ka immediate next active check timeout na ho aur "DEAD" issue na aye.
                setTimeout(async () => {
                    try {
                        console.log(`[⏳] Starting background buffer rebuilding safely...`);
                        await backupPage.goto('about:blank').catch(()=>{});
                        await applyPreloadFirewall(backupPage);
                        await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
                        await initializeVideo(backupPage, true, false);
                    } catch (e) {
                        console.log(`[⚠️] Background buffer navigation handled safely.`);
                    }
                }, 3000); 
            }







            // --------------------------------------------------------------------
            // 🔄 SCENARIO B: PROACTIVE REFRESH OR FORCED RECONNECTION
            // --------------------------------------------------------------------
            else if (isProactiveRefresh || (backupStatus.status === 'HEALTHY' && isProactiveRefresh)) {
                
                for (const frame of activePage.frames()) {
                    try { if (!frame.isDetached()) await frame.evaluate(() => { window.isStreamMuted = true; document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
                }
                
                await showLoadingUI(backupPage, "REFRESHING CONNECTION", "Optimizing current server stream <span class='stream-blink'>...</span>");
                await backupPage.bringToFront();
                await new Promise(r => setTimeout(r, 1000)); 
                
                try { await backupPage.mouse.click(10, 10); } catch(e){} 

                console.log(`[*] Initializing Video on the newly active tab...`);
                await initializeVideo(backupPage, false, true); 
                await hideLoadingUI(backupPage);

                let brokenPage = activePage; 
                activePage = backupPage; 
                backupPage = brokenPage;

                let brokenBrowser = activeBrowser; 
                activeBrowser = backupBrowser; 
                backupBrowser = brokenBrowser;

                let brokenName = activeBrowserName;
                activeBrowserName = backupBrowserName;
                backupBrowserName = brokenName;
                
                lastActiveTime = -1; frozenCheckTimestamp = Date.now();
                isRecoveryUIShown = false; 

                let previousActiveIndex = currentUrlIndex;
                currentUrlIndex = backupUrlIndex;
                activeUrlStr = urlList[currentUrlIndex].url; 
                
                backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
                backupUrlStr = urlList[backupUrlIndex].url;

                console.log(`\n==================================================`);
                console.log(`[🔄] PROACTIVE REFRESH EXECUTED SUCCESSFULLY`);
                console.log(`==================================================`);

                try {
                    await backupPage.goto('about:blank').catch(()=>{});
                    await applyPreloadFirewall(backupPage);
                    await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
                    await initializeVideo(backupPage, true, false);
                } catch (e) {}
                
                streamSetupTime = Date.now(); 
                isWarmupPhase = true;
                currentStreamStartTime = Date.now();
                // 🚀 FIX: Lock background watchdog for Proactive Refresh too!
                backupWarmupTime = Date.now(); 
            }



            // --------------------------------------------------------------------
            // ❌ SCENARIO C: BOTH TABS FAILED (Fresh Hunting Mode)
            // --------------------------------------------------------------------
            else {
                console.log(`\n==================================================`);
                console.log(`[!] ❌ BOTH TABS FAILED (Active & Backup Compromised)`);
                console.log(`[🔍] FRESH HUNTING MODE ACTIVATED: Spawning clean tabs...`);
                console.log(`==================================================`);
                
                try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch (e) {}

                currentUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
                activeUrlStr = urlList[currentUrlIndex].url;
                
                backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
                backupUrlStr = urlList[backupUrlIndex].url;

                console.log(`[*] Hunting Active -> Server [${currentUrlIndex}]`);
                console.log(`[*] Hunting Backup -> Server [${backupUrlIndex}]`);

                console.log(`[*] Closing crashed tabs and spawning fresh ones...`);
                try { await activePage.close(); } catch(e) {}
                try { await backupPage.close(); } catch(e) {}

                activePage = await activeBrowser.newPage();
                backupPage = await backupBrowser.newPage();

                await setupNetworkAdBlocker(activePage);
                await setupNetworkAdBlocker(backupPage);
                attachAntiAdListeners(activePage);
                attachAntiAdListeners(backupPage);
                await applyPreloadFirewall(activePage);
                await applyPreloadFirewall(backupPage);

                try {
                    await activePage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 });
                    await showLoadingUI(activePage, "SEARCHING SERVER", "Hunting for a stable stream connection <span class='stream-blink'>...</span>");
                    await initializeVideo(activePage, false, true); 
                    await hideLoadingUI(activePage);
                } catch(e) {}

                try {
                    await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{});
                    await initializeVideo(backupPage, true, false); 
                } catch(e) {}

                streamSetupTime = Date.now(); 
                isWarmupPhase = true; 
                currentStreamStartTime = Date.now();
                backupWarmupTime = Date.now();
                lastActiveTime = -1;
                frozenCheckTimestamp = Date.now();
                isRecoveryUIShown = false;

                try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
                
                console.log(`[*] Fresh tabs active. Waiting 15 seconds (Warm-up) for video to stabilize...`);
            }
        } 
       
        await new Promise(r => setTimeout(r, 2000)); 
    }
}

async function startDirectStreaming() {
    activeBrowserName = "CHROME 1";
    backupBrowserName = "CHROME 2";
    
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
        } catch(e){}
    }

    browserArgs = [
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
        '--disable-blink-features=AutomationControlled',
        '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion,NetworkServiceInProcess2',
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

    console.log(`[*] Starting ACTIVE browser instance...`);
    activeBrowser = await createBrowserInstance(browserArgs);
    const activePages = await activeBrowser.pages();
    activePage = activePages[0];

    console.log(`[*] Starting BACKUP browser instance in background...`);
    backupBrowser = await createBrowserInstance(browserArgs);
    const backupPages = await backupBrowser.pages();
    backupPage = backupPages[0];

    activeBrowser.on('targetcreated', async (target) => {
        if (target.type() === 'page') {
            const newPage = await target.page();
            setTimeout(async () => { if (newPage && newPage !== activePage) { try { await newPage.close(); } catch(e) {} } }, 500);
        }
    });

    backupBrowser.on('targetcreated', async (target) => {
        if (target.type() === 'page') {
            const newPage = await target.page();
            setTimeout(async () => { if (newPage && newPage !== backupPage) { try { await newPage.close(); } catch(e) {} } }, 500);
        }
    });

    await setupNetworkAdBlocker(activePage);
    await setupNetworkAdBlocker(backupPage);

    attachAntiAdListeners(activePage);
    attachAntiAdListeners(backupPage);

    await applyPreloadFirewall(activePage);
    await applyPreloadFirewall(backupPage);

    await activePage.bringToFront(); 

    console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex].url}`);
    try {
        await activePage.goto(urlList[currentUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    } catch (e) {
        console.log(`[⚠️] Network buffer safely handled for primary URL.`);
    }
    
    await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
    await initializeVideo(activePage, false, true); 
    await hideLoadingUI(activePage); 

    if (isObsConnected) {
        console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
        try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
    }

    console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex].url}`);
    try {
        await backupPage.goto(urlList[backupUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    } catch (e) {}
    
    await initializeVideo(backupPage, true, false);
    
    await activePage.bringToFront();
    try { await activePage.mouse.click(10, 10); } catch(e){} 
    await hideLoadingUI(activePage);

    console.log(`\n==================================================`);
    console.log(`[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
    console.log(`==================================================`);
    console.log(`[📺] CURRENT ACTIVE LIVE : Server [${currentUrlIndex}] -> ${urlList[currentUrlIndex].url}`);
    console.log(`[🔊] LIVE AUDIO STATUS   : ON (Unmuted)`);
    console.log(`--------------------------------------------------`);
    console.log(`[🛡️] NEXT BACKUP QUEUE   : Server [${backupUrlIndex}] -> ${urlList[backupUrlIndex].url}`);
    console.log(`[🔇] BACKUP AUDIO STATUS : MUTED (Background)`);
    console.log(`==================================================\n`);

    console.log('[*] Everything Setup! Dual-Tab Monitoring is Active.');
    await startWatchdog();
}

async function mainLoop() {
    while (true) {
        try {
            await startDirectStreaming();
        } catch (error) {
            console.error('\n==================================================');
            console.error('[🚨] FATAL ENGINE ERROR');
            console.error(`[!] ${error.message}`);
            console.error('==================================================');

            if (activeBrowser && activeBrowser.isConnected()) {
                console.log('[🛡️] ACTIVE CHROME STILL ALIVE — NOT RESTARTING ENGINE.');
                await new Promise(resolve => setTimeout(resolve, 3000));
                continue;
            }

            if (backupBrowser && backupBrowser.isConnected()) {
                console.log('[🛡️] BACKUP CHROME STILL ALIVE — NOT RESTARTING ENGINE.');
                await new Promise(resolve => setTimeout(resolve, 3000));
                continue;
            }

            console.log('[⚠️] NO CHROME INSTANCE SURVIVED. Performing final recovery.');

            try { if (activeBrowser) await activeBrowser.close().catch(() => {}); } catch (e) {}
            try { if (backupBrowser) await backupBrowser.close().catch(() => {}); } catch (e) {}

            activeBrowser = null; backupBrowser = null; activePage = null; backupPage = null;

            await new Promise(resolve => setTimeout(resolve, 3000));
            await cleanup();
        }
    }
}

async function cleanup() {
    console.log('[*] Cleaning up resources...');
    try { await obs.disconnect(); } catch (e) { } 
    if (activeBrowser) { try { await activeBrowser.close(); } catch(e) { } activeBrowser = null; }
    if (backupBrowser) { try { await backupBrowser.close(); } catch(e) { } backupBrowser = null; }
    
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
            const targetUrls = process.env.TARGET_URLS || 'https://sport4u.online';
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





// =====================================
// ====================
// ==========



































































































































// const puppeteer = require('puppeteer-extra');
// let isWarmupPhase = true;
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD (DEBUGGING MODE)
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     console.error('\n========================================');
//     console.error('[💥] UNCAUGHT EXCEPTION');
//     console.error(err);
//     console.error(err.stack);
//     console.error('========================================\n');
// });

// process.on('unhandledRejection', (reason) => {
//     console.error('\n========================================');
//     console.error('[💥] UNHANDLED REJECTION');
//     console.error(reason);
//     console.error('========================================\n');
// });

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME (IN MINUTES)
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 40000; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// // =========================================================================================
// // 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// // =========================================================================================
// const NO_REFRESH_DOMAINS = [
//     'youtube.com',
//     'facebook.com',
//     'streamed.pk',
//     'cricstreams.', 
//     'sport4u.online',
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

// // =========================================================================================
// // 🔄 DYNAMIC URL PARSER & METADATA EXTRACTOR
// // =========================================================================================
// let rawUrls = (process.env.TARGET_URLS || '').trim();
// let urlList = [];

// if (rawUrls !== '') {
//     urlList = rawUrls.split(',').map(u => {
//         let trimmed = u.trim();
//         let hangThreshold = 8000; 
        
//         if (trimmed.startsWith('!')) {
//             hangThreshold = 20000; 
//             trimmed = trimmed.substring(1); 
//         }
//         if (!trimmed.startsWith('http')) trimmed = 'https://' + trimmed;
        
//         return { url: trimmed, hangTime: hangThreshold };
//     });
// } else {
//     urlList = [
//         { url: 'https://sport4u.online', hangTime: 8000 },
//         { url: 'https://dadocric.st/player.php?id=starsp3&v=m', hangTime: 8000 }
//     ];
// }

// function getSafeBackupIndex(activeIndex, currentIndex, list) {
//     if (list.length <= 1) return 0; 
//     let next = (currentIndex + 1) % list.length;
//     if (next === activeIndex) {
//         next = (next + 1) % list.length; 
//     }
//     return next;
// }

// let currentUrlIndex = 0;
// let backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);

// const SELECTED_CHANNEL = process.env.OKRU_STREAM_ID || '1';
// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None'; 
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

// const ACTIVE_STREAM_KEY = STREAM_KEYS[SELECTED_CHANNEL] || STREAM_KEYS['1'];

// let browserArgs = []; // Global Browser Args for Recovery Functions
// let activeBrowser = null;
// let backupBrowser = null;
// let activeBrowserName = "CHROME 1";
// let backupBrowserName = "CHROME 2";
// let obsProcess = null;
// let activePage = null;
// let backupPage = null;


// async function createBrowserInstance(args) {
//     return await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: args
//     });
// }

// // =========================================================================================
// // 🛡️ SMART BROWSER RECOVERY
// // =========================================================================================

// async function preparePage(page) {
//     if (!page) return;
//     await setupNetworkAdBlocker(page);
//     attachAntiAdListeners(page);
//     await applyPreloadFirewall(page);
// }

// async function createFreshBackupBrowser() {
//     console.log('\n[🛠️] BACKUP RECOVERY: Creating fresh backup Chrome...');
//     try {
//         if (backupBrowser && backupBrowser.isConnected()) {
//             try {
//                 const pages = await backupBrowser.pages();
//                 for (const p of pages) {
//                     try { await p.close(); } catch (e) {}
//                 }
//             } catch (e) {}
//         }
//     } catch (e) {}

//     try {
//         if (backupBrowser && !backupBrowser.isConnected()) {
//             backupBrowser = null;
//         }
//     } catch (e) {
//         backupBrowser = null;
//     }

//     backupBrowser = await createBrowserInstance(browserArgs);
//     const pages = await backupBrowser.pages();
//     backupPage = pages[0];
//     await preparePage(backupPage);

//     backupBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             try {
//                 const newPage = await target.page();
//                 setTimeout(async () => {
//                     if (newPage && newPage !== backupPage) {
//                         try { await newPage.close(); } catch (e) {}
//                     }
//                 }, 500);
//             } catch (e) {}
//         }
//     });

//     console.log('[✅] BACKUP RECOVERY: Fresh backup Chrome created.');
//     return true;
// }

// async function createFreshActiveBrowser() {
//     console.log('\n[🛠️] ACTIVE RECOVERY: Creating fresh active Chrome...');
//     try {
//         if (activeBrowser && activeBrowser.isConnected()) {
//             try {
//                 const pages = await activeBrowser.pages();
//                 for (const p of pages) {
//                     try { await p.close(); } catch (e) {}
//                 }
//             } catch (e) {}
//         }
//     } catch (e) {}

//     try {
//         if (activeBrowser && !activeBrowser.isConnected()) {
//             activeBrowser = null;
//         }
//     } catch (e) {
//         activeBrowser = null;
//     }

//     activeBrowser = await createBrowserInstance(browserArgs);
//     const pages = await activeBrowser.pages();
//     activePage = pages[0];
//     await preparePage(activePage);

//     activeBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             try {
//                 const newPage = await target.page();
//                 setTimeout(async () => {
//                     if (newPage && newPage !== activePage) {
//                         try { await newPage.close(); } catch (e) {}
//                     }
//                 }, 500);
//             } catch (e) {}
//         }
//     });

//     console.log('[✅] ACTIVE RECOVERY: Fresh active Chrome created.');
//     return true;
// }

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
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') {
//                     init.mode = 'open'; 
//                 }
//                 const shadowRoot = originalAttachShadow.call(this, init);
                
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) {
//                         console.log('[🛡️] SHIELD: Shadow DOM Ad Detected & Destroyed!');
//                         this.remove(); 
//                     }
//                 });
                
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };
            
//             Element.prototype.attachShadow.toString = function() { return "function attachShadow() { [native code] }"; };

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
//                 in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }
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
//                             .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
//                             @keyframes blinker { 50% { opacity: 0.3; } }
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

// async function showRecoveryUI(page) {
//     try {
//         await page.evaluate(() => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('stream-recovery-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 return;
//             }
            
//             overlay = document.createElement('div');
//             overlay.id = 'stream-recovery-overlay';
//             overlay.innerHTML = `
//                 <style>
//                     #stream-recovery-overlay {
//                         position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                         width: 100vw !important; height: 100vh !important; background: rgba(0, 0, 0, 0.95) !important;
//                         z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                         justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                         font-family: Arial, sans-serif !important; pointer-events: all !important; backdrop-filter: blur(8px);
//                     }
//                     .recovery-radar {
//                         width: 100px; height: 100px; border-radius: 50%;
//                         border: 3px solid transparent; border-top-color: #ff9800; border-bottom-color: #ff9800;
//                         animation: radar-spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
//                         margin-bottom: 20px; box-shadow: 0 0 30px rgba(255, 152, 0, 0.3);
//                     }
//                     .recovery-radar::before {
//                         content: ''; position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px;
//                         border-radius: 50%; border: 3px solid transparent; border-left-color: #f44336; border-right-color: #f44336;
//                         animation: radar-spin 2s linear infinite reverse;
//                     }
//                     @keyframes radar-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                     .warn-title { font-size: 32px !important; font-weight: 800 !important; color: #ff9800 !important; letter-spacing: 2px !important; margin-bottom: 10px !important; text-transform: uppercase !important; }
//                     .warn-sub { font-size: 18px !important; color: #dddddd !important; animation: pulse-text 1.5s infinite; }
//                     @keyframes pulse-text { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
//                 </style>
//                 <div class="recovery-radar"></div>
//                 <div class="warn-title">SIGNAL LOST</div>
//                 <div class="warn-sub">Attempting Auto-Recovery...</div>
//             `;
//             document.documentElement.appendChild(overlay);
//         });
//     } catch (e) {}
// }

// async function hideRecoveryUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('stream-recovery-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'none', 'important');
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
    
//     const basicIniContent = `[General]\nName=Untitled\n[Video]\nBaseCX=${RES_W}\nBaseCY=${RES_H}\nOutputCX=${RES_W}\nOutputCY=${RES_H}\nFPSCommon=30\n[Output]\nMode=Simple\n[SimpleOutput]\nVBitrate=${BITRATE}\nStreamEncoder=x264\nx264Preset=ultrafast\nx264Settings=keyint=60 tune=zerolatency profile=main threads=4 rc-lookahead=0\n`;
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
//                             // await takeAndBatchScreenshot(page, `play-btn-clicked`);
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
//                             // await takeAndBatchScreenshot(page, `force-play-applied`);
//                             isVideoPlaying = true;
//                             break;
//                         }
//                     }
//                 } catch (err) {}
//             }
//             if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
//             attempts++;
//         }

//        console.log('[*] Scanning for Exact Real Video Player (Duration + Geometry Logic)...');
//         let targetFrame = null;
//         for (const frame of page.frames()) {
//             try {
//                 const frameStatus = await frame.evaluate(() => {
//                     const videos = Array.from(document.querySelectorAll('video'));
//                     let bestVideo = null;
//                     let maxScore = -1;

//                     for (const v of videos) {
//                         // 1. Size aur Shape Check: Choti videos aur mobile (vertical) ads ko ignore karein
//                         if (v.clientWidth < 100 || v.clientHeight < 100) continue;
//                         if (v.clientHeight > v.clientWidth) continue; 

//                         let score = v.clientWidth * v.clientHeight;
//                         const duration = v.duration;

//                         // 2. Duration Check: Live stream aur ads ke darmian farq
//                         if (duration === Infinity || isNaN(duration)) {
//                             score += 100000000; // Live Stream: Highest Priority
//                         } else if (duration > 3600) {
//                             score += 50000000;  // Long VOD (> 1 hour): High Priority
//                         } else if (duration > 0 && duration < 120) {
//                             score = -1;         // Short video (< 2 mins): 100% Ad (Penalty)
//                         }

//                         // Best video ko update karein agar iska score zyada hai
//                         if (score > maxScore) {
//                             maxScore = score;
//                             bestVideo = v;
//                         }
//                     }
                    
//                     return bestVideo !== null;
//                 });

//                 if (frameStatus) { 
//                     targetFrame = frame; 
//                     console.log(`[+] Smart Scanner locked onto the CORRECT video frame! (Ad bypassed)`);
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

//                     const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay):not(#stream-recovery-overlay):not([class*="player"]):not([class*="jw"]):not([class*="vjs"]), [id*="pop"], [class*="pop"], a[href*="extension"], [class*="notification"], [id*="notification"]';
//                     document.querySelectorAll(junkClasses).forEach(el => { 
//                         try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } 
//                     });

//                     const adKeywords = ['jerk', 'mate', 'free', 'online', 'adult', 'dating', 'close', 'notification', 'justine', 'paying', 'job'];
//                     document.querySelectorAll('div, section, span, a').forEach(el => {
//                         if (el.id === 'smart-stream-overlay' || el.id === 'stream-recovery-overlay') return;
                        
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
//             // FIX 1: Use window object to control audio globally to avoid Audio War
//             window.isStreamMuted = muteVideo; 

//             setInterval(() => {
//                 try {
//                     const style = document.createElement('style');
//                     style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                     document.head.appendChild(style);

//                     const mediaElements = document.querySelectorAll('video, audio');
//                     const videos = Array.from(document.querySelectorAll('video'));
//                     let realVideo = null;

//                     mediaElements.forEach(media => { 
//                         media.muted = window.isStreamMuted; 
//                         media.volume = window.isStreamMuted ? 0.0 : 1.0; 
//                     });

//                     if (!window.isStreamMuted) {
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (!realVideo && videos.length > 0) {
//                         realVideo = videos[0];
//                     }

//                     if (realVideo) { 
//                         let playerWrap = realVideo.closest('.jwplayer, #player, .plyr, .vjs-player, .shaka-video-container, [data-player]') || realVideo;
                        
//                         playerWrap.style.setProperty('position', 'fixed', 'important');
//                         playerWrap.style.setProperty('top', '0px', 'important');
//                         playerWrap.style.setProperty('left', '0px', 'important');
//                         playerWrap.style.setProperty('width', '100vw', 'important');
//                         playerWrap.style.setProperty('height', '100vh', 'important');
//                         playerWrap.style.setProperty('z-index', '2147483646', 'important'); 
//                         playerWrap.style.setProperty('background-color', 'black', 'important');
//                         playerWrap.style.setProperty('opacity', '1', 'important');
//                         playerWrap.style.setProperty('visibility', 'visible', 'important');
//                         playerWrap.style.setProperty('display', 'block', 'important');
                        
//                         if (playerWrap !== realVideo) {
//                             realVideo.style.setProperty('width', '100%', 'important');
//                             realVideo.style.setProperty('height', '100%', 'important');
//                         }
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                     }
//                 } catch(err) {}
//             }, 500); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     if (!startMuted) {
//         await triggerSmartUnmute(page);
//         await new Promise(r => setTimeout(r, 1000));
//     }
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
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     let backupWarmupTime = Date.now(); 
//     const WARMUP_MAX_TIME = 15000; 

//     let activeUrlStr = urlList[currentUrlIndex].url;
//     let backupUrlStr = urlList[backupUrlIndex].url;

//     let currentStreamStartTime = Date.now();
//     let isRecoveryUIShown = false;

//     while (true) {
//         // =====================================================================================
//         // 🛡️ NEVER THROW JUST BECAUSE ONE CHROME DISCONNECTED
//         // Recover the affected side instead.
//         // =====================================================================================
//         const activeBrowserAlive = activeBrowser && activeBrowser.isConnected();
//         const backupBrowserAlive = backupBrowser && backupBrowser.isConnected();

//         // ---------------------------------------------------------------------
//         // CASE 1: ACTIVE CHROME DEAD, BACKUP CHROME STILL ALIVE
//         // ---------------------------------------------------------------------
//         if (!activeBrowserAlive && backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[🚨] ACTIVE CHROME DISCONNECTED');
//             console.log('[🔄] BACKUP CHROME IS ALIVE');
//             console.log('[⚡] PROMOTING BACKUP -> ACTIVE');
//             console.log('[🛡️] OBS WILL CONTINUE RUNNING');
//             console.log('==================================================\n');

//             const oldActiveBrowser = activeBrowser;
//             const oldActivePage = activePage;
//             activeBrowser = backupBrowser;
//             activePage = backupPage;
//             backupBrowser = oldActiveBrowser;
//             backupPage = oldActivePage;

//             const oldActiveName = activeBrowserName;
//             activeBrowserName = backupBrowserName;
//             backupBrowserName = oldActiveName;

//             const previousActiveIndex = currentUrlIndex;
//             currentUrlIndex = backupUrlIndex;
//             activeUrlStr = urlList[currentUrlIndex].url;

//             backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//             backupUrlStr = urlList[backupUrlIndex].url;

//             lastActiveTime = -1; lastDecodedFrames = -1; frozenCheckTimestamp = Date.now();
//             streamSetupTime = Date.now(); currentStreamStartTime = Date.now();
//             isWarmupPhase = true; backupWarmupTime = Date.now(); isRecoveryUIShown = false;

//             try { await activePage.bringToFront(); await hideLoadingUI(activePage); } catch (e) {}

//             console.log('[✅] BACKUP PROMOTED SUCCESSFULLY');
//             console.log(`[📺] NEW ACTIVE SERVER : [${currentUrlIndex}] -> ${activeUrlStr}`);
//             console.log(`[🔊] ACTIVE AUDIO      : ON`);
//             console.log(`[🛡️] NEW BACKUP SERVER : [${backupUrlIndex}] -> ${backupUrlStr}`);

//             try {
//                 await createFreshBackupBrowser();
//                 await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await initializeVideo(backupPage, true, false);
//                 console.log('[✅] NEW BACKUP SERVER IS BUFFERING IN BACKGROUND');
//             } catch (e) {
//                 console.log(`[⚠️] Backup recreation failed. Watchdog will try the NEXT server.`);
//             }
//             continue;
//         }

//         // ---------------------------------------------------------------------
//         // CASE 2: BACKUP CHROME DEAD, ACTIVE CHROME STILL ALIVE
//         // ---------------------------------------------------------------------
//         if (activeBrowserAlive && !backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[⚠️] BACKUP CHROME DISCONNECTED');
//             console.log('[🛡️] ACTIVE STREAM WILL NOT BE TOUCHED');
//             console.log('[🔄] REBUILDING BACKUP WITH NEXT SERVER');
//             console.log('==================================================\n');

//             try {
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] NEXT BACKUP SERVER -> [${backupUrlIndex}] ${backupUrlStr}`);
//                 await createFreshBackupBrowser();
//                 await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await initializeVideo(backupPage, true, false);
//                 backupWarmupTime = Date.now();
//                 console.log(`[✅] BACKUP RECOVERED -> Server [${backupUrlIndex}]`);
//             } catch (e) {
//                 console.log(`[⚠️] Backup recovery failed. NEXT WATCHDOG CYCLE WILL TRY AGAIN.`);
//             }
//         }

//         // ---------------------------------------------------------------------
//         // CASE 3: BOTH CHROMES DEAD
//         // ---------------------------------------------------------------------
//         if (!activeBrowserAlive && !backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[🚨] BOTH CHROME INSTANCES DISCONNECTED');
//             console.log('[🛠️] LOCAL RECOVERY MODE');
//             console.log('[🛑] OBS WILL NOT BE RESTARTED');
//             console.log('==================================================\n');

//             try {
//                 currentUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 activeUrlStr = urlList[currentUrlIndex].url;

//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] RECOVERY ACTIVE -> [${currentUrlIndex}] ${activeUrlStr}`);
//                 console.log(`[*] RECOVERY BACKUP -> [${backupUrlIndex}] ${backupUrlStr}`);

//                 await createFreshActiveBrowser();
//                 await activePage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await showLoadingUI(activePage, "SEARCHING SERVER", "Finding a stable stream connection <span class='stream-blink'>...</span>");
//                 await initializeVideo(activePage, false, true);
//                 await hideLoadingUI(activePage);

//                 console.log('[✅] ACTIVE CHROME RECOVERED');

//                 try {
//                     await createFreshBackupBrowser();
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                     console.log('[✅] BACKUP CHROME RECOVERED');
//                 } catch (backupError) {
//                     console.log('[⚠️] Backup failed. Active stream continues.');
//                 }

//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}

//                 streamSetupTime = Date.now(); currentStreamStartTime = Date.now(); backupWarmupTime = Date.now();
//                 frozenCheckTimestamp = Date.now(); lastActiveTime = -1; lastDecodedFrames = -1;
//                 isWarmupPhase = true; isRecoveryUIShown = false;

//                 console.log('[✅] LOCAL RECOVERY COMPLETE — WATCHDOG CONTINUES');
//             } catch (e) {
//                 console.log(`[❌] Local Chrome recovery failed: ${e.message}`);
//                 await new Promise(r => setTimeout(r, 3000));
//             }
//             continue;
//         }

//         let activeHangThresholdMs = urlList[currentUrlIndex].hangTime;
//         let activeStatus = await checkPageStatus(activePage);

//         // 🔄 1. BACKGROUND SHIELD
//         if (!isWarmupPhase && (Date.now() - backupWarmupTime > 30000)) { 
//             let backupStatus = await checkPageStatus(backupPage);
            
//             if (backupStatus.status === 'DEAD' || backupStatus.status === 'CRITICAL_ERROR' || backupStatus.status === 'FROZEN') {
//                 console.log(`\n[⚠️] BACKGROUND SHIELD: Backup Server [${backupUrlIndex}] failed silently.`);
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;
                
//                 console.log(`[*] Shifting Backup Chrome to NEXT link -> Server [${backupUrlIndex}]`);
//                 backupWarmupTime = Date.now();
                
//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                 } catch(e) {}
//             }
//         }

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

//         // Active Tab Audio Watchdog Fix (Stop Audio War)
//         if (activeStatus.status === 'HEALTHY') {
//             await hideLoadingUI(activePage); 
//             isWarmupPhase = false; 

//             let isTimeStuck = (activeStatus.currentTime === lastActiveTime);
//             let isFrameStuck = (activeStatus.decodedFrames === lastDecodedFrames && activeStatus.decodedFrames > 0);

//             if (isTimeStuck || isFrameStuck) {
//                 if (!isRecoveryUIShown) {
//                     await showRecoveryUI(activePage);
//                     isRecoveryUIShown = true;
//                     console.log(`[⚠️] Stream Hang Detected! Showing Signal Recovery Shield instantly...`);
//                 }

//                 if (Date.now() - frozenCheckTimestamp > activeHangThresholdMs) {
//                     activeStatus.status = 'FROZEN';
//                     if (isFrameStuck && !isTimeStuck) {
//                         console.log(`[!] ⚠️ SYSTEM SHIELD: Detected Black Screen (Audio playing, but video frames stuck). Triggering HOT-SWAP.`);
//                     }
//                     isRecoveryUIShown = false; 
//                 }
//             } else {
//                 lastActiveTime = activeStatus.currentTime; 
//                 lastDecodedFrames = activeStatus.decodedFrames; 
//                 frozenCheckTimestamp = Date.now();
                
//                 if (isRecoveryUIShown) {
//                     await hideRecoveryUI(activePage);
//                     isRecoveryUIShown = false;
//                     console.log(`[✅] Stream Recovered! Signal Recovery Shield removed instantly.`);
//                 }
                
//                 // Mute override for active page (Audio fix applied)
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             frame.evaluate(() => { 
//                                 window.isStreamMuted = false;
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                                 document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                             }).catch(()=>{});
//                         }
//                     } catch(e) {}
//                 }
//             }
//         }

//         // Backup Tab Audio Watchdog Fix
//         if (backupPage) {
//             for (const frame of backupPage.frames()) {
//                 try {
//                     if (!frame.isDetached()) {
//                         frame.evaluate(() => { 
//                             window.isStreamMuted = true;
//                             document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); 
//                         }).catch(()=>{});
//                     }
//                 } catch(e) {}
//             }
//         }

//         watchdogTicks++;

//         if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
//             let logBackupStatus = await checkPageStatus(backupPage);
//             let nextAfterBackupIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//             let nextAfterBackupUrl = urlList[nextAfterBackupIndex].url;
            
//             console.log(`\n==================================================`);
//             console.log(`[💓] ACTIVE HEARTBEAT (${activeBrowserName}): Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'} (Limit: ${activeHangThresholdMs/1000}s)`);
//             console.log(`[▶️] CURRENTLY LIVE              : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//             console.log(`--------------------------------------------------`);
//             console.log(`[🖤] BACKUP HEARTBEAT (${backupBrowserName}): Status is ${logBackupStatus.status} | Video Time: ${logBackupStatus.currentTime ? logBackupStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//             console.log(`[🔄] RUNNING IN BACKGROUND       : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//             console.log(`[⏭️] NEXT QUEUE (AFTER BACKUP)  : Server [${nextAfterBackupIndex}] -> ${nextAfterBackupUrl}`);
//             console.log(`==================================================\n`);
//         }

        

//         // =========================================================================================
//         // 🔄 2. ACTIVE TAB HOT-SWAP SHIELD (UPDATED: INSTANT SEAMLESS PROMOTION)
//         // =========================================================================================
//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH') {
            
//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 console.log(`[⏳] Watchdog detected '${activeStatus.status}', but stream is in WARM-UP phase. Waiting...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             }

//             let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

//             if (isProactiveRefresh) {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] 🔄 PROACTIVE REFRESH TRIGGERED`);
//                 console.log(`[*] Initiating forward rotation to prevent stream drop...`);
//                 console.log(`==================================================`);
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
//                 console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`==================================================`);
                
//             }
            
//             console.log(`[*] Checking Backup Tab status before switching...`);
//             let backupStatus = await checkPageStatus(backupPage);



// // --------------------------------------------------------------------
//             // ⚡ SCENARIO A: INSTANT SEAMLESS HOT-SWAP (BACKUP IS ALREADY HEALTHY)
//             // --------------------------------------------------------------------
//             if (backupStatus.status === 'HEALTHY' && !isProactiveRefresh) {
                
//                 console.log('\n==================================================');
//                 console.log('[⚡] BACKUP STREAM ALREADY HEALTHY');
//                 console.log('[⚡] SHOWING TRANSITION UI & PROMOTING INSTANTLY');
//                 console.log('==================================================');

//                 // 1. Visually ek smooth "RECONNECTING" UI lagayein
//                 await showLoadingUI(backupPage, "RECONNECTING", "Establishing secure connection to backup server <span class='stream-blink'>...</span>");

//                 // 2. Tab ko screen par layein
//                 try { await backupPage.bringToFront(); } catch (e) {}

//                 // 3. Objects swap karein (Chrome 2 ab Chrome 1 ban gaya)
//                 let brokenPage = activePage; 
//                 activePage = backupPage; 
//                 backupPage = brokenPage;

//                 let brokenBrowser = activeBrowser; 
//                 activeBrowser = backupBrowser; 
//                 backupBrowser = brokenBrowser;

//                 let brokenName = activeBrowserName;
//                 activeBrowserName = backupBrowserName;
//                 backupBrowserName = brokenName;

//                 let previousActiveIndex = currentUrlIndex;
//                 currentUrlIndex = backupUrlIndex;
//                 activeUrlStr = urlList[currentUrlIndex].url; 
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 // 4. 🛠️ INSTANT AUDIO FIX: Background tab mute tha, isko foran unmute karein swap hotay hi!
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             await frame.evaluate(() => { 
//                                 window.isStreamMuted = false;
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                                 document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                             });
//                         }
//                     } catch(e) {}
//                 }

//                 // 5. State Reset (Keep isWarmupPhase FALSE because stream is already healthy)
//                 lastActiveTime = -1; 
//                 lastDecodedFrames = -1;
//                 frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false; 

//                 streamSetupTime = Date.now(); 
//                 currentStreamStartTime = Date.now();
//                 isWarmupPhase = false; 
                
//                 // Extra buffer time for background checks to avoid conflicts
//                 backupWarmupTime = Date.now() + 5000; 

//                 // 6. SMOOTH UI REMOVAL: Wait 1.5s for render paint to stabilize
//                 await new Promise(r => setTimeout(r, 1500));
//                 try { await hideLoadingUI(activePage); } catch(e) {}

//                 console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`[🔊] LIVE AUDIO STATUS : ON (Seamlessly Promoted & Unmuted)`);
//                 console.log(`--------------------------------------------------`);
//                 console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//                 console.log(`==================================================\n`);

//                 // 7. 🛠️ CPU BOTTLENECK FIX: Heavy background rebuilding ko 3 seconds delay karein
//                 // Taa k watchdog ka immediate next active check timeout na ho aur "DEAD" issue na aye.
//                 setTimeout(async () => {
//                     try {
//                         console.log(`[⏳] Starting background buffer rebuilding safely...`);
//                         await backupPage.goto('about:blank').catch(()=>{});
//                         await applyPreloadFirewall(backupPage);
//                         await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                         await initializeVideo(backupPage, true, false);
//                     } catch (e) {
//                         console.log(`[⚠️] Background buffer navigation handled safely.`);
//                     }
//                 }, 3000); 
//             }







//             // --------------------------------------------------------------------
//             // 🔄 SCENARIO B: PROACTIVE REFRESH OR FORCED RECONNECTION
//             // --------------------------------------------------------------------
//             else if (isProactiveRefresh || (backupStatus.status === 'HEALTHY' && isProactiveRefresh)) {
                
//                 for (const frame of activePage.frames()) {
//                     try { if (!frame.isDetached()) await frame.evaluate(() => { window.isStreamMuted = true; document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                 }
                
//                 await showLoadingUI(backupPage, "REFRESHING CONNECTION", "Optimizing current server stream <span class='stream-blink'>...</span>");
//                 await backupPage.bringToFront();
//                 await new Promise(r => setTimeout(r, 1000)); 
                
//                 try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                 console.log(`[*] Initializing Video on the newly active tab...`);
//                 await initializeVideo(backupPage, false, true); 
//                 await hideLoadingUI(backupPage);

//                 let brokenPage = activePage; 
//                 activePage = backupPage; 
//                 backupPage = brokenPage;

//                 let brokenBrowser = activeBrowser; 
//                 activeBrowser = backupBrowser; 
//                 backupBrowser = brokenBrowser;

//                 let brokenName = activeBrowserName;
//                 activeBrowserName = backupBrowserName;
//                 backupBrowserName = brokenName;
                
//                 lastActiveTime = -1; frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false; 

//                 let previousActiveIndex = currentUrlIndex;
//                 currentUrlIndex = backupUrlIndex;
//                 activeUrlStr = urlList[currentUrlIndex].url; 
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`\n==================================================`);
//                 console.log(`[🔄] PROACTIVE REFRESH EXECUTED SUCCESSFULLY`);
//                 console.log(`==================================================`);

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                 } catch (e) {}
                
//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true;
//                 currentStreamStartTime = Date.now();
//                 // 🚀 FIX: Lock background watchdog for Proactive Refresh too!
//                 backupWarmupTime = Date.now(); 
//             }



//             // --------------------------------------------------------------------
//             // ❌ SCENARIO C: BOTH TABS FAILED (Fresh Hunting Mode)
//             // --------------------------------------------------------------------
//             else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ BOTH TABS FAILED (Active & Backup Compromised)`);
//                 console.log(`[🔍] FRESH HUNTING MODE ACTIVATED: Spawning clean tabs...`);
//                 console.log(`==================================================`);
                
//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch (e) {}

//                 currentUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 activeUrlStr = urlList[currentUrlIndex].url;
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] Hunting Active -> Server [${currentUrlIndex}]`);
//                 console.log(`[*] Hunting Backup -> Server [${backupUrlIndex}]`);

//                 console.log(`[*] Closing crashed tabs and spawning fresh ones...`);
//                 try { await activePage.close(); } catch(e) {}
//                 try { await backupPage.close(); } catch(e) {}

//                 activePage = await activeBrowser.newPage();
//                 backupPage = await backupBrowser.newPage();

//                 await setupNetworkAdBlocker(activePage);
//                 await setupNetworkAdBlocker(backupPage);
//                 attachAntiAdListeners(activePage);
//                 attachAntiAdListeners(backupPage);
//                 await applyPreloadFirewall(activePage);
//                 await applyPreloadFirewall(backupPage);

//                 try {
//                     await activePage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 });
//                     await showLoadingUI(activePage, "SEARCHING SERVER", "Hunting for a stable stream connection <span class='stream-blink'>...</span>");
//                     await initializeVideo(activePage, false, true); 
//                     await hideLoadingUI(activePage);
//                 } catch(e) {}

//                 try {
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{});
//                     await initializeVideo(backupPage, true, false); 
//                 } catch(e) {}

//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true; 
//                 currentStreamStartTime = Date.now();
//                 backupWarmupTime = Date.now();
//                 lastActiveTime = -1;
//                 frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false;

//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
                
//                 console.log(`[*] Fresh tabs active. Waiting 15 seconds (Warm-up) for video to stabilize...`);
//             }
//         } 
       
//         await new Promise(r => setTimeout(r, 2000)); 
//     }
// }

// async function startDirectStreaming() {
//     activeBrowserName = "CHROME 1";
//     backupBrowserName = "CHROME 2";
    
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

//     browserArgs = [
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
//         '--disable-blink-features=AutomationControlled',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion,NetworkServiceInProcess2',
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

//     console.log(`[*] Starting ACTIVE browser instance...`);
//     activeBrowser = await createBrowserInstance(browserArgs);
//     const activePages = await activeBrowser.pages();
//     activePage = activePages[0];

//     console.log(`[*] Starting BACKUP browser instance in background...`);
//     backupBrowser = await createBrowserInstance(browserArgs);
//     const backupPages = await backupBrowser.pages();
//     backupPage = backupPages[0];

//     activeBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => { if (newPage && newPage !== activePage) { try { await newPage.close(); } catch(e) {} } }, 500);
//         }
//     });

//     backupBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => { if (newPage && newPage !== backupPage) { try { await newPage.close(); } catch(e) {} } }, 500);
//         }
//     });

//     await setupNetworkAdBlocker(activePage);
//     await setupNetworkAdBlocker(backupPage);

//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await applyPreloadFirewall(activePage);
//     await applyPreloadFirewall(backupPage);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex].url}`);
//     try {
//         await activePage.goto(urlList[currentUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 });
//     } catch (e) {
//         console.log(`[⚠️] Network buffer safely handled for primary URL.`);
//     }
    
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     await initializeVideo(activePage, false, true); 
//     await hideLoadingUI(activePage); 

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex].url}`);
//     try {
//         await backupPage.goto(urlList[backupUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 });
//     } catch (e) {}
    
//     await initializeVideo(backupPage, true, false);
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 
//     await hideLoadingUI(activePage);

//     console.log(`\n==================================================`);
//     console.log(`[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     console.log(`==================================================`);
//     console.log(`[📺] CURRENT ACTIVE LIVE : Server [${currentUrlIndex}] -> ${urlList[currentUrlIndex].url}`);
//     console.log(`[🔊] LIVE AUDIO STATUS   : ON (Unmuted)`);
//     console.log(`--------------------------------------------------`);
//     console.log(`[🛡️] NEXT BACKUP QUEUE   : Server [${backupUrlIndex}] -> ${urlList[backupUrlIndex].url}`);
//     console.log(`[🔇] BACKUP AUDIO STATUS : MUTED (Background)`);
//     console.log(`==================================================\n`);

//     console.log('[*] Everything Setup! Dual-Tab Monitoring is Active.');
//     await startWatchdog();
// }

// async function mainLoop() {
//     while (true) {
//         try {
//             await startDirectStreaming();
//         } catch (error) {
//             console.error('\n==================================================');
//             console.error('[🚨] FATAL ENGINE ERROR');
//             console.error(`[!] ${error.message}`);
//             console.error('==================================================');

//             if (activeBrowser && activeBrowser.isConnected()) {
//                 console.log('[🛡️] ACTIVE CHROME STILL ALIVE — NOT RESTARTING ENGINE.');
//                 await new Promise(resolve => setTimeout(resolve, 3000));
//                 continue;
//             }

//             if (backupBrowser && backupBrowser.isConnected()) {
//                 console.log('[🛡️] BACKUP CHROME STILL ALIVE — NOT RESTARTING ENGINE.');
//                 await new Promise(resolve => setTimeout(resolve, 3000));
//                 continue;
//             }

//             console.log('[⚠️] NO CHROME INSTANCE SURVIVED. Performing final recovery.');

//             try { if (activeBrowser) await activeBrowser.close().catch(() => {}); } catch (e) {}
//             try { if (backupBrowser) await backupBrowser.close().catch(() => {}); } catch (e) {}

//             activeBrowser = null; backupBrowser = null; activePage = null; backupPage = null;

//             await new Promise(resolve => setTimeout(resolve, 3000));
//             await cleanup();
//         }
//     }
// }

// async function cleanup() {
//     console.log('[*] Cleaning up resources...');
//     try { await obs.disconnect(); } catch (e) { } 
//     if (activeBrowser) { try { await activeBrowser.close(); } catch(e) { } activeBrowser = null; }
//     if (backupBrowser) { try { await backupBrowser.close(); } catch(e) { } backupBrowser = null; }
    
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
//             const targetUrls = process.env.TARGET_URLS || 'https://sport4u.online';
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












































// ============================
// ======================

// ======================
// ======================
// ====================
// ================



// const puppeteer = require('puppeteer-extra');
// let isWarmupPhase = true;
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD (DEBUGGING MODE)
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     console.error('\n========================================');
//     console.error('[💥] UNCAUGHT EXCEPTION');
//     console.error(err);
//     console.error(err.stack);
//     console.error('========================================\n');
// });

// process.on('unhandledRejection', (reason) => {
//     console.error('\n========================================');
//     console.error('[💥] UNHANDLED REJECTION');
//     console.error(reason);
//     console.error('========================================\n');
// });

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME (IN MINUTES)
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 40000; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// // =========================================================================================
// // 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// // =========================================================================================
// const NO_REFRESH_DOMAINS = [
//     'youtube.com',
//     'facebook.com',
//     'streamed.pk',
//     'cricstreams.', 
//     'sport4u.online',
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

// // =========================================================================================
// // 🔄 DYNAMIC URL PARSER & METADATA EXTRACTOR
// // =========================================================================================
// let rawUrls = (process.env.TARGET_URLS || '').trim();
// let urlList = [];

// if (rawUrls !== '') {
//     urlList = rawUrls.split(',').map(u => {
//         let trimmed = u.trim();
//         let hangThreshold = 8000; 
        
//         if (trimmed.startsWith('!')) {
//             hangThreshold = 20000; 
//             trimmed = trimmed.substring(1); 
//         }
//         if (!trimmed.startsWith('http')) trimmed = 'https://' + trimmed;
        
//         return { url: trimmed, hangTime: hangThreshold };
//     });
// } else {
//     urlList = [
//         { url: 'https://sport4u.online', hangTime: 8000 },
//         { url: 'https://dadocric.st/player.php?id=starsp3&v=m', hangTime: 8000 }
//     ];
// }

// function getSafeBackupIndex(activeIndex, currentIndex, list) {
//     if (list.length <= 1) return 0; 
//     let next = (currentIndex + 1) % list.length;
//     if (next === activeIndex) {
//         next = (next + 1) % list.length; 
//     }
//     return next;
// }

// let currentUrlIndex = 0;
// let backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);

// const SELECTED_CHANNEL = process.env.OKRU_STREAM_ID || '1';
// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None'; 
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

// const ACTIVE_STREAM_KEY = STREAM_KEYS[SELECTED_CHANNEL] || STREAM_KEYS['1'];

// let browserArgs = []; // Global Browser Args for Recovery Functions
// let activeBrowser = null;
// let backupBrowser = null;
// let activeBrowserName = "CHROME 1";
// let backupBrowserName = "CHROME 2";
// let obsProcess = null;
// let activePage = null;
// let backupPage = null;

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount = 0;

// async function createBrowserInstance(args) {
//     return await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: args
//     });
// }

// // =========================================================================================
// // 🛡️ SMART BROWSER RECOVERY
// // =========================================================================================

// async function preparePage(page) {
//     if (!page) return;
//     await setupNetworkAdBlocker(page);
//     attachAntiAdListeners(page);
//     await applyPreloadFirewall(page);
// }

// async function createFreshBackupBrowser() {
//     console.log('\n[🛠️] BACKUP RECOVERY: Creating fresh backup Chrome...');
//     try {
//         if (backupBrowser && backupBrowser.isConnected()) {
//             try {
//                 const pages = await backupBrowser.pages();
//                 for (const p of pages) {
//                     try { await p.close(); } catch (e) {}
//                 }
//             } catch (e) {}
//         }
//     } catch (e) {}

//     try {
//         if (backupBrowser && !backupBrowser.isConnected()) {
//             backupBrowser = null;
//         }
//     } catch (e) {
//         backupBrowser = null;
//     }

//     backupBrowser = await createBrowserInstance(browserArgs);
//     const pages = await backupBrowser.pages();
//     backupPage = pages[0];
//     await preparePage(backupPage);

//     backupBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             try {
//                 const newPage = await target.page();
//                 setTimeout(async () => {
//                     if (newPage && newPage !== backupPage) {
//                         try { await newPage.close(); } catch (e) {}
//                     }
//                 }, 500);
//             } catch (e) {}
//         }
//     });

//     console.log('[✅] BACKUP RECOVERY: Fresh backup Chrome created.');
//     return true;
// }

// async function createFreshActiveBrowser() {
//     console.log('\n[🛠️] ACTIVE RECOVERY: Creating fresh active Chrome...');
//     try {
//         if (activeBrowser && activeBrowser.isConnected()) {
//             try {
//                 const pages = await activeBrowser.pages();
//                 for (const p of pages) {
//                     try { await p.close(); } catch (e) {}
//                 }
//             } catch (e) {}
//         }
//     } catch (e) {}

//     try {
//         if (activeBrowser && !activeBrowser.isConnected()) {
//             activeBrowser = null;
//         }
//     } catch (e) {
//         activeBrowser = null;
//     }

//     activeBrowser = await createBrowserInstance(browserArgs);
//     const pages = await activeBrowser.pages();
//     activePage = pages[0];
//     await preparePage(activePage);

//     activeBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             try {
//                 const newPage = await target.page();
//                 setTimeout(async () => {
//                     if (newPage && newPage !== activePage) {
//                         try { await newPage.close(); } catch (e) {}
//                     }
//                 }, 500);
//             } catch (e) {}
//         }
//     });

//     console.log('[✅] ACTIVE RECOVERY: Fresh active Chrome created.');
//     return true;
// }

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
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') {
//                     init.mode = 'open'; 
//                 }
//                 const shadowRoot = originalAttachShadow.call(this, init);
                
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) {
//                         console.log('[🛡️] SHIELD: Shadow DOM Ad Detected & Destroyed!');
//                         this.remove(); 
//                     }
//                 });
                
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };
            
//             Element.prototype.attachShadow.toString = function() { return "function attachShadow() { [native code] }"; };

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
//                 in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }
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
//                             .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
//                             @keyframes blinker { 50% { opacity: 0.3; } }
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

// async function showRecoveryUI(page) {
//     try {
//         await page.evaluate(() => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('stream-recovery-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 return;
//             }
            
//             overlay = document.createElement('div');
//             overlay.id = 'stream-recovery-overlay';
//             overlay.innerHTML = `
//                 <style>
//                     #stream-recovery-overlay {
//                         position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                         width: 100vw !important; height: 100vh !important; background: rgba(0, 0, 0, 0.95) !important;
//                         z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                         justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                         font-family: Arial, sans-serif !important; pointer-events: all !important; backdrop-filter: blur(8px);
//                     }
//                     .recovery-radar {
//                         width: 100px; height: 100px; border-radius: 50%;
//                         border: 3px solid transparent; border-top-color: #ff9800; border-bottom-color: #ff9800;
//                         animation: radar-spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
//                         margin-bottom: 20px; box-shadow: 0 0 30px rgba(255, 152, 0, 0.3);
//                     }
//                     .recovery-radar::before {
//                         content: ''; position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px;
//                         border-radius: 50%; border: 3px solid transparent; border-left-color: #f44336; border-right-color: #f44336;
//                         animation: radar-spin 2s linear infinite reverse;
//                     }
//                     @keyframes radar-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                     .warn-title { font-size: 32px !important; font-weight: 800 !important; color: #ff9800 !important; letter-spacing: 2px !important; margin-bottom: 10px !important; text-transform: uppercase !important; }
//                     .warn-sub { font-size: 18px !important; color: #dddddd !important; animation: pulse-text 1.5s infinite; }
//                     @keyframes pulse-text { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
//                 </style>
//                 <div class="recovery-radar"></div>
//                 <div class="warn-title">SIGNAL LOST</div>
//                 <div class="warn-sub">Attempting Auto-Recovery...</div>
//             `;
//             document.documentElement.appendChild(overlay);
//         });
//     } catch (e) {}
// }

// async function hideRecoveryUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('stream-recovery-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'none', 'important');
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
    
//     const basicIniContent = `[General]\nName=Untitled\n[Video]\nBaseCX=${RES_W}\nBaseCY=${RES_H}\nOutputCX=${RES_W}\nOutputCY=${RES_H}\nFPSCommon=30\n[Output]\nMode=Simple\n[SimpleOutput]\nVBitrate=${BITRATE}\nStreamEncoder=x264\nx264Preset=ultrafast\nx264Settings=keyint=60 tune=zerolatency profile=main threads=4 rc-lookahead=0\n`;
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
//                             // await takeAndBatchScreenshot(page, `play-btn-clicked`);
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
//                             // await takeAndBatchScreenshot(page, `force-play-applied`);
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

//                     const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay):not(#stream-recovery-overlay):not([class*="player"]):not([class*="jw"]):not([class*="vjs"]), [id*="pop"], [class*="pop"], a[href*="extension"], [class*="notification"], [id*="notification"]';
//                     document.querySelectorAll(junkClasses).forEach(el => { 
//                         try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } 
//                     });

//                     const adKeywords = ['jerk', 'mate', 'free', 'online', 'adult', 'dating', 'close', 'notification', 'justine', 'paying', 'job'];
//                     document.querySelectorAll('div, section, span, a').forEach(el => {
//                         if (el.id === 'smart-stream-overlay' || el.id === 'stream-recovery-overlay') return;
                        
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
//             // FIX 1: Use window object to control audio globally to avoid Audio War
//             window.isStreamMuted = muteVideo; 

//             setInterval(() => {
//                 try {
//                     const style = document.createElement('style');
//                     style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                     document.head.appendChild(style);

//                     const mediaElements = document.querySelectorAll('video, audio');
//                     const videos = Array.from(document.querySelectorAll('video'));
//                     let realVideo = null;

//                     mediaElements.forEach(media => { 
//                         media.muted = window.isStreamMuted; 
//                         media.volume = window.isStreamMuted ? 0.0 : 1.0; 
//                     });

//                     if (!window.isStreamMuted) {
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (!realVideo && videos.length > 0) {
//                         realVideo = videos[0];
//                     }

//                     if (realVideo) { 
//                         let playerWrap = realVideo.closest('.jwplayer, #player, .plyr, .vjs-player, .shaka-video-container, [data-player]') || realVideo;
                        
//                         playerWrap.style.setProperty('position', 'fixed', 'important');
//                         playerWrap.style.setProperty('top', '0px', 'important');
//                         playerWrap.style.setProperty('left', '0px', 'important');
//                         playerWrap.style.setProperty('width', '100vw', 'important');
//                         playerWrap.style.setProperty('height', '100vh', 'important');
//                         playerWrap.style.setProperty('z-index', '2147483646', 'important'); 
//                         playerWrap.style.setProperty('background-color', 'black', 'important');
//                         playerWrap.style.setProperty('opacity', '1', 'important');
//                         playerWrap.style.setProperty('visibility', 'visible', 'important');
//                         playerWrap.style.setProperty('display', 'block', 'important');
                        
//                         if (playerWrap !== realVideo) {
//                             realVideo.style.setProperty('width', '100%', 'important');
//                             realVideo.style.setProperty('height', '100%', 'important');
//                         }
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                     }
//                 } catch(err) {}
//             }, 500); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     if (!startMuted) {
//         await triggerSmartUnmute(page);
//         await new Promise(r => setTimeout(r, 1000));
//     }
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
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     let backupWarmupTime = Date.now(); 
//     const WARMUP_MAX_TIME = 15000; 

//     let activeUrlStr = urlList[currentUrlIndex].url;
//     let backupUrlStr = urlList[backupUrlIndex].url;

//     let currentStreamStartTime = Date.now();
//     let isRecoveryUIShown = false;
    
//     // 🔐 THE REBUILD LOCK (MUTEX) - Prevents Context Destruction Race Conditions
//     let isBackupRebuilding = false; 

//     while (true) {
//         // =====================================================================================
//         // 🛡️ NEVER THROW JUST BECAUSE ONE CHROME DISCONNECTED
//         // Recover the affected side instead.
//         // =====================================================================================
//         const activeBrowserAlive = activeBrowser && activeBrowser.isConnected();
//         const backupBrowserAlive = backupBrowser && backupBrowser.isConnected();

//         // ---------------------------------------------------------------------
//         // CASE 1: ACTIVE CHROME DEAD, BACKUP CHROME STILL ALIVE
//         // ---------------------------------------------------------------------
//         if (!activeBrowserAlive && backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[🚨] ACTIVE CHROME DISCONNECTED');
//             console.log('[🔄] BACKUP CHROME IS ALIVE');
//             console.log('[⚡] PROMOTING BACKUP -> ACTIVE');
//             console.log('[🛡️] OBS WILL CONTINUE RUNNING');
//             console.log('==================================================\n');

//             const oldActiveBrowser = activeBrowser;
//             const oldActivePage = activePage;
//             activeBrowser = backupBrowser;
//             activePage = backupPage;
//             backupBrowser = oldActiveBrowser;
//             backupPage = oldActivePage;

//             const oldActiveName = activeBrowserName;
//             activeBrowserName = backupBrowserName;
//             backupBrowserName = oldActiveName;

//             const previousActiveIndex = currentUrlIndex;
//             currentUrlIndex = backupUrlIndex;
//             activeUrlStr = urlList[currentUrlIndex].url;

//             backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//             backupUrlStr = urlList[backupUrlIndex].url;

//             lastActiveTime = -1; lastDecodedFrames = -1; frozenCheckTimestamp = Date.now();
//             streamSetupTime = Date.now(); currentStreamStartTime = Date.now();
//             isWarmupPhase = true; backupWarmupTime = Date.now(); isRecoveryUIShown = false;

//             try { await activePage.bringToFront(); await hideLoadingUI(activePage); } catch (e) {}

//             console.log('[✅] BACKUP PROMOTED SUCCESSFULLY');
//             console.log(`[📺] NEW ACTIVE SERVER : [${currentUrlIndex}] -> ${activeUrlStr}`);
//             console.log(`[🔊] ACTIVE AUDIO      : ON`);
//             console.log(`[🛡️] NEW BACKUP SERVER : [${backupUrlIndex}] -> ${backupUrlStr}`);

//             try {
//                 await createFreshBackupBrowser();
//                 isBackupRebuilding = true; // 🔒 LOCK ON
//                 await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await initializeVideo(backupPage, true, false);
//                 isBackupRebuilding = false; // 🔓 LOCK OFF
//                 console.log('[✅] NEW BACKUP SERVER IS BUFFERING IN BACKGROUND');
//             } catch (e) {
//                 isBackupRebuilding = false; // 🔓 LOCK OFF
//                 console.log(`[⚠️] Backup recreation failed. Watchdog will try the NEXT server.`);
//             }
//             continue;
//         }

//         // ---------------------------------------------------------------------
//         // CASE 2: BACKUP CHROME DEAD, ACTIVE CHROME STILL ALIVE
//         // ---------------------------------------------------------------------
//         if (activeBrowserAlive && !backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[⚠️] BACKUP CHROME DISCONNECTED');
//             console.log('[🛡️] ACTIVE STREAM WILL NOT BE TOUCHED');
//             console.log('[🔄] REBUILDING BACKUP WITH NEXT SERVER');
//             console.log('==================================================\n');

//             try {
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] NEXT BACKUP SERVER -> [${backupUrlIndex}] ${backupUrlStr}`);
//                 await createFreshBackupBrowser();
                
//                 isBackupRebuilding = true; // 🔒 LOCK ON
//                 await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await initializeVideo(backupPage, true, false);
//                 isBackupRebuilding = false; // 🔓 LOCK OFF
                
//                 backupWarmupTime = Date.now();
//                 console.log(`[✅] BACKUP RECOVERED -> Server [${backupUrlIndex}]`);
//             } catch (e) {
//                 isBackupRebuilding = false; // 🔓 LOCK OFF
//                 console.log(`[⚠️] Backup recovery failed. NEXT WATCHDOG CYCLE WILL TRY AGAIN.`);
//             }
//         }

//         // ---------------------------------------------------------------------
//         // CASE 3: BOTH CHROMES DEAD
//         // ---------------------------------------------------------------------
//         if (!activeBrowserAlive && !backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[🚨] BOTH CHROME INSTANCES DISCONNECTED');
//             console.log('[🛠️] LOCAL RECOVERY MODE');
//             console.log('[🛑] OBS WILL NOT BE RESTARTED');
//             console.log('==================================================\n');

//             try {
//                 currentUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 activeUrlStr = urlList[currentUrlIndex].url;

//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] RECOVERY ACTIVE -> [${currentUrlIndex}] ${activeUrlStr}`);
//                 console.log(`[*] RECOVERY BACKUP -> [${backupUrlIndex}] ${backupUrlStr}`);

//                 await createFreshActiveBrowser();
//                 await activePage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await showLoadingUI(activePage, "SEARCHING SERVER", "Finding a stable stream connection <span class='stream-blink'>...</span>");
//                 await initializeVideo(activePage, false, true);
//                 await hideLoadingUI(activePage);

//                 console.log('[✅] ACTIVE CHROME RECOVERED');

//                 try {
//                     await createFreshBackupBrowser();
//                     isBackupRebuilding = true; // 🔒 LOCK ON
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                     isBackupRebuilding = false; // 🔓 LOCK OFF
//                     console.log('[✅] BACKUP CHROME RECOVERED');
//                 } catch (backupError) {
//                     isBackupRebuilding = false; // 🔓 LOCK OFF
//                     console.log('[⚠️] Backup failed. Active stream continues.');
//                 }

//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}

//                 streamSetupTime = Date.now(); currentStreamStartTime = Date.now(); backupWarmupTime = Date.now();
//                 frozenCheckTimestamp = Date.now(); lastActiveTime = -1; lastDecodedFrames = -1;
//                 isWarmupPhase = true; isRecoveryUIShown = false;

//                 console.log('[✅] LOCAL RECOVERY COMPLETE — WATCHDOG CONTINUES');
//             } catch (e) {
//                 console.log(`[❌] Local Chrome recovery failed: ${e.message}`);
//                 await new Promise(r => setTimeout(r, 3000));
//             }
//             continue;
//         }

//         let activeHangThresholdMs = urlList[currentUrlIndex].hangTime;
//         let activeStatus = await checkPageStatus(activePage);

//         // 🔄 1. BACKGROUND SHIELD
//         if (!isWarmupPhase && (Date.now() - backupWarmupTime > 30000)) { 
//             let backupStatus = await checkPageStatus(backupPage);
            
//             if (backupStatus.status === 'DEAD' || backupStatus.status === 'CRITICAL_ERROR' || backupStatus.status === 'FROZEN') {
                
//                 // 🛡️ CRITICAL LOCK CHECK: Avoid Execution Context Race Conditions
//                 if (isBackupRebuilding) {
//                     console.log(`[🛡️] MUTEX ACTIVE: Backup is already rebuilding. Watchdog skipped background navigation.`);
//                 } else {
//                     console.log(`\n[⚠️] BACKGROUND SHIELD: Backup Server [${backupUrlIndex}] failed silently.`);
                    
//                     backupUrlIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//                     backupUrlStr = urlList[backupUrlIndex].url;
                    
//                     console.log(`[*] Shifting Backup Chrome to NEXT link -> Server [${backupUrlIndex}]`);
                    
//                     isBackupRebuilding = true; // 🔒 LOCK ON
//                     try {
//                         await backupPage.goto('about:blank').catch(()=>{});
//                         await applyPreloadFirewall(backupPage);
//                         await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                         await initializeVideo(backupPage, true, false);
//                     } catch(e) {
//                         console.log(`[❌] Background Shield Rebuild failed: ${e.message}`);
//                     } finally {
//                         isBackupRebuilding = false; // 🔓 LOCK OFF
//                         backupWarmupTime = Date.now();
//                     }
//                 }
//             }
//         }

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

//         // Active Tab Audio Watchdog Fix (Stop Audio War)
//         if (activeStatus.status === 'HEALTHY') {
//             await hideLoadingUI(activePage); 
//             isWarmupPhase = false; 

//             let isTimeStuck = (activeStatus.currentTime === lastActiveTime);
//             let isFrameStuck = (activeStatus.decodedFrames === lastDecodedFrames && activeStatus.decodedFrames > 0);

//             if (isTimeStuck || isFrameStuck) {
//                 if (!isRecoveryUIShown) {
//                     await showRecoveryUI(activePage);
//                     isRecoveryUIShown = true;
//                     console.log(`[⚠️] Stream Hang Detected! Showing Signal Recovery Shield instantly...`);
//                 }

//                 if (Date.now() - frozenCheckTimestamp > activeHangThresholdMs) {
//                     activeStatus.status = 'FROZEN';
//                     if (isFrameStuck && !isTimeStuck) {
//                         console.log(`[!] ⚠️ SYSTEM SHIELD: Detected Black Screen (Audio playing, but video frames stuck). Triggering HOT-SWAP.`);
//                     }
//                     isRecoveryUIShown = false; 
//                 }
//             } else {
//                 lastActiveTime = activeStatus.currentTime; 
//                 lastDecodedFrames = activeStatus.decodedFrames; 
//                 frozenCheckTimestamp = Date.now();
                
//                 if (isRecoveryUIShown) {
//                     await hideRecoveryUI(activePage);
//                     isRecoveryUIShown = false;
//                     console.log(`[✅] Stream Recovered! Signal Recovery Shield removed instantly.`);
//                 }
                
//                 // Mute override for active page (Audio fix applied)
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             frame.evaluate(() => { 
//                                 window.isStreamMuted = false;
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                                 document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                             }).catch(()=>{});
//                         }
//                     } catch(e) {}
//                 }
//             }
//         }

//         // Backup Tab Audio Watchdog Fix
//         if (backupPage) {
//             for (const frame of backupPage.frames()) {
//                 try {
//                     if (!frame.isDetached()) {
//                         frame.evaluate(() => { 
//                             window.isStreamMuted = true;
//                             document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); 
//                         }).catch(()=>{});
//                     }
//                 } catch(e) {}
//             }
//         }

//         watchdogTicks++;

//         if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
//             let logBackupStatus = await checkPageStatus(backupPage);
//             let nextAfterBackupIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//             let nextAfterBackupUrl = urlList[nextAfterBackupIndex].url;
            
//             console.log(`\n==================================================`);
//             console.log(`[💓] ACTIVE HEARTBEAT (${activeBrowserName}): Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'} (Limit: ${activeHangThresholdMs/1000}s)`);
//             console.log(`[▶️] CURRENTLY LIVE              : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//             console.log(`--------------------------------------------------`);
//             console.log(`[🖤] BACKUP HEARTBEAT (${backupBrowserName}): Status is ${logBackupStatus.status} | Video Time: ${logBackupStatus.currentTime ? logBackupStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//             console.log(`[🔄] RUNNING IN BACKGROUND       : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//             console.log(`[⏭️] NEXT QUEUE (AFTER BACKUP)  : Server [${nextAfterBackupIndex}] -> ${nextAfterBackupUrl}`);
//             console.log(`==================================================\n`);
//         }

//         if (watchdogTicks % 120 === 0) {
//             await takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
//         }

//         // =========================================================================================
//         // 🔄 2. ACTIVE TAB HOT-SWAP SHIELD
//         // =========================================================================================
//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH') {
            
//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 console.log(`[⏳] Watchdog detected '${activeStatus.status}', but stream is in WARM-UP phase. Waiting...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             }

//             let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

//             if (isProactiveRefresh) {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] 🔄 PROACTIVE REFRESH TRIGGERED`);
//                 console.log(`[*] Initiating forward rotation to prevent stream drop...`);
//                 console.log(`==================================================`);
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
//                 console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`==================================================`);
//                 await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
//             }
            
//             console.log(`[*] Checking Backup Tab status before switching...`);
//             let backupStatus = await checkPageStatus(backupPage);

//             // --------------------------------------------------------------------
//             // ⚡ SCENARIO A: INSTANT SEAMLESS HOT-SWAP (BACKUP IS ALREADY HEALTHY)
//             // --------------------------------------------------------------------
//             if (backupStatus.status === 'HEALTHY' && !isProactiveRefresh) {
                
//                 console.log('\n==================================================');
//                 console.log('[⚡] BACKUP STREAM ALREADY HEALTHY');
//                 console.log('[⚡] SHOWING TRANSITION UI & PROMOTING INSTANTLY');
//                 console.log('==================================================');

//                 await showLoadingUI(backupPage, "RECONNECTING", "Establishing secure connection to backup server <span class='stream-blink'>...</span>");

//                 try { await backupPage.bringToFront(); } catch (e) {}

//                 let brokenPage = activePage; 
//                 activePage = backupPage; 
//                 backupPage = brokenPage;

//                 let brokenBrowser = activeBrowser; 
//                 activeBrowser = backupBrowser; 
//                 backupBrowser = brokenBrowser;

//                 let brokenName = activeBrowserName;
//                 activeBrowserName = backupBrowserName;
//                 backupBrowserName = brokenName;

//                 let previousActiveIndex = currentUrlIndex;
//                 currentUrlIndex = backupUrlIndex;
//                 activeUrlStr = urlList[currentUrlIndex].url; 
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             await frame.evaluate(() => { 
//                                 window.isStreamMuted = false;
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                                 document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                             });
//                         }
//                     } catch(e) {}
//                 }

//                 lastActiveTime = -1; 
//                 lastDecodedFrames = -1;
//                 frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false; 

//                 streamSetupTime = Date.now(); 
//                 currentStreamStartTime = Date.now();
//                 isWarmupPhase = false; 
                
//                 backupWarmupTime = Date.now() + 5000; 

//                 await new Promise(r => setTimeout(r, 1500));
//                 try { await hideLoadingUI(activePage); } catch(e) {}

//                 console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`[🔊] LIVE AUDIO STATUS : ON (Seamlessly Promoted & Unmuted)`);
//                 console.log(`--------------------------------------------------`);
//                 console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//                 console.log(`==================================================\n`);

//                 // 7. 🛠️ CPU BOTTLENECK FIX & MUTEX PROTECTED REBUILD
//                 setTimeout(async () => {
//                     if (isBackupRebuilding) return; // Ignore if already rebuilding
//                     isBackupRebuilding = true; // 🔒 LOCK ON
//                     try {
//                         console.log(`[⏳] Starting background buffer rebuilding safely with MUTEX lock...`);
//                         await backupPage.goto('about:blank').catch(()=>{});
//                         await applyPreloadFirewall(backupPage);
//                         await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                         await initializeVideo(backupPage, true, false);
//                     } catch (e) {
//                         console.log(`[⚠️] Background buffer navigation handled safely.`);
//                     } finally {
//                         isBackupRebuilding = false; // 🔓 LOCK OFF
//                         backupWarmupTime = Date.now();
//                     }
//                 }, 3000); 
//             }

//             // --------------------------------------------------------------------
//             // 🔄 SCENARIO B: PROACTIVE REFRESH OR FORCED RECONNECTION
//             // --------------------------------------------------------------------
//             else if (isProactiveRefresh || (backupStatus.status === 'HEALTHY' && isProactiveRefresh)) {
                
//                 for (const frame of activePage.frames()) {
//                     try { if (!frame.isDetached()) await frame.evaluate(() => { window.isStreamMuted = true; document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                 }
                
//                 await showLoadingUI(backupPage, "REFRESHING CONNECTION", "Optimizing current server stream <span class='stream-blink'>...</span>");
//                 await backupPage.bringToFront();
//                 await new Promise(r => setTimeout(r, 1000)); 
                
//                 try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                 console.log(`[*] Initializing Video on the newly active tab...`);
//                 await initializeVideo(backupPage, false, true); 
//                 await hideLoadingUI(backupPage);

//                 let brokenPage = activePage; 
//                 activePage = backupPage; 
//                 backupPage = brokenPage;

//                 let brokenBrowser = activeBrowser; 
//                 activeBrowser = backupBrowser; 
//                 backupBrowser = brokenBrowser;

//                 let brokenName = activeBrowserName;
//                 activeBrowserName = backupBrowserName;
//                 backupBrowserName = brokenName;
                
//                 lastActiveTime = -1; frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false; 

//                 let previousActiveIndex = currentUrlIndex;
//                 currentUrlIndex = backupUrlIndex;
//                 activeUrlStr = urlList[currentUrlIndex].url; 
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`\n==================================================`);
//                 console.log(`[🔄] PROACTIVE REFRESH EXECUTED SUCCESSFULLY`);
//                 console.log(`==================================================`);

//                 isBackupRebuilding = true; // 🔒 LOCK ON
//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                 } catch (e) {
//                     console.log(`[⚠️] Proactive Refresh rebuild failed safely.`);
//                 } finally {
//                     isBackupRebuilding = false; // 🔓 LOCK OFF
//                     backupWarmupTime = Date.now();
//                 }
                
//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true;
//                 currentStreamStartTime = Date.now();
//             }

//             // --------------------------------------------------------------------
//             // ❌ SCENARIO C: BOTH TABS FAILED (Fresh Hunting Mode)
//             // --------------------------------------------------------------------
//             else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ BOTH TABS FAILED (Active & Backup Compromised)`);
//                 console.log(`[🔍] FRESH HUNTING MODE ACTIVATED: Spawning clean tabs...`);
//                 console.log(`==================================================`);
                
//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch (e) {}

//                 currentUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 activeUrlStr = urlList[currentUrlIndex].url;
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] Hunting Active -> Server [${currentUrlIndex}]`);
//                 console.log(`[*] Hunting Backup -> Server [${backupUrlIndex}]`);

//                 console.log(`[*] Closing crashed tabs and spawning fresh ones...`);
//                 try { await activePage.close(); } catch(e) {}
//                 try { await backupPage.close(); } catch(e) {}

//                 activePage = await activeBrowser.newPage();
//                 backupPage = await backupBrowser.newPage();

//                 await setupNetworkAdBlocker(activePage);
//                 await setupNetworkAdBlocker(backupPage);
//                 attachAntiAdListeners(activePage);
//                 attachAntiAdListeners(backupPage);
//                 await applyPreloadFirewall(activePage);
//                 await applyPreloadFirewall(backupPage);

//                 try {
//                     await activePage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 });
//                     await showLoadingUI(activePage, "SEARCHING SERVER", "Hunting for a stable stream connection <span class='stream-blink'>...</span>");
//                     await initializeVideo(activePage, false, true); 
//                     await hideLoadingUI(activePage);
//                 } catch(e) {}

//                 isBackupRebuilding = true; // 🔒 LOCK ON
//                 try {
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{});
//                     await initializeVideo(backupPage, true, false); 
//                 } catch(e) {
//                 } finally {
//                     isBackupRebuilding = false; // 🔓 LOCK OFF
//                 }

//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true; 
//                 currentStreamStartTime = Date.now();
//                 backupWarmupTime = Date.now();
//                 lastActiveTime = -1;
//                 frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false;

//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
                
//                 console.log(`[*] Fresh tabs active. Waiting 15 seconds (Warm-up) for video to stabilize...`);
//             }
//         } 
       
//         await new Promise(r => setTimeout(r, 2000)); 
//     }
// }

// async function startDirectStreaming() {
//     activeBrowserName = "CHROME 1";
//     backupBrowserName = "CHROME 2";
    
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

//     browserArgs = [
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
//         '--disable-blink-features=AutomationControlled',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion,NetworkServiceInProcess2',
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

//     console.log(`[*] Starting ACTIVE browser instance...`);
//     activeBrowser = await createBrowserInstance(browserArgs);
//     const activePages = await activeBrowser.pages();
//     activePage = activePages[0];

//     console.log(`[*] Starting BACKUP browser instance in background...`);
//     backupBrowser = await createBrowserInstance(browserArgs);
//     const backupPages = await backupBrowser.pages();
//     backupPage = backupPages[0];

//     activeBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => { if (newPage && newPage !== activePage) { try { await newPage.close(); } catch(e) {} } }, 500);
//         }
//     });

//     backupBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => { if (newPage && newPage !== backupPage) { try { await newPage.close(); } catch(e) {} } }, 500);
//         }
//     });

//     await setupNetworkAdBlocker(activePage);
//     await setupNetworkAdBlocker(backupPage);

//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await applyPreloadFirewall(activePage);
//     await applyPreloadFirewall(backupPage);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex].url}`);
//     try {
//         await activePage.goto(urlList[currentUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 });
//     } catch (e) {
//         console.log(`[⚠️] Network buffer safely handled for primary URL.`);
//     }
    
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     await initializeVideo(activePage, false, true); 
//     await hideLoadingUI(activePage); 

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex].url}`);
//     try {
//         await backupPage.goto(urlList[backupUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 });
//     } catch (e) {}
    
//     await initializeVideo(backupPage, true, false);
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 
//     await hideLoadingUI(activePage);

//     console.log(`\n==================================================`);
//     console.log(`[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     console.log(`==================================================`);
//     console.log(`[📺] CURRENT ACTIVE LIVE : Server [${currentUrlIndex}] -> ${urlList[currentUrlIndex].url}`);
//     console.log(`[🔊] LIVE AUDIO STATUS   : ON (Unmuted)`);
//     console.log(`--------------------------------------------------`);
//     console.log(`[🛡️] NEXT BACKUP QUEUE   : Server [${backupUrlIndex}] -> ${urlList[backupUrlIndex].url}`);
//     console.log(`[🔇] BACKUP AUDIO STATUS : MUTED (Background)`);
//     console.log(`==================================================\n`);

//     console.log('[*] Everything Setup! Dual-Tab Monitoring is Active.');
//     await startWatchdog();
// }

// async function mainLoop() {
//     while (true) {
//         try {
//             await startDirectStreaming();
//         } catch (error) {
//             console.error('\n==================================================');
//             console.error('[🚨] FATAL ENGINE ERROR');
//             console.error(`[!] ${error.message}`);
//             console.error('==================================================');

//             if (activeBrowser && activeBrowser.isConnected()) {
//                 console.log('[🛡️] ACTIVE CHROME STILL ALIVE — NOT RESTARTING ENGINE.');
//                 await new Promise(resolve => setTimeout(resolve, 3000));
//                 continue;
//             }

//             if (backupBrowser && backupBrowser.isConnected()) {
//                 console.log('[🛡️] BACKUP CHROME STILL ALIVE — NOT RESTARTING ENGINE.');
//                 await new Promise(resolve => setTimeout(resolve, 3000));
//                 continue;
//             }

//             console.log('[⚠️] NO CHROME INSTANCE SURVIVED. Performing final recovery.');

//             try { if (activeBrowser) await activeBrowser.close().catch(() => {}); } catch (e) {}
//             try { if (backupBrowser) await backupBrowser.close().catch(() => {}); } catch (e) {}

//             activeBrowser = null; backupBrowser = null; activePage = null; backupPage = null;

//             await new Promise(resolve => setTimeout(resolve, 3000));
//             await cleanup();
//         }
//     }
// }

// async function cleanup() {
//     console.log('[*] Cleaning up resources...');
//     try { await obs.disconnect(); } catch (e) { } 
//     if (activeBrowser) { try { await activeBrowser.close(); } catch(e) { } activeBrowser = null; }
//     if (backupBrowser) { try { await backupBrowser.close(); } catch(e) { } backupBrowser = null; }
    
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
//             const targetUrls = process.env.TARGET_URLS || 'https://sport4u.online';
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









































// const puppeteer = require('puppeteer-extra');
// let isWarmupPhase = true;
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD (DEBUGGING MODE)
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     console.error('\n========================================');
//     console.error('[💥] UNCAUGHT EXCEPTION');
//     console.error(err);
//     console.error(err.stack);
//     console.error('========================================\n');
// });

// process.on('unhandledRejection', (reason) => {
//     console.error('\n========================================');
//     console.error('[💥] UNHANDLED REJECTION');
//     console.error(reason);
//     console.error('========================================\n');
// });

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME (IN MINUTES)
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 40000; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// // =========================================================================================
// // 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// // =========================================================================================
// const NO_REFRESH_DOMAINS = [
//     'youtube.com',
//     'facebook.com',
//     'streamed.pk',
//     'cricstreams.', 
//     'sport4u.online',
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

// // =========================================================================================
// // 🔄 DYNAMIC URL PARSER & METADATA EXTRACTOR
// // =========================================================================================
// let rawUrls = (process.env.TARGET_URLS || '').trim();
// let urlList = [];

// if (rawUrls !== '') {
//     urlList = rawUrls.split(',').map(u => {
//         let trimmed = u.trim();
//         let hangThreshold = 8000; 
        
//         if (trimmed.startsWith('!')) {
//             hangThreshold = 20000; 
//             trimmed = trimmed.substring(1); 
//         }
//         if (!trimmed.startsWith('http')) trimmed = 'https://' + trimmed;
        
//         return { url: trimmed, hangTime: hangThreshold };
//     });
// } else {
//     urlList = [
//         { url: 'https://sport4u.online', hangTime: 8000 },
//         { url: 'https://dadocric.st/player.php?id=starsp3&v=m', hangTime: 8000 }
//     ];
// }

// function getSafeBackupIndex(activeIndex, currentIndex, list) {
//     if (list.length <= 1) return 0; 
//     let next = (currentIndex + 1) % list.length;
//     if (next === activeIndex) {
//         next = (next + 1) % list.length; 
//     }
//     return next;
// }

// let currentUrlIndex = 0;
// let backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);

// const SELECTED_CHANNEL = process.env.OKRU_STREAM_ID || '1';
// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None'; 
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

// const ACTIVE_STREAM_KEY = STREAM_KEYS[SELECTED_CHANNEL] || STREAM_KEYS['1'];

// let browserArgs = []; // Global Browser Args for Recovery Functions
// let activeBrowser = null;
// let backupBrowser = null;
// let activeBrowserName = "CHROME 1";
// let backupBrowserName = "CHROME 2";
// let obsProcess = null;
// let activePage = null;
// let backupPage = null;

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount = 0;

// async function createBrowserInstance(args) {
//     return await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: args
//     });
// }

// // =========================================================================================
// // 🛡️ SMART BROWSER RECOVERY
// // =========================================================================================

// async function preparePage(page) {
//     if (!page) return;
//     await setupNetworkAdBlocker(page);
//     attachAntiAdListeners(page);
//     await applyPreloadFirewall(page);
// }

// async function createFreshBackupBrowser() {
//     console.log('\n[🛠️] BACKUP RECOVERY: Creating fresh backup Chrome...');
//     try {
//         if (backupBrowser && backupBrowser.isConnected()) {
//             try {
//                 const pages = await backupBrowser.pages();
//                 for (const p of pages) {
//                     try { await p.close(); } catch (e) {}
//                 }
//             } catch (e) {}
//         }
//     } catch (e) {}

//     try {
//         if (backupBrowser && !backupBrowser.isConnected()) {
//             backupBrowser = null;
//         }
//     } catch (e) {
//         backupBrowser = null;
//     }

//     backupBrowser = await createBrowserInstance(browserArgs);
//     const pages = await backupBrowser.pages();
//     backupPage = pages[0];
//     await preparePage(backupPage);

//     backupBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             try {
//                 const newPage = await target.page();
//                 setTimeout(async () => {
//                     if (newPage && newPage !== backupPage) {
//                         try { await newPage.close(); } catch (e) {}
//                     }
//                 }, 500);
//             } catch (e) {}
//         }
//     });

//     console.log('[✅] BACKUP RECOVERY: Fresh backup Chrome created.');
//     return true;
// }

// async function createFreshActiveBrowser() {
//     console.log('\n[🛠️] ACTIVE RECOVERY: Creating fresh active Chrome...');
//     try {
//         if (activeBrowser && activeBrowser.isConnected()) {
//             try {
//                 const pages = await activeBrowser.pages();
//                 for (const p of pages) {
//                     try { await p.close(); } catch (e) {}
//                 }
//             } catch (e) {}
//         }
//     } catch (e) {}

//     try {
//         if (activeBrowser && !activeBrowser.isConnected()) {
//             activeBrowser = null;
//         }
//     } catch (e) {
//         activeBrowser = null;
//     }

//     activeBrowser = await createBrowserInstance(browserArgs);
//     const pages = await activeBrowser.pages();
//     activePage = pages[0];
//     await preparePage(activePage);

//     activeBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             try {
//                 const newPage = await target.page();
//                 setTimeout(async () => {
//                     if (newPage && newPage !== activePage) {
//                         try { await newPage.close(); } catch (e) {}
//                     }
//                 }, 500);
//             } catch (e) {}
//         }
//     });

//     console.log('[✅] ACTIVE RECOVERY: Fresh active Chrome created.');
//     return true;
// }

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
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') {
//                     init.mode = 'open'; 
//                 }
//                 const shadowRoot = originalAttachShadow.call(this, init);
                
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) {
//                         console.log('[🛡️] SHIELD: Shadow DOM Ad Detected & Destroyed!');
//                         this.remove(); 
//                     }
//                 });
                
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };
            
//             Element.prototype.attachShadow.toString = function() { return "function attachShadow() { [native code] }"; };

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
//                 in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }
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
//                             .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
//                             @keyframes blinker { 50% { opacity: 0.3; } }
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

// async function showRecoveryUI(page) {
//     try {
//         await page.evaluate(() => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('stream-recovery-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 return;
//             }
            
//             overlay = document.createElement('div');
//             overlay.id = 'stream-recovery-overlay';
//             overlay.innerHTML = `
//                 <style>
//                     #stream-recovery-overlay {
//                         position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                         width: 100vw !important; height: 100vh !important; background: rgba(0, 0, 0, 0.95) !important;
//                         z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                         justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                         font-family: Arial, sans-serif !important; pointer-events: all !important; backdrop-filter: blur(8px);
//                     }
//                     .recovery-radar {
//                         width: 100px; height: 100px; border-radius: 50%;
//                         border: 3px solid transparent; border-top-color: #ff9800; border-bottom-color: #ff9800;
//                         animation: radar-spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
//                         margin-bottom: 20px; box-shadow: 0 0 30px rgba(255, 152, 0, 0.3);
//                     }
//                     .recovery-radar::before {
//                         content: ''; position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px;
//                         border-radius: 50%; border: 3px solid transparent; border-left-color: #f44336; border-right-color: #f44336;
//                         animation: radar-spin 2s linear infinite reverse;
//                     }
//                     @keyframes radar-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                     .warn-title { font-size: 32px !important; font-weight: 800 !important; color: #ff9800 !important; letter-spacing: 2px !important; margin-bottom: 10px !important; text-transform: uppercase !important; }
//                     .warn-sub { font-size: 18px !important; color: #dddddd !important; animation: pulse-text 1.5s infinite; }
//                     @keyframes pulse-text { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
//                 </style>
//                 <div class="recovery-radar"></div>
//                 <div class="warn-title">SIGNAL LOST</div>
//                 <div class="warn-sub">Attempting Auto-Recovery...</div>
//             `;
//             document.documentElement.appendChild(overlay);
//         });
//     } catch (e) {}
// }

// async function hideRecoveryUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('stream-recovery-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'none', 'important');
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
    
//     const basicIniContent = `[General]\nName=Untitled\n[Video]\nBaseCX=${RES_W}\nBaseCY=${RES_H}\nOutputCX=${RES_W}\nOutputCY=${RES_H}\nFPSCommon=30\n[Output]\nMode=Simple\n[SimpleOutput]\nVBitrate=${BITRATE}\nStreamEncoder=x264\nx264Preset=ultrafast\nx264Settings=keyint=60 tune=zerolatency profile=main threads=4 rc-lookahead=0\n`;
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
//                             // await takeAndBatchScreenshot(page, `play-btn-clicked`);
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
//                             // await takeAndBatchScreenshot(page, `force-play-applied`);
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

//                     const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay):not(#stream-recovery-overlay):not([class*="player"]):not([class*="jw"]):not([class*="vjs"]), [id*="pop"], [class*="pop"], a[href*="extension"], [class*="notification"], [id*="notification"]';
//                     document.querySelectorAll(junkClasses).forEach(el => { 
//                         try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } 
//                     });

//                     const adKeywords = ['jerk', 'mate', 'free', 'online', 'adult', 'dating', 'close', 'notification', 'justine', 'paying', 'job'];
//                     document.querySelectorAll('div, section, span, a').forEach(el => {
//                         if (el.id === 'smart-stream-overlay' || el.id === 'stream-recovery-overlay') return;
                        
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
//             // FIX 1: Use window object to control audio globally to avoid Audio War
//             window.isStreamMuted = muteVideo; 

//             setInterval(() => {
//                 try {
//                     const style = document.createElement('style');
//                     style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                     document.head.appendChild(style);

//                     const mediaElements = document.querySelectorAll('video, audio');
//                     const videos = Array.from(document.querySelectorAll('video'));
//                     let realVideo = null;

//                     mediaElements.forEach(media => { 
//                         media.muted = window.isStreamMuted; 
//                         media.volume = window.isStreamMuted ? 0.0 : 1.0; 
//                     });

//                     if (!window.isStreamMuted) {
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (!realVideo && videos.length > 0) {
//                         realVideo = videos[0];
//                     }

//                     if (realVideo) { 
//                         let playerWrap = realVideo.closest('.jwplayer, #player, .plyr, .vjs-player, .shaka-video-container, [data-player]') || realVideo;
                        
//                         playerWrap.style.setProperty('position', 'fixed', 'important');
//                         playerWrap.style.setProperty('top', '0px', 'important');
//                         playerWrap.style.setProperty('left', '0px', 'important');
//                         playerWrap.style.setProperty('width', '100vw', 'important');
//                         playerWrap.style.setProperty('height', '100vh', 'important');
//                         playerWrap.style.setProperty('z-index', '2147483646', 'important'); 
//                         playerWrap.style.setProperty('background-color', 'black', 'important');
//                         playerWrap.style.setProperty('opacity', '1', 'important');
//                         playerWrap.style.setProperty('visibility', 'visible', 'important');
//                         playerWrap.style.setProperty('display', 'block', 'important');
                        
//                         if (playerWrap !== realVideo) {
//                             realVideo.style.setProperty('width', '100%', 'important');
//                             realVideo.style.setProperty('height', '100%', 'important');
//                         }
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                     }
//                 } catch(err) {}
//             }, 500); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     if (!startMuted) {
//         await triggerSmartUnmute(page);
//         await new Promise(r => setTimeout(r, 1000));
//     }
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
//     // 🧠 ACTIVE TAB MEMORY
//     let lastActiveTime = -1;
//     let lastDecodedFrames = -1; 
//     let frozenCheckTimestamp = Date.now();
    
//     // 🧠 BACKUP TAB MEMORY (Background Freeze Detection)
//     let lastBackupTime = -1;
//     let lastBackupDecodedFrames = -1;
//     let backupFrozenCheckTimestamp = Date.now();

//     let watchdogTicks = 0;
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     let backupWarmupTime = Date.now(); 
//     const WARMUP_MAX_TIME = 15000; 

//     let activeUrlStr = urlList[currentUrlIndex].url;
//     let backupUrlStr = urlList[backupUrlIndex].url;

//     let currentStreamStartTime = Date.now();
//     let isRecoveryUIShown = false;
    
//     // 🔐 THE REBUILD LOCK (MUTEX)
//     let isBackupRebuilding = false; 

//     while (true) {
//         const activeBrowserAlive = activeBrowser && activeBrowser.isConnected();
//         const backupBrowserAlive = backupBrowser && backupBrowser.isConnected();

//         // ---------------------------------------------------------------------
//         // CASE 1: ACTIVE CHROME DEAD, BACKUP CHROME STILL ALIVE
//         // ---------------------------------------------------------------------
//         if (!activeBrowserAlive && backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[🚨] ACTIVE CHROME DISCONNECTED');
//             console.log('[⚡] PROMOTING BACKUP -> ACTIVE');
//             console.log('==================================================\n');

//             const oldActiveBrowser = activeBrowser;
//             const oldActivePage = activePage;
//             activeBrowser = backupBrowser;
//             activePage = backupPage;
//             backupBrowser = oldActiveBrowser;
//             backupPage = oldActivePage;

//             const oldActiveName = activeBrowserName;
//             activeBrowserName = backupBrowserName;
//             backupBrowserName = oldActiveName;

//             const previousActiveIndex = currentUrlIndex;
//             currentUrlIndex = backupUrlIndex;
//             activeUrlStr = urlList[currentUrlIndex].url;

//             backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//             backupUrlStr = urlList[backupUrlIndex].url;

//             lastActiveTime = -1; lastDecodedFrames = -1; frozenCheckTimestamp = Date.now();
//             lastBackupTime = -1; lastBackupDecodedFrames = -1; backupFrozenCheckTimestamp = Date.now(); 
            
//             streamSetupTime = Date.now(); currentStreamStartTime = Date.now();
//             isWarmupPhase = true; backupWarmupTime = Date.now(); isRecoveryUIShown = false;

//             try { await activePage.bringToFront(); await hideLoadingUI(activePage); } catch (e) {}
//             console.log('[✅] BACKUP PROMOTED SUCCESSFULLY');

//             try {
//                 await createFreshBackupBrowser();
//                 isBackupRebuilding = true; 
//                 await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await initializeVideo(backupPage, true, false);
//             } catch (e) {
//                 console.log(`[⚠️] Backup recreation failed: ${e.message}`);
//             } finally {
//                 isBackupRebuilding = false; 
//             }
//             continue;
//         }

//         // ---------------------------------------------------------------------
//         // CASE 2: BACKUP CHROME DEAD, ACTIVE CHROME STILL ALIVE
//         // ---------------------------------------------------------------------
//         if (activeBrowserAlive && !backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[⚠️] BACKUP CHROME DISCONNECTED - REBUILDING BACKUP');
//             console.log('==================================================\n');

//             try {
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 await createFreshBackupBrowser();
                
//                 isBackupRebuilding = true; 
//                 await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await initializeVideo(backupPage, true, false);
                
//                 backupWarmupTime = Date.now();
//                 lastBackupTime = -1; lastBackupDecodedFrames = -1; backupFrozenCheckTimestamp = Date.now(); 
//             } catch (e) {
//                 console.log(`[⚠️] Backup recovery failed: ${e.message}`);
//             } finally {
//                 isBackupRebuilding = false; 
//             }
//         }

//         // ---------------------------------------------------------------------
//         // CASE 3: BOTH CHROMES DEAD (RECOVERY MODE)
//         // ---------------------------------------------------------------------
//         if (!activeBrowserAlive && !backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[🚨] BOTH CHROME INSTANCES DISCONNECTED (LOCAL RECOVERY)');
//             console.log('==================================================\n');

//             try {
//                 currentUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 activeUrlStr = urlList[currentUrlIndex].url;

//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 await createFreshActiveBrowser();
//                 await activePage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await showLoadingUI(activePage, "SEARCHING SERVER", "Finding a stable stream connection...");
//                 await initializeVideo(activePage, false, true);
//                 await hideLoadingUI(activePage);

//                 try {
//                     await createFreshBackupBrowser();
//                     isBackupRebuilding = true; 
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                 } catch (backupError) {
//                     console.log(`[⚠️] Backup failed: ${backupError.message}`);
//                 } finally {
//                     isBackupRebuilding = false; 
//                 }

//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}

//                 streamSetupTime = Date.now(); currentStreamStartTime = Date.now(); backupWarmupTime = Date.now();
//                 frozenCheckTimestamp = Date.now(); lastActiveTime = -1; lastDecodedFrames = -1;
//                 lastBackupTime = -1; lastBackupDecodedFrames = -1; backupFrozenCheckTimestamp = Date.now();
//                 isWarmupPhase = true; isRecoveryUIShown = false;

//             } catch (e) {
//                 console.log(`[❌] Local Chrome recovery failed: ${e.message}`);
//                 await new Promise(r => setTimeout(r, 3000));
//             }
//             continue;
//         }

//         let activeHangThresholdMs = urlList[currentUrlIndex].hangTime;
//         let activeStatus = await checkPageStatus(activePage);
//         let backupStatus = { status: 'UNKNOWN' };

//         // =====================================================================
//         // 🛡️ HANDS-OFF BACKGROUND SHIELD & MONITORING
//         // =====================================================================
//         if (isBackupRebuilding) {
//             // Rebuilding, do nothing
//         } else {
//             if (!isWarmupPhase && (Date.now() - backupWarmupTime > 30000)) { 
//                 backupStatus = await checkPageStatus(backupPage);
                
//                 if (backupStatus.status === 'HEALTHY') {
//                     let isBackupTimeStuck = (backupStatus.currentTime === lastBackupTime);
//                     let isBackupFrameStuck = (backupStatus.decodedFrames === lastBackupDecodedFrames && backupStatus.decodedFrames > 0);

//                     if (isBackupTimeStuck || isBackupFrameStuck) {
//                         if (Date.now() - backupFrozenCheckTimestamp > activeHangThresholdMs) { 
//                             backupStatus.status = 'FROZEN'; 
//                         }
//                     } else {
//                         lastBackupTime = backupStatus.currentTime;
//                         lastBackupDecodedFrames = backupStatus.decodedFrames;
//                         backupFrozenCheckTimestamp = Date.now();
//                     }
//                 }

//                 if (backupStatus.status === 'DEAD' || backupStatus.status === 'CRITICAL_ERROR' || backupStatus.status === 'FROZEN') {
//                     console.log(`\n[⚠️] BACKGROUND SHIELD: Backup Server [${backupUrlIndex}] failed silently (Status: ${backupStatus.status}).`);
                    
//                     backupUrlIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//                     backupUrlStr = urlList[backupUrlIndex].url;
                    
//                     console.log(`[*] Shifting Backup Chrome to NEXT link -> Server [${backupUrlIndex}]`);
                    
//                     isBackupRebuilding = true; 
//                     try {
//                         await backupPage.goto('about:blank').catch(()=>{});
//                         await applyPreloadFirewall(backupPage);
//                         await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                         await initializeVideo(backupPage, true, false);
//                     } catch(e) {
//                         console.log(`[❌] Background Shield Rebuild failed: ${e.message}`);
//                     } finally {
//                         isBackupRebuilding = false; 
//                         backupWarmupTime = Date.now();
//                         lastBackupTime = -1; lastBackupDecodedFrames = -1; backupFrozenCheckTimestamp = Date.now(); 
//                     }
//                 }
//             }
//         }

//         if (activeStatus.status === 'HEALTHY' && !isWarmupPhase) {
//             let elapsedMs = Date.now() - currentStreamStartTime;
//             let isExempted = NO_REFRESH_DOMAINS.some(domain => activeUrlStr.includes(domain));

//             if (elapsedMs > FORCE_REFRESH_MS && !isExempted) {
//                 console.log(`\n[⏱️ PROACTIVE REFRESH]: Forcing swap to keep connection fresh...`);
//                 activeStatus.status = 'FORCE_REFRESH'; 
//             }
//         }

//         // Active Tab Audio Watchdog Fix
//         if (activeStatus.status === 'HEALTHY') {
//             await hideLoadingUI(activePage); 
//             isWarmupPhase = false; 

//             let isTimeStuck = (activeStatus.currentTime === lastActiveTime);
//             let isFrameStuck = (activeStatus.decodedFrames === lastDecodedFrames && activeStatus.decodedFrames > 0);

//             if (isTimeStuck || isFrameStuck) {
//                 if (!isRecoveryUIShown) {
//                     await showRecoveryUI(activePage);
//                     isRecoveryUIShown = true;
//                     console.log(`[⚠️] Stream Hang Detected! Showing Signal Recovery Shield instantly...`);
//                 }

//                 if (Date.now() - frozenCheckTimestamp > activeHangThresholdMs) {
//                     activeStatus.status = 'FROZEN';
//                     if (isFrameStuck && !isTimeStuck) {
//                         console.log(`[!] ⚠️ SYSTEM SHIELD: Detected Black Screen (Frames stuck). Triggering HOT-SWAP.`);
//                     }
//                     isRecoveryUIShown = false; 
//                 }
//             } else {
//                 lastActiveTime = activeStatus.currentTime; 
//                 lastDecodedFrames = activeStatus.decodedFrames; 
//                 frozenCheckTimestamp = Date.now();
                
//                 if (isRecoveryUIShown) {
//                     await hideRecoveryUI(activePage);
//                     isRecoveryUIShown = false;
//                     console.log(`[✅] Stream Recovered! Signal Recovery Shield removed instantly.`);
//                 }
                
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             frame.evaluate(() => { 
//                                 window.isStreamMuted = false;
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                                 document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                             }).catch(()=>{});
//                         }
//                     } catch(e) {}
//                 }
//             }
//         }

//         if (backupPage && !isBackupRebuilding) {
//             for (const frame of backupPage.frames()) {
//                 try {
//                     if (!frame.isDetached()) {
//                         frame.evaluate(() => { 
//                             window.isStreamMuted = true;
//                             document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); 
//                         }).catch(()=>{});
//                     }
//                 } catch(e) {}
//             }
//         }

//         watchdogTicks++;

//         if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
//             let logBackupStatus = backupStatus.status !== 'UNKNOWN' ? backupStatus : await checkPageStatus(backupPage);
//             let nextAfterBackupIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//             let nextAfterBackupUrl = urlList[nextAfterBackupIndex].url;
            
//             console.log(`\n==================================================`);
//             console.log(`[💓] ACTIVE HEARTBEAT (${activeBrowserName}): Status is ${activeStatus.status} | Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'} | Frames: ${activeStatus.decodedFrames !== undefined ? activeStatus.decodedFrames : 'N/A'} (Limit: ${activeHangThresholdMs/1000}s)`);
//             console.log(`[▶️] CURRENTLY LIVE              : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//             console.log(`--------------------------------------------------`);
//             console.log(`[🖤] BACKUP HEARTBEAT (${backupBrowserName}): Status is ${isBackupRebuilding ? 'REBUILDING' : logBackupStatus.status} | Time: ${logBackupStatus.currentTime ? logBackupStatus.currentTime.toFixed(1) + 's' : 'N/A'} | Frames: ${logBackupStatus.decodedFrames !== undefined ? logBackupStatus.decodedFrames : 'N/A'}`);
//             console.log(`[🔄] RUNNING IN BACKGROUND       : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//             console.log(`[⏭️] NEXT QUEUE (AFTER BACKUP)  : Server [${nextAfterBackupIndex}] -> ${nextAfterBackupUrl}`);
//             console.log(`==================================================\n`);
//         }

//         // =========================================================================================
//         // 🔄 2. ACTIVE TAB HOT-SWAP SHIELD 
//         // =========================================================================================
//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH') {
            
//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 console.log(`[⏳] Watchdog detected '${activeStatus.status}', but stream is in WARM-UP phase. Waiting...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             }

//             let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

//             if (!isProactiveRefresh) {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
//                 console.log(`==================================================`);
//             }
            
//             console.log(`[*] Checking Backup Tab status before switching...`);
            
//             if (backupStatus.status === 'HEALTHY' && !isProactiveRefresh && !isBackupRebuilding) {
                
//                 console.log('\n==================================================');
//                 console.log('[⚡] BACKUP STREAM ALREADY HEALTHY - PROMOTING INSTANTLY');
//                 console.log('==================================================');

//                 await showLoadingUI(backupPage, "RECONNECTING", "Establishing secure connection to backup server...");
//                 try { await backupPage.bringToFront(); } catch (e) {}

//                 let brokenPage = activePage; 
//                 activePage = backupPage; 
//                 backupPage = brokenPage;

//                 let brokenBrowser = activeBrowser; 
//                 activeBrowser = backupBrowser; 
//                 backupBrowser = brokenBrowser;

//                 let brokenName = activeBrowserName;
//                 activeBrowserName = backupBrowserName;
//                 backupBrowserName = brokenName;

//                 let previousActiveIndex = currentUrlIndex;
//                 currentUrlIndex = backupUrlIndex;
//                 activeUrlStr = urlList[currentUrlIndex].url; 
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             await frame.evaluate(() => { 
//                                 window.isStreamMuted = false;
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                             });
//                         }
//                     } catch(e) {}
//                 }

//                 lastActiveTime = -1; lastDecodedFrames = -1; frozenCheckTimestamp = Date.now();
//                 lastBackupTime = -1; lastBackupDecodedFrames = -1; backupFrozenCheckTimestamp = Date.now(); 
//                 isRecoveryUIShown = false; streamSetupTime = Date.now(); currentStreamStartTime = Date.now();
//                 isWarmupPhase = false; backupWarmupTime = Date.now() + 5000; 

//                 await new Promise(r => setTimeout(r, 1500));
//                 try { await hideLoadingUI(activePage); } catch(e) {}

//                 console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}]`);
                
//                 setTimeout(async () => {
//                     if (isBackupRebuilding) return; 
//                     isBackupRebuilding = true; 
//                     try {
//                         console.log(`[⏳] Starting background buffer rebuilding safely with MUTEX lock...`);
//                         await backupPage.goto('about:blank').catch(()=>{});
//                         await applyPreloadFirewall(backupPage);
//                         await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                         await initializeVideo(backupPage, true, false);
//                     } catch (e) {
//                         console.log(`[❌] Background buffer rebuild failed: ${e.message}`);
//                     } finally {
//                         isBackupRebuilding = false; 
//                         backupWarmupTime = Date.now();
//                         lastBackupTime = -1; lastBackupDecodedFrames = -1; backupFrozenCheckTimestamp = Date.now(); 
//                     }
//                 }, 3000); 
//             }

//             else if (isProactiveRefresh || (backupStatus.status === 'HEALTHY' && isProactiveRefresh)) {
                
//                 for (const frame of activePage.frames()) {
//                     try { if (!frame.isDetached()) await frame.evaluate(() => { window.isStreamMuted = true; }); } catch(e) {}
//                 }
                
//                 await showLoadingUI(backupPage, "REFRESHING CONNECTION", "Optimizing current server stream...");
//                 await backupPage.bringToFront();
//                 await new Promise(r => setTimeout(r, 1000)); 
//                 try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                 await initializeVideo(backupPage, false, true); 
//                 await hideLoadingUI(backupPage);

//                 let brokenPage = activePage; activePage = backupPage; backupPage = brokenPage;
//                 let brokenBrowser = activeBrowser; activeBrowser = backupBrowser; backupBrowser = brokenBrowser;
//                 let brokenName = activeBrowserName; activeBrowserName = backupBrowserName; backupBrowserName = brokenName;
                
//                 lastActiveTime = -1; frozenCheckTimestamp = Date.now(); isRecoveryUIShown = false; 
//                 lastBackupTime = -1; lastBackupDecodedFrames = -1; backupFrozenCheckTimestamp = Date.now(); 

//                 let previousActiveIndex = currentUrlIndex;
//                 currentUrlIndex = backupUrlIndex;
//                 activeUrlStr = urlList[currentUrlIndex].url; 
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[🔄] PROACTIVE REFRESH EXECUTED SUCCESSFULLY`);

//                 isBackupRebuilding = true; 
//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                 } catch (e) {
//                     console.log(`[⚠️] Proactive Refresh rebuild failed: ${e.message}`);
//                 } finally {
//                     isBackupRebuilding = false; 
//                     backupWarmupTime = Date.now();
//                     lastBackupTime = -1; lastBackupDecodedFrames = -1; backupFrozenCheckTimestamp = Date.now(); 
//                 }
                
//                 streamSetupTime = Date.now(); isWarmupPhase = true; currentStreamStartTime = Date.now();
//             }

//             // --------------------------------------------------------------------
//             // ❌ SCENARIO C: BOTH TABS FAILED
//             // --------------------------------------------------------------------
//             else {
//                 if (isBackupRebuilding) {
//                     console.log(`\n[⏳] HOLDING FIRE: Active is DEAD, but Backup is currently rebuilding...`);
//                     console.log(`[*] Initiating smart polling (Max 10s wait) for backup recovery...`);
                    
//                     let backupRecovered = false;
//                     let waitAttempts = 0;
                    
//                     while (waitAttempts < 10) { 
//                         if (!isBackupRebuilding) {
//                             let verifyStatus = await checkPageStatus(backupPage);
//                             if (verifyStatus.status === 'HEALTHY') {
//                                 backupRecovered = true;
//                                 break; 
//                             }
//                         }
//                         await new Promise(r => setTimeout(r, 1000));
//                         waitAttempts++;
//                     }

//                     if (backupRecovered) {
//                         console.log(`[✅] BACKUP SURVIVED THE REBUILD! Watchdog will promote it in the next cycle.`);
//                         continue; 
//                     } else {
//                         console.log(`[❌] BACKUP REBUILD FAILED OR TIMED OUT. Proceeding to total engine wipe.`);
//                     }
//                 }

//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ BOTH TABS FAILED (Active & Backup Compromised)`);
//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch (e) {}

//                 currentUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 activeUrlStr = urlList[currentUrlIndex].url;
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 try { await activePage.close(); } catch(e) {}
//                 try { await backupPage.close(); } catch(e) {}

//                 activePage = await activeBrowser.newPage();
//                 backupPage = await backupBrowser.newPage();

//                 await setupNetworkAdBlocker(activePage); await setupNetworkAdBlocker(backupPage);
//                 attachAntiAdListeners(activePage); attachAntiAdListeners(backupPage);
//                 await applyPreloadFirewall(activePage); await applyPreloadFirewall(backupPage);

//                 try {
//                     await activePage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 });
//                     await showLoadingUI(activePage, "SEARCHING SERVER", "Hunting for a stable connection...");
//                     await initializeVideo(activePage, false, true); 
//                     await hideLoadingUI(activePage);
//                 } catch(e) {}

//                 isBackupRebuilding = true; 
//                 try {
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{});
//                     await initializeVideo(backupPage, true, false); 
//                 } catch(e) {
//                 } finally {
//                     isBackupRebuilding = false; 
//                 }

//                 streamSetupTime = Date.now(); isWarmupPhase = true; currentStreamStartTime = Date.now();
//                 backupWarmupTime = Date.now(); lastActiveTime = -1; frozenCheckTimestamp = Date.now();
//                 lastBackupTime = -1; lastBackupDecodedFrames = -1; backupFrozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false;

//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//             }
//         } 
       
//         await new Promise(r => setTimeout(r, 2000)); 
//     }
// }


















// async function startDirectStreaming() {
//     activeBrowserName = "CHROME 1";
//     backupBrowserName = "CHROME 2";
    
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

//     browserArgs = [
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
//         '--disable-blink-features=AutomationControlled',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion,NetworkServiceInProcess2',
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

//     console.log(`[*] Starting ACTIVE browser instance...`);
//     activeBrowser = await createBrowserInstance(browserArgs);
//     const activePages = await activeBrowser.pages();
//     activePage = activePages[0];

//     console.log(`[*] Starting BACKUP browser instance in background...`);
//     backupBrowser = await createBrowserInstance(browserArgs);
//     const backupPages = await backupBrowser.pages();
//     backupPage = backupPages[0];

//     activeBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => { if (newPage && newPage !== activePage) { try { await newPage.close(); } catch(e) {} } }, 500);
//         }
//     });

//     backupBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => { if (newPage && newPage !== backupPage) { try { await newPage.close(); } catch(e) {} } }, 500);
//         }
//     });

//     await setupNetworkAdBlocker(activePage);
//     await setupNetworkAdBlocker(backupPage);

//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await applyPreloadFirewall(activePage);
//     await applyPreloadFirewall(backupPage);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex].url}`);
//     try {
//         await activePage.goto(urlList[currentUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 });
//     } catch (e) {
//         console.log(`[⚠️] Network buffer safely handled for primary URL.`);
//     }
    
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     await initializeVideo(activePage, false, true); 
//     await hideLoadingUI(activePage); 

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex].url}`);
//     try {
//         await backupPage.goto(urlList[backupUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 });
//     } catch (e) {}
    
//     await initializeVideo(backupPage, true, false);
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 
//     await hideLoadingUI(activePage);

//     console.log(`\n==================================================`);
//     console.log(`[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     console.log(`==================================================`);
//     console.log(`[📺] CURRENT ACTIVE LIVE : Server [${currentUrlIndex}] -> ${urlList[currentUrlIndex].url}`);
//     console.log(`[🔊] LIVE AUDIO STATUS   : ON (Unmuted)`);
//     console.log(`--------------------------------------------------`);
//     console.log(`[🛡️] NEXT BACKUP QUEUE   : Server [${backupUrlIndex}] -> ${urlList[backupUrlIndex].url}`);
//     console.log(`[🔇] BACKUP AUDIO STATUS : MUTED (Background)`);
//     console.log(`==================================================\n`);

//     console.log('[*] Everything Setup! Dual-Tab Monitoring is Active.');
//     await startWatchdog();
// }

// async function mainLoop() {
//     while (true) {
//         try {
//             await startDirectStreaming();
//         } catch (error) {
//             console.error('\n==================================================');
//             console.error('[🚨] FATAL ENGINE ERROR');
//             console.error(`[!] ${error.message}`);
//             console.error('==================================================');

//             if (activeBrowser && activeBrowser.isConnected()) {
//                 console.log('[🛡️] ACTIVE CHROME STILL ALIVE — NOT RESTARTING ENGINE.');
//                 await new Promise(resolve => setTimeout(resolve, 3000));
//                 continue;
//             }

//             if (backupBrowser && backupBrowser.isConnected()) {
//                 console.log('[🛡️] BACKUP CHROME STILL ALIVE — NOT RESTARTING ENGINE.');
//                 await new Promise(resolve => setTimeout(resolve, 3000));
//                 continue;
//             }

//             console.log('[⚠️] NO CHROME INSTANCE SURVIVED. Performing final recovery.');

//             try { if (activeBrowser) await activeBrowser.close().catch(() => {}); } catch (e) {}
//             try { if (backupBrowser) await backupBrowser.close().catch(() => {}); } catch (e) {}

//             activeBrowser = null; backupBrowser = null; activePage = null; backupPage = null;

//             await new Promise(resolve => setTimeout(resolve, 3000));
//             await cleanup();
//         }
//     }
// }

// async function cleanup() {
//     console.log('[*] Cleaning up resources...');
//     try { await obs.disconnect(); } catch (e) { } 
//     if (activeBrowser) { try { await activeBrowser.close(); } catch(e) { } activeBrowser = null; }
//     if (backupBrowser) { try { await backupBrowser.close(); } catch(e) { } backupBrowser = null; }
    
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
//             const targetUrls = process.env.TARGET_URLS || 'https://sport4u.online';
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























































// const puppeteer = require('puppeteer-extra');
// let isWarmupPhase = true;
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD (DEBUGGING MODE)
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     console.error('\n========================================');
//     console.error('[💥] UNCAUGHT EXCEPTION');
//     console.error(err);
//     console.error(err.stack);
//     console.error('========================================\n');
// });

// process.on('unhandledRejection', (reason) => {
//     console.error('\n========================================');
//     console.error('[💥] UNHANDLED REJECTION');
//     console.error(reason);
//     console.error('========================================\n');
// });

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME (IN MINUTES)
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 40000; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// // =========================================================================================
// // 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// // =========================================================================================
// const NO_REFRESH_DOMAINS = [
//     'youtube.com',
//     'facebook.com',
//     'streamed.pk',
//     'cricstreams.', 
//     'sport4u.online',
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

// // =========================================================================================
// // 🔄 DYNAMIC URL PARSER & METADATA EXTRACTOR
// // =========================================================================================
// let rawUrls = (process.env.TARGET_URLS || '').trim();
// let urlList = [];

// if (rawUrls !== '') {
//     urlList = rawUrls.split(',').map(u => {
//         let trimmed = u.trim();
//         let hangThreshold = 8000; 
        
//         if (trimmed.startsWith('!')) {
//             hangThreshold = 20000; 
//             trimmed = trimmed.substring(1); 
//         }
//         if (!trimmed.startsWith('http')) trimmed = 'https://' + trimmed;
        
//         return { url: trimmed, hangTime: hangThreshold };
//     });
// } else {
//     urlList = [
//         { url: 'https://sport4u.online', hangTime: 8000 },
//         { url: 'https://dadocric.st/player.php?id=starsp3&v=m', hangTime: 8000 }
//     ];
// }

// function getSafeBackupIndex(activeIndex, currentIndex, list) {
//     if (list.length <= 1) return 0; 
//     let next = (currentIndex + 1) % list.length;
//     if (next === activeIndex) {
//         next = (next + 1) % list.length; 
//     }
//     return next;
// }

// let currentUrlIndex = 0;
// let backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);

// const SELECTED_CHANNEL = process.env.OKRU_STREAM_ID || '1';
// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None'; 
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

// const ACTIVE_STREAM_KEY = STREAM_KEYS[SELECTED_CHANNEL] || STREAM_KEYS['1'];

// let browserArgs = []; // Global Browser Args for Recovery Functions
// let activeBrowser = null;
// let backupBrowser = null;
// let activeBrowserName = "CHROME 1";
// let backupBrowserName = "CHROME 2";
// let obsProcess = null;
// let activePage = null;
// let backupPage = null;


// async function createBrowserInstance(args) {
//     return await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: args
//     });
// }

// // =========================================================================================
// // 🛡️ SMART BROWSER RECOVERY
// // =========================================================================================

// async function preparePage(page) {
//     if (!page) return;
//     await setupNetworkAdBlocker(page);
//     attachAntiAdListeners(page);
//     await applyPreloadFirewall(page);
// }

// async function createFreshBackupBrowser() {
//     console.log('\n[🛠️] BACKUP RECOVERY: Creating fresh backup Chrome...');
//     try {
//         if (backupBrowser && backupBrowser.isConnected()) {
//             try {
//                 const pages = await backupBrowser.pages();
//                 for (const p of pages) {
//                     try { await p.close(); } catch (e) {}
//                 }
//             } catch (e) {}
//         }
//     } catch (e) {}

//     try {
//         if (backupBrowser && !backupBrowser.isConnected()) {
//             backupBrowser = null;
//         }
//     } catch (e) {
//         backupBrowser = null;
//     }

//     backupBrowser = await createBrowserInstance(browserArgs);
//     const pages = await backupBrowser.pages();
//     backupPage = pages[0];
//     await preparePage(backupPage);

//     backupBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             try {
//                 const newPage = await target.page();
//                 setTimeout(async () => {
//                     if (newPage && newPage !== backupPage) {
//                         try { await newPage.close(); } catch (e) {}
//                     }
//                 }, 500);
//             } catch (e) {}
//         }
//     });

//     console.log('[✅] BACKUP RECOVERY: Fresh backup Chrome created.');
//     return true;
// }

// async function createFreshActiveBrowser() {
//     console.log('\n[🛠️] ACTIVE RECOVERY: Creating fresh active Chrome...');
//     try {
//         if (activeBrowser && activeBrowser.isConnected()) {
//             try {
//                 const pages = await activeBrowser.pages();
//                 for (const p of pages) {
//                     try { await p.close(); } catch (e) {}
//                 }
//             } catch (e) {}
//         }
//     } catch (e) {}

//     try {
//         if (activeBrowser && !activeBrowser.isConnected()) {
//             activeBrowser = null;
//         }
//     } catch (e) {
//         activeBrowser = null;
//     }

//     activeBrowser = await createBrowserInstance(browserArgs);
//     const pages = await activeBrowser.pages();
//     activePage = pages[0];
//     await preparePage(activePage);

//     activeBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             try {
//                 const newPage = await target.page();
//                 setTimeout(async () => {
//                     if (newPage && newPage !== activePage) {
//                         try { await newPage.close(); } catch (e) {}
//                     }
//                 }, 500);
//             } catch (e) {}
//         }
//     });

//     console.log('[✅] ACTIVE RECOVERY: Fresh active Chrome created.');
//     return true;
// }

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
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') {
//                     init.mode = 'open'; 
//                 }
//                 const shadowRoot = originalAttachShadow.call(this, init);
                
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) {
//                         console.log('[🛡️] SHIELD: Shadow DOM Ad Detected & Destroyed!');
//                         this.remove(); 
//                     }
//                 });
                
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };
            
//             Element.prototype.attachShadow.toString = function() { return "function attachShadow() { [native code] }"; };

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
//                 in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }
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
//                             .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
//                             @keyframes blinker { 50% { opacity: 0.3; } }
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

// async function showRecoveryUI(page) {
//     try {
//         await page.evaluate(() => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('stream-recovery-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 return;
//             }
            
//             overlay = document.createElement('div');
//             overlay.id = 'stream-recovery-overlay';
//             overlay.innerHTML = `
//                 <style>
//                     #stream-recovery-overlay {
//                         position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                         width: 100vw !important; height: 100vh !important; background: rgba(0, 0, 0, 0.95) !important;
//                         z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                         justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                         font-family: Arial, sans-serif !important; pointer-events: all !important; backdrop-filter: blur(8px);
//                     }
//                     .recovery-radar {
//                         width: 100px; height: 100px; border-radius: 50%;
//                         border: 3px solid transparent; border-top-color: #ff9800; border-bottom-color: #ff9800;
//                         animation: radar-spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
//                         margin-bottom: 20px; box-shadow: 0 0 30px rgba(255, 152, 0, 0.3);
//                     }
//                     .recovery-radar::before {
//                         content: ''; position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px;
//                         border-radius: 50%; border: 3px solid transparent; border-left-color: #f44336; border-right-color: #f44336;
//                         animation: radar-spin 2s linear infinite reverse;
//                     }
//                     @keyframes radar-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                     .warn-title { font-size: 32px !important; font-weight: 800 !important; color: #ff9800 !important; letter-spacing: 2px !important; margin-bottom: 10px !important; text-transform: uppercase !important; }
//                     .warn-sub { font-size: 18px !important; color: #dddddd !important; animation: pulse-text 1.5s infinite; }
//                     @keyframes pulse-text { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
//                 </style>
//                 <div class="recovery-radar"></div>
//                 <div class="warn-title">SIGNAL LOST</div>
//                 <div class="warn-sub">Attempting Auto-Recovery...</div>
//             `;
//             document.documentElement.appendChild(overlay);
//         });
//     } catch (e) {}
// }

// async function hideRecoveryUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('stream-recovery-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'none', 'important');
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
    
//     const basicIniContent = `[General]\nName=Untitled\n[Video]\nBaseCX=${RES_W}\nBaseCY=${RES_H}\nOutputCX=${RES_W}\nOutputCY=${RES_H}\nFPSCommon=30\n[Output]\nMode=Simple\n[SimpleOutput]\nVBitrate=${BITRATE}\nStreamEncoder=x264\nx264Preset=ultrafast\nx264Settings=keyint=60 tune=zerolatency profile=main threads=4 rc-lookahead=0\n`;
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
//                             // await takeAndBatchScreenshot(page, `play-btn-clicked`);
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
//                             // await takeAndBatchScreenshot(page, `force-play-applied`);
//                             isVideoPlaying = true;
//                             break;
//                         }
//                     }
//                 } catch (err) {}
//             }
//             if (!isVideoPlaying) await new Promise(r => setTimeout(r, 2000));
//             attempts++;
//         }


//         // ===============================
// // =================


//                 // =====================================================================================
//         // 🎯 FINAL SMART PLAYER DETECTOR
//         // ALL FRAMES
//         //      ↓
//         // ALL VIDEOS CONCURRENTLY
//         //      ↓
//         // REAL FRAME ACTIVITY
//         //      ↓
//         // WINNER SCORING
//         //      ↓
//         // SECOND VERIFICATION
//         //      ↓
//         // SAFE TOP-LEVEL IFRAME MAPPING
//         // =====================================================================================

//         console.log('[*] Scanning ALL frames using final behavioral stream detection...');

//         let targetFrame = null;
//         let bestIframeHandle = null;
//         let maxScore = -Infinity;

//         // -----------------------------------------------------------------------------
//         // STEP 1: Inspect ONE video inside ONE specific frame
//         // -----------------------------------------------------------------------------
//         // IMPORTANT:
//         // frame is explicitly passed in.
//         // This fixes the previous ReferenceError bug.
//         // -----------------------------------------------------------------------------
//         const inspectVideoInFrame = async (frame, videoIndex) => {
//             try {
//                 return await frame.evaluate(async (index) => {

//                     const videos = Array.from(
//                         document.querySelectorAll('video')
//                     );

//                     const video = videos[index];

//                     if (!video) return null;

//                     const width = video.clientWidth;
//                     const height = video.clientHeight;

//                     // Ignore tracking pixels / tiny hidden videos
//                     if (width < 50 || height < 50) {
//                         return null;
//                     }

//                     const initialTime = Number.isFinite(video.currentTime)
//                         ? video.currentTime
//                         : 0;

//                     const initialPaused = video.paused;
//                     const initialReadyState = video.readyState;

//                     let initialTotalFrames = 0;

//                     try {
//                         if (
//                             typeof video.getVideoPlaybackQuality === 'function'
//                         ) {
//                             const quality =
//                                 video.getVideoPlaybackQuality();

//                             if (Number.isFinite(quality.totalVideoFrames)) {
//                                 initialTotalFrames =
//                                     quality.totalVideoFrames;
//                             }
//                         }
//                     } catch (e) {}

//                     let callbackCount = 0;
//                     let firstPresentedFrames = null;
//                     let lastPresentedFrames = null;

//                     let callbackId = null;
//                     let timeoutId = null;
//                     let finished = false;

//                     const hasRVFC =
//                         typeof video.requestVideoFrameCallback === 'function' &&
//                         typeof video.cancelVideoFrameCallback === 'function';

//                     // -----------------------------------------------------------------
//                     // Observe actual compositor frame activity
//                     // -----------------------------------------------------------------
//                     await new Promise(resolve => {

//                         const finish = () => {

//                             if (finished) return;

//                             finished = true;

//                             if (timeoutId !== null) {
//                                 clearTimeout(timeoutId);
//                                 timeoutId = null;
//                             }

//                             if (
//                                 callbackId !== null &&
//                                 typeof video.cancelVideoFrameCallback === 'function'
//                             ) {
//                                 try {
//                                     video.cancelVideoFrameCallback(
//                                         callbackId
//                                     );
//                                 } catch (e) {}
//                             }

//                             resolve();
//                         };

//                         const onVideoFrame = (now, metadata) => {

//                             if (finished) return;

//                             callbackCount++;

//                             if (
//                                 metadata &&
//                                 Number.isFinite(
//                                     metadata.presentedFrames
//                                 )
//                             ) {

//                                 if (firstPresentedFrames === null) {
//                                     firstPresentedFrames =
//                                         metadata.presentedFrames;
//                                 }

//                                 lastPresentedFrames =
//                                     metadata.presentedFrames;
//                             }

//                             // Enough evidence collected
//                             if (callbackCount >= 8) {
//                                 finish();
//                                 return;
//                             }

//                             try {
//                                 callbackId =
//                                     video.requestVideoFrameCallback(
//                                         onVideoFrame
//                                     );
//                             } catch (e) {
//                                 finish();
//                             }
//                         };

//                         // Maximum observation window
//                         timeoutId = setTimeout(() => {
//                             finish();
//                         }, 900);

//                         if (
//                             hasRVFC &&
//                             !video.ended
//                         ) {
//                             try {

//                                 callbackId =
//                                     video.requestVideoFrameCallback(
//                                         onVideoFrame
//                                     );

//                             } catch (e) {
//                                 finish();
//                             }

//                         } else {

//                             // Fallback when RVFC is unavailable
//                             timeoutId = setTimeout(() => {
//                                 finish();
//                             }, 850);
//                         }
//                     });

//                     const finalTime =
//                         Number.isFinite(video.currentTime)
//                             ? video.currentTime
//                             : 0;

//                     let finalTotalFrames = initialTotalFrames;

//                     try {
//                         if (
//                             typeof video.getVideoPlaybackQuality === 'function'
//                         ) {

//                             const quality =
//                                 video.getVideoPlaybackQuality();

//                             if (
//                                 Number.isFinite(
//                                     quality.totalVideoFrames
//                                 )
//                             ) {
//                                 finalTotalFrames =
//                                     quality.totalVideoFrames;
//                             }
//                         }
//                     } catch (e) {}

//                     const rvfcPresentedDelta =
//                         (
//                             firstPresentedFrames !== null &&
//                             lastPresentedFrames !== null
//                         )
//                             ? Math.max(
//                                 0,
//                                 lastPresentedFrames -
//                                 firstPresentedFrames
//                             )
//                             : 0;

//                     const playbackQualityDelta =
//                         Math.max(
//                             0,
//                             finalTotalFrames -
//                             initialTotalFrames
//                         );

//                     const currentTimeDelta =
//                         Math.max(
//                             0,
//                             finalTime -
//                             initialTime
//                         );

//                     const computedStyle =
//                         window.getComputedStyle(video);

//                     const visible =
//                         width > 0 &&
//                         height > 0 &&
//                         computedStyle.display !== 'none' &&
//                         computedStyle.visibility !== 'hidden' &&
//                         computedStyle.opacity !== '0';

//                     return {
//                         index,

//                         width,
//                         height,

//                         duration: video.duration,

//                         paused: video.paused,
//                         ended: video.ended,
//                         readyState: video.readyState,

//                         initialPaused,
//                         initialReadyState,

//                         currentTime: finalTime,
//                         currentTimeDelta,

//                         callbackCount,

//                         rvfcPresentedDelta,
//                         playbackQualityDelta,

//                         totalVideoFrames: finalTotalFrames,

//                         visible
//                     };

//                 }, videoIndex);

//             } catch (e) {

//                 return null;
//             }
//         };

//         // -----------------------------------------------------------------------------
//         // STEP 2: Inspect ALL page frames concurrently
//         // -----------------------------------------------------------------------------
//         const frameCandidates = [];

//         const framePromises = page.frames().map(async (frame) => {

//             try {

//                 if (frame.isDetached()) {
//                     return;
//                 }

//                 const videoCount =
//                     await frame.evaluate(() => {
//                         return document.querySelectorAll(
//                             'video'
//                         ).length;
//                     }).catch(() => 0);

//                 if (videoCount === 0) {
//                     return;
//                 }

//                 // -------------------------------------------------------------
//                 // ALL videos in THIS frame run concurrently
//                 // -------------------------------------------------------------
//                 const videoPromises = Array.from(
//                     { length: videoCount },
//                     (_, index) =>
//                         inspectVideoInFrame(frame, index)
//                 );

//                 const videoStats =
//                     (await Promise.all(videoPromises))
//                         .filter(Boolean);

//                 if (videoStats.length > 0) {

//                     frameCandidates.push({
//                         frame,
//                         videos: videoStats
//                     });
//                 }

//             } catch (e) {

//                 // Detached / inaccessible frame:
//                 // simply skip it.
//             }
//         });

//         await Promise.all(framePromises);

//         // -----------------------------------------------------------------------------
//         // STEP 3: Rank ALL candidate videos
//         // -----------------------------------------------------------------------------
//         for (const candidate of frameCandidates) {

//             for (const stats of candidate.videos) {

//                 // Hard reject only unusable video objects
//                 if (
//                     !stats.visible ||
//                     stats.width < 50 ||
//                     stats.height < 50 ||
//                     stats.ended
//                 ) {
//                     continue;
//                 }

//                 let score = 0;

//                 const area =
//                     stats.width *
//                     stats.height;

//                 // -------------------------------------------------------------
//                 // Physical size
//                 // -------------------------------------------------------------
//                 score += area / 1000;

//                 // -------------------------------------------------------------
//                 // Playback state
//                 // -------------------------------------------------------------
//                 if (!stats.paused) {
//                     score += 7000;
//                 }

//                 // readyState:
//                 // 2 = HAVE_CURRENT_DATA
//                 // 3 = HAVE_FUTURE_DATA
//                 // 4 = HAVE_ENOUGH_DATA
//                 if (stats.readyState >= 3) {
//                     score += 6000;
//                 }

//                 // -------------------------------------------------------------
//                 // CurrentTime really moved
//                 // -------------------------------------------------------------
//                 if (stats.currentTimeDelta > 0.05) {
//                     score += 12000;
//                 }

//                 // -------------------------------------------------------------
//                 // RVFC callback actually fired
//                 // -------------------------------------------------------------
//                 if (stats.callbackCount > 0) {
//                     score += 10000;
//                 }

//                 // -------------------------------------------------------------
//                 // Strong compositor activity signal
//                 // -------------------------------------------------------------
//                 if (stats.rvfcPresentedDelta > 0) {

//                     score += 25000;

//                     // More presented frames = slightly stronger
//                     score += Math.min(
//                         stats.rvfcPresentedDelta * 500,
//                         15000
//                     );
//                 }

//                 // -------------------------------------------------------------
//                 // Playback-quality fallback signal
//                 // -------------------------------------------------------------
//                 if (stats.playbackQualityDelta > 0) {
//                     score += 15000;
//                 }

//                 // -------------------------------------------------------------
//                 // Landscape preference
//                 // -------------------------------------------------------------
//                 if (stats.width > stats.height) {
//                     score += 4000;
//                 } else {
//                     score -= 5000;
//                 }

//                 // -------------------------------------------------------------
//                 // Duration is ONLY a weak hint
//                 // NEVER reject a stream because of duration.
//                 // -------------------------------------------------------------
//                 if (
//                     Number.isFinite(stats.duration) &&
//                     stats.duration > 0 &&
//                     stats.duration <= 120
//                 ) {
//                     score -= 1000;
//                 }

//                 // Long / Infinity duration is only a small positive hint
//                 if (
//                     !Number.isFinite(stats.duration) ||
//                     stats.duration > 3600
//                 ) {
//                     score += 1500;
//                 }

//                 // -------------------------------------------------------------
//                 // Winner
//                 // -------------------------------------------------------------
//                 if (score > maxScore) {

//                     maxScore = score;
//                     targetFrame = candidate.frame;
//                 }
//             }
//         }

//         // -----------------------------------------------------------------------------
//         // STEP 4: SECOND VERIFICATION
//         // -----------------------------------------------------------------------------
//         // We do NOT trust the first scan alone.
//         // This prevents many temporary/video-ad false positives.
//         // -----------------------------------------------------------------------------

//         if (targetFrame && maxScore > 0) {

//             console.log(
//                 `[+] Candidate selected. Score: ${Math.floor(maxScore)}`
//             );

//             try {

//                 const verification =
//                     await targetFrame.evaluate(async () => {

//                         const videos =
//                             Array.from(
//                                 document.querySelectorAll('video')
//                             ).filter(video =>
//                                 video.clientWidth >= 50 &&
//                                 video.clientHeight >= 50 &&
//                                 !video.ended
//                             );

//                         if (!videos.length) {

//                             return {
//                                 verified: false
//                             };
//                         }

//                         // Pick largest useful video in the VERIFIED frame
//                         const video =
//                             videos.sort(
//                                 (a, b) =>
//                                     (b.clientWidth * b.clientHeight) -
//                                     (a.clientWidth * a.clientHeight)
//                             )[0];

//                         const startTime =
//                             Number.isFinite(video.currentTime)
//                                 ? video.currentTime
//                                 : 0;

//                         let startTotalFrames = 0;

//                         try {

//                             if (
//                                 typeof video.getVideoPlaybackQuality ===
//                                 'function'
//                             ) {

//                                 const q =
//                                     video.getVideoPlaybackQuality();

//                                 if (
//                                     Number.isFinite(
//                                         q.totalVideoFrames
//                                     )
//                                 ) {
//                                     startTotalFrames =
//                                         q.totalVideoFrames;
//                                 }
//                             }

//                         } catch (e) {}

//                         let callbackCount = 0;

//                         let firstPresentedFrames = null;
//                         let lastPresentedFrames = null;

//                         let callbackId = null;
//                         let timeoutId = null;
//                         let finished = false;

//                         await new Promise(resolve => {

//                             const finish = () => {

//                                 if (finished) {
//                                     return;
//                                 }

//                                 finished = true;

//                                 if (timeoutId !== null) {
//                                     clearTimeout(timeoutId);
//                                     timeoutId = null;
//                                 }

//                                 if (
//                                     callbackId !== null &&
//                                     typeof video.cancelVideoFrameCallback ===
//                                     'function'
//                                 ) {

//                                     try {
//                                         video.cancelVideoFrameCallback(
//                                             callbackId
//                                         );
//                                     } catch (e) {}
//                                 }

//                                 resolve();
//                             };

//                             const onFrame = (
//                                 now,
//                                 metadata
//                             ) => {

//                                 if (finished) {
//                                     return;
//                                 }

//                                 callbackCount++;

//                                 if (
//                                     metadata &&
//                                     Number.isFinite(
//                                         metadata.presentedFrames
//                                     )
//                                 ) {

//                                     if (
//                                         firstPresentedFrames === null
//                                     ) {
//                                         firstPresentedFrames =
//                                             metadata.presentedFrames;
//                                     }

//                                     lastPresentedFrames =
//                                         metadata.presentedFrames;
//                                 }

//                                 if (callbackCount >= 4) {

//                                     finish();
//                                     return;
//                                 }

//                                 try {

//                                     callbackId =
//                                         video.requestVideoFrameCallback(
//                                             onFrame
//                                         );

//                                 } catch (e) {

//                                     finish();
//                                 }
//                             };

//                             timeoutId =
//                                 setTimeout(
//                                     finish,
//                                     700
//                                 );

//                             if (
//                                 typeof video.requestVideoFrameCallback ===
//                                 'function' &&
//                                 !video.ended
//                             ) {

//                                 try {

//                                     callbackId =
//                                         video.requestVideoFrameCallback(
//                                             onFrame
//                                         );

//                                 } catch (e) {

//                                     finish();
//                                 }

//                             } else {

//                                 // No RVFC support
//                                 finish();
//                             }
//                         });

//                         const endTime =
//                             Number.isFinite(video.currentTime)
//                                 ? video.currentTime
//                                 : 0;

//                         let endTotalFrames =
//                             startTotalFrames;

//                         try {

//                             if (
//                                 typeof video.getVideoPlaybackQuality ===
//                                 'function'
//                             ) {

//                                 const q =
//                                     video.getVideoPlaybackQuality();

//                                 if (
//                                     Number.isFinite(
//                                         q.totalVideoFrames
//                                     )
//                                 ) {

//                                     endTotalFrames =
//                                         q.totalVideoFrames;
//                                 }
//                             }

//                         } catch (e) {}

//                         const presentedFrameDelta =
//                             (
//                                 firstPresentedFrames !== null &&
//                                 lastPresentedFrames !== null
//                             )
//                                 ? Math.max(
//                                     0,
//                                     lastPresentedFrames -
//                                     firstPresentedFrames
//                                 )
//                                 : 0;

//                         const playbackQualityDelta =
//                             Math.max(
//                                 0,
//                                 endTotalFrames -
//                                 startTotalFrames
//                             );

//                         const currentTimeDelta =
//                             Math.max(
//                                 0,
//                                 endTime -
//                                 startTime
//                             );

//                         // A candidate is considered verified if at least
//                         // one strong activity signal exists.
//                         const hasRealActivity =
//                             callbackCount > 0 ||
//                             presentedFrameDelta > 0 ||
//                             playbackQualityDelta > 0 ||
//                             currentTimeDelta > 0.05;

//                         return {

//                             verified:
//                                 !video.paused &&
//                                 !video.ended &&
//                                 video.readyState >= 2 &&
//                                 hasRealActivity,

//                             callbackCount,

//                             presentedFrameDelta,

//                             playbackQualityDelta,

//                             currentTimeDelta,

//                             width:
//                                 video.clientWidth,

//                             height:
//                                 video.clientHeight
//                         };

//                     }).catch(() => ({
//                         verified: false
//                     }));

//                 if (!verification.verified) {

//                     console.log(
//                         '[⚠️] Candidate failed second verification. '
//                         + 'No iframe isolation will be applied.'
//                     );

//                     targetFrame = null;
//                     bestIframeHandle = null;
//                     maxScore = -Infinity;

//                 } else {

//                     console.log(
//                         `[✅] REAL VIDEO VERIFIED | ` +
//                         `${verification.width}x${verification.height} | ` +
//                         `Presented Δ: ${verification.presentedFrameDelta} | ` +
//                         `Time Δ: ${verification.currentTimeDelta.toFixed(3)}s`
//                     );
//                 }

//             } catch (e) {

//                 console.log(
//                     '[⚠️] Winner verification failed safely. '
//                     + 'No iframe isolation will be applied.'
//                 );

//                 targetFrame = null;
//                 bestIframeHandle = null;
//                 maxScore = -Infinity;
//             }
//         }

//         // -----------------------------------------------------------------------------
//         // STEP 5: MAP DEEP FRAME TO TOP-LEVEL IFRAME
//         // -----------------------------------------------------------------------------

//         if (targetFrame) {

//             try {

//                 let topLevelFrame = targetFrame;
//                 let parent = topLevelFrame.parentFrame();

//                 while (
//                     parent &&
//                     parent !== page.mainFrame()
//                 ) {

//                     topLevelFrame = parent;
//                     parent = topLevelFrame.parentFrame();
//                 }

//                 // Video is directly in the main page.
//                 if (
//                     topLevelFrame ===
//                     page.mainFrame()
//                 ) {

//                     console.log(
//                         '[✅] Real video is inside MAIN FRAME.'
//                     );

//                     bestIframeHandle = null;

//                 } else {

//                     bestIframeHandle =
//                         await topLevelFrame.frameElement();

//                     if (!bestIframeHandle) {
//                         throw new Error(
//                             'Top-level iframe handle is null.'
//                         );
//                     }

//                     console.log(
//                         '[✅] Real stream mapped to TOP-LEVEL iframe.'
//                     );
//                 }

//             } catch (e) {

//                 console.log(
//                     `[⚠️] Frame-to-iframe mapping failed: ${e.message}`
//                 );

//                 bestIframeHandle = null;
//             }

//         } else {

//             console.log(
//                 '[⚠️] No confidently verified stream frame found.'
//             );
//         }

//         // -----------------------------------------------------------------------------
//         // STEP 6: SAFE IFRAME ISOLATION
//         // -----------------------------------------------------------------------------
//         // IMPORTANT:
//         // If no iframe was confidently identified, nothing is hidden.
//         // This prevents accidental black-screen behavior.
//         // -----------------------------------------------------------------------------




// // =============================================================================
// // 🎥 FINAL INNER-PLAYER FULLSCREEN ENGINE
// // IMPORTANT:
// // The parent page cannot style elements inside an iframe.
// // Therefore we MUST style the already-verified targetFrame directly.
// // =============================================================================

//         // =========================================================================
//         // 🎬 FINAL VIEWPORT ENGINE
//         // PARENT IFRAME + INNER PLAYER + CAROUSEL/TRAP BREAKER
//         // =========================================================================

//         // =========================================================================
//         // STEP 6A: PARENT PAGE / TOP-LEVEL IFRAME FULLSCREEN
//         // =========================================================================
//         if (bestIframeHandle) {

//             await page.evaluate((mainIframe) => {

//                 // Prevent duplicate parent isolation loops
//                 if (window.__smartIframeIsolationInterval) {
//                     clearInterval(
//                         window.__smartIframeIsolationInterval
//                     );
//                     window.__smartIframeIsolationInterval = null;
//                 }

//                 const breakContainingBlockChain = () => {

//                     let node = mainIframe.parentElement;

//                     while (
//                         node &&
//                         node !== document.documentElement
//                     ) {
//                         try {

//                             // CSS properties that can create a containing
//                             // block for position: fixed descendants.
//                             node.style.setProperty(
//                                 'transform',
//                                 'none',
//                                 'important'
//                             );

//                             node.style.setProperty(
//                                 'perspective',
//                                 'none',
//                                 'important'
//                             );

//                             node.style.setProperty(
//                                 'filter',
//                                 'none',
//                                 'important'
//                             );

//                             node.style.setProperty(
//                                 'backdrop-filter',
//                                 'none',
//                                 'important'
//                             );

//                             node.style.setProperty(
//                                 'contain',
//                                 'none',
//                                 'important'
//                             );

//                             node.style.setProperty(
//                                 'clip-path',
//                                 'none',
//                                 'important'
//                             );

//                             node.style.setProperty(
//                                 'will-change',
//                                 'auto',
//                                 'important'
//                             );

//                             // Remove carousel clipping
//                             node.style.setProperty(
//                                 'overflow',
//                                 'visible',
//                                 'important'
//                             );

//                             node.style.setProperty(
//                                 'overflow-x',
//                                 'visible',
//                                 'important'
//                             );

//                             node.style.setProperty(
//                                 'overflow-y',
//                                 'visible',
//                                 'important'
//                             );

//                         } catch (e) {}

//                         node = node.parentElement;
//                     }
//                 };

//                 const applyParentFullscreen = () => {

//                     try {

//                         if (
//                             !mainIframe ||
//                             !mainIframe.isConnected
//                         ) {
//                             return;
//                         }

//                         // Break transformed carousel/container chain
//                         breakContainingBlockChain();

//                         // ---------------------------------------------------------
//                         // Root document
//                         // ---------------------------------------------------------
//                         document.documentElement.style.setProperty(
//                             'width',
//                             '100%',
//                             'important'
//                         );

//                         document.documentElement.style.setProperty(
//                             'height',
//                             '100%',
//                             'important'
//                         );

//                         document.documentElement.style.setProperty(
//                             'margin',
//                             '0',
//                             'important'
//                         );

//                         document.documentElement.style.setProperty(
//                             'padding',
//                             '0',
//                             'important'
//                         );

//                         document.documentElement.style.setProperty(
//                             'background',
//                             'black',
//                             'important'
//                         );

//                         document.documentElement.style.setProperty(
//                             'overflow',
//                             'hidden',
//                             'important'
//                         );

//                         // ---------------------------------------------------------
//                         // Body
//                         // ---------------------------------------------------------
//                         if (document.body) {

//                             document.body.style.setProperty(
//                                 'width',
//                                 '100%',
//                                 'important'
//                             );

//                             document.body.style.setProperty(
//                                 'height',
//                                 '100%',
//                                 'important'
//                             );

//                             document.body.style.setProperty(
//                                 'margin',
//                                 '0',
//                                 'important'
//                             );

//                             document.body.style.setProperty(
//                                 'padding',
//                                 '0',
//                                 'important'
//                             );

//                             document.body.style.setProperty(
//                                 'background',
//                                 'black',
//                                 'important'
//                             );

//                             // Do not clip the fixed iframe.
//                             document.body.style.setProperty(
//                                 'overflow',
//                                 'visible',
//                                 'important'
//                             );
//                         }

//                         // ---------------------------------------------------------
//                         // Hide OTHER top-level iframes
//                         // ---------------------------------------------------------
//                         const allIframes =
//                             Array.from(
//                                 document.querySelectorAll('iframe')
//                             );

//                         for (const iframe of allIframes) {

//                             if (iframe === mainIframe) {
//                                 continue;
//                             }

//                             try {

//                                 iframe.style.setProperty(
//                                     'display',
//                                     'none',
//                                     'important'
//                                 );

//                                 iframe.style.setProperty(
//                                     'visibility',
//                                     'hidden',
//                                     'important'
//                                 );

//                                 iframe.style.setProperty(
//                                     'opacity',
//                                     '0',
//                                     'important'
//                                 );

//                                 iframe.style.setProperty(
//                                     'pointer-events',
//                                     'none',
//                                     'important'
//                                 );

//                                 iframe.style.setProperty(
//                                     'z-index',
//                                     '-9999',
//                                     'important'
//                                 );

//                             } catch (e) {}
//                         }

//                         // ---------------------------------------------------------
//                         // THE VERIFIED TOP-LEVEL IFRAME
//                         // ---------------------------------------------------------
//                         mainIframe.style.setProperty(
//                             'position',
//                             'fixed',
//                             'important'
//                         );

//                         mainIframe.style.setProperty(
//                             'top',
//                             '0px',
//                             'important'
//                         );

//                         mainIframe.style.setProperty(
//                             'left',
//                             '0px',
//                             'important'
//                         );

//                         mainIframe.style.setProperty(
//                             'right',
//                             '0px',
//                             'important'
//                         );

//                         mainIframe.style.setProperty(
//                             'bottom',
//                             '0px',
//                             'important'
//                         );

//                         mainIframe.style.setProperty(
//                             'width',
//                             '100vw',
//                             'important'
//                         );

//                         mainIframe.style.setProperty(
//                             'height',
//                             '100vh',
//                             'important'
//                         );

//                         mainIframe.style.setProperty(
//                             'min-width',
//                             '100vw',
//                             'important'
//                         );

//                         mainIframe.style.setProperty(
//                             'min-height',
//                             '100vh',
//                             'important'
//                         );

//                         mainIframe.style.setProperty(
//                             'max-width',
//                             'none',
//                             'important'
//                         );

//                         mainIframe.style.setProperty(
//                             'max-height',
//                             'none',
//                             'important'
//                         );

//                         mainIframe.style.setProperty(
//                             'margin',
//                             '0',
//                             'important'
//                         );

//                         mainIframe.style.setProperty(
//                             'padding',
//                             '0',
//                             'important'
//                         );

//                         mainIframe.style.setProperty(
//                             'border',
//                             '0',
//                             'important'
//                         );

//                         mainIframe.style.setProperty(
//                             'display',
//                             'block',
//                             'important'
//                         );

//                         mainIframe.style.setProperty(
//                             'visibility',
//                             'visible',
//                             'important'
//                         );

//                         mainIframe.style.setProperty(
//                             'opacity',
//                             '1',
//                             'important'
//                         );

//                         mainIframe.style.setProperty(
//                             'background',
//                             'black',
//                             'important'
//                         );

//                         mainIframe.style.setProperty(
//                             'overflow',
//                             'hidden',
//                             'important'
//                         );

//                         mainIframe.style.setProperty(
//                             'z-index',
//                             '2147483645',
//                             'important'
//                         );

//                     } catch (err) {}
//                 };

//                 // Apply immediately
//                 applyParentFullscreen();

//                 // Re-apply because carousel/player frameworks can
//                 // restore their original layout later.
//                 window.__smartIframeIsolationInterval =
//                     setInterval(
//                         applyParentFullscreen,
//                         500
//                     );

//             }, bestIframeHandle).catch(() => {});
//         }


//         // =========================================================================
//         // STEP 6B: INNER FRAME / ACTUAL VIDEO FULLSCREEN
//         // =========================================================================
//         if (targetFrame) {

//             try {

//                 await targetFrame.evaluate(() => {

//                     // Prevent duplicate inner fullscreen loops
//                     if (window.__smartVideoFullscreenInterval) {

//                         clearInterval(
//                             window.__smartVideoFullscreenInterval
//                         );

//                         window.__smartVideoFullscreenInterval = null;
//                     }

//                     const findBestVideo = () => {

//                         const videos =
//                             Array.from(
//                                 document.querySelectorAll('video')
//                             ).filter(video => {

//                                 const style =
//                                     window.getComputedStyle(video);

//                                 return (
//                                     video.clientWidth >= 50 &&
//                                     video.clientHeight >= 50 &&
//                                     !video.ended &&
//                                     style.display !== 'none' &&
//                                     style.visibility !== 'hidden' &&
//                                     style.opacity !== '0'
//                                 );
//                             });

//                         if (!videos.length) {
//                             return null;
//                         }

//                         return videos.sort(
//                             (a, b) =>
//                                 (b.clientWidth * b.clientHeight) -
//                                 (a.clientWidth * a.clientHeight)
//                         )[0];
//                     };


//                     const breakInnerContainingBlocks = (video) => {

//                         let node = video.parentElement;

//                         while (
//                             node &&
//                             node !== document.documentElement
//                         ) {

//                             try {

//                                 node.style.setProperty(
//                                     'transform',
//                                     'none',
//                                     'important'
//                                 );

//                                 node.style.setProperty(
//                                     'perspective',
//                                     'none',
//                                     'important'
//                                 );

//                                 node.style.setProperty(
//                                     'filter',
//                                     'none',
//                                     'important'
//                                 );

//                                 node.style.setProperty(
//                                     'backdrop-filter',
//                                     'none',
//                                     'important'
//                                 );

//                                 node.style.setProperty(
//                                     'contain',
//                                     'none',
//                                     'important'
//                                 );

//                                 node.style.setProperty(
//                                     'clip-path',
//                                     'none',
//                                     'important'
//                                 );

//                                 node.style.setProperty(
//                                     'will-change',
//                                     'auto',
//                                     'important'
//                                 );

//                                 // Crucial for carousel / slider clipping
//                                 node.style.setProperty(
//                                     'overflow',
//                                     'visible',
//                                     'important'
//                                 );

//                                 node.style.setProperty(
//                                     'overflow-x',
//                                     'visible',
//                                     'important'
//                                 );

//                                 node.style.setProperty(
//                                     'overflow-y',
//                                     'visible',
//                                     'important'
//                                 );

//                             } catch (e) {}

//                             node = node.parentElement;
//                         }
//                     };


//                     const hideCarouselNavigation = () => {

//                         const selectors = [
//                             '.swiper-pagination',
//                             '.swiper-pagination-bullets',
//                             '.swiper-pagination-clickable',
//                             '.slick-dots',
//                             '.owl-dots',
//                             '.carousel-indicators',
//                             '[class*="swiper-pagination"]',
//                             '[class*="slick-dots"]',
//                             '[class*="carousel-indicator"]'
//                         ];

//                         try {

//                             document
//                                 .querySelectorAll(
//                                     selectors.join(',')
//                                 )
//                                 .forEach(el => {

//                                     // Hide only common carousel
//                                     // navigation indicators.
//                                     el.style.setProperty(
//                                         'display',
//                                         'none',
//                                         'important'
//                                     );

//                                     el.style.setProperty(
//                                         'visibility',
//                                         'hidden',
//                                         'important'
//                                     );

//                                     el.style.setProperty(
//                                         'opacity',
//                                         '0',
//                                         'important'
//                                     );

//                                     el.style.setProperty(
//                                         'pointer-events',
//                                         'none',
//                                         'important'
//                                     );
//                                 });

//                         } catch (e) {}
//                     };


//                     const applyInnerFullscreen = () => {

//                         try {

//                             const video = findBestVideo();

//                             if (!video) {
//                                 return;
//                             }

//                             // -----------------------------------------------------
//                             // BREAK SLIDER / CAROUSEL CSS TRAP
//                             // -----------------------------------------------------
//                             breakInnerContainingBlocks(video);

//                             // -----------------------------------------------------
//                             // INNER DOCUMENT
//                             // -----------------------------------------------------
//                             document.documentElement.style.setProperty(
//                                 'width',
//                                 '100%',
//                                 'important'
//                             );

//                             document.documentElement.style.setProperty(
//                                 'height',
//                                 '100%',
//                                 'important'
//                             );

//                             document.documentElement.style.setProperty(
//                                 'margin',
//                                 '0',
//                                 'important'
//                             );

//                             document.documentElement.style.setProperty(
//                                 'padding',
//                                 '0',
//                                 'important'
//                             );

//                             document.documentElement.style.setProperty(
//                                 'background',
//                                 'black',
//                                 'important'
//                             );

//                             document.documentElement.style.setProperty(
//                                 'overflow',
//                                 'hidden',
//                                 'important'
//                             );

//                             if (document.body) {

//                                 document.body.style.setProperty(
//                                     'width',
//                                     '100%',
//                                     'important'
//                                 );

//                                 document.body.style.setProperty(
//                                     'height',
//                                     '100%',
//                                     'important'
//                                 );

//                                 document.body.style.setProperty(
//                                     'margin',
//                                     '0',
//                                     'important'
//                                 );

//                                 document.body.style.setProperty(
//                                     'padding',
//                                     '0',
//                                     'important'
//                                 );

//                                 document.body.style.setProperty(
//                                     'background',
//                                     'black',
//                                     'important'
//                                 );

//                                 // Keep ancestors from clipping our
//                                 // position:fixed video.
//                                 document.body.style.setProperty(
//                                     'overflow',
//                                     'visible',
//                                     'important'
//                                 );
//                             }

//                             // -----------------------------------------------------
//                             // Find known player wrapper
//                             // -----------------------------------------------------
//                             let playerWrapper =
//                                 video.closest(
//                                     [
//                                         '.jwplayer',
//                                         '#player',
//                                         '.plyr',
//                                         '.plyr--video',
//                                         '.vjs-player',
//                                         '.video-js',
//                                         '.shaka-video-container',
//                                         '.html5-video-player',
//                                         '[data-player]',
//                                         '[class*="player"]'
//                                     ].join(',')
//                                 );

//                             // -----------------------------------------------------
//                             // Fallback: climb a few ancestors
//                             // -----------------------------------------------------
//                             if (!playerWrapper) {

//                                 let current =
//                                     video.parentElement;

//                                 let levels = 0;

//                                 while (
//                                     current &&
//                                     current !== document.body &&
//                                     levels < 6
//                                 ) {

//                                     try {

//                                         const rect =
//                                             current.getBoundingClientRect();

//                                         if (
//                                             rect.width >=
//                                                 video.clientWidth * 0.80 &&
//                                             rect.height >=
//                                                 video.clientHeight * 0.80
//                                         ) {

//                                             playerWrapper =
//                                                 current;
//                                         }

//                                     } catch (e) {}

//                                     current =
//                                         current.parentElement;

//                                     levels++;
//                                 }
//                             }

//                             // -----------------------------------------------------
//                             // Fullscreen player wrapper
//                             // -----------------------------------------------------
//                             if (playerWrapper) {

//                                 playerWrapper.style.setProperty(
//                                     'position',
//                                     'fixed',
//                                     'important'
//                                 );

//                                 playerWrapper.style.setProperty(
//                                     'top',
//                                     '0px',
//                                     'important'
//                                 );

//                                 playerWrapper.style.setProperty(
//                                     'left',
//                                     '0px',
//                                     'important'
//                                 );

//                                 playerWrapper.style.setProperty(
//                                     'right',
//                                     '0px',
//                                     'important'
//                                 );

//                                 playerWrapper.style.setProperty(
//                                     'bottom',
//                                     '0px',
//                                     'important'
//                                 );

//                                 playerWrapper.style.setProperty(
//                                     'width',
//                                     '100vw',
//                                     'important'
//                                 );

//                                 playerWrapper.style.setProperty(
//                                     'height',
//                                     '100vh',
//                                     'important'
//                                 );

//                                 playerWrapper.style.setProperty(
//                                     'min-width',
//                                     '100vw',
//                                     'important'
//                                 );

//                                 playerWrapper.style.setProperty(
//                                     'min-height',
//                                     '100vh',
//                                     'important'
//                                 );

//                                 playerWrapper.style.setProperty(
//                                     'max-width',
//                                     'none',
//                                     'important'
//                                 );

//                                 playerWrapper.style.setProperty(
//                                     'max-height',
//                                     'none',
//                                     'important'
//                                 );

//                                 playerWrapper.style.setProperty(
//                                     'margin',
//                                     '0',
//                                     'important'
//                                 );

//                                 playerWrapper.style.setProperty(
//                                     'padding',
//                                     '0',
//                                     'important'
//                                 );

//                                 playerWrapper.style.setProperty(
//                                     'border',
//                                     '0',
//                                     'important'
//                                 );

//                                 playerWrapper.style.setProperty(
//                                     'display',
//                                     'block',
//                                     'important'
//                                 );

//                                 playerWrapper.style.setProperty(
//                                     'visibility',
//                                     'visible',
//                                     'important'
//                                 );

//                                 playerWrapper.style.setProperty(
//                                     'opacity',
//                                     '1',
//                                     'important'
//                                 );

//                                 playerWrapper.style.setProperty(
//                                     'background',
//                                     'black',
//                                     'important'
//                                 );

//                                 playerWrapper.style.setProperty(
//                                     'overflow',
//                                     'hidden',
//                                     'important'
//                                 );

//                                 playerWrapper.style.setProperty(
//                                     'z-index',
//                                     '2147483646',
//                                     'important'
//                                 );
//                             }

//                             // -----------------------------------------------------
//                             // Actual video = true viewport
//                             // -----------------------------------------------------
//                             video.style.setProperty(
//                                 'position',
//                                 'fixed',
//                                 'important'
//                             );

//                             video.style.setProperty(
//                                 'top',
//                                 '0px',
//                                 'important'
//                             );

//                             video.style.setProperty(
//                                 'left',
//                                 '0px',
//                                 'important'
//                             );

//                             video.style.setProperty(
//                                 'right',
//                                 '0px',
//                                 'important'
//                             );

//                             video.style.setProperty(
//                                 'bottom',
//                                 '0px',
//                                 'important'
//                             );

//                             video.style.setProperty(
//                                 'width',
//                                 '100vw',
//                                 'important'
//                             );

//                             video.style.setProperty(
//                                 'height',
//                                 '100vh',
//                                 'important'
//                             );

//                             video.style.setProperty(
//                                 'min-width',
//                                 '100vw',
//                                 'important'
//                             );

//                             video.style.setProperty(
//                                 'min-height',
//                                 '100vh',
//                                 'important'
//                             );

//                             video.style.setProperty(
//                                 'max-width',
//                                 'none',
//                                 'important'
//                             );

//                             video.style.setProperty(
//                                 'max-height',
//                                 'none',
//                                 'important'
//                             );

//                             video.style.setProperty(
//                                 'margin',
//                                 '0',
//                                 'important'
//                             );

//                             video.style.setProperty(
//                                 'padding',
//                                 '0',
//                                 'important'
//                             );

//                             video.style.setProperty(
//                                 'border',
//                                 '0',
//                                 'important'
//                             );

//                             video.style.setProperty(
//                                 'display',
//                                 'block',
//                                 'important'
//                             );

//                             video.style.setProperty(
//                                 'visibility',
//                                 'visible',
//                                 'important'
//                             );

//                             video.style.setProperty(
//                                 'opacity',
//                                 '1',
//                                 'important'
//                             );

//                             video.style.setProperty(
//                                 'background',
//                                 'black',
//                                 'important'
//                             );

//                             video.style.setProperty(
//                                 'object-fit',
//                                 'contain',
//                                 'important'
//                             );

//                             video.style.setProperty(
//                                 'object-position',
//                                 'center center',
//                                 'important'
//                             );

//                             video.style.setProperty(
//                                 'z-index',
//                                 '2147483647',
//                                 'important'
//                             );

//                             // -----------------------------------------------------
//                             // Remove carousel navigation dots
//                             // -----------------------------------------------------
//                             hideCarouselNavigation();

//                         } catch (err) {}
//                     };

//                     // Apply immediately
//                     applyInnerFullscreen();

//                     // Re-apply because player/carousel JavaScript may
//                     // reconstruct its styles or DOM.
//                     window.__smartVideoFullscreenInterval =
//                         setInterval(
//                             applyInnerFullscreen,
//                             500
//                         );

//                 });

//                 console.log(
//                     '[✅] CSS TRAP BREAKER + INNER VIDEO FULLSCREEN ACTIVATED.'
//                 );

//             } catch (e) {

//                 console.log(
//                     `[⚠️] Inner fullscreen engine failed safely: ${e.message}`
//                 );
//             }
//         }

//         // -----------------------------------------------------------------------------
//         // IMPORTANT FALLBACK FOR THE EXISTING AUDIO / PLAYER CONTROL BLOCK BELOW
//         // -----------------------------------------------------------------------------
//         //
//         // The iframe detector above intentionally does NOT blindly call
//         // the main page a "stream".
//         //
//         // But the existing code below still needs a valid Frame object.
//         // Therefore this fallback is ONLY for media-control code.
//         // It does NOT trigger iframe isolation or stream selection.
//         // -----------------------------------------------------------------------------

//         if (!targetFrame) {
//             targetFrame = page.mainFrame();
//         }

// // ==============================
// // ===================

//         await targetFrame.evaluate((muteVideo) => {
//             // FIX 1: Use window object to control audio globally to avoid Audio War
//             window.isStreamMuted = muteVideo; 

//             setInterval(() => {
//                 try {
//                     const style = document.createElement('style');
//                     style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                     document.head.appendChild(style);

//                     const mediaElements = document.querySelectorAll('video, audio');
//                     const videos = Array.from(document.querySelectorAll('video'));
//                     let realVideo = null;

//                     mediaElements.forEach(media => { 
//                         media.muted = window.isStreamMuted; 
//                         media.volume = window.isStreamMuted ? 0.0 : 1.0; 
//                     });

//                     if (!window.isStreamMuted) {
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (!realVideo && videos.length > 0) {
//                         realVideo = videos[0];
//                     }

//                     if (realVideo) { 
//                         let playerWrap = realVideo.closest('.jwplayer, #player, .plyr, .vjs-player, .shaka-video-container, [data-player]') || realVideo;
                        
//                         playerWrap.style.setProperty('position', 'fixed', 'important');
//                         playerWrap.style.setProperty('top', '0px', 'important');
//                         playerWrap.style.setProperty('left', '0px', 'important');
//                         playerWrap.style.setProperty('width', '100vw', 'important');
//                         playerWrap.style.setProperty('height', '100vh', 'important');
//                         playerWrap.style.setProperty('z-index', '2147483646', 'important'); 
//                         playerWrap.style.setProperty('background-color', 'black', 'important');
//                         playerWrap.style.setProperty('opacity', '1', 'important');
//                         playerWrap.style.setProperty('visibility', 'visible', 'important');
//                         playerWrap.style.setProperty('display', 'block', 'important');
                        
//                         if (playerWrap !== realVideo) {
//                             realVideo.style.setProperty('width', '100%', 'important');
//                             realVideo.style.setProperty('height', '100%', 'important');
//                         }
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                     }
//                 } catch(err) {}
//             }, 500); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     if (!startMuted) {
//         await triggerSmartUnmute(page);
//         await new Promise(r => setTimeout(r, 1000));
//     }
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
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     let backupWarmupTime = Date.now(); 
//     const WARMUP_MAX_TIME = 15000; 

//     let activeUrlStr = urlList[currentUrlIndex].url;
//     let backupUrlStr = urlList[backupUrlIndex].url;

//     let currentStreamStartTime = Date.now();
//     let isRecoveryUIShown = false;

//     while (true) {
//         // =====================================================================================
//         // 🛡️ NEVER THROW JUST BECAUSE ONE CHROME DISCONNECTED
//         // Recover the affected side instead.
//         // =====================================================================================
//         const activeBrowserAlive = activeBrowser && activeBrowser.isConnected();
//         const backupBrowserAlive = backupBrowser && backupBrowser.isConnected();

//         // ---------------------------------------------------------------------
//         // CASE 1: ACTIVE CHROME DEAD, BACKUP CHROME STILL ALIVE
//         // ---------------------------------------------------------------------
//         if (!activeBrowserAlive && backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[🚨] ACTIVE CHROME DISCONNECTED');
//             console.log('[🔄] BACKUP CHROME IS ALIVE');
//             console.log('[⚡] PROMOTING BACKUP -> ACTIVE');
//             console.log('[🛡️] OBS WILL CONTINUE RUNNING');
//             console.log('==================================================\n');

//             const oldActiveBrowser = activeBrowser;
//             const oldActivePage = activePage;
//             activeBrowser = backupBrowser;
//             activePage = backupPage;
//             backupBrowser = oldActiveBrowser;
//             backupPage = oldActivePage;

//             const oldActiveName = activeBrowserName;
//             activeBrowserName = backupBrowserName;
//             backupBrowserName = oldActiveName;

//             const previousActiveIndex = currentUrlIndex;
//             currentUrlIndex = backupUrlIndex;
//             activeUrlStr = urlList[currentUrlIndex].url;

//             backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//             backupUrlStr = urlList[backupUrlIndex].url;

//             lastActiveTime = -1; lastDecodedFrames = -1; frozenCheckTimestamp = Date.now();
//             streamSetupTime = Date.now(); currentStreamStartTime = Date.now();
//             isWarmupPhase = true; backupWarmupTime = Date.now(); isRecoveryUIShown = false;

//             try { await activePage.bringToFront(); await hideLoadingUI(activePage); } catch (e) {}

//             console.log('[✅] BACKUP PROMOTED SUCCESSFULLY');
//             console.log(`[📺] NEW ACTIVE SERVER : [${currentUrlIndex}] -> ${activeUrlStr}`);
//             console.log(`[🔊] ACTIVE AUDIO      : ON`);
//             console.log(`[🛡️] NEW BACKUP SERVER : [${backupUrlIndex}] -> ${backupUrlStr}`);

//             try {
//                 await createFreshBackupBrowser();
//                 await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await initializeVideo(backupPage, true, false);
//                 console.log('[✅] NEW BACKUP SERVER IS BUFFERING IN BACKGROUND');
//             } catch (e) {
//                 console.log(`[⚠️] Backup recreation failed. Watchdog will try the NEXT server.`);
//             }
//             continue;
//         }

//         // ---------------------------------------------------------------------
//         // CASE 2: BACKUP CHROME DEAD, ACTIVE CHROME STILL ALIVE
//         // ---------------------------------------------------------------------
//         if (activeBrowserAlive && !backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[⚠️] BACKUP CHROME DISCONNECTED');
//             console.log('[🛡️] ACTIVE STREAM WILL NOT BE TOUCHED');
//             console.log('[🔄] REBUILDING BACKUP WITH NEXT SERVER');
//             console.log('==================================================\n');

//             try {
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] NEXT BACKUP SERVER -> [${backupUrlIndex}] ${backupUrlStr}`);
//                 await createFreshBackupBrowser();
//                 await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await initializeVideo(backupPage, true, false);
//                 backupWarmupTime = Date.now();
//                 console.log(`[✅] BACKUP RECOVERED -> Server [${backupUrlIndex}]`);
//             } catch (e) {
//                 console.log(`[⚠️] Backup recovery failed. NEXT WATCHDOG CYCLE WILL TRY AGAIN.`);
//             }
//         }

//         // ---------------------------------------------------------------------
//         // CASE 3: BOTH CHROMES DEAD
//         // ---------------------------------------------------------------------
//         if (!activeBrowserAlive && !backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[🚨] BOTH CHROME INSTANCES DISCONNECTED');
//             console.log('[🛠️] LOCAL RECOVERY MODE');
//             console.log('[🛑] OBS WILL NOT BE RESTARTED');
//             console.log('==================================================\n');

//             try {
//                 currentUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 activeUrlStr = urlList[currentUrlIndex].url;

//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] RECOVERY ACTIVE -> [${currentUrlIndex}] ${activeUrlStr}`);
//                 console.log(`[*] RECOVERY BACKUP -> [${backupUrlIndex}] ${backupUrlStr}`);

//                 await createFreshActiveBrowser();
//                 await activePage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await showLoadingUI(activePage, "SEARCHING SERVER", "Finding a stable stream connection <span class='stream-blink'>...</span>");
//                 await initializeVideo(activePage, false, true);
//                 await hideLoadingUI(activePage);

//                 console.log('[✅] ACTIVE CHROME RECOVERED');

//                 try {
//                     await createFreshBackupBrowser();
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                     console.log('[✅] BACKUP CHROME RECOVERED');
//                 } catch (backupError) {
//                     console.log('[⚠️] Backup failed. Active stream continues.');
//                 }

//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}

//                 streamSetupTime = Date.now(); currentStreamStartTime = Date.now(); backupWarmupTime = Date.now();
//                 frozenCheckTimestamp = Date.now(); lastActiveTime = -1; lastDecodedFrames = -1;
//                 isWarmupPhase = true; isRecoveryUIShown = false;

//                 console.log('[✅] LOCAL RECOVERY COMPLETE — WATCHDOG CONTINUES');
//             } catch (e) {
//                 console.log(`[❌] Local Chrome recovery failed: ${e.message}`);
//                 await new Promise(r => setTimeout(r, 3000));
//             }
//             continue;
//         }

//         let activeHangThresholdMs = urlList[currentUrlIndex].hangTime;
//         let activeStatus = await checkPageStatus(activePage);

//         // 🔄 1. BACKGROUND SHIELD
//         if (!isWarmupPhase && (Date.now() - backupWarmupTime > 30000)) { 
//             let backupStatus = await checkPageStatus(backupPage);
            
//             if (backupStatus.status === 'DEAD' || backupStatus.status === 'CRITICAL_ERROR' || backupStatus.status === 'FROZEN') {
//                 console.log(`\n[⚠️] BACKGROUND SHIELD: Backup Server [${backupUrlIndex}] failed silently.`);
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;
                
//                 console.log(`[*] Shifting Backup Chrome to NEXT link -> Server [${backupUrlIndex}]`);
//                 backupWarmupTime = Date.now();
                
//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                 } catch(e) {}
//             }
//         }

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

//         // Active Tab Audio Watchdog Fix (Stop Audio War)
//         if (activeStatus.status === 'HEALTHY') {
//             await hideLoadingUI(activePage); 
//             isWarmupPhase = false; 

//             let isTimeStuck = (activeStatus.currentTime === lastActiveTime);
//             let isFrameStuck = (activeStatus.decodedFrames === lastDecodedFrames && activeStatus.decodedFrames > 0);

//             if (isTimeStuck || isFrameStuck) {
//                 if (!isRecoveryUIShown) {
//                     await showRecoveryUI(activePage);
//                     isRecoveryUIShown = true;
//                     console.log(`[⚠️] Stream Hang Detected! Showing Signal Recovery Shield instantly...`);
//                 }

//                 if (Date.now() - frozenCheckTimestamp > activeHangThresholdMs) {
//                     activeStatus.status = 'FROZEN';
//                     if (isFrameStuck && !isTimeStuck) {
//                         console.log(`[!] ⚠️ SYSTEM SHIELD: Detected Black Screen (Audio playing, but video frames stuck). Triggering HOT-SWAP.`);
//                     }
//                     isRecoveryUIShown = false; 
//                 }
//             } else {
//                 lastActiveTime = activeStatus.currentTime; 
//                 lastDecodedFrames = activeStatus.decodedFrames; 
//                 frozenCheckTimestamp = Date.now();
                
//                 if (isRecoveryUIShown) {
//                     await hideRecoveryUI(activePage);
//                     isRecoveryUIShown = false;
//                     console.log(`[✅] Stream Recovered! Signal Recovery Shield removed instantly.`);
//                 }
                
//                 // Mute override for active page (Audio fix applied)
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             frame.evaluate(() => { 
//                                 window.isStreamMuted = false;
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                                 document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                             }).catch(()=>{});
//                         }
//                     } catch(e) {}
//                 }
//             }
//         }

//         // Backup Tab Audio Watchdog Fix
//         if (backupPage) {
//             for (const frame of backupPage.frames()) {
//                 try {
//                     if (!frame.isDetached()) {
//                         frame.evaluate(() => { 
//                             window.isStreamMuted = true;
//                             document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); 
//                         }).catch(()=>{});
//                     }
//                 } catch(e) {}
//             }
//         }

//         watchdogTicks++;

//         if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
//             let logBackupStatus = await checkPageStatus(backupPage);
//             let nextAfterBackupIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//             let nextAfterBackupUrl = urlList[nextAfterBackupIndex].url;
            
//             console.log(`\n==================================================`);
//             console.log(`[💓] ACTIVE HEARTBEAT (${activeBrowserName}): Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'} (Limit: ${activeHangThresholdMs/1000}s)`);
//             console.log(`[▶️] CURRENTLY LIVE              : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//             console.log(`--------------------------------------------------`);
//             console.log(`[🖤] BACKUP HEARTBEAT (${backupBrowserName}): Status is ${logBackupStatus.status} | Video Time: ${logBackupStatus.currentTime ? logBackupStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//             console.log(`[🔄] RUNNING IN BACKGROUND       : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//             console.log(`[⏭️] NEXT QUEUE (AFTER BACKUP)  : Server [${nextAfterBackupIndex}] -> ${nextAfterBackupUrl}`);
//             console.log(`==================================================\n`);
//         }

        

//         // =========================================================================================
//         // 🔄 2. ACTIVE TAB HOT-SWAP SHIELD (UPDATED: INSTANT SEAMLESS PROMOTION)
//         // =========================================================================================
//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH') {
            
//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 console.log(`[⏳] Watchdog detected '${activeStatus.status}', but stream is in WARM-UP phase. Waiting...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             }

//             let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

//             if (isProactiveRefresh) {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] 🔄 PROACTIVE REFRESH TRIGGERED`);
//                 console.log(`[*] Initiating forward rotation to prevent stream drop...`);
//                 console.log(`==================================================`);
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
//                 console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`==================================================`);
                
//             }
            
//             console.log(`[*] Checking Backup Tab status before switching...`);
//             let backupStatus = await checkPageStatus(backupPage);



// // --------------------------------------------------------------------
//             // ⚡ SCENARIO A: INSTANT SEAMLESS HOT-SWAP (BACKUP IS ALREADY HEALTHY)
//             // --------------------------------------------------------------------
//             if (backupStatus.status === 'HEALTHY' && !isProactiveRefresh) {
                
//                 console.log('\n==================================================');
//                 console.log('[⚡] BACKUP STREAM ALREADY HEALTHY');
//                 console.log('[⚡] SHOWING TRANSITION UI & PROMOTING INSTANTLY');
//                 console.log('==================================================');

//                 // 1. Visually ek smooth "RECONNECTING" UI lagayein
//                 await showLoadingUI(backupPage, "RECONNECTING", "Establishing secure connection to backup server <span class='stream-blink'>...</span>");

//                 // 2. Tab ko screen par layein
//                 try { await backupPage.bringToFront(); } catch (e) {}

//                 // 3. Objects swap karein (Chrome 2 ab Chrome 1 ban gaya)
//                 let brokenPage = activePage; 
//                 activePage = backupPage; 
//                 backupPage = brokenPage;

//                 let brokenBrowser = activeBrowser; 
//                 activeBrowser = backupBrowser; 
//                 backupBrowser = brokenBrowser;

//                 let brokenName = activeBrowserName;
//                 activeBrowserName = backupBrowserName;
//                 backupBrowserName = brokenName;

//                 let previousActiveIndex = currentUrlIndex;
//                 currentUrlIndex = backupUrlIndex;
//                 activeUrlStr = urlList[currentUrlIndex].url; 
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 // 4. 🛠️ INSTANT AUDIO FIX: Background tab mute tha, isko foran unmute karein swap hotay hi!
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             await frame.evaluate(() => { 
//                                 window.isStreamMuted = false;
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                                 document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                             });
//                         }
//                     } catch(e) {}
//                 }

//                 // 5. State Reset (Keep isWarmupPhase FALSE because stream is already healthy)
//                 lastActiveTime = -1; 
//                 lastDecodedFrames = -1;
//                 frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false; 

//                 streamSetupTime = Date.now(); 
//                 currentStreamStartTime = Date.now();
//                 isWarmupPhase = false; 
                
//                 // Extra buffer time for background checks to avoid conflicts
//                 backupWarmupTime = Date.now() + 5000; 

//                 // 6. SMOOTH UI REMOVAL: Wait 1.5s for render paint to stabilize
//                 await new Promise(r => setTimeout(r, 1500));
//                 try { await hideLoadingUI(activePage); } catch(e) {}

//                 console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`[🔊] LIVE AUDIO STATUS : ON (Seamlessly Promoted & Unmuted)`);
//                 console.log(`--------------------------------------------------`);
//                 console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//                 console.log(`==================================================\n`);

//                 // 7. 🛠️ CPU BOTTLENECK FIX: Heavy background rebuilding ko 3 seconds delay karein
//                 // Taa k watchdog ka immediate next active check timeout na ho aur "DEAD" issue na aye.
//                 setTimeout(async () => {
//                     try {
//                         console.log(`[⏳] Starting background buffer rebuilding safely...`);
//                         await backupPage.goto('about:blank').catch(()=>{});
//                         await applyPreloadFirewall(backupPage);
//                         await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                         await initializeVideo(backupPage, true, false);
//                     } catch (e) {
//                         console.log(`[⚠️] Background buffer navigation handled safely.`);
//                     }
//                 }, 3000); 
//             }







//             // --------------------------------------------------------------------
//             // 🔄 SCENARIO B: PROACTIVE REFRESH OR FORCED RECONNECTION
//             // --------------------------------------------------------------------
//             else if (isProactiveRefresh || (backupStatus.status === 'HEALTHY' && isProactiveRefresh)) {
                
//                 for (const frame of activePage.frames()) {
//                     try { if (!frame.isDetached()) await frame.evaluate(() => { window.isStreamMuted = true; document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                 }
                
//                 await showLoadingUI(backupPage, "REFRESHING CONNECTION", "Optimizing current server stream <span class='stream-blink'>...</span>");
//                 await backupPage.bringToFront();
//                 await new Promise(r => setTimeout(r, 1000)); 
                
//                 try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                 console.log(`[*] Initializing Video on the newly active tab...`);
//                 await initializeVideo(backupPage, false, true); 
//                 await hideLoadingUI(backupPage);

//                 let brokenPage = activePage; 
//                 activePage = backupPage; 
//                 backupPage = brokenPage;

//                 let brokenBrowser = activeBrowser; 
//                 activeBrowser = backupBrowser; 
//                 backupBrowser = brokenBrowser;

//                 let brokenName = activeBrowserName;
//                 activeBrowserName = backupBrowserName;
//                 backupBrowserName = brokenName;
                
//                 lastActiveTime = -1; frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false; 

//                 let previousActiveIndex = currentUrlIndex;
//                 currentUrlIndex = backupUrlIndex;
//                 activeUrlStr = urlList[currentUrlIndex].url; 
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`\n==================================================`);
//                 console.log(`[🔄] PROACTIVE REFRESH EXECUTED SUCCESSFULLY`);
//                 console.log(`==================================================`);

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                 } catch (e) {}
                
//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true;
//                 currentStreamStartTime = Date.now();
//                 // 🚀 FIX: Lock background watchdog for Proactive Refresh too!
//                 backupWarmupTime = Date.now(); 
//             }



//             // --------------------------------------------------------------------
//             // ❌ SCENARIO C: BOTH TABS FAILED (Fresh Hunting Mode)
//             // --------------------------------------------------------------------
//             else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ BOTH TABS FAILED (Active & Backup Compromised)`);
//                 console.log(`[🔍] FRESH HUNTING MODE ACTIVATED: Spawning clean tabs...`);
//                 console.log(`==================================================`);
                
//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch (e) {}

//                 currentUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 activeUrlStr = urlList[currentUrlIndex].url;
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] Hunting Active -> Server [${currentUrlIndex}]`);
//                 console.log(`[*] Hunting Backup -> Server [${backupUrlIndex}]`);

//                 console.log(`[*] Closing crashed tabs and spawning fresh ones...`);
//                 try { await activePage.close(); } catch(e) {}
//                 try { await backupPage.close(); } catch(e) {}

//                 activePage = await activeBrowser.newPage();
//                 backupPage = await backupBrowser.newPage();

//                 await setupNetworkAdBlocker(activePage);
//                 await setupNetworkAdBlocker(backupPage);
//                 attachAntiAdListeners(activePage);
//                 attachAntiAdListeners(backupPage);
//                 await applyPreloadFirewall(activePage);
//                 await applyPreloadFirewall(backupPage);

//                 try {
//                     await activePage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 });
//                     await showLoadingUI(activePage, "SEARCHING SERVER", "Hunting for a stable stream connection <span class='stream-blink'>...</span>");
//                     await initializeVideo(activePage, false, true); 
//                     await hideLoadingUI(activePage);
//                 } catch(e) {}

//                 try {
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{});
//                     await initializeVideo(backupPage, true, false); 
//                 } catch(e) {}

//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true; 
//                 currentStreamStartTime = Date.now();
//                 backupWarmupTime = Date.now();
//                 lastActiveTime = -1;
//                 frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false;

//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
                
//                 console.log(`[*] Fresh tabs active. Waiting 15 seconds (Warm-up) for video to stabilize...`);
//             }
//         } 
       
//         await new Promise(r => setTimeout(r, 2000)); 
//     }
// }

// async function startDirectStreaming() {
//     activeBrowserName = "CHROME 1";
//     backupBrowserName = "CHROME 2";
    
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

//     browserArgs = [
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
//         '--disable-blink-features=AutomationControlled',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion,NetworkServiceInProcess2',
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

//     console.log(`[*] Starting ACTIVE browser instance...`);
//     activeBrowser = await createBrowserInstance(browserArgs);
//     const activePages = await activeBrowser.pages();
//     activePage = activePages[0];

//     console.log(`[*] Starting BACKUP browser instance in background...`);
//     backupBrowser = await createBrowserInstance(browserArgs);
//     const backupPages = await backupBrowser.pages();
//     backupPage = backupPages[0];

//     activeBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => { if (newPage && newPage !== activePage) { try { await newPage.close(); } catch(e) {} } }, 500);
//         }
//     });

//     backupBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => { if (newPage && newPage !== backupPage) { try { await newPage.close(); } catch(e) {} } }, 500);
//         }
//     });

//     await setupNetworkAdBlocker(activePage);
//     await setupNetworkAdBlocker(backupPage);

//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await applyPreloadFirewall(activePage);
//     await applyPreloadFirewall(backupPage);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex].url}`);
//     try {
//         await activePage.goto(urlList[currentUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 });
//     } catch (e) {
//         console.log(`[⚠️] Network buffer safely handled for primary URL.`);
//     }
    
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     await initializeVideo(activePage, false, true); 
//     await hideLoadingUI(activePage); 

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex].url}`);
//     try {
//         await backupPage.goto(urlList[backupUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 });
//     } catch (e) {}
    
//     await initializeVideo(backupPage, true, false);
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 
//     await hideLoadingUI(activePage);

//     console.log(`\n==================================================`);
//     console.log(`[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     console.log(`==================================================`);
//     console.log(`[📺] CURRENT ACTIVE LIVE : Server [${currentUrlIndex}] -> ${urlList[currentUrlIndex].url}`);
//     console.log(`[🔊] LIVE AUDIO STATUS   : ON (Unmuted)`);
//     console.log(`--------------------------------------------------`);
//     console.log(`[🛡️] NEXT BACKUP QUEUE   : Server [${backupUrlIndex}] -> ${urlList[backupUrlIndex].url}`);
//     console.log(`[🔇] BACKUP AUDIO STATUS : MUTED (Background)`);
//     console.log(`==================================================\n`);

//     console.log('[*] Everything Setup! Dual-Tab Monitoring is Active.');
//     await startWatchdog();
// }

// async function mainLoop() {
//     while (true) {
//         try {
//             await startDirectStreaming();
//         } catch (error) {
//             console.error('\n==================================================');
//             console.error('[🚨] FATAL ENGINE ERROR');
//             console.error(`[!] ${error.message}`);
//             console.error('==================================================');

//             if (activeBrowser && activeBrowser.isConnected()) {
//                 console.log('[🛡️] ACTIVE CHROME STILL ALIVE — NOT RESTARTING ENGINE.');
//                 await new Promise(resolve => setTimeout(resolve, 3000));
//                 continue;
//             }

//             if (backupBrowser && backupBrowser.isConnected()) {
//                 console.log('[🛡️] BACKUP CHROME STILL ALIVE — NOT RESTARTING ENGINE.');
//                 await new Promise(resolve => setTimeout(resolve, 3000));
//                 continue;
//             }

//             console.log('[⚠️] NO CHROME INSTANCE SURVIVED. Performing final recovery.');

//             try { if (activeBrowser) await activeBrowser.close().catch(() => {}); } catch (e) {}
//             try { if (backupBrowser) await backupBrowser.close().catch(() => {}); } catch (e) {}

//             activeBrowser = null; backupBrowser = null; activePage = null; backupPage = null;

//             await new Promise(resolve => setTimeout(resolve, 3000));
//             await cleanup();
//         }
//     }
// }

// async function cleanup() {
//     console.log('[*] Cleaning up resources...');
//     try { await obs.disconnect(); } catch (e) { } 
//     if (activeBrowser) { try { await activeBrowser.close(); } catch(e) { } activeBrowser = null; }
//     if (backupBrowser) { try { await backupBrowser.close(); } catch(e) { } backupBrowser = null; }
    
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
//             const targetUrls = process.env.TARGET_URLS || 'https://sport4u.online';
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


















// ============ psg vs aston super cup final ==================
// 1 issue is , many iframe so they select the wrong iframe , audio play but iframe wrong select 
// 2nd issue is , background active time is fix and not move whats that means , is this issue , if it is so why they cannot move next wor what they csannot do for fix this.






// const puppeteer = require('puppeteer-extra');
// let isWarmupPhase = true;
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD (DEBUGGING MODE)
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     console.error('\n========================================');
//     console.error('[💥] UNCAUGHT EXCEPTION');
//     console.error(err);
//     console.error(err.stack);
//     console.error('========================================\n');
// });

// process.on('unhandledRejection', (reason) => {
//     console.error('\n========================================');
//     console.error('[💥] UNHANDLED REJECTION');
//     console.error(reason);
//     console.error('========================================\n');
// });

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME (IN MINUTES)
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 40000; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// // =========================================================================================
// // 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// // =========================================================================================
// const NO_REFRESH_DOMAINS = [
//     'youtube.com',
//     'facebook.com',
//     'streamed.pk',
//     'cricstreams.', 
//     'sport4u.online',
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

// // =========================================================================================
// // 🔄 DYNAMIC URL PARSER & METADATA EXTRACTOR
// // =========================================================================================
// let rawUrls = (process.env.TARGET_URLS || '').trim();
// let urlList = [];

// if (rawUrls !== '') {
//     urlList = rawUrls.split(',').map(u => {
//         let trimmed = u.trim();
//         let hangThreshold = 8000; 
        
//         if (trimmed.startsWith('!')) {
//             hangThreshold = 20000; 
//             trimmed = trimmed.substring(1); 
//         }
//         if (!trimmed.startsWith('http')) trimmed = 'https://' + trimmed;
        
//         return { url: trimmed, hangTime: hangThreshold };
//     });
// } else {
//     urlList = [
//         { url: 'https://sport4u.online', hangTime: 8000 },
//         { url: 'https://dadocric.st/player.php?id=starsp3&v=m', hangTime: 8000 }
//     ];
// }

// function getSafeBackupIndex(activeIndex, currentIndex, list) {
//     if (list.length <= 1) return 0; 
//     let next = (currentIndex + 1) % list.length;
//     if (next === activeIndex) {
//         next = (next + 1) % list.length; 
//     }
//     return next;
// }

// let currentUrlIndex = 0;
// let backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);

// const SELECTED_CHANNEL = process.env.OKRU_STREAM_ID || '1';
// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None'; 
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

// const ACTIVE_STREAM_KEY = STREAM_KEYS[SELECTED_CHANNEL] || STREAM_KEYS['1'];

// let browserArgs = []; // Global Browser Args for Recovery Functions
// let activeBrowser = null;
// let backupBrowser = null;
// let activeBrowserName = "CHROME 1";
// let backupBrowserName = "CHROME 2";
// let obsProcess = null;
// let activePage = null;
// let backupPage = null;


// async function createBrowserInstance(args) {
//     return await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: args
//     });
// }

// // =========================================================================================
// // 🛡️ SMART BROWSER RECOVERY
// // =========================================================================================

// async function preparePage(page) {
//     if (!page) return;
//     await setupNetworkAdBlocker(page);
//     attachAntiAdListeners(page);
//     await applyPreloadFirewall(page);
// }

// async function createFreshBackupBrowser() {
//     console.log('\n[🛠️] BACKUP RECOVERY: Creating fresh backup Chrome...');
//     try {
//         if (backupBrowser && backupBrowser.isConnected()) {
//             try {
//                 const pages = await backupBrowser.pages();
//                 for (const p of pages) {
//                     try { await p.close(); } catch (e) {}
//                 }
//             } catch (e) {}
//         }
//     } catch (e) {}

//     try {
//         if (backupBrowser && !backupBrowser.isConnected()) {
//             backupBrowser = null;
//         }
//     } catch (e) {
//         backupBrowser = null;
//     }

//     backupBrowser = await createBrowserInstance(browserArgs);
//     const pages = await backupBrowser.pages();
//     backupPage = pages[0];
//     await preparePage(backupPage);

//     backupBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             try {
//                 const newPage = await target.page();
//                 setTimeout(async () => {
//                     if (newPage && newPage !== backupPage) {
//                         try { await newPage.close(); } catch (e) {}
//                     }
//                 }, 500);
//             } catch (e) {}
//         }
//     });

//     console.log('[✅] BACKUP RECOVERY: Fresh backup Chrome created.');
//     return true;
// }

// async function createFreshActiveBrowser() {
//     console.log('\n[🛠️] ACTIVE RECOVERY: Creating fresh active Chrome...');
//     try {
//         if (activeBrowser && activeBrowser.isConnected()) {
//             try {
//                 const pages = await activeBrowser.pages();
//                 for (const p of pages) {
//                     try { await p.close(); } catch (e) {}
//                 }
//             } catch (e) {}
//         }
//     } catch (e) {}

//     try {
//         if (activeBrowser && !activeBrowser.isConnected()) {
//             activeBrowser = null;
//         }
//     } catch (e) {
//         activeBrowser = null;
//     }

//     activeBrowser = await createBrowserInstance(browserArgs);
//     const pages = await activeBrowser.pages();
//     activePage = pages[0];
//     await preparePage(activePage);

//     activeBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             try {
//                 const newPage = await target.page();
//                 setTimeout(async () => {
//                     if (newPage && newPage !== activePage) {
//                         try { await newPage.close(); } catch (e) {}
//                     }
//                 }, 500);
//             } catch (e) {}
//         }
//     });

//     console.log('[✅] ACTIVE RECOVERY: Fresh active Chrome created.');
//     return true;
// }

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
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') {
//                     init.mode = 'open'; 
//                 }
//                 const shadowRoot = originalAttachShadow.call(this, init);
                
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) {
//                         console.log('[🛡️] SHIELD: Shadow DOM Ad Detected & Destroyed!');
//                         this.remove(); 
//                     }
//                 });
                
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };
            
//             Element.prototype.attachShadow.toString = function() { return "function attachShadow() { [native code] }"; };

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
//                 in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }
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
//                             .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
//                             @keyframes blinker { 50% { opacity: 0.3; } }
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

// async function showRecoveryUI(page) {
//     try {
//         await page.evaluate(() => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('stream-recovery-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 return;
//             }
            
//             overlay = document.createElement('div');
//             overlay.id = 'stream-recovery-overlay';
//             overlay.innerHTML = `
//                 <style>
//                     #stream-recovery-overlay {
//                         position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                         width: 100vw !important; height: 100vh !important; background: rgba(0, 0, 0, 0.95) !important;
//                         z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                         justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                         font-family: Arial, sans-serif !important; pointer-events: all !important; backdrop-filter: blur(8px);
//                     }
//                     .recovery-radar {
//                         width: 100px; height: 100px; border-radius: 50%;
//                         border: 3px solid transparent; border-top-color: #ff9800; border-bottom-color: #ff9800;
//                         animation: radar-spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
//                         margin-bottom: 20px; box-shadow: 0 0 30px rgba(255, 152, 0, 0.3);
//                     }
//                     .recovery-radar::before {
//                         content: ''; position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px;
//                         border-radius: 50%; border: 3px solid transparent; border-left-color: #f44336; border-right-color: #f44336;
//                         animation: radar-spin 2s linear infinite reverse;
//                     }
//                     @keyframes radar-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                     .warn-title { font-size: 32px !important; font-weight: 800 !important; color: #ff9800 !important; letter-spacing: 2px !important; margin-bottom: 10px !important; text-transform: uppercase !important; }
//                     .warn-sub { font-size: 18px !important; color: #dddddd !important; animation: pulse-text 1.5s infinite; }
//                     @keyframes pulse-text { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
//                 </style>
//                 <div class="recovery-radar"></div>
//                 <div class="warn-title">SIGNAL LOST</div>
//                 <div class="warn-sub">Attempting Auto-Recovery...</div>
//             `;
//             document.documentElement.appendChild(overlay);
//         });
//     } catch (e) {}
// }

// async function hideRecoveryUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('stream-recovery-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'none', 'important');
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
    
//     const basicIniContent = `[General]\nName=Untitled\n[Video]\nBaseCX=${RES_W}\nBaseCY=${RES_H}\nOutputCX=${RES_W}\nOutputCY=${RES_H}\nFPSCommon=30\n[Output]\nMode=Simple\n[SimpleOutput]\nVBitrate=${BITRATE}\nStreamEncoder=x264\nx264Preset=ultrafast\nx264Settings=keyint=60 tune=zerolatency profile=main threads=4 rc-lookahead=0\n`;
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
//                             // await takeAndBatchScreenshot(page, `play-btn-clicked`);
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
//                             // await takeAndBatchScreenshot(page, `force-play-applied`);
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

//                     const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay):not(#stream-recovery-overlay):not([class*="player"]):not([class*="jw"]):not([class*="vjs"]), [id*="pop"], [class*="pop"], a[href*="extension"], [class*="notification"], [id*="notification"]';
//                     document.querySelectorAll(junkClasses).forEach(el => { 
//                         try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } 
//                     });

//                     const adKeywords = ['jerk', 'mate', 'free', 'online', 'adult', 'dating', 'close', 'notification', 'justine', 'paying', 'job'];
//                     document.querySelectorAll('div, section, span, a').forEach(el => {
//                         if (el.id === 'smart-stream-overlay' || el.id === 'stream-recovery-overlay') return;
                        
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
//             // FIX 1: Use window object to control audio globally to avoid Audio War
//             window.isStreamMuted = muteVideo; 

//             setInterval(() => {
//                 try {
//                     const style = document.createElement('style');
//                     style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                     document.head.appendChild(style);

//                     const mediaElements = document.querySelectorAll('video, audio');
//                     const videos = Array.from(document.querySelectorAll('video'));
//                     let realVideo = null;

//                     mediaElements.forEach(media => { 
//                         media.muted = window.isStreamMuted; 
//                         media.volume = window.isStreamMuted ? 0.0 : 1.0; 
//                     });

//                     if (!window.isStreamMuted) {
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (!realVideo && videos.length > 0) {
//                         realVideo = videos[0];
//                     }

//                     if (realVideo) { 
//                         let playerWrap = realVideo.closest('.jwplayer, #player, .plyr, .vjs-player, .shaka-video-container, [data-player]') || realVideo;
                        
//                         playerWrap.style.setProperty('position', 'fixed', 'important');
//                         playerWrap.style.setProperty('top', '0px', 'important');
//                         playerWrap.style.setProperty('left', '0px', 'important');
//                         playerWrap.style.setProperty('width', '100vw', 'important');
//                         playerWrap.style.setProperty('height', '100vh', 'important');
//                         playerWrap.style.setProperty('z-index', '2147483646', 'important'); 
//                         playerWrap.style.setProperty('background-color', 'black', 'important');
//                         playerWrap.style.setProperty('opacity', '1', 'important');
//                         playerWrap.style.setProperty('visibility', 'visible', 'important');
//                         playerWrap.style.setProperty('display', 'block', 'important');
                        
//                         if (playerWrap !== realVideo) {
//                             realVideo.style.setProperty('width', '100%', 'important');
//                             realVideo.style.setProperty('height', '100%', 'important');
//                         }
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                     }
//                 } catch(err) {}
//             }, 500); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     if (!startMuted) {
//         await triggerSmartUnmute(page);
//         await new Promise(r => setTimeout(r, 1000));
//     }
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
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     let backupWarmupTime = Date.now(); 
//     const WARMUP_MAX_TIME = 15000; 

//     let activeUrlStr = urlList[currentUrlIndex].url;
//     let backupUrlStr = urlList[backupUrlIndex].url;

//     let currentStreamStartTime = Date.now();
//     let isRecoveryUIShown = false;

//     while (true) {
//         // =====================================================================================
//         // 🛡️ NEVER THROW JUST BECAUSE ONE CHROME DISCONNECTED
//         // Recover the affected side instead.
//         // =====================================================================================
//         const activeBrowserAlive = activeBrowser && activeBrowser.isConnected();
//         const backupBrowserAlive = backupBrowser && backupBrowser.isConnected();

//         // ---------------------------------------------------------------------
//         // CASE 1: ACTIVE CHROME DEAD, BACKUP CHROME STILL ALIVE
//         // ---------------------------------------------------------------------
//         if (!activeBrowserAlive && backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[🚨] ACTIVE CHROME DISCONNECTED');
//             console.log('[🔄] BACKUP CHROME IS ALIVE');
//             console.log('[⚡] PROMOTING BACKUP -> ACTIVE');
//             console.log('[🛡️] OBS WILL CONTINUE RUNNING');
//             console.log('==================================================\n');

//             const oldActiveBrowser = activeBrowser;
//             const oldActivePage = activePage;
//             activeBrowser = backupBrowser;
//             activePage = backupPage;
//             backupBrowser = oldActiveBrowser;
//             backupPage = oldActivePage;

//             const oldActiveName = activeBrowserName;
//             activeBrowserName = backupBrowserName;
//             backupBrowserName = oldActiveName;

//             const previousActiveIndex = currentUrlIndex;
//             currentUrlIndex = backupUrlIndex;
//             activeUrlStr = urlList[currentUrlIndex].url;

//             backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//             backupUrlStr = urlList[backupUrlIndex].url;

//             lastActiveTime = -1; lastDecodedFrames = -1; frozenCheckTimestamp = Date.now();
//             streamSetupTime = Date.now(); currentStreamStartTime = Date.now();
//             isWarmupPhase = true; backupWarmupTime = Date.now(); isRecoveryUIShown = false;

//             try { await activePage.bringToFront(); await hideLoadingUI(activePage); } catch (e) {}

//             console.log('[✅] BACKUP PROMOTED SUCCESSFULLY');
//             console.log(`[📺] NEW ACTIVE SERVER : [${currentUrlIndex}] -> ${activeUrlStr}`);
//             console.log(`[🔊] ACTIVE AUDIO      : ON`);
//             console.log(`[🛡️] NEW BACKUP SERVER : [${backupUrlIndex}] -> ${backupUrlStr}`);

//             try {
//                 await createFreshBackupBrowser();
//                 await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await initializeVideo(backupPage, true, false);
//                 console.log('[✅] NEW BACKUP SERVER IS BUFFERING IN BACKGROUND');
//             } catch (e) {
//                 console.log(`[⚠️] Backup recreation failed. Watchdog will try the NEXT server.`);
//             }
//             continue;
//         }

//         // ---------------------------------------------------------------------
//         // CASE 2: BACKUP CHROME DEAD, ACTIVE CHROME STILL ALIVE
//         // ---------------------------------------------------------------------
//         if (activeBrowserAlive && !backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[⚠️] BACKUP CHROME DISCONNECTED');
//             console.log('[🛡️] ACTIVE STREAM WILL NOT BE TOUCHED');
//             console.log('[🔄] REBUILDING BACKUP WITH NEXT SERVER');
//             console.log('==================================================\n');

//             try {
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] NEXT BACKUP SERVER -> [${backupUrlIndex}] ${backupUrlStr}`);
//                 await createFreshBackupBrowser();
//                 await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await initializeVideo(backupPage, true, false);
//                 backupWarmupTime = Date.now();
//                 console.log(`[✅] BACKUP RECOVERED -> Server [${backupUrlIndex}]`);
//             } catch (e) {
//                 console.log(`[⚠️] Backup recovery failed. NEXT WATCHDOG CYCLE WILL TRY AGAIN.`);
//             }
//         }

//         // ---------------------------------------------------------------------
//         // CASE 3: BOTH CHROMES DEAD
//         // ---------------------------------------------------------------------
//         if (!activeBrowserAlive && !backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[🚨] BOTH CHROME INSTANCES DISCONNECTED');
//             console.log('[🛠️] LOCAL RECOVERY MODE');
//             console.log('[🛑] OBS WILL NOT BE RESTARTED');
//             console.log('==================================================\n');

//             try {
//                 currentUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 activeUrlStr = urlList[currentUrlIndex].url;

//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] RECOVERY ACTIVE -> [${currentUrlIndex}] ${activeUrlStr}`);
//                 console.log(`[*] RECOVERY BACKUP -> [${backupUrlIndex}] ${backupUrlStr}`);

//                 await createFreshActiveBrowser();
//                 await activePage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await showLoadingUI(activePage, "SEARCHING SERVER", "Finding a stable stream connection <span class='stream-blink'>...</span>");
//                 await initializeVideo(activePage, false, true);
//                 await hideLoadingUI(activePage);

//                 console.log('[✅] ACTIVE CHROME RECOVERED');

//                 try {
//                     await createFreshBackupBrowser();
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                     console.log('[✅] BACKUP CHROME RECOVERED');
//                 } catch (backupError) {
//                     console.log('[⚠️] Backup failed. Active stream continues.');
//                 }

//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}

//                 streamSetupTime = Date.now(); currentStreamStartTime = Date.now(); backupWarmupTime = Date.now();
//                 frozenCheckTimestamp = Date.now(); lastActiveTime = -1; lastDecodedFrames = -1;
//                 isWarmupPhase = true; isRecoveryUIShown = false;

//                 console.log('[✅] LOCAL RECOVERY COMPLETE — WATCHDOG CONTINUES');
//             } catch (e) {
//                 console.log(`[❌] Local Chrome recovery failed: ${e.message}`);
//                 await new Promise(r => setTimeout(r, 3000));
//             }
//             continue;
//         }

//         let activeHangThresholdMs = urlList[currentUrlIndex].hangTime;
//         let activeStatus = await checkPageStatus(activePage);

//         // 🔄 1. BACKGROUND SHIELD
//         if (!isWarmupPhase && (Date.now() - backupWarmupTime > 30000)) { 
//             let backupStatus = await checkPageStatus(backupPage);
            
//             if (backupStatus.status === 'DEAD' || backupStatus.status === 'CRITICAL_ERROR' || backupStatus.status === 'FROZEN') {
//                 console.log(`\n[⚠️] BACKGROUND SHIELD: Backup Server [${backupUrlIndex}] failed silently.`);
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;
                
//                 console.log(`[*] Shifting Backup Chrome to NEXT link -> Server [${backupUrlIndex}]`);
//                 backupWarmupTime = Date.now();
                
//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                 } catch(e) {}
//             }
//         }

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

//         // Active Tab Audio Watchdog Fix (Stop Audio War)
//         if (activeStatus.status === 'HEALTHY') {
//             await hideLoadingUI(activePage); 
//             isWarmupPhase = false; 

//             let isTimeStuck = (activeStatus.currentTime === lastActiveTime);
//             let isFrameStuck = (activeStatus.decodedFrames === lastDecodedFrames && activeStatus.decodedFrames > 0);

//             if (isTimeStuck || isFrameStuck) {
//                 if (!isRecoveryUIShown) {
//                     await showRecoveryUI(activePage);
//                     isRecoveryUIShown = true;
//                     console.log(`[⚠️] Stream Hang Detected! Showing Signal Recovery Shield instantly...`);
//                 }

//                 if (Date.now() - frozenCheckTimestamp > activeHangThresholdMs) {
//                     activeStatus.status = 'FROZEN';
//                     if (isFrameStuck && !isTimeStuck) {
//                         console.log(`[!] ⚠️ SYSTEM SHIELD: Detected Black Screen (Audio playing, but video frames stuck). Triggering HOT-SWAP.`);
//                     }
//                     isRecoveryUIShown = false; 
//                 }
//             } else {
//                 lastActiveTime = activeStatus.currentTime; 
//                 lastDecodedFrames = activeStatus.decodedFrames; 
//                 frozenCheckTimestamp = Date.now();
                
//                 if (isRecoveryUIShown) {
//                     await hideRecoveryUI(activePage);
//                     isRecoveryUIShown = false;
//                     console.log(`[✅] Stream Recovered! Signal Recovery Shield removed instantly.`);
//                 }
                
//                 // Mute override for active page (Audio fix applied)
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             frame.evaluate(() => { 
//                                 window.isStreamMuted = false;
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                                 document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                             }).catch(()=>{});
//                         }
//                     } catch(e) {}
//                 }
//             }
//         }

//         // Backup Tab Audio Watchdog Fix
//         if (backupPage) {
//             for (const frame of backupPage.frames()) {
//                 try {
//                     if (!frame.isDetached()) {
//                         frame.evaluate(() => { 
//                             window.isStreamMuted = true;
//                             document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); 
//                         }).catch(()=>{});
//                     }
//                 } catch(e) {}
//             }
//         }

//         watchdogTicks++;

//         if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
//             let logBackupStatus = await checkPageStatus(backupPage);
//             let nextAfterBackupIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//             let nextAfterBackupUrl = urlList[nextAfterBackupIndex].url;
            
//             console.log(`\n==================================================`);
//             console.log(`[💓] ACTIVE HEARTBEAT (${activeBrowserName}): Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'} (Limit: ${activeHangThresholdMs/1000}s)`);
//             console.log(`[▶️] CURRENTLY LIVE              : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//             console.log(`--------------------------------------------------`);
//             console.log(`[🖤] BACKUP HEARTBEAT (${backupBrowserName}): Status is ${logBackupStatus.status} | Video Time: ${logBackupStatus.currentTime ? logBackupStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//             console.log(`[🔄] RUNNING IN BACKGROUND       : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//             console.log(`[⏭️] NEXT QUEUE (AFTER BACKUP)  : Server [${nextAfterBackupIndex}] -> ${nextAfterBackupUrl}`);
//             console.log(`==================================================\n`);
//         }

        

//         // =========================================================================================
//         // 🔄 2. ACTIVE TAB HOT-SWAP SHIELD (UPDATED: INSTANT SEAMLESS PROMOTION)
//         // =========================================================================================
//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH') {
            
//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 console.log(`[⏳] Watchdog detected '${activeStatus.status}', but stream is in WARM-UP phase. Waiting...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             }

//             let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

//             if (isProactiveRefresh) {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] 🔄 PROACTIVE REFRESH TRIGGERED`);
//                 console.log(`[*] Initiating forward rotation to prevent stream drop...`);
//                 console.log(`==================================================`);
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
//                 console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`==================================================`);
                
//             }
            
//             console.log(`[*] Checking Backup Tab status before switching...`);
//             let backupStatus = await checkPageStatus(backupPage);



// // --------------------------------------------------------------------
//             // ⚡ SCENARIO A: INSTANT SEAMLESS HOT-SWAP (BACKUP IS ALREADY HEALTHY)
//             // --------------------------------------------------------------------
//             if (backupStatus.status === 'HEALTHY' && !isProactiveRefresh) {
                
//                 console.log('\n==================================================');
//                 console.log('[⚡] BACKUP STREAM ALREADY HEALTHY');
//                 console.log('[⚡] SHOWING TRANSITION UI & PROMOTING INSTANTLY');
//                 console.log('==================================================');

//                 // 1. Visually ek smooth "RECONNECTING" UI lagayein
//                 await showLoadingUI(backupPage, "RECONNECTING", "Establishing secure connection to backup server <span class='stream-blink'>...</span>");

//                 // 2. Tab ko screen par layein
//                 try { await backupPage.bringToFront(); } catch (e) {}

//                 // 3. Objects swap karein (Chrome 2 ab Chrome 1 ban gaya)
//                 let brokenPage = activePage; 
//                 activePage = backupPage; 
//                 backupPage = brokenPage;

//                 let brokenBrowser = activeBrowser; 
//                 activeBrowser = backupBrowser; 
//                 backupBrowser = brokenBrowser;

//                 let brokenName = activeBrowserName;
//                 activeBrowserName = backupBrowserName;
//                 backupBrowserName = brokenName;

//                 let previousActiveIndex = currentUrlIndex;
//                 currentUrlIndex = backupUrlIndex;
//                 activeUrlStr = urlList[currentUrlIndex].url; 
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 // 4. 🛠️ INSTANT AUDIO FIX: Background tab mute tha, isko foran unmute karein swap hotay hi!
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             await frame.evaluate(() => { 
//                                 window.isStreamMuted = false;
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                                 document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                             });
//                         }
//                     } catch(e) {}
//                 }

//                 // 5. State Reset (Keep isWarmupPhase FALSE because stream is already healthy)
//                 lastActiveTime = -1; 
//                 lastDecodedFrames = -1;
//                 frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false; 

//                 streamSetupTime = Date.now(); 
//                 currentStreamStartTime = Date.now();
//                 isWarmupPhase = false; 
                
//                 // Extra buffer time for background checks to avoid conflicts
//                 backupWarmupTime = Date.now() + 5000; 

//                 // 6. SMOOTH UI REMOVAL: Wait 1.5s for render paint to stabilize
//                 await new Promise(r => setTimeout(r, 1500));
//                 try { await hideLoadingUI(activePage); } catch(e) {}

//                 console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`[🔊] LIVE AUDIO STATUS : ON (Seamlessly Promoted & Unmuted)`);
//                 console.log(`--------------------------------------------------`);
//                 console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//                 console.log(`==================================================\n`);

//                 // 7. 🛠️ CPU BOTTLENECK FIX: Heavy background rebuilding ko 3 seconds delay karein
//                 // Taa k watchdog ka immediate next active check timeout na ho aur "DEAD" issue na aye.
//                 setTimeout(async () => {
//                     try {
//                         console.log(`[⏳] Starting background buffer rebuilding safely...`);
//                         await backupPage.goto('about:blank').catch(()=>{});
//                         await applyPreloadFirewall(backupPage);
//                         await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                         await initializeVideo(backupPage, true, false);
//                     } catch (e) {
//                         console.log(`[⚠️] Background buffer navigation handled safely.`);
//                     }
//                 }, 3000); 
//             }







//             // --------------------------------------------------------------------
//             // 🔄 SCENARIO B: PROACTIVE REFRESH OR FORCED RECONNECTION
//             // --------------------------------------------------------------------
//             else if (isProactiveRefresh || (backupStatus.status === 'HEALTHY' && isProactiveRefresh)) {
                
//                 for (const frame of activePage.frames()) {
//                     try { if (!frame.isDetached()) await frame.evaluate(() => { window.isStreamMuted = true; document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                 }
                
//                 await showLoadingUI(backupPage, "REFRESHING CONNECTION", "Optimizing current server stream <span class='stream-blink'>...</span>");
//                 await backupPage.bringToFront();
//                 await new Promise(r => setTimeout(r, 1000)); 
                
//                 try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                 console.log(`[*] Initializing Video on the newly active tab...`);
//                 await initializeVideo(backupPage, false, true); 
//                 await hideLoadingUI(backupPage);

//                 let brokenPage = activePage; 
//                 activePage = backupPage; 
//                 backupPage = brokenPage;

//                 let brokenBrowser = activeBrowser; 
//                 activeBrowser = backupBrowser; 
//                 backupBrowser = brokenBrowser;

//                 let brokenName = activeBrowserName;
//                 activeBrowserName = backupBrowserName;
//                 backupBrowserName = brokenName;
                
//                 lastActiveTime = -1; frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false; 

//                 let previousActiveIndex = currentUrlIndex;
//                 currentUrlIndex = backupUrlIndex;
//                 activeUrlStr = urlList[currentUrlIndex].url; 
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`\n==================================================`);
//                 console.log(`[🔄] PROACTIVE REFRESH EXECUTED SUCCESSFULLY`);
//                 console.log(`==================================================`);

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                 } catch (e) {}
                
//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true;
//                 currentStreamStartTime = Date.now();
//                 // 🚀 FIX: Lock background watchdog for Proactive Refresh too!
//                 backupWarmupTime = Date.now(); 
//             }



//             // --------------------------------------------------------------------
//             // ❌ SCENARIO C: BOTH TABS FAILED (Fresh Hunting Mode)
//             // --------------------------------------------------------------------
//             else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ BOTH TABS FAILED (Active & Backup Compromised)`);
//                 console.log(`[🔍] FRESH HUNTING MODE ACTIVATED: Spawning clean tabs...`);
//                 console.log(`==================================================`);
                
//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch (e) {}

//                 currentUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 activeUrlStr = urlList[currentUrlIndex].url;
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] Hunting Active -> Server [${currentUrlIndex}]`);
//                 console.log(`[*] Hunting Backup -> Server [${backupUrlIndex}]`);

//                 console.log(`[*] Closing crashed tabs and spawning fresh ones...`);
//                 try { await activePage.close(); } catch(e) {}
//                 try { await backupPage.close(); } catch(e) {}

//                 activePage = await activeBrowser.newPage();
//                 backupPage = await backupBrowser.newPage();

//                 await setupNetworkAdBlocker(activePage);
//                 await setupNetworkAdBlocker(backupPage);
//                 attachAntiAdListeners(activePage);
//                 attachAntiAdListeners(backupPage);
//                 await applyPreloadFirewall(activePage);
//                 await applyPreloadFirewall(backupPage);

//                 try {
//                     await activePage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 });
//                     await showLoadingUI(activePage, "SEARCHING SERVER", "Hunting for a stable stream connection <span class='stream-blink'>...</span>");
//                     await initializeVideo(activePage, false, true); 
//                     await hideLoadingUI(activePage);
//                 } catch(e) {}

//                 try {
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{});
//                     await initializeVideo(backupPage, true, false); 
//                 } catch(e) {}

//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true; 
//                 currentStreamStartTime = Date.now();
//                 backupWarmupTime = Date.now();
//                 lastActiveTime = -1;
//                 frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false;

//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
                
//                 console.log(`[*] Fresh tabs active. Waiting 15 seconds (Warm-up) for video to stabilize...`);
//             }
//         } 
       
//         await new Promise(r => setTimeout(r, 2000)); 
//     }
// }

// async function startDirectStreaming() {
//     activeBrowserName = "CHROME 1";
//     backupBrowserName = "CHROME 2";
    
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

//     browserArgs = [
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
//         '--disable-blink-features=AutomationControlled',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion,NetworkServiceInProcess2',
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

//     console.log(`[*] Starting ACTIVE browser instance...`);
//     activeBrowser = await createBrowserInstance(browserArgs);
//     const activePages = await activeBrowser.pages();
//     activePage = activePages[0];

//     console.log(`[*] Starting BACKUP browser instance in background...`);
//     backupBrowser = await createBrowserInstance(browserArgs);
//     const backupPages = await backupBrowser.pages();
//     backupPage = backupPages[0];

//     activeBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => { if (newPage && newPage !== activePage) { try { await newPage.close(); } catch(e) {} } }, 500);
//         }
//     });

//     backupBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => { if (newPage && newPage !== backupPage) { try { await newPage.close(); } catch(e) {} } }, 500);
//         }
//     });

//     await setupNetworkAdBlocker(activePage);
//     await setupNetworkAdBlocker(backupPage);

//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await applyPreloadFirewall(activePage);
//     await applyPreloadFirewall(backupPage);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex].url}`);
//     try {
//         await activePage.goto(urlList[currentUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 });
//     } catch (e) {
//         console.log(`[⚠️] Network buffer safely handled for primary URL.`);
//     }
    
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     await initializeVideo(activePage, false, true); 
//     await hideLoadingUI(activePage); 

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex].url}`);
//     try {
//         await backupPage.goto(urlList[backupUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 });
//     } catch (e) {}
    
//     await initializeVideo(backupPage, true, false);
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 
//     await hideLoadingUI(activePage);

//     console.log(`\n==================================================`);
//     console.log(`[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     console.log(`==================================================`);
//     console.log(`[📺] CURRENT ACTIVE LIVE : Server [${currentUrlIndex}] -> ${urlList[currentUrlIndex].url}`);
//     console.log(`[🔊] LIVE AUDIO STATUS   : ON (Unmuted)`);
//     console.log(`--------------------------------------------------`);
//     console.log(`[🛡️] NEXT BACKUP QUEUE   : Server [${backupUrlIndex}] -> ${urlList[backupUrlIndex].url}`);
//     console.log(`[🔇] BACKUP AUDIO STATUS : MUTED (Background)`);
//     console.log(`==================================================\n`);

//     console.log('[*] Everything Setup! Dual-Tab Monitoring is Active.');
//     await startWatchdog();
// }

// async function mainLoop() {
//     while (true) {
//         try {
//             await startDirectStreaming();
//         } catch (error) {
//             console.error('\n==================================================');
//             console.error('[🚨] FATAL ENGINE ERROR');
//             console.error(`[!] ${error.message}`);
//             console.error('==================================================');

//             if (activeBrowser && activeBrowser.isConnected()) {
//                 console.log('[🛡️] ACTIVE CHROME STILL ALIVE — NOT RESTARTING ENGINE.');
//                 await new Promise(resolve => setTimeout(resolve, 3000));
//                 continue;
//             }

//             if (backupBrowser && backupBrowser.isConnected()) {
//                 console.log('[🛡️] BACKUP CHROME STILL ALIVE — NOT RESTARTING ENGINE.');
//                 await new Promise(resolve => setTimeout(resolve, 3000));
//                 continue;
//             }

//             console.log('[⚠️] NO CHROME INSTANCE SURVIVED. Performing final recovery.');

//             try { if (activeBrowser) await activeBrowser.close().catch(() => {}); } catch (e) {}
//             try { if (backupBrowser) await backupBrowser.close().catch(() => {}); } catch (e) {}

//             activeBrowser = null; backupBrowser = null; activePage = null; backupPage = null;

//             await new Promise(resolve => setTimeout(resolve, 3000));
//             await cleanup();
//         }
//     }
// }

// async function cleanup() {
//     console.log('[*] Cleaning up resources...');
//     try { await obs.disconnect(); } catch (e) { } 
//     if (activeBrowser) { try { await activeBrowser.close(); } catch(e) { } activeBrowser = null; }
//     if (backupBrowser) { try { await backupBrowser.close(); } catch(e) { } backupBrowser = null; }
    
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
//             const targetUrls = process.env.TARGET_URLS || 'https://sport4u.online';
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














































// cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
// ============== Alhamdullah done, streamed.pk also done. Alhamdullah Chuukar Alhamdullah ===================================



// const puppeteer = require('puppeteer-extra');
// let isWarmupPhase = true;
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD (DEBUGGING MODE)
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     console.error('\n========================================');
//     console.error('[💥] UNCAUGHT EXCEPTION');
//     console.error(err);
//     console.error(err.stack);
//     console.error('========================================\n');
// });

// process.on('unhandledRejection', (reason) => {
//     console.error('\n========================================');
//     console.error('[💥] UNHANDLED REJECTION');
//     console.error(reason);
//     console.error('========================================\n');
// });

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME (IN MINUTES)
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 40000; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// // =========================================================================================
// // 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// // =========================================================================================
// const NO_REFRESH_DOMAINS = [
//     'youtube.com',
//     'facebook.com',
//     'streamed.pk',
//     'cricstreams.', 
//     'sport4u.online',
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

// // =========================================================================================
// // 🔄 DYNAMIC URL PARSER & METADATA EXTRACTOR
// // =========================================================================================
// let rawUrls = (process.env.TARGET_URLS || '').trim();
// let urlList = [];

// if (rawUrls !== '') {
//     urlList = rawUrls.split(',').map(u => {
//         let trimmed = u.trim();
//         let hangThreshold = 8000; 
        
//         if (trimmed.startsWith('!')) {
//             hangThreshold = 20000; 
//             trimmed = trimmed.substring(1); 
//         }
//         if (!trimmed.startsWith('http')) trimmed = 'https://' + trimmed;
        
//         return { url: trimmed, hangTime: hangThreshold };
//     });
// } else {
//     urlList = [
//         { url: 'https://sport4u.online', hangTime: 8000 },
//         { url: 'https://dadocric.st/player.php?id=starsp3&v=m', hangTime: 8000 }
//     ];
// }

// function getSafeBackupIndex(activeIndex, currentIndex, list) {
//     if (list.length <= 1) return 0; 
//     let next = (currentIndex + 1) % list.length;
//     if (next === activeIndex) {
//         next = (next + 1) % list.length; 
//     }
//     return next;
// }

// let currentUrlIndex = 0;
// let backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);

// const SELECTED_CHANNEL = process.env.OKRU_STREAM_ID || '1';
// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None'; 
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

// const ACTIVE_STREAM_KEY = STREAM_KEYS[SELECTED_CHANNEL] || STREAM_KEYS['1'];

// let browserArgs = []; // Global Browser Args for Recovery Functions
// let activeBrowser = null;
// let backupBrowser = null;
// let activeBrowserName = "CHROME 1";
// let backupBrowserName = "CHROME 2";
// let obsProcess = null;
// let activePage = null;
// let backupPage = null;

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount = 0;

// async function createBrowserInstance(args) {
//     return await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: args
//     });
// }

// // =========================================================================================
// // 🛡️ SMART BROWSER RECOVERY
// // =========================================================================================

// async function preparePage(page) {
//     if (!page) return;
//     await setupNetworkAdBlocker(page);
//     attachAntiAdListeners(page);
//     await applyPreloadFirewall(page);
// }

// async function createFreshBackupBrowser() {
//     console.log('\n[🛠️] BACKUP RECOVERY: Creating fresh backup Chrome...');
//     try {
//         if (backupBrowser && backupBrowser.isConnected()) {
//             try {
//                 const pages = await backupBrowser.pages();
//                 for (const p of pages) {
//                     try { await p.close(); } catch (e) {}
//                 }
//             } catch (e) {}
//         }
//     } catch (e) {}

//     try {
//         if (backupBrowser && !backupBrowser.isConnected()) {
//             backupBrowser = null;
//         }
//     } catch (e) {
//         backupBrowser = null;
//     }

//     backupBrowser = await createBrowserInstance(browserArgs);
//     const pages = await backupBrowser.pages();
//     backupPage = pages[0];
//     await preparePage(backupPage);

//     backupBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             try {
//                 const newPage = await target.page();
//                 setTimeout(async () => {
//                     if (newPage && newPage !== backupPage) {
//                         try { await newPage.close(); } catch (e) {}
//                     }
//                 }, 500);
//             } catch (e) {}
//         }
//     });

//     console.log('[✅] BACKUP RECOVERY: Fresh backup Chrome created.');
//     return true;
// }

// async function createFreshActiveBrowser() {
//     console.log('\n[🛠️] ACTIVE RECOVERY: Creating fresh active Chrome...');
//     try {
//         if (activeBrowser && activeBrowser.isConnected()) {
//             try {
//                 const pages = await activeBrowser.pages();
//                 for (const p of pages) {
//                     try { await p.close(); } catch (e) {}
//                 }
//             } catch (e) {}
//         }
//     } catch (e) {}

//     try {
//         if (activeBrowser && !activeBrowser.isConnected()) {
//             activeBrowser = null;
//         }
//     } catch (e) {
//         activeBrowser = null;
//     }

//     activeBrowser = await createBrowserInstance(browserArgs);
//     const pages = await activeBrowser.pages();
//     activePage = pages[0];
//     await preparePage(activePage);

//     activeBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             try {
//                 const newPage = await target.page();
//                 setTimeout(async () => {
//                     if (newPage && newPage !== activePage) {
//                         try { await newPage.close(); } catch (e) {}
//                     }
//                 }, 500);
//             } catch (e) {}
//         }
//     });

//     console.log('[✅] ACTIVE RECOVERY: Fresh active Chrome created.');
//     return true;
// }

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
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') {
//                     init.mode = 'open'; 
//                 }
//                 const shadowRoot = originalAttachShadow.call(this, init);
                
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) {
//                         console.log('[🛡️] SHIELD: Shadow DOM Ad Detected & Destroyed!');
//                         this.remove(); 
//                     }
//                 });
                
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };
            
//             Element.prototype.attachShadow.toString = function() { return "function attachShadow() { [native code] }"; };

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
//                 in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }
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
//                             .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
//                             @keyframes blinker { 50% { opacity: 0.3; } }
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

// async function showRecoveryUI(page) {
//     try {
//         await page.evaluate(() => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('stream-recovery-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 return;
//             }
            
//             overlay = document.createElement('div');
//             overlay.id = 'stream-recovery-overlay';
//             overlay.innerHTML = `
//                 <style>
//                     #stream-recovery-overlay {
//                         position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                         width: 100vw !important; height: 100vh !important; background: rgba(0, 0, 0, 0.95) !important;
//                         z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                         justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                         font-family: Arial, sans-serif !important; pointer-events: all !important; backdrop-filter: blur(8px);
//                     }
//                     .recovery-radar {
//                         width: 100px; height: 100px; border-radius: 50%;
//                         border: 3px solid transparent; border-top-color: #ff9800; border-bottom-color: #ff9800;
//                         animation: radar-spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
//                         margin-bottom: 20px; box-shadow: 0 0 30px rgba(255, 152, 0, 0.3);
//                     }
//                     .recovery-radar::before {
//                         content: ''; position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px;
//                         border-radius: 50%; border: 3px solid transparent; border-left-color: #f44336; border-right-color: #f44336;
//                         animation: radar-spin 2s linear infinite reverse;
//                     }
//                     @keyframes radar-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                     .warn-title { font-size: 32px !important; font-weight: 800 !important; color: #ff9800 !important; letter-spacing: 2px !important; margin-bottom: 10px !important; text-transform: uppercase !important; }
//                     .warn-sub { font-size: 18px !important; color: #dddddd !important; animation: pulse-text 1.5s infinite; }
//                     @keyframes pulse-text { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
//                 </style>
//                 <div class="recovery-radar"></div>
//                 <div class="warn-title">SIGNAL LOST</div>
//                 <div class="warn-sub">Attempting Auto-Recovery...</div>
//             `;
//             document.documentElement.appendChild(overlay);
//         });
//     } catch (e) {}
// }

// async function hideRecoveryUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('stream-recovery-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'none', 'important');
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
    
//     const basicIniContent = `[General]\nName=Untitled\n[Video]\nBaseCX=${RES_W}\nBaseCY=${RES_H}\nOutputCX=${RES_W}\nOutputCY=${RES_H}\nFPSCommon=30\n[Output]\nMode=Simple\n[SimpleOutput]\nVBitrate=${BITRATE}\nStreamEncoder=x264\nx264Preset=ultrafast\nx264Settings=keyint=60 tune=zerolatency profile=main threads=4 rc-lookahead=0\n`;
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
//                             // await takeAndBatchScreenshot(page, `play-btn-clicked`);
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
//                             // await takeAndBatchScreenshot(page, `force-play-applied`);
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

//                     const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay):not(#stream-recovery-overlay):not([class*="player"]):not([class*="jw"]):not([class*="vjs"]), [id*="pop"], [class*="pop"], a[href*="extension"], [class*="notification"], [id*="notification"]';
//                     document.querySelectorAll(junkClasses).forEach(el => { 
//                         try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } 
//                     });

//                     const adKeywords = ['jerk', 'mate', 'free', 'online', 'adult', 'dating', 'close', 'notification', 'justine', 'paying', 'job'];
//                     document.querySelectorAll('div, section, span, a').forEach(el => {
//                         if (el.id === 'smart-stream-overlay' || el.id === 'stream-recovery-overlay') return;
                        
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
//             // FIX 1: Use window object to control audio globally to avoid Audio War
//             window.isStreamMuted = muteVideo; 

//             setInterval(() => {
//                 try {
//                     const style = document.createElement('style');
//                     style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                     document.head.appendChild(style);

//                     const mediaElements = document.querySelectorAll('video, audio');
//                     const videos = Array.from(document.querySelectorAll('video'));
//                     let realVideo = null;

//                     mediaElements.forEach(media => { 
//                         media.muted = window.isStreamMuted; 
//                         media.volume = window.isStreamMuted ? 0.0 : 1.0; 
//                     });

//                     if (!window.isStreamMuted) {
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (!realVideo && videos.length > 0) {
//                         realVideo = videos[0];
//                     }

//                     if (realVideo) { 
//                         let playerWrap = realVideo.closest('.jwplayer, #player, .plyr, .vjs-player, .shaka-video-container, [data-player]') || realVideo;
                        
//                         playerWrap.style.setProperty('position', 'fixed', 'important');
//                         playerWrap.style.setProperty('top', '0px', 'important');
//                         playerWrap.style.setProperty('left', '0px', 'important');
//                         playerWrap.style.setProperty('width', '100vw', 'important');
//                         playerWrap.style.setProperty('height', '100vh', 'important');
//                         playerWrap.style.setProperty('z-index', '2147483646', 'important'); 
//                         playerWrap.style.setProperty('background-color', 'black', 'important');
//                         playerWrap.style.setProperty('opacity', '1', 'important');
//                         playerWrap.style.setProperty('visibility', 'visible', 'important');
//                         playerWrap.style.setProperty('display', 'block', 'important');
                        
//                         if (playerWrap !== realVideo) {
//                             realVideo.style.setProperty('width', '100%', 'important');
//                             realVideo.style.setProperty('height', '100%', 'important');
//                         }
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                     }
//                 } catch(err) {}
//             }, 500); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     if (!startMuted) {
//         await triggerSmartUnmute(page);
//         await new Promise(r => setTimeout(r, 1000));
//     }
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
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     let backupWarmupTime = Date.now(); 
//     const WARMUP_MAX_TIME = 15000; 

//     let activeUrlStr = urlList[currentUrlIndex].url;
//     let backupUrlStr = urlList[backupUrlIndex].url;

//     let currentStreamStartTime = Date.now();
//     let isRecoveryUIShown = false;

//     while (true) {
//         // =====================================================================================
//         // 🛡️ NEVER THROW JUST BECAUSE ONE CHROME DISCONNECTED
//         // Recover the affected side instead.
//         // =====================================================================================
//         const activeBrowserAlive = activeBrowser && activeBrowser.isConnected();
//         const backupBrowserAlive = backupBrowser && backupBrowser.isConnected();

//         // ---------------------------------------------------------------------
//         // CASE 1: ACTIVE CHROME DEAD, BACKUP CHROME STILL ALIVE
//         // ---------------------------------------------------------------------
//         if (!activeBrowserAlive && backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[🚨] ACTIVE CHROME DISCONNECTED');
//             console.log('[🔄] BACKUP CHROME IS ALIVE');
//             console.log('[⚡] PROMOTING BACKUP -> ACTIVE');
//             console.log('[🛡️] OBS WILL CONTINUE RUNNING');
//             console.log('==================================================\n');

//             const oldActiveBrowser = activeBrowser;
//             const oldActivePage = activePage;
//             activeBrowser = backupBrowser;
//             activePage = backupPage;
//             backupBrowser = oldActiveBrowser;
//             backupPage = oldActivePage;

//             const oldActiveName = activeBrowserName;
//             activeBrowserName = backupBrowserName;
//             backupBrowserName = oldActiveName;

//             const previousActiveIndex = currentUrlIndex;
//             currentUrlIndex = backupUrlIndex;
//             activeUrlStr = urlList[currentUrlIndex].url;

//             backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//             backupUrlStr = urlList[backupUrlIndex].url;

//             lastActiveTime = -1; lastDecodedFrames = -1; frozenCheckTimestamp = Date.now();
//             streamSetupTime = Date.now(); currentStreamStartTime = Date.now();
//             isWarmupPhase = true; backupWarmupTime = Date.now(); isRecoveryUIShown = false;

//             try { await activePage.bringToFront(); await hideLoadingUI(activePage); } catch (e) {}

//             console.log('[✅] BACKUP PROMOTED SUCCESSFULLY');
//             console.log(`[📺] NEW ACTIVE SERVER : [${currentUrlIndex}] -> ${activeUrlStr}`);
//             console.log(`[🔊] ACTIVE AUDIO      : ON`);
//             console.log(`[🛡️] NEW BACKUP SERVER : [${backupUrlIndex}] -> ${backupUrlStr}`);

//             try {
//                 await createFreshBackupBrowser();
//                 await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await initializeVideo(backupPage, true, false);
//                 console.log('[✅] NEW BACKUP SERVER IS BUFFERING IN BACKGROUND');
//             } catch (e) {
//                 console.log(`[⚠️] Backup recreation failed. Watchdog will try the NEXT server.`);
//             }
//             continue;
//         }

//         // ---------------------------------------------------------------------
//         // CASE 2: BACKUP CHROME DEAD, ACTIVE CHROME STILL ALIVE
//         // ---------------------------------------------------------------------
//         if (activeBrowserAlive && !backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[⚠️] BACKUP CHROME DISCONNECTED');
//             console.log('[🛡️] ACTIVE STREAM WILL NOT BE TOUCHED');
//             console.log('[🔄] REBUILDING BACKUP WITH NEXT SERVER');
//             console.log('==================================================\n');

//             try {
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] NEXT BACKUP SERVER -> [${backupUrlIndex}] ${backupUrlStr}`);
//                 await createFreshBackupBrowser();
//                 await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await initializeVideo(backupPage, true, false);
//                 backupWarmupTime = Date.now();
//                 console.log(`[✅] BACKUP RECOVERED -> Server [${backupUrlIndex}]`);
//             } catch (e) {
//                 console.log(`[⚠️] Backup recovery failed. NEXT WATCHDOG CYCLE WILL TRY AGAIN.`);
//             }
//         }

//         // ---------------------------------------------------------------------
//         // CASE 3: BOTH CHROMES DEAD
//         // ---------------------------------------------------------------------
//         if (!activeBrowserAlive && !backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[🚨] BOTH CHROME INSTANCES DISCONNECTED');
//             console.log('[🛠️] LOCAL RECOVERY MODE');
//             console.log('[🛑] OBS WILL NOT BE RESTARTED');
//             console.log('==================================================\n');

//             try {
//                 currentUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 activeUrlStr = urlList[currentUrlIndex].url;

//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] RECOVERY ACTIVE -> [${currentUrlIndex}] ${activeUrlStr}`);
//                 console.log(`[*] RECOVERY BACKUP -> [${backupUrlIndex}] ${backupUrlStr}`);

//                 await createFreshActiveBrowser();
//                 await activePage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await showLoadingUI(activePage, "SEARCHING SERVER", "Finding a stable stream connection <span class='stream-blink'>...</span>");
//                 await initializeVideo(activePage, false, true);
//                 await hideLoadingUI(activePage);

//                 console.log('[✅] ACTIVE CHROME RECOVERED');

//                 try {
//                     await createFreshBackupBrowser();
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                     console.log('[✅] BACKUP CHROME RECOVERED');
//                 } catch (backupError) {
//                     console.log('[⚠️] Backup failed. Active stream continues.');
//                 }

//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}

//                 streamSetupTime = Date.now(); currentStreamStartTime = Date.now(); backupWarmupTime = Date.now();
//                 frozenCheckTimestamp = Date.now(); lastActiveTime = -1; lastDecodedFrames = -1;
//                 isWarmupPhase = true; isRecoveryUIShown = false;

//                 console.log('[✅] LOCAL RECOVERY COMPLETE — WATCHDOG CONTINUES');
//             } catch (e) {
//                 console.log(`[❌] Local Chrome recovery failed: ${e.message}`);
//                 await new Promise(r => setTimeout(r, 3000));
//             }
//             continue;
//         }

//         let activeHangThresholdMs = urlList[currentUrlIndex].hangTime;
//         let activeStatus = await checkPageStatus(activePage);

//         // 🔄 1. BACKGROUND SHIELD
//         if (!isWarmupPhase && (Date.now() - backupWarmupTime > 30000)) { 
//             let backupStatus = await checkPageStatus(backupPage);
            
//             if (backupStatus.status === 'DEAD' || backupStatus.status === 'CRITICAL_ERROR' || backupStatus.status === 'FROZEN') {
//                 console.log(`\n[⚠️] BACKGROUND SHIELD: Backup Server [${backupUrlIndex}] failed silently.`);
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;
                
//                 console.log(`[*] Shifting Backup Chrome to NEXT link -> Server [${backupUrlIndex}]`);
//                 backupWarmupTime = Date.now();
                
//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                 } catch(e) {}
//             }
//         }

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

//         // Active Tab Audio Watchdog Fix (Stop Audio War)
//         if (activeStatus.status === 'HEALTHY') {
//             await hideLoadingUI(activePage); 
//             isWarmupPhase = false; 

//             let isTimeStuck = (activeStatus.currentTime === lastActiveTime);
//             let isFrameStuck = (activeStatus.decodedFrames === lastDecodedFrames && activeStatus.decodedFrames > 0);

//             if (isTimeStuck || isFrameStuck) {
//                 if (!isRecoveryUIShown) {
//                     await showRecoveryUI(activePage);
//                     isRecoveryUIShown = true;
//                     console.log(`[⚠️] Stream Hang Detected! Showing Signal Recovery Shield instantly...`);
//                 }

//                 if (Date.now() - frozenCheckTimestamp > activeHangThresholdMs) {
//                     activeStatus.status = 'FROZEN';
//                     if (isFrameStuck && !isTimeStuck) {
//                         console.log(`[!] ⚠️ SYSTEM SHIELD: Detected Black Screen (Audio playing, but video frames stuck). Triggering HOT-SWAP.`);
//                     }
//                     isRecoveryUIShown = false; 
//                 }
//             } else {
//                 lastActiveTime = activeStatus.currentTime; 
//                 lastDecodedFrames = activeStatus.decodedFrames; 
//                 frozenCheckTimestamp = Date.now();
                
//                 if (isRecoveryUIShown) {
//                     await hideRecoveryUI(activePage);
//                     isRecoveryUIShown = false;
//                     console.log(`[✅] Stream Recovered! Signal Recovery Shield removed instantly.`);
//                 }
                
//                 // Mute override for active page (Audio fix applied)
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             frame.evaluate(() => { 
//                                 window.isStreamMuted = false;
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                                 document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                             }).catch(()=>{});
//                         }
//                     } catch(e) {}
//                 }
//             }
//         }

//         // Backup Tab Audio Watchdog Fix
//         if (backupPage) {
//             for (const frame of backupPage.frames()) {
//                 try {
//                     if (!frame.isDetached()) {
//                         frame.evaluate(() => { 
//                             window.isStreamMuted = true;
//                             document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); 
//                         }).catch(()=>{});
//                     }
//                 } catch(e) {}
//             }
//         }

//         watchdogTicks++;

//         if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
//             let logBackupStatus = await checkPageStatus(backupPage);
//             let nextAfterBackupIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//             let nextAfterBackupUrl = urlList[nextAfterBackupIndex].url;
            
//             console.log(`\n==================================================`);
//             console.log(`[💓] ACTIVE HEARTBEAT (${activeBrowserName}): Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'} (Limit: ${activeHangThresholdMs/1000}s)`);
//             console.log(`[▶️] CURRENTLY LIVE              : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//             console.log(`--------------------------------------------------`);
//             console.log(`[🖤] BACKUP HEARTBEAT (${backupBrowserName}): Status is ${logBackupStatus.status} | Video Time: ${logBackupStatus.currentTime ? logBackupStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//             console.log(`[🔄] RUNNING IN BACKGROUND       : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//             console.log(`[⏭️] NEXT QUEUE (AFTER BACKUP)  : Server [${nextAfterBackupIndex}] -> ${nextAfterBackupUrl}`);
//             console.log(`==================================================\n`);
//         }

//         if (watchdogTicks % 120 === 0) {
//             await takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
//         }

//         // =========================================================================================
//         // 🔄 2. ACTIVE TAB HOT-SWAP SHIELD (UPDATED: INSTANT SEAMLESS PROMOTION)
//         // =========================================================================================
//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH') {
            
//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 console.log(`[⏳] Watchdog detected '${activeStatus.status}', but stream is in WARM-UP phase. Waiting...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             }

//             let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

//             if (isProactiveRefresh) {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] 🔄 PROACTIVE REFRESH TRIGGERED`);
//                 console.log(`[*] Initiating forward rotation to prevent stream drop...`);
//                 console.log(`==================================================`);
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
//                 console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`==================================================`);
//                 await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
//             }
            
//             console.log(`[*] Checking Backup Tab status before switching...`);
//             let backupStatus = await checkPageStatus(backupPage);


// // =====================================



// // ======================================

// // --------------------------------------------------------------------
//             // ⚡ SCENARIO A: INSTANT SEAMLESS HOT-SWAP (BACKUP IS ALREADY HEALTHY)
//             // --------------------------------------------------------------------
//             if (backupStatus.status === 'HEALTHY' && !isProactiveRefresh) {
                
//                 console.log('\n==================================================');
//                 console.log('[⚡] BACKUP STREAM ALREADY HEALTHY');
//                 console.log('[⚡] SHOWING TRANSITION UI & PROMOTING INSTANTLY');
//                 console.log('==================================================');

//                 // 1. Visually ek smooth "RECONNECTING" UI lagayein
//                 await showLoadingUI(backupPage, "RECONNECTING", "Establishing secure connection to backup server <span class='stream-blink'>...</span>");

//                 // 2. Tab ko screen par layein
//                 try { await backupPage.bringToFront(); } catch (e) {}

//                 // 3. Objects swap karein (Chrome 2 ab Chrome 1 ban gaya)
//                 let brokenPage = activePage; 
//                 activePage = backupPage; 
//                 backupPage = brokenPage;

//                 let brokenBrowser = activeBrowser; 
//                 activeBrowser = backupBrowser; 
//                 backupBrowser = brokenBrowser;

//                 let brokenName = activeBrowserName;
//                 activeBrowserName = backupBrowserName;
//                 backupBrowserName = brokenName;

//                 let previousActiveIndex = currentUrlIndex;
//                 currentUrlIndex = backupUrlIndex;
//                 activeUrlStr = urlList[currentUrlIndex].url; 
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 // 4. 🛠️ INSTANT AUDIO FIX: Background tab mute tha, isko foran unmute karein swap hotay hi!
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             await frame.evaluate(() => { 
//                                 window.isStreamMuted = false;
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                                 document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                             });
//                         }
//                     } catch(e) {}
//                 }

//                 // 5. State Reset (Keep isWarmupPhase FALSE because stream is already healthy)
//                 lastActiveTime = -1; 
//                 lastDecodedFrames = -1;
//                 frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false; 

//                 streamSetupTime = Date.now(); 
//                 currentStreamStartTime = Date.now();
//                 isWarmupPhase = false; 
                
//                 // Extra buffer time for background checks to avoid conflicts
//                 backupWarmupTime = Date.now() + 5000; 

//                 // 6. SMOOTH UI REMOVAL: Wait 1.5s for render paint to stabilize
//                 await new Promise(r => setTimeout(r, 1500));
//                 try { await hideLoadingUI(activePage); } catch(e) {}

//                 console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`[🔊] LIVE AUDIO STATUS : ON (Seamlessly Promoted & Unmuted)`);
//                 console.log(`--------------------------------------------------`);
//                 console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//                 console.log(`==================================================\n`);

//                 // 7. 🛠️ CPU BOTTLENECK FIX: Heavy background rebuilding ko 3 seconds delay karein
//                 // Taa k watchdog ka immediate next active check timeout na ho aur "DEAD" issue na aye.
//                 setTimeout(async () => {
//                     try {
//                         console.log(`[⏳] Starting background buffer rebuilding safely...`);
//                         await backupPage.goto('about:blank').catch(()=>{});
//                         await applyPreloadFirewall(backupPage);
//                         await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                         await initializeVideo(backupPage, true, false);
//                     } catch (e) {
//                         console.log(`[⚠️] Background buffer navigation handled safely.`);
//                     }
//                 }, 3000); 
//             }



// // --------------------------------------------------------------------
//             // ⚡ SCENARIO A: INSTANT SEAMLESS HOT-SWAP (BACKUP IS ALREADY HEALTHY)
//             // --------------------------------------------------------------------
//             // if (backupStatus.status === 'HEALTHY' && !isProactiveRefresh) {
                
//             //     console.log('\n==================================================');
//             //     console.log('[⚡] BACKUP STREAM ALREADY HEALTHY');
//             //     console.log('[⚡] SHOWING TRANSITION UI & PROMOTING INSTANTLY');
//             //     console.log('==================================================');

//             //     // 1. Visually ek smooth "RECONNECTING" UI lagayein
//             //     await showLoadingUI(backupPage, "RECONNECTING", "Establishing secure connection to backup server <span class='stream-blink'>...</span>");

//             //     // 2. Tab ko screen par layein
//             //     try { await backupPage.bringToFront(); } catch (e) {}

//             //     // 3. Objects swap karein (Chrome 2 ab Chrome 1 ban gaya)
//             //     let brokenPage = activePage; 
//             //     activePage = backupPage; 
//             //     backupPage = brokenPage;

//             //     let brokenBrowser = activeBrowser; 
//             //     activeBrowser = backupBrowser; 
//             //     backupBrowser = brokenBrowser;

//             //     let brokenName = activeBrowserName;
//             //     activeBrowserName = backupBrowserName;
//             //     backupBrowserName = brokenName;

//             //     let previousActiveIndex = currentUrlIndex;
//             //     currentUrlIndex = backupUrlIndex;
//             //     activeUrlStr = urlList[currentUrlIndex].url; 
                
//             //     backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//             //     backupUrlStr = urlList[backupUrlIndex].url;

//             //     lastActiveTime = -1; 
//             //     lastDecodedFrames = -1;
//             //     frozenCheckTimestamp = Date.now();
//             //     isRecoveryUIShown = false; 

//             //     // streamSetupTime = Date.now(); 
//             //     // currentStreamStartTime = Date.now();
//             //     // isWarmupPhase = false; // Video pehle se ready hai
//             //     streamSetupTime = Date.now(); 
//             //     currentStreamStartTime = Date.now();
//             //     isWarmupPhase = true; // IMPORTANT: Hot-swap k doran lag/timeout se bachne k liye grace period
                
//             //     // 🚀 FIX: Lock background watchdog immediately BEFORE async rebuilding
//             //     // Yeh single line us double-execution bug ko hamesha ke liye rok degi!
//             //     backupWarmupTime = Date.now(); 

//             //     // 4. SMOOTH UI REMOVAL: Background stream is already full-screened by CSS. 
//             //     // We just wait 1.5 seconds for the foreground render paint to stabilize before removing overlay.
//             //     await new Promise(r => setTimeout(r, 1500));
//             //     try { await hideLoadingUI(activePage); } catch(e) {}

//             //     console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//             //     console.log(`[🔊] LIVE AUDIO STATUS : ON (Seamlessly Promoted)`);
//             //     console.log(`--------------------------------------------------`);
//             //     console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//             //     console.log(`==================================================\n`);

//             //     // 5. Old broken tab ko silently background mein rebuild karein (No Blocking)
//             //     (async () => {
//             //         try {
//             //             await backupPage.goto('about:blank').catch(()=>{});
//             //             await applyPreloadFirewall(backupPage);
//             //             await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//             //             await initializeVideo(backupPage, true, false);
//             //         } catch (e) {
//             //             console.log(`[⏳] Background buffer navigation handled safely.`);
//             //         }
//             //     })();
//             // } 


// // ====================================



//             // --------------------------------------------------------------------
//             // 🔄 SCENARIO B: PROACTIVE REFRESH OR FORCED RECONNECTION
//             // --------------------------------------------------------------------
//             else if (isProactiveRefresh || (backupStatus.status === 'HEALTHY' && isProactiveRefresh)) {
                
//                 for (const frame of activePage.frames()) {
//                     try { if (!frame.isDetached()) await frame.evaluate(() => { window.isStreamMuted = true; document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                 }
                
//                 await showLoadingUI(backupPage, "REFRESHING CONNECTION", "Optimizing current server stream <span class='stream-blink'>...</span>");
//                 await backupPage.bringToFront();
//                 await new Promise(r => setTimeout(r, 1000)); 
                
//                 try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                 console.log(`[*] Initializing Video on the newly active tab...`);
//                 await initializeVideo(backupPage, false, true); 
//                 await hideLoadingUI(backupPage);

//                 let brokenPage = activePage; 
//                 activePage = backupPage; 
//                 backupPage = brokenPage;

//                 let brokenBrowser = activeBrowser; 
//                 activeBrowser = backupBrowser; 
//                 backupBrowser = brokenBrowser;

//                 let brokenName = activeBrowserName;
//                 activeBrowserName = backupBrowserName;
//                 backupBrowserName = brokenName;
                
//                 lastActiveTime = -1; frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false; 

//                 let previousActiveIndex = currentUrlIndex;
//                 currentUrlIndex = backupUrlIndex;
//                 activeUrlStr = urlList[currentUrlIndex].url; 
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`\n==================================================`);
//                 console.log(`[🔄] PROACTIVE REFRESH EXECUTED SUCCESSFULLY`);
//                 console.log(`==================================================`);

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                 } catch (e) {}
                
//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true;
//                 currentStreamStartTime = Date.now();
//                 // 🚀 FIX: Lock background watchdog for Proactive Refresh too!
//                 backupWarmupTime = Date.now(); 
//             }


//             // // --------------------------------------------------------------------
//             // // ⚡ SCENARIO A: INSTANT SEAMLESS HOT-SWAP (BACKUP IS ALREADY HEALTHY)
//             // // --------------------------------------------------------------------
//             // if (backupStatus.status === 'HEALTHY' && !isProactiveRefresh) {
                
//             //     console.log('\n==================================================');
//             //     console.log('[⚡] BACKUP STREAM ALREADY HEALTHY');
//             //     console.log('[⚡] SHOWING TRANSITION UI & PROMOTING INSTANTLY');
//             //     console.log('==================================================');

//             //     // 1. Visually ek smooth "RECONNECTING" UI lagayein
//             //     await showLoadingUI(backupPage, "RECONNECTING", "Establishing secure connection to backup server <span class='stream-blink'>...</span>");

//             //     // 2. Tab ko screen par layein
//             //     try { await backupPage.bringToFront(); } catch (e) {}

//             //     // 3. Objects swap karein (Chrome 2 ab Chrome 1 ban gaya)
//             //     let brokenPage = activePage; 
//             //     activePage = backupPage; 
//             //     backupPage = brokenPage;

//             //     let brokenBrowser = activeBrowser; 
//             //     activeBrowser = backupBrowser; 
//             //     backupBrowser = brokenBrowser;

//             //     let brokenName = activeBrowserName;
//             //     activeBrowserName = backupBrowserName;
//             //     backupBrowserName = brokenName;

//             //     let previousActiveIndex = currentUrlIndex;
//             //     currentUrlIndex = backupUrlIndex;
//             //     activeUrlStr = urlList[currentUrlIndex].url; 
                
//             //     backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//             //     backupUrlStr = urlList[backupUrlIndex].url;

//             //     lastActiveTime = -1; 
//             //     lastDecodedFrames = -1;
//             //     frozenCheckTimestamp = Date.now();
//             //     isRecoveryUIShown = false; 

//             //     streamSetupTime = Date.now(); 
//             //     currentStreamStartTime = Date.now();
//             //     isWarmupPhase = false; // Video pehle se ready hai

//             //     // 4. 🧠 SMART CHECK: Wait until video is ACTUALLY Fullscreen before removing UI
//             //     console.log(`[*] Verifying if stream is fullscreen before removing Reconnecting UI...`);
//             //     let checkAttempts = 0;
//             //     let isFullscreenReady = false;
                
//             //     while (checkAttempts < 10) { // Max 5 seconds tak check karega
//             //         try {
//             //             isFullscreenReady = await activePage.evaluate(() => {
//             //                 let vids = Array.from(document.querySelectorAll('video'));
//             //                 for (let v of vids) {
//             //                     // Agar video window screen ke barabar ya qareeb aa chuki hai
//             //                     if (v.clientWidth >= window.innerWidth * 0.8 && v.clientHeight >= window.innerHeight * 0.8) {
//             //                         return true;
//             //                     }
//             //                 }
//             //                 return false;
//             //             });
//             //             if (isFullscreenReady) break; 
//             //         } catch (e) {}
                    
//             //         await new Promise(r => setTimeout(r, 500));
//             //         checkAttempts++;
//             //     }

//             //     if (isFullscreenReady) {
//             //         console.log(`[✅] Stream confirmed fullscreen! Removing UI...`);
//             //     } else {
//             //         console.log(`[⚠️] Fullscreen check timeout, removing UI anyway to continue stream.`);
//             //     }
                
//             //     try { await hideLoadingUI(activePage); } catch(e) {}

//             //     console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//             //     console.log(`[🔊] LIVE AUDIO STATUS : ON (Seamlessly Promoted)`);
//             //     console.log(`--------------------------------------------------`);
//             //     console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//             //     console.log(`==================================================\n`);

//             //     // 5. Old broken tab ko silently background mein rebuild karein (No Blocking)
//             //     (async () => {
//             //         try {
//             //             await backupPage.goto('about:blank').catch(()=>{});
//             //             await applyPreloadFirewall(backupPage);
//             //             await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//             //             await initializeVideo(backupPage, true, false);
//             //             backupWarmupTime = Date.now();
//             //         } catch (e) {
//             //             console.log(`[⏳] Background buffer navigation handled safely.`);
//             //         }
//             //     })();
//             // } 
//             // // --------------------------------------------------------------------
//             // // 🔄 SCENARIO B: PROACTIVE REFRESH OR FORCED RECONNECTION
//             // // --------------------------------------------------------------------
//             // else if (isProactiveRefresh || (backupStatus.status === 'HEALTHY' && isProactiveRefresh)) {
                
//             //     for (const frame of activePage.frames()) {
//             //         try { if (!frame.isDetached()) await frame.evaluate(() => { window.isStreamMuted = true; document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//             //     }
                
//             //     await showLoadingUI(backupPage, "REFRESHING CONNECTION", "Optimizing current server stream <span class='stream-blink'>...</span>");
//             //     await backupPage.bringToFront();
//             //     await new Promise(r => setTimeout(r, 1000)); 
                
//             //     try { await backupPage.mouse.click(10, 10); } catch(e){} 

//             //     console.log(`[*] Initializing Video on the newly active tab...`);
//             //     await initializeVideo(backupPage, false, true); 
//             //     await hideLoadingUI(backupPage);

//             //     let brokenPage = activePage; 
//             //     activePage = backupPage; 
//             //     backupPage = brokenPage;

//             //     let brokenBrowser = activeBrowser; 
//             //     activeBrowser = backupBrowser; 
//             //     backupBrowser = brokenBrowser;

//             //     let brokenName = activeBrowserName;
//             //     activeBrowserName = backupBrowserName;
//             //     backupBrowserName = brokenName;
                
//             //     lastActiveTime = -1; frozenCheckTimestamp = Date.now();
//             //     isRecoveryUIShown = false; 

//             //     let previousActiveIndex = currentUrlIndex;
//             //     currentUrlIndex = backupUrlIndex;
//             //     activeUrlStr = urlList[currentUrlIndex].url; 
                
//             //     backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//             //     backupUrlStr = urlList[backupUrlIndex].url;

//             //     console.log(`\n==================================================`);
//             //     console.log(`[🔄] PROACTIVE REFRESH EXECUTED SUCCESSFULLY`);
//             //     console.log(`==================================================`);

//             //     try {
//             //         await backupPage.goto('about:blank').catch(()=>{});
//             //         await applyPreloadFirewall(backupPage);
//             //         await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//             //         await initializeVideo(backupPage, true, false);
//             //     } catch (e) {}
                
//             //     streamSetupTime = Date.now(); 
//             //     isWarmupPhase = true;
//             //     currentStreamStartTime = Date.now();
//             // } 




// // =====================================
//             // --------------------------------------------------------------------
//             // ❌ SCENARIO C: BOTH TABS FAILED (Fresh Hunting Mode)
//             // --------------------------------------------------------------------
//             else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ BOTH TABS FAILED (Active & Backup Compromised)`);
//                 console.log(`[🔍] FRESH HUNTING MODE ACTIVATED: Spawning clean tabs...`);
//                 console.log(`==================================================`);
                
//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch (e) {}

//                 currentUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 activeUrlStr = urlList[currentUrlIndex].url;
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] Hunting Active -> Server [${currentUrlIndex}]`);
//                 console.log(`[*] Hunting Backup -> Server [${backupUrlIndex}]`);

//                 console.log(`[*] Closing crashed tabs and spawning fresh ones...`);
//                 try { await activePage.close(); } catch(e) {}
//                 try { await backupPage.close(); } catch(e) {}

//                 activePage = await activeBrowser.newPage();
//                 backupPage = await backupBrowser.newPage();

//                 await setupNetworkAdBlocker(activePage);
//                 await setupNetworkAdBlocker(backupPage);
//                 attachAntiAdListeners(activePage);
//                 attachAntiAdListeners(backupPage);
//                 await applyPreloadFirewall(activePage);
//                 await applyPreloadFirewall(backupPage);

//                 try {
//                     await activePage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 });
//                     await showLoadingUI(activePage, "SEARCHING SERVER", "Hunting for a stable stream connection <span class='stream-blink'>...</span>");
//                     await initializeVideo(activePage, false, true); 
//                     await hideLoadingUI(activePage);
//                 } catch(e) {}

//                 try {
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{});
//                     await initializeVideo(backupPage, true, false); 
//                 } catch(e) {}

//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true; 
//                 currentStreamStartTime = Date.now();
//                 backupWarmupTime = Date.now();
//                 lastActiveTime = -1;
//                 frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false;

//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
                
//                 console.log(`[*] Fresh tabs active. Waiting 15 seconds (Warm-up) for video to stabilize...`);
//             }
//         } 
       
//         await new Promise(r => setTimeout(r, 2000)); 
//     }
// }

// async function startDirectStreaming() {
//     activeBrowserName = "CHROME 1";
//     backupBrowserName = "CHROME 2";
    
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

//     browserArgs = [
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
//         '--disable-blink-features=AutomationControlled',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion,NetworkServiceInProcess2',
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

//     console.log(`[*] Starting ACTIVE browser instance...`);
//     activeBrowser = await createBrowserInstance(browserArgs);
//     const activePages = await activeBrowser.pages();
//     activePage = activePages[0];

//     console.log(`[*] Starting BACKUP browser instance in background...`);
//     backupBrowser = await createBrowserInstance(browserArgs);
//     const backupPages = await backupBrowser.pages();
//     backupPage = backupPages[0];

//     activeBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => { if (newPage && newPage !== activePage) { try { await newPage.close(); } catch(e) {} } }, 500);
//         }
//     });

//     backupBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => { if (newPage && newPage !== backupPage) { try { await newPage.close(); } catch(e) {} } }, 500);
//         }
//     });

//     await setupNetworkAdBlocker(activePage);
//     await setupNetworkAdBlocker(backupPage);

//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await applyPreloadFirewall(activePage);
//     await applyPreloadFirewall(backupPage);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex].url}`);
//     try {
//         await activePage.goto(urlList[currentUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 });
//     } catch (e) {
//         console.log(`[⚠️] Network buffer safely handled for primary URL.`);
//     }
    
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     await initializeVideo(activePage, false, true); 
//     await hideLoadingUI(activePage); 

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex].url}`);
//     try {
//         await backupPage.goto(urlList[backupUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 });
//     } catch (e) {}
    
//     await initializeVideo(backupPage, true, false);
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 
//     await hideLoadingUI(activePage);

//     console.log(`\n==================================================`);
//     console.log(`[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     console.log(`==================================================`);
//     console.log(`[📺] CURRENT ACTIVE LIVE : Server [${currentUrlIndex}] -> ${urlList[currentUrlIndex].url}`);
//     console.log(`[🔊] LIVE AUDIO STATUS   : ON (Unmuted)`);
//     console.log(`--------------------------------------------------`);
//     console.log(`[🛡️] NEXT BACKUP QUEUE   : Server [${backupUrlIndex}] -> ${urlList[backupUrlIndex].url}`);
//     console.log(`[🔇] BACKUP AUDIO STATUS : MUTED (Background)`);
//     console.log(`==================================================\n`);

//     console.log('[*] Everything Setup! Dual-Tab Monitoring is Active.');
//     await startWatchdog();
// }

// async function mainLoop() {
//     while (true) {
//         try {
//             await startDirectStreaming();
//         } catch (error) {
//             console.error('\n==================================================');
//             console.error('[🚨] FATAL ENGINE ERROR');
//             console.error(`[!] ${error.message}`);
//             console.error('==================================================');

//             if (activeBrowser && activeBrowser.isConnected()) {
//                 console.log('[🛡️] ACTIVE CHROME STILL ALIVE — NOT RESTARTING ENGINE.');
//                 await new Promise(resolve => setTimeout(resolve, 3000));
//                 continue;
//             }

//             if (backupBrowser && backupBrowser.isConnected()) {
//                 console.log('[🛡️] BACKUP CHROME STILL ALIVE — NOT RESTARTING ENGINE.');
//                 await new Promise(resolve => setTimeout(resolve, 3000));
//                 continue;
//             }

//             console.log('[⚠️] NO CHROME INSTANCE SURVIVED. Performing final recovery.');

//             try { if (activeBrowser) await activeBrowser.close().catch(() => {}); } catch (e) {}
//             try { if (backupBrowser) await backupBrowser.close().catch(() => {}); } catch (e) {}

//             activeBrowser = null; backupBrowser = null; activePage = null; backupPage = null;

//             await new Promise(resolve => setTimeout(resolve, 3000));
//             await cleanup();
//         }
//     }
// }

// async function cleanup() {
//     console.log('[*] Cleaning up resources...');
//     try { await obs.disconnect(); } catch (e) { } 
//     if (activeBrowser) { try { await activeBrowser.close(); } catch(e) { } activeBrowser = null; }
//     if (backupBrowser) { try { await backupBrowser.close(); } catch(e) { } backupBrowser = null; }
    
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
//             const targetUrls = process.env.TARGET_URLS || 'https://sport4u.online';
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













// cccccccccccccccccccccccccccccccccccc<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



// const puppeteer = require('puppeteer-extra');
// let isWarmupPhase = true;
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const { spawn, execSync, exec } = require('child_process');
// const { OBSWebSocket } = require('obs-websocket-js'); 

// // =========================================================================================
// // 🛡️ GLOBAL CRASH PREVENTION SHIELD (DEBUGGING MODE)
// // =========================================================================================
// process.on('uncaughtException', (err) => {
//     console.error('\n========================================');
//     console.error('[💥] UNCAUGHT EXCEPTION');
//     console.error(err);
//     console.error(err.stack);
//     console.error('========================================\n');
// });

// process.on('unhandledRejection', (reason) => {
//     console.error('\n========================================');
//     console.error('[💥] UNHANDLED REJECTION');
//     console.error(reason);
//     console.error('========================================\n');
// });

// const obs = new OBSWebSocket(); 

// // =========================================================================================
// // ⏱️ BIG VARIABLE: FORCE AUTO-REFRESH TIME (IN MINUTES)
// // =========================================================================================
// const FORCE_REFRESH_MINUTES = 40000; 
// const FORCE_REFRESH_MS = FORCE_REFRESH_MINUTES * 60 * 1000;

// // =========================================================================================
// // 🛡️ NO-REFRESH WHITELIST (CONTINUOUS PLAY DOMAINS)
// // =========================================================================================
// const NO_REFRESH_DOMAINS = [
//     'youtube.com',
//     'facebook.com',
//     'streamed.pk',
//     'cricstreams.', 
//     'sport4u.online',
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

// // =========================================================================================
// // 🔄 DYNAMIC URL PARSER & METADATA EXTRACTOR
// // =========================================================================================
// let rawUrls = (process.env.TARGET_URLS || '').trim();
// let urlList = [];

// if (rawUrls !== '') {
//     urlList = rawUrls.split(',').map(u => {
//         let trimmed = u.trim();
//         let hangThreshold = 8000; 
        
//         if (trimmed.startsWith('!')) {
//             hangThreshold = 20000; 
//             trimmed = trimmed.substring(1); 
//         }
//         if (!trimmed.startsWith('http')) trimmed = 'https://' + trimmed;
        
//         return { url: trimmed, hangTime: hangThreshold };
//     });
// } else {
//     urlList = [
//         { url: 'https://sport4u.online', hangTime: 8000 },
//         { url: 'https://dadocric.st/player.php?id=starsp3&v=m', hangTime: 8000 }
//     ];
// }

// function getSafeBackupIndex(activeIndex, currentIndex, list) {
//     if (list.length <= 1) return 0; 
//     let next = (currentIndex + 1) % list.length;
//     if (next === activeIndex) {
//         next = (next + 1) % list.length; 
//     }
//     return next;
// }

// let currentUrlIndex = 0;
// let backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);

// const SELECTED_CHANNEL = process.env.OKRU_STREAM_ID || '1';
// const SERVER_SELECTION = process.env.SERVER_SELECTION || 'None'; 
// const PROXY_ENGINE = process.env.PROXY_ENGINE || 'Cloudflare WARP (Recommended)';

// const ACTIVE_STREAM_KEY = STREAM_KEYS[SELECTED_CHANNEL] || STREAM_KEYS['1'];

// let browserArgs = []; // Global Browser Args for Recovery Functions
// let activeBrowser = null;
// let backupBrowser = null;
// let activeBrowserName = "CHROME 1";
// let backupBrowserName = "CHROME 2";
// let obsProcess = null;
// let activePage = null;
// let backupPage = null;

// if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
// let pendingScreenshots = [];
// let uploadCycleCount = 0;

// async function createBrowserInstance(args) {
//     return await puppeteer.launch({
//         headless: false, 
//         defaultViewport: { width: RES_W, height: RES_H },
//         ignoreDefaultArgs: ['--enable-automation'], 
//         args: args
//     });
// }

// // =========================================================================================
// // 🛡️ SMART BROWSER RECOVERY
// // =========================================================================================

// async function preparePage(page) {
//     if (!page) return;
//     await setupNetworkAdBlocker(page);
//     attachAntiAdListeners(page);
//     await applyPreloadFirewall(page);
// }

// async function createFreshBackupBrowser() {
//     console.log('\n[🛠️] BACKUP RECOVERY: Creating fresh backup Chrome...');
//     try {
//         if (backupBrowser && backupBrowser.isConnected()) {
//             try {
//                 const pages = await backupBrowser.pages();
//                 for (const p of pages) {
//                     try { await p.close(); } catch (e) {}
//                 }
//             } catch (e) {}
//         }
//     } catch (e) {}

//     try {
//         if (backupBrowser && !backupBrowser.isConnected()) {
//             backupBrowser = null;
//         }
//     } catch (e) {
//         backupBrowser = null;
//     }

//     backupBrowser = await createBrowserInstance(browserArgs);
//     const pages = await backupBrowser.pages();
//     backupPage = pages[0];
//     await preparePage(backupPage);

//     backupBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             try {
//                 const newPage = await target.page();
//                 setTimeout(async () => {
//                     if (newPage && newPage !== backupPage) {
//                         try { await newPage.close(); } catch (e) {}
//                     }
//                 }, 500);
//             } catch (e) {}
//         }
//     });

//     console.log('[✅] BACKUP RECOVERY: Fresh backup Chrome created.');
//     return true;
// }

// async function createFreshActiveBrowser() {
//     console.log('\n[🛠️] ACTIVE RECOVERY: Creating fresh active Chrome...');
//     try {
//         if (activeBrowser && activeBrowser.isConnected()) {
//             try {
//                 const pages = await activeBrowser.pages();
//                 for (const p of pages) {
//                     try { await p.close(); } catch (e) {}
//                 }
//             } catch (e) {}
//         }
//     } catch (e) {}

//     try {
//         if (activeBrowser && !activeBrowser.isConnected()) {
//             activeBrowser = null;
//         }
//     } catch (e) {
//         activeBrowser = null;
//     }

//     activeBrowser = await createBrowserInstance(browserArgs);
//     const pages = await activeBrowser.pages();
//     activePage = pages[0];
//     await preparePage(activePage);

//     activeBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             try {
//                 const newPage = await target.page();
//                 setTimeout(async () => {
//                     if (newPage && newPage !== activePage) {
//                         try { await newPage.close(); } catch (e) {}
//                     }
//                 }, 500);
//             } catch (e) {}
//         }
//     });

//     console.log('[✅] ACTIVE RECOVERY: Fresh active Chrome created.');
//     return true;
// }

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
//             const originalAttachShadow = Element.prototype.attachShadow;
//             Element.prototype.attachShadow = function(init) {
//                 if (init && init.mode === 'closed') {
//                     init.mode = 'open'; 
//                 }
//                 const shadowRoot = originalAttachShadow.call(this, init);
                
//                 const observer = new MutationObserver(() => {
//                     const adElements = shadowRoot.querySelectorAll('in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"], [src*="adexchangerapid"]');
//                     if (adElements.length > 0) {
//                         console.log('[🛡️] SHIELD: Shadow DOM Ad Detected & Destroyed!');
//                         this.remove(); 
//                     }
//                 });
                
//                 observer.observe(shadowRoot, { childList: true, subtree: true });
//                 return shadowRoot;
//             };
            
//             Element.prototype.attachShadow.toString = function() { return "function attachShadow() { [native code] }"; };

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
//                 in-page-message, [id^="note-"], [id^="missclick-"], [id^="close-"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }
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
//                             .stream-blink { animation: blinker 1.5s linear infinite; color: #e50914; font-weight: bold; }
//                             @keyframes blinker { 50% { opacity: 0.3; } }
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

// async function showRecoveryUI(page) {
//     try {
//         await page.evaluate(() => {
//             if (window.self !== window.top) return; 
//             let overlay = document.getElementById('stream-recovery-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'flex', 'important');
//                 return;
//             }
            
//             overlay = document.createElement('div');
//             overlay.id = 'stream-recovery-overlay';
//             overlay.innerHTML = `
//                 <style>
//                     #stream-recovery-overlay {
//                         position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
//                         width: 100vw !important; height: 100vh !important; background: rgba(0, 0, 0, 0.95) !important;
//                         z-index: 2147483647 !important; display: flex !important; flex-direction: column !important;
//                         justify-content: center !important; align-items: center !important; color: #ffffff !important;
//                         font-family: Arial, sans-serif !important; pointer-events: all !important; backdrop-filter: blur(8px);
//                     }
//                     .recovery-radar {
//                         width: 100px; height: 100px; border-radius: 50%;
//                         border: 3px solid transparent; border-top-color: #ff9800; border-bottom-color: #ff9800;
//                         animation: radar-spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
//                         margin-bottom: 20px; box-shadow: 0 0 30px rgba(255, 152, 0, 0.3);
//                     }
//                     .recovery-radar::before {
//                         content: ''; position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px;
//                         border-radius: 50%; border: 3px solid transparent; border-left-color: #f44336; border-right-color: #f44336;
//                         animation: radar-spin 2s linear infinite reverse;
//                     }
//                     @keyframes radar-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//                     .warn-title { font-size: 32px !important; font-weight: 800 !important; color: #ff9800 !important; letter-spacing: 2px !important; margin-bottom: 10px !important; text-transform: uppercase !important; }
//                     .warn-sub { font-size: 18px !important; color: #dddddd !important; animation: pulse-text 1.5s infinite; }
//                     @keyframes pulse-text { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
//                 </style>
//                 <div class="recovery-radar"></div>
//                 <div class="warn-title">SIGNAL LOST</div>
//                 <div class="warn-sub">Attempting Auto-Recovery...</div>
//             `;
//             document.documentElement.appendChild(overlay);
//         });
//     } catch (e) {}
// }

// async function hideRecoveryUI(page) {
//     try {
//         await page.evaluate(() => {
//             const overlay = document.getElementById('stream-recovery-overlay');
//             if (overlay) {
//                 overlay.style.setProperty('display', 'none', 'important');
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
    
//     const basicIniContent = `[General]\nName=Untitled\n[Video]\nBaseCX=${RES_W}\nBaseCY=${RES_H}\nOutputCX=${RES_W}\nOutputCY=${RES_H}\nFPSCommon=30\n[Output]\nMode=Simple\n[SimpleOutput]\nVBitrate=${BITRATE}\nStreamEncoder=x264\nx264Preset=ultrafast\nx264Settings=keyint=60 tune=zerolatency profile=main threads=4 rc-lookahead=0\n`;
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
                            // await takeAndBatchScreenshot(page, `force-play-applied`);
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

//                     const junkClasses = '.chat, #chat, header, footer, .sidebar, .banner, .ads, [class*="overlay"]:not(#smart-stream-overlay):not(#stream-recovery-overlay):not([class*="player"]):not([class*="jw"]):not([class*="vjs"]), [id*="pop"], [class*="pop"], a[href*="extension"], [class*="notification"], [id*="notification"]';
//                     document.querySelectorAll(junkClasses).forEach(el => { 
//                         try { el.remove(); } catch(e){ el.style.setProperty('display', 'none', 'important'); } 
//                     });

//                     const adKeywords = ['jerk', 'mate', 'free', 'online', 'adult', 'dating', 'close', 'notification', 'justine', 'paying', 'job'];
//                     document.querySelectorAll('div, section, span, a').forEach(el => {
//                         if (el.id === 'smart-stream-overlay' || el.id === 'stream-recovery-overlay') return;
                        
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
//             // FIX 1: Use window object to control audio globally to avoid Audio War
//             window.isStreamMuted = muteVideo; 

//             setInterval(() => {
//                 try {
//                     const style = document.createElement('style');
//                     style.innerHTML = `.jw-controls, .jw-ui, .plyr__controls, .vjs-control-bar, [data-player] .controls { display: none !important; opacity: 0 !important; visibility: hidden !important; }`;
//                     document.head.appendChild(style);

//                     const mediaElements = document.querySelectorAll('video, audio');
//                     const videos = Array.from(document.querySelectorAll('video'));
//                     let realVideo = null;

//                     mediaElements.forEach(media => { 
//                         media.muted = window.isStreamMuted; 
//                         media.volume = window.isStreamMuted ? 0.0 : 1.0; 
//                     });

//                     if (!window.isStreamMuted) {
//                         document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                     }

//                     for (const v of videos) {
//                         if (v.clientWidth > 100 && v.clientHeight > 100) { realVideo = v; break; }
//                     }

//                     if (!realVideo && videos.length > 0) {
//                         realVideo = videos[0];
//                     }

//                     if (realVideo) { 
//                         let playerWrap = realVideo.closest('.jwplayer, #player, .plyr, .vjs-player, .shaka-video-container, [data-player]') || realVideo;
                        
//                         playerWrap.style.setProperty('position', 'fixed', 'important');
//                         playerWrap.style.setProperty('top', '0px', 'important');
//                         playerWrap.style.setProperty('left', '0px', 'important');
//                         playerWrap.style.setProperty('width', '100vw', 'important');
//                         playerWrap.style.setProperty('height', '100vh', 'important');
//                         playerWrap.style.setProperty('z-index', '2147483646', 'important'); 
//                         playerWrap.style.setProperty('background-color', 'black', 'important');
//                         playerWrap.style.setProperty('opacity', '1', 'important');
//                         playerWrap.style.setProperty('visibility', 'visible', 'important');
//                         playerWrap.style.setProperty('display', 'block', 'important');
                        
//                         if (playerWrap !== realVideo) {
//                             realVideo.style.setProperty('width', '100%', 'important');
//                             realVideo.style.setProperty('height', '100%', 'important');
//                         }
//                         realVideo.style.setProperty('object-fit', 'contain', 'important');
//                     }
//                 } catch(err) {}
//             }, 500); 
//         }, startMuted).catch(() => {});

//     } catch (e) { }

//     if (!startMuted) {
//         await triggerSmartUnmute(page);
//         await new Promise(r => setTimeout(r, 1000));
//     }
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
    
//     let streamSetupTime = Date.now(); 
//     let isWarmupPhase = true; 
//     let backupWarmupTime = Date.now(); 
//     const WARMUP_MAX_TIME = 15000; 

//     let activeUrlStr = urlList[currentUrlIndex].url;
//     let backupUrlStr = urlList[backupUrlIndex].url;

//     let currentStreamStartTime = Date.now();
//     let isRecoveryUIShown = false;

//     while (true) {
//         // =====================================================================================
//         // 🛡️ NEVER THROW JUST BECAUSE ONE CHROME DISCONNECTED
//         // Recover the affected side instead.
//         // =====================================================================================
//         const activeBrowserAlive = activeBrowser && activeBrowser.isConnected();
//         const backupBrowserAlive = backupBrowser && backupBrowser.isConnected();

//         // ---------------------------------------------------------------------
//         // CASE 1: ACTIVE CHROME DEAD, BACKUP CHROME STILL ALIVE
//         // ---------------------------------------------------------------------
//         if (!activeBrowserAlive && backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[🚨] ACTIVE CHROME DISCONNECTED');
//             console.log('[🔄] BACKUP CHROME IS ALIVE');
//             console.log('[⚡] PROMOTING BACKUP -> ACTIVE');
//             console.log('[🛡️] OBS WILL CONTINUE RUNNING');
//             console.log('==================================================\n');

//             const oldActiveBrowser = activeBrowser;
//             const oldActivePage = activePage;
//             activeBrowser = backupBrowser;
//             activePage = backupPage;
//             backupBrowser = oldActiveBrowser;
//             backupPage = oldActivePage;

//             const oldActiveName = activeBrowserName;
//             activeBrowserName = backupBrowserName;
//             backupBrowserName = oldActiveName;

//             const previousActiveIndex = currentUrlIndex;
//             currentUrlIndex = backupUrlIndex;
//             activeUrlStr = urlList[currentUrlIndex].url;

//             backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//             backupUrlStr = urlList[backupUrlIndex].url;

//             lastActiveTime = -1; lastDecodedFrames = -1; frozenCheckTimestamp = Date.now();
//             streamSetupTime = Date.now(); currentStreamStartTime = Date.now();
//             isWarmupPhase = true; backupWarmupTime = Date.now(); isRecoveryUIShown = false;

//             try { await activePage.bringToFront(); await hideLoadingUI(activePage); } catch (e) {}

//             console.log('[✅] BACKUP PROMOTED SUCCESSFULLY');
//             console.log(`[📺] NEW ACTIVE SERVER : [${currentUrlIndex}] -> ${activeUrlStr}`);
//             console.log(`[🔊] ACTIVE AUDIO      : ON`);
//             console.log(`[🛡️] NEW BACKUP SERVER : [${backupUrlIndex}] -> ${backupUrlStr}`);

//             try {
//                 await createFreshBackupBrowser();
//                 await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await initializeVideo(backupPage, true, false);
//                 console.log('[✅] NEW BACKUP SERVER IS BUFFERING IN BACKGROUND');
//             } catch (e) {
//                 console.log(`[⚠️] Backup recreation failed. Watchdog will try the NEXT server.`);
//             }
//             continue;
//         }

//         // ---------------------------------------------------------------------
//         // CASE 2: BACKUP CHROME DEAD, ACTIVE CHROME STILL ALIVE
//         // ---------------------------------------------------------------------
//         if (activeBrowserAlive && !backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[⚠️] BACKUP CHROME DISCONNECTED');
//             console.log('[🛡️] ACTIVE STREAM WILL NOT BE TOUCHED');
//             console.log('[🔄] REBUILDING BACKUP WITH NEXT SERVER');
//             console.log('==================================================\n');

//             try {
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] NEXT BACKUP SERVER -> [${backupUrlIndex}] ${backupUrlStr}`);
//                 await createFreshBackupBrowser();
//                 await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await initializeVideo(backupPage, true, false);
//                 backupWarmupTime = Date.now();
//                 console.log(`[✅] BACKUP RECOVERED -> Server [${backupUrlIndex}]`);
//             } catch (e) {
//                 console.log(`[⚠️] Backup recovery failed. NEXT WATCHDOG CYCLE WILL TRY AGAIN.`);
//             }
//         }

//         // ---------------------------------------------------------------------
//         // CASE 3: BOTH CHROMES DEAD
//         // ---------------------------------------------------------------------
//         if (!activeBrowserAlive && !backupBrowserAlive) {
//             console.log('\n==================================================');
//             console.log('[🚨] BOTH CHROME INSTANCES DISCONNECTED');
//             console.log('[🛠️] LOCAL RECOVERY MODE');
//             console.log('[🛑] OBS WILL NOT BE RESTARTED');
//             console.log('==================================================\n');

//             try {
//                 currentUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 activeUrlStr = urlList[currentUrlIndex].url;

//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] RECOVERY ACTIVE -> [${currentUrlIndex}] ${activeUrlStr}`);
//                 console.log(`[*] RECOVERY BACKUP -> [${backupUrlIndex}] ${backupUrlStr}`);

//                 await createFreshActiveBrowser();
//                 await activePage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                 await showLoadingUI(activePage, "SEARCHING SERVER", "Finding a stable stream connection <span class='stream-blink'>...</span>");
//                 await initializeVideo(activePage, false, true);
//                 await hideLoadingUI(activePage);

//                 console.log('[✅] ACTIVE CHROME RECOVERED');

//                 try {
//                     await createFreshBackupBrowser();
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                     console.log('[✅] BACKUP CHROME RECOVERED');
//                 } catch (backupError) {
//                     console.log('[⚠️] Backup failed. Active stream continues.');
//                 }

//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}

//                 streamSetupTime = Date.now(); currentStreamStartTime = Date.now(); backupWarmupTime = Date.now();
//                 frozenCheckTimestamp = Date.now(); lastActiveTime = -1; lastDecodedFrames = -1;
//                 isWarmupPhase = true; isRecoveryUIShown = false;

//                 console.log('[✅] LOCAL RECOVERY COMPLETE — WATCHDOG CONTINUES');
//             } catch (e) {
//                 console.log(`[❌] Local Chrome recovery failed: ${e.message}`);
//                 await new Promise(r => setTimeout(r, 3000));
//             }
//             continue;
//         }

//         let activeHangThresholdMs = urlList[currentUrlIndex].hangTime;
//         let activeStatus = await checkPageStatus(activePage);

//         // 🔄 1. BACKGROUND SHIELD
//         if (!isWarmupPhase && (Date.now() - backupWarmupTime > 30000)) { 
//             let backupStatus = await checkPageStatus(backupPage);
            
//             if (backupStatus.status === 'DEAD' || backupStatus.status === 'CRITICAL_ERROR' || backupStatus.status === 'FROZEN') {
//                 console.log(`\n[⚠️] BACKGROUND SHIELD: Backup Server [${backupUrlIndex}] failed silently.`);
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;
                
//                 console.log(`[*] Shifting Backup Chrome to NEXT link -> Server [${backupUrlIndex}]`);
//                 backupWarmupTime = Date.now();
                
//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                 } catch(e) {}
//             }
//         }

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

//         // Active Tab Audio Watchdog Fix (Stop Audio War)
//         if (activeStatus.status === 'HEALTHY') {
//             await hideLoadingUI(activePage); 
//             isWarmupPhase = false; 

//             let isTimeStuck = (activeStatus.currentTime === lastActiveTime);
//             let isFrameStuck = (activeStatus.decodedFrames === lastDecodedFrames && activeStatus.decodedFrames > 0);

//             if (isTimeStuck || isFrameStuck) {
//                 if (!isRecoveryUIShown) {
//                     await showRecoveryUI(activePage);
//                     isRecoveryUIShown = true;
//                     console.log(`[⚠️] Stream Hang Detected! Showing Signal Recovery Shield instantly...`);
//                 }

//                 if (Date.now() - frozenCheckTimestamp > activeHangThresholdMs) {
//                     activeStatus.status = 'FROZEN';
//                     if (isFrameStuck && !isTimeStuck) {
//                         console.log(`[!] ⚠️ SYSTEM SHIELD: Detected Black Screen (Audio playing, but video frames stuck). Triggering HOT-SWAP.`);
//                     }
//                     isRecoveryUIShown = false; 
//                 }
//             } else {
//                 lastActiveTime = activeStatus.currentTime; 
//                 lastDecodedFrames = activeStatus.decodedFrames; 
//                 frozenCheckTimestamp = Date.now();
                
//                 if (isRecoveryUIShown) {
//                     await hideRecoveryUI(activePage);
//                     isRecoveryUIShown = false;
//                     console.log(`[✅] Stream Recovered! Signal Recovery Shield removed instantly.`);
//                 }
                
//                 // Mute override for active page (Audio fix applied)
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             frame.evaluate(() => { 
//                                 window.isStreamMuted = false;
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                                 document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                             }).catch(()=>{});
//                         }
//                     } catch(e) {}
//                 }
//             }
//         }

//         // Backup Tab Audio Watchdog Fix
//         if (backupPage) {
//             for (const frame of backupPage.frames()) {
//                 try {
//                     if (!frame.isDetached()) {
//                         frame.evaluate(() => { 
//                             window.isStreamMuted = true;
//                             document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); 
//                         }).catch(()=>{});
//                     }
//                 } catch(e) {}
//             }
//         }

//         watchdogTicks++;

//         if (watchdogTicks === 1 || watchdogTicks % 90 === 0) {
//             let logBackupStatus = await checkPageStatus(backupPage);
//             let nextAfterBackupIndex = getSafeBackupIndex(currentUrlIndex, backupUrlIndex, urlList);
//             let nextAfterBackupUrl = urlList[nextAfterBackupIndex].url;
            
//             console.log(`\n==================================================`);
//             console.log(`[💓] ACTIVE HEARTBEAT (${activeBrowserName}): Status is ${activeStatus.status} | Video Time: ${activeStatus.currentTime ? activeStatus.currentTime.toFixed(1) + 's' : 'N/A'} (Limit: ${activeHangThresholdMs/1000}s)`);
//             console.log(`[▶️] CURRENTLY LIVE              : Server [${currentUrlIndex}] (Audio ON) -> ${activeUrlStr}`);
//             console.log(`--------------------------------------------------`);
//             console.log(`[🖤] BACKUP HEARTBEAT (${backupBrowserName}): Status is ${logBackupStatus.status} | Video Time: ${logBackupStatus.currentTime ? logBackupStatus.currentTime.toFixed(1) + 's' : 'N/A'}`);
//             console.log(`[🔄] RUNNING IN BACKGROUND       : Server [${backupUrlIndex}] (Audio MUTED) -> ${backupUrlStr}`);
//             console.log(`[⏭️] NEXT QUEUE (AFTER BACKUP)  : Server [${nextAfterBackupIndex}] -> ${nextAfterBackupUrl}`);
//             console.log(`==================================================\n`);
//         }

//         if (watchdogTicks % 120 === 0) {
//             await takeAndBatchScreenshot(activePage, `heartbeat-tick-${watchdogTicks}`);
//         }

//         // =========================================================================================
//         // 🔄 2. ACTIVE TAB HOT-SWAP SHIELD (UPDATED: INSTANT SEAMLESS PROMOTION)
//         // =========================================================================================
//         if (activeStatus.status === 'FROZEN' || activeStatus.status === 'CRITICAL_ERROR' || activeStatus.status === 'DEAD' || activeStatus.status === 'FORCE_REFRESH') {
            
//             if (isWarmupPhase && (Date.now() - streamSetupTime < WARMUP_MAX_TIME)) { 
//                 console.log(`[⏳] Watchdog detected '${activeStatus.status}', but stream is in WARM-UP phase. Waiting...`);
//                 await new Promise(r => setTimeout(r, 2000));
//                 continue; 
//             }

//             let isProactiveRefresh = (activeStatus.status === 'FORCE_REFRESH');

//             if (isProactiveRefresh) {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] 🔄 PROACTIVE REFRESH TRIGGERED`);
//                 console.log(`[*] Initiating forward rotation to prevent stream drop...`);
//                 console.log(`==================================================`);
//             } else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ WATCHDOG DETECTED ISSUE: ${activeStatus.status}`);
//                 console.log(`[💀] FAILED STREAM: Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`==================================================`);
//                 await takeAndBatchScreenshot(activePage, `error-${activeStatus.status.toLowerCase()}`);
//             }
            
//             console.log(`[*] Checking Backup Tab status before switching...`);
//             let backupStatus = await checkPageStatus(backupPage);


// // =====================================



// // ======================================

// // --------------------------------------------------------------------
//             // ⚡ SCENARIO A: INSTANT SEAMLESS HOT-SWAP (BACKUP IS ALREADY HEALTHY)
//             // --------------------------------------------------------------------
//             if (backupStatus.status === 'HEALTHY' && !isProactiveRefresh) {
                
//                 console.log('\n==================================================');
//                 console.log('[⚡] BACKUP STREAM ALREADY HEALTHY');
//                 console.log('[⚡] SHOWING TRANSITION UI & PROMOTING INSTANTLY');
//                 console.log('==================================================');

//                 // 1. Visually ek smooth "RECONNECTING" UI lagayein
//                 await showLoadingUI(backupPage, "RECONNECTING", "Establishing secure connection to backup server <span class='stream-blink'>...</span>");

//                 // 2. Tab ko screen par layein
//                 try { await backupPage.bringToFront(); } catch (e) {}

//                 // 3. Objects swap karein (Chrome 2 ab Chrome 1 ban gaya)
//                 let brokenPage = activePage; 
//                 activePage = backupPage; 
//                 backupPage = brokenPage;

//                 let brokenBrowser = activeBrowser; 
//                 activeBrowser = backupBrowser; 
//                 backupBrowser = brokenBrowser;

//                 let brokenName = activeBrowserName;
//                 activeBrowserName = backupBrowserName;
//                 backupBrowserName = brokenName;

//                 let previousActiveIndex = currentUrlIndex;
//                 currentUrlIndex = backupUrlIndex;
//                 activeUrlStr = urlList[currentUrlIndex].url; 
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 // 4. 🛠️ INSTANT AUDIO FIX: Background tab mute tha, isko foran unmute karein swap hotay hi!
//                 for (const frame of activePage.frames()) {
//                     try {
//                         if (!frame.isDetached()) {
//                             await frame.evaluate(() => { 
//                                 window.isStreamMuted = false;
//                                 document.querySelectorAll('video, audio').forEach(m => { m.muted = false; m.volume = 1.0; }); 
//                                 document.querySelectorAll('.jw-icon-volume.jw-off, .vjs-vol-muted, .plyr__control--pressed[data-plyr="mute"]').forEach(btn => { try { btn.click(); } catch(e){} });
//                             });
//                         }
//                     } catch(e) {}
//                 }

//                 // 5. State Reset (Keep isWarmupPhase FALSE because stream is already healthy)
//                 lastActiveTime = -1; 
//                 lastDecodedFrames = -1;
//                 frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false; 

//                 streamSetupTime = Date.now(); 
//                 currentStreamStartTime = Date.now();
//                 isWarmupPhase = false; 
                
//                 // Extra buffer time for background checks to avoid conflicts
//                 backupWarmupTime = Date.now() + 5000; 

//                 // 6. SMOOTH UI REMOVAL: Wait 1.5s for render paint to stabilize
//                 await new Promise(r => setTimeout(r, 1500));
//                 try { await hideLoadingUI(activePage); } catch(e) {}

//                 console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//                 console.log(`[🔊] LIVE AUDIO STATUS : ON (Seamlessly Promoted & Unmuted)`);
//                 console.log(`--------------------------------------------------`);
//                 console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//                 console.log(`==================================================\n`);

//                 // 7. 🛠️ CPU BOTTLENECK FIX: Heavy background rebuilding ko 3 seconds delay karein
//                 // Taa k watchdog ka immediate next active check timeout na ho aur "DEAD" issue na aye.
//                 setTimeout(async () => {
//                     try {
//                         console.log(`[⏳] Starting background buffer rebuilding safely...`);
//                         await backupPage.goto('about:blank').catch(()=>{});
//                         await applyPreloadFirewall(backupPage);
//                         await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                         await initializeVideo(backupPage, true, false);
//                     } catch (e) {
//                         console.log(`[⚠️] Background buffer navigation handled safely.`);
//                     }
//                 }, 3000); 
//             }



// // --------------------------------------------------------------------
//             // ⚡ SCENARIO A: INSTANT SEAMLESS HOT-SWAP (BACKUP IS ALREADY HEALTHY)
//             // --------------------------------------------------------------------
//             // if (backupStatus.status === 'HEALTHY' && !isProactiveRefresh) {
                
//             //     console.log('\n==================================================');
//             //     console.log('[⚡] BACKUP STREAM ALREADY HEALTHY');
//             //     console.log('[⚡] SHOWING TRANSITION UI & PROMOTING INSTANTLY');
//             //     console.log('==================================================');

//             //     // 1. Visually ek smooth "RECONNECTING" UI lagayein
//             //     await showLoadingUI(backupPage, "RECONNECTING", "Establishing secure connection to backup server <span class='stream-blink'>...</span>");

//             //     // 2. Tab ko screen par layein
//             //     try { await backupPage.bringToFront(); } catch (e) {}

//             //     // 3. Objects swap karein (Chrome 2 ab Chrome 1 ban gaya)
//             //     let brokenPage = activePage; 
//             //     activePage = backupPage; 
//             //     backupPage = brokenPage;

//             //     let brokenBrowser = activeBrowser; 
//             //     activeBrowser = backupBrowser; 
//             //     backupBrowser = brokenBrowser;

//             //     let brokenName = activeBrowserName;
//             //     activeBrowserName = backupBrowserName;
//             //     backupBrowserName = brokenName;

//             //     let previousActiveIndex = currentUrlIndex;
//             //     currentUrlIndex = backupUrlIndex;
//             //     activeUrlStr = urlList[currentUrlIndex].url; 
                
//             //     backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//             //     backupUrlStr = urlList[backupUrlIndex].url;

//             //     lastActiveTime = -1; 
//             //     lastDecodedFrames = -1;
//             //     frozenCheckTimestamp = Date.now();
//             //     isRecoveryUIShown = false; 

//             //     // streamSetupTime = Date.now(); 
//             //     // currentStreamStartTime = Date.now();
//             //     // isWarmupPhase = false; // Video pehle se ready hai
//             //     streamSetupTime = Date.now(); 
//             //     currentStreamStartTime = Date.now();
//             //     isWarmupPhase = true; // IMPORTANT: Hot-swap k doran lag/timeout se bachne k liye grace period
                
//             //     // 🚀 FIX: Lock background watchdog immediately BEFORE async rebuilding
//             //     // Yeh single line us double-execution bug ko hamesha ke liye rok degi!
//             //     backupWarmupTime = Date.now(); 

//             //     // 4. SMOOTH UI REMOVAL: Background stream is already full-screened by CSS. 
//             //     // We just wait 1.5 seconds for the foreground render paint to stabilize before removing overlay.
//             //     await new Promise(r => setTimeout(r, 1500));
//             //     try { await hideLoadingUI(activePage); } catch(e) {}

//             //     console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//             //     console.log(`[🔊] LIVE AUDIO STATUS : ON (Seamlessly Promoted)`);
//             //     console.log(`--------------------------------------------------`);
//             //     console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//             //     console.log(`==================================================\n`);

//             //     // 5. Old broken tab ko silently background mein rebuild karein (No Blocking)
//             //     (async () => {
//             //         try {
//             //             await backupPage.goto('about:blank').catch(()=>{});
//             //             await applyPreloadFirewall(backupPage);
//             //             await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//             //             await initializeVideo(backupPage, true, false);
//             //         } catch (e) {
//             //             console.log(`[⏳] Background buffer navigation handled safely.`);
//             //         }
//             //     })();
//             // } 


// // ====================================



//             // --------------------------------------------------------------------
//             // 🔄 SCENARIO B: PROACTIVE REFRESH OR FORCED RECONNECTION
//             // --------------------------------------------------------------------
//             else if (isProactiveRefresh || (backupStatus.status === 'HEALTHY' && isProactiveRefresh)) {
                
//                 for (const frame of activePage.frames()) {
//                     try { if (!frame.isDetached()) await frame.evaluate(() => { window.isStreamMuted = true; document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//                 }
                
//                 await showLoadingUI(backupPage, "REFRESHING CONNECTION", "Optimizing current server stream <span class='stream-blink'>...</span>");
//                 await backupPage.bringToFront();
//                 await new Promise(r => setTimeout(r, 1000)); 
                
//                 try { await backupPage.mouse.click(10, 10); } catch(e){} 

//                 console.log(`[*] Initializing Video on the newly active tab...`);
//                 await initializeVideo(backupPage, false, true); 
//                 await hideLoadingUI(backupPage);

//                 let brokenPage = activePage; 
//                 activePage = backupPage; 
//                 backupPage = brokenPage;

//                 let brokenBrowser = activeBrowser; 
//                 activeBrowser = backupBrowser; 
//                 backupBrowser = brokenBrowser;

//                 let brokenName = activeBrowserName;
//                 activeBrowserName = backupBrowserName;
//                 backupBrowserName = brokenName;
                
//                 lastActiveTime = -1; frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false; 

//                 let previousActiveIndex = currentUrlIndex;
//                 currentUrlIndex = backupUrlIndex;
//                 activeUrlStr = urlList[currentUrlIndex].url; 
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`\n==================================================`);
//                 console.log(`[🔄] PROACTIVE REFRESH EXECUTED SUCCESSFULLY`);
//                 console.log(`==================================================`);

//                 try {
//                     await backupPage.goto('about:blank').catch(()=>{});
//                     await applyPreloadFirewall(backupPage);
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//                     await initializeVideo(backupPage, true, false);
//                 } catch (e) {}
                
//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true;
//                 currentStreamStartTime = Date.now();
//                 // 🚀 FIX: Lock background watchdog for Proactive Refresh too!
//                 backupWarmupTime = Date.now(); 
//             }


//             // // --------------------------------------------------------------------
//             // // ⚡ SCENARIO A: INSTANT SEAMLESS HOT-SWAP (BACKUP IS ALREADY HEALTHY)
//             // // --------------------------------------------------------------------
//             // if (backupStatus.status === 'HEALTHY' && !isProactiveRefresh) {
                
//             //     console.log('\n==================================================');
//             //     console.log('[⚡] BACKUP STREAM ALREADY HEALTHY');
//             //     console.log('[⚡] SHOWING TRANSITION UI & PROMOTING INSTANTLY');
//             //     console.log('==================================================');

//             //     // 1. Visually ek smooth "RECONNECTING" UI lagayein
//             //     await showLoadingUI(backupPage, "RECONNECTING", "Establishing secure connection to backup server <span class='stream-blink'>...</span>");

//             //     // 2. Tab ko screen par layein
//             //     try { await backupPage.bringToFront(); } catch (e) {}

//             //     // 3. Objects swap karein (Chrome 2 ab Chrome 1 ban gaya)
//             //     let brokenPage = activePage; 
//             //     activePage = backupPage; 
//             //     backupPage = brokenPage;

//             //     let brokenBrowser = activeBrowser; 
//             //     activeBrowser = backupBrowser; 
//             //     backupBrowser = brokenBrowser;

//             //     let brokenName = activeBrowserName;
//             //     activeBrowserName = backupBrowserName;
//             //     backupBrowserName = brokenName;

//             //     let previousActiveIndex = currentUrlIndex;
//             //     currentUrlIndex = backupUrlIndex;
//             //     activeUrlStr = urlList[currentUrlIndex].url; 
                
//             //     backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//             //     backupUrlStr = urlList[backupUrlIndex].url;

//             //     lastActiveTime = -1; 
//             //     lastDecodedFrames = -1;
//             //     frozenCheckTimestamp = Date.now();
//             //     isRecoveryUIShown = false; 

//             //     streamSetupTime = Date.now(); 
//             //     currentStreamStartTime = Date.now();
//             //     isWarmupPhase = false; // Video pehle se ready hai

//             //     // 4. 🧠 SMART CHECK: Wait until video is ACTUALLY Fullscreen before removing UI
//             //     console.log(`[*] Verifying if stream is fullscreen before removing Reconnecting UI...`);
//             //     let checkAttempts = 0;
//             //     let isFullscreenReady = false;
                
//             //     while (checkAttempts < 10) { // Max 5 seconds tak check karega
//             //         try {
//             //             isFullscreenReady = await activePage.evaluate(() => {
//             //                 let vids = Array.from(document.querySelectorAll('video'));
//             //                 for (let v of vids) {
//             //                     // Agar video window screen ke barabar ya qareeb aa chuki hai
//             //                     if (v.clientWidth >= window.innerWidth * 0.8 && v.clientHeight >= window.innerHeight * 0.8) {
//             //                         return true;
//             //                     }
//             //                 }
//             //                 return false;
//             //             });
//             //             if (isFullscreenReady) break; 
//             //         } catch (e) {}
                    
//             //         await new Promise(r => setTimeout(r, 500));
//             //         checkAttempts++;
//             //     }

//             //     if (isFullscreenReady) {
//             //         console.log(`[✅] Stream confirmed fullscreen! Removing UI...`);
//             //     } else {
//             //         console.log(`[⚠️] Fullscreen check timeout, removing UI anyway to continue stream.`);
//             //     }
                
//             //     try { await hideLoadingUI(activePage); } catch(e) {}

//             //     console.log(`[📺] NEW ACTIVE STREAM : Server [${currentUrlIndex}] -> ${activeUrlStr}`);
//             //     console.log(`[🔊] LIVE AUDIO STATUS : ON (Seamlessly Promoted)`);
//             //     console.log(`--------------------------------------------------`);
//             //     console.log(`[🛡️] NEXT BACKUP QUEUE : Server [${backupUrlIndex}] -> ${backupUrlStr}`);
//             //     console.log(`==================================================\n`);

//             //     // 5. Old broken tab ko silently background mein rebuild karein (No Blocking)
//             //     (async () => {
//             //         try {
//             //             await backupPage.goto('about:blank').catch(()=>{});
//             //             await applyPreloadFirewall(backupPage);
//             //             await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//             //             await initializeVideo(backupPage, true, false);
//             //             backupWarmupTime = Date.now();
//             //         } catch (e) {
//             //             console.log(`[⏳] Background buffer navigation handled safely.`);
//             //         }
//             //     })();
//             // } 
//             // // --------------------------------------------------------------------
//             // // 🔄 SCENARIO B: PROACTIVE REFRESH OR FORCED RECONNECTION
//             // // --------------------------------------------------------------------
//             // else if (isProactiveRefresh || (backupStatus.status === 'HEALTHY' && isProactiveRefresh)) {
                
//             //     for (const frame of activePage.frames()) {
//             //         try { if (!frame.isDetached()) await frame.evaluate(() => { window.isStreamMuted = true; document.querySelectorAll('video, audio').forEach(m => { m.muted = true; m.volume = 0.0; }); }); } catch(e) {}
//             //     }
                
//             //     await showLoadingUI(backupPage, "REFRESHING CONNECTION", "Optimizing current server stream <span class='stream-blink'>...</span>");
//             //     await backupPage.bringToFront();
//             //     await new Promise(r => setTimeout(r, 1000)); 
                
//             //     try { await backupPage.mouse.click(10, 10); } catch(e){} 

//             //     console.log(`[*] Initializing Video on the newly active tab...`);
//             //     await initializeVideo(backupPage, false, true); 
//             //     await hideLoadingUI(backupPage);

//             //     let brokenPage = activePage; 
//             //     activePage = backupPage; 
//             //     backupPage = brokenPage;

//             //     let brokenBrowser = activeBrowser; 
//             //     activeBrowser = backupBrowser; 
//             //     backupBrowser = brokenBrowser;

//             //     let brokenName = activeBrowserName;
//             //     activeBrowserName = backupBrowserName;
//             //     backupBrowserName = brokenName;
                
//             //     lastActiveTime = -1; frozenCheckTimestamp = Date.now();
//             //     isRecoveryUIShown = false; 

//             //     let previousActiveIndex = currentUrlIndex;
//             //     currentUrlIndex = backupUrlIndex;
//             //     activeUrlStr = urlList[currentUrlIndex].url; 
                
//             //     backupUrlIndex = getSafeBackupIndex(currentUrlIndex, previousActiveIndex, urlList);
//             //     backupUrlStr = urlList[backupUrlIndex].url;

//             //     console.log(`\n==================================================`);
//             //     console.log(`[🔄] PROACTIVE REFRESH EXECUTED SUCCESSFULLY`);
//             //     console.log(`==================================================`);

//             //     try {
//             //         await backupPage.goto('about:blank').catch(()=>{});
//             //         await applyPreloadFirewall(backupPage);
//             //         await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
//             //         await initializeVideo(backupPage, true, false);
//             //     } catch (e) {}
                
//             //     streamSetupTime = Date.now(); 
//             //     isWarmupPhase = true;
//             //     currentStreamStartTime = Date.now();
//             // } 




// // =====================================
//             // --------------------------------------------------------------------
//             // ❌ SCENARIO C: BOTH TABS FAILED (Fresh Hunting Mode)
//             // --------------------------------------------------------------------
//             else {
//                 console.log(`\n==================================================`);
//                 console.log(`[!] ❌ BOTH TABS FAILED (Active & Backup Compromised)`);
//                 console.log(`[🔍] FRESH HUNTING MODE ACTIVATED: Spawning clean tabs...`);
//                 console.log(`==================================================`);
                
//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'WaitingScene' }); } catch (e) {}

//                 currentUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 activeUrlStr = urlList[currentUrlIndex].url;
                
//                 backupUrlIndex = getSafeBackupIndex(currentUrlIndex, currentUrlIndex, urlList);
//                 backupUrlStr = urlList[backupUrlIndex].url;

//                 console.log(`[*] Hunting Active -> Server [${currentUrlIndex}]`);
//                 console.log(`[*] Hunting Backup -> Server [${backupUrlIndex}]`);

//                 console.log(`[*] Closing crashed tabs and spawning fresh ones...`);
//                 try { await activePage.close(); } catch(e) {}
//                 try { await backupPage.close(); } catch(e) {}

//                 activePage = await activeBrowser.newPage();
//                 backupPage = await backupBrowser.newPage();

//                 await setupNetworkAdBlocker(activePage);
//                 await setupNetworkAdBlocker(backupPage);
//                 attachAntiAdListeners(activePage);
//                 attachAntiAdListeners(backupPage);
//                 await applyPreloadFirewall(activePage);
//                 await applyPreloadFirewall(backupPage);

//                 try {
//                     await activePage.goto(activeUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 });
//                     await showLoadingUI(activePage, "SEARCHING SERVER", "Hunting for a stable stream connection <span class='stream-blink'>...</span>");
//                     await initializeVideo(activePage, false, true); 
//                     await hideLoadingUI(activePage);
//                 } catch(e) {}

//                 try {
//                     await backupPage.goto(backupUrlStr, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{});
//                     await initializeVideo(backupPage, true, false); 
//                 } catch(e) {}

//                 streamSetupTime = Date.now(); 
//                 isWarmupPhase = true; 
//                 currentStreamStartTime = Date.now();
//                 backupWarmupTime = Date.now();
//                 lastActiveTime = -1;
//                 frozenCheckTimestamp = Date.now();
//                 isRecoveryUIShown = false;

//                 try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
                
//                 console.log(`[*] Fresh tabs active. Waiting 15 seconds (Warm-up) for video to stabilize...`);
//             }
//         } 
       
//         await new Promise(r => setTimeout(r, 2000)); 
//     }
// }

// async function startDirectStreaming() {
//     activeBrowserName = "CHROME 1";
//     backupBrowserName = "CHROME 2";
    
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

//     browserArgs = [
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
//         '--disable-blink-features=AutomationControlled',
//         '--disable-features=Translate,BlinkGenPropertyTrees,CalculateNativeWinOcclusion,NetworkServiceInProcess2',
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

//     console.log(`[*] Starting ACTIVE browser instance...`);
//     activeBrowser = await createBrowserInstance(browserArgs);
//     const activePages = await activeBrowser.pages();
//     activePage = activePages[0];

//     console.log(`[*] Starting BACKUP browser instance in background...`);
//     backupBrowser = await createBrowserInstance(browserArgs);
//     const backupPages = await backupBrowser.pages();
//     backupPage = backupPages[0];

//     activeBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => { if (newPage && newPage !== activePage) { try { await newPage.close(); } catch(e) {} } }, 500);
//         }
//     });

//     backupBrowser.on('targetcreated', async (target) => {
//         if (target.type() === 'page') {
//             const newPage = await target.page();
//             setTimeout(async () => { if (newPage && newPage !== backupPage) { try { await newPage.close(); } catch(e) {} } }, 500);
//         }
//     });

//     await setupNetworkAdBlocker(activePage);
//     await setupNetworkAdBlocker(backupPage);

//     attachAntiAdListeners(activePage);
//     attachAntiAdListeners(backupPage);

//     await applyPreloadFirewall(activePage);
//     await applyPreloadFirewall(backupPage);

//     await activePage.bringToFront(); 

//     console.log(`[*] STEP 1: Loading Server [${currentUrlIndex}] on Active Page: ${urlList[currentUrlIndex].url}`);
//     try {
//         await activePage.goto(urlList[currentUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 });
//     } catch (e) {
//         console.log(`[⚠️] Network buffer safely handled for primary URL.`);
//     }
    
//     await showLoadingUI(activePage, "STREAM LOADING", "Optimizing live video connection <span class='stream-blink'>...</span>");
    
//     await initializeVideo(activePage, false, true); 
//     await hideLoadingUI(activePage); 

//     if (isObsConnected) {
//         console.log('\n[*] Active Video is Ready! Shifting OBS from Animated Buffer to LIVE Video (MainScene)...');
//         try { await obs.call('SetCurrentProgramScene', { sceneName: 'MainScene' }); } catch (e) {}
//     }

//     console.log(`[*] STEP 2: Silently preparing Server [${backupUrlIndex}] on Backup Page: ${urlList[backupUrlIndex].url}`);
//     try {
//         await backupPage.goto(urlList[backupUrlIndex].url, { waitUntil: 'domcontentloaded', timeout: 60000 });
//     } catch (e) {}
    
//     await initializeVideo(backupPage, true, false);
    
//     await activePage.bringToFront();
//     try { await activePage.mouse.click(10, 10); } catch(e){} 
//     await hideLoadingUI(activePage);

//     console.log(`\n==================================================`);
//     console.log(`[🎥] INITIAL CAPTURE STATUS: Ready to Broadcast`);
//     console.log(`==================================================`);
//     console.log(`[📺] CURRENT ACTIVE LIVE : Server [${currentUrlIndex}] -> ${urlList[currentUrlIndex].url}`);
//     console.log(`[🔊] LIVE AUDIO STATUS   : ON (Unmuted)`);
//     console.log(`--------------------------------------------------`);
//     console.log(`[🛡️] NEXT BACKUP QUEUE   : Server [${backupUrlIndex}] -> ${urlList[backupUrlIndex].url}`);
//     console.log(`[🔇] BACKUP AUDIO STATUS : MUTED (Background)`);
//     console.log(`==================================================\n`);

//     console.log('[*] Everything Setup! Dual-Tab Monitoring is Active.');
//     await startWatchdog();
// }

// async function mainLoop() {
//     while (true) {
//         try {
//             await startDirectStreaming();
//         } catch (error) {
//             console.error('\n==================================================');
//             console.error('[🚨] FATAL ENGINE ERROR');
//             console.error(`[!] ${error.message}`);
//             console.error('==================================================');

//             if (activeBrowser && activeBrowser.isConnected()) {
//                 console.log('[🛡️] ACTIVE CHROME STILL ALIVE — NOT RESTARTING ENGINE.');
//                 await new Promise(resolve => setTimeout(resolve, 3000));
//                 continue;
//             }

//             if (backupBrowser && backupBrowser.isConnected()) {
//                 console.log('[🛡️] BACKUP CHROME STILL ALIVE — NOT RESTARTING ENGINE.');
//                 await new Promise(resolve => setTimeout(resolve, 3000));
//                 continue;
//             }

//             console.log('[⚠️] NO CHROME INSTANCE SURVIVED. Performing final recovery.');

//             try { if (activeBrowser) await activeBrowser.close().catch(() => {}); } catch (e) {}
//             try { if (backupBrowser) await backupBrowser.close().catch(() => {}); } catch (e) {}

//             activeBrowser = null; backupBrowser = null; activePage = null; backupPage = null;

//             await new Promise(resolve => setTimeout(resolve, 3000));
//             await cleanup();
//         }
//     }
// }

// async function cleanup() {
//     console.log('[*] Cleaning up resources...');
//     try { await obs.disconnect(); } catch (e) { } 
//     if (activeBrowser) { try { await activeBrowser.close(); } catch(e) { } activeBrowser = null; }
//     if (backupBrowser) { try { await backupBrowser.close(); } catch(e) { } backupBrowser = null; }
    
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
//             const targetUrls = process.env.TARGET_URLS || 'https://sport4u.online';
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
































// streamed.pk alhamdullah successfully play
// =========== Old and best code :::::::)(**&^%^())(*&^%$$# ALhamdullah ALhamdullah yeh teek hai alhamdullah bas upper eek player hai new player jiska website k naem hai "https://embedsport.live/channel/tsn1/111/" iss me custom measn video k play button nahey bulkey html k play button hai . Jiskoo click karney see stream start huty hai. iska code upper lekty hai srf eek line change karna hai and wo line yeh hai old line is : const playBtn = await frame.$('.jw-icon-display[aria-label="Play"], button[data-plyr="play"], .vjs-big-play-button, [class*="unmute"], .fp-play'); =======================



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
// const FORCE_REFRESH_MINUTES = 40000000; 
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

// const FROZEN_THRESHOLD_MS = 8000; 

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

//             // 🚫 SHIELD: Same-Tab Hostile Redirect Hijacking Block
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

//             // Strict Ad Infrastructure Block list
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

//             // 🔥 Added Smart Unmute Continuous Engine Here
//             await triggerSmartUnmute(activePage);

//             let isTimeStuck = (activeStatus.currentTime === lastActiveTime);
//             let isFrameStuck = (activeStatus.decodedFrames === lastDecodedFrames && activeStatus.decodedFrames > 0);

//             if (isTimeStuck || isFrameStuck) {
//                 if (Date.now() - frozenCheckTimestamp > FROZEN_THRESHOLD_MS) {
//                     activeStatus.status = 'FROZEN';
//                     if (isFrameStuck && !isTimeStuck) {
//                         console.log(`[!] ⚠️ SYSTEM SHIELD: Detected Black Screen (Audio playing, but video frames stuck). Triggering HOT-SWAP.`);
//                     }
//                 }
//             } else {
//                 lastActiveTime = activeStatus.currentTime; 
//                 lastDecodedFrames = activeStatus.decodedFrames; 
//                 frozenCheckTimestamp = Date.now();
                
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
