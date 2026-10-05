import { LearningModule, QuizQuestion, EducationalVideo, ForumPost, Badge, LeaderboardEntry } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_clay_computational_1790910802570.jpg';

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'modul-1',
    number: 1,
    title: 'Pengelolaan Data dalam Situasi Kehidupan',
    subtitle: 'Mengumpulkan, mengelompokkan, dan membaca makna dari data di sekitar kita',
    summary: 'Pelajari cara mengumpulkan fakta mentah, mengorganisasikannya ke dalam tabel frekuensi, membaca grafik visual, dan mengambil keputusan bijak untuk menyelesaikan masalah sehari-hari.',
    image: '/src/assets/images/clay_data_management_1790910820802.jpg',
    capaianPembelajaran: 'Menerapkan pengelolaan data dalam situasi kehidupan masyarakat secara sistematis.',
    estimatedMinutes: 20,
    pointsReward: 50,
    subTopics: [
      {
        id: 'sub-1-1',
        title: 'Fakta, Data, dan Informasi',
        summary: 'Perbedaan mendasar antara catatan angka mentah dan informasi yang berdaya guna.',
        content: [
          'Dalam era digital saat ini, setiap detik ada jutaan fakta yang tercatat. Namun, angka-angka atau catatan mentah itu belum berguna jika belum diolah. Inilah perbedaan antara data dan informasi.',
          'Data adalah fakta mentah, karakter, simbol, atau observasi kuantitatif/kualitatif yang belum diorganisasi. Contoh: angka 12, 18, 5, 23 hasil catatan pensil di buku tulis.',
          'Informasi adalah data yang telah diproses, dikelompokkan, dan diberi konteks sehingga memiliki makna bagi penerimanya untuk mengambil keputusan. Contoh: "Rata-rata 23 siswa kelas 7B menyukai buah pisang di kantin sehat, sedangkan hanya 5 siswa yang memilih gorengan."',
          'Data yang baik memiliki sifat akurat (sesuai kenyataan), relevan (sesuai topik yang dicari), dan tepat waktu.'
        ],
        keyTerms: [
          { term: 'Data', definition: 'Fakta atau catatan mentah yang belum diolah dan belum memiliki konteks khusus.' },
          { term: 'Informasi', definition: 'Hasil olahan data yang bermakna dan berguna untuk mendukung pengambilan keputusan.' },
          { term: 'Kuantitatif', definition: 'Data berbentuk angka atau jumlah terhitung (misal: berat sampah 15 kg).' },
          { term: 'Kualitatif', definition: 'Data deskriptif berupa sifat atau kategori (misal: rasa manis, warna hijau).' }
        ],
        interactiveCheck: {
          question: 'Manakah dari pernyataan berikut yang merupakan sebuah "Informasi" (bukan sekadar data mentah)?',
          options: [
            'Daftar angka acak di secarik kertas: 35, 42, 28, 50.',
            'Bulan September 2026.',
            'Berdasarkan survei 80 siswa SMP, 70% lebih memilih membawa bekal tumbler untuk mengurangi botol plastik.',
            'Huruf A, B, C, D yang dicatat tanpa keterangan.'
          ],
          correctIndex: 2,
          explanation: 'Tepat sekali! Pilihan ke-3 sudah memiliki konteks subjek (siswa SMP), persentase kesimpulan (70%), dan tujuan yang jelas (pengurangan botol plastik) sehingga menjadi informasi yang bermakna.'
        },
        caseStudy: {
          title: 'Kasus Kantin Sehat SMP Merdeka',
          scenario: 'Ibu Kantin sering mendapati sisa makanan basi terbuang karena beliau memasak menu secara asal tebak tanpa mengetahui selera siswa kelas 7.',
          actionSteps: [
            'Langkah 1: Mengedarkan angket 3 menu favorit (soto, nasi uduk, salad buah) ke 100 siswa.',
            'Langkah 2: Menghitung total pemilih per menu (Tally/Frekuensi).',
            'Langkah 3: Menyimpulkan porsi belanja bahan dapur berdasarkan peringkat pilihan terbanyak.'
          ],
          takeaway: 'Pengelolaan data mencegah pemborosan makanan dan menghemat anggaran belanja sekolah.'
        }
      },
      {
        id: 'sub-1-2',
        title: 'Pengumpulan & Pembersihan Data',
        summary: 'Metode memperoleh data yang jujur serta membuang data salah (outlier & duplikat).',
        content: [
          'Mengumpulkan data dapat dilakukan dengan beberapa cara: kuesioner/survei angket, observasi langsung menghitung di lapangan, atau wawancara singkat.',
          'Pembersihan Data (Data Cleaning) adalah tahap krusial dalam Berpikir Komputasional. Seringkali data mentah mengandung kesalahan manusia (human error), seperti:',
          '1. Data Duplikat: Satu siswa mengisi kuesioner dua kali.',
          '2. Data Tidak Logis: Ada isian umur siswa kelas 7 tertulis 150 tahun atau berat badan -10 kg.',
          '3. Data Kosong (Missing Values): Kolom penting yang sengaja dilewati responden.',
          'Sebelum membuat diagram, kita harus memvalidasi data agar kesimpulan yang diambil tidak menyesatkan (Garbage In, Garbage Out).'
        ],
        keyTerms: [
          { term: 'Kuesioner', definition: 'Daftar pertanyaan terstruktur untuk menghimpun data dari responden.' },
          { term: 'Pembersihan Data', definition: 'Proses memeriksa dan memperbaiki data yang salah, rusak, formatnya tidak tepat, atau ganda.' },
          { term: 'Validasi', definition: 'Pemeriksaan apakah nilai data masuk akal sesuai batas logika yang ditentukan.' }
        ],
        interactiveCheck: {
          question: 'Saat mengumpulkan data tinggi badan siswa kelas 7, kamu menemukan angka 1.500 cm pada salah satu baris. Apa tindakan komputasional yang tepat?',
          options: [
            'Membiarkannya karena komputer akan menghitung semuanya otomatis.',
            'Menghapus seluruh survei dan membatalkan proyek data.',
            'Mengidentifikasi kesalahan ketik (typo dari 150 cm) dan memvalidasi ulang ke siswa terkait.',
            'Mengubah semua tinggi siswa lain menjadi 1.500 cm agar seragam.'
          ],
          correctIndex: 2,
          explanation: 'Benar! Angka 1.500 cm (15 meter) tidak realistis untuk tinggi manusia. Dalam pembersihan data, kita mengoreksi nilai yang tidak logis atau mengonfirmasi sumbernya.'
        },
        caseStudy: {
          title: 'Bank Sampah Daur Ulang Kelas VII',
          scenario: 'Petugas kebersihan mencatat setoran botol plastik dari tiap kelas, namun beberapa nama kelas tertulis "7A", "VII-A", dan "Kelas Tujuh A" secara tidak seragam.',
          actionSteps: [
            'Langkah 1: Standardisasi format penamaan kelas menjadi satu gaya seragam ("7A").',
            'Langkah 2: Menghapus catatan ganda yang tercatat di dua buku berbeda.',
            'Langkah 3: Menjumlahkan total berat botol secara akurat per kelas.'
          ],
          takeaway: 'Konsistensi format data mempermudah pemrosesan otomatis dan analisis perbandingan.'
        }
      },
      {
        id: 'sub-1-3',
        title: 'Visualisasi & Penarikan Kesimpulan',
        summary: 'Mengubah tabel angka menjadi diagram batang, diagram lingkaran, dan wawasan solutif.',
        content: [
          'Otak manusia memproses gambar 60.000 kali lebih cepat daripada sekumpulan teks angka. Visualisasi data adalah seni menyampaikan wawasan menggunakan elemen grafis.',
          'Pilihan bentuk visualisasi data:',
          '• Tabel Frekuensi: Bagus untuk melihat angka pasti dan rincian detail.',
          '• Diagram Batang (Bar Chart): Sangat cocok membandingkan jumlah antar kategori yang berbeda (misal: perbandingan sampah plastik vs kertas vs kaleng).',
          '• Diagram Lingkaran (Pie Chart): Sangat cocok memperlihatkan proporsi atau bagian dari total 100% (misal: persentase siswa naik sepeda, jalan kaki, dan naik angkot).',
          '• Diagram Garis: Terbaik untuk melihat perubahan atau tren dari waktu ke waktu (misal: jumlah pengunjung perpustakaan dari hari Senin hingga Jumat).'
        ],
        keyTerms: [
          { term: 'Tabel Frekuensi', definition: 'Tabel yang menyajikan banyaknya kemunculan suatu data dalam kelompok tertentu.' },
          { term: 'Diagram Batang', definition: 'Grafik balok yang tingginya mewakili kuantitas setiap kategori.' },
          { term: 'Diagram Lingkaran', definition: 'Grafik bundar terbagi menjadi irisan juring sebanding dengan persentase bagian.' },
          { term: 'Wawasan (Insight)', definition: 'Pemahaman mendalam hasil analisis data yang menjadi dasar tindakan solutif.' }
        ],
        interactiveCheck: {
          question: 'Jika kamu ingin menunjukkan persentase pembagian anggaran OSIS untuk 4 kegiatan berbeda dari total 100%, grafik apa yang paling tepat digunakan?',
          options: [
            'Diagram Lingkaran (Pie Chart)',
            'Diagram Garis Waktu',
            'Daftar teks paragraf panjang tanpa angka',
            'Peta rute GPS'
          ],
          correctIndex: 0,
          explanation: 'Luar biasa! Diagram Lingkaran dirancang khusus untuk memvisualisasikan proporsi setiap bagian terhadap keseluruhan total 100%.'
        },
        caseStudy: {
          title: 'Audit Sampah Plastik Sekolahan',
          scenario: 'Kepala Sekolah ingin tahu jenis sampah plastik mana yang paling mendominasi tempat pembuangan akhir sekolah.',
          actionSteps: [
            'Langkah 1: Siswa menimbang sampah selama 5 hari: Sedotan (18 kg), Gelas Plastik (62 kg), Bungkus Snack (45 kg).',
            'Langkah 2: Membuat diagram batang di mading sekolah.',
            'Langkah 3: Rekomendasi kebijakan: Mengganti gelas plastik sekali pakai dengan dispenser air minum isi ulang.'
          ],
          takeaway: 'Visualisasi data yang jelas mempermudah pihak sekolah mengambil keputusan berdampak nyata.'
        }
      }
    ]
  },
  {
    id: 'modul-2',
    number: 2,
    title: 'Pemecahan Masalah Sederhana dalam Situasi Kehidupan',
    subtitle: 'Mengenal 4 pilar Berpikir Komputasional: Dekomposisi, Pola, Abstraksi, dan Algoritma',
    summary: 'Kembangkan cara berpikir sistematis layaknya ilmuwan komputer saat menghadapi persoalan sehari-hari di lingkungan rumah, pertemanan, dan masyarakat.',
    image: '/src/assets/images/clay_problem_solving_1790910834668.jpg',
    capaianPembelajaran: 'Menerapkan pemecahan masalah sederhana dalam kehidupan masyarakat secara sistematis.',
    estimatedMinutes: 25,
    pointsReward: 60,
    subTopics: [
      {
        id: 'sub-2-1',
        title: 'Pilar 1: Dekomposisi (Memecah Masalah)',
        summary: 'Mengurai masalah besar yang menakutkan menjadi potongan-potongan kecil yang mudah dikerjakan.',
        content: [
          'Saat menghadapi masalah besar seperti "Mengadakan Pentas Seni SMP", kita sering merasa kewalahan jika memandangnya sebagai satu kesatuan utuh.',
          'Dekomposisi adalah teknik memecah masalah kompleks menjadi komponen-komponen atau sub-masalah yang lebih kecil, lebih mandiri, dan lebih mudah diselesaikan.',
          'Contoh nyata Dekomposisi: Menyelenggarakan Porseni Kelas 7 dipecah menjadi:',
          '1. Tim Lapangan & Perlengkapan (Bola, Net, Pluit).',
          '2. Tim Jadwal & Bagan Pertandingan.',
          '3. Tim Konsumsi & P3K.',
          '4. Tim Dokumentasi & Pengumuman.',
          'Dengan memecahnya, setiap kelompok kecil dapat bekerja secara paralel dan terfokus.'
        ],
        keyTerms: [
          { term: 'Dekomposisi', definition: 'Proses menguraikan masalah atau sistem kompleks menjadi bagian-bagian lebih kecil.' },
          { term: 'Sub-masalah', definition: 'Bagian terurai yang memiliki ruang lingkup terbatas dan lebih mudah diselesaikan satu per satu.' },
          { term: 'Paralel', definition: 'Mengerjakan beberapa sub-tugas secara bersamaan oleh orang atau sistem yang berbeda.' }
        ],
        interactiveCheck: {
          question: 'Jika kamu diminta membersihkan laboratorium komputer sekolah yang sangat kotor, contoh penerapan Dekomposisi yang tepat adalah...',
          options: [
            'Menatap ruangan selama 2 jam tanpa tahu harus mulai dari mana.',
            'Membagi tugas: regu 1 membersihkan keyboard, regu 2 menyapu lantai, regu 3 merapikan kabel colokan.',
            'Menolak tugas karena ruangannya terlalu besar.',
            'Mengunci pintu lab agar tidak ada yang melihat kotorannya.'
          ],
          correctIndex: 1,
          explanation: 'Tepat sekali! Membagi tugas ke dalam bagian-bagian fisik (keyboard, lantai, kabel) adalah inti penerapan dekomposisi.'
        },
        caseStudy: {
          title: 'Masalah Kemacetan Depan Gerbang Sekolah',
          scenario: 'Setiap pukul 06.45 WIB, jalanan depan sekolah macet parah karena motor dan mobil berhenti sembarangan menurunkan siswa.',
          actionSteps: [
            'Sub-masalah 1: Titik turun (drop zone) kendaraan tidak teratur.',
            'Sub-masalah 2: Pejalan kaki menyeberang tanpa zona aman zebra cross.',
            'Sub-masalah 3: Siswa datang menumpuk di 15 menit terakhir sebelum gerbang ditutup.'
          ],
          takeaway: 'Dengan mendekonstruksi akar penyebabnya, solusi dapat diberikan pada tiap titik secara efektif.'
        }
      },
      {
        id: 'sub-2-2',
        title: 'Pilar 2 & 3: Pengenalan Pola & Abstraksi',
        summary: 'Mendeteksi kesamaan yang berulang dan menyaring hal-hal penting tanpa terdistraksi detail remeh.',
        content: [
          'Pengenalan Pola (Pattern Recognition) adalah kemampuan mengamati kesamaan, keteraturan, atau tren berulang pada persoalan yang pernah kita hadapi sebelumnya.',
          'Jika kamu tahu cara mencuci sepatu kanvas, polanya sangat mirip saat mencuci tas ransel kanvas: basahi, sikat dengan sabun lembut, bilas, dan jemur di tempat teduh.',
          'Abstraksi (Abstraction) adalah kemampuan menyaring dan memusatkan perhatian hanya pada detail penting yang berkaitan dengan tujuan, serta mengabaikan informasi yang tidak relevan.',
          'Contoh Abstraksi legendaris: Peta MRT atau Jalur Bus Transjakarta! Peta tersebut tidak menampilkan gambar pohon, warna cat rumah penduduk, atau tinggi trotoar jalan. Peta hanya menampilkan halte, nama stasiun, dan garis warna rute. Detail pohon diabaikan karena tidak penting untuk penumpang yang ingin tahu rute transit.'
        ],
        keyTerms: [
          { term: 'Pengenalan Pola', definition: 'Mengidentifikasi kesamaan karakteristik atau keteraturan dalam kumpulan data/masalah.' },
          { term: 'Abstraksi', definition: 'Menyaring informasi penting untuk pemecahan masalah dan membuang detail yang tidak penting.' },
          { term: 'Relevansi', definition: 'Tingkat hubungan suatu informasi terhadap tujuan yang hendak dicapai.' }
        ],
        interactiveCheck: {
          question: 'Ketika membuat jadwal belajar ujian semester, manakah contoh tindakan "Abstraksi"?',
          options: [
            'Mencatat warna sampul buku catatan dan merk pulpen yang dipakai teman.',
            'Fokus mencatat bab materi ujian dan durasi jam belajar, serta mengabaikan jenis kertas atau cover buku.',
            'Membeli 10 stiker baru untuk ditempel di meja belajar.',
            'Menghafal seluruh daftar isi buku dari kata pengantar hingga indeks cetakan.'
          ],
          correctIndex: 1,
          explanation: 'Benar! Abstraksi menyaring hal yang relevan untuk target lulus ujian (bab materi & jam belajar) dan mengabaikan detail visual yang tidak berpengaruh (warna sampul, merk pulpen).'
        },
        caseStudy: {
          title: 'Prediksi Antrean Kantin SMP',
          scenario: 'Siswa kelas 7 selalu kehabisan waktu istirahat 20 menit hanya untuk mengantre soto ayam.',
          actionSteps: [
            'Pola: Antrean selalu memanjang di 5 menit pertama istirahat, lalu menyusut di menit ke-12.',
            'Abstraksi: Fokus pada durasi pembuatan 1 mangkuk soto (30 detik) dan jumlah pelayan (2 orang), mengabaikan warna mangkuk.',
            'Solusi: Mengubah alur antrean menjadi sistem kupon prabayar yang dibeli sebelum jam istirahat.'
          ],
          takeaway: 'Mengenali pola waktu dan mengabstraksi variabel penting melahirkan solusi cerdas yang efisien.'
        }
      },
      {
        id: 'sub-2-3',
        title: 'Pilar 4: Perancangan Algoritma',
        summary: 'Menyusun urutan langkah-langkah logis untuk menyelesaikan tugas secara tuntas.',
        content: [
          'Algoritma adalah serangkaian langkah terurut yang sistematis, logis, dan terbatas (finite) untuk memecahkan suatu masalah atau menyelesaikan suatu tugas.',
          'Ciri utama algoritma yang baik:',
          '1. Terurut (Sequential): Urutan langkah tidak boleh tertukar jika mempengaruhi hasil akhir.',
          '2. Jelas & Tidak Ambigu: Setiap kalimat instruksi hanya memiliki satu arti pasti.',
          '3. Memiliki Input dan Output: Ada kondisi awal yang dimasukkan, dan ada hasil akhir yang diharapkan.',
          '4. Berhingga (Finite): Langkah-langkah harus berhenti setelah mencapai tujuan, bukan berputar tanpa henti (infinite loop).'
        ],
        keyTerms: [
          { term: 'Algoritma', definition: 'Urutan langkah-langkah logis dan terstruktur untuk memecahkan masalah.' },
          { term: 'Sekuensial', definition: 'Eksekusi instruksi yang berjalan runtut satu demi satu dari atas ke bawah.' },
          { term: 'Kondisional', definition: 'Langkah percabangan yang memilih aksi berdasarkan syarat (Jika... Maka...).' },
          { term: 'Looping', definition: 'Pengulangan instruksi selama kondisi tertentu masih terpenuhi.' }
        ],
        interactiveCheck: {
          question: 'Perhatikan urutan: [1. Pakai helm] -> [2. Naik ke sepeda] -> [3. Kayuh pedal]. Jika langkah 1 dan 3 di balik, apa akibatnya secara komputasional?',
          options: [
            'Tidak ada pengaruh apa pun.',
            'Berbahaya dan melanggar logika keselamatan (sudah jalan baru mau memakai helm).',
            'Sepeda otomatis bertambah cepat.',
            'Langkah menjadi lebih modern.'
          ],
          correctIndex: 1,
          explanation: 'Tepat sekali! Urutan dalam algoritma sangat menentukan keamanan dan kebenaran hasil. Algoritma harus berjalan runtut sesuai logika.'
        },
        caseStudy: {
          title: 'Algoritma Evakuasi Gempa Sekolah',
          scenario: 'Ketika sirine gempa berbunyi, siswa tidak boleh panik dan harus mengikuti protokol keselamatan.',
          actionSteps: [
            'Langkah 1: Lindungi kepala dan berlindung di bawah meja kokoh (Drop, Cover, Hold on).',
            'Langkah 2: Tunggu hingga getaran utama berhenti.',
            'Langkah 3: Jalan cepat berbaris tanpa mendorong menuju titik kumpul lapangan terbuka.'
          ],
          takeaway: 'Algoritma terstruktur menyelamatkan nyawa karena memberi kepastian aksi tanpa ragu.'
        }
      }
    ]
  },
  {
    id: 'modul-3',
    number: 3,
    title: 'Pengembangan dan Pengujian Instruksi',
    subtitle: 'Menulis instruksi presisi, membaca flowchart, dan menguji bug secara sistematis',
    summary: 'Kuasai keterampilan menuliskan instruksi yang dapat dijalankan oleh manusia maupun komputer tanpa salah paham, serta teknik penelusuran meja (dry run) untuk membasmi bug.',
    image: '/src/assets/images/clay_robot_instruction_1790910847923.jpg',
    capaianPembelajaran: 'Menuliskan instruksi serta menguji ketepatan dan efektivitas langkah penyelesaian masalah.',
    estimatedMinutes: 25,
    pointsReward: 60,
    subTopics: [
      {
        id: 'sub-3-1',
        title: 'Menuliskan Instruksi yang Presisi & Spesifik',
        summary: 'Mengapa komputer tidak bisa "mengira-ngira" dan bagaimana menghindari ambiguitas.',
        content: [
          'Pernahkah kamu memberi instruksi kepada teman: "Tolong ambilkan buku yang ada di atas meja itu ya!" Lalu temanmu bingung karena di atas meja ada 10 buku bertumpuk?',
          'Manusia sering menggunakan asumsi dan intuisi. Namun, komputer atau sistem otomatis tidak memiliki intuisi. Komputer hanya menjalankan apa yang ditulis secara persis (literal).',
          'Instruksi yang baik harus memenuhi 3 syarat:',
          '1. Spesifik: Sebutkan objek, arah, dan kuantitas dengan pasti ("Ambil 1 buku Matematika bersampul biru di meja guru sebelah kanan").',
          '2. Tidak Ambigu: Kalimat tidak boleh menimbulkan multi-tafsir.',
          '3. Runtut: Setiap aksi mendahului aksi berikutnya secara logis.'
        ],
        keyTerms: [
          { term: 'Ambiguitas', definition: 'Kalimat atau instruksi yang memiliki lebih dari satu arti atau multitafsir.' },
          { term: 'Presisi', definition: 'Tingkat ketelitian dan kejelasan parameter dalam perintah (arah, jarak, jumlah).' },
          { term: 'Sintaks Instruksi', definition: 'Aturan penulisan perintah agar dapat dipahami oleh mesin atau pengeksekusi.' }
        ],
        interactiveCheck: {
          question: 'Manakah instruksi untuk robot pembersih kelas yang paling presisi dan bebas ambiguitas?',
          options: [
            '"Bersihkan ruangan sampai kinclong sebisamu."',
            '"Jalan ke depan sana lalu sapu sedikit."',
            '"Maju 4 langkah, putar 90 derajat ke kanan, aktifkan penyedot debu selama 10 detik."',
            '"Tolong bersihkan kalau kamu sedang tidak sibuk ya robot."'
          ],
          correctIndex: 2,
          explanation: 'Luar biasa! Pilihan ke-3 memiliki besaran kuantitatif terukur (4 langkah, 90 derajat ke kanan, 10 detik) yang dapat dieksekusi mesin tanpa interpretasi ganda.'
        },
        caseStudy: {
          title: 'Instruksi Membuat Teh Manis Hangat',
          scenario: 'Instruksi berbunyi: "Masukkan teh dan gula ke gelas, beri air, aduk." Namun pembuat memakai air es sehingga gula tidak larut.',
          actionSteps: [
            'Koreksi Presisi: Tentukan jenis air secara spesifik: "Tuang 200 ml air panas bersuhu minimal 80°C".',
            'Tentukan kuantitas: "Masukkan 1 kantung teh celup dan 2 sendok teh gula pasir".',
            'Tentukan waktu: "Aduk memutar searah jarum jam selama 15 detik hingga gula larut sempurna".'
          ],
          takeaway: 'Menambahkan parameter kuantitatif mengubah instruksi biasa menjadi instruksi standar profesional.'
        }
      },
      {
        id: 'sub-3-2',
        title: 'Pseudocode & Simbol Flowchart Standar',
        summary: 'Menerjemahkan instruksi bahasa alami ke bentuk kode semu dan diagram alir visual.',
        content: [
          'Agar instruksi mudah dibaca sebelum dijadikan program komputer, ilmuwan komputer menggunakan dua format standar: Pseudocode dan Flowchart.',
          'Pseudocode adalah penulisan algoritma menggunakan bahasa manusia (misal: Bahasa Indonesia) yang disusun mirip gaya bahasa pemrograman, menggunakan kata kunci seperti: MULAI, MASUKKAN, JIKA... MAKA... LAINNYA, ULANGI, SELESAI.',
          'Flowchart (Diagram Alir) adalah representasi grafis dengan simbol-simbol standar internasional:',
          '• Oval / Kapsul (Terminator): Menandai Titik Awal (START) atau Akhir (STOP).',
          '• Jajaran Genjang: Operasi Input (masukan data) atau Output (tampilan hasil).',
          '• Persegi Panjang: Operasi Proses perhitungan atau aksi tindakan fisik.',
          '• Belah Ketupat (Diamond / Decision): Titik keputusan logika yang menghasilkan dua cabang (Ya / Tidak).',
          '• Garis Panah (Flowline): Menunjukkan arah aliran jalannya proses.'
        ],
        keyTerms: [
          { term: 'Pseudocode', definition: 'Deskripsi informal tingkat tinggi dari algoritma pemrograman komputer.' },
          { term: 'Flowchart', definition: 'Diagram yang menampilkan langkah-langkah proses menggunakan bentuk bangun datar terstandar.' },
          { term: 'Terminator', definition: 'Simbol berbentuk oval/kapsul untuk menyatakan awal atau akhir flowchart.' },
          { term: 'Decision', definition: 'Simbol belah ketupat untuk pengujian kondisi berkeputusan (True/False).' }
        ],
        interactiveCheck: {
          question: 'Dalam diagram alir (flowchart), simbol apakah yang digunakan saat program harus memutuskan: "Apakah Nilai Ujian >= 75?"',
          options: [
            'Persegi panjang (Proses)',
            'Belah ketupat (Decision / Keputusan)',
            'Oval (Terminator)',
            'Lingkaran kecil (Konektor)'
          ],
          correctIndex: 1,
          explanation: 'Benar sekali! Simbol belah ketupat (Decision) digunakan untuk percabangan kondisi logika yang memiliki keluaran Ya atau Tidak.'
        },
        caseStudy: {
          title: 'Flowchart Sistem Peminjaman Buku Perpustakaan',
          scenario: 'Siswa kelas 7 meminjam buku ensiklopedia di perpustakaan sekolah.',
          actionSteps: [
            'Terminator: [MULAI]',
            'Input: [Scan Kartu Pelajar Siswa]',
            'Decision: [Apakah Siswa Punya Denda Buku Menunggak?]',
            'Cabang YA: [Tampilkan Notifikasi Denda] -> [SELESAI]',
            'Cabang TIDAK: [Proses Pinjam Buku 7 Hari] -> [Cetak Struk] -> [SELESAI]'
          ],
          takeaway: 'Flowchart memudahkan kita melihat semua skenario percabangan yang mungkin terjadi.'
        }
      },
      {
        id: 'sub-3-3',
        title: 'Pengujian Instruksi & Debugging (Penelusuran Meja)',
        summary: 'Menjalankan dry run langkah demi langkah dan membasmi bug sebelum diterbitkan.',
        content: [
          'Dalam dunia komputasi, kesalahan dalam instruksi disebut sebagai BUG, dan proses mencari serta memperbaikinya disebut DEBUGGING.',
          'Sejarah nama Bug: Pada tahun 1947, ilmuwan komputer legendaris Grace Hopper menemukan seekor serangga (ngengat/moth) yang tersangkut di dalam relay mesin komputer Harvard Mark II yang menyebabkan program eror!',
          'Teknik Penelusuran Meja (Dry Run / Tracing Table):',
          'Cara menguji instruksi di atas kertas tanpa komputer dengan berpura-pura menjadi mesin pelaksana. Kita mencatat nilai variabel pada setiap baris instruksi untuk memastikan apakah hasilnya sudah sesuai rencana.',
          'Dua jenis bug yang sering terjadi pada pemula:',
          '1. Bug Sekuen (Urutan): Instruksi ditaruh di tempat yang salah (misal: mengaduk sebelum gula dimasukkan).',
          '2. Bug Kondisi: Tanda perbandingan tertukar (misal: memakai tanda < padahal seharusnya >=).'
        ],
        keyTerms: [
          { term: 'Bug', definition: 'Cacat atau kesalahan dalam instruksi kode yang menyebabkan hasil tidak sesuai harapan.' },
          { term: 'Debugging', definition: 'Proses mendeteksi, mengisolasi, dan memperbaiki bug dalam alur instruksi.' },
          { term: 'Dry Run', definition: 'Pengujian instruksi secara manual langkah demi langkah menggunakan pena dan kertas.' },
          { term: 'Tracing Table', definition: 'Tabel jejak untuk memantau perubahan status variabel di setiap baris perintah.' }
        ],
        interactiveCheck: {
          question: 'Robot pembersih diberi perintah: [1. Maju 2 Langkah] -> [2. Siram Air Pembersih] -> [3. Putar 180 Derajat] -> [4. Sikat Lantai]. Mengapa hasil lantai masih kotor?',
          options: [
            'Robotnya kehabisan baterai.',
            'Langkah 3 memutar robot membelakangi air, sehingga sikat di langkah 4 menyikat lantai kering yang belum diberi air!',
            'Air pembersihnya terlalu harum.',
            'Lantai sekolah tidak bisa dibersihkan oleh robot.'
          ],
          correctIndex: 1,
          explanation: 'Tepat sekali! Ini adalah contoh klasik Bug Sekuen (urutan langkah). Robot memutar badan sebelum menyikat, sehingga ia menyikat area yang salah.'
        },
        caseStudy: {
          title: 'Debugging Robot Pengantar Makanan Lab',
          scenario: 'Robot yang diprogram mengantar mikroskop ke Meja 3 selalu menabrak dinding koridor di langkah ke-5.',
          actionSteps: [
            'Langkah 1 (Tracing): Periksa baris 1-4: bot bergerak maju 4 meter (Aman).',
            'Langkah 2 (Menemukan Bug): Baris 5 tertulis "Belok Kiri 90°", padahal belokan pintu lab berada di sebelah kanan!',
            'Langkah 3 (Fix Bug): Mengubah baris 5 menjadi "Belok Kanan 90°" dan menguji ulang bot di koridor.'
          ],
          takeaway: 'Debugging yang sabar langkah demi langkah selalu berhasil menemukan titik kesalahan logika.'
        }
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Modul 1: Pengelolaan Data
  {
    id: 'q-1',
    moduleId: 'modul-1',
    question: 'Di kelas 7C, ketua kelas mencatat warna botol minum teman-temannya: Biru, Merah, Biru, Hijau, Biru, Hitam. Dari catatan tersebut, manakah yang merupakan kesimpulan informasi yang tepat?',
    options: [
      'Semua siswa kelas 7C wajib membeli botol biru baru.',
      'Warna biru merupakan botol yang paling banyak dimiliki siswa kelas 7C (modus).',
      'Warna botol menentukan nilai ujian informatika.',
      'Catatan tersebut tidak bisa diolah sama sekali.'
    ],
    correctIndex: 1,
    explanation: 'Warna biru muncul 3 kali (frekuensi tertinggi), sehingga menjadi kesimpulan informasi yang valid dari kumpulan data tersebut.',
    difficulty: 'Mudah',
    hint: 'Cari frekuensi kemunculan terbanyak dari data.'
  },
  {
    id: 'q-2',
    moduleId: 'modul-1',
    question: 'Ketika menyajikan hasil survei jenis transportasi yang digunakan siswa untuk ke sekolah (jalan kaki, sepeda, angkot, diantar motor), diagram mana yang paling tepat untuk membandingkan jumlah siswa antar kategori?',
    options: [
      'Diagram Batang (Bar Chart)',
      'Diagram Peta Kontur',
      'Diagram Alir (Flowchart)',
      'Teks narasi tanpa angka'
    ],
    correctIndex: 0,
    explanation: 'Diagram Batang paling efektif untuk membandingkan kuantitas antar kategori yang terpisah secara visual dan mudah dibaca.',
    difficulty: 'Mudah',
    hint: 'Gunakan grafik yang menggunakan batang balok tegak.'
  },
  {
    id: 'q-3',
    moduleId: 'modul-1',
    question: 'Saat mengumpulkan data survei uang saku siswa, ditemukan data bernilai Rp -50.000 dan Rp 10.000.000 per hari pada siswa kelas 7. Tindakan pengelolaan data yang tepat adalah...',
    options: [
      'Menyimpan data apa adanya agar jumlah responden tidak berkurang.',
      'Melakukan pembersihan data (data cleaning) karena nilai minus dan sepuluh juta tidak masuk akal (outlier/anomali).',
      'Mengalikan semua uang saku siswa lain menjadi minus.',
      'Menghapus seluruh kolom nama siswa.'
    ],
    correctIndex: 1,
    explanation: 'Uang saku tidak mungkin bernilai negatif dan Rp 10 juta per hari sangat ekstrem untuk siswa SMP. Perlu dikonfirmasi dan dibersihkan.',
    difficulty: 'Sedang',
    hint: 'Ingat tahapan Data Cleaning dan Validasi.'
  },
  {
    id: 'q-4',
    moduleId: 'modul-1',
    question: 'Mengapa kita perlu mengubah data mentah tabel angka menjadi grafik visual sebelum dipresentasikan di depan kelas?',
    options: [
      'Agar grafik terlihat berwarna-warni saja tanpa tujuan.',
      'Karena manusia lebih cepat memahami pola, tren, dan perbandingan melalui representasi visual daripada deretan angka rumit.',
      'Karena komputer melarang penggunaan angka dalam presentasi.',
      'Agar siswa lain tidak bisa membaca isi datanya.'
    ],
    correctIndex: 1,
    explanation: 'Visualisasi membantu audiens menangkap kesimpulan, perbandingan, dan tren data secara instan dan menarik.',
    difficulty: 'Mudah'
  },

  // Modul 2: Pemecahan Masalah
  {
    id: 'q-5',
    moduleId: 'modul-2',
    question: 'Ibu guru meminta kelas 7A membuat kebun toga sekolah. Kamu membagi pekerjaan menjadi: tim penyiap tanah, tim pencari bibit, tim pembuat pagar bambu, dan tim jadwal penyiraman. Pilar berpikir komputasional apa yang kamu gunakan?',
    options: [
      'Abstraksi',
      'Dekomposisi',
      'Pengenalan Pola',
      'Simulasi Robotik'
    ],
    correctIndex: 1,
    explanation: 'Memecah satu proyek besar (membuat kebun toga) menjadi beberapa pekerjaan bagian yang mandiri adalah esensi Dekomposisi.',
    difficulty: 'Mudah',
    hint: 'Ingat kata kunci: memecah masalah besar menjadi bagian kecil.'
  },
  {
    id: 'q-6',
    moduleId: 'modul-2',
    question: 'Kamu menyadari bahwa setiap hari Senin pagi jalan menuju sekolah selalu macet parah di pertigaan pasar karena pedagang tumpah. Karena sudah tahu hal ini berulang setiap pekan, kamu memutuskan berangkat 20 menit lebih awal setiap Senin. Pilar CT mana yang kamu terapkan?',
    options: [
      'Pengenalan Pola (Pattern Recognition)',
      'Dekomposisi',
      'Enkripsi Sandi',
      'Penghapusan Data'
    ],
    correctIndex: 0,
    explanation: 'Mengamati keteraturan peristiwa yang berulang setiap hari Senin dan memanfaatkannya untuk mengambil tindakan antisipatif adalah Pengenalan Pola.',
    difficulty: 'Mudah'
  },
  {
    id: 'q-7',
    moduleId: 'modul-2',
    question: 'Ketika membaca denah evakuasi kebakaran di lorong sekolah SMP, denah tersebut hanya menggambarkan lorong, pintu darurat, dan tangga turun, tanpa menggambarkan pot bunga atau poster dinding. Mengapa detail poster dan pot diabaikan?',
    options: [
      'Karena arsiteknya lupa menggambar.',
      'Penerapan Abstraksi: menyaring detail yang tidak penting agar orang dapat fokus pada jalur evakuasi keselamatan.',
      'Karena cat poster terlalu mahal untuk dicetak.',
      'Supaya ukuran kertas denah menjadi berat.'
    ],
    correctIndex: 1,
    explanation: 'Abstraksi membuang detail yang tidak esensial (seperti hiasan dinding/pot) sehingga fokus utama (jalur keluar darurat) terlihat sangat jelas.',
    difficulty: 'Sedang'
  },
  {
    id: 'q-8',
    moduleId: 'modul-2',
    question: 'Manakah di bawah ini yang merupakan contoh Algoritma dalam kehidupan sehari-hari?',
    options: [
      'Foto pemandangan gunung saat liburan semester.',
      'Daftar resep langkah demi langkah membuat puding cokelat dari menyiapkan panci hingga menyajikan di piring.',
      'Suara lonceng istirahat sekolah berbunyi.',
      'Tumpukan buku pelajaran acak di dalam tas.'
    ],
    correctIndex: 1,
    explanation: 'Resep masakan berisi langkah terurut, sistematis, dan berhingga dari bahan mentah hingga jadi makanan, merupakan bentuk algoritma nyata.',
    difficulty: 'Mudah'
  },

  // Modul 3: Instruksi & Pengujian
  {
    id: 'q-9',
    moduleId: 'modul-3',
    question: 'Pada bagan alir (flowchart), simbol berbentuk jajaran genjang (parallelogram) digunakan untuk mewakili...',
    options: [
      'Titik Awal (Start) atau Titik Akhir (Stop)',
      'Proses Input (memasukkan data) atau Output (menampilkan hasil)',
      'Pengambilan Keputusan Ya / Tidak',
      'Garis penghubung antar komputer'
    ],
    correctIndex: 1,
    explanation: 'Jajaran genjang adalah simbol standar flowchart untuk operasi Input dan Output (misal: "Masukkan PIN", "Tampilkan Saldo").',
    difficulty: 'Sedang',
    hint: 'Bentuk persegi panjang untuk proses, jajaran genjang untuk input/output.'
  },
  {
    id: 'q-10',
    moduleId: 'modul-3',
    question: 'Dalam penelusuran meja (dry run), seorang programmer menemukan instruksi: [Jika lampu_merah MAKA terus_melaju; LAINNYA berhenti]. Kesalahan logika ini disebut...',
    options: [
      'Algoritma sempurna',
      'Bug (kesalahan logika/aturan)',
      'Data kuantitatif',
      'Dekomposisi modular'
    ],
    correctIndex: 1,
    explanation: 'Instruksi tersebut terbalik logikanya (saat lampu merah malah disuruh melaju). Ini adalah BUG logika yang sangat berbahaya jika diterapkan pada mobil otonom!',
    difficulty: 'Mudah'
  },
  {
    id: 'q-11',
    moduleId: 'modul-3',
    question: 'Diberikan instruksi robot: [Maju 1], [Maju 1], [Belok Kanan], [Maju 1]. Jika robot awalnya di titik (0,0) menghadap ke Utara, ke arah manakah robot sekarang menghadap di akhir instruksi?',
    options: [
      'Utara',
      'Timur',
      'Selatan',
      'Barat'
    ],
    correctIndex: 1,
    explanation: 'Awalnya menghadap Utara. Setelah perintah "Belok Kanan" (90 derajat searah jarum jam), arah hadap robot menjadi ke arah TIMUR.',
    difficulty: 'Sedang'
  },
  {
    id: 'q-12',
    moduleId: 'modul-3',
    question: 'Mengapa kita perlu melakukan penelusuran meja (Dry Run) dengan data uji sebelum memprogram komputer atau robot sungguhan?',
    options: [
      'Agar bisa menghabiskan kertas dan tinta bolpoin.',
      'Untuk menguji kebenaran alur logika instruksi dan mendeteksi bug tanpa risiko merusak perangkat keras robot di lapangan.',
      'Karena komputer tidak boleh dinyalakan sebelum siang hari.',
      'Supaya robot menjadi bisa berbicara sendiri.'
    ],
    correctIndex: 1,
    explanation: 'Dry run mencegah kesalahan fatal di lapangan dengan memverifikasi setiap langkah secara aman dan murah di atas kertas terlebih dahulu.',
    difficulty: 'Sedang'
  }
];

export const EDUCATIONAL_VIDEOS: EducationalVideo[] = [
  {
    id: 'vid-1',
    moduleId: 'modul-1',
    title: 'Petualangan Detektif Data di Sekolah',
    durationSec: 90,
    thumbnail: '/src/assets/images/clay_data_management_1790910820802.jpg',
    description: 'Saksikan bagaimana Rian dan Salsa menyelidiki sampah plastik kantin dengan tabel frekuensi dan mengubahnya menjadi diagram batang yang memukau!',
    scenes: [
      {
        timeSec: 0,
        title: 'Adegan 1: Gunung Sampah Kantin Sekolah',
        description: 'Rian dan Salsa melihat tempat sampah kantin meluap di jam istirahat kedua.',
        narration: '"Wah, banyak sekali sampah berserakan! Tapi jenis sampah mana ya yang paling banyak? Kita tidak bisa hanya menebak-nebak, kita butuh DATA!"',
        visualType: 'data-chart'
      },
      {
        timeSec: 30,
        title: 'Adegan 2: Melakukan Tally & Tabel Frekuensi',
        description: 'Siswa mengumpulkan 100 sampel sampah dan mencatatnya ke dalam tabel frekuensi.',
        narration: '"Kita buat tabel frekuensi: Botol Plastik ada 45 buah, Gelas Teh ada 35 buah, dan Kertas Bungkus ada 20 buah. Data mentah kita mulai tertata!"',
        visualType: 'data-chart',
        checkpointQuestion: {
          question: 'Berapa persen proporsi botol plastik dari total 100 sampel sampah yang dihitung Rian?',
          options: ['20%', '35%', '45%', '80%'],
          correctIndex: 2,
          explanation: 'Hebat! 45 dari 100 sampel sama dengan 45/100 atau 45%.',
          points: 15
        }
      },
      {
        timeSec: 60,
        title: 'Adegan 3: Menghidupkan Diagram Batang Solusi',
        description: 'Grafik batang diproyeksikan ke papan tulis interaktif, memudahkan Kepala Sekolah mengambil kebijakan dispenser air gratis.',
        narration: '"Dengan melihat diagram batang ini, Kepala Sekolah langsung menyetujui program botol tumbler isi ulang. Data terbukti memecahkan masalah nyata!"',
        visualType: 'data-chart'
      }
    ]
  },
  {
    id: 'vid-2',
    moduleId: 'modul-2',
    title: 'Misi Jalur Cerdas: 4 Fondasi Berpikir Komputasional',
    durationSec: 90,
    thumbnail: '/src/assets/images/clay_problem_solving_1790910834668.jpg',
    description: 'Ikuti perjalanan tim siswa SMP merancang rute teraman dan tercepat ke sekolah saat musim hujan menggunakan 4 pilar komputasi.',
    scenes: [
      {
        timeSec: 0,
        title: 'Adegan 1: Dekomposisi Rintangan',
        description: 'Banjir menggenangi jalan utama ke SMP. Masalah dipecah menjadi titik genangan, alternatif jalan tikus, dan waktu berangkat.',
        narration: '"Jangan panik! Gunakan Dekomposisi: kita pecah masalah jadi 3 hal: kedalaman genangan, rute alternatif jalan setapak, dan estimasi waktu."',
        visualType: 'four-pillars'
      },
      {
        timeSec: 30,
        title: 'Adegan 2: Pola & Abstraksi Peta',
        description: 'Mengidentifikasi bahwa air surut setelah pukul 06.30 dan membuang detail bangunan yang tidak penting pada peta.',
        narration: '"Pola menunjukkan jam 06.30 air selalu surut 10 cm. Dan dengan Abstraksi, kita hanya fokus pada jembatan penyeberangan orang, bukan warna cat ruko!"',
        visualType: 'four-pillars',
        checkpointQuestion: {
          question: 'Mengapa siswa mengabaikan warna cat ruko saat membuat peta rute darurat?',
          options: [
            'Karena warna cat adalah detail yang tidak relevan dengan keselamatan jalan (Abstraksi).',
            'Karena tidak ada spidol warna di kelas.',
            'Karena semua ruko belum dicat.',
            'Karena warna cat mempengaruhi kecepatan lari.'
          ],
          correctIndex: 0,
          explanation: 'Tepat! Abstraksi menyaring hal yang tidak berpengaruh pada solusi utama.',
          points: 15
        }
      },
      {
        timeSec: 60,
        title: 'Adegan 3: Algoritma Langkah Demi Langkah Tiba Tepat Waktu',
        description: 'Seluruh siswa kelas 7 berhasil sampai ke gerbang sekolah sebelum bel masuk dengan selamat.',
        narration: '"Dengan algoritma 4 langkah yang rapi, seluruh siswa tiba dengan seragam bersih tepat pukul 06.50 WIB. Kemenangan berpikir komputasional!"',
        visualType: 'four-pillars'
      }
    ]
  },
  {
    id: 'vid-3',
    moduleId: 'modul-3',
    title: 'Lab Debugging: Menjinakkan Robot Pemilah Sampah',
    durationSec: 90,
    thumbnail: '/src/assets/images/clay_robot_instruction_1790910847923.jpg',
    description: 'Bagaimana jika robot pemilah sampah malah membuang buku catatan ke tong sampah? Ayo cari bug instruksinya bersama-sama!',
    scenes: [
      {
        timeSec: 0,
        title: 'Adegan 1: Si Robot Yang Salah Langkah',
        description: 'Robot bernama RoboBot memutar badan ke arah dinding dan menabrak tong air.',
        narration: '"Aduh! RoboBot menabrak! Padahal robot hanya menjalankan instruksi manusia. Pasti ada bug urutan perintah di programnya!"',
        visualType: 'robot-grid'
      },
      {
        timeSec: 30,
        title: 'Adegan 2: Penelusuran Meja (Dry Run Tracing)',
        description: 'Siswa memeriksa baris demi baris perintah di laptop mereka.',
        narration: '"Mari lakukan Dry Run. Baris 1: Maju 2 langkah. Baris 2: Belok Kanan. Lho! Seharusnya Belok KIRI karena pintu lab di sebelah kiri!"',
        visualType: 'robot-grid',
        checkpointQuestion: {
          question: 'Apa istilah untuk kegiatan mencari dan memperbaiki kesalahan dalam instruksi program?',
          options: ['Encoding', 'Debugging', 'Download', 'Format Ulang'],
          correctIndex: 1,
          explanation: 'Benar! Debugging adalah proses menemukan dan memperbaiki bug kesalahan instruksi.',
          points: 15
        }
      },
      {
        timeSec: 60,
        title: 'Adegan 3: Uji Coba Sukses & Bintang Emas',
        description: 'RoboBot berhasil mengambil kaleng bekas dan memasukkannya ke tong daur ulang dengan presisi.',
        narration: '"Bug teratasi! RoboBot meluncur mulus dan berhasil memasukkan sampah ke tempatnya. Menguji instruksi adalah kunci keberhasilan rekayasa!"',
        visualType: 'robot-grid'
      }
    ]
  }
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    moduleId: 'modul-1',
    title: 'Bagaimana cara membedakan data kuantitatif vs kualitatif di survei kantin?',
    content: 'Halo teman-teman kelas 7! Kelompok kami sedang mendata kantin sehat. Kalau kami mencatat "Tingkat kepedasan sambal: Pedas Sekali, Sedang, Tidak Pedas", itu masuk kuantitatif atau kualitatif ya? Mohon pencerahannya.',
    authorName: 'Dimas Prasetyo',
    authorAvatar: '👦🏻',
    authorSchool: 'SMP Negeri 1 Surabaya',
    timestamp: '2 jam yang lalu',
    likes: 8,
    tags: ['Pengelolaan Data', 'Kualitatif', 'Kuesioner'],
    comments: [
      {
        id: 'c-1',
        authorName: 'Bu Erna (Guru Informatika)',
        authorAvatar: '👩🏻‍🏫',
        authorRole: 'Guru Pembimbing',
        timestamp: '1 jam yang lalu',
        content: 'Pertanyaan bagus sekali Dimas! "Pedas sekali, Sedang, Tidak pedas" adalah data Kualitatif karena berupa kategori sifat, bukan angka ukur pasti. Jika kamu ubah jadi skala angka 1-5 atau jumlah gram cabai, baru bisa diolah sebagai data kuantitatif.',
        likes: 12,
        isHelpful: true
      },
      {
        id: 'c-2',
        authorName: 'Annisa Fitri',
        authorAvatar: '👧🏻',
        authorRole: 'Siswa',
        timestamp: '45 menit yang lalu',
        content: 'Terima kasih Bu Erna dan Dimas! Kelompokku jadi paham juga untuk angket tugas kelompok besok.',
        likes: 4
      }
    ]
  },
  {
    id: 'post-2',
    moduleId: 'modul-2',
    title: 'Contoh Dekomposisi dalam piket kebersihan kelas yang efektif?',
    content: 'Di kelasku 7B sering bertengkar saat jadwal piket pulang sekolah karena semua ingin menyapu dan tidak ada yang mau mengelap kaca atau buang sampah ke TPA. Bisakah kita selesaikan dengan dekomposisi?',
    authorName: 'Rifki Pratama',
    authorAvatar: '🧑🏽',
    authorSchool: 'SMP Cendekia Mandiri',
    timestamp: '5 jam yang lalu',
    likes: 14,
    tags: ['Pemecahan Masalah', 'Dekomposisi', 'Piket Kelas'],
    comments: [
      {
        id: 'c-3',
        authorName: 'Nadia Salsabila',
        authorAvatar: '🧕🏼',
        authorRole: 'Tutor Sebaya',
        timestamp: '3 jam yang lalu',
        content: 'Bisa banget Rifki! Langkah dekomposisi: 1. Dekomposisi tugas ruang (Zona Papan Tulis, Zona Lantai, Zona Kaca, Zona Sampah). 2. Dekomposisi waktu (10 menit pertama sampai 10 menit selesai). 3. Buat sistem rotasi harian dengan algoritma adil!',
        likes: 9,
        isHelpful: true
      }
    ]
  },
  {
    id: 'post-3',
    moduleId: 'modul-3',
    title: 'Kenapa simbol Terminator di Flowchart harus lonjong (oval)?',
    content: 'Teman-teman, apakah boleh kalau tombol START di flowchart digambar dengan kotak biasa persegi panjang? Apakah komputer bisa salah mengerti?',
    authorName: 'Kevin Wijaya',
    authorAvatar: '🧑🏻',
    authorSchool: 'SMP Jaya Pratama',
    timestamp: 'Kemarin',
    likes: 6,
    tags: ['Pengujian Instruksi', 'Flowchart', 'Simbol'],
    comments: [
      {
        id: 'c-4',
        authorName: 'Bu Erna (Guru Informatika)',
        authorAvatar: '👩🏻‍🏫',
        authorRole: 'Guru Pembimbing',
        timestamp: 'Kemarin',
        content: 'Halo Kevin! Secara standar internasional ISO/ANSI, bentuk oval dikhususkan untuk Terminator (Awal/Akhir) agar siapa pun yang membaca langsung tahu di mana titik mula dan titik henti program tanpa tertukar dengan kotak proses perhitungan. Ini menjaga konsistensi komunikasi!',
        likes: 15,
        isHelpful: true
      }
    ]
  }
];

export const SYSTEM_BADGES: Badge[] = [
  {
    id: 'badge-data',
    name: 'Pakar Data Kantin',
    description: 'Menyelesaikan modul dan latihan Pengelolaan Data dalam Kehidupan.',
    iconName: 'BarChart3',
    pointsRequired: 50,
    unlocked: false
  },
  {
    id: 'badge-problem',
    name: 'Detektif 4 Pilar',
    description: 'Memahami Dekomposisi, Pola, Abstraksi, dan Algoritma secara tuntas.',
    iconName: 'Puzzle',
    pointsRequired: 120,
    unlocked: false
  },
  {
    id: 'badge-debugger',
    name: 'Penakluk Bug Robot',
    description: 'Berhasil menguji simulator instruksi robot tanpa menabrak rintangan.',
    iconName: 'Terminal',
    pointsRequired: 200,
    unlocked: false
  },
  {
    id: 'badge-quiz-champ',
    name: 'Bintang Kuis Komputasi',
    description: 'Meraih skor sempurna dalam kuis tantangan berpikir komputasional.',
    iconName: 'Trophy',
    pointsRequired: 280,
    unlocked: false
  },
  {
    id: 'badge-forum',
    name: 'Pemberi Inspirasi Sebaya',
    description: 'Aktif berdiskusi dan berbagi ide solutif di forum siswa kelas 7.',
    iconName: 'MessageSquare',
    pointsRequired: 350,
    unlocked: false
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'u-1',
    name: 'Farhan Maulana',
    avatar: '👦🏽',
    school: 'SMP Negeri 7 Bandung',
    expPoints: 480,
    level: 4,
    badgesCount: 5
  },
  {
    id: 'u-2',
    name: 'Nadia Salsabila',
    avatar: '🧕🏼',
    school: 'SMP Negeri 1 Yogyakarta',
    expPoints: 420,
    level: 4,
    badgesCount: 4
  },
  {
    id: 'u-3',
    name: 'Rizky Alamsyah',
    avatar: '🧑🏻',
    school: 'SMP Labschool Jakarta',
    expPoints: 340,
    level: 3,
    badgesCount: 3
  },
  {
    id: 'u-4',
    name: 'Kamu (Siswa Kelas 7)',
    avatar: '🚀',
    school: 'SMP Indonesia Hebat',
    expPoints: 100,
    level: 1,
    badgesCount: 1,
    isCurrentUser: true
  },
  {
    id: 'u-5',
    name: 'Siti Rahmawati',
    avatar: '👧🏻',
    school: 'SMP Negeri 2 Semarang',
    expPoints: 95,
    level: 1,
    badgesCount: 1
  }
];
