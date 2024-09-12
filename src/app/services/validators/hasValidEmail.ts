import { AbstractControl, ValidatorFn } from "@angular/forms";

export function hasValidEmail(): ValidatorFn
{
    return (control: AbstractControl): { [key: string]: any } | null => {

        let value: string = control.value || '';

        if (!value.includes('@')) 
            return { emailErr: "Inserire email valida" };
        

        let parts: string[] = value.split('@');
        if (parts.length !== 2) 
            return { emailErr: "Inserire email valida" };
        

        let prefix = parts[0];
        let domain = parts[1];

        if (prefix.trim() === '')
            return { emailErr: "Inserire email valida" };
        

        if (!domain.includes('.'))
            return { emailErr: "Inserire email valida" };
        

        let domainParts = domain.split('.');
        
        if (domainParts.length < 2 || domainParts[0].trim() === '' || domainParts[1].trim() === '') 
            return { emailErr: "Inserire email valida" };
        

        return null;
    };
}
