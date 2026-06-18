document.addEventListener(
    "DOMContentLoaded",
    () => {
        initializeData();
        checkLogin();
    }
);

async function loadPage(page) {
    const pageContainer = document.getElementById( "pageContainer" );

    const pageTitle = document.getElementById( "pageTitle" );

    removeActiveMenu();

    const menu = document.getElementById( `menu-${page}` );

    if (menu) { menu.classList.add( "active" ) }

    try {
        const response =
            await fetch( `Pages/${page}.html` );

        const html = await response.text();

        pageContainer.innerHTML = html;

        switch (page) {
            case "dashboard":
                pageTitle.textContent = "Dashboard";
                renderDashboard();
                break;

            case "karyawan":
                pageTitle.textContent = "Data Karyawan";
                renderKaryawan();
                break;

            case "kriteria":
                pageTitle.textContent = "Data Kriteria";
                renderKriteria();
                break;

            case "penilaian":
                pageTitle.textContent = "Data Penilaian";
                renderPenilaian();
                break;

            case "moora":
                pageTitle.textContent = "Proses MOORA";
                renderMoora();
                break;

            case "ranking":
                pageTitle.textContent = "Ranking Akhir";
                renderRanking();
                break;

            case "laporan":
                pageTitle.textContent = "Cetak Laporan";
                renderLaporan();
                break;

            default:
                pageTitle.textContent = "Dashboard";
                renderDashboard();
        }
    }

    catch (error) {
        pageContainer.innerHTML =
        `
        <div class="dashboard-card">
            <h3> Gagal memuat halaman </h3>
            <p> ${error.message} </p>
        </div>
        `;
    }
}

function removeActiveMenu() {
    document
        .querySelectorAll( ".sidebar-menu button" )
        .forEach( item => { item.classList.remove( "active" ); } );
}