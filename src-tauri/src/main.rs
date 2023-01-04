#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod cmd;
mod model;

use lib::{generate_menu, on_system_tray_event};
use tauri::{CustomMenuItem, SystemTray, SystemTrayMenu, SystemTrayMenuItem};

fn main() {
    let sub_menu_social = generate_menu("open-social", "Social");
    let sub_menu_github = generate_menu("open-github", "GitHub");
    let tray_menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("quit".to_string(), "Quit"))
        .add_submenu(sub_menu_social)
        .add_submenu(sub_menu_github)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("visibility-toggle".to_string(), "Hide"));

    let tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        .system_tray(tray)
        .on_system_tray_event(on_system_tray_event)
        .invoke_handler(tauri::generate_handler![
            cmd::greet,
            cmd::get_contacts,
            cmd::create_contact,
            cmd::remove_contact
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
