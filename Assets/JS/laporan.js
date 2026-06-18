function renderLaporan() {
    const ranking =
        calculateMooraRanking();
    const threshold =
        getBenefitThreshold();
    document.getElementById( "laporanTotalKaryawan" ).textContent = getKaryawan().length;
    document.getElementById( "laporanTotalKriteria").textContent = getKriteria().length;
    document.getElementById( "laporanTotalBenefit").textContent =
        ranking.filter(
            item =>
                item.nilaiMoora >=
                threshold
        ).length;
    const tbody =
        document.getElementById( "laporanRankingTable");
    tbody.innerHTML = "";
    ranking.forEach(
        (
            item,
            index
        ) => {
            const tr =
                document.createElement( "tr" );
            tr.innerHTML =
            `
            <td> ${index + 1} </td>
            <td> ${item.id}</td>
            <td> ${item.nama} </td>
            <td> ${item.nilaiMoora.toFixed(5)}</td>
            <td class="${
                item.statusBenefit ===
                'Benefit'
                ? 'laporan-benefit'
                : 'laporan-belum-benefit'
            }">
                ${item.statusBenefit}
            </td>
            `;
            tbody.appendChild( tr );
        }
    );
}

function downloadPDF() {
    window.print();
}