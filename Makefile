PREFIX ?= /usr
SYSCONFDIR ?= /etc
BINDIR ?= $(PREFIX)/bin
CONFDIR ?= $(SYSCONFDIR)/r5greet
HYPRDIR ?= $(SYSCONFDIR)/greetd

BUILDDIR = build
ENTRY = app.tsx
OUT = $(BUILDDIR)/r5greet

.PHONY: all dev setup types build install install-config clean

all: build

dev: setup types

# Create node_modules symlinks for AGS type definitions
setup:
	@mkdir -p node_modules
	@ln -sfn /usr/share/ags/js node_modules/ags
	@ln -sfn /usr/share/ags/js/node_modules/gnim node_modules/gnim
	@echo "node_modules symlinks created"

types:
	ags types -u -d $(CURDIR)

build:
	@mkdir -p $(BUILDDIR)
	ags bundle $(ENTRY) $(OUT)
	@echo "Built $(OUT)"

install: build
	install -Dm755 $(OUT) $(DESTDIR)$(BINDIR)/r5greet
	install -Dm644 hyprland/greetd-hyprland.conf $(DESTDIR)$(HYPRDIR)/r5greet-hyprland.conf

install-config:
	install -Dm644 etc/r5greet/config.toml $(DESTDIR)$(CONFDIR)/config.toml

clean:
	rm -rf $(BUILDDIR)
