// SIP Calculator JS logic will go here.

function calculateSIP() {
    const periodSelect = document.getElementById('sipPeriod');
    const amountInput = document.getElementById('sipAmount');
    const returnInput = document.getElementById('sipReturn');
    const yearsInput = document.getElementById('sipYears');
    const totalExpectedCell = document.getElementById('sipTotalExpected');
    const totalInvestedCell = document.getElementById('sipTotalInvested');
    const totalGainCell = document.getElementById('sipTotalGain');
    const totalGainPercentCell = document.getElementById('sipTotalGainPercent');
    const periodsPerYear = (periodSelect.value === 'monthly') ? 12 :
        (periodSelect.value === 'quarterly') ? 4 :
        (periodSelect.value === 'semiannually') ? 2 :
        (periodSelect.value === 'annually') ? 1 : 0;
    const amount = parseFloat(amountInput.value);
    const rate = parseFloat(returnInput.value);
    const years = parseFloat(yearsInput.value);
    if (!periodSelect.value || isNaN(amount) || isNaN(rate) || isNaN(years) || amount <= 0 || rate < 0 || years <= 0) {
        totalExpectedCell.textContent = '';
        totalInvestedCell.textContent = '';
        totalGainCell.textContent = '';
        totalGainPercentCell.textContent = '';
        return;
    }
    const n = periodsPerYear * years;
    const r = rate / 100 / periodsPerYear;
    let fv = 0;
    if (r > 0) {
        fv = amount * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    } else {
        fv = amount * n;
    }
    const totalInvested = amount * periodsPerYear * years;
    const totalGain = fv - totalInvested;
    const totalGainPercent = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;
    totalExpectedCell.textContent = fv.toLocaleString(undefined, {maximumFractionDigits: 2});
    totalInvestedCell.textContent = totalInvested.toLocaleString(undefined, {maximumFractionDigits: 2});
    totalGainCell.textContent = totalGain.toLocaleString(undefined, {maximumFractionDigits: 2});
    totalGainPercentCell.textContent = totalGainPercent.toLocaleString(undefined, {maximumFractionDigits: 2}) + '%';
}
function clearSIPCalculator() {
    document.getElementById('sipPeriod').selectedIndex = 0;
    document.getElementById('sipAmount').value = '';
    document.getElementById('sipReturn').value = '';
    document.getElementById('sipYears').value = '';
    document.getElementById('sipPeriodSelected').textContent = '';
    document.getElementById('sipTotalExpected').textContent = '';
    document.getElementById('sipTotalInvested').textContent = '';
    document.getElementById('sipTotalGain').textContent = '';
    document.getElementById('sipTotalGainPercent').textContent = '';
}
window.addEventListener('DOMContentLoaded', function() {
    const periodSelect = document.getElementById('sipPeriod');
    const periodLabel = document.getElementById('sipPeriodSelected');
    const amountInput = document.getElementById('sipAmount');
    const returnInput = document.getElementById('sipReturn');
    const yearsInput = document.getElementById('sipYears');
    const totalExpectedCell = document.getElementById('sipTotalExpected');
    const totalInvestedCell = document.getElementById('sipTotalInvested');
    const totalGainCell = document.getElementById('sipTotalGain');
    const totalGainPercentCell = document.getElementById('sipTotalGainPercent');

    function updateLabel() {
        const selected = periodSelect.options[periodSelect.selectedIndex];
        periodLabel.textContent = selected && selected.value ? selected.text : '';
    }
    if (periodSelect && periodLabel) {
        periodSelect.addEventListener('change', updateLabel);
        updateLabel();
    }

    function getPeriodsPerYear(period) {
        switch (period) {
            case 'monthly': return 12;
            case 'quarterly': return 4;
            case 'semiannually': return 2;
            case 'annually': return 1;
            default: return 0;
        }
    }

    [periodSelect, amountInput, returnInput, yearsInput].forEach(el => {
        if (el) el.addEventListener('input', calculateSIP);
    });
    if (periodSelect) periodSelect.addEventListener('change', calculateSIP);
}); 