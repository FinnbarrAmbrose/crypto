const purchaseForm = document.getElementById('purchaseForm');
const purchaseList = document.getElementById('purchaseList');
const totalGBP = document.getElementById('totalGBP');
const purchaseChartCtx = document.getElementById('purchaseChart').getContext('2d');
const refreshButton = document.getElementById('refreshButton');

// Pre-loaded purchases
let purchases = [
    { amount: 100.00, date: '2024-10-01' },
    { amount: 200.00, date: '2024-10-02' }
];

let purchaseChart;

// Initialize the chart
function initializeChart() {
    purchaseChart = new Chart(purchaseChartCtx, {
        type: 'line',
        data: {
            labels: [], // Dates
            datasets: [{
                label: 'Amount (GBP)',
                data: [], // Amounts
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'MMM D, YYYY'
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount (GBP)'
                    }
                }
            }
        }
    });
}

// Update the chart data
function updateChart() {
    purchaseChart.data.labels = purchases.map(purchase => new Date(purchase.date));
    purchaseChart.data.datasets[0].data = purchases.map(purchase => purchase.amount);
    purchaseChart.update();
}

purchaseForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get the values from the form
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;

    // Check if both amount and date are valid
    if (isNaN(amount) || date === "") {
        alert("Please enter a valid amount and date.");
        return;
    }

    // Add the purchase to the purchases array
    purchases.push({ amount, date });

    // Update the purchase list and total amount
    updatePurchaseList();
    updateTotal();

    // Clear the form fields
    purchaseForm.reset();
});

function updatePurchaseList() {
    // Clear the current list
    purchaseList.innerHTML = '';

    // Render each purchase in the list
    purchases.forEach((purchase) => {
        const listItem = document.createElement('li');
        listItem.textContent = `£${purchase.amount.toFixed(2)} on ${purchase.date}`;
        purchaseList.appendChild(listItem);
    });
}

function updateTotal() {
    // Calculate the total amount in GBP
    const total = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);
    totalGBP.textContent = `Total: £${total.toFixed(2)}`;
}

// Initialize the chart when the page loads and populate the pre-loaded data
document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
    updatePurchaseList();
    updateTotal();
    updateChart();
});

// Add an event listener to the refresh button to update the chart
refreshButton.addEventListener('click', updateChart);
