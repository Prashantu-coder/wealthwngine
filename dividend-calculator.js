function calculateDividend() {
    const qty = parseFloat(document.getElementById('dividendQty').value);
    const bonus = parseFloat(document.getElementById('dividendBonus').value);
    const cash = parseFloat(document.getElementById('dividendCash').value);
    const paidup = parseFloat(document.getElementById('dividendPaidup').value);
    const cashCell = document.getElementById('dividendResultCash');
    const bonusTaxCell = document.getElementById('dividendResultBonusTax');
    const cashTaxCell = document.getElementById('dividendResultCashTax');
    const totalTaxCell = document.getElementById('dividendResultTotalTax');
    const bonusQtyCell = document.getElementById('dividendResultBonusQty');
    if (isNaN(qty) || isNaN(bonus) || isNaN(cash) || isNaN(paidup) || qty <= 0 || bonus < 0 || cash < 0 || paidup <= 0) {
        cashCell.textContent = '-';
        bonusTaxCell.textContent = '-';
        cashTaxCell.textContent = '-';
        totalTaxCell.textContent = '-';
        bonusQtyCell.textContent = '-';
        return;
    }
    const cashAmount = (qty * paidup) * (cash / 100);
    const cashTax = cashAmount * 0.05;
    const bonusQty = qty * (bonus / 100);
    const bonusTax = bonusQty * paidup * 0.05;
    const totalTax = cashTax + bonusTax;
    cashCell.textContent = cashAmount.toLocaleString(undefined, {maximumFractionDigits: 2});
    bonusTaxCell.textContent = bonusTax.toLocaleString(undefined, {maximumFractionDigits: 2});
    cashTaxCell.textContent = cashTax.toLocaleString(undefined, {maximumFractionDigits: 2});
    totalTaxCell.textContent = totalTax.toLocaleString(undefined, {maximumFractionDigits: 2});
    bonusQtyCell.textContent = bonusQty.toLocaleString(undefined, {maximumFractionDigits: 2});
}
function clearDividendCalculator() {
    document.getElementById('dividendQty').value = '';
    document.getElementById('dividendBonus').value = '';
    document.getElementById('dividendCash').value = '';
    document.getElementById('dividendPaidup').selectedIndex = 0;
    document.getElementById('dividendResultCash').textContent = '-';
    document.getElementById('dividendResultBonusTax').textContent = '-';
    document.getElementById('dividendResultCashTax').textContent = '-';
    document.getElementById('dividendResultTotalTax').textContent = '-';
    document.getElementById('dividendResultBonusQty').textContent = '-';
} 