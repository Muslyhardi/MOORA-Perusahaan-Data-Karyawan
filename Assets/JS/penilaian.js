let editPenilaianId = null;

function renderPenilaian() {
    const header =document.getElementById("penilaianHeader");
    const body =document.getElementById("penilaianBody");
    const form =document.getElementById("penilaianForm");
    const kriteria =getKriteria();
    const karyawan =getKaryawan();
    const penilaian =getPenilaian();
    header.innerHTML =
    `
    <tr>
        <th>ID</th>
        <th>Nama</th>
        ${kriteria.map(
            item =>
            `<th>${item.kode}</th>`
        ).join("")}
        <th>Aksi</th>
    </tr>
    `;
    form.innerHTML = "";
    kriteria.forEach(
        item => {
            const minNilai = 1;
            const maxNilai =
                item.skala === "masaKerja"
                ? 7
                : 4;
            form.innerHTML +=
            `
            <div class="form-group">
                <label>${item.kode} - ${item.nama}</label>
                <input
                    type="number"
                    min="${minNilai}"
                    max="${maxNilai}"
                    id="nilai_${item.kode}">
            </div>
            `;
        }
    );
    body.innerHTML = "";
    karyawan.forEach(
        kar => {const nilai =penilaian.find(
                    p =>
                    p.idKaryawan ===
                    kar.id
                );
            const tr =
                document.createElement("tr");
            tr.innerHTML =
            `
            <td>${kar.id}</td>
            <td>${kar.nama}</td>
            ${kriteria.map(
                item =>
                `
                <td>
                    ${nilai
                        ? (nilai[item.kode] ?? 0):0
                    }
                </td>
                `
            ).join("")}
            <td>
                <button
                    class="btn-edit"
                    onclick="editPenilaian(${kar.id})">
                    Edit
                </button>
            </td>
            `;
            body.appendChild(tr);
        }
    );
}

function editPenilaian(id) {
    const kriteria =getKriteria();
    const penilaian =getPenilaian();
    const nilai =
        penilaian.find(
            item =>
            item.idKaryawan ===
            id
        );

    if (!nilai) {
        return;
    }
    editPenilaianId =
        id;
    kriteria.forEach(
        item => {
            const input =document.getElementById(`nilai_${item.kode}`);
            if (input) {
                input.value =
                    nilai[item.kode] ?? "";
            }
        }
    );
}

function simpanPenilaian() 
{
    if ( editPenilaianId === null) 
    { alert( "Pilih karyawan terlebih dahulu" );
        return;
    }
    const kriteria = getKriteria();
    const data = getPenilaian();
    const nilaiBaru = 
    {
        idKaryawan:
        editPenilaianId
    };
    for (
        const item
        of
        kriteria
    ) 
    {
        const input =
            document.getElementById( `nilai_${item.kode}`);
        const nilai =
            parseInt( input.value );
        if ( isNaN(nilai)) 
        {
            alert( `Nilai ${item.kode} wajib diisi` );
            return;
        }

        if ( item.skala === "masaKerja") 
        {
            if (
                nilai < 1 ||
                nilai > 7
            ) 
            {
                alert( `${item.kode} harus bernilai 1 - 7` );
                return;
            }
        }
        else 
        {
            if (nilai < 1 ||nilai > 4) 
            {
                alert( `${item.kode} harus bernilai 1 - 4` );
                return;
            }
        }
        nilaiBaru[ item.kode ] = nilai;
    }
    const index =
        data.findIndex(
            item =>
            item.idKaryawan ===
            editPenilaianId
        );

    if (index >= 0) 
    {
        data[index] =
            nilaiBaru;
    }
    else   
    {
        data.push( nilaiBaru );
    }
    savePenilaian( data );
    renderPenilaian();
    editPenilaianId = null;
}