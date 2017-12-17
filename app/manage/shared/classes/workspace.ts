export class Workspace {
    id: number;
    name: string;
    logo_link: string;
    about: string;
    
    constructor(id: number,name: string){
        this.id = id;
        this.name = name;
    }
}
/*
  create_table "workspaces", force: :cascade do |t|
    t.string "name", null: false
    t.string "logo"
    t.text "about"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

*/