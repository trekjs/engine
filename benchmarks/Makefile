
all: battle

battle:
	@./run 5 express
	@./run 5 koa
	@./run 5 toa
	@./run 5 trek
	@./run 5 restify
	@echo
	@./run 15 express
	@./run 15 koa
	@./run 15 toa
	@./run 15 trek
	@./run 15 restify
	@echo
	@./run 30 express
	@./run 30 koa
	@./run 30 toa
	@./run 30 trek
	@./run 30 restify
	@echo
	@./run 50 express
	@./run 50 koa
	@./run 50 toa
	@./run 50 trek
	@./run 50 restify

trek:
	@./run 1 $@
	@./run 5 $@
	@./run 10 $@
	@./run 15 $@
	@./run 20 $@
	@./run 30 $@
	@./run 50 $@
	@./run 100 $@
	@./run 500 $@
	@./run 1024 $@
	@echo

express:
	@./run 1 $@
	@./run 5 $@
	@./run 10 $@
	@./run 15 $@
	@./run 20 $@
	@./run 30 $@
	@./run 50 $@
	@./run 100 $@
	@./run 500 $@
	@./run 1024 $@
	@echo

koa:
	@./run 1 $@
	@./run 5 $@
	@./run 10 $@
	@./run 15 $@
	@./run 20 $@
	@./run 30 $@
	@./run 50 $@
	@./run 100 $@
	@./run 500 $@
	@./run 1024 $@
	@echo

toa:
	@./run 1 $@
	@./run 5 $@
	@./run 10 $@
	@./run 15 $@
	@./run 20 $@
	@./run 30 $@
	@./run 50 $@
	@./run 100 $@
	@./run 500 $@
	@./run 1024 $@
	@echo

restify:
	@./run 1 $@
	@./run 5 $@
	@./run 10 $@
	@./run 15 $@
	@./run 20 $@
	@./run 30 $@
	@./run 50 $@
	@./run 100 $@
	@./run 500 $@
	@./run 1024 $@
	@echo

.PHONY: all trek koa toa express restify battle
