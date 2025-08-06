// Bonus Share Adjustment Calculator logic
window.addEventListener('DOMContentLoaded', function() {
    const marketInput = document.getElementById('bonusMarketPrice');
    const percentInput = document.getElementById('bonusPercent');
    const calcBtn = document.querySelector('.bonus-calc-btn');
    const clearBtn = document.querySelector('.bonus-clear-btn');
    const resultMarket = document.getElementById('bonusResultMarketPrice');
    const resultPercent = document.getElementById('bonusResultPercent');
    const resultAdjusted = document.getElementById('bonusResultAdjusted');

    function calculateBonus() {
        const market = parseFloat(marketInput.value);
        const percent = parseFloat(percentInput.value);
        if (isNaN(market) || isNaN(percent) || market <= 0 || percent < 0) {
            resultMarket.textContent = '-';
            resultPercent.textContent = '-';
            resultAdjusted.textContent = '-';
            return;
        }
        const adjusted = market / (1 + percent / 100);
        resultMarket.textContent = market.toLocaleString(undefined, {maximumFractionDigits: 2});
        resultPercent.textContent = percent.toLocaleString(undefined, {maximumFractionDigits: 2});
        resultAdjusted.textContent = adjusted.toLocaleString(undefined, {maximumFractionDigits: 2});
    }

    function clearBonus() {
        marketInput.value = '';
        percentInput.value = '';
        resultMarket.textContent = '-';
        resultPercent.textContent = '-';
        resultAdjusted.textContent = '-';
    }

    if (calcBtn) calcBtn.addEventListener('click', calculateBonus);
    if (clearBtn) clearBtn.addEventListener('click', clearBonus);
}); 