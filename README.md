# IQROMAX Mobil Ilovasi - Ishga tushirish yo'riqnomasi

Ushbu loyiha React Native va Expo yordamida tayyorlangan. Uni mobil telefoningizda ko'rish uchun quyidagi bosqichlarni bajaring:

## 1. Tayyorgarlik
*   Kompyuteringizda **Node.js** o'rnatilganligiga ishonch hosil qiling ([nodejs.org](https://nodejs.org/)).
*   Telefoningizga **Expo Go** ilovasini yuklab oling (App Store yoki Google Play).

## 2. Terminalda bajariladigan buyruqlar
Loyihaning asosiy papkasida (`mobile_app`) terminalni oching va quyidagi buyruqlarni ketma-ket yozing:

```bash
# 1. Zaruriy kutubxonalarni o'rnatish
npm install

# 2. Loyihani ishga tushirish
npx expo start
```

## 3. QR Koddan foydalanish
*   Yuqoridagi oxirgi buyruqdan so'ng terminalda katta **QR kod** paydo bo'ladi.
*   Telefoningizda **Expo Go** ilovasini oching.
*   "Scan QR Code" tugmasini bosing va terminaldagi kodni skanerlang.
*   Ilova bir necha soniya ichida telefoningizda yuklanadi.

## Muammolar yuzaga kelsa:
Agar QR kod skaner qilganda ilova ochilmasa, kompyuteringiz va telefoningiz bitta Wi-Fi tarmog'iga ulanganligini tekshiring. Aks holda, terminalda quyidagi buyruqdan foydalaning:
```bash
npx expo start --tunnel
```
