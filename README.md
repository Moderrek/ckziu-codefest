# CKZiU CodeFest

Serwis konkursowy dla CKZiU w Łodzi.
Opracowany przez Tymona Woźniaka

## Wymagania

* NodeJS 22
* pnpm

Korzystamy z `pnpm` zamiast `npm`, poniewaz `pnpm` jest oszczędny na dysku. Pliki `node_modules/` są łączone na stałe z
jednego magazynu na dysku, zamiast jak `npm` głupio instalować paczkę w kazdym projekcie na komputerze.

* Połączenie z [oficjalnym API](https://api.ckziucodefest.pl/) albo
  pobrać [własny serwer](https://github.com/Moderrek/ckziu-codefest-api)

* Jezeli produkcja => Klucze szyfrowania.

## Uruchomienie developerskie:

```bash
pnpm install
pnpm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) za pomocą przeglądarki.

Możesz rozpocząć edycje od zmiany `src/pages/index.tsx`. Strona automatycznie zostanie za aktualizowana po zmianie
pliku.

## Uruchomienie produkcyjne

Wymagane klucze w folderze `ssl/`

```bash
pnpm run prod
```
