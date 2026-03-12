1. Bundle into a single executable:
ags bundle app.tsx r5greet

This produces a single r5greet file (a GJS script with #!/usr/bin/gjs -m shebang).

2. Install it:
sudo install -Dm755 r5greet /usr/bin/r5greet

3. Install greetd config
Copy hyprland/greetd-hyprland.conf to /etc/greetd/r5geet-hyprland.conf
Set greetd config to: command = "start-hyprland -- -c /etc/greetd/r5greet-hyprland.conf"
4. install config + background in /etc/r5greet/:
sudo cp ~/claude/R5Greet/etc/r5greet/config.toml /etc/r5greet/
