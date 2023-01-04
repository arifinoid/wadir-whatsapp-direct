use tauri::{
    api::shell::open, AppHandle, CustomMenuItem, Manager, SystemTrayEvent, SystemTrayMenu,
    SystemTraySubmenu,
};

const LINKS: [(&str, &str, &str); 2] = [
    (
        "open-social-twitter",
        "Twitter",
        "https://twitter.com/@arifinoid",
    ),
    (
        "open-github-arifinoid",
        "arifinoid",
        "https://github.com/arifinoid",
    ),
];

pub fn on_system_tray_event(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::MenuItemClick { id, .. } => {
            let item_handle = app.tray_handle().get_item(&id);
            dbg!(&id);
            match id.as_str() {
                "visibility-toggle" => {
                    let window = app.get_window("main").unwrap();
                    match window.is_visible() {
                        Ok(true) => {
                            window.hide().unwrap();
                            item_handle.set_title("Show").unwrap();
                        }
                        Ok(false) => {
                            window.show().unwrap();
                            item_handle.set_title("Hide").unwrap();
                        }
                        Err(_e) => unimplemented!("what kind of errors happen here?"),
                    }
                }
                "quit" => app.exit(0),
                s if s.starts_with("open-") => {
                    if let Some(link) = LINKS.iter().find(|(id, ..)| id == &s) {
                        open(&app.shell_scope(), link.2, None).unwrap();
                    }
                }
                _ => {}
            }
        }
        _ => {}
    }
}

pub fn generate_menu(link_name: &str, menu_name: &str) -> SystemTraySubmenu {
    let mut menu = SystemTrayMenu::new();
    for (id, label, _url) in LINKS
        .iter()
        .filter(|(id, _label, _url)| id.starts_with(link_name))
    {
        menu = menu.add_item(CustomMenuItem::new(id.to_string(), label.to_string()));
    }

    SystemTraySubmenu::new(menu_name, menu)
}
