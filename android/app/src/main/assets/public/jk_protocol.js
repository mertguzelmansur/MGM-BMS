/* MGM BMS – JK BMS BLE protokolü (jk_protocol.py'nin birebir JavaScript karşılığı).
   Tablolar Python sürümünden otomatik aktarılır (build_www.py). */
(function (G) {
"use strict";
const T = {"SYS_ALARMS": ["Denge kablosu direnci anormal", "MOS aşırı sıcaklık (OTP)", "Hücre sayısı anormal", "Akım sensörü anormal", "Hücre aşırı gerilim (OVP)", "Batarya aşırı gerilim (OVP)", "Şarj aşırı akım (OCP)", "Şarj kısa devre (SCP)", "Şarj aşırı sıcaklık (OTP)", "Şarj düşük sıcaklık (UTP)", "Dahili haberleşme hatası", "Hücre düşük gerilim (UVP)", "Batarya düşük gerilim (UVP)", "Deşarj aşırı akım (OCP)", "Deşarj kısa devre (SCP)", "Deşarj aşırı sıcaklık (OTP)", "Şarj MOS anormal", "Deşarj MOS anormal", "GPS bağlantısı yok", "Şifreyi hemen değiştirin", "Deşarj açılamadı", "Batarya aşırı sıcaklık", "Sıcaklık sensörü anormal", "Paralel limitör anormal", "SCP geri alma başarısız", "Deşarj OCP2", "Deşarj OCP3", "Deşarj düşük sıcaklık (UTP)", "Batarya GPS ile kilitli"], "USER_ALARMS": ["UA2 Batarya aşırı sıcaklık", "UA2 Batarya düşük sıcaklık", "UA2 Büyük sıcaklık farkı", "UA2 Hücre aşırı gerilim uyarısı", "UA2 Hücre düşük gerilim uyarısı", "UA2 Deşarj aşırı akım uyarısı", "UA2 Şarj aşırı akım uyarısı", "UA2 Sıcaklık sensörü anormal", "UA2 Şarj cihazı haberleşmesi koptu", "UA2 BMS CAN haberleşmesi koptu", "UA2 Isıtıcı rölesi anormal", "UA2 Şarj cihazı anormal", "UA2 Isıtma anormal", "UA2 Isıtıcı anormal"], "OLD_MODELS": ["JK-B1A20S15P", "JK-B1A24S-15P", "JK-B1A24S-P", "JK-B1A24S15P", "JK-B1A8S20P", "JK-B2A20S20P", "JK-B2A24S-15P", "JK-B2A24S-20P", "JK-B2A24S15P", "JK-B2A24S20P", "JK-B2A24S25P", "JK-B2A24S60P", "JK-B2A8S20P", "JK-B5A16S-60P", "JK-B5A16S60P", "JK-B5A24S60P", "JK-BD4A17S4P", "JK-BD6A17S10P", "JK-BD6A17S6P", "JK-BD6A17S8P", "JK-BD6A20S-10P", "JK-BD6A20S10P", "JK-BD6A20S15P", "JK-BD6A20S3P", "JK-BD6A20S6P", "JK-BD6A20S8P", "JK-BD6A22S15P", "JK-BD6A24S10P", "JK-BD6A24S6P", "JK-BD6A24S8P", "SQ-B1A20S15P", "SQ-B1A24S15P", "SQ-BD6A20S10P", "SQ-BD6A20S6P", "SQ-BD6A24S10P"], "SETTING_FIELDS": [[0, "Akıllı uyku gerilimi", "u32", 0.001, "V", 1200, 4400], [4, "Hücre düşük gerilim koruma (UVP)", "u32", 0.001, "V", 1200, 4400], [8, "Hücre UVP geri dönüş", "u32", 0.001, "V", 1200, 4400], [12, "Hücre aşırı gerilim koruma (OVP)", "u32", 0.001, "V", 1200, 4400], [16, "Hücre OVP geri dönüş", "u32", 0.001, "V", 1200, 4400], [20, "Denge tetikleme farkı", "u32", 0.001, "V", 3, 1000], [24, "SOC %100 gerilimi", "u32", 0.001, "V", 1200, 4400], [28, "SOC %0 gerilimi", "u32", 0.001, "V", 1200, 4400], [32, "Önerilen şarj gerilimi (RCV)", "u32", 0.001, "V", 1200, 4400], [36, "Tam şarj gerilimi (RFV)", "u32", 0.001, "V", 1200, 4400], [40, "Kapanma gerilimi", "u32", 0.001, "V", 1200, 4400], [44, "Maks. şarj akımı", "u32", 0.001, "A", 1000, 600000], [48, "Şarj OCP gecikmesi", "u32", 1, "s", 2, 600], [52, "Şarj OCP geri dönüş süresi", "u32", 1, "s", 2, 600], [56, "Maks. deşarj akımı", "u32", 0.001, "A", 1000, 2000000], [60, "Deşarj OCP gecikmesi", "u32", 1, "s", 2, 600], [64, "Deşarj OCP geri dönüş süresi", "u32", 1, "s", 2, 600], [68, "SCP geri dönüş süresi", "u32", 1, "s", 2, 600], [72, "Maks. denge akımı", "u32", 0.001, "A", 300, 15000], [76, "Şarj aşırı sıcaklık (OTP)", "s32", 0.1, "°C", 300, 800], [80, "Şarj OTP geri dönüş", "s32", 0.1, "°C", 300, 800], [84, "Deşarj aşırı sıcaklık (OTP)", "s32", 0.1, "°C", 300, 800], [88, "Deşarj OTP geri dönüş", "s32", 0.1, "°C", 300, 800], [92, "Şarj düşük sıcaklık (UTP)", "s32", 0.1, "°C", -450, 200], [96, "Şarj UTP geri dönüş", "s32", 0.1, "°C", -450, 200], [100, "MOS aşırı sıcaklık", "s32", 0.1, "°C", 300, 1100], [104, "MOS OTP geri dönüş", "s32", 0.1, "°C", 300, 1100], [108, "Hücre sayısı", "u32", 1, "", 2, 32], [112, "Şarj anahtarı", "bool", 1, "", 0, 1], [116, "Deşarj anahtarı", "bool", 1, "", 0, 1], [120, "Dengeleyici anahtarı", "bool", 1, "", 0, 1], [124, "Nominal kapasite", "u32", 0.001, "Ah", 2000, 2000000], [128, "Kısa devre gecikmesi", "u32", 1, "µs", 0, 1000000], [132, "Dengeleme başlangıç gerilimi", "u32", 0.001, "V", 1200, 4400]], "ADV_FIELDS": [{"key": "b39", "name": "Deşarjda ısıtma", "group": "Isıtma", "kind": "bit", "reg": 39}, {"key": "s278", "name": "Isıtıcı başlama sıcaklığı", "group": "Isıtma", "kind": "num", "src": "set", "off": 278, "typ": "s8", "scale": 1, "unit": "°C", "reg": 55, "ln": 1, "lo": -40, "hi": 100}, {"key": "s279", "name": "Isıtıcı durma sıcaklığı", "group": "Isıtma", "kind": "num", "src": "set", "off": 279, "typ": "s8", "scale": 1, "unit": "°C", "reg": 56, "ln": 1, "lo": -40, "hi": 100}, {"key": "s290", "name": "Deşarj düşük sıcaklık (UTP)", "group": "Sıcaklık sensörleri", "kind": "num", "src": "set", "off": 290, "typ": "s8", "scale": 1, "unit": "°C", "reg": 58, "ln": 1, "lo": -40, "hi": 100}, {"key": "s291", "name": "Deşarj UTP geri dönüş", "group": "Sıcaklık sensörleri", "kind": "num", "src": "set", "off": 291, "typ": "s8", "scale": 1, "unit": "°C", "reg": 59, "ln": 1, "lo": -40, "hi": 100}, {"key": "b40", "name": "Batarya sıcaklık sensörünü devre dışı bırak", "group": "Sıcaklık sensörleri", "kind": "bit", "reg": 40}, {"key": "b63", "name": "MOS sıcaklık sensörünü devre dışı bırak", "group": "Sıcaklık sensörleri", "kind": "bit", "reg": 63}, {"key": "b51", "name": "Deşarj aşırı akım 2 (OCP2)", "group": "Ek korumalar", "kind": "bit", "reg": 51}, {"key": "b52", "name": "Deşarj aşırı akım 3 (OCP3)", "group": "Ek korumalar", "kind": "bit", "reg": 52}, {"key": "b46", "name": "Deşarj akım sınırlayıcı", "group": "Ek korumalar", "kind": "bit", "reg": 46}, {"key": "s268", "name": "Ön deşarj süresi", "group": "Ek korumalar", "kind": "num", "src": "set", "off": 268, "typ": "u32", "scale": 1, "unit": "s", "reg": 37, "ln": 4, "lo": 0, "hi": 300}, {"key": "b44", "name": "Özel şarj cihazı", "group": "Şarj kontrolü", "kind": "bit", "reg": 44}, {"key": "b48", "name": "Şarj float modu", "group": "Şarj kontrolü", "kind": "bit", "reg": 48}, {"key": "i260", "name": "RCV süresi", "group": "Şarj kontrolü", "kind": "num", "src": "info", "off": 260, "typ": "u8", "scale": 0.1, "unit": "sa", "reg": 179, "ln": 1, "lo": 0, "hi": 250}, {"key": "i261", "name": "RFV süresi", "group": "Şarj kontrolü", "kind": "num", "src": "info", "off": 261, "typ": "u8", "scale": 0.1, "unit": "sa", "reg": 180, "ln": 1, "lo": 0, "hi": 250}, {"key": "i272", "name": "Yeniden yükleme SOC (Re-Bulk)", "group": "Şarj kontrolü", "kind": "num", "src": "info", "off": 272, "typ": "u8", "scale": 1, "unit": "%", "reg": 183, "ln": 1, "lo": 0, "hi": 50}, {"key": "e107", "name": "Acil durum modu", "group": "Alarm ve acil durum", "kind": "bit", "reg": 107}, {"key": "i263", "name": "Acil durum süresi", "group": "Alarm ve acil durum", "kind": "num", "src": "info", "off": 263, "typ": "u8", "scale": 1, "unit": "dk", "reg": 181, "ln": 1, "lo": 1, "hi": 30}, {"key": "b49", "name": "Düğme ile acil durum", "group": "Alarm ve acil durum", "kind": "bit", "reg": 49}, {"key": "b50", "name": "Aralıklı alarm", "group": "Alarm ve acil durum", "kind": "bit", "reg": 50}, {"key": "i228", "name": "LCD buzzer tetik kaynağı", "group": "Alarm ve acil durum", "kind": "select", "src": "info", "off": 228, "typ": "u8", "reg": 169, "ln": 1, "options": "TRIGGER_SOURCES"}, {"key": "i232", "name": "LCD buzzer tetik değeri", "group": "Alarm ve acil durum", "kind": "num", "src": "info", "off": 232, "typ": "s32", "scale": 1, "unit": "", "reg": 172, "ln": 4, "lo": -1410065407, "hi": 1410065407}, {"key": "i236", "name": "LCD buzzer bırakma değeri", "group": "Alarm ve acil durum", "kind": "num", "src": "info", "off": 236, "typ": "s32", "scale": 1, "unit": "", "reg": 173, "ln": 4, "lo": -1410065407, "hi": 1410065407}, {"key": "i229", "name": "Kuru kontak 1 tetik kaynağı", "group": "Kuru kontaklar", "kind": "select", "src": "info", "off": 229, "typ": "u8", "reg": 170, "ln": 1, "options": "TRIGGER_SOURCES"}, {"key": "i240", "name": "Kuru kontak 1 tetik değeri", "group": "Kuru kontaklar", "kind": "num", "src": "info", "off": 240, "typ": "s32", "scale": 1, "unit": "", "reg": 174, "ln": 4, "lo": -1410065407, "hi": 1410065407}, {"key": "i244", "name": "Kuru kontak 1 bırakma değeri", "group": "Kuru kontaklar", "kind": "num", "src": "info", "off": 244, "typ": "s32", "scale": 1, "unit": "", "reg": 175, "ln": 4, "lo": -1410065407, "hi": 1410065407}, {"key": "i230", "name": "Kuru kontak 2 tetik kaynağı", "group": "Kuru kontaklar", "kind": "select", "src": "info", "off": 230, "typ": "u8", "reg": 171, "ln": 1, "options": "TRIGGER_SOURCES"}, {"key": "i248", "name": "Kuru kontak 2 tetik değeri", "group": "Kuru kontaklar", "kind": "num", "src": "info", "off": 248, "typ": "s32", "scale": 1, "unit": "", "reg": 176, "ln": 4, "lo": -1410065407, "hi": 1410065407}, {"key": "i252", "name": "Kuru kontak 2 bırakma değeri", "group": "Kuru kontaklar", "kind": "num", "src": "info", "off": 252, "typ": "s32", "scale": 1, "unit": "", "reg": 177, "ln": 4, "lo": -1410065407, "hi": 1410065407}, {"key": "b45", "name": "Akıllı uyku", "group": "Uyku ve ekran", "kind": "bit", "reg": 45}, {"key": "s280", "name": "Akıllı uyku süresi", "group": "Uyku ve ekran", "kind": "num", "src": "set", "off": 280, "typ": "u8", "scale": 1, "unit": "sa", "reg": 57, "ln": 1, "lo": 1, "hi": 100}, {"key": "b43", "name": "LCD sürekli açık", "group": "Uyku ve ekran", "kind": "bit", "reg": 43}, {"key": "i178", "name": "UART1 (RS485) protokolü", "group": "Haberleşme (inverter)", "kind": "select", "src": "info", "off": 178, "typ": "u8", "reg": 165, "ln": 1, "options": "RS485_PROTOCOLS"}, {"key": "i212", "name": "UART2 protokolü", "group": "Haberleşme (inverter)", "kind": "select", "src": "info", "off": 212, "typ": "u8", "reg": 168, "ln": 1, "options": "RS485_PROTOCOLS"}, {"key": "i264", "name": "UART3 protokolü", "group": "Haberleşme (inverter)", "kind": "select", "src": "info", "off": 264, "typ": "u8", "reg": 182, "ln": 1, "options": "RS485_PROTOCOLS"}, {"key": "i273", "name": "UART4 protokolü", "group": "Haberleşme (inverter)", "kind": "select", "src": "info", "off": 273, "typ": "u8", "reg": 184, "ln": 1, "options": "RS485_PROTOCOLS"}, {"key": "i179", "name": "CAN protokolü", "group": "Haberleşme (inverter)", "kind": "select", "src": "info", "off": 179, "typ": "u8", "reg": 166, "ln": 1, "options": "CAN_PROTOCOLS"}, {"key": "s264", "name": "Cihaz adresi", "group": "Haberleşme (inverter)", "kind": "num", "src": "set", "off": 264, "typ": "u32", "scale": 1, "unit": "", "reg": 36, "ln": 4, "lo": 0, "hi": 999999999}, {"key": "b47", "name": "Zamanlı veri kaydı", "group": "Haberleşme (inverter)", "kind": "bit", "reg": 47}, {"key": "i256", "name": "Veri kayıt periyodu", "group": "Haberleşme (inverter)", "kind": "num", "src": "info", "off": 256, "typ": "u32", "scale": 1, "unit": "s", "reg": 178, "ln": 4, "lo": 5, "hi": 864000}, {"key": "b41", "name": "GPS kalp atışı", "group": "GPS", "kind": "bit", "reg": 41}, {"key": "b53", "name": "GPS ile şarjı kilitle", "group": "GPS", "kind": "bit", "reg": 53}, {"key": "b54", "name": "GPS ile deşarjı kilitle", "group": "GPS", "kind": "bit", "reg": 54}, {"key": "b60", "name": "KERS (rejeneratif frenleme)", "group": "Fabrika ayarları", "kind": "bit", "reg": 60, "factory": true}, {"key": "b61", "name": "Hücre gerilimi filtresi", "group": "Fabrika ayarları", "kind": "bit", "reg": 61, "factory": true}, {"key": "b62", "name": "Şarj/deşarj karşılıklı kilidi", "group": "Fabrika ayarları", "kind": "bit", "reg": 62, "factory": true}, {"key": "s272", "name": "Akım ölçüm aralığı", "group": "Fabrika ayarları", "kind": "ro", "src": "set", "off": 272, "typ": "u32", "scale": 0.001, "unit": "A"}, {"key": "i176", "name": "Bayi (distribütör) kimliği", "group": "Fabrika ayarları", "kind": "ro", "src": "info", "off": 176, "typ": "u16", "scale": 1, "unit": ""}], "RS485_PROTOCOLS": ["000 - 4G-GPS uzak modül V4.2", "001 - JK BMS RS485 Modbus V1.0", "002 - NIU U serisi", "003 - China Tower paylaşımlı kabin V1.1", "004 - PACE RS485 Modbus V1.3", "005 - PYLON düşük gerilim RS485 V3.5", "006 - Growatt BMS RS485 1xSxxP ESS Rev2.01", "007 - Voltronic inverter-BMS 485 (2020)", "008 - China Tower paylaşımlı kabin V2.0", "009 - WOW RS485 Modbus V1.3", "010 - JK BMS LCD protokolü V2.0", "011 - UART1 kullanıcı tanımlı", "012 - UART2 kullanıcı tanımlı", "013 - (9600) JK BMS RS485 Modbus V1.0", "014 - (9600) PYLON düşük gerilim RS485 V3.5", "015 - JK BMS PBxx LCD protokolü V1.0", "016 - JK BMS LIN BUS V1.0", "017 - JK aktif dengeleyici LCD V1.0", "018 - RS485 protokol 18", "019 - RS485 protokol 19", "020 - RS485 protokol 20"], "CAN_PROTOCOLS": ["000 - JK BMS CAN (250K) V2.0", "001 - Deye düşük gerilim hibrit inverter CAN V1.0", "002 - PYLON düşük gerilim V1.2", "003 - Growatt BMS CAN düşük gerilim Rev1.04", "004 - Victron CANbus BMS (2017)", "005 - MEGAREVO hibrit BMS CAN", "006 - JK BMS CAN (500K) V2.0", "007 - INVT BMS CAN V1.02", "008 - GoodWe LV BMS (EX/EM/S-BP/BP)", "009 - FSS ConnectingBat V1.0", "010 - MUST PV1800F CAN", "011 - LuxpowerTek batarya CAN V01", "012 - CAN kullanıcı tanımlı", "013 - CAN kullanıcı tanımlı 2", "014 - JINLONG düşük gerilim inverter CAN V1.0", "015 - NMEA 2000 V1.300", "016 - CAN protokol 016", "017 - CAN protokol 017", "018 - CAN protokol 018", "019 - CAN protokol 019", "020 - CAN protokol 020"], "TRIGGER_SOURCES": ["00 - Kapalı", "01 - Düşük SOC", "02 - Batarya aşırı gerilim", "03 - Batarya düşük gerilim", "04 - Hücre aşırı gerilim", "05 - Hücre düşük gerilim", "06 - Şarj aşırı akım", "07 - Deşarj aşırı akım", "08 - Batarya aşırı sıcaklık", "09 - MOSFET aşırı sıcaklık", "10 - Sistem alarmı", "11 - Batarya düşük sıcaklık", "12 - GPS uzaktan kontrol", "13 - SOC üstünde", "14 - MOSFET anormal"], "ACTIONS": {"restart": [102, "BMS'i yeniden başlat"], "shutdown": [101, "BMS'i kapat"], "factory_reset": [157, "Fabrika ayarı / geçmişi sil"], "erase_all": [163, "Tüm verileri sil"], "preset_ncm": [104, "NCM/NCA varsayılan parametrelerini yükle"], "preset_lfp": [105, "LFP varsayılan parametrelerini yükle"], "preset_lto": [106, "LTO varsayılan parametrelerini yükle"]}, "STRING_CMDS": {"device_password": 156, "setting_password": 160, "user_data_1": 159, "user_data_2": 162}, "CALIBRATIONS": {"volt": [100, 4, 0.001, "V", 1000, 200000, "Toplam gerilim kalibrasyonu"], "curr": [103, 4, 0.001, "A", 0, 2000000, "Akım kalibrasyonu"], "soc": [110, 1, 1, "%", 1, 99, "SOC kalibrasyonu"], "soh": [111, 1, 1, "%", 50, 100, "SOH kalibrasyonu"], "cycle": [112, 4, 0.001, "Ah", 1, 20000000, "Döngü kapasitesi düzeltmesi"]}, "LOG_EVENTS": {"1": "Açılış", "3": "Uygulama şarjı kapattı", "4": "Uygulama şarjı açtı", "5": "Uygulama deşarjı kapattı", "6": "Uygulama deşarjı açtı", "7": "Uzaktan şarj kapatıldı", "8": "Uzaktan şarj açıldı", "9": "Uzaktan deşarj kapatıldı", "10": "Uzaktan deşarj açıldı", "11": "MOS aşırı sıcaklık", "12": "MOS aşırı sıcaklık bitti", "13": "Akım sensörü anormal", "14": "Akım sensörü normale döndü", "15": "Dahili haberleşme hatası", "16": "Dahili haberleşme düzeldi", "17": "Hücre aşırı gerilim", "18": "Hücre aşırı gerilim bitti", "19": "Batarya aşırı gerilim", "20": "Batarya aşırı gerilim bitti", "21": "Şarj aşırı akım", "22": "Şarj aşırı akım bitti", "23": "Şarj kısa devre", "24": "Şarj kısa devre bitti", "25": "Şarj aşırı sıcaklık", "26": "Şarj aşırı sıcaklık bitti", "27": "Şarj düşük sıcaklık", "28": "Şarj düşük sıcaklık bitti", "29": "Hücre düşük gerilim", "30": "Hücre düşük gerilim bitti", "31": "Batarya düşük gerilim", "32": "Batarya düşük gerilim bitti", "33": "Deşarj aşırı akım", "34": "Deşarj aşırı akım bitti", "35": "Deşarj kısa devre", "36": "Deşarj kısa devre bitti", "37": "Deşarj aşırı sıcaklık", "38": "Deşarj aşırı sıcaklık bitti", "39": "Watchdog sistemi yeniden başlattı", "40": "Deşarj kısa devre 2", "41": "Elle acil durum açıldı", "43": "Acil durum otomatik kapandı", "44": "Uygulama BMS'i kapattı", "45": "Düğme ile BMS kapatıldı", "46": "Deşarj açılamadı", "47": "RS485 ile BMS kapatıldı", "48": "CAN ile şarj kapatıldı", "49": "CAN ile şarj açıldı", "50": "CAN ile deşarj kapatıldı", "51": "CAN ile deşarj açıldı", "52": "RS485 ile şarj kapatıldı", "53": "RS485 ile şarj açıldı", "54": "RS485 ile deşarj kapatıldı", "55": "RS485 ile deşarj açıldı", "56": "Uyku moduna girdi", "57": "Şarj MOS anormal", "58": "Deşarj MOS anormal", "59": "Saat ayarlandı", "60": "Hücre sayısı anormal", "61": "Düğme acil durum açık", "62": "Düğme acil durum kapalı", "63": "Düğme ile zorla ısıtma", "64": "Deşarj aşırı akım 2", "65": "Deşarj aşırı akım 3", "66": "Kısa devre bırakma başarısız", "67": "Fabrika ayarı NCM/NCA", "68": "Fabrika ayarı LFP", "69": "Fabrika ayarı LTO", "70": "Uzaktan acil durum açık", "71": "Uzaktan acil durum kapalı", "72": "Deşarj düşük sıcaklık", "73": "Deşarj düşük sıcaklık bitti"}, "NAME_ALLOWED": " -.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz"};

const SERVICE_UUID = "0000ffe0-0000-1000-8000-00805f9b34fb";
const CHAR_UUID = "0000ffe1-0000-1000-8000-00805f9b34fb";
const HEADER = [0x55, 0xAA, 0xEB, 0x90];
const FRAME_LEN = 300;
const CMD_SETTINGS_AND_DATA = 0x96, CMD_DEVICE_INFO = 0x97, CMD_RENAME = 0x9B, CMD_LOG = 0xA7, REG_TIME_SYNC = 0x6C;
const EPOCH_2020 = 1577808000, NAME_MAX_LEN = 13;
const NAME_ALLOWED = new Set(T.NAME_ALLOWED);
const OLD_MODELS = new Set(T.OLD_MODELS);

/* ---------------------------------------------------------------- bayt yardımcıları */
const u8 = (p, o) => p[o];
const s8 = (p, o) => (p[o] << 24) >> 24;
const u16 = (p, o) => p[o] | (p[o + 1] << 8);
const s16 = (p, o) => (u16(p, o) << 16) >> 16;
const u32 = (p, o) => (p[o] | (p[o + 1] << 8) | (p[o + 2] << 16) | (p[o + 3] << 24)) >>> 0;
const s32 = (p, o) => p[o] | (p[o + 1] << 8) | (p[o + 2] << 16) | (p[o + 3] << 24);
const RD = {u8, s8, u16, s16, u32, s32};
const SIZE = {u8: 1, s8: 1, u16: 2, s16: 2, u32: 4, s32: 4};
const sum8 = (a, n = a.length) => { let s = 0; for (let i = 0; i < n; i++) s += a[i]; return s & 0xFF; };
function ascii(p, o, n) {
  let s = "";
  for (let i = o; i < o + n && i < p.length; i++) { if (p[i] === 0) break; s += p[i] < 128 ? String.fromCharCode(p[i]) : "�"; }
  return s.replace(/^[\s\x1c-\x1f]+|[\s\x1c-\x1f]+$/g, "");   // Python str.strip() ile aynı
}
const payloadOf = (f) => f.subarray(6, FRAME_LEN - 1);
function finish(arr) {
  const out = new Uint8Array(FRAME_LEN);
  out.set(arr.subarray ? arr.subarray(0, FRAME_LEN - 1) : arr.slice(0, FRAME_LEN - 1));
  out[FRAME_LEN - 1] = sum8(out, FRAME_LEN - 1);
  return out;
}
const hex = (a) => Array.from(a, b => b.toString(16).padStart(2, "0").toUpperCase()).join(" ");
const fromHex = (h) => new Uint8Array(h.match(/../g).map(x => parseInt(x, 16)));
function secsToText(s) {
  s = Math.max(0, Math.floor(s)); const d = Math.floor(s / 86400); s %= 86400;
  const p = n => String(n).padStart(2, "0");
  return `${d}g ${p(Math.floor(s / 3600))}:${p(Math.floor(s % 3600 / 60))}:${p(s % 60)}`;
}
function fmtTime(ts) {
  const d = new Date(ts * 1000), p = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

/* ---------------------------------------------------------------- komutlar */
function buildCommand(cmd, value = 0, length = 0) {
  const f = new Uint8Array(20);
  f.set([0xAA, 0x55, 0x90, 0xEB, cmd & 0xFF, length & 0xFF]);
  let v = BigInt.asUintN(64, BigInt(Math.trunc(value)));
  for (let i = 0; i < length; i++) { f[6 + i] = Number(v & 0xFFn); v >>= 8n; }
  f[19] = sum8(f, 19);
  return f;
}
const checksumOk = (f) => f.length >= FRAME_LEN && sum8(f, FRAME_LEN - 1) === f[FRAME_LEN - 1];

class FrameAssembler {
  constructor() { this.buf = new Uint8Array(0); }
  _find() { const b = this.buf; for (let i = 0; i + 3 < b.length; i++) if (b[i] === 0x55 && b[i + 1] === 0xAA && b[i + 2] === 0xEB && b[i + 3] === 0x90) return i; return -1; }
  feed(data) {
    data = data instanceof Uint8Array ? data : new Uint8Array(data);
    const out = [];
    if (data.length >= 4 && data[0] === 0x55 && data[1] === 0xAA && data[2] === 0xEB && data[3] === 0x90) this.buf = new Uint8Array(0);
    const nb = new Uint8Array(this.buf.length + data.length); nb.set(this.buf); nb.set(data, this.buf.length); this.buf = nb;
    for (;;) {
      const i = this._find();
      if (i < 0) { this.buf = this.buf.slice(-3); break; }
      if (i) this.buf = this.buf.slice(i);
      if (this.buf.length < FRAME_LEN) break;
      const frame = this.buf.slice(0, FRAME_LEN);
      if (checksumOk(frame) || frame[4] === 0x06) { out.push(frame); this.buf = this.buf.slice(FRAME_LEN); }
      else this.buf = this.buf.slice(4);
    }
    return out;
  }
}

/* ---------------------------------------------------------------- eski → yeni */
function cat(...parts) {
  const n = parts.reduce((a, p) => a + p.length, 0), o = new Uint8Array(n); let k = 0;
  for (const p of parts) { o.set(p, k); k += p.length; } return o;
}
const Z = (n) => new Uint8Array(n);
function oldToNew(frame) {
  const p = payloadOf(frame), t = frame[4], sl = (a, b) => p.slice(a, b);
  if (t === 0x01) {
    const parts = [fromHex("55AAEB90010000000000")];
    for (const [a, b] of [[4, 8], [8, 12], [12, 16], [16, 20], [20, 24]]) parts.push(sl(a, b));
    parts.push(Z(16));
    for (let a = 40; a < 136; a += 4) parts.push(sl(a, a + 4));
    parts.push(sl(136, 232), fromHex("00".repeat(49) + "7CF8FFFF0F0000000000000000"));
    return finish(cat(...parts));
  }
  if (t === 0x02) {
    const parts = [fromHex("55AAEB900200"), sl(0, 48), Z(16), sl(48, 52), sl(52, 54), sl(54, 56), sl(56, 57), sl(57, 58),
      sl(58, 106), Z(16), sl(128, 130), sl(108, 112), sl(112, 116), sl(116, 120), sl(120, 124), sl(124, 126), sl(126, 128),
      sl(130, 132), Z(2), sl(132, 134), sl(134, 135), sl(135, 136), sl(136, 140), sl(140, 144), sl(144, 148), sl(148, 152), Z(4),
      sl(156, 160), sl(160, 161), sl(161, 162), Z(2)];
    for (let a = 164; a < 176; a += 2) parts.push(sl(a, a + 2));
    parts.push(sl(176, 177), fromHex("00".repeat(51) + "33".repeat(21) + "FEFF7FDC" + "00".repeat(9)));
    return finish(cat(...parts));
  }
  if (t === 0x03) {
    const parts = [fromHex("55AAEB900300")];
    for (const [a, b] of [[0, 16], [16, 24], [24, 32], [32, 36], [36, 40], [40, 56], [56, 72], [72, 80], [80, 96], [96, 112], [112, 128]]) parts.push(sl(a, b));
    parts.push(Z(16), fromHex("7EF8FFFF0F000000000000008008000000000098030100"));
    return finish(cat(...parts));
  }
  return frame;
}

/* ---------------------------------------------------------------- çözümleyiciler */
function parseDeviceInfo(frame) {
  const p = payloadOf(frame);
  return {
    model: ascii(p, 0, 16), hw: ascii(p, 16, 8), sw: ascii(p, 24, 8), uptime_s: u32(p, 32), power_on_count: u32(p, 36),
    name: ascii(p, 40, 16), mfg_date: ascii(p, 72, 8), serial: ascii(p, 80, 16), protocol: p.length > 292 ? p[292] : 0,
    can_rename: p.length > 163 ? !!(p[163] & 0x08) : true,
    setting_password: ascii(p, 112, 16), device_password: ascii(p, 56, 16), user_data: ascii(p, 96, 16),
    password_protected: p.length > 163 ? !!(p[163] & 0x10) : false,
    distributor_id: p.length > 178 ? u16(p, 176) : 0,
    _payload: p.slice(),
  };
}
const isOldProtocol = (info) => (info.protocol || 0) === 0 && OLD_MODELS.has(info.model || "");

const FIELD_BY_OFF = Object.fromEntries(T.SETTING_FIELDS.map(f => [f[0], f]));
function fmtSetting(off, raw) {
  const [, , typ, scale, unit] = FIELD_BY_OFF[off];
  if (typ === "bool") return raw ? "Açık" : "Kapalı";
  if (scale === 1) return String(raw);
  const dec = scale === 0.001 ? ({V: 3, A: 2, Ah: 1}[unit] ?? 1) : 1;
  return (raw * scale).toFixed(dec);
}
function buildSettingWrite(off, raw) {
  const [, name, , , , lo, hi] = FIELD_BY_OFF[off];
  if (!(raw >= lo && raw <= hi)) throw new Error(`${name}: ${raw} izin verilen aralığın dışında (${lo}..${hi})`);
  return buildCommand(off / 4 + 1, raw, 4);
}
function parseSettings(frame) {
  const p = payloadOf(frame), raw = {}, out = {};
  for (const [off, name, typ, , unit] of T.SETTING_FIELDS) {
    raw[off] = typ === "bool" ? (p[off] ? 1 : 0) : typ === "u32" ? u32(p, off) : s32(p, off);
    out[name] = [fmtSetting(off, raw[off]), unit];
  }
  out._raw = raw; out._cell_count = u32(p, 108); out._capacity_ah = u32(p, 124) / 1000;
  out._charge_on = !!p[112]; out._discharge_on = !!p[116]; out._balance_on = !!p[120]; out._payload = p.slice();
  return out;
}
const bits = (v, n) => { const r = []; for (let i = 0; i < n; i++) if ((v >>> i) & 1) r.push(i); return r; };
function parseCellInfo(frame, hint = 0) {
  const p = payloadOf(frame);
  let enabled = bits(u32(p, 64), 32);
  if (!enabled.length) { let n = hint; if (!n) { n = 0; for (let i = 0; i < 32; i++) if (u16(p, i * 2)) n++; } enabled = [...Array(n).keys()]; }
  const cells = [], res = [];
  for (let i = 0; i < 32; i++) { cells.push(u16(p, i * 2) / 1000); res.push(u16(p, 74 + i * 2) / 1000); }
  const resAlarm = new Set(bits(u32(p, 140), 32));
  const temp = (o) => { const v = s16(p, o); return v <= -2000 || v >= 2000 ? null : v / 10; };
  const sysA = u32(p, 160), usrA = u16(p, 186), ts = u32(p, 256);
  return {
    cells: enabled.map(i => cells[i]), cell_index: enabled.map(i => i + 1), resistances: enabled.map(i => res[i]),
    res_alarm: enabled.map(i => resAlarm.has(i)), avg_cell: u16(p, 68) / 1000, delta_cell: u16(p, 70) / 1000,
    max_idx: s8(p, 72), min_idx: s8(p, 73), mos_temp: temp(138), voltage: u32(p, 144) / 1000, power: u32(p, 148) / 1000,
    current: s32(p, 152) / 1000, temps: [temp(156), temp(158), temp(248), temp(250), temp(252)],
    balance_current: s16(p, 164) / 1000, balance_action: p[166], soc: p[167], remain_ah: u32(p, 168) / 1000,
    full_ah: u32(p, 172) / 1000, cycles: u32(p, 176), cycle_ah: u32(p, 180) / 1000, soh: p[184], precharge: p[185],
    runtime_s: u32(p, 188), charge_mos: !!p[192], discharge_mos: !!p[193],
    alarms: bits(sysA, 32).map(i => T.SYS_ALARMS[i] ?? `Sistem alarmı bit ${i}`),
    user_alarms: bits(usrA, 16).map(i => T.USER_ALARMS[i] ?? `Kullanıcı alarmı bit ${i}`),
    bms_time: ts ? fmtTime(ts + EPOCH_2020) : "",
  };
}

/* ---------------------------------------------------------------- gelişmiş */
const ADV_BY_KEY = Object.fromEntries(T.ADV_FIELDS.map(f => [f.key, f]));
function parseAdvanced(sp, ip) {
  const out = {};
  for (const f of T.ADV_FIELDS) {
    try {
      if (f.kind === "bit") {
        if (f.reg === 107) { if (ip) out[f.key] = (ip[157] >> 3) & 1; }
        else if (sp) out[f.key] = (sp[281 + Math.floor(f.reg / 8)] >> (f.reg % 8)) & 1;
      } else {
        const src = f.src === "set" ? sp : ip;
        if (src && f.off + SIZE[f.typ] <= src.length) out[f.key] = RD[f.typ](src, f.off);
      }
    } catch (e) { /* alan yok */ }
  }
  return out;
}
function buildAdvWrite(key, raw) {
  const f = ADV_BY_KEY[key];
  if (f.kind === "ro") throw new Error(`${f.name} salt okunur`);
  if (f.kind === "bit") { if (raw !== 0 && raw !== 1) throw new Error("Anahtar değeri 0 ya da 1 olmalı"); return buildCommand(f.reg, raw, 4); }
  if (f.kind === "select") { const n = T[f.options].length; if (!(raw >= 0 && raw < n)) throw new Error(`${f.name}: seçim 0..${n - 1} arası olmalı`); return buildCommand(f.reg, raw, 1); }
  if (!(raw >= f.lo && raw <= f.hi)) throw new Error(`${f.name}: ${raw} izin verilen aralığın dışında (${f.lo}..${f.hi})`);
  return buildCommand(f.reg, raw, f.ln);
}
const advMeta = () => T.ADV_FIELDS.map(f => f.options ? {...f, options: T[f.options]} : {...f});

function buildRename(name) { return buildStringFrame(CMD_RENAME, name, "Ad"); }
function buildStringFrame(cmd, text, label = "") {
  text = String(text).trim();
  if (!text) throw new Error(`${label ? label + " " : ""}boş olamaz`);
  if (text.length > NAME_MAX_LEN) throw new Error(`En fazla ${NAME_MAX_LEN} karakter`);
  const bad = [...new Set([...text].filter(c => !NAME_ALLOWED.has(c)))];
  if (bad.length) throw new Error("Geçersiz karakter: " + bad.join(" ") + "  (Türkçe harf kullanılamaz)");
  const f = new Uint8Array(20); f.set([0xAA, 0x55, 0x90, 0xEB, cmd, text.length]);
  for (let i = 0; i < text.length; i++) f[6 + i] = text.charCodeAt(i);
  f[19] = sum8(f, 19); return f;
}
const buildStringCmd = (kind, text) => buildStringFrame(T.STRING_CMDS[kind], text);
const buildAction = (name) => buildCommand(T.ACTIONS[name][0]);
const buildTimeSync = (ts) => buildCommand(REG_TIME_SYNC, Math.floor(ts ?? Date.now() / 1000) - EPOCH_2020, 4);
function buildCalibration(kind, raw) {
  const [reg, ln, , , lo, hi, name] = T.CALIBRATIONS[kind];
  if (!(raw >= lo && raw <= hi)) throw new Error(`${name}: değer aralık dışında`);
  return buildCommand(reg, raw, ln);
}

/* ---------------------------------------------------------------- arıza kayıtları */
function parseLogFrame(frame) {
  const p = payloadOf(frame), total = u16(p, 0), n = Math.min(p[2], 12), recs = [];
  for (let k = 0; k < n; k++) {
    const b = 3 + 24 * k, ts = u32(p, b) + EPOCH_2020, code = p[b + 4], bt = p[b + 5];
    const t = (o) => s8(p, o) === -1 ? null : s8(p, o);
    recs.push({
      time: fmtTime(ts), ts, code, event: T.LOG_EVENTS[code] ?? `Olay #${code}`,
      chg: !!(bt & 1), dsg: !!(bt & 2), bal: !!(bt & 4), heat: !!(bt & 8), max_no: p[b + 6], min_no: p[b + 7],
      max_v: u16(p, b + 8) / 1000, min_v: u16(p, b + 10) / 1000, voltage: u16(p, b + 12) / 100, current: s16(p, b + 14) / 10,
      remain_ah: u16(p, b + 16) / 10, full_ah: u16(p, b + 18) / 10, t_max: t(b + 20), t_min: t(b + 21), t_mos: t(b + 22),
      heat_a: s8(p, b + 23) / 10,
    });
  }
  return [total, recs];
}

/* ---------------------------------------------------------------- demo çerçeveleri */
class W { // küçük yazıcı (little-endian)
  constructor(a) { this.a = a; this.v = new DataView(a.buffer, a.byteOffset, a.byteLength); }
  u8(o, x) { this.a[o] = x & 0xFF; } u16(o, x) { this.v.setUint16(o, x & 0xFFFF, true); } s16(o, x) { this.v.setInt16(o, x, true); }
  u32(o, x) { this.v.setUint32(o, x >>> 0, true); } s32(o, x) { this.v.setInt32(o, x | 0, true); }
  str(o, s) { for (let i = 0; i < s.length; i++) this.a[o + i] = s.charCodeAt(i); }
}
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
function makeDemoFrames(t) {
  const n = 16, P = 6;
  const d = new Uint8Array(FRAME_LEN); d.set([0x55, 0xAA, 0xEB, 0x90, 0x03, 0x01]); const wd = new W(d);
  wd.str(P, "JK_PB2A16S20P"); wd.str(P + 16, "15A"); wd.str(P + 24, "15.36"); wd.str(P + 40, "JK-DEMO");
  wd.str(P + 72, "240501"); wd.str(P + 80, "DEMO12345"); wd.u32(P + 32, Math.floor(t) + 86400 * 12); wd.u32(P + 36, 7);
  d[P + 292] = 1; d[P + 163] = 0x18; wd.str(P + 56, "1234"); wd.str(P + 96, "Garaj akusu");
  d[P + 178] = 1; d[P + 179] = 4; d[P + 228] = 1; d[P + 229] = 5;
  [20, 25, 2800, 2900, 0, 0].forEach((v, i) => wd.s32(P + 232 + i * 4, v));
  wd.u32(P + 256, 3600); d[P + 260] = 20; d[P + 261] = 10; d[P + 263] = 10; d[P + 272] = 5;
  const info = finish(d);

  const s = new Uint8Array(FRAME_LEN); s.set([0x55, 0xAA, 0xEB, 0x90, 0x01, 0x01]); const ws = new W(s);
  const vals = {0: 3300, 4: 2800, 8: 3000, 12: 3650, 16: 3550, 20: 10, 24: 3450, 28: 3000, 32: 3550, 36: 3450, 40: 2600, 44: 100000,
    48: 30, 52: 60, 56: 150000, 60: 300, 64: 60, 68: 5, 72: 2000, 76: 700, 80: 600, 84: 700, 88: 600, 92: 0, 96: 50, 100: 1000,
    104: 800, 108: n, 112: 1, 116: 1, 120: 1, 124: 280000, 128: 1500, 132: 3400};
  for (const o in vals) ws.s32(P + +o, vals[o]);
  ws.u32(P + 264, 1); ws.u32(P + 268, 5); ws.s32(P + 272, 200000);
  s[P + 278] = 5; s[P + 279] = 10; s[P + 280] = 24; s[P + 290] = (-20) & 0xFF; s[P + 291] = (-10) & 0xFF;
  for (const c of [29, 30, 31, 43, 45, 50, 51]) s[P + 281 + Math.floor(c / 8)] |= 1 << (c % 8);
  const settings = finish(s);

  const c = new Uint8Array(FRAME_LEN); c.set([0x55, 0xAA, 0xEB, 0x90, 0x02, 0x05]); const wc = new W(c);
  const base = 3300 + 40 * Math.sin(t / 30);
  const cells = Array.from({length: n}, (_, i) => Math.round(base + rnd(-8, 8) + (i === 5 ? 15 : 0)));
  cells.forEach((v, i) => { wc.u16(P + i * 2, v); wc.u16(P + 74 + i * 2, 60 + rnd(0, 20)); });
  wc.u32(P + 64, (2 ** n) - 1);
  const mx = Math.max(...cells), mn = Math.min(...cells), sum = cells.reduce((a, b) => a + b, 0);
  wc.u16(P + 68, Math.floor(sum / n)); wc.u16(P + 70, mx - mn); c[P + 72] = cells.indexOf(mx); c[P + 73] = cells.indexOf(mn);
  wc.s16(P + 138, 312 + rnd(-3, 3));
  const cur = Math.trunc(12000 * Math.sin(t / 20));
  wc.u32(P + 144, sum); wc.u32(P + 148, Math.abs(Math.trunc(sum * cur / 1000))); wc.s32(P + 152, cur);
  wc.s16(P + 156, 254); wc.s16(P + 158, 261);
  wc.s16(P + 164, mx - mn > 10 ? 120 : 0); c[P + 166] = mx - mn > 10 ? 2 : 0;
  const soc = Math.trunc(50 + 30 * Math.sin(t / 60)); c[P + 167] = soc;
  wc.u32(P + 168, Math.floor(280000 * soc / 100)); wc.u32(P + 172, 280000); wc.u32(P + 176, 42); wc.u32(P + 180, 11760000);
  c[P + 184] = 100; wc.u32(P + 188, Math.floor(t) + 3600 * 50); c[P + 192] = 1; c[P + 193] = 1;
  wc.s16(P + 248, -2000); wc.s16(P + 250, -2000); wc.s16(P + 252, -2000);
  wc.u32(P + 256, Math.floor(Date.now() / 1000) - EPOCH_2020);
  return [info, settings, finish(c)];
}
function makeDemoLogFrames(count = 30) {
  const now = Math.floor(Date.now() / 1000), codes = [1, 56, 21, 22, 29, 30, 4, 6, 59, 17, 18, 11, 12, 33, 34, 45, 1, 25, 26];
  const recs = [];
  for (let i = 0; i < count; i++) {
    const v = 52.4 + Math.random();
    recs.push([now - (count - i) * 3600 * 7 - rnd(0, 3000), codes[i % codes.length], i % 4 ? 0b0111 : 0b0011, rnd(1, 16), rnd(1, 16),
      Math.round((3.30 + Math.random() * .05) * 1000), Math.round((3.27 + Math.random() * .02) * 1000), Math.round(v * 100),
      Math.round((Math.random() * 140 - 80) * 10), Math.round((40 + Math.random() * 230) * 10), 2800, rnd(22, 34), rnd(18, 22), rnd(25, 40), 0]);
  }
  const frames = [];
  for (let st = 0; st < count; st += 12) {
    const ch = recs.slice(st, st + 12), f = new Uint8Array(FRAME_LEN); f.set([0x55, 0xAA, 0xEB, 0x90, 0x06, 0x00]);
    const w = new W(f); w.u16(6, count); f[8] = ch.length;
    ch.forEach((r, k) => { const b = 6 + 3 + 24 * k; w.u32(b, r[0] - EPOCH_2020); f[b + 4] = r[1]; f[b + 5] = r[2]; f[b + 6] = r[3]; f[b + 7] = r[4];
      w.u16(b + 8, r[5]); w.u16(b + 10, r[6]); w.u16(b + 12, r[7]); w.s16(b + 14, r[8]); w.u16(b + 16, r[9]); w.u16(b + 18, r[10]);
      f[b + 20] = r[11] & 0xFF; f[b + 21] = r[12] & 0xFF; f[b + 22] = r[13] & 0xFF; f[b + 23] = r[14] & 0xFF; });
    frames.push(finish(f));
  }
  return frames;
}

G.JK = {
  T, SERVICE_UUID, CHAR_UUID, FRAME_LEN, CMD_SETTINGS_AND_DATA, CMD_DEVICE_INFO, CMD_RENAME, CMD_LOG, EPOCH_2020, NAME_MAX_LEN,
  FIELD_BY_OFF, ADV_BY_KEY, SIZE, u8, s8, u16, s16, u32, s32, hex, fromHex, sum8, finish, payloadOf, secsToText,
  buildCommand, checksumOk, FrameAssembler, oldToNew, parseDeviceInfo, isOldProtocol, fmtSetting, buildSettingWrite,
  parseSettings, parseCellInfo, parseAdvanced, buildAdvWrite, advMeta, buildRename, buildStringCmd, buildAction,
  buildTimeSync, buildCalibration, parseLogFrame, makeDemoFrames, makeDemoLogFrames,
};
})(typeof window !== "undefined" ? window : globalThis);
