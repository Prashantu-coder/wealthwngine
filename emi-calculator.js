// EMI Calculator logic
function calculateEMI() {
    const principal = parseFloat(document.getElementById('emiLoanAmount').value);
    let rate = parseFloat(document.getElementById('emiInterestRate').value);
    let tenure = parseFloat(document.getElementById('emiTenure').value);
    const tenureType = document.getElementById('emiTenureType').value;
    const emiResult = document.getElementById('emiResult');
    const emiTotalPayment = document.getElementById('emiTotalPayment');
    const emiTotalInterest = document.getElementById('emiTotalInterest');
    if (isNaN(principal) || isNaN(rate) || isNaN(tenure) || principal <= 0 || rate <= 0 || tenure <= 0) {
        emiResult.textContent = '';
        emiTotalPayment.textContent = '';
        emiTotalInterest.textContent = '';
        return;
    }
    if (tenureType === 'years') {
        tenure = tenure * 12;
    }
    const monthlyRate = rate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - principal;
    emiResult.textContent = emi.toLocaleString(undefined, {maximumFractionDigits: 2});
    emiTotalPayment.textContent = totalPayment.toLocaleString(undefined, {maximumFractionDigits: 2});
    emiTotalInterest.textContent = totalInterest.toLocaleString(undefined, {maximumFractionDigits: 2});
}
function clearEMICalculator() {
    document.getElementById('emiLoanAmount').value = '';
    document.getElementById('emiInterestRate').value = '';
    document.getElementById('emiTenure').value = '';
    document.getElementById('emiTenureType').selectedIndex = 0;
    document.getElementById('emiResult').textContent = '';
    document.getElementById('emiTotalPayment').textContent = '';
    document.getElementById('emiTotalInterest').textContent = '';
}
window.addEventListener('DOMContentLoaded', function() {
    const emiSection = document.getElementById('emi-calculator-section');
    const loanInput = document.getElementById('emiLoanAmount');
    const rateInput = document.getElementById('emiInterestRate');
    const tenureInput = document.getElementById('emiTenure');
    const tenureType = document.getElementById('emiTenureType');
    const calcBtn = document.querySelector('.emi-calc-btn');
    const emiResult = document.getElementById('emiResult');
    const emiTotalPayment = document.getElementById('emiTotalPayment');
    const emiTotalInterest = document.getElementById('emiTotalInterest');

    if (!emiSection) return;

    if (calcBtn) {
        calcBtn.addEventListener('click', calculateEMI);
    }

    // Find the EMI Calculate button and its parent
    const emiCalcBtn = document.querySelector('.emi-calc-btn');
    if (emiCalcBtn && emiCalcBtn.parentNode) {
        // Create a container for both buttons if not already present
        let btnContainer = emiCalcBtn.parentNode;
        if (!btnContainer.classList.contains('emi-btn-container')) {
            btnContainer = document.createElement('div');
            btnContainer.className = 'emi-btn-container';
            emiCalcBtn.parentNode.insertBefore(btnContainer, emiCalcBtn);
            btnContainer.appendChild(emiCalcBtn);
        }
        // Create and append the Clear button
        const clearBtn = document.createElement('button');
        clearBtn.textContent = 'Clear';
        clearBtn.className = 'emi-calc-btn';
        clearBtn.style.marginLeft = '1rem';
        btnContainer.appendChild(clearBtn);
        clearBtn.addEventListener('click', clearEMICalculator);
    }
}); 