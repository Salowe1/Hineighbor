/**
 * HI NEIGHBOR - UNIVERSAL REBRANDING SCRIPT
 * Integration of all provided AlloVoisins documentation rules.
 */
(function() {
    const CONFIG = {
        brandName: "Hi Neighbor",
        oldName: "AlloVoisins",
        premiumTier: "Premium Membership",
        standardTier: "Basic Membership",
        supportEmail: "support@hineighbor.com",
        accentColor: "#2D5BFF" 
    };

    const dictionary = [
        // --- Core Identity ---
        { old: /AlloVoisins/gi, new: CONFIG.brandName },
        { old: /Voisin/g, new: "Neighbor" },
        { old: /Voisins/g, new: "Neighbors" },

        // --- Subscriptions & Areas (Périmètres) ---
        { old: /Abonnement Premier/gi, new: CONFIG.premiumTier },
        { old: /Abonnement Standard/gi, new: CONFIG.standardTier },
        { old: /Mon périmètre/gi, new: "My Activity Zone" },
        { old: /périmètre d'intervention/gi, new: "Service Area" },
        { old: /Devenir Premier/gi, new: "Go Premium" },

        // --- Roles & Logic ---
        { old: /offreur/gi, new: "Provider" },
        { old: /demandeur/gi, new: "Requester" },
        { old: /postez des demandes/gi, new: "post requests" },
        { old: /proposer mes services/gi, new: "offer my services" },

        // --- Payment & Banking (Mangopay/KYC) ---
        { old: /solde AlloVoisins/gi, new: CONFIG.brandName + " balance" },
        { old: /vérification KYC/gi, new: "Identity Verification (KYC)" },
        { old: /Mangopay/g, new: "Mangopay (Secure Payment Partner)" },
        { old: /SCA \(Strong Customer Authentification\)/gi, new: "Secure Banking Auth (SCA)" },
        { old: /RIB/g, new: "Bank Account Details (IBAN)" },

        // --- Support & Safety (Disputes/Reporting) ---
        { old: /Signaler un abus/gi, new: "Report a Violation" },
        { old: /Service Clients/gi, new: "Hi Neighbor Support" },
        { old: /contact@allovoisins.com/gi, new: CONFIG.supportEmail },
        { old: /réquisition judiciaire/gi, new: "legal warrant" },

        // --- Navigation & Browsers ---
        { old: /Internet Explorer/g, new: "Unsupported Legacy Browsers (IE)" }
    ];

    function applyFullRebrand() {
        // 1. TEXT NODES: Handles all the documentation text you provided
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
            let text = node.nodeValue;
            dictionary.forEach(item => {
                if (text.match(item.old)) {
                    node.nodeValue = text.replace(item.old, item.new);
                }
            });
        }

        // 2. INTERACTIVE ELEMENTS: Buttons, Placeholders, Inputs
        document.querySelectorAll('input, textarea, [placeholder], [title]').forEach(el => {
            dictionary.forEach(item => {
                if (el.placeholder) el.placeholder = el.placeholder.replace(item.old, item.new);
                if (el.title) el.title = el.title.replace(item.old, item.new);
                if (el.value && el.type === "button") el.value = el.value.replace(item.old, item.new);
            });
        });

        // 3. TAB TITLE
        if (document.title.includes(CONFIG.oldName)) {
            document.title = document.title.replace(new RegExp(CONFIG.oldName, 'gi'), CONFIG.brandName);
        }

        // 4. DYNAMIC CSS INJECTION (Overrides the Orange Identity)
        if (!document.getElementById('hn-rebrand-css')) {
            const style = document.createElement('style');
            style.id = 'hn-rebrand-css';
            style.innerHTML = `
                /* Main Brand Color Overrides */
                :root { --hn-main: ${CONFIG.accentColor}; }
                header, footer, .btn-primary, .top-bar, .search-submit { background-color: var(--hn-main) !important; }
                a, .article-list-item a, .breadcrumbs li a { color: var(--hn-main) !important; }
                
                /* Style for the KYC/Regulated activities tables you provided */
                table { width: 100%; border-collapse: collapse; border: 1px solid #ddd; margin: 20px 0; font-family: sans-serif; }
                th { background-color: #f5f5f5; padding: 12px; text-align: left; border-bottom: 2px solid var(--hn-main); }
                td { padding: 10px; border-bottom: 1px solid #eee; font-size: 14px; }
                
                /* Verification Status Badges */
                .status-badge-premium { background: #FFD700; color: #000; padding: 2px 8px; border-radius: 4px; font-weight: bold; }
            `;
            document.head.appendChild(style);
        }
    }

    // Initialize
    applyFullRebrand();

    // DOM OBSERVER: Essential for Zendesk/Single Page Apps
    const observer = new MutationObserver((mutations) => {
        applyFullRebrand();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    console.log(CONFIG.brandName + " Rebranding Active.");
})();
