import {ValidationError} from 'yup';
 
interface Errors {
    [key: string]: string;
}
export default function getValidationErrors(err: ValidationError): Errors{
    const validationErrors: Errors = {};

    err.inner.forEach((error) =>{
        const errorPath: string = error.path != null ? error.path: "";

        validationErrors[errorPath] = error.message;
    });
    return validationErrors;
}