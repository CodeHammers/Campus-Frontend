export class Event {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    organization_id: number;
    constructor(title: string,date: string,id:number){
        this.title = title;
        this.date = date;
        this.id = id;
    }

}

/*

	
0	
id	1
title	"2018 opening"
description	"kvector opening"
time	null
date	"2018-01-01"
location	"Giza"
created_at	"2017-12-19 00:03:29.380469"
updated_at	"2017-12-19 00:03:29.380469"
organization_id	29
branch_id	15


*/