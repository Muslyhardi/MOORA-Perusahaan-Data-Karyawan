let editKriteriaKode = null;

function renderKriteria() {
    const tbody = document.getElementById( "kriteriaTable" );
    const data = getKriteria();
    tbody.innerHTML = "";
    data.forEach(
        item => {
            const tr =
                document.createElement( "tr" );
            tr.innerHTML =
            `
            <td> ${item.kode}</td>
            <td> ${item.nama}</td>
            <td>
                ${Number(
                    item.bobot
                ).toFixed(2)}
            </td>

            <td>${item.atribut}/td>
            <td>
                <div
                    class="btn-group">
                    <button
                        class="btn-edit"
                        onclick="editKriteria('${item.kode}')">
                        Edit
                    </button>
                    <button
                        class="btn-delete"
                        onclick="hapusKriteria('${item.kode}')">
                        Hapus
                    </button>
                </div>
            </td>
            `;
            tbody.appendChild( tr );
        }
    );
}

function bukaFormKriteria() {
    editKriteriaKode =
        null;
    document.getElementById( "judulKriteria").textContent = "Tambah Kriteria";
    document.getElementById( "kriteriaKode" ).value = "";
    document.getElementById( "kriteriaNama" ).value = "";
    document.getElementById( "kriteriaBobot").value = "";
    document.getElementById( "kriteriaAtribut").value = "Benefit";
    document.getElementById( "kriteriaSkala").value = "general";
    document.getElementById( "kriteriaKode" ).readOnly = false;
    document.getElementById("modalKriteria").style.display ="flex";
}

function tutupFormKriteria() {
    document.getElementById( "modalKriteria" ).style.display = "none";
}

function simpanKriteria() {
    const kode = document
        .getElementById( "kriteriaKode" )
        .value
        .trim();
    const nama = document
        .getElementById( "kriteriaNama" )
        .value
        .trim();
    const bobot = parseFloat(
            document
            .getElementById( "kriteriaBobot")
            .value
        );
    const atribut = document
        .getElementById( "kriteriaAtribut" )
        .value;
    const skala = document
        .getElementById( "kriteriaSkala" )
        .value;
    if (
        !kode ||
        !nama ||
        isNaN(bobot)
    ) 
    { alert("Lengkapi data terlebih dahulu" );
        return;
    }

    const data =
        getKriteria();
    if (  editKriteriaKode === null ) 
        {
            const ada =
                data.find(
                    item =>
                    item.kode === kode
                );
            if ( ada ) 
                {
                    alert( "Kode kriteria sudah digunakan" );
                    return;
                }
            data.push({
                kode,
                nama,
                bobot,
                atribut,
                skala
            });
        }
    else {
        const index =
            data.findIndex(
                item =>
                item.kode ===
                editKriteriaKode
            );
        data[index] = {
            kode,
            nama,
            bobot,
            atribut,
            skala
        };
    }
    saveKriteria( data );
    tutupFormKriteria();
    renderKriteria();
}

function editKriteria(kode) {
    const data =
        getKriteria();
    const item =
        data.find(
            item =>
            item.kode === kode
        );
    if ( !item ) {
        return;
    }

    editKriteriaKode =
        kode;
    document.getElementById( "kriteriaKode" ).readOnly = true;
    document.getElementById("judulKriteria" ).textContent = "Edit Kriteria";
    document.getElementById( "kriteriaKode").value = item.kode;
    document.getElementById( "kriteriaNama").value = item.nama;
    document.getElementById("kriteriaBobot").value =item.bobot;
    document.getElementById("kriteriaAtribut").value = item.atribut;
    document.getElementById("kriteriaSkala").value =
        item.skala ||
        "general";
    document.getElementById("modalKriteria").style.display ="flex";
}

function hapusKriteria(kode) {
    const item =
        getKriteria().find(
            k =>
            k.kode === kode
        );
    if (!item) {
        return;
    }
    const konfirmasi =
        confirm(`Hapus kriteria ${item.nama}?`);
    if (!konfirmasi) {
        return;
    }
    const data =
        getKriteria().filter(
            item =>
            item.kode !== kode
        );
    saveKriteria( data );
    renderKriteria();
}