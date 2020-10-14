function updateDropDown() {

    var province_arr = new Array("Select Province", "Abra", "Agusan del Norte", "Agusan del Sur", "Aklan", "Albay", "Antique", "Apayao", "Aurora", "Basilan", "Bataan", "Batanes", "Batangas", "Benguet", "Biliran", "Bohol", "Bukidnon", "Bulacan", "Cagayan", "Camarines Norte", "Camarines Sur", "Camiguin", "Capiz", "Catanduanes", "Cavite", "Cebu", "Compostela Valley", "Cotabato", "Davao del Norte", "Davao del Sur", "Davao Occidental", "Davao Oriental", "Dinagat Islands", "East Samar", "Guimaras", "Ifugao", "Ilocos Norte", "Ilocos Sur", "Iloilo", "Isabela", "Kalinga", "La Union", "Laguna", "Lanao del Norte", "Lanao del Sur", "Leyte", "Maguindanao", "Marinduque", "Masbate", "Metro Manila", "Misamis Occidental", "Misamis Oriental", "Mountain Province", "Negros Occidental", "Negros Oriental", "North Samar", "Nueva Ecija", "Nueva Vizcaya", "Occidental Mindoro", "Oriental Mindoro", "Palawan", "Pampanga", "Pangasinan", "Quezon", "Quirino", "Rizal", "Romblon", "Samar", "Sarangani", "Siquijor", "Sorsogon", "South Cotabato", "South Leyte", "Sultan Kudarat", "Sulu", "Surigao del Norte", "Surigao del Sur", "Tarlac", "Tawi-Tawi", "Zambales", "Zamboanga del Norte", "Zamboanga del Sur", "Zamboanga Sibugay");

    var s_a = new Array();
    s_a[0] = "";
    s_a[1] = ["", "Bangued", "Boliney", "Bucay", "Bucloc", "Daguioman", "Danglas", "Dolores", "La Paz", "Lacub", "Lagangilang", "Lagayan", "Langiden", "Licuan-Baay", "Luba", "Malibcong", "Manabo", "Penarrubia", "Pidigan", "Pilar", "Sallapadan", "San Isidro", "San Juan", "San Quintin", "Tayum", "Tineg", "Tubo", "Villaviciosa"];
    s_a[2] = ["", "Butuan City", "Cabadbaran City", "Buenavista", "Carmen", "Jabonga", "Kitcharao", "Las Nieves", "Magallanes", "Nasipit", "Remedios T. Romualdez", "Santiago", "Tubay"];
    s_a[3] = ["", "Bayugan City", "Bunawan", "Esperanza", "La Paz", "Loreto", "Prosperidad", "Rosario", "San Francisco", "San Luis", "Santa Josefa", "Sibagat", "Talacogon", "Trento", "Veruela"];
    s_a[4] = ["", "Altavas", "Balete", "Banga", "Batan", "Buruanga", "Ibajay", "Kalibo", "Lezo", "Libacao", "Madalag", "Makato", "Malay", "Malinao", "Nabas", "New Washington", "Numancia", "Tangalan"];
    s_a[5] = ["", "Bacacay", "Camalig", "Daraga", "Guinobatan", "Jovellar", "Legazpi City", "Libon", "Ligao City", "Malilipot", "Malinao", "Manito", "Oas", "Pio Duran", "Polangui", "Rapu-Rapu", "Santo Domingo", "Tabaco City", "Tiwi"];
    s_a[6] = ["", "Anini-y", "Barbaza", "Belison", "Bugasong", "Caluya", "Culasi", "Hamtic", "Laua-an", "Libertad", "Pandan", "Patnongon", "San Jose de Buenavista", "San Remigio", "Sebaste", "Sibalom", "Tibiao", "Tobias Fornier", "Valderrama"];
    s_a[7] = ["", "Calanasan (Bayag)", "Connor Franta", "Flora", "Kabugao", "Luna (Macatel)", "Pudtol", "Santa Marcela", "Calanasan (Bayag)", "Connor Franta"];
    s_a[8] = ["", "Baler", "Casiguran", "Dilasag", "Dinalungan", "Dingalan", "Dipaculao", "Maria Aurora", "San Luis"];
    s_a[9] = ["", "Akbar", "Al-Barka", "Hadji Mohammad Ajul", "Hadji Muhtamad", "Isabela City", "Lamitan City", "Lantawan", "Maluso", "Sumisip", "Tabuan-Lasa", "Tipo-Tipo", "Tuburan", "Ungkaya Pukan"];
    s_a[10] = ["", "Balanga", "Abucay", "Bagac", "Dinalupihan", "Hermosa", "Limay", "Mariveles", "Morong", "Orani", "Orion", "Pilar", "Samal"];
    s_a[11] = ["", "Basco", "Itbayat", "Ivana", "Mahatao", "Sabtang", "Uyugan"];
    s_a[12] = ["", "Batangas City", "Lipa City", "Tanauan City", "Agoncillo", "Alitagtag", "Balayan", "Balete", "Bauan", "Calaca", "Calatagan", "Cuenca", "Ibaan", "Laurel", "Lemery", "Lian", "Lobo", "Mabini", "Malvar", "Mataasnakahoy", "Nasugbu", "Padre Garcia", "Rosario", "San Jose", "San Juan", "San Luis", "San Nicolas", "San Pascual", "Santa Teresita", "Santo Tomas", "Taal", "Talisay", "Taysan", "Tingloy", "Tuy"];
    s_a[13] = ["", "Adaoay", "Ambuklao", "Ampusongan", "Atok", "Baguio", "Balakbak", "Bokod", "Buguias", "Daclan", "Galiano", "Itogon", "Kabayan", "Kapangan", "Kibungan", "La Trinidad", "Loo", "Palina", "Sablan", "Tublay"];
    s_a[14] = ["", "Almeria", "Biliran", "Cabucgayan", "Caibiran", "Culaba", "Kawayan", "Maripipi", "Naval"];
    s_a[15] = ["", "Alicia", "Bagatusan", "Bagong Banwa", "Balicasag", "Banacon", "Banbanan", "Bansaan", "Batasan", "Bay Sa Owak", "Bilangbilangan", "Bonbon", "Bosaan", "Buabuahan", "Bugatusan", "Busalian", "Cabilao", "Cabul-an", "Cabantulan", "Cabgan", "Calangaman", "Cancoslino", "Calituban", "Cataban", "Catang", "Cati-il", "Cuaming", "Danajon", "Gak-ang", "Gaus", "Guindacpan", "Hambongan", "Hingutanan", "Inanoran", "Jaguliao", "Jandayan", "Jao", "Juagdan", "Lapinig", "Lapinin", " Chico", "Limasoc", "Lumislis", "Ma-agpit", "Mahanay", "Makaina", "Makalingao", "Malingin", "Mantatao Daku", "Mantatao Gamay", "Maomauan", "Maubay", "Mocaboc", "Nasingin", "Nocnocan", "Pamasaun", "Pamilacan", "Pandanon", "Pandao", "Pangangan", "Pangapasan", "Panglao", "Pinango", "Potohan", "Pungtud", "Saag", "Sagasa", "Sandingan", "Sentingnenay", "Silo", "Sinandigan", "Tabangdio", "Talibon", "Talimobo", "Tambo", "Tangtaang", "Tintinan", "Tumok"];
    s_a[16] = ["", "Baungon", "Cabanglasan", "Damulog", "Dangcagan", "Don Carlos", "Impasugong", "Kadingilan", "Kalilangan", "Kibawe", "Kitaotao", "Lantapan", "Libona", "Malaybalay City", "Malitbog", "Manolo Fortich", "Maramag", "Pangantucan", "Quezon", "San Fernando", "Sumilao", "Talakag", "Valencia City"];
    s_a[17] = ["", "San Jose del Monte City", "Meycauayan City", "Malolos City", "Santa Maria", "Marilao", "Norzagaray", "Baliuag", "Guiguinto", "Pulilan", "San Miguel", "Bocaue", "Plaridel", "Hagonoy", "Calumpit", "San Ildefonso", "San Rafael", "Balagtas", "Dona Remedios Trinidad", "Bulakan", "Obando", "Angat", "Bustos", "Pandi", "Paombong"];
    s_a[18] = ["", "Tuguegarao City", "Abulug", "Alcala", "Allacapan", "Amulung", "Aparri", "Baggao", "Ballesteros", "Buguey", "Calayan", "Camalaniugan", "Claveria", "Enrile", "Gattaran", "Gonzaga", "Iguig", "Lal-Lo", "Lasam", "Pamplona", "Penablanca", "Piat", "Rizal", "Sanchez-Mira", "Santa Ana", "Santa Praxedes", "Santa Teresita", "Santo Nino (Faire)", "Solana", "Tuao"];
    s_a[19] = ["", "Basud", "Capalonga", "Daet (capital town)", "Jose Panganiban", "Labo", "Mercedes", "Paracale", "San Lorenzo Ruiz", "San Vicente", "Santa Elena", "Talisay", "Vinzons"];
    s_a[20] = ["", "Baao", "Balatan", "Bato", "Bombon", "Buhi", "Bula", "Cabusao", "Calabanga", "Camaligan", "Canaman", "Caramoan", "Del Gallego", "Gainza", "Garchitorena", "Goa", "Iriga City", "Lagonoy", "Libmanan", "Lupi", "Magarao", "Milaor", "Minalabac", "Nabua", "Naga City", "Ocampo", "Pamplona", "Pasacao", "Pili", "Presentacion", "Ragay", "Sagnay", "San Fernando", "San Jose", "Sipocot", "Siruma", "Tigaon", "Tinambac"];
    s_a[21] = ["", "Catarman", "Guinsiliban", "Mahinog", "Mambajao", "Sagay"];
    s_a[22] = ["", "Cuartero", "Dao", "Dumalag", "Dumarao", "Ivisan", "Jamindan", "Maayon", "Mambusao", "Panay", "Panitan", "Pilar", "Pontevedra", "President Roxas", "Roxas City", "Sapian", "Sigma", "Tapaz"];
    s_a[23] = ["", "Bagamanoc", "Baras", "Bato", "Caramoran", "Gigmoto", "Pandan", "Panganiban (Payo)", "San Andres (Calolbon)", "San Miguel", "Viga", "Virac"];
    s_a[24] = ["", "Bacoor", "Cavite City", "Dasmarinas", "Imus", "Tagaytay", "Trece Martires", "Alfonso", "Amadeo", "Carmona", "General Emilio Aguinaldo", "General Mariano Alvarez", "General Trias", "Indang", "Kawit", "Magallanes", "Maragondon", "Mendez", "Naic", "Noveleta", "Rosario", "Silang", "Tanza", "Ternate"];
    s_a[25] = ["", "Danao City", "Danao City", "Talisay City", "Toledo City", "Bogo City", "Carcar City", "Naga City", "Alcantara", "Alcoy", "Alegria", "Aloguinsan", "Argao", "Asturias", "Badian", "Balamban", "Bantayan", "Barili", "Boljoon", "Borbon", "Carmen", "Catmon", "Compostela", "Consolacion", "Cordova", "Daanbantayan", "Dalaguete", "Dumanjug", "Ginatilan", "Liloan", "Madridejos", "Malabuyoc", "Medellin", "Minglanilla", "Moalboal", "Oslob", "Pilar", "Pinamungajan", "Poro", "Ronda", "Samboan", "San Fernando", "San Francisco", "San Remigio", "Santa Fe", "Santander", "Sibonga", "Sogod", "Tabogon", "Tabuelan", "Tuburan", "Tudela"];
    s_a[26] = ["", "Compostela", "Laak", "Mabini", "Maco", "Maragusan", "Mawab", "Monkayo", "Montevista", "Nabunturan", "New Bataan", "Pantukan"];
    s_a[27] = ["", "Alamada", "Aleosan", "Antipas", "Arakan", "Banisilan", "Carmen", "Kabacan", "Kidapawan City", "Libungan", "Magpet", "Makilala", "Matalam", "Midsayap", "M'lang", "Pigcawayan", "Pikit", "President Roxas", "Tulunan"];
    s_a[28] = ["", "Bayugan City", "Bunawan", "Esperanza", "La Paz", "Loreto", "Prosperidad", "Rosario", "San Francisco", "San Luis", "Santa Josefa", "Sibagat", "Talacogon", "Trento", "Veruela"];
    s_a[29] = ["", "Davao City", "Digos City", "Bansalan", "Hagonoy", "Kiblawan", "Magsaysay", "Malalag", "Matanao", "Padada", "Santa Cruz", "Sulop"];
    s_a[30] = ["", "Don Marcelino", "Jose Abad Santos", "Malita", "Santa Maria", "Sarangani"];
    s_a[31] = ["", "Mati City", "Baganga", "Banaybanay", "Boston", "Caraga", "Cateel", "Governor Generoso", "Lupon", "Manay", "San Isidro", "Tarragona"];
    s_a[32] = ["", "Basilisa (Rizal)", "Cagdianao", "Dinagat", "Libjo (Albor)", "Loreto", "San Jose", "Tubajon"];
    s_a[33] = ["", "Borongan City", "Arteche", "Balangiga", "Balangkayan", "Can-avid", "Dolores", "General MacArthur", "Giporlos", "Guiuan", "Hernani", "Jipapad", "Lawaan", "Llorente", "Maslog", "Maydolong", "Mercedes", "Oras", "Quinapondan", "Salcedo", "San Julian", "San Policarpo", "Sulat", "Taft"];
    s_a[34] = ["", "Buenavista", "Jordan", "Nueva Valencia", "San Lorenzo", "Sibunag"];
    s_a[35] = ["", "Aguinaldo", "Alfonso Lista (Potia)", "Asipulo", "Banaue", "Hingyon", "Hungduan", "Kiangan", "Lagawe", "Lamut", "Mayoyao", "Tinoc"];
    s_a[36] = ["", "Adams", "Bacarra", "Badoc", "Bangui", "Banna (Espiritu)", "Batac City", "Burgos", "Carasi", "Currimao", "Dingras", "Dumalneg", "Laoag City", "Marcos", "Nueva Era", "Pagudpud", "Paoay", "Pasuquin", "Piddig", "Pinili", "San Nicolas", "Sarrat", "Solsona", "Vintar"];
    s_a[37] = ["", "Vigan City", "Candon City", "Alilem", "Banayoyo", "Bantay", "Burgos", "Cabugao", "Caoayan", "Cervantes", "Galimuyod", "Gregorio del Pilar (Concepcion)", "Lidlidda", "Magsingal", "Nagbukel", "Narvacan", "Quirino (Angaki)", "Salcedo (Baugen)", "San Emilio", "San Esteban", "San Ildefonso", "San Juan (Lapog)", "San Vicente", "Santa", "Santa Catalina", "Santa Cruz", "Santa Lucia", "Santa Maria", "Santiago", "Santo Domingo", "Sigay", "Sinait", "Sugpon", "Suyo", "Tagudin"];
    s_a[38] = ["", "Ajuy", "Alimodian", "Anilao", "Badiangan", "Balasan", "Banate", "Barotac Nuevo", "Barotac Viejo", "Batad", "Bingawan", "Cabatuan", "Calinog", "Carles", "Concepcion", "Dingle", "Dueas", "Dumangas", "Estancia", "Guimbal", "Igbaras", "Janiuay", "Lambunao", "Leganes", "Lemery", "Leon", "Maasin", "Miagao", "Mina", "New Lucena", "Oton", "Passi City", "Pavia", "Pototan", "San Dionisio", "San Enrique", "San Joaquin", "San Miguel", "San Rafael", "Santa Barbara", "Sara", "Tigbauan", "Tubungan", "Zarraga"];
    s_a[39] = ["", "Cauayan City", "Ilagan City", "Santiago City", "Alicia", "Angadanan", "Aurora", "Benito", " Soliven", "Burgos", "Cabagan", "Cabatuan", "Cordon", "Delfin", "Albano", "Dinapigue", "Divilacan", "Echague", "Gamu", "Jones", "Luna", "Maconacon", "Mallig", "Naguilian", "Palanan", "Quezon", "Quirino", "Ramon", "Reina Mercedes", "Roxas", "San Agustin", "San Guillermo", "San Isidro", "San Manuel", "San Mariano", "San Mateo", "San Pablo", "Santa Maria", "Santo Tomas", "Tumauini"];
    s_a[40] = ["", "Tabuk", "Balbalan", "Lubuagan", "Pasil", "Pinukpuk", "Rizal (Liwan)", "Tanudan", "Tinglayan"];
    s_a[41] = ["", "San Fernando City", "Agoo", "Aringay", "Bacnotan", "Bagulin", "Balaoan", "Bangar", "Bauang", "Burgos", "Caba", "Luna", "Naguilian", "Pugo", "Rosario", "San Gabriel", "San Juan", "Sto. Tomas", "Santol", "Sudipen", "Tubao"];
    s_a[42] = ["", "Binan", "Cabuyao", "Calamba", "San Pablo", "San Pedro", "Santa Rosa", "Alaminos", "Bay", "Calauan", "Cavinti", "Famy", "Kalayaan", "Liliw", "Los Banos", "Luisiana", "Lumban", "Mabitac", "Magdalena", "Majayjay", "Nagcarlan", "Paete", "Pagsanjan", "Pakil", "Pangil", "Pila", "Rizal", "Santa Cruz", "Santa Maria", "Siniloan", "Victoria"];
    s_a[43] = ["", "Bacolod", "Baloi", "Baroy", "Kapatagan", "Kauswagan", "Kolambugan", "Lala", "Linamon", "Magsaysay", "Maigo", "Matungao", "Munai", "Nunungan", "Pantao Ragat", "Pantar", "Poona Piagapo", "Salvador", "Sapad", "Sultan Naga Dimaporo (Karomatan)", "Tagoloan", "Tangcal", "Tubod"];
    s_a[44] = ["", "Marawi City", "Bacolod-Kalawi (Bacolod-Grande)", "Balabagan", "Balindong (WATO)", "Bayang", "Binidayan", "Buadiposo-Buntong", "Bubong", "Bumbaran", "Butig", "Calanogas", "Ditsaan-Ramain", "Ganassi", "Kapai", "Kapatagan", "Lumba-Bayabao", "Lumbaca-Unayan", "Lumbatan (Macadar)", "Lumbayanague (Nanagen)", "Madalum", "Madamba (Uya-an)", "Maguing", "Malabang", "Marantao (Inudaran)", "Marogong", "Masiu", "Mulondo", "Pagayawan", "Piagapo", "Picong (Sultan Gumander)", "Poona Bayabao (Gata)", "Pualas", "Saguiaran", "Sultan Dumalondong (Bacayawan)", "Tagoloan II", "Tamparan", "Taraka", "Tubaran", "Tugaya", "Wao"];
    s_a[45] = ["", "Tacloban", "Baybay", "Ormoc", "Abuyog", "Alangalang", "Albuera", "Babatngon", "Barugo", "Bato", "Burauen", "Calubian", "Capoocan", "Carigara", "Dagami", "Dulag", "Hilongos", "Hindang", "Inopacan", "Isabel", "Jaro", "Javier", "Julita", "Kananga", "La Paz", "Leyte", "MacArthur", "Mahaplag", "Matag-ob", "Matalom", "Mayorga", "Merida", "Palo", "Palompon", "Pastrana", "San Isidro", "San Miguel", "Santa Fe", "Tabango", "Tabontabon", "Tanauan", "Tolosa", "Tunga", "Villaba"];
    s_a[46] = ["", "Ampatuan:", "Barira", "Buldon", "Buluan", "Datu Abdullah Sangki", "Datu Anggal Midtimbang", "Datu Blah T. Sinsuat", "Datu Hoffer Ampatuan", "Datu Odin Sinsuat", "Datu Paglas", "Datu Piang (Dulawan)", "Datu Salibo", "Datu Saudi-Ampatuan", "Datu Unsay", "Gen. S. K. Pendatun", "Guindulungan", "Kabuntalan", "Mamasapano", "Mangudadatu", "Matanog", "Northern Kabuntalan", "Pagagawan (Datu Montawal)", "Pagalungan", "Paglat", "Pandag", "Parang", "Rajah Buayan", "Shariff Aguak (Maganoy)", "Shariff Saydona Mustapha", "South Upi", "Sultan Kudarat (Nuling)", "Sultan Mastura", "Sultan sa Barongis (Lambayong)", "Sultan Sumagka (Talitay)", "Talayan|Upi"];
    s_a[47] = ["", "Boac", "Buenavista", "Gasan", "Mogpog", "Santa Cruz", "Torrijos"];
    s_a[48] = ["", "Aroroy", "Baleno", "Balud", "Batuan", "Cataingan", "Cawayan", "Claveria", "Dimasalang", "Esperanza", "Mandaon", "Masbate City", "Milagros", "Mobo", "Monreal", "Palanas", "Pio V. Corpuz", "Placer", "San Fernando", "San Jacinto", "San Pascual", "Uson"];
    s_a[49] = ["", "Caloocan", "Las Pinas", "Makati", "Malabon", "Mandaluyong", "Manila", "Marikina", "Muntinlupa", "Navotas", "Paranaque", "Pasay", "Pasig", "Pateros", "Quezon City", "San Juan", "Taguig", "Valenzuela"];
    s_a[50] = ["", "Oroquieta City", "Ozamiz City", "Tangub City", "Aloran", "Baliangao", "Bonifacio", "Calamba", "Clarin", "Concepcion", "Don Victoriano Chiongbian", "Jimenez", "Lopez Jaena", "Panaon", "Plaridel", "Sapang Dalaga", "Sinacaban", "Tudela"];
    s_a[51] = ["", "El Salvador City", "Gingoog City", "Alubijid", "Balingasag", "Balingoan", "Binuangan", "Claveria", "Gitagum", "Initao", "Jasaan", "Kinoguitan", "Lagonglong", "Laguindingan", "Libertad", "Lugait", "Magsaysay", "Manticao", "Medina", "Naawan", "Opol", "Salay", "Sugbongcogon", "Tagoloan", "Talisayan", "Villanueva"];
    s_a[52] = ["", "Barlig", "Bauko", "Besao", "Bontoc", "Natonin", "Paracelis", "Sabangan", "Sadanga", "Sagada", "Tadian"];
    s_a[53] = ["", "Bacolod", "Bago", "Cadiz", "Escalante", "Himamaylan", "Kabankalan", "La Carlota", "Sagay", "San Carlos", "Silay", "Sipalay", "Talisay", "Victorias", "Binalbagan", "Calatrava", "Candoni", "Cauayan", "Enrique B. Magalona (Saravia)", "Hinigaran", "Hinoba-an (Asia)", "Ilog", "Isabela", "La Castellana", "Manapla", "Moises Padilla (Magallon)", "Murcia", "Pontevedra", "Pulupandan", "Salvador Benedicto", "San Enrique", "Toboso", "Valladolid"];
    s_a[54] = ["", "Bais City", "Bayawan City", "Canlaon City", "Dumaguete City", "Guihulngan City", "Tanjay City", "Amlan", "Ayungon", "Bacong", "Basay", "Bindoy", "Dauin", "Jimalalud", "La Libertad", "Mabinay", "Manjuyod", "Pamplona", "San Jose", "Santa Catalina", "Siaton", "Sibulan", "Tayasan", "Valencia", "Vallehermoso", "Zamboanguita"];
    s_a[55] = ["", "Allen", "Biri", "Bobon", "Capul", "Catarman", "Catubig", "Gamay", "Laoang", "Lapinig", "Las Navas", "Lavezares", "Lope de Vega", "Mapanas", "Mondragon", "Palapag", "Pambujan", "Rosario", "San Antonio", "San Isidro", "San Jose", "San Roque", "San Vicente", "Silvino", "Lobos", "Victoria"];
    s_a[56] = ["", "Cabanatuan City", "Gapan City", "Palayan City", "San Jose City", "Science City of Munoz", "Aliaga", "Bongabon", "Cabiao", "Carranglan", "Cuyapo", "Gabaldon", "Gen. Mamerto Natividad", "Guimba", "General Tinio", "Jaén", "Laur", "Licab", "Llanera", "Lupao", "Nampicuan", "Pantabangan", "Penaranda", "Quezon", "Rizal", "San Antonio", "San Isidro", "San Leonardo", "Santa Rosa", "Santo Domingo", "Talavera", "Talugtug", "Zaragoza"];
    s_a[57] = ["", "Alfonso Castaneda", "Ambaguio", "Aritao", "Bagabag", "Bambang", "Bayombong", "Diadi", "Dupax del Norte", "Dupax del Sur", "Kasibu", "Kayapa", "Quezon", "Santa Fe", "Solano", "Villaverde"];
    s_a[58] = ["", "Abra de Ilog", "Calintaan", "Looc", "Lubang", "Magsaysay", "Mamburao", "Paluan", "Rizal", "Sablayan", "San Jose", "Santa Cruz"];
    s_a[59] = ["", "Calapan City", "Baco", "Bansud", "Bongabong", "Bulalacao", "Gloria", "Mansalay", "Naujan", "Pinamalayan", "Pola", "Puerto Galera", "Roxas", "San Teodoro", "Socorro", "Victoria"];
    s_a[60] = ["", "Aborlan", "Agutaya", "Araceli", "Balabac", "Bataraza", "Brooke's", "Point", "Busuanga", "Cagayancillo", "Coron", "Culion", "Cuyo", "Dumaran", "El Nido", "Kalayaan", "Linapacan", "Magsaysay", "Narra", "Puerto Princesa", "Quezon", "Rizal", "Roxas", "San Vicente", "Sofronio Espanola", "Taytay"];
    s_a[61] = ["", "Angeles City", "San Fernando", "Mabalacat", "Apalit", "Arayat", "Bacolor", "Candaba", "Floridablanca", "Guagua", "Lubao", "Macabebe", "Magalang", "Masantol", "Mexico", "Minalin", "Porac", "San Luis", "San Simon", "Santa Ana", "Santa Rita", "Santo Tomas", "Sasmuan"];
    s_a[62] = ["", "Alaminos", "Dagupan", "San Carlos", "Urdaneta", "Agno", "Aguilar", "Alcala", "Anda", "Asingan", "Balungao", "Bani", "Basista", "Bautista", "Bayambang", "Binalonan", "Binmaley", "Bolinao", "Bugallon", "Burgos", "Calasiao", "Dasol", "Infanta", "Labrador", "Laoac", "Lingayen", "Mabini", "Malasiqui", "Manaoag", "Mangaldan", "Mangatarem", "Mapandan", "Natividad", "Pozorrubio", "Rosales", "San Fabian", "San Jacinto", "San Manuel", "San Nicolas", "San Quintin", "Santa Barbara", "Santa Maria", "Santo Tomas", "Sison", "Sual", "Tayug", "Umingan", "Urbiztondo", "Villasis"];
    s_a[63] = ["", "Burdeos", "General Nakar", "Infanta", "Jomalig", "Lucban", "Mauban", "Pagbilao", "Panukulan", "Patnanungan", "Polillo", "Real", "Sampaloc", "Tayabas City", "Candelaria", "Dolores", "Lucena", "City", "San Antonio", "Sariaya", "Tiaong", "Agdangan", "Buenavista", "Catanauan", "General Luna", "Macalelon", "Mulanay", "Padre Burgos", "Pitogo", "San Andres", "San Francisco", "San Narciso", "Unisan", "Alabat", "Atimonan", "Calauag", "Guinayangan", "Gumaca", "Lopez", "Perez", "Plaridel", "Quezon", "Tagkawayan"];
    s_a[64] = ["", "Aglipay", "Cabarroguis", "Diffun", "Maddela", "Nagtipunan", "Saguday"];
    s_a[65] = ["", "Angono", "Antipolo City", "Baras", "Binangonan", "Cainta", "Cardona", "Jalajala", "Morong", "Pililla", "Rodriguez (Montalban)", "San Mateo", "Tanay", "Taytay", "Teresa"];
    s_a[66] = ["", "Alcantara", "Banton", "Cajidiocan", "Calatrava", "Concepcion", "Corcuera", "Ferrol", "Looc", "Magdiwang", "Odiongan", "Romblon", "San Agustin", "San Andres", "San Fernando", "San Jose", "Santa Fe", "Santa Maria"];
    s_a[67] = ["", "Calbayog", "Catbalogan", "Almagro", "Basey", "Calbiga", "Daram", "Gandara", "Hinabangan", "Jiabong", "Marabut", "Matuguinao", "Motiong", "Pagsanghan", "Paranas (Wright)", "Pinabacdao", "San Jorge", "San Jose de Buan", "San Sebastian", "Santa Margarita", "Santa Rita", "Santo Nino", "Tagapul-an", "Talalora", "Tarangnan", "Villareal", "Zumarraga"];
    s_a[68] = ["", "Alabel", "Glan", "Kiamba", "Maasim", "Maitum", "Malapatan", "Malungon"];
    s_a[69] = ["", "Enrique Villanueva", "Larena", "Lazi", "Maria", "San Juan", "Siquijor"];
    s_a[70] = ["", "Barcelona", "Bulan", "Bulusan", "Casiguran", "Castilla", "Donsol", "Gubat", "Irosin", "Juban", "Magallanes", "Matnog", "Pilar", "Prieto Diaz", "Santa", "Magdalena", "Sorsogon City"];
    s_a[71] = ["", "General Santos", "Banga", "Koronadal", "Lake Sebu", "Norala", "Polomolok", "Sto. Nino", "Surallah", "Tampakan", "Tantangan", "T'Boli", "Tupi"];
    s_a[72] = ["", "Anahawan", "Bontoc", "Hinunangan", "Hinundayan", "Libagon", "Liloan", "Limasawa", "Maasin City", "Macrohon", "Malitbog", "Padre Burgos", "Pintuyan", "Saint Bernard", "San Francisco", "San Juan", "San Ricardo", "Silago", "Sogod", "Tomas Oppus"];
    s_a[73] = ["", "Tacurong", "Bagumbayan", "Columbio", "Esperanza", "Isulan", "Kalamansig", "Lambayong", "Lebak", "Lutayan", "Palimbang", "President Quirino", "Sen. Ninoy Aquino"];
    s_a[74] = ["", "Banguingui (Tongkil)", "Hadji Panglima Tahil (Marunggas)", "Indanan", "Jolo", "Kalingalan Caluang", "Lugus", "Luuk", "Maimbung", "Old Panamao", "Omar", "Pandami", "Panglima Estino (New Panamao)", "Pangutaran", "Parang", "Pata", "Patikul", "Siasi", "Talipao", "Tapul"];
    s_a[75] = ["", "Surigao City", "Alegria", "Bacuag", "Burgos", "Claver", "Dapa", "Del Carmen", "General Luna", "Gigaquit", "Mainit", "Malimono", "Pilar", "Placer", "San Benito", "San Francisco (Anao-Aon)", "San Isidro", "Santa Monica (Sapao)", "Sison", "Socorro", "Tagana-an", "Tubod"];
    s_a[76] = ["", "Tandag City", "Bislig City", "Barobo", "Bayabas", "Cagwait", "Cantilan", "Carmen", "Carrascal", "Cortes", "Hinatuan", "Lanuza", "Lianga", "Lingig", "Madrid", "Marihatag", "San Agustin", "San Miguel", "Tagbina", "Tago"];
    s_a[77] = ["", "Tarlac City", "Concepcion", "Capas", "Paniqui", "Gerona", "Camiling", "Bamban", "La Paz", "Victoria", "Moncada", "Santa Ignacia", "San Jose", "Mayantoc", "San Manuel", "Pura", "Ramos", "San Clemente", "Anao"];
    s_a[78] = ["", "Bongao", "Languyan", "Mapun", "Panglima Sugala", "Sapa", "Sibutu", "Simunul", "Sitangkai", "South Ubian", "Tandubas", "Turtle Islands"];
    s_a[79] = ["", "Subic", "Castillejos", "San Marcelino", "San Antonio", "San Narciso", "San Felipe", "Cabangan", "Botolan", "Iba", "Palauig", "Masinloc", "Candelaria", "Santa Cruz"];
    s_a[80] = ["", "Dapitan City", "Dipolog City", "Baliguian", "Godod", "Gutalac", "Jose Dalman (Ponot)", "Kalawit", "Katipunan", "La Libertad", "Labason", "Leon B. Postigo (Bacungan)", "Liloy", "Manukan", "Mutia", "Pinan", "Polanco", "Pres. Manuel A. Roxas", "Rizal", "Salug", "Sergio Osmena Sr.", "Siayan", "Sibuco", "Sibutad", "Sindangan", "Siocon", "Sirawai", "Tampilisan"];
    s_a[81] = ["", "Pagadian City", "Aurora", "Bayog", "Dimataling", "Dinas", "Dumalinao", "Dumingag", "Guipos", "Josefina", "Kumalarang", "Labangan", "Lakewood", "Lapuyan", "Mahayag", "Margosatubig", "Midsalip", "Molave", "Pitogo", "Ramon Magsaysay (Liargo)", "San Miguel", "San Pablo", "Sominot (Don Mariano Marcos)", "Tabina", "Tambulig", "Tigbao", "Tukuran", "Vincenzo A. Sagun"];
    s_a[82] = ["", "Alicia", "Buug", "Diplahan", "Imelda", "Ipil", "Kabasalan", "Mabuhay", "Malangas", "Naga", "Olutanga", "Payao", "Roseller T. Lim", "Siay", "Talusan", "Titay", "Tungawan"];

    for (i = 0; i < province_arr.length; i++) {
        $("select#municipality").append("<option value='" + province_arr[i] + "'>" + province_arr[i] + "</option>");
    }

    $("#municipality").on('change', function () {

        $("#city").empty();

        var index = this.value;
        var key = province_arr.indexOf(index);

        for (k = 0; k < s_a[key].length; k++) {
            $("select#city").append("<option value='" + s_a[key][k] + "'>" + s_a[key][k] + "</option>");
        }

    });

}

function GetParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
}

function decodeStr(coded) {
    var key = "SXGWLZPDOKFIVUHJYTQBNMACERxswgzldpkoifuvjhtybqmncare";
    coded = decodeURIComponent(coded);
    var uncoded = "";
    var chr;
    for (var i = coded.length - 1; i >= 0; i--) {
        chr = coded.charAt(i);
        uncoded += (chr >= "a" && chr <= "z" || chr >= "A" && chr <= "Z") ?
            String.fromCharCode(65 + key.indexOf(chr) % 26) :
            chr;
    }
    return uncoded;
}

$(document).ready(function () {

    updateDropDown();


});