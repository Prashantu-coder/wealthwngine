function calculateBuyDetails() {
    const quantity = parseFloat(document.getElementById('buyQuantity').value);
    const buyPrice = parseFloat(document.getElementById('buyPriceInput').value);
    const totalAmountCell = document.getElementById('totalAmountCell');
    const brokerCommissionCell = document.getElementById('brokerCommissionCell');
    const sebonFeeCell = document.getElementById('sebonFeeCell');
    const dpChargeCell = document.getElementById('dpChargeCell');
    const commissionCell = document.getElementById('commissionCell');
    const totalPayableCell = document.getElementById('totalPayableCell');
    const waccCell = document.getElementById('waccCell');
    const sellWaccInput = document.getElementById('sellWacc');

    if (isNaN(quantity) || isNaN(buyPrice) || quantity <= 0 || buyPrice <= 0) {
        totalAmountCell.textContent = '-';
        brokerCommissionCell.textContent = '-';
        sebonFeeCell.textContent = '-';
        dpChargeCell.textContent = '-';
        commissionCell.textContent = '-';
        totalPayableCell.textContent = '-';
        waccCell.textContent = '-';
        if (sellWaccInput) sellWaccInput.value = '';
        return;
    }

    const initialInvestment = quantity * buyPrice;
    let brokerCommission = 0;
    if (initialInvestment < 2500) {
        brokerCommission = 10;
    } else if (initialInvestment < 50001) {
        brokerCommission = initialInvestment * 0.0036;
    } else if (initialInvestment < 500001) {
        brokerCommission = initialInvestment * 0.0033;
    } else if (initialInvestment < 2000001) {
        brokerCommission = initialInvestment * 0.0031;
    } else if (initialInvestment < 10000001) {
        brokerCommission = initialInvestment * 0.0027;
    } else {
        brokerCommission = initialInvestment * 0.0024;
    }
    const sebonFee = initialInvestment * 0.00015;
    const dpCharge = quantity > 0 ? 25 : 0;
    const totalCommission = brokerCommission + sebonFee + dpCharge;
    const amountPayable = initialInvestment + totalCommission;
    const wacc = amountPayable / quantity;

    totalAmountCell.textContent = initialInvestment.toLocaleString(undefined, {maximumFractionDigits: 2});
    brokerCommissionCell.textContent = brokerCommission.toLocaleString(undefined, {maximumFractionDigits: 2});
    sebonFeeCell.textContent = sebonFee.toLocaleString(undefined, {maximumFractionDigits: 2});
    dpChargeCell.textContent = dpCharge.toLocaleString(undefined, {maximumFractionDigits: 2});
    commissionCell.textContent = totalCommission.toLocaleString(undefined, {maximumFractionDigits: 2});
    totalPayableCell.textContent = amountPayable.toLocaleString(undefined, {maximumFractionDigits: 2});
    waccCell.textContent = wacc.toLocaleString(undefined, {maximumFractionDigits: 2});
    if (sellWaccInput) sellWaccInput.value = wacc.toFixed(2);
}

function updateSellWaccFromBuy() {
    const waccCell = document.getElementById('waccCell');
    const sellWaccInput = document.getElementById('sellWacc');
    const sellWaccLabel = document.getElementById('sellWaccLabel');
    const sellWaccNote = document.getElementById('sellWaccNote');
    if (waccCell && sellWaccInput && sellWaccLabel && sellWaccNote) {
        // Only set readOnly if Buy WACC is available and valid
        if (waccCell.textContent && waccCell.textContent !== '-' && !isNaN(parseFloat(waccCell.textContent))) {
            sellWaccInput.value = waccCell.textContent;
            sellWaccInput.readOnly = true;
            sellWaccInput.classList.remove('manual-wacc');
            sellWaccLabel.textContent = 'Buy WACC (auto-filled)';
            sellWaccNote.textContent = 'This value is auto-filled from Buy Calculator.';
        } else {
            // Only set readOnly to false if not already set
            if (sellWaccInput.readOnly) sellWaccInput.readOnly = false;
            sellWaccInput.classList.add('manual-wacc');
            sellWaccLabel.textContent = 'Buy WACC';
            sellWaccNote.textContent = 'Enter Buy WACC if not auto-filled.';
        }
    }
}

function updateHoldingInfo() {
    const holdingType = document.getElementById('holdingType');
    if (!holdingType) return;
    const infoDiv = document.getElementById('holdingInfo');
    if (holdingType.value === 'short_term') {
        infoDiv.textContent = 'Short Term: Capital gain tax is 7.5% of profit.';
    } else {
        infoDiv.textContent = 'Long Term: Capital gain tax is 5% of profit.';
    }
}

