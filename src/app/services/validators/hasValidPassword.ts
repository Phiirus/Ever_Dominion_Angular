import { AbstractControl, ValidatorFn } from "@angular/forms";

export function hasValidPassword(): ValidatorFn
{
    //ignora riga 3 e 5, sono sempre uguali Map<string,QualsiasiCosa>
    return (control:AbstractControl):{[key:string]:any} | null =>
    {
        let value = control.value || '';

        let hasUpperCase = /[A-Z]/.test(value);
        let hasLowerCase = /[a-z]/.test(value);
        let hasNumber = /\d/.test(value);
        let minLength = value.length >= 8;

        if (!minLength)
            return { passwordErr: "La password deve contenere almeno 8 caratteri" };

        if (!hasUpperCase || !hasLowerCase) 
            return { passwordErr: "La password deve contenere una maiuscola e una minuscola" };

        if (!hasNumber) 
            return { passwordErr: "La password deve contenere almeno un numero" };

        return null;
    }
}

