# AKB Cargo Web - Frontend Audit Report

> **Sana**: 2026-08-06
> **Loyiha**: `akb_web` (React 19 + Vite 7 SPA)
> **Tuzuvchi**: Principal Frontend Architect

## 1. Arxitektura va Asosiy Texnologiyalar

Loyiha standart va zamonaviy SPA (Single Page Application) sifatida qurilgan:
- **Asosiy Fraymvork**: React 19 (Hooks, Concurrent features)
- **Qurish vositasi (Bundler)**: Vite 7 (tezkori qurish, HMR)
- **Til**: TypeScript 5.9 (qat'iy tiplar)
- **UI & Stil**: Tailwind CSS v4, Radix UI va shadcn/ui.
- **Holat (State) boshqaruvi**: 
  - *Server-state*: TanStack Query (ma'lumotlarni keshlash, yangilash)
  - *Client-state*: Zustand (global formalar, lokal holatlar)
- **Marshrutlash (Routing)**: React Router o'rniga Maxsus (Custom) history-base marshrutizator yozilgan.
- **Forma va Validatsiya**: React Hook Form + Zod.

## 2. Asosiy Kuchli Tomonlari (Strengths)

1. **Dual Auth (Ikki tomonlama autentifikatsiya)**: Telegram `initData` orqali bot foydalanuvchilari uchun avto-avtorizatsiya hamda Adminlar uchun `localStorage` va JWT `X-Admin-Authorization` mexanizmi juda to'g'ri integratsiya qilingan. Middleware orqali bir-biriga xalaqit bermaydi.
2. **Kesh va Ma'lumot sinxronizatsiyasi**: TanStack Query-dan maqsadli foydalanilgan. `staleTime: 5min` kabi standart holatlar belgilangan va ma'lumot yuklanishi optimallashtirilgan.
3. **Offline yordamchi**: Ombor (Warehouse) va ba'zi so'rovlar oflayn rejim uchun IndexedDB (`idb`) orqali xavfsiz saqlanadi va internet chiqqanda navbatdagi jo'natmalarni yuboradi (`useWarehouseQueueProcessor`).
4. **I18n Integratsiyasi**: `i18next` bilan qilingan lokallashuvi va tildan kelib chiqib so'rovlarga `Accept-Language` jo'natilishi back-end xatolarini ham lokalizatsiya qilishni ta'minlaydi.
5. **Eruda Debugging**: Mobil versiyada test qilish uchun global konsol (Eruda) API dan kelgan statustga qarab yonishi katta plyus.

## 3. Kamchiliklar va Xavflar (Weaknesses & Bugs)

### 🔴 Kritik Darajadagi Xatolar (Bugs)
1. **`generated_districts.ts` dagi sintaktik xato**: 
   - `DISTRICTS` obyekti faylda ikki marta `export const DISTRICTS` qilingan. 
   - Ikkinchi obyektdagi `yangiyo'l_t` satri qo'shtirnoq o'rniga bittalik tirnoq bilan yozilgan va escape qilinmagan. Bu TypeScript kompilatsiyasi va qurish jarayonini (`npm run build`) qulashiga olib kelishi mumkin.

### 🟡 Arxitektura muammolari va Texnik Qarzlar (Tech Debt)
1. **"God Components" (Haddan tashqari katta komponentlar)**:
   - `POSDashboard` va ba'zi admin/ombor sahifalari bitta faylda yuzlab/minglab qator mantiqni ushlab turadi. O'qilishi va maintain qilinishi qiyin. Ularni mantiqiy kichik qismlarga (komponentlarga) bo'lish kerak.
2. **Custom Router**: React Router o'rniga maxsus yozilgan History marshrutizatori. Holatga qarab `window.history` boshqarilgani qiziq yechim bo'lsa-da, kelajakda murakkab sahifalararo (nested routes, laz-loading) o'tishlar kerak bo'lsa cheklovlar keltirib chiqaradi. 
3. **Rol tekshiruvlari va ruxsatlar (Role Gating)**: Sahifalar uchun `ROLE_CONFIG` fayl ichida (qattiq kodlangan). Backend dan kelayotgan rollar/huquqlarni boshqarish biroz tarqoq.
4. **Vite va TypeScript yangilanishlari**: Loyiha TypeScript 5.9 va React 19 ga o'tgan bo'lishiga qaramay (bu hali experimental/beta hisoblanadi), ba'zi external kutubxonalar to'liq mos kelmasligi xavfi mavjud. Eslatma tariqasida diqqat qilish kerak.
5. **Prettier yo'qligi**: Kod formati uchun faqat `eslint` o'rnatilgan, formatterni (masalan, Prettier) qo'shish jamoaviy ishlashni osonlashtiradi.

## 4. Xavfsizlik (Security)

1. **Token saqlanishi**: Odatdagidek JWT LocalStorage/SessionStorage da. Ushbu turdagi loyihalar uchun qabul qilinadi, ammo XSS xavfidan (agar Eruda va Telegram-Web-App integratsiyasi ehtiyotsiz ishlatilsa) saqlanish uchun kiritilayotgan barcha ma'lumotlarni escape qilish esda bo'lishi kerak.
2. Foydalanuvchi `initData` orqali login qilinganda, ma'lumot faqatgina API orqali Backendda tekshirilishi kerak (Backend tekshiradi, bu to'g'ri qilingan).

## 5. Xulosa va Tavsiyalar

Loyiha hozirgi holatida juda yaxshi tuzilgan va zamonaviy kutubxonalar ishlatilgan.
Hozircha hech qanday kod refaktorin qilinmasligi aytilgan, ammo kelgusida ushbu ishlarni qilish maslahat beriladi:
- [ ] `generated_districts.ts` faylidagi sintaksis va duplikatsiya xatosini zudlik bilan to'g'irlash.
- [ ] `POSDashboard` va shunga o'xshash yirik sahifalarni bo'laklarga ajratish.
- [ ] Zod sxemalarida xato xabarlarini to'liq lokallash.

---
> Ushbu hujjat maxsus frontend jildining o'zida `FRONTEND_AUDIT.md` fayli sifatida kelajakda foydalanish uchun saqlandi.
