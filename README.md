<img src="https://raw.githubusercontent.com/Kwarcek/cassiopeia/master/frontend/assets/images/cassiopeia-logo.svg" align="left" style="width: 4rem; height: 4rem; vertical-align: bottom;" />
<h1>Cassiopeia</h1>

🚧 Project is still "under construction" for development only 🚧

## Stack
- [Laravel - PHP Framework](https://laravel.com/).
- [OpenSwoole - Async solution](https://openswoole.com/).
- [Docker - containerization](https://www.docker.com/).
- [Vue.JS - Javascript Framework](https://vuejs.org/).
- [TailwindCSS - CSS Framework](https://tailwindcss.com/).
- [Flowbite - TailwindCSS Components](https://flowbite.com/).
- [Vite - Frontend Server](https://vitejs.dev/)
- [Pinia - Store Managment](https://pinia.vuejs.org/)

## Installation
1. Clone repository (`git clone https://github.com/Kwarcek/cassiopeia`)
2. Go to project directory (`cd cassiopeia`)
3. Copy `.env.example` file to `.env`
4. Build docker (`docker compose up -d`)
5. Open container with bash (`docker exec <container name> bash`)
6. Install node package manager (`npm install`)
7. Install composer (`composer install`)
8. Restart services (`supervisorctl restart all`)
9. Generate Laravel app key (`php artisan key:generate`)
10. Deploy application (`php artisan app:deploy`)
11.
a) run frontend server on development - `npm run dev`    
b) run frontend server for production - `npm run build`
