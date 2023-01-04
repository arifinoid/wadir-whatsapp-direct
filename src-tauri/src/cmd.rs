use crate::model::{AppData, Contact};
use tauri::{command, AppHandle};

#[command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[command]
pub fn get_contacts(app: AppHandle) -> Result<String, String> {
    let contacts = AppData::new(app.path_resolver().app_data_dir()).get_contacts();
    let serialize =
        serde_json::to_string(&contacts).expect("Can't serialize contacts list to json format");
    Ok(serialize)
}

#[command]
pub fn create_contact(app: AppHandle, phone_number: String, code: String) -> Result<String, String> {
    let contact = Contact::new_with_phonenumber(phone_number, code);
    AppData::new(app.path_resolver().app_data_dir()).create_contact(&contact);

    let serialized = serde_json::to_string(&contact).expect("Can not serialize new contact to json");
    Ok(serialized)
}

#[command]
pub fn remove_contact(app: AppHandle, id: String) -> Result<(), String> {
    AppData::new(app.path_resolver().app_data_dir()).remove_contact(id);
    Ok(())
}
