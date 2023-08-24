install:
	npm ci

lint:
	npx eslint .

fix:
	npx eslint --fix .

iris-mnn:
	cd multilayer_net && node iris.js

mnist-large:
	cd multilayer_net && node mnist_large.js

mnist-small:
	cd multilayer_net && node mnist_small.js

weather:
	cd multilayer_net && node weatherPrediction.js