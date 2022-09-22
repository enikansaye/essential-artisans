export function toFormData<T extends Record<string, unknown>>( formValue: T ) {
    const formData = new FormData();
  
    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
if (typeof value !== 'string'  && !(value instanceof Blob)) {
    continue;
}
      formData.append(key, value);
    }
  
    return formData;
  }

//   export function toFormData<T extends Record<string, unknown>>(formValue: T) {
//     const formData = new FormData();

//     for (const key of Object.keys(formValue)) {
//         const value = formValue[key];
//         // feel free to remove Blob if it's not your case.
//         if (typeof value !== 'string'  && !(value instanceof Blob)) {
//             continue;
//         }
//         formData.append(key, value);
//     }

//     return formData;
// }