(function() {
    const CONFIG = {
        name: "Hi Neighbor",
        oldName: "AlloVoisins",
        mainColor: "#2D5BFF" // Bleu moderne
    };

    function applyDesign() {
        if (!document.getElementById('hi-neighbor-core-style')) {
            const style = document.createElement('style');
            style.id = 'hi-neighbor-core-style';
            style.innerHTML = `
                /* 1. FORÇAGE DE LA COULEUR SUR TOUTE LA PLATEFORME */
                header, footer, .top-bar, .navbar, .btn-primary, button[type="submit"], .search-submit {
                    background-color: ${CONFIG.mainColor} !important;
                    background: ${CONFIG.mainColor} !important;
                    border-color: ${CONFIG.mainColor} !important;
                }

                /* 2. FORÇAGE SUR LES LIENS ET TEXTES CLÉS */
                a, .article-list-item a, .breadcrumbs li a, .sub-nav li a {
                    color: ${CONFIG.mainColor} !important;
                }

                /* 3. STYLE DES TABLEAUX (DOCS KYC ET REGLEMENTATION) */
                .article-body table {
                    width: 100% !important;
                    border-collapse: collapse !important;
                    border: 1px solid #ddd !important;
                    margin: 20px 0 !important;
                }
                .article-body th {
                    background-color: #f5f5f5 !important;
                    color: #333 !important;
                    padding: 12px !important;
                    border: 1px solid #ddd !important;
                }
                .article-body td {
                    padding: 10px !important;
                    border: 1px solid #eee !important;
                }

                /* 4. MASQUAGE DU LOGO ALLOVOISINS POUR LE REMPLACER PAR TEXTE */
                .logo img, header img[alt*="AlloVoisins"] {
                    display: none !important;
                }
                .logo::after {
                    content: "${CONFIG.name}";
                    font-size: 24px;
                    font-weight: bold;
                    color: white;
                    vertical-align: middle;
                }
            `;
            document.head.appendChild(style);
        }
    }

    function runReplacement() {
        // Remplacement des textes (Articles, Titres, Menus)
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
            let text = node.nodeValue;
            if (text.includes(CONFIG.oldName)) {
                node.nodeValue = text.replace(new RegExp(CONFIG.oldName, 'gi'), CONFIG.name);
            }
            // Traduction simplifiée des termes Neighbors
            node.nodeValue = node.nodeValue.replace(/Voisins/g, "Neighbors").replace(/Voisin/g, "Neighbor");
        }

        // Remplacement dans les champs de recherche (Placeholders)
        document.querySelectorAll('input, textarea').forEach(el => {
            if (el.placeholder) el.placeholder = el.placeholder.replace(new RegExp(CONFIG.oldName, 'gi'), CONFIG.name);
        });

        applyDesign();
    }

    // Lancement immédiat
    runReplacement();

    // Surveillance pour les pages qui chargent sans rafraîchir (Zendesk Guide)
    const observer = new MutationObserver(() => {
        runReplacement();
    });
    observer.observe(document.body, { childList: true, subtree: true });

})();
