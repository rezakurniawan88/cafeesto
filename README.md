# Cafeesto - Restaurant Management

[![React Version](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)


<!-- ## Homepage -->
![Demo Cafeesto](/public/preview/homepage.png)

<!-- ## Dashboard
![Demo Dashboard Cafeesto](/public/preview/dashboard.png) -->

Ini adalah aplikasi Restaurant management yang dibuat dengan menggunakan React.JS, Aplikasi berbasis web ini digunakan untuk mengelola operasi restoran, mulai dari pemesanan hingga pelacakan pendapatan dan manajemen menu serta order.

## Features

Halaman Utama
- Melakukan Pemesanan : Pelanggan dapat memesan makanan melalui sistem, dengan pilihan untuk makan di tempat(DineIn) atau take away.
- Pencarian Menu : Pelanggan dapat melakukan pencarian menu.
- Pemilihan Meja : Pelanggan dapat memilih meja untuk makan di tempat.

Halaman Dashboard
- Register dan Login : Pengguna dapat membuat akun dan masuk. Sistem mendukung dua role: Admin dan Kasir.
- Overview : Dashboard menyediakan overview pendapatan harian, produk yang terjual, dan total pendapatan.
- Grafik Chart : Terdapat dua grafik, termasuk grafik garis yang menunjukkan tren pesanan per minggu dan grafik yang menampilkan total pesanan berdasarkan kategori.
- Manajemen Menu : Admin dapat menambahkan, mengedit, dan menghapus menu.
- Manajemen Meja : Admin dapat menambahkan dan menghapus meja.
- Manajemen Pemesanan : Kasir dapat menyetujui pesanan (mengubah status dari menunggu menjadi selesai), menolak/menghapus pesanan, dan menandai pesanan sebagai selesai (mengubah status meja menjadi tersedia).

## Technologies

- React.JS + Typescript
- React Query
- Zustand
- TailwindCSS
- React-hook-form
- React-router-dom
- Apexcharts


## Demo
[![Cafeesto_Demo_Video](https://img.youtube.com/vi/PRgt6QNAQv8/0.jpg)](https://www.youtube.com/watch?v=PRgt6QNAQv8)


## Getting Started

1. Clone repositori :
```bash
git clone https://github.com/rezakurniawan88/cafeesto.git
cd cafeesto
```
2. Install dependensi :
```bash
npm install
```
3. Konfigurasi env :
```bash
Copy file .env.example dan ubah jadi .env, kemudian isi sesuai ip dan port dari backend
```
4. Jalankan development server : 
```bash
npm start
```


## Backend
Link repo backend-cafeesto : https://github.com/rezakurniawan88/backend-cafeesto
