import {FormInputLabel, Input, Group} from './form-input.styles'

const FormInput = ({ label, ...otherProps }) => {
//label sa pouziva na textove pole
  return (

    <Group>

        <Input {...otherProps} />

        {label && (
          <FormInputLabel shrink={otherProps.value.length}> {/* if number of length is 0, then otherProps is false, if greater than 0, then true  */}
            {label}
          </FormInputLabel>
        )}
   
   </Group>
 );
};

   
//     {label && (                                         // if there is label then &&
//        <label
//          className={`${                                  /* tu zrenderujeme string interpolated string kde hodnota bude zalezat na otherProps value, 
                                                          //so if the value length => ak pouzivatel napise nieco into input znamena ze sa label = shrink/scvrkne */
//            otherProps.value.length ? 'shrink' : ''       //? if shrink value is truth then shrink, : otherwise 'null' , FIL je len dalsi class
//          } form-input-label`}
//        >
//          {label}
//        </label>
//      )}


export default FormInput;