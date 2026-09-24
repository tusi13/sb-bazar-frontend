// ==========================================
// S.B. BAZAR - ROBOTIC AI COPILOT ENGINE (V2.6 LIVE)
// ==========================================

(function () {
    // Inject custom robotic styles dynamically
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
        @keyframes robotPulse {
            0% { box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.7); }
            70% { box-shadow: 0 0 0 12px rgba(13, 148, 136, 0); }
            100% { box-shadow: 0 0 0 0 rgba(13, 148, 136, 0); }
        }
        @keyframes eyeBlink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
        }
        .robot-avatar {
            animation: robotPulse 2.5s infinite;
        }
        .robot-eyes {
            animation: eyeBlink 4s infinite;
        }
    `;
    document.head.appendChild(styleEl);

    // Create the global floating robotic widget DOM container
    document.addEventListener("DOMContentLoaded", function () {
        if (document.getElementById('sbeRobotWidgetContainer')) return;

        const widgetHTML = `
        <div id="sbeRobotWidgetContainer" class="fixed bottom-6 left-6 z-[9990] flex flex-col items-start select-none font-sans">
            
            <!-- ROBOT CHAT DRAWER -->
            <div id="robotChatDrawer" class="mb-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border-2 border-teal-600 overflow-hidden flex flex-col h-[520px] transition-all duration-300 transform scale-0 origin-bottom-left" style="display:none;" x-cloak>
                
                <!-- Robot Header -->
                <div class="bg-slate-900 text-white p-4 flex items-center justify-between border-b-2 border-teal-600 shadow-md">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-2xl bg-teal-800 flex items-center justify-center text-xl shadow-inner border border-teal-400 robot-avatar relative">
                            <span class="robot-eyes">🤖</span>
                            <span class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
                        </div>
                        <div>
                            <h4 class="font-black text-xs uppercase tracking-wider text-teal-300">SB Bazar Robo-Copilot</h4>
                            <p class="text-[9px] text-slate-400 font-mono">Neural Database Node Active</p>
                        </div>
                    </div>
                    <button id="closeRobotBtn" class="text-slate-400 hover:text-white font-black text-sm cursor-pointer transition bg-slate-800 w-7 h-7 rounded-full flex items-center justify-center">✕</button>
                </div>

                <!-- Chat Messages Box -->
                <div id="robotMessagesList" class="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950 text-xs font-medium">
                    <div class="flex flex-col items-start">
                        <div class="max-w-[88%] rounded-2xl p-3.5 shadow-md bg-slate-900 text-teal-100 border border-teal-800/60 rounded-bl-none space-y-1 leading-relaxed">
                            <p>Beep boop! 🤖 I am your SB Bazar Smart AI Assistant. Ask me about chair units, equipment stock, HSN codes, pricing, or our 5% SB coin cashback policy!</p>
                        </div>
                    </div>
                </div>

                <!-- Quick Query Chips -->
                <div class="px-3 py-2 bg-slate-900 border-t border-slate-800 flex gap-1.5 overflow-x-auto text-[10px] whitespace-nowrap">
                    <button onclick="window.sendRoboQuery('What is the 5% SB coin cashback policy?')" class="bg-slate-800 hover:bg-teal-800 text-teal-300 px-3 py-1 rounded-full border border-teal-700/50 cursor-pointer transition">🪙 SB Coins Policy</button>
                    <button onclick="window.sendRoboQuery('What are the Dhanbad hub shipping times?')" class="bg-slate-800 hover:bg-teal-800 text-teal-300 px-3 py-1 rounded-full border border-teal-700/50 cursor-pointer transition">🚚 Shipping & Hub</button>
                    <button onclick="window.sendRoboQuery('What is the price of Alginate?')" class="bg-slate-800 hover:bg-teal-800 text-teal-300 px-3 py-1 rounded-full border border-teal-700/50 cursor-pointer transition">💊 Alginate Price</button>
                    <button onclick="window.sendRoboQuery('What are the GST tax slabs?')" class="bg-slate-800 hover:bg-teal-800 text-teal-300 px-3 py-1 rounded-full border border-teal-700/50 cursor-pointer transition">🧾 GST Tax Slabs</button>
                </div>

                <!-- Chat Input Form -->
                <form id="robotChatForm" class="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
                    <input type="text" id="robotInputQuery" placeholder="Ask assistant anything..." class="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-teal-500 font-medium placeholder-slate-500">
                    <button type="submit" class="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-black px-4 py-2.5 rounded-xl text-xs cursor-pointer shadow-lg transition">SEND</button>
                </form>
            </div>

            <!-- Floating Robot Trigger Button (Bottom Left) -->
            <button id="toggleRobotDrawerBtn" class="bg-gradient-to-br from-teal-600 to-slate-900 hover:from-teal-500 hover:to-slate-950 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 p-4 border-2 border-teal-300 cursor-pointer relative robot-avatar group">
                <span class="text-2xl robot-eyes">🤖</span>
                <span class="absolute left-16 bg-slate-900 text-teal-300 text-[10px] font-black px-3.5 py-2 rounded-2xl shadow-2xl whitespace-nowrap hidden group-hover:block uppercase tracking-wider border border-teal-500">✨ Ask Smart AI Copilot</span>
                <span class="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-slate-900 animate-ping"></span>
            </button>
        </div>
        `;

        const div = document.createElement('div');
        div.innerHTML = widgetHTML;
        document.body.appendChild(div);

        // Toggle Mechanics
        const drawer = document.getElementById('robotChatDrawer');
        const toggleBtn = document.getElementById('toggleRobotDrawerBtn');
        const closeBtn = document.getElementById('closeRobotBtn');
        const form = document.getElementById('robotChatForm');
        const input = document.getElementById('robotInputQuery');
        const msgList = document.getElementById('robotMessagesList');

        let isOpen = false;

        function toggleDrawer() {
            isOpen = !isOpen;
            if (isOpen) {
                drawer.style.display = 'flex';
                setTimeout(() => drawer.classList.remove('scale-0'), 10);
                input.focus();
            } else {
                drawer.classList.add('scale-0');
                setTimeout(() => drawer.style.display = 'none', 300);
            }
        }

        toggleBtn.addEventListener('click', toggleDrawer);
        closeBtn.addEventListener('click', toggleDrawer);

        window.sendRoboQuery = function(text) {
            input.value = text;
            form.dispatchEvent(new Event('submit'));
        };

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const queryText = input.value.trim();
            if (!queryText) return;

            // Append User Message
            msgList.innerHTML += `
                <div class="flex flex-col items-end">
                    <div class="max-w-[88%] rounded-2xl p-3.5 shadow-md bg-teal-700 text-white rounded-br-none text-xs">
                        <p>${escapeHtml(queryText)}</p>
                    </div>
                </div>
            `;
            input.value = '';
            msgList.scrollTop = msgList.scrollHeight;

            const qLower = queryText.toLowerCase();

            // ==========================================
            // AUTOMATED RULES INTERCEPTION (POLICY & SHIPPING)
            // ==========================================
            let localAnswer = null;

            if (qLower.includes('cashback') || qLower.includes('sb coin') || qLower.includes('coin policy')) {
                localAnswer = `🪙 <b>SB Coin Cashback Policy:</b><br>You earn a flat <b>5% cashback in SB Coins</b> on all orders placed on SB Bazar! These coins are automatically credited to your user account the moment your order status changes to <i>DELIVERED</i> or <i>COMPLETED</i>.`;
            } 
            else if (qLower.includes('shipping') || qLower.includes('dhanbad') || qLower.includes('delivery time') || qLower.includes('hub')) {
                localAnswer = `🚚 <b>Dhanbad Hub Shipping Logistics:</b><br>Our primary distribution node is located at Bank More, Dhanbad (Jharkhand).<br>• <b>Local Dhanbad Orders (826xxx):</b> Same-day express delivery within 60 to 120 minutes.<br>• <b>Regional / National Shipments:</b> Delivered safely via our logistics partners within 2-4 business days.`;
            }

            // If a local automated rule matched, display it instantly without hitting the server
            if (localAnswer) {
                msgList.innerHTML += `
                    <div class="flex flex-col items-start">
                        <div class="max-w-[88%] rounded-2xl p-3.5 shadow-md bg-slate-900 text-teal-100 border border-teal-800/60 rounded-bl-none text-xs leading-relaxed space-y-1">
                            <p>${localAnswer}</p>
                        </div>
                    </div>
                `;
                msgList.scrollTop = msgList.scrollHeight;
                return;
            }

            // Append Robotic Typing Indicator for database/server queries
            const typingId = 'typing_' + Date.now();
            msgList.innerHTML += `
                <div id="${typingId}" class="flex flex-col items-start">
                    <div class="max-w-[88%] rounded-2xl p-3.5 shadow-md bg-slate-900 text-teal-300 border border-teal-800/60 rounded-bl-none text-xs flex items-center gap-1.5 font-mono">
                        <span>🤖 Processing query</span>
                        <span class="animate-pulse">...</span>
                    </div>
                </div>
            `;
            msgList.scrollTop = msgList.scrollHeight;

            try {
                const res = await window.fetch('https://dentist-bazar-backend.onrender.com/api/ai/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: queryText })
                });
                const data = await res.json();

                // Remove typing indicator
                document.getElementById(typingId)?.remove();

                let actionButtonHTML = '';
                if (data.product_id) {
                    actionButtonHTML = `<button onclick="window.openRoboProduct('${data.product_id}')" class="mt-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-[10px] uppercase shadow-md cursor-pointer block transition">🔍 Inspect Product</button>`;
                }

                msgList.innerHTML += `
                    <div class="flex flex-col items-start">
                        <div class="max-w-[88%] rounded-2xl p-3.5 shadow-md bg-slate-900 text-teal-100 border border-teal-800/60 rounded-bl-none text-xs leading-relaxed space-y-1">
                            <p>${data.answer}</p>
                            ${actionButtonHTML}
                        </div>
                    </div>
                `;
            } catch (err) {
                document.getElementById(typingId)?.remove();
                msgList.innerHTML += `
                    <div class="flex flex-col items-start">
                        <div class="max-w-[88%] rounded-2xl p-3.5 shadow-md bg-slate-900 text-red-300 border border-red-900/60 rounded-bl-none text-xs">
                            <p>⚠️ Neural network connection timeout. Please verify your backend server.</p>
                        </div>
                    </div>
                `;
            }
            msgList.scrollTop = msgList.scrollHeight;
        });

        window.openRoboProduct = function(productId) {
            window.location.href = `index.html?product=${productId}`;
        };

        function escapeHtml(text) {
            const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
            return text.replace(/[&<>"']/g, function(m) { return map[m]; });
        }
    });
})();