function calculateSellDetails() {
    updateSellWaccFromBuy();
    updateHoldingInfo();
    const quantity = parseFloat(document.getElementById('sellQuantity').value);
    const sellWaccInput = document.getElementById('sellWacc');
    let wacc = parseFloat(sellWaccInput.value);
    const sellPrice = parseFloat(document.getElementById('sellPriceInput').value);
    const holdingType = document.getElementById('holdingType').value;

    // If manual WACC, validate
    if (!sellWaccInput.readOnly) {
        if (isNaN(wacc) || wacc <= 0) {
            sellWaccInput.classList.add('input-error');
            return;
        } else {
            sellWaccInput.classList.remove('input-error');
        }
    }

    // Result fields
    const initialSellingCell = document.getElementById('initialSellingCell');
    const investmentCell = document.getElementById('investmentCell');
    const sellBrokerCommissionCell = document.getElementById('sellBrokerCommissionCell');
    const sellSebonFeeCell = document.getElementById('sellSebonFeeCell');
    const sellDpChargeCell = document.getElementById('sellDpChargeCell');
    const sellCommissionCell = document.getElementById('sellCommissionCell');
    const profitBeforeTaxCell = document.getElementById('profitBeforeTaxCell');
    const capitalGainTaxCell = document.getElementById('capitalGainTaxCell');
    const netProfitLossCell = document.getElementById('netProfitLossCell');
    const netProfitLossPercentCell = document.getElementById('netProfitLossPercentCell');
    const amountReceivableCell = document.getElementById('amountReceivableCell');
    const sellWaccCell = document.getElementById('sellWaccCell');

    if (isNaN(quantity) || isNaN(wacc) || isNaN(sellPrice) || quantity <= 0 || wacc <= 0 || sellPrice <= 0) {
        initialSellingCell.textContent = '-';
        investmentCell.textContent = '-';
        sellBrokerCommissionCell.textContent = '-';
        sellSebonFeeCell.textContent = '-';
        sellDpChargeCell.textContent = '-';
        sellCommissionCell.textContent = '-';
        profitBeforeTaxCell.textContent = '-';
        capitalGainTaxCell.textContent = '-';
        netProfitLossCell.textContent = '-';
        netProfitLossPercentCell.textContent = '-';
        amountReceivableCell.textContent = '-';
        sellWaccCell.textContent = '-';
        return;
    }

    const initialSellingAmount = quantity * sellPrice;
    const investment = quantity * wacc;
    let brokerCommission = 0;
    if (quantity > 0) {
    if (initialSellingAmount < 2500) {
            brokerCommission = 10;
    } else if (initialSellingAmount < 50001) {
            brokerCommission = initialSellingAmount * 0.0036;
    } else if (initialSellingAmount < 500001) {
            brokerCommission = initialSellingAmount * 0.0033;
    } else if (initialSellingAmount < 2000001) {
            brokerCommission = initialSellingAmount * 0.0031;
    } else if (initialSellingAmount < 10000001) {
            brokerCommission = initialSellingAmount * 0.0027;
        } else {
            brokerCommission = initialSellingAmount * 0.0024;
        }
    } else {
        brokerCommission = 0;
    }
    const sebonFee = quantity > 0 ? initialSellingAmount * 0.00015 : 0;
    const dpCharge = quantity > 0 ? 25 : 0;
    const totalCommission = brokerCommission + sebonFee + dpCharge;
    const profitBeforeTax = initialSellingAmount - investment - totalCommission;
    let capitalGainTax = 0;
    if (profitBeforeTax > 0) {
        if (holdingType === 'short_term') {
            capitalGainTax = profitBeforeTax * 0.075;
        } else {
            capitalGainTax = profitBeforeTax * 0.05;
        }
    }
    const netProfitLoss = profitBeforeTax - capitalGainTax;
    const netProfitLossPercent = investment > 0 ? (netProfitLoss / investment) * 100 : 0;
    const amountReceivable = initialSellingAmount - totalCommission;
    const sellWacc = amountReceivable / quantity;

    initialSellingCell.textContent = initialSellingAmount.toLocaleString(undefined, {maximumFractionDigits: 2});
    investmentCell.textContent = investment.toLocaleString(undefined, {maximumFractionDigits: 2});
    sellBrokerCommissionCell.textContent = brokerCommission.toLocaleString(undefined, {maximumFractionDigits: 2});
    sellSebonFeeCell.textContent = sebonFee.toLocaleString(undefined, {maximumFractionDigits: 2});
    sellDpChargeCell.textContent = dpCharge.toLocaleString(undefined, {maximumFractionDigits: 2});
    sellCommissionCell.textContent = totalCommission.toLocaleString(undefined, {maximumFractionDigits: 2});
    profitBeforeTaxCell.textContent = profitBeforeTax.toLocaleString(undefined, {maximumFractionDigits: 2});
    capitalGainTaxCell.textContent = capitalGainTax.toLocaleString(undefined, {maximumFractionDigits: 2});
    netProfitLossCell.textContent = netProfitLoss.toLocaleString(undefined, {maximumFractionDigits: 2});
    netProfitLossPercentCell.textContent = netProfitLossPercent.toLocaleString(undefined, {maximumFractionDigits: 2}) + '%';
    amountReceivableCell.textContent = amountReceivable.toLocaleString(undefined, {maximumFractionDigits: 2});
    sellWaccCell.textContent = sellWacc.toLocaleString(undefined, {maximumFractionDigits: 2});
}

