document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modal System Logic ---
    const actionButtons = document.querySelectorAll('.action-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('close-modal');
    const modalBodies = document.querySelectorAll('.modal-body');

    // Open Modal
    actionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            
            // Hide all modal bodies
            modalBodies.forEach(body => body.classList.remove('active'));
            
            // Show targeted body
            document.getElementById(targetId).classList.add('active');
            
            // Show overlay
            modalOverlay.classList.add('active');
        });
    });

    // Close Modal
    closeBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    // Close when clicking outside the modal content
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

});

// ==========================================
// TOOL 1: Screen Time Planner
// ==========================================
function calcScreenTime() {
    const dailyHours = parseFloat(document.getElementById('st-hours').value);
    const resultBox = document.getElementById('st-result');
    
    if (!dailyHours || dailyHours > 24 || dailyHours <= 0) {
        resultBox.style.display = 'block';
        resultBox.innerHTML = `<span style="color: #ff3333;">[ERROR] Invalid input. Please enter 1-24 hours.</span>`;
        return;
    }

    const weeklyHours = dailyHours * 7;
    const yearlyDays = (weeklyHours * 52) / 24;
    
    resultBox.style.display = 'block';
    resultBox.innerHTML = `
        <strong>Weekly Budget:</strong> ${weeklyHours} hours.<br>
        <strong>Yearly Impact:</strong> ${yearlyDays.toFixed(1)} full days spent on your phone.<br>
        <span style="color: var(--accent-green);">Status: Budget calculated successfully.</span>
    `;
}

// ==========================================
// TOOL 2: Photo Storage Estimator
// ==========================================
function calcStorage() {
    const photos = parseInt(document.getElementById('storage-photos').value) || 0;
    const videos = parseInt(document.getElementById('storage-videos').value) || 0;
    const resultBox = document.getElementById('storage-result');

    // Rough estimates: Photo = 3MB, Video = 60MB
    const totalMB = (photos * 3) + (videos * 60);
    const totalGB = totalMB / 1024;
    
    // Assuming cloud storage costs around $2.99 for 200GB (approx $0.015 per GB)
    const estimatedCost = totalGB * 0.015;

    resultBox.style.display = 'block';
    resultBox.innerHTML = `
        <strong>Total Storage Needed:</strong> ${totalGB.toFixed(2)} GB<br>
        <strong>Est. Monthly Cloud Cost:</strong> $${estimatedCost.toFixed(2)}<br>
        <span style="color: var(--text-muted); font-size: 0.8rem;">*Based on average file sizes and cloud pricing.</span>
    `;
}

// ==========================================
// TOOL 3: Phone Plan Comparator
// ==========================================
function calcPlan() {
    const data = parseFloat(document.getElementById('plan-data').value) || 0;
    const minutes = parseInt(document.getElementById('plan-minutes').value) || 0;
    const resultBox = document.getElementById('plan-result');

    let recommendation = "";
    
    if (data <= 5 && minutes <= 300) {
        recommendation = "Light User Plan. Look for prepaid plans around $15-$25/mo.";
    } else if (data <= 20 && minutes <= 1000) {
        recommendation = "Standard User Plan. Look for mid-tier plans around $35-$50/mo.";
    } else {
        recommendation = "Heavy/Unlimited User Plan. You need an unlimited data plan ($60-$80/mo).";
    }

    resultBox.style.display = 'block';
    resultBox.innerHTML = `
        <strong>Usage Profile:</strong> ${data}GB Data, ${minutes} Mins.<br>
        <strong>Recommendation:</strong> ${recommendation}<br>
        <span style="color: var(--accent-green);">Math executed successfully.</span>
    `;
}

// ==========================================
// TOOL 4: Wi-Fi Speed Explainer
// ==========================================
function calcWifi() {
    const speed = parseFloat(document.getElementById('wifi-speed').value) || 0;
    const resultBox = document.getElementById('wifi-result');

    let gaming = "Good for casual gaming.";
    let streaming = "Good for 1080p HD streaming.";

    if (speed < 25) {
        gaming = "Poor for gaming. High latency likely.";
        streaming = "Barely enough for 720p. May buffer.";
    } else if (speed > 100) {
        gaming = "Excellent for competitive gaming.";
        streaming = "Perfect for 4K Ultra HD streaming.";
    }

    resultBox.style.display = 'block';
    resultBox.innerHTML = `
        <strong>Your Speed:</strong> ${speed} Mbps<br>
        <strong>Gaming:</strong> ${gaming}<br>
        <strong>Streaming:</strong> ${streaming}
    `;
}

// ==========================================
// TOOL 5: Backup Checklist Generator
// ==========================================
function calcBackup() {
    const os = document.getElementById('backup-os').value;
    const resultBox = document.getElementById('backup-result');

    let checklist = "";

    if (os === 'android') {
        checklist = `
            <ul>
                <li>Run Google One / Google Drive backup.</li>
                <li>Verify Photos are synced to Google Photos.</li>
                <li>Export WhatsApp chats to Google Drive.</li>
                <li>Ensure 2FA (Authenticator) apps are transferred.</li>
                <li>Backup SMS using "SMS Backup & Restore" app.</li>
            </ul>
        `;
    } else {
        checklist = `
            <ul>
                <li>Perform iCloud Backup (Settings > Apple ID > iCloud).</li>
                <li>Verify iCloud Photos are fully synced.</li>
                <li>Ensure iMessages are enabled in iCloud settings.</li>
                <li>Check Apple Wallet for cards to transfer.</li>
                <li>Sign out of iCloud on the old device after backup.</li>
            </ul>
        `;
    }

    resultBox.style.display = 'block';
    resultBox.innerHTML = `<strong>${os.toUpperCase()} Backup Protocol:</strong>${checklist}`;
}

// ==========================================
// TOOL 6: Digital Legacy Card
// ==========================================
function calcLegacy() {
    const name = document.getElementById('legacy-name').value || "N/A";
    const number = document.getElementById('legacy-number').value || "N/A";
    const medical = document.getElementById('legacy-medical').value || "N/A";
    const resultBox = document.getElementById('legacy-result');

    resultBox.style.display = 'block';
    resultBox.innerHTML = `
        <strong>--- EMERGENCY INFO CARD ---</strong><br>
        Contact: ${name}<br>
        Phone: ${number}<br>
        Medical: ${medical}<br>
        <br>
        <button onclick="window.print()" style="background:transparent; border:1px solid var(--accent-green); color:var(--accent-green); padding:5px 10px; cursor:pointer; border-radius:4px;">🖨️ Print Info Sheet</button>
    `;
}