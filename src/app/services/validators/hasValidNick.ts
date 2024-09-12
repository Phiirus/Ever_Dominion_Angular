import { AbstractControl, ValidatorFn } from "@angular/forms";

export function profanityFilter(): ValidatorFn
{
    return (control: AbstractControl): { [key: string]: any } | null => 
    {
        let bannedWords = 
        [
            "nigg",
            "negro",
            "scemo",
            "gay",
            "idiota",
            "hitler",
            "fascio",
            "dio",
            "stupido",
            "cretino",
            "merda",
            "cacca",
            "porco",
            "frocio",
            "lesbica",
            "madonna",
            "brutto",
            "fallito",
            "figa",
            "tette",
            "culo",
            "cazzo",
            "pene",
            "fascista",
            "fascismo",
            "sigma",
            "nazi",
            "mmmmmm",
            "vagina",
        ];

        let username = control.value;

        if (!username) return null;

        if (username.length > 8) 
            return { nickErr: "Lunghezza massima nick: 8 caratteri" };

        let alphanumericRegex = /^[a-zA-Z0-9]+$/;

        if (!alphanumericRegex.test(username))
            return { nickErr: "Caratteri speciali non permessi" };
        

        for (let word of bannedWords) 
            if (username.toLowerCase().includes(word)) 
                return { nickErr: "Parola proibita: " + word };


        return null;
    };
}