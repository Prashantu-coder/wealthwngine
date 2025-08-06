function showTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(section => {
        section.style.display = 'none';
    });
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // Show selected tab
    document.getElementById(tabId).style.display = 'block';
    // Set active class on clicked button
    const navButtons = document.querySelectorAll('#main-nav .tab-btn');
    navButtons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(tabId)) {
            btn.classList.add('active');
        }
    });
}

// Keep calculator function
function calculateProfit() {
    const buyPrice = parseFloat(document.getElementById('buyPrice').value);
    const sellPrice = parseFloat(document.getElementById('sellPrice').value);
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    const resultDiv = document.getElementById('result');

    if (isNaN(buyPrice) || isNaN(sellPrice) || isNaN(quantity) || quantity <= 0) {
        resultDiv.textContent = 'Please enter valid values for all fields.';
        return;
    }

    const totalBuy = buyPrice * quantity;
    const totalSell = sellPrice * quantity;
    const profit = totalSell - totalBuy;
    const profitPercent = (profit / totalBuy) * 100;

    resultDiv.innerHTML = `
        <strong>Profit/Loss:</strong> ${profit.toFixed(2)}<br>
        <strong>Profit/Loss Percentage:</strong> ${profitPercent.toFixed(2)}%
    `;
}

// Show SIP Calculator when selected from dropdown
window.addEventListener('DOMContentLoaded', function() {
    // SIP Calculator link
    const sipLink = document.querySelector('.dropdown-content a[data-tool="sip"]');
    if (sipLink) {
        sipLink.addEventListener('click', function(e) {
            e.preventDefault();
            showTab('tools');
            document.querySelectorAll('[id$="-calculator-section"]').forEach(sec => sec.style.display = 'none');
            const sipSection = document.getElementById('sip-calculator-section');
            if (sipSection) sipSection.style.display = 'block';
        });
    }
    // Buy Calculator link
    const buyLink = document.querySelector('.dropdown-content a[data-tool="buy"]');
    if (buyLink) {
        buyLink.addEventListener('click', function(e) {
            e.preventDefault();
            showTab('tools');
            document.querySelectorAll('[id$="-calculator-section"]').forEach(sec => sec.style.display = 'none');
            const buySection = document.getElementById('buy-calculator-section');
            if (buySection) buySection.style.display = 'block';
        });
    }
    // EMI Calculator link
    const emiLink = document.querySelector('.dropdown-content a[data-tool="emi"]');
    if (emiLink) {
        emiLink.addEventListener('click', function(e) {
            e.preventDefault();
            showTab('tools');
            document.querySelectorAll('[id$="-calculator-section"]').forEach(sec => sec.style.display = 'none');
            const emiSection = document.getElementById('emi-calculator-section');
            if (emiSection) emiSection.style.display = 'block';
        });
    }
    // Bonus Adjustment Calculator link
    const bonusLink = document.querySelector('.dropdown-content a[data-tool="bonus"]');
    if (bonusLink) {
        bonusLink.addEventListener('click', function(e) {
            e.preventDefault();
            showTab('tools');
            document.querySelectorAll('[id$="-calculator-section"]').forEach(sec => sec.style.display = 'none');
            const bonusSection = document.getElementById('bonus-adjustment-calculator-section');
            if (bonusSection) bonusSection.style.display = 'block';
        });
    }
    // Right Adjustment Calculator link
    const rightLink = document.querySelector('.dropdown-content a[data-tool="right"]');
    if (rightLink) {
        rightLink.addEventListener('click', function(e) {
            e.preventDefault();
            showTab('tools');
            document.querySelectorAll('[id$="-calculator-section"]').forEach(sec => sec.style.display = 'none');
            const rightSection = document.getElementById('right-adjustment-calculator-section');
            if (rightSection) rightSection.style.display = 'block';
        });
    }
    // Dividend Calculator link
    const dividendLink = document.querySelector('.dropdown-content a[data-tool="dividend"]');
    if (dividendLink) {
        dividendLink.addEventListener('click', function(e) {
            e.preventDefault();
            showTab('tools');
            document.querySelectorAll('[id$="-calculator-section"]').forEach(sec => sec.style.display = 'none');
            const dividendSection = document.getElementById('dividend-calculator-section');
            if (dividendSection) dividendSection.style.display = 'block';
        });
    }
});

console.log('Welcome to Wealth Engine!'); 