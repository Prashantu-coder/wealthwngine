// Right Share Adjustment Calculator logic
window.addEventListener('DOMContentLoaded', function() {
    const marketInput = document.getElementById('rightMarketPrice');
    const percentInput = document.getElementById('rightPercent');
    const sharePriceInput = document.getElementById('rightSharePrice');
    const calcBtn = document.querySelector('.right-calc-btn');
    const clearBtn = document.querySelector('.right-clear-btn');
    const resultMarket = document.getElementById('rightResultMarketPrice');
    const resultPercent = document.getElementById('rightResultPercent');
    const resultSharePrice = document.getElementById('rightResultSharePrice');
    const resultAdjusted = document.getElementById('rightResultAdjusted');

    function calculateRight() {
        const market = parseFloat(marketInput.value);
        const percent = parseFloat(percentInput.value);
        const sharePrice = parseFloat(sharePriceInput.value);
        if (isNaN(market) || isNaN(percent) || isNaN(sharePrice) || market <= 0 || percent < 0 || sharePrice < 0) {
            resultMarket.textContent = '-';
            resultPercent.textContent = '-';
            resultSharePrice.textContent = '-';
            resultAdjusted.textContent = '-';
            return;
        }
        const adjusted = (market + (percent / 100 * sharePrice)) / (1 + (percent / 100));
        resultMarket.textContent = market.toLocaleString(undefined, {maximumFractionDigits: 2});
        resultPercent.textContent = percent.toLocaleString(undefined, {maximumFractionDigits: 2});
        resultSharePrice.textContent = sharePrice.toLocaleString(undefined, {maximumFractionDigits: 2});
        resultAdjusted.textContent = adjusted.toLocaleString(undefined, {maximumFractionDigits: 2});
    }

    function clearRight() {
        marketInput.value = '';
        percentInput.value = '';
        sharePriceInput.value = '';
        resultMarket.textContent = '-';
        resultPercent.textContent = '-';
        resultSharePrice.textContent = '-';
        resultAdjusted.textContent = '-';
    }

    if (calcBtn) calcBtn.addEventListener('click', calculateRight);
    if (clearBtn) clearBtn.addEventListener('click', clearRight);
}); 