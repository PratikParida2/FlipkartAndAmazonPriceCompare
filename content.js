// Wait for the page to fully load
window.onload = function () {
    setTimeout(async () => {
        // Extract Product Title
        let productTitle = document.evaluate("//h1", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        
        // Extract Flipkart Price
        let priceContainer = document.evaluate("//div[contains(text(), '₹')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        
        if (productTitle && priceContainer) {
            let productName = productTitle.innerText.trim();
            let flipkartPrice = priceContainer.innerText.trim();
            
            console.log("🛒 Product Name:", productName);
            console.log("💰 Flipkart Price:", flipkartPrice);
    
            // Create a Floating Box
            let priceBox = document.createElement("div");
            priceBox.innerHTML = `
                <div id="amazonPriceBox">
                    <p><strong>Amazon Price:</strong> <span id="amazonPrice">Loading...</span></p>
                    <a id="amazonLink" href="#" target="_blank">Check on Amazon</a>
                </div>
            `;
            document.body.appendChild(priceBox);
    
            // Apply Styles
            let style = document.createElement("style");
            style.innerHTML = `
                #amazonPriceBox {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: white;
                    padding: 10px;
                    border: 2px solid #ff9800;
                    border-radius: 5px;
                    box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
                    font-family: Arial, sans-serif;
                    z-index: 10000;
                }
                #amazonPriceBox p {
                    margin: 5px 0;
                }
                #amazonLink {
                    display: inline-block;
                    padding: 5px 10px;
                    background: #ff9800;
                    color: white;
                    text-decoration: none;
                    border-radius: 3px;
                }
                #amazonLink:hover {
                    background: #e68900;
                }
            `;
            document.head.appendChild(style);
    
            // Search for the Product on Amazon
            let amazonSearchURL = `https://www.amazon.in/s?k=${encodeURIComponent(productName)}`;
            document.getElementById("amazonLink").href = amazonSearchURL;
    
            // Fetch the Price from Amazon (Using Scraper or API - Placeholder for Now)
            document.getElementById("amazonPrice").innerText = "₹XX,XXX (Check on Amazon)";
        } else {
            console.error("❌ Product info not found!");
        }
    }, 2000); // Wait for Flipkart page to load
    
}
