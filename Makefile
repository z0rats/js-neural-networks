install:
	npm i

lint:
	npx eslint .

fix:
	npx eslint --fix .

iris-mnn:
	node multilayer_net/iris.js

mnist-large:
	node multilayer_net/mnist_large.js

mnist-small:
	node multilayer_net/mnist_small.js

weather:
	node multilayer_net/weatherPrediction.js