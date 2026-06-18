const STORAGE_KEY_KARYAWAN = "moora_karyawan";
const STORAGE_KEY_KRITERIA = "moora_kriteria";
const STORAGE_KEY_PENILAIAN = "moora_penilaian";
const STORAGE_KEY_THRESHOLD = "moora_threshold";

function initializeData() {

    if (!localStorage.getItem(STORAGE_KEY_KARYAWAN)) {

        const karyawan = [

            {
                id: 100001,
                nama: "Khairul Anhar",
                jabatan: "Karyawan"
            },

            {
                id: 100002,
                nama: "Vivi Elvina Simanjuntak",
                jabatan: "Karyawan"
            },

            {
                id: 100003,
                nama: "Rahmad Hidayat",
                jabatan: "Karyawan"
            },

            {
                id: 100004,
                nama: "Rudi Hermansyah Bako",
                jabatan: "Karyawan"
            },

            {
                id: 100005,
                nama: "Ricky Syahputra",
                jabatan: "Karyawan"
            },

            {
                id: 100006,
                nama: "Rudi Sidabutar",
                jabatan: "Karyawan"
            },

            {
                id: 100007,
                nama: "Chandra Mualim Putra",
                jabatan: "Karyawan"
            },

            {
                id: 100008,
                nama: "Muhammad Soufi",
                jabatan: "Karyawan"
            },

            {
                id: 100009,
                nama: "Moethar Situmeang",
                jabatan: "Karyawan"
            },

            {
                id: 100010,
                nama: "Agustin Rahmawati",
                jabatan: "Karyawan"
            }

        ];

        localStorage.setItem(
            STORAGE_KEY_KARYAWAN,
            JSON.stringify(karyawan)
        );

    }

    if (!localStorage.getItem(STORAGE_KEY_KRITERIA)) {

        const kriteria = [

            {
                kode: "C1",
                nama: "Kedisiplinan",
                bobot: 0.34,
                atribut: "Benefit"
            },

            {
                kode: "C2",
                nama: "Kerjasama Tim",
                bobot: 0.21,
                atribut: "Benefit"
            },

            {
                kode: "C3",
                nama: "Sikap",
                bobot: 0.15,
                atribut: "Benefit"
            },

            {
                kode: "C4",
                nama: "Kehadiran",
                bobot: 0.11,
                atribut: "Benefit"
            },

            {
                kode: "C5",
                nama: "Skill",
                bobot: 0.08,
                atribut: "Benefit"
            },

            {
                kode: "C6",
                nama: "Loyalitas",
                bobot: 0.05,
                atribut: "Benefit"
            },

            {
                kode: "C7",
                nama: "Masa Kerja",
                bobot: 0.03,
                atribut: "Benefit",
                skala: "masaKerja"
            },

            {
                kode: "C8",
                nama: "Produktivitas",
                bobot: 0.03,
                atribut: "Benefit"
            }

        ];

        localStorage.setItem(
            STORAGE_KEY_KRITERIA,
            JSON.stringify(kriteria)
        );

    }

    if (!localStorage.getItem(STORAGE_KEY_PENILAIAN)) {

        const penilaian = [

            {
                idKaryawan: 100001,
                C1: 4,
                C2: 4,
                C3: 3,
                C4: 4,
                C5: 4,
                C6: 4,
                C7: 7,
                C8: 4
            },

            {
                idKaryawan: 100002,
                C1: 3,
                C2: 3,
                C3: 2,
                C4: 3,
                C5: 3,
                C6: 3,
                C7: 5,
                C8: 3
            },

            {
                idKaryawan: 100003,
                C1: 2,
                C2: 3,
                C3: 4,
                C4: 3,
                C5: 2,
                C6: 2,
                C7: 4,
                C8: 2
            },

            {
                idKaryawan: 100004,
                C1: 2,
                C2: 2,
                C3: 3,
                C4: 4,
                C5: 4,
                C6: 3,
                C7: 3,
                C8: 3
            },

            {
                idKaryawan: 100005,
                C1: 3,
                C2: 3,
                C3: 2,
                C4: 3,
                C5: 3,
                C6: 2,
                C7: 2,
                C8: 2
            },

            {
                idKaryawan: 100006,
                C1: 3,
                C2: 4,
                C3: 3,
                C4: 2,
                C5: 3,
                C6: 2,
                C7: 4,
                C8: 2
            },

            {
                idKaryawan: 100007,
                C1: 2,
                C2: 2,
                C3: 3,
                C4: 3,
                C5: 4,
                C6: 1,
                C7: 2,
                C8: 1
            },

            {
                idKaryawan: 100008,
                C1: 3,
                C2: 4,
                C3: 3,
                C4: 2,
                C5: 3,
                C6: 3,
                C7: 4,
                C8: 3
            },

            {
                idKaryawan: 100009,
                C1: 4,
                C2: 4,
                C3: 4,
                C4: 3,
                C5: 3,
                C6: 2,
                C7: 6,
                C8: 2
            },

            {
                idKaryawan: 100010,
                C1: 4,
                C2: 2,
                C3: 3,
                C4: 4,
                C5: 2,
                C6: 3,
                C7: 5,
                C8: 3
            }

        ];

        localStorage.setItem(
            STORAGE_KEY_PENILAIAN,
            JSON.stringify(penilaian)
        );

    }

    if (!localStorage.getItem(STORAGE_KEY_THRESHOLD)) {

        localStorage.setItem(
            STORAGE_KEY_THRESHOLD,
            "0.30"
        );

    }

}

function getKaryawan() {

    return JSON.parse(

        localStorage.getItem(
            STORAGE_KEY_KARYAWAN
        )

    ) || [];

}

function saveKaryawan(data) {

    localStorage.setItem(
        STORAGE_KEY_KARYAWAN,
        JSON.stringify(data)
    );

}

function getKriteria() {

    return JSON.parse(

        localStorage.getItem(
            STORAGE_KEY_KRITERIA
        )

    ) || [];

}

function saveKriteria(data) {

    localStorage.setItem(
        STORAGE_KEY_KRITERIA,
        JSON.stringify(data)
    );

}

function getPenilaian() {

    return JSON.parse(

        localStorage.getItem(
            STORAGE_KEY_PENILAIAN
        )

    ) || [];

}

function savePenilaian(data) {

    localStorage.setItem(
        STORAGE_KEY_PENILAIAN,
        JSON.stringify(data)
    );

}

function getBenefitThreshold() {

    return parseFloat(

        localStorage.getItem(
            STORAGE_KEY_THRESHOLD
        )

    ) || 0.30;

}

function saveBenefitThreshold(nilai) {

    localStorage.setItem(
        STORAGE_KEY_THRESHOLD,
        nilai
    );

}

function generateNextKaryawanId() {

    const data =
        getKaryawan();

    if (
        data.length === 0
    ) {

        return 100001;

    }

    const maxId =

        Math.max(

            ...data.map(
                item =>
                Number(
                    item.id
                )
            )

        );

    return maxId + 1;

}
initializeData();