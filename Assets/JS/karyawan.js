let editKaryawanId = null;

function renderKaryawan() {
    const tbody =
        document.getElementById( "karyawanTable" );
    const data =
        getKaryawan();
    tbody.innerHTML = "";
    data.forEach(
        item => {
            const tr =
                document.createElement( "tr" );
            tr.innerHTML =
            `
            <td>${item.id}</td>
            <td>${item.nama}</td>
            <td>${item.jabatan}</td>
            <td>
                <button
                    class="btn-edit"
                    onclick="editKaryawan(${item.id})">
                    Edit
                </button>
                <button
                    class="btn-delete"
                    onclick="hapusKaryawan(${item.id})">
                    Hapus
                </button>
            </td>
            `;
            tbody.appendChild( tr );
        }
    );
}

function simpanKaryawan() {
    const id =
        Number(
            document
            .getElementById( "karyawanId" )
            .value
        );
    const nama =
        document
        .getElementById( "karyawanNama" )
        .value
        .trim();

    const jabatan =
        document
        .getElementById( "karyawanJabatan" )
        .value
        .trim();
    if (
        !id ||
        !nama ||
        !jabatan
    ) 
    { alert( "Lengkapi data terlebih dahulu");
        return;
    }
    const data =
        getKaryawan();

    if ( editKaryawanId === null ) 
        {
            const sudahAda =
                data.find(
                    item =>
                    item.id === id
                );
            if ( sudahAda ) 
                { alert( "ID Karyawan sudah digunakan" );
                return;
            }
            data.push({
                id,
                nama,
                jabatan
            });

            const penilaian = getPenilaian();
            penilaian.push({
                idKaryawan: id,
                C1: 1,
                C2: 1,
                C3: 1,
                C4: 1,
                C5: 1,
                C6: 1,
                C7: 1,
                C8: 1
            });
            savePenilaian(
                penilaian
            );
        }
    else 
        {
            const index =
                data.findIndex(
                    item =>
                    item.id ===
                    editKaryawanId
                );
            data[index] = {
                id,
                nama,
                jabatan
            };
        }
    saveKaryawan( data );
    resetFormKaryawan();
    renderKaryawan();
}

function editKaryawan(id) {
    const data =
        getKaryawan();
    const item =
        data.find(
            item =>
            item.id === id
        );
    if (!item) { return;}
    document.getElementById( "karyawanId" ).value =item.id;
    document.getElementById( "karyawanNama").value = item.nama;
    document.getElementById( "karyawanJabatan" ).value = item.jabatan;
    document.getElementById( "karyawanId").readOnly = true;
    editKaryawanId = id;
}

function hapusKaryawan(id) {
    const item =
        getKaryawan().find(
            k =>
            k.id === id
        );
    if (!item) { return; }
    const konfirmasi =
        confirm(`Yakin ingin menghapus karyawan:\n\n${item.nama}\n(ID: ${item.id}) ?` );
    if ( !konfirmasi ) 
        {return;}

    const dataKaryawan =
        getKaryawan().filter(
            item =>
            item.id !== id
        );
    saveKaryawan( dataKaryawan);

    const dataPenilaian =
        getPenilaian().filter(
            item =>
            item.idKaryawan !== id
        );
    savePenilaian( dataPenilaian );
    resetFormKaryawan();
    renderKaryawan();
    alert( "Data berhasil dihapus" );
}

function resetFormKaryawan() {
    document.getElementById("karyawanId").readOnly = false;
    document.getElementById("karyawanId").value = generateNextKaryawanId();
    document.getElementById( "karyawanNama").value = "";
    document.getElementById( "karyawanJabatan" ).value = "";
    editKaryawanId =
        null;
}

document.addEventListener(
    "DOMContentLoaded",
    () => {
        const inputId =
            document.getElementById( "karyawanId" );

        if ( inputId) 
            {
            inputId.value = generateNextKaryawanId();
            }
    }
);