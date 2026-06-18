function calculateMooraRanking() {
    const karyawan = getKaryawan();
    const kriteria = getKriteria();
    const penilaian = getPenilaian();
    const penyebut = {};
    kriteria.forEach(
        k => {
            let total = 0;
            penilaian.forEach(
                p => {
                    total +=
                        Math.pow(
                            Number( p[k.kode] ),2
                        );
                }
            );
            penyebut[ k.kode ] = Math.sqrt( total );
        }
    );
    const hasil = [];
    karyawan.forEach(
        kar => {
            const nilai =
                penilaian.find(
                    p =>
                    p.idKaryawan ===
                    kar.id
                );
            if ( !nilai ) {
                return;
            }

            let yi = 0;
            kriteria.forEach(
                k => {
                    const normalisasi =
                        Number( nilai[ k.kode ] ) / Number(  penyebut[ k.kode] );
                    yi += (  normalisasi *Number(k.bobot));
                }
            );
            hasil.push({
                id:
                    kar.id,
                nama:
                    kar.nama,
                jabatan:
                    kar.jabatan,
                nilaiMoora:
                    yi
            });
        }
    );

    hasil.forEach(
        item => {
            item.nilaiMoora =
                Number(
                    item.nilaiMoora
                    .toFixed(5)
                );
        }
    );

    hasil.sort(
        (
            a,
            b
        ) =>
        b.nilaiMoora - a.nilaiMoora
    );

    const threshold =
        getBenefitThreshold();
    hasil.forEach(
        item => {
            item.statusBenefit =
                item.nilaiMoora >=  threshold
                ? "Benefit"
                : "Belum Benefit";
        }
    );
    return hasil;
}

function renderBobotTable() {
    const tbody =
        document.getElementById("bobotTable" );
    const kriteria = getKriteria();
    tbody.innerHTML = "";
    kriteria.forEach(
        item => {
            const tr =
                document.createElement( "tr" );
            tr.innerHTML =
            `
            <td>${item.kode}</td>
            <td>${item.nama}</td>
            <td>${item.bobot}</td>
            <td>${item.atribut}</td>
            `;
            tbody.appendChild(tr );
        }
    );
}

function renderMatriksKeputusan() {
    const header = document.getElementById("mooraMatriksHeader");
    const body =document.getElementById("mooraMatriksBody");
    const kriteria =getKriteria();
    const penilaian =getPenilaian();
    header.innerHTML =
    `
    <tr>
        <th>ID</th>
        ${kriteria.map(item => `<th>${item.kode}</th>`).join("")}
    </tr>
    `;
    body.innerHTML = "";
    penilaian.forEach(
        item => {
            const tr =
                document.createElement("tr");
            tr.innerHTML =
            `
            <td>${item.idKaryawan}</td>
            ${kriteria.map(
                k =>
                `
                <td>${item[k.kode] ?? 0}</td>
                `
            ).join("")}
            `;
            body.appendChild(tr);
        }
    );
}

function renderNormalisasi() {
    const header =document.getElementById("normalisasiHeader");
    const body =document.getElementById("normalisasiBody");
    const kriteria =getKriteria();
    const penilaian =getPenilaian();
    const penyebut = {};
    kriteria.forEach(
        k => {
            let total = 0;
            penilaian.forEach(p => {total +=Math.pow(Number(p[k.kode] || 0),2);});
            penyebut[k.kode] = Math.sqrt(total);
        }
    );
    header.innerHTML =
    `
    <tr>
        <th>ID</th>
        ${kriteria.map(item =>`<th>${item.kode}</th>`).join("")}
    </tr>
    `;
    body.innerHTML = "";
    penilaian.forEach(
        item => {
            const tr =document.createElement("tr");
            tr.innerHTML =
            `
            <td>${item.idKaryawan}</td>
            ${kriteria.map(
                k =>
                `
                <td> ${(Number(item[k.kode] || 0) /Number(penyebut[k.kode])).toFixed(4)} </td>
                `
            ).join("")}
            `;
            body.appendChild(tr);
        }
    );
}

function renderOptimasi() {
    const header =document.getElementById("optimasiHeader");
    const body =document.getElementById("optimasiBody");
    const kriteria =getKriteria();
    const penilaian =getPenilaian();
    const penyebut = {};
    kriteria.forEach(
        k => {
            let total = 0;
            penilaian.forEach(p => {total +=Math.pow(Number(p[k.kode] || 0),2);});
            penyebut[k.kode] = Math.sqrt(total);
        }
    );
    header.innerHTML =
    `
    <tr>
        <th>ID</th>
        ${kriteria.map(item =>`<th>${item.kode}</th>`).join("")}
    </tr>
    `;
    body.innerHTML = "";
    penilaian.forEach(
        item => {
            const tr =document.createElement("tr");
            tr.innerHTML =
            `
            <td>${item.idKaryawan}</td>
            ${kriteria.map(
                k =>
                `
                <td> ${((Number(item[k.kode] || 0) /Number(penyebut[k.kode]))*Number(k.bobot)).toFixed(4)} </td>
                `
            ).join("")}
            `;
            body.appendChild(tr);
        }
    );
}

function renderYi() {
    const tbody =document.getElementById("yiTable");
    const ranking =calculateMooraRanking();
    tbody.innerHTML = "";
    ranking.forEach(
        item => {const tr =document.createElement("tr");
            tr.innerHTML =
            `
            <td>${item.id}</td>
            <td>${item.nama}</td>
            <td>${item.nilaiMoora.toFixed(5)}</td>
            `;
            tbody.appendChild(tr);
        }
    );
}

function renderMoora() {
    const totalBobot =
        validasiBobotMoora();
    if (totalBobot !== 1) {
        alert("Total bobot kriteria harus 1.00");
        return;}
    renderBobotTable();
    renderMatriksKeputusan();
    renderNormalisasi();
    renderOptimasi();
    renderYi();
}

function validasiBobotMoora() {
    const kriteria =getKriteria();
    const totalBobot =kriteria.reduce((total,item) =>total +Number(item.bobot),0);
    return Number(totalBobot.toFixed(2));
}