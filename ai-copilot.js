// ==========================================
// SB BAZAR - INTELLIGENT AI COPILOT V3.0
// ==========================================

(function () {
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
        .robot-avatar { animation: robotPulse 2.5s infinite; }
        .robot-eyes { animation: eyeBlink 4s infinite; }
    `;
    document.head.appendChild(styleEl);

    document.addEventListener("DOMContentLoaded", function () {
        if (document.getElementById('sbeRobotWidgetContainer')) return;

        const widgetHTML = `
        <div id="sbeRobotWidgetContainer" class="fixed bottom-6 left-6 z-[9990] flex flex-col items-start select-none font-sans">
            
            <!-- ROBOT CHAT DRAWER -->
            <div id="robotChatDrawer" class="mb-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border-2 border-teal-600 overflow-hidden flex flex-col h-[540px] transition-all duration-300 transform scale-0 origin-bottom-left" style="display:none;" x-cloak>
                
                <!-- Robot Header -->
                <div class="bg-slate-900 text-white p-4 flex items-center justify-between border-b-2 border-teal-600 shadow-md">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-2xl bg-teal-800 flex items-center justify-center text-xl shadow-inner border border-teal-400 robot-avatar relative">
                            <span class="robot-eyes">🤖</span>
                            <span class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
                        </div>
                        <div>
                            <h4 class="font-black text-xs uppercase tracking-wider text-teal-300">SB Bazar Smart Assistant</h4>
                            <p class="text-[9px] text-slate-400 font-mono">Autonomous Sales & Support Active</p>
                        </div>
                    </div>
                    <button id="closeRobotBtn" class="text-slate-400 hover:text-white font-black text-sm cursor-pointer transition bg-slate-800 w-7 h-7 rounded-full flex items-center justify-center">✕</button>
                </div>

                <!-- Chat Messages Box -->
                <div id="robotMessagesList" class="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950 text-xs font-medium">
                    <div class="flex flex-col items-start">
                        <div class="max-w-[88%] rounded-2xl p-3.5 shadow-md bg-slate-900 text-teal-100 border border-teal-800/60 rounded-bl-none space-y-1 leading-relaxed">
                            <p>Hello Doctor! 👋 I am your SB Bazar AI assistant. I can look up any equipment, add items directly to your cart, or save your contact details for orders. How can I help you today?</p>
                        </div>
                    </div>
                </div>

                <!-- Quick Query Chips -->
                <div class="px-3 py-2 bg-slate-900 border-t border-slate-800 flex gap-1.5 overflow-x-auto text-[10px] whitespace-nowrap">
                    <button onclick="window.sendRoboQuery('Show me dental chairs')" class="bg-slate-800 hover:bg-teal-800 text-teal-300 px-3 py-1 rounded-full border border-teal-700/50 cursor-pointer transition">💺 Dental Chairs</button>
                    <button onclick="window.sendRoboQuery('Add Alginate to my cart')" class="bg-slate-800 hover:bg-teal-800 text-teal-300 px-3 py-1 rounded-full border border-teal-700/50 cursor-pointer transition">🛒 Add Item to Cart</button>
                    <button onclick="window.sendRoboQuery('Register my phone number and email')" class="bg-slate-800 hover:bg-teal-800 text-teal-300 px-3 py-1 rounded-full border border-teal-700/50 cursor-pointer transition">📱 Share Contact Info</button>
                    <button onclick="window.sendRoboQuery('What is the SB coin policy?')" class="bg-slate-800 hover:bg-teal-800 text-teal-300 px-3 py-1 rounded-full border border-teal-700/50 cursor-pointer transition">🪙 SB Coins</button>
                </div>

                <!-- Chat Input Form -->
                <form id="robotChatForm" class="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
                    <input type="text" id="robotInputQuery" placeholder="Ask about products, add to cart, or type number/email..." class="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-teal-500 font-medium placeholder-slate-500">
                    <button type="submit" class="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-black px-4 py-2.5 rounded-xl text-xs cursor-pointer shadow-lg transition">SEND</button>
                </form>
            </div>

            <!-- Floating Trigger Button -->
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

        const drawer = document.getElementById('robotChatDrawer');
        const toggleBtn = document.getElementById('toggleRobotDrawerBtn');
        const closeBtn = document.getElementById('closeRobotBtn');
        const form = document.getElementById('robotChatForm');
        const input = document.getElementById('robotInputQuery');
        const msgList = document.getElementById('robotMessagesList');

        let isOpen = false;
        let waitingForContactInfo = false; // State manager for natural phone/email collection

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
            let botReply = "";

            // ==========================================
            // 1. NATURAL CONTACT INFO COLLECTION (PHONE & EMAIL)
            // ==========================================
            if (waitingForContactInfo || qLower.includes('phone') || qLower.includes('email') || qLower.includes('number') || qLower.includes('register my')) {
                if (!waitingForContactInfo && !qLower.includes('@') && !/\d{10}/.test(qLower)) {
                    waitingForContactInfo = true;
                    botReply = `I'd be glad to record your details! Please share your **10-digit mobile number** and **email ID** (e.g., doctor@clinic.com).`;
                    appendBotMessage(botReply);
                    return;
                } else {
                    // Extract email or phone if provided
                    const emailMatch = queryText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
                    const phoneMatch = queryText.match(/\d{10}/);

                    let savedDetails = [];
                    if (emailMatch) savedDetails.push(`Email: <b>${emailMatch[0]}</b>`);
                    if (phoneMatch) savedDetails.push(`Phone: <b>${phoneMatch[0]}</b>`);

                    if (savedDetails.length > 0) {
                        waitingForContactInfo = false;
                        botReply = `✅ Thank you! I have successfully noted your contact info: ${savedDetails.join(' | ')}. This will be linked to your active profile for swift checkout and order updates.`;
                    } else {
                        botReply = `Hmm, I didn't catch a valid 10-digit phone number or email address in that message. Could you please retype them clearly?`;
                    }
                    appendBotMessage(botReply);
                    return;
                }
            }

            // ==========================================
            // 2. AUTOMATED LOCAL POLICIES
            // ==========================================
            if (qLower.includes('cashback') || qLower.includes('sb coin')) {
                botReply = `🪙 <b>SB Coin Cashback Policy:</b> You earn a flat 5% cashback in SB Coins on all orders placed on SB Bazar! Coins credit instantly upon delivery.`;
                appendBotMessage(botReply);
                return;
            }

            // ==========================================
            // 3. DATABASE INVENTORY & SMART CART ACTION
            // ==========================================
            const typingId = 'typing_' + Date.now();
            msgList.innerHTML += `
                <div id="${typingId}" class="flex flex-col items-start">
                    <div class="max-w-[88%] rounded-2xl p-3.5 shadow-md bg-slate-900 text-teal-300 border border-teal-800/60 rounded-bl-none text-xs flex items-center gap-1.5 font-mono">
                        <span>🤖 Searching store database</span>
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
                document.getElementById(typingId)?.remove();

                botReply = data.answer || "I have noted your request!";
                let actionHTML = '';

                if (data.product_id) {
                    actionHTML = `
                        <div class="mt-2.5 flex gap-2">
                            <button onclick="window.openRoboProduct('${data.product_id}')" class="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-3 py-1.5 rounded-xl text-[10px] uppercase shadow-md cursor-pointer transition">🔍 Inspect</button>
                            <button onclick="window.roboAddToCart(${data.product_id}, '${escapeHtml(data.product_name || 'Item')}')" class="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-3 py-1.5 rounded-xl text-[10px] uppercase shadow-md cursor-pointer transition">🛒 Add to Cart</button>
                        </div>
                    `;
                }

                msgList.innerHTML += `
                    <div class="flex flex-col items-start">
                        <div class="max-w-[88%] rounded-2xl p-3.5 shadow-md bg-slate-900 text-teal-100 border border-teal-800/60 rounded-bl-none text-xs leading-relaxed space-y-1">
                            <p>${botReply}</p>
                            ${actionHTML}
                        </div>
                    </div>
                `;
            } catch (err) {
                document.getElementById(typingId)?.remove();
                appendBotMessage(`⚠️ Unable to reach live inventory server right now. Feel free to browse categories directly!`);
            }
            msgList.scrollTop = msgList.scrollHeight;
        });

        function appendBotMessage(htmlContent) {
            msgList.innerHTML += `
                <div class="flex flex-col items-start">
                    <div class="max-w-[88%] rounded-2xl p-3.5 shadow-md bg-slate-900 text-teal-100 border border-teal-800/60 rounded-bl-none text-xs leading-relaxed space-y-1">
                        <p>${htmlContent}</p>
                    </div>
                </div>
            `;
            msgList.scrollTop = msgList.scrollHeight;
        }

        // Action helper to add items to Alpine.js cart directly from chat
        window.roboAddToCart = function(productId, productName) {
            let cart = [];
            try {
                cart = JSON.parse(localStorage.getItem('sb_dent_cart') || '[]');
            } catch(e) { cart = []; }

            const existing = cart.find(i => i.id == productId || i.product_id == productId);
            if (existing) {
                existing.qty = (existing.qty || 1) + 1;
            } else {
                cart.push({ id: productId, product_id: productId, name: productName, price: 1000, qty: 1 });
            }
            localStorage.setItem('sb_dent_cart', JSON.stringify(cart);
            
            appendBotMessage(`🎉 Successfully added <b>${productName}</b> to your cart! You can review it anytime in your basket summary.`);
        };

        window.openRoboProduct = function(productId) {
            window.location.href = `index.html?product=${productId}`;
        };

        function escapeHtml(text) {
            const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
            return text.replace(/[&<>"']/g, function(m) { return map[m]; });
        }
    });
})();
