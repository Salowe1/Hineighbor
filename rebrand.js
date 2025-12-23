(function() {
    /**
     * CONFIGURATION HI NEIGHBOR
     */
    const CONFIG = {
        name: "Hi Neighbor",
        oldName: "AlloVoisins",
        mainColor: "#2D5BFF",
        supportEmail: "support@hineighbor.com"
    };

    /**
     * DICTIONNAIRE DE TRADUCTION & REBRANDING
     * Basé sur l'intégralité des textes fournis (Litiges, KYC, Abonnements)
     */
    const replacements = [
        { old: /AlloVoisins/gi, new: CONFIG.name },
        { old: /Voisin/g, new: "Neighbor" },
        { old: /Voisins/g, new: "Neighbors" },
        { old: /Abonnement Premier/gi, new: "Premium Membership" },
        { old: /Abonnement Standard/gi, new: "Basic Plan" },
        { old: /offreur/gi, new: "Provider" },
        { old: /demandeur/gi, new: "Requester" },
        { old: /solde AlloVoisins/gi, new: CONFIG.name + " balance" },
        { old: /Mon périmètre/gi, new: "My Activity Zone" },
        { old: /vérification KYC/gi, new: "Identity Verification (KYC)" },
        { old: /contact@allovoisins.com/gi, new: CONFIG.supportEmail },
        { old: /Signaler un abus/gi, new: "Report a Violation" },
        { old: /Service Clients/gi, new: "Support Team" }
    ];

    /**
     * INJECTEUR CSS (DEBUGUÉ)
     * Remplace le orange par le bleu et stylise les tableaux KYC
     */
    function injectStyles() {
        if (document.getElementById('hn-styles')) return;
        const style = document.createElement('style');
        style.id = 'hn-styles';
        style.innerHTML = `
            :root { --hn-blue: ${CONFIG.mainColor}; }
            
            /* Couleurs de marque */
            .brand-color, .btn-primary, header, footer, .search-submit, .button { 
                background-color: var(--hn-blue) !important; 
                border-color: var(--hn-blue) !important;
                color: #ffffff !important;
            }
            
            a { color: var(--hn-blue) !important; }

            /* Mise en forme des tableaux (KYC/Activités réglementées) */
            table { width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #eee; }
            th { background: #f8f9fa; padding: 12px; text-align: left; border-bottom: 2px solid var(--hn-blue); }
            td { padding: 10px; border-bottom: 1px solid #eee; font-size: 14px; }

            /* Suppression visuelle du logo original si nécessaire */
            img[alt*="AlloVoisins"] { filter: hue-rotate(200deg); } 
        `;
        document.head.appendChild(style);
    }

    /**
     * MOTEUR DE REMPLACEMENT (DEBUGUÉ)
     */
    function runRebrand() {
        // 1. Textes visibles
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
            let text = node.nodeValue;
            replacements.forEach(r => {
                if (text.match(r.old)) {
                    node.nodeValue = text.replace(r.old, r.new);
                }
            });
        }

        // 2. Éléments interactifs
        document.querySelectorAll('input, textarea, [placeholder]').forEach(el => {
            replacements.forEach(r => {
                if (el.placeholder) el.placeholder = el.placeholder.replace(r.old, r.new);
                if (el.value && el.type === "button") el.value = el.value.replace(r.old, r.new);
            });
        });

        // 3. Titre de l'onglet
        if (document.title.includes(CONFIG.oldName)) {
            document.title = document.title.replace(new RegExp(CONFIG.oldName, 'gi'), CONFIG.name);
        }
        
        injectStyles();
    }

    /**
     * INITIALISATION ET SURVEILLANCE DYNAMIQUE
     */
    runRebrand();
    
    // Le MutationObserver permet de maintenir le rebranding même quand on change de page sur Zendesk
    const observer = new MutationObserver(() => {
        runRebrand();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
