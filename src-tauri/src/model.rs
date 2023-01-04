use std::path::PathBuf;

use chrono::{DateTime, Utc};
use jfs::{Config, Store};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

pub struct AppData {
    app_dir: Option<PathBuf>,
}

impl AppData {
    pub fn new(app_dir: Option<PathBuf>) -> Self {
        Self { app_dir }
    }

    fn get_store(&self) -> Store {
        let app_dir_path = self
            .app_dir
            .as_ref()
            .expect("Could not determine app directory");
        if !app_dir_path.exists() {
            std::fs::create_dir(&app_dir_path).expect("Could not create app directory");
        }

        let data_path = &app_dir_path.join("contacts");
        let path = data_path.to_str().expect("Could not build app data file");

        let mut cfg = Config::default();
        cfg.single = true;
        if cfg!(debug_assertions) {
            cfg.pretty = true;
            cfg.indent = 4;
        }

        Store::new_with_cfg(&path, cfg).expect("Could not initialize store")
    }

    pub fn get_contacts(&self) -> Vec<Contact> {
        let mut contacts = self
            .get_store()
            .all()
            .expect("can not get all contacts from store")
            .values()
            .cloned()
            .collect::<Vec<Contact>>();

        contacts.sort_by(|a, b| a.created_at.cmp(&b.created_at));
        contacts
    }

    pub fn create_contact(&self, contact: &Contact) {
        let contacts = self.get_contacts();
        if !contacts.iter().any(|c| c.phone_number == contact.phone_number) {
            self.get_store()
                .save_with_id(contact, &contact.id)
                .expect("could not create new contact");
        }
    }

    pub fn remove_contact(&self, id: String) {
        self.get_store()
            .delete(&id)
            .expect("Could not delete contact")
    }
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Contact {
    id: String,
    phone_number: String,
    code: String,
    created_at: DateTime<Utc>,
}

impl Contact {
    pub fn new_with_phonenumber(phone_number: String, code: String) -> Self {
        let id = Uuid::new_v4().to_string();
        let created_at = Utc::now();

        Contact {
            id,
            created_at,
            phone_number,
            code
        }
    }
}
