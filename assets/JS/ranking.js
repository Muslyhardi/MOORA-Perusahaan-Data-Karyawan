function renderRanking() {
    const tbody =document.getElementById("rankingTable");
    const thresholdInput =document.getElementById("benefitThreshold");
    const ranking =calculateMooraRanking();
    const threshold =getBenefitThreshold();
    thresholdInput.value =threshold;
    tbody.innerHTML = "";
    ranking.forEach(
        (
            item,
            index
        ) => {
            const tr =
                document.createElement("tr");
            let rankBadge =
                index + 1;
            if (index === 0) {
                rankBadge =
                    "🥇";}
            else if (index === 1) {
                rankBadge =
                    "🥈";}
            else if (index === 2) {
                rankBadge =
                    "🥉"; }
            tr.innerHTML =

            `
            <td>${rankBadge}</td>
            <td>${item.id}</td>
            <td>${item.nama}</td>
            <td>${item.jabatan}</td>
            <td>${item.nilaiMoora.toFixed(5)}</td>
            <td>
                ${
                    item.statusBenefit === "Benefit"
                    ? "<span style='color:green;font-weight:bold'>Benefit</span>"
                    : "<span style='color:red;font-weight:bold'>Belum Benefit</span>"
                }
            </td>
            `;
            tbody.appendChild(tr);
        }
    );
}

function simpanThresholdBenefit() {
    const nilai =
        parseFloat(
            document
            .getElementById("benefitThreshold")
            .value
        );

    if (isNaN(nilai)) {
        alert("Threshold tidak valid");
        return;
    }
    saveBenefitThreshold(nilai);
    renderRanking();
    renderDashboard();
    alert("Threshold berhasil diperbarui");
}

function exportRankingCSV() {
    const ranking =calculateMooraRanking();
    let csv =
        "Rank,ID Karyawan,Nama,Jabatan,Nilai MOORA,Status Benefit\n";
    ranking.forEach(
        (
            item,
            index
        ) => { csv += `${index + 1},${item.id},${item.nama},${item.jabatan},${item.nilaiMoora.toFixed(5)},${item.statusBenefit}\n`; }
    );
    const blob =
        new Blob([csv],
            {
                type:
                "text/csv;charset=utf-8;"
            }
        );
    const link =
        document.createElement("a");
    link.href =URL.createObjectURL(blob);
    link.download ="Ranking_MOORA.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}