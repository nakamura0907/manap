app-up:
	cd services/app && npm run start

app-build:
	cd services/app && npm run build

app-npm:
	cd services/app && npm $(script)

up:
	docker-compose up --build --remove-orphans & \
	make app-up

daemon:
	docker-compose up --build --remove-orphans -d

build:
	make app-build

stop:
	docker-compose stop
