export class Room {
    capacity: number;
    price: number;
    services: string;
    id:number;
    constructor(c:number,p:number,s:string,id:number){
        this.capacity = c;
        this.price = p;
        this.services = s;
        this.id = id;
    }

}


/*
  create_table "rooms", force: :cascade do |t|
    t.float "price", null: false
    t.boolean "availability", default: true, null: false
    t.integer "capacity", null: false
    t.text "services"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "branch_id"
    t.index ["branch_id"], name: "index_rooms_on_branch_id"
  end
*/