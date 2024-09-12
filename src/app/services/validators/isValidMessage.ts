import { AbstractControl, ValidatorFn } from "@angular/forms";

export function isValidMessage(): ValidatorFn
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

        let message: string = control.value;

        if (!message) return null;

        if (message.length > 33) 
            return { messageErr: "Messaggio troppo lungo" };

        let alphanumericRegex = /^[a-zA-Z0-9]+$/;

        if (!alphanumericRegex.test(message))
            return { messageErr: "Caratteri speciali non permessi" };
        

        for (let word of bannedWords) 
            if (message.toLowerCase().includes(word)) 
            {
                let asterisc: string ="";

                for(let i = 0; i < word.length; i++)
                    asterisc += "*";

                message.replace(word, asterisc)

                control.setValue(message);

                return null;
            }

        return null;
    };
}