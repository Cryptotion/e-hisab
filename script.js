function calculate() {
    // Get input values
    const clientAmounts = document.getElementById('clientAmounts').value.split(',').map(Number);
    const clientCommissions = document.getElementById('clientCommissions').value.split(',').map(Number);
    const totalCommission = parseFloat(document.getElementById('totalCommission').value);
    const ownerSharePercentage = parseFloat(document.getElementById('ownerShare').value);
    const clientLosses = document.getElementById('clientLosses').value.split(',').map(Number);
    const percentages = document.getElementById('percentages').value.split(',').map(Number);
    const expenses = parseFloat(document.getElementById('expenses').value);

    // Validate input lengths
    if (
        clientAmounts.length !== clientCommissions.length ||
        clientAmounts.length !== clientLosses.length ||
        clientAmounts.length !== percentages.length
    ) {
        alert('All comma-separated lists must have the same number of values.');
        return;
    }

    // Calculate total amount
    const totalAmount = clientAmounts.reduce((a, b) => a + b, 0);
    
    // Calculate total assigned commission
    const totalAssignedCommission = clientCommissions.reduce((a, b) => a + b, 0);
    
    // Calculate remaining commission
    const remainingCommission = totalCommission - totalAssignedCommission;

    // Calculate owner’s share
    const ownerShare = ((100-ownerSharePercentage) / 100) * (totalAmount - totalCommission);
    
    // Calculate adjusted total amount
    const adjustedTotalAmount = totalAmount - totalCommission - ownerShare;

    // Calculate adjusted amounts for each client
    const adjustedAmounts = clientLosses.map((loss, index) => loss - clientCommissions[index]);

    // Calculate total adjusted amount
    const totalAdjustedAmount = adjustedAmounts.reduce((a, b) => a + b, 0);

    // Calculate total percentages
    const totalPercentages = adjustedAmounts
        .map((amount, index) => amount * (percentages[index]/100))
        .reduce((a, b) => a + b, 0);

    // Calculate interim total
    const interimTotal = adjustedTotalAmount + remainingCommission - totalPercentages;

    // Calculate final total amount
    const finalTotalAmount = interimTotal - expenses;

    // Display results
    document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
    document.getElementById('totalAssignedCommission').textContent = totalAssignedCommission.toFixed(2);
    // document.getElementById('remainingCommission').textContent = remainingCommission.toFixed(2);
    document.getElementById('ownerShareAmount').textContent = ownerShare.toFixed(2);
    document.getElementById('adjustedTotalAmount').textContent = adjustedTotalAmount.toFixed(2);
    // document.getElementById('totalAdjustedAmount').textContent = totalAdjustedAmount.toFixed(2);
    document.getElementById('totalPercentages').textContent = totalPercentages.toFixed(2);
    // document.getElementById('interimTotal').textContent = interimTotal.toFixed(2);
    document.getElementById('finalTotalAmount').textContent = finalTotalAmount.toFixed(2);
}

function resetForm() {
    document.getElementById('calcForm').reset();

    document.getElementById('totalAmount').textContent = '';
    document.getElementById('totalAssignedCommission').textContent = '';
    document.getElementById('remainingCommission').textContent = '';
    document.getElementById('ownerShareAmount').textContent = '';
    document.getElementById('adjustedTotalAmount').textContent = '';
    document.getElementById('totalAdjustedAmount').textContent = '';
    document.getElementById('totalPercentages').textContent = '';
    document.getElementById('interimTotal').textContent = '';
    document.getElementById('finalTotalAmount').textContent = '';
}
