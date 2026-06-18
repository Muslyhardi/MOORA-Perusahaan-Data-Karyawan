function renderDashboard() {
    const karyawan = getKaryawan();
    const kriteria = getKriteria();
    const ranking = calculateMooraRanking();
    const threshold = getBenefitThreshold();

    document.getElementById( "totalKaryawan" ).textContent = karyawan.length;

    document.getElementById( "totalKriteria" ).textContent = kriteria.length;
    
    document.getElementById( "infoJumlahKriteria" ).textContent = kriteria.length;

    document.getElementById( "dashboardThreshold" ).textContent = threshold;

    document.getElementById( "nilaiTertinggi" ).textContent =
        ranking.length > 0
        ? ranking[0]
            .nilaiMoora
            .toFixed(5)
        : "0.00000";

    const totalBenefit =
        ranking.filter(
            item =>
                item.nilaiMoora >= threshold
        ).length;
    document.getElementById( "totalBenefit" ).textContent = totalBenefit;
    renderDashboardRanking( ranking );
}

function renderDashboardRanking( ranking) 
{
    const tbody =
        document.getElementById( "dashboardRanking" );
    if (!tbody) { return; }
    tbody.innerHTML = "";
    ranking.forEach(
        (
            item,
            index
        ) => {
            const tr =
                document.createElement("tr" );
            tr.innerHTML =
            `
            <td> ${index + 1} </td>
            <td> ${item.id} </td>
            <td> ${item.nama} </td>
            <td> ${item.nilaiMoora.toFixed(5)} </td>
            <td>
                <span class="${
                    item.statusBenefit === 'Benefit'
                    ? 'status-benefit'
                    : 'status-non-benefit'
                }">
                    ${item.statusBenefit}
                </span>
            </td>
            `;
            tbody.appendChild( tr );
        }
    );
}