# MGM BMS – Android uygulaması

Masaüstü MGM BMS programının telefon sürümü. Aynı arayüz, aynı özellikler: canlı izleme, hücreler,
grafikler, koruma ve gelişmiş ayarlar, arıza kayıtları, yedek/geri yükleme, şifreler, kalibrasyon, ad değiştirme.
Bluetooth bağlantısı Android'in yerel BLE altyapısıyla yapılır (Capacitor + `@capacitor-community/bluetooth-le`).

Python kısmı telefonda çalışmadığı için protokol ve arka uç JavaScript'e taşındı (`src/jk_protocol.tpl.js`,
`www/bridge.js`). JavaScript sürümü Python sürümüyle 673 test vektöründe birebir aynı sonucu veriyor.

## APK nasıl alınır?

### Yol 1 – GitHub ile, hiçbir şey kurmadan (önerilen)
1. github.com'da ücretsiz hesap aç → sağ üstte **+** → **New repository** → ad: `mgm-bms` → **Create**.
2. Açılan sayfada **uploading an existing file** bağlantısına tıkla; bu klasörün **içindeki her şeyi**
   (`.github` klasörü dahil) sürükleyip bırak → **Commit changes**.
3. Üstteki **Actions** sekmesine gir. "APK derle" işi kendiliğinden başlar (~5 dk).
   Başlamazsa: **APK derle** → **Run workflow**.
4. Bitince (yeşil tik) işe tıkla → aşağıdaki **Artifacts** bölümünden **MGM_BMS-apk** indir → zip içindeki
   `app-debug.apk` dosyasını telefona at ve kur.

> `.github` klasörü yüklenmediyse: Actions → **set up a workflow yourself** → `.github/workflows/apk.yml`
> dosyasının içeriğini yapıştır → Commit.

### Yol 2 – Kendi bilgisayarında
1. [Node.js](https://nodejs.org) (22 veya üstü) ve [Android Studio](https://developer.android.com/studio) kur
   (Android Studio ilk açılışta SDK'yı indirir).
2. `apk_derle.bat` dosyasına çift tıkla → bitince klasörde `MGM_BMS.apk` oluşur.
   Alternatif: `npm install` → `npx cap sync android` → Android Studio'da `android` klasörünü aç →
   **Build → Build App Bundle(s) / APK(s) → Build APK(s)**.

## Telefona kurulum
- APK'yı aç; "bilinmeyen kaynaklardan yükleme" izni istenirse ver (Ayarlar → Uygulamalar → Özel erişim).
- Bu bir **debug** APK'dır (kişisel kullanım için imzalı); Play Protect uyarı verirse "Yine de yükle".
- İlk bağlantıda **Yakındaki cihazlar** (Android 12+) ve **Konum** izinlerini ver; Bluetooth açık olmalı.
- Gereksinim: Android 7.0 (API 24) ve üstü, BLE destekli telefon.

## Telefonda kullanım
- Sağ üstte **Bağlan** → listede yeşil çerçeveli JK BMS'e dokun. **▶** demo modu.
- Alt menü: Panel, Hücreler, Grafikler, Ayarlar ve **Diğer** (Gelişmiş, Kayıtlar, Araçlar, Cihaz, Konsol).
- Yedek, kayıt CSV'si ve canlı CSV dosyaları telefonun **Belgeler** klasörüne yazılır ve paylaşım menüsü açılır
  (Drive'a, WhatsApp'a, e-postaya gönderebilirsin). Canlı CSV kaydı Araçlar sayfasındadır.
- BMS'e aynı anda tek cihaz bağlanabilir: telefondaki JK uygulaması bağlıyken MGM BMS bağlanamaz.

## Klasör yapısı
| | |
|---|---|
| `www/` | uygulamanın kendisi: `index.html` (arayüz), `bridge.js` (BLE + arka uç), `jk_protocol.js` |
| `src/` | kaynaklar: protokol şablonu, masaüstüyle ortak arayüz, eklenti paketi girişi |
| `tools/` | `build_www.py` (www'yi üretir), `make_icons.py` (simge + açılış ekranı) |
| `android/` | Android Studio projesi (Capacitor 8, minSdk 24, targetSdk 36) |
| `.github/workflows/apk.yml` | GitHub'da otomatik APK derleme |

Arayüzü değiştirdiysen: `python tools/build_www.py src/ui_index.html` → `npx cap sync android`.