function setupSellCalculatorEvents() {
    const holdingType = document.getElementById('holdingType');
    const sellCalcBtn = document.querySelector('#sell-calculator-section .buy-calc-btn');
    const sellWaccInput = document.getElementById('sellWacc');
    if (holdingType) {
        holdingType.removeEventListener('change', updateHoldingInfo);
        holdingType.addEventListener('change', updateHoldingInfo);
    }
    if (sellCalcBtn) {
        sellCalcBtn.removeEventListener('click', calculateSellDetails);
        sellCalcBtn.addEventListener('click', calculateSellDetails);
    }
    if (sellWaccInput && !sellWaccInput.readOnly) {
        sellWaccInput.removeEventListener('input', calculateSellDetails);
        sellWaccInput.addEventListener('input', calculateSellDetails);
    }
    updateHoldingInfo();
}

function clearBuyCalculator() {
    document.getElementById('buyQuantity').value = '';
    document.getElementById('buyPriceInput').value = '';
    document.getElementById('totalAmountCell').textContent = '-';
    document.getElementById('brokerCommissionCell').textContent = '-';
    document.getElementById('sebonFeeCell').textContent = '-';
    document.getElementById('dpChargeCell').textContent = '-';
    document.getElementById('commissionCell').textContent = '-';
    document.getElementById('totalPayableCell').textContent = '-';
    document.getElementById('waccCell').textContent = '-';
}
function clearSellCalculator() {
    document.getElementById('sellQuantity').value = '';
    document.getElementById('sellWacc').value = '';
    document.getElementById('sellPriceInput').value = '';
    document.getElementById('holdingType').selectedIndex = 0;
    document.getElementById('holdingInfo').textContent = '';
    document.getElementById('initialSellingCell').textContent = '-';
    document.getElementById('investmentCell').textContent = '-';
    document.getElementById('sellBrokerCommissionCell').textContent = '-';
    document.getElementById('sellSebonFeeCell').textContent = '-';
    document.getElementById('sellDpChargeCell').textContent = '-';
    document.getElementById('sellCommissionCell').textContent = '-';
    document.getElementById('profitBeforeTaxCell').textContent = '-';
    document.getElementById('capitalGainTaxCell').textContent = '-';
    document.getElementById('netProfitLossCell').textContent = '-';
    document.getElementById('netProfitLossPercentCell').textContent = '-';
    document.getElementById('amountReceivableCell').textContent = '-';
    document.getElementById('sellWaccCell').textContent = '-';
}

window.addEventListener('DOMContentLoaded', function() {
    // Setup Buy/Sell toggle logic
    const calcToggle = document.getElementById('calculatorToggle');
    const buySection = document.getElementById('buy-calculator-section');
    const sellSection = document.getElementById('sell-calculator-section');
    if (calcToggle && buySection && sellSection) {
        calcToggle.addEventListener('change', function() {
            if (calcToggle.value === 'buy') {
                buySection.style.display = 'block';
                sellSection.style.display = 'none';
            } else {
                buySection.style.display = 'none';
                sellSection.style.display = 'block';
                updateSellWaccFromBuy();
                setupSellCalculatorEvents();
            }
        });
    }
    // Setup events for Sell Calculator on load if Sell is default
    if (calcToggle && calcToggle.value === 'sell') {
        updateSellWaccFromBuy();
        setupSellCalculatorEvents();
    }
}); 