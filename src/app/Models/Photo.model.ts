export class Photo {
    
    key: string;
    published = false;
    constructor ( public category: string ,public caption: string, public imageUrl: string
        ,public author: string,public commentaire: string   ) {}
}

